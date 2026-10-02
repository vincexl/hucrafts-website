import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RenderVideo from '@/components/RenderVideo';
import { getProjectBySlug } from '@/lib/projects';
import { Figure, ProjectBody, ProjectFacts, ProjectHero, ProjectTitle, Section } from '@/components/project/ProjectPage';

export const metadata = { title: 'Robots Play Catch' };

const GRIPPER_STATES = [
  { src: '/images/robots-catch/gripper-catch.jpg', label: 'Catch', alt: 'Barrett Hand opened wide, waiting for the ball' },
  { src: '/images/robots-catch/gripper-gripped.jpg', label: 'Grasped', alt: 'Barrett Hand closed around the ball' },
  { src: '/images/robots-catch/gripper-release.jpg', label: 'Release', alt: 'Barrett Hand with the thumb released for the throw' },
];

export default function RobotsPlayCatch() {
  const project = getProjectBySlug('robots-play-catch')!;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ProjectHero
          src="/images/robots-catch/p-arm.png"
          fit="contain"
          alt="The F&P P-Arm 2R, a blue and gray six-axis collaborative robot arm"
        />
        <ProjectBody>
          <ProjectTitle
            project={project}
            lead={
              <p>
                Two six-axis robot arms in a CoppeliaSim scene throw a ball back and forth. One arm throws, the other
                catches, and then they swap roles and keep going.
              </p>
            }
            note="Cover: the F&P P-Arm 2R that both simulated arms are modeled on. Image from the F&P Robotics datasheet."
          />
          <ProjectFacts
            facts={[
              { label: 'Context', value: 'Course project, Kinematics & Dynamics of Robots (EN.535.630), Johns Hopkins' },
              { label: 'Timeline', value: 'Spring 2026' },
              { label: 'Team', value: 'Norman Chen-Liaw, James Englander, Xiaolei Hu' },
              { label: 'My part', value: 'Simulation scene, catching, inverse kinematics, final integration' },
            ]}
            tools={[
              { area: 'Simulation', items: 'CoppeliaSim, Lua scene scripts, simIK plugin' },
              { area: 'Kinematics', items: 'Denavit–Hartenberg model, analytical IK with kinematic decoupling, damped least squares' },
              { area: 'Software', items: 'Python, ZeroMQ Remote API, Git' },
              { area: 'Robots', items: 'F&P P-Arm (6-DOF), Barrett Hand gripper' },
            ]}
          />

          <Section title="Demo">
            <p>The final simulation: the arms trade throws, and the graph tracks the ball&apos;s x and z position.</p>
          </Section>
          <figure className="mt-6">
            <div className="overflow-hidden bg-ink">
              <RenderVideo
                src="/videos/robots-play-catch.mp4"
                poster="/images/robots-catch/demo-poster.jpg"
                className="w-full aspect-video object-contain"
              />
            </div>
            <figcaption className="mt-3 text-[15px] text-ink-mute">Recorded in CoppeliaSim Edu. Autoplays and loops.</figcaption>
          </figure>

          <Section title="Why catch is hard for robots">
            <p>
              Playing catch looks easy because people do it without thinking. For a robot it means three hard things at
              once: release the ball at exactly the right speed and direction, predict where it will come down, and
              have the other hand there and closed at the right moment.
            </p>
            <p>
              We set up two P-Arms facing each other in the same plane, with a ball between them. Mirroring the arms
              made the throw symmetric, so one solution works in both directions. The P-Arm has six revolute joints and
              no link offsets, which keeps the kinematics clean. It ships without a hand, so we fitted each arm with a
              Barrett Hand from CoppeliaSim&apos;s model library.
            </p>
          </Section>

          <Figure
            className="mt-8"
            src="/images/robots-catch/scene.jpg"
            alt="CoppeliaSim scene with two blue P-Arm robots, one mid-throw with the ball in the air, and a graph of ball position over time"
            caption="Mid-throw. The inset graph plots the ball's x and z position over time."
          />

          <Section title="One state machine, two roles">
            <p>
              Both arms run the same scripts. A shared state machine decides who is throwing and who is catching. The
              thrower moves to the start of its throwing path and follows it, letting go of the ball at the end. The
              catcher waits in position until the ball touches its palm, then closes its fingers. Then the roles flip.
            </p>
            <p>
              The hand changes its grip with its role. The catching grip is wide, to give the ball a large area to
              land in. The throwing grip puts the fingers behind the ball so the push goes in the direction of the
              throw, and the thumb lets go to release it.
            </p>
          </Section>

          <Figure
            className="mt-8"
            src="/images/robots-catch/state-machine.png"
            alt="State machine diagram: arm states Move to catch, Ball caught, and Throwing, linked to gripper states Waiting for ball, Ball detected, and Prepare throw"
            caption="Arm states (top) and gripper states (bottom). Each arm change waits on the gripper."
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {GRIPPER_STATES.map((g) => (
              <Figure key={g.label} src={g.src} alt={g.alt} caption={g.label} />
            ))}
          </div>

          <Section title="Throwing along an arc">
            <p>
              A throw is set by where the ball leaves the hand, where it should land, and the launch angle. From those
              we worked out the speed and direction the ball needs at release.
            </p>
            <p>
              Because the P-Arm only has rotating joints, the natural throwing motion is an arc that ends at the
              release point. We held the hand at a constant speed along the arc, equal to the launch speed, and tuned
              the arc&apos;s radius in simulation. Splitting the arc into points gives the positions the hand has to
              pass through. Inverse kinematics turns each point into joint angles.
            </p>
          </Section>

          <Section title="Solving the arm">
            <p>
              My part of the math was the inverse kinematics: given where the hand needs to be, find the six joint
              angles. I modeled the P-Arm with Denavit–Hartenberg parameters. Its first three joints work like an
              elbow, and its last three meet at a single point, a spherical wrist. That split the problem in two.
              First I found the wrist center by stepping back from the hand along its axis, and solved the first three
              joints from that point with plane geometry. Then the last three joints came from the rotation left
              between the forearm and the hand.
            </p>
            <p>
              The solver gave correct angles on its own. But when we drove the scene from Python over CoppeliaSim&apos;s
              remote connection, the hand landed slightly off target. Small differences between my frames and the
              scene&apos;s frames added up, and the connection&apos;s lag made the time steps unreliable. Catching
              depends on exact timing, so that was not good enough.
            </p>
            <p>
              We moved the control into Lua scripts that run inside the scene, used a finer simulation time step, and
              switched the arm motion to CoppeliaSim&apos;s built-in IK solver, which works directly on the simulated
              joints. My solver stayed as the reference for the arm&apos;s geometry; the built-in solver did the work
              during the run.
            </p>
          </Section>

          <Figure
            className="mt-8 max-w-md"
            src="/images/robots-catch/dh-model.jpg"
            alt="Hand-drawn Denavit–Hartenberg diagram of the P-Arm's joint frames beside the simulated arm with its frames highlighted"
            caption="The DH frame assignment for the P-Arm, next to the simulated arm."
          />

          <Section title="What I would do next">
            <p>
              The catcher picks its catch point before the throw and never adjusts it. When a throw drifts, the ball
              misses. The next step is to track the ball in flight with the projectile equations and keep moving the
              catch point while the ball is in the air.
            </p>
          </Section>
        </ProjectBody>
      </main>
      <Footer />
    </div>
  );
}
