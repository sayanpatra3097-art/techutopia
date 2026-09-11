export default function TeamFlipCard({ member }) {
  return (
    <div className="team-card-wrapper">
      <div className="team-card">
        {/* Ornate Corner Decorations */}
        <div className="team-card__corner team-card__corner--tl" />
        <div className="team-card__corner team-card__corner--tr" />
        <div className="team-card__corner team-card__corner--bl" />
        <div className="team-card__corner team-card__corner--br" />

        {/* Top Ornate Bar */}
        <div className="team-card__top-bar">
          <span className="team-card__rank-gem">◆</span>
          <span className="team-card__rank-text">{member.rank}</span>
          <span className="team-card__rank-gem">◆</span>
        </div>

        {/* Avatar Image Area */}
        <div className="team-card__image-area">
          <img src={member.avatar} alt={member.name} className="team-card__avatar" />

          {/* Hover Overlay with Details */}
          <div className="team-card__overlay">
            <div className="team-card__overlay-content">
              <div className="team-card__ability-tag">{member.classTitle}</div>
              <p className="team-card__ability-desc">{member.ability}</p>

              <div className="team-card__stats-compact">
                {Object.entries(member.stats).map(([key, val]) => (
                  <div key={key} className="team-card__stat-mini">
                    <span className="team-card__stat-label">{key.toUpperCase()}</span>
                    <div className="team-card__stat-bar">
                      <div className="team-card__stat-fill" style={{ width: `${val}%`, background: member.color }} />
                    </div>
                    <span className="team-card__stat-val">{val}</span>
                  </div>
                ))}
              </div>

              <div className="team-card__social-row">
                <a href={member.socials.github} target="_blank" rel="noreferrer" className="team-card__social-link" title="GitHub">⚡</a>
                <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="team-card__social-link" title="LinkedIn">🔗</a>
                <a href={`mailto:${member.socials.email}`} className="team-card__social-link" title="Email">✉️</a>
              </div>
            </div>
          </div>
        </div>

        {/* Name & Role */}
        <div className="team-card__info">
          <h3 className="team-card__name">{member.name}</h3>
          <div className="team-card__role">{member.role}</div>
        </div>

        {/* Bottom Bar */}
        <div className="team-card__bottom-bar">
          <span className="team-card__dept-label">DEPT</span>
          <span className="team-card__dept-value" style={{ color: member.color }}>{member.classTitle}</span>
        </div>
      </div>
    </div>
  )
}
