'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/types';

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.article
      initial={{ y: 10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group rounded-2xl overflow-hidden bg-white border border-zinc-200 shadow-sm hover:shadow-md focus-within:shadow-md transition-shadow"
    >
      <div className="aspect-[4/3] overflow-hidden bg-zinc-100">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
        />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-1 text-zinc-600">{p.category}</span>
          {p.tags.map((t) => (
            <span key={t} className="inline-flex items-center rounded-full bg-amber-100 text-amber-900 px-2 py-1">{t}</span>
          ))}
        </div>
        <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.title}</h3>
        <p className="mt-1 text-sm text-zinc-600">{p.blurb}</p>
        <a
          href={p.link}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-900 hover:text-amber-600 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          View project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.article>
  );
}
