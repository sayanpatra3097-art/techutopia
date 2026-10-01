import { useState, useEffect } from 'react'
import { Copy, LogOut } from 'lucide-react'
import tfLogo from '../assets/tf_logo.webp'
import { DEFAULT_FORM_LINK } from '../context/eventForms'

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const userActionBtnStyle = `
.icon-btn-row { display: flex; gap: 10px; justify-content: center; margin-top: 10px; }
.icon-action-btn { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s ease; background: transparent; border: 1px solid rgba(255, 255, 255, 0.1); color: #94a3b8; position: relative; padding: 0; outline: none; }
.icon-action-btn:active { transform: scale(0.94); }
.icon-action-btn.copy:hover { transform: scale(1.05); background: rgba(255,255,255,0.1); color: #fff; box-shadow: 0 0 8px rgba(255,255,255,0.2); }
.icon-action-btn.whatsapp:hover { transform: scale(1.05); background: rgba(37,211,102,0.15); color: #25d366; box-shadow: 0 0 8px rgba(37,211,102,0.3); border-color: rgba(37,211,102,0.4); }
.icon-action-btn.logout:hover { transform: scale(1.05); background: rgba(239,68,68,0.15); color: #ef4444; box-shadow: 0 0 8px rgba(239,68,68,0.3); border-color: rgba(239,68,68,0.4); }
.copied-tooltip { position: absolute; top: -30px; left: 50%; transform: translateX(-50%); background: #22c55e; color: #fff; font-size: 11px; padding: 3px 6px; border-radius: 4px; font-weight: bold; pointer-events: none; white-space: nowrap; animation: popIn 0.2s ease; }
@keyframes popIn { 0% { opacity: 0; transform: translate(-50%, 5px); } 100% { opacity: 1; transform: translate(-50%, 0); } }
`;

