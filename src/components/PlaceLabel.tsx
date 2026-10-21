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
      <div
        className={className}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          moveTo(e.clientX, e.clientY, true);
          setHovering(true);
        }}
        onPointerMove={(e) => moveTo(e.clientX, e.clientY)}
        onPointerLeave={() => setHovering(false)}
      >
        {children}
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
