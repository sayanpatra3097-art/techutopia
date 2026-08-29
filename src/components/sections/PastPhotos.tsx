'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';

// Load all gallery images
// Note: import.meta.glob is Vite-specific and doesn't work in Next.js
// For Next.js, we need to use static imports or a different approach
// Using placeholder data for now - in production, you'd use static imports or an API

// Map folder names to display captions
const categoryMap: Record<string, string> = {
  'legendary moments': 'LEGENDARY MOMENTS',
  'heroes coding': 'HEROES CODING',
  'the oracle speaks': 'THE ORACLE SPEAKS',
  'building olympus': 'BUILDING OLYMPUS',
  'code of the gods': 'CODE OF THE GODS',
  "titan's work": "TITAN'S WORK",
  'mythic creations': 'MYTHIC CREATIONS',
  'victory feast': 'VICTORY FEAST',
  'the odyssey begins': 'THE ODYSSEY BEGINS',
  'spartan discpline': 'SPARTAN DISCIPLINE',
  'athenian wisdom': 'ATHENIAN WISDOM',
  "delphi's vision": "DELPHI'S VISION",
};

// Past event gallery images from public/gallery/past/
const galleryImages = Array.from({ length: 42 }, (_, index) => ({
  src: `/gallery/past/${index + 1}.webp`,
  caption: Object.values(categoryMap)[index % Object.values(categoryMap).length],
  id: index,
}));

interface GalleryImage {
  src: string;
  caption: string;
  id: number;
}

