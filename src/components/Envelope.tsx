import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FallingPetals } from './FallingPetals';

type EnvelopeProps = {
  onOpen: () => void;
  onOpened: () => void;
};

type Phase = 'closed' | 'seal' | 'flap' | 'rising';

const EASE = [0.23, 1, 0.32, 1] as const;
const FLORAL = '/20745df0-5f10-4c3b-9e6f-a54efda97107.jpg';
const GOLD_LINE = '#c9a24a';

// Slightly uneven circle so the seal looks like pressed wax
const SEAL_PATH = (() => {
  const pts = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2;
    const r = 30 + (i % 3 === 0 ? 1.6 : i % 2 === 0 ? -0.8 : 0.6);
    return `${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`;
  });
  return `M${pts.join(' L')} Z`;
})();

const SPARKS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  const d = i % 2 === 0 ? 95 : 70;
  return { x: Math.cos(a) * d, y: Math.sin(a) * d, size: i % 2 === 0 ? 6 : 4 };
});

function GeometricPattern() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]">
      <defs>
        <pattern id="star8" width="44" height="44" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#a9822f" strokeWidth="1">
            <rect x="12" y="12" width="20" height="20" />
            <rect x="12" y="12" width="20" height="20" transform="rotate(45 22 22)" />
            <circle cx="22" cy="22" r="4" />
            <path d="M0 0 L6 6 M44 0 L38 6 M0 44 L6 38 M44 44 L38 38" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#star8)" />
    </svg>);

}

