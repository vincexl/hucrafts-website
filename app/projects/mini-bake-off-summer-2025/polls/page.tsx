import Link from "next/link";
import { POLL_META } from "@/lib/bakeoff";

export default function PollsHub() {
  const entries = Object.entries(POLL_META) as [keyof typeof POLL_META, (typeof POLL_META)[keyof typeof POLL_META]][];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Mini Bake Off 2025 — Polls</h1>
      <p className="mt-2 text-zinc-600">Pick a category to vote and see live results.</p>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {entries.map(([cat, meta]) => (
          <Link
            key={cat}
            href={`/projects/mini-bake-off-summer-2025/polls/${cat}`}
            className="rounded-2xl border border-zinc-200 bg-white p-6 hover:shadow-md transition block"
          >
            <div className="text-xl font-semibold">{meta.title}</div>
            <div className="text-sm text-zinc-600 mt-1">{meta.blurb}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
