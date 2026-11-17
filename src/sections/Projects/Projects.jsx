import { useLanguage } from "../../i18n/context.js";
import { PROJECTS } from "../../data/profile.js";
import Section from "../../components/Section/Section.jsx";
import CorteArteDemo from "../../features/corte-arte-demo/CorteArteDemo.jsx";
import ModelComparison from "../../features/no2-demo/ModelComparison.jsx";
import ThresholdExplorer from "../../features/no2-demo/ThresholdExplorer.jsx";
import ProjectTabs from "./ProjectTabs.jsx";
import ProjectPanel from "./ProjectPanel.jsx";
import "./Projects.css";

const [corteArte, no2] = PROJECTS;

export default function Projects({ selectedId, onSelect, theme }) {
  const { t } = useLanguage();
  const tabs = PROJECTS.map((project) => ({
    id: project.id,
    label: t(`projects.${project.id}.name`),
  }));

  return (
    <Section id="projects" title={t("projects.title")}>
      <ProjectTabs
        label={t("projects.tabsLabel")}
        tabs={tabs}
        selectedId={selectedId}
        onSelect={onSelect}
      />

      <ProjectPanel
        id={corteArte.id}
        hidden={selectedId !== corteArte.id}
        title={t("projects.corteArte.title")}
        paragraphs={t("projects.corteArte.paragraphs")}
        stack={corteArte.stack}
        repo={corteArte.repo}
        repoLabel={t("projects.corteArte.repoLink")}
        wideDemo
        demo={
          <CorteArteDemo
            label={t("projects.corteArte.demoLabel")}
            hint={t("projects.corteArte.demoHint")}
          />
        }
      />

      <ProjectPanel
        id={no2.id}
        hidden={selectedId !== no2.id}
        title={t("projects.no2.title")}
        paragraphs={t("projects.no2.paragraphs")}
        extra={
          <>
            <ModelComparison />
            <p>{t("projects.no2.drivers")}</p>
          </>
        }
        stack={no2.stack}
        repo={no2.repo}
        repoLabel={t("projects.no2.repoLink")}
        demo={<ThresholdExplorer theme={theme} />}
      />

      <div className="skills-summary">
        <h3 className="skills-summary__title">{t("projects.skills.title")}</h3>
        <div className="skills-summary__grid">
          {t("projects.skills.groups").map((group) => (
            <div key={group.name}>
              <h4>{group.name}</h4>
              <p>{group.items}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
