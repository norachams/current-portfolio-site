import type { Metadata } from "next";
import { socials } from "@/data/site";
import { pastelSoft } from "@/lib/pastels";

export const metadata: Metadata = {
  title: "writing · nora",
};

const medium = socials.find((s) => s.label === "medium");

export default function WritingPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col gap-6 px-4 pt-16 pb-24 min-[1112px]:px-0">
      <h1 className="font-serif text-[44px] leading-[1.15] font-normal tracking-[-0.015em]">writing</h1>
      <span className={`${pastelSoft.lilac} self-start rounded-full px-2.5 py-0.5 font-mono text-xs text-on-pastel`}>
        coming soon
      </span>
      <p className="max-w-[560px] text-base leading-[1.65]">
        I&rsquo;m putting together a few pieces here.
        {medium && (
          <>
            {" "}
            Until then, you can find my writing on{" "}
            <a
              href={medium.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-rosewood hover:underline hover:decoration-2 hover:underline-offset-3"
            >
              medium ↗
            </a>
          </>
        )}
      </p>
    </main>
  );
}
