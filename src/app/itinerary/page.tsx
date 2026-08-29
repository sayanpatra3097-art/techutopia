import type { Metadata } from 'next';
import { ItineraryClient } from './ItineraryClient';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';

export const metadata: Metadata = {
    title: 'Event Itinerary - TECHUTOPIA 2026',
    description:
        'View the complete schedule and itinerary for TECHUTOPIA 2026. Plan your hackathon experience with our detailed timeline.',
    keywords:
        'hackathon schedule, TECHUTOPIA 2026 itinerary, event timeline, hackathon agenda',
    alternates: {
        canonical: '/itinerary/',
    },
};

export default function ItineraryPage() {
    return (
        <>
            <ItineraryClient />
            <Footer />
            <PageNavigation />
        </>
    );
}
