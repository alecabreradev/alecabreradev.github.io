import results from "../../data/no2-results.json";
import { useLanguage } from "../../i18n/context.js";
import "./No2Demo.css";

/** PR-AUC of each model on the test period, as horizontal bars. */
export default function ModelComparison() {
  const { t } = useLanguage();
  return (
    <figure className="model-comparison">
      <figcaption className="text-muted">{t("projects.no2.prAucCaption")}</figcaption>
      {results.prAuc.map(({ model, value, best }) => (
        <div key={model} className={`model-comparison__row${best ? " is-best" : ""}`}>
          <span>{model === "persistence" ? t("projects.no2.persistence") : model}</span>
          <span className="model-comparison__track" aria-hidden="true">
            <span
              className="model-comparison__fill"
              style={{ width: `${Math.round(value * 100)}%` }}
            />
          </span>
          <span className="model-comparison__value">{value.toFixed(2)}</span>
        </div>
      ))}
    </figure>
  );
}
