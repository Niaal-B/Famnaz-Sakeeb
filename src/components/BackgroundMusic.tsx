import React from 'react';
import { motion } from 'framer-motion';
import { Volume2Icon, VolumeXIcon } from 'lucide-react';

type BackgroundMusicProps = {
  containerRef: React.RefObject<HTMLDivElement>;
  playing: boolean;
  error: boolean;
  showToggle: boolean;
  onToggle: () => void;
};

export function BackgroundMusic({
  containerRef,
  playing,
  error,
  showToggle,
  onToggle
}: BackgroundMusicProps) {
  return (
    <>
      {/* YouTube needs a real-sized player to play, so it's kept on-screen but invisible */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-0 -z-10 h-[200px] w-[200px] overflow-hidden opacity-0">
        
        <div ref={containerRef} />
      </div>

      {showToggle && !error &&
      <motion.button
        type="button"
        onClick={onToggle}
        aria-label={playing ? 'Mute music' : 'Play music'}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-cream text-crimson shadow-[0_8px_24px_-8px_rgba(59,42,34,0.45)] transition-colors duration-150 ease-out hover:bg-crimson hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson">
        
          {playing ?
        <Volume2Icon className="h-5 w-5" aria-hidden="true" /> :

        <VolumeXIcon className="h-5 w-5" aria-hidden="true" />
        }
        </motion.button>
      }
    </>);

}