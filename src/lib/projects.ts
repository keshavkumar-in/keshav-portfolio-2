import "server-only";

import { caseStudies } from "@/content/case-studies";
import { getPortfolioItems, type ContentfulPortfolio } from "@/lib/contentful";
import type { PortfolioItem, Project } from "@/types/portfolio";

/**
 * Slugs shown on the landing page, in this order. Everything else that survives
 * ARCHIVED still gets its own page and appears on /work.
 */
const FEATURED: readonly string[] = [
  "bert-labs",
  "bsmeb-academic-portal",
  "ramesh-potnuri-portfolio",
];

/**
 * The 2021 neogCamp bootcamp exercises. They stay in Contentful — this is a
 * display decision, not a deletion — but they do not appear on a site whose job
 * is winning client work. A prospective client judges by the weakest project
 * they can see.
 */
const ARCHIVED: ReadonlySet<string> = new Set([
  "fun-with-triangle",
  "is-your-birthday-lucky",
  "cash-register-manager",
  "web-development-resources-app",
  "flag-emoji-interpreter-app",
  "pirate-speak-translator-app",
  "talk-banana-fun-translator-app",
  "html-basics-quiz-cli-app",
  "do-you-know-me-quiz-cli-app",
]);

/** Contentful asset URLs are protocol-relative. */
function assetUrl(url: string | undefined): string {
  if (!url) return "";
  return url.startsWith("//") ? `https:${url}` : url;
}

function flatten(entry: ContentfulPortfolio): PortfolioItem {
  const { sys, fields } = entry;

  return {
    id: sys.id,
    projectName: fields.projectName,
    slug: fields.slug,
    description: fields.description || "",
    projectImage: assetUrl(fields.projectImage?.fields?.file?.url),
    developedOn: fields.developedOn || "",
    techUsed: fields.techUsed || [],
    role: fields.role || "",
    demoLink: fields.demoLink || undefined,
    sourceCode: fields.sourceCode || undefined,
  };
}

function byNewest(a: PortfolioItem, b: PortfolioItem): number {
  return (
    new Date(b.developedOn || 0).getTime() -
    new Date(a.developedOn || 0).getTime()
  );
}

/**
 * Every project that should appear on the site, newest first, each merged with
 * its case study where one exists.
 *
 * Called from server components at build time. It does not catch Contentful
 * errors — a failed fetch must fail the build rather than quietly publish a
 * portfolio with no work in it.
 */
export async function getProjects(): Promise<Project[]> {
  const entries = await getPortfolioItems();

  return entries
    .map(flatten)
    .filter((item) => item.slug && !ARCHIVED.has(item.slug))
    .sort(byNewest)
    .map((item) => ({
      ...item,
      caseStudy: caseStudies[item.slug],
      featured: FEATURED.includes(item.slug),
    }));
}

/** The landing page selection, in FEATURED order rather than by date. */
export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();

  return FEATURED.map((slug) =>
    projects.find((project) => project.slug === slug)
  ).filter((project): project is Project => Boolean(project));
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}

/**
 * Returns the next project to show at the end of a case study, wrapping around
 * so the last one leads back to the first.
 */
export async function getNextProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  if (projects.length < 2) return undefined;

  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return projects[0];

  return projects[(index + 1) % projects.length];
}
