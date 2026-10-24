import { cacheLife } from "next/cache";

const FEED_URL = "https://medium.com/feed/@nchamseddin";

export type MediumPost = {
  /** Medium's post id, e.g. "530d0f5240e1". */
  id: string;
  title: string;
  url: string;
  /** Medium's subtitle: the first paragraph of the post. */
  excerpt: string;
  date: Date;
  tags: string[];
  /** Estimated like Medium does: about 265 words a minute. */
  readMinutes: number;
  /** The first image in the post, used as the cover. */
  image?: string;
};

// Medium's RSS is a fixed shape, so a few regexes are enough to read it without an XML parser.
export async function getMediumPosts(): Promise<MediumPost[]> {
  "use cache";

  try {
    const res = await fetch(FEED_URL);
    if (!res.ok) throw new Error(`medium feed ${res.status}`);
    const xml = await res.text();
    cacheLife("hours");
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, item]) => parseItem(item));
  } catch {
    // Retry soon instead of keeping an empty list for an hour.
    cacheLife("minutes");
    return [];
  }
}

function parseItem(item: string): MediumPost {
  const content = field(item, "content:encoded");
  return {
    // The guid is https://medium.com/p/<id>.
    id: field(item, "guid").split("/").pop() ?? "",
    title: decode(field(item, "title")),
    // Drop Medium's ?source= tracking from the link.
    url: field(item, "link").split("?")[0],
    excerpt: decode(stripTags(content.match(/<p>([\s\S]*?)<\/p>/)?.[1] ?? "")),
    date: new Date(field(item, "pubDate")),
    readMinutes: Math.max(1, Math.round(stripTags(content).split(/\s+/).filter(Boolean).length / 265)),
    tags: [...item.matchAll(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g)].map(([, tag]) => tag),
    image: content.match(/<img[^>]*src="([^"]+)"/)?.[1],
  };
}

function field(item: string, tag: string) {
  const match = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return match?.[1].trim() ?? "";
}

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, "");
}

function decode(text: string) {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}
