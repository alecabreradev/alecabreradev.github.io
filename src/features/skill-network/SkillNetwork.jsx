import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AREAS, SKILLS } from "../../data/skills.js";
import { PROJECTS } from "../../data/profile.js";
import { useLanguage } from "../../i18n/context.js";
import useElementWidth from "../../hooks/useElementWidth.js";
import { prefersReducedMotion } from "../../utils/motion.js";
import { computeLayout, connectedNodes } from "./layout.js";
import { playPulse } from "./pulse.js";
import "./SkillNetwork.css";

const PROJECT_IDS = PROJECTS.map((project) => project.id);

let measureContext;
function measureText(text, fontSize) {
  measureContext ??= document.createElement("canvas").getContext("2d");
  measureContext.font = `${fontSize}px "IBM Plex Sans", system-ui, sans-serif`;
  return measureContext.measureText(text).width;
}

/** Interactive graph linking areas of knowledge, tools and projects. */
export default function SkillNetwork({ onOpenProject }) {
  const { t, language } = useLanguage();
  const [containerRef, width] = useElementWidth();
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [projectsLit, setProjectsLit] = useState(false);
  const svgRef = useRef(null);
  const pulseLayerRef = useRef(null);
  const stopPulseRef = useRef(() => {});

  const layout = useMemo(() => {
    if (!width) return null;
    return computeLayout({
      width,
      areas: AREAS,
      skills: SKILLS,
      projects: PROJECT_IDS,
      areaLabel: (id, narrow) => t(`network.areas.${id}.${narrow ? "short" : "name"}`),
      projectLabel: (id, narrow) => t(`projects.${id}.${narrow ? "short" : "name"}`),
      measureText,
    });
    // `t` changes with the language, which is already a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, language]);

  const activeId = hovered ?? selected;
  const related = useMemo(
    () => (activeId && layout ? connectedNodes(activeId, layout.edges) : null),
    [activeId, layout],
  );

  const playOnce = useCallback(() => {
    if (prefersReducedMotion() || !svgRef.current || !pulseLayerRef.current) return;
    stopPulseRef.current();
    stopPulseRef.current = playPulse(svgRef.current, pulseLayerRef.current, setProjectsLit);
  }, []);

  // Play the animation once, shortly after the network first appears (a welcome, not a control)
  const hasPlayed = useRef(false);
  useEffect(() => {
    if (!layout || hasPlayed.current) return undefined;
    hasPlayed.current = true;
    const timer = setTimeout(playOnce, 350);
    return () => clearTimeout(timer);
  }, [layout, playOnce]);

  useEffect(() => () => stopPulseRef.current(), []);

  const labelOf = (nodeId) => layout.nodes.find((node) => node.id === nodeId)?.label ?? "";

  const activate = (node) => {
    if (node.kind === "project") {
      setSelected(node.id);
      onOpenProject(node.id.split(":")[1]);
    } else {
      setSelected((current) => (current === node.id ? null : node.id));
    }
  };

  const description = () => {
    if (!activeId || !related) return null;
    const ids = [...related];
    const names = (kind) => ids.filter((id) => id.startsWith(`${kind}:`)).map(labelOf);
    const skills = names("skill").join(", ");
    const projects = names("project").join(", ");
    const name = <strong>{labelOf(activeId)}</strong>;

    if (activeId.startsWith("project:"))
      return (
        <>
          {name}: {t("network.builtWith")} {skills}
        </>
      );
    if (activeId.startsWith("skill:"))
      return projects ? (
        <>
          {name} {t("network.usedIn")} {projects}
        </>
      ) : (
        <>
          {name} · {t("network.noProject")}
        </>
      );
    return (
      <>
        {name}: {skills}
        {projects && ` → ${projects}`}
      </>
    );
  };

  return (
    <div className="skill-network card">
      <p className="skill-network__help text-muted">{t("network.help")}</p>

      <div className="skill-network__columns" aria-hidden="true">
        <span>{t("network.columns.areas")}</span>
        <span>{t("network.columns.skills")}</span>
        <span>{t("network.columns.projects")}</span>
      </div>

      <div className="skill-network__canvas" ref={containerRef}>
        {layout && (
          <svg
            ref={svgRef}
            className={activeId ? "is-dimmed" : undefined}
            viewBox={`0 0 ${width} ${layout.height}`}
            height={layout.height}
            role="group"
            aria-label={t("network.label")}
          >
            <g>
              {layout.edges.map((edge) => (
                <path
                  key={`${edge.from}>${edge.to}`}
                  className={`skill-network__edge${related?.has(edge.from) && related?.has(edge.to) ? " is-related" : ""}`}
                  data-layer={edge.layer}
                  d={edge.path}
                />
              ))}
            </g>

            {layout.nodes.map((node) => {
              const classes = ["skill-network__node", `skill-network__node--${node.kind}`];
              if (related?.has(node.id)) classes.push("is-related");
              if (selected === node.id) classes.push("is-selected");
              if (node.kind === "project" && projectsLit) classes.push("is-lit");
              return (
                <g
                  key={node.id}
                  className={classes.join(" ")}
                  tabIndex={0}
                  role="button"
                  aria-label={node.label}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(node.id)}
                  onBlur={() => setHovered(null)}
                  onClick={() => activate(node)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      activate(node);
                    }
                  }}
                >
                  <rect
                    x={node.x}
                    y={node.y - layout.pillHeight / 2}
                    width={node.width}
                    height={layout.pillHeight}
                    rx={layout.pillHeight / 2}
                  />
                  <text
                    x={node.x + node.width / 2}
                    y={node.y}
                    style={{ fontSize: layout.fontSize }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}

            <g ref={pulseLayerRef} />
          </svg>
        )}
      </div>

      <p className="skill-network__description" aria-live="polite">
        {description()}
      </p>
    </div>
  );
}
