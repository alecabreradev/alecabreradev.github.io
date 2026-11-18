import { useEffect, useState } from "react";
import { useLanguage } from "../../i18n/context.js";
import { scrollToTop } from "../../utils/motion.js";
import "./BackToTop.css";

const SHOW_AFTER_PX = 600;
const RADIUS = 21;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Floating "back to top" button. It appears after scrolling down, and its ring
 * fills up with how much of the page has been read.
 */
export default function BackToTop() {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      className="back-to-top"
      data-visible={visible || undefined}
      aria-label={t("footer.backToTop")}
      title={t("footer.backToTop")}
      tabIndex={visible ? 0 : -1}
      onClick={scrollToTop}
    >
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <g transform="rotate(-90 24 24)">
          <circle className="back-to-top__track" cx="24" cy="24" r={RADIUS} />
          <circle
            className="back-to-top__progress"
            cx="24"
            cy="24"
            r={RADIUS}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          />
        </g>
        <path className="back-to-top__arrow" d="M24 31V17M18.5 22.5 24 17l5.5 5.5" />
      </svg>
    </button>
  );
}
