import { useState, useEffect } from 'react'
import { preloadHistoryAssets } from '../utils/preloadAssets'

const navSections = [
  {
    id: 'history',
    title: 'History',
    kanji: '歴史',
    subtitle: 'The Chronicles',
    color: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.55)',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  },
  {
    id: 'sponsors',
    title: 'Sponsors',
    kanji: '協賛',
    subtitle: 'Guild Patrons',
    color: '#f97316',
    glow: 'rgba(249, 115, 22, 0.55)',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34c3.24-.65 5.5-3.3 5.5-6.66V4H6v4c0 3.36 2.26 6.01 5.5 6.66z" />
      </svg>
    )
  },
  {
    id: 'faqs',
    title: 'FAQs',
    kanji: '質問',
    subtitle: 'Knowledge Base',
    color: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.55)',
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    )
  }
]

const historyMilestones = [
  {
    year: '2023',
    phase: 'PHASE 01 • THE GENESIS AWAKENING',
    badge: 'ORIGIN FOUNDATION',
    title: 'The Inception of TechUtopia',
    desc: 'Founded as the apex techno-cultural festival of UEM Jaipur. Launched with 18 high-octane events, 1,200+ delegates, and Jaipur’s first heavyweight combat robotics arena.',
    stats: '1,200+ Participants • 18 Events'
  },
  {
    year: '2024',
    phase: 'PHASE 02 • THE CYBER RENAISSANCE',
    badge: 'EXPANSION SUMMIT',
    title: 'National Footprint & 24Hr Hackathon',
    desc: 'Expanded into a nationwide tech fest with the flagship Hack Pulse 24-hour non-stop hackathon, state-level esports championships, and 28 Guild events across Rajasthan.',
    stats: '2,800+ Warriors • 28 Events'
  },
  {
    year: '2025',
    phase: 'PHASE 03 • ASTRAL ASCENDANCE',
    badge: 'RECORD EDITION',
    title: 'Star-Studded Odyssey & Cultural Explosion',
    desc: 'Surpassed 4,500+ footfall with delegates from 80+ universities across India. Hosted top celebrity bands, drone air races, and multi-tier tech prize pools.',
    stats: '4,500+ Footfall • 80+ Institutes'
  },
  {
    year: '2026',
    phase: 'PHASE 04 • THE MONARCHS REALM',
    badge: 'CURRENT SUMMIT',
    title: 'The Solo Leveling Dimension',
    desc: 'The grandest edition in history! Featuring 3D photo globes, interactive celestial constellation star maps, Solo Leveling anime shrine doors, and an unprecedented ₹5,00,000+ bounty.',
    stats: '5,000+ Contenders • ₹5L+ Bounty Pool'
  }
]

const sponsorTiers = [
  {
    tier: 'TITLE GUILD PATRON',
    color: '#fbbf24',
    name: 'Apex Cyber Dynamics Corp',
    tagline: 'Leading Cloud AI & Scalable Infrastructure',
    perk: 'Exclusive Naming Rights & Grand Arena Sponsor'
  },
  {
    tier: 'POWERED BY GUILD',
    color: '#f97316',
    name: 'Hyperion Mecha Labs & Gaming',
    tagline: 'High-Performance Robotics & Esports Ecosystems',
    perk: 'Robo War Arena & Esports Coliseum Partner'
  },
  {
    tier: 'ASSOCIATE GUILD PARTNERS',
    color: '#fde68a',
    partners: [
      { name: 'Quantum Coders Guild', type: 'Hackathon Track Partner' },
      { name: 'Vertex BioTech Labs', type: 'Physio X Equipment Partner' },
      { name: 'AeroDrone Dynamics', type: 'Aerial Drone Matrix Partner' },
      { name: 'RedBull Energy Guild', type: 'Official Energy & Fuel Sponsor' }
    ]
  },
  {
    tier: 'MEDIA & ECOSYSTEM PARTNERS',
    color: '#ffffff',
    partners: [
      { name: 'Campus Chronicle India', type: 'Student Outreach Network' },
      { name: 'AnimeVerse Jaipur', type: 'Cosplay & Cultural Media Partner' },
      { name: 'HackerEarth Community', type: 'Coding Verification Partner' }
    ]
  }
]

