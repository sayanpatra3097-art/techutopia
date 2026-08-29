'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { Footer } from '@/components/navigation/Footer';

interface PolicyLayoutProps {
    title: string;
    lastUpdated?: string;
    children: React.ReactNode;
}

export function PolicyLayout({ title, lastUpdated, children }: PolicyLayoutProps) {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-stone-300 selection:bg-[#d4af37]/30 selection:text-white pb-20 pt-32">
            <PageNavigation />

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 text-center"
                >
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div className="h-px w-12 bg-linear-to-r from-transparent to-[#d4af37]" />
                        <span className="text-[#d4af37] font-[Cinzel] tracking-[0.3em] text-xs uppercase">TECHUTOPIA 2026</span>
                        <div className="h-px w-12 bg-linear-to-l from-transparent to-[#d4af37]" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-[Cinzel] font-black text-white tracking-widest uppercase mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                        {title}
                    </h1>
                    {lastUpdated && (
                        <p className="text-stone-500 font-serif italic text-sm">
                            Last Updated: {lastUpdated}
                        </p>
                    )}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="prose prose-invert prose-stone max-w-none 
                        prose-headings:font-[Cinzel] prose-headings:text-[#d4af37] prose-headings:tracking-widest prose-headings:uppercase 
                        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-[#d4af37]/20 prose-h2:pb-4
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                        prose-p:text-stone-400 prose-p:leading-relaxed prose-p:mb-6
                        prose-ul:text-stone-400 prose-ul:mb-6 prose-li:my-2
                        prose-a:text-[#d4af37] hover:prose-a:text-white prose-a:transition-colors
                        prose-strong:text-stone-200 prose-strong:font-bold
                        bg-[#1A1C23]/40 border border-[#d4af37]/10 rounded-2xl p-8 md:p-12 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
                >
                    {children}
                </motion.div>
            </div>

            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-30">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4af37] blur-[150px] rounded-full opacity-10 animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#8b7355] blur-[120px] rounded-full opacity-20 animate-pulse-slow [animation-delay:2s]" />
            </div>

            <div className="mt-32">
                <Footer />
            </div>
        </main>
    );
}
