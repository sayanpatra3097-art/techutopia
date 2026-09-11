import { useState, useEffect, useRef } from 'react'
import eventOutroImg from '../assets/event_outro.png'
import eventInsideImg from '../assets/event_inside.png'

import art1Local from '../assets/1.png'
import art2Local from '../assets/2.png'
import art3Local from '../assets/3.png'
import art4Local from '../assets/4.png'
import art5Local from '../assets/5.png'
import art6Local from '../assets/6.png'
import art7Local from '../assets/7.png'
import art8Local from '../assets/8.png'
import art9Local from '../assets/9.png'
import { getAssetUrl } from '../utils/cloudinary'

const art1 = getAssetUrl('1.png', art1Local)
const art2 = getAssetUrl('2.png', art2Local)
const art3 = getAssetUrl('3.png', art3Local)
const art4 = getAssetUrl('4.png', art4Local)
const art5 = getAssetUrl('5.png', art5Local)
const art6 = getAssetUrl('6.png', art6Local)
const art7 = getAssetUrl('7.png', art7Local)
const art8 = getAssetUrl('8.png', art8Local)
const art9 = getAssetUrl('9.png', art9Local)

const eventsDataset = [
  {
    id: 1,
    title: 'Shadow Monarch Code Clash',
    rank: 'S-RANK RAID',
    threat: 'S-TIER',
    element: 'SHADOW',
    category: 'Coding',
    icon: '⚔️',
    color: '#ff9e00',
    image: art1,
    side: 'left',
    snippet: 'Competitive algorithmic speed-clash. Solve 5 legendary bosses before the time portal shuts down.',
    description: 'A multi-round algorithmic battleground testing data structures, dynamic programming, and logic. Code faster than your shadow.',
    date: 'Day 1 • 10:00 AM - 1:00 PM',
    venue: 'Auditorium Hall A, UEM Jaipur',
    prize: '₹50,000 + S-Rank Trophy',
    team: 'Solo / Duo'
  },
  {
    id: 2,
    title: 'Hashira Hackathon (24hr)',
    rank: 'SUPREME SUMMON',
    threat: 'MYTHIC',
    element: 'FLAME',
    category: 'Hackathon',
    icon: '🔥',
    color: '#ff6b35',
    image: art2,
    side: 'right',
    snippet: '24-hour marathon sprint. Build breakthrough AI, Web3, or Cyber products under the heat of the forge.',
    description: 'Set your hearts ablaze! Prototype, build, and deploy production-ready solutions before the 24-hour clock expires.',
    date: 'Day 1 - Day 2 • 24 Hours',
    venue: 'Innovation Sandbox Lab, UEM Jaipur',
    prize: '₹1,00,000 + Incubation',
    team: 'Squad of 2-4'
  },
  {
    id: 3,
    title: 'Mecha Titan Arena',
    rank: 'A-RANK COLISEUM',
    threat: 'A-TIER',
    element: 'STEEL',
    category: 'Robotics',
    icon: '🤖',
    color: '#b537f2',
    image: art3,
    side: 'left',
    snippet: 'Heavyweight autonomous & manual combat robots. Push rival mechas off the electro-ring.',
    description: 'Custom-engineered combat robots clash in high-voltage physics matches. Armed with spinning blades and pneumatic flippers.',
    date: 'Day 2 • 2:00 PM - 6:00 PM',
    venue: 'Workshop Bay, Mechanical Block',
    prize: '₹75,000 + Hardware Kits',
    team: 'Team of 3-5'
  },
  {
    id: 4,
    title: 'Neural Network Dojo',
    rank: 'A-RANK INTELLECT',
    threat: 'A-TIER',
    element: 'PSIONIC',
    category: 'AI/ML',
    icon: '🧠',
    color: '#4361ee',
    image: art4,
    side: 'right',
    snippet: 'Kaggle-style live AI sprint on an unreleased blind dataset. Train the supreme neural model.',
    description: 'Computer vision and LLM fine-tuning challenges where efficiency and precision determine the Grand Sensei.',
    date: 'Day 2 • 11:00 AM - 3:00 PM',
    venue: 'CS Research Lab 2, UEM Jaipur',
    prize: '₹40,000 + GPU Credits',
    team: 'Solo / Duo'
  },
  {
    id: 5,
    title: 'Breathing Form: UI/UX Sprint',
    rank: 'B-RANK CRAFT',
    threat: 'B-TIER',
    element: 'WATER',
    category: 'Design',
    icon: '🎨',
    color: '#00f5d4',
    image: art5,
    side: 'left',
    snippet: '4-hour design blitz. Craft an anime-themed glassmorphism interface with impeccable micro-interactions.',
    description: 'Flow like water. Redesign digital experiences using Figma or Spline. Evaluated on aesthetic hierarchy and storytelling.',
    date: 'Day 1 • 2:30 PM - 6:30 PM',
    venue: 'Design Studio Lab, UEM Jaipur',
    prize: '₹30,000 + Design Licenses',
    team: 'Solo'
  },
  {
    id: 6,
    title: 'Dungeon Raid: Cyber CTF',
    rank: 'S-RANK DEFENSE',
    threat: 'S-TIER',
    element: 'VOID',
    category: 'Security',
    icon: '🛡️',
    color: '#e63946',
    image: art6,
    side: 'right',
    snippet: 'Reverse engineer binaries, bypass firewalls, and extract encrypted flags in multi-tier vaults.',
    description: 'Penetration testing and cryptography capture-the-flag. Neutralize vulnerabilities before other squads breach the vault.',
    date: 'Day 3 • 10:00 AM - 2:00 PM',
    venue: 'Network Security Lab, UEM Jaipur',
    prize: '₹45,000 + Certifications',
    team: 'Team of 3'
  },
  {
    id: 7,
    title: 'Boss Battle: Gaming Arena',
    rank: 'OPEN CHAMPIONSHIP',
    threat: 'CHAOS',
    element: 'LIGHTNING',
    category: 'Gaming',
    icon: '🎮',
    color: '#ffd700',
    image: art7,
    side: 'left',
    snippet: 'Valorant & BGMI esports face-off on the central arena jumbotron with live shoutcasting.',
    description: '5v5 tactical shooter showdown. Strategy, reflexes, and team synergy to claim the TechUthopia Crown.',
    date: 'Day 1 - Day 3 • All Tournament Days',
    venue: 'Indoor Sports Coliseum, UEM Jaipur',
    prize: '₹60,000 + Gaming Gear',
    team: 'Roster of 5'
  },
  {
    id: 8,
    title: 'Infinity Castle: Web Dev Clash',
    rank: 'A-RANK DEV',
    threat: 'A-TIER',
    element: 'SPATIAL',
    category: 'Coding',
    icon: '🌐',
    color: '#7b2ff7',
    image: art8,
    side: 'right',
    snippet: 'Build a production-level responsive WebGL / Three.js web app live in 6 hours.',
    description: 'Inspired by the morphing rooms of the Infinity Castle. Test your mastery of React, modern CSS, and spatial web.',
    date: 'Day 2 • 9:30 AM - 3:30 PM',
    venue: 'Main Computer Center, UEM Jaipur',
    prize: '₹55,000 + Host Credits',
    team: 'Duo'
  },
  {
    id: 9,
    title: 'Demon Art: 3D Blender Dojo',
    rank: 'WORKSHOP QUEST',
    threat: 'SPECIAL',
    element: 'ALCHEMY',
    category: 'Workshop',
    icon: '🎭',
    color: '#ff0055',
    image: art9,
    side: 'left',
    snippet: 'Hands-on masterclass on creating anime characters and procedural shaders in Blender.',
    description: 'Learn industry-standard 3D character modeling, anime cell shading, and animation directly from studio artists.',
    date: 'Day 3 • 11:00 AM - 3:00 PM',
    venue: 'Creative Media Suite, UEM Jaipur',
    prize: 'Certified Hunter Badge',
    team: 'Individual Entry'
  }
]

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm/viewform"

