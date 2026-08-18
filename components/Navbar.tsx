'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, Menu, X } from 'lucide-react';

const LINKS = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#knowledge', label: 'Knowledge' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-zinc-50/80 border-b border-zinc-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a
          href="/"
          className="flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-amber-300 text-zinc-900"
            aria-hidden
          >
            <Sparkles className="h-4 w-4" />
          </motion.span>
          <span className="font-semibold tracking-tight text-lg">HuCrafts</span>
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-zinc-600 hover:text-zinc-900 transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
          >
            Let’s Collaborate <ChevronRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-zinc-200 bg-zinc-50/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex flex-col">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
