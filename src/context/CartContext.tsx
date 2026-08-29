'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CartItem } from '@/types/tickets';

interface CartContextType {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (eventId: number) => void;
    updateQuantity: (eventId: number, qty: number) => void;
    clearCart: () => void;
    total: number;   // INR
    count: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (item: CartItem) => {
        setItems(prev => {
            if (prev.find(i => i.eventId === item.eventId)) return prev;
            return [...prev, item];
        });
    };

    const removeItem = (eventId: number) =>
        setItems(prev => prev.filter(i => i.eventId !== eventId));

    const updateQuantity = (eventId: number, qty: number) => {
        if (qty <= 0) { removeItem(eventId); return; }
        setItems(prev => prev.map(i => i.eventId === eventId ? { ...i, quantity: qty } : i));
    };

    const clearCart = () => setItems([]);

    const total = items.reduce((s, i) => s + i.pricePerUnit * i.quantity, 0);
    const count = items.reduce((s, i) => s + i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, count }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be inside CartProvider');
    return ctx;
}
