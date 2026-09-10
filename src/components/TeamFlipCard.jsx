import { useState } from 'react'

export default function TeamFlipCard({ member }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleCardClick = (e) => {
    // Prevent unflip if user clicked directly on an interactive link
    if (e.target.closest('a')) return
    setIsFlipped(!isFlipped)
  }

  return (
    <div className={`team-flip-card-wrapper ${isFlipped ? 'is-flipped' : ''}`} onClick={handleCardClick}>
      <div className="team-flip-card">
        {/* ───── FRONT FACE ───── */}
        <div className="team-flip-card__face team-flip-card__face--front">
          <div className="team-flip-card__rank-badge" style={{ color: member.color || 'var(--accent-cyan)' }}>
            {member.rank}
          </div>

          <div className="team-flip-card__avatar-box">
            <div className="team-flip-card__avatar-halo" style={{ borderColor: member.color || 'var(--accent-blue)' }} />
            <img src={member.avatar} alt={member.name} className="team-flip-card__avatar-img" />
          </div>

          <h3 className="team-flip-card__name">{member.name}</h3>
          <div className="team-flip-card__role">{member.role}</div>
          <div className="team-flip-card__class" style={{ color: member.color || 'var(--accent-cyan)' }}>
            {member.classTitle}
          </div>

          <div className="team-flip-card__flip-hint">
            <span>TAP FOR STATS RADAR</span>
            <span className="team-flip-card__flip-icon">↻</span>
          </div>
        </div>

        {/* ───── BACK FACE ───── */}
        <div className="team-flip-card__face team-flip-card__face--back">
          <div className="team-flip-card__back-header">
            <span className="team-flip-card__dossier-tag">HUNTER DOSSIER</span>
            <button className="team-flip-card__unflip-btn" onClick={() => setIsFlipped(false)}>✕</button>
          </div>

          <h4 className="team-flip-card__back-name">{member.name}</h4>
          <div className="team-flip-card__ability">
            <span className="team-flip-card__ability-label">AWAKENED POWER:</span>
            <span className="team-flip-card__ability-val">{member.ability}</span>
          </div>

          {/* Combat Stats Bars */}
          <div className="team-flip-card__stats-list">
            <div className="team-flip-card__stat-row">
              <span className="team-flip-card__stat-name">STRATEGY</span>
              <div className="team-flip-card__stat-track">
                <div className="team-flip-card__stat-fill" style={{ width: `${member.stats.strategy}%`, background: member.color }} />
              </div>
              <span className="team-flip-card__stat-num">{member.stats.strategy}</span>
            </div>

            <div className="team-flip-card__stat-row">
              <span className="team-flip-card__stat-name">MANA / TECH</span>
              <div className="team-flip-card__stat-track">
                <div className="team-flip-card__stat-fill" style={{ width: `${member.stats.tech}%`, background: member.color }} />
              </div>
              <span className="team-flip-card__stat-num">{member.stats.tech}</span>
            </div>

            <div className="team-flip-card__stat-row">
              <span className="team-flip-card__stat-name">LEADERSHIP</span>
              <div className="team-flip-card__stat-track">
                <div className="team-flip-card__stat-fill" style={{ width: `${member.stats.leadership}%`, background: member.color }} />
              </div>
              <span className="team-flip-card__stat-num">{member.stats.leadership}</span>
            </div>
          </div>

          {/* Direct Social / Comm Links */}
          <div className="team-flip-card__socials">
            <a href={member.socials.github} target="_blank" rel="noreferrer" className="team-flip-card__social" title="GitHub">⚡</a>
            <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="team-flip-card__social" title="LinkedIn">🔗</a>
            <a href={`mailto:${member.socials.email}`} className="team-flip-card__social" title="Send Mana Dispatch">✉️</a>
          </div>

          <div className="team-flip-card__form-note">
            [ Tap card to flip back ]
          </div>
        </div>
      </div>
    </div>
  )
}
