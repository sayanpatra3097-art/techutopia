import { useState, useEffect, useRef } from 'react'
import doorImg from '../assets/door.webp'

const artifacts = [
  {
    id: 'blade',
    icon: '🗡️',
    name: 'NICHIRIN BLADE OF CLEAN CODE',
    sub: 'Class: Legendary Weapon • Algorithmic Purity',
    desc: 'Forged in the fires of 10,000 unit tests. Pierces through legacy bugs and cuts memory leaks in one strike.',
    color: '#ff6b35',
    kanji: '日輪刀'
  },
  {
    id: 'ai-core',
    icon: '🔮',
    name: 'TITAN MECHA AI CORE',
    sub: 'Class: S-Rank Relic • Autonomous Compute',
    desc: 'Self-tuning neural core capable of 100 Teraflops of real-time edge processing for autonomous robotics.',
    color: '#ffb703',
    kanji: '機神核'
  },
  {
    id: 'trophy',
    icon: '🏆',
    name: 'SHADOW SOVEREIGN TROPHY',
    sub: 'Class: Ultimate Bounty • ₹10,00,000 Glory',
    desc: 'Handcrafted gilded cup bestowed upon the premier college guild that dominates overall fest standings.',
    color: '#ffd700',
    kanji: '至高冠'
  },
  {
    id: 'codex',
    icon: '📜',
    name: 'SACRED GUILD CODEX',
    sub: 'Class: Ancient Scroll • Fair Play Protocol',
    desc: 'The immutable laws of TechUtopia 2026. Integrity, sportsmanship, and relentless innovation for all hunters.',
    color: '#e63946',
    kanji: '禁断巻'
  }
]

export default function DoorEntryScene() {
  const [progress, setProgress] = useState(0) // 0 to 1
  const sceneRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const el = sceneRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate progress when scene is in viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalDist = rect.height + windowHeight
        const currentY = windowHeight - rect.top
        const p = Math.max(0, Math.min(1, currentY / totalDist))
        setProgress(p)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Derived animation values based on progress (0 to 1)
  const doorAngle = Math.min(90, progress * 130) // 0 to 90 degrees open
  const walkZ = Math.min(300, progress * 400) // camera dolly forward
  const activeArtifactIndex = Math.min(
    artifacts.length - 1,
    Math.floor(progress * (artifacts.length + 0.8))
  )
  const currentArtifact = artifacts[activeArtifactIndex]

  return (
    <section className="door-scene-dimension" id="door-entry" ref={sceneRef}>
      <div className="door-scene__header">
        <div className="section__label" style={{ justifyContent: 'center' }}>
          ⛩️ DIMENSION 04 • ENTERING THE INNER SANCTUARY
        </div>
        <h2 className="door-scene__title">CROSS THE THRESHOLD OF MASTERY</h2>
        <p className="door-scene__subtitle">
          [ SCROLL DOWN TO PUSH OPEN THE SANCTUARY DOORS & UNVEIL SACRED RELICS ]
        </p>

        {/* Interactive Scrub Slider for direct user control */}
        <div className="door-scene__scrubber">
          <span>DOOR GATE: {Math.round(progress * 100)}% OPEN</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={progress}
            onChange={(e) => setProgress(parseFloat(e.target.value))}
            className="door-scene__slider"
          />
        </div>
      </div>

      {/* 3D Perspective Chamber */}
      <div className="door-scene__viewport">
        {/* Deep Sanctuary Background Room */}
        <div
          className="door-scene__room"
          style={{
            transform: `scale(${1 + progress * 0.4}) translateZ(${walkZ}px)`
          }}
        >
          <div className="door-scene__room-glow" />
          <div className="door-scene__torii-arch" />

          {/* Anime Hunter Silhouette entering */}
          <div
            className="door-scene__hunter"
            style={{
              opacity: progress > 0.15 ? 1 : 0,
              transform: `translateX(-50%) translateY(${20 - progress * 40}px) scale(${0.8 + progress * 0.5})`
            }}
          >
            <div className="door-scene__hunter-glow" />
            <div className="door-scene__hunter-silhouette">
              <svg viewBox="0 0 100 160" width="80" height="130">
                {/* Anime warrior silhouette with katana sheath */}
                <path
                  d="M50 15 C55 15 60 20 60 26 C60 32 55 36 50 36 C45 36 40 32 40 26 C40 20 45 15 50 15 Z 
                     M35 42 L65 42 L72 75 L62 80 L66 140 L54 140 L52 95 L48 95 L46 140 L34 140 L38 80 L28 75 Z
                     M68 55 L85 110 L80 112 L66 60 Z"
                  fill="#ff6b35"
                  opacity="0.9"
                />
              </svg>
            </div>
            <div className="door-scene__hunter-tag">HUNTER AWAKENING</div>
          </div>

          {/* Floating Artifacts appearing upon scrolling */}
          <div
            className={`door-scene__relic-display ${progress > 0.3 ? 'door-scene__relic-display--visible' : ''}`}
            key={currentArtifact.id}
          >
            <div
              className="door-scene__relic-halo"
              style={{ borderColor: currentArtifact.color, boxShadow: `0 0 40px ${currentArtifact.color}66` }}
            >
              <span className="door-scene__relic-icon">{currentArtifact.icon}</span>
              <span className="door-scene__relic-kanji">{currentArtifact.kanji}</span>
            </div>

            <div className="door-scene__relic-info">
              <div className="door-scene__relic-class" style={{ color: currentArtifact.color }}>
                {currentArtifact.sub}
              </div>
              <h3 className="door-scene__relic-name">{currentArtifact.name}</h3>
              <p className="door-scene__relic-desc">{currentArtifact.desc}</p>
            </div>
          </div>
        </div>

        {/* The Grand 3D Molten Dungeon Double Doors (Left & Right Wings) */}
        <div className="door-scene__portal-frame">
          {/* Left Door Wing */}
          <div
            className="door-wing door-wing--left sl-door-wing sl-door-wing--left"
            style={{
              transform: `rotateY(-${doorAngle}deg)`
            }}
          >
            <div className="door-wing__inner sl-door-panel sl-door-panel--left">
              <div className="sl-door__full-canvas sl-door__full-canvas--left">
                <img
                  src={doorImg}
                  alt="Ancient Dungeon Portal Gate Left"
                  className="sl-door__image"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                />
              </div>
              <div className="sl-door__mana-cracks sl-door__mana-cracks--left" />
              <div className="sl-door__iron-brace" />
            </div>
          </div>

          {/* Right Door Wing */}
          <div
            className="door-wing door-wing--right sl-door-wing sl-door-wing--right"
            style={{
              transform: `rotateY(${doorAngle}deg)`
            }}
          >
            <div className="door-wing__inner sl-door-panel sl-door-panel--right">
              <div className="sl-door__full-canvas sl-door__full-canvas--right">
                <img
                  src={doorImg}
                  alt="Ancient Dungeon Portal Gate Right"
                  className="sl-door__image"
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                />
              </div>
              <div className="sl-door__mana-cracks sl-door__mana-cracks--right" />
              <div className="sl-door__iron-brace" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
