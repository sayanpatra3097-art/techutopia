'use client';

import { X } from 'lucide-react';
const logoImage = '/owl-logo.png';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';



interface LayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { number: 'I', name: 'Home', path: '/' },
  { number: 'II', name: 'About', path: '/about' },
  { number: 'III', name: 'Prizes', path: '/prizes' },
  { number: 'IV', name: 'Partners', path: '/partners' },
  { number: 'V', name: 'Itinerary', path: '/itinerary' },
  { number: 'VI', name: 'Events', path: '/events' },
  { number: 'VII', name: 'Past Photos', path: '/gallery' },
  { number: 'VIII', name: 'FAQ', path: '/faq' },
  { number: 'IX', name: 'Team', path: '/team' },
  { number: 'X', name: 'Why Sponsor Us ?', path: '/sponsor' },
  { number: 'XI', name: 'Call for Problems', path: '/call-for-problems' },
];

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className="min-h-screen font-serif relative bg-(--void-black) text-(--ivory-cream)"
    >
      {/* Top Line with Menu and Logo */}
      <div className="fixed top-0 left-0 right-0 h-24 md:h-32 z-50 transition-all duration-300 bg-transparent pointer-events-none">
        <div className="relative w-full h-full mt-10 md:mt-12">
          {/* Horizontal line - Left side (Menu to Logo) */}
          <div
            className="absolute top-0 left-20 md:left-26 h-px pointer-events-none bg-[rgba(126,64,49,0.3)] right-[calc(50%+60px)]"
          ></div>

          {/* Horizontal line - Right side (Logo to Edge) */}
          <div
            className="absolute top-0 right-20 h-px pointer-events-none bg-[rgba(126,64,49,0.3)] left-[calc(50%+60px)]"
          ></div>

          {/* Menu - Left */}
          <div className="absolute top-0 left-4 md:left-8 -translate-y-1/2 pointer-events-auto">
            <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-2 group p-2">
              <span
                className="uppercase text-base md:text-lg tracking-[0.2em] font-medium transition-colors text-[rgba(255,236,209,0.9)] hover:text-(--golden-amber)"
              >
                Menu
              </span>
            </button>
          </div>

          {/* Logo - Center */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto px-4 md:px-6 h-12 md:h-16 flex items-center justify-center">
            <Link
              href="/"
              className="flex items-center transition-transform hover:scale-110 duration-300"
            >
              <Image src={logoImage} alt="TECHUTOPIA" width={64} height={64} className="h-12 md:h-16 w-auto object-contain" priority />
            </Link>
          </div>

          {/* Sound Button - Right */}

        </div>
      </div>

      {/* Bottom Line - Only between navigation buttons */}
      <div
        className="fixed bottom-4 md:bottom-8 left-10 right-10 md:left-40 md:right-40 h-px pointer-events-none z-50 transition-all duration-300 bg-[rgba(126,64,49,0.3)]"
      ></div>

      {/* Top Gradient Overlay to mask scrolling content */}
      <div className="fixed top-0 left-0 right-0 h-40 z-40 bg-linear-to-b from-black via-black/60 to-transparent pointer-events-none" />

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-noise opacity-30 mix-blend-overlay"></div>

      {/* Main Content */}
      <main className="relative z-10">{children}</main>



      {/* Left Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop - Semi-transparent overlay on content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 pointer-events-auto"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar Menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="fixed left-0 top-0 bottom-0 z-60 w-[85vw] sm:w-104 flex flex-col shadow-2xl sidebar-menu overflow-y-auto bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header: Socials + Close Button */}
              <div className="flex items-center justify-between p-4 sm:p-6 pl-4 sm:pl-8">
                {/* Social Icons */}
                <div className="flex items-center gap-5">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/techutopia?igsh=emlxeDluZjNueTNq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform transform hover:scale-110"
                    title="Instagram"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                    >
                      <defs>
                        <linearGradient id="insta_grad" x1="2" y1="21" x2="22" y2="3" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#f09433" />
                          <stop offset="0.25" stopColor="#e6683c" />
                          <stop offset="0.5" stopColor="#dc2743" />
                          <stop offset="0.75" stopColor="#cc2366" />
                          <stop offset="1" stopColor="#bc1888" />
                        </linearGradient>
                      </defs>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#insta_grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" stroke="url(#insta_grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17.5 6.5H17.51" stroke="url(#insta_grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>

                  {/* X (formerly Twitter) */}
                  <a
                    href="https://x.com/TechUtopia?s=20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform transform hover:scale-110 text-(--ivory-cream) hover:text-(--gold-shimmer)"
                    title="X (Twitter)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* Discord */}
                  <a
                    href="https://discord.gg/TYyAmwzC38"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform transform hover:scale-110"
                    title="Discord"
                  >
                    {/* Official Discord Logo (Clyde) - Filled */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 127.14 96.36"
                      className="w-7 h-7"
                    >
                      <path
                        fill="#5865F2"
                        d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.89,105.89,0,0,0,126.6,80.22c1.72-18.53.07-35.84-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5.06-12.74,11.32-12.74S96.15,46,96.06,53,91,65.69,84.69,65.69Z"
                      />
                    </svg>
                  </a>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-white/10 text-(--ivory-cream) hover:bg-[rgba(255,215,0,0.2)] hover:text-(--gold-shimmer)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 px-4 sm:px-8 py-4">
                <div className="flex flex-col gap-6">
                  {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-4 group transition-all active:scale-95 touch-manipulation italic ${isActive
                          ? 'text-(--gold-shimmer)'
                          : 'text-(--ivory-cream) hover:text-(--gold-shimmer) hover:[text-shadow:0_0_8px_rgba(255,215,0,0.6)]'
                          }`}
                      >
                        <span
                          className={`font-[Cinzel] text-xl tracking-wider min-w-10 ${isActive ? 'text-(--gold-shimmer)' : 'text-(--stone-gray)'
                            }`}
                        >
                          {item.number}.
                        </span>
                        <span className="font-[Cinzel] text-xl tracking-wide">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </nav>





              <div className="px-4 sm:px-8 py-6 border-t border-[rgba(126,64,49,0.3)]">
                <span
                  className="font-[Cinzel] text-sm transition-colors block text-center opacity-80 text-(--stone-gray)"
                >
                  © 2026 TECHUTOPIA 2026, All rights reserved
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
