'use client';

import { FormEvent, useState } from 'react';
import { ExternalLink, Send } from 'lucide-react';
import { Reveal } from './Reveal';

type RSVPProps = {
  openExternalRsvp: () => void;
  compact?: boolean;
};

export function RSVP({ openExternalRsvp, compact = false }: RSVPProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    // Connect this payload to Google Sheets, Formspree, Supabase, or another backend.
    // Example: await fetch('/api/rsvp', { method: 'POST', body: JSON.stringify(payload) });
    console.info('RSVP payload ready for backend connection:', payload);
    setSubmitted(true);
    event.currentTarget.reset();
  }

  if (compact) {
    return (
      <div className="w-full text-center">
        <h2 className="invitation-copy font-script text-[4.8rem] leading-none">RSVP</h2>
        <p className="invitation-copy mt-8 font-display text-2xl leading-8">
          Kindly reply through our wedding RSVP page.
        </p>
        <button
          type="button"
          onClick={openExternalRsvp}
          className="mt-10 inline-flex min-w-48 items-center justify-center gap-3 rounded-full border border-gold/80 bg-black/50 px-9 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-gold backdrop-blur-sm transition hover:bg-black/60 focus:outline-none focus:ring-4 focus:ring-gold/30"
        >
          RSVP
          <ExternalLink size={17} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <section id="rsvp" className="section-shell py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.36em] text-gold">RSVP</p>
        <h2 className="mt-4 font-display text-5xl text-ivory sm:text-6xl">We hope you can join us</h2>
        <p className="mt-5 text-lg leading-8 text-ivory/72">
          Please respond when your invitation details are available. The primary RSVP button opens an external form,
          and the optional form below is ready to connect to your preferred backend.
        </p>
        <button
          type="button"
          onClick={openExternalRsvp}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-ink transition hover:bg-champagne focus:outline-none focus:ring-4 focus:ring-gold/30 sm:w-auto"
        >
          RSVP
          <ExternalLink size={17} aria-hidden="true" />
        </button>
      </Reveal>

      <Reveal className="mx-auto mt-12 max-w-3xl glass-panel rounded-lg p-5 sm:p-8">
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label htmlFor="guestName" className="text-sm text-champagne">
              Guest name
            </label>
            <input id="guestName" name="guestName" className="field mt-2" required autoComplete="name" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="attending" className="text-sm text-champagne">
                Attending
              </label>
              <select id="attending" name="attending" className="field mt-2" defaultValue="Yes">
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div>
              <label htmlFor="guestCount" className="text-sm text-champagne">
                Number of guests
              </label>
              <input id="guestCount" name="guestCount" type="number" min="1" max="4" className="field mt-2" defaultValue="1" />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="mealPreference" className="text-sm text-champagne">
                Meal preference
              </label>
              <select id="mealPreference" name="mealPreference" className="field mt-2" defaultValue="">
                <option value="">Select preference</option>
                <option>Beef</option>
                <option>Chicken</option>
                <option>Fish</option>
                <option>Vegetarian</option>
              </select>
            </div>
            <div>
              <label htmlFor="dietaryRestrictions" className="text-sm text-champagne">
                Dietary restrictions
              </label>
              <input id="dietaryRestrictions" name="dietaryRestrictions" className="field mt-2" />
            </div>
          </div>
          <div>
            <label htmlFor="songRequest" className="text-sm text-champagne">
              Song request
            </label>
            <input id="songRequest" name="songRequest" className="field mt-2" />
          </div>
          <div>
            <label htmlFor="message" className="text-sm text-champagne">
              Message to the couple
            </label>
            <textarea id="message" name="message" className="field mt-2 min-h-32 resize-y" />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gold bg-transparent px-7 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-champagne transition hover:bg-gold hover:text-ink focus:outline-none focus:ring-4 focus:ring-gold/20"
          >
            Submit Built-In Form
            <Send size={17} aria-hidden="true" />
          </button>
          {submitted ? (
            <p className="rounded-md border border-gold/30 bg-gold/10 p-4 text-sm text-champagne" role="status">
              Thank you. This demo form captured the response in the browser console and is ready for backend connection.
            </p>
          ) : null}
        </form>
      </Reveal>
    </section>
  );
}
