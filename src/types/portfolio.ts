/** A project as it comes out of Contentful, flattened for app use. */
export interface PortfolioItem {
  id: string;
  projectName: string;
  slug: string;
  description: string;
  projectImage: string;
  developedOn: string;
  techUsed: string[];
  role: string;
  demoLink?: string;
  sourceCode?: string;
}

/**
 * A measured outcome. `from` is what makes this the site's signature device:
 * every real result Keshav has is a before → after, so the pair is rendered
 * together rather than as a lone number.
 */
export interface Metric {
  /** The figure that matters, e.g. "0.6s". */
  value: string;
  /** What it measures, e.g. "Largest Contentful Paint". */
  label: string;
  /** The prior value, where one is documented. Renders as `from → value`. */
  from?: string;
}

export interface Quote {
  text: string;
  name: string;
  role: string;
  /** Path under /public. */
  image?: string;
}

/** A block of the "what I built" narrative. */
export interface BuildNote {
  title: string;
  body: string;
}

/**
 * Long-form editorial for a project. Lives in the repo (src/content/case-studies)
 * rather than Contentful: Contentful owns the catalogue, the repo owns the
 * writing. A project with no case study still renders — see getProjects().
 */
export interface CaseStudy {
  slug: string;
  /** Client or context line, e.g. "Bert Labs · Deep-tech SaaS". */
  eyebrow: string;
  /**
   * The title held on this engagement. Sourced here rather than from Contentful,
   * whose `role` field is empty on every entry.
   */
  role?: string;
  /** One-sentence claim, used as the page's H1 and the work-panel title. */
  headline: string;
  /**
   * The single most striking result. Leads the page. `from` is omitted when no
   * baseline was measured — see hotel-reservation-system.
   */
  delta?: { from?: string; to: string; label: string };
  problem: string;
  approach: string;
  built: BuildNote[];
  results: Metric[];
  quote?: Quote;
  /**
   * Anything the reader should know about how these figures were measured, or
   * that Keshav still needs to verify. Rendered visibly — an unqualified number
   * a client can't trust is worse than a qualified one.
   */
  caveats?: string[];
}

/** A Contentful project merged with its optional case study. */
export interface Project extends PortfolioItem {
  caseStudy?: CaseStudy;
  featured: boolean;
}
