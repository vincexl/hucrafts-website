'use client';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';


export default function Navbar() {
return (
<header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-zinc-200">
<nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
<a href="#home" className="flex items-center gap-2 group">
<motion.span
initial={{ scale: 0.8, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ type: 'spring', stiffness: 260, damping: 20 }}
className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-300 via-rose-200 to-sky-200 shadow-sm"
aria-hidden
>
<Sparkles className="h-4 w-4" />
</motion.span>
<span className="font-semibold tracking-tight text-lg">HuCrafts</span>
</a>
<div className="hidden md:flex items-center gap-6 text-sm">
<a className="hover:opacity-80" href="#projects">Projects</a>
<a className="hover:opacity-80" href="#about">About</a>
<a className="hover:opacity-80" href="#contact">Contact</a>
</div>
<a href="#contact" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium bg-black text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-amber-300">
Let’s Collaborate <ChevronRight className="h-4 w-4" />
</a>
</nav>
</header>
);
}