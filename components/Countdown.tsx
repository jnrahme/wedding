'use client';

import { useEffect, useMemo, useState } from 'react';
import { wedding } from '@/config/wedding';
import { Reveal } from './Reveal';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const target = new Date(wedding.date.iso).getTime();
  const difference = Math.max(target - Date.now(), 0);

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

type CountdownProps = {
  compact?: boolean;
};

export function Countdown({ compact = false }: CountdownProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const units = useMemo(
    () => [
      ['Days', timeLeft.days],
      ['Hours', timeLeft.hours],
      ['Minutes', timeLeft.minutes],
      ['Seconds', timeLeft.seconds],
    ],
    [timeLeft],
  );

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(getTimeLeft());
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (compact) {
    return (
      <div className="w-full text-center">
        <h2 className="invitation-copy font-display text-5xl">Until {wedding.date.display}</h2>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {units.map(([label, value]) => (
            <div key={label} className="rounded-md border border-gold/30 bg-black/40 p-4">
              <p className="font-display text-4xl text-gold">{isMounted ? String(value).padStart(2, '0') : '--'}</p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-champagne/76">{label}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="border-y border-gold/20 bg-ink/38 py-14">
      <Reveal className="section-shell text-center">
        <p className="text-xs uppercase tracking-[0.36em] text-gold">Countdown</p>
        <h2 className="mt-4 font-display text-4xl text-ivory sm:text-5xl">
          Until {wedding.date.display}
        </h2>
        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {units.map(([label, value]) => (
            <div key={label} className="fine-border rounded-lg bg-ivory/[0.04] p-5">
              <p className="font-display text-4xl text-ivory sm:text-5xl">
                {isMounted ? String(value).padStart(2, '0') : '--'}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-champagne/70">{label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
