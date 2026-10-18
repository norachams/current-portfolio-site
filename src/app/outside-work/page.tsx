import type { Metadata } from "next";
import OutsideTabs from "@/components/outside/OutsideTabs";

export const metadata: Metadata = {
  title: "outside work · nora",
};

export default function OutsideWorkPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col gap-12 px-4 pt-[88px] pb-24 min-[1112px]:px-0">
      <h1 className="font-serif text-[44px] leading-[1.15] font-normal tracking-[-0.015em]">outside work</h1>
      <OutsideTabs />
    </main>
  );
}
