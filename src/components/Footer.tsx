import { email, socials, sourceUrl } from "@/data/site";
import CopyEmail from "./CopyEmail";

const link = "text-rosewood hover:underline hover:decoration-2 hover:underline-offset-3";

export default function Footer() {
  return (
    <footer className="edge-width">
      {/* On phones it stacks: links, then the signature and last updated on one row beneath. */}
      <div className="flex flex-wrap items-end justify-between gap-7 border-t border-line pt-8 pb-10 max-sm:flex-col max-sm:items-stretch">
        <div className="flex flex-col gap-3">
          <h2 className="font-serif text-[22px] leading-[1.3] font-normal">say hi</h2>
          <ul className="flex flex-wrap items-center gap-x-[22px] gap-y-2 font-mono text-[13px]">
            {socials.map((social) => (
              <li key={social.label}>
                <SocialLink {...social} />
              </li>
            ))}
            <li>
              {email ? (
                <CopyEmail className={link}>email</CopyEmail>
              ) : (
                <span className="text-ink-muted">email</span>
              )}
            </li>
          </ul>
        </div>

        {/* Last updated sits above the signature, which lines up with the links along the bottom. */}
        <div className="flex flex-col items-end gap-3 max-sm:flex-row-reverse max-sm:items-baseline max-sm:justify-between">
           <Signature />
          <LastUpdated />
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ label, url }: { label: string; url: string }) {
  if (!url) return <span className="text-ink-muted">{label} ↗</span>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={link}>
      {label} ↗
    </a>
  );
}

const updated = process.env.NEXT_PUBLIC_LAST_UPDATED;

/** Date of the latest commit (set in next.config.ts), linking to the commit history on GitHub. */
function LastUpdated() {
  if (!updated) return null;
  // Use the calendar day the commit was made on, in its own time zone, so a late-night commit doesn't roll over.
  const date = new Date(`${updated.slice(0, 10)}T00:00:00Z`);
  const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).toLowerCase();
  return (
    <a
      href={sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`last updated ${label}, see the changes on GitHub`}
      className="font-mono text-xs text-ink-muted hover:text-ink hover:underline hover:decoration-2 hover:underline-offset-3"
    >
      last updated <time dateTime={updated}>{label}</time> ↗
    </a>
  );
}

function Signature() {
  return <span className="font-mono text-xs text-ink-muted">© 2026 Nora Chamseddin</span>;
}
