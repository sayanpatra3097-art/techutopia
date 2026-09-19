import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react'
import { eventsDataset, getEventFormLink, LAST_CARD_FORM_LINK } from '../context/eventForms'
import eventOutroImg from '../assets/event_outro.webp'
import eventInsideImg from '../assets/event_inside.webp'

// 3D Corridor Layout Constants
const SPACING_Z = 850 // Distance between consecutive exhibits in 3D depth
const INITIAL_Z_OFFSET = 1200 // Camera start to first exhibit

// Map exhibits with fixed 3D coordinates (Techfest architecture)
const computedExhibits = eventsDataset.map((ev, i) => ({
  ...ev,
  index: i,
  side: i % 2 === 0 ? 'left' : 'right',
  z: -INITIAL_Z_OFFSET - i * SPACING_Z
}))

// Total depth the camera travels down the tunnel
const TOTAL_CORRIDOR_DEPTH = INITIAL_Z_OFFSET + (computedExhibits.length - 1) * SPACING_Z + 1400

// 4-Point Catmull-Rom Spline interpolation (Exact Techfest navigation math)
function calculateCatmullRomSpline(zVal, waypoints) {
  if (!waypoints || waypoints.length === 0) return 0
  let t = 0
  for (; t < waypoints.length - 1 && waypoints[t + 1].z <= zVal; ) {
    t++
  }
  if (t >= waypoints.length - 1) return waypoints[waypoints.length - 1].x

  const p0 = waypoints[Math.max(0, t - 1)]
  const p1 = waypoints[t]
  const p2 = waypoints[Math.min(waypoints.length - 1, t + 1)]
  const p3 = waypoints[Math.min(waypoints.length - 1, t + 2)]

  const span = p2.z - p1.z
  if (span === 0) return p1.x

  const s = (zVal - p1.z) / span
  const s2 = s * s
  const s3 = s2 * s

  return 0.5 * (
    2 * p1.x +
    (-p0.x + p2.x) * s +
    (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * s2 +
    (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * s3
  )
}

// ════════════ MEMOIZED 3D EXHIBITS LIST (ZERO REACT RE-RENDERS ON SCROLL) ════════════
const CorridorExhibits = memo(function CorridorExhibits({
  exhibits,
  openedEventId,
  onOpenEvent,
  cardLateralOffset,
  cardRotation
}) {
  return (
    <>
      {exhibits.map((event) => {
        const isLeft = event.side === 'left'
        const isOpened = openedEventId === event.id

        return (
          <div
            key={event.id}
            id={`techfest-mount-${event.index}`}
            className={`techfest-exhibit-mount mount--${event.side} ${event.index === 0 ? 'is-focused' : ''} ${isOpened ? 'is-active' : ''}`}
            style={{
              transform: `translate(-50%, -50%) translateX(${isLeft ? -cardLateralOffset : cardLateralOffset}px) translateZ(${event.z}px) rotateY(${isLeft ? cardRotation : -cardRotation}deg)`,
              '--accent-color': event.color
            }}
            onClick={() => onOpenEvent(event.id)}
          >
            {/* Overhead Volumetric Spotlight Fixture */}
            <div className="techfest-light-wrap" aria-hidden="true">
              <div className="techfest-light-fixture">
                <span className="fixture-chain" />
                <span className="fixture-lamp-head">🏮</span>
              </div>
              <div
                className="techfest-light-glow"
                style={{
                  background: `radial-gradient(circle, ${event.color}ee 0%, ${event.color}44 50%, transparent 80%)`
                }}
              />
              <div
                className="techfest-light-beam-cone"
                style={{
                  background: `linear-gradient(to bottom, ${event.color}cc 0%, ${event.color}44 40%, transparent 88%)`
                }}
              />
            </div>

            {/* Exhibit Card Artwork & Presentation Frame */}
            <div className="techfest-card-body">
              <div className="techfest-card-image-wrap">
                <img
                  src={event.image}
                  alt={event.title}
                  className="techfest-card-image"
                  loading="eager"
                  decoding="sync"
                  draggable={false}
                />
              </div>

              {/* Info Banner at Bottom of Artwork */}
              <div className="techfest-card-caption">
                <h3 className="techfest-card-title">{event.title}</h3>

                <div className="techfest-card-cue">
                  <span>✦ CLICK TO REGISTER ✦</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
})

export default function Events({ onNext, onPrev, initialStage = 'outro' }) {
  // 'outro' (Citadel entrance gate zoom) -> 'inside' (Techfest 3D tunnel corridor)
  const [stage, setStage] = useState(initialStage)
  const [outroProgress, setOutroProgress] = useState(0)

  // Current active exhibit index in the corridor dock (updated smoothly)
  const [activeEventIndex, setActiveEventIndex] = useState(0)
  const [openedEventId, setOpenedEventId] = useState(null)

  const [windowWidth, setWindowWidth] = useState(() => typeof window !== 'undefined' ? window.innerWidth : 1440)
  const isMobile = windowWidth <= 860

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Web view on laptop: cards are positioned to the left & right and move side-to-side on scroll
  const { cardLateralOffset, cameraSplineShift, cardRotation } = useMemo(() => {
    if (isMobile) {
      return { cardLateralOffset: 95, cameraSplineShift: 75, cardRotation: 6 }
    }
    let offset = 680
    if (windowWidth >= 1600) {
      offset = Math.min(800, Math.round(windowWidth * 0.42))
    } else if (windowWidth >= 1200) {
      offset = Math.min(720, Math.max(620, Math.round(windowWidth * 0.46)))
    } else {
      offset = Math.max(520, Math.round(windowWidth * 0.44))
    }

    const shift = Math.round(offset * 0.74)
    const rotation = 26
    return { cardLateralOffset: offset, cameraSplineShift: shift, cardRotation: rotation }
  }, [isMobile, windowWidth])

  const outroTrackRef = useRef(null)
  const insideTrackRef = useRef(null)
  const transitionCooldownRef = useRef(false)
  const insideEntryTimeRef = useRef(0)

  // Techfest 3D Scene Refs
  const cameraWrapperRef = useRef(null)
  const sceneWrapperRef = useRef(null)
  const backdropWallRef = useRef(null)

  // Motion physics refs (60-120 FPS RAF loop with zero React re-renders)
  const targetZRef = useRef(0)
  const currentZRef = useRef(0)
  const rafIdRef = useRef(null)
  const lastActiveIdxRef = useRef(0)
  const splineWaypointsRef = useRef([])

  useEffect(() => {
    if (initialStage) {
      setStage(initialStage)
      if (initialStage === 'inside') {
        targetZRef.current = 0
        currentZRef.current = 0
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    }
  }, [initialStage])

  useEffect(() => {
    const points = [{ z: 0, x: 0 }]
    computedExhibits.forEach((ev) => {
      points.push({
        z: Math.abs(ev.z) - 300,
        x: ev.side === 'left' ? cameraSplineShift : -cameraSplineShift
      })
    })
    points.push({ z: TOTAL_CORRIDOR_DEPTH - 400, x: 0 })
    points.push({ z: TOTAL_CORRIDOR_DEPTH + 600, x: 0 })
    splineWaypointsRef.current = points
  }, [cameraSplineShift])

  // Active event for centered details modal (desktop & mobile)
  const activeOpenedEvent = computedExhibits.find((e) => e.id === openedEventId) || eventsDataset.find((e) => e.id === openedEventId)

  // Direct smooth camera navigation to specific exhibit
  const scrollToExhibit = useCallback((index) => {
    const track = insideTrackRef.current
    if (!track) return
    const scrollable = track.getBoundingClientRect().height - window.innerHeight
    if (scrollable <= 0) return

    const targetExhibit = computedExhibits[index]
    if (!targetExhibit) return

    // Position camera just in front of target exhibit
    const targetZ = Math.abs(targetExhibit.z) - 300
    const progress = Math.min(Math.max(targetZ / TOTAL_CORRIDOR_DEPTH, 0), 1)
    const targetScrollY = progress * scrollable

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    })
  }, [])

  // ───── SEAMLESS DIRECT TRANSITION (CLEAN, NO PIXEL ARTIFACTS) ─────
  const enterCorridor = useCallback(() => {
    if (transitionCooldownRef.current) return
    transitionCooldownRef.current = true
    setStage('inside')
    targetZRef.current = 0
    currentZRef.current = 0
    window.scrollTo({ top: 0, behavior: 'instant' })
    setTimeout(() => {
      transitionCooldownRef.current = false
    }, 350)
  }, [])

  const returnToOutro = useCallback(() => {
    if (transitionCooldownRef.current) return
    transitionCooldownRef.current = true
    setStage('outro')
    setOpenedEventId(null)
    setTimeout(() => {
      if (outroTrackRef.current) {
        const targetProgress = 0.05
        const rect = outroTrackRef.current.getBoundingClientRect()
        const scrollable = rect.height - window.innerHeight
        const targetY = Math.max(0, scrollable * targetProgress)
        window.scrollTo({ top: targetY, behavior: 'instant' })
        setOutroProgress(targetProgress)
      }
      setTimeout(() => {
        transitionCooldownRef.current = false
      }, 500)
    }, 50)
  }, [])

  // ───── PRELOAD CORRIDOR ASSETS FOR INSTANT LOAD ─────
  useEffect(() => {
    const insideImg = new Image()
    insideImg.src = eventInsideImg
    computedExhibits.slice(0, 8).forEach((ev) => {
      if (ev.image) {
        const cardImg = new Image()
        cardImg.src = ev.image
      }
    })
  }, [])

  // ───── 1. OUTRO GATE SCROLL ZOOM & INSTANT MOBILE TRANSITION ─────
  useEffect(() => {
    if (stage !== 'outro') return

    let ticking = false
    let lastP = -1

    const updateOutro = () => {
      ticking = false
      if (transitionCooldownRef.current) return
      const el = outroTrackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1)
      if (Math.abs(progress - lastP) > 0.002 || progress === 0 || progress === 1) {
        lastP = progress
        setOutroProgress(progress)
      }

      // Fast responsive trigger threshold: instantaneous on mobile
      const triggerThreshold = isMobile ? 0.25 : 0.75
      if (progress >= triggerThreshold) {
        enterCorridor()
      }
    }

    const handleOutroScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateOutro)
      }
    }

    // Touch swipe support for immediate entry on mobile
    let touchStartY = 0
    const handleOutroTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const handleOutroTouchMove = (e) => {
      if (transitionCooldownRef.current) return
      const currentY = e.touches[0].clientY
      if (touchStartY - currentY > 35) { // User swiped upwards to enter
        enterCorridor()
      }
    }

    window.addEventListener('scroll', handleOutroScroll, { passive: true })
    window.addEventListener('touchstart', handleOutroTouchStart, { passive: true })
    window.addEventListener('touchmove', handleOutroTouchMove, { passive: true })
    updateOutro()

    return () => {
      window.removeEventListener('scroll', handleOutroScroll)
      window.removeEventListener('touchstart', handleOutroTouchStart)
      window.removeEventListener('touchmove', handleOutroTouchMove)
    }
  }, [stage, isMobile, enterCorridor])

  // ───── 2. TECHFEST 3D CORRIDOR ENGINE (60-120 FPS ZERO LAG) ─────
  useEffect(() => {
    if (stage !== 'inside') return
    insideEntryTimeRef.current = Date.now()

    // Smooth scroll position sync
    const handleScroll = () => {
      const track = insideTrackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1)
      targetZRef.current = progress * TOTAL_CORRIDOR_DEPTH
    }

    // Wheel event for entrance scroll-back
    const handleWheel = (e) => {
      if (transitionCooldownRef.current) return
      if (e.deltaY < -10 && window.scrollY <= 15) {
        const timeSinceEntry = Date.now() - insideEntryTimeRef.current
        if (timeSinceEntry > 600) {
          returnToOutro()
        }
      }
    }

    // Touch swipe for mobile entrance scroll-back (responsive pull-down at top)
    let touchStartY = 0
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e) => {
      if (transitionCooldownRef.current) return
      const currentY = e.touches[0].clientY
      if (currentY - touchStartY > 45 && window.scrollY <= 15) {
        const timeSinceEntry = Date.now() - insideEntryTimeRef.current
        if (timeSinceEntry > 600) {
          returnToOutro()
        }
      }
    }

    // Keyboard navigation (Arrow keys & Page up/down)
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        const nextIdx = Math.min(lastActiveIdxRef.current + 1, computedExhibits.length - 1)
        scrollToExhibit(nextIdx)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        const prevIdx = Math.max(lastActiveIdxRef.current - 1, 0)
        scrollToExhibit(prevIdx)
      } else if (e.key === 'Escape') {
        setOpenedEventId(null)
      }
    }

    // Continuous 60-120fps GPU Transform RAF Loop
    const renderLoop = () => {
      // Smooth lerp easing toward target Z depth
      const zDiff = targetZRef.current - currentZRef.current
      if (Math.abs(zDiff) > 0.05) {
        currentZRef.current += zDiff * 0.12
      } else {
        currentZRef.current = targetZRef.current
      }

      const zVal = currentZRef.current
      const xVal = calculateCatmullRomSpline(zVal, splineWaypointsRef.current)

      // Apply transforms directly to GPU without React re-rendering
      // Background image: stable hardware transform, zoom only on desktop, locked on mobile to avoid flicker
      if (backdropWallRef.current) {
        if (!isMobile) {
          const bgProgress = Math.min(Math.max(zVal / TOTAL_CORRIDOR_DEPTH, 0), 1)
          const bgScale = 1 + bgProgress * 0.35
          backdropWallRef.current.style.transform = `scale3d(${bgScale.toFixed(4)}, ${bgScale.toFixed(4)}, 1) translateZ(0)`
        } else {
          backdropWallRef.current.style.transform = 'translate3d(0, 0, 0)'
        }
      }

      // Event cards: move from left to right as you scroll down the corridor
      if (cameraWrapperRef.current) {
        cameraWrapperRef.current.style.transform = `translate3d(${xVal.toFixed(2)}px, 0, 0)`
      }
      if (sceneWrapperRef.current) {
        sceneWrapperRef.current.style.transform = `translate3d(0, 0, ${zVal.toFixed(2)}px)`
      }

      // Compute nearest active exhibit for UI dock & direct class toggle without React re-render
      const estimatedIdx = Math.min(
        Math.max(0, Math.round((zVal - INITIAL_Z_OFFSET + 300) / SPACING_Z)),
        computedExhibits.length - 1
      )
      if (estimatedIdx !== lastActiveIdxRef.current) {
        const prevEl = document.getElementById(`techfest-mount-${lastActiveIdxRef.current}`)
        if (prevEl) prevEl.classList.remove('is-focused')
        const nextEl = document.getElementById(`techfest-mount-${estimatedIdx}`)
        if (nextEl) nextEl.classList.add('is-focused')

        const prevDot = document.getElementById(`techfest-dock-dot-${lastActiveIdxRef.current}`)
        if (prevDot) prevDot.classList.remove('is-active')
        const nextDot = document.getElementById(`techfest-dock-dot-${estimatedIdx}`)
        if (nextDot) nextDot.classList.add('is-active')

        lastActiveIdxRef.current = estimatedIdx
      }

      // Frustum Near-Plane Culling & Smooth Shoulder Dissolve:
      // Completely eliminates flickering by hiding cards that pass behind the camera lens
      for (let i = 0; i < computedExhibits.length; i++) {
        const evZ = computedExhibits[i].z
        const effZ = evZ + zVal // Distance relative to camera plane (z=0)
        const mountEl = document.getElementById(`techfest-mount-${i}`)
        if (mountEl) {
          if (effZ > 60 || effZ < -6500) {
            if (mountEl.style.visibility !== 'hidden') {
              mountEl.style.visibility = 'hidden'
            }
          } else {
            if (mountEl.style.visibility !== 'visible') {
              mountEl.style.visibility = 'visible'
            }
            if (effZ > -130) {
              const alpha = Math.max(0, Math.min(1, (50 - effZ) / 180))
              mountEl.style.opacity = alpha.toFixed(3)
            } else if (mountEl.style.opacity !== '1') {
              mountEl.style.opacity = '1'
            }
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    handleScroll()
    rafIdRef.current = requestAnimationFrame(renderLoop)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }
    }
  }, [stage, returnToOutro, scrollToExhibit])

  // Normalized progress for rapid, responsive animation (especially on mobile)
  const displayProgress = isMobile ? Math.min(outroProgress * 3.2, 1) : outroProgress

  return (
    <div className="techfest-quest-container">

      {/* ════════════ STAGE 1: CITADEL ENTRANCE GATE (OUTRO) ════════════ */}
      {stage === 'outro' && (
        <div className="events-outro-track" ref={outroTrackRef}>
          <div className="events-outro-viewport">
            {/* Interior Building emerging seamlessly through the central gate */}
            <div
              className="events-outro-portal-inside"
              style={{
                backgroundImage: `url(${eventInsideImg})`,
                transform: `scale(${0.78 + displayProgress * 0.32})`,
                opacity: displayProgress < 0.15 ? 0 : Math.min(1, (displayProgress - 0.15) / 0.55)
              }}
              aria-hidden="true"
            />

            {/* Outro Exterior Citadel: Anchored in center, zooms into gate */}
            <div
              className="events-outro-bg"
              style={{
                backgroundImage: `url(${eventOutroImg})`,
                transform: `scale(${1 + displayProgress * 3.4})`,
                transformOrigin: '50% 51%',
                opacity: displayProgress < 0.5 ? 1 : Math.max(0, 1 - (displayProgress - 0.5) / 0.35)
              }}
              aria-hidden="true"
            />

            {/* Subtle Atmosphere Light Vignette */}
            <div
              className="events-outro-ambient"
              style={{ opacity: 0.3 + displayProgress * 0.45 }}
              aria-hidden="true"
            />

            {/* Outro Clean Title & Japanese Edict */}
            <div
              className="events-outro-content"
              style={{
                opacity: Math.max(1 - displayProgress * 2.2, 0),
                transform: `scale(${1 - displayProgress * 0.2})`
              }}
            >
              <h1 className="events-outro-title">
                SCROLL TO <span className="anime-text-glow">ENTER CITADEL</span>
              </h1>

              <div className="events-outro-scroll-hint">
                <span className="scroll-hint-icon">↓</span>
                <span className="scroll-hint-text">  ({Math.round(displayProgress * 100)}%)</span>
                <span className="scroll-hint-icon">↓</span>
              </div>
            </div>

            {/* Direct Quick Enter Button */}
            <button
              type="button"
              className="events-outro-skip-btn"
              onClick={enterCorridor}
              title="Enter Corridor Directly"
            >
              ENTER CORRIDOR ⚡
            </button>

            {/* Gate Proximity Laser Line */}
            <div className="events-outro-progress-bar">
              <div
                className="events-outro-progress-fill"
                style={{ width: `${displayProgress * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ════════════ STAGE 2: TECHFEST-STYLE 3D TUNNEL CORRIDOR ════════════ */}
      {stage === 'inside' && (
        <div className="techfest-corridor-track" ref={insideTrackRef}>

          {/* Fixed 3D Viewport (Zero Scroll Lag, 100vw x 100vh) */}
          <div className="techfest-fixed-stage">

            {/* Atmospheric Background Corridor Wall (High Clarity Dedicated <img> Element) */}
            <div className="techfest-backdrop-wall-wrap" aria-hidden="true">
              <img
                ref={backdropWallRef}
                src={eventInsideImg}
                alt="Citadel Sanctuary Corridor"
                className="techfest-backdrop-wall-img"
                loading="eager"
                decoding="sync"
              />
              <div className="techfest-backdrop-vignette" />
            </div>


            {/* 3D PERSPECTIVE STAGE CONTAINER */}
            <div className="techfest-3d-viewport">
              
              {/* Camera Wrapper (Curved X-spline steering) */}
              <div className="techfest-camera-wrapper" ref={cameraWrapperRef}>

                {/* Scene Wrapper (Smooth Z-depth translation) */}
                <div className="techfest-scene-wrapper" ref={sceneWrapperRef}>

                  {/* Floating Sanctum Title Edict */}
                  <div className="techfest-tunnel-header-edict" aria-hidden="true">
                    <span>◆ GRAND GUILD SANCTUM EXHIBITS ◆</span>
                  </div>

                  {/* ═══════ ALL 14 EXHIBIT CARDS MOUNTED IN 3D SPACE (MEMOIZED) ═══════ */}
                  <CorridorExhibits
                    exhibits={computedExhibits}
                    openedEventId={openedEventId}
                    onOpenEvent={setOpenedEventId}
                    cardLateralOffset={cardLateralOffset}
                    cardRotation={cardRotation}
                  />

                  {/* ═══════ CORRIDOR SANCTUARY END BOARD ═══════ */}
                  <div
                    className="techfest-end-board"
                    style={{
                      transform: `translate(-50%, -50%) translateZ(${-TOTAL_CORRIDOR_DEPTH + 300}px)`
                    }}
                  >
                    <div className="techfest-end-board__card">
                      <div className="end-board-badge">SANCTUM REVEAL COMPLETE</div>
                      <h3 className="end-board-title">YOU HAVE EXPLORED ALL 14 QUESTS</h3>
                      <p className="end-board-desc">
                        Prepare your party, assemble your squad, and register before the shrine seals.
                      </p>

                      <div className="end-board-actions">
                        <a
                          href={LAST_CARD_FORM_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--primary end-board-reg-btn"
                        >
                          <span>⚡ REGISTER FOR EVENTS NOW ↗</span>
                        </a>

                        <button
                          type="button"
                          className="end-board-secondary-btn"
                          onClick={() => scrollToExhibit(0)}
                        >
                          ⛩️ REPLAY CORRIDOR
                        </button>

                        {onPrev && (
                          <button
                            type="button"
                            className="end-board-secondary-btn"
                            onClick={onPrev}
                          >
                            ◀ SHRINE PORTAL
                          </button>
                        )}

                        {onNext && (
                          <button
                            type="button"
                            className="end-board-next-btn"
                            onClick={onNext}
                          >
                            <span>CELESTIAL CONSTELLATION ▶</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ════════════ BOTTOM STEP DOCK (TECHFEST NAVIGATION) ════════════ */}
            <nav className="techfest-bottom-dock" aria-label="Exhibitions step navigation">
              <button
                type="button"
                className="techfest-dock-btn"
                onClick={() => scrollToExhibit(Math.max(0, lastActiveIdxRef.current - 1))}
                title="Walk to Previous Exhibit"
              >
                &lt;
              </button>

              <div className="techfest-dock-indicators">
                {computedExhibits.map((ev, idx) => (
                  <button
                    key={ev.id}
                    id={`techfest-dock-dot-${idx}`}
                    type="button"
                    className={`techfest-dock-dot ${idx === 0 ? 'is-active' : ''}`}
                    onClick={() => scrollToExhibit(idx)}
                    title={`Exhibit ${idx + 1}: ${ev.title}`}
                  >
                    <span className="dock-dot-num">{idx + 1}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="techfest-dock-btn"
                onClick={() => scrollToExhibit(Math.min(computedExhibits.length - 1, lastActiveIdxRef.current + 1))}
                title="Walk to Next Exhibit"
              >
                &gt;
              </button>
            </nav>

          </div>
        </div>
      )}

      {/* ════════════ CENTERED DETAILS CARD (ON MIDDLE OF SCREEN UPON TAPPING) ════════════ */}
      {activeOpenedEvent && (
        <div
          className="techfest-centered-modal-overlay"
          onClick={() => setOpenedEventId(null)}
        >
          <div
            className="techfest-centered-dossier"
            style={{ '--event-color': activeOpenedEvent.color }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Action */}
            <div className="centered-dossier__header">
              <button
                type="button"
                className="centered-dossier__close-btn"
                onClick={() => setOpenedEventId(null)}
                aria-label="Close details card"
              >
                ✕ CLOSE
              </button>
            </div>

            {/* Content Body: Left Column Image / Right Column Specs */}
            <div className="centered-dossier__body">
              {/* Media Preview (No dark tint) */}
              <div className="centered-dossier__media">
                <img
                  src={activeOpenedEvent.image}
                  alt={activeOpenedEvent.title}
                  className="centered-dossier__img"
                />
              </div>

              {/* Information & Specs */}
              <div className="centered-dossier__info">
                <h3 className="centered-dossier__title">{activeOpenedEvent.title}</h3>
                <p className="centered-dossier__briefing">{activeOpenedEvent.description}</p>

                <div className="centered-dossier__specs-grid">
                  <div className="centered-dossier__spec-card">
                    <span className="spec-label">📅 SCHEDULE</span>
                    <span className="spec-val">{activeOpenedEvent.date}</span>
                  </div>
                  <div className="centered-dossier__spec-card">
                    <span className="spec-label">📍 VENUE</span>
                    <span className="spec-val">{activeOpenedEvent.venue}</span>
                  </div>
                  <div className="centered-dossier__spec-card">
                    <span className="spec-label">👥 GUILD SQUAD</span>
                    <span className="spec-val">{activeOpenedEvent.team}</span>
                  </div>
                </div>

                <div className="centered-dossier__footer">
                  <a
                    href={getEventFormLink(activeOpenedEvent)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary centered-dossier__cta-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>⚡ REGISTER VIA GOOGLE FORM ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
