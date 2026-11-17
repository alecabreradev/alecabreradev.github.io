import { useLanguage } from "../../i18n/context.js";
import { PROFILE } from "../../data/profile.js";
import "./SiteHeader.css";

const NAV_ITEMS = ["about", "projects", "timeline", "contact"];

export default function SiteHeader({ onToggleTheme }) {
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <header className="site-header">
      <a className="site-header__brand" href="#top">
        {PROFILE.name}
      </a>
      <nav className="site-header__nav" aria-label={t("nav.label")}>
        {NAV_ITEMS.map((id) => (
          <a key={id} className="site-header__link" href={`#${id}`}>
            {t(`nav.${id}`)}
          </a>
        ))}
        <button
          type="button"
          className="chip-button"
          onClick={toggleLanguage}
          aria-label={t("nav.switchLanguage")}
        >
          {language === "es" ? "EN" : "ES"}
        </button>
        <button
          type="button"
          className="chip-button"
          onClick={onToggleTheme}
          aria-label={t("nav.toggleTheme")}
        >
          {t("nav.theme")}
        </button>
      </nav>
    </header>
  );
}
