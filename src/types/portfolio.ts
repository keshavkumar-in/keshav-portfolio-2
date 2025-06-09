export interface PortfolioItem {
  id: string;
  projectName: string;
  slug: string;
  description: string;
  projectImage: string;
  developedOn: string; // Changed from optional to required with default value
  techUsed: string[];
  role: string;
  demoLink?: string;
  sourceCode?: string;
}
