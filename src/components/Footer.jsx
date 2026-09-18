export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__container">
        <div className="footer__top">
          {/* Brand Info & Venue Address */}
          <div className="footer__brand-col">
            <div className="footer__brand-name">TECHUTOPIA 2026</div>
            <p className="footer__brand-desc">
              The supreme annual tech festival of University of Engineering &amp; Management (UEM), Jaipur.
              Enter the realm where code meets the anime frontier — Arise, Level Up, and Conquer!
            </p>
            <div className="footer__address-pill">
              📍 Gurukul, Sikar Road, Udaipuria Mod, Jaipur, Rajasthan 303807
            </div>
          </div>

          {/* Contact Details / Command Center */}
          <div className="footer__contact-col">
            <div className="footer__col-title">COMMAND CENTER</div>
            <ul className="footer__col-links">
              <li className="footer__col-link">
                <span className="contact-label">Email:</span>{' '}
                <a href="mailto:techutopia@uem.edu.in" className="contact-val">techutopia@uem.edu.in</a>
              </li>
              <li className="footer__col-link">
                <span className="contact-label">Helpline:</span>{' '}
                <a href="tel:+911412828000" className="contact-val">+91 141 2828 000</a>
              </li>
              <li className="footer__col-link">
                <span className="contact-label">Student Convener:</span>{' '}
                <a href="tel:+919123456789" className="contact-val">+91 91234 56789</a>
              </li>
              <li className="footer__col-link">
                <span className="contact-label">UEM Jaipur Official:</span>{' '}
                <a href="https://uem.edu.in/jaipur" target="_blank" rel="noopener noreferrer" className="contact-val">uem.edu.in/jaipur</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copyright">
            © 2026 TechUtopia • University of Engineering &amp; Management, Jaipur. All rights reserved. Crafted with Three.js &amp; Passion.
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
