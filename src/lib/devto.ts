import { SITE } from "@/lib/site";

export interface Article {
  id: number;
  title: string;
  description: string;
  published_at: string;
  tag_list: string[];
  url: string;
  cover_image: string | null;
  social_image: string | null;
  reading_time_minutes: number;
}

/**
 * Latest posts from dev.to, fetched on the server and revalidated hourly.
 *
 * Unlike the project data this does NOT throw: writing is supporting material,
 * and dev.to being unreachable is not a reason to fail the build or blank the
 * page. The section hides itself when the list comes back empty.
 */
export async function getArticles(limit = 3): Promise<Article[]> {
  try {
    const response = await fetch(
      `https://dev.to/api/articles?username=${SITE.devto}&per_page=${limit}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) return [];

    return (await response.json()) as Article[];
  } catch (error) {
    console.error("dev.to fetch failed:", error);
    return [];
  }
}
