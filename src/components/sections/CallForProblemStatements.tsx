'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import Image from 'next/image';


// Partner logos - using public paths
const partners = [
    { name: "Ention", img: "/partners/ention-logo.webp" },
    { name: "WS Cube Tech", img: "/partners/ws.cubetech-logo.webp" },
    { name: "Devfolio", img: "/partners/devfolio-logo.webp" },
    { name: "ETHIndia", img: "/partners/ethindia-logo.webp" },
    { name: "Balsamiq", img: "/partners/balsamiq-logo.webp" },
    { name: "GeeksforGeeks", img: "/partners/geeksforgeeks-logo.webp" },
    { name: "BlockPen", img: "/partners/blockpen-logo.webp" },
    { name: "Fluxor", img: "/partners/fluxor-logo.webp" },
];

const API_URL = "https://script.google.com/macros/s/AKfycbx8L3OF8Bf_hLVGWZ5tGTMee6jnswrf3a2bh0SLdUnpQwrr_fsIVZffjqgwNanCNXOX/exec";

const contactCards = [
    { name: "Pratigya Bomb", title: "Problem Statement Core", phone: "+916264667506", email: "pratigyabomb@uem.edu.in", role: "HERALD OF CHALLENGES" },
    { name: "Shourya Bansal", title: "Tech & Support Core", phone: "+919024877439", email: "shouryabansal@uem.edu.in", role: "KEEPER OF CODES" },
    { name: "Agrima Kesari", title: "Hospitality Core", phone: "+917992054194", email: "agrima@uem.edu.in", role: "GUARDIAN OF HOSPITALITY" },
];

const greekSymbols = ['Ω', 'Δ', 'Φ', 'Ψ', 'Λ', 'Θ', 'Σ', 'Π'];

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

interface GreekSymbolData {
    symbol: string;
    fontSize: number;
    left: number;
    top: number;
}

