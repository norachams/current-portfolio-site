import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import { hasAccess } from "@/lib/marketmapAccess";

/*
 * Serves the Marketmap case study's protected images and videos from /private/marketmap, only to visitors
 * who've unlocked the page. Anyone else gets a 404, the same as a missing file, so nothing gives away what's
 * there. next.config.ts bundles the folder with this route so it's there on Netlify.
 */

const DIR = path.join(process.cwd(), "private", "marketmap");

const TYPES: Record<string, string> = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

/** Videos are sent in pieces of at most this size, which keeps each response within Netlify's limits. */
const CHUNK = 4 * 1024 * 1024;

export async function GET(request: Request, ctx: RouteContext<"/work/marketmap/media/[file]">) {
  const { file } = await ctx.params;
  const type = TYPES[path.extname(file).toLowerCase()];
  // A plain file name only (no slashes, can't start with a dot), so nothing outside the folder can be asked for.
  if (!type || !/^[\w-][\w.-]*$/.test(file) || !(await hasAccess())) return notFound();

  const filePath = path.join(DIR, file);
  const info = await stat(filePath).catch(() => null);
  if (!info?.isFile()) return notFound();
  const size = info.size;

  const headers = {
    "Content-Type": type,
    "Accept-Ranges": "bytes",
    // Only the visitor's own browser may keep a copy.
    "Cache-Control": "private, max-age=3600",
    "X-Robots-Tag": "noindex",
  };

  // Video players ask for byte ranges (Safari won't play without them).
  const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("range") ?? "");
  if (range && (range[1] || range[2])) {
    let start: number;
    let end: number;
    if (range[1]) {
      start = Number(range[1]);
      end = range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
    } else {
      // "bytes=-500" means the last 500 bytes.
      start = Math.max(0, size - Number(range[2]));
      end = size - 1;
    }
    end = Math.min(end, start + CHUNK - 1);
    if (start > end || start >= size) {
      return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
    }
    return new Response(stream(filePath, start, end), {
      status: 206,
      headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${size}`, "Content-Length": String(end - start + 1) },
    });
  }

  return new Response(stream(filePath), { headers: { ...headers, "Content-Length": String(size) } });
}

function stream(filePath: string, start?: number, end?: number) {
  return Readable.toWeb(createReadStream(filePath, { start, end })) as ReadableStream;
}

function notFound() {
  return new Response("Not found", { status: 404 });
}
