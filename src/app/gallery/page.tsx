import type { Metadata } from 'next';
import { GalleryClient } from './GalleryClient';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';
import { PageScrollbar } from '@/components/ui/PageScrollbar';

export const metadata: Metadata = {
    title: 'Past Photos & Gallery - TECHUTOPIA 2026',
    description:
        'Relive the moments from previous TECHUTOPIA editions. Browse through our immersive 3D gallery of photos capturing the innovation, collaboration, and excitement.',
    keywords:
        'hackathon gallery, TECHUTOPIA photos, past events, hackathon moments, event photography, 3D gallery',
    alternates: {
        canonical: '/gallery/',
    },
};

export default function GalleryPage() {
    return (
        <main className="relative min-h-screen w-full bg-neutral-950">
            <PageScrollbar thumbColor="rgba(0, 255, 255, 0.3)" hoverColor="rgba(0, 255, 255, 0.8)" />

            {/* Fixed Background Gallery */}
            <div className="fixed inset-0 z-0 h-screen w-full">
                <GalleryClient />
            </div>

            {/* Scrollable Content */}
            {/* Added pointer-events-none to wrapper so clicks pass through to the fixed gallery */}
            <div className="relative z-10 w-full pointer-events-none">
                {/* Spacer to reveal fixed gallery (100vh) */}
                <div className="h-[100dvh] w-full" />

                {/* Footer Section - Re-enable pointer events for footer interaction */}
                <div className="bg-neutral-950 border-t border-amber-900/20 pointer-events-auto">
                    <Footer />
                </div>
            </div>

            <PageNavigation />
        </main>
    );
}
