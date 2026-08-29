'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Star as StarIcon, ChevronLeft, ChevronRight, ExternalLink, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Link from 'next/link';

// Event-to-events-page mapping (eventId from /data/events.ts)
const eventLinkMap: Record<string, number> = {
  'Space Observation': 1,
  'Coding Competition': 2,
  'Open Mic Night': 3,
  'Esports Arena': 4,
  'Fun Quiz': 5,
  'Drama Club Skit': 7,
  'Block Printing Workshop': 9,
  'Jamming Night': 10,
  'Space Object Finding Competition': 11,
  'Dance Battle': 12,
  'AR‑VR Experience Zone': 14,
  'Concert (Maan Panu)': 999,
};

interface ItineraryEvent {
  time: string;
  title: string;
  type: string;
  pos: { x: number; y: number };
  concurrentGroup?: string; // events sharing same time slot
}

interface DayData {
  constellation: string;
  clusterOffset: { x: number; y: number };
  events: ItineraryEvent[];
}

// Configuration for the full virtual space
const UNIVERSE_WIDTH = 900;
const UNIVERSE_HEIGHT = 500;

// Updated itinerary data for TECHUTOPIA 2026
const itineraryData: Record<'day1' | 'day2' | 'day3', DayData> = {
  day1: {
    constellation: 'LYRA (The Lyre)',
    clusterOffset: { x: 450, y: 250 },
    events: [
      { time: '8:00 AM - 12:00 PM', title: 'Check‑in + Registration', type: 'mandatory', pos: { x: 8, y: 18 } },
      { time: '12:30 PM - 1:30 PM', title: 'Inauguration Ceremony', type: 'mandatory', pos: { x: 25, y: 5 } },
      { time: '2:00 PM', title: 'Hackathon Starts', type: 'mandatory', pos: { x: 42, y: 22 } },
      { time: '2:00 PM - 3:00 PM', title: 'PS Selection time', type: 'mentoring', pos: { x: 28, y: 45 } },
      { time: '3:00 PM onwards', title: 'AR‑VR Experience Zone', type: 'fun', pos: { x: 50, y: 55 } },
      { time: '4:00 PM - 5:00 PM', title: 'Speaker Session (Urvij Saroliya)', type: 'session', pos: { x: 38, y: 78 } },
      { time: '9:00 PM - 10:00 PM', title: 'Dinner + Networking', type: 'fun', pos: { x: 82, y: 40 } },
      { time: '10:00 PM - 12:00 AM', title: 'Space Observation', type: 'fun', pos: { x: 72, y: 15 }, concurrentGroup: 'day1-10pm' },
      { time: '10:00 PM - 12:00 AM', title: 'Mentoring Round 1 (mentor sitting)', type: 'mentoring', pos: { x: 72, y: 15 }, concurrentGroup: 'day1-10pm' },
    ]
  },
  day2: {
    constellation: 'HYDRA (The Serpent)',
    clusterOffset: { x: 450, y: 250 },
    events: [
      { time: '12:00 AM - 2:00 AM', title: 'Open Mic Night', type: 'fun', pos: { x: 8, y: 20 } },
      { time: '9:30 AM - 1:00 PM', title: 'Mentoring Round 2 (faculty +mentor)', type: 'mentoring', pos: { x: 20, y: 12 } },
      { time: '10:00 AM onwards', title: 'Esports Arena', type: 'competition', pos: { x: 12, y: 42 }, concurrentGroup: 'day2-10am' },
      { time: '10:00 AM - 12:00 PM', title: 'Coding Competition', type: 'competition', pos: { x: 12, y: 42 }, concurrentGroup: 'day2-10am' },
      { time: '11:30 AM - 12:30 PM', title: 'Fun Quiz', type: 'fun', pos: { x: 30, y: 55 } },
      { time: '1:00 PM onwards', title: 'Block Printing Workshop', type: 'fun', pos: { x: 38, y: 38 }, concurrentGroup: 'day2-1pm' },
      { time: '1:00 PM - 2:00 PM', title: 'Speaker Session (Keerti Purswani)', type: 'session', pos: { x: 38, y: 38 }, concurrentGroup: 'day2-1pm' },
      { time: '2:30 PM - 4:00 PM', title: 'Panel Discussion', type: 'session', pos: { x: 52, y: 68 } },
      { time: '4:00 PM - 8:00 PM', title: 'Judging Round 3 [150→60]', type: 'mandatory', pos: { x: 58, y: 48 }, concurrentGroup: 'day2-430pm' },
      { time: '4:30 PM - 5:00 PM', title: 'Drama Club Skit', type: 'fun', pos: { x: 58, y: 48 }, concurrentGroup: 'day2-430pm' },
      { time: '5:00 PM - 8:00 PM', title: 'Dance Battle', type: 'competition', pos: { x: 72, y: 18 } },
      { time: '8:00 PM - 9:00 PM', title: 'Dinner Break', type: 'fun', pos: { x: 85, y: 30 } },
      { time: '9:00 PM - 12:00 AM', title: 'Space Object Finding Competition', type: 'competition', pos: { x: 88, y: 55 } },
      { time: '11:30 PM - 2:00 AM', title: 'Jamming Night', type: 'fun', pos: { x: 78, y: 80 } },
    ]
  },
  day3: {
    constellation: 'CRUX (The Southern Cross)',
    clusterOffset: { x: 450, y: 250 },
    events: [
      { time: '8:00 AM - 9:30 AM', title: 'Breakfast + Debug Time', type: 'fun', pos: { x: 18, y: 35 } },
      { time: '10:00 AM', title: 'Judging Round 4 [60→10]', type: 'mandatory', pos: { x: 38, y: 22 } },
      { time: '1:30 PM onwards', title: 'Top 10 team Presentation (Jury)', type: 'mandatory', pos: { x: 58, y: 45 } },
      { time: '5:00 PM - 7:00 PM', title: 'Closing Ceremony + Winners', type: 'mandatory', pos: { x: 78, y: 62 } },
      { time: '7:00 PM onwards', title: 'Concert (Maan Panu)', type: 'fun', pos: { x: 88, y: 38 } },
    ]
  }
};

