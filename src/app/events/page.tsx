import type { Metadata } from 'next';
import { Events } from '@/components/sections/Events';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { CloudTransition } from '@/components/ui/CloudTransition';
import { PageScrollbar } from '@/components/ui/PageScrollbar';

export const metadata: Metadata = {
    title: 'Events & Activities - TECHUTOPIA 2026',
    description:
        'Discover the exciting events and activities at TECHUTOPIA 2026. Workshops, networking sessions, and more.',
    keywords:
        'hackathon events, TECHUTOPIA 2026 activities, workshops, networking, tech talks',
    alternates: {
        canonical: '/events/',
    },
};

export default function EventsPage() {
    return (
        <>
            <CloudTransition type="uncover" />
            <PageScrollbar thumbColor="rgba(212, 175, 55, 0.4)" hoverColor="rgba(212, 175, 55, 0.9)" />
            <Events />
            <CartDrawer />
            <Footer />
            <PageNavigation />
        </>
    );
}

