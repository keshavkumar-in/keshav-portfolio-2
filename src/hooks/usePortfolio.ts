import { useState, useEffect } from "react";
import { PortfolioItem } from "@/types/portfolio";
import { ContentfulPortfolio } from "@/lib/contentful";

const sortByDate = (a: PortfolioItem, b: PortfolioItem): number => {
  const dateA = a.developedOn || "2024-01-01"; // Fallback date for undefined
  const dateB = b.developedOn || "2024-12-01";
  return new Date(dateB).getTime() - new Date(dateA).getTime();
};

export const usePortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const response = await fetch("/api/portfolio");
        if (!response.ok) throw new Error("Failed to fetch");
        const items = (await response.json()) as ContentfulPortfolio[];

        const formattedItems: PortfolioItem[] = items
          .map((item) => ({
            id: item.sys.id,
            projectName: item.fields.projectName,
            slug: item.fields.slug,
            description: item.fields.description || "",
            projectImage: `https:${item.fields.projectImage.fields.file.url}`,
            developedOn: item.fields.developedOn || "", // Provide default empty string
            techUsed: item.fields.techUsed || [],
            role: item.fields.role || "",
            demoLink: item.fields.demoLink || "",
            sourceCode: item.fields.sourceCode || "",
          }))
          .sort(sortByDate);

        setPortfolioItems(formattedItems);
        setIsLoading(false);
      } catch (err) {
        setError(
          `Failed to load portfolio items: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        setIsLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

  return { portfolioItems, isLoading, error };
};
