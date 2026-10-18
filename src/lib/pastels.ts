import type { Pastel } from "@/data/projects";

// Full class names so Tailwind picks them up. In dark mode the tints go to full
// pastel so on-pastel text stays readable.

/** Full pastel fill: media blocks, notes. */
export const pastelBg: Record<Pastel, string> = {
  mint: "bg-mint",
  celadon: "bg-celadon",
  gold: "bg-gold",
  sky: "bg-sky",
  lilac: "bg-lilac",
  peach: "bg-peach",
  blush: "bg-blush",
};

/** ~45% tint: chips, selected tabs, ticket stubs. */
export const pastelSoft: Record<Pastel, string> = {
  mint: "bg-mint/40 dark:bg-mint",
  celadon: "bg-celadon/40 dark:bg-celadon",
  gold: "bg-gold/40 dark:bg-gold",
  sky: "bg-sky/50 dark:bg-sky",
  lilac: "bg-lilac/45 dark:bg-lilac",
  peach: "bg-peach/45 dark:bg-peach",
  blush: "bg-blush/50 dark:bg-blush",
};

/** ~70% tint: stamps, avatars. */
export const pastelMid: Record<Pastel, string> = {
  mint: "bg-mint/60 dark:bg-mint",
  celadon: "bg-celadon/70 dark:bg-celadon",
  gold: "bg-gold/60 dark:bg-gold",
  sky: "bg-sky/70 dark:bg-sky",
  lilac: "bg-lilac/70 dark:bg-lilac",
  peach: "bg-peach/70 dark:bg-peach",
  blush: "bg-blush/70 dark:bg-blush",
};
