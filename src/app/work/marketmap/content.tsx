import { CaseStudySection, MediaPlaceholder } from "@/components/case-study/parts";

/*
 * Everything behind the Marketmap lock. It's a server component and only rendered once the code checks out,
 * so none of it reaches a browser that hasn't unlocked the page.
 *
 * Protected images and videos go in /private/marketmap (not /public, where anyone can fetch them) and are
 * linked through the media route, e.g. <Media src="/work/marketmap/media/demo.mp4" alt="..." />.
 *
 * Each section id needs a matching entry in `sections` in page.tsx.
 */
export default function MarketmapContent() {
  return (
    <>
      <CaseStudySection id="problem" label="Problem" title="[The problem, as a takeaway]">
        <p>[What sales and GTM teams were struggling with, and why it mattered.]</p>
      </CaseStudySection>

      <CaseStudySection id="process" label="Process" title="[How it came together]">
        <p>[Research, design decisions and how the data from 7+ sources was combined.]</p>
        <MediaPlaceholder label="process screens" />
      </CaseStudySection>

      <CaseStudySection id="outcome" label="Outcome" title="[What shipped and what it changed]">
        <p>[Results, usage and impact.]</p>
        <MediaPlaceholder label="final product" />
      </CaseStudySection>

      <CaseStudySection id="reflections" label="Reflections">
        <p>[What you learned and what you&rsquo;d do differently.]</p>
      </CaseStudySection>
    </>
  );
}
