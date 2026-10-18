import type { Pastel } from "@/data/projects";

export type Experience = {
  company: string;
  role: string;
  dates: string;
  pastel: Pastel;
};

// Most recent first; Klick Health was the first internship. Brackets still need filling in.
export const experience: Experience[] = [
  { company: "VeriFast", role: "Sofrware Engineer Intern", dates: "2026", pastel: "mint" },
  { company: "Ingenico", role: "Sofrware Engineer Intern", dates: "2024", pastel: "gold" },
  { company: "Fidelity", role: "Automation Developer Intern", dates: "2024", pastel: "lilac" },
  { company: "AutoTrader", role: "Data Automation Developer Intern", dates: "2023", pastel: "peach" },
  { company: "MLH Fellowship", role: "Site Reliability Engineer Fellow", dates: "2023", pastel: "blush" },
  { company: "Klick Health", role: "Web Developer Intern", dates: "2021", pastel: "sky" },
];
