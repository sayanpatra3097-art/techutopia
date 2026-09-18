import { useState, useEffect } from 'react'
import tfLogo from '../assets/tf_logo.webp'

export default function Navbar({ currentPage = 0, onNavigatePage }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: 'Portal', page: 0 },
    { label: 'Events', page: 1 },
    { label: 'Constellation', page: 2 },
    { label: 'Memories', page: 3 },
    { label: 'Hashiras', page: 4 }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (pageIndex, options = {}) => {
    setMobileOpen(false)
    if (onNavigatePage) {
      onNavigatePage(pageIndex, options)
    }
  }

  return (
    <>
      <header className={`modern-navbar ${scrolled ? 'modern-navbar--scrolled' : ''}`}>
        {/* Left: Brand Logo Only */}
        <div className="modern-navbar__left" onClick={() => handleNavClick(0)}>
          <div className="modern-navbar__emblem">
            <img src={tfLogo} alt="TechUtopia Logo" className="modern-navbar__emblem-img" />
          </div>
        </div>

        {/* Center: Cyberpunk Golden HUD Boundary Navbar */}
        <div className="modern-navbar__center">
          <div className="tech-nav-boundary">
            {/* Dark Chamfered Background Plate */}
            <div className="tech-nav-boundary__bg" aria-hidden="true" />

            {/* SVG Golden Boundary Frame: Outer Wings, Corner Brackets, Segmented Bottom Rail with Center Gap */}
            <div className="tech-nav-boundary__frame" aria-hidden="true">
              <svg
                className="tech-nav-boundary__svg"
                viewBox="0 0 1000 58"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="techGoldMetalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fff7ed" />
                    <stop offset="25%" stopColor="#fbbf24" />
                    <stop offset="65%" stopColor="#ea580c" />
                    <stop offset="100%" stopColor="#7c2d12" />
                  </linearGradient>
                  <linearGradient id="techGoldBevelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="45%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>

                {/* Left Outer Wing (horizontal gold/amber antenna stepping down) */}
                <path
                  d="M 2 14 L 28 14 L 46 50"
                  stroke="#ff9a00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Left Corner Beveled Bracket */}
                <polygon
                  points="26,20 42,48 70,48 66,54 34,54 18,20"
                  fill="url(#techGoldMetalGrad)"
                  stroke="#ffd580"
                  strokeWidth="1"
                />

                {/* Segment 1: Beveled Plate (under PORTAL) */}
                <polygon
                  points="80,48 90,54 210,54 220,48 200,48 100,48"
                  fill="url(#techGoldBevelGrad)"
                  stroke="#ff9a00"
                  strokeWidth="1"
                />
                <line x1="220" y1="48" x2="250" y2="48" stroke="#f59e0b" strokeWidth="1.8" />

                {/* Segment 2: Beveled Plate (under EVENTS) */}
                <polygon
                  points="260,48 270,54 440,54 450,48 430,48 280,48"
                  fill="url(#techGoldBevelGrad)"
                  stroke="#ff9a00"
                  strokeWidth="1"
                />

                {/* Center rail step-in before gap */}
                <line x1="450" y1="48" x2="486" y2="48" stroke="#f59e0b" strokeWidth="1.8" />
                {/* CENTER GAP (divider cut) between 486 and 514 */}
                <line x1="514" y1="48" x2="550" y2="48" stroke="#f59e0b" strokeWidth="1.8" />

                {/* Segment 3: Beveled Plate (under CONSTELLATION) */}
                <polygon
                  points="560,48 570,54 730,54 740,48 720,48 580,48"
                  fill="url(#techGoldBevelGrad)"
                  stroke="#ff9a00"
                  strokeWidth="1"
                />
                <line x1="740" y1="48" x2="770" y2="48" stroke="#f59e0b" strokeWidth="1.8" />

                {/* Segment 4: Beveled Plate (under MEMORIES & HASHIRAS) */}
                <polygon
                  points="780,48 790,54 910,54 920,48 900,48 800,48"
                  fill="url(#techGoldBevelGrad)"
                  stroke="#ff9a00"
                  strokeWidth="1"
                />

                {/* Right Corner Beveled Bracket */}
                <polygon
                  points="974,20 958,48 930,48 934,54 966,54 982,20"
                  fill="url(#techGoldMetalGrad)"
                  stroke="#ffd580"
                  strokeWidth="1"
                />

                {/* Right Outer Wing (horizontal gold/amber antenna stepping up) */}
                <path
                  d="M 954 50 L 972 14 L 998 14"
                  stroke="#ff9a00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Top Chamfer Edge Accent Lines */}
                <line x1="44" y1="1" x2="956" y2="1" stroke="rgba(255, 160, 0, 0.45)" strokeWidth="1.2" />
              </svg>
            </div>

            {/* Interactive Nav Items Bar with active indicator bars */}
            <nav className="tech-nav__links">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page
                return (
                  <button
                    key={link.label}
                    type="button"
                    className={`tech-nav__item ${isActive ? 'tech-nav__item--active' : ''}`}
                    onClick={() => handleNavClick(link.page)}
                  >
                    {isActive && (
                      <span className="tech-nav__bars tech-nav__bars--left" aria-hidden="true">
                        <span className="tech-nav__bar" />
                        <span className="tech-nav__bar" />
                      </span>
                    )}
                    <span className="tech-nav__label">{link.label}</span>
                    {isActive && (
                      <span className="tech-nav__bars tech-nav__bars--right" aria-hidden="true">
                        <span className="tech-nav__bar" />
                        <span className="tech-nav__bar" />
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Right: Quick Register + Mobile Menu */}
        <div className="modern-navbar__right">
          <button
            className="modern-navbar__cta-btn"
            onClick={() => handleNavClick(1, { stage: 'inside' })}
            title="Open Events Quests Corridor"
          >
            <span>REGISTER ↗</span>
          </button>

          <button
            className={`modern-navbar__hamburger ${mobileOpen ? 'is-active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span /><span />
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <div className={`modern-navbar__drawer ${mobileOpen ? 'is-open' : ''}`}>
        <div className="modern-navbar__drawer-header">
          <div className="modern-navbar__brand-title">TECHUTOPIA 2026</div>
          <button className="modern-navbar__drawer-close" onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        <div className="modern-navbar__drawer-links">
          {navLinks.map((link, idx) => (
            <div
              key={link.label}
              className={`modern-navbar__drawer-link ${currentPage === link.page ? 'is-active' : ''}`}
              onClick={() => handleNavClick(link.page)}
            >
              <span className="modern-navbar__drawer-idx">0{idx + 1}</span>
              <span className="modern-navbar__drawer-label">{link.label}</span>
            </div>
          ))}
        </div>

        <div className="modern-navbar__drawer-footer">
          <button
            className="btn btn--primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => handleNavClick(1, { stage: 'inside' })}
          >
            REGISTER FOR EVENTS ↗
          </button>
        </div>
      </div>
    </>
  )
}


