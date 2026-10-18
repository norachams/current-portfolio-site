import type { Pastel } from "@/data/projects";
import { pastelSoft } from "@/lib/pastels";

export default function AboutLabel({ number, label, pastel }: { number: string; label: string; pastel: Pastel }) {
  return (
    <span className="font-mono text-[11px] tracking-[0.06em] text-ink-muted uppercase">
      <span className={`${pastelSoft[pastel]} rounded-[4px] px-1.5 py-0.5 text-on-pastel`}>{number}</span> / {label}
    </span>
  );
}
