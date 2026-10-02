import Triad from '@/components/frames/Triad';
import type { Project } from '@/types';

// Finished projects lead; pending ones sit at the end as open frames.
function order(projects: Project[]) {
  return [...projects].sort((a, b) => Number(!!a.pending) - Number(!!b.pending));
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {order(projects).map((p) => (
        <li key={p.id}>{p.pending ? <PendingTile p={p} /> : <ProjectTile p={p} />}</li>
      ))}
    </ul>
  );
}

function TileCaption({ p }: { p: Project }) {
  return (
    <div className="mt-3 flex items-baseline justify-between gap-4">
      <h3 className="text-[17px] font-semibold leading-snug text-ink">{p.title}</h3>
      {p.frame && <span className="shrink-0 font-mono text-xs text-ink-mute">/{p.frame}</span>}
    </div>
  );
}

function ProjectTile({ p }: { p: Project }) {
  return (
    <a href={p.link} className="group block focus-visible:outline-none">
      <div className="relative aspect-[4/3] overflow-hidden bg-well group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-axis-z">
        <img
          src={p.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {/* Hover: a band rises over the lower edge with the summary, leaving the machine in view. */}
        <div className="absolute inset-x-0 bottom-0 bg-ink/90 py-4 pl-28 pr-5 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none">
          <p className="text-[15px] leading-snug text-white">{p.blurb}</p>
          <p className="mt-2 text-[13px] text-white/75">{p.tags.join(' · ')}</p>
        </div>
        {/* Every tile owns a frame at rest; it grows from its origin on hover or focus. */}
        <div className="absolute bottom-0 left-0 origin-bottom-left scale-[0.42] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-focus-visible:scale-100 motion-reduce:transition-none">
          <Triad size={84} strokeWidth={3} labels className="[&_.triad-label]:opacity-0 [&_.triad-label]:transition-opacity group-hover:[&_.triad-label]:opacity-100 group-focus-visible:[&_.triad-label]:opacity-100" />
        </div>
      </div>
      <TileCaption p={p} />
    </a>
  );
}

function PendingTile({ p }: { p: Project }) {
  return (
    <div>
      <div className="relative aspect-[4/3] frame-grid">
        <div className="absolute bottom-0 left-0">
          <Triad size={56} strokeWidth={2} />
        </div>
        <p className="absolute inset-0 flex items-center justify-center text-sm text-ink-mute">
          write-up in progress
        </p>
      </div>
      <TileCaption p={p} />
    </div>
  );
}
