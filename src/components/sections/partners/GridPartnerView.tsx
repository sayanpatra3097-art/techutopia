'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, memo } from 'react';
import Image, { type StaticImageData } from 'next/image';
import completeBg from '../../../assets/partners/complete-bg.webp';

export interface PartnerGroup {
  title: string;
  ring: string | StaticImageData;
  color: string;
  partners: { name: string; logo: string | StaticImageData; logoScale?: number }[];
}

export interface GridPartnerData {
  id: number;
  type: 'grid';
  title: string;
  groups: PartnerGroup[];
}

const GridPartnerView = ({ data }: { data: GridPartnerData }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile/tablet screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const bgPosition = `center ${data.id * (100 / 3)}%`;

  return (
    <motion.div
      className="relative w-full min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >


      {/* Grid Content: Flex Column Flow (No Absolutes) */}
      <div className={`relative z-40 w-full flex-grow flex flex-col ${isMobile ? 'pt-16 pb-12 overflow-y-auto hide-scrollbar' : 'h-full justify-center'
        }`}>
        {data.groups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={`w-full flex flex-col items-center justify-center ${isMobile
              ? 'py-8 border-b border-white/5 last:border-none last:pb-24'
              : 'flex-1 py-4 lg:py-8'
              }`}
          >
            {group.title && (
              <h2
                className="text-lg xs:text-xl sm:text-3xl md:text-5xl font-heading tracking-wider uppercase mb-8 xs:mb-10 sm:mb-12 text-center relative z-10"
                style={{
                  background: `linear-gradient(to bottom, ${group.color} 60%, #4a4a4a 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {group.title}
              </h2>
            )}

            {/* Fluid Gaps using vh/vw */}
            <div className={`w-full max-w-[98%] xl:max-w-screen-2xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-6 justify-items-center ${isMobile ? 'gap-x-6 gap-y-10' : 'gap-x-[5vw] gap-y-[5vh]'
              }`}>
              {group.partners.map((partner, pIndex) => {
                let colClass = "col-span-1 lg:col-span-2";

                // Desktop centering logic
                if (group.partners.length === 5 && pIndex === 3) colClass += " lg:col-start-2";
                else if (group.partners.length === 4 && pIndex === 3) colClass += " lg:col-start-3";
                else if (group.partners.length === 2) colClass = "col-span-1 lg:col-span-3";
                else if (group.partners.length === 1) colClass = "col-span-2 lg:col-span-6";

                // Mobile centering logic
                if (isMobile && group.partners.length % 2 === 1 && pIndex === group.partners.length - 1) {
                  colClass = colClass.replace("col-span-1", "col-span-2");
                }

                return (
                  <div key={pIndex} className={`flex flex-col items-center gap-4 group relative w-full ${colClass}`}>
                    {/* Fluid Ring Sizing using vmin */}
                    <div
                      className="relative will-change-transform"
                      style={{
                        width: isMobile ? '40vw' : '28vmin',
                        height: isMobile ? '40vw' : '28vmin',
                        maxWidth: '400px',
                        minWidth: '180px'
                      }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 30, // Identical to Gold/Standard speed
                          ease: 'linear',
                        }}
                        className="absolute inset-0 w-full h-full"
                        style={{ transformOrigin: '50% 50%' }}
                      >
                        <Image
                          src={typeof group.ring === 'string' ? group.ring : group.ring.src}
                          alt="Ring"
                          fill
                          className={`object-contain transition-opacity ${isMobile ? 'opacity-100' : 'opacity-90 group-hover:opacity-100'
                            }`}
                          loading="eager"
                        />
                      </motion.div>
                      <div className="absolute inset-0 flex items-center justify-center p-3 xs:p-4 sm:p-8">
                        <div className="relative w-full h-full flex items-center justify-center">
                          <Image
                            src={typeof partner.logo === 'string' ? partner.logo : partner.logo.src}
                            alt={`${partner.name.toUpperCase()} LOGO`}
                            fill
                            className={`object-contain transition-all duration-300 drop-shadow-md rounded-full aspect-square ${isMobile
                              ? 'brightness-125'
                              : 'filter group-hover:brightness-125'
                              } w-[75%]! h-[75%]! relative!`}
                            style={partner.logoScale ? { transform: `scale(${partner.logoScale})` } : undefined}
                            loading="eager"
                          />
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] xs:text-xs sm:text-base md:text-lg font-heading tracking-wide text-center transition-all duration-300 ${isMobile
                      ? 'opacity-100 text-[#EFE3A0]'
                      : 'opacity-0 group-hover:opacity-100 text-[#EFE3A0]'
                      }`}>
                      {partner.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Styles for scrollbar hiding if needed */}
      <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
            `}</style>
    </motion.div>
  );
};

export default memo(GridPartnerView);
