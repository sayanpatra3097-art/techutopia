'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const SPONSORS = [
    { name: "Commudle", src: "/partners/Commudle - Ecosystem Partner.webp" },
    { name: "DMV Core Tech", src: "/partners/DMV Core Tech - Internship Partner.png" },
    { name: "Genesis", src: "/partners/Genesis Logo Vertical.png" },
    { name: "HeLa Labs", src: "/partners/HeLa Labs - Track sponsor.png" },
    { name: "Mangalam Waters", src: "/partners/Mangalam Waters - Hydration Partner.jpeg" },
    { name: "TruScholar", src: "/partners/TruScholar - Credential Partner.png" },
    { name: "Balsamiq", src: "/partners/balsamiq-logo.webp" },
    { name: "Belgian Waffle", src: "/partners/belgian_waffle.png" },
    { name: "Blockpen", src: "/partners/blockpen-logo.webp" },
    { name: "CodeChef", src: "/partners/codechef.png" },
    { name: "Coding Ninjas", src: "/partners/coding-ninjas.webp" },
    { name: "Dev Station", src: "/partners/dev-station.webp" },
    { name: "Devarmy", src: "/partners/devarmy.webp" },
    { name: "Devfolio", src: "/partners/devfolio-logo.webp" },
    { name: "Ention", src: "/partners/ention-logo.webp" },
    { name: "EthIndia", src: "/partners/ethindia-logo.webp" },
    { name: "Fluxor", src: "/partners/fluxor-logo.webp" },
    { name: "GDG", src: "/partners/gdg.webp" },
    { name: "GeeksForGeeks Camus", src: "/partners/geeksforgeeks-Camus.png" },
    { name: "GeeksForGeeks", src: "/partners/geeksforgeeks-logo.webp" },
    { name: "Interview Buddy", src: "/partners/interview_buddy.png" },
    { name: "Microsoft Learn Community", src: "/partners/microsoft_learn_community.png" },
    { name: "CubeTech", src: "/partners/ws.cubetech-logo.webp" }
];

type HackathonEvent = {
    title: string;
    start: Date;
    end?: Date;
    dateLabel: string;
    timeLabel: string;
};

