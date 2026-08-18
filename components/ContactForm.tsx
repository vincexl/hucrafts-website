'use client';
import { Mail, MapPin, Github, Linkedin, ChevronRight } from 'lucide-react';

export default function ContactForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `HuCrafts inquiry — ${data.get('topic') || 'General'}`;
    const body = [
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Budget: ${data.get('budget') || ''}`,
      '',
      String(data.get('message') || ''),
    ].join('\n');
    window.location.href = `mailto:vincent.hu@hucrafts.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Let’s craft something meaningful</h2>
        <p className="mt-3 text-zinc-700">Tell me about your idea—engineering build, identity design, or an unforgettable event.</p>
        <ul className="mt-6 space-y-2 text-sm text-zinc-700">
          <li className="flex items-center gap-2"><Mail className="h-4 w-4" aria-hidden /> vincent.hu@hucrafts.com</li>
          <li className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden /> Bay Area, CA</li>
          <li className="flex items-center gap-2">
            <Github className="h-4 w-4" aria-hidden />
            <a href="https://github.com/vincexl" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors">
              github.com/vincexl
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" aria-hidden />
            <a href="https://linkedin.com/in/xiaoleih" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors">
              linkedin.com/in/xiaoleih
            </a>
          </li>
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="grid sm:grid-cols-2 gap-4">
          <LabelledInput label="Name" name="name" placeholder="Your name" autoComplete="name" />
          <LabelledInput label="Email" name="email" placeholder="you@email.com" type="email" autoComplete="email" />
          <LabelledInput label="Topic" name="topic" placeholder="Engineering / Design / Event" />
          <LabelledInput label="Budget" name="budget" placeholder="$5k–$50k" />
          <label className="block text-sm font-medium sm:col-span-2">
            Message
            <textarea
              name="message"
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-amber-400"
              rows={5}
              placeholder="Tell me about your project…"
            />
          </label>
        </div>
        <button
          type="submit"
          className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-zinc-900 text-white hover:bg-zinc-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
        >
          Send inquiry <ChevronRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

function LabelledInput({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        {...props}
        className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
    </label>
  );
}
