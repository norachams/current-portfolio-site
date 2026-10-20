import { pastelSoft } from "@/lib/pastels";

// Each cat loops through frames drawn from their portraits (see .cat-sprite in globals.css).
// They sit apart, one at each end of the card.
const cats = [
  { name: "Caramella", age: "10 years", sprite: "cat-caramella", position: "bottom-4 left-5" },
  { name: "Woody", age: "5 years", sprite: "cat-woody", position: "right-5 bottom-4" },
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
        {cats.map((cat) => (
          <span
            key={cat.name}
            role="img"
            tabIndex={0}
            aria-label={`${cat.name}, ${cat.age}`}
            className={`group absolute ${cat.position} rounded-lg`}
          >
            <span className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 translate-y-1 rounded-lg border border-line bg-paper-raised px-2.5 py-1 text-xs whitespace-nowrap opacity-0 transition-[opacity,translate] duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              {cat.name}, {cat.age}
            </span>
            <span aria-hidden="true" className={`cat-sprite ${cat.sprite}`} />
          </span>
        ))}
      </div>
      <figcaption className="flex flex-col gap-1">
        <span className="font-serif text-[22px] leading-[1.2]">cat mom of</span>
        <span className="text-sm leading-normal text-ink-muted">Caramella and Woody</span>
      </figcaption>
    </figure>
  );
}
