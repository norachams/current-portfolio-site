import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/*
 * The Marketmap case study is under NDA, so most of it sits behind a code. The code lives in the
 * MARKETMAP_PASSWORD environment variable (set it in Netlify), never in this repo. A correct code sets
 * an http-only cookie, and the server only renders the protected sections (and serves the protected
 * media) when that cookie is there, so nothing behind the lock ever reaches a browser without it.
 */

export const ACCESS_COOKIE = "marketmap-access";
/** The cookie is only sent to the case study page and its media. */
export const ACCESS_PATH = "/work/marketmap";
/** How long one unlock lasts: 30 days. */
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30;

/** Letters and digits only, upper case, so "abc-123" and "ABC123" count as the same code. */
export function normalizeCode(code: string) {
  return code.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function password() {
  const value = process.env.MARKETMAP_PASSWORD;
  return value ? normalizeCode(value) : null;
}

/**
 * What the cookie holds. It's derived from the password, so it gives nothing away about it, and changing
 * the password signs everyone out.
 */
export function accessToken() {
  const pass = password();
  return pass ? createHmac("sha256", pass).update(ACCESS_COOKIE).digest("hex") : null;
}

/** Constant-time comparison, so response times don't hint at how close a guess was. */
function same(a: string, b: string) {
  const hash = (s: string) => createHash("sha256").update(s).digest();
  return timingSafeEqual(hash(a), hash(b));
}

export function isCorrectCode(code: string) {
  const pass = password();
  return !!pass && same(normalizeCode(code), pass);
}

/** True when this request carries a valid unlock cookie. */
export async function hasAccess() {
  const token = accessToken();
  if (!token) return false;
  const cookie = (await cookies()).get(ACCESS_COOKIE)?.value;
  return !!cookie && same(cookie, token);
}
