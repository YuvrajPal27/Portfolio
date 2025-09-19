import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-10 px-4 py-10 text-center text-sm muted">
      <p>
        © {new Date().getFullYear()} Yuvi — Built with React, Tailwind, and way
        too much coffee ☕
      </p>
    </footer>
  );
}
