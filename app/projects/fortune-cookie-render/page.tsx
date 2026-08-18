import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RenderVideo from '@/components/RenderVideo';
import { getProjectBySlug } from '@/lib/projects';

export const metadata = { title: 'Fortune Cookie Render' };

export default function FortuneCookieRender() {
  const project = getProjectBySlug('fortune-cookie-render')!;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 mb-6 group rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" aria-hidden />
          All projects
        </Link>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-1 text-zinc-600">{project.category}</span>
          {project.tags.map((t) => (
            <span key={t} className="inline-flex items-center rounded-full bg-amber-100 text-amber-900 px-2 py-1">{t}</span>
          ))}
        </div>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">{project.title}</h1>
        <p className="mt-3 text-lg text-zinc-600 max-w-prose">{project.blurb}</p>

        <figure className="mt-8">
          <div className="rounded-2xl overflow-hidden bg-zinc-950 shadow-xl ring-1 ring-black/5">
            <RenderVideo
              src="/videos/fortune-cookie-render.mp4"
              poster="/images/proj-fortunecookie.png"
              className="w-full aspect-video object-contain"
            />
          </div>
          <figcaption className="mt-2 text-sm text-zinc-600">
            Render video — autoplays muted; use the controls to pause or replay.
          </figcaption>
        </figure>

        <figure className="mt-10">
          <div className="rounded-2xl overflow-hidden bg-zinc-950 shadow-xl ring-1 ring-black/5">
            <img
              src="/images/proj-fortunecookie.png"
              alt="Photoreal render of a fortune cookie under three-point studio lighting on a warm-lit floor fading to black"
              className="w-full object-cover"
            />
          </div>
          <figcaption className="mt-2 text-sm text-zinc-600">Still frame — three-point lighting against a stylized backdrop.</figcaption>
        </figure>
      </main>
      <Footer />
    </div>
  );
}
