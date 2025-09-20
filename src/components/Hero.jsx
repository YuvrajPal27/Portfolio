
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import ME1 from '../assets/ME1.jpg';
import { MouseBlob } from './MouseBlob';

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Hero() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      id="home"
      ref={targetRef}
      className="relative z-30 flex min-h-screen items-center justify-center overflow-hidden px-4"
    >
      <MouseBlob />
      <motion.div
        style={{ y, scale }}
        className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2"
      >
        <div className="order-2 md:order-1">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full chip px-3 py-1 text-xs font-medium backdrop-blur">
            <span
              className="inline-block h-2 w-2 animate-pulse rounded-full"
              style={{ backgroundColor: '#10b981' }}
            />
            Open to work
          </p>
          <h1 className="mb-4 text-4xl title md:text-6xl">
            Hi, I'm{' '}
            <span
              style={{
                backgroundImage: `linear-gradient(90deg, var(--accent-1), var(--accent-2), var(--accent-3))`,
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Yuvraj
            </span>{' '}
            👋
          </h1>
          <p className="mb-6 max-w-xl muted">
            CSE Graduate building clean UIs and smart features. I
            love React, Tailwind, and shipping fast. Here's what I've been
            hacking on lately.
          </p>
          <div className="flex gap-3">
            <a
              href="https://drive.google.com/file/d/1XaWJILgLw8ZXfqDXCF90ghOmTRVX2SYh/view?usp=sharing"
              className="btn btn-primary inline-flex items-center gap-2"
            >
              View Resume <ArrowUpRight size={16} />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('contact');
              }}
              className="btn btn-secondary inline-flex items-center gap-2"
            >
              Contact <Mail size={16} />
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <a
              className="group inline-flex items-center gap-2"
              href="https://github.com/YuvrajPal27"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={18} className="transition group-hover:scale-110" />{' '}
              GitHub
            </a>
            <a
              className="group inline-flex items-center gap-2"
              href="https://www.linkedin.com/in/yuvrajpal27724/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin
                size={18}
                className="transition group-hover:scale-110"
              />{' '}
              LinkedIn
            </a>
          </div>
        </div>
        <div className="relative order-1 pb-10 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto aspect-square w-64 overflow-hidden rounded-3xl card p-2 shadow-2xl backdrop-blur md:w-80"
          >
            <img
              src={ME1}
              alt="Your Name"
              className="h-full w-full rounded-2xl object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(56,189,248,0.25), transparent 40%), radial-gradient(circle at 70% 60%, rgba(168,85,247,0.25), transparent 35%)',
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -bottom-2 left-1/2 w-56 -translate-x-1/2 rounded-2xl card p-3 text-center text-sm shadow-xl backdrop-blur md:w-64"
          >
            <p className="font-semibold">Front-end Developer</p>
            <p className="muted">React • Tailwind • Framer Motion</p>
          </motion.div>
        </div>
      </motion.div>
      <button
        onClick={() => scrollToId('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full surface p-2 shadow-sm backdrop-blur transition hover:-translate-y-0.5"
        aria-label="Scroll to about"
      >
        <ChevronDown />
      </button>
    </section>
  );
}
