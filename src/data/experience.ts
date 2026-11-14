import type { Pastel } from "@/data/projects";

export type Experience = {
  company: string;
  url: string;
  role: string;
  dates: string;
  pastel: Pastel;
  /** Shown under the cards while this one is hovered or focused. */
  hover: string;
};

// Most recent first; Klick Health was the first internship.
export const experience: Experience[] = [
  {
    company: "VeriFast", url: "https://verifast.com/", role: "Engineer Intern", dates: "2026", pastel: "sky",
    hover: "built an AI-powered market intelligence platform from scratch, helping teams find new prospects and leads faster",
  },
  {
    company: "Ingenico", url: "https://ingenico.com/en", role: "SWE Intern", dates: "2024", pastel: "blush",
    hover: "built an automated testing lab for payment devices, because testing everything manually is no fun",
  },
  {
    company: "Fidelity", url: "https://www.fidelity.ca/en/", role: "Automation Intern", dates: "2024", pastel: "mint",
    hover: "automated financial workflows and reporting, saving 1,250 hours of manual work a year",
  },
  {
    company: "AutoTrader", url: "https://www.autotrader.ca/", role: "Automation Intern", dates: "2023", pastel: "lilac",
    hover: "built data pipelines to track car prices and inventory across dealerships",
  },
  {
    company: "MLH ", url: "https://www.mlh.com/", role: "SRE Fellow", dates: "2023", pastel: "gold",
    hover: "learned how to keep systems running and debug things when they don't",
  },
  {
    company: "Klick", url: "https://www.klick.com/", role: "Web Dev Intern", dates: "2022", pastel: "peach",
    hover: "made healthcare websites more accessible and easier to use",
  },
];
