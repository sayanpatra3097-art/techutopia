'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Minus, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from '@/context/CartContext';
import { CheckoutModal } from './CheckoutModal';

export function CartDrawer() {
    const { items, removeItem, updateQuantity, total, count } = useCart();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Wait until we're in the browser before using createPortal
    useEffect(() => { setMounted(true); }, []);

    const drawerContent = (
        <>
            {/* Floating Cart Button — hide when drawer is open to avoid click interception */}
            <AnimatePresence>
                {count > 0 && !drawerOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setDrawerOpen(true)}
                        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-55 flex items-center gap-2 sm:gap-3 bg-[#d4af37] text-black font-[Cinzel] font-black px-3 sm:px-5 py-3 sm:py-4 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:bg-white transition-all text-sm sm:text-base"
                        aria-label="Open cart"
                    >
                        <ShoppingCart size={20} />
                        <span>{count} event{count > 1 ? 's' : ''}</span>
                        <span className="bg-black text-[#d4af37] text-xs font-black rounded-xl px-2 py-0.5">
                            ₹{total}
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Drawer Backdrop + Panel */}
            <AnimatePresence>
                {drawerOpen && (
                    <>
                        {/* Backdrop — closes drawer on click */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDrawerOpen(false)}
                            className="fixed inset-0 z-58 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Drawer Panel — rendered via portal so fixed positioning works correctly */}
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 250 }}
                            className="fixed bottom-0 sm:bottom-auto sm:right-0 sm:top-0 left-0 sm:left-auto w-full sm:w-auto sm:max-w-md h-[85vh] sm:h-full z-60 bg-[#0B0C10] border-t sm:border-t-0 sm:border-l border-[#d4af37]/20 flex flex-col shadow-2xl rounded-t-3xl sm:rounded-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-[#d4af37]/10">
                                <div>
                                    <h2 className="text-xl font-[Cinzel] font-black text-[#d4af37]">Your Quest Log</h2>
                                    <p className="text-stone-500 text-sm">{count} event{count !== 1 ? 's' : ''} selected</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setDrawerOpen(false)}
                                    className="w-10 h-10 rounded-full border border-[#d4af37]/20 flex items-center justify-center text-stone-400 hover:text-white hover:border-[#d4af37] transition-all"
                                    aria-label="Close cart"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Items */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {items.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-40 text-stone-600">
                                        <ShoppingCart size={40} className="mb-3 opacity-30" />
                                        <p className="font-[Cinzel] italic text-sm">No quests selected</p>
                                    </div>
                                ) : (
                                    items.map(item => (
                                        <div key={item.eventId} className="bg-[#1A1C23] rounded-2xl p-4 flex items-center gap-3">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-[Cinzel] font-bold text-sm truncate">{item.eventTitle}</p>
                                                <p className="text-[#d4af37] font-black mt-1">₹{item.pricePerUnit} / person</p>
                                            </div>

                                            {/* Qty controls */}
                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); updateQuantity(item.eventId, item.quantity - 1); }}
                                                    className="min-w-[36px] min-h-[36px] rounded-lg border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="text-white font-black w-6 text-center text-sm select-none">{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); updateQuantity(item.eventId, item.quantity + 1); }}
                                                    className="min-w-[36px] min-h-[36px] rounded-lg border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); removeItem(item.eventId); }}
                                                    className="min-w-[36px] min-h-[36px] flex items-center justify-center text-red-500/60 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                                                    aria-label={`Remove ${item.eventTitle}`}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            <p className="text-white font-black text-sm text-right min-w-[40px]">₹{item.pricePerUnit * item.quantity}</p>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Footer / Checkout */}
                            {items.length > 0 && (
                                <div className="p-6 border-t border-[#d4af37]/10 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-stone-400 font-[Cinzel] font-bold">Total</span>
                                        <span className="text-[#d4af37] font-black text-2xl">₹{total}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => { setDrawerOpen(false); setCheckoutOpen(true); }}
                                        className="w-full bg-[#d4af37] text-black font-[Cinzel] font-black py-4 rounded-2xl hover:bg-white transition-all text-lg tracking-[0.15em] uppercase"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Checkout Modal */}
            <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
        </>
    );

    // Render into document.body to escape the Framer Motion page-transition wrapper
    // (which applies CSS transforms that break fixed positioning on children)
    if (!mounted) return null;
    return createPortal(drawerContent, document.body);
}
