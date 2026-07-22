'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { InvitationBox } from '@/components/InvitationBox';
import { MusicPlayer } from '@/components/MusicPlayer';
import { OpeningScreen } from '@/components/OpeningScreen';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <main>
      <AnimatePresence>{!isOpen ? <OpeningScreen onOpen={() => setIsOpen(true)} /> : null}</AnimatePresence>
      <MusicPlayer enabled={isOpen} compact />
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, filter: 'blur(10px)' }}
        animate={isOpen ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!isOpen}
      >
        <InvitationBox />
      </motion.div>
    </main>
  );
}
