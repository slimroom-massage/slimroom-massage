import { contact, copy, treatments, type Language } from "./content";
import logo from "../assets/logo.png";
import studio from "../assets/optimized/IMG_0059.jpg";

export const languages: Language[] = ["ru", "en", "el"];
export const languageLabels: Record<Language, string> = {
  ru: "Русский",
  en: "English",
  el: "Ελληνικά",
};
export const languageFiles: Record<Language, string> = {
  ru: "index.html",
  en: "en.html",
  el: "el.html",
};

export function languageHref(language: Language) {
  return language === "ru" ? "./" : `./${languageFiles[language]}`;
}

export const seoCopy: Record<Language, { title: string; description: string }> =
  {
    ru: {
      title: "Массаж в центре Пафоса, Като Пафос | Slimroom",
      description:
        "Массаж в самом центре Пафоса, Като Пафос: антицеллюлитный, терапевтический, массаж лица и мадеротерапия с Алиной в Slimroom. Запись через WhatsApp.",
    },
    en: {
      title: "Massage in Paphos, Kato Paphos | Slimroom",
      description:
        "Massage in the heart of Paphos, Kato Paphos. Anti-cellulite, therapeutic and facial massage, maderotherapy with Alina at Slimroom. Book via WhatsApp.",
    },
    el: {
      title: "Μασάζ στο κέντρο της Πάφου, Κάτω Πάφος | Slimroom",
      description:
        "Μασάζ στην καρδιά της Πάφου, στην Κάτω Πάφο. Μασάζ κατά της κυτταρίτιδας, θεραπευτικό μασάζ, μασάζ προσώπου και μαδεροθεραπεία με την Alina. Ραντεβού μέσω WhatsApp.",
    },
  };

export const locales: Record<Language, string> = {
  ru: "ru_RU",
  en: "en_GB",
  el: "el_CY",
};

// Shared by the browser and the static HTML build.
export function pageMetadata(language: Language): Record<string, string> {
  const { title, description } = seoCopy[language];
  return {
    description,
    "og:title": title,
    "og:description": description,
    "og:locale": locales[language],
    "og:image:alt": copy[language].studioAlt,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image:alt": copy[language].studioAlt,
  };
}

// Set the final public URL at build time; never infer it from a preview host.
const configuredUrl = import.meta.env.VITE_SITE_URL?.trim();
export const siteUrl = configuredUrl
  ? normalizeSiteUrl(configuredUrl)
  : undefined;

function normalizeSiteUrl(value: string) {
  const url = new URL(value);
  if (
    url.protocol !== "https:" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error(
      "VITE_SITE_URL must be an HTTPS page URL without query or hash.",
    );
  }
  url.pathname = url.pathname.replace(/index\.html$/, "").replace(/\/?$/, "/");
  return url.href;
}

export function pageUrl(language: Language) {
  return siteUrl ? new URL(languageHref(language), siteUrl).href : undefined;
}

export function structuredData(language: Language) {
  const t = seoCopy[language];
  const businessId = `${siteUrl || ""}#studio`;
  const currentPage = pageUrl(language) || languageHref(language);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HealthAndBeautyBusiness",
        "@id": businessId,
        name: "Slimroom",
        description: t.description,
        ...(siteUrl ? { url: siteUrl } : {}),
        ...(siteUrl
          ? {
              logo: new URL(logo, siteUrl).href,
              image: new URL(studio, siteUrl).href,
            }
          : {}),
        telephone: contact.phone,
        sameAs: [contact.instagram],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kato Paphos, Paphos",
          addressCountry: "CY",
        },
        areaServed: { "@type": "Place", name: "Kato Paphos, Paphos, Cyprus" },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: copy[language].servicesLabel,
          itemListElement: treatments.map((treatment) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: treatment[language].name,
              description: treatment[language].description,
              provider: { "@id": businessId },
              areaServed: "Kato Paphos, Paphos, Cyprus",
            },
          })),
        },
      },
      {
        "@type": "WebPage",
        "@id": `${currentPage}#webpage`,
        ...(siteUrl ? { url: currentPage } : {}),
        name: t.title,
        description: t.description,
        inLanguage: language,
        about: { "@id": businessId },
        isPartOf: { "@id": `${siteUrl || "./"}#website` },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl || "./"}#website`,
        name: "Slimroom",
        ...(siteUrl ? { url: siteUrl } : {}),
        inLanguage: languages,
        publisher: { "@id": businessId },
      },
    ],
  };
}

export function serializeStructuredData(language: Language) {
  return JSON.stringify(structuredData(language)).replace(/</g, "\\u003c");
}
