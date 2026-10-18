import { volunteering } from "@/data/outside";
import { pastelMid } from "@/lib/pastels";

export default function Volunteering() {
  return (
    <section aria-label="Volunteering" className="flex flex-col gap-5">
      <p className="font-mono text-[11px] text-ink-muted">
        <span className="[@media(hover:none)]:hidden">hover a stamp to see what i did</span>
        <span className="hidden [@media(hover:none)]:inline">what i did, stamp by stamp</span>
      </p>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-x-8 gap-y-10">
        {volunteering.map((vol, i) => (
          <li key={i}>
            <article tabIndex={0} aria-label={`${vol.org}, ${vol.role}`} className="group flex flex-col gap-3 rounded-tag">
              {/* Tilted stamp that straightens and grows on hover or focus */}
              <div
                style={{ "--tilt": `${vol.tilt}deg` } as React.CSSProperties}
                className="rotate-(--tilt) rounded-[4px] border-2 border-dashed border-line bg-paper-raised p-2.5 shadow-[0_10px_24px_-14px_rgba(84,73,75,0.35)] transition-[rotate,scale] duration-200 ease-out group-hover:scale-103 group-hover:rotate-0 group-focus-visible:scale-103 group-focus-visible:rotate-0 motion-reduce:transition-none"
              >
                <div className={`${pastelMid[vol.pastel]} flex h-[190px] flex-col justify-between rounded-[2px] p-3.5 text-on-pastel`}>
                  <span className="font-mono text-[10px] tracking-[0.08em]">{vol.kind}</span>
                  <h3 className="font-serif text-[26px] leading-[1.1] font-normal">{vol.org}</h3>
                  <span className="self-end font-serif text-lg italic">{vol.year}</span>
                </div>
              </div>
              <span className="font-mono text-[11px] text-ink-muted">{vol.role}</span>
              <p className="-mt-1 -translate-y-1 text-sm leading-normal opacity-0 transition-[opacity,translate] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
                {vol.note}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
