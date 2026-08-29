'use client';

import { useEffect, useRef, useState } from 'react';
import { CountdownTimer } from '../../components/ui/CountdownTimer';
import { CloudTransition } from '../../components/ui/CloudTransition';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { RealmParticles } from '../../components/ui/RealmParticles';
import { AnimeSlideshow } from '../../components/ui/AnimeSlideshow';
import { ChevronDown } from 'lucide-react';

interface CloudLayer {
    id: number;
    x: number; // Normalized -0.5 to 0.5
    y: number; // Normalized -0.5 to 0.5
    z: number; // Depth 0 to worldDepth
    scaleBase: number; // Base scale of the image
    imgIndex: number; // 0 to 3
    rotation: number;
    opacity: number;
}

interface ColorScheme {
    background: [number, number, number]; // RGB
    overlayColor: [number, number, number, number]; // RGBA
}

// Optimized numeric lerp
function lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
}

// Convert RGB array to Hex String
function rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (Math.round(r) << 16) + (Math.round(g) << 8) + Math.round(b)).toString(16).slice(1);
}

// Convert RGBA array to String
function rgbaToString(r: number, g: number, b: number, a: number): string {
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
}

class ImageCloudSystem {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    fgCtx: CanvasRenderingContext2D; // Foreground context
    images: HTMLImageElement[] = [];
    clouds: CloudLayer[] = [];

    // Pre-parsed Schemes: Zeus (Sky) -> Poseidon (Ocean) -> Athena (Wisdom)
    // Sky: #2C3E50 (44, 62, 80), Overlay: (44, 62, 80, 0.3)
    // Ocean: #002b36 (0, 43, 54), Overlay: (0, 43, 54, 0.3)
    // Hades: #241600 (36, 22, 0), Overlay: (212, 175, 55, 0.25)
    colorSchemes: Record<string, ColorScheme> = {
        sky: { background: [44, 62, 80], overlayColor: [44, 62, 80, 0.3] },
        ocean: { background: [0, 43, 54], overlayColor: [0, 43, 54, 0.3] },
        hades: { background: [36, 22, 0], overlayColor: [212, 175, 55, 0.25] }
    };

    currentBg = '#2C3E50';
    currentOverlay = 'rgba(44, 62, 80, 0.3)';

    worldDepth = 3000;
    fov = 800;
    loaded = false;
    seed = 12345; // Fixed seed for deterministic clouds

    constructor(canvas: HTMLCanvasElement, fgCanvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!;
        this.fgCtx = fgCanvas.getContext('2d')!;
        this.loadImages();

        // CRITICAL FIX: Render initial frame immediately to prevent black screen
        this.renderInitialFrame();
    }

    renderInitialFrame() {
        // Render initial background color immediately
        const width = this.canvas.width;
        const height = this.canvas.height;

        this.ctx.fillStyle = this.currentBg;
        this.ctx.fillRect(0, 0, width, height);

        this.fgCtx.clearRect(0, 0, width, height);
    }

