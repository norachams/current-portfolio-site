import type { Metadata } from "next";
import { Suspense } from "react";
import PageTransition from "@/components/PageTransition";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import PasswordLock from "@/components/case-study/PasswordLock";
import { CaseStudyHero, CaseStudySection, InfoCard } from "@/components/case-study/parts";
import { hasAccess } from "@/lib/marketmapAccess";
import { unlockMarketmap } from "./actions";
import MarketmapContent from "./content";

export const metadata: Metadata = {
  title: "marketmap · nora",
  description:
    "Case study: Marketmap, an AI-powered market intelligence platform I designed and built at VeriFast.",
};

// The overview is public. Everything after it is behind the lock (see content.tsx).
const sections = [
  { id: "overview", label: "overview" },
  { id: "problem", label: "problem" },
  { id: "process", label: "process" },
  { id: "outcome", label: "outcome" },
  { id: "reflections", label: "reflections" },
];

export default function MarketmapCaseStudy() {
  return (
    <PageTransition>
      <CaseStudyLayout title="Marketmap" backHref="/" sections={sections}>
        {/* Brackets mark content that still needs filling in. */}
        <div className="flex flex-col gap-6">
          <CaseStudyHero
            media={{ type: "video", src: "/projects/marketmaplogo.mp4", alt: "Marketmap logo" }}
            morphName="project-media-Marketmap"
            tint="sky"
          />
          <h2 className="font-serif text-[28px] leading-[1.2] font-normal text-balance text-ink-strong min-[900px]:text-[32px]">
            A faster way to find the next lead
          </h2>
          <InfoCard
            columns={3}
            items={[
              { label: "My role", value: "Product engineer" },
              { label: "Timeline", value: "July to December 2026" },
              { label: "Company", value: "VeriFast" },
            ]}
          />
        </div>

        <CaseStudySection id="overview" label="Overview">
          <p>
            An AI-powered market intelligence platform I designed and built from scratch at VeriFast. It combines data on
            100K+ properties from 7+ sources to help sales and GTM teams discover new prospects and opportunities.
          </p>
        </CaseStudySection>

        {/* Reading the unlock cookie happens per request, so this part streams in after the static page. */}
        <Suspense fallback={<LockedFallback />}>
          <Locked />
        </Suspense>
      </CaseStudyLayout>
    </PageTransition>
  );
}

/** The protected sections for visitors with the unlock cookie; the lock for everyone else. */
async function Locked() {
  if (await hasAccess()) return <MarketmapContent />;
  return <PasswordLock unlockAction={unlockMarketmap} />;
}

/** Holds the lock's place while the cookie is checked, without flashing the lock at people who've unlocked. */
function LockedFallback() {
  return <div aria-hidden="true" className="min-h-[360px]" />;
}
