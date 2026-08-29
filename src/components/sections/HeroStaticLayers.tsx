import { memo, useMemo } from 'react';

export const HeroStaticLayers = memo(function HeroStaticLayers() {
    // Generate static random particles ONCE
    // OPTIMIZATION: Reduced from 150 to 50 for better mobile performance
    const particles = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        size: Math.random() * 4 + 1 + 'px',
        delay: Math.random() * 5 + 's',
        duration: Math.random() * 4 + 3 + 's',
    })), []);

    const floatingEmbers = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: 10 + Math.random() * 80 + '%',
        top: 55 + Math.random() * 40 + '%',
        size: 2 + Math.random() * 2 + 'px',
        delay: Math.random() * 8 + 's',
        duration: 12 + Math.random() * 10 + 's'
    })), []);

    return (
        <>
            {/* Transparent/No background - let content show through */}

            {/* Static Cloud Layers with Lightning Flashes */}
            <div className="absolute inset-0 z-[5] overflow-hidden pointer-events-none">

                {/* Random Gold Particles Layer */}
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="absolute rounded-full"
                        style={{
                            top: p.top,
                            left: p.left,
                            width: p.size,
                            height: p.size,
                            background: '#ffd700',
                            boxShadow: '0 0 4px #ffd700',
                            opacity: 0,
                            animation: `twinkle ${p.duration} ease-in-out infinite`,
                            animationDelay: p.delay,
                            // OPTIMIZATION: Removed will-change to prevent layer explosion (150 layers -> 1 layer)
                        }}
                    />
                ))}

                {/* --- BACKGROUND LAYER --- */}
                <img
                    src="/Cloud1.webp"
                    alt="Cloud Top Left"
                    className="absolute top-[-10%] left-[-10%] w-[50%] h-auto opacity-80 object-contain"
                    style={{ filter: 'brightness(0.7) contrast(1.2)' }}
                />
                <img
                    src="/Cloud2.webp"
                    alt="Cloud Top Right"
                    className="absolute top-[-5%] right-[-10%] w-[55%] h-auto opacity-80 object-contain"
                    style={{ filter: 'brightness(0.8) contrast(1.1)' }}
                />

                {/* Flash Layer 1 (Deep) */}
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.25), transparent 60%)',
                    animation: 'cloudFlash 2s infinite',
                    animationDelay: '1s',
                    opacity: 0,
                    mixBlendMode: 'overlay',
                    willChange: 'opacity' // Keep on large layers
                }} />

                {/* Flash Layer 2 (Bright/Center) */}
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(circle at 50% 40%, rgba(200, 200, 255, 0.4), transparent 50%)',
                    animation: 'cloudFlash 3s infinite',
                    animationDelay: '0.5s',
                    opacity: 0,
                    mixBlendMode: 'screen',
                    willChange: 'opacity' // Keep on large layers
                }} />


                {/* --- MID LAYER --- */}
                <img
                    src="/Cloud2.webp"
                    alt="Cloud Mid Left"
                    className="absolute top-[20%] left-[-20%] w-[40%] h-auto opacity-40 object-contain"
                    style={{
                        filter: 'brightness(0.6)',
                        transform: 'scaleX(-1) rotate(10deg)'
                    }}
                />
                <img
                    src="/Cloud1.webp"
                    alt="Cloud Mid Right"
                    className="absolute top-[30%] right-[-15%] w-[45%] h-auto opacity-40 object-contain"
                    style={{
                        filter: 'brightness(0.6)',
                        transform: 'scaleX(-1) rotate(-5deg)'
                    }}
                />

                {/* Flash Layer 2 (Mid) */}
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(circle at 70% 40%, rgba(200, 220, 255, 0.2), transparent 50%)',
                    animation: 'cloudFlash 5s infinite',
                    animationDelay: '3.5s',
                    opacity: 0,
                    mixBlendMode: 'screen',
                    willChange: 'opacity'
                }} />


                {/* --- FOREGROUND LAYER --- */}
                <img
                    src="/Cloud4.webp"
                    alt="Cloud Top Center"
                    className="absolute top-[-25%] left-[25%] w-[60%] h-auto opacity-20 object-contain"
                    style={{
                        filter: 'brightness(0.4)',
                        transform: 'rotate(180deg)'
                    }}
                />
                <img
                    src="/Cloud3.webp"
                    alt="Cloud Bottom Left"
                    className="absolute bottom-[-15%] left-[-5%] w-[60%] h-auto opacity-60 object-contain"
                    style={{ filter: 'brightness(0.6)' }}
                />
                <img
                    src="/Cloud4.webp"
                    alt="Cloud Bottom Right"
                    className="absolute bottom-[-10%] right-[-15%] w-[65%] h-auto opacity-70 object-contain"
                    style={{ filter: 'brightness(0.7)' }}
                />
                <img
                    src="/Cloud3.webp"
                    alt="Cloud Bottom Center"
                    className="absolute bottom-[-20%] left-[20%] w-[70%] h-auto opacity-30 object-contain"
                    style={{
                        filter: 'blur(3px) brightness(0.5)',
                        transform: 'scale(1.2)'
                    }}
                />

                {/* Flash Layer 3 (Front/Global) */}
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 230, 150, 0.1), transparent 70%)',
                    animation: 'cloudFlash 11s infinite',
                    animationDelay: '0s',
                    opacity: 0,
                    mixBlendMode: 'soft-light',
                    willChange: 'opacity'
                }} />
            </div>


            {/* Gold Particle Effect - Floating embers */}
            <div className="absolute inset-0 z-[6] overflow-hidden pointer-events-none">
                {floatingEmbers.map((p) => (
                    <div
                        key={p.id}
                        className="absolute rounded-full"
                        style={{
                            left: p.left,
                            top: p.top,
                            width: p.size,
                            height: p.size,
                            background: 'radial-gradient(circle, #ffd700 0%, rgba(255, 180, 50, 0.8) 40%, transparent 70%)',
                            boxShadow: '0 0 8px rgba(255, 200, 100, 0.8), 0 0 15px rgba(255, 180, 50, 0.4)',
                            animation: `particleFloat ${p.duration} infinite ease-in-out`,
                            animationDelay: p.delay,
                            opacity: 0.7,
                            // OPTIMIZATION: Removed will-change
                        }}
                    />
                ))}
            </div>

            {/* Rings hover container - sized to match outer ring */}
            <div
                className="absolute rings-container" // Keep class for hover effects if any
                style={{
                    top: '50%',
                    left: '50%',
                    width: 'clamp(600px, 120vmin, 1500px)',
                    height: 'clamp(600px, 120vmin, 1500px)',
                    pointerEvents: 'none', // Static layer shouldn't capture events ideally, but parent uses it. 
                    // To keep original overlap logic, we might need z-indices to be handled carefully. 
                    // BUT, checking Hero.tsx, rings are behind the text.
                    zIndex: 10,
                    // transform moved to CSS for responsive control
                }}
            >
                <style>{`
                    .rings-container {
                        transform: translate(calc(-50% + 33px), calc(-50% + 33px));
                    }
                    @media (max-width: 768px) {
                        .rings-container {
                            transform: translate(-50%, -50%);
                        }
                    }
                `}</style>
                {/* Outer Runic Ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src="/outer_runic_ring.webp"
                        alt="Outer Runic Ring"
                        className="ring-glow-outer animate-spin-reverse"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            opacity: 0.8,
                            animationDuration: '60s',
                            willChange: 'transform'
                        }}
                    />
                </div>

                {/* Middle Ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src="/middle_ring.webp"
                        alt="Middle Ring"
                        className="ring-glow-middle animate-spin"
                        style={{
                            width: '88%',
                            height: '88%',
                            objectFit: 'contain',
                            opacity: 0.85,
                            animationDuration: '45s',
                            willChange: 'transform'
                        }}
                    />
                </div>

                {/* Inner Ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src="/inner_ring.webp"
                        alt="Inner Ring"
                        className="ring-glow-inner animate-spin-reverse"
                        style={{
                            width: '44%',
                            height: '44%',
                            objectFit: 'contain',
                            opacity: 0.9,
                            animationDuration: '30s',
                            willChange: 'transform'
                        }}
                    />
                </div>
            </div>

            {/* Lightning Bolt */}
            {/* Code By IJ -- Responsive hai ab */}
            <img
                src="/lightning-bolt.webp"
                alt="Lightning Bolt"
                className="absolute"
                style={{
                    bottom: '0%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 'auto',
                    height: 'clamp(26vh, 60vh, 65vh)',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                    opacity: 1,
                    zIndex: 10,
                    pointerEvents: 'none'
                }}
            />
        </>
    );
});
