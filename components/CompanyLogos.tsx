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
    <section aria-labelledby="experience-heading" className="pb-4 sm:pb-8">
      <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-8 sm:px-10">
        <h2
          id="experience-heading"
          className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500"
        >
          Where I&rsquo;ve worked
        </h2>
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
          {COMPANIES.map((company) => (
            <li key={company.name}>
              <img
                src={company.src}
                alt={company.name}
                width={company.width}
                height={company.height}
                className={`${company.className} w-auto opacity-80 transition-opacity duration-200 hover:opacity-100 motion-reduce:transition-none`}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
