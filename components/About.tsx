import { Check } from 'lucide-react';

const SKILLS = [
  'SolidWorks/Onshape and Product Lifecycle Management Administration, GD&T, FEA basics',
  'PLC & motion control (Beckhoff TwinCAT)',
  'Python (PySide6), SiLA SOAP drivers',
  'Immersive game & event design',
];

export default function About() {
  return (
    <section id="about" className="py-16 border-t border-zinc-200">
      <div className="grid lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">About HuCrafts</h2>
          <p className="mt-4 text-zinc-700 max-w-prose">
            I’m Vincent (Xiaolei) Hu—automation engineer, designer, and event planner. My work spans robotics systems, GUI development, 3D Modeling and Additive Manufacturing, and social experiences.
          </p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
            {SKILLS.map((skill) => (
              <li key={skill} className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4">
                <Check className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" aria-hidden />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="space-y-3">
          <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-amber-50 to-white p-5">
            <h3 className="font-semibold">Capabilities</h3>
            <p className="text-sm text-zinc-600 mt-1">Prototyping • Automation • PDM & PLM Admin • Production</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <h3 className="font-semibold">Selected Industries/Contexts</h3>
            <p className="text-sm text-zinc-600 mt-1">Biotechnology • Personal/Academic Projects • Team Bonding • Community Events</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
