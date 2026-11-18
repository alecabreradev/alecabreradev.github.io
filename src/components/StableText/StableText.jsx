import { useLanguage } from "../../i18n/context.js";
import "./StableText.css";

/**
 * Text that keeps the same width in every language (and, with `also`, in every state):
 * the other versions are stacked invisibly in the same spot, so buttons, tabs and the
 * navigation pill don't jump when switching language.
 */
export default function StableText({ k, also = [] }) {
  const { t, variants } = useLanguage();
  const text = t(k);
  const ghosts = [...new Set([k, ...also].flatMap(variants))].filter((value) => value !== text);
  return (
    <span className="stable-text">
      <span>{text}</span>
      {ghosts.map((ghost) => (
        <span key={ghost} className="stable-text__ghost" aria-hidden="true">
          {ghost}
        </span>
      ))}
    </span>
  );
}
