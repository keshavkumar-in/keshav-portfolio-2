import { NextResponse } from 'next/server';
import { getPortfolioItems } from '@/lib/contentful';

export async function GET() {
    try {
        const items = await getPortfolioItems();
        return NextResponse.json(items);
    } catch (error) {
        console.error('Error fetching portfolio items:', error);
        return NextResponse.json(
            { error: 'Failed to fetch portfolio items' },
            { status: 500 }
        );
    }
} 