import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react'
import { getEventFormLink, LAST_CARD_FORM_LINK } from '../context/eventForms'
import eventOutroImg from '../assets/event_outro.webp'
import eventInsideImg from '../assets/event_inside.webp'

import art1 from '../assets/1.webp'
import art2 from '../assets/2.webp'
import art3 from '../assets/3.webp'
import art4 from '../assets/4.webp'
import art5 from '../assets/5.webp'
import art6 from '../assets/6.webp'
import art7 from '../assets/7.webp'
import art8 from '../assets/8.webp'
import art9 from '../assets/9.webp'
import art10 from '../assets/10.webp'
import art11 from '../assets/11.webp'
import art12 from '../assets/12.webp'
import art13 from '../assets/14.webp'
import art14 from '../assets/15.webp'

const eventsDataset = [
  {
    id: 1,
    title: 'Robo Mania',
    rank: 'S-RANK COLISEUM',
    threat: 'S-TIER',
    element: 'MECHA',
    category: 'Robotics',
    icon: '🤖',
    color: '#ff4500',
    image: art1,
    snippet: 'Heavyweight combat bots and autonomous rovers clashing in the steel cage arena.',
    description: 'Unleash custom-built combat mechas and robowars machines in an electric caged battle arena. Test armor, torque, weapon systems, and driver precision under high-voltage battle rounds.',
    date: 'Day 1 • 11:00 AM - 3:00 PM',
    venue: 'Mechanical Arena, Workshop Block',
    prize: '₹50,000 + Champion Trophy',
    team: 'Team of 2-5'
  },
  {
    id: 2,
    title: 'Gravity Zone',
    rank: 'A-RANK ARENA',
    threat: 'A-TIER',
    element: 'GRAVITY',
    category: 'Physics & Fun',
    icon: '🌌',
    color: '#f59e0b',
    image: art2,
    snippet: 'Zero-G engineering challenges, water rockets, and high-altitude aerodynamic drops.',
    description: 'Defy terrestrial physics! Teams build aerodynamic launchers, precision egg-drop vessels, and pressurized water rockets to conquer gravity and achieve maximum flight time.',
    date: 'Day 1 • 2:00 PM - 5:00 PM',
    venue: 'Central University Grounds, UEM Jaipur',
    prize: '₹35,000 + Medallions',
    team: 'Squad of 2-4'
  },
  {
    id: 3,
    title: 'Physio Event',
    rank: 'SPECIAL GUILD',
    threat: 'BIO-RANK',
    element: 'VITALITY',
    category: 'Healthcare & Wellness',
    icon: '🩺',
    color: '#ffb703',
    image: art3,
    snippet: 'Biomechanics agility sprint, posture AI analysis, and ergonomic reflex testing.',
    description: 'A fusion of health sciences, physiotherapy diagnostics, and athletic biomechanics. Showcase clinical skills, ergonomic innovation, and rapid physical assessment challenges.',
    date: 'Day 2 • 10:00 AM - 1:00 PM',
    venue: 'Physiotherapy & Health Sciences Wing',
    prize: '₹30,000 + Clinical Kits',
    team: 'Solo / Duo'
  },
  {
    id: 4,
    title: 'TechVenture',
    rank: 'S-RANK SUMMON',
    threat: 'VENTURE',
    element: 'GOLD',
    category: 'Startup & Business',
    icon: '💼',
    color: '#fbbf24',
    image: art4,
    snippet: 'High-stakes startup pitch arena in front of venture capitalists and angel investors.',
    description: 'Shark Tank style startup battleground. Pitch groundbreaking tech innovations, viable business models, and scalable prototypes directly to industry investors and venture founders.',
    date: 'Day 2 • 11:30 AM - 3:30 PM',
    venue: 'Auditorium Hall B, UEM Jaipur',
    prize: '₹75,000 + Seed Mentorship',
    team: 'Team of 1-4'
  },
  {
    id: 5,
    title: 'Launchpad',
    rank: 'A-RANK INNOVATION',
    threat: 'A-TIER',
    element: 'COSMIC',
    category: 'Project Expo',
    icon: '🚀',
    color: '#ea580c',
    image: art5,
    snippet: 'Grand tech project exhibition showcasing IoT, renewable energy, and AI inventions.',
    description: 'Demonstrate working hardware prototypes, software solutions, and patented student engineering research before academic deans, judges, and visiting industry leaders.',
    date: 'Day 1 • 10:00 AM - 4:00 PM',
    venue: 'Exhibition Center, Main Foyer',
    prize: '₹45,000 + Research Grants',
    team: 'Team of 2-4'
  },
  {
    id: 6,
    title: 'Hackathon (24hr)',
    rank: 'SUPREME RAID',
    threat: 'MYTHIC',
    element: 'CYBER',
    category: 'Hackathon',
    icon: '⚡',
    color: '#ffaa00',
    image: art6,
    snippet: '24-hour non-stop code sprint building breakthrough AI, Web3, and Cloud solutions.',
    description: 'The flagship 24-hour hackathon of TechUtopia! Code through the midnight hour, solve real-world industry problem statements, and present live working deployments to senior architects.',
    date: 'Day 1 - Day 2 • 24 Hours Non-Stop',
    venue: 'Innovation Hub & Sandbox Lab',
    prize: '₹1,00,000 + Incubation Support',
    team: 'Squad of 2-4'
  },
  {
    id: 7,
    title: 'Esports Championship',
    rank: 'COLISEUM APEX',
    threat: 'CHAOS',
    element: 'LIGHTNING',
    category: 'Gaming',
    icon: '🎮',
    color: '#ef4444',
    image: art7,
    snippet: 'High-octane BGMI, Valorant, and EA FC tournament on the stage with live commentary.',
    description: '5v5 tactical shooter showdown and battle royale madness. Teams duel across knockout brackets on ultra-high-refresh tournament rigs broadcasted live to the auditorium crowd.',
    date: 'Day 1 - Day 2 • Tournament Brackets',
    venue: 'Indoor Sports Stadium & Gaming Dome',
    prize: '₹60,000 + Pro Gaming Gear',
    team: 'Squad of 4-5'
  },
  {
    id: 8,
    title: 'Photography',
    rank: 'B-RANK CHRONICLE',
    threat: 'VISION',
    element: 'OPTIC',
    category: 'Creative Arts',
    icon: '📸',
    color: '#f97316',
    image: art8,
    snippet: 'Theme-based on-spot photography and cinematic storytelling competition.',
    description: 'Capture the soul, energy, and cyberpunk lights of TechUtopia. Judged on creative composition, lighting mastery, framing, and narrative storytelling without excessive post-filters.',
    date: 'Day 1 - Day 2 • On-Campus Submissions',
    venue: 'Media Center & Campus-Wide',
    prize: '₹25,000 + Lens Gear',
    team: 'Solo Hunter'
  },
  {
    id: 9,
    title: 'Bridge Building',
    rank: 'B-RANK STRUCTURE',
    threat: 'B-TIER',
    element: 'EARTH',
    category: 'Civil & Mechanics',
    icon: '🌉',
    color: '#d97706',
    image: art9,
    snippet: 'Popsicle stick and balsa truss bridge engineering tested to absolute destruction.',
    description: 'Design and construct maximum load-bearing truss bridges with minimal dead weight. Each bridge is subjected to calibrated point loading until collapse to determine ultimate strength ratio.',
    date: 'Day 2 • 1:30 PM - 5:00 PM',
    venue: 'Civil Engineering Materials Lab',
    prize: '₹30,000 + Trophy',
    team: 'Team of 2-3'
  },
  {
    id: 10,
    title: 'Generative Media',
    rank: 'A-RANK SYNTHESIS',
    threat: 'A-TIER',
    element: 'NEURAL',
    category: 'AI & Digital Art',
    icon: '🔮',
    color: '#ff6b35',
    image: art10,
    snippet: 'Prompt engineering and generative AI art showcase synthesizing anime and futurism.',
    description: 'Challenge human imagination alongside neural models. Craft state-of-the-art multimodal AI artworks, prompt architectures, and motion graphics judged by digital artists.',
    date: 'Day 2 • 3:00 PM - 6:00 PM',
    venue: 'Digital Design Studio, Block 3',
    prize: '₹35,000 + GPU Credits',
    team: 'Solo / Duo'
  },
  {
    id: 11,
    title: 'Blind Coding',
    rank: 'A-RANK CIPHER',
    threat: 'A-TIER',
    element: 'SHADOW',
    category: 'Coding & Logic',
    icon: '🕶️',
    color: '#dc2626',
    image: art11,
    snippet: 'Screen-off algorithmic coding duels testing sheer syntax muscle memory.',
    description: 'Write compilable, bug-free C++/Python code with your display monitor switched completely OFF! Test muscle memory, algorithmic structure, and mental compiler simulation.',
    date: 'Day 1 • 4:00 PM - 6:30 PM',
    venue: 'Computer Science Lab 4',
    prize: '₹25,000 + Mechanical Keyboards',
    team: 'Solo Hunter'
  },
  {
    id: 12,
    title: 'Circuit Design',
    rank: 'B-RANK SILICON',
    threat: 'B-TIER',
    element: 'SPARK',
    category: 'Electronics',
    icon: '🔌',
    color: '#facc15',
    image: art12,
    snippet: 'Rapid breadboarding, PCB debugging, and analog/digital IC challenge.',
    description: 'Diagnose faulty circuit schematics, solder components against time, and engineer functioning silicon hardware circuits under real-time oscilloscope analysis.',
    date: 'Day 2 • 10:30 AM - 1:30 PM',
    venue: 'ECE Microelectronics Lab',
    prize: '₹30,000 + Oscilloscope Kits',
    team: 'Team of 2'
  },
  {
    id: 13,
    title: 'Tech Model Expo',
    rank: 'S-RANK EXHIBIT',
    threat: 'S-TIER',
    element: 'FORGE',
    category: 'Hardware & Science',
    icon: '🔬',
    color: '#e65100',
    image: art13,
    snippet: 'Interactive working models of smart city infrastructures and green-energy grids.',
    description: 'Spectacular large-scale physical working models! Displays include magnetic levitation tracks, sustainable hydroponics, smart disaster-warning grids, and aerospace wind tunnel tests.',
    date: 'Day 1 - Day 2 • Continuous Showcase',
    venue: 'Main Foyer & Exhibition Hall A',
    prize: '₹50,000 + Innovation Trophies',
    team: 'Exhibition Guilds'
  },
  {
    id: 14,
    title: 'Fashion Carnival',
    rank: 'SUPREME GALA',
    threat: 'MYTHIC',
    element: 'RADIANCE',
    category: 'Cultural Runway',
    icon: '✨',
    color: '#ff3366',
    image: art14,
    snippet: 'Anime cosplay masquerade, avant-garde cyber couture, and celebrity runway night.',
    description: 'The grand closing spectacle of TechUtopia! Designers, models, and anime cosplayers take the illuminated ramp in theatrical costumes combining neon cybernetics with traditional high fashion.',
    date: 'Day 2 • 6:30 PM - 10:00 PM (Grand Finale)',
    venue: 'Grand Amphitheatre Open Stage',
    prize: '₹70,000 + Fashion Crowns',
    team: 'Guild Roster / Squad'
  }
]

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
                  decoding="async"
                />

                {/* Rank & Threat Hologram Badges */}
                <div
                  className="techfest-card-rank-badge"
                  style={{ borderColor: event.color, color: event.color }}
                >
                  <span>{event.rank}</span>
                </div>
                <div className="techfest-card-element-tag">
                  <span>{event.element}</span>
                </div>
              </div>

              {/* Info Banner at Bottom of Artwork */}
              <div className="techfest-card-caption">
                <div className="techfest-caption-meta">
                  <span className="caption-icon">{event.icon}</span>
                  <span className="caption-category">{event.category}</span>
                  <span className="caption-bounty">{event.prize}</span>
                </div>

                <h3 className="techfest-card-title">{event.title}</h3>

                <div className="techfest-card-cue">
                  <span>✦ TAP FOR DETAILS ✦</span>
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
      return { cardLateralOffset: 140, cameraSplineShift: 140, cardRotation: 12 }
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
        const rect = outroTrackRef.current.getBoundingClientRect()
        const scrollable = rect.height - window.innerHeight
        const targetY = scrollable * 0.82
        window.scrollTo({ top: targetY, behavior: 'instant' })
        setOutroProgress(0.82)
      }
      transitionCooldownRef.current = false
    }, 50)
  }, [])

  // ───── 1. OUTRO GATE SCROLL ZOOM ─────
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

      if (progress >= 0.88) {
        enterCorridor()
      }
    }

    const handleOutroScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateOutro)
      }
    }

    window.addEventListener('scroll', handleOutroScroll, { passive: true })
    updateOutro()
    return () => window.removeEventListener('scroll', handleOutroScroll)
  }, [stage, enterCorridor])

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
      if (e.deltaY < -18 && window.scrollY <= 5) {
        const timeSinceEntry = Date.now() - insideEntryTimeRef.current
        if (timeSinceEntry > 500) {
          returnToOutro()
        }
      }
    }

    // Touch swipe for mobile entrance scroll-back
    let touchStartY = 0
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e) => {
      if (transitionCooldownRef.current) return
      const currentY = e.touches[0].clientY
      if (currentY - touchStartY > 60 && window.scrollY <= 5) {
        const timeSinceEntry = Date.now() - insideEntryTimeRef.current
        if (timeSinceEntry > 500) {
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
      // Background image: zoom only upon scroll with zero left/right movement
      if (backdropWallRef.current) {
        const bgProgress = Math.min(Math.max(zVal / TOTAL_CORRIDOR_DEPTH, 0), 1)
        const bgScale = 1 + bgProgress * 0.45
        backdropWallRef.current.style.transform = `scale(${bgScale.toFixed(4)})`
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

        lastActiveIdxRef.current = estimatedIdx
        setActiveEventIndex(estimatedIdx)
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
                transform: `scale(${0.78 + outroProgress * 0.32})`,
                opacity: outroProgress < 0.2 ? 0 : Math.min(1, (outroProgress - 0.2) / 0.62)
              }}
              aria-hidden="true"
            />

            {/* Outro Exterior Citadel: Anchored in center, zooms into gate */}
            <div
              className="events-outro-bg"
              style={{
                backgroundImage: `url(${eventOutroImg})`,
                transform: `scale(${1 + outroProgress * 3.4})`,
                transformOrigin: '50% 51%',
                opacity: outroProgress < 0.55 ? 1 : Math.max(0, 1 - (outroProgress - 0.55) / 0.36)
              }}
              aria-hidden="true"
            />

            {/* Subtle Atmosphere Light Vignette */}
            <div
              className="events-outro-ambient"
              style={{ opacity: 0.3 + outroProgress * 0.45 }}
              aria-hidden="true"
            />

            {/* Outro Clean Title & Japanese Edict */}
            <div
              className="events-outro-content"
              style={{
                opacity: Math.max(1 - outroProgress * 2.2, 0),
                transform: `scale(${1 - outroProgress * 0.2})`
              }}
            >
              <h1 className="events-outro-title">
                SCROLL TO <span className="anime-text-glow">ENTER CITADEL</span>
              </h1>

              <div className="events-outro-scroll-hint">
                <span className="scroll-hint-icon">↓</span>
                <span className="scroll-hint-text">  ({Math.round(outroProgress * 100)}%)</span>
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
                style={{ width: `${outroProgress * 100}%` }}
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

            {/* Atmospheric Background Corridor Wall */}
            <div
              ref={backdropWallRef}
              className="techfest-backdrop-wall"
              style={{ backgroundImage: `url(${eventInsideImg})` }}
              aria-hidden="true"
            />
            <div className="techfest-backdrop-vignette" aria-hidden="true" />


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
                onClick={() => scrollToExhibit(Math.max(0, activeEventIndex - 1))}
                disabled={activeEventIndex === 0}
                title="Walk to Previous Exhibit"
              >
                &lt;
              </button>

              <div className="techfest-dock-indicators">
                {computedExhibits.map((ev, idx) => (
                  <button
                    key={ev.id}
                    type="button"
                    className={`techfest-dock-dot ${activeEventIndex === idx ? 'is-active' : ''}`}
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
                onClick={() => scrollToExhibit(Math.min(computedExhibits.length - 1, activeEventIndex + 1))}
                disabled={activeEventIndex === computedExhibits.length - 1}
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
            {/* Top action header */}
            <div className="centered-dossier__header">
              <div className="centered-dossier__tag-group">
                <span className="centered-dossier__tag-icon">⚡</span>
                <span className="centered-dossier__tag-title">MISSION DOSSIER // 任務概要</span>
                <span className="centered-dossier__number">
                  EXHIBIT {activeOpenedEvent.index !== undefined ? activeOpenedEvent.index + 1 : activeOpenedEvent.id} / {computedExhibits.length}
                </span>
              </div>

              <div className="centered-dossier__header-right">
                <span
                  className="centered-dossier__rank-badge"
                  style={{ borderColor: activeOpenedEvent.color, color: activeOpenedEvent.color }}
                >
                  {activeOpenedEvent.rank}
                </span>
                <button
                  type="button"
                  className="centered-dossier__close-btn"
                  onClick={() => setOpenedEventId(null)}
                  aria-label="Close details card"
                >
                  ✕ CLOSE
                </button>
              </div>
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
                <div className="centered-dossier__element-pill">
                  <span>{activeOpenedEvent.element}</span>
                </div>
              </div>

              {/* Information & Specs */}
              <div className="centered-dossier__info">
                <div className="centered-dossier__meta-row">
                  <span className="centered-dossier__cat-icon">{activeOpenedEvent.icon}</span>
                  <span className="centered-dossier__category">{activeOpenedEvent.category}</span>
                </div>

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
                  <div className="centered-dossier__spec-card centered-dossier__spec-card--bounty">
                    <span className="spec-label">🏆 BOUNTY</span>
                    <span className="spec-val" style={{ color: '#ffb703' }}>
                      {activeOpenedEvent.prize}
                    </span>
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
