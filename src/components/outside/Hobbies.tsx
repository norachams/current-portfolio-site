"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { preload } from "react-dom";
import { hobbies, type Hobby } from "@/data/outside";
import Cats from "./Cats";
import Placeholder from "./Placeholder";

// Image trail: how far the cursor travels before the next photo drops,
// how many can be on screen at once, and the polaroid size.
const SPACING = 70;
const MAX_ON_SCREEN = 5;
const TRAIL_W = 96;
const TRAIL_H = 120;
const PLACEHOLDER_COUNT = 4;

type Drop = { id: number; x: number; y: number; rotate: number; image: number };

export default function Hobbies() {
  const [opened, setOpened] = useState<string | null>(null);

  // Load the trail photos up front so they never pop in late.
  for (const hobby of hobbies) {
    for (const extra of hobby.extras ?? []) preload(extra.src, { as: "image" });
  }

  return (
    <section aria-label="Hobbies" className="flex flex-col gap-4">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-7">
        {hobbies.map((hobby) => (
          <HobbyCard
            key={hobby.slug}
            hobby={hobby}
            isOpen={opened === hobby.slug}
            onToggle={() => setOpened(opened === hobby.slug ? null : hobby.slug)}
          />
        ))}
      </div>

      <Cats />
    </section>
  );
}

function HobbyCard({ hobby, isOpen, onToggle }: { hobby: Hobby; isOpen: boolean; onToggle: () => void }) {
  const [trail, setTrail] = useState<Drop[]>([]);
  const lastDrop = useRef<{ x: number; y: number } | null>(null);
  const dropCount = useRef(0);
  const lastPointer = useRef("");
  const extras = extrasFor(hobby);

  // Drop the next photo once the cursor has moved far enough from the last one.
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    // Clamp so every photo stays fully inside the card.
    const x = clamp(e.clientX - rect.left, TRAIL_W / 2, rect.width - TRAIL_W / 2);
    const y = clamp(e.clientY - rect.top, TRAIL_H / 2, rect.height - TRAIL_H / 2);
    const last = lastDrop.current;
    if (last && Math.hypot(x - last.x, y - last.y) < SPACING) return;

    lastDrop.current = { x, y };
    const n = dropCount.current++;
    const drop = { id: n, x, y, rotate: Math.random() * 16 - 8, image: n % extras.length };
    setTrail((current) => [...current.slice(-(MAX_ON_SCREEN - 1)), drop]);
  };

  const clearTrail = () => {
    lastDrop.current = null;
    setTrail([]);
  };

  return (
    <figure className="flex min-w-0 flex-col gap-2.5">
      {/* Mouse users get the trail; touch and keyboard toggle a swipeable row instead. */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={`more ${hobby.name} photos`}
        onPointerMove={onPointerMove}
        onPointerLeave={clearTrail}
        onPointerDown={(e) => (lastPointer.current = e.pointerType)}
        onClick={() => {
          if (lastPointer.current === "mouse") return;
          lastPointer.current = "";
          onToggle();
        }}
        className="relative block h-[300px] w-full cursor-default overflow-hidden rounded-card"
      >
        {hobby.photo ? (
          <Image src={hobby.photo} alt="" fill sizes="(min-width: 1080px) 255px, 50vw" className="object-cover" />
        ) : (
          <Placeholder pastel={hobby.pastel} label={`${hobby.name} photo`} className="h-full" />
        )}

        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {trail.map((drop) => (
            <div
              key={drop.id}
              onAnimationEnd={() => setTrail((current) => current.filter((d) => d.id !== drop.id))}
              style={
                {
                  left: drop.x - TRAIL_W / 2,
                  top: drop.y - TRAIL_H / 2,
                  width: TRAIL_W,
                  height: TRAIL_H,
                  "--tilt": `${drop.rotate}deg`,
                } as React.CSSProperties
              }
              className="trail-drop absolute rounded-tag border border-line bg-paper-raised p-1.5 pb-5 shadow-lift"
            >
              <TrailPhoto image={extras[drop.image]} hobby={hobby} index={drop.image} />
            </div>
          ))}
        </div>
      </button>

      <figcaption className="flex flex-col gap-1">
        <span className="font-serif text-[22px] leading-[1.2]">{hobby.name}</span>
        <span className="text-sm leading-normal text-ink-muted">{hobby.caption}</span>
      </figcaption>

      {isOpen && (
        <ul className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1" aria-label={`more ${hobby.name} photos`}>
          {extras.map((extra, i) => (
            <li key={i} className="relative h-[150px] w-[120px] shrink-0 snap-start overflow-hidden rounded-tag">
              <TrailPhoto image={extra} hobby={hobby} index={i} sizes="120px" />
            </li>
          ))}
        </ul>
      )}
    </figure>
  );
}

function TrailPhoto({
  image,
  hobby,
  index,
  sizes = `${TRAIL_W}px`,
}: {
  image: StaticImageData | null;
  hobby: Hobby;
  index: number;
  sizes?: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[3px]">
      {image ? (
        <Image src={image} alt="" fill sizes={sizes} className="object-cover" />
      ) : (
        <Placeholder pastel={hobby.pastel} label={`${hobby.name} ${index + 1}`} className="h-full text-[10px]" />
      )}
    </div>
  );
}

/** The hobby's extra photos, or placeholders until they're added. */
function extrasFor(hobby: Hobby): (StaticImageData | null)[] {
  return hobby.extras?.length ? hobby.extras : Array.from({ length: PLACEHOLDER_COUNT }, () => null);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
