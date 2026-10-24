import type { Metadata } from "next";
import { socials } from "@/data/site";
import { coverOverrides } from "@/data/writing";
import { getMediumPosts, type MediumPost } from "@/lib/medium";
import { pastelSoft } from "@/lib/pastels";

export const metadata: Metadata = {
  title: "writing · nora",
};

const medium = socials.find((s) => s.label === "medium");

const monthYear = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default async function WritingPage() {
  const posts = (await getMediumPosts()).map((post) => ({ ...post, image: coverOverrides[post.id] ?? post.image }));
  const [featured, ...more] = posts;

  return (
    <main className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col px-4 pt-16 pb-24 min-[1112px]:px-0">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="font-serif text-[44px] leading-[1.15] font-normal tracking-[-0.015em]">writing</h1>
          <p className="max-w-[560px] text-base leading-[1.65]">
            {posts.length > 0
              ? "Things I’ve written, mostly about what I’m learning."
              : "My writing lives on Medium for now."}
          </p>
        </div>
        {medium && (
          <a
            href={medium.url}
            {...external}
            className="shrink-0 font-mono text-xs text-rosewood hover:underline hover:decoration-2 hover:underline-offset-3 sm:mb-1.5"
          >
            all posts on medium ↗
          </a>
        )}
      </header>

      {featured && <FeaturedPost post={featured} />}

      {more.length > 0 && (
        <section aria-labelledby="more-heading" className="mt-16 flex flex-col">
          <h2 id="more-heading" className="font-serif text-[22px] font-semibold italic">
            more
          </h2>
          <ul className="mt-3 border-t border-line">
            {more.map((post) => (
              <li key={post.url} className="border-b border-line">
                <PostRow post={post} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

/** The latest post: cover and text side by side on wide screens, stacked on phones. */
function FeaturedPost({ post }: { post: MediumPost }) {
  return (
    <a
      href={post.url}
      {...external}
      className="group mt-16 grid grid-cols-1 gap-6 rounded-card text-ink md:grid-cols-2 md:items-center md:gap-9"
    >
      <div className={`${pastelSoft.gold} aspect-[7/4] overflow-hidden rounded-card`}>
        {post.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <span className="font-mono text-[11px] tracking-[0.06em] text-ink-muted uppercase">
          latest · {monthYear.format(post.date)}
        </span>
        <span className="font-serif text-[36px] leading-[1.15] decoration-rosewood decoration-2 underline-offset-4 group-hover:underline">
          {post.title}
        </span>
        {post.excerpt && <span className="text-[15px] leading-[1.6]">{post.excerpt}</span>}
        <span className="font-mono text-xs text-rosewood">{post.readMinutes} min read ↗</span>
      </div>
    </a>
  );
}

function PostRow({ post }: { post: MediumPost }) {
  return (
    <a
      href={post.url}
      {...external}
      className="group grid grid-cols-1 gap-1 py-6 text-ink sm:grid-cols-[155px_1fr_auto] sm:items-baseline sm:gap-x-6"
    >
      <span className="font-mono text-xs text-ink-muted lowercase">{monthYear.format(post.date)}</span>
      <span className="flex flex-col gap-1">
        <span className="font-serif text-2xl leading-[1.25] decoration-rosewood decoration-2 underline-offset-4 group-hover:underline">
          {post.title}
        </span>
        {post.excerpt && <span className="text-sm leading-[1.5] text-ink-muted">{post.excerpt}</span>}
      </span>
      <span className="font-mono text-xs whitespace-nowrap text-ink-muted group-hover:text-rosewood">
        {post.readMinutes} min · read ↗
      </span>
    </a>
  );
}
