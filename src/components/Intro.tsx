import type { ReactNode } from "react";

// Marker highlight: the bottom ~42% of the word filled with its pastel at ~45% alpha, the same soft tint as tags and tabs elsewhere.
// The first screen sticks to three pastels; peach and lilac echo the caramel and voz videos below.
const marker = {
  mint: "bg-[linear-gradient(transparent_58%,rgb(145_199_177/0.45)_58%)]",
  peach: "bg-[linear-gradient(transparent_58%,rgb(243_201_173/0.45)_58%)]",
  lilac: "bg-[linear-gradient(transparent_58%,rgb(207_193_230/0.45)_58%)]",
};

type MarkerColor = keyof typeof marker;

function Mark({ color, children }: { color: MarkerColor; children: ReactNode }) {
  return <span className={`${marker[color]} px-1`}>{children}</span>;
}

// Smaller marker for the currently row; text sits on pastel so it uses on-pastel.
function SmallMark({ color, href, children }: { color: MarkerColor; href?: string; children: ReactNode }) {
  const className = `${marker[color]} rounded-tag px-1 py-0.5 text-on-pastel dark:text-ink`;
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} decoration-rosewood hover:underline hover:decoration-2 hover:underline-offset-3`}
    >
      {children}
    </a>
  ) : (
    <span className={className}>{children}</span>
  );
}

export default function Intro() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="max-w-[940px] font-serif text-[44px] leading-[1.15] font-normal tracking-[-0.015em]">
        i am an<Mark color="peach">engineer</Mark> who cares about the <Mark color="mint">product</Mark> and
        the <Mark color="lilac">design</Mark> as much as{" "}
        <span className="whitespace-nowrap">
          the code.
        </span>
      </h1>

      <div className="mt-4 flex flex-col gap-3 border-t border-line pt-5">
        <span className="font-mono text-[11px] tracking-[0.04em] text-ink-muted">currently</span>
        <ul className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-[15px] leading-[1.5]">
          <li>
            engineering @{" "}
            <SmallMark color="mint" href="https://verifast.com/">
              verifast
            </SmallMark>
          </li>
          <li>
            building{" "}
            <SmallMark color="peach" href="https://www.oncaramel.com/">
              caramel
            </SmallMark>
          </li>
          <li>
            finishing a<SmallMark color="lilac">dd in cs and bba</SmallMark>
          </li>
        </ul>
      </div>
    </section>
  );
}
