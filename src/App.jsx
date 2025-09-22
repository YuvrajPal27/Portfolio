import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Awards from './components/Awards';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import { ThemeStyles, useTheme } from './components/Theme';

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0.1 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

export default function App() {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'awards', label: 'Awards' },
    { id: 'contact', label: 'Contact' },
  ];
  const active = useActiveSection(sections.map((s) => s.id));
  const containerRef = useRef(null);

  // Visual scroll progress bar top
  const { scrollYProgress } = useScroll({
    container: containerRef
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.2,
  });

  // Track pointer for card glow
  useEffect(() => {
    const onMove = (e) => {
      document.querySelectorAll('article').forEach((el) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--x', `${e.clientX - rect.left}px`);
        el.style.setProperty('--y', `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen overflow-y-auto">
      <ThemeStyles />
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left"
        aria-hidden
      >
        <div
          style={{
            height: '100%',
            backgroundImage:
              'linear-gradient(90deg, var(--accent-1), var(--accent-2), var(--accent-3))',
          }}
        />
      </motion.div>
      <Navbar sections={sections} active={active} />

      {/* Hero */}
      <Hero />

      {/* About */}
      <About />

      {/* Experience */}
      <Experience />



      {/* Projects */}
      <Projects />

      {/* Awards */}
      <Awards />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Back to top button */}
      <BackToTop containerRef={containerRef} />
    </div>
  );
}
