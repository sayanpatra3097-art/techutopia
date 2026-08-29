'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Linkedin, Instagram, Github, X } from 'lucide-react';
import { PageNavigation } from '@/components/navigation/PageNavigation';
import { COMMITTEE_DATA } from '@/data/committeeData';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

// Row 1 (11 members)
const ROW1_TEAM = [
    { name: "Siddharth", role: "Registrations", image: "/team/Reg_TeamCard.png", insta: "https://www.instagram.com/siddharth.ranka_/", github: "https://github.com/SiddharthRanka-sr/", linkedin: "https://www.linkedin.com/in/siddharth-ranka-80925a279/" },
    { name: "Tanya", role: "Food and Accommodation", image: "/team/F_A_TeamCard_Tanya-removebg-preview.png", insta: "https://www.instagram.com/_.tanyajain._", linkedin: "https://www.linkedin.com/in/tanya-jain-tj040614" },
    { name: "Siddhii", role: "Decor", image: "/team/Decor_TeamCard-removebg-preview.png", insta: "https://www.instagram.com/siddhiii1304__", linkedin: "https://www.linkedin.com/in/siddhi-jain-0a026b321" },
    { name: "Nikita", role: "Design Team", image: "/team/Design_TeamCard_nikita-removebg-preview.png", insta: "https://www.instagram.com/nikitakumawat_1907", linkedin: "https://www.linkedin.com/in/nikita-kumawat-640337321" },
    { name: "Chestha", role: "Media & Report", image: "/team/Media_Report_TeamCard-removebg-preview.png", insta: "https://www.instagram.com/chestha_05", linkedin: "https://www.linkedin.com/in/chestha-kulshrestha11" },
    { name: "Agrima", role: "Hospitality", image: "/team/Hospt_TeamCard.png", insta: "https://www.instagram.com/thekesharii.ag", linkedin: "https://www.linkedin.com/in/agrima-keshari-3a3b55251" },
    { name: "Anmol", role: "IA", image: "/team/IA_TeamCard-removebg-preview.png", insta: "https://www.instagram.com/sahu.anmol02", github: "https://github.com/Anmolsahu-02", linkedin: "https://linkedin.com/in/anmol-sahu-" },
    { name: "Jheel", role: "P&C", image: "/team/P_C_TeamCard_Jheel-removebg-preview.png", insta: "https://www.instagram.com/jheel_jain14", github: "https://github.com/JheelJain14", linkedin: "https://www.linkedin.com/in/jheel-jain-a14913357" },
    { name: "Swati", role: "Discipline", image: "/team/Discipline_TeamCard_2-removebg-preview.png", insta: "https://www.instagram.com/swatii._.06", github: "https://github.com/swatigupta06", linkedin: "https://www.linkedin.com/in/swati-gupta0607" },
    { name: "Aditya", role: "Social Media", image: "/team/SocialMedia_TeamCard-removebg-preview.png", insta: "https://www.instagram.com/quietadi06/", github: "https://github.com/Aditya4453", linkedin: "https://www.linkedin.com/in/aditya-modani-2b5654309/" },
    { name: "Shourya", role: "Tech Team", image: "/team/Tech_TeamCard_SB.png", insta: "https://www.instagram.com/its.shourya_18", github: "https://github.com/bansal1806", linkedin: "https://www.linkedin.com/in/shouryabansal18" },
];

