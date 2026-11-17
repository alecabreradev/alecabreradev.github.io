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