function ChainBridge({ direction = 'right' }) {
  return (
    <div className={`chain-bridge-container chain-bridge--${direction}`} aria-hidden="true">
      {/* Top Chain Line */}
      <div className="chain-line chain-line--top">
        <svg className="chain-svg" viewBox="0 0 120 28" fill="none">
          <defs>
            <linearGradient id={`chainGrad-top-${direction}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#e63946" />
            </linearGradient>
          </defs>
          <rect x="2" y="6" width="16" height="16" rx="5" stroke={`url(#chainGrad-top-${direction})`} strokeWidth="3" fill="rgba(6, 8, 16, 0.7)" />
          <line x1="16" y1="14" x2="28" y2="14" stroke="#ffd700" strokeWidth="4" strokeLinecap="round" />
          <rect x="26" y="6" width="18" height="16" rx="5" stroke={`url(#chainGrad-top-${direction})`} strokeWidth="3" fill="rgba(6, 8, 16, 0.7)" />
          <line x1="42" y1="14" x2="54" y2="14" stroke="#ff3b30" strokeWidth="4" strokeLinecap="round" />
          <rect x="52" y="6" width="18" height="16" rx="5" stroke={`url(#chainGrad-top-${direction})`} strokeWidth="3" fill="rgba(6, 8, 16, 0.7)" />
          <line x1="68" y1="14" x2="80" y2="14" stroke="#ff6b35" strokeWidth="4" strokeLinecap="round" />
          <rect x="78" y="6" width="18" height="16" rx="5" stroke={`url(#chainGrad-top-${direction})`} strokeWidth="3" fill="rgba(6, 8, 16, 0.7)" />
          <line x1="94" y1="14" x2="106" y2="14" stroke="#ffd700" strokeWidth="4" strokeLinecap="round" />
          <rect x="104" y="6" width="14" height="16" rx="5" stroke={`url(#chainGrad-top-${direction})`} strokeWidth="3" fill="rgba(6, 8, 16, 0.7)" />
        </svg>
      </div>

      {/* Central Glowing Runic Seal Core */}
      <div className="chain-runic-core">
        <span className="chain-pulse-gem">◆</span>
        <span className="chain-runic-text">SOUL CHAIN // BIND</span>
        <span className="chain-pulse-gem">◆</span>
      </div>

      {/* Bottom Chain Line */}
      <div className="chain-line chain-line--bottom">
        <svg className="chain-svg" viewBox="0 0 120 28" fill="none">
          <defs>
            <linearGradient id={`chainGrad-bot-${direction}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e63946" />
              <stop offset="50%" stopColor="#ff6b35" />
              <stop offset="100%" stopColor="#ffd700" />
            </linearGradient>
          </defs>
          <rect x="2" y="6" width="16" height="16" rx="5" stroke={`url(#chainGrad-bot-${direction})`} strokeWidth="3" fill="rgba(6, 8, 16, 0.7)" />
          <line x1="16" y1="14" x2="28" y2="14" stroke="#e63946" strokeWidth="4" strokeLinecap="round" />
          <rect x="26" y="6" width="18" height="16" rx="5" stroke={`url(#chainGrad-bot-${direction})`} strokeWidth="3" fill="rgba(6, 8, 16, 0.7)" />
          <line x1="42" y1="14" x2="54" y2="14" stroke="#ff3b30" strokeWidth="4" strokeLinecap="round" />
          <rect x="52" y="6" width="18" height="16" rx="5" stroke={`url(#chainGrad-bot-${direction})`} strokeWidth="3" fill="rgba(6, 8, 16, 0.7)" />
          <line x1="68" y1="14" x2="80" y2="14" stroke="#ffd700" strokeWidth="4" strokeLinecap="round" />
          <rect x="78" y="6" width="18" height="16" rx="5" stroke={`url(#chainGrad-bot-${direction})`} strokeWidth="3" fill="rgba(6, 8, 16, 0.7)" />
          <line x1="94" y1="14" x2="106" y2="14" stroke="#ff6b35" strokeWidth="4" strokeLinecap="round" />
          <rect x="104" y="6" width="14" height="16" rx="5" stroke={`url(#chainGrad-bot-${direction})`} strokeWidth="3" fill="rgba(6, 8, 16, 0.7)" />
        </svg>
      </div>
    </div>
  )
}

export default function Events() {
  // 'outro' (Citadel entrance with scroll zoom) -> 'pixel' (Tiny pixel dissolve) -> 'inside' (3D walking gallery room)
  const [stage, setStage] = useState('outro')
  const [outroProgress, setOutroProgress] = useState(0)
  const [isPixelFading, setIsPixelFading] = useState(false)
  const [pixelFadeProgress, setPixelFadeProgress] = useState(0) // 0 to 1
  const [walkProgress, setWalkProgress] = useState(0) // 0 to 1 inside room
  const [openedEventId, setOpenedEventId] = useState(null)

  const outroTrackRef = useRef(null)
  const insideTrackRef = useRef(null)
  const canvasRef = useRef(null)
  const transitionCooldownRef = useRef(false)
  const hasWalkedForwardRef = useRef(false)
  const insideEntryTimeRef = useRef(Date.now())

  useEffect(() => {
    if (stage === 'inside') {
      insideEntryTimeRef.current = Date.now()
      hasWalkedForwardRef.current = false
    }
  }, [stage])

  // ───── CLOSE OPENED DETAILS UPON TAPPING ANYWHERE ON THE SCREEN ─────
  useEffect(() => {
    if (!openedEventId) return

    const handleGlobalTap = (e) => {
      // Allow registration button click to proceed to Google Form
      if (e.target.closest('.dossier-reg-btn')) {
        return
      }
      setOpenedEventId(null)
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpenedEventId(null)
      }
    }

    // Small delay ensures the event that opened the poster doesn't immediately dismiss it
    const timer = setTimeout(() => {
      window.addEventListener('click', handleGlobalTap)
      window.addEventListener('touchstart', handleGlobalTap, { passive: true })
    }, 60)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('click', handleGlobalTap)
      window.removeEventListener('touchstart', handleGlobalTap)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [openedEventId])

  // ───── 1. OUTRO SCROLL ZOOM (NO UPWARD MOVEMENT, PURE ZOOM INTO CENTER GATE) ─────
  useEffect(() => {
    if (stage !== 'outro') return

    const handleOutroScroll = () => {
      if (transitionCooldownRef.current) return
      const el = outroTrackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1)
      setOutroProgress(progress)

      // Trigger micro-pixel animation once scrolled near the end of center zoom
      if (progress >= 0.88 && !isPixelFading) {
        startPixelFadeTransition('forward')
      }
    }

    window.addEventListener('scroll', handleOutroScroll, { passive: true })
    handleOutroScroll()
    return () => window.removeEventListener('scroll', handleOutroScroll)
  }, [stage, isPixelFading])

  // ───── 2. BIDIRECTIONAL TINY FADING PIXELS TRANSITION ─────
  const startPixelFadeTransition = (direction = 'forward') => {
    if (isPixelFading || transitionCooldownRef.current) return
    setIsPixelFading(true)
    transitionCooldownRef.current = true

    let start = null
    const duration = 600 // ms

    const animatePixels = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const t = Math.min(elapsed / duration, 1)
      setPixelFadeProgress(t)

      // Halfway through the tiny pixel dissolve, switch stage
      if (t >= 0.48) {
        if (direction === 'forward' && stage === 'outro') {
          setStage('inside')
          window.scrollTo({ top: 0, behavior: 'instant' })
        } else if (direction === 'reverse' && stage === 'inside') {
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
          }, 25)
        }
      }

      if (t < 1) {
        requestAnimationFrame(animatePixels)
      } else {
        setIsPixelFading(false)
        setPixelFadeProgress(0)
        setTimeout(() => {
          transitionCooldownRef.current = false
        }, 800)
      }
    }

    requestAnimationFrame(animatePixels)
  }

  const returnToOutro = () => {
    startPixelFadeTransition('reverse')
  }

  // Draw tiny fading pixels on the canvas
  useEffect(() => {
    if (!isPixelFading || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const pixelSize = 6 // very small micro-pixels
    const cols = Math.ceil(canvas.width / pixelSize)
    const rows = Math.ceil(canvas.height / pixelSize)

    // Density curve: spikes at 0.5 then dissolves away
    const density = pixelFadeProgress < 0.5
      ? pixelFadeProgress * 2
      : (1 - pixelFadeProgress) * 2

    const count = Math.floor(cols * rows * density * 0.45)
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * cols) * pixelSize
      const y = Math.floor(Math.random() * rows) * pixelSize
      const rVal = Math.random()
      if (rVal > 0.6) {
        ctx.fillStyle = `rgba(255, 30, 70, ${0.4 + Math.random() * 0.5})`
      } else if (rVal > 0.3) {
        ctx.fillStyle = `rgba(255, 215, 0, ${0.3 + Math.random() * 0.5})`
      } else {
        ctx.fillStyle = `rgba(0, 212, 255, ${0.3 + Math.random() * 0.5})`
      }
      ctx.fillRect(x, y, pixelSize, pixelSize)
    }
  }, [isPixelFading, pixelFadeProgress])

  // ───── 3. INSIDE 3D ROOM WALKING SCROLL & SCROLL-BACK-TO-OUTRO ─────
  useEffect(() => {
    if (stage !== 'inside') return

    const handleInsideScroll = () => {
      const el = insideTrackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return

      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1)
      setWalkProgress(progress)

      if (progress > 0.03) {
        hasWalkedForwardRef.current = true
      }

      // If user has walked forward into exhibits and scrolls back up to the entrance
      if (
        hasWalkedForwardRef.current &&
        progress <= 0.005 &&
        window.scrollY <= 10 &&
        !isPixelFading &&
        !transitionCooldownRef.current
      ) {
        returnToOutro()
      }
    }

    // Wheel event to catch scrolling up when at the entrance of inside room
    const handleWheel = (e) => {
      if (isPixelFading || transitionCooldownRef.current) return
      if (e.deltaY < -15 && window.scrollY <= 10) {
        const timeSinceEntry = Date.now() - insideEntryTimeRef.current
        if (hasWalkedForwardRef.current || timeSinceEntry > 600) {
          returnToOutro()
        }
      }
    }

    // Touch event to catch swipe-down when at the entrance of inside room on mobile
    let touchStartY = 0
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e) => {
      if (isPixelFading || transitionCooldownRef.current) return
      const currentY = e.touches[0].clientY
      const diffY = currentY - touchStartY // swiping down -> scrolling up
      if (diffY > 50 && window.scrollY <= 10) {
        const timeSinceEntry = Date.now() - insideEntryTimeRef.current
        if (hasWalkedForwardRef.current || timeSinceEntry > 600) {
          returnToOutro()
        }
      }
    }

    window.addEventListener('scroll', handleInsideScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    handleInsideScroll()

    return () => {
      window.removeEventListener('scroll', handleInsideScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [stage, isPixelFading])

  // Calculate active event index based on walkProgress (0 to 8)
  const activeEventIndex = Math.min(
    Math.floor(walkProgress * eventsDataset.length),
    eventsDataset.length - 1
  )

  // Camera horizontal swerve: zoom left and right distinctly as we walk down the corridor
  const cameraSwerveX = Math.sin(walkProgress * Math.PI * (eventsDataset.length - 1)) * 82

  // Total corridor depth span in 3D
  const SPACING_Z = 340 // pixels between consecutive posters down the hallway
  const totalWalkDistance = (eventsDataset.length - 1) * SPACING_Z

  const scrollToEvent = (index) => {
    const el = insideTrackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const scrollable = rect.height - window.innerHeight
    const targetProgress = index / (eventsDataset.length - 1)
    const targetY = window.scrollY + rect.top + targetProgress * scrollable
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  return (
    <div className="events-experience-wrapper">

      {/* ════════════ TINY PIXEL DISSOLVE CANVAS OVERLAY ════════════ */}
      {isPixelFading && (
        <canvas
          ref={canvasRef}
          className="micro-pixel-fade-canvas"
          aria-hidden="true"
        />
      )}

      {/* ════════════ STAGE 1: EVENT OUTRO (PURE CENTER ZOOM, NO UPWARD MOVEMENT) ════════════ */}
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

            {/* Outro Exterior Citadel: Anchored in center, NO translateY upwards, zooms into gate */}
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

              {/* Minimal Clean Scroll Cue (No click button) */}
              <div className="events-outro-scroll-hint">
                <span className="scroll-hint-icon">↓</span>
                <span className="scroll-hint-text">  ({Math.round(outroProgress * 100)}%)</span>
                <span className="scroll-hint-icon">↓</span>
              </div>
            </div>

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

      {/* ════════════ STAGE 2: 3D WALKING GALLERY CORRIDOR (event_inside.png) ════════════ */}
      {stage === 'inside' && (
        <div className="events-gallery-room-track" ref={insideTrackRef}>

          {/* Inside Background: Zooming left and right with dynamic 3D perspective as we walk */}
          <div
            className="events-room-bg"
            style={{
              backgroundImage: `url(${eventInsideImg})`,
              transform: `scale(${1.08 + walkProgress * 0.42}) translateX(${-cameraSwerveX * 0.65}px)`
            }}
            aria-hidden="true"
          />

          <div className="events-room-ambient" aria-hidden="true" />

          {/* Top Interactive Header */}
          <div className="events-room-header">
            <div className="events-room-header__container">
              <button
                type="button"
                className="events-room-back-gate"
                onClick={returnToOutro}
                title="Return to Citadel Gate"
              >
                ⛩️ RETURN TO GATE
              </button>

              <div className="events-room-header__titles">
                <h2 className="events-room-title">
                  GRAND SANCTUM <span className="anime-text-glow">EXHIBITS</span>
                </h2>
              </div>

              <div className="events-room-step-pill">
                <span>EXHIBIT {activeEventIndex + 1} / {eventsDataset.length}</span>
              </div>
            </div>
          </div>

          {/* Screen-wide Backdrop Dismiss Overlay when any event is opened */}
          {openedEventId !== null && (
            <div
              className="dossier-backdrop-dismiss"
              onClick={() => setOpenedEventId(null)}
              title="Tap anywhere to close details"
              aria-label="Tap anywhere to close details"
            >
              <div className="dossier-dismiss-banner">
                <span className="banner-icon">✕</span>
                <span>TAP ANYWHERE ON SCREEN TO CLOSE</span>
                <span className="banner-icon">✕</span>
              </div>
            </div>
          )}

          {/* ════════════ 3D PERSPECTIVE CORRIDOR STAGE ════════════ */}
          <div className={`events-3d-corridor-stage ${openedEventId !== null ? 'has-opened-event' : ''}`}>
            <div
              className="events-3d-camera"
              style={{
                transform: `translateX(${-cameraSwerveX}px)`
              }}
            >
              {eventsDataset.map((event, index) => {
                // Calculate physical 3D distance of each poster relative to camera walk
                const posterInitialZ = -index * SPACING_Z
                const relativeZ = posterInitialZ + walkProgress * totalWalkDistance

                // Active focus calculation with enhanced left/right zoom
                const isFocused = Math.abs(relativeZ) < 155
                const isOpened = openedEventId === event.id
                const isLeft = event.side === 'left'

                // Opacity fades out if poster has passed behind the viewer (relativeZ > 130)
                // or if it's far down the hallway (relativeZ < -900)
                let itemOpacity = 1
                if (relativeZ > 130) {
                  itemOpacity = Math.max(1 - (relativeZ - 130) / 100, 0)
                } else if (relativeZ < -900) {
                  itemOpacity = Math.max(1 - (-relativeZ - 900) / 800, 0.25)
                }

                // When opened, bring into foreground with chain connection
                const focusScale = isOpened ? 1.04 : (isFocused ? 1.20 : 0.94)
                const lateralOffset = isOpened ? (isLeft ? -20 : 20) : (isFocused ? (isLeft ? 36 : -36) : 0)
                const elevationY = isOpened ? -25 : 0
                const depthZ = relativeZ + (isOpened ? 90 : 0)

                return (
                  <div
                    key={event.id}
                    className={`gallery-exhibit-mount ${isLeft ? 'mount--left' : 'mount--right'} ${isFocused ? 'is-focused' : ''} ${isOpened ? 'is-opened' : ''}`}
                    style={{
                      transform: `translate3d(${lateralOffset}px, ${elevationY}px, ${depthZ}px) scale(${focusScale})`,
                      opacity: itemOpacity,
                      pointerEvents: itemOpacity > 0.25 ? 'auto' : 'none',
                      zIndex: isOpened ? 9999 : (isFocused ? 50 : 10)
                    }}
                  >
                    {/* Hanging Ceiling Lantern & Conical Spotlight Beam */}
                    <div className="gallery-lantern-mount">
                      <div className="gallery-lantern-head">
                        <span className="lantern-gem">◆</span>
                      </div>
                      <div className={`gallery-spotlight-cone ${isFocused || isOpened ? 'is-beaming' : ''}`} />
                    </div>

                    {/* Exhibit Duo: Poster on its side, Connected Chain, and Middle Details Dossier */}
                    <div className={`gallery-exhibit-duo ${isLeft ? 'duo--left-to-center' : 'duo--right-to-center'} ${isOpened ? 'is-opened' : ''}`}>

                      {/* If right-side poster, Details Dossier renders on left (in the middle of the screen) */}
                      {!isLeft && isOpened && (
                        <div
                          className="gallery-details-dossier"
                          onClick={(e) => {
                            if (e.target.closest('.dossier-reg-btn')) return
                            setOpenedEventId(null)
                          }}
                        >
                          <div className="dossier-top-bar">
                            <div className="dossier-tag-group">
                              <span className="dossier-shackle-icon">⛓️</span>
                              <span className="dossier-tag">【 MISSION DOSSIER 】</span>
                            </div>
                            <button
                              type="button"
                              className="dossier-reseal-btn"
                              onClick={() => setOpenedEventId(null)}
                              title="Close dossier"
                            >
                              ✕ CLOSE
                            </button>
                          </div>

                          <div className="dossier-header-row">
                            <h4 className="dossier-event-name">{event.title}</h4>
                            <div className="dossier-rank-pill" style={{ borderColor: event.color, color: event.color }}>
                              {event.rank}
                            </div>
                          </div>

                          <div className="dossier-kanji-sub">{event.element}</div>
                          <p className="dossier-briefing">{event.description}</p>

                          <div className="dossier-spec-table">
                            <div className="dossier-spec-line">
                              <span className="d-label">📅 SCHEDULE:</span>
                              <span className="d-val">{event.date}</span>
                            </div>
                            <div className="dossier-spec-line">
                              <span className="d-label">📍 VENUE:</span>
                              <span className="d-val">{event.venue}</span>
                            </div>
                            <div className="dossier-spec-line">
                              <span className="d-label">👥 GUILD SQUAD:</span>
                              <span className="d-val">{event.team}</span>
                            </div>
                            <div className="dossier-spec-line">
                              <span className="d-label">🏆 BOUNTY:</span>
                              <span className="d-val" style={{ color: '#ffd700', fontWeight: 800 }}>{event.prize}</span>
                            </div>
                          </div>

                          <div className="dossier-actions">
                            <a
                              href={GOOGLE_FORM_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn--primary dossier-reg-btn"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="btn-lightning">⚡</span>
                              <span>REGISTER VIA GOOGLE FORM ↗</span>
                            </a>
                            <div className="dossier-reseal-note">
                              ✦ TAP ANYWHERE ON SCREEN TO CLOSE ✦
                            </div>
                          </div>
                        </div>
                      )}

                      {/* If right-side poster, Chain connects between center dossier and right poster */}
                      {!isLeft && isOpened && (
                        <ChainBridge direction="left" />
                      )}

                      {/* Poster Artwork Card (Always stays upright on its side!) */}
                      <div
                        className={`gallery-poster-box ${isOpened ? 'poster--active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (isOpened) {
                            setOpenedEventId(null)
                          } else {
                            setOpenedEventId(event.id)
                            scrollToEvent(index)
                          }
                        }}
                      >
                        <div className="gallery-poster__cables">
                          <span className="cable-line" />
                          <span className="cable-line" />
                        </div>

                        <div className="gallery-poster__img-frame">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="gallery-poster__img"
                          />
                          <div className="gallery-poster__rank-badge" style={{ borderColor: event.color }}>
                            <span>{event.rank}</span>
                          </div>
                          <div className="gallery-poster__threat-tag">
                            <span>{event.element}</span>
                          </div>
                        </div>

                        <div className="gallery-poster__caption">
                          <div className="gallery-poster__meta-row">
                            <span className="poster-icon">{event.icon}</span>
                            <span className="poster-cat">{event.category}</span>
                            <span className="poster-side-tag">【{isLeft ? 'LEFT' : 'RIGHT'}】</span>
                          </div>

                          <h3 className="gallery-poster__title">{event.title}</h3>

                          <div className="gallery-poster__bounty-row">
                            <span className="bounty-lbl">BOUNTY:</span>
                            <span className="bounty-val">{event.prize}</span>
                          </div>

                          <div className="gallery-poster__tap-cue">
                            <span>{isOpened ? '⛓️ CHAIN BOUND • TAP TO CLOSE ✕' : 'TAP TO SUMMON DOSSIER ⛓️'}</span>
                          </div>
                        </div>
                      </div>

                      {/* If left-side poster, Chain connects from left poster into the center */}
                      {isLeft && isOpened && (
                        <ChainBridge direction="right" />
                      )}

                      {/* If left-side poster, Details Dossier renders on right (in the middle of the screen) */}
                      {isLeft && isOpened && (
                        <div
                          className="gallery-details-dossier"
                          onClick={(e) => {
                            if (e.target.closest('.dossier-reg-btn')) return
                            setOpenedEventId(null)
                          }}
                        >
                          <div className="dossier-top-bar">
                            <div className="dossier-tag-group">
                              <span className="dossier-shackle-icon">⛓️</span>
                              <span className="dossier-tag">【 MISSION DOSSIER 】</span>
                            </div>
                            <button
                              type="button"
                              className="dossier-reseal-btn"
                              onClick={() => setOpenedEventId(null)}
                              title="Close dossier"
                            >
                              ✕ CLOSE
                            </button>
                          </div>

                          <div className="dossier-header-row">
                            <h4 className="dossier-event-name">{event.title}</h4>
                            <div className="dossier-rank-pill" style={{ borderColor: event.color, color: event.color }}>
                              {event.rank}
                            </div>
                          </div>

                          <div className="dossier-kanji-sub">{event.element}</div>
                          <p className="dossier-briefing">{event.description}</p>

                          <div className="dossier-spec-table">
                            <div className="dossier-spec-line">
                              <span className="d-label">📅 SCHEDULE:</span>
                              <span className="d-val">{event.date}</span>
                            </div>
                            <div className="dossier-spec-line">
                              <span className="d-label">📍 VENUE:</span>
                              <span className="d-val">{event.venue}</span>
                            </div>
                            <div className="dossier-spec-line">
                              <span className="d-label">👥 GUILD SQUAD:</span>
                              <span className="d-val">{event.team}</span>
                            </div>
                            <div className="dossier-spec-line">
                              <span className="d-label">🏆 BOUNTY:</span>
                              <span className="d-val" style={{ color: '#ffd700', fontWeight: 800 }}>{event.prize}</span>
                            </div>
                          </div>

                          <div className="dossier-actions">
                            <a
                              href={GOOGLE_FORM_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn--primary dossier-reg-btn"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span className="btn-lightning">⚡</span>
                              <span>REGISTER VIA GOOGLE FORM ↗</span>
                            </a>
                            <div className="dossier-reseal-note">
                              ✦ TAP ANYWHERE ON SCREEN TO CLOSE ✦
                            </div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ════════════ BOTTOM STEP DOCK (CLICK TO WALK DIRECTLY) ════════════ */}
          <div className="events-walk-dock">
            <button
              type="button"
              className="walk-dock-nav-btn"
              onClick={() => scrollToEvent(activeEventIndex - 1)}
              disabled={activeEventIndex === 0}
              title="Walk to Previous Exhibit"
            >
              ◀ PREV
            </button>

            <div className="walk-dock-indicators">
              {eventsDataset.map((ev, idx) => (
                <button
                  key={ev.id}
                  type="button"
                  className={`walk-dock-dot ${activeEventIndex === idx ? 'is-active' : ''}`}
                  onClick={() => scrollToEvent(idx)}
                  title={`Exhibit ${idx + 1} (${ev.side.toUpperCase()}): ${ev.title}`}
                >
                  <span className="dot-num">{idx + 1}</span>
                  <span className="dot-wing">{ev.side === 'left' ? 'L' : 'R'}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="walk-dock-nav-btn"
              onClick={() => scrollToEvent(activeEventIndex + 1)}
              disabled={activeEventIndex === eventsDataset.length - 1}
              title="Walk to Next Exhibit"
            >
              NEXT ▶
            </button>
          </div>

        </div>
      )}
    </div>
  )
}
