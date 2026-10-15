import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FallingPetals } from './FallingPetals';

type EnvelopeProps = {
  onOpen: () => void;
  onOpened: () => void;
};

type Phase = 'closed' | 'seal' | 'flap' | 'rising';

const EASE = [0.23, 1, 0.32, 1] as const;
const HERO = '/hero-garden.webp';
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
      className="fixed inset-0 z-40 flex w-full flex-col overflow-hidden bg-[#efe7df] lg:flex-row"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      aria-label="Wedding invitation envelope">
      
      {/* Couple photo: fills the space above the invitation on phones, left half on desktop */}
      <div className="pointer-events-none relative min-h-0 w-full flex-1 [-webkit-mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_72%,transparent_100%)] lg:h-full lg:w-1/2 lg:flex-none lg:[-webkit-mask-image:linear-gradient(to_right,black_70%,transparent_100%)] lg:[mask-image:linear-gradient(to_right,black_70%,transparent_100%)]">
        <img
          src={HERO}
          alt="Fathimath Famnaz and Mohammed Sakeeb"
          width={900}
          height={1350}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full select-none object-cover object-[50%_30%] lg:object-[50%_35%]" />
        
        <motion.p
          lang="ar"
          dir="rtl"
          animate={{ opacity: opening ? 0 : 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="absolute inset-x-0 top-4 text-center font-arabic text-lg leading-relaxed text-gold [text-shadow:0_0_12px_rgba(255,250,240,0.95),0_0_4px_rgba(255,250,240,0.9)] sm:text-xl lg:hidden">
          
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </motion.p>
      </div>

      {!reduce && <FallingPetals />}

      <div className="relative -mt-4 flex shrink-0 flex-col items-center px-6 pb-6 lg:mt-0 lg:w-1/2 lg:justify-center lg:py-10">
        <motion.p
          lang="ar"
          dir="rtl"
          animate={{ opacity: opening ? 0 : 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="hidden font-arabic text-xl leading-relaxed text-gold lg:block">
          
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </motion.p>

        {/* Heading */}
        <motion.div
          animate={{ opacity: opening ? 0 : 1, y: opening ? -8 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="relative mb-5 text-center sm:mb-7 lg:mb-9 lg:mt-8">
          
          <p className="font-serif text-[0.66rem] uppercase tracking-[0.26em] text-ink/70 sm:text-[0.7rem] sm:tracking-[0.34em]">
            You are invited to the wedding of
          </p>
          <p className="mt-1 font-script text-[2.6rem] leading-tight text-crimson sm:text-5xl lg:text-6xl">
            Famnaz <span className="text-gold">&amp;</span> Sakeeb
          </p>
          <div className="mt-1 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gold/60" />
            <span className="font-serif text-sm tracking-[0.3em] text-ink/75">12 · 12 · 2026</span>
            <span className="h-px w-10 bg-gold/60" />
          </div>
        </motion.div>

      {/* Envelope */}
      <motion.div
        className="relative w-[min(300px,78vw,38vh)] sm:w-[min(360px,40vh)] lg:w-[min(420px,50vh)]"
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
        className="relative mt-6 font-serif text-[0.72rem] uppercase tracking-[0.3em] text-crimson sm:mt-8">

        Tap the envelope to open
      </motion.p>
      </div>
    </motion.section>);

}
