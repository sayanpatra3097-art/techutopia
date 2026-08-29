'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

function BookingFailedContent() {
    const params = useSearchParams();
    const orderId = params.get('order_id');

    return (
        <main className="min-h-screen bg-[#020205] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg bg-[#0B0C10] border border-red-900/30 rounded-3xl p-10 text-center"
            >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                    <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
                </motion.div>
                <h1 className="text-4xl font-[Cinzel] font-black text-white mb-3">Payment Failed</h1>
                <p className="text-stone-500 mb-3 font-[Cinzel] italic">
                    The quest could not be completed. No amount was charged.
                </p>
                {orderId && <p className="text-stone-600 text-xs mb-8 font-mono">{orderId}</p>}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/events"
                        className="inline-flex items-center justify-center gap-2 border border-[#d4af37]/30 text-[#d4af37] font-[Cinzel] font-black px-6 py-4 rounded-2xl hover:border-[#d4af37] transition-all"
                    >
                        <ArrowLeft size={18} /> Back to Events
                    </Link>
                    <Link
                        href="/events"
                        className="inline-flex items-center justify-center gap-2 bg-[#d4af37] text-black font-[Cinzel] font-black px-6 py-4 rounded-2xl hover:bg-white transition-all"
                    >
                        <RefreshCw size={18} /> Try Again
                    </Link>
                </div>
            </motion.div>
        </main>
    );
}

export default function BookingFailedPage() {
    return (
        <Suspense>
            <BookingFailedContent />
        </Suspense>
    );
}
