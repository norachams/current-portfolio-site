"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { instagramUrl, photos, placeOf } from "@/data/photography";
import { useFollower } from "@/hooks/useFollower";
import type { Wall } from "@/lib/photoWall";

/** Photo wall layouts for 1, 2 and 3 columns, worked out on the server. */
export type Walls = Record<1 | 2 | 3, Wall>;

const chip = "min-h-9 cursor-pointer rounded-full border border-line px-3.5 font-mono text-xs text-ink hover:bg-paper-sunk";

// The place label over each photo takes one of these, so neighbouring photos differ.
const labelColours = ["text-mint", "text-lilac", "text-peach", "text-sky", "text-gold", "text-blush"];

// Which layout shows at which screen width.
const layouts = [
  { columns: 1, className: "flex sm:hidden" },
  { columns: 2, className: "hidden sm:flex lg:hidden" },
  { columns: 3, className: "hidden lg:flex" },
] as const;

export default function Photography({ walls }: { walls: Walls }) {
  const [hovered, setHovered] = useState<{ place: string; colour: string } | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { ref, moveTo } = useFollower<HTMLDivElement>(hovered !== null, { lag: false });

  // Prev / next in the lightbox follow the 3-column wall, left to right, top to bottom.
  const sequence = readingOrder(walls[3]);

  // Native modal dialog: traps focus, closes on Escape, restores focus on close.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  const step = (by: number) =>
    setOpen((current) => {
      if (current === null) return current;
      const at = sequence.indexOf(current);
      return sequence[(at + by + sequence.length) % sequence.length];
    });
  const shot = open === null ? null : photos[open];

  return (
    <section aria-labelledby="photos-heading" className="flex flex-col gap-5">
      <h2 id="photos-heading" className="font-serif text-[22px] font-medium italic">
        my favourite pictures i took
      </h2>

      {layouts.map(({ columns, className }) => (
        // Columns stretch to the tallest one; the last photo in each fills what's left,
        // so the bottom row lines up. The layout keeps that gap to a few pixels.
        <div key={columns} className={`${className} items-stretch gap-4`}>
          {walls[columns].map((column, c) => (
            <div key={c} className="flex min-w-0 flex-1 flex-col gap-4">
              {column.map((index, i) => {
                const photo = photos[index];
                const place = placeOf(photo);
                const isLast = i === column.length - 1;
                return (
                  <figure key={index} className={isLast ? "flex flex-1 flex-col" : undefined}>
                    <button
                      type="button"
                      aria-label={`Open photo from ${place}`}
                      onPointerEnter={(e) => {
                        if (e.pointerType !== "mouse") return;
                        moveTo(e.clientX, e.clientY, true);
                        setHovered({ place, colour: labelColours[index % labelColours.length] });
                      }}
                      onPointerMove={(e) => moveTo(e.clientX, e.clientY)}
                      onPointerLeave={() => setHovered(null)}
                      onClick={() => {
                        setHovered(null);
                        setOpen(index);
                      }}
                      style={isLast ? { aspectRatio: `${photo.image.width} / ${photo.image.height}` } : undefined}
                      className={`block w-full overflow-hidden rounded-[10px] [@media(hover:hover)]:cursor-none ${
                        isLast ? "relative flex-1" : ""
                      }`}
                    >
                      <Image
                        src={photo.image}
                        alt={`Photo from ${place}`}
                        placeholder="blur"
                        sizes="(min-width: 1024px) 350px, (min-width: 640px) 50vw, 100vw"
                        {...(isLast ? { fill: true, className: "object-cover" } : { className: "h-auto w-full" })}
                      />
                    </button>
                    {/* No cursor pill on touch, so the place shows under the photo instead. */}
                    <figcaption className="hidden pt-1.5 font-serif text-base [@media(hover:none)]:block">{place}</figcaption>
                  </figure>
                );
              })}
            </div>
          ))}
        </div>
      ))}

      <a
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="self-end font-mono text-xs text-rosewood hover:underline hover:decoration-2 hover:underline-offset-3"
      >
        more on my instagram ↗
      </a>

      <div ref={ref} aria-hidden="true" className={`pointer-events-none fixed top-0 left-0 z-20 ${hovered ? "" : "invisible"}`}>
        {/* Rounded box (not a pill) in dark, so the pastel text reads over any photo. */}
        <span
          className={`${hovered?.colour ?? ""} block -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[rgba(36,32,27,0.72)] px-2.5 py-1 font-serif text-base font-medium whitespace-nowrap shadow-lift backdrop-blur-sm`}
        >
          {hovered?.place}
        </span>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={shot ? `Photo from ${placeOf(shot)}` : "Photo"}
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
            <Image
              src={shot.image}
              alt={`Photo from ${placeOf(shot)}`}
              placeholder="blur"
              sizes="760px"
              className="max-h-[70vh] w-full rounded-lg object-contain"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-1">
              <span className="font-serif text-[22px]">{placeOf(shot)}</span>
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

/** Photo indices left to right, top to bottom, like reading the wall. */
function readingOrder(wall: Wall) {
  const longest = Math.max(...wall.map((column) => column.length));
  const order: number[] = [];
  for (let row = 0; row < longest; row++) {
    for (const column of wall) if (column[row] !== undefined) order.push(column[row]);
  }
  return order;
}
