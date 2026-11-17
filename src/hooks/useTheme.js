import { useEffect, useState } from "react";

const DARK_QUERY = "(prefers-color-scheme: dark)";

/**
 * Light/dark theme. Until the visitor chooses, the page follows the system setting
 * (handled in CSS); after that, data-theme on <html> takes over.
 * Returns the effective theme so canvas drawings can redraw when it changes.
 */
export default function useTheme() {
  const [choice, setChoice] = useState(null);
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia?.(DARK_QUERY).matches ?? false,
  );

  useEffect(() => {
    const media = window.matchMedia?.(DARK_QUERY);
    if (!media) return undefined;
    const onChange = (event) => setSystemDark(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (choice) document.documentElement.dataset.theme = choice;
  }, [choice]);

  const theme = choice ?? (systemDark ? "dark" : "light");
  const toggleTheme = () => setChoice(theme === "dark" ? "light" : "dark");

  return { theme, toggleTheme };
}
