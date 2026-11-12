import Link from "next/link";
import { ViewTransition, type ReactNode } from "react";
import VideoPlayer from "./VideoPlayer";

const eyebrow = "font-mono text-[11px] tracking-[0.1em] uppercase";

/** Hero: tag chips (the first can be a live status with a dot), then the clip or image. */
export function CaseStudyHero({
  tags,
  status,
  media,
  morphName,
}: {
  tags: string[];
  /** Shown first, with a small rosewood dot, e.g. "in beta". */
  status?: string;
  media: { type: "image" | "video"; src: string; alt?: string };
  /** Matches the work card's media so it morphs into the hero when you open the case study. */
  morphName?: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <ul className="flex flex-wrap gap-2">
        {status && (
          <li className={`${eyebrow} flex items-center gap-1.5 rounded-full border border-line bg-paper-raised px-3 py-1 text-ink-strong`}>
            <span aria-hidden="true" className="size-1.5 rounded-full bg-rosewood" />
            {status}
          </li>
        )}
        {tags.map((tag) => (
          <li key={tag} className={`${eyebrow} rounded-full border border-line bg-paper-raised px-3 py-1 text-ink-muted`}>
            {tag}
          </li>
        ))}
      </ul>

      <ViewTransition name={morphName} share={morphName ? "morph" : undefined} default="none">
        <div className="aspect-video overflow-hidden rounded-card bg-peach/45 dark:bg-peach">
          {media.type === "video" ? (
            <video
              src={media.src}
              autoPlay
              loop
              muted
              playsInline
              aria-label={media.alt}
              className="h-full w-full object-cover motion-reduce:hidden"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media.src} alt={media.alt ?? ""} className="h-full w-full object-cover" />
          )}
        </div>
      </ViewTransition>
    </div>
  );
}

/**
 * One content section: a small mono label, an optional headline that states the takeaway, then the body.
 * The id must match an entry in the layout's `sections`.
 */
export function CaseStudySection({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="flex scroll-mt-16 flex-col gap-5 min-[900px]:scroll-mt-8">
      {title ? (
        <div className="flex flex-col gap-2">
          <p className={`${eyebrow} text-rosewood`}>{label}</p>
          <h2
            id={`${id}-heading`}
            className="font-serif text-[28px] leading-[1.2] font-normal text-balance text-ink-strong min-[900px]:text-[32px]"
          >
            {title}
          </h2>
        </div>
      ) : (
        <h2 id={`${id}-heading`} className={`${eyebrow} font-normal text-rosewood`}>
          {label}
        </h2>
      )}
      <div className="flex flex-col gap-4 text-base leading-[1.7]">{children}</div>
    </section>
  );
}

