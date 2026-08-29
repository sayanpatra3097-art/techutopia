'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CloudTransition } from '../ui/CloudTransition';

// Static About Content
const aboutText = {
  title: 'TECHUTOPIA 2026',
  paragraphs: [
    "TechUtopia 2026 is the annual technical festival of University of Engineering & Management (UEM), Jaipur, bringing together technology, creativity, experimentation, and entrepreneurship on one platform. Designed to go beyond conventional competitions, the festival gives students an opportunity to turn their knowledge into practical skills through challenges, experiments, prototypes, and ideas.",
    "Organized at UEM Jaipur, TechUtopia 2026 brings together students with diverse interests and skill sets. From building robots and competing in high-intensity challenges to exploring physics, solving real-world problems, and presenting innovative startup ideas, the fest creates an environment where curiosity meets competition and ideas meet execution.",
    "The festival features RoboMania, Gravity Zone, TechVenture, and LaunchPad, each offering a different way to experience technology. Participants can build and compete in robotics challenges, experiment with physics, take on innovation and hackathon challenges, pitch ideas, showcase products, and connect with the world of entrepreneurship.",
    "Throughout the event, participants are encouraged to learn by doing, experiment without fear of failure, collaborate with others, and push their technical limits. Whether you're writing your first line of code, building your first prototype, or presenting an idea with the potential to become a startup, TechUtopia is a place to take that next step.",
    "Driven by curiosity, competition, innovation, and the spirit of building, TechUtopia 2026 invites every participant to step beyond the classroom, take on new challenges, and create something worth remembering. Start with an idea. Take on the challenge. Build what comes next."
  ],
};

