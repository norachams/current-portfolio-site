import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The work grid lives on the home page, so /work sends people there.
  redirects() {
    return [{ source: "/work", destination: "/", permanent: false }];
  },
};

export default nextConfig;
