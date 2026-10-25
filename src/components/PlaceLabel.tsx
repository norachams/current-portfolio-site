"use client";

import { useState } from "react";
import { useFollower } from "@/hooks/useFollower";

/**
 * Shows `place` in a tag beside the cursor while hovering the children, like the photography wall.
 * The tag sits outside the children so a rotated photo doesn't throw off its fixed positioning.
 */
export default function PlaceLabel({
  place,
  className,
  children,
}: {
  place: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [hovering, setHovering] = useState(false);
  const { ref, moveTo } = useFollower<HTMLDivElement>(hovering, { lag: false });

  return (
    <>
      {/* data-cursor-colour turns the cursor a new pastel here, as over the photography photos, and the tag matches it. */}
      <div
        className={className}
        data-cursor-colour
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          moveTo(e.clientX, e.clientY, true);
          setHovering(true);
        }}
        onPointerMove={(e) => moveTo(e.clientX, e.clientY)}
        onPointerLeave={() => setHovering(false)}
      >
        {children}
        {/* No cursor tag on touch, so the place shows under the photo instead, like the photography wall. */}
        <span className="hidden pt-3 font-serif text-base [@media(hover:none)]:block">{place}</span>
      </div>
      <div ref={ref} aria-hidden="true" className={`pointer-events-none fixed top-0 left-0 z-20 ${hovering ? "" : "invisible"}`}>
        {/* Same tag as the photography place labels, just right of the cursor. */}
        <span className="block translate-x-4 -translate-y-1/2 rounded-lg border border-line bg-paper-raised px-2.5 py-0.5 text-[17px] leading-snug font-medium whitespace-nowrap text-(--cursor-colour) shadow-lift">
          {place}
        </span>
      </div>
    </>
  );
}
