import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RenderVideo from '@/components/RenderVideo';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { getAllPosts, getPost, formatPostDate } from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
    return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const post = getPost(params.slug);
    if (!post) return {};
    return { title: post.title, description: post.description };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = getPost(params.slug);
    if (!post) notFound();

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 mb-8 group rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" aria-hidden />
                    All posts
                </Link>

                <article>
                    <header>
                        {post.series && (
                            <p className="text-sm font-medium text-amber-700">
                                {post.series}
                                {post.part !== undefined && <span className="text-zinc-500"> · Part {post.part}</span>}
                            </p>
                        )}
                        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">{post.title}</h1>
                        <p className="mt-3 text-sm text-zinc-500">
                            <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingMinutes} min read
                        </p>
                    </header>

                    {post.youtube && (
                        <div className="mt-8">
                            <YouTubeEmbed id={post.youtube} title={post.title} />
                        </div>
                    )}
                    {!post.youtube && post.video && (
                        <div className="mt-8 rounded-2xl overflow-hidden bg-zinc-950 shadow-xl ring-1 ring-black/5">
                            <RenderVideo src={post.video} className="w-full aspect-video object-contain" />
                        </div>
                    )}

                    <div
                        className="post-body mt-8"
                        // Content is authored locally in content/blog/*.md
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                </article>
            </main>
            <Footer />
        </div>
    );
}
