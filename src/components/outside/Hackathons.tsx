import type { Pastel } from "@/data/projects";
import { hackathons } from "@/data/outside";
import { pastelMid, pastelSoft } from "@/lib/pastels";

const mateColors: Pastel[] = ["mint", "lilac", "peach", "sky", "blush"];

export default function Hackathons() {
  return (
    <section aria-label="Hackathons" className="grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] gap-6">
      {hackathons.map((hack, i) => (
        <article
          key={i}
          className="relative flex min-h-[200px] overflow-hidden rounded-card border border-line bg-paper-raised transition-transform duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:-rotate-[0.6deg]"
        >
          <div className={`${pastelSoft[hack.pastel]} flex w-[132px] shrink-0 flex-col justify-between gap-3 px-[18px] py-5 text-on-pastel`}>
            <span className="font-mono text-[11px] leading-[1.4] tracking-[0.06em]">{hack.event}</span>
            <span className="font-serif text-[34px] leading-none">{hack.year}</span>
          </div>

          {/* Tear line with notches */}
          <div aria-hidden="true" className="relative shrink-0 border-l-2 border-dashed border-line">
            <span className="absolute -top-2.5 -left-[11px] size-5 rounded-full border border-line bg-paper" />
            <span className="absolute -bottom-2.5 -left-[11px] size-5 rounded-full border border-line bg-paper" />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2.5 px-[22px] py-5">
            <h3 className="font-serif text-2xl leading-[1.15] font-normal">{hack.project}</h3>
            <p className="text-sm leading-normal">{hack.line}</p>
            <span className="font-mono text-[11px] text-ink-muted">{hack.stack}</span>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5">
                <ul className="flex" aria-label="team">
                  {hack.team.map((mate, j) => (
                    <li key={j} className="-ml-2 first:ml-0 hover:z-10 focus-within:z-10">
                      <span
                        role="img"
                        tabIndex={0}
                        aria-label={mate.name}
                        className={`${pastelMid[mateColors[j % mateColors.length]]} group relative flex size-[30px] items-center justify-center rounded-full border-2 border-paper-raised text-[11px] font-medium text-on-pastel`}
                      >
                        {mate.initial}
                        <span className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-10 -translate-x-1/2 translate-y-1 rounded-lg border border-line bg-paper-raised px-2 py-1 text-xs font-normal whitespace-nowrap text-ink opacity-0 transition-[opacity,translate] duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                          {mate.name}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <span className="font-mono text-[11px] text-ink-muted">team of {hack.team.length}</span>
              </div>
              <div className="flex gap-3.5 font-mono text-xs">
                <ExternalLink href={hack.devpost}>devpost ↗</ExternalLink>
                <ExternalLink href={hack.code}>code ↗</ExternalLink>
              </div>
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
