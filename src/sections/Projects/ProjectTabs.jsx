import { useRef } from "react";

/**
 * Accessible tab list (WAI-ARIA tabs pattern): arrow keys move between tabs,
 * Home/End jump to the first and last one.
 */
export default function ProjectTabs({ label, tabs, selectedId, onSelect }) {
  const buttons = useRef([]);

  const onKeyDown = (event, index) => {
    const last = tabs.length - 1;
    const next = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    onSelect(tabs[next].id);
    buttons.current[next]?.focus();
  };

  return (
    <div className="project-tabs" role="tablist" aria-label={label}>
      {tabs.map((tab, index) => {
        const selected = tab.id === selectedId;
        return (
          <button
            key={tab.id}
            ref={(element) => (buttons.current[index] = element)}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(tab.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
