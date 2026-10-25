import { Fragment } from "react";
import { pastelSoft } from "@/lib/pastels";

// Each cat loops through frames drawn from their portraits (see .cat-sprite in globals.css).
// They sit apart, one at each end of the card.
// Both name tags pop up over Woody, centred on him (20px in + half his 194px width = 117px from the right):
// his just above his head (16px + his 124px sprite + 6px), Caramella's stacked one tag higher.
// The tags sit on the card rather than inside each cat, so each shows when its own cat (a named peer) is hovered.
const cats = [
  {
    name: "Caramella",
    age: "10 years",
    sprite: "cat-caramella",
    position: "bottom-4 left-5",
    text: "text-blush",
    label: "bottom-[182px]",
    peer: "peer/caramella",
    show: "peer-hover/caramella:translate-y-0 peer-hover/caramella:opacity-100 peer-focus-visible/caramella:translate-y-0 peer-focus-visible/caramella:opacity-100",
  },
  {
    name: "Woody",
    age: "5 years",
    sprite: "cat-woody",
    position: "right-5 bottom-4",
    text: "text-mint",
    label: "bottom-[146px]",
    peer: "peer/woody",
    show: "peer-hover/woody:translate-y-0 peer-hover/woody:opacity-100 peer-focus-visible/woody:translate-y-0 peer-focus-visible/woody:opacity-100",
  },
];

/** `aspectRatio` sizes the card like a wide hobby photo (and spans two columns like it). */
export default function Cats({ aspectRatio, className = "" }: { aspectRatio?: string; className?: string }) {
  return (
    // Laid out like a hobby card: the cats sit on a pastel card the height of the photos, captioned underneath.
    <figure className={`flex min-w-0 flex-col gap-2.5 ${aspectRatio ? "min-[500px]:col-span-2" : ""} ${className}`}>
      <div
        style={aspectRatio ? { aspectRatio } : undefined}
        className={`${pastelSoft.gold} relative h-[300px] ${aspectRatio ? "w-auto max-w-full self-start" : "w-full"} rounded-card`}
      >
        {/* Inset like the hobby photos so the gold shows as a frame, with a soft cloudy backdrop inside. */}
        <div aria-hidden="true" className="cat-clouds absolute inset-1.5 rounded-[11px]" />
        {cats.map((cat) => (
          <Fragment key={cat.name}>
            <span
              role="img"
              tabIndex={0}
              aria-label={`${cat.name}, ${cat.age}`}
              className={`${cat.peer} absolute ${cat.position} rounded-lg`}
            >
              <span aria-hidden="true" className={`cat-sprite ${cat.sprite}`} />
            </span>
            {/* Styled like the place labels in photography: coloured text on a raised paper tag. */}
            <span
              aria-hidden="true"
              className={`${cat.text} ${cat.label} ${cat.show} pointer-events-none absolute right-[117px] translate-x-1/2 translate-y-1 rounded-lg border border-line bg-paper-raised px-2.5 py-0.5 text-[17px] leading-snug font-medium whitespace-nowrap shadow-lift opacity-0 transition-[opacity,translate] duration-150`}
            >
              {cat.name}, {cat.age}
            </span>
          </Fragment>
        ))}
      </div>
      <figcaption className="flex flex-col gap-1">
        <span className="font-serif text-[22px] leading-[1.2]">cat mom of</span>
        <span className="text-sm leading-normal text-ink-muted">

          <span className="[@media(hover:none)]:hidden">Caramella and Woody</span>
          {/* Touch can't hover the cats for their name tags, so their ages go in the caption. */}
          <span className="hidden [@media(hover:none)]:inline">
            {cats.map((cat) => `${cat.name} (${cat.age})`).join(" and ")}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
