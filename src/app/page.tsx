import Intro from "@/components/Intro";
import WorkSection from "@/components/WorkSection";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[1080px] flex-1 flex-col gap-20 px-4 pt-[88px] pb-24 min-[1112px]:px-0">
      <Intro />
      <WorkSection projects={projects} />
    </main>
  );
}
