import { ArrowUpRight } from 'lucide-react';

const ITEMS = [
  {
    href: '/blog',
    title: 'CAD × Claude Code',
    note: 'A build log: driving Onshape with an AI agent, one part at a time.',
    frame: 'blog',
  },
  {
    href: '/projects/product-management-course',
    title: 'Product management knowledge share',
    note: 'SMART goals, elevator pitches, and influence without authority.',
    frame: 'pm_course',
  },
  {
    href: '/projects/mini-bake-off-summer-2025/polls',
    title: 'Mini Bake Off 2025',
    note: 'A HuCrafts baking competition with live voting.',
    frame: 'bake_off',
  },
];

export default function KnowledgeSharing() {
  return (
    <section id="writing" className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 pb-24">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <h2 className="font-display font-wide text-2xl sm:text-[1.75rem] font-extrabold leading-tight tracking-[-0.025em]">Writing &amp; other things</h2>
        <ul className="border-t border-rule">
          {ITEMS.map((item) => (
            <li key={item.href} className="border-b border-rule">
              <a
                href={item.href}
                className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-5 sm:grid-cols-[minmax(0,20rem)_1fr_auto]"
              >
                <span className="text-lg font-semibold text-ink group-hover:underline decoration-ink decoration-2 underline-offset-[5px]">
                  {item.title}
                </span>
                <span className="col-span-2 row-start-2 text-ink-soft sm:col-span-1 sm:row-start-auto">{item.note}</span>
                <span className="col-start-2 row-start-1 flex items-center gap-2 font-mono text-xs text-ink-mute sm:col-start-auto sm:row-start-auto">
                  /{item.frame}
                  <ArrowUpRight className="h-4 w-4 text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
