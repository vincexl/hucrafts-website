// Logos are the companies' own trademarks, shown to indicate prior employment.
// Each needs its own height: the wordmarks have very different aspect ratios
// (Myriad 6.5:1, Mainspring 6.4:1, Kinnos 2.8:1), so a single uniform height
// would make the squarer mark tower over the wide ones. Tuned by eye.
// width/height are the files' intrinsic sizes — they give the browser the aspect
// ratio so the row reserves its space and doesn't shift as the logos arrive.
const COMPANIES = [
  { name: 'Myriad Genetics', src: '/images/logos/myriad-genetics.svg', width: 888, height: 136, className: 'h-7 sm:h-8' },
  { name: 'Mainspring Energy', src: '/images/logos/mainspring-energy.svg', width: 236, height: 37, className: 'h-6 sm:h-7' },
  { name: 'Kinnos', src: '/images/logos/kinnos.svg', width: 772, height: 275, className: 'h-10 sm:h-12' },
];

export default function CompanyLogos() {
  return (
    <section aria-labelledby="experience-heading" className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 py-20 sm:py-24">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between border-y border-rule py-10">
        <h2 id="experience-heading" className="font-display font-wide text-2xl sm:text-[1.75rem] font-extrabold leading-tight tracking-[-0.025em] text-ink lg:w-56 shrink-0">
          Where I&rsquo;ve worked
        </h2>
        <ul className="flex flex-1 flex-wrap items-center gap-x-14 gap-y-8 lg:justify-around">
          {COMPANIES.map((company) => (
            <li key={company.name}>
              <img
                src={company.src}
                alt={company.name}
                width={company.width}
                height={company.height}
                className={`${company.className} w-auto grayscale contrast-125 opacity-80 transition-[filter,opacity] duration-200 hover:grayscale-0 hover:opacity-100 motion-reduce:transition-none`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
