import { execSync } from "node:child_process";
import type { NextConfig } from "next";

// Date of the latest commit, baked in at build time for the footer's "last updated".
// Falls back to the build date if git isn't available.
function lastUpdated() {
  try {
    return execSync("git log -1 --format=%cI", { encoding: "utf8" }).trim();
  } catch {
    return new Date().toISOString();
  }
}

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_LAST_UPDATED: lastUpdated() },
  cacheComponents: true,
  partialPrefetching: true,
  // The work grid lives on the home page, so /work sends people there.
  redirects() {
    return [{ source: "/work", destination: "/", permanent: false }];
  },
};

export default nextConfig;
