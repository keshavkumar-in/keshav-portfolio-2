import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { SITE } from "@/lib/site";

/**
 * Generated, replacing the hand-maintained public/sitemap.xml — which listed
 * anchor fragments as if they were pages and knew nothing about /work.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE.url}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projects.map((project) => ({
      url: `${SITE.url}/work/${project.slug}`,
      lastModified: project.developedOn
        ? new Date(project.developedOn)
        : new Date(),
      changeFrequency: "yearly" as const,
      // Written-up case studies are the pages worth ranking.
      priority: project.caseStudy ? 0.8 : 0.5,
    })),
  ];
}
