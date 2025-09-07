import { redis } from '@/lib/redis';

export type Submission = {
    id: string;        // slug/short id
    title: string;     // display name
    author?: string;   // optional submitter
    image: string;     // /public path or remote
};

export const BAKEOFF_KEYSPACE = 'bakeoff:2025';
export const SUBMISSIONS: Submission[] = [
    { id: 'pea-tarts', title: 'Pea Tarts', author: '啊！ 慢哒！', image: '/images/bakeoff/pea-tarts.jpg' },
    { id: 'hojicha-macaron', title: 'Hojicha Macaron', author: '喵～', image: '/images/bakeoff/hojicha-macaron.jpg' },
    { id: 'dacquoise', title: 'Dacquoise', author: 'Tina', image: '/images/bakeoff/dacquoise.jpg' },
    { id: 'canelé', title: 'Canelé', author: 'Ryan', image: '/images/bakeoff/canele.jpg' },
    { id: 'basque-cake', title: 'Basque Cake', author: 'Mandy', image: '/images/bakeoff/basque-cake.jpg' },
];

export const voteKey = (id: string) => `${BAKEOFF_KEYSPACE}:votes:${id}`;
export const allVoteKeys = SUBMISSIONS.map((s) => voteKey(s.id));

/* Increment a vote count for a submission id */
export async function recordVote(id: string) {
    await redis.incr(voteKey(id));
}

/* Get results as map {id: count} */
export async function getResults(): Promise<Record<string, number>> {
    const counts = await redis.mget<number[]>(...allVoteKeys);
    const out: Record<string, number> = {};
    SUBMISSIONS.forEach((s, i) => {
        out[s.id] = Number(counts?.[i] ?? 0);
    });
    return out;
}
