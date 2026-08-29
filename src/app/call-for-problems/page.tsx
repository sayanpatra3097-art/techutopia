import type { Metadata } from 'next';
import { ProblemStatementsClient } from './ProblemStatementsClient';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';

export const metadata: Metadata = {
    title: 'Call for Problem Statements - TECHUTOPIA 2026',
    description:
        'Submit your problem statements for TECHUTOPIA 2026. Share challenges from your organization or community for hackers to solve.',
    keywords:
        'problem statements, hackathon challenges, TECHUTOPIA 2026, submit problems, innovation challenges',
    alternates: {
        canonical: '/call-for-problems/',
    },
};

export default function ProblemStatementsPage() {
    return (
        <>
            <ProblemStatementsClient />
            <Footer />
            <PageNavigation />
        </>
    );
}
