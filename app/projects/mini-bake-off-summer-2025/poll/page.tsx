'use client';
import useSWR from 'swr';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SUBMISSIONS, type Submission } from '@/lib/bakeoff';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function BakeoffPollPage() {
  const [votedFor, setVotedFor] = useState<string | null>(null);
  const { data: results, mutate } = useSWR<Record<string, number>>('/api/bakeoff/results', fetcher, {
    refreshInterval: 1500, // “real-time” poll updates
  });

  useEffect(() => {
    const saved = localStorage.getItem('bakeoff-vote-2025');
    if (saved) setVotedFor(saved);
  }, []);

  const total = useMemo(() => {
    if (!results) return 0;
    return Object.values(results).reduce((a, b) => a + b, 0);
  }, [results]);

  const vote = useCallback(async (id: string) => {
    if (votedFor) return; // client lock after first vote
    await fetch('/api/bakeoff/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    localStorage.setItem('bakeoff-vote-2025', id);
    setVotedFor(id);
    mutate(); // refresh results immediately
  }, [votedFor, mutate]);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Mini Bake Off 2025 — Vote</h1>
      <p className="mt-2 text-zinc-600">Pick your favorite! One vote per browser. Results update live.</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SUBMISSIONS.map((s) => (
          <div key={s.id} className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
            <div className="relative aspect-[4/3]">
              <Image src={s.image} alt={s.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <div className="font-semibold">{s.title}</div>
              {s.author && <div className="text-sm text-zinc-600">by {s.author}</div>}
              <button
                disabled={!!votedFor}
                onClick={() => vote(s.id)}
                className={`mt-3 w-full rounded-xl px-4 py-2 text-sm font-medium border
                  ${votedFor ? 'bg-zinc-100 text-zinc-500 border-zinc-200 cursor-not-allowed'
                             : 'bg-black text-white border-black hover:bg-zinc-800'}`}
              >
                {votedFor ? (votedFor === s.id ? 'Thanks for voting!' : 'Vote disabled') : 'Vote'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Live Results */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold">Live Results</h2>
        {!results ? (
          <p className="text-zinc-600 mt-2">Loading…</p>
        ) : (
          <div className="mt-4 space-y-3">
            {SUBMISSIONS.map((s) => {
              const count = results[s.id] ?? 0;
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={s.id}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{s.title}</span>
                    <span className="tabular-nums">{count} ({pct}%)</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-zinc-200 overflow-hidden">
                    <div className="h-full bg-amber-400" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
            <div className="text-sm text-zinc-600 pt-2">Total votes: {total}</div>
          </div>
        )}
      </div>
    </div>
  );
}
