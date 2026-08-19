import Link from 'next/link';
import { ArrowRight, Youtube } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getAllPosts, SERIES_BLURBS, formatPostDate } from '@/lib/blog';

export const metadata = {
    title: 'Blog',
    description: 'Writing and videos on CAD, automation, and Claude Code workflows.',
};

export default function BlogIndex() {
    const posts = getAllPosts();

    // Group series posts together (ordered by part), keep standalone posts separate.
    const seriesNames = [...new Set(posts.filter((p) => p.series).map((p) => p.series as string))];
    const standalone = posts.filter((p) => !p.series);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Blog</h1>
                <p className="mt-3 text-lg text-zinc-600">
                    Writing and videos from the workshop — CAD, automation, and what happens when you point Claude Code at engineering work.
                </p>

                {posts.length === 0 && (
                    <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-8 text-center">
                        <p className="font-medium">First posts are on the way.</p>
                        <p className="mt-1 text-sm text-zinc-600">Check back soon, or say hello in the meantime.</p>
                    </div>
                )}

                {seriesNames.map((name) => {
                    const episodes = posts
                        .filter((p) => p.series === name)
                        .sort((a, b) => (a.part ?? 0) - (b.part ?? 0));
                    return (
                        <section key={name} className="mt-12">
                            <div className="flex items-center gap-2">
                                <Youtube className="h-5 w-5 text-amber-600" aria-hidden />
                                <h2 className="text-xl font-bold tracking-tight">{name}</h2>
                            </div>
                            {SERIES_BLURBS[name] && (
                                <p className="mt-2 text-zinc-600 max-w-prose">{SERIES_BLURBS[name]}</p>
                            )}
                            <ol className="mt-6 space-y-3">
                                {episodes.map((p) => (
                                    <li key={p.slug}>
                                        <Link
                                            href={`/blog/${p.slug}`}
                                            className="group flex items-baseline gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                                        >
                                            {p.part !== undefined && (
                                                <span className="text-2xl font-extrabold tabular-nums text-amber-500 shrink-0" aria-label={`Part ${p.part}`}>
                                                    {String(p.part).padStart(2, '0')}
                                                </span>
                                            )}
                                            <span className="flex-1 min-w-0">
                                                <span className="block font-semibold tracking-tight group-hover:text-amber-700 transition-colors">
                                                    {p.title}
                                                </span>
                                                <span className="mt-1 block text-sm text-zinc-600">{p.description}</span>
                                                <span className="mt-2 block text-xs text-zinc-500">
                                                    {formatPostDate(p.date)} · {p.readingMinutes} min read
                                                </span>
                                            </span>
                                            <ArrowRight
                                                className="h-4 w-4 shrink-0 self-center text-zinc-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition"
                                                aria-hidden
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ol>
                        </section>
                    );
                })}

                {standalone.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-xl font-bold tracking-tight">Posts</h2>
                        <ul className="mt-6 space-y-3">
                            {standalone.map((p) => (
                                <li key={p.slug}>
                                    <Link
                                        href={`/blog/${p.slug}`}
                                        className="group block rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                                    >
                                        <span className="block font-semibold tracking-tight group-hover:text-amber-700 transition-colors">{p.title}</span>
                                        <span className="mt-1 block text-sm text-zinc-600">{p.description}</span>
                                        <span className="mt-2 block text-xs text-zinc-500">
                                            {formatPostDate(p.date)} · {p.readingMinutes} min read
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
}
