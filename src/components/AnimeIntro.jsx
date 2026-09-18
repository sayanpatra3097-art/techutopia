import { useState, useEffect, useRef } from 'react'

// Module-level singleton guard to prevent double-execution even across strict mode or re-renders
let globalIntroExecuted = false
try {
  if (typeof window !== 'undefined' && sessionStorage.getItem('techutopia_intro_done') === 'true') {
    globalIntroExecuted = true
  }
} catch (e) { }

export default function AnimeIntro({ onComplete }) {
  // Sequence:
  // 0. 'black-hold' (0ms - 650ms): Pure pitch black screen holding so the viewer settles in
  // 1. 'katana-slash' (650ms - 1700ms): Katana cut animation sweeps across screen with sparks & blade trail
  // 2. 'clouds-part' (1700ms - 2700ms): Japanese anime clouds part cleanly to left and right
  // 3. 'text-fade-in' (2700ms - 4400ms): TechUtopia text awakens in smooth fade-in animation
  // 4. 'fade-out' (4400ms - 5200ms): Clean dissolve into the hero realm
  // 5. 'done' (5200ms): Fully unmounted, never repeats
  const [phase, setPhase] = useState(() => (globalIntroExecuted ? 'done' : 'black-hold'))
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const handleFinish = () => {
    globalIntroExecuted = true
    try {
      sessionStorage.setItem('techutopia_intro_done', 'true')
    } catch (e) { }
    setPhase('done')
    if (onCompleteRef.current) onCompleteRef.current()
  }

  useEffect(() => {
    if (globalIntroExecuted) {
      if (onCompleteRef.current) onCompleteRef.current()
      return
    }

    // Step 1: Wait a few milliseconds (650ms) on pure black, then trigger katana cut
    const t1 = setTimeout(() => {
      setPhase('katana-slash')
    }, 650)

    // Step 2: Clouds part cleanly (1700ms)
    const t2 = setTimeout(() => {
      setPhase('clouds-part')
    }, 1700)

    // Step 3: TechUtopia text visible in smooth fade-in (2700ms)
    const t3 = setTimeout(() => {
      setPhase('text-fade-in')
    }, 2700)

    // Step 4: Intro overlay dissolves smoothly (4400ms)
    const t4 = setTimeout(() => {
      setPhase('fade-out')
    }, 4400)

    // Step 5: Complete & unmount (5200ms)
    const t5 = setTimeout(() => {
      handleFinish()
    }, 5200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
      clearTimeout(t5)
    }
  }, []) // Empty deps ensures this runs strictly ONCE on mount

  if (phase === 'done') return null

  const isSlashing = phase === 'katana-slash'
  const isCloudsParted = phase === 'clouds-part' || phase === 'text-fade-in' || phase === 'fade-out'
  const isTextFadingIn = phase === 'text-fade-in'
  const isFadingOut = phase === 'fade-out'

  return (
    <div className={`anime-intro ${isFadingOut ? 'anime-intro--dissolve' : ''}`}>
      {/* 1st: Pure Pitch Black Background */}
      <div className="anime-intro__pure-black-bg" />

      {/* Skip Button */}
      <button
        type="button"
        className="anime-intro__skip-btn"
        onClick={handleFinish}
        aria-label="Skip Intro"
      >
        SKIP INTRO ⚡
      </button>

      {/* 1st: The Katana Cut Animation (starts 650ms after website open) */}
      <div
        className={`katana-slash-container ${isSlashing ? 'is-slashing' : phase !== 'black-hold' ? 'is-slashed' : ''
          }`}
      >
        <div className="katana-blade-trail" />
        <div className="katana-slash-line" />
        <div className="katana-sparks katana-sparks--1" />
        <div className="katana-sparks katana-sparks--2" />
      </div>

      {/* 2nd: Japanese Anime Clouds that part ONCE left and right */}
      <div
        className={`anime-cloud anime-cloud--left ${isCloudsParted ? 'anime-cloud--part-left' : ''
          }`}
      >
        <svg viewBox="0 0 800 1000" fill="none" preserveAspectRatio="none">
          <path
            d="M0,0 L720,0 C660,150 790,260 690,400 C610,520 760,680 630,800 C530,900 690,950 610,1000 L0,1000 Z"
            fill="url(#cloudGradLeftPure)"
          />
          <path
            d="M0,80 L560,80 C510,210 640,330 550,470 C490,570 630,710 510,830 C440,910 560,950 490,1000 L0,1000 Z"
            fill="rgba(18, 22, 36, 0.85)"
          />
          <defs>
            <linearGradient id="cloudGradLeftPure" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#020305" />
              <stop offset="65%" stopColor="#0b0e18" />
              <stop offset="100%" stopColor="#141a2c" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div
        className={`anime-cloud anime-cloud--right ${isCloudsParted ? 'anime-cloud--part-right' : ''
          }`}
      >
        <svg viewBox="0 0 800 1000" fill="none" preserveAspectRatio="none">
          <path
            d="M800,0 L80,0 C140,150 10,260 110,400 C190,520 40,680 170,800 C270,900 110,950 190,1000 L800,1000 Z"
            fill="url(#cloudGradRightPure)"
          />
          <path
            d="M800,80 L240,80 C290,210 160,330 250,470 C310,570 170,710 290,830 C360,910 240,950 310,1000 L800,1000 Z"
            fill="rgba(18, 22, 36, 0.85)"
          />
          <defs>
            <linearGradient id="cloudGradRightPure" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#020305" />
              <stop offset="65%" stopColor="#0b0e18" />
              <stop offset="100%" stopColor="#141a2c" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 3rd: TechUtopia text visible in a smooth fade-in animation */}
      <div
        className={`anime-intro__center ${isTextFadingIn || isFadingOut ? 'anime-intro__center--fade-in' : ''
          }`}
      >

        <div className="anime-intro__logo">
          <div className="anime-intro__brand">TECH</div>
          <div className="anime-intro__brand anime-intro__brand--utopia">UTOPIA</div>
        </div>

        <div className="anime-intro__sub">
          <span className="anime-intro__sub-dot" />
          <span>AWAKENING PROTOCOL • UEM JAIPUR</span>
        </div>
      </div>
    </div>
  )
}

