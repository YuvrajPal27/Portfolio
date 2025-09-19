import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Medal, ArrowUpRight } from 'lucide-react';
import Section from './Section';
import rim from '../assets/rimsAward.jpg';
import chat from '../assets/chatbot.JPG';
import ucu from '../assets/UCUaward.jpeg';

export default function Awards() {
  const awards = useMemo(
    () => [
      {
        id: 1,
        title: 'Best UI/UX Design',
        event: 'Tech Innovation Summit 2023',
        description:
          'Awarded for exceptional user interface design and innovative user experience solutions in the Campus Connect Dashboard project.',
        image: rim,
        date: 'June 2023',
        icon: <Trophy className="text-yellow-500" />,
      },
      {
        id: 2,
        title: 'AI Innovation Award',
        event: 'Global Hackathon Finals',
        description:
          'Recognized for implementing novel AI solutions in the Try-On Prototype project that demonstrated technical excellence and creativity.',
        image: chat,
        date: 'March 2023',
        icon: <Award className="text-purple-500" />,
      },
      {
        id: 3,
        title: "People's Choice Award",
        event: 'Web Dev Showcase',
        description:
          'Voted by attendees for the most impressive and user-friendly portfolio implementation among all participants.',
        image: ucu,
        date: 'November 2022',
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
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
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
                viewport={{ once: true, margin: '-10%' }}
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
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-3xl card p-6 backdrop-blur cursor-pointer transition-all duration-500 ${
                    selected === index ? 'ring-2 ring-accent-2' : ''
                  }`}
                  onClick={() => setSelected(index)}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex-shrink-0 p-3 rounded-xl surface"
                      whileHover={{ rotate: 10, scale: 1.05 }}
                      transition={{
                        type: 'spring',
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
                        type: 'spring',
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
