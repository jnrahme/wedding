'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { wedding } from '@/config/wedding';
import { PhotoBackdrop } from './PhotoBackdrop';

type OpeningScreenProps = {
  onOpen: () => void;
};

export function OpeningScreen({ onOpen }: OpeningScreenProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className="fixed inset-0 z-50 flex min-h-dvh items-center justify-center overflow-hidden bg-black p-3 text-center sm:p-8"
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Opening invitation"
    >
      <div className="relative h-[calc(100dvh-1.5rem)] w-full max-w-[430px] overflow-hidden rounded-[4px] border-[8px] border-ivory bg-ink shadow-2xl sm:h-[min(92vh,860px)]">
        <PhotoBackdrop src={wedding.images.coupleHero} priority />
        <motion.div
          className="relative z-10 mx-auto flex h-full max-w-sm flex-col items-center justify-center px-6"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="invitation-copy-soft mb-10 text-xs uppercase tracking-[0.42em]">Wedding Invitation</p>
          <h1 className="invitation-copy font-script text-[5.8rem] leading-[0.75]">
            Joey
            <span className="block text-[0.72em]">&</span>
            Ana
          </h1>
          <p className="invitation-copy mt-10 font-display text-3xl font-semibold">Are getting married</p>
          <button
            type="button"
            onClick={onOpen}
            className="invitation-copy mt-12 flex size-36 items-center justify-center rounded-full border-2 border-ivory/90 bg-black/40 px-7 py-4 font-display text-3xl italic backdrop-blur-md transition hover:bg-black/60 focus:outline-none focus:ring-4 focus:ring-ivory/30"
          >
            Start
            <span className="sr-only"> Open Invitation</span>
          </button>
          <p className="invitation-copy mt-5 font-display text-3xl font-semibold">Tap to start</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
