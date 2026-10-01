import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToString } from "react-dom/server";

// Every language ships its actual content and metadata without JavaScript.
const server = await createServer({
  server: { middlewareMode: true, watch: null, hmr: false, ws: false },
  appType: "custom",
  mode: "production",
});
try {
  const { App } = await server.ssrLoadModule("/src/site/App.tsx");
  const {
    structuredData,
    siteUrl,
    pageUrl,
    languages,
    languageFiles,
    pageMetadata,
    seoCopy,
  } = await server.ssrLoadModule("/src/site/seo.ts");
  const manifest = JSON.parse(
    await readFile("dist/.vite/manifest.json", "utf8"),
  );
  const template = await readFile("dist/index.html", "utf8");
  const escape = (value) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  const assetUrl = (source) => {
    const asset = manifest[source];
    if (!asset) throw new Error(`Missing production asset for ${source}`);
    return siteUrl ? new URL(asset.file, siteUrl).href : `./${asset.file}`;
  };
  for (const language of languages) {
    const t = seoCopy[language];
    let markup = renderToString(
      createElement(App, { initialLanguage: language }),
    );
    markup = markup.replace(
      /(?:src|href)="\/([^"?]+)(?:\?[^"\s]*)?"/g,
      (attribute, source) => {
        const asset = manifest[source];
        if (!asset) throw new Error(`Missing production asset for ${source}`);
        return attribute.replace(/".*"/, `"./${asset.file}"`);
      },
    );
    let html = template
      .replace('<html lang="ru">', `<html lang="${language}">`)
      .replace('<div id="root"></div>', () => `<div id="root">${markup}</div>`)
      .replace(/<title>.*?<\/title>/s, `<title>${escape(t.title)}</title>`);
    const metadataTags = [];
    for (const [key, value] of Object.entries(pageMetadata(language))) {
      const attr = key.startsWith("og:") ? "property" : "name";
      const pattern = new RegExp(
        `<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*\\/>`,
      );
      const tag = `<meta ${attr}="${key}" content="${escape(value)}" />`;
      if (!pattern.test(html)) metadataTags.push(tag);
      html = html.replace(pattern, () => tag);
    }
    const schema = structuredData(language);
    if (siteUrl) {
      schema["@graph"][0].logo = assetUrl("src/assets/logo.png");
      schema["@graph"][0].image = assetUrl("src/assets/optimized/IMG_0059.jpg");
    }
    const head = [
      ...metadataTags,
      `<script id="local-business-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
      `<meta property="og:image" content="${escape(assetUrl("src/assets/optimized/IMG_0059.jpg"))}" />`,
      `<meta name="twitter:image" content="${escape(assetUrl("src/assets/optimized/IMG_0059.jpg"))}" />`,
    ];
    if (siteUrl) {
      head.push(
        `<link rel="canonical" href="${escape(pageUrl(language))}" />`,
        `<meta property="og:url" content="${escape(pageUrl(language))}" />`,
        ...languages.map(
          (lang) =>
            `<link rel="alternate" hreflang="${lang}" href="${escape(pageUrl(lang))}" />`,
        ),
        `<link rel="alternate" hreflang="x-default" href="${escape(pageUrl("ru"))}" />`,
      );
    }
    html = html.replace("</head>", `${head.join("\n")}\n</head>`);
    if (!html.includes('content="noindex, nofollow"'))
      throw new Error("Indexing restriction missing");
    await writeFile(`dist/${languageFiles[language]}`, html);
  }
  // Preserve the owner's explicit crawl restriction on every build.
  if (
    (await readFile("dist/robots.txt", "utf8")).trim() !==
    "User-agent: *\nDisallow: /"
  ) {
    throw new Error("robots.txt must continue blocking crawling");
  }
  console.log(
    "Prerendered RU/EN/EL pages, metadata and schema; indexing remains blocked.",
  );
} finally {
  await server.close();
}
