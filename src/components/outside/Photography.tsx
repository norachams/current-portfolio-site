"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { instagramUrl, photos } from "@/data/outside";
import { useFollower } from "@/hooks/useFollower";
import Placeholder from "./Placeholder";

const chip = "min-h-9 cursor-pointer rounded-full border border-line px-3.5 font-mono text-xs text-ink hover:bg-paper-sunk";

export default function Photography() {
  const [city, setCity] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { ref, moveTo } = useFollower<HTMLDivElement>(city !== null, { lag: false });

  // Native modal dialog: traps focus, closes on Escape, restores focus on close.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  const step = (by: number) => setOpen((i) => (i === null ? i : (i + by + photos.length) % photos.length));
  const shot = open === null ? null : photos[open];

  return (
    <section aria-labelledby="photos-heading" className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="photos-heading" className="font-serif text-[22px] font-medium italic">
          my favourite pictures i took
        </h2>
        {instagramUrl ? (
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-rosewood hover:underline hover:decoration-2 hover:underline-offset-3">
            more on my instagram ↗
          </a>
        ) : (
          <span className="font-mono text-xs text-ink-muted">more on my instagram ↗</span>
        )}
      </div>

      <div className="columns-[3_260px] gap-4">
        {photos.map((photo, i) => (
          <figure key={i} className="mb-4 break-inside-avoid">
            <button
              type="button"
              aria-label={`Open photo from ${photo.city}`}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                moveTo(e.clientX, e.clientY, true);
                setCity(photo.city);
              }}
              onPointerMove={(e) => moveTo(e.clientX, e.clientY)}
              onPointerLeave={() => setCity(null)}
              onClick={() => {
                setCity(null);
                setOpen(i);
              }}
              className="block w-full overflow-hidden rounded-[10px] [@media(hover:hover)]:cursor-none"
            >
              {photo.image ? (
                <Image src={photo.image} alt={photo.alt ?? ""} sizes="(min-width: 1080px) 350px, 100vw" className="h-auto w-full" />
              ) : (
                <Placeholder pastel={photo.pastel} label={`${photo.city} photo`} style={{ height: photo.height }} />
              )}
            </button>
            {/* No city cursor on touch, so the city shows under the photo instead. */}
            <figcaption className="hidden pt-1.5 font-serif text-base [@media(hover:none)]:block">{photo.city}</figcaption>
          </figure>
        ))}
      </div>

      <div ref={ref} aria-hidden="true" className={`pointer-events-none fixed top-0 left-0 z-20 ${city ? "" : "invisible"}`}>
        <span className="block -translate-x-1/2 -translate-y-1/2 rounded-full border border-line bg-paper-raised px-3.5 py-2 font-serif text-lg whitespace-nowrap shadow-lift">
          {city}
        </span>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={shot ? `Photo from ${shot.city}` : "Photo"}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto w-[min(760px,calc(100%-32px))] max-w-none rounded-card bg-paper-raised p-3.5 text-ink backdrop:bg-[rgba(36,32,27,0.72)]"
      >
        {shot && (
          <div className="flex flex-col gap-3">
            {shot.image ? (
              <Image src={shot.image} alt={shot.alt ?? ""} sizes="760px" className="max-h-[70vh] w-full rounded-lg object-contain" />
            ) : (
              <Placeholder pastel={shot.pastel} label={`${shot.city} photo`} className="h-[min(460px,60vh)] rounded-lg" />
            )}
            <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-1">
              <div className="flex flex-col gap-0.5">
                <span className="font-serif text-[22px]">{shot.city}</span>
                <span className="text-sm text-ink-muted">{shot.caption}</span>
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={chip}>
                  ← prev
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className={chip}>
                  next →
                </button>
                <button type="button" onClick={() => setOpen(null)} aria-label="Close" className={chip}>
                  close ×
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
