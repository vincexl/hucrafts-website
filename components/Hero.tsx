import Triad from '@/components/frames/Triad';
import { RESUME_HREF } from '@/lib/site';

// Set to the portrait's public path (e.g. '/images/portrait.jpg') once it exists.
const PORTRAIT_SRC: string | null = null;

export default function Hero() {
  return (
    <section id="home" className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 pt-8 sm:pt-10 pb-16 lg:pb-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16 items-center">
        <figure className="relative">
          <div className="relative aspect-[5/4] lg:aspect-[4/5] lg:max-h-[64vh] w-full overflow-hidden frame-grid">
            {PORTRAIT_SRC ? (
              <img
                src={PORTRAIT_SRC}
                alt="Vincent Hu"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
                <span className="font-display font-wide font-black text-[clamp(7rem,22vw,16rem)] leading-none tracking-[-0.04em] text-ink/[0.07]">
                  VH
                </span>
              </div>
            )}
            <span className="absolute left-4 top-4 font-mono text-xs text-ink-soft bg-paper/85 px-2 py-1">
              frame: vincent
            </span>
          </div>
          {/* The frame's origin sits on the portrait's bottom-left corner. */}
          <Triad size={132} draw labels className="absolute -bottom-[6px] -left-[6px] pointer-events-none" />
        </figure>

        <div className="lg:pl-4">
          <h1 className="font-display font-wide font-extrabold text-[clamp(3rem,7.4vw,6rem)] leading-[0.95] tracking-[-0.035em]">
            Hi, I&rsquo;m Vincent.
          </h1>
          <p className="mt-6 text-xl sm:text-2xl font-semibold text-ink">
            Automation, Controls &amp; Robotics Engineer
          </p>
          <p className="mt-5 max-w-[34rem] text-lg leading-relaxed text-ink-soft">
            I build machines that run on their own: PLC-controlled motion systems, lab automation workcells, and
            the software around them. Six-plus years at Mainspring Energy, Myriad Genetics, and Kinnos, and now an
            M.S. in Robotics at Johns Hopkins.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex h-12 items-center bg-ink px-6 text-[15px] font-semibold text-paper hover:bg-ink-soft transition-colors"
            >
              See the work
            </a>
            <a
              href={RESUME_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center border border-ink px-6 text-[15px] font-semibold text-ink hover:bg-ink hover:text-paper transition-colors"
            >
              Resume (PDF)
            </a>
          </div>
          <p className="mt-10 font-mono text-xs text-ink-mute">
            parent: world · San Francisco · 37.77° N, 122.42° W
          </p>
        </div>
      </div>
    </section>
  );
}
