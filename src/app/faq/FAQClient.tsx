'use client';

import dynamic from 'next/dynamic';

// Dynamic import for FAQ - heavy component with animations
const FAQ = dynamic(
    () => import('@/components/sections/FAQ').then(mod => ({ default: mod.FAQ })),
    {
        loading: () => (
            <div className="w-full min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
        ),
    }
);

export function FAQClient() {
    return <FAQ />;
}
