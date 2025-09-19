
import React from 'react';
import { Mail, Moon, Sun } from 'lucide-react';
import { useTheme } from './Theme';

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar({ sections, active }) {
  const { dark, setDark } = useTheme();
  return (
    <nav className="fixed inset-x-0 top-0 z-40 nav-shadow">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <button
          onClick={() => scrollToId('home')}
          className="font-semibold tracking-tight"
        >
          YUVRAJ
        </button>
        <div className="flex items-center gap-2 md:gap-6">
          <ul className="hidden items-center gap-1 md:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => scrollToId(s.id)}
                  className={`px-3 py-2 text-sm font-medium transition hover:opacity-80 ${
                    active === s.id ? '' : 'muted'
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
            className="bdr glass rounded-2xl p-2 shadow-sm transition hover:scale-105"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
