import type { Metadata } from 'next';
import { ClockClient } from './ClockClient';

export const metadata: Metadata = {
    title: 'Clock — TECHUTOPIA 2026',
    description: 'Countdown to TECHUTOPIA 2026 — the Greek mythology themed hackathon at UEM Jaipur.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function ClockPage() {
    return <ClockClient />;
}