export default function Navbar({ currentPage = 0, onNavigatePage }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        if (!res.ok) throw new Error('Invalid token')
        return res.json()
      })
      .then(data => setUser(data.user))
      .catch(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
      })
    }
  }, [])

  const navLinks = [
    { label: 'Home', page: 0 },
    { label: 'Events', page: 1 },
    { label: 'Itinerary', page: 2 },
    { label: 'Memories', page: 3 },
    { label: 'Contact Us', page: 4 }
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

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setUserDropdownOpen(false)
    window.location.href = '/login'
  }

  const isAuthOrAdminPage = currentPage === -1;

  return (
    <>
      <style>{userActionBtnStyle}</style>
      <header className={`modern-navbar ${scrolled ? 'modern-navbar--scrolled' : ''}`}>
        {/* Left: Brand Logo Only */}
        <div className="modern-navbar__left" onClick={() => handleNavClick(0)}>
          <div className="modern-navbar__emblem">
            <img src={tfLogo} alt="TechUtopia Logo" className="modern-navbar__emblem-img" />
          </div>
        </div>

        {/* Center: Cyberpunk Golden HUD Boundary Navbar */}
        {!isAuthOrAdminPage && (
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
        )}

        {/* Right: Quick Register + Mobile Menu */}
        {!isAuthOrAdminPage && (
        <div className="modern-navbar__right">
          {user ? (
            <div className="user-dropdown-container" style={{ position: 'relative' }}>
              <button 
                className="modern-navbar__cta-btn" 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{ cursor: 'pointer', background: 'transparent', border: '1px solid rgba(255, 154, 0, 0.5)' }}
              >
                <span>{(user.name || 'User').split(' ')[0]} ▼</span>
              </button>
              
              {userDropdownOpen && (
                <div className="user-dropdown-menu" style={{
                  position: 'absolute',
                  top: '110%',
                  right: '0',
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(255, 154, 0, 0.3)',
                  borderRadius: '8px',
                  padding: '15px',
                  width: '240px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  zIndex: 1000,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  textAlign: 'left'
                }}>
                  <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '10px' }}>
                    <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '16px' }}>{user.name}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', wordBreak: 'break-all' }}>{user.email}</div>
                  </div>
                  <div style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '14px' }}>
                    Referral Points: {user.referralPoints}
                  </div>
                  <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '14px' }}>
                    Referral Code: {user.referralCode}
                  </div>
                  {(user.email === 'shreyasroy2023@gmail.com' || user.email === 'snehalsarkar92@gmail.com') && (
                    <a href="/admin" style={{ color: '#fff', textDecoration: 'none', padding: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '6px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', transition: 'background 0.2s', marginTop: '5px' }}>
                      Admin Panel
                    </a>
                  )}
                  <div className="icon-btn-row">
                    <button 
                      className="icon-action-btn copy"
                      title="Copy referral code"
                      aria-label="Copy referral code"
                      onClick={() => handleCopy(user.referralCode)}
                    >
                      {copied && <span className="copied-tooltip">✓ Copied!</span>}
                      <Copy size={20} />
                    </button>
                    <button 
                      className="icon-action-btn whatsapp"
                      title="Share referral on WhatsApp"
                      aria-label="Share referral on WhatsApp"
                      onClick={() => {
                        const referralUrl = `https://techutopia.in/signup?ref=${encodeURIComponent(user.referralCode)}`;
                        const message = `🚀 TECHUTOPIA 2026 IS HERE! 🎮🔥\n\nGet ready for an exciting college tech experience packed with innovation, technology, competitions & amazing vibes! ⚡\n\n🎁 REFER • REGISTER • WIN!\n\nInvite your friends to TechUtopia and get a chance to win exclusive goodies & exciting prizes! 🏆🎁\n\n🎟️ MY REFERRAL CODE:\n👉 ${user.referralCode}\n\n🌐 REGISTER NOW:\n${referralUrl}\n\n✨ Use my referral code while registering and join the TechUtopia experience!\n\n🏆 Refer your friends and take part in exciting TechUtopia rewards and goodies! 🎁🔥\n\nDon't miss out! 🚀\nBring your friends. Build the hype. Be part of TechUtopia! 💻⚡\n\n🌐 https://techutopia.in/\n\n#TechUtopia #TechFest #UEMJaipur`;
                        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                      }}
                    >
                      <WhatsAppIcon />
                    </button>
                    <button 
                      className="icon-action-btn logout"
                      title="Logout"
                      aria-label="Logout"
                      onClick={handleLogout}
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/login"
              className="modern-navbar__cta-btn"
              title="Login to TechUtopia"
            >
              <span>LOGIN ↗</span>
            </a>
          )}

          <button
            className={`modern-navbar__hamburger ${mobileOpen ? 'is-active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <span /><span />
          </button>
        </div>
        )}
      </header>

      {/* Fullscreen Mobile Drawer */}
      {!isAuthOrAdminPage && (
      <div className={`modern-navbar__drawer ${mobileOpen ? 'is-open' : ''}`}>
        <div className="modern-navbar__drawer-header">
          <div className="modern-navbar__brand-title" onClick={() => handleNavClick(0)}>TECHUTOPIA 2026</div>
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
          {user ? (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255, 154, 0, 0.3)' }}>
                <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '18px' }}>{user.name}</div>
                <div style={{ fontSize: '14px', color: '#94a3b8', marginBottom: '10px' }}>{user.email}</div>
                <div style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '16px' }}>
                  Referral Points: {user.referralPoints}
                </div>
                <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '16px', marginTop: '5px' }}>
                  Referral Code: {user.referralCode}
                </div>
              </div>
              {(user.email === 'shreyasroy2023@gmail.com' || user.email === 'snehalsarkar92@gmail.com') && (
                <a href="/admin" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                  ADMIN PANEL
                </a>
              )}
              <div className="icon-btn-row">
                <button 
                  className="icon-action-btn copy"
                  title="Copy referral code"
                  aria-label="Copy referral code"
                  onClick={() => handleCopy(user.referralCode)}
                >
                  {copied && <span className="copied-tooltip">✓ Copied!</span>}
                  <Copy size={20} />
                </button>
                <button 
                  className="icon-action-btn whatsapp"
                  title="Share referral on WhatsApp"
                  aria-label="Share referral on WhatsApp"
                  onClick={() => {
                    const referralUrl = `https://techutopia.in/signup?ref=${encodeURIComponent(user.referralCode)}`;
                    const message = `🚀 TECHUTOPIA 2026 IS HERE! 🎮🔥\n\nGet ready for an exciting college tech experience packed with innovation, technology, competitions & amazing vibes! ⚡\n\n🎁 REFER • REGISTER • WIN!\n\nInvite your friends to TechUtopia and get a chance to win exclusive goodies & exciting prizes! 🏆🎁\n\n🎟️ MY REFERRAL CODE:\n👉 ${user.referralCode}\n\n🌐 REGISTER NOW:\n${referralUrl}\n\n✨ Use my referral code while registering and join the TechUtopia experience!\n\n🏆 Refer your friends and take part in exciting TechUtopia rewards and goodies! 🎁🔥\n\nDon't miss out! 🚀\nBring your friends. Build the hype. Be part of TechUtopia! 💻⚡\n\n🌐 https://techutopia.in/\n\n#TechUtopia #TechFest #UEMJaipur`;
                    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                  }}
                >
                  <WhatsAppIcon />
                </button>
                <button 
                  className="icon-action-btn logout"
                  title="Logout"
                  aria-label="Logout"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          ) : (
            <a
              href="/login"
              className="btn btn--primary"
              style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
              onClick={() => setMobileOpen(false)}
            >
              LOGIN ↗
            </a>
          )}
        </div>
      </div>
      )}
    </>
  )
}


