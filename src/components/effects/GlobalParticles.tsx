'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { colors } from '@/constants/colors';

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

export function GlobalParticles() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // Generate particles
        const newParticles: Particle[] = [];
        const particleCount = window.innerWidth < 768 ? 25 : 50;

        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 3 + 1,
                duration: Math.random() * 15 + 10,
                delay: Math.random() * 5,
                opacity: Math.random() * 0.5 + 0.2,
            });
        }
        setParticles(newParticles);
    }, []);

    if (!mounted) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-[5] overflow-hidden"
            aria-hidden="true"
        >
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        background: `radial-gradient(circle, ${colors.gold.primary}, ${colors.gold.dark})`,
                        boxShadow: `0 0 ${particle.size * 2}px ${colors.gold.glow}`,
                        opacity: particle.opacity,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.sin(particle.id) * 50, 0],
                        opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Larger ambient embers */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`ember-${i}`}
                    className="absolute rounded-full blur-[2px]"
                    style={{
                        left: `${10 + i * 12}%`,
                        top: `${Math.random() * 80 + 10}%`,
                        width: 4 + Math.random() * 4,
                        height: 4 + Math.random() * 4,
                        background: colors.gold.light,
                        boxShadow: `0 0 15px ${colors.gold.glow}`,
                    }}
                    animate={{
                        y: [0, -200, 0],
                        x: [0, (i % 2 === 0 ? 30 : -30), 0],
                        opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                        duration: 20 + i * 2,
                        delay: i * 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
