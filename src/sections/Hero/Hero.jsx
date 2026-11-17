import { useLanguage } from "../../i18n/context.js";
import SkillNetwork from "../../features/skill-network/SkillNetwork.jsx";
import "./Hero.css";

export default function Hero({ onOpenProject }) {
  const { t } = useLanguage();
  return (
    <div className="hero">
      <h1 className="hero__title">{t("hero.title")}</h1>
      <p className="hero__intro">{t("hero.intro")}</p>
      <SkillNetwork onOpenProject={onOpenProject} />
    </div>
  );
}
