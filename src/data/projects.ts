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
    slug: "Caramel",
    name: "Caramel",
    meta: "founder",
    note: "reads your gmail and sorts every application with a custom nlp pipeline.",
    pastel: "peach",
    media: { type: "video", src: "/projects/caramel-promo.mp4" },
  },
  {
    slug: "Voz",
    name: "Voz",
    meta: "side project",
    note: "a voice assistant you just talk to, with a live transcript beside it.",
    pastel: "lilac",

    media: { type: "video", src: "/projects/voz.mp4" },
  },
  {
    slug: "Medibook",
    name: "Medibook",
    meta: "side project",
    note: "one interactive map for 100k+ multifamily properties, built for the sales team.",
    pastel: "sky",
    media: { type: "video", src: "/projects/Medibook.mp4" },
  },
    {
    slug: "Caramel Landing Page",
    name: "Caramel Landing Page",
    meta: "side Project",
    note: "[one line about it]",
    pastel: "mint",
     media: { type: "video", src: "/projects/landing page.mp4" },

  },
  {
    slug: "Levanta",
    name: "Levanta",
    meta: "side project",
    note: "a daily leetcode challenge by text.",
    pastel: "blush",
    media: { type: "video", src: "/projects/Levanta.mp4" },
  },
  

  {
    slug: "Textbox",
    name: "Textbox",
    meta: "side project",
    note: "[one line about it]",
    pastel: "gold",
    url: "https://github.com/norachams/Voz",
    media: { type: "video", src: "/projects/textbox.mp4" },
  },
];
