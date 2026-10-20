import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import me from "../../../public/me/me2.jpg";
import redbubble from "../../../public/me/redbubble.png";
import AboutLabel from "@/components/AboutLabel";
import { experience } from "@/data/experience";
import type { Pastel } from "@/data/projects";

export const metadata: Metadata = {
  title: "me · nora",
};

// Full class names so Tailwind picks them up.
const topStrip: Record<Pastel, string> = {
  mint: "border-t-mint/70",
  celadon: "border-t-celadon/80",
  gold: "border-t-gold/80",
  sky: "border-t-sky/80",
  lilac: "border-t-lilac/80",
  peach: "border-t-peach/80",
  blush: "border-t-blush/80",
};

const blockTitle = "font-serif text-[28px] leading-[1.2] font-normal";
const textLink = "text-rosewood hover:underline hover:decoration-2 hover:underline-offset-3";

export default function MePage() {
  return (
    <main className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col gap-24 px-4 pt-16 pb-24 min-[1112px]:px-0">
      <section className="flex flex-wrap items-end gap-12">
        {/* Same tilt for both: lilac card pokes out top-left, photo pokes out bottom-right. */}
        <div className="relative h-[250px] w-[200px] shrink-0 -rotate-3">
          <div aria-hidden="true" className="absolute top-0 left-0 h-[234px] w-[184px] rounded-card bg-lilac/60" />
          <Image
            src={me}
            alt="nora standing in tall grass on a clifftop above the sea at sunset"
            placeholder="blur"
            sizes="184px"
            loading="eager"
            fetchPriority="high"
            className="absolute right-0 bottom-0 h-[234px] w-[184px] rounded-card object-cover object-[50%_60%]"
          />
        </div>
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
          <h1 className="font-serif text-[44px] leading-[1.15] font-normal tracking-[-0.015em]">hi, i&apos;m nora.</h1>
          <p className="max-w-[560px] text-[17px] leading-[1.6]">this is a little corner of the internet for the things I build, the things I try, and everything else I&apos;m figuring out along the way.</p>
        </div>
      </section>

      <section aria-label="About me" className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-x-10 gap-y-12">
        <article className="flex flex-col gap-3.5 border-t border-line pt-5">
          <AboutLabel number="01" label="What I love" pastel="mint" />
          <h2 className={blockTitle}>Building from 0 to 1</h2>
          <p className="text-[15px] leading-[1.65]">
            I love the early stages of building a product, when it&apos;s still an idea and you get to figure out what
            people actually need. I enjoy exploring possibilities, taking ownership, and wearing multiple hats to bring
            an idea to life.
          </p>
        </article>

        <article className="flex flex-col gap-3.5 border-t border-line pt-5">
          <AboutLabel number="02" label="How I think" pastel="lilac" />
          <h2 className={blockTitle}>People first, always</h2>
          <p className="text-[15px] leading-[1.65]">
            I care about the user experience as much as the code. I like understanding how people think and what they
            need, then bringing engineering, product, and design together to build interfaces that feel intuitive and
            enjoyable to use.
          </p>
        </article>

        <article className="flex flex-col gap-3.5 border-t border-line pt-5">
          <AboutLabel number="03" label="What excites me" pastel="gold" />
          <h2 className={blockTitle}>Ideas worth exploring</h2>
          <p className="text-[15px] leading-[1.65]">
            I&apos;m especially interested in AI-powered tools that make everyday tasks simpler and automate the
            tedious stuff. I love exploring new technologies and experimenting with things I haven&apos;t built before.
          </p>
        </article>
      </section>

      <section aria-labelledby="experience-title" className="flex flex-col gap-7 border-t border-line pt-5">
        <div className="flex flex-col gap-3.5">
          <AboutLabel number="04" label="Where I've been" pastel="sky" />
          <h2 id="experience-title" className={blockTitle}>
            My experience
          </h2>
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3.5">
          {experience.map((job) => (
            <li key={job.company}>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${topStrip[job.pastel]} group flex h-full flex-col gap-2 rounded-card border border-t-4 border-line bg-paper-raised p-[18px] text-ink transition-shadow duration-200 hover:shadow-lift`}
              >
                <span className="font-serif text-[22px] leading-[1.2] decoration-rosewood decoration-2 underline-offset-3 group-hover:underline">
                  {job.company}
                </span>
                <span className="font-mono text-[11px] text-ink-muted">
                  {job.role} · {job.dates}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="beyond-title" className="flex flex-wrap gap-x-16 gap-y-8 border-t border-line pt-5">
        <div className="flex flex-[1_1_280px] flex-col gap-3.5">
          <AboutLabel number="05" label="Beyond the job title" pastel="blush" />
          <h2 id="beyond-title" className={blockTitle}>
            I like making things happen
          </h2>
        </div>
        <div className="flex flex-[2_1_480px] flex-col gap-4 text-[15px] leading-[1.65]">
          <p>
            I&apos;ve always been curious about entrepreneurship and how ideas turn into real products. In high school,
            I opened a{" "}
            <a
              href="https://www.redbubble.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[linear-gradient(transparent_58%,rgb(238_188_196/0.75)_58%)] px-1 text-on-pastel decoration-rosewood hover:underline hover:decoration-2 hover:underline-offset-3 dark:text-ink"
            >
              Redbubble
            </a>{" "}
            shop that made{" "}
            <span
              tabIndex={0}
              aria-describedby="redbubble-stats"
              className="group relative cursor-default bg-[linear-gradient(transparent_58%,rgb(227_208_129/0.75)_58%)] px-1 text-on-pastel dark:text-ink"
            >
              around 600 sales in four months
              <span
                id="redbubble-stats"
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 translate-y-1 rounded-card border border-line bg-paper-raised p-2.5 opacity-0 shadow-lift transition-[opacity,translate] duration-150 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"
              >
                <Image
                  src={redbubble}
                  alt="my redbubble shop: 26 followers, 5.88k likes, 596 sales"
                  width={213}
                  className="block max-w-none rounded-tag"
                />
              </span>
            </span>
            . These days, I&apos;m
            interested in startups, exploring new ideas, and building things of my own.
          </p>
          <p>
            Outside of work, I climb, ice skate and explore new places. In winter
            2026, I spent four months on exchange in Bilbao, Spain, which gave me plenty of new places to explore and
            photograph.
          </p>
          <p>
            There&apos;s more to me than code. Take a look at{" "}
            <Link href="/outside-work" className={textLink}>
              what I get up to outside work →
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
