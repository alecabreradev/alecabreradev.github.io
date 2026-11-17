/**
 * Classification metrics for a decision threshold.
 *
 * @param {{probability: number, high: boolean}[]} days
 * @param {number} threshold  A day is flagged as high when probability >= threshold
 */
export function metricsAtThreshold(days, threshold) {
  let truePositives = 0;
  let falsePositives = 0;
  let falseNegatives = 0;
  let trueNegatives = 0;

  for (const { probability, high } of days) {
    const flagged = probability >= threshold;
    if (high && flagged) truePositives++;
    else if (high) falseNegatives++;
    else if (flagged) falsePositives++;
    else trueNegatives++;
  }

  const precision =
    truePositives + falsePositives ? truePositives / (truePositives + falsePositives) : 0;
  const recall =
    truePositives + falseNegatives ? truePositives / (truePositives + falseNegatives) : 0;
  const f1 = precision + recall ? (2 * precision * recall) / (precision + recall) : 0;

  return {
    alerts: truePositives + falsePositives,
    caught: truePositives,
    highDays: truePositives + falseNegatives,
    accuracy: days.length ? (truePositives + trueNegatives) / days.length : 0,
    precision,
    recall,
    f1,
  };
}
