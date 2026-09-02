'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CloudTransition } from '../../ui/CloudTransition';
import { CountdownTimer } from '../../ui/CountdownTimer';
import { HeroStaticLayers } from './HeroStaticLayers';
import { PageNavigation } from '../../navigation/PageNavigation';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import devfolioLogo from '@/assets/partners/devfolio-logo.png';
import Image from 'next/image';

export function Hero() {
  // Transition State
  const router = useRouter();
  const [isZooming, setIsZooming] = useState(false);
  const [isCovering, setIsCovering] = useState(false);

  // Load Devfolio SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apply.devfolio.co/v2/sdk.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleTransition = () => {
    if (isZooming) return; // Prevent double clicks

    // 1. Start Zoom
    setIsZooming(true);

    // 2. Start Cloud Cover (Immediately)
    setIsCovering(true);

    // 3. Navigate after zoom/cover is mostly done
    setTimeout(() => {
      router.push('/about');
    }, 2800); // Wait for the slow cloud cover
  };

  // Gestures for Swipe/Scroll Navigation
  useEffect(() => {
    let touchStartY = 0;
    const swipeThreshold = 50; // pixels

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Mobile Only Security: Check width
      if (window.innerWidth >= 1280) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // Swipe UP (Scroll Down) -> Go Next
      if (deltaY > swipeThreshold) {
        handleTransition();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Mobile Only Security: Check width
      if (window.innerWidth >= 1280) return;

      // Scroll Down -> Go Next
      if (e.deltaY > 0) {
        handleTransition();
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isZooming]);

  return (
    <section
      className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-void-black touch-none"
      // onClick={handleTransition}
      style={{
        background: 'radial-gradient(circle at 50% 30%, #1a202c 0%, #000000 70%)',
      }}
    >
      {/* Transition Overlay */}
      {isCovering && <CloudTransition type="cover" />}

      {/* Zoom Wrapper - Everything else scales inside here */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-[2000ms] ease-in-out font-sans"
        style={{
          transform: isZooming ? 'scale(5) translateY(10%)' : 'scale(1) translateY(0)',
          transformOrigin: 'center 60%', // Aim at the lightning bolt
          willChange: 'transform', // GPU Hint
        }}
      >
        {/* 1. Static Background Layers (Memoized) */}
        {/* OPTIMIZATION: Fade out heavy layers immediately on zoom to save GPU scale costs */}
        <div
          className="absolute inset-0 transition-opacity duration-500 will-change-opacity"
          style={{ opacity: isZooming ? 0 : 1 }}
        >
          <HeroStaticLayers />
        </div>

        {/* 2. Interactive/Foreground Elements */}
        {/* OPTIMIZATION: Fade out text/timer immediately */}
        <div
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 will-change-opacity"
          style={{ opacity: isZooming ? 0 : 1 }}
        >
          {/* Title and Silver Partner Container */}
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-full pointer-events-none"
            style={{ top: 'clamp(8%, 12vh, 15%)', zIndex: 30 }}
          >
            {/* Title Text - MUCH LARGER for mobile/tablet */}
            <h1
              style={{
                fontFamily: 'tech Origin, sans-serif',
                // RESPONSIVE: Much larger on mobile/tablet (main focus), smaller on desktop
                fontSize: 'clamp(2.5rem, 10vw, 4rem)', // Adjusted for mobile to prevent horizontal scroll
                fontWeight: 'normal',
                whiteSpace: 'normal', // Allow wrapping on very small screens if necessary
                wordWrap: 'break-word',
                // High-contrast metallic gold gradient
                background: 'linear-gradient(to bottom, #cfc09f 22%,#634f2c 24%, #cfc09f 26%, #634f2c 27%,#ffecb3 40%,#3a2c0f 78%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '0px transparent',
                // Clean 3D shadows - scaled for larger text
                textShadow: `
                                0px 2px 0px #917024,
                                0px 3px 0px #6e521b,
                                0px 4px 0px #4c3611,
                                0px 6px 10px rgba(0,0,0,0.6)
                            `,
                textAlign: 'center',
                margin: 0,
                marginTop: '0.5rem',
                lineHeight: 1,
                letterSpacing: 'clamp(0.01em, 0.5vw, 0.05em)',
                position: 'relative',
                maxWidth: '95vw',
                wordBreak: 'break-word', // Changed from keep-all to prevent overflow
              }}
            >
              TECHUTOPIA <span style={{ fontFamily: 'inherit' }} className="whitespace-nowrap">2026</span>
            </h1>

            {/* Silver Partner + Devfolio Logo - Larger spacing on mobile/tablet */}
            <div className="flex items-center gap-2 xl:gap-3 mt-3 xl:-mt-10">
              <span
                className="font-cinzel uppercase tracking-widest"
                style={{
                  fontSize: 'clamp(11px, 2.2vw, 20px)', // Slightly larger on mobile/tablet
                  color: '#C0C0C0',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                }}
              >
                Silver Partner
              </span>
              <Image
                src={devfolioLogo}
                alt="DEVFOLIO LOGO"
                className="object-contain"
                style={{
                  height: 'clamp(22px, 4vh, 45px)', // Slightly larger on mobile/tablet
                  width: 'auto',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))',
                }}
              />
            </div>

            {/* Mobile/Tablet Only: Date below Silver Partner */}
            <p
              className="font-cinzel text-center mt-2 xl:hidden"
              style={{
                fontSize: 'clamp(11px, 2.8vw, 16px)', // Slightly larger
                color: '#d4af37',
                letterSpacing: 'clamp(1px, 0.5vw, 3px)',
                textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                opacity: 0.9,
              }}
            >
              13 MARCH - 15 MARCH
            </p>
          </div>

          {/* Desktop Only: Date - Left side of rings (1280px+) */}
          <div
            className="absolute left-[3%] xl:left-[5%] 2xl:left-[8%] top-1/2 -translate-y-1/2 z-30 pointer-events-none hidden xl:block"
          >
            <p
              className="font-cinzel text-center"
              style={{
                fontSize: 'clamp(12px, 2vw, 20px)',
                color: '#d4af37',
                letterSpacing: 'clamp(2px, 0.5vw, 4px)',
                textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(212, 175, 55, 0.4)',
                opacity: 0.95,
              }}
            >
              13 MARCH - 15 MARCH
            </p>
          </div>

          {/* Desktop Only: Apply with Devfolio Button - Right side of rings (1280px+) */}
          <div
            className="absolute right-[3%] xl:right-[5%] 2xl:right-[8%] top-1/2 -translate-y-1/2 z-30 pointer-events-auto hidden xl:block"
          >
            <div
              className="apply-button"
              data-hackathon-slug="techutopia-v5"
              data-button-theme="dark"
              style={{ height: '44px', width: '312px' }}
            />
          </div>

          {/* 3. Countdown Timer (Isolated State) - Moved lower on mobile/tablet */}
          <CountdownTimer className="xl:!bottom-[35%]" style={{ bottom: '28%' }} />

          {/* Mobile/Tablet Only: Apply with Devfolio Button - Moved lower */}
          <div className="absolute flex justify-center w-full xl:hidden pointer-events-auto" style={{ bottom: '12%', zIndex: 30 }}>
            <div
              className="apply-button"
              data-hackathon-slug="techutopia-v5"
              data-button-theme="dark"
              style={{ height: '44px', width: 'min(300px, 85vw)' }} // Responsive width
            />
          </div>

          {/* Bottom Quote - Moved lower on mobile/tablet */}
          <div className="absolute w-full flex justify-center xl:bottom-[8%]" style={{ bottom: '5%', zIndex: 15 }}>
            <p
              className="font-cinzel text-center px-4"
              style={{
                fontSize: 'clamp(9px, 2vw, 13px)', // Slightly larger on mobile
                fontStyle: 'italic',
                color: '#d4af37',
                letterSpacing: 'clamp(1px, 0.3vw, 3px)',
                textTransform: 'uppercase',
                textShadow: '0 0 10px rgba(212, 175, 55, 0.5), 0 0 20px rgba(212, 175, 55, 0.3)',
              }}
            >
              — From Myth to Mainframes —
            </p>
          </div>

          {/* Swipe To Explore - Mobile/Tablet Only Hint - At very bottom - EMPHASIZED */}
          <div className="absolute w-full flex flex-col items-center gap-1 xl:hidden" style={{ bottom: '1%', zIndex: 15 }}>
            <motion.div
              animate={{
                y: [0, 12, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center gap-1"
            >
              <span 
                className="text-[11px] uppercase tracking-[0.3em] font-cinzel font-semibold"
                style={{
                  color: '#ffd700',
                  textShadow: '0 0 15px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.4), 0 2px 4px rgba(0,0,0,0.8)',
                }}
              >
                Scroll Down to Explore
              </span>
              <ChevronDown 
                className="w-5 h-5"
                style={{
                  color: '#ffd700',
                  filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>


      {/* CSS Animations (Global styles for reused animations) */}
      <style>{`
                @keyframes twinkle {
                    0% { opacity: 0; transform: scale(0.5); }
                    50% { opacity: 1; transform: scale(1.4); box-shadow: 0 0 10px #ffd700, 0 0 20px #ffd700; }
                    100% { opacity: 0; transform: scale(0.5); }
                }

                @keyframes cloudFlash {
                    0%, 90% { opacity: 0; }
                    92% { opacity: 0.9; }
                    93% { opacity: 0.4; }
                    94% { opacity: 1; }
                    96% { opacity: 0; }
                    100% { opacity: 0; }
                }

                @keyframes particleFloat {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0.3;
                    }
                    25% {
                        transform: translateY(-15px) translateX(8px);
                        opacity: 0.6;
                    }
                    50% {
                        transform: translateY(-5px) translateX(-5px);
                        opacity: 0.4;
                    }
                    75% {
                        transform: translateY(-20px) translateX(3px);
                        opacity: 0.55;
                    }
                }
            `}</style>
      <PageNavigation onNext={handleTransition} />
    </section >
  );
}
