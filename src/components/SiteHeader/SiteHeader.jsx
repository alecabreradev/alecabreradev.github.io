import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/context.js";
import { PROFILE } from "../../data/profile.js";
import { scrollToTop } from "../../utils/motion.js";
import "./SiteHeader.css";

const NAV_ITEMS = ["about", "projects", "timeline", "contact"];
const COMPACT_AFTER_PX = 24;

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
      <path
        d="M5 11 11 5M6 5h5v5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="7.5" />
        <path d="M2.5 10h15M10 2.5c2.2 2.3 3.2 4.8 3.2 7.5s-1 5.2-3.2 7.5M10 2.5C7.8 4.8 6.8 7.3 6.8 10s1 5.2 3.2 7.5" />
      </g>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="10" cy="10" r="3.6" />
        <path d="M10 1.8v2M10 16.2v2M1.8 10h2M16.2 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" width="17" height="17" aria-hidden="true">
      <path
        d="M16.5 12.6A7 7 0 0 1 7.4 3.5a7 7 0 1 0 9.1 9.1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Which section is on screen, to mark its link in the navigation. */
function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        setActive(ids.find((id) => visible.get(id)) ?? null);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

/** Position of the sliding marker under the active link of the pill. */
function useIndicator(navRef, active, language) {
  const [box, setBox] = useState(null);
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;
    const measure = () => {
      const link = active && nav.querySelector(`[href="#${active}"]`);
      setBox(link ? { left: link.offsetLeft, width: link.offsetWidth } : null);
    };
    measure();
    if (typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [navRef, active, language]);
  return box;
}

/**
 * Desktop: name and role on the left, a floating pill with the sections in the
 * centre (it stays on screen, with a marker sliding to the current section) and
 * LinkedIn/GitHub plus language and theme on the right, which scroll away.
 * Phones: a full-width bar with an "AC" monogram and the sections in a dropdown.
 */
export default function SiteHeader({ theme, onToggleTheme }) {
  const { t, language, toggleLanguage } = useLanguage();
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(NAV_ITEMS);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const menuButtonRef = useRef(null);
  const indicator = useIndicator(navRef, active, language);

  const goTop = (event) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToTop();
  };

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > COMPACT_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the phone menu with Escape or a tap outside it
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onPointer = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={headerRef} data-compact={compact || undefined}>
      <a className="site-header__identity" href="#top" onClick={goTop}>
        <span className="site-header__name">Alejandro Cabrera</span>
        <span className="site-header__role">{t("nav.role")}</span>
      </a>
      <a
        className="site-header__monogram"
        href="#top"
        onClick={goTop}
        aria-label={PROFILE.name}
        title={PROFILE.name}
      >
        AC
      </a>

      {/* Desktop: one floating pill with the sections, then language and theme */}
      <div className="site-header__pill">
        <nav
          id="site-menu"
          ref={navRef}
          className="site-header__nav"
          aria-label={t("nav.label")}
          data-open={menuOpen || undefined}
        >
          {indicator && (
            <span
              className="site-header__indicator"
              aria-hidden="true"
              style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width }}
            />
          )}
          {NAV_ITEMS.map((id) => (
            <a
              key={id}
              className="site-header__link"
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {t(`nav.${id}`)}
            </a>
          ))}
        </nav>
        <div className="site-header__prefs">
          <span className="site-header__divider" aria-hidden="true" />
          <button
            type="button"
            className="icon-button"
            onClick={toggleLanguage}
            aria-label={t("nav.switchLanguage")}
            title={t("nav.switchLanguage")}
          >
            <GlobeIcon />
            <span className="icon-button__text">{language === "es" ? "EN" : "ES"}</span>
          </button>
          <button
            type="button"
            className="icon-button"
            onClick={onToggleTheme}
            aria-label={t("nav.toggleTheme")}
            title={t("nav.toggleTheme")}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>

      <div className="site-header__tools">
        <a
          className="site-header__external"
          href={PROFILE.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn <ExternalIcon />
        </a>
        <a
          className="site-header__external"
          href={PROFILE.links.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <ExternalIcon />
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          className="icon-button site-header__menu-button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={t("nav.menu")}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="burger" data-open={menuOpen || undefined} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  );
}
