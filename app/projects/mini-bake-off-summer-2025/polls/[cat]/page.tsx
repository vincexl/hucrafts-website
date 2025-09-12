"use client";
import Image from "next/image";
import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import { POLL_META, SUBMISSIONS_BY_CAT, type PollCategory } from "@/lib/bakeoff";
import { useParams } from "next/navigation";

const fetcher = async (url: string) => {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
};

export default function PollCategoryPage() {
  const params = useParams<{ cat: PollCategory }>();
  const cat = params.cat;

  if (!(cat in SUBMISSIONS_BY_CAT)) {
    return <div className="p-8">Invalid category.</div>;
  }

  const subs = SUBMISSIONS_BY_CAT[cat];
  const meta = POLL_META[cat];

  const [votedFor, setVotedFor] = useState<string | null>(null);
  useEffect(() => {
    const saved = localStorage.getItem(`bakeoff-vote-${cat}`);
    if (saved) setVotedFor(saved);
  }, [cat]);

  const { data: results, error, mutate } = useSWR<Record<string, number>>(
    `/api/bakeoff/${cat}/results`,
    fetcher,
    { refreshInterval: 1500, revalidateOnFocus: true }
  );

  const total = useMemo(() => (results ? Object.values(results).reduce((a, b) => a + b, 0) : 0), [results]);

  async function vote(id: string) {
    if (votedFor) return;
    await fetch(`/api/bakeoff/${cat}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    localStorage.setItem(`bakeoff-vote-${cat}`, id);
    setVotedFor(id);
    mutate();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight">{meta.title}</h1>
      <p className="mt-2 text-zinc-600">{meta.blurb}</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subs.map((s) => (
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
                  ${votedFor ? "bg-zinc-100 text-zinc-500 border-zinc-200 cursor-not-allowed"
                              : "bg-black text-white border-black hover:bg-zinc-800"}`}
              >
                {votedFor ? (votedFor === s.id ? "Thanks for voting!" : "Vote disabled") : "Vote"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold">Live Results</h2>
        {!results && !error && <p className="text-zinc-600 mt-2">Loading…</p>}
        {error && <p className="text-red-600 mt-2 text-sm">Could not load results: {String(error.message || error)}</p>}
        {results && (
          <div className="mt-4 space-y-3">
            {subs.map((s) => {
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
