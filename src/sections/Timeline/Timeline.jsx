import { useLanguage } from "../../i18n/context.js";
import Marked from "../../components/Marked/Marked.jsx";
import Section from "../../components/Section/Section.jsx";
import "./Timeline.css";

export default function Timeline() {
  const { t } = useLanguage();
  return (
    <Section id="timeline" title={t("timeline.title")}>
      <ol className="timeline">
        {t("timeline.items").map((item) => (
          <li key={item.title} className="timeline__item">
            <span className="timeline__date">{item.date}</span>
            <div>
              <h3>{item.title}</h3>
              <p>
                <Marked text={item.text} />
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