export function PastPhotos() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [columns, setColumns] = useState(4);
  const [visibleCount, setVisibleCount] = useState(12); // Pagine images
  const scrollRef = useRef(null);

  // Responsive Column Calculation
  useEffect(() => {
    const handleResize = () => {
      // Granular breakpoints for Masonry
      if (window.innerWidth < 640) setColumns(1); // Mobile: 1 column
      else if (window.innerWidth < 1024) setColumns(2); // Tablet: 2 columns
      else if (window.innerWidth < 1400) setColumns(3); // Small Laptop: 3 columns
      else setColumns(4); // Desktop: 4 columns
    };

    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    handleResize();
    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Visible subset of images
  const visibleImages = useMemo(() => galleryImages.slice(0, visibleCount), [visibleCount]);

  // Split images into columns for true Masonry layout
  const columnStreams = useMemo(() => {
    const streams = Array.from({ length: columns }, () => [] as GalleryImage[]);
    visibleImages.forEach((img, i) => {
      streams[i % columns].push(img);
    });
    return streams;
  }, [columns, visibleImages]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 12, galleryImages.length));
  };

  // Background Parallax for "Floating Dust"
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Memoize particles to prevent hydration mismatch
  const particles = useMemo(
    () =>
      Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1, // Slightly smaller particles
        opacity: Math.random() * 0.4 + 0.1,
      })),
    [],
  );

  return (
    <section className="relative h-[100dvh] bg-neutral-950 overflow-hidden">
      {/* --- MYTHIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 mix-blend-overlay"></div>
        <motion.div style={{ y: yBg }} className="absolute inset-0 opacity-30">
          {/* Floating Gold Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full bg-gold-500 blur-[1px]"
              style={{
                top: `${p.top}%`,
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
                willChange: 'transform',
              }}
            />
          ))}
        </motion.div>
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950 z-10"></div>
      </div>

      {/* --- SCROLLABLE CONTENT --- */}
      <div
        ref={scrollRef}
        className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pt-24 pb-32 md:pt-32 md:pb-40 px-4 sm:px-8"
      >
        {/* --- HEADER --- */}
        <div className="relative z-10 text-center mb-10 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-[Cinzel] text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-amber-700 drop-shadow-[0_5px_15px_rgba(212,175,55,0.2)] tracking-widest mb-3 md:mb-4 px-2">
              HALL OF MEMORIES
            </h2>
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="h-[1px] w-8 sm:w-32 bg-gradient-to-r from-transparent to-amber-600"></div>
              <span className="text-amber-500 font-[Cinzel] text-lg md:text-xl">✦</span>
              <div className="h-[1px] w-8 sm:w-32 bg-gradient-to-l from-transparent to-amber-600"></div>
            </div>
            <p className="font-[Cinzel] text-amber-100/60 uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] sm:text-xs md:text-sm">
              {galleryImages.length} Artifacts Discovered
            </p>
          </motion.div>
        </div>

        {/* --- MASONRY GRID --- */}
        <div
          className="relative z-10 max-w-[1600px] mx-auto grid gap-3 sm:gap-6 md:gap-8 mb-16"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {columnStreams.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3 sm:gap-6 md:gap-8">
              {column.map((item: any, i: number) => (
                <GalleryItem
                  key={item.id}
                  item={item}
                  index={i}
                  onClick={() => setSelectedImage(item)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* --- LOAD MORE BUTTON --- */}
        {visibleCount < galleryImages.length && (
          <div className="relative z-20 flex justify-center pb-20">
            <button
              onClick={handleLoadMore}
              className="group relative px-6 py-2 md:px-8 md:py-3 bg-transparent border border-amber-500/30 overflow-hidden transition-all duration-300 hover:border-amber-500/80 hover:bg-amber-950/30"
            >
              <div className="absolute inset-0 bg-amber-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 font-[Cinzel] text-amber-100 tracking-[0.2em] group-hover:text-amber-50 uppercase text-xs md:text-sm">
                Reveal More Artifacts
              </span>
            </button>
          </div>
        )}
      </div>

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 cursor-pointer"
          >
            <motion.div
              layoutId={`image-${selectedImage.src}`}
              className="relative w-full max-w-6xl max-h-[100dvh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.caption}
                className="w-auto h-auto max-w-full max-h-[80vh] md:max-h-[85vh] object-contain border-2 border-amber-600/30 shadow-[0_0_50px_rgba(212,175,55,0.1)] rounded-sm"
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 md:mt-6 text-center"
              >
                <h3 className="text-amber-100 font-[Cinzel] text-base sm:text-2xl tracking-widest border-b border-amber-500/30 pb-2 inline-block px-8 drop-shadow-md">
                  {selectedImage.caption}
                </h3>
              </motion.div>

              {/* Close Button - Responsive Position */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 md:-top-12 md:right-0 bg-black/50 md:bg-transparent rounded-full p-2 md:p-0 text-amber-500 hover:text-amber-200 transition-colors z-50 border border-amber-500/30 md:border-none"
              >
                <span className="font-[Cinzel] text-lg md:text-xl tracking-widest px-2">✕</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Individual Gallery Card Component
interface GalleryItemProps {
  item: { src: string; caption: string };
  index: number;
  onClick: () => void;
}

function GalleryItem({ item, index, onClick }: GalleryItemProps) {
  return (
    <motion.div
      layoutId={`container-${item.src}`}
      initial={{ opacity: 0, y: 30 }} // Reduced distance
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.02, // Reduced scale
        zIndex: 10,
        transition: { duration: 0.2 }, // Faster transition
      }}
      viewport={{ once: true, margin: '50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.05 }} // Faster stagger
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-sm border-[1px] border-amber-900/20 bg-neutral-900 shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:border-amber-500/30 active:scale-95"
      style={{ willChange: 'transform' }} // Optimization
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-neutral-900">
        <motion.img
          layoutId={`image-${item.src}`}
          src={item.src}
          alt={item.caption}
          className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
          loading="lazy" // Optimized loading
          decoding="async"
        />

        {/* Optimized Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
      </div>

      {/* Caption Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-2 md:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-black/80 border-t border-amber-500/20">
        <p className="text-amber-100 font-[Cinzel] text-[10px] sm:text-sm text-center tracking-[0.2em]">
          {item.caption}
        </p>
      </div>
    </motion.div>
  );
}
