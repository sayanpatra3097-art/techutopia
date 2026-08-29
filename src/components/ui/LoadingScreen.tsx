'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useLoading } from '@/context/LoadingContext';

interface LoadingScreenProps {
    onComplete?: () => void;
    duration?: number;
}

export default function LoadingScreen({
    onComplete,
    duration = 13000,
}: LoadingScreenProps) {
    const { finishLoading } = useLoading();
    // Start visible by default - will hide if already shown
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        // Check if loading screen has already been shown this session
        const alreadyShown = sessionStorage.getItem('loadingScreenShown');

        // DEV: Uncomment to force loader every time for testing
        // const alreadyShown = null; 

        if (alreadyShown) {
            // Already shown - hide immediately
            setIsVisible(false);
            setShouldRender(false);
            finishLoading();
            return;
        }

        // Mark as shown and start timer
        sessionStorage.setItem('loadingScreenShown', 'true');
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                setShouldRender(false);
                finishLoading();
                onComplete?.();
            }, 500);
        }, duration);
        return () => clearTimeout(timer);
    }, [duration, onComplete, finishLoading]);

    if (!shouldRender) return null;

    // Timeline:
    // 0s - 3.5s: Owl Construction (Draws)
    // 3.5s - 5.5s: Owl Move & Shrink
    // 5.5s - 8.5s: Text Construction (Draws Lines)
    // 8.5s - 9.5s: Full Fill (Color fills in)
    // 9.5s - 13.0s: Hold

    const owlGroupVariants: Variants = {
        initial: {
            scale: 2.5,
            x: 750, // Center owl horizontally in SVG viewBox
            y: 50,  // Center owl vertically in SVG viewBox
        },
        move: {
            scale: 1,
            x: 0,
            y: 0,
            transition: {
                delay: 3.5,
                duration: 2.0,
                ease: 'easeInOut'
            }
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="loading-container"
                    className='loading-screen'
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1.0 } }}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 2389 694'
                        className='logo-svg-full'
                        style={{
                            width: '80%',
                            maxWidth: '1200px',
                            height: 'auto',
                            overflow: 'visible'
                        }}
                    >
                        {/* Owl Group - Centered Animation */}
                        <motion.g
                            variants={owlGroupVariants}
                            initial='initial'
                            animate='move'
                            style={{ transformOrigin: '310px 270px', willChange: 'transform' }}
                        >
                            <g transform="scale(1.86641 1.86559)">
                                <motion.path
                                    key="owl-0"
                                    d="M220.69 120.2C231.718 120.366 234.391 123.831 243.915 127.497C245.234 128.005 250.518 122.144 253.398 121.407C257.311 124.394 253.924 135.701 252.32 139.685L254.625 145.456C251.757 143.379 248.693 141.348 245.76 139.344C239.146 142.074 228.021 154.174 222.473 159.631C218.422 161.976 203.54 139.75 196.188 140.5C193.093 140.816 192.113 142.308 189.659 144.491L189.047 144.45C188.396 133.968 186.876 130.094 189.128 119.952C199.466 129.881 199.025 128.113 211.074 122.259C212.413 121.609 218.819 120.544 220.69 120.2Z"

                                    stroke="#E31B23"   /* Lighter Red Stroke */
                                    strokeWidth="2"
                                    strokeLinejoin="miter"
                                    strokeLinecap="square"
                                    fill="#E31B23"     /* Lighter Red Fill */

                                    initial={{ pathLength: 0, fillOpacity: 0 }}
                                    animate={{ pathLength: 1, fillOpacity: 1 }}
                                    transition={{
                                        pathLength: { delay: 0.7621133667911443, duration: 2.5, ease: "easeInOut" },
                                        fillOpacity: { delay: 9.0, duration: 1.0 }
                                    }}
                                />
                                <motion.path
                                    key="owl-1"
                                    d="M246.752 142.523L247.141 142.893C247.794 144.918 247.39 149.226 247.286 151.54C239.172 161.354 235.939 154.916 228.482 163.97C223.749 158.553 238.449 147.157 242.536 145.322C243.607 144.841 245.694 143.222 246.752 142.523Z"

                                    stroke="#E31B23"   /* Lighter Red Stroke */
                                    strokeWidth="2"
                                    strokeLinejoin="miter"
                                    strokeLinecap="square"
                                    fill="#E31B23"     /* Lighter Red Fill */

                                    initial={{ pathLength: 0, fillOpacity: 0 }}
                                    animate={{ pathLength: 1, fillOpacity: 1 }}
                                    transition={{
                                        pathLength: { delay: 1.43147329221583, duration: 2.5, ease: "easeInOut" },
                                        fillOpacity: { delay: 9.0, duration: 1.0 }
                                    }}
                                />
                                <motion.path
                                    key="owl-2"
                                    d="M195.558 141.698C202.828 149.72 214.418 149.568 214.774 164.043C213.841 163.543 212.524 162.268 212.065 161.387C210.029 157.48 200.084 157.224 197.299 154.472C194.733 151.938 195.299 145.237 195.558 141.698Z"

                                    stroke="#E31B23"   /* Lighter Red Stroke */
                                    strokeWidth="2"
                                    strokeLinejoin="miter"
                                    strokeLinecap="square"
                                    fill="#E31B23"     /* Lighter Red Fill */

                                    initial={{ pathLength: 0, fillOpacity: 0 }}
                                    animate={{ pathLength: 1, fillOpacity: 1 }}
                                    transition={{
                                        pathLength: { delay: 0.6102277849411286, duration: 2.5, ease: "easeInOut" },
                                        fillOpacity: { delay: 9.0, duration: 1.0 }
                                    }}
                                />
                                <motion.path
                                    key="text-0"
                                    d="M336.851 111.759L337.558 112.843C337.691 119.134 336.836 126.314 335.371 132.444C323.466 182.249 272.255 191.729 233.404 214.637C234.316 221.437 235.757 226.657 236.502 234.168C233.315 228.807 230.103 223.933 226.661 218.75C208.629 228.924 196.259 244.639 187.5 263.001C192.735 236.408 192.309 227.594 208.213 203.316C192.271 193.622 179.082 188.864 162.316 181.583C129.312 166.836 117.34 152.677 114.887 116.593C132.043 142.673 168.889 143.603 192.974 160.26C205.691 169.055 211.33 175.79 220.568 187.882C232.001 174.6 246.195 164.193 262.053 156.815C290.267 143.69 317.206 138.392 336.851 111.759Z"

                                    stroke="#E31B23"   /* Lighter Red Stroke */
                                    strokeWidth="1.5"
                                    strokeLinejoin="miter"
                                    strokeLinecap="square"
                                    fill="#E31B23"     /* Lighter Red Fill */

                                    initial={{ pathLength: 0, fillOpacity: 0 }}
                                    animate={{ pathLength: 1, fillOpacity: 1 }}
                                    transition={{
                                        pathLength: { delay: 0.6102277849411286, duration: 2.5, ease: "easeInOut" },
                                        fillOpacity: { delay: 9.0, duration: 1.0 }
                                    }}
                                />
                            </g>
                        </motion.g>

                        {/* Text Group - Line Following Animation */}
                        <motion.g>
                            <motion.text
                                x="1350"
                                y="380"
                                textAnchor="middle"
                                style={{
                                    fontFamily: 'Cinzel, serif',
                                    fontSize: '120px',
                                    letterSpacing: '0.1em',
                                    fontWeight: 'bold',
                                }}
                                fill="#ffecd1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 5.5, duration: 2 }}
                            >
                                TECHUTOPIA 2026
                            </motion.text>
                        </motion.g>
                    </svg>

                    {/* Particles - empty on SSR, populated on client */}
                    <div className='particles' />
                </motion.div>
            )}
            {/* Skip Button */}
            {isVisible && (
                <motion.button
                    key="skip-button"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 2, duration: 0.5 }} // Delay to not overwhelm immediately
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(() => {
                            setShouldRender(false);
                            finishLoading();
                            onComplete?.();
                        }, 500);
                    }}
                    style={{
                        position: 'fixed',
                        bottom: '5vh',
                        right: '5vw',
                        zIndex: 10001, // Above everything
                        background: 'transparent',
                        border: '1px solid #d4af37',
                        color: '#d4af37',
                        padding: '10px 24px',
                        fontFamily: 'Cinzel, serif',
                        fontSize: '1rem',
                        letterSpacing: '0.1rem',
                        cursor: 'pointer',
                        backdropFilter: 'blur(5px)',
                        boxShadow: '0 0 15px rgba(212, 175, 55, 0.2)',
                    }}
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        boxShadow: '0 0 25px rgba(212, 175, 55, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    SKIP INTRO
                </motion.button>
            )}
        </AnimatePresence>
    );
}
