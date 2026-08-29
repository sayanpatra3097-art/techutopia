"use client";

import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue, useInView } from 'framer-motion';
import { PageNavigation } from '../navigation/PageNavigation';
import { useRef, useEffect, useState } from 'react';
import bgThemes from '../../assets/themes/divine_background.png';

const sponsorshipBenefits = [
    {
        title: "Elite Talent Pipeline",
        description: "Direct access to 500+ top-tier developers handpicked from 1500+ registrations across India. Recruit the brightest minds in tech directly.",
        icon: "🎯",
        color: "#d4af37",
        accent: "rgba(212, 175, 55, 0.2)",
        stat: "500+ DEVS"
    },
    {
        title: "Brand Immersion",
        description: "Scale your reach with 100K+ impressions across digital and on-ground channels. Your brand story, told to the most engaged tech audience.",
        icon: "✨",
        color: "#ffffff",
        accent: "rgba(255, 255, 255, 0.1)",
        stat: "100K+ REACH"
    },
    {
        title: "Product Showcase",
        description: "Integrate your APIs and products into real-world solutions during an intense 48-hour sprint. Get immediate feedback and usage data.",
        icon: "🛠️",
        color: "#f59e0b",
        accent: "rgba(245, 158, 11, 0.15)",
        stat: "48H SPRINT"
    },
    {
        title: "Strategic Impact",
        description: "Influence the next generation of innovators. Host tracks, workshops, and demos that shape the future of technology.",
        icon: "🏛️",
        color: "#fbbf24",
        accent: "rgba(251, 191, 36, 0.2)",
        stat: "UNIV BACKED"
    }
];

const bentoStats = [
    { label: "Applicants", value: "1500+", size: "col-span-2 row-span-1" },
    { label: "Finalists", value: "500+", size: "col-span-1 row-span-1" },
    { label: "Colleges", value: "100+", size: "col-span-1 row-span-2" },
    { label: "Prize Pool", value: "₹2L+", size: "col-span-2 row-span-1" },
];

// Floating golden particles component
function GoldenParticles() {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([]);

    useEffect(() => {
        const newParticles = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 15,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                        background: `radial-gradient(circle, rgba(212, 175, 55, 0.8) 0%, rgba(212, 175, 55, 0) 70%)`,
                        boxShadow: `0 0 ${particle.size * 2}px rgba(212, 175, 55, 0.5)`,
                    }}
                    animate={{
                        y: [0, -100, -200],
                        x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

// Animated counter component
function AnimatedCounter({ value }: { value: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Extract prefix (like ₹), numeric value, and suffix (like L+)
    const match = value.match(/^([^\d]*)(\d+)(.*)$/);
    const prefix = match ? match[1] : '';
    const numericValue = match ? parseInt(match[2]) : 0;
    const suffix = match ? match[3] : '';

    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = numericValue / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    setCount(numericValue);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(current));
                }
            }, duration / steps);

            return () => clearInterval(timer);
        }
    }, [isInView, numericValue]);

    return (
        <span ref={ref}>
            {prefix}{isInView ? count : 0}{suffix}
        </span>
    );
}


