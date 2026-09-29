import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProjectBySlug } from '@/lib/projects';

export const metadata = { title: 'Wine Tasting Wristband' };

function Figure({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string;
  alt: string;
  caption: ReactNode;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
        <img src={src} alt={alt} className="w-full object-contain" loading="lazy" />
      </div>
      <figcaption className="mt-2 text-sm text-zinc-600">{caption}</figcaption>
    </figure>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-4 text-zinc-700 leading-relaxed max-w-prose">{children}</div>
    </section>
  );
}

const HARDWARE = [
  { part: 'MPU6050 6-axis IMU', where: 'Wristband', link: 'I²C0 (GP8 / GP9)', rate: '50 Hz' },
  { part: 'NTC thermistor, 10 kΩ', where: 'Wristband, against the skin', link: 'ADC0 (GP26)', rate: '10 Hz' },
  { part: 'Capacitive touch pad', where: 'Wristband, top face', link: 'Digital in (GP16)', rate: 'Event' },
  { part: 'Vibration motor', where: 'Wristband', link: 'PWM (GP15)', rate: 'Output' },
  { part: 'MAX4466 microphone', where: 'Hub', link: 'ADC1 (GP27)', rate: '16 kHz' },
  { part: 'PPG pulse sensor', where: 'Hub', link: 'ADC2 (GP28)', rate: '100 Hz' },
  { part: 'PN532 NFC reader', where: 'Hub, under the glass pocket', link: 'I²C1 (GP2 / GP3)', rate: 'Event' },
];

const RESULTS = [
  { value: '15 / 15', label: 'sniffs confirmed' },
  { value: '15 / 15', label: 'sips confirmed' },
  { value: '11 / 15', label: 'swirls confirmed' },
  { value: '1.5 s', label: 'median prompt-to-confirm' },
  { value: '2.5 s', label: 'worst case' },
  { value: '1.0 %', label: 'false positives on confounders' },
];