const faqItems = [
  {
    q: 'Who is eligible to participate in TechUtopia ’26?',
    a: 'TechUtopia ’26 is open to undergraduate and postgraduate students, tech enthusiasts, and school students from any recognized university, college, or institute across India.'
  },
  {
    q: 'How do I register for events?',
    a: 'Simply browse the Dungeon Quests (Events) page, select your preferred competition card, and click Register. You can also use the Register button in the main navbar to access direct Google Forms.'
  },
  {
    q: 'Can I register for multiple events across Day 1 and Day 2?',
    a: 'Yes! You can participate in multiple competitions as long as their scheduled timings on the Celestial Itinerary (Constellation Page) do not overlap.'
  },
  {
    q: 'Is accommodation provided for outside participants?',
    a: 'Yes, comfortable campus hostel accommodation is available on advance reservation for outstation participants traveling from outside Jaipur.'
  },
  {
    q: 'What is the bounty pool and certification details?',
    a: 'The total bounty pool exceeds ₹5,00,000 in cash prizes, trophies, and premium sponsor goodies. All registered attendees receive verified digital participation certificates.'
  },
  {
    q: 'What are the team size rules for Hack Pulse & Robo War?',
    a: 'Hack Pulse allows teams of 2 to 4 developers. Robo War accommodates teams of up to 4 pit crew members. Solo events like Visual Echos and Gaming allow individual entries.'
  },
  {
    q: 'Where is the venue and how do I reach it?',
    a: 'The fest takes place at the University of Engineering & Management (UEM) Jaipur Gurukul Campus, Sikar Road. Shuttle bus transport is coordinated from major transit hubs in Jaipur.'
  }
]

