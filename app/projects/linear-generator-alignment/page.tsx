import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProjectBySlug } from '@/lib/projects';
import { ProjectBody, ProjectFacts, ProjectHero, ProjectTitle, Section } from '@/components/project/ProjectPage';

export const metadata = { title: 'Linear Generator Alignment Platform' };

// First pass written from the resume; the project folder will fill in photos, plots, and specifics.
const METHODS = [
  {
    name: 'Two positions',
    result: '5 µm',
    what: 'Measure the axis at two stations, work out how each servo move shifts the reading, and step the part toward center until both stations agree.',
  },
  {
    name: 'Ten positions',
    result: '50 µm',
    what: 'Measure at ten stations along the full length, fit one straight line through all of them in 3D, and move the part to the position that leaves the smallest total error.',
  },
];

export default function LinearGeneratorAlignment() {
  const project = getProjectBySlug('linear-generator-alignment')!;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ProjectHero
          src="/images/mainspring-alignment/cover.jpg"
          alt="A Mainspring linear generator core in its white steel frame on a factory floor, with the cylinder bore facing the camera and a Mainspring enclosure behind it"
        />
        <ProjectBody>
          <ProjectTitle
            project={project}
            lead={
              <p>
                A Mainspring linear generator only runs well if its long core sits on one straight axis. Lining it up
                used to take a full workday. I built the platform that does it: servo axes that move the parts, sensors
                that measure them, and PLC code that keeps correcting until the axis is true. A full cycle now takes
                2 hours instead of 8.
              </p>
            }
            note="More photos, plots, and detail on the hardware are on the way."
          />
          <ProjectFacts
            facts={[
              { label: 'Role', value: 'Senior Controls & Automation Engineer, Mainspring Energy' },
              { label: 'Cycle time', value: '8 hours → 2 hours (75% shorter)' },
              { label: 'Alignment', value: '5 µm at two positions, 50 µm across ten' },
            ]}
            tools={[
              { area: 'Controls', items: 'TwinCAT 3, IEC 61131-3 Structured Text, TwinCAT MC2, multi-axis servo motion, Beckhoff IPC' },
              { area: 'Operator HMI', items: 'Ignition Vision, OPC UA, database logging' },
              { area: 'Communications', items: 'EtherCAT, ADS, OPC UA, RS-422, TCP/IP' },
              { area: 'Math', items: 'Jacobian-based inverse kinematics, SVD 3D line fitting, cost-function minimization' },
            ]}
          />

          <Section title="Why alignment matters">
            <p>
              Inside the frame, moving parts travel back and forth along the core, so every section they pass through
              has to share the same centerline. The tolerance is measured in microns, across a part longer than a
              person is tall.
            </p>
            <p>
              Before this platform, aligning one unit took about eight hours.
            </p>
          </Section>

          <Section title="Measure, correct, repeat">
            <p>
              The platform runs the same loop a careful technician would, only faster and the same way every time. It
              calibrates its sensors, sweeps the part through a set of positions, reads where the axis really is, and
              moves the servos to close the gap. Then it measures again. The PLC program behind it is split into more
              than 14 blocks covering multi-axis motion, sensing, calibration, sweeps, and the correction math.
            </p>
          </Section>
          <dl className="mt-8 border-t border-ink">
            {METHODS.map((m) => (
              <div key={m.name} className="grid gap-2 border-b border-rule py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt>
                  <span className="font-display font-wide text-xl font-extrabold tracking-[-0.01em] text-ink">{m.name}</span>
                  <span className="block text-sm text-ink-mute">to within {m.result}</span>
                </dt>
                <dd className="text-[17px] leading-relaxed text-ink-soft">{m.what}</dd>
              </div>
            ))}
          </dl>

          <Section title="88 steps on one screen">
            <p>
              The operator runs the whole job from an Ignition Vision screen. It walks them through 88 steps, shows
              only what matters at each one, and sends the unit down a pass or fail path depending on what the
              measurements say. Every step and every reading is logged to a database, so each generator ships with a
              record of how it was aligned.
            </p>
          </Section>

          <Section title="Five protocols, one controller">
            <p>
              Servo drives, sensors, the HMI, and outside instruments all speak different languages: EtherCAT, ADS,
              OPC UA, RS-422, and TCP/IP. A single Beckhoff industrial PC ties them together, so the measure-and-correct
              loop runs in real time on one controller.
            </p>
          </Section>
        </ProjectBody>
      </main>
      <Footer />
    </div>
  );
}
