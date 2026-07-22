'use client';

import { useCallback, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { wedding } from '@/config/wedding';
import { Countdown } from '@/components/Countdown';
import { EventDetails } from '@/components/EventDetails';
import { FAQ } from '@/components/FAQ';
import { FloatingRSVP } from '@/components/FloatingRSVP';
import { Hero } from '@/components/Hero';
import { MusicPlayer } from '@/components/MusicPlayer';
import { OpeningScreen } from '@/components/OpeningScreen';
import { RSVP } from '@/components/RSVP';
import { StoryExperience } from '@/components/StoryExperience';
import { Travel } from '@/components/Travel';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const openExternalRsvp = useCallback(() => {
    window.open(wedding.rsvpUrl, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <main>
      <AnimatePresence>{!isOpen ? <OpeningScreen onOpen={() => setIsOpen(true)} /> : null}</AnimatePresence>
      <MusicPlayer enabled={isOpen} />
      <FloatingRSVP enabled={isOpen} onRsvp={openExternalRsvp} />
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, filter: 'blur(10px)' }}
        animate={isOpen ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden={!isOpen}
      >
        <StoryExperience onRsvp={openExternalRsvp} />
        <div className="hidden sm:block">
          <Hero onRsvp={openExternalRsvp} />
        </div>
        <EventDetails />
        <Countdown />
        <RSVP openExternalRsvp={openExternalRsvp} />
        <Travel />
        <FAQ />
        <footer className="border-t border-gold/20 px-6 py-10 text-center">
          <button
            type="button"
            onClick={openExternalRsvp}
            className="mb-8 rounded-full bg-gold px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition hover:bg-champagne focus:outline-none focus:ring-4 focus:ring-gold/30"
          >
            RSVP
          </button>
          <p className="font-display text-3xl text-ivory">
            Joey & Ana <span className="text-gold">—</span> {wedding.date.numeric}
          </p>
        </footer>
      </motion.div>
    </main>
  );
}
