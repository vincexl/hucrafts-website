export default function About() {
return (
<section id="about" className="py-16 border-t border-zinc-200">
<div className="grid lg:grid-cols-3 gap-10 items-start">
<div className="lg:col-span-2">
<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">About HuCrafts</h2>
<p className="mt-4 text-zinc-700 max-w-prose">
I’m Vincent (Xiaolei) Hu—hardware automation engineer, designer, and event producer. My work spans robotics systems, GUI development, brand visuals, and social experiences.
</p>
<ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
<li className="rounded-xl border border-zinc-200 bg-white p-4">✅ SolidWorks/Onshape, GD&T, FEA basics</li>
<li className="rounded-xl border border-zinc-200 bg-white p-4">✅ PLC & motion control (Beckhoff TwinCAT)</li>
<li className="rounded-xl border border-zinc-200 bg-white p-4">✅ Python (PySide6), SiLA SOAP drivers</li>
<li className="rounded-xl border border-zinc-200 bg-white p-4">✅ Immersive game & event design</li>
</ul>
</div>
<aside className="space-y-3">
<div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-amber-50 to-white p-5">
<h3 className="font-semibold">Capabilities</h3>
<p className="text-sm text-zinc-600 mt-1">Prototyping • Automation • Visual Design • Production</p>
</div>
<div className="rounded-2xl border border-zinc-200 bg-white p-5">
<h3 className="font-semibold">Selected Clients/Contexts</h3>
<p className="text-sm text-zinc-600 mt-1">Myriad Genetics • Academic Projects • Community Events</p>
</div>
</aside>
</div>
</section>
);
}