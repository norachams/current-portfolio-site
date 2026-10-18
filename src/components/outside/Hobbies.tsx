"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { preload } from "react-dom";
import { hobbies, type Hobby } from "@/data/outside";
import { useFollower } from "@/hooks/useFollower";
import Cats from "./Cats";
import Placeholder from "./Placeholder";

// Loose polaroid stack around the cursor.
const stack = [
  { x: 0, y: 0, rotate: -8 },
  { x: 60, y: -36, rotate: 4 },
  { x: 120, y: 6, rotate: 11 },
  { x: 40, y: 70, rotate: -3 },
];

export default function Hobbies() {
  const [hovered, setHovered] = useState<Hobby | null>(null);
  const [opened, setOpened] = useState<string | null>(null);
  const lastPointer = useRef<string>("");
  const { ref, moveTo } = useFollower<HTMLDivElement>(hovered !== null, { offsetX: 24, offsetY: -120 });

  // Load the hover photos up front so the stack never pops in late.
  for (const hobby of hobbies) {
    for (const extra of hobby.extras ?? []) preload(extra.src, { as: "image" });
  }

  return (
    <section aria-label="Hobbies" className="flex flex-col gap-4">
      <p className="font-mono text-[11px] text-ink-muted">
        <span className="[@media(hover:none)]:hidden">hover a photo to see more</span>
        <span className="hidden [@media(hover:none)]:inline">tap a photo to see more</span>
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-7">
        {hobbies.map((hobby) => {
          const isOpen = opened === hobby.slug;
          return (
            <figure
              key={hobby.slug}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                moveTo(e.clientX, e.clientY, hovered === null);
                setHovered(hobby);
              }}
              onPointerMove={(e) => moveTo(e.clientX, e.clientY)}
              onPointerLeave={() => setHovered(null)}
              className="flex min-w-0 flex-col gap-2.5"
            >
              {/* Mouse users get the hover stack; touch and keyboard toggle a swipeable row. */}
              <button
                type="button"
                aria-expanded={isOpen}
                aria-label={`more ${hobby.name} photos`}
                onPointerDown={(e) => (lastPointer.current = e.pointerType)}
                onClick={() => {
                  if (lastPointer.current === "mouse") return;
                  lastPointer.current = "";
                  setOpened(isOpen ? null : hobby.slug);
                }}
                className="relative block h-[300px] w-full cursor-default overflow-hidden rounded-card"
              >
                {hobby.photo ? (
                  <Image src={hobby.photo} alt="" fill sizes="(min-width: 1080px) 255px, 50vw" className="object-cover" />
                ) : (
                  <Placeholder pastel={hobby.pastel} label={`${hobby.name} photo`} className="h-full" />
                )}
              </button>
              <figcaption className="flex flex-col gap-1">
                <span className="font-serif text-[22px] leading-[1.2]">{hobby.name}</span>
                <span className="text-sm leading-normal text-ink-muted">{hobby.caption}</span>
              </figcaption>
              {isOpen && (
                <ul className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1" aria-label={`more ${hobby.name} photos`}>
                  {extrasFor(hobby).map((extra, i) => (
                    <li key={i} className="relative h-[150px] w-[120px] shrink-0 snap-start overflow-hidden rounded-tag">
                      {extra ? (
                        <Image src={extra} alt="" fill sizes="120px" className="object-cover" />
                      ) : (
                        <Placeholder pastel={hobby.pastel} label={`more ${hobby.name} ${i + 1}`} className="h-full" />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </figure>
          );
        })}
      </div>

      <Cats />

      <div
        ref={ref}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-10 will-change-transform ${hovered ? "" : "invisible"}`}
      >
        {hovered &&
          extrasFor(hovered).map((extra, i) => (
            <div
              key={i}
              style={{ left: stack[i].x, top: stack[i].y, rotate: `${stack[i].rotate}deg` }}
              className="absolute h-[190px] w-[150px] rounded-tag border border-line bg-paper-raised p-2 pb-7 shadow-lift"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[3px]">
                {extra ? (
                  <Image src={extra} alt="" fill sizes="134px" className="object-cover" />
                ) : (
                  <Placeholder pastel={hovered.pastel} label={`more ${hovered.name} ${i + 1}`} className="h-full text-[10px]" />
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

/** Up to 4 extra photos, padded with placeholders. */
function extrasFor(hobby: Hobby) {
  return stack.map((_, i) => hobby.extras?.[i] ?? null);
}
