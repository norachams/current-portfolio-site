// Colours are guesses until matched to the real cats.
const cats = [
  { name: "Caramella", age: "10 years", body: "#e8b48a", belly: "#fbe7d3", accent: "#b9784a" },
  { name: "Woody", age: "5 years", body: "#8f8385", belly: "#d9d0cc", accent: "#5f5456" },
];

export default function Cats({ className = "" }: { className?: string }) {
  return (
    <aside aria-label="Cats" className={`flex flex-col items-start gap-1.5 ${className}`}>
      <span className="font-mono text-[11px] text-ink-muted">taking care of:</span>
      <div className="flex items-end gap-2.5">
        {cats.map((cat, i) => (
          <span
            key={cat.name}
            role="img"
            tabIndex={0}
            aria-label={`${cat.name}, ${cat.age}`}
            className={`cat group relative block rounded-lg ${i === 1 ? "cat-two" : ""}`}
          >
            <span className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2 translate-y-1 rounded-lg border border-line bg-paper-raised px-2.5 py-1 text-xs whitespace-nowrap opacity-0 transition-[opacity,translate] duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              {cat.name}, {cat.age}
            </span>
            <svg width="60" height="70" viewBox="0 0 60 70" aria-hidden="true">
              <path className="cat-tail" d="M44 58 C 58 56, 61 40, 52 33" fill="none" stroke={cat.accent} strokeWidth="5" strokeLinecap="round" />
              <ellipse cx="30" cy="51" rx="18" ry="17" fill={cat.body} />
              <ellipse cx="30" cy="56" rx="9" ry="10" fill={cat.belly} />
              <polygon points="18,19 20,5 28,14" fill={cat.body} />
              <polygon points="42,19 40,5 32,14" fill={cat.body} />
              <circle cx="30" cy="26" r="13" fill={cat.body} />
              <g className="cat-eyes">
                <ellipse cx="25" cy="25" rx="1.7" ry="2.2" fill="#3a3234" />
                <ellipse cx="35" cy="25" rx="1.7" ry="2.2" fill="#3a3234" />
              </g>
              <path d="M28.5 30 L31.5 30 L30 31.8 Z" fill={cat.accent} />
            </svg>
          </span>
        ))}
      </div>
    </aside>
  );
}
