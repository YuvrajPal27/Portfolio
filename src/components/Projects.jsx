import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import Section from './Section';

export default function Projects() {
  const projects = useMemo(
    () => [
      {
        title: 'Campus Connect Dashboard',
        desc: 'A clean Firebase-backed dashboard for universities with analytics and role-based views.',
        tags: ['React', 'Firebase', 'Tailwind'],
        href: '#',
        repo: '#',
      },
      {
        title: 'AI Resume Ranker',
        desc: 'Ranks resumes using simple NLP scoring; built fast to help shortlisting.',
        tags: ['Python', 'NLP', 'Flask'],
        href: '#',
        repo: '#',
      },
      {
        title: 'Virtual-R',
        desc: 'Pushing web boundaries with React, 3D visuals, and Tailwind elegance.',
        tags: ['REACT.JS', 'TAILWIND CSS'],
        href: 'https://virutal-r.vercel.app/',
        repo: 'https://github.com/YuvrajPal27/VirutalR',
      },
      {
        title: 'Portfolio',
        desc: 'This site — built with slick scroll, motion, and clean components.',
        tags: ['React', 'Framer Motion', 'Tailwind'],
        href: '#',
        repo: 'https://github.com/YuvrajPal27/Portfolio',
      },
    ],
    []
  );

  return (
    <Section
      id="projects"
      title="Selected Works"
      subtitle="Here are some of my favorite projects that I've worked on."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-3xl card p-5 shadow-sm backdrop-blur transition hover:shadow-md"
          >
            <div
              className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  'radial-gradient(400px circle at var(--x,50%) var(--y,50%), rgba(99,102,241,0.15), transparent 60%)',
              }}
            />
            <h3 className="mb-1 text-lg font-semibold">{p.title}</h3>
            <p className="mb-3 text-sm muted">{p.desc}</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="chip rounded-full px-2 py-0.5 text-[11px] font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a
                href={p.href}
                className="inline-flex items-center gap-1 text-sm font-semibold"
              >
                Live <ArrowUpRight size={16} />
              </a>
              <a
                href={p.repo}
                className="inline-flex items-center gap-1 text-sm font-semibold muted"
              >
                Code <Github size={16} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
