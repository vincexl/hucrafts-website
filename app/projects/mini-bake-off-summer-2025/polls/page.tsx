import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { POLL_META } from "@/lib/bakeoff";

export const metadata = { title: "Mini Bake Off 2025 — Polls" };

export default function PollsHub() {
  const entries = Object.entries(POLL_META) as [keyof typeof POLL_META, (typeof POLL_META)[keyof typeof POLL_META]][];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Mini Bake Off 2025 — Polls</h1>
        <p className="mt-2 text-zinc-600">Pick a category to vote and see live results.</p>
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          {entries.map(([cat, meta]) => (
            <Link
              key={cat}
              href={`/projects/mini-bake-off-summer-2025/polls/${cat}`}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-xl font-semibold tracking-tight">{meta.title}</span>
                <ArrowRight className="h-5 w-5 text-zinc-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" aria-hidden />
              </div>
              <div className="text-sm text-zinc-600 mt-1">{meta.blurb}</div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
