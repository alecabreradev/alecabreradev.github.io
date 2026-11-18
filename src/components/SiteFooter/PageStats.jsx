import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/context.js";
import { PROFILE } from "../../data/profile.js";
import { prefersReducedMotion } from "../../utils/motion.js";
import { formatBytes, measurePage, timeAgo } from "./pageStats.js";

const BUILD = __BUILD_INFO__;
const COUNT_MS = 900;

/** Counts from 0 to `target` the first time `run` is true (skipped with reduced motion). */
function useCountUp(target, run) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run || target == null) return undefined;
    if (prefersReducedMotion()) {
      setValue(target);
      return undefined;
    }
    let frame;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / COUNT_MS);
      setValue(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, run]);
  return value;
}

/**
 * "This page, by the numbers": load time and size measured right now in the
 * visitor's browser, plus the tests and the commit of the deployed version.
 */
export default function PageStats() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const [stats, setStats] = useState(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const read = () => setStats(measurePage(window.performance));
    if (document.readyState === "complete") read();
    else {
      const onLoad = () => setTimeout(read, 0);
      window.addEventListener("load", onLoad, { once: true });
      return () => window.removeEventListener("load", onLoad);
    }
    return undefined;
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        observer.disconnect();
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const loadMs = useCountUp(stats?.loadMs, seen);
  const kb = useCountUp(stats ? Math.round(stats.bytes / 1024) : null, seen);
  const tests = useCountUp(BUILD.tests, seen);

  const commitUrl = BUILD.commit ? `${PROFILE.links.source}/commit/${BUILD.commit}` : null;

  return (
    <section className="page-stats" ref={ref} aria-label={t("footer.stats.title")}>
      <header className="page-stats__head">
        <span>{t("footer.stats.title")}</span>
        <span className="page-stats__live">
          <span className="page-stats__dot" aria-hidden="true" />
          {t("footer.stats.live")}
        </span>
      </header>

      <dl className="page-stats__grid">
        <div>
          <dt>{t("footer.stats.load")}</dt>
          <dd>
            {stats ? (
              <>
                {loadMs}
                <small> ms</small>
              </>
            ) : (
              "—"
            )}
          </dd>
          <p>{t("footer.stats.loadNote")}</p>
        </div>
        <div>
          <dt>{t("footer.stats.size")}</dt>
          <dd>
            {stats ? (
              stats.bytes >= 1024 * 1024 ? (
                formatBytes(stats.bytes, language)
              ) : (
                <>
                  {Math.max(1, kb)}
                  <small> KB</small>
                </>
              )
            ) : (
              "—"
            )}
          </dd>
          <p>{t("footer.stats.sizeNote")}</p>
        </div>
        <div>
          <dt>{t("footer.stats.tests")}</dt>
          <dd>
            {tests}
            <small className="page-stats__ok"> ✓</small>
          </dd>
          <p>{t("footer.stats.testsNote")}</p>
        </div>
        <div>
          <dt>{t("footer.stats.version")}</dt>
          <dd className="page-stats__mono">
            {commitUrl ? (
              <a href={commitUrl} target="_blank" rel="noopener noreferrer">
                {BUILD.commit}
              </a>
            ) : (
              "local"
            )}
          </dd>
          <p>
            {t("footer.stats.updated")} {timeAgo(BUILD.builtAt, Date.now(), language)}
          </p>
        </div>
      </dl>
    </section>
  );
}
