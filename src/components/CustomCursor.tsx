"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFollower } from "@/hooks/useFollower";

// Over each new link the circle turns one of these, never the same twice in a row.
const hoverColours = ["mint", "lilac", "peach", "sky", "gold", "blush"];

// Full class names so Tailwind picks them up.
const fill: Record<string, string> = {
  mint: "bg-mint",
  lilac: "bg-lilac",
  peach: "bg-peach",
  sky: "bg-sky",
  gold: "bg-gold",
  blush: "bg-blush",
};

// Anything clickable, plus elements marked data-cursor-colour that should take a colour anyway (the me photo).
const CLICKABLE = "a, button, [role='tab'], [tabindex]:not([tabindex='-1']), [data-cursor-colour]";

/**
 * Site-wide rosewood circle that replaces the system cursor (hidden in globals.css).
 * Mouse only; touch screens keep their normal behaviour.
 * Hides itself over elements that draw their own cursor (marked data-own-cursor),
 * like the hobby photo trails.
 * An open modal (the photo lightbox) sits above everything else on the page, so while one is
 * open the circle is drawn inside it instead.
 */
export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [overLink, setOverLink] = useState(false);
  const [overOwn, setOverOwn] = useState(false);
  const [colour, setColour] = useState(0);
  const visibleRef = useRef(false);
  const lastLink = useRef<Element | null>(null);
  const [host, setHost] = useState<Element | null>(null);
  const hostRef = useRef<Element | null>(null);
  const { ref, moveTo } = useFollower<HTMLDivElement>(visible, { lag: false });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      // Snap on the first move so the cursor doesn't slide in from the corner.
      moveTo(e.clientX, e.clientY, !visibleRef.current);
      const modal = document.querySelector("dialog:modal");
      if (modal !== hostRef.current) {
        hostRef.current = modal;
        setHost(modal);
      }
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };
    const onOver = (e: PointerEvent) => {
      const target = e.target as Element;
      // Links marked data-cursor-plain (the copy-email button) keep the rosewood circle.
      const link = target.closest(CLICKABLE);
      const plain = !!link?.closest("[data-cursor-plain]");
      // A new link gets the next colour; moving around inside the same link keeps it.
      if (link && link !== lastLink.current) setColour((c) => (c + 1) % hoverColours.length);
      lastLink.current = link;
      setOverLink(!!link && !plain);
      setOverOwn(!!target.closest("[data-own-cursor]"));
    };
    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };
    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [moveTo]);

  // Share the current colour so labels drawn beside the cursor (photo places, copy email) can match it.
  useEffect(() => {
    const value = overLink ? `var(--color-${hoverColours[colour]})` : "var(--color-rosewood)";
    document.documentElement.style.setProperty("--cursor-colour", value);
  }, [overLink, colour]);

  const circle = (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 left-0 z-[60] ${visible && !overOwn ? "" : "invisible"}`}
    >
      <span
        className={`block size-3.5 -translate-1/2 rounded-full transition-colors duration-200 ease-out ${
          overLink ? fill[hoverColours[colour]] : "bg-rosewood"
        }`}
      />
    </div>
  );

  return host ? createPortal(circle, host) : circle;
}
