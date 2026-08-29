'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface Props {
    open: boolean;
    onClose: () => void;
}

declare global {
    interface Window {
        // Cashfree SDK v3 global
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cashfree: any;
    }
}

async function loadCashfreeSDK(): Promise<void> {
    if (typeof window === 'undefined') return;
    if (window.Cashfree) return;
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

export function CheckoutModal({ open, onClose }: Props) {
    const { items, total, clearCart } = useCart();
    const router = useRouter();

    const [form, setForm] = useState({ name: '', email: '', phone: '', college: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    // Reset on open
    useEffect(() => {
        if (open) { setErrors({}); setApiError(''); setLoading(false); }
    }, [open]);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
        if (!/^\d{10}$/.test(form.phone)) e.phone = 'Must be 10 digits';
        if (!form.college.trim()) e.college = 'College is required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        setApiError('');

        try {
            // 1. Create order on server
            const res = await fetch('/api/tickets/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    college: form.college,
                    items,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? 'Failed to create order');

            const { orderId, paymentSessionId } = data as { orderId: string; paymentSessionId: string };

            // 2. Load Cashfree SDK and launch checkout
            await loadCashfreeSDK();
            const mode = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PROD' ? 'production' : 'sandbox';
            const cashfree = window.Cashfree({ mode });

            clearCart();
            onClose();

            cashfree.checkout({
                paymentSessionId,
                redirectTarget: '_self',
            });

            // Cashfree will redirect to /booking/success?order_id=xxx
            // If something goes wrong, navigate manually:
            router.push(`/booking/success?order_id=${orderId}`);
        } catch (err) {
            setApiError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-100 flex items-end sm:items-center justify-center"
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#020205]/95 backdrop-blur-xl"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.95, y: 40, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 40, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                        className="relative z-10 w-full sm:max-w-lg bg-[#0B0C10] border border-[#d4af37]/25 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.1)] max-h-[90vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-8 pb-4 sm:pb-6 border-b border-[#d4af37]/10">
                            <div>
                                <h2 className="text-lg sm:text-2xl font-[Cinzel] font-black text-[#d4af37]">Secure Your Quests</h2>
                                <p className="text-stone-500 text-xs sm:text-sm mt-1">₹{total} total for {items.length} event{items.length !== 1 ? 's' : ''}</p>
                            </div>
                            <button onClick={onClose} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#d4af37]/20 flex items-center justify-center text-stone-400 hover:text-white transition-all" aria-label="Close checkout">
                                <X size={16} />
                            </button>
                        </div>

                        {/* Order Summary */}
                        <div className="px-5 sm:px-8 py-3 sm:py-4 bg-[#1A1C23]/40 border-b border-[#d4af37]/10 space-y-2 max-h-28 overflow-y-auto">
                            {items.map(item => (
                                <div key={item.eventId} className="flex justify-between text-xs sm:text-sm">
                                    <span className="text-stone-400 font-[Cinzel]">{item.eventTitle} × {item.quantity}</span>
                                    <span className="text-white font-bold">₹{item.pricePerUnit * item.quantity}</span>
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="px-5 sm:px-8 py-4 sm:py-6 space-y-3 sm:space-y-4 overflow-y-auto">
                            {[
                                { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Heracles of Athens' },
                                { id: 'email', label: 'Email', type: 'email', placeholder: 'hero@olympus.com' },
                                { id: 'phone', label: 'Phone (10 digits)', type: 'tel', placeholder: '9999999999' },
                                { id: 'college', label: 'College / University', type: 'text', placeholder: 'UEM Jaipur' },
                            ].map(field => (
                                <div key={field.id}>
                                    <label htmlFor={`checkout-${field.id}`} className="block text-stone-400 text-xs font-black uppercase tracking-widest mb-2 font-[Cinzel]">
                                        {field.label}
                                    </label>
                                    <input
                                        id={`checkout-${field.id}`}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={form[field.id as keyof typeof form]}
                                        onChange={e => setForm(prev => ({ ...prev, [field.id]: e.target.value }))}
                                        className={`w-full bg-[#1A1C23] border rounded-xl px-4 py-3 text-white placeholder-stone-700 focus:outline-none focus:border-[#d4af37] transition-colors font-[Cinzel] text-sm ${errors[field.id] ? 'border-red-500/60' : 'border-[#d4af37]/20'}`}
                                    />
                                    {errors[field.id] && <p className="text-red-400 text-xs mt-1">{errors[field.id]}</p>}
                                </div>
                            ))}

                            {apiError && (
                                <div className="bg-red-950/40 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                                    {apiError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#d4af37] text-black font-[Cinzel] font-black py-4 rounded-2xl hover:bg-white transition-all text-base tracking-[0.2em] uppercase disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-2"
                            >
                                {loading ? (
                                    <><Loader2 size={18} className="animate-spin" /> Processing…</>
                                ) : (
                                    <><ShieldCheck size={18} /> Pay ₹{total} Securely</>
                                )}
                            </button>

                            <p className="text-center text-stone-600 text-xs">
                                Powered by Cashfree • 256-bit SSL encrypted
                            </p>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
