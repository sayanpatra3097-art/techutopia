export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer" id="contact">
      <div className="footer__container">
        <div className="footer__top">
          <div>
            <div className="footer__brand-name">TECHUTHOPIA 2026</div>
            <p className="footer__brand-desc">
              The supreme annual tech festival of University of Engineering & Management (UEM), Jaipur.
              Enter the realm where code meets the anime frontier — Arise, Level Up, and Conquer!
            </p>
            <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
              📍 Gurukul, Sikar Road, Udaipuria Mod, Jaipur, Rajasthan 303807
            </div>
          </div>

          <div>
            <div className="footer__col-title">Navigation</div>
            <ul className="footer__col-links">
              <li className="footer__col-link" onClick={() => scrollTo('hero')}>Portal (Home)</li>
              <li className="footer__col-link" onClick={() => scrollTo('about')}>Lore & Guild</li>
              <li className="footer__col-link" onClick={() => scrollTo('events')}>Dungeon Raids (Events)</li>
              <li className="footer__col-link" onClick={() => scrollTo('schedule')}>Chronicles (Schedule)</li>
              <li className="footer__col-link" onClick={() => scrollTo('gallery')}>Memories</li>
              <li className="footer__col-link" onClick={() => scrollTo('team')}>Hashiras & S-Ranks</li>
            </ul>
          </div>

          <div>
            <div className="footer__col-title">Battle Arenas</div>
            <ul className="footer__col-links">
              <li className="footer__col-link" onClick={() => scrollTo('events')}>Coding & Algorithmic</li>
              <li className="footer__col-link" onClick={() => scrollTo('events')}>24hr Hackathon</li>
              <li className="footer__col-link" onClick={() => scrollTo('events')}>Robotics Combat</li>
              <li className="footer__col-link" onClick={() => scrollTo('events')}>AI / Machine Learning</li>
              <li className="footer__col-link" onClick={() => scrollTo('events')}>Esports & Gaming</li>
            </ul>
          </div>

          <div>
            <div className="footer__col-title">Command Center</div>
            <ul className="footer__col-links">
              <li className="footer__col-link">Email: techuthopia@uem.edu.in</li>
              <li className="footer__col-link">Helpline: +91 141 2828 000</li>
              <li className="footer__col-link">Student Convener: +91 91234 56789</li>
              <li className="footer__col-link">UEM Jaipur Official: uem.edu.in/jaipur</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            © 2026 TechUthopia • University of Engineering & Management, Jaipur. All rights reserved. Crafted with Three.js & Passion.
          </div>
          <div className="footer__socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer__social" aria-label="Instagram">📸</a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="footer__social" aria-label="Discord">💬</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer__social" aria-label="LinkedIn">💼</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer__social" aria-label="YouTube">▶️</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="footer__social" aria-label="GitHub">🐙</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
