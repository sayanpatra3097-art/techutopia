import type { Metadata } from 'next';
import { Story } from '@/components/sections/Story';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';
import Image from 'next/image';
import { PageScrollbar } from '@/components/ui/PageScrollbar';
import { CloudTransition } from '@/components/ui/CloudTransition';

export const metadata: Metadata = {
    title: 'About TECHUTOPIA 2026 - The Story Behind the Hackathon',
    description:
        'Discover the epic story behind TECHUTOPIA 2026, a hackathon inspired by Greek mythology. Learn about our mission to bring together innovators and create groundbreaking solutions.',
    keywords:
        'about TECHUTOPIA 2026, hackathon story, Greek mythology theme, innovation event, tech community',
    alternates: {
        canonical: '/about/',
    },
};

export default function AboutPage() {
    return (
        <div className="relative min-h-screen">
            <CloudTransition type="uncover" />
            <PageScrollbar thumbColor="rgba(255, 69, 0, 0.4)" hoverColor="rgba(255, 69, 0, 0.9)" />
            {/* Fixed 3D High-Contrast Background Image */}
            <div className="fixed inset-0 z-0 bg-[#050508]">
                <Image
                    src="/About_bg.webp"
                    alt="Background"
                    fill
                    className="object-cover object-center contrast-[1.2] saturate-[1.15] brightness-[0.85] opacity-100 scale-105 transition-transform duration-1000"
                    priority
                />
                {/* 3D Depth Spotlight Vignette & Lightened Dark Gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 pointer-events-none" />
            </div>

            {/* Content */}
            <div className="relative z-10">
                <Story />
                <Footer />
                <PageNavigation />
            </div>
        </div>
    );
}
