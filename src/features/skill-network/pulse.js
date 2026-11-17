import { areaFlow } from "./layout.js";

const SVG_NS = "http://www.w3.org/2000/svg";
const TRAVEL_MS = 650;
const SECOND_LAYER_DELAY_MS = 620;
const PROJECTS_LIT_FROM_MS = 1150;
const AREA_MS = 2300;

/**
 * Sends signals through the network one area at a time, like a forward pass:
 * from an area to its skills, then from those skills to the projects they power.
 * When an area finishes the next one starts, and after the last it starts over.
 *
 * @param {SVGSVGElement} svg   Network SVG (edges are `path[data-from][data-to]`)
 * @param {SVGGElement} layer   Empty group where the moving dots are drawn
 * @param {string[]} areaIds    Area node ids, in the order they fire
 * @param {object[]} edges      Edges from computeLayout
 * @param {(step: {area: string|null, projects: string[]}) => void} onStep
 *        Called when the active area or the lit projects change
 * @returns {() => void} Function that stops the loop
 */
export function playAreaLoop(svg, layer, areaIds, edges, onStep) {
  const pathFor = new Map(
    [...svg.querySelectorAll("path[data-from]")].map((p) => [
      `${p.dataset.from}>${p.dataset.to}`,
      p,
    ]),
  );

  // Pre-build the dots of every area so each frame only moves them
  const flows = areaIds.map((area) => {
    const { first, second, projects } = areaFlow(area, edges);
    const travellers = [
      ...first.map((edge) => ({ edge, delay: 0 })),
      ...second.map((edge) => ({ edge, delay: SECOND_LAYER_DELAY_MS })),
    ].map(({ edge, delay }) => {
      const path = pathFor.get(`${edge.from}>${edge.to}`);
      return { path, delay, length: path.getTotalLength() };
    });
    return { area, projects, travellers };
  });

  layer.replaceChildren();
  const dots = Array.from({ length: Math.max(...flows.map((f) => f.travellers.length)) }, () => {
    const dot = document.createElementNS(SVG_NS, "circle");
    dot.setAttribute("r", "3.2");
    dot.setAttribute("class", "skill-network__pulse");
    dot.style.opacity = "0";
    layer.appendChild(dot);
    return dot;
  });

  let frame = 0;
  let lastKey = "";
  const start = performance.now();

  const step = (now) => {
    const elapsed = Math.max(0, now - start);
    const index = Math.floor(elapsed / AREA_MS) % flows.length;
    const local = elapsed % AREA_MS;
    const { area, projects, travellers } = flows[index];

    dots.forEach((dot, i) => {
      const traveller = travellers[i];
      const progress = traveller ? (local - traveller.delay) / TRAVEL_MS : -1;
      if (progress < 0 || progress > 1) {
        dot.style.opacity = "0";
        return;
      }
      const eased = 1 - (1 - progress) ** 2;
      const point = traveller.path.getPointAtLength(eased * traveller.length);
      dot.setAttribute("cx", point.x);
      dot.setAttribute("cy", point.y);
      dot.style.opacity = "1";
    });

    const lit = local > PROJECTS_LIT_FROM_MS ? projects : [];
    const key = `${area}|${lit.join(",")}`;
    if (key !== lastKey) {
      lastKey = key;
      onStep({ area, projects: lit });
    }
    frame = requestAnimationFrame(step);
  };

  frame = requestAnimationFrame(step);
  return () => {
    cancelAnimationFrame(frame);
    layer.replaceChildren();
    onStep({ area: null, projects: [] });
  };
}
