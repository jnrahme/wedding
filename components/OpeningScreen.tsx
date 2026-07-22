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
      className="fixed inset-0 z-50 flex min-h-dvh items-center justify-center overflow-hidden bg-ink px-6 text-center"
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Opening invitation"
    >
      <Image
        src={wedding.images.coupleHero}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-ink/48" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/42 to-ink/82" />
      <div className="absolute inset-0 bg-radial-gold" />
      <motion.div
        className="absolute h-[34rem] w-[34rem] rounded-full border border-gold/20"
        animate={prefersReducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 54, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="relative z-10 mx-auto flex max-w-sm flex-col items-center"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-7 text-xs uppercase tracking-[0.42em] text-champagne/85">
          Wedding Invitation
        </p>
        <div className="mb-8 flex size-44 items-center justify-center rounded-full border border-gold/60 bg-ink/25 shadow-glow backdrop-blur-sm">
          <span className="font-display text-6xl font-medium italic gold-text">
            {wedding.couple.monogram}
          </span>
        </div>
        <h1 className="font-display text-4xl font-medium leading-tight text-ivory">
          {wedding.tagline}
        </h1>
        <p className="mt-3 text-sm uppercase tracking-[0.34em] text-gold">
          {wedding.subtitle}
        </p>
        <button
          type="button"
          onClick={onOpen}
          className="mt-10 flex size-44 items-center justify-center rounded-full border-2 border-ivory/90 bg-ink/20 px-7 py-4 font-display text-3xl italic text-ivory shadow-glow backdrop-blur-sm transition hover:bg-ivory/10 focus:outline-none focus:ring-4 focus:ring-gold/30"
        >
          Open
          <span className="sr-only">Invitation</span>
        </button>
        <p className="mt-5 font-display text-3xl italic text-ivory">Tap to start</p>
        <p className="mt-3 text-xs leading-6 text-ivory/58">Music begins only after you open the invitation.</p>
      </motion.div>
    </motion.section>
  );
}
