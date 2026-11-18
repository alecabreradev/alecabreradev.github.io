import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../i18n/context.js";
import { PROFILE } from "../../data/profile.js";
import "./SiteHeader.css";

const NAV_ITEMS = ["about", "projects", "timeline", "contact"];
const COMPACT_AFTER_PX = 24;

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

/**
 * Header: discreet on desktop (muted links, icon buttons, compact once you scroll)
 * and a dropdown menu on phones so the hero stays the first thing you see.
 */
export default function SiteHeader({ theme, onToggleTheme }) {
  const { t, language, toggleLanguage } = useLanguage();
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(NAV_ITEMS);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);

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
      <a className="site-header__brand" href="#top">
        {PROFILE.name}
      </a>

      <nav
        id="site-menu"
        className="site-header__nav"
        aria-label={t("nav.label")}
        data-open={menuOpen || undefined}
      >
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

      <div className="site-header__tools">
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
