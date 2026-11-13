import type { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import AnnotatedFrame from "@/components/case-study/AnnotatedFrame";
import CaseStudyLayout from "@/components/case-study/CaseStudyLayout";
import {
  Callout,
  CaseStudyHero,
  CaseStudySection,
  Flow,
  Funnel,
  InfoCard,
  Loop,
  Media,
  MediaPlaceholder,
  NorthStar,
  Stage,
  Stats,
} from "@/components/case-study/parts";

export const metadata: Metadata = {
  title: "caramel · nora",
  description:
    "Case study: Caramel, a job hunt tool that reads your inbox, finds where you're stalling and tells you what to do next.",
};

const sections = [
  { id: "tldr", label: "tl;dr" },
  { id: "background", label: "why i built it" },
  { id: "problem", label: "problem" },
  { id: "evolution", label: "evolution" },
  { id: "insight", label: "insight" },
  { id: "testing", label: "testing" },
  { id: "vision", label: "vision" },
  { id: "next", label: "what's next" },
  { id: "reflections", label: "reflections" },
];

export default function CaramelCaseStudy() {
  return (
    <PageTransition>
      <CaseStudyLayout
        title="Caramel"
        link={{ href: "https://www.oncaramel.com/", label: "oncaramel.com" }}
        backHref="/"
        sections={sections}
      >
        {/* The intro: clip, the one-line pitch, then the role / timeline / status card. */}
        <div className="flex flex-col gap-6">
          <CaseStudyHero
            media={{ type: "video", src: "/projects/caramel-logo.mp4", alt: "Caramel product walkthrough" }}
            morphName="project-media-Caramel"
          />
          <h2 className="font-serif text-[28px] leading-[1.2] font-normal text-balance text-ink-strong min-[900px]:text-[32px]">
            A smarter way to job hunt
          </h2>
          <InfoCard
            columns={3}
            items={[
              { label: "My role", value: "Design, full stack, ML" },
              { label: "Timeline", value: "2024 to now" },
              { label: "Status", value: "In beta (20 sign ups)" },
            ]}
          />
        </div>

        <CaseStudySection id="tldr" label="TL;DR">
          <p>
            Caramel is a job hunt coach. It reads recruiter emails straight from your inbox, learns your pipeline and
            the roles you&rsquo;re going after and shows you where you&rsquo;re falling behind. Then it gives you a few
            clear actions each week. It only reaches out about a job when it finds one you&rsquo;d want and could
            actually land.
          </p>
          <p>
            I designed, built and shipped it solo. It&rsquo;s in beta with 17 people on the waitlist, 9 signups and 7 actively
            applying with it.
          </p>
        </CaseStudySection>

        <CaseStudySection id="background" label="Why I built it" title="The job hunt gives you plenty of data and no answers">
          <p>
            As a co-op student, I&rsquo;ve gone through a hiring cycle almost every term for 5 years and landed 6
            internships. Each cycle, the applying was the easy part. Making sense of it was harder. Which applications
            were still alive? Why did some roles reply and others didn&rsquo;t? What should I change next time?
          </p>
          <p>
            My inbox had all the answers, scattered across hundreds of emails. So two years ago, I built the first
            version of Caramel to read them for me and track everything automatically.
          </p>
          <NorthStar>
            How might we help job seekers know what&rsquo;s working and what to do next, so they can spend their energy
            on what actually matters: their skills?
          </NorthStar>
        </CaseStudySection>

        <CaseStudySection id="problem" label="Problem" title="More applications, more ghosting, no idea what to fix">
          <p>
            Most job search tools push you to send hundreds of auto-filled applications and hope something sticks. You
            get more rejections, more ghosting and no idea what to fix.
          </p>
          <p>
            Caramel goes the other way: fewer, better applications and a clear read on what&rsquo;s working.
          </p>
        </CaseStudySection>

        <CaseStudySection id="evolution" label="Evolution" title="From tracker to workspace to a career coach">
          <ol className="mt-2 flex flex-col gap-12">
            <Stage number="01" title="A tracker for myself" meta="2024">
              <p>
                Caramel started as a side project. I was tired of keeping spreadsheets of where I&rsquo;d applied, so I
                built a tool that read my inbox and tracked it for me. You connect Gmail and it pulls the company, role
                and status out of every email, with no manual entry. I built the whole ML pipeline myself instead of
                calling an outside AI API.
              </p>
              <Media src="/projects/caramel-tracker-1.mp4" alt="Caramel's tracker filling itself in from recruiter emails" />
              <Flow
                label="The pipeline"
                steps={[
                  { label: "Gmail", detail: "recruiter emails" },
                  { label: "Classifier", detail: "stage" },
                  { label: "Extraction", detail: "company, role" },
                  { label: "Matching", detail: "no duplicates" },
                  { label: "Tracker" },
                ]}
              />
            </Stage>

            <Stage number="02" title="An all-in-one job hunt workspace">
              <p>
                Once tracking worked, I kept adding the other parts of the hunt: a home feed of matching jobs, a dream
                company watchlist, interview prep and saved jobs. The goal was one place to organize everything.
              </p>
              <Media src="/projects/homepage.mp4" alt="Caramel's home feed of matching jobs" />
              <Media
                src="/projects/other-features.mp4"
                alt="Caramel's dream company watchlist and interview prep, the features only 3 testers used"
              />
              <Funnel
                label="What beta users actually did"
                steps={[
                  { label: "Waitlist", value: 17 },
                  { label: "Signed up", value: 9 },
                  { label: "Connected Gmail", value: 8 },
                  { label: "Actively applying", value: 7 },
                  { label: "Added dream companies", value: 3, highlight: true },
                  { label: "Opened interview prep", value: 3, highlight: true },
                ]}
              />
              <Callout label="What I learned">
                <p>
                  <strong className="font-semibold text-ink-strong">Tracking stuck.</strong> 8 of 9 testers connected Gmail, and 7 were actively applying with Caramel tracking it
                  for them. Applications that update themselves from your inbox was the original idea, and it held up.
                </p>
                <p>
                  <strong className="font-semibold text-ink-strong">The extras didn&rsquo;t.</strong> Only 3 testers ever added a dream company or opened interview prep, even
                  though both were live.
                </p>
                <p>
                  Those features ask you to put in work up front, on parts of the hunt that already feel under control.
                  Tracking answers the question people actually worry about: did anyone reply? But it stops there. When
                  the answer is no, it can&rsquo;t tell you what to change. That gap is where the coach comes in.
                </p>
              </Callout>
            </Stage>

            <Stage number="03" title="A career coach" meta="now">
              <p>
                The workspace helped people organize their hunt, but it didn&rsquo;t help them get better at it. So
                Caramel is becoming a coach.
              </p>
              <Loop
                label="The coaching loop"
                steps={[
                  { label: "Learn", detail: "your pipeline, target roles" },
                  { label: "Diagnose", detail: "gaps vs. what roles ask for" },
                  { label: "Recommend", detail: "jobs you’d want and could land" },
                  { label: "Act", detail: "a few actions each week" },
                  { label: "Track", detail: "replies, stages, progress" },
                ]}
              />
              <p>
                <strong className="font-semibold text-ink-strong">Two ways to find jobs.</strong> Your feed in Caramel
                shows every relevant role, for when you want to browse. But Caramel only texts or emails you when it finds
                one that&rsquo;s meant for you: the right role, at a company you&rsquo;d love, that you have a real shot
                at. Most weeks that&rsquo;s zero or one. When your phone buzzes, it&rsquo;s worth opening.
              </p>
            </Stage>
          </ol>
        </CaseStudySection>

        <CaseStudySection
          id="insight"
          label="Insight"
          title="Tracking isn’t the real problem. Not knowing what to do next is."
        >
          <p>
            Hiring has turned into an AI arms race, a filter war. Recruiters screen with ATS software, candidates fight
            back with auto-apply bots and nobody trusts the process.
          </p>
          <Stats
            items={[
              {
                figure: "55%",
                text: "of job seekers say not hearing back after applying is their biggest frustration.",
                source: "Resume Genius, 2026",
              },
              {
                figure: (
                  <>
                    9.3% <span className="text-[20px] text-ink-muted">vs</span> 2.6%
                  </>
                ),
                text: "Targeting beats volume: interview rates for 11 to 20 applications, compared to 100+.",
                source: "Huntr, Q1 2026",
              },
            ]}
          />
          <p>When things go quiet, you can&rsquo;t tell whether to fix your resume, follow up or move on.</p>
        </CaseStudySection>

        <CaseStudySection id="testing" label="Testing" title="Testing the coach by hand first">
          <p>
            Before I automate the coaching, I want proof people want it. So I&rsquo;m testing it by hand first: sending 5
            beta users a funnel report and seeing if they ask for another.
          </p>
          <InfoCard
            columns={3}
            items={[
              { label: "Hypothesis", value: "Knowing what to do next is worth more to job seekers than another tracker." },
              { label: "Test", value: "A hand-made funnel report for 5 beta users, with a few actions each." },
              { label: "Signal", value: "They ask for another one." },
            ]}
          />
          <p>
            Here&rsquo;s one of the reports, anonymized. The name, companies, places and numbers are changed, but the
            structure and the advice are what a tester received.
          </p>
          <AnnotatedFrame
            src="/case-studies/caramel/coach-report.html"
            title="Maya’s Next Moves · Caramel coach"
            height={720}
            notes={[
              {
                target: "progress",
                title: "Progress first.",
                text: "Before any new advice, the report shows what she did last week and what changed. The streak keeps her coming back.",
              },
              {
                target: "pattern",
                title: "The why behind the number.",
                text: "A 7% rate looks like a resume problem. Splitting by role shows it’s a targeting problem: 16% in data roles, 0% in ML.",
              },
              {
                target: "market",
                title: "Measured against the market.",
                text: "Her resume is checked against 15 roles she wants and 20 people who got them. One clear gap comes out of it, not a list.",
              },
              {
                target: "plan",
                title: "Five kinds of action.",
                text: "Prep, follow up, level up, reach out and close out, each with a time estimate and a message or plan ready to go.",
              },
              {
                target: "role",
                title: "Quiet by default.",
                text: "Out of hundreds of possible roles, Caramel picks one.",
              },
              {
                target: "settings",
                title: "The coach changes the product too.",
                text: "The advice turns into settings, so next week’s suggestions are already better.",
              },
            ]}
          />
          <div className="mt-4 flex flex-col gap-4">
            <h3 className="font-serif text-[22px] leading-[1.3] font-normal text-ink-strong">What happened</h3>
            <p>
              So far I&rsquo;ve sent one report, and more are on the way. Here&rsquo;s what came back from the first
              one.
            </p>
            <p>
              I asked the tester three questions: Which sections were useful? Was anything off or wrong? Would you want
              another one?
            </p>
            <figure className="flex flex-col gap-2 border-l-2 border-rosewood pl-5">
              <blockquote className="font-serif text-[22px] leading-[1.4] text-ink-strong italic">
                &ldquo;Really useful, nothing wrong with the info, and yes, looking forward to the next one.&rdquo;
              </blockquote>
              <figcaption className="font-mono text-[11px] tracking-[0.06em] text-ink-muted">
                Beta tester, Nov 2026 (paraphrased)
              </figcaption>
            </figure>
            <p>
              <strong className="font-semibold text-ink-strong">They acted on it.</strong> Soon after reading the report,
              they updated their location and role settings to match what it recommended. One report changed how they
              use Caramel.
            </p>
            <ul className="flex flex-col divide-y divide-line rounded-card border border-line bg-paper-raised">
              {[
                "Asked for another report",
                "Found no errors in the read of their pipeline",
                "Changed their settings based on the advice",
              ].map((item) => (
                <li key={item} className="flex items-center justify-between gap-4 px-5 py-3 text-[15px] text-ink-strong">
                  {item}
                  <span aria-label="yes" className="font-semibold text-[#4f7a3a] dark:text-[#9cc788]">
                    ✓
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </CaseStudySection>

        <CaseStudySection id="vision" label="Vision" title="Design ideas for the coach">
          <p>
            It learns your pipeline and the roles you&rsquo;re going after, then compares them to the market: what
            those roles ask for and what the people who hold them look like. From there it shows you where
            you&rsquo;re falling behind and gives you a few personalized actions each week. That could be following
            up with a company that went quiet, building a skill your target roles keep asking for or skipping a kind
            of role that never replies to you.
          </p>
          <p>
            Instead of pushing you to apply to more jobs, it only reaches out when it finds one you&rsquo;d want and
            could actually land.
          </p>
          <p>
            The goal is that you stop wondering whether your search is working. Caramel tells you and tells you what
            to do next.
          </p>
          <MediaPlaceholder label="coach screen explorations" inProgress />
          <MediaPlaceholder
            label="dream job notification: one text or email for one role, with a line on why it matched"
            aspect="aspect-[16/7]"
            inProgress
          />
        </CaseStudySection>

        <CaseStudySection id="next" label="What's next">
          <ol className="flex flex-col gap-5">
            {[
              {
                lead: "Send more reports by hand.",
                text: "One tester is a start. Next I’m sending reports to the rest of the active beta users and tracking two things: do they ask for another one, and do they act on it?",
              },
              {
                lead: "Automate the part people acted on first.",
                text: "The tester’s first move was changing their settings, the one action they could take right inside Caramel. So that’s where I’d start: advice that turns into a one-tap change, like pausing a role type or narrowing a location.",
              },
              {
                lead: "Build the coach screens.",
                text: "Today, the Pipeline board with coach hints, Jobs and Your edge, starting with Today, since it’s where the weekly plan lives.",
              },
              {
                lead: "Texts last.",
                text: "Texting only works if every message is worth opening. I want the recommendations to be right in the app before Caramel starts buzzing anyone’s phone.",
              },
            ].map((step, i) => (
              <li key={step.lead} className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-3">
                <span className="pt-[0.3em] font-mono text-[12px] text-rosewood">{String(i + 1).padStart(2, "0")}</span>
                <p>
                  <strong className="font-semibold text-ink-strong">{step.lead}</strong> {step.text}
                </p>
              </li>
            ))}
          </ol>
          <Callout label="The bar for building">
            <p>
              If at least 3 of the 5 testers ask for a second report, the coach is worth automating. If not, I go back to
              what they actually did with the first one.
            </p>
          </Callout>
        </CaseStudySection>

        <CaseStudySection id="reflections" label="Reflections">
          <p>
            <strong className="font-semibold text-ink-strong">I built before I watched.</strong> I added dream
            companies and interview prep before checking whether testers were even job hunting, let alone
            using them. Next time I&rsquo;d recruit people mid-search and watch their first session before adding
            anything.
          </p>
          <p>
            <strong className="font-semibold text-ink-strong">People use what saves them work, not what organizes them.</strong>{" "}
            Tracking stuck because it happened on its own. Everything that asked people to do more up front got
            ignored, even when it was useful. That&rsquo;s why every coach action comes with a message or plan ready to
            go.
          </p>
        </CaseStudySection>
      </CaseStudyLayout>
    </PageTransition>
  );
}
