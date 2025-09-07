'use client';
import { motion } from 'framer-motion';
import Feature from '@/components/Feature';
import { Hammer, Paintbrush, Calendar } from 'lucide-react';


export default function Hero() {
return (
<section id="home" className="relative py-20">
<div className="grid lg:grid-cols-2 gap-12 items-center">
<div>
<motion.h1
initial={{ y: 12, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.6 }}
className="text-4xl sm:text-5xl font-extrabold tracking-tight"
>
Design, Automation, Events - Unified in Human Experience
</motion.h1>
<p className="mt-6 text-lg text-zinc-600 max-w-prose">
HuCrafts is my studio for building meaningful systems—mechanisms that move, interfaces that flow, and gatherings that spark creativity. What matters to me is your thrival and success.
</p>
<div className="mt-8 flex flex-wrap gap-3">
<a href="#projects" className="rounded-xl px-4 py-2 bg-amber-300 text-zinc-950 font-medium hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-amber-300">Explore Projects</a>
<a href="#about" className="rounded-xl px-4 py-2 border border-zinc-300 hover:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-300">About HuCrafts</a>
</div>
<div className="mt-10 grid grid-cols-3 gap-4 text-sm">
<Feature icon={<Hammer className="h-4 w-4" />} title="Robotics & Automation" />
<Feature icon={<Paintbrush className="h-4 w-4" />} title="Design & Co-Development" />
<Feature icon={<Calendar className="h-4 w-4" />} title="Social Events" />
</div>
</div>
<motion.div
initial={{ opacity: 0, scale: 0.98 }}
whileInView={{ opacity: 1, scale: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.6 }}
className="relative"
>
<div className="aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-gradient-to-tr from-zinc-100 via-white to-zinc-100">
<img
src="/images/hero-workbench.jpg"
alt="Creative workshop desk with tools"
className="h-full w-full object-cover opacity-90 mix-blend-multiply"
/>
</div>
</motion.div>
</div>
</section>
);
}