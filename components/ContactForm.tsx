'use client';
import { useState } from 'react';
import { Mail, MapPin, Github, Linkedin, ChevronRight } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          topic: data.get('topic'),
          budget: data.get('budget'),
          message: data.get('message'),
          company: data.get('company'),
        }),
      });
      if (!res.ok) throw new Error('send_failed');
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
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
          <LabelledInput label="Email" name="email" placeholder="you@email.com" type="email" autoComplete="email" required />
          <LabelledInput label="Topic" name="topic" placeholder="Engineering / Design / Event" />
          <LabelledInput label="Budget" name="budget" placeholder="$5k–$50k" />
          <label className="block text-sm font-medium sm:col-span-2">
            Message
            <textarea
              name="message"
              required
              className="mt-1 w-full rounded-xl border border-zinc-300 px-3 py-2 font-normal focus:outline-none focus:ring-2 focus:ring-amber-400"
              rows={5}
              placeholder="Tell me about your project…"
            />
          </label>
          <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        </div>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-zinc-900 text-white hover:bg-zinc-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending…' : 'Send inquiry'} <ChevronRight className="h-4 w-4" />
        </button>
        <div aria-live="polite" className="mt-3 text-sm">
          {status === 'sent' && <p className="text-emerald-700">Thanks — your inquiry is on its way. I&rsquo;ll get back to you soon.</p>}
          {status === 'error' && (
            <p className="text-red-700">
              Something went wrong sending your message. Please email me directly at{' '}
              <a href="mailto:vincent.hu@hucrafts.com" className="underline hover:text-amber-600">vincent.hu@hucrafts.com</a>.
            </p>
          )}
        </div>
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
