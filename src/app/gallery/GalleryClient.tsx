'use client';

import dynamic from 'next/dynamic';

// Dynamic import for DomeGallery - heavy Three.js component
const DomeGallery = dynamic(() => import('@/components/DomeGallery'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gold-500/70 font-cinzel">Loading Gallery...</p>
            </div>
        </div>
    ),
});

export function GalleryClient() {
    return <DomeGallery />;
}
