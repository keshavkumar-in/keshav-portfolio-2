import { createClient } from 'contentful';

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
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

export async function getPortfolioItems(): Promise<ContentfulPortfolio[]> {
    try {
        const response = await client.getEntries({
            content_type: 'projectName',
            order: ['-sys.createdAt'],
        });

        return response.items as unknown as ContentfulPortfolio[];
    } catch (error) {
        console.error('Error fetching portfolio items:', error);
        return [];
    }
} 