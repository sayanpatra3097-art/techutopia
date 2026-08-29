'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, memo } from 'react';
import Image, { type StaticImageData } from 'next/image';
import completeBg from '../../../assets/partners/complete-bg.webp';

// Social Icons
import xIcon from '../../../assets/partners/social-x.svg';
import instaIcon from '../../../assets/partners/social-insta.svg';
import linkedinIcon from '../../../assets/partners/social-linkedin.svg';
import webIcon from '../../../assets/partners/social-web.svg';

export interface StandardPartnerData {
  id: number;
  type: 'standard';
  title: string;
  partnerName: string;
  ring: string | StaticImageData;
  logo: string | StaticImageData | null;
  description: string[];
  socials: boolean;
  themeColor: string;
  socialLinks?: {
    web?: string;
    linkedin?: string;
    instagram?: string;
    x?: string;
  };
  logoScale?: number;
}

const SocialIcon = memo(({ icon, link }: { icon: string | { src: string }; link?: string }) => (
  <motion.a
    href={link || '#'}
    target={link ? '_blank' : '_self'}
    rel={link ? 'noopener noreferrer' : ''}
    whileHover={{ scale: 1.25, filter: 'brightness(1.5)', y: -5 }}
    whileTap={{ scale: 0.95 }}
    className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-all ${link ? 'cursor-pointer opacity-90 hover:opacity-100' : 'cursor-default opacity-50'}`}
  >
    <Image
      src={typeof icon === 'string' ? icon : icon.src}
      alt="Social"
      width={40}
      height={40}
      className="w-full h-full object-contain brightness-125 saturate-150"
      loading="eager"
    />
  </motion.a>
));



const StandardPartnerView = ({ data }: { data: StandardPartnerData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Check for mobile/tablet screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleView = () => {
    if (isMobile && data.logo) {
      setIsHovered(!isHovered);
    }
  };

  const bgPosition = `center ${data.id * (100 / 5)}%`;

  const gradientStyle = {
    background: `linear-gradient(to bottom, ${data.themeColor} 60%, #6E561C 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <motion.div
      className="relative w-full min-h-full overflow-hidden flex flex-col"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >


      {/* Content Container - Flex Column to ensure stacking order */}
      <div className="relative z-40 w-full h-full flex flex-col items-center flex-grow">

        {/* Header Section */}
        <div className={`w-full flex flex-col items-center px-4 text-center transition-all duration-300 shrink-0 ${isMobile ? 'pt-20 pb-4' : 'pt-24 lg:pt-28 xl:pt-32 pb-8'
          }`}>
          {data.title && (
            <h2
              className="text-sm xs:text-base sm:text-xl md:text-2xl lg:text-2xl xl:text-4xl font-heading tracking-wider uppercase mb-1 sm:mb-2 md:mb-4"
              style={gradientStyle}
            >
              {data.title}
            </h2>
          )}
          <motion.h3
            animate={{ opacity: isHovered && data.logo ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-heading tracking-wider uppercase"
            style={gradientStyle}
          >
            {data.partnerName}
          </motion.h3>
        </div>

        {/* Interaction Area (Ring + Text) */}
        <div
          className={`w-full flex items-center justify-center flex-grow relative ${isMobile ? 'flex-col justify-start pb-12 gap-8' : 'flex-row gap-8 lg:gap-16'
            }`}
        >
          <div
            className={`relative flex items-center justify-center transition-all duration-500 ${isMobile ? 'w-full' : 'max-w-7xl w-full'
              }`}
          >
            <div className={`relative flex items-center justify-center w-full ${isMobile ? 'flex-col gap-6' : 'gap-12'}`}>

              {/* Ring Group */}
              <motion.div
                className={`flex items-center justify-center relative ${!isMobile && 'cursor-pointer'}`}
                animate={
                  isMobile
                    ? { y: 0, scale: 0.85 }
                    : isHovered && data.logo
                      ? { scale: 1 }
                      : { scale: 1 }
                }
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                onMouseEnter={() => {
                  if (!isMobile && data.logo) setIsHovered(true);
                }}
                onClick={!isMobile ? toggleView : undefined}
              >
                {/* Ring Size */}
                <div
                  className="relative will-change-transform object-contain"
                  style={{
                    width: isMobile ? '60vmin' : '40vmin',
                    height: isMobile ? '60vmin' : '40vmin',
                    maxWidth: '600px',
                    minWidth: '280px',
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 30,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 w-full h-full"
                    style={{ transformOrigin: '50% 50%' }}
                  >
                    <Image
                      src={typeof data.ring === 'string' ? data.ring : data.ring.src}
                      alt="Ring"
                      fill
                      className="object-contain"
                      loading="eager"
                    />
                  </motion.div>

                  {/* Logo */}
                  {data.logo && (
                    <div
                      className="absolute left-1/2 top-1/2 w-[50%] h-[50%] flex items-center justify-center"
                      style={{
                        transform: `translate(-50%, -50%) scale(${data.logoScale || 1})`
                      }}
                    >
                      <div className="relative w-full h-full flex items-center justify-center p-2">
                        <Image
                          src={typeof data.logo === 'string' ? data.logo : data.logo.src}
                          alt="Logo"
                          fill
                          className="object-contain"
                          loading="eager"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Content Details */}
              <AnimatePresence>
                {(isMobile || (isHovered && data.logo)) && (
                  <motion.div
                    initial={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
                    animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
                    exit={isMobile ? { opacity: 0, y: 30 } : { opacity: 0, x: 50 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className={`flex flex-col gap-3 sm:gap-6 text-left ${isMobile
                      ? 'w-[90%] max-w-2xl mx-auto px-4 pb-8 bg-neutral-950/40 backdrop-blur-sm rounded-xl'
                      : 'max-w-xl'
                      }`}
                  >
                    <div className="space-y-1 sm:space-y-6">
                      <h4
                        className="text-lg xs:text-xl sm:text-3xl font-heading uppercase tracking-widest border-b pb-1 sm:pb-2"
                        style={{ color: data.themeColor, borderColor: `${data.themeColor}33` }}
                      >
                        {data.partnerName}
                      </h4>

                      {data.description.map((desc: string, i: number) => (
                        <p
                          key={i}
                          className="text-[#FFEAA4] font-subheading leading-relaxed text-xs xs:text-sm sm:text-base md:text-lg text-justify opacity-90"
                        >
                          {desc}
                        </p>
                      ))}
                    </div>

                    <div
                      className="w-full h-px my-2"
                      style={{
                        background: `linear-gradient(to right, ${data.themeColor}80, ${data.themeColor}33, transparent)`,
                      }}
                    />

                    {/* Social Links */}
                    {data.socials && (
                      <div className="flex items-center justify-end gap-4 sm:gap-6 pb-2 sm:pb-0">
                        {data.socialLinks?.x && <SocialIcon icon={xIcon} link={data.socialLinks?.x} />}
                        {data.socialLinks?.instagram && <SocialIcon icon={instaIcon} link={data.socialLinks?.instagram} />}
                        {data.socialLinks?.linkedin && <SocialIcon icon={linkedinIcon} link={data.socialLinks?.linkedin} />}
                        {data.socialLinks?.web && <SocialIcon icon={webIcon} link={data.socialLinks?.web} />}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>

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

export default memo(StandardPartnerView);