export function Envelope({ onOpen, onOpened }: EnvelopeProps) {
  const [phase, setPhase] = useState<Phase>('closed');
  const reduce = useReducedMotion();

  const handleOpen = () => {
    if (phase !== 'closed') return;
    onOpen();
    if (reduce) {
      onOpened();
      return;
    }
    setPhase('seal');
    window.setTimeout(() => setPhase('flap'), 250);
    window.setTimeout(() => setPhase('rising'), 750);
    window.setTimeout(onOpened, 1650);
  };

  const opening = phase !== 'closed';
  const flapOpen = phase === 'flap' || phase === 'rising';
  const rising = phase === 'rising';

  return (
    <motion.section
      className="fixed inset-0 z-40 flex w-full flex-col items-center justify-center overflow-hidden bg-[#efe7df] px-6 py-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      aria-label="Wedding invitation envelope">

      {/* Background: warm glow, geometric pattern, florals, petals */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
          'radial-gradient(ellipse at 50% 42%, rgba(255,248,236,0.95) 0%, rgba(247,236,222,0.6) 38%, rgba(239,231,223,0) 70%)'
        }} />

      <GeometricPattern />
      <img
        src={FLORAL}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 w-40 select-none mix-blend-multiply sm:w-60" />

      <img
        src={FLORAL}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -left-8 w-40 rotate-180 select-none mix-blend-multiply sm:w-60" />

      {!reduce && <FallingPetals />}

      {/* Heading */}
      <motion.div
        animate={{ opacity: opening ? 0 : 1, y: opening ? -8 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative mb-7 text-center sm:mb-10">

        <p lang="ar" dir="rtl" className="font-arabic text-lg leading-relaxed text-gold sm:text-xl">
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>

        <div className="mx-auto mt-3 w-fit rounded-full border border-gold/35 p-1 shadow-[0_14px_32px_-14px_rgba(59,42,34,0.5)]">
          <div className="rounded-full border border-gold/70 p-[3px]">
            <img
              src="/couple-round.webp"
              alt="Fathimath Famnaz and Mohammed Sakeeb"
              width={400}
              height={400}
              fetchPriority="high"
              className="h-24 w-24 select-none rounded-full object-cover sm:h-32 sm:w-32" />

          </div>
        </div>

        <p className="mt-4 font-serif text-[0.66rem] uppercase tracking-[0.26em] text-ink/60 sm:text-[0.7rem] sm:tracking-[0.34em]">
          You are invited to the wedding of
        </p>
        <p className="mt-2 font-script text-[2.6rem] leading-tight text-crimson sm:text-5xl">
          Famnaz <span className="text-gold">&amp;</span> Sakeeb
        </p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold/50" />
          <span className="font-serif text-sm tracking-[0.3em] text-ink/70">12 · 12 · 2026</span>
          <span className="h-px w-10 bg-gold/50" />
        </div>
      </motion.div>

      {/* Envelope */}
      <motion.div
        className="relative w-full max-w-[340px] sm:max-w-[420px]"
        animate={reduce || opening ? { y: 0 } : { y: [0, -6, 0] }}
        transition={reduce || opening ? { duration: 0.3 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}>

        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open the invitation"
          className="relative block aspect-[3/2] w-full cursor-pointer rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson"
          style={{ perspective: 1200 }}>

          {/* Envelope back */}
          <span className="absolute inset-0 rounded-md bg-gradient-to-b from-[#7a0f27] to-[#5e0b1f] shadow-[0_34px_60px_-24px_rgba(59,20,22,0.65)]" />

          {/* Letter inside */}
          <motion.span
            className="absolute inset-x-5 bottom-3 top-3 z-10 flex flex-col items-center justify-start rounded-sm border border-gold/40 bg-cream pt-5 shadow-[0_-6px_18px_-10px_rgba(59,42,34,0.4)]"
            animate={{ y: rising ? '-60%' : '0%' }}
            transition={{ duration: 0.7, ease: EASE }}>

            <span lang="ar" dir="rtl" className="font-arabic text-base text-gold sm:text-lg">
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </span>
            <span className="mt-2 font-serif text-[0.6rem] uppercase tracking-[0.3em] text-ink/60">
              Wedding Invitation
            </span>
            <span className="mt-2 font-script text-2xl text-crimson">Famnaz &amp; Sakeeb</span>
          </motion.span>

          {/* Front pocket with gold foil edges */}
          <svg
            viewBox="0 0 300 200"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-0 z-20 h-full w-full overflow-visible">

            <defs>
              <linearGradient id="pocketSide" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#8c1230" />
                <stop offset="1" stopColor="#74102a" />
              </linearGradient>
              <linearGradient id="pocketBottom" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#9a1736" />
                <stop offset="1" stopColor="#801230" />
              </linearGradient>
            </defs>
            <path d="M0 0 L150 112 L300 0 L300 200 L0 200 Z" fill="url(#pocketSide)" />
            <path d="M0 200 L150 104 L300 200 Z" fill="url(#pocketBottom)" />
            <path
              d="M0 0 L150 112 L300 0 M0 200 L150 104 L300 200"
              fill="none"
              stroke={GOLD_LINE}
              strokeOpacity="0.55"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke" />

            <path
              d="M7 7 L7 193 L293 193 L293 7"
              fill="none"
              stroke={GOLD_LINE}
              strokeOpacity="0.7"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke" />

          </svg>

          {/* Top flap: crimson outside, gold liner inside */}
          <motion.span
            className="absolute inset-x-0 top-0 h-[58%] origin-top"
            style={{ transformStyle: 'preserve-3d', zIndex: rising ? 5 : 30 }}
            animate={{ rotateX: flapOpen ? 180 : 0 }}
            transition={{ duration: 0.5, ease: EASE }}>

            <svg
              viewBox="0 0 300 116"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full overflow-visible drop-shadow-[0_6px_6px_rgba(40,8,16,0.35)]"
              style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>

              <defs>
                <linearGradient id="flapOuter" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#6f0e26" />
                  <stop offset="1" stopColor="#8c1230" />
                </linearGradient>
              </defs>
              <path d="M0 0 L300 0 L150 116 Z" fill="url(#flapOuter)" />
              <path
                d="M0 0 L150 116 L300 0"
                fill="none"
                stroke={GOLD_LINE}
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke" />

              <path
                d="M14 7 L150 112 L286 7"
                fill="none"
                stroke={GOLD_LINE}
                strokeOpacity="0.45"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke" />

            </svg>
            <svg
              viewBox="0 0 300 116"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              style={{
                transform: 'rotateX(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}>

              <defs>
                <linearGradient id="liner" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#c9a24a" />
                  <stop offset="1" stopColor="#efdba4" />
                </linearGradient>
                <pattern id="linerStar" width="22" height="22" patternUnits="userSpaceOnUse">
                  <g fill="none" stroke="#8a6420" strokeOpacity="0.35" strokeWidth="0.8">
                    <rect x="6" y="6" width="10" height="10" />
                    <rect x="6" y="6" width="10" height="10" transform="rotate(45 11 11)" />
                  </g>
                </pattern>
              </defs>
              <path d="M0 116 L300 116 L150 0 Z" fill="url(#liner)" />
              <path d="M0 116 L300 116 L150 0 Z" fill="url(#linerStar)" />
            </svg>
          </motion.span>

          {/* Seal glow */}
          {!reduce &&
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[58%] z-30 h-20 w-20 rounded-full bg-[#e9c66a] blur-xl"
            style={{ x: '-50%', y: '-50%' }}
            animate={opening ? { opacity: 0 } : { opacity: [0.25, 0.6, 0.25], scale: [0.9, 1.1, 0.9] }}
            transition={opening ? { duration: 0.2 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />

          }

          {/* Gold wax seal */}
          <motion.span
            className="absolute left-1/2 top-[58%] z-40 flex h-16 w-16 items-center justify-center"
            style={{ x: '-50%', y: '-50%' }}
            animate={opening ? { scale: [1, 1.12, 0], opacity: [1, 1, 0] } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: EASE }}>

            <svg viewBox="-32 -32 64 64" aria-hidden="true" className="absolute inset-0 h-full w-full drop-shadow-[0_4px_6px_rgba(40,8,16,0.45)]">
              <defs>
                <radialGradient id="sealGold" cx="0.38" cy="0.32" r="0.75">
                  <stop offset="0" stopColor="#f7e3a3" />
                  <stop offset="0.45" stopColor="#d4ac52" />
                  <stop offset="1" stopColor="#8f6a24" />
                </radialGradient>
              </defs>
              <path d={SEAL_PATH} fill="url(#sealGold)" />
              <circle r="22" fill="none" stroke="#7a5719" strokeOpacity="0.55" strokeWidth="1.2" />
              <circle r="23.6" fill="none" stroke="#fbeec3" strokeOpacity="0.5" strokeWidth="0.8" />
            </svg>
            <span className="relative font-script text-[1.4rem] leading-none text-[#5a3d0f] [text-shadow:0_1px_0_rgba(255,240,200,0.6)]">
              F&amp;S
            </span>
          </motion.span>

          {/* Sparkle burst when the seal breaks */}
          {opening && !reduce &&
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[58%] z-50">
              {SPARKS.map((s, i) =>
            <motion.span
              key={i}
              className="absolute rounded-full bg-[#f3d77f] shadow-[0_0_8px_2px_rgba(233,198,106,0.8)]"
              style={{ width: s.size, height: s.size, left: -s.size / 2, top: -s.size / 2 }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: s.x, y: s.y, opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.8, ease: EASE }} />

            )}
            </span>
          }
        </button>
      </motion.div>

      <motion.p
        animate={opening ? { opacity: 0 } : reduce ? { opacity: 1 } : { opacity: [0.45, 1, 0.45] }}
        transition={opening || reduce ? { duration: 0.2 } : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative mt-8 font-serif text-[0.72rem] uppercase tracking-[0.3em] text-crimson sm:mt-10">

        Tap the envelope to open
      </motion.p>
    </motion.section>);

}
