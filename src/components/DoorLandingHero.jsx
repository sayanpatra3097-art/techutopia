import { useState, useEffect, useRef } from 'react'
import doorImg from '../assets/door.webp'

// Eagerly resolve all anime dimension backgrounds (1.webp to 42.webp) from the assets folder
const bgModules = import.meta.glob('../assets/*.webp', { eager: true, import: 'default' })

const getAssetBg = (num) => {
  return (
    bgModules[`../assets/${num}.webp`] ||
    bgModules[`../assets/${((num % 42) + 1)}.webp`] ||
    bgModules['../assets/1.webp']
  )
}

const animeThemes = [
  {
    id: 'theme-1',
    title: 'SHADOW MONARCH DOMAIN',
    kanji: '影の君主',
    badge: 'Dimension 01 • Solo Leveling',
    color: '#1d4ed8',
    secondaryColor: '#0f172a',
    bg: getAssetBg(1),
    quote: '“All systems awaken. Every line of algorithmic code arises at my command.”'
  },
  {
    id: 'theme-2',
    title: 'HINOKAMI KAGURA REALM',
    kanji: 'ヒノカミ神楽',
    badge: 'Dimension 02 • Demon Slayer',
    color: '#ff6b35',
    secondaryColor: '#e63946',
    bg: getAssetBg(2),
    quote: '“Set your heart ablaze. Forge resilient creations in the heat of innovation.”'
  },
  {
    id: 'theme-3',
    title: 'INFINITE NEURAL VOID',
    kanji: '無量空処',
    badge: 'Dimension 03 • Jujutsu Kaisen',
    color: '#b537f2',
    secondaryColor: '#7b2ff7',
    bg: getAssetBg(3),
    quote: '“Infinite intelligence and autonomous compute flowing into boundless reality.”'
  },
  {
    id: 'theme-4',
    title: 'BANKAI SOUL SANCTUARY',
    kanji: '卍解・天鎖斬月',
    badge: 'Dimension 04 • Bleach',
    color: '#3a86ff',
    secondaryColor: '#8338ec',
    bg: getAssetBg(4),
    quote: '“Release the ultimate potential of your code with bankai-level precision.”'
  },
  {
    id: 'theme-5',
    title: 'TITAN WALL TRANSCENDENCE',
    kanji: '進撃の巨人',
    badge: 'Dimension 05 • Attack on Titan',
    color: '#2a9d8f',
    secondaryColor: '#264653',
    bg: getAssetBg(5),
    quote: '“Dedicate your mind and soul. Break through every wall that confines you.”'
  },
  {
    id: 'theme-6',
    title: 'SIX PATHS SAGE MATRIX',
    kanji: '六道仙人モード',
    badge: 'Dimension 06 • Naruto',
    color: '#ffb703',
    secondaryColor: '#fb8500',
    bg: getAssetBg(6),
    quote: '“Believe in the infinite path of perseverance. My ninja way is innovation.”'
  },
  {
    id: 'theme-7',
    title: 'SUN GOD NIKA GEAR 5',
    kanji: '太陽の神ニカ',
    badge: 'Dimension 07 • One Piece',
    color: '#ffd166',
    secondaryColor: '#ef476f',
    bg: getAssetBg(7),
    quote: '“Freedom of imagination turns the impossible into absolute triumph.”'
  },
  {
    id: 'theme-8',
    title: 'GODSPEED NEN DOMAIN',
    kanji: '神速・電光石火',
    badge: 'Dimension 08 • Hunter x Hunter',
    color: '#06d6a0',
    secondaryColor: '#118ab2',
    bg: getAssetBg(8),
    quote: '“Transmute your thoughts into lightning-fast algorithmic execution.”'
  },
  {
    id: 'theme-9',
    title: 'SANDEVISTAN OVERDRIVE',
    kanji: 'サイバーパンク',
    badge: 'Dimension 09 • Cyberpunk',
    color: '#ff007f',
    secondaryColor: '#00f0ff',
    bg: getAssetBg(9),
    quote: '“Time slows down when pure neural speed takes over the system grid.”'
  },
  {
    id: 'theme-10',
    title: 'UNLIMITED BLADE WORKS',
    kanji: '無限の剣製',
    badge: 'Dimension 10 • Fate/Stay Night',
    color: '#e63946',
    secondaryColor: '#ff758f',
    bg: getAssetBg(10),
    quote: '“I am the bone of my sword. Steel is my body, and fire is my blood.”'
  },
  {
    id: 'theme-11',
    title: 'EVANGELION BERSERK CORE',
    kanji: '初号機暴走',
    badge: 'Dimension 11 • Evangelion',
    color: '#7209b7',
    secondaryColor: '#4cc9f0',
    bg: getAssetBg(11),
    quote: '“Synchronize at 400% ratio. Synchronous consciousness meets synthetic form.”'
  },
  {
    id: 'theme-12',
    title: 'ULTRA INSTINCT ASCENT',
    kanji: '身勝手の極意',
    badge: 'Dimension 12 • Dragon Ball',
    color: '#e0aaff',
    secondaryColor: '#c77dff',
    bg: getAssetBg(12),
    quote: '“Move without thinking. Pure instinct and mastery in every pulse.”'
  },
  {
    id: 'theme-13',
    title: 'CHAINSAW HELL ENGINE',
    kanji: 'チェンソーの悪魔',
    badge: 'Dimension 13 • Chainsaw Man',
    color: '#f77f00',
    secondaryColor: '#d62828',
    bg: getAssetBg(13),
    quote: '“Rev the engine of relentless creation until every obstacle is shattered.”'
  },
  {
    id: 'theme-14',
    title: 'ALCHEMICAL GATE OF TRUTH',
    kanji: '真理の扉',
    badge: 'Dimension 14 • Fullmetal Alchemist',
    color: '#f4a261',
    secondaryColor: '#e76f51',
    bg: getAssetBg(14),
    quote: '“Equivalent exchange: give your relentless effort, receive absolute mastery.”'
  },
  {
    id: 'theme-15',
    title: 'ONE-EYED KING KAKUJA',
    kanji: '隻眼の王',
    badge: 'Dimension 15 • Tokyo Ghoul',
    color: '#c1121f',
    secondaryColor: '#780000',
    bg: getAssetBg(15),
    quote: '“In this tragedy of limitations, we evolve beyond what was thought possible.”'
  },
  {
    id: 'theme-16',
    title: 'ZERO REQUIEM GEASS',
    kanji: '絶対遵守の力',
    badge: 'Dimension 16 • Code Geass',
    color: '#9d4edd',
    secondaryColor: '#5a189a',
    bg: getAssetBg(16),
    quote: '“The only ones who should fire are those who are prepared to be fired upon.”'
  },
  {
    id: 'theme-17',
    title: 'STEIN GATE TIMELINE',
    kanji: '運命石の扉',
    badge: 'Dimension 17 • Steins;Gate',
    color: '#00b4d8',
    secondaryColor: '#0077b6',
    bg: getAssetBg(17),
    quote: '“Deceive your other self. Deceive the world. Reach the Steins Gate.”'
  },
  {
    id: 'theme-18',
    title: 'PSYCHIC 100% BURST',
    kanji: 'モブサイコ１００',
    badge: 'Dimension 18 • Mob Psycho',
    color: '#48cae4',
    secondaryColor: '#023e8a',
    bg: getAssetBg(18),
    quote: '“When emotions reach critical threshold, unbridled power is unlocked.”'
  },
  {
    id: 'theme-19',
    title: 'GOLDEN WIND REQUIEM',
    kanji: '黄金の風',
    badge: 'Dimension 19 • JoJo Bizarre',
    color: '#ffb703',
    secondaryColor: '#fb8500',
    bg: getAssetBg(19),
    quote: '“You will never reach the reality of failure. Revert all bugs to zero.”'
  },
  {
    id: 'theme-20',
    title: 'BLACK SWORDSMAN BRAND',
    kanji: '狂戦士の甲冑',
    badge: 'Dimension 20 • Berserk',
    color: '#9b2226',
    secondaryColor: '#ae2012',
    bg: getAssetBg(20),
    quote: '“Struggle, endure, and contend. That alone is the sword of a true challenger.”'
  },
  {
    id: 'theme-21',
    title: 'TRUE WARRIOR VALHALLA',
    kanji: '本当の戦士',
    badge: 'Dimension 21 • Vinland Saga',
    color: '#84a59d',
    secondaryColor: '#f28482',
    bg: getAssetBg(21),
    quote: '“A true pioneer has no enemies. Build what preserves and elevates humanity.”'
  },
  {
    id: 'theme-22',
    title: 'NEW WORLD COGNITION',
    kanji: '新世界の神',
    badge: 'Dimension 22 • Death Note',
    color: '#495057',
    secondaryColor: '#212529',
    bg: getAssetBg(22),
    quote: '“I will create an architecturally perfect realm where truth prevails.”'
  },
  {
    id: 'theme-23',
    title: 'SPIRAL GALAXY DRILL',
    kanji: '天元突破グレンラガン',
    badge: 'Dimension 23 • Gurren Lagann',
    color: '#ff0054',
    secondaryColor: '#ff5400',
    bg: getAssetBg(23),
    quote: '“Pierce the heavens with your vision. Believe in the you that believes in you.”'
  },
  {
    id: 'theme-24',
    title: 'STARBURST DUAL BLADES',
    kanji: 'スターバースト・ストリーム',
    badge: 'Dimension 24 • Sword Art Online',
    color: '#0077b6',
    secondaryColor: '#90e0ef',
    bg: getAssetBg(24),
    quote: '“Ten consecutive algorithmic strikes to shatter through any barrier.”'
  },
  {
    id: 'theme-25',
    title: 'ANTI-MAGIC DEVIL UNION',
    kanji: '悪魔同化モード',
    badge: 'Dimension 25 • Black Clover',
    color: '#14213d',
    secondaryColor: '#fca311',
    bg: getAssetBg(25),
    quote: '“My magic is never giving up. Defy the odds with raw perseverance.”'
  },
  {
    id: 'theme-26',
    title: 'ONE FOR ALL GEARSHIFT',
    kanji: 'ワン・フォー・オール',
    badge: 'Dimension 26 • My Hero Academia',
    color: '#00b4d8',
    secondaryColor: '#52b788',
    bg: getAssetBg(26),
    quote: '“Go beyond, Plus Ultra! Inherit the dreams of all who engineered before you.”'
  },
  {
    id: 'theme-27',
    title: 'CRIMSON MOON SYMPHONY',
    kanji: '月下の夜想曲',
    badge: 'Dimension 27 • Castlevania',
    color: '#800f2f',
    secondaryColor: '#a4133c',
    bg: getAssetBg(27),
    quote: '“What is a man? A relentless seeker of technological mastery.”'
  },
  {
    id: 'theme-28',
    title: 'EGOIST METAVISION EYE',
    kanji: '空間認識・直撃蹴弾',
    badge: 'Dimension 28 • Blue Lock',
    color: '#00f5d4',
    secondaryColor: '#7b2cbf',
    bg: getAssetBg(28),
    quote: '“Devour the field. Predict every outcome before the competition even blinks.”'
  },
  {
    id: 'theme-29',
    title: 'ADOLLA BURST GENESIS',
    kanji: 'アドラバースト',
    badge: 'Dimension 29 • Fire Force',
    color: '#ff4d6d',
    secondaryColor: '#ff758f',
    bg: getAssetBg(29),
    quote: '“Faster than light, ignite the flames that reshape reality itself.”'
  },
  {
    id: 'theme-30',
    title: 'ZERO RESTRAINT RELEASE',
    kanji: '死線解放零',
    badge: 'Dimension 30 • Hellsing',
    color: '#590d22',
    secondaryColor: '#800f2f',
    bg: getAssetBg(30),
    quote: '“Releasing control art restriction zero. An endless army of solutions arises.”'
  },
  {
    id: 'theme-31',
    title: 'GOLDEN CITY ABYSS',
    kanji: '奈落の底・深界七層',
    badge: 'Dimension 31 • Made in Abyss',
    color: '#e9c46a',
    secondaryColor: '#2a9d8f',
    bg: getAssetBg(31),
    quote: '“The abyss calls to those who dare venture past the point of no return.”'
  },
  {
    id: 'theme-32',
    title: 'OVERLORD FALLEN DOWN',
    kanji: '至高の四十一人',
    badge: 'Dimension 32 • Overlord',
    color: '#7b2cbf',
    secondaryColor: '#3c096c',
    bg: getAssetBg(32),
    quote: '“Bow before the supreme architect of autonomous digital fortresses.”'
  },
  {
    id: 'theme-33',
    title: 'RETURN BY DEATH REWIND',
    kanji: '死に戻り・魔女の残香',
    badge: 'Dimension 33 • Re:Zero',
    color: '#4361ee',
    secondaryColor: '#3f37c9',
    bg: getAssetBg(33),
    quote: '“No matter how many times we fail, we iterate until perfection is realized.”'
  },
  {
    id: 'theme-34',
    title: 'BEELZEBUB GLUTTONOUS VOID',
    kanji: '暴食之王・ベルゼビュート',
    badge: 'Dimension 34 • Slime Isekai',
    color: '#4cc9f0',
    secondaryColor: '#4895ef',
    bg: getAssetBg(34),
    quote: '“Analyze, assimilate, and optimize every data structure in existence.”'
  },
  {
    id: 'theme-35',
    title: 'GHOST SHELL CYBERNETIC',
    kanji: '攻殻機動隊',
    badge: 'Dimension 35 • Ghost in the Shell',
    color: '#00f5d4',
    secondaryColor: '#00bbf9',
    bg: getAssetBg(35),
    quote: '“Your ghost whispers the solution through infinite optic cyber-routes.”'
  },
  {
    id: 'theme-36',
    title: 'NEO-TOKYO SINGULARITY',
    kanji: 'アキラ・覚醒',
    badge: 'Dimension 36 • Akira',
    color: '#d90429',
    secondaryColor: '#ef233c',
    bg: getAssetBg(36),
    quote: '“A power too vast for comprehension awakening in the digital metropolis.”'
  },
  {
    id: 'theme-37',
    title: 'ASTRAL JAZZ PARADIGM',
    kanji: 'カウボーイビバップ',
    badge: 'Dimension 37 • Cowboy Bebop',
    color: '#f39c12',
    secondaryColor: '#d35400',
    bg: getAssetBg(37),
    quote: '“Whatever happens, happens. Improvise with cool, unmatched composure.”'
  },
  {
    id: 'theme-38',
    title: 'APPARITION PHENOMENON',
    kanji: '怪異・化物語',
    badge: 'Dimension 38 • Monogatari',
    color: '#e76f51',
    secondaryColor: '#264653',
    bg: getAssetBg(38),
    quote: '“People save themselves on their own. Knowledge is merely the catalyst.”'
  },
  {
    id: 'theme-39',
    title: 'CALAMITY SHRINE BLADE',
    kanji: '夜ト神・禍津神',
    badge: 'Dimension 39 • Noragami',
    color: '#52b788',
    secondaryColor: '#2d6a4f',
    bg: getAssetBg(39),
    quote: '“Sever the ties of misfortune and forge an unbreakable path ahead.”'
  },
  {
    id: 'theme-40',
    title: 'SOUL RESONANCE SYMPHONY',
    kanji: '魂の共鳴・鬼神狩り',
    badge: 'Dimension 40 • Soul Eater',
    color: '#ffaa00',
    secondaryColor: '#ff5500',
    bg: getAssetBg(40),
    quote: '“A sound soul dwells within a sound mind and a sound architecture.”'
  },
  {
    id: 'theme-41',
    title: 'NO LONGER HUMAN NEXUS',
    kanji: '人間失格・文豪ストレイドッグス',
    badge: 'Dimension 41 • Bungo Stray Dogs',
    color: '#6c757d',
    secondaryColor: '#495057',
    bg: getAssetBg(41),
    quote: '“Nullify all anomalies and bugs with effortless intellectual dominance.”'
  },
  {
    id: 'theme-42',
    title: 'TECHUTOPIA SUPREME MONARCH',
    kanji: '影の皇帝・極限覚醒',
    badge: 'Dimension 42 • Grand Apex Sovereign',
    color: '#ffb703',
    secondaryColor: '#ff6b35',
    bg: getAssetBg(42),
    quote: '“Forty-two dimensions mastered. Arise and conquer the future of TechUtopia.”'
  }
]

