"use client";

import { useRef, useState } from "react";
import type { Pastel } from "@/data/projects";
import { pastelSoft } from "@/lib/pastels";
import Hackathons from "./Hackathons";
import Hobbies from "./Hobbies";
import Photography, { type Walls } from "./Photography";
import Volunteering from "./Volunteering";

const tabs: { id: string; label: string; pastel: Pastel; Panel?: () => React.JSX.Element }[] = [
  { id: "hobbies", label: "01 / hobbies", pastel: "mint", Panel: Hobbies },
  { id: "hackathons", label: "02 / hackathons", pastel: "lilac", Panel: Hackathons },
  { id: "volunteering", label: "03 / volunteering", pastel: "peach", Panel: Volunteering },
  // Photography needs the photo wall layout from the page, so it renders separately below.
  { id: "photography", label: "04 / photography", pastel: "sky" },
];

export default function OutsideTabs({ walls }: { walls: Walls }) {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { id, Panel } = tabs[selected];

  // Arrow keys move between tabs (automatic activation).
  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = tabs.length - 1;
    const next =
      e.key === "ArrowRight" ? (selected === last ? 0 : selected + 1)
      : e.key === "ArrowLeft" ? (selected === 0 ? last : selected - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <div
        role="tablist"
        aria-label="Outside work sections"
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-2 border-b border-line pb-5"
      >
        {tabs.map((tab, i) => {
          const isSelected = i === selected;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isSelected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelected(i)}
              className={`min-h-11 cursor-pointer rounded-full border px-[18px] font-mono text-xs tracking-[0.06em] transition-colors duration-150 ${
                isSelected ? `${pastelSoft[tab.pastel]} border-transparent text-on-pastel` : "border-line text-ink hover:bg-paper-sunk"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`}>
        {Panel ? <Panel /> : <Photography walls={walls} />}
      </div>
    </>
  );
}
