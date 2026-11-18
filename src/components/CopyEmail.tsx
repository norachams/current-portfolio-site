"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { email } from "@/data/site";
import { useFollower } from "@/hooks/useFollower";

const COPIED_FOR = 1600;

/**
 * A button that copies the email address. With a mouse, a "click to copy" label follows the pointer and
 * turns into "copied!"; keyboard and touch users see the button text change instead. Used in the footer and
 * on the case study lock.
 */
export default function CopyEmail({ children, className = "" }: { children: ReactNode; className?: string }) {
  const [hovering, setHovering] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { ref, moveTo } = useFollower<HTMLSpanElement>(hovering, { lag: false });

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), COPIED_FOR);
  };

  return (
    <>
      <button
        type="button"
        onClick={copyEmail}
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          moveTo(e.clientX, e.clientY, true);
          setHovering(true);
        }}
        onPointerMove={(e) => moveTo(e.clientX, e.clientY)}
        onPointerLeave={() => setHovering(false)}
        aria-label="Copy email address"
        data-cursor-plain
        className={`cursor-pointer ${className}`}
      >
        {/* Keyboard and touch users don't see the pill, so the label confirms instead. */}
        {copied && !hovering ? "copied!" : children}
      </button>

      <span
        ref={ref}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-30 ${hovering ? "" : "invisible"}`}
      >
        {/* Just right of the site cursor, in rosewood like the link text (the cursor stays rosewood here too). */}
        <span className="block translate-x-4 -translate-y-1/2 font-mono text-xs font-medium whitespace-nowrap text-rosewood">
          {copied ? "copied!" : "click to copy"}
        </span>
      </span>

      <span role="status" className="sr-only">
        {copied ? "Email copied" : ""}
      </span>
    </>
  );
}
