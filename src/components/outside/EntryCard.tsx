import type { Pastel } from "@/data/projects";
import { pastelSoft } from "@/lib/pastels";

/**
 * Cream volunteering card: optional dates above the title, then an optional pastel chip and sentence.
 * With a url the whole card links out, like the experience cards on the me page.
 */
export default function EntryCard({
  title,
  dates,
  chip,
  pastel,
  note,
  url,
}: {
  title: string;
  dates?: string;
  chip?: string;
  pastel: Pastel;
  note?: string;
  url?: string;
}) {
  const card = (
    <article className="flex flex-col gap-3 rounded-card border border-line bg-paper-raised px-6 pt-5 pb-6 transition-shadow duration-200 group-hover:shadow-lift">
      <div className="flex flex-col gap-1">
        {dates && <span className="font-mono text-xs text-ink-muted">{dates}</span>}
        {/* Linked cards underline the name on hover so it reads as a link. */}
        <h4
          className={`font-serif text-[28px] leading-[1.2] font-normal ${
            url ? "decoration-rosewood decoration-2 underline-offset-4 group-hover:underline" : ""
          }`}
        >
          {title}
        </h4>
      </div>
      {chip && (
        <span className={`${pastelSoft[pastel]} self-start rounded-full px-2.5 py-0.5 font-mono text-xs text-on-pastel`}>
          {chip}
        </span>
      )}
      {note && <p className="text-[15px] leading-[1.65]">{note}</p>}
    </article>
  );

  if (!url) return card;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group block rounded-card text-ink">
      {card}
    </a>
  );
}

/** Label on a pastel tag that heads a column of cards. */
export function ColumnLabel({ pastel, children }: { pastel: Pastel; children: React.ReactNode }) {
  return (
    <h3
      className={`${pastelSoft[pastel]} self-start rounded-tag px-2.5 py-0.5 font-serif text-[22px] leading-[1.3] font-normal text-on-pastel`}
    >
      {children}
    </h3>
  );
}
