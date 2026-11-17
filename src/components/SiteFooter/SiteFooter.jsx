import { useLanguage } from "../../i18n/context.js";
import { PROFILE } from "../../data/profile.js";
import "./SiteFooter.css";

export default function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <span>
        {PROFILE.name} · {new Date().getFullYear()}
      </span>
      <span className="site-footer__links">
        <a href={PROFILE.links.source} target="_blank" rel="noopener noreferrer">
          {t("footer.source")}
        </a>
        <a href="#top">{t("footer.backToTop")}</a>
      </span>
    </footer>
  );
}
