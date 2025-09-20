import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Brain, Calendar, MapPin } from 'lucide-react';
import Section from './Section';

export default function Experience() {
  const experiences = useMemo(
    () => [
      {
        id: 1,
        title: 'Project Intern',
        company: 'Uttarakhand Technical University',
        duration: 'April 2024 - August 2024',
        location: 'Dehradun, Uttarakhand',
        description:  
        'Developed a centralized dashboard unifying data across all universities in Uttarakhand. Delivered a solution presented to the Honorable Governor of Uttarakhand. Created a unified data ecosystem to streamline institutional reporting and decision-making',
        skills: ['HTML', 'CSS', 'JAVASCRIPT', 'FIREBASE'],
        icon: <Briefcase size={20} className="text-accent-1" />,
      },
      {
        id: 2,
        title: 'Project Intern',
        company: 'Raj Bhawan Uttarakhand',
        duration: 'May 2023 - July 2023',
        location: 'Dehradun, Uttarakhand',
        description:
          'Built frontend systems for a QR-based inventory management solution. Implemented responsive web applications deployed across Raj Bhawan facilities in Dehradun and Nainital. Contributed to digital transformation of governmental inventory processes.',
        skills: ['HTML', 'CSS', 'JAVASCRIPT'],
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
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 top-6 h-3 w-3 rounded-full bg-accent-2 md:left-1/2 md:-translate-x-1/2"></div>

              {/* Content */}
              <div
                className={`ml-10 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
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
