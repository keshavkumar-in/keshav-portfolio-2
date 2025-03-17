export interface PortfolioItem {
  id: string;
  projectName: string;
  slug: string;
  description: string;
  projectImage: string;
  developedOn?: string;
  techUsed: string[];
  role?: string;
  demoLink?: string;
  sourceCode?: string;
} 