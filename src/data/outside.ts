import type { StaticImageData } from "next/image";
import type { Pastel } from "@/data/projects";
import climbing1 from "../../public/climbing 1.jpg";
import climbing2 from "../../public/climbing 2.jpg";
import climbing3 from "../../public/climbing 3.jpg";
import climbing4 from "../../public/climbing 4.jpg";
import climbing5 from "../../public/climbing 5.jpg";
import climbing6 from "../../public/climbing 6.jpg";
import climbing7 from "../../public/climbing 7.jpg";
import setting1 from "../../public/setting 1.jpeg";
import setting2 from "../../public/setting 2.jpg";
import setting3 from "../../public/setting 3.jpeg";
import setting4 from "../../public/setting 4.jpeg";
import setting5 from "../../public/setting 5.jpeg";
import setting6 from "../../public/setting 6.jpeg";
import setting7 from "../../public/setting 7.jpeg";
import setting8 from "../../public/setting 8.jpeg";
import skating1 from "../../public/skating 1.jpg";
import traveling from "../../public/travel pic.jpg";

// Brackets mark content that still needs filling in. Add photos by importing them
// from public/ (e.g. `import climbing from "../../public/outside/climbing.jpg"`).

/** Plain text, or a mix of text and links. */
export type Caption = string | (string | { text: string; href: string })[];

export type Hobby = {
  slug: string;
  name: string;
  caption: Caption;
  pastel: Pastel;
  photo?: StaticImageData;
  /** Which part of the photo to keep when the card crops it (CSS object-position). */
  photoPosition?: string;
  /** 3–4 extra photos for the hover stack. */
  extras?: StaticImageData[];
  /** Shown as a trail of pills on hover instead of photos. */
  countries?: string[];
};

export const hobbies: Hobby[] = [
  {
    slug: "climbing",
    name: "climbing",
    caption: "since 2019, before it was cool or in the Olympics",
    pastel: "mint",
    photo: climbing1,
    extras: [climbing2, climbing3, climbing4, climbing5, climbing6, climbing7],
  },
  {
    slug: "route-setting",
    name: "route setting",
    caption: [
      "three-day route-setting workshop with ",
      { text: "The B.I.G. Initiative", href: "https://thebiginitiative.ca/en/" },
      " at ",
      { text: "Joe Rockhead’s", href: "https://www.joerockheads.com/" },
    ],
    pastel: "lilac",
    photo: setting1,
    extras: [setting2, setting3, setting4, setting5, setting6, setting7, setting8],
  },
  { slug: "skating", name: "Ice skating", caption: "learning new figure skating tricks", pastel: "sky", photo: skating1 },
  {
    slug: "traveling",
    name: "traveling",
    caption: "15 countries and counting",
    pastel: "peach",
    photo: traveling,
    photoPosition: "50% 65%",
    countries: [
      "Spain",
      "Ireland",
      "Scotland",
      "Belgium",
      "Netherlands",
      "Wales",
      "England",
      "Lithuania",
      "France",
      "Hungary",
      "UAE",
      "Saudi Arabia",
      "Canada",
      "USA",
    ],
  },
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
