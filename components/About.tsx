import { RESUME_HREF } from '@/lib/site';

const SKILLS = [
  { area: 'Controls & HMI', items: 'TwinCAT 3, IEC 61131-3 Structured Text, Ignition Vision, OPC UA, ADS, EtherCAT, Modbus TCP' },
  { area: 'Robotics & simulation', items: 'ROS 2, RViz, Gazebo, CoppeliaSim, motion control, state machines' },
  { area: 'Mechanical & PLM', items: 'SOLIDWORKS, Onshape, GD&T, DFM/DFA, electromechanical design, Arena PLM' },
  { area: 'Programming & data', items: 'Python, FastAPI, NumPy, Pandas, C#, Django, REST APIs, Git' },
];

const EDUCATION = [
  { school: 'Johns Hopkins University', degree: 'M.S. Robotics & Autonomous Systems', years: '2024 – present' },
  { school: 'The Cooper Union', degree: 'B.E. Mechanical Engineering', years: '2016 – 2020' },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-24 border-t border-rule">
      <div className="grid gap-12 lg:grid-cols-[14rem_1fr]">
        <h2 className="font-display font-wide text-2xl sm:text-[1.75rem] font-extrabold leading-tight tracking-[-0.025em]">About</h2>
        <div>
          <p className="max-w-[44rem] text-2xl sm:text-[1.75rem] leading-snug font-medium text-ink">
            I&rsquo;m a mechanical engineer who crossed into controls and kept going. I design the hardware, write the
            PLC code that moves it, and build the software people use to run it, so a machine can be trusted to work
            unattended.
          </p>
          <p className="mt-6 max-w-[44rem] text-lg leading-relaxed text-ink-soft">
            HuCrafts is the name I build under. Besides engineering, it covers the events I host and the notes I share
            on product management.
          </p>

          <div className="mt-14 grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-ink-mute">Education</h3>
              <ul className="mt-4 divide-y divide-rule border-y border-rule">
                {EDUCATION.map((e) => (
                  <li key={e.school} className="py-4">
                    <p className="font-semibold">{e.school}</p>
                    <p className="mt-1 flex justify-between gap-4 text-ink-soft">
                      <span>{e.degree}</span>
                      <span className="shrink-0 text-sm tabular-nums">{e.years}</span>
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-ink-soft">
                Certified SOLIDWORKS Expert (CSWE). Fluent in English and Mandarin.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink-mute">Tools</h3>
              <dl className="mt-4 divide-y divide-rule border-y border-rule">
                {SKILLS.map((s) => (
                  <div key={s.area} className="py-4">
                    <dt className="font-semibold">{s.area}</dt>
                    <dd className="mt-1 text-ink-soft">{s.items}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <a
            href={RESUME_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex h-12 items-center border border-ink px-6 text-[15px] font-semibold text-ink hover:bg-ink hover:text-paper transition-colors"
          >
            Full resume (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
