import { useState, useRef, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import animeSkyBg from '../assets/anime_sky_bg.webp'

// Authentic Anime Constellation Timeline for TechUtopia '26 (2-Day Format)
const constellationDays = {
  'DAY 01': [
    {
      id: 'd1-1',
      x: 12,
      y: 32,
      time: '10:00 AM - 04:00 PM',
      title: 'LAUNCHPAD: TECH PROJECT EXPO',
      desc: 'Grand tech project exhibition showcasing IoT, renewable energy, and AI inventions. Demonstrate working hardware prototypes, software solutions, and patented engineering research.',
      venue: 'Exhibition Center, Main Foyer',
      category: 'Project Expo',
      rank: 'A-RANK INNOVATION',
      starName: 'Launchpad',
      eventName: 'Launchpad',
      mana: '95% Resonance',
      prize: '₹45,000 + Research Grants',
      team: 'Team of 2-4'
    },
    {
      id: 'd1-2',
      x: 24,
      y: 60,
      time: '11:00 AM - 03:00 PM',
      title: 'ROBO MANIA: MECHA COLISEUM',
      desc: 'Heavyweight combat bots and autonomous rovers clashing in the steel cage arena. Test armor, torque, weapon systems, and driver precision under high-voltage battle rounds.',
      venue: 'Mechanical Arena, Workshop Block',
      category: 'Robotics',
      rank: 'S-RANK COLISEUM',
      starName: 'Robo Mania',
      eventName: 'Robo Mania',
      mana: 'High Torque',
      prize: '₹50,000 + Champion Trophy',
      team: 'Team of 2-5'
    },
    {
      id: 'd1-3',
      x: 38,
      y: 26,
      time: '11:00 AM (24hr Non-Stop)',
      title: '24HR HACKATHON: MONARCH FORGE',
      desc: 'The flagship 24-hour hackathon of TechUthopia! Code through the midnight hour, solve real-world industry problem statements, and build breakthrough AI, Web3, and Cloud solutions.',
      venue: 'Innovation Hub & Sandbox Lab',
      category: 'Hackathon',
      rank: 'SUPREME RAID',
      starName: '24Hr Hackathon',
      eventName: '24Hr Hackathon',
      mana: 'Continuous Surge',
      prize: '₹1,00,000 + Incubation Support',
      team: 'Squad of 2-4'
    },
    {
      id: 'd1-4',
      x: 50,
      y: 68,
      time: '12:00 PM - 08:00 PM',
      title: 'GOURMET FOOD FEST & STREET ALCHEMY',
      desc: 'Gastronomic culinary stalls, fast-eating showdowns, blind tasting challenges, and mocktail alchemy celebrating festival delicacies across the campus promenade.',
      venue: 'Food Court Promenade, UEM Jaipur',
      category: 'Culinary & Fun',
      rank: 'OPEN CELEBRATION',
      starName: 'Food Fest',
      eventName: 'Food Fest',
      mana: 'Feast Energy',
      prize: '₹25,000 MasterChef Honors',
      team: 'Solo / Squad'
    },
    {
      id: 'd1-5',
      x: 63,
      y: 32,
      time: '02:00 PM - 05:00 PM',
      title: 'GRAVITY ZONE: ZERO-G ARENA',
      desc: 'Defy terrestrial physics! Teams build aerodynamic launchers, precision egg-drop vessels, and pressurized water rockets to conquer gravity and achieve maximum flight time.',
      venue: 'Central University Grounds, UEM Jaipur',
      category: 'Physics & Fun',
      rank: 'A-RANK ARENA',
      starName: 'Gravity Zone',
      eventName: 'Gravity Zone',
      mana: 'Graviton Flux',
      prize: '₹35,000 + Medallions',
      team: 'Squad of 2-4'
    },
    {
      id: 'd1-6',
      x: 76,
      y: 62,
      time: '03:00 PM - 07:00 PM',
      title: 'ESPORTS CHAMPIONSHIP (PRELIMS)',
      desc: 'High-octane BGMI, Valorant, and EA FC 5v5 tactical shooter tournament. Teams duel across knockout brackets on ultra-high-refresh tournament rigs broadcasted live.',
      venue: 'Indoor Sports Stadium & Gaming Dome',
      category: 'Gaming',
      rank: 'COLISEUM APEX',
      starName: 'Esports Arena',
      eventName: 'Esports Arena',
      mana: 'High Voltage',
      prize: '₹60,000 + Pro Gaming Gear',
      team: 'Squad of 4-5'
    },
    {
      id: 'd1-7',
      x: 88,
      y: 28,
      time: 'Day 1 - Day 2 • All Day',
      title: 'CHRONICLES OF TECHUTOPIA: PHOTOGRAPHY',
      desc: 'Theme-based on-spot photography and cinematic storytelling competition capturing the soul, neon energy, and cyberpunk lights of the festival.',
      venue: 'Media Center & Campus-Wide',
      category: 'Creative Arts',
      rank: 'B-RANK CHRONICLE',
      starName: 'Photography',
      eventName: 'Photography',
      mana: 'Optic Focus',
      prize: '₹25,000 + Lens Gear',
      team: 'Solo Hunter'
    },
  ],
  'DAY 02': [
    {
      id: 'd2-1',
      x: 10,
      y: 44,
      time: '10:00 AM - 01:00 PM',
      title: 'PHYSIO AGILITY & BIOMECHANICS',
      desc: 'Biomechanics agility sprint, posture AI analysis, and ergonomic reflex testing. Showcase clinical skills, healthcare diagnostics, and rapid physical assessment challenges.',
      venue: 'Physiotherapy & Health Sciences Wing',
      category: 'Healthcare & Wellness',
      rank: 'SPECIAL GUILD',
      starName: 'Physio Event',
      eventName: 'Physio Event',
      mana: 'Bio Resonance',
      prize: '₹30,000 + Clinical Kits',
      team: 'Solo / Duo'
    },
    {
      id: 'd2-2',
      x: 22,
      y: 22,
      time: '10:30 AM - 01:30 PM',
      title: 'ANDHADHUN: BLIND SYNTAX TRIAL',
      desc: 'Screen-off coding challenge where contestants type algorithms with monitors off, relying purely on muscle memory and syntax cognition, combined with ear-training musical quizzes.',
      venue: 'Computing Lab 4, UEM Jaipur',
      category: 'Mystery & Skill',
      rank: 'CHAOS TRIAL',
      starName: 'Andhadhun',
      eventName: 'Andhadhun',
      mana: 'Sensory Overdrive',
      prize: '₹35,000 + Goodies',
      team: 'Solo'
    },
    {
      id: 'd2-3',
      x: 34,
      y: 64,
      time: '11:30 AM - 03:30 PM',
      title: 'TECHVENTURE: STARTUP ARENA',
      desc: 'Shark Tank style startup battleground. Pitch groundbreaking tech innovations, viable business models, and scalable prototypes directly to industry investors and venture founders.',
      venue: 'Auditorium Hall B, UEM Jaipur',
      category: 'Startup & Business',
      rank: 'S-RANK SUMMON',
      starName: 'TechVenture',
      eventName: 'TechVenture',
      mana: 'Venture Core',
      prize: '₹75,000 + Seed Mentorship',
      team: 'Team of 1-4'
    },
    {
      id: 'd2-4',
      x: 46,
      y: 26,
      time: '11:00 AM - 05:00 PM',
      title: 'AUTO EXPO: TORQUE & EV SHOWCASE',
      desc: 'Superbikes, electric go-karts, modified cars, and Formula Student vehicles on display. Explore student-engineered electric racecars, tuned supercars, and aerodynamic designs.',
      venue: 'Main Driveway Arena & Track',
      category: 'Automotive & EVs',
      rank: 'PREMIER SHOWCASE',
      starName: 'Auto Expo',
      eventName: 'Auto Expo',
      mana: 'Nitro Drive',
      prize: '₹50,000 Auto Innovator Award',
      team: 'Exhibition Guilds'
    },
    {
      id: 'd2-5',
      x: 58,
      y: 68,
      time: '01:30 PM - 04:30 PM',
      title: 'BRIDGE BUILDING: DESTRUCTION TEST',
      desc: 'Design and construct maximum load-bearing truss bridges with minimal dead weight. Each bridge is subjected to calibrated point loading until collapse to determine ultimate strength ratio.',
      venue: 'Civil Engineering Materials Lab',
      category: 'Civil & Mechanics',
      rank: 'B-RANK STRUCTURE',
      starName: 'Bridge Building',
      eventName: 'Bridge Building',
      mana: 'Kinetic Limit',
      prize: '₹30,000 + Trophy',
      team: 'Team of 2-3'
    },
    {
      id: 'd2-6',
      x: 70,
      y: 30,
      time: '02:00 PM - 05:30 PM',
      title: 'GENERATIVE MEDIA & AI SYNTHESIS',
      desc: 'Prompt engineering, generative video, and procedural audio synthesis clash. Harness diffusion models and LLMs to produce an immersive anime trailer in under 4 hours.',
      venue: 'Digital Arts & AI Lab',
      category: 'AI & Digital Art',
      rank: 'A-RANK SYNTHESIS',
      starName: 'Generative Media',
      eventName: 'Generative Media',
      mana: 'Neural Synthesis',
      prize: '₹40,000 + AI Subscriptions',
      team: 'Solo / Duo'
    },
    {
      id: 'd2-7',
      x: 82,
      y: 60,
      time: '04:00 PM - 06:30 PM',
      title: '24HR HACKATHON GRAND JURY PITCH',
      desc: 'The 24-hour hackathon concludes. The top finalist squads present live working deployments, architecture, and prototypes before senior industry architects and angel investors.',
      venue: 'Innovation Hub & Sandbox Lab',
      category: 'Hackathon Final',
      rank: 'SUPREME RAID',
      starName: 'Hackathon Finale',
      eventName: 'Hackathon Finale',
      mana: 'Critical Apex',
      prize: '₹1,00,000 + Incubation Grants',
      team: 'Top Finalist Squads'
    },
    {
      id: 'd2-8',
      x: 92,
      y: 26,
      time: '06:30 PM - 10:00 PM',
      title: 'FASHION CARNIVAL & CLOSING GALA',
      desc: 'The grand closing spectacle of TechUthopia! Anime cosplay masquerade, cyber couture runway, and conferring of festival championships, ₹10 Lakhs bounties, and trophies.',
      venue: 'Grand Amphitheatre Open Stage',
      category: 'Cultural Runway & Awards',
      rank: 'SUPREME GALA',
      starName: 'Fashion Carnival',
      eventName: 'Fashion Carnival',
      mana: 'Supreme Climax',
      prize: '₹70,000 + Fashion Crowns & Bounties',
      team: 'Guild Roster / Squad'
    }
  ]
}

export default function StarConstellation() {
  const [activeDay, setActiveDay] = useState('DAY 01')
  const [selectedStar, setSelectedStar] = useState(null)
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)
  const nodesLayerRef = useRef(null)
  const containerRef = useRef(null)
  const isVisible = useScrollReveal(containerRef)

  // Handle ESC key to close modal & lock body scroll when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedStar(null)
      }
    }
    if (selectedStar) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedStar])

  // Smooth mouse coordinates for parallax
  const mouseState = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
  })

  const stars = constellationDays[activeDay]

  // Track mouse coordinates relative to the map wrapper
  const handleMouseMove = (e) => {
    const el = wrapperRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    // Normalized between -0.5 and +0.5
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    mouseState.current.targetX = nx
    mouseState.current.targetY = ny
  }

  const handleMouseLeave = () => {
    mouseState.current.targetX = 0
    mouseState.current.targetY = 0
  }

  // Canvas render for mouse-interactive constellation stars and connecting laser beams
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let t = 0

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate 120 layered celestial background stars with depth for realistic mouse parallax
    const bgStars = []
    for (let i = 0; i < 130; i++) {
      bgStars.push({
        baseX: Math.random() * canvas.width,
        baseY: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.6,
        depth: Math.random() * 1.5 + 0.4, // Depth layer multiplier: foreground moves faster
        twinkleSpeed: Math.random() * 0.04 + 0.015,
        twinkleOffset: Math.random() * Math.PI * 2,
        isColored: Math.random() > 0.65,
        color: Math.random() > 0.5 ? 'rgba(255, 183, 3,' : 'rgba(255, 107, 53,'
      })
    }

    // Occasional anime shooting stars / comets
    const shootingStars = []
    let nextSpawnTime = 80

    const render = () => {
      t += 0.02

      // Smooth lerp mouse coordinates (spring-like follow)
      const m = mouseState.current
      m.currentX += (m.targetX - m.currentX) * 0.065
      m.currentY += (m.targetY - m.currentY) * 0.065

      // Parallax the HTML star nodes layer in sync with the canvas
      if (nodesLayerRef.current) {
        nodesLayerRef.current.style.transform = `translate3d(${(m.currentX * 22).toFixed(2)}px, ${(m.currentY * 22).toFixed(2)}px, 0)`
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 1. Draw subtle celestial ambient nebula glow responding to mouse
      const gradX = canvas.width * 0.5 + m.currentX * 120
      const gradY = canvas.height * 0.5 + m.currentY * 80
      const radGrad = ctx.createRadialGradient(gradX, gradY, 10, gradX, gradY, canvas.width * 0.6)
      radGrad.addColorStop(0, 'rgba(255, 107, 53, 0.14)')
      radGrad.addColorStop(0.5, 'rgba(255, 209, 102, 0.07)')
      radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = radGrad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // 2. Draw layered background stars shifting with mouse movement
      bgStars.forEach(s => {
        // Multi-layered parallax shift
        const px = s.baseX + m.currentX * s.depth * 55
        const py = s.baseY + m.currentY * s.depth * 55

        // Wrap around seamlessly
        const wrappedX = ((px % canvas.width) + canvas.width) % canvas.width
        const wrappedY = ((py % canvas.height) + canvas.height) % canvas.height

        const alpha = 0.35 + Math.sin(t * s.twinkleSpeed * 10 + s.twinkleOffset) * 0.35

        if (s.isColored) {
          ctx.fillStyle = `${s.color} ${alpha})`
          ctx.shadowBlur = 8
          ctx.shadowColor = s.color.includes('183') ? '#ffd166' : '#ff6b35'
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.shadowBlur = 4
          ctx.shadowColor = '#ffffff'
        }

        ctx.beginPath()
        ctx.arc(wrappedX, wrappedY, s.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.shadowBlur = 0 // Reset shadow

      // 3. Anime Shooting Stars (Comet streaks)
      nextSpawnTime--
      if (nextSpawnTime <= 0) {
        shootingStars.push({
          x: Math.random() * canvas.width * 0.8 + canvas.width * 0.1,
          y: Math.random() * canvas.height * 0.3,
          length: Math.random() * 80 + 70,
          speed: Math.random() * 7 + 9,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          alpha: 1
        })
        nextSpawnTime = Math.floor(Math.random() * 120 + 80)
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const cs = shootingStars[i]
        cs.x += Math.cos(cs.angle) * cs.speed
        cs.y += Math.sin(cs.angle) * cs.speed
        cs.alpha -= 0.02

        if (cs.alpha <= 0) {
          shootingStars.splice(i, 1)
          continue
        }

        const tailX = cs.x - Math.cos(cs.angle) * cs.length
        const tailY = cs.y - Math.sin(cs.angle) * cs.length
        const cometGrad = ctx.createLinearGradient(tailX, tailY, cs.x, cs.y)
        cometGrad.addColorStop(0, 'rgba(255, 183, 3, 0)')
        cometGrad.addColorStop(0.8, `rgba(255, 183, 3, ${cs.alpha * 0.8})`)
        cometGrad.addColorStop(1, `rgba(255, 255, 255, ${cs.alpha})`)

        ctx.strokeStyle = cometGrad
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(cs.x, cs.y)
        ctx.stroke()
      }

      // 4. Convert timeline star percentage coordinates to parallaxed pixel coordinates
      const points = stars.map(s => ({
        x: (s.x / 100) * canvas.width + m.currentX * 22,
        y: (s.y / 100) * canvas.height + m.currentY * 22
      }))

      // 5. Draw glowing constellation laser lines connecting timeline points
      if (points.length > 1) {
        // Outer glowing beam
        ctx.lineWidth = 3
        ctx.strokeStyle = activeDay === 'DAY 01'
          ? 'rgba(255, 107, 53, 0.65)'
          : 'rgba(255, 215, 0, 0.65)'
        ctx.setLineDash([10, 6])
        ctx.lineDashOffset = -t * 22
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y)
        }
        ctx.stroke()

        // Inner bright white laser beam core
        ctx.lineWidth = 1.5
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)'
        ctx.setLineDash([])
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y)
        }
        ctx.stroke()

        // 6. Draw Directional Flow Arrows connecting events sequentially (Node -> Node)
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i]
          const p2 = points[i + 1]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const len = Math.hypot(dx, dy)
          if (len < 20) continue
          const angle = Math.atan2(dy, dx)

          // A. Animated energy photon arrow gliding along trajectory
          const pulseProg = (t * 0.45 + i * 0.28) % 1
          const pulseX = p1.x + dx * pulseProg
          const pulseY = p1.y + dy * pulseProg

          ctx.save()
          ctx.translate(pulseX, pulseY)
          ctx.rotate(angle)
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = activeDay === 'DAY 01' ? '#ff6b35' : '#ffd700'
          ctx.shadowBlur = 12
          ctx.beginPath()
          ctx.moveTo(9, 0)
          ctx.lineTo(-6, -6)
          ctx.lineTo(-2, 0)
          ctx.lineTo(-6, 6)
          ctx.closePath()
          ctx.fill()
          ctx.restore()

          // B. High-visibility stationary double chevron arrows at midpoint
          const midX = p1.x + dx * 0.5
          const midY = p1.y + dy * 0.5

          ctx.save()
          ctx.translate(midX, midY)
          ctx.rotate(angle)

          // Outer dark outline badge for contrast against background
          ctx.shadowColor = 'rgba(0, 0, 0, 0.85)'
          ctx.shadowBlur = 8

          // Front prominent golden arrow
          ctx.fillStyle = '#ffd700'
          ctx.strokeStyle = '#ffffff'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(15, 0)
          ctx.lineTo(-3, -10)
          ctx.lineTo(1, 0)
          ctx.lineTo(-3, 10)
          ctx.closePath()
          ctx.fill()
          ctx.stroke()

          // Back trailing chevron for high-tech ">>" sequential flow
          ctx.fillStyle = activeDay === 'DAY 01' ? '#ff6b35' : '#ffd700'
          ctx.beginPath()
          ctx.moveTo(4, 0)
          ctx.lineTo(-13, -9)
          ctx.lineTo(-9, 0)
          ctx.lineTo(-13, 9)
          ctx.closePath()
          ctx.fill()

          ctx.restore()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [stars, activeDay])

  return (
    <section className="constellation-dimension section" id="constellation" ref={containerRef}>
      {/* Anime Celestial Sky Background with subtle low opacity */}
      <div
        className="constellation__sky-bg"
        style={{ backgroundImage: `url(${animeSkyBg})` }}
      />

      <div className="section__container">
        <div className={`fade-in-up ${isVisible ? 'fade-in-up--visible' : ''}`}>
          <h2 className="constellation__title">
            THE CELESTIAL STARRY CHRONICLES
          </h2>
        </div>

        {/* Anime Day Selectors */}
        <div className="constellation__days">
          {Object.keys(constellationDays).map(day => (
            <button
              key={day}
              type="button"
              className={`constellation__day-btn ${activeDay === day ? 'constellation__day-btn--active' : ''}`}
              onClick={() => {
                setActiveDay(day)
                setSelectedStar(null)
              }}
            >
              {day === 'DAY 01' && 'DAY 01 • INITIATION & FLAME'}
              {day === 'DAY 02' && 'DAY 02 • CLIMAX & GRAND FINALE'}
            </button>
          ))}
        </div>

        {/* Interactive Star Map Canvas Box (Mouse-Reactive Constellation) */}
        <div
          ref={wrapperRef}
          className="constellation__map-wrapper"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={(e) => {
            if (e.touches && e.touches[0]) {
              handleMouseMove(e.touches[0])
            }
          }}
        >
          {/* Canvas for Interactive Stars, Shooting Meteors & Laser Lines */}
          <canvas ref={canvasRef} className="constellation__canvas" />

          {/* Interactive HTML Star Nodes Layer (Parallaxes with Mouse) */}
          <div ref={nodesLayerRef} className="constellation__nodes-layer">
            {stars.map((star, idx) => {
              const isSelected = selectedStar?.id === star.id
              return (
                <div
                  key={star.id}
                  className={`constellation__star-node ${isSelected ? 'constellation__star-node--active' : ''}`}
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`
                  }}
                  onClick={() => setSelectedStar(star)}
                >
                  <div className="constellation__star-core" />
                  <div className="constellation__star-pulse" />
                  <div className="constellation__star-index">NODE 0{idx + 1}</div>
                  <div className="constellation__star-name">{star.starName}</div>
                </div>
              )
            })}
          </div>

          <div className="constellation__tap-hint">
            <span>✨ TAP ANY STAR NODE TO INSPECT QUEST IN CENTER SCREEN</span>
          </div>
        </div>
      </div>

      {/* Selected Star Anime Modal Popup (Exact Middle of Screen) */}
      {selectedStar && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedStar(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal constellation__modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prominent Cross Button to close */}
            <button
              type="button"
              className="modal__close"
              onClick={() => setSelectedStar(null)}
              aria-label="Close event details"
              title="Close (Esc or tap outside)"
            >
              ✕
            </button>

            <div className="constellation__modal-header">
              <div className="constellation__modal-star-id">
                <span className="constellation__modal-dot" />
                <span>EVENT: {selectedStar.eventName || selectedStar.starName} • [{activeDay}]</span>
              </div>
              <div className="constellation__modal-badges">
                <span className="constellation__modal-badge">{selectedStar.category}</span>
                <span className="constellation__modal-rank">{selectedStar.rank}</span>
              </div>
            </div>

            <h3 className="constellation__modal-title">{selectedStar.title}</h3>
            
            <div className="constellation__modal-desc">
              {selectedStar.desc}
            </div>

            <div className="constellation__modal-meta">
              <div className="constellation__modal-meta-item">
                <span>⏱ TIME:</span>
                <strong>{selectedStar.time}</strong>
              </div>
              <div className="constellation__modal-meta-item">
                <span>📍 VENUE:</span>
                <strong>{selectedStar.venue}</strong>
              </div>
              <div className="constellation__modal-meta-item" style={{ color: '#ffd166' }}>
                <span>⚡ MANA:</span>
                <strong>{selectedStar.mana}</strong>
              </div>
              {selectedStar.prize && (
                <div className="constellation__modal-meta-item" style={{ color: '#ffd700' }}>
                  <span>🏆 PRIZE:</span>
                  <strong>{selectedStar.prize}</strong>
                </div>
              )}
              {selectedStar.team && (
                <div className="constellation__modal-meta-item">
                  <span>👥 SQUAD:</span>
                  <strong>{selectedStar.team}</strong>
                </div>
              )}
            </div>

            <div className="constellation__modal-hint">
              <span>[ Tap ✕ button or tap anywhere outside to close ]</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
