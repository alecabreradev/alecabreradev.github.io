import { useLanguage } from "../../i18n/context.js";
import Section from "../../components/Section/Section.jsx";
import "./Timeline.css";

export default function Timeline({ onOpenProject }) {
  const { t } = useLanguage();
  return (
    <Section id="timeline" title={t("timeline.title")}>
      <ol className="timeline">
        {t("timeline.items").map((item) => (
          <li key={item.title} className={`timeline__item timeline__item--${item.kind}`}>
            <span className="timeline__date">{item.date}</span>
            <div>
              <span className="timeline__kind">{t(`timeline.kinds.${item.kind}`)}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {item.project && (
                <button
                  type="button"
                  className="timeline__link"
                  onClick={() => onOpenProject(item.project)}
                >
                  {t("timeline.openProject")} →
                </button>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
