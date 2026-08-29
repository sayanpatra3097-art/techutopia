import type { Metadata } from 'next';
import { FAQClient } from './FAQClient';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';

export const metadata: Metadata = {
    title: 'Frequently Asked Questions - TECHUTOPIA 2026',
    description:
        'Find answers to common questions about TECHUTOPIA 2026. Learn about registration, eligibility, rules, and more.',
    keywords:
        'hackathon FAQ, TECHUTOPIA 2026 questions, registration, eligibility, rules, team formation',
    alternates: {
        canonical: '/faq/',
    },
};

export default function FAQPage() {
    return (
        <>
            <FAQClient />
            <Footer />
            <PageNavigation />
        </>
    );
}
