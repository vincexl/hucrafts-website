import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProjectBySlug } from '@/lib/projects';
import { ProjectBody, ProjectFacts, ProjectHero, ProjectTitle, Section } from '@/components/project/ProjectPage';

export const metadata = { title: 'Engineering Database Modernization & Arena PLM Rollout' };

const WORKFLOWS = [
  {
    name: 'PDM',
    full: 'Product data management',
    before: 'Part numbers, revisions, and CAD files kept in SharePoint lists and a numbered folder tree, each updated by hand.',
    after: 'Every part is an Arena item with one part number, a revision history, its CAD files, and the BOMs it belongs to.',
  },
  {
    name: 'ECO',
    full: 'Engineering change orders',
    before: 'A new revision meant a new folder, and someone had to remember every list that pointed at the old one.',
    after: 'A change order lists the affected items and routes to design, quality, and production for sign-off before the new revision is released.',
  },
  {
    name: 'Sourcing',
    full: 'Manufacturers and suppliers',
    before: 'The same company appeared under several spellings, sometimes as a manufacturer in one place and a vendor in another.',
    after: 'Each item carries its manufacturer and supplier part numbers, pulled from one shared list of companies.',
  },
];

// Real alias groups from the cleanup notebook: each row became one company name.
const ALIASES = [
  ['Digi-Key', 'DigiKey', 'Digikey'],
  ['Automation Direct', 'Automation direct', 'AutomationDirect'],
  ['Compass', 'Compass ', 'Copasss'],
  ['3D Print', '3d print', '3D Printer', 'None - 3D print only'],
];

const PIPELINE = [
  {
    step: 'Gather',
    what: 'Load the full SharePoint item export (3,856 rows, 55 columns) into one Pandas table and measure how much of each column was empty.',
  },
  {
    step: 'Standardize',
    what: 'Collapse every spelling of a company into one name, fix part numbers typed into the wrong column, and normalize case and spacing.',
  },
  {
    step: 'Enrich',
    what: 'Look up McMaster-Carr part numbers on McMaster’s site with a headless browser to replace vague names like “bracket” with the catalog name, and flag discontinued parts with their replacements.',
  },
  {
    step: 'Consolidate',
    what: 'Where several rows described the same part, keep the most complete one. 3,856 rows became 1,577 unique items.',
  },
  {
    step: 'Label',
    what: 'Copy categories over from an earlier labeled export by matching part numbers, then let a Naive Bayes classifier label the rest.',
  },
  {
    step: 'Rebuild BOMs',
    what: 'In a second notebook, match every line of the master BOM back to the clean item list, so each BOM points at a part that exists.',
  },
  {
    step: 'Export',
    what: 'Write the clean item list and BOM list as CSV files laid out for Arena’s import.',
  },
];

const CATEGORIES = [
  { name: 'Mechanical', count: 711 },
  { name: 'Electrical', count: 343 },
  { name: 'Plumbing', count: 222 },
  { name: 'Assembly', count: 218 },
  { name: 'Instruments', count: 74 },
  { name: 'Software', count: 6 },
];

function Bar({ label, value, max, note }: { label: string; value: number; max: number; note?: string }) {
  return (
    <div className="grid grid-cols-[7.5rem_1fr] items-center gap-4 sm:grid-cols-[9rem_1fr]">
      <span className="text-[15px] text-ink-soft">{label}</span>
      <span className="flex items-center gap-3">
        <span className="block h-6 bg-ink" style={{ width: `${(value / max) * 85}%` }} aria-hidden />
        <span className="shrink-0 font-mono text-sm text-ink">
          {value.toLocaleString('en-US')}
          {note && <span className="text-ink-mute"> {note}</span>}
        </span>
      </span>
    </div>
  );
}

