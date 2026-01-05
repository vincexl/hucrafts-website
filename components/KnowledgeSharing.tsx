'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Target, Presentation } from 'lucide-react';

export default function KnowledgeSharing() {
  const resources = [
    {
      title: 'SMART Goals Worksheet',
      description: 'Interactive tool to evaluate and refine your goals using the SMART framework.',
      icon: <Target className="h-6 w-6" />,
      link: '/SMART.html',
      tags: ['Goal Setting', 'Framework']
    },
    {
      title: 'Elevator Pitch Format',
      description: 'Structured guide for crafting compelling product pitches.',
      icon: <Presentation className="h-6 w-6" />,
      link: '/elevator_pitch_format.html',
      tags: ['Communication', 'Product']
    },
    {
      title: 'Influence without Authority',
      description: 'Knowledge share on leveraging influence as a product manager.',
      icon: <BookOpen className="h-6 w-6" />,
      link: '/pm_knowledge_share_1.html',
      tags: ['Leadership', 'Influence']
    }
  ];

  return (
    <section id="knowledge" className="py-16 border-t border-zinc-200">
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Knowledge Sharing</h2>
        <p className="text-zinc-600 mt-2">
          Product management frameworks, tools, and insights from continuous learning.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, idx) => (
          <motion.article
            key={resource.title}
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="group rounded-3xl overflow-hidden bg-white border border-zinc-200 shadow-sm hover:shadow-md focus-within:shadow-md transition"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-900">
                  {resource.icon}
                </div>
                <h3 className="text-lg font-semibold tracking-tight flex-1">{resource.title}</h3>
              </div>
              <p className="text-sm text-zinc-600 mb-4">{resource.description}</p>
              <div className="flex items-center gap-2 mb-4">
                {resource.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={resource.link}
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 hover:underline"
              >
                View Resource →
              </Link>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/projects/product-management-course"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:underline"
        >
          View all Product Management resources →
        </Link>
      </div>
    </section>
  );
}
