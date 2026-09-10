import { useState, useEffect } from 'react'

export default function Navbar({ currentPage = 0, onNavigatePage }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { label: 'Portal', page: 0 },
    { label: 'Quests', page: 1 },
    { label: 'Constellation', page: 2 },
    { label: 'Memories', page: 3 },
    { label: 'Hashiras', page: 4 }
  ]

  const activeSection = navLinks[currentPage]?.label 
    ? `0${currentPage + 1} // ${navLinks[currentPage].label.toUpperCase()}`
    : '01 // PORTAL'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (pageIndex) => {
    setMobileOpen(false)
    if (onNavigatePage) {
      onNavigatePage(pageIndex)
    }
  }

  return (
    <>
      <header className={`modern-navbar ${scrolled ? 'modern-navbar--scrolled' : ''}`}>
        {/* Left: Brand Logo with Anime Seal */}
        <div className="modern-navbar__left" onClick={() => handleNavClick(0)}>
          <div className="modern-navbar__emblem">
            <span>天</span>
          </div>
          <div className="modern-navbar__brand">
            <span className="modern-navbar__brand-title">TECHUTOPIA</span>
            <span className="modern-navbar__brand-tag">UEM JAIPUR ’26</span>
          </div>
        </div>

        {/* Center: Active Dimension Status Pill & Links */}
        <div className="modern-navbar__center">
          <div className="modern-navbar__status-pill">
            <span className="modern-navbar__status-dot" />
            <span className="modern-navbar__status-text">{activeSection}</span>
          </div>

          <nav className="modern-navbar__links-bar">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                className={`modern-navbar__link-chip ${currentPage === link.page ? 'modern-navbar__link-chip--active' : ''}`}
                onClick={() => handleNavClick(link.page)}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: Quick Register + Mobile Menu */}
        <div className="modern-navbar__right">
          <button
            className="modern-navbar__cta-btn"
            onClick={() => handleNavClick(1)}
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
            onClick={() => handleNavClick(2)}
          >
            REGISTER VIA GOOGLE FORM ↗
          </button>
        </div>
      </div>
    </>
  )
}


