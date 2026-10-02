import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CompanyLogos from '@/components/CompanyLogos';
import ProjectsGrid from '@/components/ProjectsGrid';
import KnowledgeSharing from '@/components/KnowledgeSharing';
import About from '@/components/About';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { PROJECTS } from '@/lib/projects';

// The homepage grid is the engineering and design work; events live under "Writing & other things".
const WORK = PROJECTS.filter((p) => p.category !== 'Events');

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <section id="work" aria-labelledby="work-heading" className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 scroll-mt-20">
          <div className="mb-8 flex items-baseline justify-between gap-6 border-b border-rule pb-4">
            <h2 id="work-heading" className="font-display font-wide text-2xl sm:text-[1.75rem] font-extrabold leading-tight tracking-[-0.025em]">
              Work
            </h2>
            <p className="font-mono text-xs text-ink-mute">{WORK.length} frames</p>
          </div>
          <ProjectsGrid projects={WORK} />
        </section>
        <CompanyLogos />
        <KnowledgeSharing />
        <About />
        <section id="contact" className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-24 border-t border-rule scroll-mt-20">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
