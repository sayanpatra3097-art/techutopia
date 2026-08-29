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
            {/* Fixed Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/About_bg.webp"
                    alt="Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Soft black overlay - darker on mobile for text readability */}
                <div className="absolute inset-0 bg-black/40 sm:bg-black/30 md:bg-black/20" />
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
