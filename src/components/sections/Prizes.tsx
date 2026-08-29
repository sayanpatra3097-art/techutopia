'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Assets
import arrowLeft from '../../assets/prizes/arrow-left.webp';
import arrowRight from '../../assets/prizes/arrow-right.webp';
import zeusImg from '../../assets/prizes/zeus.webp';
import poseidonImg from '../../assets/prizes/poseidon.webp';
import hadesImg from '../../assets/prizes/hades.webp';
import domainSpartan from '../../assets/prizes/domain-spartan.webp';
import bgImage from '../../assets/prizes/bg.webp';
import { colors } from '@/constants/colors';

const mainPrizes = [
  {
    rank: '1',
    title: '1ST PRIZE',
    god: 'Zeus',
    role: 'Ruler of the Sky',
    amount: '50K',
    color: '#FFD700',
    border: 'linear-gradient(to bottom right, #FFD700, #B8860B)',
    image: zeusImg,
  },
  {
    rank: '2',
    title: '2ND PRIZE',
    god: 'Poseidon',
    role: 'Ruler of the Seas',
    amount: '25K',
    color: '#C0C0C0',
    border: 'linear-gradient(to bottom right, #a0a0a0, #e0e0e0)',
    image: poseidonImg,
  },
  {
    rank: '3',
    title: '3RD PRIZE',
    god: 'Hades',
    role: 'Ruler of the Underworld',
    amount: '15K',
    color: '#cd7f32',
    border: 'linear-gradient(to bottom right, #cd7f32, #8b4500)',
    image: hadesImg,
  },
];

const domainPrizes = [
  { title: 'AI/ML & Data Science', desc: 'Best AI/Data Innovation', img: domainSpartan },
  { title: 'Cyber Security', desc: 'Best Security Hack', img: domainSpartan },
  { title: 'Blockchain', desc: 'Best Web3 DApp', img: domainSpartan },
  { title: 'Fintech', desc: 'Best Fintech Solution', img: domainSpartan },
];

