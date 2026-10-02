'use client';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { EMAIL, LINKEDIN_HREF, RESUME_HREF } from '@/lib/site';

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
    <div className="grid gap-12 lg:grid-cols-[14rem_1fr]">
      <h2 className="font-display font-wide text-2xl sm:text-[1.75rem] font-extrabold leading-tight tracking-[-0.025em]">Contact</h2>
      <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <p className="font-display font-wide font-extrabold text-[clamp(2rem,4vw,3.25rem)] leading-[1.02] tracking-[-0.03em]">
            Hiring for automation, controls, or robotics?
          </p>
          <p className="mt-5 max-w-[30rem] text-lg leading-relaxed text-ink-soft">
            Send a note here, or reach me directly.
          </p>
          <dl className="mt-8 space-y-3 text-[15px]">
            <div className="flex gap-4">
              <dt className="w-20 text-sm leading-6 text-ink-mute">email</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className="underline decoration-rule decoration-2 underline-offset-[5px] hover:decoration-ink">
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-20 text-sm leading-6 text-ink-mute">linkedin</dt>
              <dd>
                <a href={LINKEDIN_HREF} target="_blank" rel="noopener noreferrer" className="underline decoration-rule decoration-2 underline-offset-[5px] hover:decoration-ink">
                  linkedin.com/in/xiaoleih
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-20 text-sm leading-6 text-ink-mute">github</dt>
              <dd>
                <a href="https://github.com/vincexl" target="_blank" rel="noopener noreferrer" className="underline decoration-rule decoration-2 underline-offset-[5px] hover:decoration-ink">
                  github.com/vincexl
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-20 text-sm leading-6 text-ink-mute">resume</dt>
              <dd>
                <a href={RESUME_HREF} target="_blank" rel="noopener noreferrer" className="underline decoration-rule decoration-2 underline-offset-[5px] hover:decoration-ink">
                  Xiaolei_Hu_Resume.pdf
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form onSubmit={handleSubmit} className="border-t border-ink pt-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" autoComplete="name" />
            <Field label="Email" name="email" type="email" autoComplete="email" required />
            <Field label="Company or role" name="topic" autoComplete="organization" className="sm:col-span-2" />
            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold">Message</span>
              <textarea
                name="message"
                required
                rows={5}
                className="mt-2 w-full border border-rule bg-white px-3 py-2.5 text-[15px] focus:border-axis-z focus:outline-none focus:ring-1 focus:ring-axis-z"
              />
            </label>
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-6 inline-flex h-12 items-center gap-2 bg-ink px-6 text-[15px] font-semibold text-paper hover:bg-ink-soft transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
          <div aria-live="polite" className="mt-4 text-[15px]">
            {status === 'sent' && <p className="text-ink">Sent. I&rsquo;ll get back to you soon.</p>}
            {status === 'error' && (
              <p className="text-[#b3261e]">
                The message didn&rsquo;t send. Please email me at{' '}
                <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
                  {EMAIL}
                </a>
                .
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-semibold">{label}</span>
      <input
        {...props}
        className="mt-2 h-11 w-full border border-rule bg-white px-3 text-[15px] focus:border-axis-z focus:outline-none focus:ring-1 focus:ring-axis-z"
      />
    </label>
  );
}
