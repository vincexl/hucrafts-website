'use client';
import { useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProjectsGrid from '@/components/ProjectsGrid';
import About from '@/components/About';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import Filters from '@/components/Filters';
import { CATEGORIES, PROJECTS, type Category } from '@/lib/projects';

export default function Page() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<Category>(CATEGORIES[0]); // 'All'

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const isAll = cat === CATEGORIES[0];
    return PROJECTS.filter(
      (p) =>
        (isAll || p.category === cat) &&
        (p.title.toLowerCase().includes(q) ||
          p.blurb.toLowerCase().includes(q) ||
          p.tags.join(' ').toLowerCase().includes(q))
    );
  }, [query, cat]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <section id="projects" className="py-10 sm:py-16">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Projects</h2>
              <p className="text-zinc-600 mt-2">
                Browse engineering builds, design studies, and event productions.
              </p>
            </div>
            <Filters categories={CATEGORIES} selected={cat} onSelect={setCat} />
          </div>

          <div className="mt-6">
            <label className="sr-only" htmlFor="search">
              Search projects
            </label>
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keyword, tech, or tag…"
              className="w-full rounded-xl border border-zinc-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white"
            />
          </div>

          <ProjectsGrid projects={filtered} />
        </section>

        <About />
        <section id="contact" className="py-16 border-t border-zinc-200">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
