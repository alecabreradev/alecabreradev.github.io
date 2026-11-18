import { useMemo, useState } from "react";
import { useLanguage } from "../../i18n/context.js";
import { CATEGORIES, CONTEXTS, TOOLS, countByContext, filterTools } from "./toolkit.js";
import "./Toolkit.css";
import StableText from "../../components/StableText/StableText.jsx";

const PROJECT_CONTEXTS = new Set(["corteArte", "no2"]);

/**
 * Interactive toolkit: filter technologies by area, highlight where they were used
 * and open a tool to read what I did with it.
 */
export default function Toolkit({ onOpenProject }) {
  const { t } = useLanguage();
  const [category, setCategory] = useState("all");
  const [highlight, setHighlight] = useState(null);
  const [selectedId, setSelectedId] = useState("python");

  const visible = useMemo(() => filterTools(TOOLS, category), [category]);
  const counts = useMemo(() => countByContext(visible, CONTEXTS), [visible]);
  const selected = TOOLS.find((tool) => tool.id === selectedId);

  const note = (tool) => {
    const text = t(`projects.skills.notes.${tool.id}`);
    return text === `projects.skills.notes.${tool.id}` ? t("projects.skills.noProject") : text;
  };

  return (
    <div className="toolkit">
      <div className="toolkit__header">
        <h3 className="toolkit__title">{t("projects.skills.title")}</h3>
        <p className="text-muted">{t("projects.skills.intro")}</p>
      </div>

      <div className="toolkit__filters" role="group" aria-label={t("projects.skills.filterLabel")}>
        {["all", ...CATEGORIES].map((id) => (
          <button
            key={id}
            type="button"
            className={`toolkit__filter toolkit__filter--${id}`}
            aria-pressed={category === id}
            onClick={() => setCategory(id)}
          >
            <StableText k={`projects.skills.categories.${id}`} />
            <span className="toolkit__filter-count">{filterTools(TOOLS, id).length}</span>
          </button>
        ))}
      </div>

      <div className="toolkit__contexts">
        <span className="text-muted">{t("projects.skills.contextsLabel")}</span>
        {CONTEXTS.map((context) => (
          <button
            key={context}
            type="button"
            className={`toolkit__context toolkit__context--${context}`}
            aria-pressed={highlight === context}
            onClick={() => setHighlight(highlight === context ? null : context)}
            onPointerEnter={(event) => event.pointerType === "mouse" && setHighlight(context)}
            onPointerLeave={(event) => event.pointerType === "mouse" && setHighlight(null)}
          >
            <span className="toolkit__context-dot" aria-hidden="true" />
            <StableText k={`projects.skills.contexts.${context}`} />
            <span className="toolkit__filter-count">{counts[context]}</span>
          </button>
        ))}
      </div>

      <div className="toolkit__body">
        <ul className="toolkit__grid" key={category}>
          {visible.map((tool, index) => {
            const dimmed = highlight && !tool.contexts.includes(highlight);
            return (
              <li key={tool.id} style={{ "--delay": `${index * 18}ms` }}>
                <button
                  type="button"
                  className={`toolkit__tile toolkit__tile--${tool.category}`}
                  data-dimmed={dimmed || undefined}
                  aria-pressed={tool.id === selectedId}
                  onClick={() => setSelectedId(tool.id)}
                >
                  <span className="toolkit__mark" aria-hidden="true">
                    {tool.mark}
                  </span>
                  <span className="toolkit__name">{tool.name}</span>
                  <span className="toolkit__dots" aria-hidden="true">
                    {tool.contexts.map((context) => (
                      <span key={context} className={`toolkit__dot toolkit__dot--${context}`} />
                    ))}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {selected && (
          <aside
            className={`toolkit__detail toolkit__detail--${selected.category}`}
            aria-live="polite"
          >
            <div className="toolkit__detail-head">
              <span className="toolkit__mark toolkit__mark--large" aria-hidden="true">
                {selected.mark}
              </span>
              <div>
                <strong className="toolkit__detail-name">{selected.name}</strong>
                <span className="text-muted">
                  {t(`projects.skills.categories.${selected.category}`)}
                </span>
              </div>
            </div>
            <p>{note(selected)}</p>
            <div className="toolkit__detail-links">
              {selected.contexts.map((context) =>
                PROJECT_CONTEXTS.has(context) ? (
                  <button
                    key={context}
                    type="button"
                    className={`toolkit__context toolkit__context--${context}`}
                    onClick={() => onOpenProject(context)}
                  >
                    <span className="toolkit__context-dot" aria-hidden="true" />
                    {t("projects.skills.openProject")} {t(`projects.skills.contexts.${context}`)} →
                  </button>
                ) : (
                  <span key={context} className={`toolkit__tag toolkit__context--${context}`}>
                    <span className="toolkit__context-dot" aria-hidden="true" />
                    {t(`projects.skills.contexts.${context}`)}
                  </span>
                ),
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
