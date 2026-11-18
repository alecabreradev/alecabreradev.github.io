import { useLanguage } from "../../i18n/context.js";
import Marked from "../../components/Marked/Marked.jsx";
import Section from "../../components/Section/Section.jsx";
import "./About.css";

export default function About() {
  const { t } = useLanguage();
  return (
    <Section id="about" title={t("about.title")}>
      <div className="about">
        <div className="about__text">
          {t("about.paragraphs").map((paragraph) => (
            <p key={paragraph}>
              <Marked text={paragraph} />
            </p>
          ))}
        </div>
        <dl className="about__facts">
          {t("about.facts").map(({ term, value }) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
