import { useState } from "react";
import { useLanguage } from "../../i18n/context.js";
import { PROFILE } from "../../data/profile.js";
import PageStats from "./PageStats.jsx";
import "./SiteFooter.css";

/* Link nodes, top to bottom. `y` is the vertical position (0–100) in the mini network. */
const LINKS = [
  { id: "linkedin", mark: "in", href: PROFILE.links.linkedin, y: 18 },
  { id: "email", mark: "@", href: `mailto:${PROFILE.email}`, y: 50 },
  { id: "github", mark: "gh", href: PROFILE.links.github, y: 82 },
];

const HUB = { x: 10, y: 50 };
const NODE_X = 40;

/** Curve from the hub (my initials) to a link node, in the 0–100 box of the SVG. */
function edgePath(y) {
  const midX = (HUB.x + NODE_X) / 2;
  return `M${HUB.x} ${HUB.y} C${midX} ${HUB.y} ${midX} ${y} ${NODE_X} ${y}`;
}

/**
 * Closing of the page: real numbers about this page (measured in the visitor's browser)
 * and my links drawn as a small network, like the skill network at the top.
 */
export default function SiteFooter() {
  const { t } = useLanguage();
  const [active, setActive] = useState(null);

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__intro">
          <p className="site-footer__name">{PROFILE.name}</p>
          <p className="site-footer__role">{t("footer.role")}</p>
          <PageStats />
        </div>

        <nav
          className="footer-net"
          aria-label={t("footer.networkLabel")}
          data-active={active || undefined}
        >
          <svg
            className="footer-net__edges"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {LINKS.map((link, index) => (
              <g key={link.id} className={active === link.id ? "is-active" : undefined}>
                <path className="footer-net__edge" d={edgePath(link.y)} />
                <path
                  className="footer-net__pulse"
                  d={edgePath(link.y)}
                  pathLength="100"
                  style={{ "--i": index }}
                />
              </g>
            ))}
          </svg>

          <span
            className="footer-net__hub"
            style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
            aria-hidden="true"
          >
            AC
          </span>

          {LINKS.map((link) => {
            const external = !link.href.startsWith("mailto:");
            return (
              <a
                key={link.id}
                className="footer-net__node"
                style={{ left: `${NODE_X}%`, top: `${link.y}%` }}
                href={link.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onPointerEnter={() => setActive(link.id)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(link.id)}
                onBlur={() => setActive(null)}
                data-active={active === link.id || undefined}
              >
                <span className="footer-net__mark" aria-hidden="true">
                  {link.mark}
                </span>
                {t(`footer.links.${link.id}`)}
              </a>
            );
          })}
        </nav>
      </div>
    </footer>
  );
}
