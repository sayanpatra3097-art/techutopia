'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const pageOrder = [
  { path: '/', name: 'Home' },
  { path: '/about', name: 'About' },

  { path: '/prizes', name: 'Prizes' },
  { path: '/partners', name: 'Partners' },
  { path: '/itinerary', name: 'Itinerary' },
  { path: '/events', name: 'Events' },
  { path: '/gallery', name: 'Past Photos' },
  { path: '/faq', name: 'FAQ' },
  { path: '/team', name: 'Team' },
  { path: '/sponsor', name: 'Why Sponsor Us ?' },
  { path: '/call-for-problems', name: 'Call for Problems' },
];

export function PageNavigation({ onNext }: { onNext?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine current index based on pathname
  const normalizePath = (p: string) => {
    if (p === '/') return p;
    return p.endsWith('/') ? p.slice(0, -1) : p;
  };

  const currentPath = normalizePath(pathname);
  const currentIndex = pageOrder.findIndex((page) => normalizePath(page.path) === currentPath);

  // Fallback if index not found
  const effectiveIndex = currentIndex === -1 ? 0 : currentIndex;

  const previousPage = effectiveIndex > 0 ? pageOrder[effectiveIndex - 1] : null;
  const nextPage = effectiveIndex < pageOrder.length - 1 ? pageOrder[effectiveIndex + 1] : null;

  const handleNavigation = (page: typeof pageOrder[0]) => {
    router.push(page.path);
  };

  return (
    <>
      {/* Desktop/Default Navigation - Corner Buttons */}
      <div className="hidden md:block">
        {/* Previous Page Button */}
        {previousPage && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="fixed bottom-8 left-8 z-[10000]"
          >
            <Link
              href={previousPage.path}
              className="group flex items-center gap-3 transition-colors duration-300 p-3 -m-3"
              style={{ color: 'var(--ivory-cream)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-shimmer)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ivory-cream)')}
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                  Previous
                </span>
                <span
                  className="nav-page-name text-base font-[Cinzel] pb-1 transition-colors whitespace-nowrap"
                  style={{ borderBottom: '1px solid rgba(255, 215, 0, 0.5)' }}
                >
                  {previousPage.name}
                </span>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Next Page Button */}
        {nextPage && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="fixed bottom-8 right-8 z-[10000]"
          >
            <Link
              href={nextPage.path}
              onClick={(e) => {
                if (onNext) {
                  e.preventDefault();
                  onNext();
                }
              }}
              className="group flex items-center gap-3 transition-colors duration-300 p-3 -m-3"
              style={{ color: 'var(--ivory-cream)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold-shimmer)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ivory-cream)')}
            >
              <div className="flex flex-col items-end">
                <span className="text-xs uppercase tracking-[0.2em] opacity-80 group-hover:opacity-100 transition-opacity">
                  Next
                </span>
                <span
                  className="nav-page-name text-base font-[Cinzel] pb-1 transition-colors whitespace-nowrap"
                  style={{ borderBottom: '1px solid rgba(255, 215, 0, 0.5)' }}
                >
                  {nextPage.name}
                </span>
              </div>
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>

      {/* Mobile Navigation Bar */}
      <AnimatePresence>
        {(previousPage || nextPage) && (
          <>
            {/* Previous Button - Left Corner */}
            {previousPage && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:hidden fixed bottom-5 left-5 z-[10000]"
              >
                <Link
                  href={previousPage.path}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-gold-500/80 active:bg-gold-500/10 active:scale-95 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-cinzel text-ivory-cream">Prev</span>
                </Link>
              </motion.div>
            )}

            {/* Next Button - Right Corner */}
            {nextPage && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:hidden fixed bottom-5 right-5 z-[10000]"
              >
                <Link
                  href={nextPage.path}
                  onClick={(e) => {
                    if (onNext) {
                      e.preventDefault();
                      onNext();
                    }
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-gold-500/80 active:bg-gold-500/10 active:scale-95 transition-all shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                >
                  <span className="text-[10px] uppercase tracking-widest font-cinzel text-ivory-cream">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
