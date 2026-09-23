import { useState } from 'react'
import { SOCIAL_LINKS } from '../context/socialLinks'

const socialItems = [
  {
    id: 'instagram',
    name: 'Instagram',
    kanji: '写真',
    url: SOCIAL_LINKS.instagram,
    color: '#e1306c',
    glow: 'rgba(225, 48, 108, 0.45)',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    )
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    kanji: '連係',
    url: SOCIAL_LINKS.linkedin,
    color: '#0a66c2',
    glow: 'rgba(10, 102, 194, 0.45)',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  }
]

export default function FloatingSocials() {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <aside className="floating-social-sidebar" aria-label="Social media links">
      <div className="floating-social-dock">
        {/* Subtle decorative energy line on the side (only when multiple items) */}
        {socialItems.length > 1 && (
          <div className="floating-social-dock__beam" aria-hidden="true" />
        )}

        {socialItems.map((item) => {
          const isHovered = hoveredId === item.id

          return (
            <div key={item.id} className="floating-social-item-wrap">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`floating-social-btn floating-social-btn--${item.id} ${isHovered ? 'is-hovered' : ''}`}
                style={{
                  '--brand-color': item.color,
                  '--brand-glow': item.glow
                }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                aria-label={item.name}
              >
                <div className="floating-social-btn__inner">
                  <span className="floating-social-icon">{item.icon}</span>
                  <span className="floating-social-pulse-ring" aria-hidden="true" />
                </div>
              </a>

              {/* High-tech sliding tooltip */}
              <div 
                className={`floating-social-tooltip ${isHovered ? 'is-visible' : ''}`}
                style={{ '--brand-color': item.color }}
                aria-hidden={!isHovered}
              >
                <span className="tooltip-kanji">{item.kanji}</span>
                <span className="tooltip-divider">/</span>
                <span className="tooltip-name">{item.name}</span>
                <span className="tooltip-arrow">↗</span>
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
