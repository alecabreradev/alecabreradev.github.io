/**
 * Computes the positions of a three-column network (areas → skills → projects)
 * for a given width. Pure function: text widths come from `measureText`, so it
 * can be tested without a browser.
 *
 * @param {object} params
 * @param {number} params.width            Available width in px
 * @param {string[]} params.areas          Area ids
 * @param {{name: string, areas: string[], projects: string[]}[]} params.skills
 * @param {string[]} params.projects       Project ids
 * @param {(id: string, narrow: boolean) => string} params.areaLabel
 * @param {(id: string, narrow: boolean) => string} params.projectLabel
 * @param {(text: string, fontSize: number) => number} params.measureText
 */
export function computeLayout({
  width,
  areas,
  skills,
  projects,
  areaLabel,
  projectLabel,
  measureText,
}) {
  const narrow = width < 620;
  const fontSize = narrow ? 11.5 : 13.5;
  const pillHeight = narrow ? 22 : 26;
  const rowGap = narrow ? 5 : 7;
  const paddingX = narrow ? 8 : 12;
  const pillWidth = (label) => Math.ceil(measureText(label, fontSize)) + 2 * paddingX;

  const areaLabels = areas.map((id) => areaLabel(id, narrow));
  const skillLabels = skills.map((skill) => skill.name);
  const projectLabels = projects.map((id) => projectLabel(id, narrow));

  const areaWidth = Math.max(...areaLabels.map(pillWidth));
  const skillWidth = Math.max(...skillLabels.map(pillWidth));
  const projectWidth = Math.max(...projectLabels.map(pillWidth));

  const columnGap = Math.max(24, (width - areaWidth - skillWidth - projectWidth) / 2);
  const skillX = areaWidth + columnGap;
  const projectX = skillX + skillWidth + columnGap;
  const top = 4;
  const height = top * 2 + skills.length * (pillHeight + rowGap) - rowGap;

  const skillY = skills.map((_, i) => top + i * (pillHeight + rowGap) + pillHeight / 2);
  // Each area sits at the average height of the skills listed first under it
  const areaY = areas.map((id) => {
    const ys = skills.flatMap((skill, i) => (skill.areas[0] === id ? [skillY[i]] : []));
    return ys.length ? ys.reduce((sum, y) => sum + y, 0) / ys.length : height / 2;
  });
  const projectY = projects.map((_, i) => (height * (2 * i + 1)) / (2 * projects.length));

  const nodes = [
    ...areas.map((id, i) => ({
      id: `area:${id}`,
      kind: "area",
      x: 0,
      y: areaY[i],
      width: areaWidth,
      label: areaLabels[i],
    })),
    ...skills.map((skill, i) => ({
      id: `skill:${i}`,
      kind: "skill",
      x: skillX,
      y: skillY[i],
      width: skillWidth,
      label: skillLabels[i],
    })),
    ...projects.map((id, i) => ({
      id: `project:${id}`,
      kind: "project",
      x: projectX,
      y: projectY[i],
      width: projectWidth,
      label: projectLabels[i],
    })),
  ];

  const curve = (x1, y1, x2, y2) => {
    const midX = (x1 + x2) / 2;
    return `M${x1} ${y1}C${midX} ${y1},${midX} ${y2},${x2} ${y2}`;
  };

  const edges = skills.flatMap((skill, i) => [
    ...skill.areas.map((areaId) => {
      const a = areas.indexOf(areaId);
      return {
        from: `area:${areaId}`,
        to: `skill:${i}`,
        layer: 1,
        path: curve(areaWidth, areaY[a], skillX, skillY[i]),
      };
    }),
    ...skill.projects.map((projectId) => {
      const p = projects.indexOf(projectId);
      return {
        from: `skill:${i}`,
        to: `project:${projectId}`,
        layer: 2,
        path: curve(skillX + skillWidth, skillY[i], projectX, projectY[p]),
      };
    }),
  ]);

  return { nodes, edges, height, pillHeight, fontSize };
}

/**
 * Returns every node connected to `nodeId`, following edges both forwards
 * (towards projects) and backwards (towards areas).
 */
export function connectedNodes(nodeId, edges) {
  const found = new Set([nodeId]);
  const walk = (forward) => {
    const pending = [nodeId];
    while (pending.length) {
      const current = pending.pop();
      for (const edge of edges) {
        const [source, target] = forward ? [edge.from, edge.to] : [edge.to, edge.from];
        if (source === current && !found.has(target)) {
          found.add(target);
          pending.push(target);
        }
      }
    }
  };
  walk(true);
  walk(false);
  return found;
}
