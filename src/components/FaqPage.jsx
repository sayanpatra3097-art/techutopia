import { useState, useEffect, useRef } from 'react'
import faqBg from '../assets/faq_bg.webp'

const FAQ_CATEGORIES = [
  { id: 'all', label: 'ALL ARCHIVES' },
  { id: 'eligibility', label: 'ELIGIBILITY' },
  { id: 'registration', label: 'REGISTRATION' },
  { id: 'events', label: 'QUESTS & HACKATHONS' },
  { id: 'venue', label: 'VENUE & STAY' },
  { id: 'prizes', label: 'BOUNTIES & PERKS' }
]

const FAQ_DATA = [
  {
    id: 1,
    category: 'eligibility',
    question: 'Who is eligible to participate in TechUtopia ’26?',
    answer: 'TechUtopia ’26 is open to undergraduate and postgraduate students from any recognized university, engineering college, polytechnic, or school across India. Tech enthusiasts, competitive coders, gamers, and roboticists are all warmly invited.'
  },
  {
    id: 2,
    category: 'registration',
    question: 'How do I register for events and hackathons?',
    answer: 'Browse the Dungeon Quests (Events) page in the main portal, select any event card, and click "Register". You can also register directly on Unstop or via our official Google Forms linked on each competition modal.'
  },
  {
    id: 3,
    category: 'registration',
    question: 'Are there any registration or entry fees?',
    answer: 'Participation in standard flagship technical competitions, hackathons, and exhibitions is completely FREE! Specialized tournament tracks (e.g. heavyweight Combat Robotics or LAN Esports) may feature a nominal refundable pool fee as detailed in their specific rulebooks.'
  },
  {
    id: 4,
    category: 'events',
    question: 'Can I participate in multiple events across Day 1 and Day 2?',
    answer: 'Yes, absolutely! You may register for as many events as you like, provided their scheduled time slots on the Celestial Constellation Itinerary do not directly overlap. Check our itinerary for exact quest timings.'
  },
  {
    id: 5,
    category: 'events',
    question: 'What are the team size rules for Hack Pulse & Robo War?',
    answer: 'Hack Pulse (24-Hour Non-stop Hackathon) permits teams of 2 to 4 developers. Heavyweight Combat Robotics accommodates teams of 2 to 4 pit crew members. Solo quests like Visual Echoes, PromptVerse, and Speed Coding accept individual entries.'
  },
  {
    id: 6,
    category: 'events',
    question: 'Will hardware components or bots be provided on spot?',
    answer: 'For Robo War, Robo Soccer, and Drone Racing, teams are expected to bring their own built and certified machines according to safety weight limits. For certain hackathon hardware tracks, microcontrollers and sensors are provided on loan.'
  },
  {
    id: 7,
    category: 'venue',
    question: 'Where is the venue and how do I reach it?',
    answer: 'TechUtopia ’26 takes place at the University of Engineering & Management (UEM) Jaipur Gurukul Campus, Sikar Road, Jaipur, Rajasthan. Free coordinated shuttle buses run between major transit stations (Jaipur Junction, Sindhi Camp Bus Stand) and the campus.'
  },
  {
    id: 8,
    category: 'venue',
    question: 'Is accommodation and food available for outstation participants?',
    answer: 'Yes! Safe, comfortable campus hostel accommodation and meal packages are available for outstation participants traveling from outside Jaipur upon advance booking during registration verification.'
  },

  {
    id: 10,
    category: 'prizes',
    question: 'Do winners receive direct internship or hiring opportunities?',
    answer: 'Yes! Flagship partners like Apex Cyber Dynamics and Quantum Coders conduct on-spot pitch reviews and offer direct fast-track interview rounds, summer internships, and incubator mentorship for podium finishers.'
  }
]

export default function FaqPage({ onBack, onOpenHistory, onOpenSponsors }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState(1)
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

  // Floating warm ember particles canvas
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

    const emberCount = 55
    const embers = []
    for (let i = 0; i < emberCount; i++) {
      embers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.4 + 0.8,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        alpha: Math.random() * 0.6 + 0.2,
        color: ['#f87171', '#fb923c', '#fbbf24', '#fef08a'][Math.floor(Math.random() * 4)]
      })
    }

    const render = () => {
      if (!isRunning) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      embers.forEach((emb) => {
        emb.y -= emb.speedY
        emb.x += emb.speedX
        if (emb.y < -10) {
          emb.y = canvas.height + 10
          emb.x = Math.random() * canvas.width
        }
        ctx.fillStyle = emb.color
        ctx.globalAlpha = emb.alpha
        ctx.beginPath()
        ctx.arc(emb.x, emb.y, emb.size, 0, Math.PI * 2)
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

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory
    const query = searchQuery.toLowerCase().trim()
    const matchesSearch = !query ||
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query)
    return matchesCat && matchesSearch
  })

  return (
    <div className="faq-page">
      {/* 1. Deep Warm Crimson/Ruby Background with Sacred Library Artwork */}
      <div
        className="faq-page__bg"
        style={{ backgroundImage: `url(${faqBg})` }}
      />
      <div className="faq-page__vignette" />
      <canvas ref={canvasRef} className="faq-page__ember-canvas" />

      {/* 2. Main Scrollable Content Container */}
      <main className="faq-page__content">
        {/* Header Title Section */}
        <section className="faq-header-hero">
          <h1 className="faq-main-title">FREQUENTLY ASKED QUESTIONS</h1>
          <p className="faq-subtitle">
            Everything you need to know about quests, rules, accommodation, and claiming glory at TechUtopia ’26.
          </p>

          {/* Search Input */}
          <div className="faq-search-wrap">
            <span className="faq-search-icon">🔍</span>
            <input
              type="text"
              className="faq-search-input"
              placeholder="Search quests, eligibility, registrations, stay, prizes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="faq-search-clear"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="faq-category-pills">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`faq-cat-btn ${activeCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* FAQ Accordion List */}
        <section className="faq-accordion-section">
          {filteredFaqs.length > 0 ? (
            <div className="faq-accordion-list">
              {filteredFaqs.map((faq) => {
                const isOpen = expandedId === faq.id
                return (
                  <article
                    key={faq.id}
                    className={`faq-item-card ${isOpen ? 'is-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="faq-item-question"
                      onClick={() => setExpandedId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question-prefix">Q.</span>
                      <span className="faq-question-text">{faq.question}</span>
                      <span className="faq-chevron-icon">{isOpen ? '−' : '+'}</span>
                    </button>

                    {isOpen && (
                      <div className="faq-item-answer">
                        <div className="faq-answer-inner">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="faq-no-results">
              <span className="faq-no-results-icon">📜</span>
              <h3>No archives match your query</h3>
              <p>Try searching for different keywords or browse all categories above.</p>
              <button
                type="button"
                className="faq-reset-btn"
                onClick={() => { setActiveCategory('all'); setSearchQuery('') }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Quick Summon Support Box */}
        <section className="faq-summon-box">
          <div className="faq-summon-inner">
            <div className="faq-summon-text">
              <h3>Still have questions or special requirements?</h3>
              <p>Our Guild Coordinators are on standby to assist you 24/7 with registrations and travel.</p>
            </div>
            <div className="faq-summon-actions">
              <a
                href="mailto:techutopia@iem.edu.in"
                className="faq-summon-btn"
                title="Send official inquiry email"
              >
                ✉ Summon via Email
              </a>
              <a
                href="https://chat.whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="faq-summon-btn faq-summon-btn--wa"
                title="Join official WhatsApp community"
              >
                💬 WhatsApp Helpdesk
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
