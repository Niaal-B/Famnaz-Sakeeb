import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const COLORS = ['#8c1230', '#b4234a', '#d98a9a', '#e7b7b9', '#c9a24a'];

type Petal = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  spin: number;
  color: string;
};

function makePetals(count: number): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100,
    size: 8 + Math.random() * 7,
    duration: 9 + Math.random() * 7,
    delay: Math.random() * 10,
    drift: 20 + Math.random() * 40,
    spin: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
    color: COLORS[i % COLORS.length]
  }));
}

export function FallingPetals({ count = 14 }: { count?: number }) {
  const petals = useMemo(() => makePetals(count), [count]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) =>
      <motion.span
        key={i}
        className="absolute top-0 block"
        style={{
          left: `${p.left}%`,
          width: p.size,
          height: p.size * 1.3,
          backgroundColor: p.color,
          borderRadius: '80% 0 80% 0'
        }}
        initial={{ y: '-10vh', opacity: 0 }}
        animate={{
          y: ['-10vh', '110vh'],
          x: [0, p.drift, -p.drift / 2, p.drift / 3],
          rotate: [0, p.spin],
          opacity: [0, 0.75, 0.75, 0]
        }}
        transition={{
          default: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' },
          x: { duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' },
          opacity: {
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.1, 0.85, 1]
          }
        }} />

      )}
    </div>);

}
