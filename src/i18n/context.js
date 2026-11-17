import { createContext, useContext } from "react";

export const LanguageContext = createContext(null);

/** Current language, a toggle and `t(key)` to read texts from the locales. */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return context;
}
