import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RenderVideo from '@/components/RenderVideo';
import { getProjectBySlug } from '@/lib/projects';
import { ProjectBody, ProjectFacts, ProjectHero, ProjectTitle } from '@/components/project/ProjectPage';

export const metadata = { title: 'Fortune Cookie Render' };

export default function FortuneCookieRender() {
  const project = getProjectBySlug('fortune-cookie-render')!;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ProjectHero
          src="/images/proj-fortunecookie.png"
          alt="Photoreal render of a fortune cookie under three-point studio lighting on a warm-lit floor fading to black"
        />
        <ProjectBody>
          <ProjectTitle project={project} lead={<p>{project.blurb}</p>} />
          <ProjectFacts
            facts={[
              { label: 'Type', value: 'Rendering study' },
              { label: 'Lighting', value: 'Three-point studio lighting' },
            ]}
            tools={[{ area: 'Skills', items: project.tags.join(', ') }]}
          />

          <figure className="mt-16">
            <div className="overflow-hidden bg-ink">
              <RenderVideo
                src="/videos/fortune-cookie-render.mp4"
                poster="/images/proj-fortunecookie.png"
                className="w-full aspect-video object-contain"
              />
            </div>
            <figcaption className="mt-3 text-[15px] text-ink-mute">
              Render video. Autoplays muted; use the controls to pause or replay.
            </figcaption>
          </figure>
        </ProjectBody>
      </main>
      <Footer />
    </div>
  );
}
