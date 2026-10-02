import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import Triad from '@/components/frames/Triad';
import type { Project } from '@/types';

// Shared anatomy for every project page: a full-bleed hero, the title block,
// labelled facts (role, scope, timeline…), and a tools list, followed by the
// project's own sections and figures.

export function ProjectHero({
  src,
  alt,
  fit = 'cover',
}: {
  src: string;
  alt: string;
  /** 'contain' keeps labelled drawings whole on the grid ground instead of cropping them. */
  fit?: 'cover' | 'contain';
}) {
  return (
    <div className={`relative h-[44vh] sm:h-[min(72vh,760px)] w-full overflow-hidden ${fit === 'contain' ? 'frame-grid' : 'bg-well'}`}>
      <img
        src={src}
        alt={alt}
        className={`h-full w-full ${fit === 'contain' ? 'object-contain p-6 sm:p-10' : 'object-cover'}`}
      />
      <Triad size={120} draw labels className="absolute bottom-0 left-0 pointer-events-none" />
    </div>
  );
}

export function ProjectTitle({ project, lead, note }: { project: Project; lead: ReactNode; note?: ReactNode }) {
  return (
    <header className="pt-10">
      <Link
        href="/#work"
        className="inline-flex items-center gap-2 text-[15px] text-ink-soft hover:text-ink underline-offset-[5px] decoration-ink decoration-2 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All work
      </Link>
      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h1 className="max-w-[18ch] font-display font-wide font-extrabold text-[clamp(2.5rem,5.6vw,4.75rem)] leading-[0.98] tracking-[-0.035em]">
          {project.title}
        </h1>
        {project.frame && <p className="font-mono text-sm text-ink-mute">/{project.frame}</p>}
      </div>
      <div className="mt-6 max-w-[44rem] text-xl leading-relaxed text-ink-soft">{lead}</div>
      {note && <p className="mt-3 text-[15px] text-ink-mute">{note}</p>}
    </header>
  );
}

export type Fact = { label: string; value: ReactNode };
export type ToolGroup = { area: string; items: string };

export function ProjectFacts({ facts, tools }: { facts: Fact[]; tools?: ToolGroup[] }) {
  return (
    <section aria-label="Project facts" className="mt-14 border-t border-ink">
      <dl className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
        {facts.map((f) => (
          <div key={f.label} className="border-b border-rule py-5">
            <dt className="text-sm text-ink-mute">{f.label}</dt>
            <dd className="mt-2 text-lg font-semibold leading-snug text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
      {tools && tools.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display font-wide text-xl font-bold tracking-[-0.01em]">Tools &amp; skills</h2>
          <dl className="mt-4 divide-y divide-rule border-y border-rule">
            {tools.map((t) => (
              <div key={t.area} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="font-semibold">{t.area}</dt>
                <dd className="text-ink-soft">{t.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-20">
      <h2 className="font-display font-wide text-[1.75rem] sm:text-[2rem] font-extrabold leading-tight tracking-[-0.025em]">
        {title}
      </h2>
      <div className="mt-5 max-w-[68ch] space-y-4 text-[17px] leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}

export function Figure({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string;
  alt: string;
  caption: ReactNode;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="overflow-hidden bg-white ring-1 ring-rule">
        <img src={src} alt={alt} className="w-full object-contain" loading="lazy" />
      </div>
      <figcaption className="mt-3 text-[15px] text-ink-mute">{caption}</figcaption>
    </figure>
  );
}

/** Page shell: the hero runs edge to edge; everything else sits in the reading column. */
export function ProjectBody({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-8 pb-28">{children}</div>;
}
