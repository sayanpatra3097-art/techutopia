import { useState, useEffect, useRef } from 'react'
import timerBg23 from '../assets/23.webp'

export default function ChamberOfTime() {
  const [isUnsealed, setIsUnsealed] = useState(false)
  const [pulse, setPulse] = useState(false)

  // Target Fest Date: October 6 – 7, 2026
  const targetDate = new Date('2026-10-06T09:00:00').getTime()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const update = () => {
      const now = Date.now()
      const diff = Math.max(0, targetDate - now)

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }

    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const handleUnseal = () => {
    setPulse(true)
    setTimeout(() => {
      setIsUnsealed(true)
      setPulse(false)
    }, 400)
  }

  const pad = (n) => String(n).padStart(2, '0')

  const timeUnits = [
    { value: pad(timeLeft.days), label: 'Days' },
    { value: pad(timeLeft.hours), label: 'Hours' },
    { value: pad(timeLeft.minutes), label: 'Minutes' },
    { value: pad(timeLeft.seconds), label: 'Seconds' },
  ]

  return (
    <section className="time-chamber-dimension" id="time-chamber">
      <div
        className="time-chamber__backdrop"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(16, 12, 36, 0.45) 0%, rgba(4, 2, 12, 0.95) 85%), url(${timerBg23})`
        }}
      />
      <div className="time-chamber__bg-grid" />
      
      <div className="time-chamber__container">
        <div className="section__label" style={{ justifyContent: 'center' }}>
          ⏱ DIMENSION 02 • THE TEMPORAL NEXUS
        </div>

        {!isUnsealed ? (
          /* Sealed Gate View: Tap to Unseal */
          <div className={`time-chamber__seal-box ${pulse ? 'time-chamber__seal-box--break' : ''}`}>
            <div className="time-chamber__runic-ring">
              <svg viewBox="0 0 400 400" className="time-chamber__runic-svg">
                <circle cx="200" cy="200" r="180" stroke="rgba(0, 212, 255, 0.4)" strokeWidth="2" fill="none" strokeDasharray="8 6" />
                <circle cx="200" cy="200" r="140" stroke="rgba(123, 47, 247, 0.5)" strokeWidth="1.5" fill="none" strokeDasharray="15 8" />
                <circle cx="200" cy="200" r="90" stroke="rgba(230, 57, 70, 0.6)" strokeWidth="2" fill="none" />
                <polygon points="200,60 320,270 80,270" stroke="rgba(0, 212, 255, 0.3)" fill="none" strokeWidth="1" />
                <polygon points="200,340 320,130 80,130" stroke="rgba(181, 55, 242, 0.3)" fill="none" strokeWidth="1" />
              </svg>
              <div className="time-chamber__seal-core">🔒</div>
            </div>

            <h2 className="time-chamber__seal-title">THE PORTAL OF TIME IS SEALED</h2>
            <p className="time-chamber__seal-desc">
              Ancient mana seals guard the countdown to UEM Jaipur's supreme festival.
              Channel your inner spirit to unlock the gate.
            </p>

            <button className="btn btn--primary time-chamber__unseal-btn" onClick={handleUnseal}>
              ⚡ [ TAP TO UNSEAL GATEWAY ] ⚡
            </button>
          </div>
        ) : (
          /* Unsealed Live Countdown View */
          <div className="time-chamber__unsealed-box">
            <div className="time-chamber__status-badge">
              <span className="time-chamber__status-dot" />
              PORTAL UNSEALED • SYNCHRONIZING REALTIME
            </div>

            <h2 className="time-chamber__title">TIME REMAINING UNTIL AWAKENING</h2>

            <div className="time-chamber__clock-grid">
              {timeUnits.map((item) => (
                <div key={item.label} className="time-chamber__clock-card">
                  <div className="time-chamber__number">{item.value}</div>
                  <div className="time-chamber__unit">{item.label}</div>
                  <div className="time-chamber__corner time-chamber__corner--tl" />
                  <div className="time-chamber__corner time-chamber__corner--br" />
                </div>
              ))}
            </div>

            <div className="time-chamber__date-banner">
              📍 OCTOBER 6 – 7, 2026 • MAIN CONVOCATION ARENA, UEM JAIPUR
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
