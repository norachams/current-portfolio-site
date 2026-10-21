import type { StaticImageData } from "next/image";
import type { Pastel } from "@/data/projects";
import climbing1 from "../../public/outside/climbing 1.jpg";
import climbing2 from "../../public/outside/climbing 2.jpg";
import climbing3 from "../../public/outside/climbing 3.jpg";
import climbing4 from "../../public/outside/climbing 4.jpg";
import climbing5 from "../../public/outside/climbing 5.jpg";
import climbing6 from "../../public/outside/climbing 6.jpg";
import climbing7 from "../../public/outside/climbing 7.jpg";
import setting1 from "../../public/outside/setting 1.jpeg";
import setting2 from "../../public/outside/setting 2.jpg";
import setting3 from "../../public/outside/setting 3.jpeg";
import setting4 from "../../public/outside/setting 4.jpeg";
import setting5 from "../../public/outside/setting 5.jpeg";
import setting6 from "../../public/outside/setting 6.jpeg";
import setting7 from "../../public/outside/setting 7.jpeg";
import setting8 from "../../public/outside/setting 8.jpeg";
import skating1 from "../../public/outside/skating 1.jpg";
import puzzle from "../../public/outside/puzzle.jpg";
import puzzle2 from "../../public/outside/puzzle 2.jpg";
import puzzle3 from "../../public/outside/puzzle 3.jpg";
import traveling from "../../public/outside/travel pic.jpg";
import opcharge from "../../public/opcharge.png"

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
  /** Spans two grid columns and keeps the photo's own landscape shape; its trail photos are landscape too. */
  wide?: boolean;
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
  { slug: "skating", name: "ice skating", caption: "learning new figure skating tricks", pastel: "sky", photo: skating1 },
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
  {
    slug: "puzzles",
    name: "jigsaw puzzles",
    caption: "hover to peek at the 1,000-piece puzzle I'm working on right now",
    pastel: "blush",
    photo: puzzle,
    extras: [puzzle2, puzzle3],
    wide: true,
  },
];

export type Hackathon = {
  event: string;
  pastel: Pastel;
  project: string;
  line: string;
  /** Shows a winner tag beside the event. */
  winner?: boolean;
  /** Team photo; a labelled pastel square shows until it's in. */
  photo?: StaticImageData;
  devpost?: string;
  code?: string;
};

export const hackathons: Hackathon[] = [
    {
    event: "WinHacks",
    pastel: "lilac",
    project: "Opcharge",
    line: "uses machine learning to identify optimal locations for new EV charging stations across Ontario’s Windsor-Essex region.",
    winner: true,
    photo: opcharge,
    devpost: "https://devpost.com/software/opcharge",
    code: "https://github.com/Ahsan-khan/charger_challenge",
  },
  {
    event: "Hack the North",
    pastel: "sky",
    project: "Whisker",
    line: "is an AI cooking assistant that guides you through recipes, offering step-by-step instructions in real time to help you cook.",
    devpost: "https://devpost.com/software/little-chef-vbl89d",
    code: "https://github.com/m-abdulwahid/Kitchen-Companion",
  },
  {
    event: "HackCWRU",
    pastel: "blush",
    project: "CareCoin",
    line: "is a donation app that rounds up purchases and directs change to health research in developing countries.",
    devpost: "https://devpost.com/software/carecoin",
    code: "https://github.com/AimaAlakhume/CareCoin"
  },
];

export type VolunteerKind = "causes" | "events" | "communities";

export type Volunteering = {
  org: string;
  kind: VolunteerKind;
  role?: string;
  note?: string;
  dates?: string;
  url?: string;
  /** Colour of the role chip. */
  pastel: Pastel;
};

/** Column order on the page, with each column's heading and colour. */
export const volunteerKinds: { kind: VolunteerKind; label: string; pastel: Pastel }[] = [
  { kind: "communities", label: "communities", pastel: "mint" },
  { kind: "causes", label: "causes", pastel: "peach" },
  { kind: "events", label: "events & programs", pastel: "lilac" },

];

export const volunteering: Volunteering[] = [
  {
    org: "Paper Airplanes",
    kind: "causes",
    role: "women in tech program mentor",
    dates: "Feb 2025 – May 2026",
    note: "Guided five students from conflict-affected countries, including Syria and Palestine, with tech career development, building personal portfolios, and improving résumés.",
    url: "https://www.paper-airplanes.org/women-in-tech-wit",
    pastel: "peach",
  },
  {
    org: "Paper Airplanes",
    kind: "causes",
    role: "english tutor",
    dates: "Jan 2024 – Jan 2025",
    note: "Tutored students from conflict-affected countries, including Afghanistan and Syria, through regular online English lessons to support their communication skills and career development.",
    url: "https://www.paper-airplanes.org/english-program",
    pastel: "sky",
  },

  {
    org: "FLIGHT Camp",
    kind: "events",
    role: "mentor",
    dates: "2025",
    note: "Mentored high school students through their projects, providing guidance, feedback, and direction to help them develop their ideas.",
    url: "https://uwaterloo.ca/women-in-computer-science/youth-programs/flight-future-leaders-innovating-go-higher-technology",
    pastel: "lilac",
  },
  {
    org: "Technovation Girls Waterloo",
    kind: "events",
    role: "event coordinator",
    dates: "2025",
    note: "Coordinated student project presentations, managed event timing, and guided high school participants through their showcase.",
    url: "https://uwaterloo.ca/women-in-computer-science/youth-programs/technovation",
    pastel: "blush",
  },
  {
    org: "HawkHacks",
    kind: "events",
    role: "organizer",
    dates: "2024",
    note: "Helped run the three-day event, support hackers, and set up.",
    url: "https://www.linkedin.com/company/hawkhacks/home/",
    pastel: "mint",
  },

  {
    org: "Waterloo Women in Computer Science (WiCS)",
    kind: "communities",
    role: "program volunteer",
    dates: "May – Aug 2025",
    note: "Supported outreach programs and events encouraging high school students to explore technology.",
    url: "https://uwaterloo.ca/women-in-computer-science/",
    pastel: "mint",
  },
  {
    org: "Laurier Computing Society",
    kind: "communities",
    role: "engineer",
    dates: "Jan – May 2024",
    note: "Contributed to student-led initiatives and events within Laurier's computing community.",
    url: "https://www.lauriercs.org/",
    pastel: "gold",
  },
  {
    org: "HawkHacks",
    kind: "communities",
    role: "engineer",
    dates: "Nov 2023 – May 2024",
    note: "Helped design and build the landing page and hacker portal.",
    url: "https://www.linkedin.com/company/hawkhacks/home/",
    pastel: "sky",
  },
  {
    org: "Society of Women Engineers",
    kind: "communities",
    role: "membership coordinator",
    dates: "Jan 2023 – May 2024",
    note: "Conducted interviews and supported membership recruitment to help grow the Society of Women Engineers community.",
    url: "https://swe.org/",
    pastel: "peach",
  },
  {
    org: "Enactus Laurier",
    kind: "causes",
    role: "web developer",
    dates: "Mar – Aug 2022",
    note: "Designed and built a website for the RJ Project to raise awareness of restorative justice education and encourage donations.",
    url: "https://enactus.ca/",
    pastel: "lilac",
  },
];
