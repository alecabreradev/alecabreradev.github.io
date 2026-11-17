import { useState } from "react";
import useTheme from "./hooks/useTheme.js";
import { PROJECTS } from "./data/profile.js";
import { scrollToId } from "./utils/motion.js";
import SiteHeader from "./components/SiteHeader/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter/SiteFooter.jsx";
import Hero from "./sections/Hero/Hero.jsx";
import About from "./sections/About/About.jsx";
import Projects from "./sections/Projects/Projects.jsx";
import Timeline from "./sections/Timeline/Timeline.jsx";
import Contact from "./sections/Contact/Contact.jsx";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [projectId, setProjectId] = useState(PROJECTS[0].id);

  // Clicking a project in the skill network opens its tab and scrolls to it
  const openProject = (id) => {
    setProjectId(id);
    scrollToId("projects");
  };

  return (
    <div className="container">
      <SiteHeader onToggleTheme={toggleTheme} />
      <main id="top">
        <Hero onOpenProject={openProject} />
        <About />
        <Projects selectedId={projectId} onSelect={setProjectId} theme={theme} />
        <Timeline />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
