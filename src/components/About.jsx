import Section from "./Section";

// Import icons
import { FaHtml5, FaReact, FaJs, FaGithubSquare } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiFirebase } from "react-icons/si";

export default function About() {
  const skills = [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-6xl" /> },
    {
      name: "TAILWIND CSS",
      icon: <SiTailwindcss className="text-sky-400 text-6xl" />,
    },
    { name: "JAVASCRIPT", icon: <FaJs className="text-yellow-400 text-6xl" /> },
    { name: "REACT.JS", icon: <FaReact className="text-cyan-400 text-6xl" /> },
    {
      name: "TYPESCRIPT",
      icon: <SiTypescript className="text-blue-500 text-6xl" />,
    },
    {
      name: "FIREBASE",
      icon: <SiFirebase className="text-orange-400 text-6xl" />,
    },
    {
      name: "GITHUB",
      icon: <FaGithubSquare className="text-black dark:text-white text-6xl" />,
    },
  ];

  return (
    <Section
      id="about"
      title="About"
      subtitle="Quick snapshot of who I am and what I work with."
    >
      <div className=" flex flex-col gap-10">
        <ul className="space-y-2">
          <li>
            🚀 <strong>Recent CSE Graduate:</strong> Strong CS fundamentals with
            a passion for frontend development.
          </li>
          <li>
            💻 <strong>Frontend Developer:</strong> Skilled in React, Tailwind
            CSS, and JavaScript for modern web apps.
          </li>
          <li>
            🧩 <strong>Problem Solver:</strong> Breaks down challenges into
            efficient, real-world solutions.
          </li>
          <li>
            🎨 <strong>Design + Functionality:</strong> Builds clean UIs with
            smooth, user-friendly experiences.
          </li>
          <li>
            🤝 <strong>Team Player:</strong> Enjoys collaborating, sharing
            knowledge, and building impactful projects.
          </li>
          <li>
            🌟 <strong>Open to Opportunities:</strong> Actively looking for
            roles, projects, and collaborations to grow.
          </li>
        </ul>

        {/* Skills row */}
        <div className="flex flex-wrap items-center justify-center gap-10">
          {skills.map((s) => (
            <div key={s.name} className="flex flex-col items-center space-y-2">
              {s.icon}
              <span className="text-sm font-medium">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
