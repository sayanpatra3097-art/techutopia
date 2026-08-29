import type { Metadata } from 'next';
import Prizes from '@/components/sections/Prizes';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';
import { PageScrollbar } from '@/components/ui/PageScrollbar';

export const metadata: Metadata = {
    title: 'Grand Prizes & Mythic Rewards - TECHUTOPIA 2026',
    description:
        'Claim your glory! Explore the grand prizes and mythic rewards awaiting the victors of TECHUTOPIA 2026. Total prize pool and category awards revealed here.',
    keywords:
        'hackathon prizes, TECHUTOPIA 2026 rewards, cash prizes, tech goodies, coding competition awards, mythic rewards',
    alternates: {
        canonical: '/prizes/',
    },
};

export default function PrizesPage() {
    return (
        <>
            <PageScrollbar thumbColor="rgba(212, 175, 55, 0.4)" hoverColor="rgba(212, 175, 55, 0.9)" />
            <Prizes />
            <Footer />
            <PageNavigation />
        </>
    );
}
