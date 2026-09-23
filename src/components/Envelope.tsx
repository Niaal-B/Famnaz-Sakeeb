import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type EnvelopeProps = {
  onOpen: () => void;
  onOpened: () => void;
};

type Phase = 'closed' | 'flap' | 'rising';

const EASE = [0.23, 1, 0.32, 1] as const;

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
    setPhase('flap');
    window.setTimeout(() => setPhase('rising'), 300);
    window.setTimeout(onOpened, 1100);
  };

  const flapOpen = phase !== 'closed';
  const rising = phase === 'rising';

  return (
    <motion.section
      className="fixed inset-0 z-40 flex w-full flex-col items-center justify-center bg-[#efe7df] px-6"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      aria-label="Wedding invitation envelope">
      
      <motion.div
        animate={{ opacity: flapOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="mb-12 text-center">
        
        <div className="mx-auto mb-6 h-32 w-32 rounded-full border border-gold/60 p-1 shadow-[0_12px_30px_-12px_rgba(59,42,34,0.45)] sm:h-36 sm:w-36">
          <img
            src="/couple-round.webp"
            alt="Fathimath Famnaz and Mohammed Sakeeb"
            width={400}
            height={400}
            fetchPriority="high"
            className="h-full w-full select-none rounded-full object-cover" />
        </div>
        <p className="font-serif text-[0.66rem] uppercase tracking-[0.26em] text-ink/60 sm:text-[0.7rem] sm:tracking-[0.34em]">
          You are invited to the wedding of
        </p>
        <p className="mt-3 font-script text-4xl leading-tight text-crimson sm:text-5xl">
          Famnaz <span className="text-gold">&amp;</span> Sakeeb
        </p>
      </motion.div>

      <button
        type="button"
        onClick={handleOpen}
        aria-label="Open the invitation"
        className="relative aspect-[3/2] w-full max-w-[420px] cursor-pointer rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson"
        style={{ perspective: 1200 }}>
        
        {/* Envelope back */}
        <span className="absolute inset-0 rounded-sm bg-[#e4d4bf] shadow-[0_30px_60px_-25px_rgba(59,42,34,0.5)]" />

        {/* Letter inside */}
        <motion.span
          className="absolute inset-x-5 bottom-3 top-3 z-10 flex flex-col items-center justify-start rounded-sm border border-gold/30 bg-cream pt-5"
          animate={{ y: rising ? '-58%' : '0%' }}
          transition={{ duration: 0.3, ease: EASE }}>
          
          <span lang="ar" dir="rtl" className="font-arabic text-base text-gold sm:text-lg">
            بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </span>
          <span className="mt-2 font-serif text-[0.6rem] uppercase tracking-[0.3em] text-ink/60">
            Wedding Invitation
          </span>
          <span className="mt-2 font-script text-2xl text-crimson">Famnaz &amp; Sakeeb</span>
        </motion.span>

        {/* Front pocket */}
        <span
          className="absolute inset-0 z-20 rounded-sm bg-[#efe2d0]"
          style={{ clipPath: 'polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)' }} />
        
        <span
          className="absolute inset-0 z-20 rounded-sm bg-[#e9dac6]"
          style={{ clipPath: 'polygon(0 100%, 50% 52%, 100% 100%)' }} />
        

        {/* Top flap */}
        <motion.span
          className="absolute inset-x-0 top-0 h-[58%] origin-top rounded-sm bg-[#e7d7c2]"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            zIndex: rising ? 5 : 30
          }}
          animate={{ rotateX: flapOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE }} />
        

        {/* Wax seal */}
        <motion.span
          className="absolute left-1/2 top-[58%] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-crimson font-script text-xl text-cream shadow-[0_4px_10px_rgba(59,42,34,0.35)] ring-2 ring-[#6f0e26]"
          style={{ x: '-50%', y: '-50%' }}
          animate={{ opacity: flapOpen ? 0 : 1, scale: flapOpen ? 0.96 : 1 }}
          transition={{ duration: 0.15, ease: EASE }}>
          
          F&amp;S
        </motion.span>
      </button>

      <motion.p
        animate={{ opacity: flapOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="mt-10 font-serif text-[0.72rem] uppercase tracking-[0.3em] text-crimson">
        
        Tap the envelope to open
      </motion.p>
    </motion.section>);

}