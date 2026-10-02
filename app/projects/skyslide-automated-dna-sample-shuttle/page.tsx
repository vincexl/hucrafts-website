import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RenderVideo from '@/components/RenderVideo';
import { getProjectBySlug } from '@/lib/projects';
import { Figure, ProjectBody, ProjectFacts, ProjectHero, ProjectTitle, Section } from '@/components/project/ProjectPage';

export const metadata = { title: 'SkySlide — Automated DNA Sample Shuttle' };

const HANDOFF = [
  'The pre-amp cell’s slide carries the plate out to the handoff point under the first lift.',
  'The first lift rises and picks the plate up off the slide.',
  'The overhead carrier moves in underneath it.',
  'The lift lowers and sets the plate down on the carrier.',
  'The carrier rides across the lab to the second lift.',
  'The second lift rises and takes the plate off the carrier, and the carrier moves out of the way.',
  'The lift lowers and sets the plate on the post-amp cell’s slide, which delivers it to the cell’s robot.',
];

const RESULTS = [
  { value: '7', label: 'linear axes, coordinated without collision' },
  { value: '100%', label: 'successful unattended runs' },
  { value: '34% → 80%', label: 'facility-wide automation usage' },
];

export default function SkySlide() {
  const project = getProjectBySlug('skyslide-automated-dna-sample-shuttle')!;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ProjectHero
          src="/images/skyslide/tower-up.jpg"
          alt="View from inside a SkySlide lift tower looking straight up, with aluminum framing rising toward the ceiling and the overhead passthrough above"
        />
        <ProjectBody>
        <ProjectTitle
          project={project}
          lead={
            <p>
              Two vertical lifts and an overhead carrier that move DNA sample plates from one lab&apos;s workcells to
              another&apos;s, up near the ceiling and out of everyone&apos;s way, with nobody carrying them.
            </p>
          }
        />
        <ProjectFacts
          facts={[
            { label: 'Role', value: 'Project lead and technical lead' },
            { label: 'Scope', value: 'Mechanical design, PLC motion control, power, optical sensing, site infrastructure' },
            { label: 'Axes', value: '7 linear axes, 2 lift towers, 1 overhead carrier' },
          ]}
          tools={[
            { area: 'Controls', items: 'PLC state machines in Structured Text, collision interlocks, sensor checkpoints' },
            { area: 'Software', items: 'Python server talking to the PLC, Django web app' },
            { area: 'Mechanical', items: 'Onshape assembly, T-slot framing, seismic wall plates' },
            { area: 'Validation', items: 'FMEA, operational qualification, burn-in, integration testing' },
          ]}
        />

        <Figure
          className="mt-8"
          src="/images/skyslide/cover.jpg"
          alt="Onshape assembly of SkySlide: two vertical lift towers joined by an overhead passthrough, braced to a wall in the middle, with the plate's path drawn up the first tower, across the bridge, and down the second"
          caption="The full SkySlide assembly in Onshape. A plate rides up the first lift, across the overhead passthrough, and down the second lift."
        />

        <Section title="The problem">
          <p>
            Every sample went through two automated workcells, one before amplification and one after, in two
            different labs. Each cell ran on its own. Between them, a person picked up the plate and walked it
            over.
          </p>
          <p>
            That walk limited how many plates the cells could get through and how long they could run without
            someone there. A plate also has a time limit: in the full
            method, it has to reach the post-amp cell within 30 minutes of finishing the first step.
          </p>
          <p>
            Replacing the walk needed two things. The motion had to be predictable enough to run all night with
            no one watching. And when something did go wrong, the system had to recover cleanly and be easy for
            a technician to service.
          </p>
        </Section>

        <Section title="What made it hard">
          <p>
            Three things. First, I had very little PLC experience when I started, and this system has seven
            linear axes. Second, the route had to go through a real building: wire mesh in the floor, studs
            behind the drywall, and fire sprinklers overhead. Third, those seven axes share space at the
            handoffs, so any two of them can crash into each other if they move at the wrong time.
          </p>
        </Section>

        <Section title="How a plate gets across">
          <p>Every transfer is the same sequence of handoffs:</p>
          <ol className="list-decimal pl-6 space-y-2">
            {HANDOFF.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Section>

        <Figure
          className="mt-8 max-w-md"
          src="/images/skyslide/carrier-cad.jpg"
          alt="CAD of a SkySlide carrier nest holding a 96-well plate, with red rods along its sides and the mounting bracket below"
          caption="A carrier nest with a 96-well plate seated in it, from the deck I presented on SkySlide."
        />

        <Section title="Planning the controls">
          <p>
            With little controls background, I didn&apos;t try to solve everything in one program. I split the
            work into layers, so each one stays small enough to test by itself:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>One state machine per axis, which only knows how to move its own axis safely.</li>
            <li>A multi-axis state machine that coordinates the axes through a handoff.</li>
            <li>An orchestrator on the PLC that runs whole transfers from start to finish.</li>
            <li>
              A Python server that talks to the PLC, with a Django web app on top of it.
            </li>
          </ul>
          <p>
            I also chose controllers and motion parts the team already knew. That kept the new risk in the
            system design, where I could manage it, instead of in unfamiliar hardware.
          </p>
        </Section>

        <Section title="Fitting it into the building">
          <p>
            Before drawing the frame, I measured the space in person. A floor scan found the wire mesh where the
            anchors couldn&apos;t go. A stud finder found the framing behind the drywall so the wall plates could
            bolt into something solid. I also checked what the code requires around the sprinklers.
          </p>
          <p>
            I ran a failure mode and effects analysis (FMEA) comparing an elevated route with a floor-level one.
            It covered dropped plates, nests stopping in the wrong spot, spills, carts hitting the structure, and
            earthquakes, and listed a fix for each: presence sensors at the handoffs, position checks on the
            nests, guards around the frame, and seismic bracing. The overhead route is the one we built, and the
            plates tying the frame to the wall are that bracing.
          </p>
        </Section>

        <Section title="Keeping seven axes from colliding">
          <p>
            The riskiest moment is a reset. After a fault, axes can be stopped anywhere, and sending all seven
            home at once could drive one into another. I wanted a single button that always brings the system
            home safely, no matter where things stopped.
          </p>
          <p>
            To build it, I measured the full travel of each axis and marked where it overlaps with its
            neighbors. Each overlap became a simple yes-or-no interlock: this axis may move only if the axis next
            to it is clear. On reset, the PLC loops over all seven interlocks and homes whichever axes are free
            right now. It repeats until everything is home, so the homing order is worked out live rather than
            fixed in advance.
          </p>
          <p>
            Sensors check the plate at every handoff point. Each check returns the same small record, so every
            step of the sequence can tell whether a plate is there, whether it is seated square, and if not, why:
          </p>
          <pre className="mt-2 overflow-x-auto bg-ink p-5 font-mono text-sm leading-relaxed text-paper">
            <code>{`TYPE ST_PlateCheckResult :
STRUCT
    Present : BOOL;
    Aligned : BOOL;
    IsError : BOOL;
    Msg     : STRING(120);
    Code    : USINT;
END_STRUCT
END_TYPE`}</code>
          </pre>
        </Section>

        <Section title="Proving it works">
          <p>
            Qualification ran in two stages. In the operational qualification, I tested every command the lab
            software uses one at a time: prepare a transfer, run it, and send everything home. Then I caused
            faults on purpose, such as blocking a slide so it couldn&apos;t reach position, and confirmed the
            system recovered with the home command. A burn-in finished it off: ten full transfers from pre-amp
            to post-amp for each nest.
          </p>
          <p>
            Integration testing came next, with the workcells in the loop. The lab&apos;s scheduler ran full
            production methods end to end in automatic mode. The plate left the pre-amp cell, crossed on
            SkySlide, and arrived at the post-amp cell inside the 30-minute window. Both runs finished without an
            issue.
          </p>
        </Section>

        <dl className="mt-10 border-t border-ink">
          {RESULTS.map((r) => (
            <div key={r.label} className="grid grid-cols-[minmax(7rem,12rem)_1fr] items-baseline gap-6 border-b border-rule py-4">
              <dt className="font-display font-wide text-2xl font-extrabold tabular-nums tracking-[-0.02em] text-ink">{r.value}</dt>
              <dd className="text-ink-soft">{r.label}</dd>
            </div>
          ))}
        </dl>

        <Section title="Demo">
          <p>A camera rides along with a plate: up the first lift, across the passthrough, and down the far side.</p>
        </Section>
        <figure className="mt-6">
          <div className="overflow-hidden bg-ink">
            <RenderVideo
              src="/videos/skyslide-demo.mp4"
              poster="/images/skyslide-poster.jpg"
              className="w-full aspect-video object-contain"
            />
          </div>
          <figcaption className="mt-3 text-[15px] text-ink-mute">Autoplays muted; unmute for sound.</figcaption>
        </figure>
        </ProjectBody>
      </main>
      <Footer />
    </div>
  );
}
