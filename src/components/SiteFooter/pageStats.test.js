import { describe, expect, it } from "vitest";
import { formatBytes, measurePage, timeAgo } from "./pageStats.js";

const fakePerformance = (navigation, resources = []) => ({
  getEntriesByType: (type) => (type === "navigation" ? [navigation] : resources),
});

describe("measurePage", () => {
  it("adds the page and its resources and reads the load time", () => {
    const perf = fakePerformance({ startTime: 0, loadEventEnd: 412.6, transferSize: 2000 }, [
      { transferSize: 60000 },
      { transferSize: 0, encodedBodySize: 8000 },
    ]);
    expect(measurePage(perf)).toEqual({ loadMs: 413, bytes: 70000 });
  });

  it("returns null while the page has not finished loading", () => {
    expect(measurePage(fakePerformance({ startTime: 0, loadEventEnd: 0 }))).toBeNull();
    expect(measurePage(undefined)).toBeNull();
  });
});

describe("formatBytes", () => {
  it("uses KB below one megabyte and MB above", () => {
    expect(formatBytes(98304)).toBe("96 KB");
    expect(formatBytes(1572864)).toBe("1.5 MB");
    expect(formatBytes(1572864, "es")).toBe("1,5 MB");
  });
});

describe("timeAgo", () => {
  it("describes how long ago the site was deployed", () => {
    const now = 10 * 86_400_000;
    expect(timeAgo(now - 3 * 3_600_000, now, "en")).toBe("3 hours ago");
    expect(timeAgo(now - 2 * 86_400_000, now, "es")).toBe("anteayer");
    expect(timeAgo(now - 20_000, now, "en")).toBe("this minute");
  });
});
