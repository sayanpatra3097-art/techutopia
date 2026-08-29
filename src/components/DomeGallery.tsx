'use client';

import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import { motion, AnimatePresence } from 'framer-motion';

type ImageItem = string | { src: string; alt?: string; caption?: string };

interface Particle {
    id: number;
    top: number;
    left: number;
    width: number;
    height: number;
    delay: number;
    duration: number;
}

interface DomeGalleryProps {
    images?: ImageItem[];
    radius?: number;
    segmentsX?: number;
    segmentsY?: number;
    dragSensitivity?: number;
    friction?: number;
}

// 42 Past event gallery images from public/gallery/past/
const DEFAULT_IMAGES: ImageItem[] = [
    { src: "/gallery/past/1.webp", caption: "TECHUTOPIA MOMENTS" },
    { src: "/gallery/past/2.webp", caption: "INNOVATION & CODE" },
    { src: "/gallery/past/3.webp", caption: "ROBOTICS ARENA" },
    { src: "/gallery/past/4.webp", caption: "STUDENT CREATIVITY" },
    { src: "/gallery/past/5.webp", caption: "EXPERIMENTATION" },
    { src: "/gallery/past/6.webp", caption: "COLLABORATION" },
    { src: "/gallery/past/7.webp", caption: "STAGE HIGHLIGHTS" },
    { src: "/gallery/past/8.webp", caption: "TECH EXPO" },
    { src: "/gallery/past/9.webp", caption: "SPEED & SKILL" },
    { src: "/gallery/past/10.webp", caption: "LEADERSHIP" },
    { src: "/gallery/past/11.webp", caption: "PROTOTYPES" },
    { src: "/gallery/past/12.webp", caption: "THE CROWD" },
    { src: "/gallery/past/13.webp", caption: "CELEBRATION" },
    { src: "/gallery/past/14.webp", caption: "TECHUTOPIA SPIRIT" },
    { src: "/gallery/past/15.webp", caption: "HACKATHON NIGHTS" },
    { src: "/gallery/past/16.webp", caption: "ROBO WARS" },
    { src: "/gallery/past/17.webp", caption: "PITCH SESSIONS" },
    { src: "/gallery/past/18.webp", caption: "KEYNOTE ADDRESS" },
    { src: "/gallery/past/19.webp", caption: "TALENT SHOWCASE" },
    { src: "/gallery/past/20.webp", caption: "BUILDING THE FUTURE" },
    { src: "/gallery/past/21.webp", caption: "VICTORY MOMENTS" },
    { src: "/gallery/past/22.webp", caption: "AEROMODELLING" },
    { src: "/gallery/past/23.webp", caption: "CREATIVE DESIGNS" },
    { src: "/gallery/past/24.webp", caption: "PANEL DISCUSSIONS" },
    { src: "/gallery/past/25.webp", caption: "CULTURAL VIBES" },
    { src: "/gallery/past/26.webp", caption: "TEAMWORK" },
    { src: "/gallery/past/27.webp", caption: "MAKING HISTORY" },
    { src: "/gallery/past/28.webp", caption: "AWARD CEREMONY" },
    { src: "/gallery/past/29.webp", caption: "ELECTRIC ENERGY" },
    { src: "/gallery/past/30.webp", caption: "STUDENT INNOVATION" },
    { src: "/gallery/past/31.webp", caption: "CIRCUITS & SENSORS" },
    { src: "/gallery/past/32.webp", caption: "TECH EXHIBITS" },
    { src: "/gallery/past/33.webp", caption: "THE ARENA" },
    { src: "/gallery/past/34.webp", caption: "CHAMPIONS" },
    { src: "/gallery/past/35.webp", caption: "MEMORIES" },
    { src: "/gallery/past/36.webp", caption: "TECHUTOPIA" },
    { src: "/gallery/past/37.webp", caption: "DISCOVERY" },
    { src: "/gallery/past/38.webp", caption: "INSPIRATION" },
    { src: "/gallery/past/39.webp", caption: "EXPERIMENTS" },
    { src: "/gallery/past/40.webp", caption: "COMMUNITY" },
    { src: "/gallery/past/41.webp", caption: "EXCELLENCE" },
    { src: "/gallery/past/42.webp", caption: "GRANDE FINALE" },
];

