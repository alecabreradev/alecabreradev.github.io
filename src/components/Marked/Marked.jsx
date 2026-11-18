import { parseMarks } from "./marks.js";
import "./Marked.css";

/*
 * One shared observer: each highlight is "drawn" the first time it scrolls into view.
 * Without IntersectionObserver (old browsers, tests) highlights are simply shown.
 */
let observer = null;

function reveal(element) {
  if (!element) return;
  if (typeof IntersectionObserver === "undefined") {
    element.classList.add("is-drawn");
    return;
  }
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-drawn");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -12% 0px" },
  );
  observer.observe(element);
}

/** Renders a text, turning ==key words== into marker-style highlights. */
export default function Marked({ text }) {
  return parseMarks(text).map((part, index) =>
    part.marked ? (
      <mark key={index} className="marked" ref={reveal}>
        {part.text}
      </mark>
    ) : (
      part.text
    ),
  );
}
