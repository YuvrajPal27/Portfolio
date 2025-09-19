import React from 'react';

export default function Section({ id, title, subtitle, children }) {
  return (
    <section
      id={id}
      className="relative z-10 mx-auto max-w-6xl scroll-mt-24 px-4 py-24 md:px-6"
    >
      <h2 className="mb-3 text-2xl section-title md:text-3xl">{title}</h2>
      {subtitle && <p className="mb-8 max-w-2xl muted">{subtitle}</p>}
      {children}
    </section>
  );
}
