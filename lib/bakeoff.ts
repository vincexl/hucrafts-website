import { redis } from "@/lib/redis";

export type PollCategory =
  | "best-flavor"
  | "best-design"
  | "most-inventive"
  | "gourmets-choice";

export const POLL_META: Record<PollCategory, { title: string; blurb: string }> = {
  "best-flavor": { title: "Best Flavor", blurb: "Which entry tastes the best?" },
  "best-design": { title: "Best Design", blurb: "Prettiest plating and visuals." },
  "most-inventive": { title: "Most Inventive", blurb: "Most inventive concept & technique." },
  "gourmets-choice": { title: "Gourmet's Choice", blurb: "Best choice of bakery pastries." },
};

export type Submission = {
  id: string;
  title: string;
  author?: string;
  image: string;
};

export const SUBMISSIONS_BY_CAT: Record<PollCategory, Submission[]> = {
  "best-flavor": [
    { id: 'pea-tarts', title: 'Pea Tarts', author: '啊！ 慢哒！', image: '/images/bakeoff/pea-tarts.jpg' },
    { id: 'hojicha-macaron', title: 'Hojicha Macaron', author: '喵～', image: '/images/bakeoff/hojicha-macaron.jpg' },
    { id: 'mushroom-ham-tart', title: 'Mushroom & Ham Tart', author: 'Hugh', image: '/images/bakeoff/mushroom-ham-tart.png' },
    { id: 'apple-crumble-pie', title: 'Apple Crumble Pie', author: 'Bianca + Alex', image: '/images/bakeoff/apple-crumble-pie.jpg' },

  ],
  "best-design": [
    { id: 'pea-tarts', title: 'Pea Tarts', author: '啊！ 慢哒！', image: '/images/bakeoff/pea-tarts.jpg' },
    { id: 'hojicha-macaron', title: 'Hojicha Macaron', author: '喵～', image: '/images/bakeoff/hojicha-macaron.jpg' },
    { id: 'mushroom-ham-tart', title: 'Mushroom & Ham Tart', author: 'Hugh', image: '/images/bakeoff/mushroom-ham-tart.png' },
    { id: 'apple-crumble-pie', title: 'Apple Crumble Pie', author: 'Bianca + Alex', image: '/images/bakeoff/apple-crumble-pie.jpg' },
  ],
  "most-inventive": [
    { id: 'pea-tarts', title: 'Pea Tarts', author: '啊！ 慢哒！', image: '/images/bakeoff/pea-tarts.jpg' },
    { id: 'hojicha-macaron', title: 'Hojicha Macaron', author: '喵～', image: '/images/bakeoff/hojicha-macaron.jpg' },
    { id: 'mushroom-ham-tart', title: 'Mushroom & Ham Tart', author: 'Hugh', image: '/images/bakeoff/mushroom-ham-tart.png' },
    { id: 'apple-crumble-pie', title: 'Apple Crumble Pie', author: 'Bianca + Alex', image: '/images/bakeoff/apple-crumble-pie.jpg' },
  ],
  "gourmets-choice": [
    { id: 'dacquoise', title: 'Dacquoise', author: 'Tina', image: '/images/bakeoff/dacquoise.jpeg' },
    { id: 'egg-tart', title: 'Egg Tart', author: 'Ryan', image: '/images/bakeoff/egg-tart.jpg' },
    { id: 'tiramisu', title: 'Tiramisu', author: 'Mandy', image: '/images/bakeoff/tiramisu.jpg' },
  ],
};

export function assertCat(cat: string): asserts cat is PollCategory {
  if (!Object.hasOwn(SUBMISSIONS_BY_CAT, cat)) {
    throw new Error("invalid_category");
  }
}

const KS = "bakeoff:2025";
export const voteKey = (cat: PollCategory, id: string) => `${KS}:${cat}:votes:${id}`;

export async function recordVote(cat: PollCategory, id: string) {
  await redis.incr(voteKey(cat, id));
}

export async function getResults(cat: PollCategory): Promise<Record<string, number>> {
  const subs = SUBMISSIONS_BY_CAT[cat];
  const keys = subs.map((s) => voteKey(cat, s.id));
  const counts = await redis.mget<number[]>(...keys);
  const out: Record<string, number> = {};
  subs.forEach((s, i) => (out[s.id] = Number(counts?.[i] ?? 0)));
  return out;
}
