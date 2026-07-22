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
        <h2 className="invitation-copy font-display text-5xl">RSVP</h2>
        <p className="invitation-copy-soft mt-5 text-lg leading-8">
          Please respond using the external RSVP link, or use the built-in form below when a backend is connected.
        </p>
        <button
          type="button"
          onClick={openExternalRsvp}
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-gold/60 bg-black/40 px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-gold"
        >
          RSVP
          <ExternalLink size={17} aria-hidden="true" />
        </button>
        <form onSubmit={handleSubmit} className="mt-7 grid max-h-[46dvh] gap-3 overflow-y-auto text-left">
          <input name="guestName" className="field" placeholder="Guest name" required autoComplete="name" />
          <div className="grid grid-cols-2 gap-3">
            <select name="attending" className="field" defaultValue="Yes" aria-label="Attending">
              <option>Yes</option>
              <option>No</option>
            </select>
            <input
              name="guestCount"
              type="number"
              min="1"
              max="4"
              className="field"
              defaultValue="1"
              aria-label="Number of guests"
            />
          </div>
          <input name="mealPreference" className="field" placeholder="Meal preference" />
          <input name="dietaryRestrictions" className="field" placeholder="Dietary restrictions" />
          <input name="songRequest" className="field" placeholder="Song request" />
          <textarea name="message" className="field min-h-24 resize-y" placeholder="Message to the couple" />
          <button
            type="submit"
            className="rounded-full border border-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-champagne"
          >
            Submit Built-In Form
          </button>
          {submitted ? (
            <p className="rounded-md border border-gold/30 bg-gold/10 p-3 text-xs text-champagne" role="status">
              Response prepared for backend connection.
            </p>
          ) : null}
        </form>
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