// Row 2 (11 members)
const ROW2_TEAM = [
    { name: "Tanikk", role: "Food and Accommodation", image: "/team/F_A_TeamCard_Tanik-removebg-preview.png", insta: "https://www.instagram.com/tanik.gupta05", github: "https://github.com/TanikGupta", linkedin: "https://www.linkedin.com/in/tanik-gupta-643a53313" },
    { name: "Srishti", role: "Design Team", image: "/team/Design_TeamCard-removebg-preview.png", insta: "https://www.instagram.com/srishti._j", linkedin: "https://www.linkedin.com/in/srishti-jain-1a614a366" },
    { name: "Gaurav", role: "P&C", image: "/team/P_C_TeamCard_Gaurav-removebg-preview.png", insta: "https://www.instagram.com/its.gaurav.2004", github: "https://github.com/GauravJangid2004", linkedin: "https://www.linkedin.com/in/gaurav-jangid-91149a2a8/" },
    { name: "Aman", role: "Stage & Venue", image: "/team/S_V_TeamCard-removebg-preview.png", insta: "https://www.instagram.com/iaman.015/", github: "https://github.com/Amangp", linkedin: "https://www.linkedin.com/in/aman-gupta-056635215" },
    { name: "Shubham", role: "Discipline", image: "/team/Discipline_TeamCard-removebg-preview.png", insta: "https://www.instagram.com/shubham.sharmaa05", github: "https://github.com/shubhamsharmaa05" },
    { name: "Devam", role: "Sponsorships", image: "/team/Sponsor_TeamCard.png", insta: "https://www.instagram.com/who.is.devam/", github: "https://github.com/Devam759l", linkedin: "https://www.linkedin.com/in/devam-gupta-929239271/" },
    { name: "Mohit", role: "Social Media", image: "/team/SocialMedia_Mohit.png", insta: "https://www.instagram.com/m.k__05__", github: "https://github.com/mohit03713", linkedin: "https://www.linkedin.com/in/mohit-khurana-25427a234" },
    { name: "Aayan", role: "Tech Team", image: "/team/Tech_TeamCard_Aayan-removebg-preview.png", insta: "https://www.instagram.com/aayan_a1430/", github: "https://github.com/AayanA20", linkedin: "https://www.linkedin.com/in/aayanansari/" },
    { name: "Vaishnavi", role: "Anchoring", image: "/team/Anchoring_TeamCard.png", insta: "https://www.instagram.com/_vaishnaavii._/", github: "https://github.com/vaishnaviii14", linkedin: "https://www.linkedin.com/in/vaishnavi-shukla-9b567b315/" },
    { name: "Pratigya", role: "PS", image: "/team/PS_TeamCard-removebg-preview.png", insta: "https://www.instagram.com/pratigyaa.12/", github: "https://github.com/pratigyabomb", linkedin: "https://www.linkedin.com/in/pratigya-bomb-295857349/" },
    { name: "Ekansh", role: "Photography", image: "/team/Photography_TeamCard-removebg-preview.png", insta: "https://www.instagram.com/ekansh.saraswat/", github: "https://github.com/EkanshSaraswat", linkedin: "https://www.linkedin.com/in/ekansh-saraswat-a2a883285/" },
    { name: "Arpan", role: "Treasurer", image: "/team/Treasurer_TeamCard_AP-removebg-preview.png", insta: "https://www.instagram.com/arpan4112/", github: "https://github.com/ArpanGoyal09", linkedin: "https://www.linkedin.com/in/arpan-goyal-394960352/" },
];

// Hack Team Office Bearers (3 members)
const HACK_TEAM_LEADS = [
    { name: "Prateek", role: "Organising Head", image: '/team/OH_TeamCard-removebg-preview.png', insta: "https://www.instagram.com/prateek._.goswami", linkedin: "https://www.linkedin.com/in/prateek-goswami93" },
    { name: "Nakul", role: "Organising Head", image: '/team/OH1_TeamCard.png', insta: "https://www.instagram.com/nakulranka", linkedin: "https://www.linkedin.com/in/nakul-ranka" },
    { name: "Pakhi", role: "Organising Head", image: '/team/OH_PakhiDi-removebg-preview.png', insta: "https://www.instagram.com/pakhii_.sharma", linkedin: "https://www.linkedin.com/in/pakhi-sharma-961b3b219" },
];

