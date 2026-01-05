'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function KnowledgeSharing() {
  return (
    <section id="knowledge" className="py-16 border-t border-zinc-200">
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Knowledge Sharing</h2>
        <p className="text-zinc-600 mt-2">
          Product management frameworks, tools, and insights from continuous learning.
        </p>
      </div>

      <div className="max-w-2xl">
        <motion.article
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="group rounded-3xl overflow-hidden bg-white border border-zinc-200 shadow-sm hover:shadow-md focus-within:shadow-md transition"
        >
          <Link href="/projects/product-management-course" className="block p-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-amber-100 text-amber-900 flex-shrink-0">
                <GraduationCap className="h-7 w-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold tracking-tight mb-2 group-hover:text-amber-600 transition-colors">
                  Product Management
                </h3>
                <p className="text-sm text-zinc-600 mb-4 leading-relaxed">
                  Explore curated frameworks, interactive tools, and knowledge shares covering goal-setting methodologies, 
                  influence strategies, and effective communication techniques for product managers.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600">
                    SMART Goals
                  </span>
                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600">
                    Elevator Pitch
                  </span>
                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600">
                    Influence
                  </span>
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-1 text-xs text-amber-900 font-medium">
                    3 Resources
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.article>
      </div>
    </section>
  );
}
