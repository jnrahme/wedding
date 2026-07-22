import Image from 'next/image';
import { ExternalLink, Plane } from 'lucide-react';
import { wedding } from '@/config/wedding';
import { Reveal } from './Reveal';

export function Travel() {
  return (
    <section className="relative overflow-hidden border-y border-gold/20 bg-emerald/36 py-20 sm:py-28">
      <Image
        src={wedding.images.venue}
        alt="Elegant Batroun venue placeholder"
        fill
        sizes="100vw"
        className="object-cover opacity-24"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink/88 via-emerald/78 to-ink/88" />
      <Reveal className="section-shell relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-gold">
            <Plane aria-hidden="true" />
            <p className="text-xs uppercase tracking-[0.34em]">{wedding.travel.title}</p>
          </div>
          <h2 className="mt-5 font-display text-5xl text-ivory sm:text-6xl">A destination evening in Lebanon</h2>
          <p className="mt-6 text-lg leading-8 text-ivory/74">{wedding.travel.body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={wedding.travelUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition hover:bg-champagne focus:outline-none focus:ring-4 focus:ring-gold/30"
            >
              Travel & Accommodation
              <ExternalLink size={16} aria-hidden="true" />
            </a>
            <a
              href={`mailto:${wedding.travel.contact}`}
              className="inline-flex items-center justify-center rounded-full border border-gold/50 px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-champagne transition hover:bg-ivory/10 focus:outline-none focus:ring-4 focus:ring-gold/20"
            >
              Contact
            </a>
          </div>
          <p className="mt-5 text-sm text-ivory/58">
            {wedding.travel.contactLabel}: {wedding.travel.contact}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
