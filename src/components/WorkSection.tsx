"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { pastelSoft } from "@/lib/pastels";

const NOTE_OFFSET = 18;
const LERP = 0.15;

export default function WorkSection({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const reducedMotion = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = query.matches;
    const onChange = (e: MediaQueryListEvent) => (reducedMotion.current = e.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Soft-lag follow: lerp toward the cursor each frame, transform only.
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const tick = () => {
      const t = target.current;
      const p = pos.current;
      if (reducedMotion.current) {
        p.x = t.x;
        p.y = t.y;
      } else {
        p.x += (t.x - p.x) * LERP;
        p.y += (t.y - p.y) * LERP;
      }
      if (noteRef.current) {
        noteRef.current.style.transform = `translate(${p.x + NOTE_OFFSET}px, ${p.y + NOTE_OFFSET}px)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  const onPointerEnter = (project: Project) => (e: React.PointerEvent) => {
    // Touch and pen open the project directly, so the note is mouse-only.
    if (e.pointerType !== "mouse") return;
    target.current = { x: e.clientX, y: e.clientY };
    // Start at the cursor so the note appears instantly instead of sliding in.
    if (!active) {
      pos.current = { x: e.clientX, y: e.clientY };
      if (noteRef.current) {
        noteRef.current.style.transform = `translate(${e.clientX + NOTE_OFFSET}px, ${e.clientY + NOTE_OFFSET}px)`;
      }
    }
    setActive(project);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <section aria-labelledby="work-heading" className="flex flex-col">
      {/* Hidden visually; kept so screen readers still get a "work" heading. */}
      <h2 id="work-heading" className="sr-only">
        work
      </h2>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-9">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              aria-label={`${project.name}: ${project.note}`}
              onPointerEnter={onPointerEnter(project)}
              onPointerMove={onPointerMove}
              onPointerLeave={() => setActive(null)}
              className="flex flex-col gap-2.5 rounded-card text-ink"
            >
              <ProjectMedia project={project} />
              <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                <span className="font-serif text-2xl leading-[1.2]">{project.name}</span>
                <span className="font-mono text-[11px] text-ink-muted">{project.meta}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Kept mounted so the follow loop always has an element to move. The soft tint sits on
          solid paper so the page doesn't show through the note. */}
      <div
        ref={noteRef}
        aria-hidden="true"
        className={`${active ? "" : "invisible"} pointer-events-none fixed top-0 left-0 z-10 max-w-[260px] rounded-xl bg-paper shadow-lift will-change-transform`}
      >
        {active && (
          <div className={`${pastelSoft[active.pastel]} flex flex-col gap-2 rounded-xl px-3.5 py-3 text-on-pastel`}>
            <span className="text-[13px] leading-[1.45]">{active.note}</span>
            <span className="font-mono text-[11px]">click to open →</span>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  // 16:9 to match the clips, so nothing gets cropped.
  const base = `${pastelSoft[project.pastel]} aspect-video overflow-hidden rounded-card`;
  const { media } = project;

  if (media?.type === "video") {
    return (
      <div className={base}>
        <video
          src={media.src}
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="h-full w-full object-cover motion-reduce:hidden"
        />
      </div>
    );
  }

  if (media?.type === "image") {
    return (
      <div className={base}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={media.src} alt={media.alt ?? ""} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${base} flex items-center justify-center font-mono text-xs text-on-pastel`}
    >
      [{project.name} clip]
    </div>
  );
}
