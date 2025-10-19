// src/components/ui/MusicToggle.tsx
import React, { useEffect, useRef, useState } from "react";

type Props = {
  audioUrl?: string;
  localStorageKey?: string;
  defaultVolume?: number; // 0..1
  autoPlayOnLoad?: boolean; // cố gắng autoplay khi load
};

export default function MusicToggle({
  audioUrl = "/audio/bg-music.mp3",
  localStorageKey = "site_music_playing_v1",
  defaultVolume = 0.25,
  autoPlayOnLoad = true,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem(localStorageKey);
      return raw ? JSON.parse(raw) === true : false;
    } catch {
      return false;
    }
  });
  const [attemptedAuto, setAttemptedAuto] = useState(false);

  // init audio element
  useEffect(() => {
    if (!audioRef.current) {
      const a = new Audio(audioUrl);
      a.loop = true;
      a.volume = defaultVolume;
      a.preload = "auto";
      audioRef.current = a;
    }
  }, [audioUrl, defaultVolume]);

  // try to autoplay on load if allowed and user hasn't explicitly turned off
  useEffect(() => {
    if (!autoPlayOnLoad) return;
    // if localStorage explicitly false => don't autoplay
    try {
      const raw = localStorage.getItem(localStorageKey);
      if (raw === "false") {
        return;
      }
    } catch {
      // ignore
    }

    const a = audioRef.current;
    if (!a) return;

    let cleanup = () => {};
    async function tryPlayNow() {
      if (attemptedAuto) return;
      setAttemptedAuto(true);
      try {
        await a.play();
        setIsPlaying(true);
        localStorage.setItem(localStorageKey, JSON.stringify(true));
      } catch (err) {
        // autoplay blocked — attach one-time pointerdown listener to play on first user gesture
        const onFirstGesture = async () => {
          try {
            await a.play();
            setIsPlaying(true);
            localStorage.setItem(localStorageKey, JSON.stringify(true));
          } catch {
            // still blocked; leave isPlaying false
          } finally {
            window.removeEventListener("pointerdown", onFirstGesture);
            window.removeEventListener("keydown", onFirstGesture);
          }
        };
        window.addEventListener("pointerdown", onFirstGesture, { once: true });
        window.addEventListener("keydown", onFirstGesture, { once: true });
        cleanup = () => {
          window.removeEventListener("pointerdown", onFirstGesture);
          window.removeEventListener("keydown", onFirstGesture);
        };
      }
    }

    tryPlayNow();

    return () => cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayOnLoad, audioRef.current]);

  // sync play/pause when user toggles
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    async function apply() {
      try {
        if (isPlaying) {
          await a.play();
        } else {
          a.pause();
        }
        localStorage.setItem(localStorageKey, JSON.stringify(isPlaying));
      } catch {
        // ignore if blocked
      }
    }
    apply();
  }, [isPlaying, localStorageKey]);

  const handleToggle = async () => {
    const a = audioRef.current;
    if (!a) return;

    try {
      if (isPlaying) {
        a.pause();
        setIsPlaying(false);
        localStorage.setItem(localStorageKey, JSON.stringify(false)); // explicit off
      } else {
        await a.play();
        setIsPlaying(true);
        localStorage.setItem(localStorageKey, JSON.stringify(true)); // explicit on
      }
    } catch (err) {
      console.error("Audio play failed", err);
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-pressed={isPlaying}
      title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      className={`flex items-center justify-center w-10 h-10 rounded-full shadow-sm focus:outline-none transition-colors ${
        isPlaying ? "bg-primary text-white" : "bg-background text-foreground/80 hover:bg-muted"
      }`}
    >
      {isPlaying ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
        </svg>
      )}
    </button>
  );
}
