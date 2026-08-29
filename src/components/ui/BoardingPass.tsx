/* eslint-disable react/no-inline-styles */
'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { User, Users, MapPin, Clock, Ticket as TicketIcon } from 'lucide-react';

interface BoardingPassProps {
    ticketId: string;
    attendee: string;
    eventTitle: string;
    venue: string;
    time: string;
    poster: string;
    accessTier?: string;
    teamMembers?: string[];
}

const TIER_STYLES: Record<string, any> = {
    GA: {
        border: 'linear-gradient(135deg, #16a34a, #22c55e, #86efac, #22c55e, #16a34a, #15803d, #22c55e, #86efac)',
        sparkle: '#86efac',
        sparkleGlow: 'rgba(34,197,94,0.5)',
        stub: 'linear-gradient(135deg, #f0fdf4, #dcfce7, #bbf7d0)',
        stubBorder: 'rgba(34,197,94,0.5)',
        qrBorder: 'rgba(34,197,94,0.5)',
        badgeText: 'GENERAL PASS',
        badgeColor: '#22c55e',
        frameBorder: 'rgba(34,197,94,0.5)',
        frameShadow: 'rgba(34,197,94,0.15)',
        qrLabelColor: '#166534',
        qrSubLabelColor: '#15803d',
    },
    VIP: {
        border: 'linear-gradient(135deg, #b8860b, #daa520, #ffd700, #daa520, #b8860b, #8b6914, #daa520, #ffd700)',
        sparkle: '#ffd700',
        sparkleGlow: 'rgba(255,215,0,0.5)',
        stub: 'linear-gradient(135deg, #f8ecd2, #ebd9b2, #debe84)',
        stubBorder: 'rgba(168,130,67,0.5)',
        qrBorder: 'rgba(203,161,101,0.5)',
        badgeText: 'VVIP PASS',
        badgeColor: '#d4af37',
        frameBorder: 'rgba(212,175,55,0.5)',
        frameShadow: 'rgba(212,175,55,0.15)',
        qrLabelColor: '#5c4022',
        qrSubLabelColor: '#6b5133',
    },
    HACK_TEAM: {
        border: 'linear-gradient(135deg, #7e22ce, #9333ea, #c084fc, #9333ea, #7e22ce, #6b21a8, #9333ea, #c084fc)',
        sparkle: '#c084fc',
        sparkleGlow: 'rgba(168,85,247,0.5)',
        stub: 'linear-gradient(135deg, #faf5ff, #f3e8ff, #d8b4fe)',
        stubBorder: 'rgba(147,51,234,0.5)',
        qrBorder: 'rgba(147,51,234,0.5)',
        badgeText: 'HACK TEAM PASS',
        badgeColor: '#a855f7',
        frameBorder: 'rgba(168,85,247,0.5)',
        frameShadow: 'rgba(168,85,247,0.15)',
        qrLabelColor: '#581c87',
        qrSubLabelColor: '#6b21a8',
    },
    ALL_ACCESS: {
        border: 'linear-gradient(135deg, #9ca3af, #d1d5db, #f3f4f6, #d1d5db, #9ca3af, #6b7280, #d1d5db, #f3f4f6)',
        sparkle: '#f3f4f6',
        sparkleGlow: 'rgba(209,213,219,0.5)',
        stub: 'linear-gradient(135deg, #f9fafb, #f3f4f6, #e5e7eb)',
        stubBorder: 'rgba(156,163,175,0.5)',
        qrBorder: 'rgba(156,163,175,0.5)',
        badgeText: 'ALL PASS',
        badgeColor: '#d1d5db',
        frameBorder: 'rgba(209,213,219,0.5)',
        frameShadow: 'rgba(209,213,219,0.15)',
        qrLabelColor: '#374151',
        qrSubLabelColor: '#4b5563',
    },
    ARTIST_TEAM: {
        border: 'linear-gradient(135deg, #dc2626, #ef4444, #fca5a5, #ef4444, #dc2626, #b91c1c, #ef4444, #fca5a5)',
        sparkle: '#fca5a5',
        sparkleGlow: 'rgba(239,68,68,0.5)',
        stub: 'linear-gradient(135deg, #fef2f2, #fee2e2, #fecaca)',
        stubBorder: 'rgba(239,68,68,0.5)',
        qrBorder: 'rgba(239,68,68,0.5)',
        badgeText: 'ARTIST TEAM PASS',
        badgeColor: '#ef4444',
        frameBorder: 'rgba(239,68,68,0.5)',
        frameShadow: 'rgba(239,68,68,0.15)',
        qrLabelColor: '#7f1d1d',
        qrSubLabelColor: '#991b1b',
    },
    BACKSTAGE: {
        border: 'linear-gradient(135deg, #2563eb, #3b82f6, #93c5fd, #3b82f6, #2563eb, #1d4ed8, #3b82f6, #93c5fd)',
        sparkle: '#93c5fd',
        sparkleGlow: 'rgba(59,130,246,0.5)',
        stub: 'linear-gradient(135deg, #eff6ff, #dbeafe, #bfdbfe)',
        stubBorder: 'rgba(59,130,246,0.5)',
        qrBorder: 'rgba(59,130,246,0.5)',
        badgeText: 'BACKSTAGE PASS',
        badgeColor: '#3b82f6',
        frameBorder: 'rgba(59,130,246,0.5)',
        frameShadow: 'rgba(59,130,246,0.15)',
    }
};