export default function DomeGallery({
    images = DEFAULT_IMAGES,
    radius = 700,
    segmentsX = 18,
    segmentsY = 5,
    dragSensitivity = 0.22,
    friction = 0.97
}: DomeGalleryProps) {
    // Responsive Configuration State
    const [config, setConfig] = useState({
        radius: radius || 700,
        segmentsX: segmentsX || 18,
        segmentsY: segmentsY || 5,
        particleCount: 40,
        dragSensitivity: dragSensitivity || 0.22
    });

    // Detect screen size and adjust configuration
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) { // Mobile
                setConfig({
                    radius: 340, // Much closer for mobile interactivity
                    segmentsX: 12, // Fewer segments to prevent overlap
                    segmentsY: 4,
                    particleCount: 15, // Performance optimization
                    dragSensitivity: 0.45 // Higher sensitivity for mobile touch
                });
            } else if (width < 1024) { // Tablet
                setConfig({
                    radius: 500,
                    segmentsX: 14,
                    segmentsY: 5,
                    particleCount: 25,
                    dragSensitivity: 0.3
                });
            } else { // Desktop
                setConfig({
                    radius: radius || 700,
                    segmentsX: segmentsX || 18,
                    segmentsY: segmentsY || 5,
                    particleCount: 40,
                    dragSensitivity: dragSensitivity || 0.22
                });
            }
        };

        handleResize(); // Initial call
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [radius, segmentsX, segmentsY, dragSensitivity]);

    const sphereRef = useRef<HTMLDivElement>(null);
    const rot = useRef({ x: 0, y: 0 });
    const vel = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const [selectedImage, setSelectedImage] = useState<{ src: string; caption?: string } | null>(null);
    const [isAutoRotating, setIsAutoRotating] = useState(true);

    // Generate particles only on client to avoid hydration mismatch
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        setParticles(
            Array.from({ length: config.particleCount }).map((_, i) => ({
                id: i,
                top: Math.random() * 100,
                left: Math.random() * 100,
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                delay: Math.random() * 5,
                duration: Math.random() * 3 + 3,
            }))
        );
    }, [config.particleCount]);

    // Pre-calculate tile positions with responsive config
    const tiles = useMemo(() => {
        const total = config.segmentsX * config.segmentsY;
        return Array.from({ length: total }).map((_, i) => {
            const col = i % config.segmentsX;
            const row = Math.floor(i / config.segmentsX);
            const angleY = (col / config.segmentsX) * 360;
            const angleX = (row - (config.segmentsY - 1) / 2) * 18;
            const img = images[i % images.length];
            const imgData = typeof img === 'string' ? { src: img } : img;
            return {
                id: i,
                src: imgData.src,
                alt: imgData.alt || '',
                caption: imgData.caption || '',
                rotateY: angleY,
                rotateX: angleX
            };
        });
    }, [images, config.segmentsX, config.segmentsY]);

    useEffect(() => {
        let rafId: number;
        const update = () => {
            if (!isDragging.current) {
                vel.current.x *= friction;
                vel.current.y *= friction;
                rot.current.y += vel.current.x;
                rot.current.x += vel.current.y;
                if (isAutoRotating && Math.abs(vel.current.x) < 0.01 && Math.abs(vel.current.y) < 0.01) {
                    rot.current.y += 0.06;
                }
            }
            rot.current.x = Math.max(-30, Math.min(30, rot.current.x));
            if (sphereRef.current) {
                sphereRef.current.style.transform = `translateZ(${-config.radius}px) rotateX(${-rot.current.x}deg) rotateY(${rot.current.y}deg)`;
            }
            rafId = requestAnimationFrame(update);
        };
        rafId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(rafId);
    }, [config.radius, friction, isAutoRotating]);

    const bind = useGesture({
        onDrag: ({ delta: [dx, dy], down }) => {
            isDragging.current = down;
            if (down) {
                setIsAutoRotating(false);
                // Use responsive sensitivity or fallback
                const sensitivity = (config as any).dragSensitivity || dragSensitivity;
                vel.current.x = dx * sensitivity;
                vel.current.y = dy * sensitivity;
                rot.current.y += vel.current.x;
                rot.current.x += vel.current.y;
            }
        },
        onDragEnd: () => {
            setTimeout(() => setIsAutoRotating(true), 3000);
        }
    });

    const handleImageClick = useCallback((tile: { src: string; caption?: string }) => {
        setSelectedImage(tile);
        setIsAutoRotating(false);
    }, []);

    const closeModal = useCallback(() => {
        setSelectedImage(null);
        setTimeout(() => setIsAutoRotating(true), 1000);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-neutral-950 flex items-center justify-center select-none touch-none">
            {/* Ancient Marble/Stone Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-transparent to-amber-950/30" />

            {/* Decorative Greek Columns - Left */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 pointer-events-none z-10 hidden lg:flex flex-col justify-between py-20">
                <div className="relative">
                    <div className="w-full h-8 bg-gradient-to-b from-amber-700/40 to-amber-900/30 border-b-2 border-amber-600/30" />
                    <div className="w-full h-2 bg-amber-600/20" />
                    <div className="w-full flex-1 bg-gradient-to-r from-amber-900/20 via-amber-800/10 to-amber-900/20 min-h-[60vh]">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="absolute top-12 bottom-12 bg-amber-600/10" style={{ left: `${15 + i * 14}%`, width: '2px' }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Decorative Greek Columns - Right */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 pointer-events-none z-10 hidden lg:flex flex-col justify-between py-20">
                <div className="relative">
                    <div className="w-full h-8 bg-gradient-to-b from-amber-700/40 to-amber-900/30 border-b-2 border-amber-600/30" />
                    <div className="w-full h-2 bg-amber-600/20" />
                    <div className="w-full flex-1 bg-gradient-to-r from-amber-900/20 via-amber-800/10 to-amber-900/20 min-h-[60vh]">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="absolute top-12 bottom-12 bg-amber-600/10" style={{ left: `${15 + i * 14}%`, width: '2px' }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Greek Key Pattern Border - Top */}
            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent z-30" />
            <div className="absolute top-3 left-0 right-0 flex justify-center z-30 opacity-40">
                <div className="flex gap-0">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="w-6 h-3 border-l-2 border-t-2 border-amber-500/50" style={{ transform: i % 2 === 0 ? 'scaleX(1)' : 'scaleX(-1)' }} />
                    ))}
                </div>
            </div>

            {/* Greek Key Pattern Border - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-transparent via-amber-600/30 to-transparent z-30" />
            <div className="absolute bottom-3 left-0 right-0 flex justify-center z-30 opacity-40">
                <div className="flex gap-0">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="w-6 h-3 border-l-2 border-b-2 border-amber-500/50" style={{ transform: i % 2 === 0 ? 'scaleX(1)' : 'scaleX(-1)' }} />
                    ))}
                </div>
            </div>

            {/* Header with Laurel Wreath */}
            <div className="absolute top-0 left-0 right-0 z-20 pt-16 md:pt-20 text-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="flex justify-center items-center mb-2"
                >
                    <span className="text-amber-500/60 text-3xl md:text-4xl transform -scale-x-100">🌿</span>
                    <span className="text-amber-400 text-2xl md:text-3xl mx-2">⚱</span>
                    <span className="text-amber-500/60 text-3xl md:text-4xl">🌿</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[Cinzel] text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 drop-shadow-[0_5px_20px_rgba(212,175,55,0.4)] tracking-[0.2em] mb-2 px-2"
                >
                    PANTHEON OF MEMORIES
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-[Cinzel] text-amber-300/50 italic text-sm md:text-base tracking-wider mb-3"
                >
                    "Where legends are forged and memories immortalized"
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex items-center justify-center gap-4 md:gap-6"
                >
                    <div className="flex items-center gap-2">
                        <span className="text-amber-500 text-lg">☆</span>
                        <div className="h-[1px] w-12 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-amber-500 to-amber-600" />
                    </div>
                    <span className="text-amber-400 font-[Cinzel] text-xl md:text-2xl">Ω</span>
                    <div className="flex items-center gap-2">
                        <div className="h-[1px] w-12 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-amber-500 to-amber-600" />
                        <span className="text-amber-500 text-lg">☆</span>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="font-[Cinzel] text-amber-100/60 uppercase tracking-[0.3em] text-[10px] sm:text-xs mt-3"
                >
                    {images.length} Sacred Artifacts • Drag to Navigate the Cosmos
                </motion.p>
            </div>

            {/* 3D Dome Container */}
            <div
                className="w-full h-full flex items-center justify-center [perspective:1200px] cursor-grab active:cursor-grabbing"
                {...(bind() as React.HTMLAttributes<HTMLDivElement>)}
            >
                <div
                    ref={sphereRef}
                    className="relative w-0 h-0 [transform-style:preserve-3d] will-change-transform"
                >
                    {tiles.map((tile) => (
                        <div
                            key={tile.id}
                            className="absolute w-[160px] h-[220px] sm:w-[180px] sm:h-[250px] md:w-[200px] md:h-[280px] -left-[80px] sm:-left-[90px] md:-left-[100px] -top-[110px] sm:-top-[125px] md:-top-[140px] [transform-style:preserve-3d] [backface-visibility:hidden]"
                            style={{
                                transform: `rotateY(${tile.rotateY}deg) rotateX(${tile.rotateX}deg) translateZ(${config.radius}px)`,
                            }}
                        >
                            <div
                                className="w-full h-full p-1 sm:p-1.5 transition-all duration-500 hover:scale-110 active:scale-95 group cursor-pointer"
                                onClick={() => handleImageClick(tile)}
                            >
                                <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-amber-900/40 to-neutral-900/90 p-[3px] rounded-sm">
                                    <div className="absolute inset-0 border-2 border-amber-600/30 rounded-sm" />
                                    <div className="absolute inset-1 border border-amber-500/20 rounded-sm" />

                                    <div className="relative w-full h-full overflow-hidden bg-neutral-900">
                                        <img
                                            src={tile.src}
                                            alt={tile.alt || tile.caption}
                                            draggable={false}
                                            loading="lazy"
                                            className="w-full h-full object-cover opacity-50 group-hover:opacity-100 sepia-[30%] group-hover:sepia-0 scale-105 group-hover:scale-100 transition-all duration-700 ease-out"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-amber-950/20 to-transparent opacity-70 group-hover:opacity-30 transition-opacity duration-500" />

                                        <div className="absolute top-1 left-1 text-amber-500/40 text-xs group-hover:text-amber-400/60 transition-colors">◢</div>
                                        <div className="absolute top-1 right-1 text-amber-500/40 text-xs group-hover:text-amber-400/60 transition-colors">◣</div>
                                        <div className="absolute bottom-1 left-1 text-amber-500/40 text-xs group-hover:text-amber-400/60 transition-colors">◥</div>
                                        <div className="absolute bottom-1 right-1 text-amber-500/40 text-xs group-hover:text-amber-400/60 transition-colors">◤</div>

                                        {tile.caption && (
                                            <div className="absolute bottom-0 left-0 right-0 p-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/95 to-black/70">
                                                <div className="w-6 h-[1px] bg-amber-500/50 mx-auto mb-1" />
                                                <p className="text-amber-100 font-[Cinzel] text-[9px] sm:text-[10px] text-center tracking-[0.2em] leading-tight">
                                                    {tile.caption}
                                                </p>
                                            </div>
                                        )}

                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_30px_rgba(212,175,55,0.2)]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Aesthetic Overlays */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_300px_rgba(0,0,0,1)]" />

            {/* Fog gradients */}
            <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-neutral-950 via-neutral-950/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-neutral-950/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-l from-neutral-950/90 to-transparent z-10 pointer-events-none" />

            {/* Center vignette */}
            <div className="absolute inset-0 pointer-events-none [background:radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.85)_100%)]" />

            {/* Gold Ambient Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="absolute rounded-full bg-amber-300 animate-pulse"
                        style={{
                            top: `${p.top}%`,
                            left: `${p.left}%`,
                            width: `${p.width}px`,
                            height: `${p.height}px`,
                            opacity: 0.6,
                            boxShadow: '0 0 4px rgba(251, 191, 36, 0.8)',
                            animationDelay: `${p.delay}s`,
                            animationDuration: `${p.duration}s`,
                        }}
                    />
                ))}
            </div>

            {/* Floating Greek Symbols */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ y: [0, -20, 0], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[25%] left-[8%] text-amber-600/30 text-5xl md:text-6xl font-[Cinzel]"
                >Ω</motion.div>
                <motion.div
                    animate={{ y: [0, 15, 0], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[55%] right-[10%] text-amber-600/25 text-4xl md:text-5xl font-[Cinzel]"
                >Δ</motion.div>
                <motion.div
                    animate={{ y: [0, -15, 0], opacity: [0.12, 0.28, 0.12] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[30%] left-[12%] text-amber-600/25 text-6xl md:text-7xl font-[Cinzel]"
                >Φ</motion.div>
                <motion.div
                    animate={{ y: [0, 20, 0], opacity: [0.1, 0.22, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute top-[35%] right-[20%] text-amber-600/20 text-4xl font-[Cinzel]"
                >Ψ</motion.div>
                <motion.div
                    animate={{ y: [0, -10, 0], opacity: [0.08, 0.2, 0.08] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="absolute bottom-[40%] right-[8%] text-amber-600/20 text-5xl font-[Cinzel]"
                >Λ</motion.div>
                <motion.div
                    animate={{ y: [0, 12, 0], opacity: [0.1, 0.24, 0.1] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                    className="absolute top-[65%] left-[25%] text-amber-600/20 text-4xl font-[Cinzel]"
                >Θ</motion.div>
            </div>

            {/* Bottom instruction */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            >
                <div className="flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-amber-950/40 via-black/60 to-amber-950/40 backdrop-blur-sm rounded-full border border-amber-600/30">
                    <span className="text-amber-500 text-sm">☉</span>
                    <span className="text-amber-100/80 font-[Cinzel] text-xs tracking-[0.15em] hidden sm:inline">Drag to Navigate • Click to Behold</span>
                    <span className="text-amber-100/80 font-[Cinzel] text-xs tracking-[0.15em] sm:hidden">Swipe to Rotate • Tap to View</span>
                    <span className="text-amber-500 text-sm">☽</span>
                </div>
            </motion.div>

            {/* Scroll Indicator - Helps user access footer despite touch-none */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-amber-500/50 hover:text-amber-500 transition-colors p-2"
                aria-label="Scroll to Footer"
            >
                <span className="text-2xl">﹀</span>
            </motion.button>


            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 cursor-pointer"
                    >
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-600/50 via-transparent to-amber-600/50" />
                            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-600/50 via-transparent to-amber-600/50" />
                        </div>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="relative max-w-5xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute -inset-3 border-2 border-amber-600/30 rounded-lg" />
                            <div className="absolute -inset-1 border border-amber-500/20 rounded-lg" />

                            <div className="absolute -top-6 -left-6 text-amber-500/50 text-2xl">❧</div>
                            <div className="absolute -top-6 -right-6 text-amber-500/50 text-2xl transform -scale-x-100">❧</div>
                            <div className="absolute -bottom-6 -left-6 text-amber-500/50 text-2xl transform -scale-y-100">❧</div>
                            <div className="absolute -bottom-6 -right-6 text-amber-500/50 text-2xl transform scale-x-[-1] scale-y-[-1]">❧</div>

                            <img
                                src={selectedImage.src}
                                alt={selectedImage.caption || ''}
                                className="w-full h-auto max-h-[75vh] object-contain rounded-lg border-2 border-amber-700/40 shadow-[0_0_80px_rgba(212,175,55,0.2)]"
                            />

                            {selectedImage.caption && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-6 text-center"
                                >
                                    <div className="flex items-center justify-center gap-4 mb-2">
                                        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-600" />
                                        <span className="text-amber-500">⚜</span>
                                        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-600" />
                                    </div>
                                    <h3 className="text-amber-100 font-[Cinzel] text-xl sm:text-2xl tracking-[0.2em]">
                                        {selectedImage.caption}
                                    </h3>
                                </motion.div>
                            )}

                            <button
                                onClick={closeModal}
                                className="absolute -top-14 right-0 text-amber-400 hover:text-amber-200 transition-colors flex items-center gap-2"
                            >
                                <span className="font-[Cinzel] text-sm tracking-widest">CLOSE</span>
                                <span className="text-xl">✕</span>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
