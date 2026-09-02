'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instagram, Twitter, ArrowRight, MapPin, Heart, Phone, Mail, ExternalLink } from 'lucide-react';
const logoImage = '/owl-logo.png';


const footerLinks = [
    { name: 'Home', path: '/' },

    { name: 'Prizes', path: '/prizes' },
    { name: 'Partners', path: '/partners' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Sponsor', path: '/sponsor' },
    { name: 'Itinerary', path: '/itinerary' },
    { name: 'Events', path: '/events' },
];

const socialLinks = [
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/techutopia',
        icon: <Instagram className="w-5 h-5" />,
        color: '#E1306C'
    },
    {
        name: 'Twitter',
        url: 'https://x.com/TechUtopia',
        icon: <Twitter className="w-5 h-5" />,
        color: '#1DA1F2'
    },
    {
        name: 'Discord',
        url: 'https://discord.gg/TYyAmwzC38',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
        ),
        color: '#5865F2'
    },
];

interface FooterProps {
    className?: string;
}

export function Footer({ className = '' }: FooterProps) {
    return (
        <footer className={`relative bg-black/30 backdrop-blur-2xl text-[#EFE3A0] overflow-hidden border-t border-[#d4af37]/20 ${className}`}>

            {/* Subtle Mythic Glows (Mixed Blend) */}
            <div className="absolute inset-0 z-0 pointer-events-none mix-blend-plus-lighter">
                <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[#d4af37]/10 rounded-full blur-[100px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[250px] h-[250px] bg-[#d4af37]/10 rounded-full blur-[80px] translate-y-1/2" />
            </div>

            {/* Greek Meander Border - Thinner and subtler */}
            <div
                className="absolute top-0 left-0 right-0 h-3 w-full opacity-20 z-10 mix-blend-overlay bg-greek-meander"
            />

            <div className="max-w-7xl mx-auto px-6 pt-12 pb-8 relative z-20">

                {/* HEAD INLINE REGISTRATION QUERY (moved here to save space) */}
                <div className="md:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-end mb-10 pb-6 border-b border-[#d4af37]/10 gap-6">
                    <Link href="/" className="inline-flex items-center gap-4 group">
                        <div className="relative w-12 h-12">
                            <Image
                                src={logoImage}
                                alt="TECHUTOPIA"
                                fill
                                className="object-contain drop-shadow-[0_0_15px_rgba(0,210,255,0.4)] group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div>
                            <h1 className="font-[Cinzel] text-xl text-[#d4af37] tracking-[0.2em] group-hover:text-white transition-colors">TECHUTOPIA</h1>
                            <p className="text-[9px] tracking-[0.4em] opacity-50 uppercase">Beyond Innovation</p>
                        </div>
                    </Link>

                </div>

                {/* MAIN GRID - SMALLER HEIGHT */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6 pb-12">

                    {/* Brand/About Column */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <p className="text-[#EFE3A0]/60 text-sm leading-relaxed max-w-sm italic font-serif">
                            &quot;The odyssey of code continues. Join us in forging the legends of tomorrow at UEM Jaipur's premier hackathon.&quot;
                        </p>

                        <div className="flex items-start gap-4 p-4 border border-[#d4af37]/10 bg-black/20 rounded-lg max-w-xs transition-colors hover:bg-black/40">
                            <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                            <div className="text-[11px] text-[#EFE3A0]/70 leading-relaxed uppercase tracking-wider">
                                <strong className="text-[#d4af37] block mb-1">The Sanctuary</strong>
                                UEM Jaipur<br />
                                Mahapura, Jaipur<br />
                                Rajasthan - 302026
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns (Condensed) */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-5">
                            <h3 className="font-[Cinzel] text-[#d4af37] text-[10px] tracking-[0.3em] uppercase border-b border-[#d4af37]/20 pb-2">Explore</h3>
                            <nav className="flex flex-col gap-2.5">
                                {footerLinks.slice(0, 5).map((link) => (
                                    <Link
                                        key={link.path}
                                        href={link.path}
                                        className="group text-[13px] text-[#EFE3A0]/50 hover:text-[#d4af37] transition-all flex items-center gap-2"
                                    >
                                        <div className="w-1 h-1 rounded-full bg-[#d4af37]/20 group-hover:bg-[#d4af37] transition-colors" />
                                        <span>{link.name}</span>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h3 className="font-[Cinzel] text-[#d4af37] text-[10px] tracking-[0.3em] uppercase border-b border-[#d4af37]/20 pb-2">Community</h3>
                            <nav className="flex flex-col gap-2.5">
                                {footerLinks.slice(5).map((link) => (
                                    <Link
                                        key={link.path}
                                        href={link.path}
                                        className="group text-[13px] text-[#EFE3A0]/50 hover:text-[#d4af37] transition-all flex items-center gap-2"
                                    >
                                        <div className="w-1 h-1 rounded-full bg-[#d4af37]/20 group-hover:bg-[#d4af37] transition-colors" />
                                        <span>{link.name}</span>
                                    </Link>
                                ))}
                                {/* Social Icons moved here, grouped closely */}
                                <div className="flex gap-3 mt-3">
                                    {socialLinks.map((social) => (
                                        <motion.a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1, color: social.color }}
                                            className="text-[#EFE3A0]/40 hover:text-[#d4af37] transition-all w-7 h-7 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 border border-[#d4af37]/10"
                                            title={social.name}
                                        >
                                            {social.icon}
                                        </motion.a>
                                    ))}
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Location/Map Column (Shorter height) */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                        <h3 className="font-[Cinzel] text-[#d4af37] text-[10px] tracking-[0.3em] uppercase border-b border-[#d4af37]/20 pb-2 flex items-center justify-between">
                            Locate
                            <a href="https://goo.gl/maps/UEM" target="_blank" rel="noopener noreferrer" className="text-[9px] opacity-40 hover:opacity-100 flex items-center gap-1">
                                MAPS <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                        </h3>

                        <div className="relative h-32 w-full rounded-xl overflow-hidden border border-[#d4af37]/20 group shadow-[0_0_20px_rgba(212,175,55,0.03)] bg-black/40">
                            {/* Decorative Corner Overlays */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#d4af37]/30 z-10" />
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#d4af37]/30 z-10" />

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.117070008914!2d75.64722912457951!3d26.836228513374916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4af4fe68f403%3A0x3bf05f95df22b8c4!2sJK%20Lakshmipat%20University!5e0!3m2!1sen!2sin!4v1695563431231!5m2!1sen!2sin"
                                title="Google Maps Location of UEM Jaipur"
                                width="100%"
                                height="100%"
                                allowFullScreen
                                loading="lazy"
                                className="opacity-70 hover:opacity-100 transition-opacity duration-700 filter-[invert(90%)_hue-rotate(180deg)_brightness(85%)_contrast(120%)_sepia(30%)]"
                            />

                            {/* Inner Vignette */}
                            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] mix-blend-multiply" />
                            <div className="absolute inset-0 pointer-events-none bg-[#d4af37]/5 mix-blend-color" />
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR (Enhanced Spacing & Layout) */}
                <div className="pt-4 mt-2 border-t border-[#d4af37]/10 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-4">
                    <div className="flex-1 flex justify-center lg:justify-start w-full lg:w-auto order-3 lg:order-1 opacity-80 hover:opacity-100 transition-opacity">
                        <p className="text-[10px] md:text-[11px] font-[Cinzel] tracking-[0.2em] text-[#d4af37] text-center lg:text-left leading-relaxed">
                            © 2026 TECHUTOPIA 2026.<br className="lg:hidden" /> ALL RIGHTS RESERVED.
                        </p>
                    </div>

                    <div className="flex-2 flex flex-col items-center justify-center gap-2 md:gap-2.5 text-[9px] md:text-[10px] text-[#EFE3A0]/60 tracking-[0.15em] uppercase text-center w-full lg:w-auto order-1 lg:order-2">
                        <div className="flex flex-wrap items-center justify-center gap-x-3 md:gap-x-5 gap-y-1.5">
                            <Link href="/privacy" className="hover:text-[#d4af37] hover:tracking-[0.2em] transition-all duration-300">Privacy Policy</Link>
                            <span className="opacity-40 text-[#d4af37]">|</span>
                            <Link href="/terms" className="hover:text-[#d4af37] hover:tracking-[0.2em] transition-all duration-300">Terms & Conditions</Link>
                            <span className="hidden lg:inline opacity-40 text-[#d4af37]">|</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-x-3 md:gap-x-5 gap-y-1.5">
                            <span className="inline lg:hidden opacity-40 text-[#d4af37]">|</span>
                            <Link href="/refunds" className="hover:text-[#d4af37] hover:tracking-[0.2em] transition-all duration-300">Refunds & Cancellations</Link>
                            <span className="opacity-40 text-[#d4af37]">|</span>
                            <Link href="/contact" className="hover:text-[#d4af37] hover:tracking-[0.2em] transition-all duration-300">Contact Us</Link>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto order-2 lg:order-3">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center gap-3 px-5 pt-2 pb-2 bg-black/40 border border-[#d4af37]/20 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.05)] hover:border-[#d4af37]/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transition-all duration-500 w-[90%] sm:w-auto cursor-pointer group"
                        >
                            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 group-hover:scale-125 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                            <span className="text-[10px] md:text-[11px] font-[Cinzel] tracking-[0.15em] text-[#EFE3A0] uppercase">
                                Forged by <strong className="text-[#d4af37] font-bold group-hover:text-white transition-colors duration-300">Tech Team TECHUTOPIA</strong>
                            </span>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Aesthetic Grain Overlay - Slightly reduced opacity for cleaner blend */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </footer>
    );
}