// Year assumed as 2026 based on previous HACKATHON_DATE
const SCHEDULE: HackathonEvent[] = [
    { title: "Check-in + Registration", start: new Date('2026-03-13T08:00:00+05:30'), end: new Date('2026-03-13T12:00:00+05:30'), dateLabel: "13 March", timeLabel: "8:00 – 12:00" },
    { title: "Inauguration Ceremony", start: new Date('2026-03-13T12:30:00+05:30'), end: new Date('2026-03-13T13:30:00+05:30'), dateLabel: "13 March", timeLabel: "12:30 – 1:30 PM" },
    { title: "Hackathon Starts", start: new Date('2026-03-13T14:00:00+05:30'), dateLabel: "13 March", timeLabel: "2:00 PM" },
    { title: "PS Selection Time", start: new Date('2026-03-13T14:00:00+05:30'), end: new Date('2026-03-13T15:00:00+05:30'), dateLabel: "13 March", timeLabel: "2:00 – 3:00 PM" },
    { title: "Speaker Session (Urvij Saroliya)", start: new Date('2026-03-13T16:00:00+05:30'), end: new Date('2026-03-13T17:00:00+05:30'), dateLabel: "13 March", timeLabel: "4:00 – 5:00 PM" },
    { title: "Dinner + Networking", start: new Date('2026-03-13T21:00:00+05:30'), end: new Date('2026-03-13T22:00:00+05:30'), dateLabel: "13 March", timeLabel: "9:00 – 10:00 PM" },
    { title: "Space Observation", start: new Date('2026-03-13T22:00:00+05:30'), end: new Date('2026-03-14T00:00:00+05:30'), dateLabel: "13 March", timeLabel: "10:00 – 12:00" },
    { title: "Mentoring Round 1", start: new Date('2026-03-13T22:00:00+05:30'), end: new Date('2026-03-14T00:00:00+05:30'), dateLabel: "13 March", timeLabel: "10:00 PM – 12:00 AM" },

    { title: "Open Mic Night", start: new Date('2026-03-14T00:00:00+05:30'), end: new Date('2026-03-14T02:00:00+05:30'), dateLabel: "14 March", timeLabel: "12:00 – 2:00" },
    { title: "Mentoring Round 2", start: new Date('2026-03-14T09:30:00+05:30'), end: new Date('2026-03-14T13:00:00+05:30'), dateLabel: "14 March", timeLabel: "9:30 AM – 1:00 PM" },
    { title: "AR-VR Experience Zone", start: new Date('2026-03-14T10:00:00+05:30'), dateLabel: "14 March", timeLabel: "10:00 AM onwards" },
    { title: "Esports Arena", start: new Date('2026-03-14T10:00:00+05:30'), dateLabel: "14 March", timeLabel: "10:00 AM onwards" },
    { title: "Coding Competition", start: new Date('2026-03-14T10:00:00+05:30'), end: new Date('2026-03-14T12:00:00+05:30'), dateLabel: "14 March", timeLabel: "10:00 – 12:00 PM" },
    { title: "Fun Quiz", start: new Date('2026-03-14T11:30:00+05:30'), end: new Date('2026-03-14T12:30:00+05:30'), dateLabel: "14 March", timeLabel: "11:30 – 12:30 PM" },
    { title: "Block Printing Workshop", start: new Date('2026-03-14T13:00:00+05:30'), dateLabel: "14 March", timeLabel: "1:00 onwards" },
    { title: "Speaker Session (Keerti Purswani)", start: new Date('2026-03-14T13:00:00+05:30'), end: new Date('2026-03-14T14:00:00+05:30'), dateLabel: "14 March", timeLabel: "1:00 – 2:00 PM" },
    { title: "Panel Discussion", start: new Date('2026-03-14T14:30:00+05:30'), end: new Date('2026-03-14T16:00:00+05:30'), dateLabel: "14 March", timeLabel: "2:30 – 4:00 PM" },
    { title: "Judging Round 3 (150 → 60)", start: new Date('2026-03-14T16:00:00+05:30'), end: new Date('2026-03-14T20:00:00+05:30'), dateLabel: "14 March", timeLabel: "4:00 – 8:00 PM" },
    { title: "Drama Club Skit", start: new Date('2026-03-14T16:30:00+05:30'), end: new Date('2026-03-14T17:00:00+05:30'), dateLabel: "14 March", timeLabel: "4:30 – 5:00 PM" },
    { title: "Dance Battle", start: new Date('2026-03-14T17:00:00+05:30'), end: new Date('2026-03-14T20:00:00+05:30'), dateLabel: "14 March", timeLabel: "5:00 – 8:00 PM" },
    { title: "Dinner Break", start: new Date('2026-03-14T20:00:00+05:30'), end: new Date('2026-03-14T21:00:00+05:30'), dateLabel: "14 March", timeLabel: "8:00 – 9:00 PM" },
    { title: "Space Object Finding Competition", start: new Date('2026-03-14T21:00:00+05:30'), end: new Date('2026-03-15T00:00:00+05:30'), dateLabel: "14 March", timeLabel: "9:00 – 12:00" },
    { title: "Jamming Night", start: new Date('2026-03-14T23:30:00+05:30'), end: new Date('2026-03-15T02:00:00+05:30'), dateLabel: "14 March", timeLabel: "11:30 – 2:00 AM" },

    { title: "Breakfast + Debug Time", start: new Date('2026-03-15T08:00:00+05:30'), end: new Date('2026-03-15T09:30:00+05:30'), dateLabel: "15 March", timeLabel: "8:00 – 9:30 AM" },
    { title: "Judging Round 4 (60 → 10)", start: new Date('2026-03-15T10:00:00+05:30'), dateLabel: "15 March", timeLabel: "10:00 AM" },
    { title: "Top 10 Team Presentation", start: new Date('2026-03-15T13:30:00+05:30'), dateLabel: "15 March", timeLabel: "1:30 onwards" },
    { title: "Closing Ceremony + Winners", start: new Date('2026-03-15T17:00:00+05:30'), end: new Date('2026-03-15T19:00:00+05:30'), dateLabel: "15 March", timeLabel: "5:00 – 7:00 PM" },
    { title: "Concert (Maan Panu)", start: new Date('2026-03-15T19:00:00+05:30'), dateLabel: "15 March", timeLabel: "7:00 onwards" }
];

