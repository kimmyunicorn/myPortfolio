import { useEffect } from 'react';
import Hero from '../components/hero/Hero.jsx';
import About from '../components/about/About.jsx';
import Experience from '../components/experience/Experience.jsx';
import Projects from '../components/projects/Projects.jsx';
import Skills from '../components/skills/Skills.jsx';

export default function Home() {
  // Honour a #hash on first load or when returning from a case study.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);

  return (
    <main id="main">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
    </main>
  );
}