// Data structure for the Council Members (Static Images)
const COUNCIL_MEMBERS = [
    { src: '/team/VC.png', name: 'Dr. Vijaysekhar Chellaboina', designation: 'Vice Chancellor, UEM' },
    { src: '/team/Deepak_Sogani.jpg', name: 'Mr. Deepak Sogani', designation: 'Incharge - Student Affairs, UEM' },
    { src: '/team/Anushka_Pathak.jpg', name: 'Ms. Anushka Pathak', designation: 'Executive - Student Affairs, UEM' },
    { src: '/team/shubham.jpeg', name: 'Shubham', designation: 'President - Student Affairs' },
    { src: '/team/suryansh.jpeg', name: 'Suryansh', designation: 'Secretary - Technical Affairs' },
    { src: '/team/aman.jpeg', name: 'Aman', designation: 'General Secretary - Technical Affairs' }
];

// Duplicate for infinite scroll
const INFINITE_ROW1 = [...ROW1_TEAM, ...ROW1_TEAM];
const INFINITE_ROW2 = [...ROW2_TEAM, ...ROW2_TEAM];

function MemberCard({ member, onViewCommittee }: { member: any; onViewCommittee: (name: string) => void }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={`relative w-[280px] h-[360px] bg-transparent shrink-0 group perspective-1000 ${isHovered ? 'z-[60]' : 'z-10'}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ perspective: "1000px" }}
        >
            <div
                className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isHovered ? '[transform:rotateY(180deg)]' : ''}`}
            >
                {/* Front of card */}
                <div className="absolute inset-0 [backface-visibility:hidden] rounded-xl overflow-hidden shadow-2xl">
                    <div className="w-full h-full relative">
                        <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#1a1723]/95 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_0_40px_rgba(0,0,0,1)] flex flex-col items-center justify-center">

                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-[#a855f7] via-[#ec4899] to-[#3b82f6] px-5 py-1.5 rounded-full shadow-[0_4px_10px_rgba(236,72,153,0.3)] whitespace-nowrap z-10">
                        <span className="text-white font-bold text-[13px] font-sans tracking-widest">{member.name}</span>
                    </div>

                    <h4 className="text-2xl font-sans text-white font-bold mb-3 text-center whitespace-nowrap pt-8">{member.name}</h4>

                    <div className="w-full h-px bg-white/10 my-2" />

                    <p className="text-[11px] tracking-widest text-[#9ca3af] text-center uppercase mb-4 mt-2 font-sans font-medium">Connect With Me</p>

                    <div className="flex justify-center gap-6 mb-5 text-[#d1d5db]">
                        {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-7 h-7 hover:text-white hover:scale-110 transition-all cursor-pointer" />
                            </a>
                        )}
                        {member.github && (
                            <a href={member.github} target="_blank" rel="noopener noreferrer">
                                <Github className="w-7 h-7 hover:text-white hover:scale-110 transition-all cursor-pointer" />
                            </a>
                        )}
                        {member.insta && (
                            <a href={member.insta} target="_blank" rel="noopener noreferrer">
                                <Instagram className="w-7 h-7 hover:text-white hover:scale-110 transition-all cursor-pointer" />
                            </a>
                        )}
                    </div>

                    <div className="w-full h-px bg-white/10 my-1" />

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewCommittee(member.role);
                        }}
                        className="w-full mt-auto bg-linear-to-r from-[#a855f7] via-[#ec4899] to-[#3b82f6] hover:opacity-90 text-white text-[12px] font-bold py-3.5 rounded-full shadow-[0_4px_15px_rgba(236,72,153,0.3)] hover:shadow-[0_6px_20px_rgba(236,72,153,0.5)] transition-all duration-300 font-sans tracking-wide cursor-pointer"
                    >
                        View Complete Committee
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function InfiniteRow({ items, direction, speed, onViewCommittee }: { items: any[]; direction: 'left' | 'right'; speed: number; onViewCommittee: (name: string) => void }) {
    // Original speed was in seconds for a full CSS animation.
    // Higher original speed -> slower. So inverse calculation:
    const emblaSpeed = 120 / speed;

    const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
        AutoScroll({ 
            playOnInit: true, 
            speed: emblaSpeed,
            direction: direction === 'left' ? 'forward' : 'backward',
            stopOnInteraction: false,
            stopOnMouseEnter: true
        })
    ]);

    return (
        <div className="relative w-full py-8 overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>
                {items.map((member, idx) => (
                    <div className="flex-[0_0_auto] min-w-0 pr-6" key={idx}>
                        <MemberCard
                            member={member}
                            onViewCommittee={onViewCommittee}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function TeamPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedCommittee, setSelectedCommittee] = useState<string | null>(null);
    const [activeTeam, setActiveTeam] = useState<'hack' | 'council'>('hack');

    return (
        <main ref={containerRef} className="bg-[#0c0a09] min-h-screen relative overflow-x-hidden selection:bg-[#d4af37]/30 selection:text-[#ffecd1]">
            {/* Global Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/team/team_bg.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-60 mix-blend-normal"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-[#0c0a09]/80 via-[#0c0a09]/50 to-[#0c0a09]" />
            </div>

            <div className="relative z-10">
                <PageNavigation />

                {/* ============================================ */}
                {/* TOGGLE BUTTONS                               */}
                {/* ============================================ */}
                <section className="relative z-30 flex flex-col items-center text-[#ffecd1] pt-44 pb-10">
                    <div className="relative z-20 flex gap-4 sm:gap-6 mb-16 items-center justify-center">
                        <button
                            onClick={() => setActiveTeam('hack')}
                            className={`flex items-center gap-2 px-6 sm:px-10 py-3 sm:py-4 rounded-full border-2 transition-all duration-300 backdrop-blur-md cursor-pointer ${activeTeam === 'hack'
                                ? 'border-[#ffb800] bg-black/40 text-[#ffb800] shadow-[0_0_20px_rgba(255,184,0,0.15)]'
                                : 'border-white/20 bg-black/20 text-[#a3a3a3] hover:border-white/40 hover:text-white'
                                }`}
                        >
                            <span className="text-xl sm:text-2xl pt-1">⚆⚇</span>
                            <span className="font-[Cinzel] font-bold text-xl sm:text-3xl tracking-wide drop-shadow-md">Hack Team</span>
                        </button>

                        <button
                            onClick={() => setActiveTeam('council')}
                            className={`flex items-center gap-2 px-6 sm:px-10 py-3 sm:py-4 rounded-full border-2 transition-all duration-300 backdrop-blur-md cursor-pointer ${activeTeam === 'council'
                                ? 'border-[#ffb800] bg-black/40 text-[#ffb800] shadow-[0_0_20px_rgba(255,184,0,0.15)]'
                                : 'border-white/20 bg-black/20 text-[#a3a3a3] hover:border-white/40 hover:text-white'
                                }`}
                        >
                            <span className="text-lg sm:text-xl">⚖</span>
                            <span className="font-[Cinzel] font-bold text-xl sm:text-3xl tracking-wide drop-shadow-md">Council</span>
                        </button>
                    </div>
                </section>

                {/* ============================================ */}
                {/* HACK TEAM VIEW                                */}
                {/* ============================================ */}
                {activeTeam === 'hack' && (
                    <>
                        <section className="relative min-h-[70vh] flex flex-col items-center text-[#ffecd1] overflow-hidden pb-20">
                            {/* Section Title */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-center mb-16 relative z-20"
                            >
                                <h2 className="text-5xl md:text-7xl font-[Cinzel] font-bold text-[#d4af37] tracking-wider drop-shadow-[0_4px_10px_rgba(212,175,55,0.3)]">
                                    Organising Head
                                </h2>
                                <div className="mt-4 mx-auto w-32 h-px bg-linear-to-r from-transparent via-[#d4af37]/60 to-transparent" />
                            </motion.div>

                            {/* Hack Team Office Bearer Cards - 3 centered */}
                            <div className="flex flex-wrap gap-8 z-10 justify-center items-center mb-20 px-4">
                                {HACK_TEAM_LEADS.map((oh, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                        transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <MemberCard member={oh} onViewCommittee={setSelectedCommittee} />
                                    </motion.div>
                                ))}
                            </div>

                        </section>

                        {/* ============================================ */}
                        {/* HACK TEAM CAROUSEL                            */}
                        {/* ============================================ */}
                        <section className="relative min-h-screen overflow-hidden py-32 flex flex-col justify-center">
                            {/* Background Ambience */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/10 blur-[120px] rounded-full mix-blend-screen" />
                                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1a0b2e]/20 blur-[150px] rounded-full mix-blend-screen" />
                            </div>

                            {/* Section Header */}
                            <div className="container mx-auto px-4 mb-20 relative z-10 text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h2 className="text-[#ffecd1] text-5xl md:text-8xl font-black tracking-tighter mb-4 leading-none font-[Cinzel]">
                                        Core Members<span className="text-[#d4af37]"></span>
                                    </h2>
                                </motion.div>
                            </div>


                            {/* Dual Infinite Carousel */}
                            <div className="flex flex-col gap-12 relative z-10 transform -rotate-1 scale-105">
                                <div className="w-full border-y border-[#d4af37]/10 bg-black/20 backdrop-blur-sm">
                                    <InfiniteRow items={INFINITE_ROW1} direction="left" speed={60} onViewCommittee={setSelectedCommittee} />
                                </div>
                                <div className="w-full border-y border-[#d4af37]/10 bg-black/20 backdrop-blur-sm -ml-12">
                                    <InfiniteRow items={INFINITE_ROW2} direction="right" speed={50} onViewCommittee={setSelectedCommittee} />
                                </div>
                            </div>


                        </section>
                    </>)}

                {/* ============================================ */}
                {/* COUNCIL VIEW (6 placeholders, 3x2)           */}
                {/* ============================================ */}
                {activeTeam === 'council' && (
                    <section className="relative min-h-screen flex flex-col items-center justify-center text-[#ffecd1] overflow-hidden py-32">
                        {/* Background Ambience */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#d4af37]/8 blur-[150px] rounded-full mix-blend-screen" />
                            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#1a0b2e]/15 blur-[120px] rounded-full mix-blend-screen" />
                        </div>

                        {/* Section Title */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16 relative z-10"
                        >
                            <h2 className="text-5xl md:text-7xl font-[Cinzel] font-bold text-[#d4af37] tracking-wider drop-shadow-[0_4px_10px_rgba(212,175,55,0.3)]">
                                Council
                            </h2>
                            <div className="mt-4 mx-auto w-32 h-px bg-linear-to-r from-transparent via-[#d4af37]/60 to-transparent" />
                        </motion.div>

                        {/* Council Cards - Grid */}
                        <div className="flex flex-wrap justify-center gap-12 lg:gap-16 max-w-[1400px] mx-auto pb-10">
                            {COUNCIL_MEMBERS.map((member, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="relative w-[340px] h-[450px] lg:w-[380px] lg:h-[500px] rounded-2xl overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8)] group border border-white/5"
                                >
                                    <Image
                                        src={member.src}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 1024px) 340px, 380px"
                                    />
                                    {/* Bottom Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

                                    {/* Name and Designation */}
                                    <div className="absolute bottom-8 left-0 right-0 px-4 flex flex-col items-center">
                                        <h3 className="text-white font-bold text-xl lg:text-2xl text-center leading-tight mb-3 drop-shadow-md">
                                            {member.name.split(' ').map((part, i, arr) => (
                                                <span key={i}>
                                                    {part}
                                                    {i === 0 && arr.length > 2 ? <br /> : ' '}
                                                </span>
                                            ))}
                                        </h3>
                                        <div className="bg-black/60 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-md flex items-center gap-2">
                                            <span className="text-[#d4af37] text-sm leading-none pt-0.5">★</span>
                                            <span className="text-gray-200 text-sm font-medium whitespace-nowrap">
                                                {member.designation}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Complete Committee Modal (preserved from original) */}
            <AnimatePresence>
                {selectedCommittee && (
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 font-sans">
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer z-0"
                            onClick={() => setSelectedCommittee(null)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-[#13161c]/30 backdrop-blur-3xl rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-y-auto overflow-x-hidden custom-scrollbar z-10"
                        >
                            {/* Close Button */}
                            <div className="absolute top-4 right-4 z-[99999]">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedCommittee(null);
                                    }}
                                    aria-label="Close committee modal"
                                    className="p-2 sm:p-2.5 bg-white/5 hover:bg-white/10 active:bg-white/20 rounded-full text-white/70 hover:text-white transition-all cursor-pointer backdrop-blur-md"
                                >
                                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>
                            </div>

                            {/* Dynamic Top Glow */}
                            <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

                            <div className="p-8 sm:p-12 relative z-20">
                                {/* Header */}
                                <div className="text-center mb-12">
                                    <h2 className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#f43f5e] to-[#ec4899] mb-3">
                                        {selectedCommittee}
                                    </h2>
                                    <p className="text-[#9ca3af] text-lg">Complete Committee Members ({
                                        ((COMMITTEE_DATA[selectedCommittee]?.core?.length || 0) +
                                            (COMMITTEE_DATA[selectedCommittee]?.coordinators?.length || 0) +
                                            (COMMITTEE_DATA[selectedCommittee]?.volunteers?.length || 0))
                                    } members)</p>
                                </div>

                                {/* Core Section */}
                                {(COMMITTEE_DATA[selectedCommittee]?.core?.length || 0) > 0 && (
                                    <div className="flex flex-col items-center mb-10">
                                        <div className="bg-[#2a2b38]/30 backdrop-blur-lg border border-white/10 px-8 py-2.5 rounded-full mb-6 z-10 shadow-lg">
                                            <h3 className="text-white font-bold text-lg">Core</h3>
                                        </div>
                                        <div className="flex justify-center flex-wrap gap-4 w-full">
                                            {COMMITTEE_DATA[selectedCommittee].core.map((name: string, i: number) => (
                                                <div key={i} className="bg-[#20232a]/30 backdrop-blur-lg border border-white/10 rounded-xl p-5 text-center min-w-[200px] shadow-md hover:bg-[#2a2d36]/60 transition-colors">
                                                    <p className="text-white font-bold text-lg">{name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Coordinators Section */}
                                {(COMMITTEE_DATA[selectedCommittee]?.coordinators?.length || 0) > 0 && (
                                    <div className="flex flex-col items-center mb-10">
                                        <div className="bg-[#2a2b38]/30 backdrop-blur-lg border border-white/10 px-6 py-2 rounded-full mb-6 z-10 shadow-lg">
                                            <h3 className="text-white font-bold text-base">Coordinators</h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                                            {COMMITTEE_DATA[selectedCommittee].coordinators.map((name: string, i: number) => (
                                                <div key={i} className="bg-[#20232a]/30 backdrop-blur-lg border border-white/10 rounded-lg p-4 shadow-sm hover:bg-[#2a2d36]/60 transition-colors">
                                                    <p className="text-white font-bold text-[15px]">{name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Volunteers Section */}
                                {(COMMITTEE_DATA[selectedCommittee]?.volunteers?.length || 0) > 0 && (
                                    <div className="flex flex-col items-center">
                                        <div className="bg-[#2a2b38]/30 backdrop-blur-lg border border-white/10 px-6 py-2 rounded-full mb-6 z-10 shadow-lg">
                                            <h3 className="text-white font-bold text-base">Volunteers</h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
                                            {COMMITTEE_DATA[selectedCommittee].volunteers.map((name: string, i: number) => (
                                                <div key={i} className="bg-[#20232a]/30 backdrop-blur-lg border border-white/10 rounded-lg p-4 shadow-sm hover:bg-[#2a2d36]/60 transition-colors">
                                                    <p className="text-white font-bold text-[15px]">{name}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}