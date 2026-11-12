"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

export type CaseStudySectionRef = { id: string; label: string };

type Props = {
  title: string;
  /** Live site. `label` defaults to the url without the protocol. */
  link?: { href: string; label?: string };
  backHref?: string;
  sections: CaseStudySectionRef[];
  children: ReactNode;
};

/** A section counts as active once its top passes this fraction of the viewport. */
const ACTIVE_LINE = 0.4;

export default function CaseStudyLayout({ title, link, backHref = "/", sections, children }: Props) {
  const active = useActiveSection(sections);
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);

  const linkLabel = link ? (link.label ?? link.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")) : "";

  return (
    <>
      <MobileBar backHref={backHref} sections={sections} active={active} onSelect={scrollTo} />

      {/* Same side padding as the header, so the sidebar lines up under "nora". On wide screens a matching
          empty column on the right keeps the content centred on the page. */}
      <div className="edge-width flex-1 pb-24">
        <div className="grid grid-cols-1 min-[900px]:grid-cols-[180px_minmax(0,1fr)] min-[900px]:gap-14 min-[1264px]:grid-cols-[180px_minmax(0,1fr)_180px]">
          {/* Sidebar: sticky, so the way back is always one click away. */}
          <aside className="sticky top-8 hidden flex-col gap-7 self-start pt-16 min-[900px]:flex">
            <BackLink href={backHref} />

            <div className="flex flex-col gap-1.5">
              {/* No visible title in the content, so the sidebar title is the page's h1. */}
              <h1 className="font-serif text-[22px] leading-[1.25] font-normal text-ink-strong">{title}</h1>
              {link && (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-rosewood hover:underline hover:decoration-2 hover:underline-offset-3"
                >
                  {linkLabel} ↗
                </a>
              )}
            </div>

            <nav aria-label="Sections" className="flex flex-col">
              {sections.map((s) => (
                <SectionButton key={s.id} section={s} active={active === s.id} onSelect={scrollTo} />
              ))}
            </nav>
          </aside>

          <main className="flex min-w-0 flex-col gap-16 pt-8 min-[900px]:max-w-[760px] min-[900px]:pt-16 min-[1264px]:mx-auto min-[1264px]:w-full">
            {/* On phones the sidebar is gone (display: none), so this becomes the h1 instead. */}
            <div className="flex flex-col gap-1.5 min-[900px]:hidden">
              <h1 className="font-serif text-[32px] leading-[1.2] font-normal text-ink-strong">{title}</h1>
              {link && (
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[15px] text-rosewood">
                  {linkLabel} ↗
                </a>
              )}
            </div>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

function BackLink({ href, className = "" }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      transitionTypes={["nav-back"]}
      className={`group inline-flex items-center gap-1.5 self-start font-mono text-xs text-ink no-underline hover:text-rosewood ${className}`}
    >
      <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:-translate-x-[3px]">
        ←
      </span>
      all work
    </Link>
  );
}

function SectionButton({
  section,
  active,
  onSelect,
}: {
  section: CaseStudySectionRef;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(section.id)}
      aria-current={active ? "true" : undefined}
      className="group flex cursor-pointer items-center gap-3 rounded-sm py-1 text-left"
    >
      <span
        aria-hidden="true"
        className={`h-0.5 shrink-0 rounded-[2px] transition-[width,background-color] duration-[250ms] ${
          active ? "w-[30px] bg-rosewood" : "w-[14px] bg-line-strong group-hover:w-[22px] group-hover:bg-ink-muted"
        }`}
      />
      <span
        className={`text-sm transition-[opacity,transform] duration-200 ${
          active ? "translate-x-0.5 text-ink-strong opacity-100" : "text-ink-muted opacity-55 group-hover:opacity-100"
        }`}
      >
        {section.label}
      </span>
    </button>
  );
}

/** Phones: a slim sticky bar with the way back on the left and the current section on the right. */
function MobileBar({
  backHref,
  sections,
  active,
  onSelect,
}: {
  backHref: string;
  sections: CaseStudySectionRef[];
  active: string | null;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const current = sections.find((s) => s.id === active)?.label ?? "sections";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!barRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={barRef} className="sticky top-0 z-20 border-b border-line bg-paper min-[900px]:hidden">
      <div className="edge-width flex h-12 items-center justify-between gap-4">
        <BackLink href={backHref} />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="case-study-sections"
          className="flex cursor-pointer items-center gap-2 text-sm text-ink-strong"
        >
          <span className="sr-only">Jump to section, current: </span>
          {current}
          <span aria-hidden="true" className={`text-xs text-ink-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
            ▾
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="case-study-sections"
          aria-label="Sections"
          className="absolute inset-x-0 top-full border-b border-line bg-paper px-4 py-3"
        >
          <ul className="flex flex-col gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <SectionButton
                  section={s}
                  active={active === s.id}
                  onSelect={(id) => {
                    setOpen(false);
                    onSelect(id);
                  }}
                />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

/**
 * Scrollspy: the last section whose top is above 40% of the viewport, or the final section once the page
 * is scrolled to the bottom. Nothing while still in the hero.
 */
function useActiveSection(sections: CaseStudySectionRef[]) {
  const [active, setActive] = useState<string | null>(null);
  const ids = sections.map((s) => s.id).join(",");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * ACTIVE_LINE;
      const list = ids.split(",");
      // A short last section can never reach the line, so at the very bottom of the page it wins outright.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2 && window.scrollY > 0;
      const last = list[list.length - 1];
      const lastTop = document.getElementById(last)?.getBoundingClientRect().top;
      if (atBottom && lastTop !== undefined && lastTop < window.innerHeight) {
        setActive(last);
        return;
      }
      // The section whose top is closest above the line wins, so anchors needn't be in sidebar order.
      let next: string | null = null;
      let best = -Infinity;
      for (const id of list) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line && top > best) {
          best = top;
          next = id;
        }
      }
      setActive(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return active;
}
