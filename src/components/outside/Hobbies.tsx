"use client";

import Image, { getImageProps, type StaticImageData } from "next/image";
import { useRef, useState } from "react";
import { preload } from "react-dom";
import { hobbies, type Caption, type Hobby } from "@/data/outside";
import type { Pastel } from "@/data/projects";
import { pastelBg, pastelSoft } from "@/lib/pastels";
import Cats from "./Cats";
import Placeholder from "./Placeholder";

// Image trail: how far the cursor travels before the next photo drops,
// how many can be on screen at once, and the photo size.
const SPACING = 70;
const MAX_ON_SCREEN = 5;
const TRAIL_W = 96;
const TRAIL_H = 120;
// Wide hobbies (landscape photos) drop landscape photos.
const WIDE_TRAIL_W = 150;
const WIDE_TRAIL_H = 110;
const PLACEHOLDER_COUNT = 4;
// Rough half-size of a country pill, to keep pills inside the card.
const PILL_HALF_W = 56;
const PILL_HALF_H = 16;

// Trail frames cycle through the palette, one colour per photo.
const frameColours: Pastel[] = ["mint", "lilac", "peach", "sky", "gold", "blush"];

type Drop = { id: number; x: number; y: number; rotate: number; image: number };

export default function Hobbies() {
  const [opened, setOpened] = useState<string | null>(null);

  // Load the trail photos up front so they never pop in late. Uses the same
  // resized versions the trail requests, not the full-size originals.
  for (const hobby of hobbies) {
    for (const extra of hobby.extras ?? []) {
      const { props } = getImageProps({ src: extra, alt: "", fill: true, sizes: `${hobby.wide ? WIDE_TRAIL_W : TRAIL_W}px` });
      preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes });
    }
  }

  return (
    <section aria-label="Hobbies" className="flex flex-col gap-4">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-7">
        {hobbies.map((hobby, i) => (
          <HobbyCard
            key={hobby.slug}
            hobby={hobby}
            isOpen={opened === hobby.slug}
            onToggle={() => setOpened(opened === hobby.slug ? null : hobby.slug)}
            // A wide last card leaves no room for its own cell, so the cats sit right beside its photo.
            beside={i === hobbies.length - 1 && hobby.wide ? <Cats /> : undefined}
          />
        ))}
        {/* Otherwise the cats take the next grid cell, beside the last hobby. */}
        {!hobbies.at(-1)?.wide && <Cats className="self-center" />}
      </div>
    </section>
  );
}

