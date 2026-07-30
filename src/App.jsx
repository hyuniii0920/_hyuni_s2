import { useCallback, useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Career from './components/Career';
import Projects, { featured } from './components/Projects';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import Onboarding from './components/Onboarding';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isOnboardingDone, setIsOnboardingDone] = useState(false);
  const [isHeroRevealing, setIsHeroRevealing] = useState(false);
  const captureId = Number(new URLSearchParams(window.location.search).get('capture'));
  const captureProject = featured.find((p) => p.id === captureId);
  const handleOnboardingExitStart = useCallback(() => setIsHeroRevealing(true), []);
  const handleOnboardingComplete = useCallback(() => setIsOnboardingDone(true), []);

  useEffect(() => {
    document.body.style.overflow = selectedProject || !isOnboardingDone ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOnboardingDone, selectedProject]);

  if (captureProject) {
    return (
      <>
        <style>{`
          [class*="_overlay_"] { position: static !important; padding: 0 !important; background: var(--bg-primary) !important; display: block !important; }
          [class*="_page_"] { max-height: none !important; overflow: visible !important; border: 0 !important; border-radius: 0 !important; margin: 0 auto !important; }
        `}</style>
        <ProjectDetail project={captureProject} onClose={() => {}} />
      </>
    );
  }

  return (
    <>
      {!isOnboardingDone && (
        <Onboarding
          onExitStart={handleOnboardingExitStart}
          onComplete={handleOnboardingComplete}
        />
      )}
      <Nav />
      <Hero isReady={isHeroRevealing} />
      <About />
      <Career onSelectProject={setSelectedProject} />
      <Projects onSelectProject={setSelectedProject} />
      <Footer />
      {selectedProject && (
        <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}
