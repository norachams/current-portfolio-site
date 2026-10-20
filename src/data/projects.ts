export type Pastel = "mint" | "celadon" | "gold" | "sky" | "lilac" | "peach" | "blush";

export type Project = {
  slug: string;
  name: string;
  meta: string;
  note: string;
  pastel: Pastel;
  url?: string;
  /** Looping clip or screenshot for the card. Falls back to a labelled pastel block. */
  media?: { type: "image" | "video"; src: string; alt?: string };
};

// Brackets mark content that still needs filling in (see the handoff's open items).
export const projects: Project[] = [
  {
    slug: "caramel",
    name: "caramel",
    meta: "founder",
    note: "reads your gmail and sorts every application with a custom nlp pipeline.",
    pastel: "peach",
    media: { type: "video", src: "/projects/caramel-promo.mp4" },
  },
  {
    slug: "medibook",
    name: "medibook",
    meta: "side project",
    note: "one interactive map for 100k+ multifamily properties, built for the sales team.",
    pastel: "sky",
    media: { type: "video", src: "/projects/Medibook.mp4" },
  },
  {
    slug: "levanta",
    name: "levanta",
    meta: "side project",
    note: "a daily leetcode challenge by text.",
    pastel: "mint",
    media: { type: "video", src: "/projects/Levanta.mp4" },
  },
  {
    slug: "voz",
    name: "voz",
    meta: "side project",
    note: "a voice assistant you just talk to, with a live transcript beside it.",
    pastel: "lilac",

    media: { type: "video", src: "/projects/voz.mp4" },
  },
  {
    slug: "project-5",
    name: "[project 5]",
    meta: "Design Project",
    note: "[one line about it]",
    pastel: "blush",

  },
  {
    slug: "textbox",
    name: "textbox",
    meta: "side project",
    note: "[one line about it]",
    pastel: "gold",
    url: "ttps://github.com/norachams/Voz",
    media: { type: "video", src: "/projects/textbox.mp4" },
  },
];
