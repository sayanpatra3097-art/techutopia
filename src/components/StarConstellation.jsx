import { useState, useRef, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import animeSkyBg from '../assets/anime_sky_bg.webp'

// Authentic Anime Constellation Timeline for TechUtopia '26
const constellationDays = {
  'DAY 01': [
    {
      id: 'd1-1',
      x: 15,
      y: 36,
      time: '09:00 AM',
      title: '【開闢】 GRAND INAUGURATION & MONARCH KEYNOTE',
      desc: 'The celestial sanctuary gates unseal. Keynote address from supreme tech Monarchs initiating the festival.',
      venue: 'Main Coliseum • 覚醒の間',
      category: 'Ceremony',
      rank: 'S-Rank Event',
      starName: 'Alpha Ursae • 極星',
      mana: '100% Resonance'
    },
    {
      id: 'd1-2',
      x: 30,
      y: 22,
      time: '10:00 AM',
      title: '【影の試練】 SHADOW MONARCH ALGO CLASH — R1',
      desc: 'Round 1 of the legendary competitive algorithmic battle. 500 coders descend into the shadow dungeon.',
      venue: 'Dungeon Hall A • 影の回廊',
      category: 'Competitive Code',
      rank: 'A-Rank Quest',
      starName: 'Polaris Prime • 北極星',
      mana: 'High Mana'
    },
    {
      id: 'd1-3',
      x: 50,
      y: 42,
      time: '11:00 AM',
      title: '【炎の呼吸】 HASHIRA 24HR FORGE KICKOFF',
      desc: 'The flame of creation is ignited. 24-hour non-stop hackathon building next-gen AI, Web3, and robotics solutions.',
      venue: 'Sandbox Forge • 煉獄工房',
      category: 'Hackathon',
      rank: 'Supreme Raid',
      starName: 'Sirius Core • 狼星',
      mana: 'Continuous Surge'
    },
    {
      id: 'd1-4',
      x: 70,
      y: 26,
      time: '02:30 PM',
      title: '【風の呼吸】 BREATHING SPRINT: SPATIAL UI/UX',
      desc: 'Ultra-fast visual design sprint. Hunters create fluid, high-velocity anime cyber-interfaces in 120 minutes.',
      venue: 'Design Sanctum • 幻影館',
      category: 'Creative Sprint',
      rank: 'Special Guild',
      starName: 'Vega Gate • 織姫星',
      mana: 'Fluid Flow'
    },
    {
      id: 'd1-5',
      x: 86,
      y: 56,
      time: '07:00 PM',
      title: '【星華夜】 ANIME TWILIGHT & LASER PRELUDE',
      desc: 'Atmospheric twilight concert with synchronized beam lasers and anime orchestral symphonies under the open sky.',
      venue: 'Open Air Colosseum • 星天広場',
      category: 'Nocturnal Concert',
      rank: 'Festival Rave',
      starName: 'Betelgeuse • 巨星',
      mana: 'Max Voltage'
    },
  ],
  'DAY 02': [
    {
      id: 'd2-1',
      x: 18,
      y: 62,
      time: '09:30 AM',
      title: '【無限城】 INFINITY CASTLE WEB DEV CLASH',
      desc: 'Fast-paced WebGL and full-stack battleground with dynamic dimensional themes shifting in real-time.',
      venue: 'Computing Nexus • 異次元ラボ',
      category: 'Full-Stack Battle',
      rank: 'A-Rank Raid',
      starName: 'Rigel Nexus • 参宿',
      mana: 'Overclocked'
    },
    {
      id: 'd2-2',
      x: 38,
      y: 30,
      time: '11:00 AM',
      title: '【無量空処】 NEURAL VOID DOJO (AI/ML SPRINT)',
      desc: 'Deep learning neural models and autonomous agent swarms deployed against real-world enterprise datasets.',
      venue: 'CS Core Sanctum • 領域展開の間',
      category: 'Autonomous AI',
      rank: 'Special Grade',
      starName: 'Aldebaran • 牡牛眼',
      mana: 'Boundless Void'
    },
    {
      id: 'd2-3',
      x: 56,
      y: 66,
      time: '02:00 PM',
      title: '【機神決戦】 MECHA TITAN ROBOT WARS',
      desc: 'Combat bots collide in the high-voltage arena. Spinning saws, flippers, and armored chassis fight to the finish.',
      venue: 'Ironworks Bay • 機甲アリーナ',
      category: 'Combat Robotics',
      rank: 'Heavy Armored',
      starName: 'Antares Nova • 心宿',
      mana: 'Kinetic Blast'
    },
    {
      id: 'd2-4',
      x: 74,
      y: 38,
      time: '06:00 PM',
      title: '【最終決戦】 HASHIRA FORGE 24HR GRAND PITCH',
      desc: 'The 24-hour hackathon concludes. The top 10 finalists pitch their creations before industry veteran judges.',
      venue: 'Auditorium Prime • 審査の神殿',
      category: 'Hackathon Final',
      rank: 'Monarch Showcase',
      starName: 'Spica Vault • 角宿',
      mana: 'Critical Apex'
    },
    {
      id: 'd2-5',
      x: 88,
      y: 72,
      time: '08:00 PM',
      title: '【音柱共鳴】 SONIC DOMAIN: ANIME EDM DJ NIGHT',
      desc: 'High-octane sound explosion featuring headlining anime EDM producers, bass drops, and neon pyro effects.',
      venue: 'Open Air Amphitheatre • 轟音祭壇',
      category: 'Nocturnal Concert',
      rank: 'Supreme Rave',
      starName: 'Deneb Apex • 白鳥尾',
      mana: 'Electrified'
    },
  ],
  'DAY 03': [
    {
      id: 'd3-1',
      x: 20,
      y: 42,
      time: '10:00 AM',
      title: '【電脳侵入】 DUNGEON RAID: CYBER CTF CLASH',
      desc: 'Hunters defend server nodes and infiltrate hardened network infrastructures in a live jeopardy-style CTF.',
      venue: 'Security Matrix • 結界網',
      category: 'Cyber Guild',
      rank: 'Stealth Raid',
      starName: 'Capella Ring • 五車',
      mana: 'Encrypted'
    },
    {
      id: 'd3-2',
      x: 44,
      y: 24,
      time: '11:30 AM',
      title: '【錬金真理】 ALCHEMICAL 3D BLENDER MASTERCLASS',
      desc: 'Spatial 3D artists synthesize shaders, procedural worlds, and anime character meshes in real-time.',
      venue: 'Creative Media Dojo • 真理の門',
      category: 'Visual Alchemy',
      rank: 'Master Guild',
      starName: 'Castor Star • 双子座α',
      mana: 'Transmutation'
    },
    {
      id: 'd3-3',
      x: 64,
      y: 52,
      time: '01:30 PM',
      title: '【覇王頂点】 ESPORTS GRAND COLISEUM FINALS',
      desc: 'The best collegiate tactical teams duel on the center jumbotron stage for the champion trophy.',
      venue: 'Main Arena • 覇王闘技場',
      category: 'Esports Finals',
      rank: 'Championship',
      starName: 'Pollux Node • 双子座β',
      mana: 'Extreme Hype'
    },
    {
      id: 'd3-4',
      x: 84,
      y: 32,
      time: '05:00 PM',
      title: '【戴冠式】 SUPREME CONFERMENT & AWARDS GALA',
      desc: 'Honoring victorious guilds with INR 10 Lakhs in bounties, gold medallions, and the eternal TechUthopia cup.',
      venue: 'Imperial Auditorium • 栄光の殿堂',
      category: 'Royal Ceremony',
      rank: 'Legendary Rites',
      starName: 'Altair Crown • 彦星',
      mana: 'Crown Awakening'
    },
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
          : activeDay === 'DAY 02'
          ? 'rgba(255, 183, 3, 0.65)'
          : 'rgba(230, 57, 70, 0.65)'
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
          <h2 className="section__title anime-glow-text" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
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
              {day === 'DAY 01' && '【開闢】 DAY 01 • INITIATION & FLAME'}
              {day === 'DAY 02' && '【激闘】 DAY 02 • INFINITE DOJO'}
              {day === 'DAY 03' && '【終極】 DAY 03 • GRAND FINALS'}
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
                <span>【星辰情報】 CELESTIAL NODE: {selectedStar.starName} [{activeDay}]</span>
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
                <span>⏱ 刻限:</span>
                <strong>{selectedStar.time}</strong>
              </div>
              <div className="constellation__modal-meta-item">
                <span>📍 領域:</span>
                <strong>{selectedStar.venue}</strong>
              </div>
              <div className="constellation__modal-meta-item" style={{ color: '#ffd166' }}>
                <span>⚡ 魔力:</span>
                <strong>{selectedStar.mana}</strong>
              </div>
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
