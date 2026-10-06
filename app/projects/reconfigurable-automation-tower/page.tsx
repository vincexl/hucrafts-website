import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RenderVideo from '@/components/RenderVideo';
import { getProjectBySlug } from '@/lib/projects';
import { Figure, ProjectBody, ProjectFacts, ProjectHero, ProjectTitle, Section } from '@/components/project/ProjectPage';

export const metadata = { title: 'Reconfigurable Automation Tower' };

const MODES = [
  {
    name: 'Slide out',
    who: 'A person',
    what: 'The door opens and an instrument rides out past the frame, so someone can load it, check it, or work with it by hand.',
  },
  {
    name: 'Slide in',
    who: 'A robot arm',
    what: 'The instrument sits back in its home position, where a robot arm picks and places SBS sample plates on it.',
  },
];

export default function ReconfigurableAutomationTower() {
  const project = getProjectBySlug('reconfigurable-automation-tower')!;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ProjectHero
          src="/images/reconfigurable-automation-tower/cover.jpg"
          fit="contain"
          alt="Onshape assembly of a black aluminum-frame tower on casters, door open, with lab instruments on two shelves and one instrument plate pulled out on its slide"
        />
        <ProjectBody>
          <ProjectTitle
            project={project}
            lead={
              <p>
                A rolling tower that holds lab automation instruments. Each instrument sits on a slide: pull it out and a
                person can work with it, push it in and a robot arm can reach it. When one needs service, it comes out
                and a replacement goes in within minutes.
              </p>
            }
          />
          <ProjectFacts
            facts={[
              { label: 'Modes', value: 'Slide out for people, slide in for robot arms' },
              { label: 'Payload', value: 'Lab automation instruments handling SBS sample plates' },
              { label: 'Service', value: 'Twist lock and rollers for hot-swapping an instrument' },
            ]}
            tools={[
              { area: 'CAD', items: 'Onshape assembly, mate connectors, revolute and slider mates, Animate mate' },
              { area: 'Hardware', items: 'T-slot aluminum frame, profile hinge blocks, hold-closed drawer slides, retractable knobs, rolling locating modules' },
            ]}
          />

          <Section title="One instrument, two users">
            <p>
              Lab instruments in an automated line have two kinds of users. A robot arm needs every instrument to be
              in exactly the same place each time it reaches in. A person needs room to get their hands on it. A fixed
              shelf serves one or the other. This tower serves both by putting each instrument on a slide.
            </p>
          </Section>
          <dl className="mt-8 border-t border-ink">
            {MODES.map((m) => (
              <div key={m.name} className="grid gap-2 border-b border-rule py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt>
                  <span className="font-display font-wide text-xl font-extrabold tracking-[-0.01em] text-ink">{m.name}</span>
                  <span className="block text-sm text-ink-mute">{m.who}</span>
                </dt>
                <dd className="text-[17px] leading-relaxed text-ink-soft">{m.what}</dd>
              </div>
            ))}
          </dl>

          <Section title="Opening the door">
            <p>
              The front door hangs on two aluminum hinge blocks bolted to the frame. In the model the door is a single
              revolute mate, so I could swing it through its full range and check that it clears the frame and the
              instruments at every angle.
            </p>
          </Section>
          <figure className="mt-6">
            <div className="overflow-hidden bg-white ring-1 ring-rule">
              <RenderVideo
                src="/videos/reconfigurable-automation-tower-door.mp4"
                poster="/images/reconfigurable-automation-tower/door-poster.jpg"
                className="w-full aspect-[1600/1126] object-contain"
              />
            </div>
            <figcaption className="mt-3 text-[15px] text-ink-mute">The door swinging open and closed, driven by Onshape&apos;s Animate mate.</figcaption>
          </figure>

          <Section title="Sliding an instrument out">
            <p>
              Each instrument plate rides on a pair of drawer slides. With the door open, the plate pulls straight out
              past the frame for a person to use. Pushed back in, the slides hold closed, and the instrument returns to
              the spot the robot arm was taught.
            </p>
          </Section>
          <figure className="mt-6">
            <div className="overflow-hidden bg-white ring-1 ring-rule">
              <RenderVideo
                src="/videos/reconfigurable-automation-tower-slide.mp4"
                poster="/images/reconfigurable-automation-tower/slide-poster.jpg"
                className="w-full aspect-[1600/1097] object-contain"
              />
            </div>
            <figcaption className="mt-3 text-[15px] text-ink-mute">An instrument plate sliding out through the open door and back in.</figcaption>
          </figure>

          <Section title="Swapping an instrument">
            <p>
              Instruments need preventive maintenance, and sometimes they break. If one is bolted in, the whole line
              waits while a service engineer takes it apart in place. Here, the engineer slides the instrument out,
              releases the twist lock, and rolls the instrument plate off its slide. A replacement rolls on and locks
              into the same position, and the line keeps running while the original goes off for service.
            </p>
          </Section>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Figure
              src="/images/reconfigurable-automation-tower/twist-lock.png"
              alt="Close-up of a gray instrument plate whose U-shaped notch fits around a gold retractable knob on the yellow slide plate"
              caption="Twist lock: a notch in the instrument plate drops around a retractable knob on the slide."
            />
            <Figure
              src="/images/reconfigurable-automation-tower/snap-lock.png"
              alt="Close-up of a highlighted aluminum angle block screwed to the yellow slide plate, butting against the edge of the gray instrument plate, with a roller set into the slide plate"
              caption="Snap lock: an aluminum angle block mounted on the slide plate, at the edge of the instrument plate."
            />
          </div>
        </ProjectBody>
      </main>
      <Footer />
    </div>
  );
}
