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
    const [isVisible, setIsVisible] = useState(true);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        const alreadyShown = sessionStorage.getItem('loadingScreenShown');
        if (alreadyShown) {
            setIsVisible(false);
            setShouldRender(false);
            finishLoading();
            return;
        }

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
    // 0s - 3.5s: TU Lightning Logo Construction (Red Stroke Line Drawing)
    // 3.5s - 5.5s: Logo Move & Shrink to Position
    // 5.5s - 8.5s: Text Construction ("TECHUTOPIA 2026")
    // 8.5s - 9.5s: Full Color Fill (Red & Black Shading)
    // 9.5s - 13.0s: Hold

    const logoGroupVariants: Variants = {
        initial: {
            scale: 2.2,
            x: 750,
            y: 50,
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

    const outerD = "M481 4L477 20L468 42L449 75L449 82L441 105L409 168L412 170L451 161L400 271L366 333L339 370L317 391L293 406L272 414L254 418L221 417L205 412L188 402L178 391L172 378L169 360L169 339L163 352L157 374L156 404L161 423L167 434L172 441L187 455L173 449L161 441L145 424L130 399L125 379L125 359L131 333L128 332L96 346L117 280L121 261L120 260L96 270L84 273L126 175L70 184L52 163L74 113L80 103L259 90L312 84L362 75L393 66L429 49L458 28L481 5Z";
    const innerD = "M327 152L323 151L303 159L278 174L266 187L238 241L241 242L260 238L244 280L235 322L235 334L239 347L246 352L255 350L265 339L277 320L322 227L323 224L320 223L288 233L326 153Z";
    const facetsD = "M480 9L471 35L456 65L438 89L420 107L392 127L354 203L356 205L389 196L391 196L389 200L390 198L388 197L382 201L333 217L310 227L302 227L290 233L297 226L304 211L306 212L311 205L336 160L345 152L349 150L350 152L354 147L359 148L360 152L372 155L374 149L379 148L380 145L378 145L381 144L387 129L331 155L332 148L312 155L274 174L272 171L262 171L302 148L302 146L240 153L194 161L176 196L178 197L216 183L198 202L197 205L202 208L207 200L164 282L167 283L202 272L190 301L182 328L179 345L179 372L187 396L203 411L188 402L178 391L173 381L169 359L170 340L166 341L166 347L160 353L156 352L155 357L164 327L180 290L175 290L139 303L143 297L146 300L153 297L190 230L181 223L177 230L192 203L191 201L188 203L183 202L184 204L182 205L176 205L173 208L167 209L192 160L186 153L182 153L178 157L182 147L321 132L354 126L384 117L415 99L441 74L460 48L480 10Z M464 29L463 30Z M138 151L129 174L71 184L53 163L137 152Z M385 208L353 275L358 265L357 263L361 259L359 256L354 262L355 266L351 269L327 321L309 347L285 367L270 374L254 378L239 378L230 375L222 368L218 355L219 357L222 354L226 355L226 357L232 357L240 362L254 353L276 324L281 321L296 292L299 290L302 292L326 242L330 244L347 243L349 246L354 246L355 244L355 247L361 244L361 247L368 233L369 235L371 233L369 230L375 224L375 221L373 221L375 217L379 216L380 218L383 213L382 209L384 209Z M132 243L135 242L127 251L112 262L99 262L96 264L94 261L131 244Z M134 330L130 357L130 390L137 412L129 396L125 379L125 359L133 331Z";

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="loading-container"
                    className='loading-screen'
                    style={{ backgroundColor: '#050508' }}
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
                        {/* TU Logo Group - Centered Red & Black Animation */}
                        <motion.g
                            variants={logoGroupVariants}
                            initial='initial'
                            animate='move'
                            style={{ transformOrigin: '265px 230px', willChange: 'transform' }}
                        >
                            <g transform="scale(1.2) translate(10, 10)">
                                {/* Facets & 3D Shading (Black / Dark Metallic) */}
                                <motion.path
                                    key="logo-facets"
                                    d={facetsD}
                                    stroke="#800000"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    fill="#121216"
                                    initial={{ pathLength: 0, fillOpacity: 0 }}
                                    animate={{ pathLength: 1, fillOpacity: 1 }}
                                    transition={{
                                        pathLength: { delay: 0.8, duration: 2.5, ease: "easeInOut" },
                                        fillOpacity: { delay: 8.5, duration: 1.0 }
                                    }}
                                />

                                {/* Main Logo Emblem (Red Neon Stroke & Red Metallic Fill) */}
                                <motion.path
                                    key="logo-main"
                                    d={`${outerD} ${innerD}`}
                                    fillRule="evenodd"
                                    stroke="#E31B23"
                                    strokeWidth="2.5"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    fill="#E31B23"
                                    style={{
                                        filter: 'drop-shadow(0 0 12px rgba(227, 27, 35, 0.7))'
                                    }}
                                    initial={{ pathLength: 0, fillOpacity: 0 }}
                                    animate={{ pathLength: 1, fillOpacity: 1 }}
                                    transition={{
                                        pathLength: { delay: 0.5, duration: 2.5, ease: "easeInOut" },
                                        fillOpacity: { delay: 8.5, duration: 1.0 }
                                    }}
                                />
                            </g>
                        </motion.g>

                        {/* Text Group - Red/Gold Typography */}
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
                                    filter: 'drop-shadow(0 0 20px rgba(227, 27, 35, 0.6))'
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

                    {/* Particles */}
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
                    transition={{ delay: 2, duration: 0.5 }}
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
                        zIndex: 10001,
                        background: 'transparent',
                        border: '1px solid #E31B23',
                        color: '#E31B23',
                        padding: '10px 24px',
                        fontFamily: 'Cinzel, serif',
                        fontSize: '1rem',
                        letterSpacing: '0.1rem',
                        cursor: 'pointer',
                        backdropFilter: 'blur(5px)',
                        boxShadow: '0 0 15px rgba(227, 27, 35, 0.3)',
                    }}
                    whileHover={{
                        scale: 1.05,
                        backgroundColor: 'rgba(227, 27, 35, 0.15)',
                        boxShadow: '0 0 25px rgba(227, 27, 35, 0.6)'
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    SKIP INTRO
                </motion.button>
            )}
        </AnimatePresence>
    );
}
