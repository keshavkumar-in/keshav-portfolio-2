import type { CaseStudy } from "@/types/portfolio";

/**
 * Source: Contentful entry `ramesh-potnuri-portfolio` and the client's
 * testimonial.
 *
 * Note there is no before/after here — see `caveats`. This project has no
 * documented baseline, so it deliberately carries no invented metrics. Freelance
 * clients read a fabricated number faster than you'd think.
 */
export const rameshPotnuriPortfolio: CaseStudy = {
  slug: "ramesh-potnuri-portfolio",
  eyebrow: "Dr. Ramesh Potnuri · Academic portfolio",
  role: "Freelance full-stack developer",
  headline: "A publication list a researcher can maintain without a developer",

  problem:
    "An academic's portfolio lives or dies on its publication list, and that list changes constantly. The usual outcome is a site that is accurate the week it launches and stale six months later, because every new paper requires emailing whoever built it. Dr. Potnuri needed the research record to be the centre of the site, searchable and sortable by a visitor, and editable by him without touching code.",

  approach:
    "The whole design followed from one decision: treat publications as structured data, not as page content. Once each paper is a record with a year, a venue, and a type, the interface can filter and sort it, the site can render it statically, and the author can add the next one from a CMS form. Everything a visitor sees is generated at build time, so the site stays fast without a server to maintain.",

  built: [
    {
      title: "Contentful-backed publication record",
      body: "Modelled publications as structured entries so Dr. Potnuri adds a paper through a form, not a code change.",
    },
    {
      title: "A custom usePublications hook",
      body: "One hook owns filtering, sorting, and pagination over the publication set, keeping that logic in a single place rather than spread across the components that display it.",
    },
    {
      title: "Static generation with incremental revalidation",
      body: "SSG for speed, ISR so new publications appear without a redeploy — the combination that makes the self-service editing actually work.",
    },
    {
      title: "Responsive, component-driven interface",
      body: "A clean academic layout built from reusable components, readable on the phone a conference attendee is holding.",
    },
  ],

  results: [
    { value: "Self-serve", label: "Publication updates, no developer needed" },
    { value: "SSG + ISR", label: "Static delivery, live content" },
    { value: "Filter · Sort · Paginate", label: "Over the full research record" },
  ],

  quote: {
    text: "Keshav is a smart, dependable, and technically strong professional with sharp troubleshooting skills and up-to-date development knowledge. He's a fast learner who consistently delivers precise, solution-oriented results.",
    name: "Dr. Ramesh Potnuri",
    role: "Lead Research Scientist, Bert Labs",
    image: "/assets/Ramesh.webp",
  },

  caveats: [
    // TODO(keshav): if you have any numbers for this one — Lighthouse score,
    // build time, publication count, traffic — add them to `results`. Right now
    // this is the only featured case study without a measured outcome, which
    // shows next to Bert Labs and BSMEB.
    "This was a greenfield build with no previous site to measure against, so there is no before-and-after to report.",
  ],
};
