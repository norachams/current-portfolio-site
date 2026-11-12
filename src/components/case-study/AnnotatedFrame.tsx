"use client";

import { useEffect, useRef, useState } from "react";
import { useIframeCursor } from "@/hooks/useIframeCursor";

type Note = {
  /** id of the element inside the framed page that this note points at. */
  target: string;
  title: string;
  text: string;
};

/**
 * A long page shown in a fixed-height, scrollable frame, with numbered notes beside it. Clicking a note
 * scrolls the frame to the element it targets, and the note for whatever is in view lights up as you
 * scroll the frame.
 */
export default function AnnotatedFrame({
  src,
  title,
  notes,
  height = 620,
}: {
  src: string;
  title: string;
  notes: Note[];
  height?: number;
}) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [active, setActive] = useState<number | null>(null);
  useIframeCursor(frameRef);

  // Track which pinned part of the framed page is in view (same-origin, so we can read its scroll).
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let cleanup = () => {};
    const attach = () => {
      cleanup();
      const win = frame.contentWindow;
      const doc = frame.contentDocument;
      if (!win || !doc) return;
      let raf = 0;
      const update = () => {
        raf = 0;
        const line = win.innerHeight * 0.5;
        let current: number | null = null;
        notes.forEach((note, i) => {
          const el = doc.getElementById(note.target);
          if (el && el.getBoundingClientRect().top <= line) current = i;
        });
        // The last part can be too short to ever reach the middle of the frame, so light it up once the
        // frame is scrolled all the way down.
        const root = doc.scrollingElement ?? doc.documentElement;
        if (notes.length && win.scrollY + win.innerHeight >= root.scrollHeight - 4) current = notes.length - 1;
        setActive(current);
      };
      const onScroll = () => {
        if (!raf) raf = win.requestAnimationFrame(update);
      };
      win.addEventListener("scroll", onScroll, { passive: true });
      update();
      cleanup = () => {
        win.removeEventListener("scroll", onScroll);
        if (raf) win.cancelAnimationFrame(raf);
      };
    };
    frame.addEventListener("load", attach);
    if (frame.contentDocument?.readyState === "complete") attach();
    return () => {
      frame.removeEventListener("load", attach);
      cleanup();
    };
  }, [notes]);

  const jumpTo = (target: string) => {
    const win = frameRef.current?.contentWindow;
    const el = frameRef.current?.contentDocument?.getElementById(target);
    if (!win || !el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Scroll only the frame (scrollIntoView would also scroll the case study page around it).
    win.scrollTo({ top: el.getBoundingClientRect().top + win.scrollY - 16, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <figure className="grid grid-cols-1 gap-5 sm:grid-cols-[minmax(0,1fr)_220px]">
      {/* The card stretches to the height of the notes beside it, and the frame fills it (never shorter than `height`). */}
      <div className="flex flex-col overflow-hidden rounded-card border border-line bg-paper-raised shadow-lift">
        {/* A slim title bar so it reads as a real artifact someone received. */}
        <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5">
          <span aria-hidden="true" className="size-2 rounded-full bg-line-strong" />
          <span aria-hidden="true" className="size-2 rounded-full bg-line-strong" />
          <span aria-hidden="true" className="size-2 rounded-full bg-line-strong" />
          <span className="ml-2 truncate font-mono text-[11px] text-ink-muted">{title}</span>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 font-mono text-[11px] text-rosewood hover:underline hover:decoration-2 hover:underline-offset-3"
          >
            open ↗
          </a>
        </div>
        <iframe ref={frameRef} src={src} title={title} loading="lazy" style={{ minHeight: height }} className="block w-full flex-1" />
      </div>

      <ol className="flex flex-col gap-2 sm:gap-3">
        {notes.map((note, i) => (
          <li key={note.target}>
            <button
              type="button"
              onClick={() => jumpTo(note.target)}
              aria-current={active === i ? "true" : undefined}
              className={`grid w-full cursor-pointer grid-cols-[22px_minmax(0,1fr)] gap-x-2.5 rounded-xl px-2.5 py-2 text-left transition-colors duration-200 ${
                active === i ? "bg-paper-sunk" : "hover:bg-paper-sunk/60"
              }`}
            >
              <span
                aria-hidden="true"
                className="mt-px grid size-[22px] place-items-center rounded-full bg-rosewood text-[11px] font-semibold text-paper"
              >
                {i + 1}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-ink-strong">{note.title}</span>
                <span className="text-[13px] leading-[1.5] text-ink-muted">{note.text}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </figure>
  );
}
