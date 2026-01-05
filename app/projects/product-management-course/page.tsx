'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Target, Presentation, ExternalLink, ArrowLeft } from 'lucide-react';

export default function ProductManagementCourse() {
  const resources = [
    {
      title: 'SMART Goals Worksheet',
      description: 'Interactive tool to evaluate and refine your goals using the SMART framework. Ensure your objectives are Specific, Measurable, Achievable, Relevant, and Time-bound.',
      icon: <Target className="h-6 w-6" />,
      link: '/SMART.html',
      tags: ['Goal Setting', 'Framework', 'Interactive']
    },
    {
      title: 'Elevator Pitch Format',
      description: 'Structured guide for crafting compelling product pitches. Learn to articulate your value proposition clearly and concisely.',
      icon: <Presentation className="h-6 w-6" />,
      link: '/elevator_pitch_format.html',
      tags: ['Communication', 'Product', 'Template']
    },
    {
      title: 'Influence without Authority',
      description: 'Knowledge share on leveraging influence as a product manager. Explore six sources of influence and strategies to navigate the two-hat syndrome.',
      icon: <BookOpen className="h-6 w-6" />,
      link: '/pm_knowledge_share_1.html',
      tags: ['Leadership', 'Influence', 'Strategy']
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/#knowledge"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Knowledge Sharing
          </Link>

          <div className="mb-12">
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4"
            >
              Product Management Learning Resources
            </motion.h1>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-zinc-600 max-w-3xl"
            >
              A curated collection of frameworks, tools, and insights to help you excel in product management. 
              From goal-setting methodologies to influence strategies, explore resources that empower effective product leadership.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, idx) => (
              <motion.article
                key={resource.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="group rounded-3xl overflow-hidden bg-white border border-zinc-200 shadow-sm hover:shadow-md transition"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 text-amber-900">
                      {resource.icon}
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight flex-1">{resource.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-600 mb-4 leading-relaxed">
                    {resource.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={resource.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 hover:text-amber-600 transition-colors group"
                  >
                    Open Resource
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 rounded-3xl border border-zinc-200 bg-gradient-to-br from-amber-50 to-white p-8"
          >
            <h2 className="text-2xl font-bold tracking-tight mb-3">Continuous Learning</h2>
            <p className="text-zinc-600 mb-6 max-w-2xl">
              This collection is continuously updated with new frameworks, case studies, and tools. 
              Each resource is designed to provide practical value for product managers at all levels.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-zinc-700">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span>Frameworks & Templates</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span>Interactive Tools</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-700">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span>Knowledge Shares</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
