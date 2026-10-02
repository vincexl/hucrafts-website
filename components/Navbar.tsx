'use client';
import { useState } from 'react';
import { Linkedin, Mail, Menu, X } from 'lucide-react';

import { EMAIL, LINKEDIN_HREF, NAV_LINKS } from '@/lib/site';

const newTabProps = { target: '_blank', rel: 'noopener noreferrer' };

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-sm border-b border-rule">
      <nav className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">
        <div className="flex items-center gap-8 lg:gap-10">
          <a href="/" className="shrink-0" aria-label="HuCrafts home">
            <img src="/images/hucrafts-logo.png" alt="hucrafts" width={778} height={240} className="h-7 w-auto mix-blend-multiply" />
          </a>
          <ul className="hidden md:flex items-center gap-7 text-[15px]">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  {...(l.newTab && newTabProps)}
                  className="text-ink-soft hover:text-ink underline-offset-[6px] decoration-ink decoration-2 hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-1">
          <a
            href={LINKEDIN_HREF}
            {...newTabProps}
            aria-label="LinkedIn"
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center text-ink hover:text-ink-mute"
          >
            <Linkedin className="h-[18px] w-[18px]" strokeWidth={2} />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label={`Email ${EMAIL}`}
            className="hidden sm:inline-flex h-10 w-10 items-center justify-center text-ink hover:text-ink-mute"
          >
            <Mail className="h-[18px] w-[18px]" strokeWidth={2} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center border border-rule text-ink"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-rule bg-paper">
          <ul className="mx-auto max-w-[1440px] px-4 sm:px-8 py-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  {...(l.newTab && newTabProps)}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg font-display font-wide font-semibold text-ink border-b border-rule last:border-0"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="flex gap-6 py-3 text-ink-soft">
              <a href={LINKEDIN_HREF} {...newTabProps} className="inline-flex items-center gap-2">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
