---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/projects/skyslide-automated-dna-sample-shuttle/page.tsx","app/projects/wine-tasting-wristband/page.tsx","app/projects/fortune-cookie-render/page.tsx"]
---

# Surface: homepage + project page template

Scope: homepage (`app/page.tsx`) and the shared project-page template (SkySlide, Wine Tasting Wristband, Fortune Cookie Render). Visitor mode: Experience. Audience: hiring managers for automation, controls & robotics roles. Action: open a project or the resume. Layout skeleton pinned by the user: tayavoronko.com (text nav, split portrait hero, full-width image grid with hover titles, logo strip, centered footer; project pages with full-bleed hero, Overview, Role / Timeline, Tools + Skills). Guardrails: must not read as a copy of the reference; robotics must be emphasized. Portrait pending from the user (placeholder until then). Arena PLM and ODTC tiles wait on user images.

## Direction contract

THESIS: A robotics engineer's portfolio drawn the way a robot sees its world: every subject owns a coordinate frame (red X, green Y, blue Z) in one transform tree rooted at `world`. Refuses the generic white image-grid portfolio and the dark neon "tech" page.

OWN-WORLD: Neutral light ground #f7f7f5, ink #111315, hairline rules #d9dad6. Axis red #e5322d, green #2bb24c, blue #2f6bff used only as frame triads; blue doubles as the frame-selection state (focus ring, text selection), never as decoration or hover color. Archivo (expanded width, heavy) for display, Archivo for text, Geist Mono only for real frame names and coordinates. Square corners, 1px rules, triads as the only ornament.

STORY: The visitor meets Vincent at the root frame, reads "Automation, Controls & Robotics Engineer", scans real machines as frames on a grid, and opens a project or the resume within one click.

FIRST VIEWPORT: Left half: portrait (placeholder) with an XYZ triad drawn from its bottom-left origin and the mono frame label `vincent → world`. Right: "Hi, I'm Vincent." at display scale, role line, two-sentence statement, Resume and Projects links. Nav across the top: HuCrafts wordmark, Work, Writing, About, Resume, Contact, LinkedIn and email icons.

FORM: Robot Frames (ROS/RViz coordinate-frame visualization), my rank 1, taken as the pick card; seed key db1fc661. Signature interaction: every finished tile carries a small XYZ triad at its origin at rest; hovering or focusing grows it to full size and raises a band with the summary, while titles and /frame names stay visible under every tile (touch-safe, and a deliberate departure from the reference's hover-only titles); the hero triad draws X, Y, Z in sequence on load (reduced motion: drawn at rest).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
