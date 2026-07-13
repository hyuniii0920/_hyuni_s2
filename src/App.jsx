import { useEffect, useRef, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Career from './components/Career';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (selectedProject) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
    }
  }, [selectedProject]);

  const handleSelectProject = (project) => {
    scrollPositionRef.current = window.scrollY;
    setSelectedProject(project);
  };

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />;
  }

  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Career onSelectProject={handleSelectProject} />
      <Projects onSelectProject={handleSelectProject} />
      <Footer />
    </>
  );
}