export function Story() {
  const [showTransition, setShowTransition] = useState(false);

  return (
    <section
      className="relative z-10 text-white min-h-screen pt-24 xs:pt-26 sm:pt-28 md:pt-32 pb-32 sm:pb-40 lg:flex lg:items-center lg:justify-center lg:py-20 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      style={{
        lineHeight: '1.7',
      }}
    >
      {/* Cloud Uncover Transition */}
      {showTransition && (
        <CloudTransition type="uncover" onComplete={() => setShowTransition(false)} />
      )}

      <div
        className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20"
      >
        {/* Text Content - Left Side (Always first on mobile) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full lg:w-3/5 order-1 lg:order-1"
        >
          <h1
            className="font-heading font-bold text-amber-500 mb-4 xs:mb-5 sm:mb-6 md:mb-8 drop-shadow-md text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center lg:text-left"
            style={{
              lineHeight: '1.1',
            }}
          >
            {aboutText.title}
          </h1>

          <div
            className="text-stone-300 font-subheading leading-relaxed tracking-wide text-left sm:text-justify text-sm xs:text-base sm:text-base md:text-lg lg:text-lg xl:text-xl"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(0.75rem, 2vw, 1.5rem)',
            }}
          >
            {aboutText.paragraphs.map((para, index) => (
              <p key={index} className="drop-shadow-sm">
                {para}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Animated Logo - Right Side (Bottom on mobile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full lg:w-2/5 flex justify-center lg:justify-end items-center order-2 lg:order-2"
        >
          <div
            className="relative w-[45vw] xs:w-[40vw] sm:w-[35vw] md:w-[30vw] lg:w-[28vw] xl:w-[24vw] min-w-[140px] max-w-[400px] aspect-square"
          >
            {/* CSS Optimized Swirling Particles - Scaled for responsiveness */}
            <div className="absolute inset-0 pointer-events-none z-0">
              {/* Ring 1 - Fast Inner Orbit (Clockwise) - 6 Particles */}
              <div className="absolute inset-0 animate-spin-normal">
                <div className="absolute top-1/2 left-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_#fbbf24] -translate-x-1/2 -translate-y-[140%]"></div>
                <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-amber-300 rounded-full shadow-[0_0_5px_#fcd34d] -translate-x-1/2 translate-y-[140%]"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-500 rounded-full shadow-[0_0_8px_#eab308] translate-x-[140%] -translate-y-1/2"></div>
                {/* Additional Particles Ring 1 */}
                <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-amber-200 rounded-full shadow-[0_0_4px_#fde68a] translate-x-[100%] translate-y-[100%]"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-400 rounded-full shadow-[0_0_6px_#facc15] -translate-x-[100%] -translate-y-[100%]"></div>
                <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-orange-300 rounded-full shadow-[0_0_4px_#fdba74] -translate-x-[100%] translate-y-[100%]"></div>
              </div>

              {/* Ring 2 - Slow Outer Orbit (Counter-Clockwise) - Hidden on very small screens */}
              <div
                className="absolute inset-0 animate-spin-reverse-slower hidden xs:block"
                style={{ opacity: 0.8 }}
              >
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-200 rounded-full shadow-[0_0_10px_#fef08a] -translate-x-1/2 -translate-y-[200%] sm:-translate-y-[280%]"></div>
                <div className="absolute top-1/2 left-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-200 rounded-full shadow-[0_0_6px_#fde68a] -translate-x-1/2 translate-y-[200%] sm:translate-y-[280%]"></div>
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-300 rounded-full shadow-[0_0_8px_#fde047] translate-x-[200%] sm:translate-x-[280%] -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-amber-100 rounded-full shadow-[0_0_4px_#fef3c7] -translate-x-[200%] sm:-translate-x-[280%] -translate-y-1/2"></div>
                {/* Additional Particles Ring 2 */}
                <div className="absolute top-1/2 left-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-yellow-100 rounded-full shadow-[0_0_5px_#fef9c3] translate-x-[150%] sm:translate-x-[200%] translate-y-[150%] sm:translate-y-[200%]"></div>
                <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-amber-50 rounded-full shadow-[0_0_4px_#fffbeb] -translate-x-[150%] sm:-translate-x-[200%] -translate-y-[150%] sm:-translate-y-[200%]"></div>
              </div>

              {/* Ring 3 - Tilted Elliptical Orbit - Hidden on very small screens */}
              <div
                className="absolute inset-0 animate-spin-slow hidden sm:block"
                style={{ transform: 'rotate(45deg)' }}
              >
                <div className="absolute top-1/2 left-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-500 rounded-full shadow-[0_0_12px_#f59e0b] translate-x-[150%] sm:translate-x-[200%] translate-y-[150%] sm:translate-y-[200%]"></div>
                <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-orange-400 rounded-full shadow-[0_0_6px_#fb923c] -translate-x-[150%] sm:-translate-x-[200%] -translate-y-[150%] sm:-translate-y-[200%]"></div>
                {/* Additional Particles Ring 3 */}
                <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-600 rounded-full shadow-[0_0_10px_#d97706] -translate-x-[150%] sm:-translate-x-[200%] translate-y-[150%] sm:translate-y-[200%]"></div>
                <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-yellow-500 rounded-full shadow-[0_0_5px_#eab308] translate-x-[150%] sm:translate-x-[200%] -translate-y-[150%] sm:-translate-y-[200%]"></div>
              </div>

              {/* Ring 4 - Random Scatter (Pulse) */}
              <div className="absolute inset-0 animate-pulse-slow">
                <div className="absolute top-[20%] left-[20%] w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full opacity-60"></div>
                <div className="absolute bottom-[20%] right-[30%] w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-200 rounded-full opacity-50"></div>
                <div className="absolute top-[40%] right-[10%] w-0.5 h-0.5 sm:w-1 sm:h-1 bg-yellow-100 rounded-full opacity-70"></div>
              </div>
            </div>

            {/* Static CSS Glow - INTENSIFIED */}
            <div className="absolute inset-0 bg-amber-500/30 blur-[40px] sm:blur-[60px] rounded-full z-[-1] animate-pulse-slow" />

            <Image
              src="/logo2.webp"
              alt="TECHUTOPIA Logo"
              fill
              className="object-contain relative z-10"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                animation: 'float 6s ease-in-out infinite',
              }}
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* CSS Keyframes for performance */}
      <style>{`
                @keyframes spin-slow {
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-reverse-slower {
                    to { transform: rotate(-360deg); }
                }
                @keyframes spin-normal {
                    to { transform: rotate(360deg); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(0.9); }
                    50% { opacity: 0.6; transform: scale(1.1); }
                }
                .animate-spin-slow { animation: spin-slow 12s linear infinite; }
                .animate-spin-reverse-slower { animation: spin-reverse-slower 18s linear infinite; }
                .animate-spin-normal { animation: spin-normal 8s linear infinite; }
                .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
            `}</style>
    </section>
  );
}
