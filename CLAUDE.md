# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Next.js dev server (http://localhost:3000)
- `npm run build` — runs `build:md` first, then `next build`
- `npm run build:md` — convert root-level `*.md` files to styled HTML in `public/`
- `npm run dev:md` — watch root-level `*.md` files and re-run the conversion on change
- `npm run lint` — ESLint via `next lint`

There is no test suite. Biome (`biome.json`) is also configured for formatting/linting (2-space indent, organize imports), alongside ESLint.

## Architecture

Next.js 14 App Router site (TypeScript, Tailwind CSS) — a personal portfolio at `app/page.tsx`, a single client component composing the section components in `components/` (Navbar, Hero, ProjectsGrid, KnowledgeSharing, About, ContactForm, Footer). Path alias `@/*` maps to the repo root.

### Content is data-driven from `lib/`

- `lib/projects.ts` holds the static `PROJECTS` array and `CATEGORIES`; the homepage filters it client-side. The `Project` type lives in `types/index.ts` (its `category` is `Exclude<Category, 'All'>`). To add/remove a portfolio project, edit this file — commented-out entries are kept as templates.
- `lib/bakeoff.ts` holds the bake-off poll categories and static submissions, plus the Redis vote helpers. (`lib/bakeoff copy.ts` is a stale duplicate.)

### Bake-off voting feature

Live voting for the Mini Bake Off event:

- UI: `app/projects/mini-bake-off-summer-2025/polls/` (category list page + `[cat]` poll page)
- API: `app/api/bakeoff/[cat]/{submissions,vote,results}/route.ts` — edge runtime routes
- Storage: Upstash Redis via `lib/redis.ts` (`Redis.fromEnv()` — requires `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` env vars; API routes will fail locally without them). Vote counts are simple `INCR` counters keyed `bakeoff:2025:<cat>:votes:<id>`.
- Category slugs are validated with `assertCat()`; submissions are defined statically per category in `lib/bakeoff.ts`.

### Markdown → HTML pipeline

Root-level `.md` files (e.g. `pm_knowledge_share_1.md`) are converted by `scripts/build-markdown.js` into standalone styled HTML pages in `public/` (same basename, `.html`), served as static files and linked from pages like the Product Management course (`app/projects/product-management-course/page.tsx`). The generated `.html` files are committed. After editing a root `.md`, run `npm run build:md` (or it happens automatically during `npm run build`).

### Non-web content

`plc/` contains LaTeX sources and compiled PDFs for TwinCAT PLC lecture notes. It is not part of the Next.js build — don't touch it when working on the website.
