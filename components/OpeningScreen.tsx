'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { wedding } from '@/config/wedding';

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
      <div className="relative h-[calc(100dvh-1.5rem)] w-full max-w-[430px] overflow-hidden rounded-[4px] border-[6px] border-ivory bg-ink shadow-2xl sm:h-[min(92vh,860px)]">
        <Image
          src={wedding.images.coupleHero}
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 100vw, 430px"
          className="object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-white/34" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/28 via-white/44 to-white/62" />
        <div className="absolute inset-x-10 top-1/4 h-1/2 rounded-full bg-white/46 blur-3xl" />
        <motion.div
          className="relative z-10 mx-auto flex h-full max-w-sm flex-col items-center justify-center px-6"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="invitation-copy-soft mb-8 text-xs uppercase tracking-[0.42em]">Wedding Invitation</p>
          <h1 className="invitation-copy font-display text-6xl font-medium italic leading-tight">
            {wedding.couple.monogram}
          </h1>
          <p className="invitation-copy mt-8 font-display text-3xl">{wedding.tagline}</p>
          <button
            type="button"
            onClick={onOpen}
            className="invitation-copy mt-12 flex size-36 items-center justify-center rounded-full border-2 border-gold/80 bg-white/42 px-7 py-4 font-display text-3xl italic backdrop-blur-md transition hover:bg-white/56 focus:outline-none focus:ring-4 focus:ring-gold/30"
          >
            Start
            <span className="sr-only"> Open Invitation</span>
          </button>
          <p className="invitation-copy mt-5 font-display text-3xl italic">Tap to start</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
