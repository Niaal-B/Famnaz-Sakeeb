import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { InstagramIcon } from 'lucide-react';
import { WeddingCard } from './components/WeddingCard';
import { Envelope } from './components/Envelope';
import { BackgroundMusic } from './components/BackgroundMusic';
import { useYouTubeAudio } from './hooks/useYouTubeAudio';

const SONG_VIDEO_ID = 'ivrumxRUz_Y';

export function App() {
  const [opened, setOpened] = useState(false);
  const music = useYouTubeAudio(SONG_VIDEO_ID);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#efe7df]">
      <BackgroundMusic
        containerRef={music.containerRef}
        playing={music.playing}
        error={music.error}
        showToggle={opened}
        onToggle={music.toggle} />
      

      <AnimatePresence>
        {!opened && <Envelope onOpen={music.play} onOpened={() => setOpened(true)} />}
      </AnimatePresence>

      {opened &&
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="relative flex w-full flex-col items-center px-4 py-8 sm:py-12">
        
          <WeddingCard />
          <a
            href="https://www.instagram.com/niaal._/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 font-serif text-[0.7rem] tracking-[0.12em] text-ink/45 transition-colors duration-150 hover:text-crimson">
            
            <InstagramIcon className="h-3 w-3" aria-hidden="true" />
            @niaal._
          </a>
        </motion.div>
      }
    </main>);

}