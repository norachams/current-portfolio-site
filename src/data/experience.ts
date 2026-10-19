import type { Pastel } from "@/data/projects";

export type Experience = {
  company: string;
  url: string;
  role: string;
  dates: string;
  pastel: Pastel;
};

// Most recent first; Klick Health was the first internship.
export const experience: Experience[] = [
  { company: "VeriFast", url: "https://verifast.com/", role: "Software Engineer Intern", dates: "2026", pastel: "mint" },
  { company: "Ingenico", url: "https://ingenico.com/en", role: "Software Engineer Intern", dates: "2024", pastel: "gold" },
  { company: "Fidelity", url: "https://www.fidelity.ca/en/", role: "Automation Developer Intern", dates: "2024", pastel: "lilac" },
  { company: "AutoTrader", url: "https://www.autotrader.ca/", role: "Automation Developer Intern", dates: "2023", pastel: "peach" },
  { company: "MLH Fellowship", url: "https://www.mlh.com/", role: "Site Reliability Engineer Fellow", dates: "2023", pastel: "blush" },
  { company: "Klick Health", url: "https://www.klick.com/", role: "Web Developer Intern", dates: "2021", pastel: "sky" },
];
