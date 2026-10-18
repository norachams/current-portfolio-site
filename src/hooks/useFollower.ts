"use client";

import { useCallback, useEffect, useRef } from "react";

const LERP = 0.15;

type Options = { lag?: boolean; offsetX?: number; offsetY?: number };

/**
 * Moves a fixed, pointer-events-none element after the cursor using transform only.
 * With `lag` it eases toward the cursor each frame; reduced motion always jumps.
 */
export function useFollower<T extends HTMLElement>(active: boolean, { lag = true, offsetX = 0, offsetY = 0 }: Options = {}) {
  const ref = useRef<T>(null);
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

  const write = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${pos.current.x + offsetX}px, ${pos.current.y + offsetY}px)`;
    }
  }, [offsetX, offsetY]);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const tick = () => {
      const t = target.current;
      const p = pos.current;
      if (!lag || reducedMotion.current) {
        p.x = t.x;
        p.y = t.y;
      } else {
        p.x += (t.x - p.x) * LERP;
        p.y += (t.y - p.y) * LERP;
      }
      write();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, lag, write]);

  /** Track the cursor. `snap` jumps straight there so the element appears in place. */
  const moveTo = useCallback(
    (x: number, y: number, snap = false) => {
      target.current = { x, y };
      if (snap) {
        pos.current = { x, y };
        write();
      }
    },
    [write],
  );

  return { ref, moveTo };
}
