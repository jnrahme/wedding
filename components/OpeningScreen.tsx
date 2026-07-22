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
        <div className="absolute inset-0 bg-black/46" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-black/38 to-black/72" />
        <motion.div
          className="relative z-10 mx-auto flex h-full max-w-sm flex-col items-center justify-center px-6"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-8 text-xs uppercase tracking-[0.42em] text-champagne/85">Wedding Invitation</p>
          <h1 className="font-display text-6xl font-medium italic leading-tight text-ivory">
            {wedding.couple.monogram}
          </h1>
          <p className="mt-8 font-display text-3xl text-ivory">{wedding.tagline}</p>
          <button
            type="button"
            onClick={onOpen}
            className="mt-12 flex size-36 items-center justify-center rounded-full border-2 border-ivory/90 bg-black/20 px-7 py-4 font-display text-3xl italic text-ivory backdrop-blur-sm transition hover:bg-ivory/10 focus:outline-none focus:ring-4 focus:ring-ivory/30"
          >
            Start
            <span className="sr-only"> Open Invitation</span>
          </button>
          <p className="mt-5 font-display text-3xl italic text-ivory">Tap to start</p>
        </motion.div>
      </div>
    </motion.section>
  );
}
