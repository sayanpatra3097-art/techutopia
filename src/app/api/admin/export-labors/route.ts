import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ThemeRegistration from '@/models/ThemeRegistration';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();
        const registrations = await ThemeRegistration.find({})
            .sort({ createdAt: -1 })
            .lean();

        // CSV header
        const headers = ['Team Number', 'Team Name', 'Leader Name', 'Email', 'Phone', 'Domain', 'Problem ID', 'Problem Title', 'Registered At'];

        // Build CSV rows
        const rows = registrations.map((r: any) => [
            r.teamNumber || '',
            `"${(r.teamName || '').replace(/"/g, '""')}"`,
            `"${(r.leaderName || '').replace(/"/g, '""')}"`,
            r.email || '',
            r.phone || '',
            `"${(r.domain || '').replace(/"/g, '""')}"`,
            r.problemId || '',
            `"${(r.problemTitle || '').replace(/"/g, '""')}"`,
            r.createdAt ? new Date(r.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : '',
        ].join(','));

        const csv = [headers.join(','), ...rows].join('\n');

        return new NextResponse(csv, {
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': `attachment; filename="theme_registrations_${new Date().toISOString().slice(0, 10)}.csv"`,
                'Cache-Control': 'no-store',
            },
        });
    } catch (error: any) {
        console.error('[CSV Export] Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
