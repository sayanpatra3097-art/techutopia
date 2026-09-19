import { useState, useRef, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import animeSkyBg from '../assets/anime_sky_bg.webp'

// Authentic Anime Constellation Timeline for TechUtopia '26 (2-Day Format)
const constellationDays = {
  'DAY 01': [
    {
      id: 'd1-1',
      x: 15,
      y: 36,
      color: '#fbbf24',
      time: '10:00 AM - 04:00 PM',
      title: 'LAUNCHPAD: TECH PROJECT EXPO',
      desc: 'Grand tech project exhibition showcasing IoT, renewable energy, and AI inventions.',
      venue: 'Exhibition Center, Main Foyer',
      category: 'Project Expo',
      rank: 'A-RANK INNOVATION',
      starName: 'Launchpad',
      eventName: 'Launchpad'
    },
    {
      id: 'd1-2',
      x: 32,
      y: 28,
      color: '#ffb703',
      time: '11:00 AM - 03:00 PM',
      title: 'ROBO WAR: MECHA COLISEUM',
      desc: 'Heavyweight combat bots and autonomous rovers clashing in the steel cage arena.',
      venue: 'Mechanical Arena, Workshop Block',
      category: 'Robotics',
      rank: 'S-RANK COLISEUM',
      starName: 'Robo War',
      eventName: 'Robo War'
    },
    {
      id: 'd1-3',
      x: 48,
      y: 38,
      color: '#f59e0b',
      time: '11:30 AM - 03:00 PM',
      title: 'PHYSIO X: AGILITY & DIAGNOSTICS',
      desc: 'Advanced biomechanics testing, EMG signal analysis, and athletic speed trials.',
      venue: 'Physiotherapy Clinical Arena',
      category: 'Health Sciences',
      rank: 'ELITE BIO-CORPS',
      starName: 'Physio X',
      eventName: 'Physio X'
    },
    {
      id: 'd1-4',
      x: 34,
      y: 56,
      color: '#fde68a',
      time: '11:00 AM (24hr Non-Stop)',
      title: 'HACK PULSE: 24HR CODE SPRINT',
      desc: 'The flagship 24-hour hackathon of TechUtopia! Code through the midnight hour.',
      venue: 'Innovation Hub & Sandbox Lab',
      category: 'Hackathon',
      rank: 'SUPREME RAID',
      starName: 'Hack Pulse',
      eventName: 'Hack Pulse'
    },
    {
      id: 'd1-5',
      x: 52,
      y: 68,
      color: '#ff9a00',
      time: '12:00 PM - 08:00 PM',
      title: 'FOOD FESTIVAL & STREET ALCHEMY',
      desc: 'Gastronomic culinary stalls, fast-eating showdowns, and mocktail alchemy.',
      venue: 'Food Court Promenade, UEM Jaipur',
      category: 'Culinary & Fun',
      rank: 'OPEN CELEBRATION',
      starName: 'Food Festival',
      eventName: 'Food Festival'
    },
    {
      id: 'd1-6',
      x: 42,
      y: 78,
      color: '#fbbf24',
      time: '02:00 PM - 05:00 PM',
      title: 'GRAVITY ZONE: ZERO-G ARENA',
      desc: 'Defy terrestrial physics! Teams build aerodynamic launchers and rockets.',
      venue: 'Central University Grounds, UEM Jaipur',
      category: 'Physics & Fun',
      rank: 'A-RANK ARENA',
      starName: 'Gravity Zone',
      eventName: 'Gravity Zone'
    },
    {
      id: 'd1-7',
      x: 76,
      y: 58,
      color: '#ffb703',
      time: '02:30 PM - 05:30 PM',
      title: 'DEATH RACE: OBSTACLE RC CLASH',
      desc: 'High-velocity RC car sprint across lethal obstacle tracks and sharp chicanes.',
      venue: 'Outdoor Grand Arena & Dirt Track',
      category: 'RC Racing',
      rank: 'APEX SPEED',
      starName: 'Death Race',
      eventName: 'Death Race'
    },
    {
      id: 'd1-8',
      x: 70,
      y: 34,
      color: '#fcd34d',
      time: '03:00 PM - 06:00 PM',
      title: 'DRONE COMPETITION: FPV AIR MATRIX',
      desc: 'Pilots navigate quadcopters through an illuminated obstacle matrix in 3D airspace.',
      venue: 'Open Sky Amphitheatre Arena',
      category: 'Aeronautics & FPV',
      rank: 'AERIAL ACE',
      starName: 'Drone Competition',
      eventName: 'Drone Competition'
    },
    {
      id: 'd1-9',
      x: 86,
      y: 28,
      color: '#f59e0b',
      time: '03:00 PM - 07:00 PM',
      title: 'ESPORTS CHAMPIONSHIP (PRELIMS)',
      desc: 'High-octane BGMI, Valorant, and EA FC tactical tournament on high-refresh rigs.',
      venue: 'Indoor Sports Stadium & Gaming Dome',
      category: 'Gaming',
      rank: 'COLISEUM APEX',
      starName: 'Esports Arena',
      eventName: 'Esports Arena'
    },
    {
      id: 'd1-10',
      x: 92,
      y: 46,
      color: '#fde68a',
      time: 'Day 1 - Day 2 • All Day',
      title: 'CHRONICLES: VISUAL ECHOS',
      desc: 'Theme-based on-spot photography and cinematic storytelling competition.',
      venue: 'Media Center & Campus-Wide',
      category: 'Creative Arts',
      rank: 'B-RANK CHRONICLE',
      starName: 'Visual Echos',
      eventName: 'Visual Echos'
    }
  ],
  'DAY 02': [
    {
      id: 'd2-1',
      x: 14,
      y: 38,
      color: '#fbbf24',
      time: '10:00 AM - 02:00 PM',
      title: 'SUSTAINABILITY: CLEANTECH FORUM',
      desc: 'Present breakthrough technologies for renewable energy, water recycling, and carbon capture.',
      venue: 'Eco-Innovation Concourse, Block 2',
      category: 'CleanTech & Green',
      rank: 'GREEN TITAN',
      starName: 'Sustainability',
      eventName: 'Sustainability'
    },
    {
      id: 'd2-2',
      x: 32,
      y: 28,
      color: '#ffb703',
      time: '10:00 AM - 01:00 PM',
      title: 'PRAGATI 2.0: BIOMECHANICS',
      desc: 'Biomechanics agility sprint, posture AI analysis, and ergonomic reflex testing.',
      venue: 'Physiotherapy & Health Sciences Wing',
      category: 'Healthcare & Wellness',
      rank: 'SPECIAL GUILD',
      starName: 'PRAGATI 2.0',
      eventName: 'PRAGATI 2.0'
    },
    {
      id: 'd2-3',
      x: 48,
      y: 38,
      color: '#f59e0b',
      time: '10:30 AM - 01:30 PM',
      title: 'PROMPT VERSE: SYNTAX TRIAL',
      desc: 'Screen-off coding challenge where contestants type algorithms with monitors off.',
      venue: 'Computing Lab 4, UEM Jaipur',
      category: 'Mystery & Skill',
      rank: 'CHAOS TRIAL',
      starName: 'Prompt Verse',
      eventName: 'Prompt Verse'
    },
    {
      id: 'd2-4',
      x: 34,
      y: 58,
      color: '#fde68a',
      time: '11:00 AM - 03:00 PM',
      title: 'ROBOSOCCER: MECHA STRIKER',
      desc: 'Deploy custom-engineered manual or autonomous rovers in magnetic turf arena.',
      venue: 'Robotics Arena, Workshop Ground',
      category: 'Robotics & Sports',
      rank: 'STRIKER GUILD',
      starName: 'Robosoccer',
      eventName: 'Robosoccer'
    },
    {
      id: 'd2-5',
      x: 52,
      y: 68,
      color: '#ff9a00',
      time: '11:30 AM - 03:30 PM',
      title: 'TECHVENTURE: STARTUP ARENA',
      desc: 'Shark Tank style startup battleground pitching to angel investors.',
      venue: 'Auditorium Hall B, UEM Jaipur',
      category: 'Startup & Business',
      rank: 'S-RANK SUMMON',
      starName: 'TechVenture',
      eventName: 'TechVenture'
    },
    {
      id: 'd2-6',
      x: 42,
      y: 78,
      color: '#fbbf24',
      time: '12:00 PM - 05:00 PM',
      title: 'CYSEC: CTF CYBER WARFARE',
      desc: 'Live jeopardy-style ethical hacking battle! Penetrate server clusters and decrypt payloads.',
      venue: 'Cyber Defense Command Lab 1',
      category: 'Cybersecurity & CTF',
      rank: 'CYBER CIPHER',
      starName: 'CySec',
      eventName: 'CySec'
    },
    {
      id: 'd2-7',
      x: 66,
      y: 56,
      color: '#ffb703',
      time: '01:30 PM - 04:30 PM',
      title: 'BRIDGE BUILDING: DESTRUCTION TEST',
      desc: 'Design and construct maximum load-bearing truss bridges under calibrated testing.',
      venue: 'Civil Engineering Materials Lab',
      category: 'Civil & Mechanics',
      rank: 'B-RANK STRUCTURE',
      starName: 'Bridge Building',
      eventName: 'Bridge Building'
    },
    {
      id: 'd2-8',
      x: 78,
      y: 70,
      color: '#fcd34d',
      time: '02:00 PM - 05:30 PM',
      title: 'SHARK TANK: STARTUP ARENA',
      desc: 'High-stakes startup pitch arena directly to industry venture capitalists.',
      venue: 'Auditorium Hall B & Innovation Stage',
      category: 'Startup & Pitch',
      rank: 'S-RANK VENTURE',
      starName: 'Shark Tank',
      eventName: 'Shark Tank'
    },
    {
      id: 'd2-9',
      x: 86,
      y: 52,
      color: '#f59e0b',
      time: '04:00 PM - 06:30 PM',
      title: '24HR HACKATHON JURY PITCH',
      desc: 'Finalist squads present live working deployments before senior architects.',
      venue: 'Innovation Hub & Sandbox Lab',
      category: 'Hackathon Final',
      rank: 'SUPREME RAID',
      starName: 'Hackathon Finale',
      eventName: 'Hackathon Finale'
    },
    {
      id: 'd2-10',
      x: 74,
      y: 32,
      color: '#fde68a',
      time: '06:30 PM - 08:30 PM',
      title: 'FASHION CARNIVAL & COSPLAY',
      desc: 'Anime cosplay masquerade, cyber couture runway, and festival championships.',
      venue: 'Grand Amphitheatre Open Stage',
      category: 'Cultural Runway',
      rank: 'SUPREME GALA',
      starName: 'Fashion Carnival',
      eventName: 'Fashion Carnival'
    },
    {
      id: 'd2-11',
      x: 90,
      y: 34,
      color: '#ff9a00',
      time: '07:00 PM - 10:30 PM',
      title: 'CELEBRITY CONCERT & DJ NIGHT',
      desc: 'Live rock bands, celebrity concert, EDM DJ sets, and musical performances.',
      venue: 'Main University Stadium Open Grounds',
      category: 'Music & Cultural Fest',
      rank: 'STARLIGHT GALA',
      starName: 'Cultural Evening',
      eventName: 'Cultural Evening'
    }
  ]
}

const nodeColorPalette = [
  '#fbbf24', // Radiant Amber Gold
  '#ffb703', // Solar Amber Gold
  '#f59e0b', // Deep Honey Gold
  '#fde68a', // Luminous Pale Gold
  '#ff9a00', // Sunburst Gold
  '#fcd34d', // Warm Topaz
  '#fbbf24', // Radiant Amber Gold
  '#ffb703', // Solar Amber
  '#f59e0b', // Deep Gold
  '#fde68a', // Warm Honey
  '#ff9a00', // Sunflare Gold
]

// Animated Anime Pathfinder Walker traversing the constellation trajectory
function drawAnimeWalker(ctx, charX, charY, walkPhase, isMovingLeft, scale = 1) {
  ctx.save()
  ctx.translate(charX, charY)
  // Face walk direction
  const dir = isMovingLeft ? -1 : 1
  ctx.scale(dir * scale, scale)

  // 1. Footstep stardust particles on the constellation line
  const stepTouch = Math.sin(walkPhase)
  if (Math.abs(stepTouch) > 0.75) {
    ctx.save()
    ctx.fillStyle = 'rgba(251, 191, 36, 0.75)'
    ctx.shadowColor = '#ffb703'
    ctx.shadowBlur = 8
    ctx.beginPath()
    ctx.arc(-dir * 5, 1, 2.2, 0, Math.PI * 2)
    ctx.arc(-dir * 10, 2, 1.4, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  // Kinematic walk cycle
  const bob = -Math.abs(Math.sin(walkPhase)) * 3.2
  const hipY = -22 + bob
  const shoulderY = -35 + bob
  const headY = -46 + bob

  // Legs angles
  const leg1Swing = Math.sin(walkPhase) * 8
  const leg1Lift = Math.max(0, -Math.cos(walkPhase) * 5)
  const leg2Swing = -Math.sin(walkPhase) * 8
  const leg2Lift = Math.max(0, Math.cos(walkPhase) * 5)

  // 2. Back Leg & Boot (darker shade for depth)
  ctx.save()
  ctx.strokeStyle = '#292524'
  ctx.lineWidth = 4
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(-1, hipY)
  ctx.lineTo(leg2Swing * 0.4 - 1, hipY + 11) // Knee
  ctx.lineTo(leg2Swing, -leg2Lift) // Foot
  ctx.stroke()
  // Back Boot
  ctx.fillStyle = '#1c1917'
  ctx.beginPath()
  ctx.ellipse(leg2Swing + 2, -leg2Lift - 1, 4, 2, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // 3. Back Arm (swings opposite back leg)
  const arm2Swing = leg1Swing * 0.85
  ctx.save()
  ctx.strokeStyle = '#3f220d'
  ctx.lineWidth = 3
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(-2, shoulderY + 2)
  ctx.lineTo(arm2Swing * 0.5 - 2, shoulderY + 9)
  ctx.lineTo(arm2Swing - 1, shoulderY + 15)
  ctx.stroke()
  ctx.restore()

  // 4. Flowing Anime Trenchcoat / Scarf
  const coatFlutter1 = Math.sin(walkPhase * 1.3) * 4
  const coatFlutter2 = Math.cos(walkPhase * 1.1) * 5
  ctx.save()
  // Outer coat
  ctx.fillStyle = '#180d05'
  ctx.strokeStyle = '#ffb703'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.moveTo(-2, shoulderY + 1)
  ctx.lineTo(-4, hipY + 4)
  ctx.quadraticCurveTo(-14 + coatFlutter1, hipY + 14, -18 + coatFlutter2, hipY + 2) // Trailing hem
  ctx.lineTo(-6, shoulderY + 8)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Luminous golden scarf banner flying behind
  ctx.strokeStyle = '#fbbf24'
  ctx.lineWidth = 2.4
  ctx.shadowColor = '#ffb703'
  ctx.shadowBlur = 8
  ctx.beginPath()
  ctx.moveTo(-2, shoulderY - 1)
  ctx.bezierCurveTo(-10, shoulderY - 5, -16 + coatFlutter1, shoulderY + 2, -24 + coatFlutter2, shoulderY - 4)
  ctx.stroke()
  ctx.restore()

  // 5. Torso (Jacket & Armor Harness)
  ctx.save()
  ctx.fillStyle = '#2c1507'
  ctx.strokeStyle = '#f59e0b'
  ctx.lineWidth = 1.2
  ctx.beginPath()
  ctx.moveTo(-4, shoulderY)
  ctx.lineTo(4, shoulderY)
  ctx.lineTo(3, hipY)
  ctx.lineTo(-3, hipY)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  // Golden chest core
  ctx.fillStyle = '#ffb703'
  ctx.shadowColor = '#ffb703'
  ctx.shadowBlur = 6
  ctx.beginPath()
  ctx.arc(0, shoulderY + 6, 2, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // 6. Front Leg & Boot
  ctx.save()
  ctx.strokeStyle = '#44403c'
  ctx.lineWidth = 4.2
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(1, hipY)
  ctx.lineTo(leg1Swing * 0.4 + 1, hipY + 11) // Knee
  ctx.lineTo(leg1Swing + 1, -leg1Lift) // Foot
  ctx.stroke()
  // Knee gold armor guard
  ctx.fillStyle = '#f59e0b'
  ctx.beginPath()
  ctx.arc(leg1Swing * 0.4 + 1, hipY + 11, 2.2, 0, Math.PI * 2)
  ctx.fill()
  // Front Boot with gold sole
  ctx.fillStyle = '#0c0a09'
  ctx.beginPath()
  ctx.ellipse(leg1Swing + 3, -leg1Lift - 1, 4.5, 2.5, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#fbbf24'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(leg1Swing - 1, -leg1Lift)
  ctx.lineTo(leg1Swing + 7, -leg1Lift)
  ctx.stroke()
  ctx.restore()

  // 7. Front Arm (swings opposite front leg)
  const arm1Swing = leg2Swing * 0.85
  ctx.save()
  ctx.strokeStyle = '#572d10'
  ctx.lineWidth = 3.2
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(2, shoulderY + 2)
  ctx.lineTo(arm1Swing * 0.5 + 2, shoulderY + 9)
  ctx.lineTo(arm1Swing + 2, shoulderY + 15)
  ctx.stroke()
  // Hand with golden mana glow
  ctx.fillStyle = '#ffb703'
  ctx.shadowColor = '#ffb703'
  ctx.shadowBlur = 6
  ctx.beginPath()
  ctx.arc(arm1Swing + 2, shoulderY + 15, 2, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  // 8. Head & Face
  ctx.save()
  // Neck
  ctx.fillStyle = '#fef3c7'
  ctx.fillRect(-2, shoulderY - 3, 4, 3)

  // Face contour
  ctx.fillStyle = '#fde68a'
  ctx.beginPath()
  ctx.moveTo(0, headY - 6)
  ctx.lineTo(4, headY - 1)
  ctx.lineTo(2, headY + 5)
  ctx.lineTo(-1, headY + 5)
  ctx.lineTo(-4, headY - 1)
  ctx.closePath()
  ctx.fill()

  // Anime Glowing Eye / Visor
  ctx.fillStyle = '#38bdf8'
  ctx.shadowColor = '#38bdf8'
  ctx.shadowBlur = 8
  ctx.beginPath()
  ctx.ellipse(2, headY + 1, 2, 1.2, 0, 0, Math.PI * 2)
  ctx.fill()

  // Anime Spiky Hair (Solo Leveling / Hunter style)
  ctx.fillStyle = '#1c1917'
  ctx.beginPath()
  ctx.moveTo(-5, headY - 2)
  ctx.lineTo(-8, headY - 8)
  ctx.lineTo(-3, headY - 6)
  ctx.lineTo(-4, headY - 12) // Top spike 1
  ctx.lineTo(1, headY - 8)
  ctx.lineTo(2, headY - 13) // Top spike 2
  ctx.lineTo(5, headY - 6)
  ctx.lineTo(8, headY - 2)
  ctx.lineTo(4, headY)
  ctx.lineTo(1, headY - 2)
  ctx.lineTo(-2, headY + 1)
  ctx.closePath()
  ctx.fill()

  // Hair golden highlight tips
  ctx.fillStyle = '#f59e0b'
  ctx.beginPath()
  ctx.moveTo(2, headY - 13)
  ctx.lineTo(4, headY - 9)
  ctx.lineTo(1, headY - 8)
  ctx.closePath()
  ctx.fill()
  ctx.restore()

  // 9. Floating Pathfinder Tag above head
  ctx.save()
  ctx.font = 'bold 8px Outfit, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const tagY = headY - 14
  const tagW = 46
  const tagH = 13
  ctx.fillStyle = 'rgba(20, 10, 4, 0.85)'
  ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)'
  ctx.lineWidth = 1
  if (ctx.roundRect) {
    ctx.beginPath()
    ctx.roundRect(-tagW / 2, tagY - tagH / 2, tagW, tagH, 6)
    ctx.fill()
    ctx.stroke()
  } else {
    ctx.beginPath()
    ctx.rect(-tagW / 2, tagY - tagH / 2, tagW, tagH)
    ctx.fill()
    ctx.stroke()
  }
  ctx.fillStyle = '#fde68a'
  ctx.shadowColor = '#ffb703'
  ctx.shadowBlur = 4
  ctx.fillText('WALKER', 0, tagY + 0.5)
  ctx.restore()

  ctx.restore()
}

export default function StarConstellation() {
  const [activeDay, setActiveDay] = useState('DAY 01')
  const [hoveredStar, setHoveredStar] = useState(null)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 860)
  
  // Pan and Zoom state
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const panRef = useRef({ x: 0, y: 0 })
  const zoomRef = useRef(1)
  const isPanningRef = useRef(false)
  const panStartRef = useRef({ x: 0, y: 0, initialPanX: 0, initialPanY: 0 })

  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)
  const nodesLayerRef = useRef(null)
  const containerRef = useRef(null)
  const mobileCanvasRef = useRef(null)
  const mobileTrackRef = useRef(null)
  const isVisible = useScrollReveal(containerRef)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Keep refs in sync with state for canvas animation frame loop
  useEffect(() => {
    panRef.current = pan
  }, [pan])

  useEffect(() => {
    zoomRef.current = zoom
  }, [zoom])

  // Reset pan and zoom when day switches
  const handleDayChange = (day) => {
    setActiveDay(day)
    setHoveredStar(null)
    const resetPan = { x: 0, y: 0 }
    setPan(resetPan)
    panRef.current = resetPan
    setZoom(1)
    zoomRef.current = 1
  }

  // Handle Pan Drag
  const handlePointerDown = (e) => {
    if (e.target.closest('.constellation__star-node') || e.target.closest('.constellation__hover-card')) {
      return
    }
    isPanningRef.current = true
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialPanX: panRef.current.x,
      initialPanY: panRef.current.y
    }
  }

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isPanningRef.current) return
      const dx = e.clientX - panStartRef.current.x
      const dy = e.clientY - panStartRef.current.y
      const nextPan = {
        x: panStartRef.current.initialPanX + dx,
        y: panStartRef.current.initialPanY + dy
      }
      panRef.current = nextPan
      setPan(nextPan)
    }

    const handlePointerUp = () => {
      isPanningRef.current = false
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  // Handle Ctrl+Wheel to Zoom smoothly
  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault()
        const factor = e.deltaY < 0 ? 1.09 : 0.91
        const nextZoom = Math.max(0.35, Math.min(3.2, zoomRef.current * factor))
        zoomRef.current = nextZoom
        setZoom(nextZoom)
      }
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  const stars = constellationDays[activeDay]

  // Canvas render for constellation laser lines, directional arrows, and stars
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let isRunning = true
    let t = 0

    const resize = () => {
      if (!canvas.parentElement) return
      if (canvas.parentElement.offsetWidth === 0 || canvas.parentElement.offsetHeight === 0) return
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate layered celestial background stars (twinkling starfield across unlimited cosmos)
    const bgStars = []
    const starCount = isMobile ? 50 : 250
    for (let i = 0; i < starCount; i++) {
      bgStars.push({
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.5,
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        twinkleOffset: Math.random() * Math.PI * 2,
        isColored: Math.random() > 0.6,
        color: Math.random() > 0.5 ? 'rgba(251, 191, 36,' : 'rgba(245, 158, 11,'
      })
    }

    const render = () => {
      if (!isRunning) return
      t += 0.02
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const curZoom = zoomRef.current
      const curPan = panRef.current

      // 1. Subtle celestial warm golden nebula ambient radiance (Unlimited space, NO dark box)
      const radGrad = ctx.createRadialGradient(
        canvas.width * 0.5 + curPan.x * 0.2,
        canvas.height * 0.45 + curPan.y * 0.2,
        20,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.85
      )
      radGrad.addColorStop(0, 'rgba(251, 191, 36, 0.12)')
      radGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.04)')
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = radGrad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 2. Draw twinkling background stars in warm gold and champagne white
      bgStars.forEach(s => {
        const px = s.baseX * curZoom + curPan.x * 0.15
        const py = s.baseY * curZoom + curPan.y * 0.15

        const wrappedX = ((px % canvas.width) + canvas.width) % canvas.width
        const wrappedY = ((py % canvas.height) + canvas.height) % canvas.height
        const alpha = 0.25 + Math.sin(t * s.twinkleSpeed * 10 + s.twinkleOffset) * 0.35

        ctx.fillStyle = s.isColored ? `rgba(251, 191, 36, ${alpha})` : `rgba(254, 243, 199, ${alpha})`
        ctx.beginPath()
        ctx.arc(wrappedX, wrappedY, s.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // 3. Convert star coordinates to screen space in sync with Pan & Zoom
      const points = stars.map(s => ({
        x: (s.x / 100) * canvas.width * curZoom + curPan.x,
        y: (s.y / 100) * canvas.height * curZoom + curPan.y
      }))

      // 4. Draw sleek warm golden constellation line connecting nodes
      if (points.length > 1) {
        // Outer golden glow line
        ctx.lineWidth = 2.6
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.8)'
        ctx.setLineDash([])
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y)
        }
        ctx.stroke()

        // Inner luminous warm core
        ctx.lineWidth = 1.3
        ctx.strokeStyle = 'rgba(255, 248, 220, 0.95)'
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y)
        }
        ctx.stroke()

        // 5. Directional Arrows Traveling from one node to the other along each line segment
        const segments = []
        let totalPathLength = 0

        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i]
          const p2 = points[i + 1]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const len = Math.hypot(dx, dy)
          const angle = Math.atan2(dy, dx)
          segments.push({ p1, p2, dx, dy, len, angle, startDist: totalPathLength })
          totalPathLength += len

          if (len < 15) continue

          // Multiple streaming golden arrows traveling from p1 to p2
          const arrowSpacing = 44
          const numArrows = Math.max(1, Math.floor(len / arrowSpacing))
          for (let j = 0; j < numArrows; j++) {
            const arrowDist = ((t * 48 + j * arrowSpacing) % len)
            const arrowProg = arrowDist / len
            const ax = p1.x + dx * arrowProg
            const ay = p1.y + dy * arrowProg

            // Smooth fade in as arrow leaves p1, fade out near p2
            const alpha = Math.sin(arrowProg * Math.PI) * 0.95
            if (alpha <= 0.05) continue

            ctx.save()
            ctx.translate(ax, ay)
            ctx.rotate(angle)
            ctx.globalAlpha = alpha
            ctx.fillStyle = '#ffb703'
            ctx.strokeStyle = '#fff8e7'
            ctx.lineWidth = 1
            ctx.shadowColor = '#ffb703'
            ctx.shadowBlur = 8
            ctx.beginPath()
            ctx.moveTo(8, 0)
            ctx.lineTo(-4, -5)
            ctx.lineTo(-1, 0)
            ctx.lineTo(-4, 5)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
            ctx.restore()
          }
        }

        // 6. Anime Character Walking from one node to the next along the constellation
        if (totalPathLength > 20 && segments.length > 0) {
          const walkSpeed = 40 // traversal speed along the path
          const charDistance = (t * walkSpeed) % totalPathLength

          // Locate active segment
          let curSeg = segments[0]
          for (let k = 0; k < segments.length; k++) {
            if (charDistance >= segments[k].startDist && charDistance <= segments[k].startDist + segments[k].len) {
              curSeg = segments[k]
              break
            }
          }

          const segDist = charDistance - curSeg.startDist
          const segRatio = curSeg.len > 0 ? segDist / curSeg.len : 0
          const charX = curSeg.p1.x + curSeg.dx * segRatio
          const charY = curSeg.p1.y + curSeg.dy * segRatio
          const isMovingLeft = Math.cos(curSeg.angle) < 0
          const walkPhase = t * 12
          const charScale = Math.max(0.78, Math.min(1.35, curZoom * 0.92))

          drawAnimeWalker(ctx, charX, charY, walkPhase, isMovingLeft, charScale)
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      isRunning = false
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [stars, isMobile])

  // Canvas render for Mobile Timeline: Walking Anime Character & Downward Streaming Arrows
  useEffect(() => {
    const canvas = mobileCanvasRef.current
    const track = mobileTrackRef.current
    if (!canvas || !track) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let isRunning = true
    let t = 0

    const resize = () => {
      if (!track) return
      canvas.width = track.offsetWidth
      canvas.height = track.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const render = () => {
      if (!isRunning) return
      t += 0.02
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const dotEls = track.querySelectorAll('.constellation__mobile-item')
      if (dotEls.length > 1) {
        const dotPoints = []
        dotEls.forEach(el => {
          dotPoints.push({
            x: 14,
            y: el.offsetTop + 17
          })
        })

        // 1. Streaming golden arrows flowing DOWN between consecutive event dots
        let totalTrackLength = 0
        const trackSegments = []
        for (let i = 0; i < dotPoints.length - 1; i++) {
          const p1 = dotPoints[i]
          const p2 = dotPoints[i + 1]
          const dy = p2.y - p1.y
          trackSegments.push({ p1, p2, dy, startDist: totalTrackLength })
          totalTrackLength += dy

          if (dy < 15) continue

          const arrowSpacing = 36
          const numArrows = Math.max(1, Math.floor(dy / arrowSpacing))
          for (let j = 0; j < numArrows; j++) {
            const arrowDist = ((t * 42 + j * arrowSpacing) % dy)
            const arrowProg = arrowDist / dy
            const ay = p1.y + dy * arrowProg

            const alpha = Math.sin(arrowProg * Math.PI) * 0.95
            if (alpha <= 0.05) continue

            ctx.save()
            ctx.translate(14, ay)
            ctx.rotate(Math.PI / 2) // pointing straight down the timeline
            ctx.globalAlpha = alpha
            ctx.fillStyle = '#ffb703'
            ctx.strokeStyle = '#fff8e7'
            ctx.lineWidth = 1
            ctx.shadowColor = '#ffb703'
            ctx.shadowBlur = 6
            ctx.beginPath()
            ctx.moveTo(6, 0)
            ctx.lineTo(-3, -4)
            ctx.lineTo(-1, 0)
            ctx.lineTo(-3, 4)
            ctx.closePath()
            ctx.fill()
            ctx.stroke()
            ctx.restore()
          }
        }

        // 2. Anime Character walking down along the vertical mobile timeline
        if (totalTrackLength > 20 && trackSegments.length > 0) {
          const walkSpeed = 34 // pacing down the timeline
          const charDistance = (t * walkSpeed) % totalTrackLength

          let curSeg = trackSegments[0]
          for (let k = 0; k < trackSegments.length; k++) {
            if (charDistance >= trackSegments[k].startDist && charDistance <= trackSegments[k].startDist + trackSegments[k].dy) {
              curSeg = trackSegments[k]
              break
            }
          }

          const segDist = charDistance - curSeg.startDist
          const segRatio = curSeg.dy > 0 ? segDist / curSeg.dy : 0
          const charY = curSeg.p1.y + curSeg.dy * segRatio
          const charX = 14 // centered on timeline track line

          const walkPhase = t * 12

          // Active node glow pulse when character walks past
          dotEls.forEach(el => {
            const dotY = el.offsetTop + 17
            const dist = Math.abs(charY - dotY)
            const dotCircle = el.querySelector('.constellation__timeline-dot')
            if (dotCircle) {
              if (dist < 26) {
                dotCircle.style.boxShadow = '0 0 16px #ffb703, 0 0 26px #fbbf24'
                dotCircle.style.transform = 'scale(1.22)'
              } else {
                dotCircle.style.boxShadow = ''
                dotCircle.style.transform = ''
              }
            }
          })

          // Render anime walker on mobile timeline
          drawAnimeWalker(ctx, charX, charY, walkPhase, false, 0.68)
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      isRunning = false
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [stars, isMobile])

  return (
    <section className="constellation-dimension section" id="constellation" ref={containerRef}>
      {/* Celestial Sky Background */}
      <div
        className="constellation__sky-bg"
        style={{ backgroundImage: `url(${animeSkyBg})` }}
      />
      <div className="constellation__sky-overlay" />

      {/* Header Container for Title and Day Switcher */}
      <div className="section__container">
        <div className={`fade-in-up ${isVisible ? 'fade-in-up--visible' : ''}`}>
          <h2 className="constellation__title">
            THE CELESTIAL STARRY CHRONICLES
          </h2>
        </div>

        {/* Day Selectors */}
        <div className="constellation__days">
          {Object.keys(constellationDays).map(day => (
            <button
              key={day}
              type="button"
              className={`constellation__day-btn ${activeDay === day ? 'constellation__day-btn--active' : ''}`}
              onClick={() => handleDayChange(day)}
            >
              {day === 'DAY 01' && 'DAY 01 • INITIATION & FLAME'}
              {day === 'DAY 02' && 'DAY 02 • CLIMAX & GRAND FINALE'}
            </button>
          ))}
        </div>
      </div>

      {/* Constellation Canvas Box (Unlimited Space - Full Bleed Expansive View) */}
      <div
        ref={wrapperRef}
        className="constellation__map-wrapper constellation__desktop-view"
        onPointerDown={handlePointerDown}
      >
          {/* Top Pill Instruction matching screenshot */}
          <div className="constellation__pan-zoom-hint">
            Hold <kbd>Ctrl</kbd> to Zoom • Click & Drag to Pan
          </div>

          {/* Canvas for Interactive Stars, Lasers & Directional Chevrons */}
          <canvas ref={canvasRef} className="constellation__canvas" />

          {/* Interactive HTML Star Nodes Layer (Synchronized with Pan & Zoom) */}
          <div
            ref={nodesLayerRef}
            className="constellation__nodes-layer"
            style={{
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
              transformOrigin: '0 0'
            }}
          >
            {stars.map((star, idx) => {
              const isHovered = hoveredStar?.id === star.id
              const nodeColor = star.color || nodeColorPalette[idx % nodeColorPalette.length]

              return (
                <div
                  key={star.id}
                  className={`constellation__star-node ${isHovered ? 'constellation__star-node--hovered' : ''}`}
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    '--node-color': nodeColor
                  }}
                  onPointerEnter={() => setHoveredStar(star)}
                  onPointerLeave={() => setHoveredStar(null)}
                  onClick={() => setHoveredStar(star)}
                >
                  {/* Outer Concentric Halo Ring */}
                  <div className="constellation__node-ring" />
                  
                  {/* Glowing Circular Core */}
                  <div className="constellation__node-core" />

                  {/* Clean text in white with NO background rectangle */}
                  <div className="constellation__star-text-block">
                    <div className="constellation__star-title">{star.title || star.eventName}</div>
                    <div className="constellation__star-time">{star.time}</div>
                  </div>

                  {/* Details card revealed immediately on cursor hover without tapping. ONLY Event Name, Time, and Venue */}
                  {isHovered && (
                    <div className="constellation__hover-card" role="tooltip">
                      <div className="constellation__hover-title">{star.title || star.eventName}</div>
                      <div className="constellation__hover-row">
                        <span className="constellation__hover-icon">⏱</span>
                        <span className="constellation__hover-time">{star.time}</span>
                      </div>
                      <div className="constellation__hover-row">
                        <span className="constellation__hover-icon">📍</span>
                        <span className="constellation__hover-venue">{star.venue}</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile View: Minimalist Timeline with NO background rectangles */}
        <div className="section__container">
          <div className="constellation__mobile-timeline">
            <div className="constellation__timeline-track" ref={mobileTrackRef}>
              {/* Animated Walking Anime Character & Downward Streaming Arrows */}
              <canvas ref={mobileCanvasRef} className="constellation__mobile-track-canvas" />
              <div className="constellation__timeline-line" />
              {stars.map((event, idx) => {
                const nodeColor = event.color || nodeColorPalette[idx % nodeColorPalette.length]
                return (
                  <div
                    key={event.id}
                    className="constellation__mobile-item"
                    style={{ '--node-color': nodeColor }}
                  >
                    {/* Left Timeline Dot with Pulse Ring & Horizontal Connector */}
                    <div className="constellation__timeline-dot-wrap">
                      <div className="constellation__timeline-dot">
                        <span className="timeline-dot-core" />
                        <span className="timeline-dot-pulse" />
                      </div>
                      <div className="constellation__timeline-connector" />
                    </div>

                    {/* Clean minimal details: ONLY Event Name, Time, and Venue with NO background rectangle */}
                    <div className="constellation__mobile-details">
                      <h3 className="constellation__mobile-title">{event.title || event.eventName}</h3>
                      <div className="constellation__mobile-meta-row">
                        <span className="meta-icon">⏱</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="constellation__mobile-meta-row">
                        <span className="meta-icon">📍</span>
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    )
  }
