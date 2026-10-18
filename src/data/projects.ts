export type Pastel = "mint" | "celadon" | "gold" | "sky" | "lilac" | "peach" | "blush";

export type Project = {
  slug: string;
  name: string;
  meta: string;
  note: string;
  pastel: Pastel;
  /** Looping clip or screenshot for the card. Falls back to a labelled pastel block. */
  media?: { type: "image" | "video"; src: string; alt?: string };
};

// Brackets mark content that still needs filling in (see the handoff's open items).
export const projects: Project[] = [
  {
    slug: "caramel",
    name: "caramel",
    meta: "2024 to now · founder",
    note: "reads your gmail and sorts every application with a custom nlp pipeline.",
    pastel: "mint",
  },
  {
    slug: "verifast-market-map",
    name: "verifast market map",
    meta: "2026 · engineering",
    note: "one interactive map for 100k+ multifamily properties, built for the sales team.",
    pastel: "sky",
  },
  {
    slug: "levanta",
    name: "levanta",
    meta: "[year] · side project",
    note: "a daily leetcode challenge by text.",
    pastel: "lilac",
  },
  {
    slug: "project-4",
    name: "[project 4]",
    meta: "[year] · [role]",
    note: "[one line about it]",
    pastel: "peach",
  },
  {
    slug: "project-5",
    name: "[project 5]",
    meta: "[year] · [role]",
    note: "[one line about it]",
    pastel: "blush",
  },
  {
    slug: "project-6",
    name: "[project 6]",
    meta: "[year] · [role]",
    note: "[one line about it]",
    pastel: "celadon",
  },
];