const typeColors: Record<string, { glow: string; star: string }> = {
  mandatory: { glow: '#ff6b6b', star: '#ff8c8c' },
  fun: { glow: '#4ecdc4', star: '#6ee5dd' },
  session: { glow: '#4dabf7', star: '#74c0fc' },
  mentoring: { glow: '#9775fa', star: '#b197fc' },
  competition: { glow: '#ffd43b', star: '#ffec8c' },
};

// Utility: Group events by concurrentGroup, only render one star per group
function getUniqueStarEvents(events: ItineraryEvent[]) {
  const seen = new Set<string>();
  const result: { event: ItineraryEvent; groupEvents: ItineraryEvent[]; index: number }[] = [];
  events.forEach((event, index) => {
    if (event.concurrentGroup) {
      if (seen.has(event.concurrentGroup)) return; // skip duplicates
      seen.add(event.concurrentGroup);
      const groupEvents = events.filter(e => e.concurrentGroup === event.concurrentGroup);
      result.push({ event, groupEvents, index });
    } else {
      result.push({ event, groupEvents: [event], index });
    }
  });
  return result;
}

// Get connection lines only between unique stars
function getUniqueStarPositions(events: ItineraryEvent[]) {
  const seen = new Set<string>();
  const positions: { x: number; y: number }[] = [];
  events.forEach(event => {
    if (event.concurrentGroup) {
      if (seen.has(event.concurrentGroup)) return;
      seen.add(event.concurrentGroup);
    }
    positions.push(event.pos);
  });
  return positions;
}

