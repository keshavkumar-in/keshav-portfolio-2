import type { CaseStudy } from "@/types/portfolio";

/**
 * Sources for every figure below:
 * - Contentful entry `bert-labs` (LCP 4.5s→0.6s, 95+ Lighthouse, +32% organic
 *   traffic, −60% client-side vulnerabilities, 95%+ coverage, WCAG 2.1 AA)
 * - The "Research Engineer II, Bert Labs" role in the site's own experience
 *   timeline (+40% engagement, +25% session duration)
 * Nothing here is estimated.
 */
export const bertLabs: CaseStudy = {
  slug: "bert-labs",
  eyebrow: "Bert Labs · Deep-tech industrial AI",
  role: "Research Engineer II",
  headline: "A marketing site that loaded in under a second — and started ranking",

  delta: {
    from: "4.5s",
    to: "0.6s",
    label: "Largest Contentful Paint",
  },

  problem:
    "Bert Labs sells complex industrial AI to enterprise buyers, and its public platform was the first thing those buyers saw. It took 4.5 seconds to render its largest element. On the mobile connections a plant engineer actually browses from, that is long enough to lose the visit before the pitch begins — and slow enough that search ranking suffered on top of it. The site also had to carry design-led marketing pages, meet accessibility obligations, and let a non-technical team publish without a developer in the loop.",

  approach:
    "I treated performance as the design constraint rather than a cleanup pass at the end. Every layout decision was checked against its render cost, and the CMS integration was built so that editors could not accidentally regress it — image handling, font loading, and above-the-fold content were all fixed in code rather than left to whoever wrote the next page. Accessibility and analytics were built in from the start for the same reason: retrofitting either one is far more expensive than doing it while the components are still being written.",

  built: [
    {
      title: "Next.js 15 frontend, built from design files",
      body: "Worked directly with the UX/UI designers to turn mockups into a component library rather than a set of pages, so new marketing pages could be assembled without new CSS. Chakra UI provided the primitives; the layout system was custom.",
    },
    {
      title: "Core Web Vitals as a build gate",
      body: "Server-rendered the above-the-fold content, controlled font loading, and moved image optimisation into the component layer. LCP went from 4.5s to 0.6s and Lighthouse scores settled above 95.",
    },
    {
      title: "Contentful as the editorial backend",
      body: "Modelled the content so the marketing team could publish and reorder pages independently, with the performance-critical decisions locked in the components rather than exposed as editor options.",
    },
    {
      title: "Accessibility and security hardening",
      body: "Brought the platform to WCAG 2.1 AA and cut client-side vulnerabilities by 60% through frontend security measures — a requirement for enterprise procurement review, not a nice-to-have.",
    },
    {
      title: "Test coverage and delivery pipeline",
      body: "Unit and integration tests in Jest and React Testing Library held coverage above 95%, deployed through Dockerised Bitbucket pipelines onto Azure and Kubernetes.",
    },
  ],

  results: [
    { value: "0.6s", from: "4.5s", label: "Largest Contentful Paint" },
    { value: "95+", label: "Lighthouse performance score" },
    { value: "+32%", label: "Organic search traffic" },
    { value: "+40%", label: "User engagement" },
    { value: "+25%", label: "Average session duration" },
    { value: "−60%", label: "Client-side vulnerabilities" },
    { value: "95%+", label: "Test coverage" },
    { value: "AA", label: "WCAG 2.1 conformance" },
  ],

  quote: {
    text: "Keshav is a smart, dependable, and technically strong professional with sharp troubleshooting skills and up-to-date development knowledge. He's a fast learner who consistently delivers precise, solution-oriented results.",
    name: "Dr. Ramesh Potnuri",
    role: "Lead Research Scientist, Bert Labs",
    image: "/assets/Ramesh.webp",
  },

  caveats: [
    "Engagement, session duration, and traffic figures are the platform's own analytics over the engagement period (Sep 2024 – Jun 2025), not a controlled experiment.",
  ],
};
