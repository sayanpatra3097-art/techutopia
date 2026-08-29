'use client';

import dynamic from 'next/dynamic';
import { ComingSoonOverlay } from '@/components/ui/ComingSoonOverlay';

// Dynamic import for CosmicItinerary - heavy GSAP component
const CosmicItinerary = dynamic(
    () => import('@/components/sections/CosmicItinerary').then(mod => ({ default: mod.CosmicItinerary })),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gold-500/70 font-cinzel">Mapping the Stars...</p>
                </div>
            </div>
        ),
    }
);

export function ItineraryClient() {
    return (
        <CosmicItinerary />
    );
}
