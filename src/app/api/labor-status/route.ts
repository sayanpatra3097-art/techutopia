import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ThemeRegistration from '@/models/ThemeRegistration';

export const dynamic = 'force-dynamic';

const NO_CACHE = { 'Cache-Control': 'no-store' };

export async function GET() {
    try {
        await connectDB();

        const results = await ThemeRegistration.aggregate([
            { $group: { _id: '$problemId', count: { $sum: 1 } } },
        ]);

        const countsMap: Record<string, number> = {};
        for (const r of results) {
            if (r._id) countsMap[r._id] = r.count;
        }

        return NextResponse.json(countsMap, { status: 200, headers: NO_CACHE });
    } catch (error: any) {
        console.error('[Sacred Labors] Counts Error:', error);
        return NextResponse.json({ error: 'Failed to fetch counts' }, { status: 500, headers: NO_CACHE });
    }
}
