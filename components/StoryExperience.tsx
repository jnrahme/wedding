'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, CalendarDays, Church, Gem, MapPin } from 'lucide-react';
import { wedding } from '@/config/wedding';

type StoryExperienceProps = {
  onRsvp: () => void;
};

const slides = [
  {
    eyebrow: 'The Invitation',
    title: 'Joey',
    ampersand: '&',
    titleSecond: 'Ana',
    body: wedding.copy.invitation,
    image: wedding.images.coupleHero,
    icon: Gem,
  },
  {
    eyebrow: wedding.tagline,
    title: wedding.date.display,
    body: wedding.copy.story,
    image: wedding.images.coupleHero,
    icon: CalendarDays,
  },
  {
    eyebrow: wedding.details.ceremony.title,
    title: wedding.details.ceremony.venue,
    body: `${wedding.details.ceremony.time} · ${wedding.details.ceremony.location}`,
    image: wedding.images.venue,
    icon: Church,
  },
  {
    eyebrow: wedding.details.reception.title,
    title: wedding.details.reception.venue,
    body: `${wedding.details.reception.time} · ${wedding.details.reception.location}`,
    image: wedding.images.venue,
    icon: MapPin,
  },
];

export function StoryExperience({ onRsvp }: StoryExperienceProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-ink sm:hidden" aria-label="Mobile invitation story">
      <div className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <article key={slide.eyebrow} className="relative min-h-dvh min-w-full snap-center overflow-hidden">
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover opacity-58"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/24 via-ink/40 to-ink/92" />
              <div className="absolute inset-x-0 top-8 z-10 flex justify-center gap-2" aria-hidden="true">
                {slides.map((dot, dotIndex) => (
                  <span
                    key={dot.eyebrow}
                    className={`h-1 rounded-full ${dotIndex === index ? 'w-9 bg-gold' : 'w-5 bg-ivory/34'}`}
                  />
                ))}
              </div>
              <motion.div
                className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-7 py-20 text-center"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <Icon className="mb-5 text-gold" aria-hidden="true" />
                <p className="text-xs uppercase tracking-[0.34em] text-champagne/84">{slide.eyebrow}</p>
                <h2 className="mt-5 font-display text-6xl font-medium leading-[0.9] text-ivory">
                  {slide.title}
                  {slide.ampersand ? <span className="block text-4xl italic gold-text">{slide.ampersand}</span> : null}
                  {slide.titleSecond ? <span className="block">{slide.titleSecond}</span> : null}
                </h2>
                <p className="mt-7 max-w-sm font-display text-3xl italic leading-10 text-ivory">{slide.body}</p>
                {index === slides.length - 1 ? (
                  <button
                    type="button"
                    onClick={onRsvp}
                    className="mt-10 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-ink shadow-glow"
                  >
                    RSVP
                  </button>
                ) : (
                  <div className="absolute bottom-10 flex flex-col items-center text-ivory/90" aria-hidden="true">
                    <span className="font-display text-3xl italic">Swipe Left</span>
                    <ArrowLeft className="mt-2" />
                  </div>
                )}
              </motion.div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
