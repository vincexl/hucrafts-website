import { redis } from '@/lib/redis';

export type Submission = {
    id: string;        // slug/short id
    title: string;     // display name
    author?: string;   // optional submitter
    image: string;     // /public path or remote
};

export const BAKEOFF_KEYSPACE = 'bakeoff:2025';
export const SUBMISSIONS: Submission[] = [
    { id: 'pea-tarts', title: 'Pea Tarts', author: 'Ava', image: '/images/bakeoff/pea-tarts.jpg' },
    { id: 'hojicha-macaron', title: 'Hojicha Macaron', author: 'Ken', image: '/images/bakeoff/hojicha-macaron.jpg' },
    { id: 'miso-caramel-brownie', title: 'Miso Caramel Brownie', author: 'Mei', image: '/images/bakeoff/miso-brownie.jpg' },
    { id: 'black-sesame-macaron', title: 'Black Sesame Macaron', author: 'Ray', image: '/images/bakeoff/sesame-macaron.jpg' },
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
