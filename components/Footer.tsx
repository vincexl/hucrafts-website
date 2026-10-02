import { Linkedin, Mail } from 'lucide-react';
import Triad from '@/components/frames/Triad';
import { EMAIL, LINKEDIN_HREF, NAV_LINKS } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-16 flex flex-col items-center text-center">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-7 gap-y-3 text-[15px]">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  {...(l.newTab && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="text-ink underline underline-offset-[5px] decoration-rule hover:decoration-ink decoration-2"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 flex items-center gap-2">
          <a href={LINKEDIN_HREF} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex h-10 w-10 items-center justify-center text-ink hover:text-ink-mute">
            <Linkedin className="h-[18px] w-[18px]" />
          </a>
          <a href={`mailto:${EMAIL}`} aria-label={`Email ${EMAIL}`} className="inline-flex h-10 w-10 items-center justify-center text-ink hover:text-ink-mute">
            <Mail className="h-[18px] w-[18px]" />
          </a>
        </div>
        <div className="mt-10 flex items-end gap-3">
          <Triad size={34} strokeWidth={2} />
          <img src="/images/hucrafts-logo.png" alt="hucrafts" width={778} height={240} className="h-6 w-auto mix-blend-multiply" />
        </div>
        <p className="mt-4 text-sm text-ink-mute">
          <span className="font-mono text-xs">frame: hucrafts · parent: world</span>
          <span className="mx-2" aria-hidden>·</span>© {new Date().getFullYear()} Vincent (Xiaolei) Hu
        </p>
      </div>
    </footer>
  );
}
