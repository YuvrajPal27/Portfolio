
import React from 'react';
import Section from './Section';

export default function About() {
  const skills = [
    'HTML',
    'TAILWIND CSS',
    'JAVASCRIPT',
    'REACT.JS',
    'FIREBASE',
    'PYTHON',
    'ML Basics',
    'GITHUB',
  ];
  return (
    <Section
      id="about"
      title="About"
      subtitle="Quick snapshot of who I am and what I work with."
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <p className="md:col-span-2 leading-7">
          As a Computer Science graduate with web development internship
          experience, I'm now channeling my curiosity into AI/ML. I thrive on
          building visually appealing interfaces with clean code architecture
          while continuously expanding my knowledge in emerging technologies.
        </p>
        <div className="md:col-span-1">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide muted">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="chip rounded-full px-3 py-1 text-xs font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
