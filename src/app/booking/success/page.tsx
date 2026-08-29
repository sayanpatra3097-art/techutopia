'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';
import type { OrderStatusResponse } from '@/types/tickets';
import BoardingPass from '@/components/ui/BoardingPass';
import { events } from '@/components/sections/Events';

function BookingSuccessContent() {
    const params = useSearchParams();
    const router = useRouter();
    const orderId = params.get('order_id');

    const [order, setOrder] = useState<OrderStatusResponse | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!orderId) { router.replace('/events'); return; }

        const poll = async () => {
            try {
                const res = await fetch(`/api/tickets/status?orderId=${encodeURIComponent(orderId)}`);
                if (!res.ok) return;
                const data: OrderStatusResponse = await res.json();
                setOrder(data);
                if (data.status !== 'PENDING') {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    if (data.status === 'FAILED') router.replace(`/booking/failed?order_id=${orderId}`);
                }
            } catch { /* retry silently */ }
        };

        poll();
        intervalRef.current = setInterval(poll, 2500);
        const timeout = setTimeout(() => { if (intervalRef.current) clearInterval(intervalRef.current); }, 120_000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            clearTimeout(timeout);
        };
    }, [orderId, router]);

    const isPaid = order?.status === 'PAID';

    return (
        <main className="min-h-screen bg-[#020205] flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-lg bg-[#0B0C10] border border-[#d4af37]/20 rounded-3xl p-10 text-center shadow-[0_0_60px_rgba(212,175,55,0.05)]"
            >
                {!isPaid ? (
                    <>
                        <Loader2 className="w-16 h-16 text-[#d4af37] animate-spin mx-auto mb-6" />
                        <h1 className="text-3xl font-[Cinzel] font-black text-white mb-3">Confirming your quest…</h1>
                        <p className="text-stone-500 font-[Cinzel] italic">Awaiting the Oracle&apos;s seal of approval</p>
                        <p className="text-stone-600 text-xs mt-3 font-mono">{orderId}</p>
                    </>
                ) : (
                    <>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                            <CheckCircle className="w-20 h-20 text-[#d4af37] mx-auto mb-6" />
                        </motion.div>
                        <h1 className="text-4xl font-[Cinzel] font-black text-[#d4af37] mb-2">Quest Accepted!</h1>
                        <p className="text-stone-400 mb-8 font-[Cinzel] italic">Confirmed for {order!.customerName}</p>

                        <div className="text-left bg-[#1A1C23] rounded-2xl p-6 mb-6 space-y-3">
                            {order!.items.map((item, i) => (
                                <div key={i} className="flex justify-between items-center border-b border-[#d4af37]/10 pb-3 last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-white font-bold font-[Cinzel] text-sm">{item.eventTitle}</p>
                                        <p className="text-stone-500 text-xs">× {item.quantity}</p>
                                    </div>
                                    <span className="text-[#d4af37] font-black">₹{item.pricePerUnit * item.quantity}</span>
                                </div>
                            ))}
                            <div className="flex justify-between pt-2">
                                <span className="text-stone-400 font-[Cinzel] font-bold text-sm">Total Paid</span>
                                <span className="text-[#d4af37] font-black text-lg">₹{order!.totalAmount / 100}</span>
                            </div>
                        </div>

                        <p className="text-stone-500 text-sm italic mb-2">
                            Confirmation sent to <span className="text-white">{order!.customerEmail}</span>
                        </p>
                        <p className="text-stone-600 text-xs mb-8 font-mono">{order!.orderId}</p>

                        {order!.tickets && order!.tickets.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-[#d4af37] font-[Cinzel] font-bold text-lg mb-6">Your Entry Passes</h3>
                                <div className="space-y-6">
                                    {order!.tickets.map((t, idx) => {
                                        const eventData = events.find(e => e.title === t.eventTitle);
                                        return (
                                            <BoardingPass
                                                key={idx}
                                                ticketId={t.ticketId}
                                                eventTitle={t.eventTitle}
                                                attendee={order!.customerName}
                                                time={eventData?.time || 'TBD'}
                                                venue={eventData?.location || 'Campus'}
                                                poster={eventData?.poster || '/events/artist_reveal.webp'}
                                            />
                                        );
                                    })}
                                </div>
                                <p className="text-stone-500 text-xs mt-6 italic">Please present these boarding passes at the venue check-in.</p>
                            </div>
                        )}

                        <Link href="/events" className="inline-flex items-center gap-2 bg-[#d4af37] text-black font-[Cinzel] font-black px-8 py-4 rounded-2xl hover:bg-white transition-all">
                            <ArrowLeft size={18} /> Back to Events
                        </Link>
                    </>
                )}
            </motion.div>
        </main>
    );
}

import { Suspense } from 'react';
export default function BookingSuccessPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-[#020205] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#d4af37] animate-spin" />
            </main>
        }>
            <BookingSuccessContent />
        </Suspense>
    );
}