export default function ArenaPlmImplementation() {
  const project = getProjectBySlug('arena-plm-implementation')!;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <ProjectHero
          src="/images/arena-plm/cover.svg"
          fit="contain"
          alt="Diagram of the migration pipeline: 3,856 rows of SharePoint part data are cleaned in Jupyter with Pandas, labeled by a Naive Bayes classifier, rebuilt into BOMs against the clean item list, and imported into Arena PLM as 1,577 unique items with BOMs, ECOs, sourcing, and CAD files"
        />
        <ProjectBody>
          <ProjectTitle
            project={project}
            lead={
              <p>
                Years of part records lived in SharePoint, in lists and spreadsheets that never quite agreed with each
                other. I cleaned 3,856 rows of them down to 1,577 real parts with a pair of Jupyter notebooks, moved
                them into Arena PLM, and set up the release process that design, quality, and production now share.
              </p>
            }
          />
          <ProjectFacts
            facts={[
              { label: 'Where', value: 'Myriad Genetics, Hardware Automation' },
              { label: 'Scale', value: '3,856 rows in, 1,577 unique items out' },
              { label: 'Result', value: 'Weeks of manual entry cut to minutes per run' },
            ]}
            tools={[
              { area: 'PLM', items: 'Arena PLM: items, BOMs, change orders (ECOs), sourcing, spreadsheet import' },
              { area: 'Data', items: 'Python, Jupyter, Pandas, scikit-learn (multinomial Naive Bayes), Selenium, Matplotlib, VBA' },
              { area: 'CAD', items: 'SOLIDWORKS, Onshape' },
              { area: 'Rollout', items: 'Workflow design, numbering and naming rules, user training' },
            ]}
          />

          <Section title="Many copies of the truth">
            <p>
              Ask three people for the current revision of a bracket, and you could get three answers. Part data lived
              in SharePoint lists, in hundreds of BOM spreadsheets, and in a folder tree with one folder per product and
              revision. None of it was linked. When a part changed, someone had to remember every place it appeared.
            </p>
            <p>
              When I exported everything into one table, the drift was easy to measure. The export had 3,856 rows, but
              many were the same part entered more than once. 42% of rows had no manufacturer and 66% had no
              manufacturer part number. Company names came in every spelling people had ever typed:
            </p>
          </Section>
          <ul className="mt-6 max-w-[44rem] divide-y divide-rule border-y border-rule">
            {ALIASES.map((group) => (
              <li key={group[0]} className="flex flex-wrap gap-2 py-3">
                {group.map((a) => (
                  <span key={a} className="bg-well px-2 py-0.5 font-mono text-sm text-ink">
                    &lsquo;{a}&rsquo;
                  </span>
                ))}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[15px] text-ink-mute">
            Real alias groups from the cleanup notebook (one has a trailing space). Each row became a single company name.
          </p>
          <div className="mt-6 max-w-[68ch] text-[17px] leading-relaxed text-ink-soft">
            <p>
              The department chose Arena PLM to fix that: one cloud system where every part, assembly, change, and
              supplier lives once. The catch was getting the records into it clean.
            </p>
          </div>

          <Section title="What moved, and where it landed">
            <p>
              A PLM system holds more than a parts list. Arena ties together the three jobs below, which used to live
              in separate files.
            </p>
          </Section>
          <dl className="mt-8 border-t border-ink">
            {WORKFLOWS.map((w) => (
              <div key={w.name} className="grid gap-3 border-b border-rule py-6 lg:grid-cols-[12rem_1fr_1fr] lg:gap-8">
                <dt>
                  <span className="font-display font-wide text-xl font-extrabold tracking-[-0.01em] text-ink">{w.name}</span>
                  <span className="block text-sm text-ink-mute">{w.full}</span>
                </dt>
                <dd className="text-[17px] leading-relaxed text-ink-soft">
                  <span className="block text-sm text-ink-mute">Before, in SharePoint</span>
                  {w.before}
                </dd>
                <dd className="text-[17px] leading-relaxed text-ink">
                  <span className="block text-sm text-ink-mute">After, in Arena</span>
                  {w.after}
                </dd>
              </div>
            ))}
          </dl>

          <Section title="Weeks by hand, minutes by script">
            <p>
              Arena imports items and BOMs from spreadsheets, but only clean ones: one row per part, consistent
              columns, and every BOM line pointing at a part that exists. Fixing thousands of rows into that shape by
              hand would have taken weeks, and the source data kept changing while I worked.
            </p>
            <p>
              So I wrote the cleanup as code in two Jupyter notebooks, one for the item list and one for the BOMs.
              Every fix is a line I can read and rerun. When a new export came out of SharePoint, a full run from raw
              export to import-ready files took minutes.
            </p>
          </Section>
          <ol className="mt-8 border-t border-ink">
            {PIPELINE.map((p, i) => (
              <li key={p.step} className="grid gap-2 border-b border-rule py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-sm text-ink-mute">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display font-wide text-xl font-extrabold tracking-[-0.01em] text-ink">{p.step}</span>
                </span>
                <span className="text-[17px] leading-relaxed text-ink-soft">{p.what}</span>
              </li>
            ))}
          </ol>
          <figure className="mt-10 max-w-[44rem]">
            <div className="space-y-3">
              <Bar label="Raw export" value={3856} max={3856} note="rows" />
              <Bar label="After cleanup" value={1577} max={3856} note="unique items" />
            </div>
            <figcaption className="mt-4 text-[15px] text-ink-mute">
              The same parts, before and after consolidation. Most of the difference is duplicate entries of one part.
            </figcaption>
          </figure>

          <Section title="Letting a model fill in the blanks">
            <p>
              Arena sorts every item into a category: mechanical, electrical, plumbing, and so on. Most old records had
              no category at all. I started with the easy ones. An earlier export already had categories for many
              parts, so I copied those over wherever the part numbers matched.
            </p>
            <p>
              That left 488 McMaster-Carr parts with no match anywhere. But their names and descriptions already
              hinted at the answer. A part called &ldquo;socket head screw&rdquo; from McMaster is probably
              mechanical; one with &ldquo;terminal block&rdquo; or &ldquo;AWG&rdquo; is probably electrical. A
              Naive Bayes classifier learns exactly that. It counts how often each word appears in each category across
              the labeled parts, then scores a new part against every category and picks the best fit. I fed it the
              item name, description, manufacturer, and vendor.
            </p>
            <p>
              It is one of the simplest models in machine learning, and that suited the job. It trains in seconds on a
              couple of thousand rows, and you can see which words drove each guess. On 10% of the labeled parts that I
              held back from training, it picked the right category 85% of the time (weighted F1 score 0.85). Most of
              its misses mixed up assemblies and mechanical parts, which share a lot of vocabulary. For a top-level
              field on 488 parts, that traded a little accuracy for a lot of time.
            </p>
          </Section>
          <figure className="mt-8 max-w-[44rem]">
            <div className="space-y-3">
              {CATEGORIES.map((c) => (
                <Bar key={c.name} label={c.name} value={c.count} max={CATEGORIES[0].count} />
              ))}
            </div>
            <figcaption className="mt-4 text-[15px] text-ink-mute">
              Items per category in the final clean list, after matching and classification.
            </figcaption>
          </figure>

          <Section title="One release path for everyone">
            <p>
              Moving the data was half the job. The other half was keeping it clean. With the records in Arena, I set
              up the release workflow around change orders. A designer opens an ECO that lists the parts and drawings
              being changed. Quality and production each review it and sign off. Only then is the new revision
              released, and everyone who opens that part sees the same version.
            </p>
            <p>
              Alongside the workflow came the rules that keep drift from creeping back: a numbering scheme, naming
              conventions, and one shared list of manufacturers and suppliers, so &ldquo;Digikey&rdquo; can&apos;t
              sneak back in. I trained the engineers who use Arena day to day, so the new process was the easy path
              rather than one more thing to remember.
            </p>
            <p>
              This project is also where I started treating scripts as the main tool for engineering admin work. I
              wrote more about that in{' '}
              <Link
                href="/blog/cad-claude-code-01-why-this-series"
                className="text-ink underline decoration-ink decoration-2 underline-offset-[5px] hover:text-ink-soft"
              >
                the first post of my CAD &times; Claude Code series
              </Link>
              .
            </p>
          </Section>
        </ProjectBody>
      </main>
      <Footer />
    </div>
  );
}
