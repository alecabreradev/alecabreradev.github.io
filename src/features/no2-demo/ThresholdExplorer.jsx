import { useEffect, useMemo, useRef, useState } from "react";
import results from "../../data/no2-results.json";
import { useLanguage } from "../../i18n/context.js";
import useElementWidth from "../../hooks/useElementWidth.js";
import RichText from "../../utils/RichText.jsx";
import { metricsAtThreshold } from "./metrics.js";
import { drawTimeline } from "./drawTimeline.js";
import "./No2Demo.css";

function MetricBar({ label, value, highlight = false }) {
  const percent = Math.round(value * 100);
  return (
    <div className={`metric${highlight ? " metric--highlight" : ""}`}>
      <span>{label}</span>
      <span className="metric__track" aria-hidden="true">
        <span className="metric__fill" style={{ width: `${percent}%` }} />
      </span>
      <span className="metric__value">{percent}%</span>
    </div>
  );
}

/** Real test-period predictions with a threshold slider and live metrics. */
export default function ThresholdExplorer({ theme }) {
  const { t, language } = useLanguage();
  const [threshold, setThreshold] = useState(results.decisionThreshold);
  const [containerRef, width] = useElementWidth();
  const canvasRef = useRef(null);
  const metrics = useMemo(() => metricsAtThreshold(results.days, threshold), [threshold]);

  useEffect(() => {
    if (!canvasRef.current || !width) return;
    drawTimeline(canvasRef.current, {
      days: results.days,
      threshold,
      monthInitials: t("projects.no2.months"),
    });
    // Redraw when the theme or language changes too (colors and month initials)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, width, theme, language]);

  return (
    <div className="threshold-explorer" ref={containerRef}>
      <canvas
        ref={canvasRef}
        className="threshold-explorer__chart"
        role="img"
        aria-label={t("projects.no2.chartLabel")}
      />

      <div className="threshold-explorer__legend">
        <span>
          <i className="legend-swatch legend-swatch--accent" />
          {t("projects.no2.legendProbability")}
        </span>
        <span>
          <i className="legend-swatch legend-swatch--signal" />
          {t("projects.no2.legendHighDay")}
        </span>
      </div>

      <div className="threshold-explorer__control">
        <label htmlFor="threshold">{t("projects.no2.threshold")}</label>
        <input
          id="threshold"
          type="range"
          min="0.02"
          max="0.98"
          step="0.01"
          value={threshold}
          onChange={(event) => setThreshold(Number(event.target.value))}
        />
        <output htmlFor="threshold">{threshold.toFixed(2)}</output>
      </div>

      <p className="threshold-explorer__summary" aria-live="polite">
        <RichText template={t("projects.no2.summary")} values={metrics} />
      </p>

      <MetricBar label={t("projects.no2.metrics.accuracy")} value={metrics.accuracy} />
      <MetricBar label={t("projects.no2.metrics.precision")} value={metrics.precision} />
      <MetricBar label={t("projects.no2.metrics.recall")} value={metrics.recall} />
      <MetricBar label={t("projects.no2.metrics.f1")} value={metrics.f1} highlight />

      <p className="text-muted threshold-explorer__hint">{t("projects.no2.hint")}</p>
    </div>
  );
}
