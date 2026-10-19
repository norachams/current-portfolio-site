import type { Metadata } from "next";
import OutsideTabs from "@/components/outside/OutsideTabs";
import { featured, photos } from "@/data/photography";
import { arrangeWall } from "@/lib/photoWall";

export const metadata: Metadata = {
  title: "outside work · nora",
};

export default function OutsideWorkPage() {
  // Worked out here, on the server at build time, so the browser doesn't have to.
  const first = featured.map((image) => photos.findIndex((p) => p.image === image));
  const walls = { 1: arrangeWall(photos, 1, first), 2: arrangeWall(photos, 2, first), 3: arrangeWall(photos, 3, first) };

  return (
    <main className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col gap-12 px-4 pt-16 pb-24 min-[1112px]:px-0">
      <h1 className="font-serif text-[44px] leading-[1.15] font-normal tracking-[-0.015em]">outside work</h1>
      <OutsideTabs walls={walls} />
    </main>
  );
}
