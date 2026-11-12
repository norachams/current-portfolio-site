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
  { company: "VeriFast", url: "https://verifast.com/", role: "Engineer Intern", dates: "2026", pastel: "sky" },
  { company: "Ingenico", url: "https://ingenico.com/en", role: "SWE Intern", dates: "2024", pastel: "blush" },
  { company: "Fidelity", url: "https://www.fidelity.ca/en/", role: "Automation Intern", dates: "2024", pastel: "mint" },
  { company: "AutoTrader", url: "https://www.autotrader.ca/", role: "Automation Intern", dates: "2023", pastel: "lilac" },
  { company: "MLH ", url: "https://www.mlh.com/", role: "SRE Fellow", dates: "2023", pastel: "gold" },
  { company: "Klick", url: "https://www.klick.com/", role: "Web Dev Intern", dates: "2022", pastel: "peach" },
];
