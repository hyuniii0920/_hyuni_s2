import { useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Career from './components/Career';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />;
  }

  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Career onSelectProject={setSelectedProject} />
      <Projects onSelectProject={setSelectedProject} />
      <Footer />
    </>
  );
}