// Animated input field with floating label - BLUE/GOLD theme
function AnimatedInput({ name, placeholder, type = "text", pattern, required = true }: {
    name: string;
    placeholder: string;
    type?: string;
    pattern?: string;
    required?: boolean;
}) {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    return (
        <motion.div
            className="relative group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-500/20 via-yellow-400/10 to-yellow-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
            />
            <input
                name={name}
                type={type}
                pattern={pattern}
                required={required}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => {
                    setIsFocused(false);
                    setHasValue(e.target.value.length > 0);
                }}
                onChange={(e) => setHasValue(e.target.value.length > 0)}
                className="peer w-full bg-neutral-900/60 border-2 border-yellow-500/20 rounded-xl px-5 py-4 pt-6 focus:outline-none focus:border-yellow-400/60 focus:bg-neutral-900/80 focus:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all placeholder-transparent text-neutral-100 text-sm font-light relative z-10"
                placeholder={placeholder}
            />
            <motion.label
                className={`absolute left-5 transition-all duration-300 pointer-events-none z-20 ${isFocused || hasValue
                    ? 'top-2 text-[10px] text-yellow-400 tracking-wider uppercase'
                    : 'top-1/2 -translate-y-1/2 text-sm text-neutral-400'
                    }`}
            >
                {placeholder}
            </motion.label>
            <motion.div
                className="absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
                initial={{ width: 0, x: "-50%" }}
                animate={{ width: isFocused ? "80%" : 0, x: "-50%" }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
}

// Countdown digit with flip animation - BLUE/GOLD theme
function CountdownDigit({ value, label }: { value: number; label: string }) {
    return (
        <motion.div
            className="relative bg-gradient-to-b from-neutral-800/80 via-neutral-900/90 to-neutral-950 border-2 border-yellow-500/30 px-4 py-5 sm:px-8 sm:py-7 rounded-2xl text-center min-w-[80px] sm:min-w-[110px] flex-1 overflow-hidden group"
            whileHover={{ scale: 1.02, borderColor: "rgba(212,175,55,0.6)" }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            {/* Decorative elements */}
            <div className="absolute left-2 top-3 bottom-3 w-[2px] bg-gradient-to-b from-yellow-500/40 via-yellow-400/20 to-yellow-500/40" />
            <div className="absolute right-2 top-3 bottom-3 w-[2px] bg-gradient-to-b from-yellow-500/40 via-yellow-400/20 to-yellow-500/40" />
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />

            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <motion.strong
                key={value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="block text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 tabular-nums font-[Cinzel] relative z-10"
            >
                {String(value).padStart(2, '0')}
            </motion.strong>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-yellow-400/70 mt-2 block font-[Cinzel] relative z-10">{label}</span>
        </motion.div>
    );
}

// Stat card with hover effect - BLUE/GOLD theme
function StatCard({ stat, index }: { stat: { label: string; value: string; icon: string }; index: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.03, y: -5 }}
            onMouseMove={handleMouseMove}
            className="group relative bg-gradient-to-b from-neutral-800/60 to-neutral-900/80 backdrop-blur-xl border border-yellow-500/25 p-4 sm:p-5 lg:p-6 rounded-2xl text-center overflow-hidden cursor-default flex flex-col items-center justify-center flex-1 min-w-[140px] sm:min-w-[160px]"
        >
            {/* Mouse follow glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            250px circle at ${mouseX}px ${mouseY}px,
                            rgba(212, 175, 55, 0.2),
                            transparent 80%
                        )
                    `
                }}
            />

            {/* Corner ornaments */}
            <div className="absolute top-1.5 left-1.5 text-yellow-500/40 text-[10px]">◢</div>
            <div className="absolute top-1.5 right-1.5 text-yellow-500/40 text-[10px]">◣</div>
            <div className="absolute bottom-1.5 left-1.5 text-yellow-500/40 text-[10px]">◥</div>
            <div className="absolute bottom-1.5 right-1.5 text-yellow-500/40 text-[10px]">◤</div>

            <motion.span
                className="text-2xl mb-2 block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            >
                {stat.icon}
            </motion.span>
            <strong className="block text-xl sm:text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-500 font-bold font-[Cinzel] group-hover:from-yellow-100 group-hover:to-yellow-400 transition-all w-full leading-tight uppercase tracking-tight whitespace-nowrap overflow-visible">
                {stat.value}
            </strong>
            <span className="text-[9px] sm:text-[10px] lg:text-[11px] uppercase tracking-[0.2em] lg:tracking-[0.25em] text-neutral-400 mt-1 block px-1 text-center w-full">
                {stat.label}
            </span>
        </motion.div>
    );
}

// Contact card with enhanced styling - BLUE/GOLD theme
function ContactCard({ card, index }: { card: typeof contactCards[0]; index: number }) {
    const [copied, setCopied] = useState<string | null>(null);

    const copyText = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ y: -8, boxShadow: "0 20px 60px rgba(212,175,55,0.15)" }}
            className="relative bg-gradient-to-b from-neutral-800/60 to-neutral-900/95 border border-yellow-500/25 rounded-3xl p-7 sm:p-9 text-center group overflow-hidden"
        >
            {/* Animated border glow */}
            <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, transparent 50%, rgba(212,175,55,0.2) 100%)',
                }}
            />

            {/* Temple roof */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />

            <motion.div
                className="text-yellow-500/80 text-4xl mb-4"
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
                ⚜
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-100 mb-1.5 font-[Cinzel] tracking-wider group-hover:text-yellow-200 transition-colors">{card.name}</h3>
            <p className="text-yellow-500/70 text-[10px] mb-1 uppercase tracking-[0.25em] font-[Cinzel]">{card.role}</p>
            <p className="text-neutral-400 text-sm mb-7">{card.title}</p>

            <div className="space-y-3">
                <motion.div
                    onClick={() => copyText(card.phone, 'phone')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer bg-neutral-900/60 border border-yellow-500/20 py-3 px-5 rounded-xl hover:border-yellow-400/50 hover:bg-neutral-800/50 transition-all flex items-center justify-center gap-3 text-neutral-300 text-sm group/btn"
                >
                    <span className="group-hover/btn:scale-110 transition-transform">📞</span>
                    <span className="font-mono">{card.phone.replace("+91", "+91 ")}</span>
                    <AnimatePresence>
                        {copied === 'phone' && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-green-400 text-xs"
                            >
                                ✓
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
                <motion.div
                    onClick={() => copyText(card.email, 'email')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer bg-neutral-900/60 border border-yellow-500/20 py-3 px-5 rounded-xl hover:border-yellow-400/50 hover:bg-neutral-800/50 transition-all flex items-center justify-center gap-3 text-neutral-300 text-xs break-all group/btn"
                >
                    <span className="group-hover/btn:scale-110 transition-transform">📧</span>
                    {card.email}
                    <AnimatePresence>
                        {copied === 'email' && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-green-400 text-xs"
                            >
                                ✓
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
}

export function CallForProblemStatements() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [submitText, setSubmitText] = useState("Submit to the Oracle");
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [greekSymbolsData, setGreekSymbolsData] = useState<GreekSymbolData[]>([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    useEffect(() => {
        setParticles(
            Array.from({ length: 50 }).map((_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 5 + 2,
                duration: Math.random() * 15 + 10,
                delay: Math.random() * 8,
            }))
        );

        setGreekSymbolsData(
            greekSymbols.map((symbol, i) => ({
                symbol,
                fontSize: Math.random() * 100 + 50,
                left: (i / greekSymbols.length) * 100,
                top: Math.random() * 80 + 10,
            }))
        );

        const handleScroll = () => {
            setShowScrollIndicator(window.scrollY <= 100);
        };
        window.addEventListener('scroll', handleScroll);

        const target = new Date("2026-03-12T17:00:00+05:30").getTime();
        const interval = setInterval(() => {
            const diff = target - Date.now();
            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setIsSubmitDisabled(true);
                setSubmitText("The Gates Have Closed");
                return;
            }
            setTimeLeft({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff / 3600000) % 24),
                minutes: Math.floor((diff / 60000) % 60),
                seconds: Math.floor((diff / 1000) % 60)
            });
        }, 1000);

        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        setIsSubmitDisabled(true);
        setSubmitText("The Oracle Speaks...");

        fetch(API_URL, { method: "POST", body: formData })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === "success") {
                    form.reset();
                    setFormSubmitted(true);
                    setTimeout(() => {
                        setFormSubmitted(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }, 3000);
                } else {
                    alert("❌ Error: " + (data.message || "Submission failed"));
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("❌ The Oracle could not receive your message. Please try again.");
            })
            .finally(() => {
                setSubmitText("Submit to the Oracle");
                setIsSubmitDisabled(false);
            });
    };

    return (
        <div ref={containerRef} className="min-h-screen w-full relative font-sans text-neutral-100 bg-[#030303] overflow-x-hidden selection:bg-yellow-500/30">

            {/* Top Border - GOLD */}
            <div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600/30 via-yellow-400/70 to-yellow-600/30 z-50" />

            {/* Animated Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    className="absolute inset-[-10%] bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-20"
                    style={{ y: backgroundY }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-neutral-900/80 to-[#030303]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

                {/* Floating Greek Symbols */}
                <div className="absolute inset-0 overflow-hidden">
                    {greekSymbolsData.map((data, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-yellow-500/10 font-[Cinzel] select-none"
                            style={{
                                fontSize: `${data.fontSize}px`,
                                left: `${data.left}%`,
                                top: `${data.top}%`,
                            }}
                            animate={{
                                y: [0, -50, 0],
                                opacity: [0.05, 0.15, 0.05],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 10 + i * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.7,
                            }}
                        >
                            {data.symbol}
                        </motion.div>
                    ))}
                </div>

                {/* Gold Particles */}
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            background: `radial-gradient(circle, rgba(212,175,55,0.8) 0%, rgba(212,175,55,0) 70%)`,
                            boxShadow: `0 0 ${p.size * 2}px rgba(212,175,55,0.5)`,
                        }}
                        animate={{
                            y: [0, -150, 0],
                            x: [0, Math.random() * 60 - 30, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1.5, 0.5],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: p.delay,
                        }}
                    />
                ))}

                {/* Dynamic aura */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(ellipse at 50% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 60%)`,
                    }}
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
            </div>

            {/* Scroll Indicator */}
            <AnimatePresence>
                {showScrollIndicator && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3"
                    >
                        <motion.div
                            className="w-8 h-14 rounded-full border-2 border-yellow-500/50 bg-black/50 backdrop-blur-sm flex justify-center pt-2.5"
                            animate={{ borderColor: ["rgba(212,175,55,0.3)", "rgba(212,175,55,0.7)", "rgba(212,175,55,0.3)"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <motion.div
                                animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_15px_rgba(212,175,55,1)]"
                            />
                        </motion.div>
                        <motion.span
                            className="text-[10px] tracking-[0.4em] uppercase text-yellow-400/70 font-[Cinzel]"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Descend
                        </motion.span>
                    </motion.div>
                )}
            </AnimatePresence>

            <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20 pt-28 sm:pt-36 pb-24">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">

                    {/* LEFT COLUMN */}
                    <div className="lg:col-span-7 flex flex-col justify-center pt-4 sm:pt-8">

                        {/* Hero Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="mb-14"
                        >
                            {/* Laurel Badge */}
                            <motion.div
                                className="flex items-center gap-3 mb-8"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <motion.span
                                    className="text-yellow-500/80 text-2xl transform -scale-x-100"
                                    animate={{ rotate: [-5, 5, -5] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    🌿
                                </motion.span>
                                <div className="px-5 py-2 rounded-full border border-yellow-500/40 bg-yellow-500/10 backdrop-blur-sm text-yellow-300 text-xs tracking-[0.25em] uppercase font-[Cinzel]">
                                    Seeking Divine Trials
                                </div>
                                <motion.span
                                    className="text-yellow-500/80 text-2xl"
                                    animate={{ rotate: [5, -5, 5] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    🌿
                                </motion.span>
                            </motion.div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 font-[Cinzel] tracking-tight leading-[1.05]">
                                <motion.span
                                    className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-300 to-yellow-600 drop-shadow-[0_4px_30px_rgba(212,175,55,0.4)] block"
                                    animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                                    style={{ backgroundSize: "200% 200%" }}
                                    transition={{ duration: 6, repeat: Infinity }}
                                >
                                    The Sacred Call
                                </motion.span>
                                <motion.span
                                    className="text-neutral-200 block"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    For Challenges
                                </motion.span>
                            </h1>

                            <motion.div
                                className="flex items-center gap-4 mb-8"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: 0.7, duration: 0.8 }}
                            >
                                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-yellow-500" />
                                <motion.span
                                    className="text-yellow-500 text-xl"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    ⚱
                                </motion.span>
                                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-yellow-500" />
                            </motion.div>

                            <motion.p
                                className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-xl leading-relaxed font-light border-l-2 border-yellow-500/50 pl-6 italic"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                &ldquo;The Oracle seeks trials worthy of modern heroes. Present your most formidable challenges, and watch as the brightest minds of the realm forge legendary solutions.&rdquo;
                            </motion.p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="flex flex-wrap gap-4 mb-16 w-full"
                        >
                            {[
                                { label: "Treasure", value: "₹2L", icon: "🏆" },
                                { label: "The Dates", value: "13–15", icon: "📜" },
                                { label: "Gathering", value: "Offline", icon: "🏛️" },
                                { label: "Arena", value: "UEM", icon: "⚔️" },
                            ].map((stat, i) => (
                                <StatCard key={i} stat={stat} index={i} />
                            ))}
                        </motion.div>

                        {/* Timeline */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="mb-16"
                        >
                            <h3 className="text-slate-200 font-[Cinzel] text-xl mb-8 flex items-center gap-3 tracking-wider">
                                <motion.span
                                    className="text-yellow-500"
                                    animate={{ rotate: [0, 360] }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                    Φ
                                </motion.span>
                                The Epic Journey
                            </h3>

                            <div className="relative">
                                <div className="hidden md:block absolute top-[24px] left-0 right-0 h-[3px] bg-gradient-to-r from-yellow-500/10 via-yellow-500/50 to-yellow-500/10 rounded-full" />
                                <div className="md:hidden absolute top-0 bottom-0 left-[22px] w-[3px] bg-gradient-to-b from-yellow-500/10 via-yellow-500/50 to-yellow-500/10 rounded-full" />

                                <div className="flex flex-col md:flex-row gap-8 md:gap-6 justify-between">
                                    {[
                                        { day: "Day I", event: "The Awakening", desc: "Kickoff & Ideation", symbol: "Ω" },
                                        { day: "Day II", event: "The Forge", desc: "Build & Mentorship", symbol: "Δ" },
                                        { day: "Day III", event: "The Triumph", desc: "Demos & Glory", symbol: "Ψ" },
                                    ].map((item, i) => (
                                        <motion.div
                                            key={i}
                                            className="relative z-10 flex md:flex-col items-start md:items-center gap-5 md:gap-4 flex-1 group"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.2 }}
                                        >
                                            <motion.div
                                                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-yellow-500/50 flex items-center justify-center shrink-0 group-hover:border-yellow-400 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-500"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                <span className="text-yellow-400 font-[Cinzel] text-base md:text-lg">{item.symbol}</span>
                                            </motion.div>
                                            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/70 p-3 lg:p-4 rounded-xl w-full md:text-center border border-yellow-500/20 backdrop-blur-sm shadow-xl flex flex-col justify-center items-start md:items-center">
                                                <span className="block text-yellow-400 font-bold text-[9px] lg:text-[10px] tracking-[0.2em] uppercase mb-1 font-[Cinzel]">{item.day}</span>
                                                <p className="text-slate-100 font-[Cinzel] text-sm lg:text-base mb-1 truncate max-w-full">{item.event}</p>
                                                <p className="text-slate-400 text-xs truncate max-w-full">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Countdown */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            <h3 className="text-slate-200 font-[Cinzel] text-xl mb-8 flex items-center gap-3 tracking-wider">
                                <motion.span
                                    className="text-yellow-500"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    Θ
                                </motion.span>
                                Time Until The Gates Close
                            </h3>

                            <div className="flex flex-wrap gap-4 sm:gap-5">
                                {Object.entries(timeLeft).map(([unit, value]) => (
                                    <CountdownDigit key={unit} value={value} label={unit} />
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN - FORM */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="lg:col-span-5 relative mt-8 lg:mt-0"
                    >
                        <div className="sticky top-32">
                            <motion.div
                                className="relative bg-gradient-to-b from-slate-800/60 to-slate-950/98 backdrop-blur-2xl border-2 border-yellow-500/30 p-7 sm:p-9 md:p-11 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden"
                                whileHover={{ boxShadow: "0 0 100px rgba(212,175,55,0.15)" }}
                            >
                                {/* Corner decorations */}
                                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-yellow-500/40 rounded-tl-3xl" />
                                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-yellow-500/40 rounded-tr-3xl" />
                                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-yellow-500/40 rounded-bl-3xl" />
                                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-yellow-500/40 rounded-br-3xl" />

                                {/* Inner glow */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-yellow-500/10 blur-[80px] rounded-full pointer-events-none" />

                                {/* Header ornament */}
                                <motion.div
                                    className="flex justify-center mb-3"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <span className="text-yellow-500/80 text-3xl">⚱</span>
                                </motion.div>

                                <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-b from-slate-100 to-yellow-400 text-center font-[Cinzel] tracking-wider">
                                    Inscribe Your Challenge
                                </h3>
                                <p className="text-center text-slate-400 text-xs mb-10 font-[Cinzel] tracking-[0.2em]">DECREE YOUR CHALLENGE TO THE REALM</p>

                                <AnimatePresence mode="wait">
                                    {formSubmitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="py-20 text-center"
                                        >
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 0.5 }}
                                                className="text-6xl mb-6"
                                            >
                                                ✨
                                            </motion.div>
                                            <h4 className="text-2xl font-[Cinzel] text-yellow-300 mb-3">Challenge Inscribed!</h4>
                                            <p className="text-slate-400">Your wisdom has been received by the Oracle.</p>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            onSubmit={handleSubmit}
                                            className="space-y-5"
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <AnimatedInput name="company" placeholder="Guild / Organization Name" />
                                            <AnimatedInput name="email" placeholder="Emissary Email Address" type="email" />
                                            <AnimatedInput name="contact_phone" placeholder="Contact Scroll (Phone)" type="tel" pattern="[0-9]{10}" />
                                            <AnimatedInput name="title" placeholder="Title of the Labor" />
                                            <AnimatedInput name="bounty" placeholder="Bounty Treasure (Optional)" required={false} />

                                            <motion.div
                                                className="relative group"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                            >
                                                <textarea
                                                    name="statement"
                                                    placeholder="Describe your challenge in detail..."
                                                    required
                                                    rows={5}
                                                    className="w-full bg-slate-900/60 border-2 border-yellow-500/20 rounded-xl px-5 py-4 focus:outline-none focus:border-yellow-400/60 focus:bg-slate-900/80 focus:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all placeholder:text-slate-500 resize-y min-h-[140px] text-slate-100 text-sm font-light"
                                                />
                                            </motion.div>

                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitDisabled}
                                                whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(212,175,55,0.4)" }}
                                                whileTap={{ scale: 0.98 }}
                                                className="relative w-full bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-slate-900 font-bold py-5 rounded-2xl border border-yellow-400/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8 font-[Cinzel] tracking-[0.2em] uppercase text-sm overflow-hidden group"
                                            >
                                                {/* Shimmer effect */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                                                    animate={{ x: ["-100%", "200%"] }}
                                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                                />
                                                <span className="relative z-10">{submitText}</span>
                                            </motion.button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Partners Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 mb-24 text-center"
                >
                    <div className="flex items-center justify-center gap-5 mb-10">
                        <motion.div
                            className="h-[1px] w-20 sm:w-40 bg-gradient-to-r from-transparent to-yellow-500"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                        />
                        <motion.span
                            className="text-yellow-500 font-[Cinzel] text-2xl"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            Λ
                        </motion.span>
                        <motion.div
                            className="h-[1px] w-20 sm:w-40 bg-gradient-to-l from-transparent to-yellow-500"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                        />
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-slate-100 to-yellow-500 font-[Cinzel] tracking-wider">Pioneers of Innovation</h2>
                    <p className="text-slate-400 mb-14 max-w-xl mx-auto text-sm font-[Cinzel]">ESTEEMED GUILDS THAT HAVE FORGED LEGENDS WITH US BEFORE</p>

                    <div className="relative overflow-hidden w-full py-6 border-y border-yellow-500/15 bg-slate-900/30 mask-gradient-x">
                        <div className="flex gap-20 w-max animate-scroll items-center">
                            {[...partners, ...partners].map((partner, index) => (
                                <motion.div
                                    key={index}
                                    className="flex-shrink-0 group relative"
                                    whileHover={{ scale: 1.15 }}
                                >
                                    <div className="absolute inset-0 bg-yellow-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <Image
                                        src={partner.img}
                                        alt={partner.name}
                                        width={200}
                                        height={100}
                                        className="relative h-14 w-auto object-contain filter grayscale brightness-75 opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-110 transition-all duration-500"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Contact Section */}
                <div className="mb-28">
                    <div className="flex items-center justify-center gap-5 mb-10">
                        <div className="h-[1px] w-20 sm:w-40 bg-gradient-to-r from-transparent to-yellow-500" />
                        <span className="text-yellow-500 font-[Cinzel] text-2xl">Σ</span>
                        <div className="h-[1px] w-20 sm:w-40 bg-gradient-to-l from-transparent to-yellow-500" />
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold mb-14 text-center bg-clip-text text-transparent bg-gradient-to-b from-slate-100 to-yellow-500 font-[Cinzel] tracking-wider">The Oracle's Emissaries</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-9 max-w-5xl mx-auto">
                        {contactCards.map((card, i) => (
                            <ContactCard key={i} card={card} index={i} />
                        ))}
                    </div>
                </div>

                {/* Map Section */}
                <div className="w-full mb-20">
                    <div className="flex items-center justify-center gap-5 mb-10">
                        <div className="h-[1px] w-20 sm:w-40 bg-gradient-to-r from-transparent to-yellow-500" />
                        <span className="text-yellow-500 font-[Cinzel] text-2xl">Π</span>
                        <div className="h-[1px] w-20 sm:w-40 bg-gradient-to-l from-transparent to-yellow-500" />
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-b from-slate-100 to-yellow-500 font-[Cinzel] tracking-wider">The Sacred Grounds</h2>

                    <motion.div
                        className="rounded-3xl overflow-hidden border-2 border-yellow-500/25 h-[350px] sm:h-[450px] relative group"
                        whileHover={{ borderColor: "rgba(212,175,55,0.5)" }}
                    >
                        <div className="absolute inset-0 pointer-events-none z-10 border-4 border-slate-950/70 rounded-3xl" />
                        <iframe
                            src="https://www.google.com/maps?q=JK+Lakshmipat+University&output=embed"
                            width="100%"
                            height="100%"
                            className="border-0 filter brightness-75 opacity-70 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-700"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </motion.div>
                </div>
            </main>

            {/* Bottom Border - GOLD */}
            <div className="fixed bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600/30 via-yellow-400/70 to-yellow-600/30 z-50" />

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 35s linear infinite;
                }
                .mask-gradient-x {
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                }
            `}</style>


        </div>
    );
}
