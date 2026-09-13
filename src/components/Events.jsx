import { useState, useEffect, useRef } from 'react'
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
    color: '#ff6b35',
    image: art1,
    side: 'left',
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
    color: '#7b2ff7',
    image: art2,
    side: 'right',
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
    color: '#00f5d4',
    image: art3,
    side: 'left',
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
    color: '#ffd700',
    image: art4,
    side: 'right',
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
    color: '#4361ee',
    image: art5,
    side: 'left',
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
    color: '#ff9e00',
    image: art6,
    side: 'right',
    snippet: '24-hour non-stop code sprint building breakthrough AI, Web3, and Cloud solutions.',
    description: 'The flagship 24-hour hackathon of TechUthopia! Code through the midnight hour, solve real-world industry problem statements, and present live working deployments to senior architects.',
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
    color: '#e63946',
    image: art7,
    side: 'left',
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
    color: '#00b4d8',
    image: art8,
    side: 'right',
    snippet: 'Theme-based on-spot photography and cinematic storytelling competition.',
    description: 'Capture the soul, energy, and cyberpunk lights of TechUthopia. Judged on creative composition, lighting mastery, framing, and narrative storytelling without excessive post-filters.',
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
    color: '#f77f00',
    image: art9,
    side: 'left',
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
    icon: '🎨',
    color: '#d90429',
    image: art10,
    side: 'right',
    snippet: 'Prompt engineering, generative video, and procedural audio synthesis clash.',
    description: 'Harness diffusion models, LLMs, and neural audio synthesizers to produce an immersive multimedia campaign or anime trailer in under 4 hours based on an unannounced prompt theme.',
    date: 'Day 2 • 2:00 PM - 6:00 PM',
    venue: 'Digital Arts & AI Lab',
    prize: '₹40,000 + AI Subscriptions',
    team: 'Solo / Duo'
  },
  {
    id: 11,
    title: 'Andhadhun',
    rank: 'CHAOS TRIAL',
    threat: 'SPECIAL',
    element: 'SENSE',
    category: 'Mystery & Skill',
    icon: '🕶️',
    color: '#ff007f',
    image: art11,
    side: 'left',
    snippet: 'Type flawless algorithms with the screen turned off, followed by musical tuning rounds.',
    description: 'Inspired by the iconic cinematic thriller! Contestants face code challenges with monitors switched off, relying purely on muscle memory and syntax cognition, combined with ear-training musical quizzes.',
    date: 'Day 2 • 10:30 AM - 1:30 PM',
    venue: 'Computing Lab 4, UEM Jaipur',
    prize: '₹35,000 + Goodies',
    team: 'Solo'
  },
  {
    id: 12,
    title: 'Food Fest',
    rank: 'OPEN CELEBRATION',
    threat: 'TASTE',
    element: 'FEAST',
    category: 'Culinary & Fun',
    icon: '🍜',
    color: '#fb8500',
    image: art12,
    side: 'right',
    snippet: 'Gastronomic culinary stalls, fast-eating showdowns, and mocktail alchemy.',
    description: 'Experience flavors from across the continent with pop-up street food stalls, live culinary battles, blind tasting challenges, and student chef masterclasses celebrating festival delicacies.',
    date: 'All Days • 12:00 PM - 8:00 PM',
    venue: 'Food Court Promenade, UEM Jaipur',
    prize: '₹25,000 MasterChef Honors',
    team: 'Solo / Squad'
  },
  {
    id: 13,
    title: 'Auto Expo',
    rank: 'PREMIER SHOWCASE',
    threat: 'TORQUE',
    element: 'NITRO',
    category: 'Automotive & EVs',
    icon: '🏎️',
    color: '#023e8a',
    image: art13,
    side: 'left',
    snippet: 'Superbikes, electric go-karts, modified cars, and Formula Student vehicles on display.',
    description: 'A powerhouse showcase of engineering horsepower. Explore custom student-engineered electric racecars, tuned supercars, vintage motorcycles, and innovative aerodynamic powertrain designs.',
    date: 'Day 1 - Day 2 • Full Day',
    venue: 'Main Driveway Arena & Track',
    prize: '₹50,000 Auto Innovator Award',
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
    color: '#ff0055',
    image: art14,
    side: 'right',
    snippet: 'Anime cosplay masquerade, avant-garde cyber couture, and celebrity runway night.',
    description: 'The grand closing spectacle of TechUthopia! Designers, models, and anime cosplayers take the illuminated ramp in theatrical costumes combining neon cybernetics with traditional high fashion.',
    date: 'Day 2 • 6:30 PM - 10:00 PM (Grand Finale)',
    venue: 'Grand Amphitheatre Open Stage',
    prize: '₹70,000 + Fashion Crowns',
    team: 'Guild Roster / Squad'
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
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 860)
  const activeMobileEvent = eventsDataset.find((e) => e.id === openedEventId)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
      // Allow registration button click or mobile modal interactions
      if (e.target.closest('.dossier-reg-btn') || e.target.closest('.mobile-quest-modal')) {
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

          {/* Screen-wide Backdrop Dismiss Overlay for Desktop */}
          {openedEventId !== null && !isMobile && (
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

                      {/* If right-side poster, Details Dossier renders on left (in the middle of the screen) - DESKTOP ONLY */}
                      {!isLeft && isOpened && !isMobile && (
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

                      {/* If right-side poster, Chain connects between center dossier and right poster - DESKTOP ONLY */}
                      {!isLeft && isOpened && !isMobile && (
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

                      {/* If left-side poster, Chain connects from left poster into the center - DESKTOP ONLY */}
                      {isLeft && isOpened && !isMobile && (
                        <ChainBridge direction="right" />
                      )}

                      {/* If left-side poster, Details Dossier renders on right (in the middle of the screen) - DESKTOP ONLY */}
                      {isLeft && isOpened && !isMobile && (
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

      {/* ════════════ DEDICATED MOBILE MISSION DOSSIER VIEW (FULLSCREEN BOTTOM SHEET) ════════════ */}
      {isMobile && activeMobileEvent && (
        <div 
          className="mobile-quest-modal-overlay"
          onClick={() => setOpenedEventId(null)}
        >
          <div 
            className="mobile-quest-modal"
            style={{ '--event-color': activeMobileEvent.color }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="mobile-quest-modal__handle-bar" onClick={() => setOpenedEventId(null)}>
              <span className="mobile-quest-modal__drag-pill" />
            </div>

            {/* Top action header */}
            <div className="mobile-quest-modal__header">
              <div className="mobile-quest-modal__tag">
                <span className="mobile-quest-modal__tag-icon">⛓️</span>
                <span>MISSION DOSSIER</span>
              </div>
              <button
                type="button"
                className="mobile-quest-modal__close-btn"
                onClick={() => setOpenedEventId(null)}
                aria-label="Close quest details"
              >
                ✕ CLOSE
              </button>
            </div>

            {/* Scrollable Quest Body */}
            <div className="mobile-quest-modal__body">
              {/* Banner with image and badges */}
              <div className="mobile-quest-modal__banner">
                <img
                  src={activeMobileEvent.image}
                  alt={activeMobileEvent.title}
                  className="mobile-quest-modal__banner-img"
                />
                <div className="mobile-quest-modal__banner-overlay" />
                <div className="mobile-quest-modal__badge-row">
                  <span
                    className="mobile-quest-modal__rank-badge"
                    style={{ borderColor: activeMobileEvent.color, color: activeMobileEvent.color }}
                  >
                    {activeMobileEvent.rank}
                  </span>
                  <span className="mobile-quest-modal__element-tag">
                    {activeMobileEvent.element}
                  </span>
                </div>
              </div>

              {/* Title and category */}
              <div className="mobile-quest-modal__title-section">
                <div className="mobile-quest-modal__cat">
                  <span>{activeMobileEvent.icon}</span>
                  <span>{activeMobileEvent.category}</span>
                </div>
                <h3 className="mobile-quest-modal__title">{activeMobileEvent.title}</h3>
              </div>

              {/* Mission Briefing */}
              <div className="mobile-quest-modal__briefing-card">
                <div className="mobile-quest-modal__section-label">MISSION BRIEFING // 任務概要</div>
                <p className="mobile-quest-modal__desc">{activeMobileEvent.description}</p>
              </div>

              {/* Specification Grid */}
              <div className="mobile-quest-modal__specs-grid">
                <div className="mobile-quest-modal__spec-card">
                  <span className="spec-label">📅 SCHEDULE</span>
                  <span className="spec-val">{activeMobileEvent.date}</span>
                </div>
                <div className="mobile-quest-modal__spec-card">
                  <span className="spec-label">📍 VENUE</span>
                  <span className="spec-val">{activeMobileEvent.venue}</span>
                </div>
                <div className="mobile-quest-modal__spec-card">
                  <span className="spec-label">👥 GUILD SQUAD</span>
                  <span className="spec-val">{activeMobileEvent.team}</span>
                </div>
                <div className="mobile-quest-modal__spec-card mobile-quest-modal__spec-card--bounty">
                  <span className="spec-label">🏆 BOUNTY</span>
                  <span className="spec-val" style={{ color: '#ffd700' }}>{activeMobileEvent.prize}</span>
                </div>
              </div>
            </div>

            {/* Sticky Bottom Actions */}
            <div className="mobile-quest-modal__footer">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary mobile-quest-modal__cta-btn dossier-reg-btn"
                onClick={(e) => e.stopPropagation()}
              >
                <span>⚡ REGISTER VIA GOOGLE FORM ↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
