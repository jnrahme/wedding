'use client';

import Image from 'next/image';
import { useMemo, useRef, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Church,
  ExternalLink,
  GlassWater,
  HelpCircle,
  MapPin,
  Plane,
  Shirt,
} from 'lucide-react';
import { wedding } from '@/config/wedding';
import { Countdown } from './Countdown';
import { RSVP } from './RSVP';

type InvitationBoxProps = {
  openExternalRsvp: () => void;
};

type Slide = {
  id: string;
  image: string;
  eyebrow: string;
  content: ReactNode;
};

export function InvitationBox({ openExternalRsvp }: InvitationBoxProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = useMemo<Slide[]>(
    () => [
      {
        id: 'names',
        image: wedding.images.story[0],
        eyebrow: 'Are getting married',
        content: (
          <div className="text-center">
            <h1 className="font-display text-[5.2rem] font-medium leading-[0.78] text-ivory">
              Joey
              <span className="block text-[0.52em] italic gold-text">&</span>
              Ana
            </h1>
            <p className="mt-8 font-display text-3xl italic leading-10 text-ivory">
              Together with our families, we invite you to celebrate the beginning of our forever.
            </p>
          </div>
        ),
      },
      {
        id: 'date',
        image: wedding.images.story[1],
        eyebrow: wedding.tagline,
        content: (
          <div className="text-center">
            <CalendarDays className="mx-auto mb-5 text-gold" size={34} aria-hidden="true" />
            <h2 className="font-display text-6xl leading-none text-ivory">{wedding.date.display}</h2>
            <p className="mt-7 font-display text-3xl italic leading-10 text-ivory">
              When 8·8·8 found us, two paths became one.
            </p>
            <p className="mt-5 text-sm uppercase tracking-[0.24em] text-champagne/85">Infinite Love</p>
          </div>
        ),
      },
      {
        id: 'ceremony',
        image: wedding.images.story[2],
        eyebrow: 'The Ceremony',
        content: (
          <EventCard
            icon={<Church className="text-gold" aria-hidden="true" />}
            title={wedding.details.ceremony.venue}
            time={wedding.details.ceremony.time}
            location={wedding.details.ceremony.location}
            note={wedding.details.ceremony.note}
            mapUrl={wedding.details.ceremony.mapUrl}
          />
        ),
      },
      {
        id: 'reception',
        image: wedding.images.story[3],
        eyebrow: 'The Reception',
        content: (
          <EventCard
            icon={<GlassWater className="text-gold" aria-hidden="true" />}
            title={wedding.details.reception.venue}
            time={wedding.details.reception.time}
            location={wedding.details.reception.location}
            note={wedding.details.reception.note}
            mapUrl={wedding.details.reception.mapUrl}
          />
        ),
      },
      {
        id: 'dress',
        image: wedding.images.story[4],
        eyebrow: 'Evening Details',
        content: (
          <div className="text-center">
            <Shirt className="mx-auto mb-5 text-gold" size={34} aria-hidden="true" />
            <h2 className="font-display text-5xl text-ivory">{wedding.details.dressCode}</h2>
            <p className="mt-6 text-lg leading-8 text-ivory/84">{wedding.details.adultsOnly}</p>
            <div className="mt-8 grid gap-3">
              {wedding.schedule.map((item) => (
                <div key={`${item.time}-${item.label}`} className="rounded-md border border-gold/30 bg-ink/30 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold">{item.time}</p>
                  <p className="mt-1 text-ivory">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: 'countdown',
        image: wedding.images.story[5],
        eyebrow: 'Countdown',
        content: <Countdown compact />,
      },
      {
        id: 'rsvp',
        image: wedding.images.story[6],
        eyebrow: 'Kindly Reply',
        content: <RSVP openExternalRsvp={openExternalRsvp} compact />,
      },
      {
        id: 'travel',
        image: wedding.images.story[7],
        eyebrow: 'Travel',
        content: (
          <div className="text-center">
            <Plane className="mx-auto mb-5 text-gold" size={34} aria-hidden="true" />
            <h2 className="font-display text-5xl text-ivory">Batroun, Lebanon</h2>
            <p className="mt-6 text-lg leading-8 text-ivory/82">{wedding.travel.body}</p>
            <a
              href={wedding.travelUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink"
            >
              Travel & Accommodation
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        ),
      },
      {
        id: 'faq',
        image: wedding.images.story[0],
        eyebrow: 'Questions',
        content: (
          <div>
            <HelpCircle className="mx-auto mb-5 text-gold" size={34} aria-hidden="true" />
            <h2 className="text-center font-display text-5xl text-ivory">FAQ</h2>
            <div className="mt-7 space-y-4 text-left">
              {wedding.faq.map((item) => (
                <div key={item.question} className="rounded-md border border-gold/24 bg-ink/35 p-4">
                  <h3 className="font-semibold text-champagne">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-ivory/76">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ],
    [openExternalRsvp],
  );

  function goToSlide(index: number) {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }
    scroller.scrollTo({ left: scroller.clientWidth * nextIndex, behavior: 'smooth' });
    setActiveSlide(nextIndex);
  }

  function handleScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }
    setActiveSlide(Math.round(scroller.scrollLeft / scroller.clientWidth));
  }

  return (
    <section className="flex min-h-dvh items-center justify-center bg-[radial-gradient(circle_at_50%_20%,rgba(198,161,91,0.18),transparent_28rem),linear-gradient(135deg,#080807,#10251f_52%,#080807)] p-0 sm:p-6">
      <div className="relative h-dvh w-full overflow-hidden bg-ink shadow-2xl sm:h-[min(86vh,860px)] sm:max-w-[430px] sm:rounded-[2rem] sm:border sm:border-gold/35">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Swipe invitation pages"
        >
          {slides.map((slide, index) => (
            <article key={slide.id} className="relative h-full min-w-full snap-center overflow-hidden">
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 430px"
                priority={index < 2}
                className="object-cover opacity-58"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-ink/42 to-ink/94" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(198,161,91,0.16),transparent_18rem)]" />
              <div className="relative z-10 flex h-full flex-col px-7 pb-24 pt-16">
                <p className="text-center text-xs uppercase tracking-[0.34em] text-champagne/84">{slide.eyebrow}</p>
                <div className="flex flex-1 items-center justify-center overflow-y-auto py-8">{slide.content}</div>
                {index < slides.length - 1 ? (
                  <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center text-ivory/92">
                    <span className="font-display text-3xl italic">Swipe Left</span>
                    <ArrowLeft className="mt-2" size={34} aria-hidden="true" />
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="absolute left-0 right-0 top-5 z-20 flex justify-center gap-2" aria-label="Invitation page position">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition ${index === activeSlide ? 'w-8 bg-gold' : 'w-4 bg-ivory/35'}`}
              aria-label={`Go to invitation page ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute inset-x-4 bottom-4 z-30 flex items-center justify-between">
          <button
            type="button"
            onClick={() => goToSlide(activeSlide - 1)}
            className="flex size-10 items-center justify-center rounded-full bg-ink/45 text-ivory backdrop-blur-md disabled:opacity-30"
            disabled={activeSlide === 0}
            aria-label="Previous invitation page"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <p className="font-display text-2xl text-ivory">
            Joey & Ana <span className="text-gold">—</span> 08.08.2026
          </p>
          <button
            type="button"
            onClick={() => goToSlide(activeSlide + 1)}
            className="flex size-10 items-center justify-center rounded-full bg-ink/45 text-ivory backdrop-blur-md disabled:opacity-30"
            disabled={activeSlide === slides.length - 1}
            aria-label="Next invitation page"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

type EventCardProps = {
  icon: ReactNode;
  title: string;
  time: string;
  location: string;
  note: string;
  mapUrl: string;
};

function EventCard({ icon, title, time, location, note, mapUrl }: EventCardProps) {
  return (
    <div className="text-center">
      <div className="mb-5 flex justify-center">{icon}</div>
      <h2 className="font-display text-5xl leading-none text-ivory">{title}</h2>
      <p className="mt-5 text-lg text-champagne">{time}</p>
      <p className="mt-2 flex items-center justify-center gap-2 text-ivory/82">
        <MapPin size={17} aria-hidden="true" />
        {location}
      </p>
      <p className="mt-6 text-base leading-7 text-ivory/76">{note}</p>
      <a
        href={mapUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-champagne"
      >
        Google Maps
        <ExternalLink size={15} aria-hidden="true" />
      </a>
    </div>
  );
}
