"use client";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

  const [votedFor, setVotedFor] = useState<string | null>(null);
  useEffect(() => {
    if (!(cat in SUBMISSIONS_BY_CAT)) return;
    const saved = localStorage.getItem(`bakeoff-vote-${cat}`);
    if (saved) setVotedFor(saved);
  }, [cat]);

  const validCat = cat in SUBMISSIONS_BY_CAT;
  const { data: results, error, mutate } = useSWR<Record<string, number>>(
    validCat ? `/api/bakeoff/${cat}/results` : null,
    fetcher,
    { refreshInterval: 1500, revalidateOnFocus: true }
  );

  const total = useMemo(() => (results ? Object.values(results).reduce((a, b) => a + b, 0) : 0), [results]);

  if (!validCat) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <p>Invalid category.</p>
        <Link href="/projects/mini-bake-off-summer-2025/polls" className="mt-2 inline-block text-sm font-medium hover:text-amber-600">
          Back to polls
        </Link>
      </div>
    );
  }

  const subs = SUBMISSIONS_BY_CAT[cat];
  const meta = POLL_META[cat];

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <Link
          href="/projects/mini-bake-off-summer-2025/polls"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 mb-6 group rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" aria-hidden />
          All categories
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{meta.title}</h1>
        <p className="mt-2 text-zinc-600">{meta.blurb}</p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subs.map((s) => {
            const isChoice = votedFor === s.id;
            return (
              <div
                key={s.id}
                className={`rounded-2xl border bg-white overflow-hidden shadow-sm transition-shadow ${
                  isChoice ? "border-amber-400 ring-2 ring-amber-300" : "border-zinc-200"
                }`}
              >
                <div className="relative aspect-[4/3] bg-zinc-100">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="font-semibold tracking-tight">{s.title}</div>
                  {s.author && <div className="text-sm text-zinc-600">by {s.author}</div>}
                  <button
                    disabled={!!votedFor}
                    onClick={() => vote(s.id)}
                    className={`mt-3 w-full rounded-xl px-4 py-2 text-sm font-medium border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ${
                      votedFor
                        ? isChoice
                          ? "bg-amber-100 text-amber-900 border-amber-300 cursor-default"
                          : "bg-zinc-100 text-zinc-500 border-zinc-200 cursor-not-allowed"
                        : "bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-700"
                    }`}
                  >
                    {votedFor ? (isChoice ? "Thanks for voting!" : "Vote cast") : "Vote"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Live Results</h2>
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
                      <span className="tabular-nums text-zinc-600">{count} ({pct}%)</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-zinc-200 overflow-hidden">
                      <div className="h-full rounded-full bg-amber-400 transition-[width] duration-500 ease-out" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
              <div className="text-sm text-zinc-600 pt-2">Total votes: {total}</div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
