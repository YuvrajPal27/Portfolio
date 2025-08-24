import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Github,   // Use lowercase 'Github'
  Linkedin,
  Mail,
  Moon,
  Sun,
  ArrowUpRight,
  ChevronDown,
  Cpu,
  Zap,
  Brain,
  Cloud,
  Award,
  Trophy,
  Medal,
  Star,
  Calendar,
  MapPin,
  Briefcase,
} from "lucide-react";

// =====================
// THEME (Custom, no Tailwind dark:)
// =====================
function ThemeStyles() {
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

function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("theme-dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("theme-dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return { dark, setDark };
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.1 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ===== Decorative Mouse-Follow Blob
function MouseBlob() {
  const blobRef = useRef(null);
  useEffect(() => {
    const onMove = (e) => {
      const blob = blobRef.current;
      if (!blob) return;
      const x = e.clientX - blob.offsetWidth / 2;
      const y = e.clientY - blob.offsetHeight / 2;
      blob.animate(
        { transform: `translate(${x}px, ${y}px)` },
        {
          duration: 800,
          fill: "forwards",
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        }
      );
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={blobRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-72 w-72 rounded-full opacity-30 blur-3xl transition"
      style={{
        background:
          "radial-gradient(600px circle at center, rgba(56,189,248,0.35), rgba(168,85,247,0.28), rgba(99,102,241,0.25), transparent 60%)",
      }}
    />
  );
}

// ===== Nav
function Navbar({ sections, active }) {
  const { dark, setDark } = useTheme();
  return (
    <nav className="fixed inset-x-0 top-0 z-40 nav-shadow">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <button
          onClick={() => scrollToId("home")}
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
                    active === s.id ? "" : "muted"
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

// ===== Sections
function Hero() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      id="home"
      ref={targetRef}
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-4"
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
              style={{ backgroundColor: "#10b981" }}
            />
            Open to work
          </p>
          <h1 className="mb-4 text-4xl title md:text-6xl">
            Hi, I'm{" "}
            <span
              style={{
                backgroundImage: `linear-gradient(90deg, var(--accent-1), var(--accent-2), var(--accent-3))`,
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Yuvraj
            </span>{" "}
            👋
          </h1>
          <p className="mb-6 max-w-xl muted">
            CSE undergrad building clean UIs and smart, data-driven features. I
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
                scrollToId("contact");
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
              <Github size={18} className="transition group-hover:scale-110" />{" "}
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
              />{" "}
              LinkedIn
            </a>
          </div>
        </div>
        <div className="relative order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto aspect-square w-64 overflow-hidden rounded-3xl card p-2 shadow-2xl backdrop-blur md:w-80"
          >
            <img
              src="src\assets\ME1.jpg"
              alt="Your Name"
              className="h-full w-full rounded-2xl object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(56,189,248,0.25), transparent 40%), radial-gradient(circle at 70% 60%, rgba(168,85,247,0.25), transparent 35%)",
              }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -bottom-10 left-1/2 w-56 -translate-x-1/2 rounded-2xl card p-3 text-center text-sm shadow-xl backdrop-blur md:w-64"
          >
            <p className="font-semibold">Front-end Developer</p>
            <p className="muted">React • Tailwind • Framer Motion</p>
          </motion.div>
        </div>
      </motion.div>
      <button
        onClick={() => scrollToId("about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full surface p-2 shadow-sm backdrop-blur transition hover:-translate-y-0.5"
        aria-label="Scroll to about"
      >
        <ChevronDown />
      </button>
    </section>
  );
}

function Section({ id, title, subtitle, children }) {
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

function About() {
  const skills = [
    "HTML",
    "TAILWIND CSS",
    "JAVASCRIPT",
    "REACT.JS",
    "FIREBASE",
    "PYTHON",
    "ML Basics",
    "GITHUB",
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

// ===== Experience Section (Resume Style)
function Experience() {
  const experiences = useMemo(
    () => [
      {
        id: 1,
        title: "Project Intern",
        company: "Uttarakhand Technical University",
        duration: "April 2024 - August 2024",
        location: "Dehradun, Uttarakhand",
        description:
          "Developed a centralized dashboard unifying data across all universities in Uttarakhand. Delivered a solution presented to the Honorable Governor of Uttarakhand. Created a unified data ecosystem to streamline institutional reporting and decision-making",
        skills: ["HTML", "CSS", "JAVASCRIPT", "FIREBASE"],
        icon: <Briefcase size={20} className="text-accent-1" />,
      },
      {
        id: 2,
        title: "Project Intern",
        company: "Raj Bhawan Uttarakhand",
        duration: "May 2023 - July 2023",
        location: "Dehradun, Uttarakhand",
        description:
          "Built frontend systems for a QR-based inventory management solution. Implemented responsive web applications deployed across Raj Bhawan facilities in Dehradun and Nainital. Contributed to digital transformation of governmental inventory processes.",
        skills: ["HTML", "CSS", "JAVASCRIPT"],
        icon: <Brain size={20} className="text-accent-2" />,
      },
    ],
    []
  );

  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="My professional journey and contributions."
    >
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-1 to-accent-3 md:left-1/2 md:-translate-x-1/2"></div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 top-6 h-3 w-3 rounded-full bg-accent-2 md:left-1/2 md:-translate-x-1/2"></div>

              {/* Content */}
              <div
                className={`ml-10 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                }`}
              >
                <motion.div
                  className="group relative overflow-hidden rounded-3xl card p-6 backdrop-blur hover:shadow-lg transition-all duration-500"
                  whileHover={{ y: -5 }}
                >
                  {/* Hover effect background */}
                  <div
                    className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(400px circle at var(--x,50%) var(--y,50%), 
                                  rgba(56,189,248,0.1), 
                                  rgba(168,85,247,0.08), 
                                  rgba(99,102,241,0.06), 
                                  transparent 60%)`,
                    }}
                  />

                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 p-3 rounded-xl surface">
                      {exp.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{exp.title}</h3>
                      <p className="text-accent-2 font-medium">{exp.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm muted mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <p className="mb-4 text-sm">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="chip rounded-full px-3 py-1 text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ===== Futuristic Experience Section
function FuturisticExperience() {
  const techItems = [
    {
      icon: <Cpu size={24} />,
      title: "AI Integration",
      description:
        "Building intelligent interfaces with ML APIs and neural networks",
    },
    {
      icon: <Zap size={24} />,
      title: "Real-time Systems",
      description: "WebSocket-powered apps with instant data synchronization",
    },
    {
      icon: <Brain size={24} />,
      title: "Predictive UX",
      description: "Anticipatory design patterns that learn from user behavior",
    },
    {
      icon: <Cloud size={24} />,
      title: "Edge Computing",
      description: "Distributed architectures for low-latency experiences",
    },
  ];

  return (
    <Section
      id="future"
      title="Futuristic Experience"
      subtitle="Exploring the next frontier of web development and user experiences."
    >
      <div className="relative">
        {/* Animated grid background */}
        <div
          className="absolute inset-0 opacity-20 z-0"
          style={{
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
                              linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            maskImage:
              "radial-gradient(circle at 50% 50%, black 30%, transparent 70%)",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {techItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl card p-6 backdrop-blur hover:shadow-lg transition-all duration-500"
            >
              {/* Hover effect background */}
              <div
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(400px circle at var(--x,50%) var(--y,50%), 
                              rgba(56,189,248,0.1), 
                              rgba(168,85,247,0.08), 
                              rgba(99,102,241,0.06), 
                              transparent 60%)`,
                }}
              />

              {/* Animated border effect */}
              <div
                className="absolute inset-0 rounded-3xl -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(90deg, 
                              var(--accent-1), 
                              var(--accent-2), 
                              var(--accent-3))`,
                  mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                  maskComposite: "exclude",
                  padding: "1px",
                }}
              />

              <div className="flex items-start gap-4">
                <motion.div
                  className="flex-shrink-0 p-2 rounded-xl surface"
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm muted">{item.description}</p>
                </div>
              </div>

              {/* Floating particles animation */}
              <div className="absolute -top-4 -right-4 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      background: `linear-gradient(45deg, var(--accent-1), var(--accent-3))`,
                      width: `${4 + i * 2}px`,
                      height: `${4 + i * 2}px`,
                      top: `${Math.random() * 60}%`,
                      left: `${Math.random() * 60}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="muted mb-4">Currently experimenting with:</p>
          <div className="inline-flex flex-wrap justify-center gap-3">
            {["WebGL", "AR/VR", "WebAssembly", "Blockchain", "IoT"].map(
              (tech, i) => (
                <motion.span
                  key={tech}
                  className="chip rounded-full px-3 py-1 text-xs font-medium"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    background:
                      "linear-gradient(90deg, var(--accent-1), var(--accent-2))",
                    color: "white",
                  }}
                >
                  {tech}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

function Projects() {
  const projects = useMemo(
    () => [
      {
        title: "Campus Connect Dashboard",
        desc: "A clean Firebase-backed dashboard for universities with analytics and role-based views.",
        tags: ["React", "Firebase", "Tailwind"],
        href: "#",
        repo: "#",
      },
      {
        title: "AI Resume Ranker",
        desc: "Ranks resumes using simple NLP scoring; built fast to help shortlisting.",
        tags: ["Python", "NLP", "Flask"],
        href: "#",
        repo: "#",
      },
      {
        title: "Virtual-R",
        desc: "Pushing web boundaries with React, 3D visuals, and Tailwind elegance.",
        tags: ["REACT.JS", "TAILWIND CSS"],
        href: "https://virutal-r.vercel.app/",
        repo: "https://github.com/YuvrajPal27/VirutalR",
      },
      {
        title: "Portfolio",
        desc: "This site — built with slick scroll, motion, and clean components.",
        tags: ["React", "Framer Motion", "Tailwind"],
        href: "#",
        repo: "https://github.com/YuvrajPal27/Portfolio",
      },
    ],
    []
  );

  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Stuff I'm proud of. Clean code, shipped UI, and experiments that kept me up too late."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-3xl card p-5 shadow-sm backdrop-blur transition hover:shadow-md"
          >
            <div
              className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(400px circle at var(--x,50%) var(--y,50%), rgba(99,102,241,0.15), transparent 60%)",
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

// ===== Awards Section (Mobile Optimized)
function Awards() {
  const awards = useMemo(
    () => [
      {
        id: 1,
        title: "Best UI/UX Design",
        event: "Tech Innovation Summit 2023",
        description:
          "Awarded for exceptional user interface design and innovative user experience solutions in the Campus Connect Dashboard project.",
        image:
          "src/assets/rimsAward.jpg",
        date: "June 2023",
        icon: <Trophy className="text-yellow-500" />,
      },
      {
        id: 2,
        title: "AI Innovation Award",
        event: "Global Hackathon Finals",
        description:
          "Recognized for implementing novel AI solutions in the Try-On Prototype project that demonstrated technical excellence and creativity.",
        image:
          "src/assets/chatbot.JPG",
        date: "March 2023",
        icon: <Award className="text-purple-500" />,
      },
      {
        id: 3,
        title: "People's Choice Award",
        event: "Web Dev Showcase",
        description:
          "Voted by attendees for the most impressive and user-friendly portfolio implementation among all participants.",
        image:
          "src/assets/UCUaward.jpeg",
        date: "November 2022",
        icon: <Medal className="text-amber-500" />,
      },
    ],
    []
  );

  const [selected, setSelected] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <Section
      id="awards"
      title="Awards & Recognition"
      subtitle="Celebrating milestones and achievements in my tech journey."
    >
      <div className="relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 opacity-10">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                background: `linear-gradient(45deg, var(--accent-1), var(--accent-3))`,
                width: `${60 + i * 20}px`,
                height: `${60 + i * 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 5 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Mobile view (stacked cards) */}
        {isMobile ? (
          <div className="space-y-6">
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl card p-6 backdrop-blur"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 p-3 rounded-xl surface">
                    {award.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{award.title}</h3>
                    <p className="text-sm text-accent-2 font-medium">
                      {award.event}
                    </p>
                  </div>
                </div>

                <div className="relative h-48 overflow-hidden rounded-xl mb-4">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
                </div>

                <p className="mb-4 text-sm">{award.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs chip px-3 py-1">{award.date}</span>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-3 py-1 rounded-full surface text-sm font-medium"
                  >
                    <span>View</span>
                    <ArrowUpRight size={16} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Desktop view (side-by-side layout) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Award cards */}
            <div className="space-y-6">
              {awards.map((award, index) => (
                <motion.div
                  key={award.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-3xl card p-6 backdrop-blur cursor-pointer transition-all duration-500 ${
                    selected === index ? "ring-2 ring-accent-2" : ""
                  }`}
                  onClick={() => setSelected(index)}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex-shrink-0 p-3 rounded-xl surface"
                      whileHover={{ rotate: 10, scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      {award.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">
                        {award.title}
                      </h3>
                      <p className="text-sm font-medium text-accent-2 mb-2">
                        {award.event}
                      </p>
                      <p className="text-sm muted line-clamp-2">
                        {award.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs chip px-2 py-1">
                          {award.date}
                        </span>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: selected === index ? 1 : 0 }}
                          className="w-2 h-2 rounded-full bg-accent-2"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Award detail view */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="sticky top-24 rounded-3xl overflow-hidden card backdrop-blur"
                >
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={awards[selected].image}
                      alt={awards[selected].title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">
                        {awards[selected].title}
                      </h3>
                      <p className="text-accent-1 font-medium">
                        {awards[selected].event}
                      </p>
                    </div>

                    {/* Floating award icon */}
                    <motion.div
                      className="absolute top-4 right-4 p-3 rounded-full glass"
                      initial={{ y: -10, rotate: -5 }}
                      animate={{ y: 0, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                        delay: 0.2,
                      }}
                    >
                      {awards[selected].icon}
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <p className="mb-4">{awards[selected].description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm chip px-3 py-1">
                        {awards[selected].date}
                      </span>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-3 py-1 rounded-full surface text-sm font-medium"
                      >
                        <span>View Certificate</span>
                        <ArrowUpRight size={16} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent("Portfolio contact — " + form.name);
    const body = encodeURIComponent(`${form.message}

From: ${form.name} <${form.email}>`);
    window.location.href = `mailto:you@example.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <Section
      id="contact"
      title="Contact"
      subtitle="Say hi. I'm down to collaborate, freelance, or chat about opportunities."
    >
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-2xl surface px-3 py-2 outline-none ring-0 focus:outline-none"
              placeholder="Ava Wilson"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-2xl surface px-3 py-2 outline-none ring-0 focus:outline-none"
              placeholder="you@email.com"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Message</label>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-2xl surface px-3 py-2 outline-none ring-0 focus:outline-none"
            placeholder="Let's build something cool..."
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            Send <Mail size={16} />
          </button>
          {sent && (
            <p className="text-sm" style={{ color: "#10b981" }}>
              Draft opened in your mail app ✅
            </p>
          )}
        </div>
      </form>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 px-4 py-10 text-center text-sm muted">
      <p>
        © {new Date().getFullYear()} Yuvi — Built with React, Tailwind, and way
        too much coffee ☕
      </p>
    </footer>
  );
}

// ===== Root
export default function App() {
  const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "future", label: "Future Tech" },
    { id: "projects", label: "Projects" },
    { id: "awards", label: "Awards" },
    { id: "contact", label: "Contact" },
  ];
  const active = useActiveSection(sections.map((s) => s.id));

  // Visual scroll progress bar top
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.2,
  });

  // Track pointer for card glow
  useEffect(() => {
    const onMove = (e) => {
      document.querySelectorAll("article").forEach((el) => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--y", `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="relative min-h-screen">
      <ThemeStyles />
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left"
        aria-hidden
      >
        <div
          style={{
            height: "100%",
            backgroundImage:
              "linear-gradient(90deg, var(--accent-1), var(--accent-2), var(--accent-3))",
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

      {/* Futuristic Experience */}
      <FuturisticExperience />

      {/* Projects */}
      <Projects />

      {/* Awards */}
      <Awards />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}