export default function Prizes() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1920);
  const [viewportHeight, setViewportHeight] = useState(1080);
  const [isMounted, setIsMounted] = useState(false); // Track client-side mount

  // Responsive check for mobile devices and viewport dimensions
  useEffect(() => {
    setIsMounted(true); // Set mounted on client
    const updateDimensions = () => {
      setIsMobile(window.innerWidth < 768);
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Combined scale factor based on BOTH width and height
  const widthScale = Math.max(0, Math.min(1, (viewportWidth - 280) / (1920 - 280)));
  const heightScale = Math.max(0, Math.min(1, (viewportHeight - 400) / (1080 - 400)));
  const scaleFactor = Math.min(widthScale, heightScale);

  // Responsive dimension helpers
  const getCarouselHeight = () => Math.round(140 + 540 * scaleFactor); // 140-680px
  const getCardWidth = () => Math.round(100 + 300 * scaleFactor); // 100-400px
  const getCardHeight = () => Math.round(getCardWidth() * 1.5);
  const getDomainCardWidth = () => Math.round(100 + 240 * scaleFactor); // 100-340px
  const getDomainCardHeight = () => Math.round(getDomainCardWidth() * 1.5);
  const getTitleFontSize = () => Math.round(14 + 66 * scaleFactor); // 14-80px
  const getGap = () => Math.round(6 + 26 * scaleFactor); // 6-32px
  const getMobileTextScale = () => scaleFactor;

  const prevIndex = (activeIndex - 1 + mainPrizes.length) % mainPrizes.length;
  const nextIndex = (activeIndex + 1) % mainPrizes.length;
  const activePrize = mainPrizes[activeIndex];


  // Determine particle counts and generate them on client-side only
  const [flameParticles, setFlameParticles] = useState<{ width: number; height: number; left: number; x1: number; x2: number; rotate: number; duration: number; delay: number }[]>([]);
  const [fireEmberParticles, setFireEmberParticles] = useState<{ width: number; height: number; left: number; borderRadius: number; x1: number; x2: number; duration: number; delay: number }[]>([]);
  const [ashParticles, setAshParticles] = useState<{ width: number; height: number; left: number; borderRadius: number; x: number; rotate: number; duration: number; delay: number }[]>([]);
  const [debrisParticles, setDebrisParticles] = useState<{ width: number; height: number; left: number; borderRadius: number; x: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Helper for random gen
    const isMobileDevice = window.innerWidth < 768;

    // Flame Particles
    const flameCount = isMobileDevice ? 10 : 20;
    setFlameParticles(Array.from({ length: flameCount }).map(() => ({
      width: Math.random() * 5 + 2,
      height: Math.random() * 6 + 3,
      left: Math.random() * 100,
      x1: Math.random() * 80 - 40,
      x2: Math.random() * 60 - 30,
      rotate: Math.random() * 180 - 90,
      duration: Math.random() * 6 + 8,
      delay: Math.random() * 10,
    })));

    // Fire Ember Particles
    const emberCount = isMobileDevice ? 12 : 25;
    setFireEmberParticles(Array.from({ length: emberCount }).map(() => ({
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: Math.random() * 100,
      borderRadius: Math.random() * 50 + 50,
      x1: Math.random() * 60 - 30,
      x2: Math.random() * 40 - 20,
      duration: Math.random() * 8 + 10,
      delay: Math.random() * 12,
    })));

    // Ash Particles
    const ashCount = isMobileDevice ? 15 : 30;
    setAshParticles(Array.from({ length: ashCount }).map(() => ({
      width: Math.random() * 2.5 + 1,
      height: Math.random() * 2.5 + 1,
      left: Math.random() * 100,
      borderRadius: Math.random() * 40 + 60,
      x: Math.random() * 50 - 25,
      rotate: Math.random() * 180,
      duration: Math.random() * 7 + 9,
      delay: Math.random() * 12,
    })));

    // Debris Particles
    const debrisCount = isMobileDevice ? 8 : 15;
    setDebrisParticles(Array.from({ length: debrisCount }).map(() => ({
      width: Math.random() * 3 + 2,
      height: Math.random() * 3 + 2,
      left: Math.random() * 100,
      borderRadius: Math.random() * 30 + 70,
      x: Math.random() * 40 - 20,
      duration: Math.random() * 10 + 12,
      delay: Math.random() * 15,
    })));

  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % mainPrizes.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + mainPrizes.length) % mainPrizes.length);
  }, []);

  // Auto-play functionality for Main Prizes
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(interval);
  }, [handleNext]);

  return (
    <div className="relative text-neutral-100 min-h-screen overflow-hidden selection:bg-yellow-900 selection:text-white pb-12 xs:pb-14 sm:pb-16 md:pb-20 lg:pb-24">
      {/* Gradient Background - transitions from parchment-brown to marble */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute inset-0 bg-linear-to-b from-[#2a2520] via-[#1a1510] to-[#0f0a05]" />
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="object-cover opacity-40"
          placeholder="blur"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        {/* Gold ambient glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[150px] opacity-20 bg-[radial-gradient(ellipse,var(--gold-primary),transparent)]"
        />
      </div>

      {/* Styles */}
      <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
            @keyframes ash-drift {
                0% { transform: translateY(-10px) translateX(0px) rotate(0deg); opacity: 0; }
                10% { opacity: 0.6; }
                90% { opacity: 0.2; }
                100% { transform: translateY(100vh) translateX(20px) rotate(180deg); opacity: 0; }
            }
        `}</style>

      {/* COMBINED PARTICLES - Absolute to container */}
      {isMounted && (
        <div
          className="absolute inset-0 pointer-events-none z-1 overflow-hidden contain-[layout_style_paint]"
        >
          {/* Particles maps... (Same as before) */}
          {flameParticles.map((particle, i) => (
            <motion.div
              key={`flame-${i}`}
              className="absolute rounded-full shadow-lg will-change-transform"
              style={{
                width: isMobile ? `${particle.width * 0.7}px` : `${particle.width}px`,
                height: isMobile ? `${particle.height * 0.7}px` : `${particle.height}px`,
                left: `${particle.left}%`,
                bottom: `-20px`,
                borderRadius: `50% 50% 50% 50% / 60% 60% 40% 40%`,
                backgroundColor: 'rgba(255, 140, 0, 0.8)',
                boxShadow: '0 0 8px rgba(255, 140, 0, 0.6), 0 0 16px rgba(255, 69, 0, 0.4)',
                transform: 'translateZ(0)',
              }}
              animate={{
                y: ['0vh', '-120vh'],
                x: [0, particle.x1, particle.x2],
                opacity: [0, 0.9, 0.7, 0.4, 0],
                scale: [0.3, 1.2, 0.8, 0.3],
                rotate: [0, particle.rotate],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'easeOut',
              }}
            />
          ))}
          {/* ... Other particles (simplified for brevity in this thought trace, but included in output) ... */}
          {/* Need to ensure all particle arrays are mapped */}
          {fireEmberParticles.map((particle, i) => (
            <motion.div
              key={`ember-${i}`}
              className="absolute rounded-full shadow-md will-change-transform"
              style={{
                width: particle.width, height: particle.height, left: `${particle.left}%`, bottom: '-15px',
                backgroundColor: 'rgba(255, 69, 0, 0.7)',
              }}
              animate={{ y: ['0vh', '-110vh'], opacity: [0, 0.8, 0], scale: [0.2, 1.3, 0] }}
              transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
            />
          ))}
          {ashParticles.map((particle, i) => (
            <motion.div
              key={`ash-${i}`}
              className="absolute rounded-full shadow-md will-change-transform"
              style={{
                width: particle.width, height: particle.height, left: `${particle.left}%`, top: '-15px',
                backgroundColor: 'rgba(245, 245, 220, 0.6)',
              }}
              animate={{ y: ['0vh', '108vh'], opacity: [0, 0.8, 0], scale: [0.2, 1.3, 0] }}
              transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: 'linear' }}
            />
          ))}
          {debrisParticles.map((particle, i) => (
            <motion.div
              key={`debris-${i}`}
              className="absolute rounded-full shadow-md will-change-transform"
              style={{
                width: particle.width, height: particle.height, left: `${particle.left}%`, borderRadius: `${particle.borderRadius}%`,
                backgroundColor: 'rgba(100, 100, 100, 0.5)',
              }}
              animate={{
                y: ['0vh', '100vh'],
                x: [particle.x, -particle.x],
                rotate: [0, 360],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* SECTION 1: MAIN PRIZES */}
      <section className="relative z-10 font-heading pt-24 px-4 min-h-[80vh] flex flex-col items-center justify-center">
        {/* HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center tracking-widest sm:tracking-[0.15em] md:tracking-[0.2em] lg:tracking-[0.25em] xl:tracking-[0.3em] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)] sm:drop-shadow-[0_0_20px_rgba(212,175,55,0.5)] leading-tight mb-8"
          style={{ fontSize: `${getTitleFontSize()}px`, color: colors.gold.primary }}
        >
          PRIZES
        </motion.h1>

        {/* MAIN PRIZES CAROUSEL */}
        <div
          className="relative w-full max-w-7xl flex items-center justify-center"
          style={{ height: `${getCarouselHeight()}px` }}
        >
          {/* Same Carousel Logic as before */}
          <button
            onClick={handlePrev}
            aria-label="Previous prize"
            className="absolute left-1 xs:left-2 sm:left-4 md:left-8 top-1/2 z-30 p-2 hover:scale-110 active:scale-95 transition-transform -translate-y-1/2 focus:outline-none"
          >
            <Image src={arrowLeft} alt="Prev" className="w-10 xs:w-16 md:w-20 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next prize"
            className="absolute right-1 xs:right-2 sm:right-4 md:right-8 top-1/2 z-30 p-2 hover:scale-110 active:scale-95 transition-transform -translate-y-1/2 focus:outline-none"
          >
            <Image src={arrowRight} alt="Next" className="w-10 xs:w-16 md:w-20 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
          </button>

          {/* Cards */}
          <div className="relative w-full h-full flex items-center justify-center px-1 xs:px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
            {/* Prev Card */}
            <motion.div
              className="absolute left-[5%] blur-[1px] z-10 cursor-pointer hidden md:block overflow-hidden rounded-xl border border-neutral-700/50"
              onClick={handlePrev}
              initial={{ opacity: 0 }} whileInView={{ opacity: 0.25, scale: 0.6 }}
              style={{
                width: isMobile ? '120px' : '200px', // Simplified width logic for wrapper
                height: isMobile ? '180px' : '300px'
              }}
            >
              <Image
                src={mainPrizes[prevIndex].image}
                alt={mainPrizes[prevIndex].title}
                fill
                className="object-cover object-center"
              />
            </motion.div>

            {/* Active Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`active-${activeIndex}`}
                initial={{ scale: 0.85, opacity: 0, rotateY: -15 }}
                animate={{ scale: 1, opacity: 1, x: 0, rotateY: 0 }}
                exit={{ scale: 0.85, opacity: 0, rotateY: 15 }}
                transition={{ duration: 0.6 }}
                className="z-20 relative group cursor-pointer transform-3d"
              >
                <div
                  className="rounded-xl overflow-hidden border-[3px] transition-all duration-500 group-hover:scale-105 relative"
                  style={{
                    width: `${getCardWidth()}px`,
                    height: `${getCardHeight()}px`,
                    boxShadow: `0 0 40px ${colors.gold.primary}50, 0 0 80px ${activePrize.color}30`,
                    borderColor: activePrize.color,
                  }}
                >
                  <Image
                    src={activePrize.image}
                    alt={activePrize.title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Next Card */}
            <motion.div
              className="absolute right-[5%] blur-[1px] z-10 cursor-pointer hidden md:block overflow-hidden rounded-xl border border-neutral-700/50"
              onClick={handleNext}
              initial={{ opacity: 0 }} whileInView={{ opacity: 0.25, scale: 0.6 }}
              style={{
                width: isMobile ? '120px' : '200px',
                height: isMobile ? '180px' : '300px'
              }}
            >
              <Image
                src={mainPrizes[nextIndex].image}
                alt={mainPrizes[nextIndex].title}
                fill
                className="object-cover object-center"
              />
            </motion.div>

            {/* Text Info */}
            <div className="hidden xl:flex absolute right-[4%] flex-col items-start text-left z-20 w-[280px]">
              <h2 className="text-6xl font-heading tracking-widest mb-2" style={{ color: activePrize.color }}>{activePrize.title}</h2>
              <h3 className="text-4xl font-subheading font-bold italic text-[#DEC169] mb-2">{activePrize.god}</h3>
              <p className="text-2xl italic text-neutral-400 font-subheading mb-4">{activePrize.role}</p>
              <div className="text-7xl font-heading" style={{ color: activePrize.color }}>{activePrize.amount}</div>
            </div>
          </div>
        </div>

        {/* Mobile Text */}
        <div className="xl:hidden text-center flex flex-col items-center mt-8">
          <h2 className="text-2xl font-heading tracking-widest" style={{ color: activePrize.color }}>{activePrize.title}</h2>
          <h3 className="text-xl font-subheading italic text-[#DEC169]">{activePrize.god}</h3>
          <p className="text-sm italic text-neutral-400 font-subheading mb-2">{activePrize.role}</p>
          <div className="text-4xl font-heading" style={{ color: activePrize.color }}>{activePrize.amount}</div>
        </div>
      </section>

      {/* SECTION 2: DOMAIN PRIZES */}
      <section className="relative z-20 font-heading py-24 flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest text-[#e8dab2] text-center mb-10 drop-shadow-[0_0_15px_rgba(232,218,178,0.3)]"
        >
          DOMAIN PRIZES
        </motion.h2>

        <div className="w-full max-w-[1400px] flex flex-wrap justify-center items-center gap-8 px-4">
          {domainPrizes.map((prize, index) => (
            <motion.div
              key={`domain-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group rounded-xl overflow-hidden cursor-pointer border border-[#d4af37]/40 hover:border-[#d4af37] transition-all duration-500 bg-[#0a0a0a]"
              style={{
                width: `${getDomainCardWidth()}px`,
                height: `${getDomainCardHeight()}px`,
              }}
            >
              <div className="absolute inset-0 transition-all duration-500 group-hover:scale-110 grayscale-[0.8] group-hover:grayscale-0">
                <Image
                  src={prize.img}
                  alt={prize.title}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent group-hover:bg-black/60 transition-all duration-500 z-10" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-bold font-medieval tracking-widest text-[#e8dab2] mb-2">{prize.title}</h3>
                <div className="w-8 h-0.5 bg-[#d4af37] mb-2" />
                <p className="text-sm font-baskerville italic tracking-wider">{prize.desc}</p>
              </div>

              <div className="absolute bottom-3 left-0 w-full text-center group-hover:opacity-0 transition-opacity duration-300 z-20">
                <div className="bg-black/60 backdrop-blur-sm border-y border-[#d4af37]/30 py-1 mx-2">
                  <h3 className="font-bold text-[#e8dab2] tracking-wider font-cinzel text-xs">{prize.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

