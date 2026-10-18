"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "work" },
  { href: "/me", label: "me" },
  { href: "/outside-work", label: "outside work" },
  { href: "/writing", label: "writing" },
];

function isCurrent(pathname: string, href: string) {
  // Project pages live under /work, so they keep "work" highlighted.
  if (href === "/") return pathname === "/" || pathname.startsWith("/work");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="mx-auto flex w-full max-w-[1080px] flex-wrap items-center justify-between gap-4 px-4 py-7 min-[1112px]:px-0">
      <Link href="/" className="font-serif text-2xl text-ink">
        nora
      </Link>
      <nav aria-label="Main">
        <ul className="flex flex-wrap gap-x-7 gap-y-2 text-[15px]">
          {links.map(({ href, label }) => {
            const current = isCurrent(pathname, href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={current ? "page" : undefined}
                  className={`text-ink decoration-rosewood decoration-2 underline-offset-[6px] ${
                    current ? "underline" : "hover:underline"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
