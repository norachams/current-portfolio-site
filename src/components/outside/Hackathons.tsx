import Image from "next/image";
import { hackathons } from "@/data/outside";
import { pastelSoft } from "@/lib/pastels";

// A small square beside the text on wider screens; on phones the card stacks, so it fills the card's width.
const frame = "flex size-[156px] shrink-0 items-center justify-center rounded-[10px] max-sm:h-[260px] max-sm:w-full";

export default function Hackathons() {
  return (
    <section aria-label="Hackathons" className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {hackathons.map((hack, i) => (
        <article
          key={i}
          className="flex gap-6 rounded-card border border-line bg-paper-raised p-5 max-sm:flex-col max-sm:gap-4"
        >
          {/* Clip or photo shrunk onto the pastel square so the colour frames it, or a labelled square until it's in. */}
          {hack.video ? (
            <div className={`${pastelSoft[hack.pastel]} ${frame} p-3`}>
              <PhoneClip src={hack.video} />
            </div>
          ) : hack.photo ? (
            // Photos are landscape, so on phones the frame hugs the photo's height instead.
            <div className={`${pastelSoft[hack.pastel]} ${frame} p-3 max-sm:h-auto`}>
              <Image
                src={hack.photo}
                alt={`${hack.project} at ${hack.event}`}
                placeholder="blur"
                sizes="(max-width: 639px) 100vw, 132px"
                className="h-auto max-h-full w-auto max-w-full rounded-[6px]"
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className={`${pastelSoft[hack.pastel]} ${frame} font-mono text-xs text-on-pastel`}
            >
              [team photo]
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[13px] text-ink-muted">
              <span>{hack.event}</span>
              {hack.winner && (
                <span className="rounded-full bg-gold px-2 py-px text-xs text-on-pastel">winner ★</span>
              )}
            </div>
            <h3 className="font-serif text-[28px] leading-[1.2] font-normal">{hack.project}</h3>
            <p className="text-base leading-[1.65]">{hack.line}</p>

            <div className="mt-auto flex gap-4 pt-2 font-mono text-[13px]">
              <ExternalLink href={hack.devpost}>devpost ↗</ExternalLink>
              <ExternalLink href={hack.code}>code ↗</ExternalLink>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

/**
 * The phone-mockup clips are exported on black (mp4 can't keep transparency), so this crops the video
 * to the phone's own outline, rounded to match its corners. Measured from the 672×1280 export:
 * the phone spans x 69–603, y 69–1248, with corners of about a 63px radius.
 */
function PhoneClip({ src }: { src: string }) {
  return (
    <div className="relative aspect-[535/1180] h-full overflow-hidden rounded-[11.8%/5.3%]">
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute top-[-5.85%] left-[-12.9%] h-[108.47%] w-[125.61%] max-w-none motion-reduce:hidden"
      />
    </div>
  );
}

/** Shows muted text until there's a real link. */
function ExternalLink({ href, children }: { href?: string; children: React.ReactNode }) {
  if (!href) return <span className="text-ink-muted">{children}</span>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-rosewood hover:underline hover:decoration-2 hover:underline-offset-3">
      {children}
    </a>
  );
}