export function CosmicItinerary() {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2' | 'day3'>('day1');
  const [selectedStar, setSelectedStar] = useState<number | null>(null);
  const [concurrentIndex, setConcurrentIndex] = useState(0);

  const transformComponentRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle Pan to specific constellation cluster
  useEffect(() => {
    if (!transformComponentRef.current || !containerRef.current) return;

    const { setTransform } = transformComponentRef.current;
    const viewportWidth = containerRef.current.clientWidth;
    const viewportHeight = containerRef.current.clientHeight;

    let targetScale = 1;
    if (viewportWidth < 640) targetScale = 0.7;
    else if (viewportWidth < 1024) targetScale = 0.85;
    else targetScale = 1;

    const targetCluster = (itineraryData as any)[activeDay].clusterOffset;
    if (!targetCluster) return;

    const targetX = (viewportWidth / 2) - (targetCluster.x * targetScale);
    const targetY = (viewportHeight / 2) - (targetCluster.y * targetScale);

    setTransform(targetX, targetY, targetScale, 1500, "easeInOutCubic");
  }, [activeDay]);

  // Handle Global Keyboard Navigation for Arrow Keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const days = ['day1', 'day2', 'day3'] as const;
      const currentIndex = days.indexOf(activeDay);

      if (e.key === 'ArrowRight') {
        const nextIndex = (currentIndex + 1) % days.length;
        setActiveDay(days[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (currentIndex - 1 + days.length) % days.length;
        setActiveDay(days[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeDay]);

  const currentData = itineraryData[activeDay];
  const currentEvents = currentData.events;
  const uniqueStars = useMemo(() => getUniqueStarEvents(currentEvents), [currentEvents]);
  const starPositions = useMemo(() => getUniqueStarPositions(currentEvents), [currentEvents]);

  // Generate random static background stars
  const backgroundStars = useMemo(() => {
    return Array.from({ length: 150 }).map(() => ({
      x: Math.random() * UNIVERSE_WIDTH,
      y: Math.random() * UNIVERSE_HEIGHT,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      twinkleSpeed: Math.random() * 3 + 2,
    }));
  }, []);

  // Map coordinates: spread stars across most of the canvas, centered
  const getX = (x: number, _dayKey: string) => 50 + (x / 100) * 800;
  const getY = (y: number, _dayKey: string) => 30 + (y / 100) * 440;

  // Generate path data connecting the unique stars
  const pathData = starPositions.reduce((acc: string, pos: { x: number; y: number }, i: number) => {
    const x = getX(pos.x, activeDay);
    const y = getY(pos.y, activeDay);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const handleStarClick = (starIdx: number) => {
    if (selectedStar === starIdx) {
      setSelectedStar(null);
    } else {
      setSelectedStar(starIdx);
      setConcurrentIndex(0);
    }
  };

  const handleDayChange = (day: 'day1' | 'day2' | 'day3') => {
    setActiveDay(day);
    setSelectedStar(null);
    setConcurrentIndex(0);
    
  };

  // Get the currently shown event in the tooltip
  const getTooltipEvent = () => {
    if (selectedStar === null) return null;
    const star = uniqueStars[selectedStar];
    if (!star) return null;
    return star.groupEvents[concurrentIndex] || star.groupEvents[0];
  };

  const tooltipEvent = getTooltipEvent();
  const tooltipGroup = selectedStar !== null ? uniqueStars[selectedStar]?.groupEvents : null;

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 md:pt-32 pb-20 flex flex-col" style={{ background: 'radial-gradient(ellipse at 50% 0%, #0d1137 0%, #070b1a 40%, #030408 100%)' }}>

      {/* Animated shooting stars CSS */}
      <style>{`
        @keyframes shootingStar {
          0% { transform: translateX(-100px) translateY(-100px); opacity: 0; }
          5% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(calc(100vw + 200px)) translateY(calc(100vh + 200px)); opacity: 0; }
        }
        .shooting-star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 6px 2px rgba(255,255,255,0.6), -20px -10px 4px rgba(255,255,255,0.15), -40px -20px 2px rgba(255,255,255,0.05);
        }
        .shooting-star::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 60px;
          height: 1px;
          background: linear-gradient(to left, rgba(255,255,255,0.6), transparent);
          transform: rotate(45deg);
          transform-origin: left;
        }
      `}</style>

      {/* Nebula glow layers */}
      <div className="absolute top-[-10%] left-[10%] w-[60vw] h-[60vw] rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(63,55,201,0.12) 0%, transparent 70%)' }} />
      <div className="absolute top-[30%] right-[-5%] w-[45vw] h-[45vw] rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 65%)' }} />
      <div className="absolute bottom-[5%] left-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(30,64,175,0.1) 0%, transparent 60%)' }} />
      <div className="absolute top-[60%] right-[20%] w-[30vw] h-[30vw] rounded-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 60%)' }} />

      {/* Shooting stars */}
      <div className="shooting-star" style={{ top: '15%', left: '5%', animation: 'shootingStar 6s linear 1s infinite' }} />
      <div className="shooting-star" style={{ top: '35%', left: '25%', animation: 'shootingStar 8s linear 4s infinite' }} />
      <div className="shooting-star" style={{ top: '55%', left: '60%', animation: 'shootingStar 7s linear 7s infinite' }} />

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Radial vignette on edges */}
      <div className="absolute inset-0 pointer-events-none z-[1]" style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(3,4,8,0.7) 100%)' }} />

      {/* Page Title — glowing cosmic text */}
      <div className="relative z-10 text-center mb-4 md:mb-6 pointer-events-none">
        <div className="relative inline-block">
          {/* Glow layer behind text */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-[0.25em] text-transparent uppercase absolute inset-0 blur-xl select-none"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', textShadow: '0 0 60px rgba(255,255,255,0.3), 0 0 120px rgba(100,100,255,0.15)' }}
            aria-hidden="true"
          >
            EVENT ITINERARY
          </h1>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-[0.25em] text-white/90 uppercase relative"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.3), 0 0 60px rgba(130,130,255,0.15)' }}
          >
            EVENT ITINERARY
          </h1>
        </div>
        <p className="text-white/25 text-xs md:text-sm font-[Cinzel] tracking-[0.4em] uppercase mt-2">Navigate the cosmic schedule</p>
      </div>

      {/* Day Selector Navbar */}
      <nav className="relative z-10 flex items-center justify-center gap-4 md:gap-8 pb-4 mt-6">
        {(['day1', 'day2', 'day3'] as const).map((day) => (
          <button
            key={day}
            onClick={() => handleDayChange(day)}
            className={`relative px-6 py-2 rounded-full border border-white/20 font-[Cinzel] text-sm md:text-base tracking-widest transition-all duration-300 ${activeDay === day
              ? 'bg-white/20 text-white border-white/50 shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105'
              : 'bg-transparent text-white/60 hover:text-white hover:bg-white/5'
              }`}
          >
            {day === 'day1' ? '13 MARCH' : day === 'day2' ? '14 MARCH' : '15 MARCH'}
          </button>
        ))}
      </nav>

      {/* Legend / Key — below day selector */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 mb-4 flex flex-wrap justify-center gap-4 md:gap-8">
        {Object.entries(typeColors).map(([type, colors]) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              style={{ backgroundColor: colors.star, boxShadow: `0 0 10px ${colors.glow}` }}
            />
            <span className="text-white/70 text-xs md:text-sm uppercase tracking-wider font-[Cinzel]">
              {type}
            </span>
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-6xl mx-auto z-10 overflow-hidden hidden md:block"
        style={{ height: '520px' }}
      >
        {/* Subtle helper text for the user */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-white/40 text-xs font-[Cinzel] tracking-widest bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
          Hold <kbd className="font-sans px-1 text-white/70">Ctrl</kbd> to Zoom • Click & Drag to Pan
        </div>

        <TransformWrapper
          ref={transformComponentRef}
          initialScale={1}
          minScale={0.5}
          maxScale={3}
          centerOnInit={true}
          wheel={{ step: 0.1, activationKeys: ["Control", "Meta"] }}
          doubleClick={{ disabled: false, step: 0.5 }}
          panning={{ velocityDisabled: false }}
          limitToBounds={false}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
            <button
              onClick={() => zoomIn()}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 backdrop-blur-md text-white transition-all hover:scale-105"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => zoomOut()}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 backdrop-blur-md text-white transition-all hover:scale-105"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => resetTransform()}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 backdrop-blur-md text-white transition-all hover:scale-105"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
            <div
              className="relative cursor-grab active:cursor-grabbing"
              style={{ width: `${UNIVERSE_WIDTH}px`, height: `${UNIVERSE_HEIGHT}px` }}
            >
              {/* Active Constellation Background Text */}
              <div
                className="absolute inset-0 flex items-end justify-center pointer-events-none select-none"
              >
                <span className="text-white/[0.04] font-[Cinzel] tracking-[0.3em] font-bold text-[48px] mb-4">
                  {itineraryData[activeDay].constellation}
                </span>
              </div>
              
              <svg
                viewBox={`0 0 ${UNIVERSE_WIDTH} ${UNIVERSE_HEIGHT}`}
                className="w-full h-full select-none"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Definitions */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="25" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="rgba(255,255,255,0.6)" />
                  </marker>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Background Stars */}
                {backgroundStars.map((star, i) => (
                  <motion.circle
                    key={`bg-star-${i}`}
                    cx={star.x}
                    cy={star.y}
                    r={star.r}
                    fill="white"
                    initial={{ opacity: star.opacity }}
                    animate={{ opacity: [star.opacity, star.opacity * 0.2, star.opacity] }}
                    transition={{ duration: star.twinkleSpeed, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                  />
                ))}

                {/* Only render the ACTIVE day's constellation */}
                {(() => {
                  const evts = itineraryData[activeDay].events;
                  const uniStars = getUniqueStarEvents(evts);
                  const positions = getUniqueStarPositions(evts);
                  
                  return (
                    <g key={`constellation-group-${activeDay}`}>
                      {/* Connecting Lines */}
                      {positions.map((pos, i) => {
                        if (i === positions.length - 1) return null;
                        const next = positions[i + 1];
                        return (
                          <motion.line
                            key={`line-${activeDay}-${i}`}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: i * 0.15 }}
                            x1={getX(pos.x, activeDay)}
                            y1={getY(pos.y, activeDay)}
                            x2={getX(next.x, activeDay)}
                            y2={getY(next.y, activeDay)}
                            stroke="rgba(255, 255, 255, 0.35)"
                            strokeWidth="2"
                            strokeDasharray="6,4"
                            markerEnd="url(#arrowhead)"
                          />
                        );
                      })}

                      {/* Constellation Stars */}
                      {uniStars.map((star, starIdx) => {
                        const x = getX(star.event.pos.x, activeDay);
                        const y = getY(star.event.pos.y, activeDay);
                        const primaryType = star.event.type;
                        const color = typeColors[primaryType] || typeColors.mandatory;
                        const isActive = selectedStar === starIdx;
                        const isConcurrent = star.groupEvents.length > 1;

                        return (
                          <g
                            key={`star-${activeDay}-${starIdx}`}
                            className="cursor-pointer outline-none"
                            onMouseEnter={() => { if (selectedStar === null) { setSelectedStar(starIdx); setConcurrentIndex(0); } }}
                            onMouseLeave={() => { }}
                            onClick={() => handleStarClick(starIdx)}
                            tabIndex={0}
                          >
                            <motion.circle
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: isActive ? 1.5 : 1, opacity: 1 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: starIdx * 0.1 }}
                              cx={x}
                              cy={y}
                              r={isConcurrent ? 10 : 8}
                              fill={color.star}
                              filter="url(#glow)"
                            />

                            {/* Pulsing ring */}
                            <motion.circle
                              initial={{ scale: 1, opacity: 0.8 }}
                              animate={{
                                scale: isActive ? 2.5 : [1, 1.5, 1],
                                opacity: isActive ? 0 : [0.5, 0, 0.5]
                              }}
                              transition={{ duration: isActive ? 0.4 : 2, repeat: isActive ? 0 : Infinity, ease: "easeOut" }}
                              cx={x}
                              cy={y}
                              r="12"
                              fill="none"
                              stroke={color.glow}
                              strokeWidth="2"
                            />

                            {/* Concurrent indicator: small second ring */}
                            {isConcurrent && (
                              <motion.circle
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                cx={x}
                                cy={y}
                                r="16"
                                fill="none"
                                stroke="rgba(255,255,255,0.3)"
                                strokeWidth="1"
                                strokeDasharray="3,3"
                              />
                            )}

                            {/* Star Event Label (Title and Time) */}
                            <text
                              x={x}
                              y={y + (isConcurrent ? 32 : 28)}
                              fill="rgba(255,255,255,0.85)"
                              fontSize="11"
                              fontFamily="Cinzel, serif"
                              textAnchor="middle"
                              className="pointer-events-none select-none"
                              style={{ textShadow: '0 2px 6px rgba(0,0,0,1), 0 0 12px rgba(0,0,0,1)' }}
                            >
                              <tspan x={x} dy="0" className="font-bold tracking-wider">{isConcurrent ? `${star.groupEvents.length} Events` : star.event.title}</tspan>
                              <tspan x={x} dy="14" fill="rgba(255,255,255,0.45)" fontSize="8" className="font-sans tracking-widest uppercase">{star.event.time}</tspan>
                            </text>
                          </g>
                        );
                      })}
                    </g>
                  );
                })()}
              </svg>

              {/* Tooltips */}
              <AnimatePresence>
                {selectedStar !== null && tooltipEvent && tooltipGroup && (() => {
                  const starPos = uniqueStars[selectedStar].event.pos;
                  const x = getX(starPos.x, activeDay);
                  const y = getY(starPos.y, activeDay);

                  const isNearTop = y < 100;
                  const showBelow = isNearTop;
                  const translateY = showBelow ? '30px' : 'max(-105%, -150px)';
                  
                  return (
                    <motion.div
                      key={`tooltip-${activeDay}-${selectedStar}`}
                      initial={{ opacity: 0, y: showBelow ? -10 : 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: showBelow ? -10 : 10, scale: 0.9 }}
                      className="absolute z-30 pointer-events-auto"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: `translate(-50%, ${translateY})`,
                      }}
                    >
                      <div className="bg-[#12141d]/95 backdrop-blur-xl border border-white/15 rounded-xl p-4 min-w-[260px] max-w-[320px] shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(100,100,255,0.08)] flex flex-col gap-2 pointer-events-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[#d4af37]">
                            <StarIcon className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">Event Details</span>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedStar(null); }}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-white/40 hover:text-white text-xs transition-colors"
                          >
                            ✕
                          </button>
                        </div>

                        {/* Event Title */}
                        <h3 className="text-white font-[Cinzel] font-semibold text-base leading-tight mt-1">
                          {tooltipEvent.title}
                        </h3>

                        {/* Time */}
                        <div className="flex items-center gap-2 text-white/70 text-sm mt-1">
                          <Clock className="w-4 h-4 text-white/50 shrink-0" />
                          <span>{tooltipEvent.time}</span>
                        </div>

                        {/* Type badge */}
                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: (typeColors[tooltipEvent.type] || typeColors.mandatory).star }}
                          />
                          <span className="text-white/50 text-xs uppercase tracking-wider font-bold">
                            {tooltipEvent.type}
                          </span>
                        </div>

                        {/* Concurrent event navigation */}
                        {tooltipGroup.length > 1 && (
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setConcurrentIndex((prev) => (prev - 1 + tooltipGroup.length) % tooltipGroup.length);
                              }}
                              className="p-1.5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="text-white/40 text-xs font-[Cinzel] tracking-wider">
                              {concurrentIndex + 1} / {tooltipGroup.length} at this time
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setConcurrentIndex((prev) => (prev + 1) % tooltipGroup.length);
                              }}
                              className="p-1.5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {/* Register / View in Events link */}
                        {(tooltipEvent.type === 'fun' || tooltipEvent.type === 'competition') && eventLinkMap[tooltipEvent.title] && (
                          <Link
                            href={`/events`}
                            onClick={(e) => e.stopPropagation()}
                            className="mt-2 flex items-center justify-center gap-2 bg-[#d4af37]/20 hover:bg-[#d4af37]/40 border border-[#d4af37]/30 text-[#d4af37] rounded-lg py-2 px-4 text-xs font-[Cinzel] font-bold uppercase tracking-wider transition-all hover:scale-[1.02]"
                          >
                            <ExternalLink className="w-3 h-3" />
                            View in Events
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </TransformComponent>
          </>
          )}
        </TransformWrapper>
      </div>

{/* Mobile Timeline List — shown only on small screens */}
      <MobileTimeline
        events={currentEvents}
        activeDay={activeDay}
        eventLinkMap={eventLinkMap}
      />

    </section>
  );
}

// ──────────────────────────────────────────────
// Mobile Timeline List Component
// ──────────────────────────────────────────────

interface TimeSlot {
  time: string;
  events: ItineraryEvent[];
}

function groupEventsByTime(events: ItineraryEvent[]): TimeSlot[] {
  const map = new Map<string, ItineraryEvent[]>();
  events.forEach(event => {
    const existing = map.get(event.time) || [];
    existing.push(event);
    map.set(event.time, existing);
  });
  return Array.from(map.entries()).map(([time, evts]) => ({ time, events: evts }));
}

function MobileTimeline({
  events,
  activeDay,
  eventLinkMap,
}: {
  events: ItineraryEvent[];
  activeDay: string;
  eventLinkMap: Record<string, number>;
}) {
  const [activeSlotIndices, setActiveSlotIndices] = useState<Record<number, number>>({});
  const timeSlots = useMemo(() => groupEventsByTime(events), [events]);

  // Reset indices when day changes
  useMemo(() => {
    setActiveSlotIndices({});
  }, [activeDay]);

  const getSlotIndex = (slotIdx: number, maxEvents: number) => {
    const idx = activeSlotIndices[slotIdx] || 0;
    return idx < maxEvents ? idx : 0; // safety clamp
  };

  const cycleEvent = (slotIdx: number, direction: 1 | -1, totalEvents: number) => {
    setActiveSlotIndices(prev => {
      const current = prev[slotIdx] || 0;
      const next = (current + direction + totalEvents) % totalEvents;
      return { ...prev, [slotIdx]: next };
    });
  };

  return (
    <div className="block md:hidden relative z-10 w-full px-4 pb-8">
      <div className="relative max-w-md mx-auto">
        {/* Vertical timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

        <AnimatePresence mode="wait">
          <motion.div
            key={`mobile-${activeDay}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-1"
          >
            {timeSlots.map((slot, slotIdx) => {
              const currentEventIdx = getSlotIndex(slotIdx, slot.events.length);
              const currentEvent = slot.events[currentEventIdx] || slot.events[0];
              const color = typeColors[currentEvent.type] || typeColors.mandatory;
              const hasConcurrent = slot.events.length > 1;
              const hasLink = (currentEvent.type === 'fun' || currentEvent.type === 'competition') && eventLinkMap[currentEvent.title];

              return (
                <motion.div
                  key={`slot-${slotIdx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: slotIdx * 0.05, duration: 0.3 }}
                  className="relative flex items-start gap-4 pl-2"
                >
                  {/* Timeline dot */}
                  <div className="relative z-10 mt-5 shrink-0">
                    <div
                      className="w-3 h-3 rounded-full border-2"
                      style={{
                        backgroundColor: color.star,
                        borderColor: color.glow,
                        boxShadow: `0 0 8px ${color.glow}40`,
                      }}
                    />
                  </div>

                  {/* Event card */}
                  <div className="flex-1 py-2">
                    {/* Time label */}
                    <div className="text-white/40 text-[11px] font-[Cinzel] tracking-wider uppercase mb-1">
                      {slot.time}
                    </div>

                    <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-3 backdrop-blur-sm">
                      {/* Type badge + title row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-[Cinzel] font-semibold text-sm leading-snug">
                            {currentEvent.title}
                          </h4>
                          <span
                            className="inline-block mt-1 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full"
                            style={{
                              color: color.star,
                              backgroundColor: `${color.glow}15`,
                              border: `1px solid ${color.glow}30`,
                            }}
                          >
                            {currentEvent.type}
                          </span>
                        </div>

                        {/* Concurrent arrows */}
                        {hasConcurrent && (
                          <div className="flex items-center gap-1 shrink-0 mt-1">
                            <button
                              onClick={() => cycleEvent(slotIdx, -1, slot.events.length)}
                              className="p-1 rounded-md bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition-colors"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-white/30 text-[10px] font-mono min-w-[24px] text-center">
                              {currentEventIdx + 1}/{slot.events.length}
                            </span>
                            <button
                              onClick={() => cycleEvent(slotIdx, 1, slot.events.length)}
                              className="p-1 rounded-md bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition-colors"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Swipe hint for concurrent events */}
                      {hasConcurrent && (
                        <div className="flex items-center justify-center gap-1 mt-1.5 text-white/20 text-[9px] tracking-wider">
                          <motion.span
                            animate={{ x: [-2, 2, -2] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            ←
                          </motion.span>
                          <span className="font-[Cinzel]">swipe for more events</span>
                          <motion.span
                            animate={{ x: [2, -2, 2] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          >
                            →
                          </motion.span>
                        </div>
                      )}

                      {/* View in Events link */}
                      {hasLink && (
                        <Link
                          href="/events"
                          className="mt-2 flex items-center justify-center gap-1.5 bg-[#d4af37]/15 hover:bg-[#d4af37]/30 border border-[#d4af37]/20 text-[#d4af37] rounded-lg py-1.5 px-3 text-[10px] font-[Cinzel] font-bold uppercase tracking-wider transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View in Events
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
