# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring managers and engineering leads evaluating Vincent (Xiaolei) Hu for automation, controls, and robotics engineering roles. They arrive from a resume, LinkedIn, or an application, skim for a minute or two, and decide whether his shipped work matches the role. They want to see real machines and systems he built, what he was responsible for, and the tools he used.

Secondary: readers of his "CAD × Claude Code" blog series, colleagues, and friends who come for HuCrafts events (the Mini Bake Off) and the product-management knowledge shares. These stay on the site but are not what the homepage leads with.

## Product Purpose

A personal engineering portfolio under the HuCrafts name. Success is a hiring manager leaving with a clear picture of who Vincent is (an automation, controls & robotics engineer), what he has built, and an easy way to read the resume or get in touch.

## Positioning

Six-plus years of shipped, physical automation: PLC-controlled machines, precision motion, lab workcells, electromechanical products, plus the Python and data tooling around them. The work spans mechanical design through controls code, owned end to end. Current M.S. in Robotics & Autonomous Systems at Johns Hopkins.

## Operating Context

- Visitors usually open the site after seeing the resume, so it complements the PDF rather than repeating it.
- Each project has (or will have) its own page; the homepage routes into them.
- The resume PDF is hosted at `/files/Xiaolei_Hu_Resume.pdf`.
- Contact goes through the site's contact form (`app/api/contact`) and email.

## Capabilities and Constraints

- Next.js 14 App Router, TypeScript, Tailwind; deployed on Vercel from `main`.
- Project data lives in `lib/projects.ts`; blog posts are markdown in `content/blog/`.
- Redesign scope (confirmed): homepage plus a shared template for every project page. Blog, bake-off polls, and PM course pages keep working and stay reachable but are out of scope for this redesign.
- Undecided: what happens to projects that have no page and only stock images (ODTC thermal cycler UI). The Arena PLM migration now has a page with a diagram cover instead of a stock image.

## Brand Commitments

- Name: HuCrafts; wordmark logo at `public/images/hucrafts-logo.png`.
- Personal identity: Vincent (Xiaolei) Hu, Automation, Controls & Robotics Engineer, San Francisco.
- Layout reference the user chose: https://www.tayavoronko.com/ (quiet text nav, split portrait hero with a large greeting, full-width image grid of projects with titles on hover, employer logo strip, centered footer; project pages with a full-bleed hero image, Overview, Role / Timeline, Tools + Skills).

## Evidence on Hand

- Resume: `public/files/Xiaolei_Hu_Resume.pdf` (experience at Mainspring Energy, Myriad Genetics, Kinnos; JHU M.S. Robotics, GPA 4.0; Cooper Union B.E. Mechanical; CSWE certification).
- Employer logos: `public/images/logos/` (Myriad Genetics, Mainspring Energy, Kinnos).
- SkySlide: annotated CAD cover, carrier CAD, tower photo, demo video (`public/images/skyslide/`, `public/videos/skyslide-demo.mp4`).
- Wine Tasting Wristband: CAD renders, photos, plots, demo video (`public/images/wine-tasting/`).
- Fortune Cookie Render: render image and video.
- Mini Bake Off: event photos (`public/images/bakeoff/`).
- Blog: four CAD × Claude Code posts with images and videos.
- Portrait: the user will provide a photo for the hero; until then a placeholder stands in. Do not fabricate one.
- Absent: testimonials, press, metrics beyond those stated in project pages and the resume. Do not invent any.

## Product Principles

1. Show the machine. Real CAD, photos, and video of shipped work carry the argument; stock imagery does not belong next to it.
2. Engineer first. The homepage reads as an engineer's portfolio; studio, events, and teaching content are a secondary thread.
3. Every claim traces to a source: a project page, the resume, or a document the user supplied.
4. Get a busy reader to the resume or a project page in one click.
