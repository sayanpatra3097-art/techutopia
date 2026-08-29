'use client';

import { useEffect, useRef, useState } from 'react';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { CloudTransition } from '@/components/ui/CloudTransition';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';
const RealmParticles = dynamic(() => import('@/components/ui/RealmParticles').then(mod => mod.RealmParticles), { ssr: false });
const AnimeSlideshow = dynamic(() => import('@/components/ui/AnimeSlideshow').then(mod => mod.AnimeSlideshow), { ssr: false });
import { ChevronDown } from 'lucide-react';
import { useLoading } from '@/context/LoadingContext';
import { useRouter } from 'next/navigation';

// Performance Indicator (only shows in dev mode or with ?debug=true)
const PerformanceIndicator = dynamic(() => import('@/components/ui/PerformanceIndicator').then(mod => ({ default: mod.PerformanceIndicator })), { ssr: false });

// Mobile Home Page (HomePageClient)
const HomePageClient = dynamic(() => import('./HomePageClient').then(mod => ({ default: mod.HomePageClient })), { ssr: false });

// Device Detection Hook
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkMobile = () => {
            // Check multiple factors for mobile detection
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.innerWidth < 1024; // Tablets and below
            
            // Consider it mobile if it matches mobile UA OR (is touch device AND small screen)
            const mobile = isMobileUA || (isTouchDevice && isSmallScreen);
            
            setIsMobile(mobile);
            setIsChecking(false);
            
            console.log('Device Detection:', {
                isMobileUA,
                isTouchDevice,
                isSmallScreen,
                screenWidth: window.innerWidth,
                finalDecision: mobile ? 'MOBILE' : 'DESKTOP'
            });
        };

        checkMobile();

        // Re-check on resize (for responsive testing)
        const handleResize = () => {
            checkMobile();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isMobile, isChecking };
}

