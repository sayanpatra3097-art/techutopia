import type { Metadata } from 'next';
import { HallOfOraclesClient } from './HallOfOraclesClient';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';
import { PageScrollbar } from '@/components/ui/PageScrollbar';
import { connectDB } from '@/lib/mongodb';
import ThemeRegistration from '@/models/ThemeRegistration';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'The Sacred Challenges — Hall of Oracles | TECHUTOPIA 2026',
    description:
        'Behold the Sacred Labors of TECHUTOPIA 2026. Choose your divine challenge, claim your labor, and etch your name into the stars of Mount Olympus.',
    keywords:
        'problem statements, hackathon challenges, TECHUTOPIA 2026, divine challenges, labors of Hercules, Greek mythology hackathon, innovation tracks',
    alternates: {
        canonical: '/problem-statements',
    },
};

async function getInitialCounts(): Promise<Record<string, number>> {
    try {
        await connectDB();
        const results = await (ThemeRegistration as any).aggregate([
            { $group: { _id: '$problemId', count: { $sum: 1 } } },
        ]);
        const map: Record<string, number> = {};
        for (const r of results) {
            if (r._id) map[r._id] = r.count;
        }
        return map;
    } catch {
        return {};
    }
}

export default async function HallOfOraclesPage() {
    const initialCounts = await getInitialCounts();

    return (
        <>
            <PageScrollbar thumbColor="rgba(212, 175, 55, 0.4)" hoverColor="rgba(212, 175, 55, 0.9)" />
            <HallOfOraclesClient initialCounts={initialCounts} />
            <Footer />
            <PageNavigation />
        </>
    );
}
