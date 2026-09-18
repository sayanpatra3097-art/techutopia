import { useState, useRef, useEffect } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

function AnimatedCounter({ target, duration = 2000, isVisible }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const startTime = performance.now()
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
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

export default function FestLore() {
  const ref = useRef(null)
  const isVisible = useScrollReveal(ref)

  const loreCards = [
    {
      num: '01',
      title: 'THE AWAKENING',
      kanji: '覚醒の門',
      desc: 'Just as an E-Rank hunter awakens unimaginable potential, TechUtopia challenges every student to transcend ordinary programming and discover their true creative strength.'
    },
    {
      num: '02',
      title: 'HINOKAMI FORGE',
      kanji: '炎の鍛錬',
      desc: 'Inspired by the discipline of Demon Slayer Hashiras, our 24-hour hackathons and robotics arenas forge resilient creators who turn pressure into technical brilliance.'
    },
    {
      num: '03',
      title: 'THE SHADOW GUILD',
      kanji: '影の軍団',
      desc: 'More than 5,000 students, engineers, designers, and innovators unite under one roof at UEM Jaipur to build solutions that echo into the future.'
    }
  ]

  const stats = [
    { number: 5000, suffix: '+', label: 'Awakened Hunters' },
    { number: 50, suffix: '+', label: 'Dungeon Quests' },
    { number: 10, suffix: 'L+', label: 'Mana Bounty (INR)' },
    { number: 3, suffix: ' Days', label: 'Epoch Duration' },
  ]

  return (
    <section className="fest-lore-dimension" id="lore" ref={ref}>
      <div className="fest-lore__bg-fx" />

      <div className="fest-lore__container">
        <div className={`fade-in-up ${isVisible ? 'fade-in-up--visible' : ''}`}>
          <div className="section__label" style={{ justifyContent: 'center' }}>
            📜 DIMENSION 03 • GUILD ARCHIVES & LORE
          </div>
          
          <h2 className="fest-lore__headline">
            THE CHRONICLES OF TECHUTOPIA
          </h2>

          <div className="fest-lore__explore-cue">
            <span className="fest-lore__explore-pulse" />
            <span>[ SCROLL TO EXPLORE GUILD MYTHOLOGY ]</span>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="fest-lore__cards-grid">
          {loreCards.map((card, i) => (
            <div
              key={card.num}
              className={`fest-lore__card fade-in-up stagger-${i + 1} ${isVisible ? 'fade-in-up--visible' : ''}`}
            >
              <div className="fest-lore__card-kanji">{card.kanji}</div>
              <div className="fest-lore__card-num">{card.num}</div>
              <h3 className="fest-lore__card-title">{card.title}</h3>
              <p className="fest-lore__card-desc">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Animated Stats HUD */}
        <div className="fest-lore__stats-bar">
          {stats.map((stat, i) => (
            <div key={stat.label} className="fest-lore__stat-node">
              <div className="fest-lore__stat-val">
                <AnimatedCounter target={stat.number} isVisible={isVisible} />
                {stat.suffix}
              </div>
              <div className="fest-lore__stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
