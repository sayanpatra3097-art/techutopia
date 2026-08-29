'use client';

import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { CartProvider } from '@/context/CartContext';

import { LoadingProvider } from '@/context/LoadingContext';
import LoadingScreen from '@/components/ui/LoadingScreen';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    const pathname = usePathname();

    return (
        <LoadingProvider>
            <CartProvider>
                <LoadingScreen />
                <Layout>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </Layout>
            </CartProvider>
        </LoadingProvider>
    );
}
