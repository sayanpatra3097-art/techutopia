import { useRef, useState, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

function AnimatedCounter({ target, duration = 2000, isVisible }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let start = 0
    const startTime = performance.now()

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return <span>{count.toLocaleString()}</span>
}

export default function About() {
  const ref = useRef(null)
  const isVisible = useScrollReveal(ref)

  const stats = [
    { number: 5000, suffix: '+', label: 'Participants' },
    { number: 50, suffix: '+', label: 'Events' },
    { number: 10, suffix: 'L+', label: 'Prize Pool' },
    { number: 3, suffix: ' Days', label: 'Duration' },
  ]

  return (
    <section className="about section" id="about" ref={ref}>
      <div className="section__container">
        <div className="about__grid">
          <div className={`about__text fade-in-up ${isVisible ? 'fade-in-up--visible' : ''}`}>
            <div className="section__label">🌀 About</div>
            <h2 className="section__title">What is TechUthopia?</h2>
            <p>
              <strong>TechUthopia</strong> is UEM Jaipur's flagship annual tech fest — a 2-day spectacle where
              technology meets anime-inspired creativity. Like a hunter entering a dungeon gate, 
              participants enter a world of challenges, workshops, and competitions that push 
              their abilities beyond limits.
            </p>
            <p>
              Inspired by the relentless spirits of <em>Solo Leveling</em> and <em>Demon Slayer</em>,
              TechUthopia challenges you to level up, master new skills, and emerge victorious.
              From intense coding battles to immersive robotics workshops, every event is a 
              boss fight waiting to be conquered.
            </p>
            <p>
              Whether you're a seasoned developer or just starting your journey, TechUthopia 
              welcomes all who dare to enter the portal. ⚡
            </p>
          </div>
          <div className="about__stats">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`about__stat fade-in-up stagger-${i + 1} ${isVisible ? 'fade-in-up--visible' : ''}`}
              >
                <div className="about__stat-number">
                  <AnimatedCounter target={stat.number} isVisible={isVisible} />
                  {stat.suffix}
                </div>
                <div className="about__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
