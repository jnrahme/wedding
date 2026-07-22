'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { wedding } from '@/config/wedding';
import { Reveal } from './Reveal';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-shell py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.36em] text-gold">Questions</p>
        <h2 className="mt-4 font-display text-5xl text-ivory sm:text-6xl">Frequently asked questions</h2>
      </Reveal>
      <Reveal className="mx-auto mt-10 max-w-3xl divide-y divide-gold/20 rounded-lg border border-gold/24 bg-ivory/[0.04]">
        {wedding.faq.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-lg text-ivory focus:outline-none focus:ring-4 focus:ring-inset focus:ring-gold/20 sm:px-7"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`shrink-0 text-gold transition ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {isOpen ? <p className="px-5 pb-6 leading-7 text-ivory/68 sm:px-7">{item.answer}</p> : null}
            </div>
          );
        })}
      </Reveal>
    </section>
  );
}
