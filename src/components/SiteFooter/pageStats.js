/*
 * Real numbers about this page for the footer, measured in the visitor's browser
 * with the Performance API (nothing is invented or hard-coded).
 */

/** Load time (ms) and downloaded size (bytes) from the Performance API, or null if unknown. */
export function measurePage(perf) {
  const navigation = perf?.getEntriesByType?.("navigation")?.[0];
  if (!navigation || !navigation.loadEventEnd) return null;
  const resources = perf.getEntriesByType("resource");
  const bytes = [navigation, ...resources].reduce(
    (sum, entry) => sum + (entry.transferSize || entry.encodedBodySize || 0),
    0,
  );
  return {
    loadMs: Math.round(navigation.loadEventEnd - navigation.startTime),
    bytes,
  };
}

/** 98304 → "96 KB", 1572864 → "1.5 MB" (decimal separator follows the language). */
export function formatBytes(bytes, language = "en") {
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.max(1, Math.round(kb))} KB`;
  return `${(kb / 1024).toLocaleString(language, { maximumFractionDigits: 1 })} MB`;
}

const UNITS = [
  ["day", 86_400_000],
  ["hour", 3_600_000],
  ["minute", 60_000],
];

/** "hace 3 horas" / "3 hours ago" from a timestamp, without showing a date or year. */
export function timeAgo(timestamp, now, language = "en") {
  const elapsed = Math.max(0, now - timestamp);
  const format = new Intl.RelativeTimeFormat(language, { numeric: "auto" });
  for (const [unit, size] of UNITS) {
    if (elapsed >= size) return format.format(-Math.floor(elapsed / size), unit);
  }
  return format.format(0, "minute");
}