interface TimeUnit {
    value: number;
    label: string;
}

function pad(n: number) {
    return String(Math.max(0, n)).padStart(2, '0');
}

function formatDuration(diffMs: number) {
    if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    const total = diffMs;
    const seconds = Math.floor((diffMs / 1000) % 60);
    const minutes = Math.floor((diffMs / 1000 / 60) % 60);
    const hours = Math.floor((diffMs / 1000 / 60 / 60) % 24);
    const days = Math.floor(diffMs / 1000 / 60 / 60 / 24);
    return { days, hours, minutes, seconds, total };
}

function formatTimeOnly(diffMs: number) {
    if (diffMs <= 0) return "00:00:00";
    const hours = Math.floor((diffMs / 1000 / 60 / 60) % 24);
    const minutes = Math.floor((diffMs / 1000 / 60) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);
    // If days > 0, include days in hours for "begins in" formatting realistically for >24h.
    const days = Math.floor(diffMs / 1000 / 60 / 60 / 24);
    const totalHours = days * 24 + hours;
    return `${pad(totalHours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function ClockClient() {
    const [time, setTime] = useState(formatDuration(0));
    const [started, setStarted] = useState(false);
    
    const [currentEvent, setCurrentEvent] = useState<HackathonEvent | null>(null);
    const [upcomingEvents, setUpcomingEvents] = useState<HackathonEvent[]>([]);
    const [timerTarget, setTimerTarget] = useState<Date | null>(null);
    const [pinnedEvent, setPinnedEvent] = useState<HackathonEvent | null>(null);
    const [pinnedTime, setPinnedTime] = useState(formatDuration(0));

    // Sort to ensure chronological order for logic
    const SORTED_SCHEDULE = [...SCHEDULE].sort((a, b) => a.start.getTime() - b.start.getTime());

    useEffect(() => {
        const updateState = () => {
            const now = new Date();
            let activeEvent: HackathonEvent | null = null;
            let target: Date | null = null;
            let firstFutureIndex = -1;

            // Find active and target
            for (let i = 0; i < SORTED_SCHEDULE.length; i++) {
                const event = SORTED_SCHEDULE[i];
                if (now >= event.start && (!event.end || now < event.end)) {
                    const nextEv = SORTED_SCHEDULE[i+1];
                    if (!event.end && nextEv && now >= nextEv.start) {
                        continue;
                    }
                    activeEvent = event;
                    target = event.end ? event.end : (nextEv ? nextEv.start : null);
                    firstFutureIndex = i + 1;
                    break;
                } else if (now < event.start) {
                    firstFutureIndex = i;
                    target = event.start;
                    break;
                }
            }

            const upcs = firstFutureIndex !== -1 ? SORTED_SCHEDULE.slice(firstFutureIndex, firstFutureIndex + 3) : [];

            setCurrentEvent(activeEvent);
            setUpcomingEvents(upcs);
            setTimerTarget(target);

            if (target) {
                setTime(formatDuration(target.getTime() - now.getTime()));
            } else {
                setTime(formatDuration(0)); // All events over
            }

            setStarted(true);
        };

        updateState();
        const id = setInterval(updateState, 1000);
        return () => clearInterval(id);
    }, []);

    // Update pinnedTime every second when a pinned event is set
    useEffect(() => {
        if (!pinnedEvent) return;
        const tick = () => setPinnedTime(formatDuration(pinnedEvent.start.getTime() - Date.now()));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [pinnedEvent]);

    const activeTime = pinnedEvent ? pinnedTime : time;
    const units: TimeUnit[] = [
        { value: activeTime.days, label: 'DAY' },
        { value: activeTime.hours, label: 'HR' },
        { value: activeTime.minutes, label: 'MIN' },
        { value: activeTime.seconds, label: 'SEC' },
    ];

    if (!started) return <div className="min-h-screen bg-[#0a0a0a]" />;

    return (
        <div className="relative min-h-screen flex flex-col items-center bg-[#0a0a0a] overflow-x-hidden pt-16 pb-32">
            
            {/* Background Layer */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(40,30,10,0.5),transparent_60%)] mix-blend-screen z-0" />
                
                {/* 1. Ambient Floating Embers (Background Wide) */}
                {[...Array(30)].map((_, i) => {
                    const size = Math.random() * 4 + 2;
                    const left = Math.random() * 100;
                    const animDuration = Math.random() * 15 + 10;
                    const delay = Math.random() * 10;
                    return (
                        <div
                            key={`ember-${i}`}
                            className="absolute rounded-full bg-[#F4C430] blur-[1px] mix-blend-screen opacity-0 animate-float-up"
                            style={{
                                width: size,
                                height: size,
                                left: `${left}%`,
                                bottom: '-5%',
                                animationDuration: `${animDuration}s`,
                                animationDelay: `${delay}s`,
                                boxShadow: '0 0 10px 2px rgba(244,196,48,0.4)',
                            }}
                        />
                    );
                })}

                {/* 2. Vertical Greek Runes (Left & Right Flanks) */}
                <div className="absolute left-2 sm:left-6 top-0 bottom-0 w-8 flex-col text-[#F4C430]/15 font-cinzel text-xl sm:text-2xl font-bold select-none overflow-hidden hidden md:flex opacity-50">
                    <div className="animate-runes flex flex-col items-center justify-around h-[200%] w-full">
                        {['Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω', 'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ', 'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'].map((char, j) => (
                            <span key={`l-${j}`} className="my-6 lg:my-8">{char}</span>
                        ))}
                    </div>
                </div>
                <div className="absolute right-2 sm:right-6 top-0 bottom-0 w-8 flex-col text-[#F4C430]/15 font-cinzel text-xl sm:text-2xl font-bold select-none overflow-hidden hidden md:flex opacity-50">
                    <div className="animate-runes-reverse flex flex-col items-center justify-around h-[200%] w-full">
                        {['Ω', 'Ψ', 'Χ', 'Φ', 'Υ', 'Τ', 'Σ', 'Ρ', 'Π', 'Ο', 'Ξ', 'Ν', 'Μ', 'Λ', 'Κ', 'Ι', 'Θ', 'Η', 'Ζ', 'Ε', 'Δ', 'Γ', 'Β', 'Α', 'Ω', 'Ψ', 'Χ', 'Φ', 'Υ', 'Τ', 'Σ', 'Ρ', 'Π', 'Ο', 'Ξ', 'Ν', 'Μ', 'Λ', 'Κ', 'Ι', 'Θ', 'Η', 'Ζ', 'Ε', 'Δ', 'Γ', 'Β', 'Α'].map((char, j) => (
                            <span key={`r-${j}`} className="my-6 lg:my-8">{char}</span>
                        ))}
                    </div>
                </div>

                {/* 3. Screen Corner Borders (Framing the viewport) */}
                <div className="absolute top-20 left-12 w-24 h-24 border-t-2 border-l-2 border-[#F4C430]/20 rounded-tl-3xl hidden xl:block" />
                <div className="absolute top-20 right-12 w-24 h-24 border-t-2 border-r-2 border-[#F4C430]/20 rounded-tr-3xl hidden xl:block" />
                <div className="absolute bottom-36 left-12 w-24 h-24 border-b-2 border-l-2 border-[#F4C430]/20 rounded-bl-3xl hidden xl:block" />
                <div className="absolute bottom-36 right-12 w-24 h-24 border-b-2 border-r-2 border-[#F4C430]/20 rounded-br-3xl hidden xl:block" />

                {/* 4. VERTICAL UPCOMING EVENTS TICKER (Right Side) */}
                <div className="absolute right-14 sm:right-20 top-0 bottom-0 w-36 lg:w-44 hidden lg:flex flex-col items-end overflow-hidden pointer-events-none"
                    style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)', maskImage: 'linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)' }}>
                    <div className="flex flex-col items-end animate-ticker-up w-full">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex flex-col items-end w-full">
                                {SORTED_SCHEDULE.filter(e => new Date() < e.start).map((evt, j) => (
                                    <div key={`v-${i}-${j}`} className="flex flex-col items-end text-right mb-8 w-full">
                                        <span className="text-[#F4C430]/50 text-[0.6rem] font-mono tracking-[0.3em] uppercase mb-1">upcoming</span>
                                        <span className="text-white/80 text-xs font-medium leading-snug">{evt.title}</span>
                                        <span className="text-[#F4C430]/50 text-[0.65rem] font-mono tracking-wide mt-0.5">{evt.dateLabel}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Full Page Hourglass Graphic perfectly centered behind everything */}
                <div className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen z-0">
                    <Image
                        src="/hourglass-bg.png"
                        alt="Ancient Mythological Hourglass"
                        fill
                        className="object-cover md:object-contain object-center scale-[1.2] md:scale-100"
                        style={{
                            maskImage: 'radial-gradient(circle at center, black 50%, transparent 90%)',
                            WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 90%)'
                        }}
                    />
                    <div className="absolute inset-0 rounded-full bg-[#F4C430] blur-[150px] opacity-10" />
                    
                    {/* Sand Animation built directly inside the hourglass bounds (adjusting left to stay central) */}
                    {[...Array(40)].map((_, i) => {
                        const size = Math.random() * 3 + 1.5;
                        const left = Math.random() * 20 + 40; // tight center
                        const animDuration = Math.random() * 6 + 4;
                        const delay = Math.random() * 6;
                        return (
                            <div
                                key={`sand-${i}`}
                                className="absolute rounded-full bg-[#F4C430] blur-[0.5px] mix-blend-screen opacity-0 animate-fall-down"
                                style={{
                                    width: size,
                                    height: size * 1.5,
                                    left: `${left}%`,
                                    top: '5%',
                                    animationDuration: `${animDuration}s`,
                                    animationDelay: `${delay}s`,
                                    boxShadow: '0 0 8px 1px rgba(244,196,48,0.8)'
                                }}
                            />
                        );
                    })}
                </div>
            </div>

            {/* 1. TOP HEADER */}
            <div className="fixed top-0 left-0 w-full h-16 bg-[#0a0a0a]/90 backdrop-blur-md z-30 flex items-center justify-between px-8 sm:px-12 border-b border-[#F4C430]/20 font-inter">
                <span className="text-[#F4C430] font-mono tracking-[0.2em] text-xs sm:text-sm font-semibold uppercase">TECHUTOPIA 2026</span>
                <span className="text-[#F4C430]/70 font-mono tracking-widest text-[0.6rem] uppercase hidden sm:block">SYSTEM: ORACLE UPLINK — <span className="text-green-500/80">STABLE</span></span>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col justify-between items-center min-h-[calc(100vh-10rem)] pb-8 mt-4">
                
                {/* Mobile-Only WiFi Banner */}
                <div className="w-full md:hidden mb-6 mt-2 z-10 font-inter backdrop-blur-md rounded-xl border border-[#F4C430]/40 bg-black/60 overflow-hidden shadow-[0_0_30px_rgba(244,196,48,0.15)] animate-fade-in">
                    <div className="flex flex-col p-4 gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-[0.6rem] text-[#F4C430] font-mono tracking-[0.3em] font-bold uppercase">Sacred Connection</span>
                            <span className="text-[0.55rem] text-gray-500 font-mono tracking-widest uppercase">WiFi</span>
                        </div>
                        <div className="flex justify-between items-center bg-white/5 p-2.5 rounded-lg border border-white/5">
                            <div>
                                <div className="text-[0.5rem] text-gray-500 font-mono uppercase tracking-tighter">SSID</div>
                                <div className="text-sm font-bold text-white leading-none mt-1">UEM</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[0.5rem] text-gray-500 font-mono uppercase tracking-tighter">Password</div>
                                <div className="text-sm font-bold text-[#F4C430] font-mono leading-none mt-1">wifi@uem21</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                            <span className="text-[0.6rem] text-[#F4C430] font-mono tracking-[0.3em] font-bold uppercase">Oracle Access</span>
                            <span className="text-[0.55rem] text-gray-500 font-mono tracking-widest uppercase">Portal</span>
                        </div>
                        <div className="flex justify-between items-center bg-[#F4C430]/5 p-2.5 rounded-lg border border-[#F4C430]/10">
                            <div>
                                <div className="text-[0.5rem] text-gray-500 font-mono uppercase tracking-tighter">User</div>
                                <div className="text-sm font-bold text-white leading-none mt-1 text-ellipsis overflow-hidden">techutopia</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[0.5rem] text-gray-500 font-mono uppercase tracking-tighter">Pass</div>
                                <div className="text-sm font-bold text-[#F4C430] font-mono leading-none mt-1">techutopia@26</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* 2. MAIN COUNTDOWN TIMER */}
                <div className="relative w-full flex flex-col justify-center items-center flex-1">
                    
                    <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 w-full z-10">
                        {units.map((unit) => (
                            <div key={unit.label} className="flex flex-col items-center z-10 relative">
                                <span style={{ fontVariantNumeric: 'tabular-nums' }} className="font-cinzel text-7xl sm:text-[7rem] md:text-[10rem] lg:text-[12rem] xl:text-[15rem] font-bold tracking-normal text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#F4C430] drop-shadow-[0_0_20px_rgba(244,196,48,0.4)] leading-none">
                                    {pad(unit.value)}
                                </span>
                                <span className="mt-2 text-xs sm:text-sm font-inter font-bold tracking-[0.4em] text-[#F4C430]/80 uppercase">
                                    {unit.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. CURRENT & UPCOMING / PINNED EVENT STRIP */}
                <div className={`w-full max-w-6xl mt-6 z-10 font-inter backdrop-blur-md rounded-2xl border transition-all duration-500 overflow-hidden ${
                    pinnedEvent
                        ? 'bg-[#1a1000]/80 border-[#F4C430]/50 shadow-[0_0_60px_rgba(244,196,48,0.15)]'
                        : 'bg-black/60 border-white/10'
                }`}>
                    {pinnedEvent ? (
                        /* PINNED EVENT MODE */
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6">
                            <div className="flex items-center gap-5">
                                <div className="w-1 h-16 bg-[#F4C430] rounded-full shadow-[0_0_20px_#F4C430] shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[0.65rem] text-[#F4C430] font-mono tracking-[0.35em] font-semibold uppercase mb-1">⏱ Timer focused on</span>
                                    <div className="text-2xl sm:text-3xl text-white font-bold">{pinnedEvent.title}</div>
                                    <div className="text-sm text-[#F4C430]/70 font-mono mt-1">{pinnedEvent.dateLabel} · {pinnedEvent.timeLabel}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => setPinnedEvent(null)}
                                className="flex items-center gap-2 text-xs font-mono tracking-widest text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2.5 rounded-xl transition-all duration-200 shrink-0 hover:bg-white/5"
                            >
                                ✕ CLEAR FOCUS
                            </button>
                        </div>
                    ) : (
                        /* NORMAL MODE */
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">

                            {/* LIVE NOW card */}
                            <div className="relative p-5 sm:p-6 flex flex-col justify-center gap-2 overflow-hidden bg-gradient-to-br from-[#F4C430]/8 to-transparent">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#F4C430] to-[#F4C430]/30 shadow-[0_0_20px_#F4C430]" />
                                <div className="flex items-center gap-2.5">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F4C430] opacity-50"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F4C430] shadow-[0_0_10px_#F4C430]"></span>
                                    </span>
                                    <span className="text-[0.7rem] text-[#F4C430] font-mono tracking-[0.4em] font-bold uppercase">Live Now</span>
                                </div>
                                <div className="text-2xl sm:text-3xl font-bold text-white leading-tight mt-1">
                                    {currentEvent ? currentEvent.title : (time.total > 0 ? "AWAITING EVENTS" : "HACKATHON CONCLUDED")}
                                </div>
                                <div className="text-sm text-[#F4C430]/60 font-mono">
                                    {currentEvent ? `${currentEvent.dateLabel} · ${currentEvent.timeLabel}` : "Stay tuned"}
                                </div>
                            </div>

                            {/* Upcoming event cards */}
                            {upcomingEvents.slice(0, 2).map((evt, idx) => (
                                <div key={idx} className="p-5 sm:p-6 flex flex-col justify-center gap-2 hover:bg-white/5 transition-colors duration-200">
                                    <span className="text-[0.65rem] text-gray-500 font-mono tracking-[0.4em] uppercase font-semibold">Upcoming</span>
                                    <div className="text-xl sm:text-2xl font-semibold text-white/90 leading-tight">{evt.title}</div>
                                    <div className="text-sm text-[#F4C430]/50 font-mono mt-0.5">{evt.dateLabel} · {evt.timeLabel}</div>
                                </div>
                            ))}
                            {upcomingEvents.length === 0 && (
                                <div className="p-6 flex items-center justify-center col-span-2 text-gray-500 text-sm font-mono tracking-widest uppercase">End of Schedule</div>
                            )}
                            {upcomingEvents.length === 1 && (
                                <div className="p-5 sm:p-6 flex items-center justify-center text-gray-600 text-xs font-mono tracking-widest uppercase">End of upcoming</div>
                            )}
                        </div>
                    )}
                </div>

                {/* WiFi Credentials Card (Desktop Only) */}
                <div className="w-full max-w-6xl mt-6 z-10 font-inter backdrop-blur-md rounded-2xl border border-[#F4C430]/30 bg-black/60 overflow-hidden shadow-[0_0_40px_rgba(244,196,48,0.1)] hidden md:block">
                    <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-[#F4C430]/20">
                        {/* WiFi Section */}
                        <div className="flex-1 p-5 sm:p-6 flex flex-col gap-3">
                            <div className="flex items-center gap-2.5">
                                <span className="text-[0.7rem] text-[#F4C430] font-mono tracking-[0.4em] font-bold uppercase">Sacred Connection (WiFi)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-[0.6rem] text-gray-500 font-mono tracking-widest uppercase">SSID</div>
                                    <div className="text-lg font-bold text-white">UEM</div>
                                </div>
                                <div>
                                    <div className="text-[0.6rem] text-gray-500 font-mono tracking-widest uppercase">Password</div>
                                    <div className="text-lg font-bold text-[#F4C430] font-mono tracking-wider">wifi@uem21</div>
                                </div>
                            </div>
                        </div>

                        {/* Sign In Section */}
                        <div className="flex-1 p-5 sm:p-6 flex flex-col gap-3 bg-gradient-to-br from-[#F4C430]/5 to-transparent">
                            <div className="flex items-center gap-2.5">
                                <span className="text-[0.7rem] text-[#F4C430] font-mono tracking-[0.4em] font-bold uppercase">Oracle Access (Portal Login)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-[0.6rem] text-gray-500 font-mono tracking-widest uppercase">Username</div>
                                    <div className="text-lg font-bold text-white">techutopia</div>
                                </div>
                                <div>
                                    <div className="text-[0.6rem] text-gray-500 font-mono tracking-widest uppercase">Password</div>
                                    <div className="text-lg font-bold text-[#F4C430] font-mono tracking-wider">techutopia@26</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SPACER BETWEEN MAIN FRAME AND TIMELINE */}
            <div className="w-full pt-16" />

                {/* 4. EVENT SCHEDULE TIMELINE */}
                <div className="w-full max-w-5xl flex flex-col gap-8 z-10 font-inter bg-black/40 backdrop-blur-sm p-4 sm:p-8 rounded-2xl border border-white/5">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-cinzel text-white/90 text-center tracking-widest uppercase drop-shadow-md">Event Schedule</h3>
                        <span className="text-[0.6rem] text-gray-500 font-mono tracking-widest hidden sm:block">CLICK ANY EVENT TO FOCUS TIMER</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                        {SORTED_SCHEDULE.map((event, idx) => {
                            const isActive = currentEvent?.title === event.title && currentEvent?.timeLabel === event.timeLabel;
                            const isPinned = pinnedEvent?.title === event.title && pinnedEvent?.timeLabel === event.timeLabel;
                            const isPast = !isActive && new Date() > (event.end || event.start);

                            return (
                                <div 
                                    key={idx}
                                    onClick={() => setPinnedEvent(isPinned ? null : event)}
                                    className={`p-4 rounded-lg flex flex-col gap-1 border transition-all duration-300 cursor-pointer group ${
                                        isPinned
                                            ? 'border-[#F4C430] bg-[#F4C430]/20 shadow-[0_0_25px_rgba(244,196,48,0.3)] scale-[1.02]'
                                            : isActive
                                                ? 'border-[#F4C430]/60 bg-[#F4C430]/10 shadow-[0_0_20px_rgba(244,196,48,0.1)]'
                                                : 'border-white/10 bg-black/40 hover:border-white/30 hover:bg-white/5'
                                    } ${isPast && !isPinned ? 'opacity-40 grayscale' : 'opacity-100'}`}
                                >
                                    <div className="flex justify-between items-start text-xs font-mono font-medium tracking-wide">
                                        <span className={isPinned ? 'text-[#F4C430]' : isActive ? 'text-[#F4C430]/80' : 'text-gray-400'}>{event.dateLabel}</span>
                                        <div className="flex items-center gap-2">
                                            {isPinned && <span className="text-[#F4C430] text-[0.5rem] tracking-widest animate-pulse">⏱ FOCUSED</span>}
                                            <span className={isPinned ? 'text-[#F4C430]' : isActive ? 'text-[#F4C430]/80' : 'text-gray-500'}>{event.timeLabel}</span>
                                        </div>
                                    </div>
                                    <div className={`text-sm font-semibold mt-1 ${isPinned || isActive ? 'text-white' : 'text-gray-300 group-hover:text-white/80'}`}>
                                        {event.title}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
 
             {/* 5. PARTNER LOGO STRIP */}
             <div className="fixed bottom-0 left-0 w-full h-24 sm:h-28 z-30 bg-[#0a0a0a]/90 backdrop-blur-md flex flex-col justify-center overflow-hidden">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[0.6rem] tracking-[0.4em] font-mono text-[#F4C430]/90 font-semibold drop-shadow-[0_0_8px_rgba(244,196,48,0.5)] uppercase">
                    PARTNERS OF OLYMPUS
                </div>
                
                <div className="w-full flex items-center mt-4 relative overflow-hidden" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
                    <div className="flex whitespace-nowrap animate-marquee items-center transition-opacity duration-700 w-max" style={{ animationDuration: '100s' }}>
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center shrink-0">
                                {SPONSORS.map((sponsor, j) => (
                                    <div key={i + "-" + j} className="flex items-center shrink-0 mx-10 sm:mx-16 gap-4">
                                        <div className="h-6 sm:h-8 lg:h-10 shrink-0 relative flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img 
                                                src={sponsor.src} 
                                                alt={sponsor.name}
                                                className="h-full w-auto object-contain shrink-0 max-w-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
                .animate-fall-down {
                    animation-name: fall-down;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
                .font-cinzel {
                    font-family: var(--font-cinzel), Cinzel, serif;
                }
                .font-inter {
                    font-family: var(--font-inter), Inter, sans-serif;
                }
                .animate-runes {
                    animation: runes 60s linear infinite;
                }
                .animate-runes-reverse {
                    animation: runes-reverse 60s linear infinite;
                }
                .animate-float-up {
                    animation: float-up 15s linear infinite;
                }
                
                @keyframes runes {
                    0% { transform: translateY(0%); }
                    100% { transform: translateY(-50%); }
                }
                
                @keyframes runes-reverse {
                    0% { transform: translateY(-50%); }
                    100% { transform: translateY(0%); }
                }
                
                @keyframes float-up {
                    0% { transform: translateY(10vh) scale(0.8); opacity: 0; }
                    20% { opacity: 0.6; }
                    80% { opacity: 0.4; }
                    100% { transform: translateY(-110vh) scale(1.2); opacity: 0; }
                }

                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                @keyframes ticker-up {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-33.33%); }
                }
                .animate-ticker-up {
                    animation: ticker-up 50s linear infinite;
                }
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(-10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes fall-down {
                    0% {
                        transform: translateY(-5vh) scale(0.8);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(105vh) scale(1.2);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
