import type { StaticImageData } from "next/image";
import type { Pastel } from "@/data/projects";

// Brackets mark content that still needs filling in. Add photos by importing them
// from public/ (e.g. `import climbing from "../../public/outside/climbing.jpg"`).

export type Hobby = {
  slug: string;
  name: string;
  caption: string;
  pastel: Pastel;
  photo?: StaticImageData;
  /** 3–4 extra photos for the hover stack. */
  extras?: StaticImageData[];
};

export const hobbies: Hobby[] = [
  { slug: "climbing", name: "climbing", caption: "since 2019, before it was cool", pastel: "mint" },
  { slug: "route-setting", name: "route setting", caption: "[a short caption]", pastel: "lilac" },
  { slug: "skating", name: "skating", caption: "[a short caption]", pastel: "peach" },
  { slug: "traveling", name: "traveling", caption: "four months on exchange in Bilbao, Spain", pastel: "sky" },
];

export type Teammate = { name: string; initial: string };

export type Hackathon = {
  event: string;
  year: string;
  pastel: Pastel;
  project: string;
  line: string;
  stack: string;
  team: Teammate[];
  devpost?: string;
  code?: string;
};

const me: Teammate = { name: "Nora (me)", initial: "N" };
const teammate: Teammate = { name: "[teammate]", initial: "?" };

export const hackathons: Hackathon[] = [
  {
    event: "[HACKATHON NAME]",
    year: "2026",
    pastel: "gold",
    project: "[project name]",
    line: "a cookbook site where an ai helper watches you cook through your camera and talks you through each step.",
    stack: "backboard.io · [rest of the stack]",
    team: [me, teammate, teammate, teammate],
  },
  {
    event: "[HACKATHON NAME]",
    year: "[year]",
    pastel: "lilac",
    project: "[project name]",
    line: "[one line on what you built]",
    stack: "[stack]",
    team: [me, teammate, teammate],
  },
  {
    event: "[HACKATHON NAME]",
    year: "[year]",
    pastel: "mint",
    project: "[project name]",
    line: "[one line on what you built]",
    stack: "[stack]",
    team: [me, teammate],
  },
  {
    event: "[HACKATHON NAME]",
    year: "[year]",
    pastel: "peach",
    project: "[project name]",
    line: "[one line on what you built]",
    stack: "[stack]",
    team: [me, teammate, teammate, teammate],
  },
];

export type Volunteering = {
  org: string;
  kind: "CAUSE" | "COMMUNITY" | "EVENT";
  year: string;
  role: string;
  note: string;
  pastel: Pastel;
  /** Resting tilt in degrees; the stamp straightens on hover. */
  tilt: number;
};

export const volunteering: Volunteering[] = [
  {
    org: "Paper Airplanes",
    kind: "CAUSE",
    year: "[year]",
    role: "english tutor",
    note: "tutored a student doing her master's online, almost every week from august to december.",
    pastel: "peach",
    tilt: -2,
  },
  { org: "[organization]", kind: "COMMUNITY", year: "[year]", role: "[role]", note: "[a sentence on what you did]", pastel: "mint", tilt: 1.5 },
  { org: "[event]", kind: "EVENT", year: "[year]", role: "[role]", note: "[a sentence on what you did]", pastel: "lilac", tilt: -1 },
  { org: "[organization]", kind: "CAUSE", year: "[year]", role: "[role]", note: "[a sentence on what you did]", pastel: "sky", tilt: 2 },
  { org: "[community]", kind: "COMMUNITY", year: "[year]", role: "[role]", note: "[a sentence on what you did]", pastel: "blush", tilt: -1.5 },
  { org: "[event]", kind: "EVENT", year: "[year]", role: "[role]", note: "[a sentence on what you did]", pastel: "gold", tilt: 1 },
];

export type Shot = {
  city: string;
  caption: string;
  pastel: Pastel;
  image?: StaticImageData;
  alt?: string;
  /** Placeholder height until the real photo is in. */
  height: number;
};

const shotPastels: Pastel[] = ["sky", "mint", "peach", "lilac", "gold", "blush"];
const shotHeights = [320, 220, 280, 380, 240, 300, 260, 340, 220, 300, 360, 240];
const shotCities = ["bilbao", "[city]", "bilbao", "[city]", "[city]", "bilbao", "[city]", "[city]", "bilbao", "[city]", "[city]", "[city]"];

export const photos: Shot[] = shotHeights.map((height, i) => ({
  city: shotCities[i],
  caption: "[a short caption]",
  pastel: shotPastels[i % shotPastels.length],
  height,
}));

export const instagramUrl: string | undefined = undefined; // [instagram url]
