// Logos are the organizations' own trademarks, shown to indicate prior employment
// and education. Each needs its own height: the marks have very different aspect
// ratios (Myriad 6.5:1, Mainspring 6.4:1, JHU 5.8:1, Kinnos 2.8:1, Cooper Union
// 0.7:1), so a single uniform height would make the squarer marks tower over the
// wide ones. Tuned by eye.
// width/height are the files' intrinsic sizes — they give the browser the aspect
// ratio so the row reserves its space and doesn't shift as the logos arrive.
type Logo = { name: string; src: string; width: number; height: number; className: string };

const COMPANIES: Logo[] = [
  { name: 'Myriad Genetics', src: '/images/logos/myriad-genetics.svg', width: 888, height: 136, className: 'h-7 sm:h-8' },
  { name: 'Mainspring Energy', src: '/images/logos/mainspring-energy.svg', width: 236, height: 37, className: 'h-6 sm:h-7' },
  { name: 'Kinnos', src: '/images/logos/kinnos.svg', width: 772, height: 275, className: 'h-10 sm:h-12' },
];

const SCHOOLS: Logo[] = [
  { name: 'Johns Hopkins University', src: '/images/logos/johns-hopkins.svg', width: 375, height: 65, className: 'h-10 sm:h-12' },
  { name: 'The Cooper Union', src: '/images/logos/cooper-union.svg', width: 448, height: 644, className: 'h-24 sm:h-28' },
];

function LogoRow({ id, heading, logos }: { id: string; heading: string; logos: Logo[] }) {
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between py-10">
      <h2 id={id} className="font-display font-wide text-2xl sm:text-[1.75rem] font-extrabold leading-tight tracking-[-0.025em] text-ink lg:w-56 shrink-0">
        {heading}
      </h2>
      <ul className="flex flex-1 flex-wrap items-center gap-x-14 gap-y-8 lg:justify-around">
        {logos.map((logo) => (
          <li key={logo.name}>
            <img
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className={`${logo.className} w-auto grayscale contrast-125 opacity-80 transition-[filter,opacity] duration-200 hover:grayscale-0 hover:opacity-100 motion-reduce:transition-none`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CompanyLogos() {
  return (
    <section aria-labelledby="experience-heading education-heading" className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-20 sm:py-24">
      <div className="divide-y divide-rule border-y border-rule">
        <LogoRow id="experience-heading" heading="Where I’ve worked" logos={COMPANIES} />
        <LogoRow id="education-heading" heading="Where I studied" logos={SCHOOLS} />
      </div>
    </section>
  );
}
