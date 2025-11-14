'use client';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const GlareHover = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{
        background: `radial-gradient(circle at ${position.x}px ${position.y}px, hsla(var(--accent-hsl), 0.1), transparent 20%)`,
      }}
      className="relative h-full"
    >
      {children}
    </motion.div>
  );
};

export default GlareHover;
