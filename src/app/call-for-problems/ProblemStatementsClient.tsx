'use client';

import dynamic from 'next/dynamic';

// Dynamic import for CallForProblemStatements - heavy component
const CallForProblemStatements = dynamic(
    () => import('@/components/sections/CallForProblemStatements').then(mod => ({ default: mod.CallForProblemStatements })),
    {
        ssr: false,
        loading: () => (
            <div className="w-full min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
            </div>
        ),
    }
);

export function ProblemStatementsClient() {
    return <CallForProblemStatements />;
}