export default function WineTastingWristband() {
  const project = getProjectBySlug('wine-tasting-wristband')!;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 mb-6 group rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" aria-hidden />
          All projects
        </Link>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-1 text-zinc-600">{project.category}</span>
          {project.tags.map((t) => (
            <span key={t} className="inline-flex items-center rounded-full bg-amber-100 text-amber-900 px-2 py-1">{t}</span>
          ))}
        </div>
        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">{project.title}</h1>
        <p className="mt-3 text-lg text-zinc-600 max-w-prose">
          A wristband that talks you through a wine tasting, checks from your wrist motion that you actually
          swirled, sniffed, and sipped, and stamps every sensor reading with the moment each step happened.
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          Final project, EN.665.681 Application of Sensing Systems, Johns Hopkins University, Summer 2026
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <Figure
            src="/images/wine-tasting/wristband.jpg"
            alt="Blue 3D-printed wristband housing strapped to a forearm with a velcro band, a capacitive touch module on top, and a tether cable leaving the end"
            caption="The wristband: a 3D-printed housing on a velcro strap, touch pad on top, one tether cable out the end."
          />
          <Figure
            src="/images/wine-tasting/hub-glass.jpg"
            alt="Wine glass seated in a circular pocket on the lid of a white 3D-printed hub, with the red NFC reader board visible beneath the glass"
            caption="The hub: a 3D-printed enclosure around the Pico 2 W. The glass sits in a pocket directly over the NFC reader."
          />
        </div>

        <Section title="The problem">
          <p>
            Food scientists can read how much someone likes what they taste from their body: skin temperature,
            skin conductance, heart rate, the voice. But these measurements only mean something inside a short
            window, two to three seconds, starting at the exact moment the sample enters the mouth. A few
            seconds late and you are measuring chewing instead.
          </p>
          <p>
            In every study I reviewed, that moment came from an experimenter in a lab booth who handed over the
            sample and knew when it happened. Nobody drinks wine in a booth. Take the experimenter away and the
            method has nothing to line its window up against.
          </p>
          <p>
            My approach: let the device play the experimenter. It tells you what to do next (swirl, sniff, sip),
            watches your wrist until it sees you do it, and only then moves on. The instant it confirms the
            gesture becomes the start of the measurement window. If it never sees the gesture, it waits and
            asks again instead of logging a wrong sample.
          </p>
        </Section>

        <Section title="Where the mechanical design meets the electronics">
          <p>
            I split the hardware by what each part has to do on the table. The wristband only carries what has
            to be on the wrist: the IMU, a thermistor pressed against the skin, a capacitive touch pad to start
            a session, and a vibration motor for prompts. It has no processor. All of its signals run back to
            the hub over one CAT6 cable, which gives me eight conductors in a single flexible tether.
          </p>
          <p>
            The hub holds everything that works better sitting still: a Raspberry Pi Pico 2 W, the microphone,
            the pulse sensor, and the NFC reader. The lid has a circular pocket for the glass, with the NFC
            reader directly underneath. Setting the tagged glass down in the pocket is what identifies
            the wine. I designed it that way on purpose: reading the wine is a placement, not a hand motion, so
            it can never be confused with the gestures the classifier is watching for.
          </p>
          <p>
            The housing design fed straight back into the software. Midway through the project I remounted the
            IMU while fitting it into the enclosure, and the trained model stopped confirming gestures
            immediately. The features that separate a sip from a sniff depend on how the sensor sits on the
            wrist, so a change in the mount is a change in the data. I recollected and retrained in the final
            mounting orientation, and every result below comes from that orientation.
          </p>

          <div className="not-prose overflow-x-auto rounded-2xl ring-1 ring-black/5 bg-white">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left text-zinc-600">
                <tr>
                  <th className="px-4 py-2 font-semibold">Sensor / actuator</th>
                  <th className="px-4 py-2 font-semibold">Location</th>
                  <th className="px-4 py-2 font-semibold">Interface</th>
                  <th className="px-4 py-2 font-semibold">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {HARDWARE.map((h) => (
                  <tr key={h.part}>
                    <td className="px-4 py-2 font-medium text-zinc-900">{h.part}</td>
                    <td className="px-4 py-2">{h.where}</td>
                    <td className="px-4 py-2 font-mono text-xs">{h.link}</td>
                    <td className="px-4 py-2">{h.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Four sample rates on one small chip">
          <p>
            The Pico samples four channels at once, at rates that differ by more than a thousand times: audio at
            16 kHz, pulse at 100 Hz, motion at 50 Hz, and skin temperature at 10 Hz. Audio sets the hardest
            limit. At 16 kHz a late sample is not just late, it is a hole in the waveform.
          </p>
          <p>
            So I gave audio a core of its own. The second core does nothing but capture sound in a tight timing
            loop. The first core runs everything else as cooperative tasks: the IMU, pulse, and temperature
            readers, the USB link to the PC, and a small Wi-Fi dashboard. Under full load the slower channels
            held 87 to 98 percent of their target rates. Audio reached about half its nominal rate, so each
            recording is stamped with the rate actually measured rather than the one requested.
          </p>
        </Section>
        <Figure
          className="mt-6"
          src="/images/wine-tasting/core-split.png"
          alt="Timeline showing Core 1 running continuous 16 kHz audio capture while Core 0 interleaves USB sending, IMU, pulse, temperature, and event-driven dashboard tasks"
          caption="Dual-core split. Core 1 captures audio without pausing; Core 0 interleaves every other task, so USB and Wi-Fi traffic never open a gap in the audio."
        />

        <Section title="Cleaning the signals on the device">
          <p>
            Every channel leaves the device already in physical units, so the PC never has to guess what a raw
            count meant.
          </p>
          <p>
            <strong className="text-zinc-900">Pulse to beats per minute.</strong> The pulse sensor is an optical
            sensor (a photoplethysmograph): its output is a wavy ADC signal whose peaks are heartbeats, riding on
            a slowly drifting baseline. Two moving averages pull them apart. A fast one (α = 0.3) follows the
            waveform, a slow one (α = 0.01) follows the drift, and their difference is the pulse alone. A beat
            counts when that difference crosses a threshold set at half the recent peak height, with a floor
            above the noise I measured with no finger on the sensor. Each heartbeat also has a smaller second
            bump about half a second later. I measured it at 460 to 550 ms, so the detector ignores any crossing
            within 500 ms of the last beat. The reported rate is the median of the last five beat-to-beat
            intervals, and an interval roughly double the median (a missed beat) is kept out of it.
          </p>
          <p>
            <strong className="text-zinc-900">Thermistor to degrees.</strong> The thermistor sits in a voltage
            divider. The firmware converts the ADC reading to resistance and then to temperature with the
            β-form of the Steinhart–Hart equation (β = 3950). The cable adds brief contact-resistance spikes, so
            a five-sample median filter removes them at the cost of about 0.2 s of lag.
          </p>
          <p>
            <strong className="text-zinc-900">Motion to features.</strong> The IMU stream is cut into one-second
            windows that overlap by half. A ten-second still period at the start of each session measures the
            gyroscope&apos;s zero offset and the direction of gravity. From each window the model gets 24
            features: how often the gyroscope crosses zero (a swirl is periodic), peak acceleration (a sip has a
            lift), wrist pitch and roll (a sniff tilts less than a sip), and rotation measured around the
            gravity axis, which describes a swirl however the band happens to sit.
          </p>
        </Section>
        <Figure
          className="mt-6"
          src="/images/wine-tasting/gesture-traces.png"
          alt="Grid of wrist-IMU traces for swirl, sniff, sip, and negative examples showing gyro Z, acceleration magnitude, and wrist pitch over time"
          caption="Real wrist traces. The swirl is a clean oscillation; sniff and sip both start with a lift and differ mostly in how far the wrist tips; the confounders (NEG) look like neither."
        />

        <Section title="Prompt, verify, advance">
          <p>
            A session goes: touch the pad, sit still for a resting baseline, set the glass on the hub, then swirl,
            sniff, sip, and answer three spoken questions about the wine. Each motion step follows the same loop.
            The device buzzes and speaks the instruction, the classifier watches one-second windows, and the step
            only counts when two windows in a row agree. That confirmation is logged to the millisecond as the
            start time for every other channel.
          </p>
          <p>
            Two different detectors can confirm a step: a random forest on the PC and a set of hand-tuned rules
            on the Pico. The PC also runs speech recognition (Whisper), a neural voice for the prompts, and a
            local language model for the conversation, with nothing sent to the cloud. The step instructions
            themselves are fixed text, not generated, because the part of the system that must never drift
            should not depend on the part that can.
          </p>
        </Section>
        <Figure
          className="mt-6"
          src="/images/wine-tasting/control-loop.png"
          alt="Control loop diagram: prescribed step, prompt by haptic and speech, wearer, IMU at 50 Hz, classifier, verification by two agreeing windows, then advance state and log anchor t equals zero, with a wait path back to the wearer"
          caption="The guidance loop. If verification never comes, the loop waits and re-prompts rather than advancing."
        />

        <Section title="Results">
          <p>
            I trained on 1,026 labeled windows from 122 gesture instances. The recording firmware paced itself
            with haptic cues, so each label boundary is the exact moment the device asked, not a person&apos;s
            reaction time. Besides the three gestures and rest, I recorded a set of deliberate confounders:
            reaching for the glass, setting it down, and talking with my hands. Cross-validation folds were split
            by gesture instance, so overlapping windows from the same gesture never end up on both sides.
          </p>
        </Section>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {RESULTS.map((r) => (
            <div key={r.label} className="rounded-2xl bg-white p-4 ring-1 ring-black/5 shadow-sm">
              <div className="text-2xl font-extrabold tracking-tight text-zinc-900">{r.value}</div>
              <div className="mt-1 text-sm text-zinc-600">{r.label}</div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-zinc-600 max-w-prose">
          Prompted detection, measured on held-out gestures with the same two-window rule the device uses. Every
          confirmation falls inside the 2–3 s windows the physiology methods need.
        </p>

        <Figure
          className="mt-8"
          src="/images/wine-tasting/confusion-matrix.png"
          alt="Two row-normalized confusion matrices comparing the on-device rule-based classifier and the random forest across swirl, sniff, sip, rest, and negative classes"
          caption="The random forest (right) reaches 0.66 accuracy and 0.69 macro F1, against 0.42 / 0.35 for the on-device rules (left). Sniff and sip reach 93 % recall; rest holds only 49 %."
        />

        <div className="mt-6 space-y-4 text-zinc-700 leading-relaxed max-w-prose">
          <p>
            That rest row shaped the whole design. The model is good at telling you which gesture a window looks
            most like, and poor at telling you nothing is happening. When I replayed a full recording through
            the model continuously, it claimed a gesture during 69 % of the quiet time, and no confidence
            threshold fixed it. Asking for one specific gesture and waiting for it turns an open question the
            features cannot answer into a yes-or-no question they answer well.
          </p>
          <p>
            End to end, I ran two complete guided sessions. Every motion step was confirmed from the wrist alone,
            the two detectors agreed on all six confirmations, and each session produced a millisecond event log
            that ties every sample on every channel to a named step of the tasting.
          </p>
        </div>

        <Section title="Demo">
          <p>
            A full session recorded from the live dashboard, with the spoken prompts audible. The dashboard shows
            the current step, live motion readings, pulse, skin temperature, and the wine read from the tag.
          </p>
        </Section>
        <figure className="mt-6">
          <div className="rounded-2xl overflow-hidden bg-zinc-950 shadow-xl ring-1 ring-black/5">
            <video
              src="/videos/wine-tasting-demo.mp4"
              poster="/images/wine-tasting/demo-poster.jpg"
              controls
              playsInline
              preload="metadata"
              className="w-full max-h-[80vh] object-contain"
            />
          </div>
          <figcaption className="mt-2 text-sm text-zinc-600">
            One complete tasting, about five minutes. Turn the sound on to hear the prompts.
          </figcaption>
        </figure>
        <Figure
          className="mt-8"
          src="/images/wine-tasting/dashboard.png"
          alt="Wine Tasting Wristband web dashboard showing the current instruction, skin temperature, pulse rate, and six IMU readings"
          caption="The Wi-Fi dashboard served by the Pico during the baseline step."
        />

        <Section title="What is still open">
          <p>
            All gesture data comes from one wearer, so these numbers describe the pipeline, not how it would do
            across many people. The pulse and skin-temperature calibrations are single-point corrections against
            my own readings and need a proper calibration before the values mean anything absolute. Predicting
            whether someone likes a wine was out of scope; the device logs the data for that as a byproduct, and
            a real preference study would need many more tasters.
          </p>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
