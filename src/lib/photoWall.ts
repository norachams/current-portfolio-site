import type { Shot } from "@/data/photography";

/** Indices into the photos array, one list per column, top to bottom. */
export type Wall = number[][];

// The gap between photos, relative to a column width of 1 (16px on a ~340px column).
const GAP = 0.05;
const SEARCH_STEPS = 150_000;
// How much uneven column bottoms count against a layout, relative to one pair of
// same-country photos touching. High enough that the bottoms end up (almost) level.
const SPREAD_WEIGHT = 8;

// Keyed by the photos, the featured list and the column count, so changing any of them re-runs the layout.
const cache = new Map<string, Wall>();

/**
 * Lays photos out into masonry columns (each photo goes in the shortest column) and
 * searches for an order where photos from the same country don't touch, stacked or
 * side by side, and where all the columns end at nearly the same height. Spain is
 * nearly half the photos, so a handful of touches can be left over.
 *
 * The search is simulated annealing: swap two photos, keep the swap if the layout
 * got better, and early on sometimes keep a worse one too so it doesn't get stuck.
 *
 * Takes a couple of seconds, so it runs on the server at build time, never in the
 * browser. Seeded, so the result is the same on every build.
 */
export function arrangeWall(shots: Shot[], columnCount: number, featured: number[] = []): Wall {
  const key = [columnCount, featured.join(","), shots.map((s) => s.image.src).join(",")].join("|");
  const cached = cache.get(key);
  if (cached) return cached;

  const heights = shots.map((s) => s.image.height / s.image.width + GAP);
  const countries = shots.map((s) => s.country);
  // Featured photos stay first, in their given order; only the rest get moved around.
  const rest = shots.map((_, i) => i).filter((i) => !featured.includes(i));
  const random = seededRandom(7);

  const cost = () => {
    const columns = layout([...featured, ...rest], heights, columnCount);
    return touches(columns, countries) + SPREAD_WEIGHT * spread(columns);
  };

  let current = cost();
  let best = current;
  let bestOrder = [...rest];
  for (let step = 0; step < SEARCH_STEPS; step++) {
    // Cools from accepting the odd worse swap to only accepting improvements.
    const temperature = 1.5 * Math.pow(0.005 / 1.5, step / SEARCH_STEPS);
    const i = Math.floor(random() * rest.length);
    const j = Math.floor(random() * rest.length);
    [rest[i], rest[j]] = [rest[j], rest[i]];
    const next = cost();
    if (next <= current || random() < Math.exp((current - next) / temperature)) {
      current = next;
      if (current < best) {
        best = current;
        bestOrder = [...rest];
      }
    } else {
      [rest[i], rest[j]] = [rest[j], rest[i]];
    }
  }

  const wall = layout([...featured, ...bestOrder], heights, columnCount).map((column) => column.map((p) => p.index));
  cache.set(key, wall);
  return wall;
}

type Placed = { index: number; top: number; bottom: number };

function layout(order: number[], heights: number[], columnCount: number) {
  const columns: Placed[][] = Array.from({ length: columnCount }, () => []);
  const columnHeights = Array<number>(columnCount).fill(0);
  for (const index of order) {
    const c = columnHeights.indexOf(Math.min(...columnHeights));
    const top = columnHeights[c];
    columns[c].push({ index, top, bottom: top + heights[index] });
    columnHeights[c] = top + heights[index];
  }
  return columns;
}

/** Same-country pairs that touch: stacked in a column, or overlapping across neighbouring columns. */
function touches(columns: Placed[][], countries: string[]) {
  let count = 0;
  columns.forEach((column, c) => {
    column.forEach((p, i) => {
      if (i > 0 && countries[column[i - 1].index] === countries[p.index]) count++;
      for (const q of columns[c + 1] ?? []) {
        const overlap = q.top < p.bottom - GAP && q.bottom - GAP > p.top;
        if (overlap && countries[q.index] === countries[p.index]) count++;
      }
    });
  });
  return count;
}

/** How far apart the column bottoms are. */
function spread(columns: Placed[][]) {
  const bottoms = columns.map((column) => column.at(-1)?.bottom ?? 0);
  return Math.max(...bottoms) - Math.min(...bottoms);
}

function seededRandom(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
}
