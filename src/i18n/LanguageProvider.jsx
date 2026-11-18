import { useEffect, useMemo, useState } from "react";
import { LanguageContext } from "./context.js";
import es from "./locales/es.js";
import en from "./locales/en.js";

const LOCALES = { es, en };

/** Spanish unless the browser prefers another language. */
function detectLanguage() {
  const preferred = typeof navigator === "undefined" ? "es" : navigator.language;
  return /^es/i.test(preferred ?? "es") ? "es" : "en";
}

/** Reads a nested key such as "nav.about" from a locale object. */
function lookup(locale, key) {
  return key.split(".").reduce((node, part) => node?.[part], locale);
}

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = LOCALES[language].meta.title;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      toggleLanguage: () => setLanguage((current) => (current === "es" ? "en" : "es")),
      /** Returns the text (or list/object of texts) for a key in the current language. */
      t: (key) => lookup(LOCALES[language], key) ?? key,
      /** The text of a key in every language (to reserve the width of the longest one). */
      variants: (key) => Object.values(LOCALES).map((locale) => lookup(locale, key) ?? key),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
