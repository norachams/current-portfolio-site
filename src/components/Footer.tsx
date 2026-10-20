"use client";

import { useEffect, useRef, useState } from "react";
import { email, oldSiteUrl, socials } from "@/data/site";
import { useFollower } from "@/hooks/useFollower";

const COPIED_FOR = 1600;
const link = "text-rosewood hover:underline hover:decoration-2 hover:underline-offset-3";

export default function Footer() {
  const [hovering, setHovering] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { ref, moveTo } = useFollower<HTMLDivElement>(hovering, { lag: false });

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
    <footer className="mx-auto w-full max-w-[1080px] px-4 min-[1112px]:px-0">
      <div className="flex flex-wrap items-center justify-between gap-7 border-t border-line pt-8 pb-10">
        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-[22px] leading-[1.3] font-medium italic">say hi</h2>
          <ul className="flex flex-wrap items-center gap-x-[22px] gap-y-2 font-mono text-[13px]">
            {socials.map((social) => (
              <li key={social.label}>
                <SocialLink {...social} />
              </li>
            ))}
            <li>
              {email ? (
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
                  className={`${link} cursor-pointer`}
                >
                  {/* Keyboard and touch users don't see the pill, so the label confirms instead. */}
                  {copied && !hovering ? "copied!" : "email"}
                </button>
              ) : (
                <span className="text-ink-muted">email</span>
              )}
            </li>
          </ul>
        </div>

        <OldSiteLink />
      </div>

      <div
        ref={ref}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-30 ${hovering ? "" : "invisible"}`}
      >
        {/* Just right of the site cursor, in rosewood like the link text (the cursor stays rosewood here too). */}
        <span className="block translate-x-4 -translate-y-1/2 font-mono text-xs font-medium whitespace-nowrap text-rosewood">
          {copied ? "copied!" : "click to copy"}
        </span>
      </div>

      <span role="status" className="sr-only">
        {copied ? "Email copied" : ""}
      </span>
    </footer>
  );
}

function SocialLink({ label, url }: { label: string; url: string }) {
  if (!url) return <span className="text-ink-muted">{label} ↗</span>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={link}>
      {label} ↗
    </a>
  );
}

function OldSiteLink() {
  return (
    <a
      href={oldSiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="v2, my old site"
      className="font-mono text-xs text-ink-muted hover:text-ink hover:underline hover:decoration-2 hover:underline-offset-3"
    >
      v2 ↗
    </a>
  );
}
