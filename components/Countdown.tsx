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

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft());
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
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

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
                {String(value).padStart(2, '0')}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.24em] text-champagne/70">{label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
