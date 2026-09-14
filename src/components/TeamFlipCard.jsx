export default function TeamFlipCard({ member, onSelect }) {
  return (
    <div
      className="team-card-wrapper"
      onClick={() => onSelect && onSelect(member)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect && onSelect(member)
        }
      }}
      aria-label={`${member.name} - ${member.role}. Tap to view abilities and stats`}
    >
      <div className="team-card" style={{ '--member-color': member.color }}>
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

        {/* Avatar Image Area - Crisp, Clear, Never Obscured */}
        <div className="team-card__image-area">
          <img src={member.avatar} alt={member.name} className="team-card__avatar" loading="lazy" />
          <div className="team-card__cue-pill">
            <span>✦ STATS &amp; INFO ✦</span>
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
