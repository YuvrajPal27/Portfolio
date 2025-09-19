import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Brain, Cloud } from 'lucide-react';
import Section from './Section';

export default function FuturisticExperience() {
  const techItems = [
    {
      icon: <Cpu size={24} />,
      title: 'AI Integration',
      description:
        'Building intelligent interfaces with ML APIs and neural networks',
    },
    {
      icon: <Zap size={24} />,
      title: 'Real-time Systems',
      description: 'WebSocket-powered apps with instant data synchronization',
    },
    {
      icon: <Brain size={24} />,
      title: 'Predictive UX',
      description: 'Anticipatory design patterns that learn from user behavior',
    },
    {
      icon: <Cloud size={24} />,
      title: 'Edge Computing',
      description: 'Distributed architectures for low-latency experiences',
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
            backgroundSize: '50px 50px',
            maskImage:
              'radial-gradient(circle at 50% 50%, black 30%, transparent 70%)',
          }}
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {techItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
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
                  maskComposite: 'exclude',
                  padding: '1px',
                }}
              />

              <div className="flex items-start gap-4">
                <motion.div
                  className="flex-shrink-0 p-2 rounded-xl surface"
                  whileHover={{ rotate: 10, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
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
            {['WebGL', 'AR/VR', 'WebAssembly', 'Blockchain', 'IoT'].map(
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
                      'linear-gradient(90deg, var(--accent-1), var(--accent-2))',
                    color: 'white',
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
