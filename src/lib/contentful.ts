import { createClient } from "contentful";

const client = createClient({
  space:
    process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ||
    process.env.CONTENTFUL_SPACE_ID!,
  accessToken:
    process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ||
    process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export interface IPortfolioFields {
  projectName: string;
  slug: string;
  description: string;
  projectImage: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  developedOn?: string;
  techUsed: string[];
  role?: string;
  demoLink?: string;
  sourceCode?: string;
}

export type ContentfulPortfolio = {
  sys: {
    id: string;
  };
  fields: IPortfolioFields;
};

/**
 * Fetches every project entry.
 *
 * This deliberately throws rather than returning []. It now runs at build time,
 * where swallowing the error would silently ship a site with no work on it —
 * the single worst failure mode for a portfolio. A failed build is louder and
 * cheaper to notice.
 */
export async function getPortfolioItems(): Promise<ContentfulPortfolio[]> {
  const response = await client.getEntries({
    content_type: "projectName",
    order: ["-sys.createdAt"],
  });

  return response.items as unknown as ContentfulPortfolio[];
}
