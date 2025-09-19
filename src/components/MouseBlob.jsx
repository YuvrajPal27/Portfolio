import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function MouseBlob() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="fixed hidden lg:block"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
      }}
    >
      <div
        className="h-64 w-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 60%)',
        }}
      />
    </motion.div>
  );
}
