import { describe, expect, it } from "vitest";
import { CATEGORIES, CONTEXTS, TOOLS, countByContext, filterTools } from "./toolkit.js";

describe("toolkit data", () => {
  it("every tool has a unique id, a known category and at least one known context", () => {
    expect(new Set(TOOLS.map((tool) => tool.id)).size).toBe(TOOLS.length);
    for (const tool of TOOLS) {
      expect(CATEGORIES).toContain(tool.category);
      expect(tool.contexts.length).toBeGreaterThan(0);
      for (const context of tool.contexts) expect(CONTEXTS).toContain(context);
    }
  });
});

describe("filterTools", () => {
  it("keeps everything for 'all'", () => {
    expect(filterTools(TOOLS, "all")).toHaveLength(TOOLS.length);
  });

  it("keeps only the chosen category", () => {
    const ai = filterTools(TOOLS, "ai");
    expect(ai.length).toBeGreaterThan(0);
    expect(ai.every((tool) => tool.category === "ai")).toBe(true);
  });
});

describe("countByContext", () => {
  it("counts the tools used in each context", () => {
    const tools = [{ contexts: ["a", "b"] }, { contexts: ["a"] }];
    expect(countByContext(tools, ["a", "b", "c"])).toEqual({ a: 2, b: 1, c: 0 });
  });
});
