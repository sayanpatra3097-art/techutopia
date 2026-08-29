import type { Metadata } from 'next';
import PartnersSections from '@/components/sections/partners';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';
import { PageScrollbar } from '@/components/ui/PageScrollbar';

export const metadata: Metadata = {
    title: 'Partners & Sponsors - TECHUTOPIA 2026',
    description:
        'Meet our amazing partners and sponsors who make TECHUTOPIA 2026 possible. Join forces with leading tech companies and organizations.',
    keywords:
        'hackathon partners, sponsors, TECHUTOPIA 2026 sponsors, gold partner, tech partners, event sponsors, Ention, WS Cube Tech',
    alternates: {
        canonical: '/partners/',
    },
};

import Image from 'next/image';
import bgThemes from '@/assets/themes/bg-themes.webp';

export default function PartnersPage() {
    return (
        <div className="relative min-h-screen">
            <div className="fixed inset-0 -z-10">
                <Image
                    src={bgThemes}
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <PageScrollbar thumbColor="rgba(192, 192, 192, 0.4)" hoverColor="rgba(220, 220, 220, 0.9)" />
            <PartnersSections />
            <Footer />
            <PageNavigation />
        </div>
    );
}
