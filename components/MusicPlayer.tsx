'use client';

import { useEffect, useRef, useState } from 'react';
import { Music, Pause, Play, Volume1, Volume2, VolumeX } from 'lucide-react';
import { wedding } from '@/config/wedding';

type MusicPlayerProps = {
  enabled: boolean;
  compact?: boolean;
};

const FADE_INTERVAL_MS = 120;
const FADE_STEP = 0.035;

export function MusicPlayer({ enabled, compact = false }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.42);
  const [hasAudioError, setHasAudioError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !enabled || !wedding.musicFileUrl || hasAudioError) {
      return;
    }

    audio.volume = 0;
    audio.muted = isMuted;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        let currentVolume = 0;
        const fade = window.setInterval(() => {
          currentVolume = Math.min(currentVolume + FADE_STEP, volume);
          audio.volume = currentVolume;
          if (currentVolume >= volume) {
            window.clearInterval(fade);
          }
        }, FADE_INTERVAL_MS);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  }, [enabled, hasAudioError, isMuted, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [isMuted, volume]);

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio || hasAudioError) {
      return;
    }

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  const label = isPlaying ? 'Pause music' : 'Play music';

  if (!enabled) {
    return null;
  }

  return (
    <div
      className={`fixed z-40 rounded-full ${
        compact
          ? 'bottom-[max(1.75rem,calc(4dvh+1.5rem))] left-[max(1.75rem,calc(50vw-215px+1.5rem))]'
          : 'bottom-4 right-4 border border-gold/35 bg-ink/70 px-3 py-2 shadow-glow backdrop-blur-md'
      }`}
    >
      {wedding.musicFileUrl ? (
        <audio
          ref={audioRef}
          src={wedding.musicFileUrl}
          preload="none"
          loop
          onError={() => setHasAudioError(true)}
          aria-label="Background music"
        />
      ) : null}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          disabled={!wedding.musicFileUrl || hasAudioError}
          className="flex size-10 items-center justify-center rounded-full bg-transparent text-ivory transition hover:bg-ivory/10 focus:outline-none focus:ring-4 focus:ring-ivory/30 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={label}
          title={hasAudioError ? 'Music file unavailable' : label}
        >
          {isPlaying ? (
            <Pause size={22} aria-hidden="true" />
          ) : compact ? (
            <Music size={25} aria-hidden="true" />
          ) : (
            <Play size={18} aria-hidden="true" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setIsMuted((value) => !value)}
          disabled={!wedding.musicFileUrl || hasAudioError}
          className={`size-9 items-center justify-center rounded-full text-champagne transition hover:bg-ivory/10 focus:outline-none focus:ring-4 focus:ring-gold/20 disabled:cursor-not-allowed disabled:opacity-50 ${
            compact ? 'hidden' : 'flex'
          }`}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
          title={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? <VolumeX size={18} aria-hidden="true" /> : volume > 0.45 ? <Volume2 size={18} aria-hidden="true" /> : <Volume1 size={18} aria-hidden="true" />}
        </button>
        <label className="sr-only" htmlFor="musicVolume">
          Music volume
        </label>
        <input
          id="musicVolume"
          aria-label="Music volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          disabled={!wedding.musicFileUrl || hasAudioError}
          className={`h-1 accent-gold disabled:opacity-50 ${compact ? 'hidden w-16' : 'w-20'}`}
        />
      </div>
    </div>
  );
}