/** Role, team, timeline and so on, two to a row on a soft card. */
export function InfoCard({ items, columns = 2 }: { items: { label: string; value: ReactNode }[]; columns?: 2 | 3 }) {
  return (
    <dl
      className={`mt-2 grid grid-cols-1 gap-x-8 gap-y-5 rounded-card bg-paper-sunk/70 p-6 ${
        columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
      }`}
    >
      {items.map(({ label, value }) => (
        <div key={label} className="flex flex-col gap-1">
          <dt className={`${eyebrow} text-ink-muted`}>{label}</dt>
          <dd className="text-[15px] leading-[1.55] text-ink-strong">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** The question the project answers, in a quiet box. */
export function NorthStar({ label = "North star", children }: { label?: string; children: ReactNode }) {
  return (
    <aside className="mt-2 flex flex-col gap-2.5 rounded-card border border-line bg-paper-raised px-6 py-5">
      <span className={`${eyebrow} flex items-center gap-2 text-ink-muted`}>
        <span aria-hidden="true" className="text-rosewood">
          ☆
        </span>
        {label}
      </span>
      <p className="font-serif text-[20px] leading-[1.45] text-ink-strong">{children}</p>
    </aside>
  );
}

/** Big numbers with a line of context and a source each. */
export function Stats({ items }: { items: { figure: ReactNode; text: ReactNode; source: string }[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <li key={i} className="flex flex-col gap-1.5 rounded-card border border-line bg-paper-raised px-5 py-4">
          <span className="font-serif text-[34px] leading-none text-rosewood">{item.figure}</span>
          <span className="text-[15px] leading-[1.5] text-ink-strong">{item.text}</span>
          <span className="mt-auto pt-1 font-mono text-[11px] text-ink-muted">{item.source}</span>
        </li>
      ))}
    </ul>
  );
}

/** One step in a numbered sequence: a big accent number on the left, title and body on the right. */
export function Stage({
  id,
  number,
  title,
  meta,
  children,
}: {
  /** Lets the sidebar link straight to this step. */
  id?: string;
  number: string;
  title: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <li id={id} className="scroll-mt-16 min-[900px]:scroll-mt-8 grid grid-cols-[44px_minmax(0,1fr)] gap-x-4 min-[900px]:grid-cols-[64px_minmax(0,1fr)]">
      <span className="font-serif text-[30px] leading-[1.1] text-rosewood min-[900px]:text-[36px]">{number}</span>
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pt-1">
          <h3 className="font-serif text-[22px] leading-[1.3] font-normal text-ink-strong">{title}</h3>
          {meta && <span className="font-mono text-[11px] text-ink-muted">{meta}</span>}
        </div>
        {children}
      </div>
    </li>
  );
}

/** A highlighted aside, e.g. what a stage taught you. */
export function Callout({ label, children }: { label: string; children: ReactNode }) {
  return (
    <aside className="flex flex-col gap-2 rounded-card bg-peach/35 px-5 py-4 dark:bg-peach/15">
      <span className={`${eyebrow} text-ink-muted`}>{label}</span>
      <div className="flex flex-col gap-3 text-[15px] leading-[1.65]">{children}</div>
    </aside>
  );
}

/** A left-to-right flow of steps on a soft panel, wrapping on small screens. */
export function Flow({ label, steps }: { label?: string; steps: { label: string; detail?: string }[] }) {
  return (
    <figure className="flex flex-col gap-3 rounded-card bg-paper-sunk/70 px-5 py-4">
      {label && <figcaption className={`${eyebrow} text-ink-muted`}>{label}</figcaption>}
      {/* One row on wider screens (steps share the width evenly); stacked with down arrows on phones. */}
      <ol className="flex flex-col gap-1.5 sm:flex-row sm:items-stretch sm:gap-1.5">
        {steps.map((step, i) => (
          <li key={step.label} className="flex flex-col items-stretch gap-1.5 sm:min-w-0 sm:flex-1 sm:flex-row sm:items-center">
            <span className="flex flex-1 flex-col justify-center rounded-tag border border-line bg-paper-raised px-3 py-1.5 sm:self-stretch">
              <span className="text-sm text-ink-strong">{step.label}</span>
              {step.detail && <span className="font-mono text-[10px] text-ink-muted">{step.detail}</span>}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="text-center text-ink-muted max-sm:rotate-90 max-sm:leading-none">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}

/**
 * Steps that repeat: a row of numbered steps with a dashed line underneath running from the last back to
 * the first. On phones the steps stack and the loop is spelled out instead.
 */
export function Loop({ label, steps }: { label?: string; steps: { label: string; detail?: string }[] }) {
  const inset = `${50 / steps.length}%`;
  return (
    <figure className="flex flex-col gap-3 rounded-card bg-paper-sunk/70 px-5 py-4">
      {label && <figcaption className={`${eyebrow} text-ink-muted`}>{label}</figcaption>}
      <ol className="flex flex-col gap-1.5 sm:flex-row sm:gap-1.5">
        {steps.map((step, i) => (
          <li key={step.label} className="flex flex-col items-stretch gap-1.5 sm:min-w-0 sm:flex-1 sm:flex-row sm:items-center">
            <span className="flex flex-1 flex-col gap-0.5 rounded-tag border border-line bg-paper-raised px-3 py-2 sm:self-stretch">
              <span className="font-mono text-[10px] text-rosewood">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm leading-snug text-ink-strong">{step.label}</span>
              {step.detail && <span className="font-mono text-[10px] text-ink-muted">{step.detail}</span>}
            </span>
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="text-center text-ink-muted max-sm:rotate-90 max-sm:leading-none">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      {/* The return path, from under the last step back to under the first. */}
      <div aria-hidden="true" className="relative hidden h-5 sm:block" style={{ marginInline: inset }}>
        <div className="absolute inset-x-0 top-0 h-3.5 rounded-b-lg border-x border-b border-dashed border-ink-muted/60" />
        <span className="absolute -top-1.5 -left-[4.5px] text-[9px] leading-none text-ink-muted">▲</span>
      </div>
      <p className={`${eyebrow} text-center text-[10px] text-ink-muted sm:sr-only`}>↻ then back to 01</p>
    </figure>
  );
}

/**
 * A drop-off funnel: one row per step, with a bar sized against the first step. Highlighted steps
 * (the ones the story is about) get a rosewood bar.
 */
export function Funnel({
  label,
  steps,
}: {
  label?: string;
  steps: { label: string; value: number; highlight?: boolean }[];
}) {
  const max = Math.max(...steps.map((s) => s.value), 1);
  return (
    <figure className="flex flex-col gap-3 rounded-card bg-paper-sunk/70 px-5 py-4">
      {label && <figcaption className={`${eyebrow} text-ink-muted`}>{label}</figcaption>}
      <ol className="flex flex-col gap-2">
        {steps.map((step) => (
          <li
            key={step.label}
            className="grid grid-cols-[minmax(0,130px)_minmax(0,1fr)_28px] items-center gap-3 sm:grid-cols-[170px_minmax(0,1fr)_32px]"
          >
            <span className={`text-sm leading-snug ${step.highlight ? "text-rosewood" : "text-ink-strong"}`}>{step.label}</span>
            <span className="h-2.5 rounded-full bg-paper-raised">
              <span
                className={`block h-full rounded-full ${step.highlight ? "bg-rosewood" : "bg-ink-muted/55"}`}
                style={{ width: `${Math.max((step.value / max) * 100, step.value ? 3 : 0)}%` }}
              />
            </span>
            <span className={`text-right font-serif text-lg leading-none ${step.highlight ? "text-rosewood" : "text-ink-strong"}`}>
              {step.value}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** A looping clip or an image inside the content, at its natural shape. */
export function Media({ type = "video", src, alt }: { type?: "video" | "image"; src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-paper-raised">
      {type === "video" ? (
        <VideoPlayer src={src} alt={alt} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="block h-auto w-full" />
      )}
    </div>
  );
}

/**
 * A dashed box standing in for screens or images that aren't in yet. `inProgress` adds a chip for
 * screens that are still being designed, not just missing an export.
 */
export function MediaPlaceholder({
  label,
  aspect = "aspect-video",
  inProgress = false,
}: {
  label: string;
  aspect?: string;
  inProgress?: boolean;
}) {
  return (
    <div
      className={`${aspect} flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-line-strong px-6 text-center font-mono text-xs text-ink-muted`}
    >
      {inProgress && (
        <span className={`${eyebrow} flex items-center gap-1.5 rounded-full border border-line bg-paper-raised px-3 py-1 text-ink-strong`}>
          <span aria-hidden="true" className="size-1.5 rounded-full bg-rosewood" />
          in progress
        </span>
      )}
      [{label}]
    </div>
  );
}

/** A list with short rosewood dashes instead of bullets. */
export function DashList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item, i) => (
        <li key={i} className="grid grid-cols-[14px_minmax(0,1fr)] gap-3">
          <span aria-hidden="true" className="mt-[0.8em] h-0.5 w-3.5 rounded-[2px] bg-rosewood/70" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function NextCaseStudy({ href, name }: { href: string; name: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 border-y border-line py-6 text-ink no-underline"
    >
      <span className={`${eyebrow} text-ink-muted`}>Next case study</span>
      <span className="font-serif text-2xl text-ink-strong group-hover:text-rosewood">
        {name}{" "}
        <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">
          →
        </span>
      </span>
    </Link>
  );
}
