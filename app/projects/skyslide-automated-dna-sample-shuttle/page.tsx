import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RenderVideo from '@/components/RenderVideo';
import { getProjectBySlug } from '@/lib/projects';

export const metadata = { title: 'SkySlide — Automated DNA Sample Shuttle' };

export default function SkySlide() {
  const project = getProjectBySlug('skyslide-automated-dna-sample-shuttle')!;

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
              src="/videos/skyslide-demo.mp4"
              poster="/images/skyslide-poster.jpg"
              className="w-full aspect-video object-contain"
            />
          </div>
          <figcaption className="mt-2 text-sm text-zinc-600">
            Riding along with a sample plate: up the vertical lift, then across the lab on the overhead shuttle.
            Autoplays muted; unmute for sound.
          </figcaption>
        </figure>

        <div className="mt-10 space-y-4 text-zinc-700 max-w-prose">
          <p>
            SkySlide moves DNA sample plates between laboratories without anyone carrying them. A vertical lift
            raises each plate to an overhead shuttle that runs above the lab floor and delivers it to the next
            workcell.
          </p>
          <p>
            I architected the system end to end: mechanical design, PLC motion control, power distribution,
            optical sensing, and the site infrastructure it runs through. SkySlide raised automation usage from 34% to
            80%.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
