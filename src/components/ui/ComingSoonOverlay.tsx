import React from 'react';

interface ComingSoonOverlayProps {
  children: React.ReactNode;
}

export function ComingSoonOverlay({ children }: ComingSoonOverlayProps) {
  return (
    <div className="relative min-h-screen w-full">
      {/* The actual page content - rendered but potentially obscured or blurred */}
      <div className="opacity-20 pointer-events-none blur-sm select-none" aria-hidden="true">
        {children}
      </div>

      {/* The Overlay */}
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center">
        {/* Backdrop with gradient/noise to ensure readability */}
        <div
          className="absolute inset-0 z-0 backdrop-blur-md"
          style={{ backgroundColor: 'rgba(5, 5, 5, 0.9)' }}
        ></div>

        <div className="relative z-10 flex flex-col items-center justify-center p-8 border border-[#d4af37]/30 bg-black/40 rounded-lg shadow-2xl max-w-lg mx-4 text-center">
          {/* Icon or Graphic */}
          <div className="mb-6 text-[#d4af37] animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-hourglass"
            >
              <path d="M5 22h14" />
              <path d="M5 2h14" />
              <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
              <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-6xl font-[Cinzel] text-[#d4af37] mb-4 tracking-widest drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]">
            COMING SOON
          </h1>

          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-6"></div>

          <p className="text-[#e8dab2] font-serif text-lg md:text-xl italic max-w-md">
            The scrolls for this section are still being inscribed. Check back later for the
            revelation.
          </p>
        </div>
      </div>
    </div>
  );
}
