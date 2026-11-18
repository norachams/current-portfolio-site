"use client";

import { useActionState, useState } from "react";
import CopyEmail from "@/components/CopyEmail";

export type UnlockState = { error: string | null; attempt: number };

type Props = {
  /** Server action that checks the code and sets the unlock cookie. */
  unlockAction: (state: UnlockState, formData: FormData) => Promise<UnlockState>;
  /** Number of characters in the code. A dash is added halfway as you type. */
  length?: number;
};

const eyebrow = "font-mono text-[11px] tracking-[0.1em] uppercase";

/**
 * The lock in front of an NDA case study: a short note and one bracketed field for the code.
 * A wrong code shakes the field and clears it.
 */
export default function PasswordLock({ unlockAction, length = 6 }: Props) {
  const [state, formAction, pending] = useActionState(unlockAction, { error: null, attempt: 0 });

  return (
    // Sections behind the lock scroll here until it's unlocked (see CaseStudyLayout).
    <section
      id="locked"
      aria-labelledby="locked-heading"
      className="flex scroll-mt-16 flex-col gap-5 border-t border-line pt-5 min-[900px]:scroll-mt-8"
    >
      <div className="flex flex-col gap-2">
        <p className={`${eyebrow} text-rosewood`}>Confidential</p>
        <h2
          id="locked-heading"
          className="font-serif text-[28px] leading-[1.2] font-normal text-balance text-ink-strong min-[900px]:text-[32px]"
        >
          The rest of this one is under wraps
        </h2>
      </div>
      <p className="text-base leading-[1.7]">
        I can&rsquo;t share the details publicly, but I&rsquo;m happy to walk you through them. Enter your code
        below or{" "}
        {/* Copies the address, like the footer's email link. */}
        <CopyEmail className="text-rosewood hover:underline hover:decoration-2 hover:underline-offset-3">email me</CopyEmail>{" "}
        for one.
      </p>

      <div className="mt-2 rounded-card border border-line bg-paper-raised">
        <form action={formAction} className="flex flex-col gap-2 px-6 py-5">
          <label htmlFor="case-study-code" className={`${eyebrow} text-ink-muted`}>
            Code
          </label>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {/* A new key after each attempt remounts the field: empty, focused and shaking if it was wrong. */}
            <CodeField key={state.attempt} length={length} disabled={pending} wrong={!!state.error} />
            <button
              type="submit"
              disabled={pending}
              className="group inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs text-rosewood disabled:opacity-60"
            >
              {pending ? "checking…" : "unlock"}
              <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-[3px]">
                →
              </span>
            </button>
          </div>
          <p role="status" aria-live="polite" className="min-h-[1.5em] font-mono text-xs text-rosewood">
            {state.error}
          </p>
        </form>
      </div>
    </section>
  );
}

function CodeField({ length, disabled, wrong }: { length: number; disabled: boolean; wrong: boolean }) {
  const [value, setValue] = useState("");
  const half = Math.ceil(length / 2);
  const placeholder = `${"x".repeat(half)}-${"x".repeat(length - half)}`;

  // Upper case, letters and digits only, with the dash put in for you.
  const format = (raw: string) => {
    const clean = raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, length);
    return clean.length > half ? `${clean.slice(0, half)}-${clean.slice(half)}` : clean;
  };

  return (
    <div
      className={`flex items-center gap-2 font-mono text-lg ${
        wrong ? "animate-[code-shake_360ms_cubic-bezier(0.36,0.07,0.19,0.97)] motion-reduce:animate-none" : ""
      }`}
    >
      <span aria-hidden="true" className="text-rosewood">
        [
      </span>
      <input
        id="case-study-code"
        name="code"
        value={value}
        onChange={(e) => setValue(format(e.target.value))}
        placeholder={placeholder}
        maxLength={length + 1}
        disabled={disabled}
        // After a wrong code, start again with the field focused.
        autoFocus={wrong}
        aria-invalid={wrong || undefined}
        autoComplete="off"
        autoCapitalize="characters"
        autoCorrect="off"
        spellCheck={false}
        // The focus cue is the underline going solid and thicker, in place of the site-wide focus ring.
        className="w-[11ch] border-b border-dashed border-line-strong bg-transparent pt-0.5 pb-[3px] text-center tracking-[0.3em] text-ink-strong uppercase outline-none! placeholder:text-ink-muted/40 focus:border-b-2 focus:border-solid focus:border-ink focus:pb-0.5 disabled:opacity-60 aria-invalid:border-rosewood/60"
      />
      <span aria-hidden="true" className="text-rosewood">
        ]
      </span>
    </div>
  );
}
