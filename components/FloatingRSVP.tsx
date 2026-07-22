'use client';

type FloatingRSVPProps = {
  enabled: boolean;
  onRsvp: () => void;
};

export function FloatingRSVP({ enabled, onRsvp }: FloatingRSVPProps) {
  if (!enabled) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onRsvp}
      className="fixed bottom-20 right-4 z-40 rounded-full bg-gold px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink shadow-glow transition hover:bg-champagne focus:outline-none focus:ring-4 focus:ring-gold/30"
      aria-label="Open RSVP"
    >
      RSVP
    </button>
  );
}
