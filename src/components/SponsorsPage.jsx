import { useState, useEffect, useRef } from 'react'
import sponsorsBg from '../assets/sponsors_bg.webp'

const SPONSOR_METRICS = [
  { value: '₹5,00,000+', label: 'COMMITTED BOUNTY' },
  { value: '5,000+', label: 'WARRIOR FOOTFALL' },
  { value: '80+', label: 'TOP INSTITUTES' },
  { value: '100K+', label: 'DIGITAL IMPRESSIONS' }
]

// ─── SPONSORS DATA (Leave empty until official partners are confirmed) ───
// To add sponsors later, fill in these objects/arrays
const TITLE_PATRON = null
const POWERED_PATRON = null
const ASSOCIATE_PARTNERS = []
const MEDIA_ECOSYSTEM = []

export default function SponsorsPage({ onBack, onOpenHistory, onOpenFaq }) {
  const canvasRef = useRef(null)

  // Keyboard shortcut: Esc to return to main dimension
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onBack) {
        onBack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onBack])

  // Floating golden forge sparkle particles canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let isRunning = true

    const resize = () => {
      if (!canvas.parentElement) return
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const sparkleCount = 65
    const sparkles = []
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.8 + 0.9,
        speedY: Math.random() * 0.5 + 0.15,
        speedX: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.65 + 0.25,
        color: ['#fbbf24', '#f59e0b', '#fde68a', '#ffedd5', '#ea580c'][Math.floor(Math.random() * 5)],
        twinklePhase: Math.random() * Math.PI * 2
      })
    }

    const render = () => {
      if (!isRunning) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparkles.forEach((sp) => {
        sp.y -= sp.speedY
        sp.x += sp.speedX
        sp.twinklePhase += 0.04
        if (sp.y < -10) {
          sp.y = canvas.height + 10
          sp.x = Math.random() * canvas.width
        }
        const alpha = sp.alpha * (0.7 + 0.3 * Math.sin(sp.twinklePhase))
        ctx.fillStyle = sp.color
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animId = requestAnimationFrame(render)
    }
    render()

    return () => {
      isRunning = false
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div className="sponsors-page">
      {/* 1. Deep Warm Golden Amber / Molten Copper Background */}
      <div
        className="sponsors-page__bg"
        style={{ backgroundImage: `url(${sponsorsBg})` }}
      />
      <div className="sponsors-page__vignette" />
      <canvas ref={canvasRef} className="sponsors-page__sparkle-canvas" />

      {/* 2. Main Scrollable Content Container */}
      <main className="sponsors-page__content">
        {/* Header Hero Section */}
        <section className="sponsors-header-hero">
          <h1 className="sponsors-main-title">GUILD PATRONS & ALLIES</h1>
          <p className="sponsors-subtitle">
            Powering Rajasthan’s most epic techno-cultural arena with technology, bounties, and infinite momentum.
          </p>

          {/* Festival Metrics Counter */}
          <div className="sponsors-metrics-grid">
            {SPONSOR_METRICS.map((m, i) => (
              <div key={i} className="sponsors-metric-card">
                <span className="sponsors-metric-val">{m.value}</span>
                <span className="sponsors-metric-lbl">{m.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SPONSORS SHOWCASE / EMPTY ANNOUNCEMENT ─── */}
        {TITLE_PATRON || POWERED_PATRON || ASSOCIATE_PARTNERS.length > 0 || MEDIA_ECOSYSTEM.length > 0 ? (
          <>
            {TITLE_PATRON && (
              <section className="sponsors-section-block">
                <div className="sponsors-tier-heading">
                  <span className="sponsors-tier-line" />
                  <span className="sponsors-tier-title sponsors-tier-title--title">TITLE GUILD PATRON</span>
                  <span className="sponsors-tier-line" />
                </div>
                <div className="sponsors-title-card">
                  <div className="sponsors-title-card__inner">
                    <div className="sponsors-title-card__badge">{TITLE_PATRON.badge}</div>
                    <div className="sponsors-title-card__header">
                      <div>
                        <h2 className="sponsors-title-name">{TITLE_PATRON.name}</h2>
                        <p className="sponsors-title-tagline">{TITLE_PATRON.tagline}</p>
                      </div>
                    </div>
                    <p className="sponsors-title-desc">{TITLE_PATRON.description}</p>
                    <div className="sponsors-title-perks">
                      <span className="sponsors-perk-icon">⚡</span>
                      <span className="sponsors-perk-text">{TITLE_PATRON.perk}</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {POWERED_PATRON && (
              <section className="sponsors-section-block">
                <div className="sponsors-tier-heading">
                  <span className="sponsors-tier-line" />
                  <span className="sponsors-tier-title sponsors-tier-title--powered">POWERED BY GUILD</span>
                  <span className="sponsors-tier-line" />
                </div>
                <div className="sponsors-powered-card">
                  <div className="sponsors-powered-card__inner">
                    <div className="sponsors-powered-card__badge">{POWERED_PATRON.badge}</div>
                    <div className="sponsors-powered-card__header">
                      <div>
                        <h2 className="sponsors-powered-name">{POWERED_PATRON.name}</h2>
                        <p className="sponsors-powered-tagline">{POWERED_PATRON.tagline}</p>
                      </div>
                    </div>
                    <p className="sponsors-powered-desc">{POWERED_PATRON.description}</p>
                    <div className="sponsors-powered-perks">
                      <span className="sponsors-perk-icon">⚔</span>
                      <span className="sponsors-perk-text">{POWERED_PATRON.perk}</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {ASSOCIATE_PARTNERS.length > 0 && (
              <section className="sponsors-section-block">
                <div className="sponsors-tier-heading">
                  <span className="sponsors-tier-line" />
                  <span className="sponsors-tier-title">ASSOCIATE GUILD PARTNERS</span>
                  <span className="sponsors-tier-line" />
                </div>
                <div className="sponsors-associate-grid">
                  {ASSOCIATE_PARTNERS.map((p, idx) => (
                    <div key={idx} className="sponsors-associate-card">
                      <div className="sponsors-associate-header">
                        <h3 className="sponsors-associate-name">{p.name}</h3>
                        <span className="sponsors-associate-role">{p.role}</span>
                      </div>
                      <p className="sponsors-associate-desc">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {MEDIA_ECOSYSTEM.length > 0 && (
              <section className="sponsors-section-block">
                <div className="sponsors-tier-heading">
                  <span className="sponsors-tier-line" />
                  <span className="sponsors-tier-title">MEDIA & OUTREACH NETWORK</span>
                  <span className="sponsors-tier-line" />
                </div>
                <div className="sponsors-media-grid">
                  {MEDIA_ECOSYSTEM.map((m, idx) => (
                    <div key={idx} className="sponsors-media-card">
                      <span className="sponsors-media-name">{m.name}</span>
                      <span className="sponsors-media-role">{m.role}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="sponsors-section-block">
            <div
              className="sponsors-empty-card"
              style={{
                background: 'rgba(20, 10, 5, 0.75)',
                border: '1.5px dashed rgba(251, 191, 36, 0.45)',
                borderRadius: '16px',
                padding: '4rem 2rem',
                textAlign: 'center',
                maxWidth: '750px',
                margin: '2rem auto',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1.25rem', filter: 'drop-shadow(0 0 16px rgba(251, 191, 36, 0.6))' }}>
                ⛩️
              </div>
              <h2
                style={{
                  fontFamily: "'Cinzel', serif, var(--font-display)",
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                  marginBottom: '0.85rem',
                  textShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
                }}
              >
                OFFICIAL SPONSORS ANNOUNCING SOON
              </h2>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                  maxWidth: '540px',
                  margin: '0 auto'
                }}
              >
                The guild allies, corporate sponsors, and industry patrons for TechUtopia ’26 will be revealed soon.
              </p>
            </div>
          </section>
        )}

        {/* ─── PARTNERSHIP CALL TO ACTION ─── */}
        <section className="sponsors-cta-box">
          <div className="sponsors-cta-inner">
            <div className="sponsors-cta-content">
              <span className="sponsors-cta-tag">PARTNER WITH TECHUTOPIA ’26</span>
              <h3 className="sponsors-cta-title">Want to empower India’s finest student innovators?</h3>
              <p className="sponsors-cta-desc">
                Engage directly with 5,000+ elite engineers, developers, and creatives. Custom branding tiers, keynote presentations, and recruitment pipelines available.
              </p>
            </div>
            <div className="sponsors-cta-actions">
              <a
                href="mailto:techutopia.sponsors@iem.edu.in"
                className="sponsors-cta-btn"
                title="Send sponsorship inquiry"
              >
                📜 Request Sponsorship Brochure
              </a>
              <a
                href="mailto:techutopia@iem.edu.in"
                className="sponsors-cta-btn sponsors-cta-btn--secondary"
              >
                ✉ Contact Guild Relations
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Fixed Floating Bottom Right PORTAL Button */}
      <button
        type="button"
        className="history-corner-portal-btn portal-floating-fixed-btn"
        onClick={onBack}
        title="Return to Main Festival Dimension"
        aria-label="Back to festival portal"
      >
        <span className="portal-arrow">←</span>
        <span className="portal-text">BACK</span>
      </button>
    </div>
  )
}
