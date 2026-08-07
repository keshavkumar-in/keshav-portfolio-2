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
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — the contact form. Deliberately **not** `NEXT_PUBLIC_`. Missing the key or the recipient makes the form return a friendly error pointing at the mailto fallback rather than crashing.

  `CONTACT_FROM_EMAIL` is optional and defaults to `onboarding@resend.dev`. **Resend rejects any send from a domain that is not verified in the account**, so hardcoding `noreply@keshavkumar.in` fails on a fresh account with a `not_found`/domain error — which the visitor only ever sees as the generic failure message. The shared sender needs no DNS but delivers only to the account's own address. Point it at the real domain once that is verified.

  Diagnose setup with `node --env-file=.env.local scripts/check-contact.mjs` — it validates the key, lists which domains are verified, and names the specific problem. Add `--send` to deliver a real test email.
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

### Icons and social cards

Both are generated; neither is hand-exported.

**Icons.** `scripts/generate-icons.mjs` draws the mark — an ink `K` on a volt tile — and rasterises every size with sharp. Run `node scripts/generate-icons.mjs` after changing it and commit the output; it is not part of the build. The `K` is **explicit vector paths, not an SVG `<text>` element**, so the result does not depend on Archivo being installed on the machine that rasterises it. The script also hand-writes the `.ico` container (6-byte header, one 16-byte entry per size, PNG payloads) because sharp cannot encode ICO.

**Social cards.** `src/app/opengraph-image.tsx` and `src/app/work/[slug]/opengraph-image.tsx` render at build time via `next/og`. Next wires the meta tags itself — **do not add `openGraph.images` or `twitter.images` to a `metadata` export**, because an explicit path overrides the generated card. That is exactly how the previous setup broke: it pointed at an `/og-image.jpg` that was never in the repo, so every shared link had a blank preview.

Two traps in these files:

- `params` is a **Promise** and must be awaited. Typing it as a plain object compiles and then silently yields `undefined`, rendering every case study with the same generic card.
- Fonts must be passed to `ImageResponse` with a matching `fontWeight` in the style — hence the `OG_DISPLAY` / `OG_MONO` style fragments in `src/lib/og.ts`, which carry family and weight together. Satori resolves an unspecified weight to 400, finds no 400 face, and renders the display type thin. `loadGoogleFont` accepts truetype, opentype, or **woff** (not woff2, which satori cannot decode); Google currently answers with woff. Font failures log a warning and fall back rather than failing the build.

## Repo quirks

- `public/assets/` holds exactly five files, all of them faces: the About portrait and the four testimonial avatars. Everything else the old design used (the `KK.png` logo, skill icons, service icons, decorative shapes) was deleted with the redesign. Every reference is a literal string — nothing builds an asset path dynamically, so a filename grep is a reliable usage check.
- `src/app/sitemap.ts` generates the sitemap; there is no hand-maintained `public/sitemap.xml` any more.
- Server actions live in `src/app/actions/`. A `"use server"` module may only export async functions — shared constants for the contact form therefore live in `src/lib/contact.ts`. Exporting an array from the action file makes it arrive on the client as a function reference.
