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

- `NEXT_PUBLIC_CONTENTFUL_SPACE_ID`, `NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN` — read in `src/lib/contentful.ts`, which falls back to the non-prefixed `CONTENTFUL_*` names. The client is only ever constructed on the server, so the non-prefixed names are the safer choice for new deployments.
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL` — the contact form. Deliberately **not** `NEXT_PUBLIC_`. Missing either one makes the form return a friendly error pointing at the mailto fallback rather than crashing.
- The GTM container ID is hardcoded in `src/components/GoogleTagManager.tsx`; no env var is read for it.

## Architecture

The site sells freelance work, and everything below follows from that. Three routes:

```
/                  landing page
/work              every client project
/work/[slug]       case study — statically generated per project
```

`src/app/page.tsx` stacks the landing sections; each lives in `src/components/home/`. Section ids are anchor targets (`work`, `services`, `about`, `writing`, `contact`) and must stay in sync with `NAV_ITEMS` in `src/lib/site.ts` — `useScrollSpy` reads those same ids off the DOM.

**Nav is route-aware.** `Navbar.tsx` resolves an anchor to `#services` on `/` but `/#services` everywhere else, because a bare hash finds nothing on a case-study route. Scroll-spy is disabled off the landing page.

### Data

**Projects — Contentful, server-side.** `src/lib/projects.ts` is the only entry point: it fetches, flattens, filters, tiers, and merges case studies.

```
Contentful (content_type: "projectName")
  → src/lib/contentful.ts     getPortfolioItems() — THROWS on failure, by design
  → src/lib/projects.ts       getProjects() / getFeaturedProjects() / getProject(slug)
  → server components         no client fetch, no loading skeletons
```

`getPortfolioItems()` must keep throwing. It runs at build time, where returning `[]` on error would silently ship a portfolio with no work in it.

Tiering lives in `projects.ts`, not Contentful:

- `FEATURED` — the three slugs shown on the landing page, in that order.
- `ARCHIVED` — nine 2021 neogCamp bootcamp exercises, hidden from the site. The entries stay in Contentful; this is a display decision.
- Anything unlisted defaults to visible client work, so adding a Contentful entry needs no code change.

**Case studies — repo, not CMS.** `src/content/case-studies/<slug>.ts` holds long-form copy, keyed by Contentful slug in that directory's `index.ts`. Contentful owns the catalogue (image, tech, links); the repo owns editorial. A project with no case-study file still renders a `/work/[slug]` page from its Contentful description — never assume `project.caseStudy` exists.

Contentful's `role` field is **empty on every entry**. Role comes from the case study; omit the fact rather than inventing a title.

**Blog — dev.to, server-fetched** in `src/lib/devto.ts` with `revalidate: 3600`. Unlike projects it returns `[]` on failure and the section hides itself; writing is supporting material and shouldn't fail a build.

### Content honesty

Every metric on the site traces to something already published — the Contentful descriptions or the experience timeline in `src/components/home/About.tsx`. Case studies carry a `caveats` array that renders visibly, and unverified facts are marked `TODO(keshav)` in the source rather than smoothed over. **Do not add a figure without a source, and do not invent a `from` value to make a metric look like a before/after** — `Metric.from` and `CaseStudy.delta.from` are both optional precisely so a baseline-free result can be shown honestly.

### Styling

SCSS Modules, one per component in `src/styles/components/`, each opening with `@use "../mixins" as *;` (relative — there is no sass alias configured).

Tokens are centralised. `src/styles/_tokens.scss` defines every colour, type step, and spacing value as CSS custom properties on `:root`; `_mixins.scss` holds breakpoints and the `shell` / `section` / `label` / `display` / `panel` mixins. **Use `var(--token)`; do not reintroduce colour literals.**

The visual system has three hard rules: **no border radius, no gradients, no shadows.** Structure comes from 1px `--ink-line` hairlines. The accent `--volt` is used sparingly — roughly one element per viewport.

The recurring device is the **delta** (`4.5s → 0.6s`), rendered by `src/components/ui/Delta.tsx` and `MetricGrid.tsx`. It is the site's signature; new result displays should use it rather than a bare number.

**Grid hairlines:** cells draw their own `border-right`/`border-bottom` and the container draws `border-top`/`border-left`. Do not switch to the `gap: 1px` + coloured-container trick — item counts vary, and it paints empty tracks as visible grey boxes.

### Images

All images go through `next/image`, so every remote host must be allowlisted in `next.config.ts` `images.remotePatterns` (currently Contentful, dev.to, Cloudinary). A new image source without an entry there fails at runtime, not build time.

## Repo quirks

- `public/assets/KK.png` is the old orange-gradient logo and is **unused** — the nav wordmark is type. Several other `/assets` files (icon*.png, quote.png, 1.png…) are likewise orphaned by the redesign.
- Favicons and `og-image.jpg` still carry the previous brand and have not been regenerated.
- `src/app/sitemap.ts` generates the sitemap; there is no hand-maintained `public/sitemap.xml` any more.
- Server actions live in `src/app/actions/`. A `"use server"` module may only export async functions — shared constants for the contact form therefore live in `src/lib/contact.ts`. Exporting an array from the action file makes it arrive on the client as a function reference.
