import { useEffect, useState, type MouseEvent } from "react";
import { type Language } from "./content";
import {
  languageHref,
  languageFiles,
  languages,
  pageMetadata,
  pageUrl,
  seoCopy,
  serializeStructuredData,
} from "./seo";

function languageFromUrl(): Language {
  if (typeof window === "undefined") return "ru";
  const file = window.location.pathname.split("/").pop();
  return languages.find((language) => languageFiles[language] === file) ?? "ru";
}

export function useLanguage(initialLanguage?: Language) {
  const [language, setLanguage] = useState(initialLanguage ?? languageFromUrl);

  function changeLanguage(
    event: MouseEvent<HTMLAnchorElement>,
    next: Language,
  ) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    if (next === language) return;
    const url = new URL(languageHref(next), window.location.href);
    url.hash = window.location.hash;
    window.history.pushState(null, "", url);
    setLanguage(next);
  }

  useEffect(() => {
    const onPopState = () => setLanguage(languageFromUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = seoCopy[language].title;
    for (const [key, value] of Object.entries(pageMetadata(language))) {
      const attribute = key.startsWith("og:") ? "property" : "name";
      document
        .querySelector(`meta[${attribute}="${key}"]`)
        ?.setAttribute("content", value);
    }
    const canonical = pageUrl(language);
    if (canonical) {
      document
        .querySelector('link[rel="canonical"]')
        ?.setAttribute("href", canonical);
      document
        .querySelector('meta[property="og:url"]')
        ?.setAttribute("content", canonical);
    }
    let schema = document.getElementById("local-business-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "local-business-schema";
      schema.setAttribute("type", "application/ld+json");
      document.head.append(schema);
    }
    schema.textContent = serializeStructuredData(language);
  }, [language]);

  return { language, changeLanguage };
}
