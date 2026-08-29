'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { PageScrollbar } from '@/components/ui/PageScrollbar';


// Dynamic imports for heavy components - reduces initial bundle
const Hero = dynamic(() => import('@/components/sections/hero-section').then(mod => ({ default: mod.Hero })), {
    ssr: false,
    loading: () => (
        <div className="w-full h-screen bg-black flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
        </div>
    ),
});

const GlobalParticles = dynamic(() => import('@/components/effects/GlobalParticles').then(mod => ({ default: mod.GlobalParticles })), {
    ssr: false,
});

export function HomePageClient() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <main ref={containerRef} className="relative w-full overflow-x-hidden bg-black text-white">
            {/* Global Floating Particles */}
            <GlobalParticles />

            {/* Main Content */}
            <div className="relative z-10">
                <PageScrollbar thumbColor="rgba(212, 175, 55, 0.4)" hoverColor="rgba(212, 175, 55, 0.9)" />
                <Hero />
            </div>



            {/* Navigation */}
            <PageNavigation />
        </main>
    );
}