    loadImages() {
        const sources = ['/Cloud1.webp', '/Cloud2.webp', '/Cloud3.webp', '/Cloud4.webp'];
        let loadedCount = 0;
        sources.forEach((src, index) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === sources.length) {
                    this.loaded = true;
                }
            };
            this.images[index] = img;
        });
    }

    seededRandom() {
        const x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }

    initClouds(count = 150) {
        this.clouds = [];
        this.seed = 12345; // Reset seed on init

        const getSafeX = (range: number) => {
            // Generate X but avoid center [-0.7, 0.7] (Wider tunnel)
            let x = (this.seededRandom() - 0.5) * range;
            if (x > -0.7 && x < 0.7) {
                x = x > 0 ? x + 0.7 : x - 0.7;
            }
            return x;
        };

        // Background Filler Clouds (Far away - can be anywhere roughly)
        for (let i = 0; i < count * 0.4; i++) {
            this.clouds.push({
                id: i,
                x: (this.seededRandom() - 0.5) * 6, // Background is wide
                y: (this.seededRandom() - 0.5) * 4,
                z: this.seededRandom() * this.worldDepth + 1000,
                scaleBase: 3.0 + this.seededRandom() * 2.0,
                imgIndex: Math.floor(this.seededRandom() * 4),
                rotation: this.seededRandom() * Math.PI * 2,
                opacity: 0.2 + this.seededRandom() * 0.3
            });
        }

        // Mid-Ground and Foreground Clouds (Create Tunnel)
        for (let i = 0; i < count * 0.6; i++) {
            this.clouds.push({
                id: 1000 + i,
                x: getSafeX(4), // Apply safe zone
                y: (this.seededRandom() - 0.5) * 2,
                z: this.seededRandom() * this.worldDepth,
                scaleBase: 0.5 + this.seededRandom() * 1.5,
                imgIndex: Math.floor(this.seededRandom() * 4),
                rotation: (this.seededRandom() - 0.5) * 0.5,
                opacity: 0.7 + this.seededRandom() * 0.3
            });
        }

        // Hero Clouds (Fly through - Strictly sides)
        for (let i = 0; i < 10; i++) {
            this.clouds.push({
                id: 2000 + i,
                x: (this.seededRandom() > 0.5 ? 1 : -1) * (0.5 + this.seededRandom() * 0.5), // Push to sides > 0.5
                y: (this.seededRandom() - 0.5) * 1.0,
                z: this.seededRandom() * 500,
                scaleBase: 2.0,
                imgIndex: Math.floor(this.seededRandom() * 4),
                rotation: this.seededRandom() * 0.2,
                opacity: 0.9
            });
        }
    }

    updateScheme(scrollPercent: number) {
        // 0-20%: Sky (Hold)
        // 20-40%: Sky -> Ocean (Transition)
        // 40-60%: Ocean (Hold)
        // 60-80%: Ocean -> Athena (Transition)
        // 80-100%: Athena (Hold)

        let startScheme = this.colorSchemes.sky;
        let endScheme = this.colorSchemes.sky;
        let t = 0;

        if (scrollPercent <= 20) {
            startScheme = this.colorSchemes.sky;
            endScheme = this.colorSchemes.sky;
            t = 0;
        } else if (scrollPercent <= 40) {
            startScheme = this.colorSchemes.sky;
            endScheme = this.colorSchemes.ocean;
            t = (scrollPercent - 20) / 20;
        } else if (scrollPercent <= 60) {
            startScheme = this.colorSchemes.ocean;
            endScheme = this.colorSchemes.ocean;
            t = 0;
        } else if (scrollPercent <= 80) {
            startScheme = this.colorSchemes.ocean;
            endScheme = this.colorSchemes.hades;
            t = (scrollPercent - 60) / 20;
        } else {
            startScheme = this.colorSchemes.hades;
            endScheme = this.colorSchemes.hades;
            t = 0;
        }

        // Clamp percent
        t = Math.max(0, Math.min(1, t));

        // Interpolate Background (RGB)
        const bgR = lerp(startScheme.background[0], endScheme.background[0], t);
        const bgG = lerp(startScheme.background[1], endScheme.background[1], t);
        const bgB = lerp(startScheme.background[2], endScheme.background[2], t);
        this.currentBg = rgbToHex(bgR, bgG, bgB);

        // Interpolate Overlay (RGBA)
        const ovR = lerp(startScheme.overlayColor[0], endScheme.overlayColor[0], t);
        const ovG = lerp(startScheme.overlayColor[1], endScheme.overlayColor[1], t);
        const ovB = lerp(startScheme.overlayColor[2], endScheme.overlayColor[2], t);
        const ovA = lerp(startScheme.overlayColor[3], endScheme.overlayColor[3], t);
        this.currentOverlay = rgbaToString(ovR, ovG, ovB, ovA);
    }

    render(scrollY: number) {
        if (!this.loaded) return;

        const width = this.canvas.width;
        const height = this.canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Clear both canvases
        this.ctx.clearRect(0, 0, width, height);
        this.fgCtx.clearRect(0, 0, width, height);

        // Render Clouds
        // Sort by depth (Painter's algorithm)
        const flightSpeed = 1.0; // Synced with scroll
        const zOffset = scrollY * flightSpeed;

        const renderList = this.clouds.map(cloud => {
            let relativeZ = (cloud.z - zOffset) % this.worldDepth;
            if (relativeZ < 0) relativeZ += this.worldDepth;

            return { ...cloud, relativeZ };
        }).filter(c => c.relativeZ > 10 && c.relativeZ < this.worldDepth * 0.9); // Cull more aggressively

        // Sort: Farthest to Nearest
        renderList.sort((a, b) => b.relativeZ - a.relativeZ);

        // The Threshold:
        // Clouds with relativeZ > partitionDepth go in BG (behind silhouette)
        // Clouds with relativeZ <= partitionDepth go in FG (in front of silhouette)
        // Adjust this value base on "where" the silhouette is z-wise.
        // Assuming silhouette is approx at z=800 conceptually
        const partitionDepth = 800;

        renderList.forEach(cloud => {
            const scale = this.fov / cloud.relativeZ;

            const screenX = centerX + cloud.x * width * (scale / 2);
            const screenY = centerY + cloud.y * height * (scale / 2);

            // Image dimensions
            const img = this.images[cloud.imgIndex];
            const drawW = img.width * scale * cloud.scaleBase * 0.5;
            const drawH = img.height * scale * cloud.scaleBase * 0.5;

            // Frustum culling - skip clouds outside viewport
            if (screenX + drawW < 0 || screenX - drawW > width ||
                screenY + drawH < 0 || screenY - drawH > height) {
                return;
            }

            // Opacity Logic
            let alpha = cloud.opacity;
            const distRatio = cloud.relativeZ / this.worldDepth;

            if (distRatio > 0.8) alpha *= (1 - distRatio) * 5; // Fade in at back

            // Fade out earlier as they approach camera to prevent screen blocking
            if (cloud.relativeZ < 400) alpha *= (cloud.relativeZ / 400);

            // Prevent huge clouds from being fully opaque
            if (scale > 3) alpha *= 0.5;
            if (scale > 5) alpha *= 0.2;

            if (alpha > 0.01) {
                // Select Context based on depth
                const targetCtx = (cloud.relativeZ > partitionDepth) ? this.ctx : this.fgCtx;

                targetCtx.save();
                targetCtx.globalAlpha = alpha;
                targetCtx.translate(screenX, screenY);
                targetCtx.rotate(cloud.rotation);
                targetCtx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
                targetCtx.restore();
            }
        });

        // Apply overlay to Background clouds (Tinting)
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'source-atop';
        this.ctx.fillStyle = this.currentOverlay;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.restore();

        // Draw Background Color (Behind everything on BG canvas)
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'destination-over';
        this.ctx.fillStyle = this.currentBg;
        this.ctx.fillRect(0, 0, width, height);
        this.ctx.restore();

        // Apply overlay to Foreground clouds (Tinting)
        this.fgCtx.save();
        this.fgCtx.globalCompositeOperation = 'source-atop';
        this.fgCtx.fillStyle = this.currentOverlay;
        this.fgCtx.fillRect(0, 0, width, height);
        this.fgCtx.restore();
    }
}