export default function FloatingSideNav({ onOpenHistory, onOpenSponsors, onOpenFaq }) {
  const [activeModal, setActiveModal] = useState(null)
  const [openFaq, setOpenFaq] = useState(0)

  const handleNavClick = (secId) => {
    if (secId === 'history' && onOpenHistory) {
      onOpenHistory()
      return
    }
    if (secId === 'sponsors' && onOpenSponsors) {
      onOpenSponsors()
      return
    }
    if (secId === 'faqs' && onOpenFaq) {
      onOpenFaq()
      return
    }
    setActiveModal(secId)
  }

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeModal])

  return (
    <>
      {/* ═══ LEFT FLOATING PILL (Exact Match to User Reference Image) ═══ */}
      <aside className="floating-left-nav" aria-label="Quick festival sections">
        <div className="floating-left-pill">
          {navSections.map((sec) => (
            <button
              key={sec.id}
              type="button"
              className={`floating-pill-item ${activeModal === sec.id ? 'is-active' : ''}`}
              style={{
                '--item-color': sec.color,
                '--item-glow': sec.glow
              }}
              onPointerEnter={() => {
                if (sec.id === 'history') preloadHistoryAssets()
              }}
              onClick={() => handleNavClick(sec.id)}
              aria-label={sec.title}
            >
              {/* 1st: The Icon */}
              <div className="floating-pill-icon">{sec.icon}</div>

              {/* 2nd: The Title directly below the icon */}
              <span className="floating-pill-label">{sec.title}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* ═══ INTERACTIVE ANIME MODAL DIALOG ═══ */}
      {activeModal && (
        <div 
          className="left-modal-backdrop"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="left-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header with Tabs & Close */}
            <div className="left-modal-header">
              <div className="left-modal-tabs">
                {navSections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    className={`left-modal-tab-btn ${activeModal === sec.id ? 'is-active' : ''}`}
                    style={{ '--tab-color': sec.color }}
                    onClick={() => {
                      if (sec.id === 'history' && onOpenHistory) {
                        setActiveModal(null)
                        onOpenHistory()
                        return
                      }
                      if (sec.id === 'sponsors' && onOpenSponsors) {
                        setActiveModal(null)
                        onOpenSponsors()
                        return
                      }
                      if (sec.id === 'faqs' && onOpenFaq) {
                        setActiveModal(null)
                        onOpenFaq()
                        return
                      }
                      setActiveModal(sec.id)
                    }}
                  >
                    <span className="tab-btn-icon">{sec.icon}</span>
                    <span className="tab-btn-title">{sec.title}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="left-modal-close-btn"
                onClick={() => setActiveModal(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="left-modal-body">
              {/* 1. HISTORY VIEW */}
              {activeModal === 'history' && (
                <div className="history-modal-view">
                  <div className="modal-hero-badge">CHRONICLES OF TECHUTOPIA</div>
                  <h2 className="modal-main-title">THE LEGACY & GENESIS</h2>
                  <p className="modal-lead-desc">
                    Since its inception, TechUtopia at UEM Jaipur has transformed from an ambitious tech summit into Rajasthan’s most prestigious techno-cultural festival, blending futuristic technology with legendary anime warrior aesthetics.
                  </p>

                  {/* Highlights Grid */}
                  <div className="history-stats-grid">
                    <div className="history-stat-box">
                      <div className="history-stat-num">5,000+</div>
                      <div className="history-stat-label">Total Footfall</div>
                    </div>
                    <div className="history-stat-box">
                      <div className="history-stat-num">40+</div>
                      <div className="history-stat-label">Guild Quests</div>
                    </div>
                    <div className="history-stat-box">
                      <div className="history-stat-num">100+</div>
                      <div className="history-stat-label">Institutes</div>
                    </div>
                    <div className="history-stat-box">
                      <div className="history-stat-num">₹5L+</div>
                      <div className="history-stat-label">Bounty Pool</div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="history-timeline">
                    {historyMilestones.map((item) => (
                      <div key={item.year} className="history-milestone-item">
                        <div className="milestone-year-badge">
                          <span className="milestone-year">{item.year}</span>
                        </div>
                        <div className="milestone-card">
                          <div className="milestone-phase-row">
                            <span className="milestone-phase">{item.phase}</span>
                            <span className="milestone-tag">{item.badge}</span>
                          </div>
                          <h3 className="milestone-title">{item.title}</h3>
                          <p className="milestone-desc">{item.desc}</p>
                          <div className="milestone-stats">{item.stats}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. SPONSORS VIEW */}
              {activeModal === 'sponsors' && (
                <div className="sponsors-modal-view">
                  <div className="modal-hero-badge">GUILD PATRONS & ALLIES</div>
                  <h2 className="modal-main-title">OFFICIAL FESTIVAL SPONSORS</h2>
                  <p className="modal-lead-desc">
                    Honoring the forward-thinking corporate titans and industry leaders who empower the warriors and innovators of TechUtopia ’26.
                  </p>

                  <div className="sponsors-showcase">
                    {sponsorTiers.map((tier, idx) => (
                      <div key={idx} className="sponsor-tier-card" style={{ '--tier-color': tier.color }}>
                        <div className="sponsor-tier-header">
                          <span className="sponsor-tier-pill">{tier.tier}</span>
                        </div>
                        {tier.name ? (
                          <div className="sponsor-title-sponsor">
                            <h3 className="sponsor-corp-name">{tier.name}</h3>
                            <p className="sponsor-corp-tagline">{tier.tagline}</p>
                            <span className="sponsor-corp-perk">★ {tier.perk}</span>
                          </div>
                        ) : (
                          <div className="sponsor-partners-grid">
                            {tier.partners.map((p, pIdx) => (
                              <div key={pIdx} className="sponsor-partner-chip">
                                <span className="partner-name">{p.name}</span>
                                <span className="partner-type">{p.type}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Sponsor CTA */}
                  <div className="sponsor-cta-banner">
                    <div className="sponsor-cta-info">
                      <h3>Join The Guild of Patrons</h3>
                      <p>Showcase your brand before 5,000+ top engineering minds, innovators, and creators.</p>
                    </div>
                    <a 
                      href="mailto:sayanpatra3097@gmail.com?subject=Sponsorship%20Inquiry%20-%20TechUtopia%202026"
                      className="sponsor-contact-btn"
                    >
                      <span>Become a Sponsor</span>
                      <span className="btn-arrow">→</span>
                    </a>
                  </div>
                </div>
              )}

              {/* 3. FAQS VIEW */}
              {activeModal === 'faqs' && (
                <div className="faqs-modal-view">
                  <div className="modal-hero-badge">KNOWLEDGE ARCHIVES</div>
                  <h2 className="modal-main-title">FREQUENTLY ASKED QUESTIONS</h2>
                  <p className="modal-lead-desc">
                    Got queries regarding entry rules, hackathons, accommodation, or bounties? Browse the official Hunter handbook below.
                  </p>

                  <div className="faqs-accordion-list">
                    {faqItems.map((faq, fIdx) => {
                      const isOpen = openFaq === fIdx
                      return (
                        <div key={fIdx} className={`faq-accordion-item ${isOpen ? 'is-open' : ''}`}>
                          <button
                            type="button"
                            className="faq-question-btn"
                            onClick={() => setOpenFaq(isOpen ? -1 : fIdx)}
                            aria-expanded={isOpen}
                          >
                            <span className="faq-q-number">0{fIdx + 1}</span>
                            <span className="faq-q-text">{faq.q}</span>
                            <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                          </button>
                          {isOpen && (
                            <div className="faq-answer-pane">
                              <p>{faq.a}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <div className="faq-footer-note">
                    <span>Still have questions? Reach out to our Guild coordinators via the </span>
                    <a href="#team" onClick={() => setActiveModal(null)} className="faq-contact-link">Contact Us Guild</a>.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
