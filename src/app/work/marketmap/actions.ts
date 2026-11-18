"use server";

import { cookies } from "next/headers";
import type { UnlockState } from "@/components/case-study/PasswordLock";
import { ACCESS_COOKIE, ACCESS_MAX_AGE, ACCESS_PATH, accessToken, isCorrectCode } from "@/lib/marketmapAccess";

/**
 * Checks the code from the lock. On a match it sets the unlock cookie, which re-renders the page with the
 * protected sections in the same round trip.
 */
export async function unlockMarketmap(prev: UnlockState, formData: FormData): Promise<UnlockState> {
  // One input per character, all named "code".
  const code = formData.getAll("code").join("");
  const token = accessToken();

  if (!token) console.warn("MARKETMAP_PASSWORD isn't set, so the Marketmap case study can't be unlocked.");

  if (token && isCorrectCode(code)) {
    (await cookies()).set(ACCESS_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: ACCESS_PATH,
      maxAge: ACCESS_MAX_AGE,
    });
    return { error: null, attempt: prev.attempt + 1 };
  }

  // A short pause on a wrong code makes guessing slow without being noticeable to a person.
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { error: "That code didn’t work. Try again.", attempt: prev.attempt + 1 };
}
