import Image from "next/image";
import { hackathons } from "@/data/outside";
import { pastelSoft } from "@/lib/pastels";

export default function Hackathons() {
  return (
    <section aria-label="Hackathons" className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {hackathons.map((hack, i) => (
        <article
          key={i}
          className="flex gap-6 rounded-card border border-line bg-paper-raised p-5 max-sm:flex-col max-sm:gap-4"
        >
          {/* Team photo, or a labelled pastel square until it's in. */}
          {hack.photo ? (
            <Image
              src={hack.photo}
              alt={`team at ${hack.event}`}
              placeholder="blur"
              sizes="156px"
              className="size-[156px] shrink-0 rounded-[10px] object-cover"
            />
          ) : (
            <div
              aria-hidden="true"
              className={`${pastelSoft[hack.pastel]} flex size-[156px] shrink-0 items-center justify-center rounded-[10px] font-mono text-xs text-on-pastel`}
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

/** Shows muted text until there's a real link. */
function ExternalLink({ href, children }: { href?: string; children: React.ReactNode }) {
  if (!href) return <span className="text-ink-muted">{children}</span>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-rosewood hover:underline hover:decoration-2 hover:underline-offset-3">
      {children}
    </a>
  );
}
