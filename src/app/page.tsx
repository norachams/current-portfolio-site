import Intro from "@/components/Intro";
import WorkSection from "@/components/WorkSection";
import { projects } from "@/data/projects";
import PageTransition from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main className="page-width flex flex-1 flex-col gap-18 pt-16 pb-24">
        <Intro />
        <WorkSection projects={projects} />
      </main>
    </PageTransition>
  );
}
