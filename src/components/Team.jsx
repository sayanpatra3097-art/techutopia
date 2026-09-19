import { useRef } from 'react'
import TeamFlipCard from './TeamFlipCard'
import useScrollReveal from '../hooks/useScrollReveal'
import coreTeamBg from '../assets/core_team.webp'
import { CORE_MEMBERS } from '../context/coreMembers'

export default function Team() {
  const ref = useRef(null)
  const isVisible = useScrollReveal(ref)

  return (
    <section className="team-dimension section" id="team" ref={ref}>
      {/* Fixed Background Image Layer */}
      <div
        className="team-dimension__backdrop"
        style={{
          backgroundImage: `url(${coreTeamBg})`
        }}
      />
      <div className="team-dimension__backdrop-overlay" />

      <div className="section__container">
        <div className={`fade-in-up ${isVisible ? 'fade-in-up--visible' : ''}`}>
          {/* Ornate "Meet the Team" Section Header matching TECHUTOPIA font */}
          <div className="team-dimension__header">
            <span className="team-dimension__header-gem">◆◆</span>
            <h2 className="team-dimension__title">Meet the Team</h2>
            <span className="team-dimension__header-gem">◆◆</span>
          </div>
          <div></div>
        </div>

        {/* Team Card Grid — Direct Details on Card, No Modal Tapping Needed, No Filters */}
        <div className="team-card-grid cyber-team-grid">
          {CORE_MEMBERS.map((member) => (
            <TeamFlipCard
              key={member.id || member.name}
              member={member}
            />
          ))}
        </div>

        {/* UEM Jaipur Location Rectangle Box */}
        <div className="team-location-wrap">
          <a
            href="https://maps.google.com/?q=University+of+Engineering+%26+Management+UEM+Jaipur+Gurukul+Sikar+Road+Jaipur+Rajasthan+303807"
            target="_blank"
            rel="noopener noreferrer"
            className="team-location-box"
            title="Open UEM Jaipur location in Google Maps"
          >
            {/* Ornate Corner Accents */}
            <div className="location-box__corner location-box__corner--tl" />
            <div className="location-box__corner location-box__corner--tr" />
            <div className="location-box__corner location-box__corner--bl" />
            <div className="location-box__corner location-box__corner--br" />

            <div className="team-location-box__inner">
              <div className="team-location-box__icon-wrap">
                <span className="team-location-box__pin">📍</span>
                <span className="team-location-box__radar-pulse" />
              </div>

              <div className="team-location-box__details">
                <div className="team-location-box__eyebrow">
                  <span className="eyebrow-tag">⛩️ FESTIVAL SANCTUM</span>
                  <span className="eyebrow-coord">27.1558° N, 75.7247° E</span>
                </div>
                <h3 className="team-location-box__title">
                  UNIVERSITY OF ENGINEERING &amp; MANAGEMENT (UEM), JAIPUR
                </h3>
                <p className="team-location-box__address">
                  Gurukul Campus, Sikar Road, NH-52, Near Udaipuria Mod, Jaipur, Rajasthan 303807
                </p>
                <div className="team-location-box__badges">
                  <span className="location-badge">🏛️ MAIN ARENA CAMPUS</span>
                  <span className="location-badge">🚗 DIRECT HIGHWAY ACCESS (NH-52)</span>
                  <span className="location-badge location-badge--highlight">⚡ GET DIRECTIONS</span>
                </div>
              </div>

              <div className="team-location-box__action">
                <span className="team-location-box__cta-btn">
                  <span>OPEN IN GOOGLE MAPS</span>
                  <span className="cta-arrow">↗</span>
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
