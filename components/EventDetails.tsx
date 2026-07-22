import { ExternalLink, MapPin, Shirt } from 'lucide-react';
import { wedding } from '@/config/wedding';
import { Reveal } from './Reveal';

const events = [wedding.details.ceremony, wedding.details.reception];

export function EventDetails() {
  return (
    <section id="details" className="section-shell py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.36em] text-gold">{wedding.subtitle}</p>
        <h2 className="mt-4 font-display text-5xl leading-tight text-ivory sm:text-6xl">
          {wedding.copy.story}
        </h2>
        <p className="mt-6 text-lg leading-8 text-ivory/72">{wedding.copy.destination}</p>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {events.map((event, index) => (
          <Reveal key={event.title} delay={index * 0.1} className="glass-panel rounded-lg p-6 sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-gold">{event.title}</p>
                <h3 className="mt-3 font-display text-4xl text-ivory">{event.venue}</h3>
              </div>
              <MapPin className="mt-2 shrink-0 text-gold" aria-hidden="true" />
            </div>
            <dl className="mt-8 space-y-5 text-ivory/76">
              <div>
                <dt className="text-xs uppercase tracking-[0.26em] text-champagne/70">Location</dt>
                <dd className="mt-1 text-lg">{event.location}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.26em] text-champagne/70">Time</dt>
                <dd className="mt-1 text-lg">{event.time}</dd>
              </div>
            </dl>
            <p className="mt-6 leading-7 text-ivory/68">{event.note}</p>
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-champagne transition hover:bg-gold hover:text-ink focus:outline-none focus:ring-4 focus:ring-gold/20"
            >
              Google Maps
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-5 glass-panel rounded-lg p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3 text-gold">
              <Shirt aria-hidden="true" />
              <p className="text-xs uppercase tracking-[0.32em]">Dress Code</p>
            </div>
            <h3 className="mt-4 font-display text-4xl text-ivory">{wedding.details.dressCode}</h3>
            <p className="mt-4 leading-7 text-ivory/68">{wedding.details.adultsOnly}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {wedding.schedule.map((item) => (
              <div key={`${item.time}-${item.label}`} className="rounded-md border border-gold/20 bg-ivory/[0.04] p-4">
                <p className="text-sm uppercase tracking-[0.22em] text-gold">{item.time}</p>
                <p className="mt-2 text-ivory/82">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
