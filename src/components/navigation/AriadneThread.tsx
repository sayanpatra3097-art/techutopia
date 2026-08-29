'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { colors, SectionName } from '@/constants/colors';

interface SectionInfo {
    id: SectionName;
    label: string;
    icon: string;
}

const sections: SectionInfo[] = [
    { id: 'hero', label: 'Olympus', icon: '⚡' },
    { id: 'about', label: 'The Tale', icon: '📜' },
    { id: 'prizes', label: 'Treasures', icon: '🏆' },
    { id: 'partners', label: 'Allies', icon: '🤝' },
];

export function AriadneThread() {
    const [activeSection, setActiveSection] = useState<SectionName>('hero');
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll();

    // Map scroll progress (0-1) to thread position
    const owlY = useTransform(scrollYProgress, [0, 1], [0, 100]);

    useEffect(() => {
        // Show thread after initial load
        const timer = setTimeout(() => setIsVisible(true), 1500);

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const vh = window.innerHeight;

            // Determine active section based on scroll position
            if (scrollY < vh * 0.8) {
                setActiveSection('hero');
            } else if (scrollY < vh * 2.5) {
                setActiveSection('about');
            } else if (scrollY < vh * 3.5) {
                setActiveSection('prizes');
            } else {
                setActiveSection('partners');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
        };
    }, []);

    const scrollToSection = (id: SectionName) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center"
        >
            {/* The Golden Thread */}
            <div className="relative h-[300px] w-[3px] rounded-full overflow-hidden">
                {/* Thread background */}
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `linear-gradient(to bottom, ${colors.gold.dark}40, ${colors.gold.primary}80, ${colors.gold.dark}40)`
                    }}
                />

                {/* Animated glow */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                        background: `linear-gradient(to bottom, transparent, ${colors.gold.primary}, transparent)`,
                    }}
                    animate={{
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Owl marker moving along thread */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center"
                    style={{
                        top: owlY,
                        filter: `drop-shadow(0 0 10px ${colors.gold.primary})`,
                    }}
                >
                    <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                        style={{
                            background: `linear-gradient(135deg, ${colors.gold.primary}, ${colors.gold.dark})`,
                            boxShadow: `0 0 20px ${colors.gold.glow}`,
                        }}
                    >
                        🦉
                    </div>
                </motion.div>
            </div>

            {/* Section markers */}
            <div className="absolute left-6 top-0 h-full flex flex-col justify-between py-2">
                {sections.map((section, index) => {
                    const isActive = activeSection === section.id;
                    return (
                        <motion.button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className="group flex items-center gap-2 cursor-pointer"
                            whileHover={{ x: 5 }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                        >
                            {/* Dot on thread */}
                            <motion.div
                                className="w-2 h-2 rounded-full transition-all duration-300"
                                style={{
                                    background: isActive ? colors.gold.primary : colors.gold.dark + '60',
                                    boxShadow: isActive ? `0 0 10px ${colors.gold.glow}` : 'none',
                                }}
                                animate={{ scale: isActive ? 1.5 : 1 }}
                            />

                            {/* Label */}
                            <motion.span
                                className="text-[10px] uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap"
                                style={{
                                    color: isActive ? colors.gold.primary : '#666',
                                    textShadow: isActive ? `0 0 10px ${colors.gold.glow}` : 'none',
                                }}
                            >
                                {section.icon} {section.label}
                            </motion.span>
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
}