const sanctuaryRelics = [
  {
    id: 'blade',
    icon: '🗡️',
    name: 'NICHIRIN BLADE OF CLEAN CODE',
    sub: 'Class: Legendary Blade • Algorithmic Purity',
    desc: 'Forged across 1,000 algorithmic trials. Pierces through legacy bugs with Sun Breathing accuracy.',
    color: '#ff6b35'
  },
  {
    id: 'ai-core',
    icon: '🔮',
    name: 'TITAN MECHA AI CORE',
    sub: 'Class: S-Rank Relic • Autonomous Compute',
    desc: 'Autonomous neural engine running real-time edge processing for combat robotics.',
    color: '#ffd166'
  },
  {
    id: 'trophy',
    icon: '🏆',
    name: 'SHADOW SOVEREIGN TROPHY',
    sub: 'Class: Supreme Glory • ₹10,00,000 Bounty',
    desc: 'The gilded chalice bestowed only upon the supreme college guild at UEM Jaipur.',
    color: '#ffd700'
  },
  {
    id: 'codex',
    icon: '📜',
    name: 'SACRED GUILD CODEX',
    sub: 'Class: Ancient Scroll • Fair Play Protocol',
    desc: 'The immutable ethical constitution of TechUtopia. Respect, honor, and innovation.',
    color: '#b537f2'
  }
]

