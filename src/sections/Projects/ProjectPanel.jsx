import Marked from "../../components/Marked/Marked.jsx";

/** One project: description on the left, interactive demo on the right. */
export default function ProjectPanel({
  id,
  hidden,
  title,
  paragraphs,
  stack,
  repo,
  repoLabel,
  extra,
  demo,
  wideDemo,
}) {
  return (
    <article
      id={`panel-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      hidden={hidden}
      className={`project-panel card${wideDemo ? " project-panel--wide-demo" : ""}`}
    >
      <div className="project-panel__info">
        <h3>{title}</h3>
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>
            <Marked text={paragraph} />
          </p>
        ))}
        {extra}
        <p className="tech-stack">{stack.join(" · ")}</p>
        <p>
          <a href={repo} target="_blank" rel="noopener noreferrer">
            {repoLabel} <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>
      {!hidden && demo}
    </article>
  );
}
