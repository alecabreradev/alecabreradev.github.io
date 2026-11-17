import { describe, expect, it } from "vitest";
import { metricsAtThreshold } from "./metrics.js";
import results from "../../data/no2-results.json";

const days = [
  { probability: 0.9, high: true }, // true positive
  { probability: 0.6, high: false }, // false positive
  { probability: 0.2, high: true }, // false negative
  { probability: 0.1, high: false }, // true negative
];

describe("metricsAtThreshold", () => {
  it("counts the confusion matrix correctly", () => {
    const m = metricsAtThreshold(days, 0.5);
    expect(m).toMatchObject({ alerts: 2, caught: 1, highDays: 2 });
    expect(m.accuracy).toBe(0.5);
    expect(m.precision).toBe(0.5);
    expect(m.recall).toBe(0.5);
    expect(m.f1).toBe(0.5);
  });

  it("returns zeros instead of dividing by zero", () => {
    const m = metricsAtThreshold([{ probability: 0.1, high: false }], 0.9);
    expect(m.precision).toBe(0);
    expect(m.recall).toBe(0);
    expect(m.f1).toBe(0);
  });

  it("matches the notebook results at the chosen threshold", () => {
    const m = metricsAtThreshold(results.days, results.decisionThreshold);
    expect(m.caught).toBe(11);
    expect(m.highDays).toBe(14);
    expect(m.alerts).toBe(20);
  });
});