const BoardingPass: React.FC<BoardingPassProps> = ({
    ticketId,
    attendee,
    eventTitle,
    venue,
    time,
    poster,
    accessTier = 'GA',
    teamMembers = [],
}) => {
    const shortId = ticketId.slice(0, 6) + '...' + ticketId.slice(-4);
    const styleObj = TIER_STYLES[accessTier] || TIER_STYLES.GA;

    const isMaanPanu = eventTitle.toLowerCase().includes('maan panu');

    const mainTitle = (eventTitle.toUpperCase().includes('LIVE')
        ? eventTitle.substring(0, eventTitle.toUpperCase().indexOf('LIVE')).trim()
        : eventTitle).toUpperCase();

    const subTitle = eventTitle.toUpperCase().includes('LIVE')
        ? eventTitle.substring(eventTitle.toUpperCase().indexOf('LIVE')).trim()
        : isMaanPanu
            ? 'LIVE CONCERT'
            : 'EVENT PASS';

    const timeParts = time.split('•');
    const datePart = (timeParts[0]?.trim() || time).toUpperCase();
    const timePart = (timeParts[1]?.trim() || '').toUpperCase();

    const displayAttendee = attendee ? attendee.toUpperCase() : '';
    const displayVenue = venue ? venue.toUpperCase() : '';

    const backTheme = isMaanPanu ? {
        bgGradient: 'radial-gradient(circle at center, rgba(139, 0, 0, 0.95) 0%, rgba(45, 0, 0, 0.98) 45%, rgba(0, 0, 0, 1) 85%)',
        borderColor: 'rgba(212, 175, 55, 0.2)',
        borderColorBright: 'rgba(212, 175, 55, 0.4)',
        borderSolidColor: '#d4af37',
        textColor: '#d4af37'
    } : {
        bgGradient: 'radial-gradient(circle at center, rgba(139, 0, 0, 0.95) 0%, rgba(45, 0, 0, 0.98) 45%, rgba(0, 0, 0, 1) 85%)',
        borderColor: 'rgba(239, 68, 68, 0.2)',
        borderColorBright: 'rgba(239, 68, 68, 0.4)',
        borderSolidColor: '#ef4444',
        textColor: '#ef4444'
    };

    // CSS keyframes for sparkle animation
    const sparkleKeyframes = `
        @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        @keyframes glow-pulse {
            0%, 100% { box-shadow: 0 0 4cqw var(--tier-glow-soft); filter: drop-shadow(0 0 2cqw var(--tier-glow-vivid)); }
            50% { box-shadow: 0 0 8cqw var(--tier-glow-soft); filter: drop-shadow(0 0 4cqw var(--tier-glow-vivid)); }
        }
    `;

    return (
        <div className="w-full flex flex-col items-center justify-center gap-6" style={{ containerType: 'inline-size' }}>
            <style dangerouslySetInnerHTML={{ __html: sparkleKeyframes }} />

            {/* ================= FRONT SIDE ================= */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full max-w-[1200px] overflow-hidden bg-[#0c0702] group select-none"
                style={{
                    aspectRatio: '2.5 / 1',
                    borderRadius: '1.2cqw',
                    WebkitMaskImage:
                        'radial-gradient(circle at 0px 50%, transparent 1.6cqw, black 1.7cqw), radial-gradient(circle at 100% 50%, transparent 1.6cqw, black 1.7cqw), linear-gradient(black, black)',
                    WebkitMaskSize: '3.2cqw 3.2cqw, 3.2cqw 3.2cqw, calc(100% - 3.2cqw) 100%',
                    WebkitMaskPosition: '-1.6cqw center, calc(100% + 1.6cqw) center, center',
                    WebkitMaskRepeat: 'repeat-y, repeat-y, no-repeat',
                }}
            >
                <div className="absolute inset-0 z-1 pointer-events-none"
                    style={{
                        backgroundImage: styleObj.border,
                        backgroundSize: '300% 300%',
                        animation: 'shimmer 4s linear infinite',
                    }}
                />
                {/* Golden sparkle dots along border */}
                {Array.from({ length: 40 }).map((_, i) => {
                    const side = i % 4;
                    const pos = ((i / 4) * 25 + Math.random() * 10) % 100;
                    const style: React.CSSProperties = {
                        position: 'absolute',
                        width: `${0.3 + Math.random() * 0.5}cqw`,
                        height: `${0.3 + Math.random() * 0.5}cqw`,
                        borderRadius: '50%',
                        background: styleObj.sparkle,
                        boxShadow: `0 0 0.4cqw ${styleObj.sparkle}, 0 0 0.8cqw ${styleObj.sparkleGlow}`,
                        animation: `sparkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite`,
                        zIndex: 2,
                    };
                    if (side === 0) { style.top = '0'; style.left = `${pos}%`; }
                    else if (side === 1) { style.bottom = '0'; style.left = `${pos}%`; }
                    else if (side === 2) { style.left = '0'; style.top = `${pos}%`; }
                    else { style.right = '0'; style.top = `${pos}%`; }
                    return <div key={`sp-${i}`} style={style} />;
                })}

                {/* INNER DARK AREA (inset from golden border) */}
                <div className="absolute z-3"
                    style={{
                        top: '1.2cqw',
                        left: '1.2cqw',
                        right: '1.2cqw',
                        bottom: '1.2cqw',
                        borderRadius: '0.6cqw',
                        background: '#0c0702',
                        overflow: 'hidden',
                    }}
                >
                    {isMaanPanu ? (
                        <>
                            {/* BACKGROUND POSTER (center area) */}
                            <div className="absolute inset-0 overflow-hidden">
                                <img
                                    src={poster}
                                    alt={eventTitle}
                                    className="absolute inset-0 w-full h-full object-cover object-[15%_40%] opacity-80 transition-transform duration-1000 group-hover:scale-105"
                                />
                                {/* Gradient overlays to fade poster edges smoothly */}
                                <div className="absolute inset-0 bg-linear-to-r from-[#0c0702] via-transparent to-transparent" style={{ width: '35%' }} />
                                <div className="absolute top-0 h-full bg-linear-to-l from-[#0c0702] to-transparent" style={{ left: '80%', width: '20%' }} />
                                <div className="absolute inset-0 bg-linear-to-b from-[#0c0702]/80 via-transparent to-[#0c0702]/80" />
                            </div>

                            {/* Event title watermark behind poster */}
                            <div className="absolute bottom-[5%] left-[24%] w-[52%] flex flex-col items-center justify-center z-4 pointer-events-none">
                                <h1
                                    className="font-[Cinzel] font-black uppercase whitespace-nowrap text-transparent bg-clip-text"
                                    style={{
                                        fontSize: '6cqw',
                                        backgroundImage: 'linear-gradient(to bottom, #ffd700, #b8860b)',
                                        opacity: 0.9,
                                        textShadow: '0 0 3cqw rgba(255,215,0,0.3)',
                                        letterSpacing: '0.08em',
                                        lineHeight: 1,
                                    }}
                                >
                                    {mainTitle}
                                </h1>
                                {isMaanPanu && (
                                    <p className="font-[Cinzel] font-bold uppercase tracking-[0.2em]"
                                        style={{
                                            fontSize: '1.6cqw',
                                            color: '#e3cf9d',
                                            textShadow: '0 0.1cqw 0.5cqw rgba(0,0,0,0.8)',
                                        }}
                                    >
                                        LIVE CONCERT
                                    </p>
                                )}
                            </div>

                            {/* INNER GOLDEN FRAME LINE */}
                            <div className="absolute z-10 pointer-events-none"
                                style={{
                                    top: '1cqw',
                                    left: '1cqw',
                                    right: '1cqw',
                                    bottom: '1cqw',
                                    border: `0.15cqw solid ${styleObj.frameBorder}`,
                                    borderRadius: '0.4cqw',
                                    boxShadow: `inset 0 0 1.5cqw ${styleObj.frameShadow}`,
                                }}
                            >
                                {/* Corner diamonds */}
                                <div className="absolute -top-[0.3cqw] -left-[0.3cqw] w-[0.6cqw] h-[0.6cqw] border-[0.12cqw] bg-[#0c0702] rotate-45" style={{ borderColor: styleObj.badgeColor }} />
                                <div className="absolute -top-[0.3cqw] -right-[0.3cqw] w-[0.6cqw] h-[0.6cqw] border-[0.12cqw] bg-[#0c0702] rotate-45" style={{ borderColor: styleObj.badgeColor }} />
                                <div className="absolute -bottom-[0.3cqw] -left-[0.3cqw] w-[0.6cqw] h-[0.6cqw] border-[0.12cqw] bg-[#0c0702] rotate-45" style={{ borderColor: styleObj.badgeColor }} />
                                <div className="absolute -bottom-[0.3cqw] -right-[0.3cqw] w-[0.6cqw] h-[0.6cqw] border-[0.12cqw] bg-[#0c0702] rotate-45" style={{ borderColor: styleObj.badgeColor }} />
                            </div>

                            {/* TOP LOGOS OVER POSTER */}
                            <div className="absolute top-[6%] left-[24%] z-15 pointer-events-none flex items-center justify-between w-[52%] px-[1.5cqw]">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <img src="/logo.png" alt="TECHUTOPIA" style={{ height: '3.5cqw', objectFit: 'contain', filter: 'drop-shadow(0 0.2cqw 0.6cqw rgba(0,0,0,0.8))' }} />
                                    <span style={{ fontSize: '1.2cqw', fontWeight: 900, color: '#fff', letterSpacing: '0.15cqw', textTransform: 'uppercase' as const, fontFamily: 'Georgia, serif', textShadow: '0 0.1cqw 0.3cqw rgba(0,0,0,0.9)', marginTop: '0.2cqw' }}>TECHUTOPIA</span>
                                </div>
                                <img src="/events/UEM_Logo.webp" alt="UEM" style={{ height: '5cqw', objectFit: 'contain', filter: 'drop-shadow(0 0.2cqw 0.6cqw rgba(0,0,0,0.8))' }} />
                            </div>

                            {/* ========== LEFT SECTION: BEIGE QR STUB ========== */}
                            <div className="absolute z-20 flex flex-col items-center justify-between"
                                style={{
                                    top: '6%',
                                    left: '2%',
                                    width: '20%',
                                    height: '88%',
                                    background: styleObj.stub,
                                    borderRadius: '2cqw',
                                    padding: '1.2cqw',
                                    boxShadow: '0 0.8cqw 3cqw rgba(0,0,0,0.7)',
                                    border: `0.08cqw solid ${styleObj.stubBorder}`,
                                }}
                            >
                                {/* Inner decorative border */}
                                <div className="absolute pointer-events-none"
                                    style={{
                                        top: '0.5cqw',
                                        left: '0.5cqw',
                                        right: '0.5cqw',
                                        bottom: '0.5cqw',
                                        border: `0.08cqw solid ${styleObj.stubBorder}`,
                                        borderRadius: '1.6cqw',
                                    }}
                                />

                                {/* QR Code */}
                                <div className="relative z-10 flex items-center justify-center bg-white"
                                    style={{
                                        width: '82%',
                                        aspectRatio: '1',
                                        borderRadius: '0.8cqw',
                                        padding: '3%',
                                        marginTop: '0.8cqw',
                                        boxShadow: 'inset 0 0 1cqw rgba(0,0,0,0.08)',
                                        border: `0.15cqw solid ${styleObj.qrBorder}`,
                                    }}
                                >
                                    <QRCodeSVG
                                        value={ticketId}
                                        size={512}
                                        level="H"
                                        className="w-[95%] h-[95%]"
                                        bgColor="#ffffff"
                                        fgColor="#1a0f05"
                                    />
                                </div>

                                {/* Label area */}
                                <div className="flex flex-col items-center w-full relative z-10 flex-1 justify-center"
                                    style={{ marginTop: '0.8cqw' }}
                                >
                                    <h4 className="font-[Cinzel] font-black whitespace-nowrap text-[#5c4022]"
                                        style={{ fontSize: '1.3cqw', letterSpacing: '0.08em' }}
                                    >
                                        SCAN TO VERIFY
                                    </h4>
                                    <p className="font-data font-bold text-[#6b5133]"
                                        style={{ fontSize: '1.2cqw', letterSpacing: '0.05em', marginTop: '0.3cqw' }}
                                    >
                                        FT...{shortId}
                                    </p>
                                    {/* Diamond Separator */}
                                    <div className="w-full flex items-center justify-center"
                                        style={{ margin: '0.4cqw 0' }}
                                    >
                                        <div style={{ height: '0.08cqw', width: '15%', background: styleObj.stubBorder }} />
                                        <span className="text-[#5c4022]" style={{ fontSize: '0.9cqw', padding: '0 0.5cqw', lineHeight: 1 }}>❖</span>
                                        <div style={{ height: '0.08cqw', width: '15%', background: styleObj.stubBorder }} />
                                    </div>
                                </div>

                                {/* Tear dashed line */}
                                <div className="w-[90%] relative z-10"
                                    style={{ borderTop: `0.18cqw dashed ${styleObj.stubBorder}`, marginBottom: '0.8cqw' }}
                                />

                                {/* MT Date Code */}
                                <div className="w-full text-center relative z-10" style={{ padding: '0 0.8cqw' }}>
                                    <p className="font-data font-bold text-[#3b2512]"
                                        style={{
                                            fontSize: '1.5cqw',
                                            padding: '0.4cqw 0',
                                            borderRadius: '0.3cqw',
                                        }}
                                    >
                                        MT-2026-XQ
                                    </p>
                                </div>
                            </div>

                            {/* ========== RIGHT SECTION: DETAILS PANEL ========== */}
                            <div className="absolute z-20 flex flex-col"
                                style={{
                                    right: '2%',
                                    top: '6%',
                                    width: '20%',
                                    height: '88%',
                                }}
                            >
                                {/* Golden glitter background for right panel */}
                                <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: '1cqw' }}>
                                    <div className="absolute inset-0"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(12,7,2,1), rgba(30,20,5,0.98), rgba(12,7,2,1))',
                                        }}
                                    />
                                    {/* Golden shimmer edge on left side */}
                                    <div className="absolute top-0 left-0 w-[2%] h-full"
                                        style={{
                                            background: `linear-gradient(to bottom, transparent, ${styleObj.sparkleGlow}, transparent)`,
                                        }}
                                    />
                                    {/* Sparkle particles in the background */}
                                    {Array.from({ length: 25 }).map((_, i) => (
                                        <div key={`rsp-${i}`}
                                            style={{
                                                position: 'absolute',
                                                width: `${0.15 + Math.random() * 0.3}cqw`,
                                                height: `${0.15 + Math.random() * 0.3}cqw`,
                                                borderRadius: '50%',
                                                background: styleObj.sparkle,
                                                opacity: 0.15 + Math.random() * 0.25,
                                                left: `${5 + Math.random() * 90}%`,
                                                top: `${5 + Math.random() * 90}%`,
                                                animation: `sparkle ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
                                                boxShadow: `0 0 0.3cqw ${styleObj.sparkleGlow}`,
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex flex-col h-full" style={{ padding: '1.2cqw 1.8cqw' }}>
                                    {/* PASS TYPE HEADING */}
                                    <div className="flex items-center" style={{ gap: '0.6cqw', marginBottom: '1.2cqw', borderBottom: `0.1cqw solid ${styleObj.badgeColor}44`, paddingBottom: '0.8cqw' }}>
                                        <TicketIcon strokeWidth={2.5} style={{ width: '1.8cqw', height: '1.8cqw', color: styleObj.badgeColor }} />
                                        <h2 className="font-[Cinzel] font-black uppercase truncate"
                                            style={{ fontSize: '1.4cqw', color: styleObj.badgeColor, letterSpacing: '0.15em' }}
                                        >
                                            {styleObj.badgeText}
                                        </h2>
                                    </div>

                                    {/* Title (for non-Maan Panu) */}
                                    {!isMaanPanu && (
                                        <div style={{ marginBottom: '1cqw' }}>
                                            <h2 className="font-[Cinzel] font-black uppercase truncate"
                                                style={{
                                                    fontSize: '2cqw',
                                                    lineHeight: 1.1,
                                                    color: '#fdf6e3',
                                                    textShadow: '0 0.2cqw 0.6cqw rgba(0,0,0,0.8)',
                                                }}
                                            >
                                                {mainTitle}
                                            </h2>
                                            {subTitle && (
                                                <h3 className="font-[Cinzel] font-bold uppercase truncate"
                                                    style={{
                                                        fontSize: '1cqw',
                                                        color: '#e3cf9d',
                                                        letterSpacing: '0.1em',
                                                        marginTop: '0.2cqw',
                                                        textShadow: '0 0.1cqw 0.3cqw rgba(0,0,0,0.8)',
                                                    }}
                                                >
                                                    {subTitle}
                                                </h3>
                                            )}
                                        </div>
                                    )}

                                    {/* INFO GRID - Using space-between to fill vertical area */}
                                    <div className="flex flex-col flex-1 justify-between" style={{ paddingBottom: '1cqw' }}>
                                        {/* ATTENDEE */}
                                        <div className="flex items-start" style={{ gap: '0.6cqw' }}>
                                            <User style={{ width: '1.8cqw', height: '1.8cqw', color: '#d4af37', marginTop: '0.1cqw', flexShrink: 0 }} strokeWidth={2.5} />
                                            <div style={{ borderBottom: `0.08cqw solid rgba(212,175,55,0.2)`, paddingBottom: '0.4cqw', width: '90%' }}>
                                                <p className="font-[Cinzel] font-bold uppercase"
                                                    style={{ fontSize: '0.8cqw', color: '#d4af37', letterSpacing: '0.12em', lineHeight: '1.2' }}
                                                >
                                                    ATTENDEE
                                                </p>
                                                <p className="font-[Cinzel] font-black leading-none"
                                                    style={{ fontSize: '1.5cqw', color: 'white', marginTop: '0.1cqw', lineHeight: '1.2' }}
                                                >
                                                    {displayAttendee}
                                                </p>
                                            </div>
                                        </div>

                                        {/* VENUE */}
                                        <div className="flex items-start" style={{ gap: '0.6cqw' }}>
                                            <MapPin style={{ width: '1.8cqw', height: '1.8cqw', color: '#d4af37', marginTop: '0.1cqw', flexShrink: 0 }} strokeWidth={2.5} />
                                            <div style={{ borderBottom: `0.08cqw solid rgba(212,175,55,0.2)`, paddingBottom: '0.4cqw', width: '90%' }}>
                                                <p className="font-[Cinzel] font-bold uppercase"
                                                    style={{ fontSize: '0.8cqw', color: '#d4af37', letterSpacing: '0.12em', lineHeight: '1.2' }}
                                                >
                                                    VENUE
                                                </p>
                                                <p className="font-[Cinzel] font-black"
                                                    style={{ fontSize: '1.4cqw', color: 'white', marginTop: '0.1cqw', lineHeight: '1.2' }}
                                                >
                                                    {displayVenue}
                                                </p>
                                            </div>
                                        </div>

                                        {/* TEAM MEMBERS (Conditional) */}
                                        {teamMembers && teamMembers.length > 0 && (
                                            <div className="flex items-start" style={{ gap: '0.6cqw' }}>
                                                <Users style={{ width: '1.8cqw', height: '1.8cqw', color: '#d4af37', marginTop: '0.1cqw', flexShrink: 0 }} strokeWidth={2.5} />
                                                <div style={{ borderBottom: `0.08cqw solid rgba(212,175,55,0.2)`, paddingBottom: '0.4cqw', width: '90%' }}>
                                                    <p className="font-[Cinzel] font-bold uppercase"
                                                        style={{ fontSize: '0.8cqw', color: '#d4af37', letterSpacing: '0.12em', lineHeight: '1.2' }}
                                                    >
                                                        TEAM
                                                    </p>
                                                    <p className="font-[Cinzel] font-black truncate max-w-full"
                                                        style={{ fontSize: '1cqw', color: 'white', marginTop: '0.1cqw', lineHeight: '1.2' }}
                                                    >
                                                        {teamMembers.join(', ')}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* SCHEDULE */}
                                        <div className="flex items-start" style={{ gap: '0.6cqw' }}>
                                            <Clock style={{ width: '1.8cqw', height: '1.8cqw', color: '#d4af37', marginTop: '0.1cqw', flexShrink: 0 }} strokeWidth={2.5} />
                                            <div style={{ width: '90%' }}>
                                                <p className="font-[Cinzel] font-bold uppercase"
                                                    style={{ fontSize: '0.8cqw', color: '#d4af37', letterSpacing: '0.12em', lineHeight: '1.2' }}
                                                >
                                                    SCHEDULE
                                                </p>
                                                <p className="font-data font-black"
                                                    style={{ fontSize: '1.4cqw', color: 'white', marginTop: '0.1cqw', lineHeight: '1.2', whiteSpace: 'nowrap' }}
                                                >
                                                    {datePart}
                                                </p>
                                                {timePart && (
                                                    <p className="font-data italic"
                                                        style={{ fontSize: '1.1cqw', color: 'rgba(255,255,255,0.7)', marginTop: '0.1cqw', lineHeight: '1.2' }}
                                                    >
                                                        • {timePart}
                                                    </p>
                                                )}
                                                {/* T&C NOTE */}
                                                <p className="font-[Cinzel] font-bold uppercase italic"
                                                    style={{ fontSize: '0.7cqw', color: '#8b8680', marginTop: '0.6cqw', letterSpacing: '0.05em', lineHeight: '1.2' }}
                                                >
                                                    Terms and conditions are on backside
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BOTTOM BADGES */}
                                    <div className="flex items-center justify-center border-t pt-[0.8cqw]" style={{ gap: '0.6cqw', borderColor: 'rgba(212,175,55,0.1)' }}>
                                        <span className="font-data font-medium"
                                            style={{
                                                fontSize: '0.8cqw',
                                                color: '#a09476',
                                                border: '0.06cqw solid rgba(160,148,118,0.3)',
                                                padding: '0.15cqw 0.4cqw',
                                                background: 'rgba(0,0,0,0.4)',
                                            }}
                                        >
                                            MT-2026-XQ
                                        </span>
                                        <div className="inline-flex items-center justify-center" style={{
                                            padding: '0.2cqw 0.5cqw',
                                            border: '0.06cqw solid #16a34a',
                                            background: 'rgba(20,83,45,0.4)',
                                            borderRadius: '0.2cqw',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            <span className="font-data font-bold uppercase"
                                                style={{
                                                    fontSize: '0.75cqw',
                                                    color: '#22c55e',
                                                    letterSpacing: '0.1em',
                                                    lineHeight: 'normal',
                                                }}
                                            >
                                                VERIFIED
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* ================= NEW DARK GLOW DESIGN FOR OTHER EVENTS ================= */}
                            <div className="absolute inset-0 overflow-hidden" style={{ background: '#1c1c1f' }}>
                                {/* Soft glow overlay */}
                                <div className="absolute inset-0"
                                    style={{
                                        background: `radial-gradient(circle at center, rgba(40,40,45,1) 0%, rgba(20,20,22,1) 100%)`,
                                    }}
                                />
                                {/* Bottom right gradient accent */}
                                <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[6cqw]"
                                    style={{ background: 'rgba(212,175,55,0.08)' }}
                                />
                            </div>

                            {/* Outer container for the black card with glowing border */}
                            <div className="absolute z-10 flex items-center justify-center p-[2cqw]"
                                style={{ inset: 0 }}
                            >
                                <div className="w-full h-full relative"
                                    style={{
                                        background: '#111214',
                                        borderRadius: '2cqw',
                                        boxShadow: `0 0 0 0.15cqw ${styleObj.badgeColor || '#d4af37'}, 0 0.5cqw 2cqw rgba(0,0,0,0.8), inset 0 0 2cqw rgba(0,0,0,0.5)`,
                                    }}
                                >
                                    {/* Vertical dashed separator */}
                                    <div className="absolute top-[10%] bottom-[10%] left-[55%] pointer-events-none"
                                        style={{ borderLeft: `0.15cqw dashed rgba(212,175,55,0.3)` }}
                                    />

                                    {/* Left and Right Notches (simulating a ticket) */}
                                    <div className="absolute top-1/2 -ml-[1cqw] -mt-[1cqw] w-[2cqw] h-[2cqw] rounded-full"
                                        style={{
                                            left: 0,
                                            background: '#1c1c1f',
                                            boxShadow: `inset -0.15cqw 0 0 ${styleObj.badgeColor || '#d4af37'}`,
                                        }}
                                    />
                                    <div className="absolute top-1/2 -mr-[1cqw] -mt-[1cqw] w-[2cqw] h-[2cqw] rounded-full"
                                        style={{
                                            right: 0,
                                            background: '#1c1c1f',
                                            boxShadow: `inset 0.15cqw 0 0 ${styleObj.badgeColor || '#d4af37'}`,
                                        }}
                                    />

                                    <div className="flex w-full h-full">
                                        {/* LEFT SECTION: DETAILS */}
                                        <div className="flex-[0.55] p-[3cqw] flex flex-col justify-center relative">
                                            {/* Subtitle / Pass Type */}
                                            <h3 className="font-[Cinzel] font-black uppercase text-[#e1b764]"
                                                style={{ fontSize: '1.2cqw', letterSpacing: '0.1em', marginBottom: '0.5cqw' }}
                                            >
                                                {styleObj.badgeText || "OFFICIAL ENTRY PASS"}
                                            </h3>

                                            {/* Main Title */}
                                            <h2 className="font-[Cinzel] font-black uppercase truncate"
                                                style={{
                                                    fontSize: '2.8cqw',
                                                    color: '#f8f8f8',
                                                    lineHeight: '1.1',
                                                    marginBottom: '2cqw',
                                                    textShadow: '0 0.2cqw 1cqw rgba(255,255,255,0.2)'
                                                }}
                                            >
                                                {eventTitle}
                                            </h2>

                                            {/* Grid Details */}
                                            <div className="grid grid-cols-2 gap-[1.5cqw]">
                                                {/* ATTENDEE */}
                                                <div>
                                                    <div className="flex items-center gap-[0.5cqw] mb-[0.2cqw]">
                                                        <User size={12} className="text-[#a0824b]" strokeWidth={2.5} />
                                                        <span className="font-sans font-semibold text-[#a0824b] text-[0.8cqw] tracking-widest uppercase">ATTENDEE</span>
                                                    </div>
                                                    <p className="font-[Cinzel] font-bold text-white text-[1.4cqw] uppercase truncate w-[95%]">{attendee}</p>
                                                </div>

                                                {/* VENUE */}
                                                <div>
                                                    <div className="flex items-center gap-[0.5cqw] mb-[0.2cqw]">
                                                        <MapPin size={12} className="text-[#a0824b]" strokeWidth={2.5} />
                                                        <span className="font-sans font-semibold text-[#a0824b] text-[0.8cqw] tracking-widest uppercase">VENUE</span>
                                                    </div>
                                                    <p className="font-[Cinzel] font-bold text-white text-[1.4cqw] uppercase truncate w-[95%]">{venue}</p>
                                                </div>

                                                {/* TEAM MEMBERS */}
                                                {teamMembers && teamMembers.length > 0 && (
                                                    <div>
                                                        <div className="flex items-center gap-[0.5cqw] mb-[0.2cqw]">
                                                            <Users size={12} className="text-[#a0824b]" strokeWidth={2.5} />
                                                            <span className="font-sans font-semibold text-[#a0824b] text-[0.8cqw] tracking-widest uppercase">TEAM</span>
                                                        </div>
                                                        <p className="font-[Cinzel] font-bold text-white text-[1cqw] uppercase truncate w-[95%]">{teamMembers.join(', ')}</p>
                                                    </div>
                                                )}

                                                {/* SCHEDULE */}
                                                <div className="mt-[1cqw]">
                                                    <div className="flex items-center gap-[0.5cqw] mb-[0.2cqw]">
                                                        <Clock size={12} className="text-[#a0824b]" strokeWidth={2.5} />
                                                        <span className="font-sans font-semibold text-[#a0824b] text-[0.8cqw] tracking-widest uppercase">SCHEDULE</span>
                                                    </div>
                                                    <p className="font-[Cinzel] font-bold text-white text-[1.4cqw] uppercase">{datePart.toUpperCase()}</p>
                                                </div>

                                                {/* PASS STATUS */}
                                                <div className="mt-[1cqw]">
                                                    <div className="flex items-center gap-[0.5cqw] mb-[0.4cqw]">
                                                        <span className="font-sans font-semibold text-[#a0824b] text-[0.8cqw] tracking-widest uppercase">PASS STATUS</span>
                                                    </div>
                                                    <div className="inline-block border-[0.1cqw] border-[#22c55e] bg-[#14532d] px-[0.8cqw] py-[0.2cqw] rounded-[0.4cqw]">
                                                        <span className="font-sans font-bold text-[#4ade80] text-[0.9cqw] tracking-widest uppercase">VERIFIED</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* RIGHT SECTION: QR CODE */}
                                        <div className="flex-[0.45] flex flex-col items-center justify-center p-[2cqw] relative">
                                            <div className="bg-white p-[1.5cqw] rounded-[1cqw] shadow-[0_0_2cqw_rgba(255,255,255,0.1)] relative">
                                                {/* Corner markers on QR container similar to image */}
                                                <div className="absolute top-0 left-0 w-full h-full border-[0.1cqw] border-[#111214] opacity-10 pointer-events-none rounded-[1cqw]" />
                                                <QRCodeSVG
                                                    value={ticketId}
                                                    size={512}
                                                    level="H"
                                                    className="w-[14cqw] h-[14cqw]"
                                                    bgColor="#ffffff"
                                                    fgColor="#111214"
                                                />
                                            </div>
                                            <div className="mt-[1.5cqw] text-center">
                                                <p className="font-[Cinzel] font-black italic text-[#e1b764] text-[1.2cqw] tracking-[0.2em] uppercase flex items-center justify-center">
                                                    SCAN TO VERIFY <span className="ml-[0.5cqw] text-[1.5cqw]">➔</span>
                                                </p>
                                                <p className="font-mono text-gray-500 text-[0.8cqw] mt-[0.5cqw] text-center">
                                                    {ticketId.slice(0, 8)}...{ticketId.slice(-8)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </motion.div>

            {/* ================= BACK SIDE ================= */}
            <div
                className="relative w-full max-w-[1200px] overflow-hidden bg-black select-none"
                style={{
                    aspectRatio: '2.5 / 1',
                    borderRadius: '1.2cqw',
                    WebkitMaskImage:
                        'radial-gradient(circle at 0px 50%, transparent 1.6cqw, black 1.7cqw), radial-gradient(circle at 100% 50%, transparent 1.6cqw, black 1.7cqw), linear-gradient(black, black)',
                    WebkitMaskSize: '3.2cqw 3.2cqw, 3.2cqw 3.2cqw, calc(100% - 3.2cqw) 100%',
                    WebkitMaskPosition: '-1.6cqw center, calc(100% + 1.6cqw) center, center',
                    WebkitMaskRepeat: 'repeat-y, repeat-y, no-repeat',
                    animation: 'glow-pulse 2.5s infinite ease-in-out',
                    // @ts-ignore
                    '--tier-glow-soft': styleObj.badgeColor + '66',
                    // @ts-ignore
                    '--tier-glow-vivid': styleObj.badgeColor + '99'
                } as React.CSSProperties}
            >
                <div className="absolute inset-0 z-1 pointer-events-none"
                    style={{
                        backgroundImage: styleObj.border,
                        backgroundSize: '300% 300%',
                        animation: 'shimmer 2.5s linear infinite',
                    }}
                />

                {/* Pulsing particles for tier-specific effect */}
                {Array.from({ length: 40 }).map((_, i) => (
                    <div key={`bp-tier-sp-${i}`}
                        style={{
                            position: 'absolute',
                            width: `${0.1 + Math.random() * 0.5}cqw`,
                            height: `${0.1 + Math.random() * 0.5}cqw`,
                            borderRadius: '50%',
                            background: styleObj.sparkle,
                            boxShadow: `0 0 0.8cqw ${styleObj.sparkle}`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `sparkle ${1.5 + Math.random() * 2}s ease-in-out ${Math.random() * 2}s infinite`,
                            zIndex: 2,
                            opacity: 0.8,
                        }}
                    />
                ))}

                {/* INNER BLOODY RED AREA (Back side) - No backdrop filter */}
                <div className="absolute z-3"
                    style={{
                        top: '1.2cqw',
                        left: '1.2cqw',
                        right: '1.2cqw',
                        bottom: '1.2cqw',
                        borderRadius: '0.6cqw',
                        background: backTheme.bgGradient,
                        overflow: 'hidden',
                        padding: '2.5cqw 4cqw',
                        border: `0.15cqw solid ${backTheme.borderColor}`,
                    }}
                >
                    <div className="relative z-10 w-full h-full flex flex-col text-white">
                        <div className="flex items-center justify-between border-b" style={{ borderColor: backTheme.borderColor, paddingBottom: '1.2cqw', marginBottom: '1.2cqw' }}>
                            {/* Left Side: TECHUTOPIA Logo + Event Name */}
                            <div className="flex flex-col items-start gap-1" style={{ width: '15cqw' }}>
                                <div className="flex flex-col items-center">
                                    <img src="/logo.png" alt="TECHUTOPIA logo" style={{ height: '3.5cqw', width: 'auto', objectFit: 'contain' }} />
                                    <span className="font-[Cinzel] font-bold uppercase tracking-wider text-[#ffffff]" style={{ fontSize: '0.85cqw' }}>TECHUTOPIA 2026</span>
                                </div>
                            </div>

                            <div className="flex-1 text-center">
                                <h2 className="font-[Cinzel] font-black uppercase" style={{ color: backTheme.textColor, fontSize: '2.4cqw', letterSpacing: '0.05em' }}>TERMS & CONDITIONS</h2>
                            </div>

                            {/* Right Side: UEM Logo */}
                            <div className="flex items-center justify-end" style={{ width: '15cqw' }}>
                                <img src="/events/UEM_Logo.webp" alt="UEM logo" style={{ height: '4.5cqw', width: 'auto', objectFit: 'contain' }} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 flex-1" style={{ gap: '3cqw' }}>
                            {/* Left Column */}
                            <div className="flex flex-col justify-between" style={{ gap: '1cqw' }}>
                                <div>
                                    <h3 className="font-[Cinzel] font-bold uppercase mb-1" style={{ color: backTheme.textColor, fontSize: '1.1cqw' }}>1. Identification & Entry</h3>
                                    <p className="font-data text-stone-200 leading-snug" style={{ fontSize: '0.9cqw' }}>
                                        Carry your physical ID card (Aadhar/Driving Licence) at all times. Entry pass is mandatory; verification will be conducted at the gate. Re-entry is not allowed.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-[Cinzel] font-bold uppercase mb-1" style={{ color: backTheme.textColor, fontSize: '1.1cqw' }}>2. Prohibited Substances</h3>
                                    <p className="font-data text-stone-200 leading-snug" style={{ fontSize: '0.9cqw' }}>
                                        Alcohol, intoxicants, and banned substances are strictly prohibited. Security may use breath analyzers. Violators face strict disciplinary action.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-[Cinzel] font-bold uppercase mb-1" style={{ color: backTheme.textColor, fontSize: '1.1cqw' }}>3. Important Timings</h3>
                                    <p className="font-data text-stone-200 leading-snug" style={{ fontSize: '0.9cqw' }}>
                                        Gate Closing Time: 07:30 PM, 15 March 2026. Please ensure you arrive well before the deadline for smooth processing.
                                    </p>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col justify-between" style={{ gap: '1cqw' }}>
                                <div>
                                    <h3 className="font-[Cinzel] font-bold uppercase mb-1" style={{ color: backTheme.textColor, fontSize: '1.1cqw' }}>4. Concert Rules (15th March)</h3>
                                    <p className="font-data text-stone-200 leading-snug" style={{ fontSize: '0.9cqw' }}>
                                        Water bottles, cold drinks, bags, food, and other prohibited items are NOT allowed inside the Sabrang Ground during the concert.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-[Cinzel] font-bold uppercase mb-1" style={{ color: backTheme.textColor, fontSize: '1.1cqw' }}>5. Conduct & Misbehavior</h3>
                                    <p className="font-data text-stone-200 leading-snug" style={{ fontSize: '0.9cqw' }}>
                                        Nuisance, misbehavior, or misconduct will lead to immediate expulsion and strict disciplinary action by the institute.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-[Cinzel] font-bold uppercase mb-1" style={{ color: backTheme.textColor, fontSize: '1.1cqw' }}>6. Property Damage</h3>
                                    <p className="font-data text-stone-200 leading-snug" style={{ fontSize: '0.9cqw' }}>
                                        Damage to institute property will not be tolerated and will invite strict financial and disciplinary penalties.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer / Contact */}
                        <div className="mt-auto flex items-center justify-between text-stone-400 font-data border-t" style={{ borderColor: backTheme.borderColor, paddingTop: '1cqw', fontSize: '0.8cqw' }}>
                            <span>Need Help? Contact the Organizing Committee at techutopia@uem.edu.in</span>
                        </div>
                    </div>

                    {/* INNER RED FRAME LINE */}
                    <div className="absolute z-10 pointer-events-none"
                        style={{
                            top: '1cqw',
                            left: '1cqw',
                            right: '1cqw',
                            bottom: '1cqw',
                            border: `0.15cqw solid ${backTheme.borderColorBright}`,
                            borderRadius: '0.4cqw',
                        }}
                    >
                        {/* Corner diamonds */}
                        <div className="absolute -top-[0.3cqw] -left-[0.3cqw] w-[0.6cqw] h-[0.6cqw] border-[0.12cqw] bg-[#0c0702] rotate-45" style={{ borderColor: backTheme.borderSolidColor }} />
                        <div className="absolute -top-[0.3cqw] -right-[0.3cqw] w-[0.6cqw] h-[0.6cqw] border-[0.12cqw] bg-[#0c0702] rotate-45" style={{ borderColor: backTheme.borderSolidColor }} />
                        <div className="absolute -bottom-[0.3cqw] -left-[0.3cqw] w-[0.6cqw] h-[0.6cqw] border-[0.12cqw] bg-[#0c0702] rotate-45" style={{ borderColor: backTheme.borderSolidColor }} />
                        <div className="absolute -bottom-[0.3cqw] -right-[0.3cqw] w-[0.6cqw] h-[0.6cqw] border-[0.12cqw] bg-[#0c0702] rotate-45" style={{ borderColor: backTheme.borderSolidColor }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardingPass;
