import { describe, expect, it } from "vitest";
import { areaFlow, computeLayout, connectedNodes } from "./layout.js";

const input = {
  areas: ["web", "ai"],
  skills: [
    { name: "React", areas: ["web"], projects: ["site"] },
    { name: "Python", areas: ["ai"], projects: ["model"] },
    { name: "Docker", areas: ["web"], projects: [] },
  ],
  projects: ["site", "model"],
  areaLabel: (id) => id,
  projectLabel: (id) => id,
  measureText: (text) => text.length * 7,
};

describe("computeLayout", () => {
  it("creates one node per area, skill and project", () => {
    const { nodes } = computeLayout({ ...input, width: 800 });
    expect(nodes.map((n) => n.kind)).toEqual([
      "area",
      "area",
      "skill",
      "skill",
      "skill",
      "project",
      "project",
    ]);
  });

  it("creates an edge for every area and project link", () => {
    const { edges } = computeLayout({ ...input, width: 800 });
    expect(edges).toHaveLength(5);
  });

  it("keeps every node inside the available width", () => {
    const { nodes } = computeLayout({ ...input, width: 360 });
    for (const node of nodes) expect(node.x + node.width).toBeLessThanOrEqual(360);
  });
});

describe("connectedNodes", () => {
  const { edges } = computeLayout({ ...input, width: 800 });

  it("from a project, reaches its skills and their areas", () => {
    expect([...connectedNodes("project:site", edges)].sort()).toEqual([
      "area:web",
      "project:site",
      "skill:0",
    ]);
  });

  it("from an area, reaches its skills and their projects", () => {
    expect(connectedNodes("area:web", edges)).toEqual(
      new Set(["area:web", "skill:0", "skill:2", "project:site"]),
    );
  });
});

describe("areaFlow", () => {
  it("follows one area to its skills and from them to their projects", () => {
    const { edges } = computeLayout({ ...input, width: 800 });
    const flow = areaFlow("area:web", edges);
    expect(flow.first.map((e) => e.to)).toEqual(["skill:0", "skill:2"]);
    expect(flow.second.map((e) => `${e.from}>${e.to}`)).toEqual(["skill:0>project:site"]);
    expect(flow.projects).toEqual(["project:site"]);
  });
});
