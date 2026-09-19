export default function TeamFlipCard({ member }) {
  const email = member.email || member.socials?.email || `${member.name.toLowerCase().replace(/\s+/g, '')}@techfest.org`
  const phone = member.phone || member.socials?.phone || '+91 97022 76874'
  const cleanPhone = phone.replace(/[^+\d]/g, '')

  // Only LinkedIn and Instagram as requested
  const linkedin = member.linkedin || member.socials?.linkedin || ''
  const instagram = member.instagram || member.socials?.instagram || ''

  return (
    <div className="cyber-team-card-wrap">
      {/* Upper Main Sculpted Mecha Card Frame (Non-rectangular) */}
      <div className="cyber-team-card">
        {/* Top Header inside Frame */}
        <div className="cyber-team-card__top">
          <h3 className="cyber-team-card__name">{member.name}</h3>
          <div className="cyber-team-card__role">{member.role}</div>

          {/* Golden Warm Divider with Centered Crest Triangle */}
          <div className="cyber-team-card__crest" aria-hidden="true">
            <span className="cyber-crest__line" />
            <span className="cyber-crest__triangle">▽</span>
            <span className="cyber-crest__line" />
          </div>
        </div>

        {/* Center Photo Area with Warm Dark Ember / Obsidian Backdrop (No Blue) */}
        <div className="cyber-team-card__photo-wrap">
          <img
            src={member.avatar}
            alt={member.name}
            className="cyber-team-card__photo"
            loading="lazy"
          />

          {/* Left and Right Mecha Side Notches */}
          <div className="cyber-team-card__side-fin cyber-team-card__side-fin--left" aria-hidden="true">
            <svg viewBox="0 0 16 60" className="side-fin-svg">
              <path d="M 0 0 L 14 14 L 14 46 L 0 60" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
              <line x1="8" y1="18" x2="8" y2="42" stroke="#ff7700" strokeWidth="1.8" />
            </svg>
          </div>
          <div className="cyber-team-card__side-fin cyber-team-card__side-fin--right" aria-hidden="true">
            <svg viewBox="0 0 16 60" className="side-fin-svg">
              <path d="M 16 0 L 2 14 L 2 46 L 16 60" stroke="#f59e0b" strokeWidth="2.5" fill="none" />
              <line x1="8" y1="18" x2="8" y2="42" stroke="#ff7700" strokeWidth="1.8" />
            </svg>
          </div>

          {/* Bottom Geometric Nested Chevron Pagoda Overlay (Pure Warm Amber & Flame Gold) */}
          <div className="cyber-team-card__bottom-chevron" aria-hidden="true">
            <svg viewBox="0 0 240 70" preserveAspectRatio="none" className="cyber-chevron-svg">
              {/* Warm amber/orange side brackets (no blue) */}
              <path d="M 12 12 L 12 55 L 35 55" stroke="#ff7700" strokeWidth="2.5" fill="none" />
              <path d="M 228 12 L 228 55 L 205 55" stroke="#ff7700" strokeWidth="2.5" fill="none" />
              {/* Nested Golden Pagoda / Mecha Chevrons */}
              <path d="M 45 68 L 120 20 L 195 68" stroke="#f59e0b" strokeWidth="3.2" fill="none" strokeLinejoin="round" />
              <path d="M 65 68 L 120 30 L 175 68" stroke="#fbbf24" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
              <path d="M 85 68 L 120 40 L 155 68" stroke="#ff9a00" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
              <line x1="120" y1="40" x2="120" y2="68" stroke="#fef08a" strokeWidth="2.2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Attached Bottom Hexagonal Details Plaque with Distinct Gap */}
      <div className="cyber-team-card__plaque">
        {/* Left Double Gold Chevrons */}
        <div className="cyber-plaque__chevrons cyber-plaque__chevrons--left" aria-hidden="true">
          <svg viewBox="0 0 24 36" className="plaque-bracket-svg">
            <path d="M 18 4 L 4 18 L 18 32" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
            <path d="M 24 6 L 10 18 L 24 30" stroke="#ffd166" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Center Contact Content: Email, Phone, and ONLY LinkedIn + Instagram */}
        <div className="cyber-plaque__content">
          <a
            href={`mailto:${email}`}
            className="cyber-plaque__email"
            title={`Email: ${email}`}
          >
            {email}
          </a>
          <a
            href={`tel:${cleanPhone}`}
            className="cyber-plaque__phone"
            title={`Call: ${phone}`}
          >
            {phone}
          </a>

          {/* Only LinkedIn and Instagram Links */}
          <div className="cyber-plaque__socials">
            {linkedin && linkedin !== '#' && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="cyber-plaque__social-link cyber-plaque__social-link--linkedin"
                title={`${member.name}'s LinkedIn`}
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '4px' }}>
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2Z"/>
                </svg>
                LinkedIn
              </a>
            )}
            {instagram && instagram !== '#' && (
              <a
                href={instagram}
                target="_blank"
                rel="noreferrer"
                className="cyber-plaque__social-link cyber-plaque__social-link--instagram"
                title={`${member.name}'s Instagram`}
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true" style={{ verticalAlign: 'middle', marginRight: '4px' }}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/>
                </svg>
                Instagram
              </a>
            )}
          </div>
        </div>

        {/* Right Double Gold Chevrons */}
        <div className="cyber-plaque__chevrons cyber-plaque__chevrons--right" aria-hidden="true">
          <svg viewBox="0 0 24 36" className="plaque-bracket-svg">
            <path d="M 6 4 L 20 18 L 6 32" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
            <path d="M 0 6 L 14 18 L 0 30" stroke="#ffd166" strokeWidth="1.8" fill="none" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
