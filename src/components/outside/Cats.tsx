import { Fragment } from "react";
import { pastelSoft } from "@/lib/pastels";

// Each cat loops through frames drawn from their portraits (see .cat-sprite in globals.css).
// They sit apart, one toward each end of the card (a little further in once the card is wide).
// Each name tag pops up next to its own cat.
// Caramella's sits beside her, to her right at about head height: 20px in + her 152px width + 8px = 180px
// from the left (56px in = 216px on the wide card). Woody's is centred above him: 20px in + half his 194px width = 117px from the right
// (153px on the wide card), above his 124px sprite (16px + 124px + 6px).
// The tags sit on the card rather than inside each cat, so each shows when its own cat (a named peer) is hovered.
const cats = [
  {
    name: "Caramella",
    age: "10 years",
    sprite: "cat-caramella",
    position: "bottom-4 left-5 min-[500px]:left-14",
    text: "text-blush",
    label: "bottom-[200px] left-[180px] min-[500px]:left-[216px]",
    peer: "peer/caramella",
    show: "peer-hover/caramella:translate-y-0 peer-hover/caramella:opacity-100 peer-focus-visible/caramella:translate-y-0 peer-focus-visible/caramella:opacity-100",
  },
  {
    name: "Woody",
    age: "5 years",
    sprite: "cat-woody",
    position: "right-5 bottom-4 min-[500px]:right-14",
    text: "text-mint",
    label: "bottom-[146px] right-[117px] translate-x-1/2 min-[500px]:right-[153px]",
    peer: "peer/woody",
    show: "peer-hover/woody:translate-y-0 peer-hover/woody:opacity-100 peer-focus-visible/woody:translate-y-0 peer-focus-visible/woody:opacity-100",
  },
];

/** `wide` spans two columns, like the wide hobby cards. */
export default function Cats({ wide = false, className = "" }: { wide?: boolean; className?: string }) {
  return (
    // Laid out like a hobby card: the cats sit on a pastel card the height of the photos, captioned underneath.
    <figure className={`flex min-w-0 flex-col gap-2.5 ${wide ? "min-[500px]:col-span-2" : ""} ${className}`}>
      <div className={`${pastelSoft.gold} relative h-[300px] w-full rounded-card`}>
        {/* Inset like the hobby photos so the gold shows as a frame, with a soft cloudy backdrop inside. */}
        <div aria-hidden="true" className="cat-clouds absolute inset-1.5 rounded-inner" />
        {cats.map((cat) => (
          <Fragment key={cat.name}>
            <span
              role="img"
              tabIndex={0}
              aria-label={`${cat.name}, ${cat.age}`}
              className={`${cat.peer} absolute ${cat.position} rounded-box`}
            >
              <span aria-hidden="true" className={`cat-sprite ${cat.sprite}`} />
            </span>
            {/* Styled like the place labels in photography: coloured text on a raised paper tag. */}
            <span
              aria-hidden="true"
              className={`${cat.text} ${cat.label} ${cat.show} pointer-events-none absolute translate-y-1 rounded-box border border-line bg-paper-raised px-2.5 py-0.5 text-[17px] leading-snug font-medium whitespace-nowrap shadow-lift opacity-0 transition-[opacity,translate] duration-150`}
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
