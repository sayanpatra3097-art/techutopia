import { useState, useEffect, useRef } from 'react'

const animeThemes = [
  {
    id: 'solo-leveling',
    title: 'SHADOW MONARCH',
    kanji: '影の君主',
    sub: 'Class: S-Rank Sovereign • Algorithmic Domain',
    badge: 'Solo Leveling Dimension',
    color: '#ff9e00',
    secondaryColor: '#ff3b30',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    quote: '“I have become the Monarch of Shadows. Every line of code arises at my command.”'
  },
  {
    id: 'demon-slayer',
    title: 'HINOKAMI KAGURA',
    kanji: 'ヒノカミ神楽',
    sub: 'Breathing Form: Sun Breathing • 24hr Hackathon',
    badge: 'Demon Slayer Realm',
    color: '#ff6b35',
    secondaryColor: '#e63946',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    quote: '“Set your heart ablaze. Go beyond your limits in the crucible of innovation.”'
  },
  {
    id: 'domain-expansion',
    title: 'INFINITE VOID',
    kanji: '無量空処',
    sub: 'Domain: Neural AI & Quantum Robotics',
    badge: 'Jujutsu Dimension',
    color: '#b537f2',
    secondaryColor: '#7b2ff7',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
    quote: '“Within this domain, infinite data flows into your mind. Only true creators transcend.”'
  },
  {
    id: 'cyber-neo',
    title: 'CYBER JAIPUR 2026',
    kanji: '電脳桃源郷',
    sub: 'Arena: Grand Finale & Esports Coliseum',
    badge: 'TechUthopia Apex',
    color: '#00f5d4',
    secondaryColor: '#00bbf9',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    quote: '“UEM Jaipur transforms into the supreme anime technological bastion.”'
  }
]

export default function Hero({ onNextDimension }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const heroRef = useRef(null)

  // Scroll / Wheel driven image transitions within Hero
  useEffect(() => {
    let lastWheelTime = 0

    const handleWheel = (e) => {
      const now = Date.now()
      if (now - lastWheelTime < 600) return

      const heroEl = heroRef.current
      if (!heroEl) return

      const rect = heroEl.getBoundingClientRect()
      // Only switch inner image if hero is currently in active view
      if (rect.top <= 50 && rect.bottom >= window.innerHeight - 50) {
        if (e.deltaY > 30) {
          if (activeIndex < animeThemes.length - 1) {
            lastWheelTime = now
            setIsTransitioning(true)
            setActiveIndex(prev => prev + 1)
            setTimeout(() => setIsTransitioning(false), 500)
          }
        } else if (e.deltaY < -30) {
          if (activeIndex > 0) {
            lastWheelTime = now
            setIsTransitioning(true)
            setActiveIndex(prev => prev - 1)
            setTimeout(() => setIsTransitioning(false), 500)
          }
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [activeIndex])

  const currentTheme = animeThemes[activeIndex]

  return (
    <section className="hero-dimension" id="hero" ref={heroRef}>
      {/* Dynamic Multi-Anime Background Layers */}
      <div className="hero-dimension__visuals">
        {animeThemes.map((theme, index) => {
          const isActive = index === activeIndex
          return (
            <div
              key={theme.id}
              className={`hero-dimension__layer ${isActive ? 'hero-dimension__layer--active' : ''} ${
                index < activeIndex ? 'hero-dimension__layer--passed' : ''
              }`}
              style={{
                backgroundImage: `radial-gradient(circle at center, rgba(10, 10, 15, 0.4) 0%, rgba(10, 10, 15, 0.95) 90%), url(${theme.image})`
              }}
            >
              {/* Anime slash energy overlay */}
              <div
                className="hero-dimension__energy-glow"
                style={{
                  boxShadow: `inset 0 0 100px ${theme.color}33, 0 0 80px ${theme.secondaryColor}44`
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Runic Kanji Floating Watermark */}
      <div className="hero-dimension__kanji" key={`kanji-${activeIndex}`}>
        {currentTheme.kanji}
      </div>

      {/* Floating HUD & Information Layer */}
      <div className="hero-dimension__content">
        <div className="hero-dimension__badge" style={{ borderColor: `${currentTheme.color}66` }}>
          <span className="hero-dimension__dot" style={{ background: currentTheme.color }} />
          <span>{currentTheme.badge}</span>
        </div>

        <h1 className="hero-dimension__title">
          <span className="hero-dimension__title-tech">TECH</span>
          <span
            className="hero-dimension__title-utopia"
            style={{
              textShadow: 'none'
            }}
          >
            UTHOPIA
          </span>
          <span className="hero-dimension__edition">’26</span>
        </h1>

        <div className="hero-dimension__theme-title" style={{ color: currentTheme.color }}>
          {currentTheme.title}
        </div>

        <p className="hero-dimension__quote">
          {currentTheme.quote}
        </p>

        {/* Anime Image Indicator Dots (Clickable & Scroll-reactive) */}
        <div className="hero-dimension__slider-nav">
          {animeThemes.map((theme, i) => (
            <button
              key={theme.id}
              className={`hero-dimension__slider-dot ${i === activeIndex ? 'hero-dimension__slider-dot--active' : ''}`}
              style={{
                borderColor: i === activeIndex ? currentTheme.color : 'rgba(255,255,255,0.2)',
                background: i === activeIndex ? currentTheme.color : 'transparent'
              }}
              onClick={() => setActiveIndex(i)}
              aria-label={`Switch to ${theme.title}`}
            >
              <span className="hero-dimension__dot-tooltip">{theme.title}</span>
            </button>
          ))}
          <span className="hero-dimension__slider-label">
            0{activeIndex + 1} / 0{animeThemes.length} [SCROLL TO MORPH]
          </span>
        </div>

        {/* Quick Action CTA Buttons */}
        <div className="hero-dimension__actions">
          <button
            className="btn btn--primary"
            onClick={() => {
              const el = document.getElementById('events')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            ⚔️ Summon Raids & Register
          </button>
          <button
            className="btn btn--outline"
            onClick={() => {
              const el = document.getElementById('door-entry')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            ⛩️ Enter Sanctuary
          </button>
        </div>
      </div>
    </section>
  )
}
