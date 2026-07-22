'use client';

import Image from 'next/image';
import { useMemo, useRef, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  CalendarDays,
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
        eyebrow: '',
        content: (
          <div className="text-center">
            <h1 className="invitation-copy font-display text-[4.25rem] font-medium italic leading-[0.9]">
              Joey
              <span className="block text-[0.72em] italic">&</span>
              Ana
            </h1>
            <p className="invitation-copy mt-8 font-display text-2xl">Are getting married</p>
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
            <h2 className="invitation-copy font-display text-6xl leading-none">{wedding.date.display}</h2>
            <p className="invitation-copy mt-7 font-display text-3xl italic leading-10">
              When 8·8·8 found us, two paths became one.
            </p>
            <p className="invitation-copy-soft mt-5 text-sm uppercase tracking-[0.24em]">Infinite Love</p>
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
            <h2 className="invitation-copy font-display text-5xl">{wedding.details.dressCode}</h2>
            <p className="invitation-copy-soft mt-6 text-lg leading-8">{wedding.details.adultsOnly}</p>
            <div className="mt-8 grid gap-3">
              {wedding.schedule.map((item) => (
                <div key={`${item.time}-${item.label}`} className="rounded-md border border-gold/30 bg-white/42 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-gold">{item.time}</p>
                  <p className="mt-1 text-champagne">{item.label}</p>
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
            <h2 className="invitation-copy font-display text-5xl">Batroun, Lebanon</h2>
            <p className="invitation-copy-soft mt-6 text-lg leading-8">{wedding.travel.body}</p>
            <a
              href={wedding.travelUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 bg-white/44 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
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
            <h2 className="invitation-copy text-center font-display text-5xl">FAQ</h2>
            <div className="mt-7 space-y-4 text-left">
              {wedding.faq.map((item) => (
                <div key={item.question} className="rounded-md border border-gold/24 bg-white/42 p-4">
                  <h3 className="font-semibold text-champagne">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-champagne/80">{item.answer}</p>
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
    <section className="flex min-h-dvh items-center justify-center bg-black p-3 sm:p-8">
      <div className="relative h-[calc(100dvh-1.5rem)] w-full max-w-[430px] overflow-hidden rounded-[4px] border-[6px] border-ivory bg-ink shadow-2xl sm:h-[min(92vh,860px)]">
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
                className="object-cover opacity-72"
              />
              <div className="absolute inset-0 bg-white/34" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/28 via-white/44 to-white/66" />
              <div className="absolute inset-x-8 top-[28%] h-[42%] rounded-full bg-white/48 blur-3xl" />
              <div className="relative z-10 flex h-full flex-col px-7 pb-20 pt-16">
                {slide.eyebrow ? (
                  <p className="invitation-copy-soft text-center font-display text-2xl">{slide.eyebrow}</p>
                ) : null}
                <div className="flex flex-1 items-center justify-center overflow-y-auto py-8">{slide.content}</div>
                {index < slides.length - 1 ? (
                  <div className="invitation-copy absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center">
                    <span className="font-display text-2xl italic">Swipe Left</span>
                    <ArrowLeft className="mt-2" size={34} aria-hidden="true" />
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2" aria-label="Invitation page position">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              className={`size-1.5 rounded-full transition ${index === activeSlide ? 'bg-ivory' : 'bg-ivory/35'}`}
              aria-label={`Go to invitation page ${index + 1}`}
            />
          ))}
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
      <h2 className="invitation-copy font-display text-5xl leading-none">{title}</h2>
      <p className="mt-5 text-lg text-champagne">{time}</p>
      <p className="mt-2 flex items-center justify-center gap-2 text-champagne/82">
        <MapPin size={17} aria-hidden="true" />
        {location}
      </p>
      <p className="mt-6 text-base leading-7 text-champagne/80">{note}</p>
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
