'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react';
import { wedding } from '@/config/wedding';
import { GoldParticles } from './GoldParticles';

type HeroProps = {
  onRsvp: () => void;
};

export function Hero({ onRsvp }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-dvh overflow-hidden">
      <Image
        src={wedding.images.coupleHero}
        alt="Elegant destination wedding visual placeholder"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
      <div className="absolute inset-0 bg-radial-gold" />
      <GoldParticles />
      <div className="section-shell relative z-10 flex min-h-dvh flex-col items-center justify-center pb-16 pt-24 text-center">
        <motion.p
          className="ornament-line w-full max-w-xs text-xs uppercase tracking-[0.4em] text-champagne/85"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {wedding.tagline}
        </motion.p>
        <motion.h1
          className="mt-8 max-w-4xl font-display text-[clamp(4rem,18vw,9rem)] font-medium leading-[0.88] text-ivory"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Joey
          <span className="block text-[0.46em] italic gold-text">&</span>
          Ana
        </motion.h1>
        <motion.div
          className="mt-8 flex flex-col items-center gap-3 text-sm uppercase tracking-[0.2em] text-ivory/82 sm:flex-row sm:gap-8"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
        >
          <span className="flex items-center gap-2">
            <CalendarDays aria-hidden="true" size={17} />
            {wedding.date.display}
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-gold sm:block" />
          <span className="flex items-center gap-2">
            <MapPin aria-hidden="true" size={17} />
            Batroun, Lebanon
          </span>
        </motion.div>
        <motion.p
          className="mt-8 max-w-2xl text-balance text-lg leading-8 text-ivory/82 sm:text-xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          {wedding.copy.invitation}
        </motion.p>
        <motion.div
          className="mt-10 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
        >
          <button
            type="button"
            onClick={onRsvp}
            className="rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-champagne focus:outline-none focus:ring-4 focus:ring-gold/30"
          >
            RSVP
          </button>
          <a
            href="#details"
            className="rounded-full border border-gold/55 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-ivory transition hover:bg-ivory/10 focus:outline-none focus:ring-4 focus:ring-gold/20"
          >
            View Details
          </a>
        </motion.div>
      </div>
    </section>
  );
}