export default function CloudParallaxPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fgCanvasRef = useRef<HTMLCanvasElement>(null);
    const systemRef = useRef<ImageCloudSystem | null>(null);
    const requestRef = useRef<number | null>(null);

    const [showTransition, setShowTransition] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Scroll handling for Z-Axis Text Animations
    const { scrollYProgress } = useScroll();

    // Smooth the scroll usage for cleaner transforms
    const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20, restDelta: 0.001 });

    // Z-Axis Fly-Through Logic:
    // 1. Sky Realm (0 - 0.3)
    // Updated: Cap scale to prevent overflow, sync opacity with Zeus
    const skyScale = useTransform(smoothScroll, [0, 0.1, 0.25], [1, 1.2, 1.5]); // Capped at 1.5
    const skyOpacity = useTransform(smoothScroll, [0, 0.05, 0.15, 0.25], [0, 1, 1, 0]); // Fade with Zeus
    const skyBlur = useTransform(smoothScroll, [0.3, 0.4], [0, 20]); // Motion blur effect

    // Zeus Silhouette - Holographic Effect (appears then fades)
    // Updated: Goes to Full Visibility
    const zeusOpacity = useTransform(smoothScroll, [0, 0.05, 0.15, 0.25], [0, 1, 1, 0]);
    const zeusScale = useTransform(smoothScroll, [0.05, 0.15, 0.25], [0.8, 1.2, 3.5]); // More Intimidating Scale

    // 2. Quote (0.2 - 0.45)
    // Enters from 0.2
    const quoteScale = useTransform(smoothScroll, [0.15, 0.3, 0.45], [0.5, 1, 3]);
    const quoteOpacity = useTransform(smoothScroll, [0.15, 0.25, 0.40, 0.50], [0, 1, 1, 0]); // Extended hold
    const quoteFilter = useTransform(smoothScroll, [0.40, 0.50], ["blur(0px)", "blur(10px)"]);

    // 3. Ocean Realm (0.4 - 0.7)
    const oceanScale = useTransform(smoothScroll, [0.4, 0.55, 0.8], [0.5, 1, 3]);
    const oceanOpacity = useTransform(smoothScroll, [0.4, 0.5, 0.65, 0.8], [0, 1, 1, 0]);
    const oceanFilter = useTransform(smoothScroll, [0.65, 0.8], ["blur(0px)", "blur(10px)"]);

    // Poseidon Silhouette - Holographic Effect (appears then fades in ocean realm)
    // Updated: Fade in Earlier, Hold Longer, Fade out BEFORE Hades
    const poseidonOpacity = useTransform(smoothScroll, [0.40, 0.50, 0.65, 0.75], [0, 1, 1, 0]); // End at 0.75
    const poseidonScale = useTransform(smoothScroll, [0.45, 0.6, 0.75], [0.8, 1.2, 3.5]); // More Intimidating Scale

    // 4. Athena (0.7 - 1.0)
    // Ends at user (Scale 1) so they can interact
    const underworldScale = useTransform(smoothScroll, [0.7, 0.95], [0.5, 1]);
    const underworldOpacity = useTransform(smoothScroll, [0.7, 0.85], [0, 1]);

    // Hades Silhouette
    const hadesOpacity = useTransform(smoothScroll, [0.75, 0.85], [0, 1]);
    const hadesScale = useTransform(smoothScroll, [0.75, 1.0], [0.8, 1.4]); // Scale up but keep readable behind buttons

    // Scroll Indicator Opacity
    const scrollIndicatorOpacity = useTransform(smoothScroll, [0, 0.05], [1, 0]);

    // Breathing Animation (Scale & Y) - continuous
    const breathingTransition = {
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror" as const,
        ease: "easeInOut" as const
    };

    // Fix hydration by ensuring client-side only rendering
    useEffect(() => {
        setMounted(true);
    }, []);

    // Hide Scrollbar Effect
    useEffect(() => {
        if (!mounted) return;

        const style = document.createElement('style');
        style.textContent = `
            ::-webkit-scrollbar { display: none !important; }
            html { -ms-overflow-style: none; scrollbar-width: none; }
            body { -ms-overflow-style: none; scrollbar-width: none; }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        }
    }, [mounted]);

    // Preload first few anime slideshow images to prevent lag on initial scroll
    useEffect(() => {
        if (!mounted) return;

        const preloadImages = [
            '/Home/anime/1.webp',
            '/Home/anime/2.webp',
            '/Home/anime/3.webp',
            '/Home/anime/4.webp',
            '/Home/anime/5.webp',
        ];

        preloadImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }, [mounted]);

    // Animation frames
    useEffect(() => {
        if (!mounted) return;

        const script = document.createElement('script');
        script.src = 'https://apply.devfolio.co/v2/sdk.js';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        }
    }, [mounted]);

    useEffect(() => {
        if (!mounted || !canvasRef.current || !fgCanvasRef.current) return;

        const canvas = canvasRef.current;
        const fgCanvas = fgCanvasRef.current;
        const system = new ImageCloudSystem(canvas, fgCanvas);
        systemRef.current = system;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            fgCanvas.width = window.innerWidth;
            fgCanvas.height = window.innerHeight;
            system.initClouds(150); // Restored original count
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        let lastScrollY = -1;

        const animate = (_time: number) => {
            // Synchronize Canvas with Framer Motion's smoothScroll
            const progress = smoothScroll.get(); // 0 to 1
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;

            // Calculate equivalent scrollY from the smooth progress
            const currentScrollY = progress * (documentHeight - windowHeight);

            // SMOOTH SCROLL PRIORITY: Render every frame for smoothness, only skip if truly identical
            if (Math.abs(currentScrollY - lastScrollY) > 0.1 || !system.loaded) {
                const percent = progress * 100;
                system.updateScheme(percent);
                system.render(currentScrollY);
                if (system.loaded) {
                    lastScrollY = currentScrollY;
                }
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [mounted, smoothScroll]); // CRITICAL FIX: Remove smoothScroll dependency to prevent re-initialization

    const handleTransitionComplete = () => {
        setShowTransition(false);
    };

    // Don't render until mounted to prevent hydration mismatch
    if (!mounted) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#2C3E50' }}>
                {/* Loading state */}
            </div>
        );
    }

    return (
        <div style={{ minHeight: '600vh', position: 'relative', overflowX: 'hidden' }}>

            {showTransition && (
                <CloudTransition
                    type="uncover"
                    onComplete={handleTransitionComplete}
                />
            )}

            {/* Fixed Canvas Layer - Background Clouds */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    pointerEvents: 'none',
                    zIndex: 0
                }}
            />

            {/* Fixed Canvas Layer - Foreground Clouds */}
            <canvas
                ref={fgCanvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    pointerEvents: 'none',
                    zIndex: 2 // Above Silhouettes (Z-1)
                }}
            />

            {/* Fixed Content Container */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                {/* 1. Sky Realm - Anime Slideshow (images 1-14) */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    <motion.div style={{ opacity: skyOpacity, position: 'absolute', inset: 0 }}>
                        <RealmParticles variant="zeus" />
                    </motion.div>
                </div>

                {/* Sky Realm Anime Slideshow */}
                <motion.div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: zeusOpacity,
                    zIndex: 1,
                    willChange: 'transform, opacity',
                }}>
                    <AnimeSlideshow
                        smoothScroll={smoothScroll}
                        scrollStart={0}
                        scrollEnd={0.25}
                        imageSlice={[0, 14]}
                    />
                </motion.div>

                {/* Zeus Title - Below silhouette */}
                <motion.div style={{
                    position: 'absolute',
                    top: '70%',
                    width: '100%',
                    opacity: skyOpacity,
                    scale: skyScale,
                    filter: skyBlur,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20,
                    willChange: 'transform, opacity',
                }}>
                    <h1
                        style={{
                            fontFamily: 'tech Origin, sans-serif',
                            fontSize: 'min(10vw, 8rem)',
                            fontWeight: 'normal',
                            // High-contrast metallic gold gradient
                            background: 'linear-gradient(to bottom, #cfc09f 22%,#634f2c 24%, #cfc09f 26%, #634f2c 27%,#ffecb3 40%,#3a2c0f 78%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            // Black Outline
                            WebkitTextStroke: '0px transparent',
                            // Clean 3D shadows
                            textShadow: `
                                0px 1px 0px #917024,
                                0px 2px 0px #6e521b,
                                0px 3px 0px #4c3611,
                                0px 4px 6px rgba(0,0,0,0.6)
                            `,
                            // Restore filter for the "Glow"
                            filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))',
                            textAlign: 'center',
                            margin: 0,
                            lineHeight: 1.1,
                            letterSpacing: '0.05em',
                            position: 'relative'
                        }}
                    >
                        TECHUTOPIA <span style={{ fontFamily: 'inherit' }}>5.0</span>
                    </h1>
                </motion.div>

                {/* Quote Section */}
                <motion.div style={{
                    position: 'absolute',
                    opacity: quoteOpacity,
                    scale: quoteScale,
                    filter: quoteFilter,
                    willChange: 'transform, opacity',
                }}>
                    <p style={{
                        fontFamily: 'Cinzel, serif',
                        fontSize: '2.5rem',
                        color: '#d4af37',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2rem',
                        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                        textAlign: 'center'
                    }}>
                        — From MYTH to Main Frame —
                    </p>
                </motion.div>

                {/* 2. Ocean Realm - Poseidon */}
                <motion.div style={{ opacity: oceanOpacity, position: 'absolute', inset: 0, zIndex: 0 }}>
                    <RealmParticles variant="poseidon" />
                </motion.div>

                {/* Ocean Realm Anime Slideshow */}
                <motion.div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: poseidonOpacity,
                    zIndex: 1,
                    willChange: 'transform, opacity',
                }}>
                    <AnimeSlideshow
                        smoothScroll={smoothScroll}
                        scrollStart={0.40}
                        scrollEnd={0.75}
                        imageSlice={[14, 27]}
                    />
                </motion.div>

                {/* Ocean Text - Below silhouette */}
                <motion.div style={{
                    position: 'absolute',
                    top: '70%',
                    width: '100%',
                    opacity: oceanOpacity,
                    scale: oceanScale,
                    filter: oceanFilter,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20
                }}>
                    <div style={{
                        textAlign: 'center'
                    }}>
                        <h2 style={{
                            fontFamily: 'Cinzel, serif',
                            fontSize: '4rem',
                            color: '#e0f7fa',
                            textShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
                            marginBottom: '1rem'
                        }}>
                            13 March - 15 March
                        </h2>
                        <p style={{
                            fontFamily: 'Cinzel, serif',
                            fontSize: '1.5rem',
                            color: '#b3e5fc',
                            letterSpacing: '0.1rem'
                        }}>
                            UEM Jaipur
                        </p>
                    </div>
                </motion.div>

                {/* 3. Hades Realm - Anime Slideshow (images 28-41) */}
                <motion.div style={{ opacity: underworldOpacity, position: 'absolute', inset: 0, zIndex: 0 }}>
                    <RealmParticles variant="hades" />
                </motion.div>

                {/* Underworld Realm Anime Slideshow */}
                <motion.div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: hadesOpacity,
                    zIndex: 1,
                    willChange: 'transform, opacity',
                }}>
                    <AnimeSlideshow
                        smoothScroll={smoothScroll}
                        scrollStart={0.75}
                        scrollEnd={1.0}
                        imageSlice={[27, 41]}
                    />
                </motion.div>

                {/* Provide pointerEvents: 'auto' so buttons work */}
                <motion.div style={{
                    position: 'absolute',
                    opacity: underworldOpacity,
                    scale: underworldScale,
                    width: '100%',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    pointerEvents: 'auto' // Re-enable for this layer
                }}>

                    <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '2rem' }}>
                        <CountdownTimer />
                    </div>

                    <div
                        className="apply-button"
                        data-hackathon-slug="techutopia-v5"
                        data-button-theme="dark"
                        style={{ height: '44px', width: '312px', zIndex: 50, position: 'relative' }}
                    ></div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: 0,
                    right: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: scrollIndicatorOpacity,
                    color: '#fff',
                    zIndex: 20
                }}>
                    <span style={{
                        fontFamily: 'Cinzel, serif',
                        marginBottom: '0.5rem',
                        fontSize: '0.9rem',
                        letterSpacing: '0.1em',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        Scroll to Explore
                    </span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown size={24} color="#ffd700" />
                    </motion.div>
                </motion.div>

            </div>
        </div>
    );
}