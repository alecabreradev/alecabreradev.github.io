/** True when the visitor asked the system to reduce motion. */
export function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/** Scrolls to an element, without animation when reduced motion is requested. */
export function scrollToId(id) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
}

/**
 * Smoothly scrolls the window back to the very top with an ease-in-out curve.
 * The duration grows with the distance (up to ~1 s) so long pages don't feel like a jump.
 */
export function scrollToTop() {
  const start = window.scrollY;
  if (start <= 0) return;
  if (prefersReducedMotion()) {
    window.scrollTo(0, 0);
    return;
  }
  // Native smooth scrolling on <html> would fight the animation, so switch it off meanwhile
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  const duration = Math.min(1000, 450 + start / 8);
  const begin = performance.now();
  const ease = (x) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2);
  const step = (now) => {
    const progress = Math.min(1, (now - begin) / duration);
    window.scrollTo(0, Math.round(start * (1 - ease(progress))));
    if (progress < 1) requestAnimationFrame(step);
    else root.style.scrollBehavior = previous;
  };
  requestAnimationFrame(step);
}