export default function DoorLandingHero() {
  const [scrollProgress, setScrollProgress] = useState(0) // 0 (closed) to 1 (fully open & entered)
  const [activeThemeIdx, setActiveThemeIdx] = useState(0)
  const [selectedRelicIdx, setSelectedRelicIdx] = useState(0)
  const containerRef = useRef(null)

  // Scroll listener to calculate door opening progress across the hero container
  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight

      if (totalScrollable > 0) {
        const scrolled = -rect.top
        const p = Math.max(0, Math.min(1, scrolled / totalScrollable))
        setScrollProgress(p)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Derived 3D values
  const doorAngle = Math.min(95, scrollProgress * 135) // 0 to 95 degrees
  const cameraZ = Math.min(450, scrollProgress * 550) // dolly forward
  const doorsOpacity = Math.max(0, 1 - (scrollProgress - 0.7) * 3.3) // fade doors out when deeply inside
  const roomScale = 1 + scrollProgress * 0.35
  const isInside = scrollProgress > 0.45

  const currentTheme = animeThemes[activeThemeIdx]
  const currentRelic = sanctuaryRelics[selectedRelicIdx]

  // Quick button to open or close doors smoothly
  const triggerDoorOpen = () => {
    if (scrollProgress < 0.6) {
      window.scrollTo({
        top: window.innerHeight * 0.9,
        behavior: 'smooth'
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="door-landing-wrapper" ref={containerRef} id="door-hero">
      {/* Sticky Full-Screen 100vh Viewport */}
      <div className="door-landing-sticky">
        {/* Deep Sanctuary Realm Background */}
        <div
          className="door-landing__realm-bg"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(10, 12, 20, 0.4) 0%, rgba(5, 6, 10, 0.96) 85%), url(${currentTheme.bg})`,
            transform: `scale(${roomScale})`
          }}
        >
          <div className="door-landing__dust-particles" />
          <div
            className="door-landing__ambient-glow"
            style={{
              boxShadow: `inset 0 0 150px ${currentTheme.color}33, 0 0 100px ${currentTheme.secondaryColor}44`
            }}
          />
        </div>

        {/* 3D Perspective Stage Container */}
        <div className="door-landing__stage">
          {/* ───── INSIDE THE ROOM (Reveals when doors open) ───── */}
          <div
            className={`door-landing__inner-room ${isInside ? 'is-visible' : ''}`}
            style={{
              transform: `translateZ(${cameraZ}px) scale(${1 + scrollProgress * 0.2})`
            }}
          >
            {/* Japanese Translucent Kanji Watermark */}
            <div className="door-landing__watermark-kanji">
              {currentTheme.kanji}
            </div>

            {/* Anime Hunter Steps into Sanctuary */}
            <div
              className="door-landing__hunter-figure"
              style={{
                opacity: scrollProgress > 0.15 ? Math.min(1, (scrollProgress - 0.15) * 2.5) : 0,
                transform: `translateX(-50%) translateY(${30 - scrollProgress * 50}px) scale(${0.75 + scrollProgress * 0.45})`
              }}
            >
              <div className="door-landing__hunter-aura" style={{ background: `radial-gradient(circle, ${currentTheme.color}66 0%, transparent 70%)` }} />
              <svg viewBox="0 0 100 160" width="110" height="175" className="door-landing__hunter-svg">
                <path
                  d="M50 14 C56 14 62 19 62 26 C62 33 56 38 50 38 C44 38 38 33 38 26 C38 19 44 14 50 14 Z
                     M32 44 L68 44 L78 82 L65 86 L70 148 L55 148 L53 100 L47 100 L45 148 L30 148 L35 86 L22 82 Z
                     M72 58 L92 118 L85 120 L68 64 Z"
                  fill="#ffffff"
                />
              </svg>
              <span className="door-landing__hunter-badge">HUNTER ENTERING SANCTUARY</span>
            </div>

            {/* Sacred Relics Floating in 3D Space */}
            <div className={`door-landing__relics-dock ${scrollProgress > 0.5 ? 'is-active' : ''}`}>
              <div className="door-landing__relics-pills">
                {sanctuaryRelics.map((relic, idx) => (
                  <button
                    key={relic.id}
                    className={`door-landing__relic-pill ${idx === selectedRelicIdx ? 'is-selected' : ''}`}
                    onClick={() => setSelectedRelicIdx(idx)}
                    style={{
                      borderColor: idx === selectedRelicIdx ? relic.color : 'rgba(255,255,255,0.15)'
                    }}
                  >
                    <span>{relic.icon}</span>
                    <span>{relic.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              <div className="door-landing__relic-card" style={{ borderColor: `${currentRelic.color}66` }}>
                <div className="door-landing__relic-icon-halo" style={{ borderColor: currentRelic.color, boxShadow: `0 0 25px ${currentRelic.color}44` }}>
                  <span>{currentRelic.icon}</span>
                </div>
                <div className="door-landing__relic-texts">
                  <div className="door-landing__relic-sub" style={{ color: currentRelic.color }}>
                    {currentRelic.sub}
                  </div>
                  <h3 className="door-landing__relic-title">{currentRelic.name}</h3>
                  <p className="door-landing__relic-desc">{currentRelic.desc}</p>
                </div>
              </div>
            </div>

            {/* Grand TECHUTOPIA Typography & Actions */}
            <div className="door-landing__hero-content">
              <h1 className="door-landing__main-title">
                <span className="door-landing__title-tech">TECH</span>
                <span
                  className="door-landing__title-utopia"
                  style={{
                    textShadow: 'none'
                  }}
                >
                  UTOPIA
                </span>
                <span className="door-landing__title-year">’26</span>
              </h1>

              <p className="door-landing__quote">{currentTheme.quote}</p>

              {/* Theme Switcher Navigation across all 42 dimensions */}
              <div className="door-landing__theme-switcher">
                <button
                  type="button"
                  className="door-landing__nav-arrow door-landing__nav-arrow--prev"
                  onClick={() => setActiveThemeIdx((prev) => (prev > 0 ? prev - 1 : animeThemes.length - 1))}
                  title="Previous Dimension"
                  aria-label="Previous Dimension"
                >
                  ◀
                </button>
                <div className="door-landing__dots-scroll">
                  {animeThemes.map((theme, i) => (
                    <button
                      key={theme.id}
                      className={`door-landing__theme-btn ${i === activeThemeIdx ? 'is-active' : ''}`}
                      onClick={() => setActiveThemeIdx(i)}
                      style={{
                        background: i === activeThemeIdx ? theme.color : 'transparent',
                        borderColor: theme.color
                      }}
                      title={`${theme.badge}: ${theme.title}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="door-landing__nav-arrow door-landing__nav-arrow--next"
                  onClick={() => setActiveThemeIdx((prev) => (prev < animeThemes.length - 1 ? prev + 1 : 0))}
                  title="Next Dimension"
                  aria-label="Next Dimension"
                >
                  ▶
                </button>
                <span className="door-landing__theme-counter">
                  DIMENSION {String(activeThemeIdx + 1).padStart(2, '0')} / {String(animeThemes.length).padStart(2, '0')}
                </span>
              </div>

              <div className="door-landing__actions">
                <button
                  className="btn btn--primary"
                  onClick={() => {
                    const el = document.getElementById('events')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  ⚔️ SUMMON QUESTS & REGISTER
                </button>
                <button
                  className="btn btn--outline"
                  onClick={() => {
                    const el = document.getElementById('time-chamber')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  ⏱ UNSEAL TIME GATE
                </button>
              </div>
            </div>
          </div>

          {/* ───── THE FULL-SCREEN 3D ANIME TORII DOORS ───── */}
          <div
            className="door-landing__doors-portal"
            style={{
              opacity: doorsOpacity,
              pointerEvents: scrollProgress > 0.85 ? 'none' : 'auto'
            }}
          >
            {/* Center Volumetric Light Leak when opening */}
            <div
              className="door-landing__light-shaft"
              style={{
                opacity: Math.sin((scrollProgress) * Math.PI) * 1.3,
                transform: `scaleX(${0.2 + scrollProgress * 3})`
              }}
            />

            {/* Left Grand Door Wing: Ancient Molten Dungeon */}
            <div
              className="door-wing door-wing--left door-wing--fullscreen sl-door-wing sl-door-wing--left"
              style={{
                transform: `rotateY(-${doorAngle}deg)`
              }}
            >
              <div className="door-wing__inner sl-door-panel sl-door-panel--left">
                <div className="sl-door__full-canvas sl-door__full-canvas--left">
                  <img
                    src={doorImg}
                    alt="Ancient Dungeon Portal Gate Left"
                    className="sl-door__image"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                  />
                </div>
                <div className="sl-door__mana-cracks sl-door__mana-cracks--left" />
                <div className="sl-door__iron-brace" />
              </div>
            </div>

            {/* Right Grand Door Wing: Ancient Molten Dungeon */}
            <div
              className="door-wing door-wing--right door-wing--fullscreen sl-door-wing sl-door-wing--right"
              style={{
                transform: `rotateY(${doorAngle}deg)`
              }}
            >
              <div className="door-wing__inner sl-door-panel sl-door-panel--right">
                <div className="sl-door__full-canvas sl-door__full-canvas--right">
                  <img
                    src={doorImg}
                    alt="Ancient Dungeon Portal Gate Right"
                    className="sl-door__image"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                  />
                </div>
                <div className="sl-door__mana-cracks sl-door__mana-cracks--right" />
                <div className="sl-door__iron-brace" />
              </div>
            </div>

            {/* Center Gate Seal & Scroll Instruction (Visible when doors are closed/opening) */}
            <div
              className="door-landing__gate-seal"
              style={{
                opacity: Math.max(0, 1 - scrollProgress * 2.8),
                transform: `translate(-50%, -50%) scale(${1 - scrollProgress * 0.4})`
              }}
            >
              <div className="door-landing__seal-emblem">⛩️</div>
              <div className="door-landing__seal-text">GRAND SANCTUARY THRESHOLD</div>
              <div className="door-landing__seal-sub">UEM JAIPUR • ANNUAL TECH FEST 2026</div>

              <button className="door-landing__open-btn" onClick={triggerDoorOpen}>
                <span className="door-landing__open-pulse" />
                <span>[ PUSH DOORS OPEN / SCROLL DOWN ]</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Progress Bar & Dimension Cue */}
        <div className="door-landing__footer-cue">
          <div className="door-landing__progress-track">
            <div
              className="door-landing__progress-fill"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
