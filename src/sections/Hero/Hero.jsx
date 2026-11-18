import { useLanguage } from "../../i18n/context.js";
import { PROFILE } from "../../data/profile.js";
import Marked from "../../components/Marked/Marked.jsx";
import SkillNetwork from "../../features/skill-network/SkillNetwork.jsx";
import photo from "../../assets/alejandro.webp";
import "./Hero.css";

export default function Hero({ onOpenProject }) {
  const { t } = useLanguage();
  return (
    <div className="hero">
      <div className="hero__head">
        <div className="hero__copy">
          <h1 className="hero__title">{t("hero.title")}</h1>
          <p className="hero__intro">
            <Marked text={t("hero.intro")} />
          </p>
        </div>
        <figure className="hero__photo">
          <img src={photo} alt={PROFILE.name} width="400" height="400" />
        </figure>
      </div>
      <SkillNetwork onOpenProject={onOpenProject} />
    </div>
  );
}
