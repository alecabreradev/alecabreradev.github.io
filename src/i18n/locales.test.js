import { describe, expect, it } from "vitest";
import es from "./locales/es.js";
import en from "./locales/en.js";

/** Lists every key path of a nested object, e.g. "nav.about" or "about.paragraphs.0". */
function keyPaths(node, prefix = "") {
  if (node === null || typeof node !== "object") return [prefix];
  return Object.entries(node).flatMap(([key, value]) =>
    keyPaths(value, prefix ? `${prefix}.${key}` : key),
  );
}

describe("locales", () => {
  it("Spanish and English have exactly the same keys", () => {
    expect(keyPaths(en).sort()).toEqual(keyPaths(es).sort());
  });

  it("no text is empty", () => {
    for (const locale of [es, en]) {
      const texts = keyPaths(locale).map((path) => path.split(".").reduce((n, k) => n[k], locale));
      expect(texts.filter((text) => text === "")).toEqual([]);
    }
  });
});
