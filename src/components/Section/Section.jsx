import "./Section.css";

/** Page section with an anchor id and a heading. */
export default function Section({ id, title, children }) {
  const headingId = `${id}-title`;
  return (
    <section id={id} className="section" aria-labelledby={headingId}>
      <h2 id={headingId}>{title}</h2>
      {children}
    </section>
  );
}
