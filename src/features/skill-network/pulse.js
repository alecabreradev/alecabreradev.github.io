const SVG_NS = "http://www.w3.org/2000/svg";
const TRAVEL_MS = 650;
const SECOND_LAYER_DELAY_MS = 620;
const PROJECTS_LIT_FROM_MS = 1200;
const TOTAL_MS = 1900;

/**
 * Animates small dots along the network's edges, first from areas to skills
 * and then from skills to projects, like a forward pass through a neural network.
 *
 * @param {SVGSVGElement} svg       Network SVG (edges are `path[data-layer]`)
 * @param {SVGGElement} layer       Empty group where the dots are drawn
 * @param {(lit: boolean) => void} onProjectsLit  Called when projects should glow
 * @returns {() => void} Function that stops the animation
 */
export function playPulse(svg, layer, onProjectsLit) {
  layer.replaceChildren();
  const travellers = [...svg.querySelectorAll("path[data-layer]")].map((path) => {
    const dot = document.createElementNS(SVG_NS, "circle");
    dot.setAttribute("r", "3.2");
    dot.setAttribute("class", "skill-network__pulse");
    dot.style.opacity = "0";
    layer.appendChild(dot);
    return {
      path,
      dot,
      length: path.getTotalLength(),
      delay: path.dataset.layer === "1" ? 0 : SECOND_LAYER_DELAY_MS,
    };
  });

  let frame = 0;
  const start = performance.now();

  const step = (now) => {
    const elapsed = now - start;
    for (const { path, dot, length, delay } of travellers) {
      const progress = (elapsed - delay) / TRAVEL_MS;
      if (progress < 0 || progress > 1) {
        dot.style.opacity = "0";
        continue;
      }
      const eased = 1 - (1 - progress) ** 2;
      const point = path.getPointAtLength(eased * length);
      dot.setAttribute("cx", point.x);
      dot.setAttribute("cy", point.y);
      dot.style.opacity = "1";
    }
    onProjectsLit(elapsed > PROJECTS_LIT_FROM_MS && elapsed < TOTAL_MS);
    if (elapsed < TOTAL_MS) frame = requestAnimationFrame(step);
    else layer.replaceChildren();
  };

  frame = requestAnimationFrame(step);
  return () => {
    cancelAnimationFrame(frame);
    layer.replaceChildren();
    onProjectsLit(false);
  };
}
