import { useEffect, useState } from 'react';

export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('theme-dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('theme-dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return { dark, setDark };
}

export function ThemeStyles() {
  const css = `
    :root {
      --bg: #ffffff;
      --bg-2: #fafafa;
      --fg: #0b0b10;
      --muted: #5e6272;
      --border: rgba(0,0,0,0.12);
      --card: rgba(255,255,255,0.72);
      --surface: #ffffff;
      --chip-bg: rgba(255,255,255,0.65);
      --glass: rgba(255,255,255,0.6);
      --accent-1: #38bdf8; /* sky-400 */
      --accent-2: #a855f7; /* violet-500 */
      --accent-3: #6366f1; /* indigo-500 */
    }

    .theme-dark {
      --bg: #0a0a0b;
      --bg-2: #0e0f13;
      --fg: #e5e7eb;
      --muted: #a3a7b1;
      --border: rgba(255,255,255,0.14);
      --card: rgba(20,20,24,0.62);
      --surface: #0b0c10;
      --chip-bg: rgba(20,20,24,0.6);
      --glass: rgba(10,10,12,0.4);
    }

    html, body { height: 100%; }
    body {
      background: linear-gradient(to bottom, var(--bg), var(--bg-2));
      color: var(--fg);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      transition: background-color .3s ease, color .2s ease;
    }

    /* Utilities built on CSS vars */
    .glass { backdrop-filter: saturate(180%) blur(10px); background: var(--glass); }
    .card { background: var(--card); border: 1px solid var(--border); }
    .surface { background: var(--surface); border: 1px solid var(--border); }
    .chip { background: var(--chip-bg); border: 1px solid var(--border); color: var(--muted); }
    .muted { color: var(--muted); }
    .bdr { border: 1px solid var(--border); }
    .nav-shadow { box-shadow: 0 1px 0 0 var(--border); }

    .btn { border: 1px solid var(--border); border-radius: 1rem; padding: .5rem .75rem; font-weight: 600; }
    .btn:hover { transform: translateY(-1px); transition: transform .15s ease; }
    .btn-primary { background: #0b0b10; color: #ffffff; }
    .theme-dark .btn-primary { background: #ffffff; color: #0b0b10; }
    .btn-secondary { background: var(--surface); color: var(--fg); }

    .title { font-weight: 800; letter-spacing: -0.02em; }
    .section-title { font-weight: 700; }

    /* Smooth theme transitions for common elements */
    .soft-transition, .card, .surface, .chip { transition: background-color .3s ease, border-color .3s ease, color .2s ease; }

    /* Custom animations */
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .float { animation: float 6s ease-in-out infinite; }

    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    .shimmer {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }
  `;
  return <style>{css}</style>;
}
