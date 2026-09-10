import { useState, useEffect, useRef } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import timerBg23 from '../assets/23.png'

export default function Countdown() {
  // Target Fest Date: October 6 – 7, 2026
  const targetDate = new Date('2026-10-06T09:00:00').getTime()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const containerRef = useRef(null)
  const isVisible = useScrollReveal(containerRef)

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

  const pad = (n) => String(n).padStart(2, '0')

  const items = [
    { value: pad(timeLeft.days), label: 'Days' },
    { value: pad(timeLeft.hours), label: 'Hours' },
    { value: pad(timeLeft.minutes), label: 'Minutes' },
    { value: pad(timeLeft.seconds), label: 'Seconds' },
  ]

  return (
    <section className="countdown" ref={containerRef}>
      <div
        className="countdown__backdrop"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(10, 14, 25, 0.45) 0%, rgba(4, 5, 10, 0.95) 85%), url(${timerBg23})`
        }}
      />
      <div className="section__container">
        <div className={`fade-in-up ${isVisible ? 'fade-in-up--visible' : ''}`}>
          <div className="section__label">⏱ Countdown • October 6 – 7, 2026</div>
          <h2 className="section__title" style={{ textAlign: 'center' }}>The Portal Opens In</h2>
        </div>
        <div className="countdown__grid">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`countdown__item fade-in-up stagger-${i + 1} ${isVisible ? 'fade-in-up--visible' : ''}`}
            >
              <div className="countdown__number">{item.value}</div>
              <div className="countdown__unit">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
