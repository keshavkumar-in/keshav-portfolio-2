# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Next dev server with Turbopack (http://localhost:3000)
npm run build            # Production build — the real verification step
npm start                # Serve the production build
npx tsc --noEmit         # Type-check (fast feedback; passes clean today)
npm run clear            # Nuke .next, node_modules, package-lock.json and reinstall
```

There is no test suite.

**`npm run lint` is broken and should not be used.** It runs `next lint`, which Next 16 removed, so the CLI treats `lint` as a directory name and errors out. Running `npx eslint .` directly also fails: `eslint.config.mjs` uses `FlatCompat` to pull in `next/core-web-vitals`, which throws a circular-structure error under ESLint 10. Verify changes with `npx tsc --noEmit` and `npm run build` instead. Fixing linting means replacing the `FlatCompat` shim with the flat config that `eslint-config-next` exports natively.

## Environment

`.env.local` (see `.env.local.example`):

- `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`, `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN` — read in `src/lib/contentful.ts`, which falls back to the non-prefixed `CONTENTFUL_*` names. Despite the `NEXT_PUBLIC_` prefix, the client is only constructed on the server (API route), so the non-prefixed names are the safer choice for new deployments.
- `NEXT_PUBLIC_GTM_ID` — listed in the example file but **not actually read**; the GTM container ID is hardcoded in `src/components/GoogleTagManager.tsx`.

## Architecture

Single-page portfolio site on the Next.js App Router. `src/app/page.tsx` is the entire site: it stacks a fixed list of section components inside one `<main>`. There is no routing beyond `/` and the one API route — new "pages" are new sections appended to `page.tsx`.

**Navigation is anchor-based, not route-based.** `Navbar.tsx` holds the nav item list, and each item's `path` must exactly match a DOM `id` on some section:

| Nav item | `id` | Component |
|---|---|---|
| HOME | `home` | `HeroSection` |
| SERVICES | `services` | `ServicesSection` |
| PORTFOLIO | `portfolio` | `PortfolioSection.` |
| RESUME | `resume` | `TimelineSection` |
| BLOGS | `blogs` | `BlogSection` |
| CONTACT | `contact` | `FreelanceSection` |

`useScrollSpy` (`src/hooks/useScrollSpy.ts`) reads those same ids off the DOM to highlight the active link. Adding a nav entry means adding the id to the section *and* the entry to `navItems`. Sections not in the table (`StatsSection`, `SkillsSection`, `TestimonialsSection`, `FooterSection`) carry no id and are unreachable from the nav.

### Data sources

Only two sections are dynamic; everything else (services, skills, timeline, testimonials, stats) is hardcoded arrays inside the component files.

**Portfolio — Contentful, fetched client-side through an internal API route:**

```
Contentful (content_type: "projectName")
  → src/lib/contentful.ts        getPortfolioItems(), swallows errors → []
  → src/app/api/portfolio/route.ts   GET, returns raw Contentful entries
  → src/hooks/usePortfolio.ts    browser fetch("/api/portfolio")
  → PortfolioSection..tsx        loading skeletons / error / grid
```

The route returns **raw Contentful shape** (`ContentfulPortfolio`, `sys`/`fields` nesting). Flattening to the app-level `PortfolioItem` (`src/types/portfolio.ts`) — including prefixing the asset URL with `https:` and defaulting missing fields — happens in `usePortfolio`, not in the route. Change one and the other must follow. Because the fetch is client-side in a `useEffect`, portfolio data is not server-rendered or statically generated; the page ships skeleton cards first.

**Blog — dev.to public API, called straight from the browser** in `BlogSection.tsx` (`https://dev.to/api/articles?username=…`). No API route, no key; the username is hardcoded in the component.

### Styling

SCSS Modules, one file per component in `src/styles/components/`, imported as `@/styles/components/X.module.scss`. `src/styles/globals.scss` (imported only in `layout.tsx`) holds the reset, the dark `#1a1a1a` base, and scrollbar styling.

There is **no shared variables/mixins file** — the brand gradient (`#ff5e14` → `#ffb700`) and other tokens are repeated as literals across ~20 module files. Match the surrounding literals when editing; introducing a partial means touching all of them.

### Images

All images go through `next/image`, so every remote host must be allowlisted in `next.config.ts` `images.remotePatterns` (currently Contentful, dev.to, Cloudinary). A new image source without an entry there fails at runtime, not build time.

## Repo quirks

- **`src/components/PortfolioSection..tsx` has a literal double dot** in its filename. Imports must be `@/components/PortfolioSection.` — do not "fix" the import without renaming the file.
- `src/components/Navigation.tsx` is dead code (never imported; `Navbar.tsx` is the live nav).
- `src/styles/components/ContactSection.module.scss` and `FormattedDescription.module.scss` have no corresponding components; `<ContactSection />` is commented out in `page.tsx`.
- Most components are `"use client"`. Only `PortfolioCard`, `LoadMore`, `SkeletonCard`, and the purely static sections are server components — but they render inside client parents, so the boundary is effectively the whole page.
- Project descriptions from Contentful are rendered as Markdown via `react-markdown` in `ProjectModal.tsx`.
- `public/sitemap.xml` is hand-maintained; SEO metadata (OpenGraph, Twitter, robots, canonical) lives entirely in `layout.tsx`'s `metadata` export.