function BenefitCard({ benefit, index, side }: { benefit: typeof sponsorshipBenefits[0], index: number, side: 'left' | 'right' }) {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start 110%", "start 75%"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 400, damping: 40, mass: 0.1 });

    const initialX = side === 'left' ? -300 : 300;
    const initialRotateY = side === 'left' ? -30 : 30;

    const x = useTransform(smoothProgress, [0, 1], [initialX, 0]);
    const rotateY = useTransform(smoothProgress, [0, 1], [initialRotateY, 0]);
    const opacity = useTransform(smoothProgress, [0, 0.5], [0, 1]);
    const scale = useTransform(smoothProgress, [0, 1], [0.85, 1]);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            ref={cardRef}
            style={{ x, rotateY, opacity, scale }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-gradient-to-br from-amber-950/20 to-black/40 backdrop-blur-xl border border-amber-500/20 rounded-tr-[4rem] rounded-bl-[4rem] rounded-tl-2xl rounded-br-2xl p-8 lg:p-10 flex flex-col overflow-hidden transition-all duration-500 hover:border-amber-400/50 shadow-2xl hover:shadow-[0_0_80px_rgba(212,175,55,0.2)]"
        >
            {/* Animated gradient border */}
            <motion.div
                className="absolute inset-0 rounded-tr-[4rem] rounded-bl-[4rem] rounded-tl-2xl rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.3) 0%, transparent 50%, rgba(212,175,55,0.3) 100%)',
                    backgroundSize: '200% 200%',
                }}
                animate={isHovered ? {
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Mouse follow spotlight */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-tr-[4rem] rounded-bl-[4rem] rounded-tl-2xl rounded-br-2xl opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              800px circle at ${mouseX}px ${mouseY}px,
              rgba(212, 175, 55, 0.12),
              transparent 60%
            )
          `
                }}
            />

            {/* Glow orb */}
            <motion.div
                className="absolute -right-32 -top-32 w-96 h-96 rounded-full blur-[100px] pointer-events-none transition-opacity duration-1000"
                style={{ backgroundColor: benefit.color }}
                animate={{ opacity: isHovered ? 0.15 : 0 }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-start justify-between mb-8">
                <motion.div
                    className="relative aspect-square w-16 lg:w-20 flex items-center justify-center"
                    animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <motion.div
                        className="absolute inset-0 border-2 border-amber-500/30 rounded-tr-3xl rounded-bl-3xl rounded-tl-lg rounded-br-lg bg-gradient-to-br from-amber-900/30 to-black/50"
                        animate={isHovered ? { rotate: 12, scale: 1.1 } : { rotate: 0, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                    <span className="text-4xl lg:text-5xl drop-shadow-[0_0_20px_rgba(212,175,55,0.5)] relative z-10">{benefit.icon}</span>
                </motion.div>
                <motion.div
                    className="text-amber-500/5 font-bold text-7xl lg:text-9xl select-none absolute top-0 right-4"
                    animate={isHovered ? { opacity: 0.15, scale: 1.05 } : { opacity: 0.05, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    0{index + 1}
                </motion.div>
            </div>

            <motion.h3
                className="relative z-10 text-2xl lg:text-3xl font-bold text-white mb-4 transition-colors duration-300"
                animate={isHovered ? { color: "#fcd34d" } : { color: "#ffffff" }}
            >
                {benefit.title}
            </motion.h3>

            <p className="relative z-10 text-amber-100/70 text-sm lg:text-base font-serif italic leading-relaxed flex-grow">
                {benefit.description}
            </p>

            <motion.div
                className="relative z-10 pt-8 mt-4 border-t border-amber-500/10"
                animate={isHovered ? { borderColor: "rgba(251, 191, 36, 0.3)" } : {}}
            >
                <motion.div
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-900/30 to-amber-800/20 backdrop-blur-md px-5 py-2.5 rounded-tr-2xl rounded-bl-2xl rounded-tl-md rounded-br-md font-bold text-xs tracking-widest text-amber-400 border border-amber-500/20"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212,175,55,0.3)" }}
                >
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                    {benefit.stat}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

function ContactButton({ icon, label, href }: { icon: string; label: string; href: string }) {
    return (
        <motion.a
            href={href}
            whileHover={{ scale: 1.05, y: -8, boxShadow: "0 20px 40px rgba(212,175,55,0.2)" }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-4 bg-gradient-to-r from-amber-900/20 to-amber-800/10 backdrop-blur-xl border border-amber-500/30 px-8 py-5 rounded-2xl transition-all duration-300 hover:border-amber-400/60 overflow-hidden"
        >
            {/* Shimmer effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent -translate-x-full"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
            <motion.span
                className="text-2xl relative z-10"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {icon}
            </motion.span>
            <span className="text-lg md:text-xl font-mono text-amber-100 relative z-10 group-hover:text-amber-200 transition-colors">{label}</span>
        </motion.a>
    );
}

function ParallaxGridSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center py-32 px-4">
            {/* Section background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-500/5 blur-[150px]"
                    animate={isInView ? { scale: [0.8, 1.2, 1], opacity: [0, 0.3, 0.2] } : {}}
                    transition={{ duration: 3 }}
                />
            </div>

            <div className="max-w-7xl w-full relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-100px", once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"
                    />
                    <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 mb-6 leading-tight">
                        THE FOUR PILLARS
                    </h2>
                    <p className="text-amber-100/60 text-lg lg:text-xl font-serif italic max-w-2xl mx-auto">
                        The foundation of our partnership, built to elevate your brand to the pantheon of technology.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    <motion.div style={{ y: y1 }} className="flex flex-col gap-8 lg:gap-12">
                        {sponsorshipBenefits.filter((_, i) => i % 2 === 0).map((benefit, i) => (
                            <BenefitCard key={i * 2} benefit={benefit} index={i * 2} side="left" />
                        ))}
                    </motion.div>

                    <motion.div style={{ y: y2 }} className="flex flex-col gap-8 lg:gap-12 md:mt-24">
                        {sponsorshipBenefits.filter((_, i) => i % 2 !== 0).map((benefit, i) => (
                            <BenefitCard key={i * 2 + 1} benefit={benefit} index={i * 2 + 1} side="right" />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export function WhySponsor() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
    const heroScale = useTransform(smoothProgress, [0, 0.12], [1, 0.85]);
    const heroY = useTransform(smoothProgress, [0, 0.12], [0, -50]);
    const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
    const backgroundRotate = useTransform(smoothProgress, [0, 1], [0, 5]);

    return (
        <div ref={containerRef} className="relative bg-[#030303] text-[#e8dab2] font-cinzel overflow-x-hidden selection:bg-amber-500/30">
            {/* Fixed Background Layers */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute inset-[-20%] bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${bgThemes.src})`,
                        y: backgroundY,
                        rotate: backgroundRotate,
                        scale: 1.3,
                        filter: "brightness(0.35) saturate(1.2)",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

                {/* Animated golden vignette */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(ellipse at 50% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 60%)`,
                        scale: useTransform(smoothProgress, [0, 1], [1, 1.8])
                    }}
                />

                <GoldenParticles />
            </div>

            <main className="relative">
                {/* HERO SECTION */}
                <section className="relative h-screen flex items-center justify-center">
                    <motion.div
                        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                        className="text-center px-4"
                    >
                        {/* Decorative rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
                            <motion.div
                                className="absolute inset-0 border border-amber-500/10 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-[15%] border border-amber-500/20 rounded-full"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div
                                className="absolute inset-[30%] border border-amber-500/10 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="mb-10 relative z-10"
                        >
                            <motion.span
                                className="text-amber-500 tracking-[0.5em] text-xs md:text-sm font-bold uppercase block mb-6"
                                animate={{ letterSpacing: ["0.5em", "0.6em", "0.5em"] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                The Invitation
                            </motion.span>
                            <motion.div
                                className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            />
                        </motion.div>

                        <motion.h1
                            className="relative flex flex-col items-center z-10"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                        >
                            <motion.span
                                className="block text-[clamp(3.5rem,14vw,10rem)] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-yellow-300 to-amber-500 drop-shadow-[0_0_60px_rgba(212,175,55,0.3)]"
                                animate={{
                                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                                }}
                                style={{
                                    backgroundSize: "200% 200%",
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                            >
                                DIVINE
                            </motion.span>
                            <motion.span
                                className="block text-[clamp(1.5rem,6vw,4rem)] font-serif italic text-amber-300/40 -mt-2 tracking-[0.3em] uppercase"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 1 }}
                            >
                                Partnership
                            </motion.span>
                        </motion.h1>

                        {/* Scroll indicator */}
                        <motion.div
                            className="absolute bottom-10 left-1/2 -translate-x-1/2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                        >
                            <motion.div
                                className="w-6 h-10 border-2 border-amber-500/30 rounded-full flex justify-center pt-2"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <motion.div
                                    className="w-1.5 h-3 bg-amber-500/50 rounded-full"
                                    animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* FOUR PILLARS */}
                <ParallaxGridSection />

                {/* LEGACY IN NUMBERS */}
                <section className="relative z-30 min-h-screen py-32 px-4 flex items-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent pointer-events-none" />

                    <div className="max-w-6xl mx-auto w-full relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -80 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ margin: "-100px", once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    className="h-px w-24 bg-gradient-to-r from-amber-500 to-transparent mb-8 origin-left"
                                />
                                <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 leading-tight">
                                    THE LEGACY IN NUMBERS
                                </h2>
                                <p className="text-amber-100/60 text-lg lg:text-xl font-serif mb-12 max-w-lg leading-relaxed">
                                    TECHUTOPIA 2026 is the culmination of years of innovation. We&apos;ve built an ecosystem that consistently delivers high-impact results for our partners.
                                </p>
                                <div className="space-y-5">
                                    {['100+ Premier Colleges', '1500+ National Applicants', '₹2,00,000+ Prize Pool'].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 + i * 0.15 }}
                                            className="flex items-center gap-4 text-xl text-amber-100/90 group"
                                        >
                                            <motion.div
                                                className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 shadow-[0_0_15px_rgba(212,175,55,1)]"
                                                animate={{ scale: [1, 1.3, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                            />
                                            <span className="group-hover:text-amber-300 transition-colors">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 80 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ margin: "-100px", once: true }}
                                transition={{ duration: 0.8 }}
                                className="grid grid-cols-3 gap-4 auto-rows-[140px]"
                            >
                                {bentoStats.map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        whileHover={{ scale: 0.98, borderColor: "rgba(251,191,36,0.5)" }}
                                        className={`${stat.size} bg-gradient-to-br from-amber-950/30 to-black/60 backdrop-blur-xl border border-amber-500/20 rounded-2xl flex flex-col items-center justify-center p-6 text-center group transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]`}
                                    >
                                        <div className="text-3xl lg:text-5xl font-bold text-amber-200 mb-2 group-hover:text-amber-100 transition-colors">
                                            <AnimatedCounter value={stat.value} />
                                        </div>
                                        <div className="text-xs tracking-widest text-amber-500/60 uppercase font-bold">{stat.label}</div>
                                    </motion.div>
                                ))}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="col-span-3 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 rounded-2xl flex items-center justify-center p-8 relative overflow-hidden group cursor-pointer"
                                >
                                    {/* Shimmer effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                                        animate={{ x: ["-100%", "200%"] }}
                                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
                                    />
                                    <div className="text-center text-black font-bold relative z-10">
                                        <motion.div
                                            className="text-sm tracking-[0.3em] mb-1 opacity-80"
                                            animate={{ letterSpacing: ["0.3em", "0.4em", "0.3em"] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            JOIN THE PANTHEON
                                        </motion.div>
                                        <div className="text-2xl lg:text-3xl">PARTNER WITH EXCELLENCE</div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CONTACT SECTION */}
                <section className="relative z-30 min-h-screen py-32 px-4 flex items-center justify-center overflow-hidden">
                    {/* Animated concentric rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        {[800, 600, 400].map((size, i) => (
                            <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                                style={{
                                    width: size,
                                    height: size,
                                    borderColor: `rgba(212,175,55,${0.05 + i * 0.05})`,
                                }}
                                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                                transition={{ duration: 40 + i * 20, repeat: Infinity, ease: "linear" }}
                            />
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 60 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ margin: "-100px", once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10 max-w-4xl w-full bg-gradient-to-b from-black/80 to-black/60 backdrop-blur-2xl border border-amber-500/30 rounded-[3rem] p-[clamp(2rem,8vw,5rem)] text-center shadow-[0_0_150px_rgba(212,175,55,0.1)] overflow-hidden"
                    >
                        {/* Inner glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="h-px w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"
                        />

                        <h2 className="text-[clamp(2rem,6vw,4rem)] font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-500 relative z-10">
                            SEAL THE COVENANT
                        </h2>
                        <p className="text-amber-100/60 text-lg md:text-xl font-serif mb-12 max-w-2xl mx-auto italic relative z-10">
                            Reach out to our orchestration team to reserve your place among the Titans of tech.
                        </p>

                        <div className="flex flex-col items-center gap-10 relative z-10">
                            <motion.div
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="text-amber-500 text-xs tracking-[0.4em] font-bold mb-4 uppercase">Sponsorship Lead</div>
                                <motion.div
                                    className="text-4xl md:text-5xl font-bold text-white mb-2"
                                    animate={{ textShadow: ["0 0 20px rgba(212,175,55,0)", "0 0 40px rgba(212,175,55,0.3)", "0 0 20px rgba(212,175,55,0)"] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    Devam Gupta
                                </motion.div>
                                <div className="text-amber-200/40 text-lg font-serif italic">Core – Sponsorships</div>
                            </motion.div>

                            <motion.div
                                className="flex flex-wrap justify-center gap-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                            >
                                <ContactButton icon="📞" label="+91 73400 15201" href="tel:+917340015201" />
                                <ContactButton icon="📧" label="devamgupta@uem.edu.in" href="mailto:devamgupta@uem.edu.in" />
                            </motion.div>
                        </div>
                    </motion.div>
                </section>
            </main>

            <PageNavigation />
        </div>
    );
}
