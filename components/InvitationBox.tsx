'use client';

import { useEffect, useMemo, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import {
  ArrowLeft,
  CalendarDays,
  Church,
  ExternalLink,
  GlassWater,
  Gift,
  MapPin,
  Plane,
  Shirt,
} from 'lucide-react';
import { wedding } from '@/config/wedding';
import { Countdown } from './Countdown';
import { PhotoBackdrop } from './PhotoBackdrop';

type Slide = {
  id: string;
  image: string;
  eyebrow: string;
  content: ReactNode;
};

type SwipePoint = {
  x: number;
  y: number;
};

export function InvitationBox() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const swipeStartRef = useRef<SwipePoint | null>(null);
  const activeSlideRef = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = useMemo<Slide[]>(
    () => [
      {
        id: 'names',
        image: wedding.images.story[0],
        eyebrow: '',
        content: (
          <div className="text-center">
            <h1 className="invitation-copy font-script text-[5.8rem] leading-[0.75]">
              Joey
              <span className="block text-[0.72em]">&</span>
              Ana
            </h1>
            <p className="invitation-copy mt-10 font-display text-2xl font-semibold">Are getting married</p>
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
                <div key={`${item.time}-${item.label}`} className="rounded-md border border-gold/30 bg-black/40 px-4 py-3">
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
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 bg-black/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
            >
              Travel & Accommodation
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        ),
      },
      {
        id: 'registry',
        image: wedding.images.story[5],
        eyebrow: 'Registry',
        content: (
          <div className="text-center">
            <Gift className="mx-auto mb-5 text-gold" size={34} aria-hidden="true" />
            <h2 className="invitation-copy font-display text-5xl">With Love</h2>
            <p className="invitation-copy-soft mt-6 text-lg leading-8">
              Your presence is the greatest gift. For those who wish to celebrate with a gift, our registry is available
              below.
            </p>
            <a
              href={wedding.registryUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-gold/80 bg-black/50 px-7 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold backdrop-blur-sm transition hover:bg-black/60 focus:outline-none focus:ring-4 focus:ring-gold/30"
            >
              View Registry
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        ),
      },
      {
        id: 'faq',
        image: wedding.images.story[0],
        eyebrow: '',
        content: (
          <div className="w-full text-center">
            <div
              className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full border-2 border-ivory text-3xl leading-none text-ivory shadow-[0_2px_8px_rgba(0,0,0,0.75)]"
              aria-hidden="true"
            >
              <span className="-mt-1 font-serif">?</span>
            </div>
            <h2 className="invitation-copy text-center font-display text-5xl">FAQ</h2>
            <div className="mt-5 space-y-3 text-left">
              {wedding.faq.map((item) => (
                <div key={item.question} className="rounded-md border border-gold/25 bg-black/50 p-3">
                  <h3 className="text-sm font-semibold text-champagne">{item.question}</h3>
                  <p className="mt-1 text-xs leading-5 text-champagne/80">{item.answer}</p>
                </div>
              ))}
            </div>
            <a
              href={wedding.faqUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-gold/80 bg-black/50 px-7 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold backdrop-blur-sm transition hover:bg-black/60 focus:outline-none focus:ring-4 focus:ring-gold/30"
            >
              View Q&A
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        ),
      },
    ],
    [],
  );

  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);

  useEffect(() => {
    let lastTouchPoint: SwipePoint | null = null;

    function handleDocumentTouchStart(event: globalThis.TouchEvent) {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }

      startSwipe({ x: touch.clientX, y: touch.clientY });
      lastTouchPoint = { x: touch.clientX, y: touch.clientY };
    }

    function handleDocumentTouchMove(event: globalThis.TouchEvent) {
      const touch = event.touches[0];
      const swipeStart = swipeStartRef.current;
      if (!touch || !swipeStart) {
        return;
      }

      lastTouchPoint = { x: touch.clientX, y: touch.clientY };

      const deltaX = touch.clientX - swipeStart.x;
      const deltaY = touch.clientY - swipeStart.y;
      const isHorizontalIntent = Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2;

      if (isHorizontalIntent) {
        event.preventDefault();
      }
    }

    function handleDocumentTouchEnd(event: globalThis.TouchEvent) {
      const touch = event.changedTouches[0];
      const point = touch ? { x: touch.clientX, y: touch.clientY } : lastTouchPoint;
      lastTouchPoint = null;

      if (!point) {
        swipeStartRef.current = null;
        return;
      }

      const didSwipe = finishSwipe(point);
      if (didSwipe) {
        event.preventDefault();
      }
    }

    function handleDocumentTouchCancel() {
      lastTouchPoint = null;
      swipeStartRef.current = null;
      goToSlide(activeSlideRef.current);
    }

    document.addEventListener('touchstart', handleDocumentTouchStart, { capture: true, passive: true });
    document.addEventListener('touchmove', handleDocumentTouchMove, { capture: true, passive: false });
    document.addEventListener('touchend', handleDocumentTouchEnd, { capture: true, passive: false });
    document.addEventListener('touchcancel', handleDocumentTouchCancel, { capture: true, passive: true });

    return () => {
      document.removeEventListener('touchstart', handleDocumentTouchStart, { capture: true });
      document.removeEventListener('touchmove', handleDocumentTouchMove, { capture: true });
      document.removeEventListener('touchend', handleDocumentTouchEnd, { capture: true });
      document.removeEventListener('touchcancel', handleDocumentTouchCancel, { capture: true });
    };
  });

  function goToSlide(index: number) {
    const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }
    scroller.scrollTo({ left: scroller.clientWidth * nextIndex, behavior: 'smooth' });
    activeSlideRef.current = nextIndex;
    setActiveSlide(nextIndex);
  }

  function handleScroll() {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }
    const nextIndex = Math.round(scroller.scrollLeft / scroller.clientWidth);
    activeSlideRef.current = nextIndex;
    setActiveSlide(nextIndex);
  }

  function startSwipe(point: SwipePoint) {
    swipeStartRef.current = point;
  }

  function finishSwipe(point: SwipePoint) {
    const swipeStart = swipeStartRef.current;
    swipeStartRef.current = null;

    if (!swipeStart) {
      return false;
    }

    const deltaX = point.x - swipeStart.x;
    const deltaY = point.y - swipeStart.y;
    const isHorizontalSwipe = Math.abs(deltaX) > 56 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4;

    if (!isHorizontalSwipe) {
      goToSlide(activeSlide);
      return false;
    }

    goToSlide(activeSlideRef.current + (deltaX < 0 ? 1 : -1));
    return true;
  }

  function handlePointerDown(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') {
      return;
    }

    startSwipe({ x: event.clientX, y: event.clientY });
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerUp(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') {
      return;
    }

    finishSwipe({ x: event.clientX, y: event.clientY });
  }

  return (
    <section
      className="flex min-h-dvh touch-pan-y items-center justify-center bg-black p-3 sm:p-8"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        swipeStartRef.current = null;
        goToSlide(activeSlideRef.current);
      }}
    >
      <div className="relative h-[calc(100dvh-1.5rem)] w-full max-w-[430px] overflow-hidden rounded-[4px] border-[8px] border-ivory bg-ink shadow-2xl sm:h-[min(92vh,860px)]">
        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="flex h-full snap-x snap-mandatory overflow-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Swipe invitation pages"
        >
          {slides.map((slide, index) => (
            <article key={slide.id} className="relative h-full min-w-full snap-center overflow-hidden">
              <PhotoBackdrop src={slide.image} priority={index < 2} />
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
              className={`size-1.5 rounded-full transition ${index === activeSlide ? 'bg-ivory' : 'bg-ivory/40'}`}
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