// About Navigation Component with Cloud Transition
function AboutNavigationText() {
    const [showTransition, setShowTransition] = useState(false);
    const router = useRouter();

    const handleAboutClick = () => {
        setShowTransition(true);

        // Hide the cloud canvas during transition for clean animation
        const bgCanvas = document.querySelector('canvas[style*="z-index: 0"]') as HTMLCanvasElement;
        const fgCanvas = document.querySelector('canvas[style*="z-index: 2"]') as HTMLCanvasElement;

        if (bgCanvas) {
            bgCanvas.style.opacity = '0';
            bgCanvas.style.transition = 'opacity 0.5s ease-out';
        }
        if (fgCanvas) {
            fgCanvas.style.opacity = '0';
            fgCanvas.style.transition = 'opacity 0.5s ease-out';
        }
    };

    const handleTransitionComplete = () => {
        router.push('/about');
    };

    return (
        <>
            {showTransition && (
                <CloudTransition
                    type="cover"
                    onComplete={handleTransitionComplete}
                />
            )}

            <motion.button
                onClick={handleAboutClick}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    // RESPONSIVE: Adaptive padding and sizing
                    marginTop: 'clamp(2rem, 5vh, 4rem)', // Shift downwards
                    padding: '1rem', // Keep touch target
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    zIndex: 60,
                    maxWidth: '90vw',
                }}
                whileHover={{
                    scale: 1.1,
                    textShadow: '0 0 25px rgba(212, 175, 55, 1)'
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    y: [0, -8, 0], // Floating Effect
                    textShadow: [
                        '0 0 10px rgba(212, 175, 55, 0.5)',
                        '0 0 20px rgba(212, 175, 55, 0.8)',
                        '0 0 10px rgba(212, 175, 55, 0.5)'
                    ]
                }}
                transition={{
                    y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    textShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{
                        fontFamily: 'GodOfThunder',
                        // RESPONSIVE: Adaptive font sizing for About button
                        fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', // Increased size for new font
                        fontWeight: 'normal', // GodOfThunder is heavy enough
                        color: '#d4af37',
                        letterSpacing: 'clamp(0.05em, 0.2vw, 0.1em)',
                        textTransform: 'uppercase',
                        background: 'linear-gradient(45deg, #d4af37, #ffd700, #d4af37)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundSize: '200% 200%',
                        display: 'block',
                        whiteSpace: 'nowrap',
                        marginBottom: '0.2rem'
                    }}
                        className="animate-shimmer"
                    >
                        About the Quest
                    </span>
                    <span style={{
                        fontFamily: 'Cinzel, serif',
                        fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
                        color: '#b38f2e', // Darker gold/bronze for subtitle
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        opacity: 0.9
                    }}>
                        Click to explore
                    </span>
                </div>
            </motion.button>
        </>
    );
}

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

    // Performance optimization: Cache color calculations
    private lastScrollPercent = -1;
    private colorCache = {
        bg: '#2C3E50',
        overlay: 'rgba(44, 62, 80, 0.3)'
    };

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

    initClouds(count = 80) { // Performance optimization: Reduced from 150
        this.clouds = [];
        this.seed = 12345; // Reset seed on init

        // REFINED SAFE ZONE SYSTEM - Gradual density reduction instead of complete exclusion
        // This maintains atmosphere while protecting UI elements
        const getCloudDensityMultiplier = (x: number, y: number) => {
            // Center UI protection zone - reduce density but don't eliminate
            const centerDistance = Math.sqrt(x * x + y * y);

            // Timer area (top-center) - light reduction
            if (Math.abs(x) < 0.25 && y > -0.7 && y < -0.3) {
                return 0.3; // 30% normal density
            }

            // Button area (bottom-center) - moderate reduction  
            if (Math.abs(x) < 0.35 && y > 0.2 && y < 0.7) {
                return 0.4; // 40% normal density
            }

            // Silhouette breathing room (center) - gentle reduction
            if (Math.abs(x) < 0.4 && Math.abs(y) < 0.5) {
                return 0.6; // 60% normal density
            }

            // Gradual falloff from center
            if (centerDistance < 0.8) {
                return 0.7 + (centerDistance / 0.8) * 0.3; // 70%-100% density
            }

            return 1.0; // Full density in outer areas
        };

        const shouldPlaceCloud = (x: number, y: number) => {
            const densityMultiplier = getCloudDensityMultiplier(x, y);
            return this.seededRandom() < densityMultiplier;
        };

        const getSafePosition = (range: number, allowCenter = false) => {
            let attempts = 0;
            while (attempts < 20) {
                const x = (this.seededRandom() - 0.5) * range;
                const y = (this.seededRandom() - 0.5) * range * 0.8;

                if (allowCenter || shouldPlaceCloud(x, y)) {
                    return { x, y, opacity: getCloudDensityMultiplier(x, y) };
                }
                attempts++;
            }

            // Fallback: place in outer areas with full opacity
            const side = this.seededRandom() > 0.5 ? 1 : -1;
            return {
                x: side * (1.2 + this.seededRandom() * 0.8),
                y: (this.seededRandom() - 0.5) * 1.2,
                opacity: 1.0
            };
        };

        // Background Filler Clouds (Far away - maintain full coverage with density variation)
        for (let i = 0; i < count * 0.5; i++) {
            const pos = getSafePosition(6, true); // Allow center placement for background
            this.clouds.push({
                id: i,
                x: pos.x,
                y: pos.y,
                z: this.seededRandom() * this.worldDepth + 1200,
                scaleBase: 2.5 + this.seededRandom() * 2.0,
                imgIndex: Math.floor(this.seededRandom() * 4),
                rotation: this.seededRandom() * Math.PI * 2,
                opacity: (0.15 + this.seededRandom() * 0.25) * pos.opacity // Reduced by density
            });
        }

        // Mid-Ground Clouds (Respect density zones)
        for (let i = 0; i < count * 0.4; i++) {
            const pos = getSafePosition(4.5);
            this.clouds.push({
                id: 1000 + i,
                x: pos.x,
                y: pos.y,
                z: this.seededRandom() * this.worldDepth * 0.8,
                scaleBase: 0.8 + this.seededRandom() * 1.2,
                imgIndex: Math.floor(this.seededRandom() * 4),
                rotation: (this.seededRandom() - 0.5) * 0.4,
                opacity: (0.5 + this.seededRandom() * 0.3) * pos.opacity
            });
        }

        // Foreground Hero Clouds (Sides only, but with some center presence)
        for (let i = 0; i < 8; i++) {
            const side = this.seededRandom() > 0.5 ? 1 : -1;
            const x = side * (0.6 + this.seededRandom() * 0.6);
            const y = (this.seededRandom() - 0.5) * 0.8;

            this.clouds.push({
                id: 2000 + i,
                x: x,
                y: y,
                z: this.seededRandom() * 600,
                scaleBase: 1.5 + this.seededRandom() * 0.8,
                imgIndex: Math.floor(this.seededRandom() * 4),
                rotation: this.seededRandom() * 0.3,
                opacity: 0.8 * getCloudDensityMultiplier(x, y)
            });
        }

        // Fill clouds for bottom area to prevent "hole" effect
        for (let i = 0; i < 12; i++) {
            const x = (this.seededRandom() - 0.5) * 3;
            const y = 0.4 + this.seededRandom() * 0.8; // Bottom area

            this.clouds.push({
                id: 3000 + i,
                x: x,
                y: y,
                z: 800 + this.seededRandom() * 1500,
                scaleBase: 1.2 + this.seededRandom() * 1.5,
                imgIndex: Math.floor(this.seededRandom() * 4),
                rotation: this.seededRandom() * Math.PI,
                opacity: 0.2 * getCloudDensityMultiplier(x, y) // Very subtle bottom clouds
            });
        }
    }

    updateScheme(scrollPercent: number) {
        // Performance optimization: Skip expensive calculations if scroll hasn't changed significantly
        if (Math.abs(scrollPercent - this.lastScrollPercent) < 0.1) {
            this.currentBg = this.colorCache.bg;
            this.currentOverlay = this.colorCache.overlay;
            return;
        }

        this.lastScrollPercent = scrollPercent;

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

        // Cache the calculated results
        this.colorCache.bg = this.currentBg;
        this.colorCache.overlay = this.currentOverlay;
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

// Main Page Component with Device Detection
export default function HomePage() {
    const { isMobile, isChecking } = useIsMobile();

    // Show loading state while checking device
    if (isChecking) {
        return (
            <div style={{
                minHeight: '100vh',
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    width: '50px',
                    height: '50px',
                    border: '3px solid #d4af37',
                    borderTop: '3px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    // Render appropriate version based on device
    if (isMobile) {
        return <HomePageClient />;
    }

    return <CloudParallaxPage />;
}

// Desktop/Laptop Cloud Parallax Page Component
function CloudParallaxPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fgCanvasRef = useRef<HTMLCanvasElement>(null);
    const systemRef = useRef<ImageCloudSystem | null>(null);
    const requestRef = useRef<number | null>(null);
    const isLoadingRef = useRef(true); // Ref to track loading state for animation loop

    const [showTransition, setShowTransition] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Scroll handling for Z-Axis Text Animations
    const { scrollYProgress } = useScroll();

    // CRITICAL FIX: Reduce spring stiffness for better performance on low-end devices
    // Smooth the scroll usage for cleaner transforms
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 50,  // Reduced from 100 for smoother performance
        damping: 25,    // Increased from 20 for less oscillation
        restDelta: 0.001,
        restSpeed: 0.001 // Add rest speed to stop calculations sooner
    });

    // Z-Axis Fly-Through Logic:
    // 1. Sky Realm (0 - 0.3)
    // Updated: Cap scale to prevent overflow, sync opacity with Zeus
    const skyScale = useTransform(smoothScroll, [0, 0.1, 0.25], [1, 1.2, 1.5]); // Capped at 1.5
    const skyOpacity = useTransform(smoothScroll, [0, 0.15, 0.25], [1, 1, 0]); // Fade with Zeus
    const skyBlur = useTransform(smoothScroll, [0.3, 0.4], [0, 20]); // Motion blur effect

    // Zeus Silhouette - Holographic Effect (appears then fades)
    // Updated: Goes to Full Visibility
    const zeusOpacity = useTransform(smoothScroll, [0, 0.15, 0.25], [1, 1, 0]);
    const zeusScale = useTransform(smoothScroll, [0.05, 0.15, 0.25], [0.8, 1.2, 3.5]); // More Intimidating Scale

    // 2. Quote (0.2 - 0.45)
    // Enters from 0.2
    const quoteScale = useTransform(smoothScroll, [0.15, 0.3, 0.45], [0.5, 1, 3]);
    const quoteOpacity = useTransform(smoothScroll, [0.15, 0.25, 0.40, 0.50], [0, 1, 1, 0]); // Extended hold
    // Removed blur filter for performance

    // 3. Ocean Realm (0.4 - 0.7)
    const oceanScale = useTransform(smoothScroll, [0.4, 0.55, 0.8], [0.5, 1, 3]);
    const oceanOpacity = useTransform(smoothScroll, [0.4, 0.5, 0.65, 0.8], [0, 1, 1, 0]);
    // Removed blur filter for performance

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

        // CRITICAL FIX: Detect device performance capability
        let performanceMode: 'high' | 'medium' | 'low' = 'high';
        let targetFPS = 60;
        let frameSkip = 1; // Render every frame by default

        // Performance detection based on multiple factors
        const detectPerformance = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const pixelCount = width * height;

            // Check for hardware acceleration
            const canvas2d = document.createElement('canvas');
            const ctx = canvas2d.getContext('2d', { willReadFrequently: false });
            const isHardwareAccelerated = ctx ? true : false;

            // Check device memory (if available)
            const deviceMemory = (navigator as any).deviceMemory || 4; // Default to 4GB

            // Check CPU cores
            const cpuCores = navigator.hardwareConcurrency || 2;

            // Performance scoring
            let performanceScore = 0;

            // Screen resolution impact
            if (pixelCount > 2073600) performanceScore -= 2; // > 1920x1080
            else if (pixelCount > 1440000) performanceScore -= 1; // > 1600x900

            // Memory impact
            if (deviceMemory >= 8) performanceScore += 2;
            else if (deviceMemory >= 4) performanceScore += 1;
            else performanceScore -= 1;

            // CPU impact
            if (cpuCores >= 8) performanceScore += 2;
            else if (cpuCores >= 4) performanceScore += 1;
            else performanceScore -= 1;

            // Hardware acceleration
            if (!isHardwareAccelerated) performanceScore -= 2;

            // Determine performance mode
            if (performanceScore >= 2) {
                performanceMode = 'high';
                targetFPS = 60;
                frameSkip = 1;
            } else if (performanceScore >= 0) {
                performanceMode = 'medium';
                targetFPS = 45;
                frameSkip = 1;
            } else {
                performanceMode = 'low';
                targetFPS = 30;
                frameSkip = 2; // Render every other frame
            }

            console.log(`Performance Mode: ${performanceMode} (Score: ${performanceScore}, FPS: ${targetFPS}, Memory: ${deviceMemory}GB, Cores: ${cpuCores})`);
        };

        detectPerformance();

        const handleResize = () => {
            // OPTIMIZATION: Cap Pixel Ratio to 1.0 for performance on high-DPI screens
            // This prevents 4x renders on Retina/4K screens which kills FPS
            const dpr = 1; // Force standard resolution
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            fgCanvas.width = window.innerWidth * dpr;
            fgCanvas.height = window.innerHeight * dpr;

            // Scale context to match
            const ctx = canvas.getContext('2d', {
                alpha: true,
                desynchronized: true, // CRITICAL: Allow async rendering
                willReadFrequently: false // CRITICAL: Optimize for drawing
            })!;
            const fgCtx = fgCanvas.getContext('2d', {
                alpha: true,
                desynchronized: true,
                willReadFrequently: false
            })!;
            ctx.scale(dpr, dpr);
            fgCtx.scale(dpr, dpr);

            // RESPONSIVE: Adaptive Cloud Count based on screen size and performance mode
            const width = window.innerWidth;
            const height = window.innerHeight;

            let cloudCount = 120; // Default for large laptops

            // Adjust based on performance mode FIRST
            if (performanceMode === 'low') {
                cloudCount = 60; // Significantly reduce for low-end devices
            } else if (performanceMode === 'medium') {
                cloudCount = 90; // Moderate reduction
            }

            // Then adjust cloud count based on screen size
            if (width < 1200 || height < 700) {
                cloudCount = Math.floor(cloudCount * 0.7); // Smaller laptops
            } else if (width < 1400 || height < 900) {
                cloudCount = Math.floor(cloudCount * 0.85); // Medium laptops
            } else if (width >= 1600 && height >= 1000) {
                cloudCount = Math.floor(cloudCount * 1.1); // Large laptops (but capped by performance)
            }

            // Further adjust for ultra-wide or very tall screens
            const aspectRatio = width / height;
            if (aspectRatio > 2.0) {
                cloudCount = Math.floor(cloudCount * 1.15); // More clouds for ultra-wide
            } else if (aspectRatio < 1.3) {
                cloudCount = Math.floor(cloudCount * 0.85); // Fewer clouds for tall screens
            }

            // Cap maximum clouds based on performance
            if (performanceMode === 'low') cloudCount = Math.min(cloudCount, 60);
            else if (performanceMode === 'medium') cloudCount = Math.min(cloudCount, 90);
            else cloudCount = Math.min(cloudCount, 140);

            system.initClouds(cloudCount);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        let lastScrollY = -1;
        let frameCount = 0;
        let lastFrameTime = performance.now();
        let fps = 60;

        const animate = (currentTime: number) => {
            // FPS calculation for adaptive performance
            const deltaTime = currentTime - lastFrameTime;
            if (deltaTime > 0) {
                fps = 1000 / deltaTime;
            }
            lastFrameTime = currentTime;

            // CRITICAL FIX: Frame skipping for low-end devices
            frameCount++;
            if (frameCount % frameSkip !== 0) {
                requestRef.current = requestAnimationFrame(animate);
                return;
            }

            // OPTIMIZATION: Pause animation loop if still loading
            if (isLoadingRef.current) {
                requestRef.current = requestAnimationFrame(animate);
                return;
            }

            // Synchronize Canvas with Framer Motion's smoothScroll
            const progress = smoothScroll.get(); // 0 to 1
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;

            // Calculate equivalent scrollY from the smooth progress
            const currentScrollY = progress * (documentHeight - windowHeight);

            // REALM INITIALIZATION FIX: Ensure we start with Zeus realm colors on first render
            if (lastScrollY === -1 && currentScrollY === 0) {
                system.updateScheme(0); // Force Zeus realm (0% scroll)
            }

            // ADAPTIVE RENDERING: Adjust threshold based on performance mode
            let renderThreshold = 0.5;
            if (performanceMode === 'low') renderThreshold = 2.0; // Render less frequently
            else if (performanceMode === 'medium') renderThreshold = 1.0;

            // Only render if meaningful change OR first frame
            const scrollDelta = Math.abs(currentScrollY - lastScrollY);
            if (scrollDelta > renderThreshold || lastScrollY === -1) {
                const percent = progress * 100;
                system.updateScheme(percent); // Optimized internally with caching
                system.render(currentScrollY);
                lastScrollY = currentScrollY;
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [mounted]); // CRITICAL FIX: Remove smoothScroll dependency to prevent re-initialization

    // Fix hydration by ensuring client-side only rendering
    useEffect(() => {
        setMounted(true);

        // CRITICAL FIX: Reset scroll position to ensure users always start from Zeus realm
        // This prevents realm mismatching when browser restores scroll position on reload
        if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
            // Disable scroll restoration to prevent browser from overriding our reset
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
        }
    }, []);

    const { isLoading } = useLoading();

    // Update ref for animation loop
    useEffect(() => {
        isLoadingRef.current = isLoading;

        // ADDITIONAL FIX: Ensure scroll position is reset when loading completes
        // This handles cases where loading screen might interfere with initial scroll reset
        if (!isLoading && typeof window !== 'undefined') {
            // Small delay to ensure DOM is fully ready
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
        }
    }, [isLoading]);

    const handleTransitionComplete = () => {
        setShowTransition(false);
    };

    // Don't render until mounted to prevent hydration mismatch
    if (!mounted) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#2C3E50' }}>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '600vh', position: 'relative', overflowX: 'hidden' }}>



            {showTransition && !isLoading && (
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
                    zIndex: 0,
                    willChange: 'contents', // CRITICAL: Hint browser for optimization
                    transform: 'translateZ(0)', // Force GPU layer
                    backfaceVisibility: 'hidden' // Prevent flickering
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
                    zIndex: 2, // Above Silhouettes (Z-1)
                    willChange: 'contents',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                }}
            />

            {/* Fixed Content Container */}
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                willChange: 'transform', // Optimize for animations
                transform: 'translateZ(0)' // Force GPU layer
            }}>

                {/* 1. Sky Realm - Anime Slideshow (images 1-14) */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
                    {!isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            style={{ opacity: skyOpacity, position: 'absolute', inset: 0 }}
                        >
                            <RealmParticles variant="zeus" />
                        </motion.div>
                    )}
                </div>

                {/* Sky Realm Anime Slideshow */}
                <motion.div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: zeusOpacity,
                    zIndex: 1,
                    willChange: 'transform, opacity',
                }}>
                    {!isLoading && (
                        <AnimeSlideshow
                            smoothScroll={smoothScroll}
                            scrollStart={0}
                            scrollEnd={0.25}
                            imageSlice={[0, 14]}
                        />
                    )}
                </motion.div>

                {/* Zeus Title - Below silhouette */}
                <motion.div style={{
                    position: 'absolute',
                    top: '70%',
                    width: '100%',
                    opacity: skyOpacity,
                    scale: skyScale,
                    // OPTIMIZATION: Removed expensive blur filter
                    // filter: skyBlur, 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20,
                    willChange: 'transform, opacity',
                    padding: '0 1rem', // Add padding for smaller screens
                }}>
                    <h1
                        style={{
                            fontFamily: 'tech Origin, sans-serif',
                            // RESPONSIVE: Adaptive font sizing for all laptop sizes
                            fontSize: 'clamp(3rem, 8vw, 8rem)', // Scales from 3rem to 8rem based on viewport
                            fontWeight: 'normal',
                            // High-contrast metallic gold gradient
                            background: 'linear-gradient(to bottom, #cfc09f 22%,#634f2c 24%, #cfc09f 26%, #634f2c 27%,#ffecb3 40%,#3a2c0f 78%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            // Black Outline
                            WebkitTextStroke: '0px transparent',
                            // Clean 3D shadows - responsive
                            textShadow: `
                                0px 1px 0px #917024,
                                0px 2px 0px #6e521b,
                                0px 3px 0px #4c3611,
                                0px 4px 6px rgba(0,0,0,0.6)
                            `,
                            // Restore filter for the "Glow"
                            // OPTIMIZATION: Use cheaper drop-shadow with lower spread or static text-shadow
                            // filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))',
                            textAlign: 'center',
                            margin: 0,
                            lineHeight: 1.1,
                            letterSpacing: 'clamp(0.02em, 0.5vw, 0.05em)', // Responsive letter spacing
                            position: 'relative',
                            maxWidth: '90vw', // Prevent overflow on small screens
                            wordBreak: 'keep-all' // Prevent breaking of "TECHUTOPIA 2026"
                        }}
                    >
                        TECHUTOPIA <span style={{ fontFamily: 'inherit' }}>2026</span>
                    </h1>
                </motion.div>

                {/* Quote Section */}
                <motion.div style={{
                    position: 'absolute',
                    opacity: quoteOpacity,
                    scale: quoteScale,
                    willChange: 'transform, opacity',
                    padding: '0 1rem', // Add padding for smaller screens
                    maxWidth: '90vw', // Prevent overflow
                }}>
                    <p style={{
                        fontFamily: 'Cinzel, serif',
                        // RESPONSIVE: Adaptive font sizing for quote
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', // Scales from 1.5rem to 2.5rem
                        color: '#d4af37',
                        textTransform: 'uppercase',
                        letterSpacing: 'clamp(0.1rem, 0.3vw, 0.2rem)', // Responsive letter spacing
                        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                        textAlign: 'center',
                        margin: 0,
                        lineHeight: 1.2,
                        wordBreak: 'keep-all' // Prevent awkward line breaks
                    }}>
                        — From MYTH to Mainframes —
                    </p>
                </motion.div>

                {/* 2. Ocean Realm - Anime Slideshow (images 14-28) */}
                <motion.div style={{ opacity: oceanOpacity, position: 'absolute', inset: 0, zIndex: 0 }}>
                    {!isLoading && <RealmParticles variant="poseidon" />}
                </motion.div>

                {/* Ocean Realm Anime Slideshow */}
                <motion.div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: poseidonOpacity,
                    zIndex: 1,
                    willChange: 'transform, opacity',
                }}>
                    {!isLoading && (
                        <AnimeSlideshow
                            smoothScroll={smoothScroll}
                            scrollStart={0.40}
                            scrollEnd={0.75}
                            imageSlice={[14, 27]}
                        />
                    )}
                </motion.div>

                {/* Ocean Text - Below silhouette */}
                <motion.div style={{
                    position: 'absolute',
                    top: '70%',
                    width: '100%',
                    opacity: oceanOpacity,
                    scale: oceanScale,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20,
                    padding: '0 1rem', // Add padding for smaller screens
                }}>
                    <div style={{
                        textAlign: 'center',
                        maxWidth: '90vw' // Prevent overflow
                    }}>
                        <h2 style={{
                            fontFamily: 'Cinzel, serif',
                            // RESPONSIVE: Adaptive font sizing for dates
                            fontSize: 'clamp(2rem, 5vw, 4rem)', // Scales from 2rem to 4rem
                            color: '#e0f7fa',
                            textShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
                            marginBottom: '1rem',
                            margin: 0,
                            lineHeight: 1.2
                        }}>
                            13 March - 15 March
                        </h2>
                        <p style={{
                            fontFamily: 'Cinzel, serif',
                            // RESPONSIVE: Adaptive font sizing for location
                            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)', // Scales from 1rem to 1.5rem
                            color: '#b3e5fc',
                            letterSpacing: 'clamp(0.05rem, 0.2vw, 0.1rem)', // Responsive letter spacing
                            margin: 0,
                            marginTop: '0.5rem'
                        }}>
                            UEM Jaipur
                        </p>
                    </div>
                </motion.div>

                {/* 3. Hades Realm - Anime Slideshow (images 28-41) */}
                <motion.div style={{ opacity: underworldOpacity, position: 'absolute', inset: 0, zIndex: 0 }}>
                    {!isLoading && <RealmParticles variant="hades" />}
                </motion.div>

                {/* Underworld Realm Anime Slideshow */}
                <motion.div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: hadesOpacity,
                    zIndex: 1,
                    willChange: 'transform, opacity',
                }}>
                    {!isLoading && (
                        <AnimeSlideshow
                            smoothScroll={smoothScroll}
                            scrollStart={0.75}
                            scrollEnd={1.0}
                            imageSlice={[27, 41]}
                        />
                    )}
                </motion.div>



                {/* Scroll Indicator */}
                <motion.div style={{
                    position: 'absolute',
                    bottom: 'clamp(1rem, 4vh, 2rem)', // Responsive bottom spacing
                    left: 0,
                    right: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: scrollIndicatorOpacity,
                    color: '#fff',
                    zIndex: 20,
                    padding: '0 1rem' // Add padding for smaller screens
                }}>
                    <span style={{
                        fontFamily: 'Cinzel, serif',
                        marginBottom: '0.5rem',
                        // RESPONSIVE: Adaptive font size for scroll indicator
                        fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)', // Scales from 0.7rem to 0.9rem
                        letterSpacing: 'clamp(0.05em, 0.2vw, 0.1em)', // Responsive letter spacing
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        textAlign: 'center'
                    }}>
                        Scroll to Explore
                    </span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown
                            // RESPONSIVE: Adaptive icon size
                            size={Math.max(20, Math.min(28, window.innerWidth * 0.02))}
                            color="#ffd700"
                        />
                    </motion.div>
                </motion.div>

            </div>

            {/* OVERLAY LAYER - Z-Index 50 to sit ABOVE clouds */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Hades Interactive Section - Moved here for visibility */}
                <motion.div style={{
                    position: 'absolute',
                    opacity: underworldOpacity,
                    scale: underworldScale,
                    width: '100%',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    pointerEvents: 'auto', // Re-enable for this layer
                    padding: '0 1rem', // Add padding for smaller screens
                }}>

                    <div style={{
                        position: 'relative',
                        width: '100%',
                        // RESPONSIVE: Adaptive height for countdown timer
                        height: 'clamp(150px, 25vh, 200px)', // Scales from 150px to 200px
                        marginBottom: 'clamp(1rem, 3vh, 2rem)' // Responsive margin
                    }}>
                        <CountdownTimer />
                    </div>

                    <div
                        className="apply-button"
                        data-hackathon-slug="techutopia-v5"
                        data-button-theme="dark"
                        style={{
                            height: '44px',
                            // RESPONSIVE: Adaptive button width
                            width: 'min(312px, 90vw)', // Scales down on smaller screens
                            zIndex: 50,
                            position: 'relative',
                            marginBottom: 'clamp(1rem, 2vh, 1.5rem)' // Responsive margin
                        }}
                    ></div>

                    {/* About Text with Cloud Transition */}
                    <AboutNavigationText />
                </motion.div>
            </div>
        </div>
    );
}
