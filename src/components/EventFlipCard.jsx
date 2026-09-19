import { useState } from 'react'
import { getEventFormLink } from '../context/eventForms'

export default function EventFlipCard({ event, googleFormUrl }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const resolvedFormUrl = googleFormUrl || getEventFormLink(event)

  const handleCardClick = (e) => {
    // Avoid flipping if user clicks directly on the register button or links
    if (e.target.closest('.anime-talisman__register-btn') || e.target.closest('.anime-talisman__unflip-btn')) return
    setIsFlipped(!isFlipped)
  }

  const getRankBadgeClass = (rank) => {
    if (rank.includes('S-RANK') || rank.includes('SUPREME')) return 'anime-rank--s'
    if (rank.includes('A-RANK')) return 'anime-rank--a'
    if (rank.includes('B-RANK')) return 'anime-rank--b'
    return 'anime-rank--special'
  }

  return (
    <div 
      className={`anime-talisman-wrapper ${isFlipped ? 'is-flipped' : ''}`}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`${event.title} - ${isFlipped ? 'Click to close dossier' : 'Click to flip and inspect quest dossier'}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsFlipped(!isFlipped)
        }
      }}
    >
      <div className="anime-talisman-card">
        
        {/* ════════════ FRONT FACE: ANIME QUEST TALISMAN ════════════ */}
        <div 
          className="anime-talisman__face anime-talisman__face--front"
          style={{ '--card-accent': event.color, '--card-glow': event.glowColor }}
        >
          {/* Top Seal Knot / Order Header */}
          <div className="anime-talisman__seal-banner">
            <span className="anime-seal__knot">◆</span>
            <span className="anime-seal__text">【 討伐指令書 // RAID ORDER 】</span>
            <span className="anime-seal__knot">◆</span>
          </div>

          {/* Corner Rune Ornaments */}
          <div className="anime-talisman__corner anime-talisman__corner--tl" />
          <div className="anime-talisman__corner anime-talisman__corner--tr" />
          <div className="anime-talisman__corner anime-talisman__corner--bl" />
          <div className="anime-talisman__corner anime-talisman__corner--br" />

          {/* Glowing Top Mana Energy Bar */}
          <div 
            className="anime-talisman__mana-bar" 
            style={{ background: `linear-gradient(90deg, transparent, ${event.color}, #ffffff, ${event.color}, transparent)` }} 
          />

          {/* Background Kanji Watermark */}
          <div className="anime-talisman__watermark-kanji" aria-hidden="true">
            {event.kanji}
          </div>

          {/* Header Row: Rank Badge & Category Element */}
          <div className="anime-talisman__head-meta">
            <div className={`anime-talisman__rank-tag ${getRankBadgeClass(event.rank)}`}>
              <span className="anime-rank__flame">⚡</span>
              <span>{event.rank}</span>
            </div>
            
            <div className="anime-talisman__element-pill">
              <span className="anime-element__icon">{event.icon}</span>
              <span className="anime-element__name">{event.element || event.category}</span>
            </div>
          </div>

          {/* Main Quest Information */}
          <div className="anime-talisman__body">
            <div className="anime-talisman__kanji-title-row">
              <span className="anime-talisman__kanji-crest">{event.kanji}</span>
              <span className="anime-talisman__threat-badge">THREAT: {event.threat || 'MAX'}</span>
            </div>

            <h3 className="anime-talisman__title">{event.title}</h3>
            
            <p className="anime-talisman__briefing">
              {event.snippet}
            </p>
          </div>

          {/* Bottom Imperial Flip Action */}
          <div className="anime-talisman__footer anime-talisman__footer--centered">
            <div className="anime-talisman__flip-cue">
              <span className="anime-flip__text">開封 // TAP TO FLIP</span>
              <span className="anime-flip__icon">↻</span>
            </div>
          </div>
        </div>

        {/* ════════════ BACK FACE: UNSEALED QUEST DOSSIER ════════════ */}
        <div 
          className="anime-talisman__face anime-talisman__face--back"
          style={{ '--card-accent': event.color, '--card-glow': event.glowColor }}
        >
          {/* Top Seal Knot */}
          <div className="anime-talisman__seal-banner anime-seal--back">
            <span className="anime-seal__knot">✦</span>
            <span className="anime-seal__text">【 任務詳細録 // UNSEALED DOSSIER 】</span>
            <span className="anime-seal__knot">✦</span>
          </div>

          {/* Corner Rune Ornaments */}
          <div className="anime-talisman__corner anime-talisman__corner--tl" />
          <div className="anime-talisman__corner anime-talisman__corner--tr" />
          <div className="anime-talisman__corner anime-talisman__corner--bl" />
          <div className="anime-talisman__corner anime-talisman__corner--br" />

          {/* Back Header with Close Seal Button */}
          <div className="anime-dossier__header">
            <div className="anime-dossier__badge">
              <span className="anime-dossier__badge-icon">{event.icon}</span>
              <span>{event.category.toUpperCase()} RAID</span>
            </div>
            <button 
              type="button" 
              className="anime-talisman__unflip-btn" 
              onClick={(e) => {
                e.stopPropagation()
                setIsFlipped(false)
              }}
              title="Close Dossier"
              aria-label="Close Dossier"
            >
              ✕ 封印
            </button>
          </div>

          <h4 className="anime-dossier__title">{event.title}</h4>
          
          <div className="anime-dossier__desc-container">
            <p className="anime-dossier__desc">{event.description}</p>
          </div>

          {/* Anime Quest Specs Table */}
          <div className="anime-dossier__specs">
            <div className="anime-dossier__spec-item">
              <span className="anime-dossier__spec-key">【 作戦期日 // SCHEDULE 】</span>
              <span className="anime-dossier__spec-val">📅 {event.date}</span>
            </div>
            <div className="anime-dossier__spec-item">
              <span className="anime-dossier__spec-key">【 決戦領域 // VENUE 】</span>
              <span className="anime-dossier__spec-val">📍 {event.venue}</span>
            </div>
            <div className="anime-dossier__spec-item">
              <span className="anime-dossier__spec-key">【 編成規模 // GUILD SQUAD 】</span>
              <span className="anime-dossier__spec-val">👥 {event.team}</span>
            </div>
          </div>

          {/* Register via Google Form Action */}
          <div className="anime-dossier__actions">
            <a
              href={resolvedFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn anime-talisman__register-btn"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="anime-btn__flash">⚡</span>
              <span>UNSEAL & REGISTER VIA GOOGLE FORM ↗</span>
            </a>
            <div className="anime-dossier__hint">
              [ Tap anywhere outside button to reseal talisman ]
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
