"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A looping clip with pause/play and restart in the top-right corner. Autoplays unless the viewer prefers
 * reduced motion, in which case it waits for a press of play.
 */
export default function VideoPlayer({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    video.play().catch(() => {});
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const restart = () => {
    const video = ref.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const button =
    "flex size-7 cursor-pointer items-center justify-center rounded-full text-ink-strong transition-colors duration-150 hover:bg-paper-sunk focus-visible:outline-2 focus-visible:outline-rosewood";

  return (
    <div className="relative">
      <video
        ref={ref}
        src={src}
        loop
        muted
        playsInline
        aria-label={alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block h-auto w-full"
      />
      <div className="absolute top-2.5 right-2.5 flex items-center gap-0.5 rounded-full border border-line bg-paper-raised/90 p-0.5 shadow-sm backdrop-blur-sm">
        <button type="button" onClick={toggle} aria-label={playing ? "Pause video" : "Play video"} className={button}>
          {playing ? (
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 fill-current">
              <rect x="3.5" y="2.5" width="3" height="11" rx="1" />
              <rect x="9.5" y="2.5" width="3" height="11" rx="1" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 fill-current">
              <path d="M4.5 2.9v10.2a1 1 0 0 0 1.5.86l8.3-5.1a1 1 0 0 0 0-1.72L6 2.04a1 1 0 0 0-1.5.86Z" />
            </svg>
          )}
        </button>
        <button type="button" onClick={restart} aria-label="Replay video from the start" className={button}>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="size-3.5 fill-none stroke-current"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.75 8a5.25 5.25 0 1 0 1.54-3.71" />
            <path d="M2.75 2.5v2.75H5.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
