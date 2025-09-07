'use client';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { Project } from '@/types';


export default function ProjectCard({ p }: { p: Project }) {
return (
<motion.article
initial={{ y: 10, opacity: 0 }}
whileInView={{ y: 0, opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.4 }}
className="group rounded-3xl overflow-hidden bg-white border border-zinc-200 shadow-sm hover:shadow-md focus-within:shadow-md"
>
<div className="aspect-[4/3] overflow-hidden">
<img src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition" />
</div>
<div className="p-5">
<div className="flex items-center gap-2 text-xs text-zinc-600">
<span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-1">{p.category}</span>
{p.tags.map((t) => (
<span key={t} className="inline-flex items-center rounded-full bg-amber-100 text-amber-900 px-2 py-1">{t}</span>
))}
</div>
<h3 className="mt-3 text-lg font-semibold tracking-tight">{p.title}</h3>
<p className="mt-1 text-sm text-zinc-600">{p.blurb}</p>
<a href={p.link} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-900 hover:underline">
View case study <ExternalLink className="h-4 w-4" />
</a>
</div>
</motion.article>
);
}