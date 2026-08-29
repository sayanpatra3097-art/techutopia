import type { Metadata } from 'next';
import { WhySponsor } from '@/components/sections/WhySponsor';
import { Footer } from '@/components/navigation/Footer';
import { PageNavigation } from '@/components/navigation/PageNavigation';

export const metadata: Metadata = {
    title: 'Sponsor TECHUTOPIA 2026 - Partnership Opportunities',
    description:
        'Partner with TECHUTOPIA 2026 and connect with top student developers. Explore sponsorship tiers and benefits.',
    keywords:
        'hackathon sponsorship, sponsor TECHUTOPIA 2026, tech sponsorship, student developers, brand exposure',
    alternates: {
        canonical: '/sponsor/',
    },
};

export default function SponsorPage() {
    return (
        <>
            <WhySponsor />
            <Footer />
            <PageNavigation />
        </>
    );
}