function HobbyCard({
  hobby,
  isOpen,
  onToggle,
  beside,
}: {
  hobby: Hobby;
  isOpen: boolean;
  onToggle: () => void;
  /** Shown to the right of the photo, like the cats. */
  beside?: React.ReactNode;
}) {
  const [trail, setTrail] = useState<Drop[]>([]);
  const lastDrop = useRef<{ x: number; y: number } | null>(null);
  const dropCount = useRef(0);
  const lastPointer = useRef("");
  const extras = extrasFor(hobby);
  const countries = hobby.countries;
  const [trailW, trailH] = hobby.wide ? [WIDE_TRAIL_W, WIDE_TRAIL_H] : [TRAIL_W, TRAIL_H];
  // Never more on screen than there are photos (or countries), so none repeat at once.
  const maxOnScreen = Math.min(MAX_ON_SCREEN, countries?.length ?? extras.length);

  // Drop the next photo once the cursor has moved far enough from the last one.
  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    // Clamp so every photo (or pill) stays fully inside the card.
    const [halfW, halfH] = countries ? [PILL_HALF_W, PILL_HALF_H] : [trailW / 2, trailH / 2];
    const x = clamp(e.clientX - rect.left, halfW, rect.width - halfW);
    const y = clamp(e.clientY - rect.top, halfH, rect.height - halfH);
    const last = lastDrop.current;
    if (last && Math.hypot(x - last.x, y - last.y) < SPACING) return;

    lastDrop.current = { x, y };
    const n = dropCount.current++;
    const drop = { id: n, x, y, rotate: Math.random() * 16 - 8, image: n % (countries?.length ?? extras.length) };
    setTrail((current) => [...current.slice(-(maxOnScreen - 1)), drop]);
  };

  const clearTrail = () => {
    lastDrop.current = null;
    setTrail([]);
  };

  return (
    // Wide cards take two columns (once the grid has two) and size the card to the photo's shape;
    // with something beside them they take a third so it fits on the same row.
    <figure className={`flex min-w-0 flex-col gap-2.5 ${hobby.wide ? `min-[500px]:col-span-2 ${beside ? "min-[740px]:col-span-3" : ""}` : ""}`}>
      <div className={beside ? "flex flex-wrap items-center gap-x-10 gap-y-6" : "contents"}>
        {/* Mouse users get a trail of photos (or country pills); touch and keyboard toggle a row instead. */}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={countries ? "countries i've been to" : `more ${hobby.name} photos`}
          onPointerMove={onPointerMove}
          onPointerLeave={clearTrail}
          onPointerDown={(e) => (lastPointer.current = e.pointerType)}
          // The photo trail follows the mouse, so no cursor is drawn over it.
          data-own-cursor
          onClick={() => {
            if (lastPointer.current === "mouse") return;
            lastPointer.current = "";
            onToggle();
          }}
          style={hobby.wide && hobby.photo ? { aspectRatio: `${hobby.photo.width} / ${hobby.photo.height}` } : undefined}
          className={`${pastelSoft[hobby.pastel]} relative block h-[300px] ${hobby.wide ? "w-auto max-w-full self-start" : "w-full"} cursor-default overflow-hidden [@media(hover:hover)]:cursor-none rounded-card`}
        >
          {/* Main photo inset so the card's pastel tint shows as a frame around it, matching the hackathon photo squares. */}
          {hobby.photo ? (
            <div className="absolute inset-1.5 overflow-hidden rounded-[11px]">
              <Image
                src={hobby.photo}
                alt=""
                fill
                sizes={hobby.wide ? "(min-width: 500px) 400px, 100vw" : "(min-width: 1080px) 255px, 50vw"}
                style={{ objectPosition: hobby.photoPosition }}
                className="object-cover"
              />
            </div>
          ) : (
            <Placeholder pastel={hobby.pastel} label={`${hobby.name} photo`} className="h-full" />
          )}

          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {trail.map((drop) =>
              countries ? (
                <span
                  key={drop.id}
                  onAnimationEnd={() => setTrail((current) => current.filter((d) => d.id !== drop.id))}
                  style={{ left: drop.x, top: drop.y, "--tilt": `${drop.rotate}deg` } as React.CSSProperties}
                  className={`${pastelBg[frameColours[drop.id % frameColours.length]]} trail-drop absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 font-mono text-xs whitespace-nowrap text-on-pastel shadow-lift`}
                >
                  {countries[drop.image]}
                </span>
              ) : (
                <div
                  key={drop.id}
                  onAnimationEnd={() => setTrail((current) => current.filter((d) => d.id !== drop.id))}
                  style={
                    {
                      left: drop.x - trailW / 2,
                      top: drop.y - trailH / 2,
                      width: trailW,
                      height: trailH,
                      "--tilt": `${drop.rotate}deg`,
                    } as React.CSSProperties
                  }
                  className={`${pastelBg[frameColours[drop.id % frameColours.length]]} trail-drop absolute rounded-[6px] p-[3px] shadow-lift`}
                >
                  <TrailPhoto image={extras[drop.image]} hobby={hobby} index={drop.image} sizes={`${trailW}px`} />
                </div>
              ),
            )}
          </div>
        </button>
        {beside}
      </div>

      <figcaption className="flex flex-col gap-1">
        <span className="font-serif text-[22px] leading-[1.2]">{hobby.name}</span>
        <span className="text-sm leading-normal text-ink-muted">
          <CaptionText caption={hobby.caption} />
        </span>
      </figcaption>

      {isOpen && countries && (
        <ul className="flex flex-wrap gap-1.5" aria-label="countries i've been to">
          {countries.map((country, i) => (
            <CountryPill key={i} country={country} index={i} />
          ))}
        </ul>
      )}

      {isOpen && !countries && (
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

function CountryPill({ country, index }: { country: string; index: number }) {
  return (
    <li
      className={`${pastelBg[frameColours[index % frameColours.length]]} rounded-full px-2.5 py-1 font-mono text-[11px] text-on-pastel`}
    >
      {country}
    </li>
  );
}

function CaptionText({ caption }: { caption: Caption }) {
  if (typeof caption === "string") return caption;
  return caption.map((part, i) =>
    typeof part === "string" ? (
      part
    ) : (
      <a
        key={i}
        href={part.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-rosewood hover:underline hover:decoration-2 hover:underline-offset-3"
      >
        {part.text}
      </a>
    ),
  );
}

/** The hobby's extra photos, or placeholders until they're added. */
function extrasFor(hobby: Hobby): (StaticImageData | null)[] {
  return hobby.extras?.length ? hobby.extras : Array.from({ length: PLACEHOLDER_COUNT }, () => null);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
