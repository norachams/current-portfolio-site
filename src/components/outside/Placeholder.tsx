import type { Pastel } from "@/data/projects";
import { pastelBg } from "@/lib/pastels";

/** Labelled pastel block standing in for a photo that isn't in yet. */
export default function Placeholder({
  pastel,
  label,
  className = "",
  style,
}: {
  pastel: Pastel;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      style={style}
      className={`${pastelBg[pastel]} flex items-center justify-center p-2 text-center font-mono text-[11px] text-on-pastel ${className}`}
    >
      [{label}]
    </div>
  );
}
