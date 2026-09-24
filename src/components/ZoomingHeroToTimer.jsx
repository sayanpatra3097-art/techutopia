import { useState, useEffect, useRef } from 'react'
import doorImg from '../assets/door.webp'
import timerBg23 from '../assets/23.webp'

// Eagerly resolve anime dimension images from assets folder (41 numbered webp images)
const bgModules = import.meta.glob('../assets/*.webp', { eager: true, import: 'default' })

// Sort all numbered webp images in natural order (1, 2, 3 ... 42)
const animeImages = Object.keys(bgModules)
  .filter((k) => /assets\/\d+\.webp$/.test(k))
  .sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)\.webp/)[1], 10)
    const numB = parseInt(b.match(/(\d+)\.webp/)[1], 10)
    return numA - numB
  })
  .map((k) => bgModules[k])

export default function ZoomingHeroToTimer({ isUnlocked, onExploreMore }) {
  const trackRef = useRef(null)

  // DOM Refs for direct GPU-composited style manipulation (Zero React re-render during scroll)
  const leftWingRef = useRef(null)
  const rightWingRef = useRef(null)
  const doorsPortalRef = useRef(null)
  const contentStageRef = useRef(null)
  const scrollPromptRef = useRef(null)
  const layerRefA = useRef(null)
  const layerRefB = useRef(null)
  const timerDestinationRef = useRef(null)
  const scrollApparatusRef = useRef(null)
  const sealRuptureRef = useRef(null)
  const letterContentRef = useRef(null)
  const curlLeftRef = useRef(null)
  const curlRightRef = useRef(null)
  const dockTextRef = useRef(null)

  // Track active layer indices to avoid redundant DOM updates
  const curActiveIdx = useRef(-1)
  const curNextIdx = useRef(-1)

  // Target Fest Date for Countdown: October 5 – 6, 2026
  const targetDate = new Date('2026-10-05T09:00:00')

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Pre-decode all anime images into GPU texture memory on mount for silky-smooth 120fps zoom
  useEffect(() => {
    animeImages.forEach((src) => {
      const img = new Image()
      img.src = src
      if (img.decode) {
        img.decode().catch(() => {})
      }
    })
  }, [])

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const diff = targetDate - now

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / 1000 / 60) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 860)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 60–120 FPS Silky-Smooth GPU Scroll Driver (Multi-Image Continuous Zoom Tunnel)
  useEffect(() => {
    let ticking = false

    const applyScrollStyles = () => {
      ticking = false
      const el = trackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable <= 0) return

      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / totalScrollable))
      const mobile = window.innerWidth <= 860

      // 1. 3D Ancient Sanctuary Doors Swing (Opens as scroll begins)
      const doorAngle = Math.min(95, p * (mobile ? 920 : 820))
      const doorOpacity = Math.max(0, 1 - p * (mobile ? 11 : 8.5))
      const doorTranslateY = -p * (mobile ? 160 : 110)

      if (leftWingRef.current) {
        leftWingRef.current.style.transform = `rotateY(-${doorAngle}deg)`
      }
      if (rightWingRef.current) {
        rightWingRef.current.style.transform = `rotateY(${doorAngle}deg)`
      }
      if (doorsPortalRef.current) {
        doorsPortalRef.current.style.opacity = doorOpacity
        doorsPortalRef.current.style.transform = `translateY(${doorTranslateY}px)`
        doorsPortalRef.current.style.pointerEvents = p > 0.12 ? 'none' : 'auto'
      }

      // 2. TECHUTOPIA Title (Remains prominently visible during door open & dimensions zoom, fades just before countdown)
      const fadeStart = mobile ? 0.42 : 0.48
      const fadeEnd = mobile ? 0.49 : 0.54

      let heroOpacity = 1
      if (p < fadeStart) {
        // Fully visible once doors open and throughout all anime zooming dimensions
        heroOpacity = 1
      } else if (p <= fadeEnd) {
        // Fades away smoothly just before the countdown shrine opens
        heroOpacity = Math.max(0, 1 - (p - fadeStart) / (fadeEnd - fadeStart))
      } else {
        heroOpacity = 0
      }

      const heroTranslateY = -Math.min(45, p * 70)
      const heroScale = 1 + (p > fadeStart ? (p - fadeStart) * 0.4 : p * 0.04)

      if (contentStageRef.current) {
        contentStageRef.current.style.opacity = heroOpacity
        contentStageRef.current.style.transform = `translateY(${heroTranslateY}px) scale(${heroScale})`
        contentStageRef.current.style.pointerEvents = (p > fadeStart || p < 0.02) ? 'none' : 'auto'
      }
      if (scrollPromptRef.current) {
        // Bottom "SCROLL TO ENTER" indicator fades out promptly as scrolling begins
        const promptOpacity = Math.max(0, 1 - p * 12)
        scrollPromptRef.current.style.opacity = promptOpacity
        scrollPromptRef.current.style.pointerEvents = p > 0.06 ? 'none' : 'auto'
      }

      // 3. CONTINUOUS 35+ ANIME DIMENSION ZOOMING TUNNEL
      const zoomStart = 0.02
      const zoomEnd = mobile ? 0.52 : 0.60
      const totalLayers = animeImages.length // 41 images!

      const clamped = Math.max(0, Math.min(1, (p - zoomStart) / (zoomEnd - zoomStart)))
      const exactPos = clamped * (totalLayers - 1)
      const activeIndex = Math.min(totalLayers - 1, Math.floor(exactPos))
      const nextIndex = Math.min(totalLayers - 1, activeIndex + 1)
      const stepProgress = exactPos - activeIndex

      // Active layer: zooms in from 1.0 to 2.45x
      const activeScale = 1 + stepProgress * 1.45
      const activeOpacity = Math.max(0, 1 - stepProgress * 1.08)

      // Next layer: zooms in from 0.85 to 1.0
      const nextScale = 0.85 + stepProgress * 0.35
      const nextOpacity = Math.min(1, stepProgress * 1.35)

      // Swap texture URLs only when index changes (O(1), pre-warmed in memory)
      if (activeIndex !== curActiveIdx.current) {
        curActiveIdx.current = activeIndex
        if (layerRefA.current && animeImages[activeIndex]) {
          const isLast = activeIndex >= totalLayers - 1
          const bgGrad = isLast
            ? 'radial-gradient(circle at center, rgba(10, 12, 20, 0.3) 0%, rgba(5, 6, 10, 0.96) 85%)'
            : 'radial-gradient(circle at center, rgba(0, 0, 0, 0.05) 0%, rgba(4, 5, 10, 0.28) 85%)'
          layerRefA.current.style.backgroundImage = `${bgGrad}, url(${animeImages[activeIndex]})`
        }
      }
      if (nextIndex !== curNextIdx.current) {
        curNextIdx.current = nextIndex
        if (layerRefB.current && animeImages[nextIndex]) {
          const isLast = nextIndex >= totalLayers - 1
          const bgGrad = isLast
            ? 'radial-gradient(circle at center, rgba(10, 12, 20, 0.3) 0%, rgba(5, 6, 10, 0.96) 85%)'
            : 'radial-gradient(circle at center, rgba(0, 0, 0, 0.05) 0%, rgba(4, 5, 10, 0.28) 85%)'
          layerRefB.current.style.backgroundImage = `${bgGrad}, url(${animeImages[nextIndex]})`
        }
      }

      // Direct GPU transform update on image layers
      if (layerRefA.current) {
        layerRefA.current.style.transform = `scale(${activeScale}) translateZ(0)`
        layerRefA.current.style.opacity = activeOpacity
      }
      if (layerRefB.current) {
        layerRefB.current.style.transform = `scale(${nextScale}) translateZ(0)`
        layerRefB.current.style.opacity = nextOpacity
      }

      // 4. ROYAL COUNTDOWN SHRINE TIMER ENTRANCE & SCALE (p: 0.50 to 1.0)
      const timerStart = mobile ? 0.48 : 0.54
      const timerOpacity = p > timerStart ? Math.min(1, (p - timerStart) * (mobile ? 12 : 8)) : 0
      const timerScale = 0.92 + (p > timerStart ? Math.min(0.08, (p - timerStart) * 0.22) : 0)

      if (timerDestinationRef.current) {
        timerDestinationRef.current.style.opacity = timerOpacity
        timerDestinationRef.current.style.transform = `translate(-50%, -50%) scale(${timerScale})`
        timerDestinationRef.current.style.pointerEvents = p > timerStart ? 'auto' : 'none'
      }

      // 5. Royal Scroll Parchment Unrolling (p: 0.54 to 0.88)
      const rollStart = mobile ? 0.52 : 0.58
      const rollEnd = mobile ? 0.86 : 0.90
      const currentRoll = Math.max(0, Math.min(1, (p - rollStart) / (rollEnd - rollStart)))

      if (scrollApparatusRef.current) {
        scrollApparatusRef.current.style.setProperty('--roll', currentRoll.toFixed(4))
      }
      if (curlLeftRef.current) {
        curlLeftRef.current.style.opacity = currentRoll > 0.03 ? '1' : '0'
      }
      if (curlRightRef.current) {
        curlRightRef.current.style.opacity = currentRoll > 0.03 ? '1' : '0'
      }
      if (sealRuptureRef.current) {
        sealRuptureRef.current.style.opacity = (currentRoll > 0.02 && currentRoll < 0.28) ? '1' : '0'
        sealRuptureRef.current.style.transform = `scaleY(${1 + currentRoll * 2})`
      }
      if (letterContentRef.current) {
        const contentOpacity = Math.min(1, Math.max(0, (currentRoll - 0.08) / 0.55))
        letterContentRef.current.style.opacity = contentOpacity
        letterContentRef.current.style.transform = `translateY(${(1 - contentOpacity) * 18}px)`
      }
      if (dockTextRef.current) {
        dockTextRef.current.textContent = currentRoll < 0.95 ? '• SCROLL TO REVEAL' : 'OCTOBER 5–6, 2026'
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(applyScrollStyles)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    applyScrollStyles()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  const handleExploreClick = () => {
    if (onExploreMore) onExploreMore()
  }

  const handleRollTo = (target) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const totalScrollable = rect.height - window.innerHeight
    const mobile = window.innerWidth <= 860
    const targetProgress = target === 'open' ? (mobile ? 0.88 : 0.90) : (mobile ? 0.52 : 0.58)
    const targetScrollY = window.scrollY + rect.top + (targetProgress * totalScrollable)
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
  }

  const clockItems = [
    { value: pad(timeLeft.days), label: 'DAYS' },
    { value: pad(timeLeft.hours), label: 'HOURS' },
    { value: pad(timeLeft.minutes), label: 'MINS' },
    { value: pad(timeLeft.seconds), label: 'SECS' }
  ]

  return (
    <div className="zoom-hero-track" ref={trackRef} id="door-hero">
      {/* Sticky 100vh Fullscreen Viewport */}
      <div className="zoom-hero-sticky">
        {/* ───── MULTI-IMAGE CONTINUOUS 35+ DIMENSION ZOOMING BACKGROUNDS ───── */}
        <div className="zoom-hero__visuals-container">
          {/* Active Zooming Dimension Layer */}
          <div
            ref={layerRefA}
            className="zoom-hero__image-layer"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(0, 0, 0, 0.05) 0%, rgba(4, 5, 10, 0.28) 85%), url(${animeImages[0] || timerBg23})`,
              transform: 'scale(1) translateZ(0)',
              opacity: 1
            }}
          />

          {/* Emerging Next Dimension Layer */}
          <div
            ref={layerRefB}
            className="zoom-hero__image-layer"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(0, 0, 0, 0.05) 0%, rgba(4, 5, 10, 0.28) 85%), url(${animeImages[1] || timerBg23})`,
              transform: 'scale(0.85) translateZ(0)',
              opacity: 0
            }}
          />

          {/* Warm Solar Mana Glow Aura */}
          <div
            className="zoom-hero__color-aura"
            style={{
              boxShadow: 'inset 0 0 160px rgba(255, 120, 0, 0.18), 0 0 90px rgba(255, 175, 20, 0.14)'
            }}
          />
        </div>

        {/* ───── INITIAL 3D SANCTUARY DOORS: THE SOLO LEVELING CARTENON DOUBLE DUNGEON GATE ───── */}
        <div
          ref={doorsPortalRef}
          className="zoom-hero__doors-portal"
        >
          {/* Ancient Dungeon Portal - Left Wing */}
          <div
            ref={leftWingRef}
            className="door-wing door-wing--left door-wing--fullscreen sl-door-wing sl-door-wing--left"
          >
            <div className="door-wing__inner sl-door-panel sl-door-panel--left">
              <div className="sl-door__full-canvas sl-door__full-canvas--left">
                <img
                  src={doorImg}
                  alt="Ancient Dungeon Portal Gate Left"
                  className="sl-door__image"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="sl-door__mana-cracks sl-door__mana-cracks--left" />
              <div className="sl-door__iron-brace" />
            </div>
          </div>

          {/* Ancient Dungeon Portal - Right Wing */}
          <div
            ref={rightWingRef}
            className="door-wing door-wing--right door-wing--fullscreen sl-door-wing sl-door-wing--right"
          >
            <div className="door-wing__inner sl-door-panel sl-door-panel--right">
              <div className="sl-door__full-canvas sl-door__full-canvas--right">
                <img
                  src={doorImg}
                  alt="Ancient Dungeon Portal Gate Right"
                  className="sl-door__image"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <div className="sl-door__mana-cracks sl-door__mana-cracks--right" />
              <div className="sl-door__iron-brace" />
            </div>
          </div>
        </div>

        {/* ───── HERO TYPOGRAPHY & INTRO STATE (Fades as doors open) ───── */}
        <div
          ref={contentStageRef}
          className="zoom-hero__content-stage"
        >
          <h1 className="door-landing__main-title">
            <span className="door-landing__title-tech">TECH</span>
            <span className="door-landing__title-utopia">UTOPIA</span>
          </h1>
        </div>

        {/* ───── BOTTOM SCROLL TO ENTER PROMPT ───── */}
        <div
          ref={scrollPromptRef}
          className="door-entry__scroll-prompt"
          onClick={() => {
            const el = trackRef.current
            if (el) {
              const rect = el.getBoundingClientRect()
              const targetScroll = window.scrollY + rect.top + window.innerHeight * 0.75
              window.scrollTo({ top: targetScroll, behavior: 'smooth' })
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Scroll to enter"
        >
          <div className="door-scroll-prompt__content">
            <span className="door-scroll-prompt__arrow">↓</span>
            <span className="door-scroll-prompt__text">SCROLL TO ENTER</span>
            <span className="door-scroll-prompt__arrow">↓</span>
          </div>
          <div className="door-scroll-prompt__glow-bar" aria-hidden="true" />
        </div>

        {/* ───── STAGE 2: ROYAL ANIME MANA SCROLL OF TIME (UNROLLS ON SCROLL) ───── */}
        <div
          ref={timerDestinationRef}
          className="zoom-hero__timer-destination royal-scroll-stage"
          style={{ opacity: 0 }}
        >
          {/* Authentic Anime Mana Scroll Apparatus */}
          <div
            ref={scrollApparatusRef}
            className="royal-scroll anime-scroll"
            style={{ '--roll': '0.0000' }}
          >
            {/* Left Anime Mana Roller */}
            <div className="royal-scroll__roller royal-scroll__roller--left anime-mana-roller">
              <div className="royal-scroll__finial royal-scroll__finial--top anime-mana-finial">
                <span className="royal-scroll__finial-gem anime-mana-core" />
              </div>
              <div className="royal-scroll__roller-cylinder anime-mana-cylinder">
                <div className="anime-cylinder-glow-vein" />
              </div>
              <div className="royal-scroll__finial royal-scroll__finial--bottom anime-mana-finial">
                <div className="royal-scroll__tassel anime-mana-tassel" />
              </div>
              <div
                ref={curlLeftRef}
                className="royal-scroll__curl-shadow royal-scroll__curl-shadow--left"
                style={{ opacity: 0 }}
              />
            </div>

            {/* Right Anime Mana Roller */}
            <div className="royal-scroll__roller royal-scroll__roller--right anime-mana-roller">
              <div className="royal-scroll__finial royal-scroll__finial--top anime-mana-finial">
                <span className="royal-scroll__finial-gem anime-mana-core" />
              </div>
              <div className="royal-scroll__roller-cylinder anime-mana-cylinder">
                <div className="anime-cylinder-glow-vein" />
              </div>
              <div className="royal-scroll__finial royal-scroll__finial--bottom anime-mana-finial">
                <div className="royal-scroll__tassel anime-mana-tassel" />
              </div>
              <div
                ref={curlRightRef}
                className="royal-scroll__curl-shadow royal-scroll__curl-shadow--right"
                style={{ opacity: 0 }}
              />
            </div>

            {/* Japanese Anime Cursed Seal */}
            <div className="royal-scroll__seal-system anime-seal-system">
              <div className="royal-scroll__seal-side royal-scroll__seal-side--left">
                <div className="royal-scroll__seal-ribbon royal-scroll__seal-ribbon--left anime-seal-ribbon" />
                <div className="royal-scroll__seal-half royal-scroll__seal-half--left anime-seal-half">
                  <span className="anime-seal-symbol">☯</span>
                  <span className="anime-seal-kanji">LOCK</span>
                  <span className="anime-seal-sub">SEALED</span>
                </div>
              </div>

              {/* Central neon mana fracture rupture */}
              <div
                ref={sealRuptureRef}
                className="royal-scroll__seal-rupture-beam anime-seal-rupture"
                style={{ opacity: 0 }}
              />

              <div className="royal-scroll__seal-side royal-scroll__seal-side--right">
                <div className="royal-scroll__seal-half royal-scroll__seal-half--right anime-seal-half">
                  <span className="anime-seal-symbol">⚡</span>
                  <span className="anime-seal-kanji">OPEN</span>
                  <span className="anime-seal-sub">AWAKEN</span>
                </div>
                <div className="royal-scroll__seal-ribbon royal-scroll__seal-ribbon--right anime-seal-ribbon" />
              </div>
            </div>

            {/* Anime Parchment Letter Body with timerBg23 */}
            <div className="royal-scroll__parchment-window anime-parchment-window">
              <div className="royal-scroll__parchment-letter anime-timer-shrine anime-shrine-frame">
                <div
                  className="royal-scroll__letter-image anime-timer__shrine-backdrop"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 35%, rgba(230, 57, 0, 0.28) 0%, rgba(24, 10, 2, 0.55) 35%, rgba(10, 4, 1, 0.98) 80%), url(${timerBg23})`
                  }}
                />

                {/* Floating ambient embers & sakura */}
                <div className="anime-timer__floating-embers" />
                <div className="anime-timer__floating-sakura" />
                <div className="royal-scroll__gold-trim-top anime-trim-top" />
                <div className="royal-scroll__gold-trim-bottom anime-trim-bottom" />

                {/* Left & Right Anime Shrine Pillars */}
                <div className="anime-timer__shrine-pillar anime-timer__shrine-pillar--left anime-pillar" />
                <div className="anime-timer__shrine-pillar anime-timer__shrine-pillar--right anime-pillar" />

                {/* Letter Content: Anime Header, Countdown Talismans, and Actions */}
                <div
                  ref={letterContentRef}
                  className="royal-scroll__letter-content anime-letter-content"
                  style={{ opacity: 0 }}
                >
                  {/* Anime Torii & Creed Header */}
                  <div className="anime-timer__header">
                    <div className="anime-timer__header-decor">
                      <span className="anime-timer__lantern anime-timer__lantern--left">🏮</span>
                      <div className="anime-timer__torii-icon">⛩️</div>
                      <span className="anime-timer__lantern anime-timer__lantern--right">🏮</span>
                    </div>

                    <div className="anime-timer__shrine-creed anime-creed-badge">
                      <span className="anime-creed-spark">⚡</span>
                      <span>TEMPORAL AWAKENING MATRIX</span>
                      <span className="anime-creed-spark">⚡</span>
                    </div>
                  </div>

                  {/* Anime Title Block */}
                  <div className="anime-timer__title-block">
                    <div className="anime-timer__kanji-eyebrow">GRAND FESTIVAL COUNTDOWN</div>
                    <h2 className="anime-timer__headline anime-glow-text">
                      CHRONICLES OF TECHUTOPIA ’26
                    </h2>
                  </div>

                  {/* Authentic Anime Ofuda (お札) Talisman Countdown Cards */}
                  <div className="anime-timer__clock-row anime-ofuda-grid">
                    {clockItems.map((item) => (
                      <div key={item.label} className="anime-timer__talisman-card anime-ofuda-card">
                        <div className="anime-timer__talisman-top-knot anime-ofuda-knot" />

                        <div className="anime-timer__talisman-number anime-ofuda-number">
                          {item.value}
                        </div>

                        <div className="anime-timer__talisman-unit anime-ofuda-unit">
                          {item.label}
                        </div>

                        <div className="anime-ofuda-mana-bar">
                          <div
                            className="anime-ofuda-mana-bar-fill"
                            style={{
                              width: `${Math.max(20, Math.min(100, (parseInt(item.value, 10) || 1) * 3))}%`
                            }}
                          />
                        </div>

                        <div className="anime-timer__talisman-tassel anime-ofuda-tassel" />
                      </div>
                    ))}
                  </div>

                  {/* ───── ANIME DOMAIN UNSEAL EXPLORE BUTTON ───── */}
                  <div className="zoom-hero__explore-action">
                    <button
                      type="button"
                      className="btn btn--primary zoom-hero__explore-btn anime-unseal-btn anime-btn-glow"
                      onClick={handleExploreClick}
                    >
                      ⚔️ CLICK TO EXPLORE EVENTS ⚡
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Navigation / Status Bar below the Anime Scroll */}
            <div className="royal-scroll__control-dock anime-dock">
              <button
                type="button"
                className="royal-scroll__dock-btn anime-dock-btn"
                onClick={() => handleRollTo('close')}
                title="Roll In"
              >
                ◀ Seal
              </button>
              <div className="royal-scroll__dock-indicator anime-dock-indicator">
                <span className="royal-scroll__dock-crest">⚡</span>
                <span ref={dockTextRef}>• SCROLL TO REVEAL</span>
                <span className="royal-scroll__dock-crest">⚡</span>
              </div>
              <button
                type="button"
                className="royal-scroll__dock-btn royal-scroll__dock-btn--active anime-dock-btn anime-dock-btn--active"
                onClick={() => handleRollTo('open')}
                title="Roll Out"
              >
                Open ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
