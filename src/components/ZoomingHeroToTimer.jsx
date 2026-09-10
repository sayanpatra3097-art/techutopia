import { useState, useEffect, useRef } from 'react'
import soloDoorImg from '../assets/solo_leveling_door.jpg'
import timerBg23 from '../assets/23.png'

// Eagerly resolve all anime dimension backgrounds (1.png to 42.png) from the assets folder
const bgModules = import.meta.glob('../assets/*.png', { eager: true, import: 'default' })

const getAssetBg = (num) => {
  return (
    bgModules[`../assets/${num}.png`] ||
    bgModules[`../assets/${num}.jpg`] ||
    bgModules[`../assets/${((num % 42) + 1)}.png`] ||
    bgModules['../assets/1.png']
  )
}

const animeLayers = [
  {
    id: 'theme-1',
    title: 'SHADOW MONARCH DOMAIN',
    kanji: '影の君主',
    badge: 'Dimension 01 • Solo Leveling',
    color: '#00d4ff',
    secondaryColor: '#4361ee',
    bg: getAssetBg(1),
    image: getAssetBg(1),
    quote: '“All algorithms awaken. Every line of algorithmic code arises at my command.”'
  },
  {
    id: 'theme-2',
    title: 'HINOKAMI KAGURA FORGE',
    kanji: 'ヒノカミ神楽',
    badge: 'Dimension 02 • Demon Slayer',
    color: '#ff6b35',
    secondaryColor: '#e63946',
    bg: getAssetBg(2),
    image: getAssetBg(2),
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
    image: getAssetBg(3),
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
    image: getAssetBg(4),
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
    image: getAssetBg(5),
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
    image: getAssetBg(6),
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
    image: getAssetBg(7),
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
    image: getAssetBg(8),
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
    image: getAssetBg(9),
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
    image: getAssetBg(10),
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
    image: getAssetBg(11),
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
    image: getAssetBg(12),
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
    image: getAssetBg(13),
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
    image: getAssetBg(14),
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
    image: getAssetBg(15),
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
    image: getAssetBg(16),
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
    image: getAssetBg(17),
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
    image: getAssetBg(18),
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
    image: getAssetBg(19),
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
    image: getAssetBg(20),
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
    image: getAssetBg(21),
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
    image: getAssetBg(22),
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
    image: getAssetBg(23),
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
    image: getAssetBg(24),
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
    image: getAssetBg(25),
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
    image: getAssetBg(26),
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
    image: getAssetBg(27),
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
    image: getAssetBg(28),
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
    image: getAssetBg(29),
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
    image: getAssetBg(30),
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
    image: getAssetBg(31),
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
    image: getAssetBg(32),
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
    image: getAssetBg(33),
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
    image: getAssetBg(34),
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
    image: getAssetBg(35),
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
    image: getAssetBg(36),
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
    image: getAssetBg(37),
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
    image: getAssetBg(38),
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
    image: getAssetBg(39),
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
    image: getAssetBg(40),
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
    image: getAssetBg(41),
    quote: '“Nullify all anomalies and bugs with effortless intellectual dominance.”'
  },
  {
    id: 'theme-42',
    title: 'TECHUTOPIA SUPREME MONARCH',
    kanji: '影の皇帝・極限覚醒',
    badge: 'Dimension 42 • Grand Apex Sovereign',
    color: '#00d4ff',
    secondaryColor: '#b537f2',
    bg: getAssetBg(42),
    image: getAssetBg(42),
    quote: '“Forty-two dimensions mastered. Arise and conquer the future of TechUtopia.”'
  }
]

export default function ZoomingHeroToTimer({ isUnlocked, onExploreMore }) {
  const [scrollProgress, setScrollProgress] = useState(0) // 0 to 1 across the track
  const trackRef = useRef(null)

  // Target Fest Date for Countdown: October 6 – 7, 2026
  const targetDate = new Date('2026-10-06T09:00:00').getTime()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Realtime countdown ticker
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

  // High-performance rAF-throttled scroll handler for buttery-smooth 60-120fps on mobile
  useEffect(() => {
    let ticking = false
    let lastProgress = -1

    const updateScroll = () => {
      ticking = false
      const el = trackRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight

      if (totalScrollable > 0) {
        const scrolled = -rect.top
        const p = Math.max(0, Math.min(1, scrolled / totalScrollable))
        // Deadband filter prevents micro-jitter and avoids redundant React renders
        if (Math.abs(p - lastProgress) > 0.0015 || p === 0 || p === 1) {
          lastProgress = p
          setScrollProgress(p)
        }
      }
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateScroll)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  // 3D Solo Leveling Door Swing opening on initial scroll (0 to 0.18)
  const doorAngle = Math.min(95, scrollProgress * 550)
  const doorOpacity = Math.max(0, 1 - scrollProgress * 5.8)

  // ───── CONTINUOUS 42-DIMENSION ZOOM-IN CALCULATION ─────
  const zoomStart = 0.02
  const zoomEnd = 0.44
  const totalLayers = animeLayers.length // 42

  const clampedProgress = Math.max(0, Math.min(1, (scrollProgress - zoomStart) / (zoomEnd - zoomStart)))
  const exactPosition = clampedProgress * (totalLayers - 1)
  const activeIndex = Math.min(totalLayers - 1, Math.floor(exactPosition))
  const nextIndex = Math.min(totalLayers - 1, activeIndex + 1)
  const stepProgress = exactPosition - activeIndex // 0.0 to 1.0 within current step

  // Active layer zoom: starts at scale 1.0 and zooms in up to 2.45x as you scroll
  const activeScale = 1 + stepProgress * 1.45
  const activeOpacity = Math.max(0, 1 - stepProgress * 1.1)

  // Next layer: emerging from behind starting at scale 0.85 and scaling up to 1.0
  const nextScale = 0.85 + stepProgress * 0.35
  const nextOpacity = Math.min(1, stepProgress * 1.4)

  const currentLayer = animeLayers[activeIndex] || animeLayers[0]
  const nextLayer = animeLayers[nextIndex] || currentLayer
  const activeColor = currentLayer.color

  // ───── ROYAL KING'S SCROLL UNROLL CALCULATION (100% HARDWARE-SYNCED) ─────
  const scrollStageStart = 0.38
  const rollStart = 0.40
  const rollEnd = 0.82

  const timerOpacity = scrollProgress > scrollStageStart ? Math.min(1, (scrollProgress - scrollStageStart) * 12) : 0
  const timerScale = 0.90 + (scrollProgress > scrollStageStart ? Math.min(0.04, (scrollProgress - scrollStageStart) * 0.15) : 0)

  // Direct 1-to-1 scroll-driven roll calculation (zero lag, zero latency)
  const scrollRoll = Math.max(0, Math.min(1, (scrollProgress - rollStart) / (rollEnd - rollStart)))

  // Optional manual drag scrubbing for instant interactive left-right control
  const [dragRoll, setDragRoll] = useState(null)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartRollRef = useRef(0)

  const rollProgress = dragRoll !== null ? dragRoll : scrollRoll

  const handleDragStart = (e) => {
    isDraggingRef.current = true
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    dragStartXRef.current = clientX
    dragStartRollRef.current = rollProgress
  }

  const handleDragMove = (e) => {
    if (!isDraggingRef.current) return
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const delta = (clientX - dragStartXRef.current) / 350
    const next = Math.max(0, Math.min(1, dragStartRollRef.current + delta))
    setDragRoll(next)
  }

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    if (dragRoll !== null) {
      const el = trackRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const totalScrollable = rect.height - window.innerHeight
        const targetProgress = rollStart + dragRoll * (rollEnd - rollStart)
        window.scrollTo({
          top: window.scrollY + rect.top + targetProgress * totalScrollable,
          behavior: 'auto'
        })
      }
      setDragRoll(null)
    }
  }

  const handleExploreClick = () => {
    if (onExploreMore) onExploreMore()
  }

  const handleRollTo = (target) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const totalScrollable = rect.height - window.innerHeight
    const targetProgress = target === 'open' ? 0.84 : 0.39
    const targetScrollY = window.scrollY + rect.top + (targetProgress * totalScrollable)
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
  }

  const clockItems = [
    { value: pad(timeLeft.days), label: 'DAYS // 日数', kanji: '天', tag: '残日数' },
    { value: pad(timeLeft.hours), label: 'HOURS // 時間', kanji: '刻', tag: '刻限時' },
    { value: pad(timeLeft.minutes), label: 'MINS // 分鐘', kanji: '分', tag: '覚醒分' },
    { value: pad(timeLeft.seconds), label: 'SECS // 秒数', kanji: '秒', tag: '瞬刻秒' }
  ]

  return (
    <div className="zoom-hero-track" ref={trackRef} id="door-hero">
      {/* Sticky 100vh Fullscreen Viewport */}
      <div className="zoom-hero-sticky">
        {/* ───── MULTI-IMAGE CONTINUOUS 42-DIMENSION ZOOMING BACKGROUNDS ───── */}
        <div className="zoom-hero__visuals-container">
          {/* Active Zooming Dimension Layer */}
          <div
            className="zoom-hero__image-layer"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(10, 12, 20, 0.3) 0%, rgba(5, 6, 10, 0.96) 85%), url(${currentLayer.bg})`,
              transform: `scale(${activeScale})`,
              opacity: activeOpacity
            }}
          />

          {/* Emerging Next Dimension Layer (zooms up from behind) */}
          {nextIndex !== activeIndex && (
            <div
              className="zoom-hero__image-layer"
              style={{
                backgroundImage: `radial-gradient(circle at center, rgba(10, 12, 20, 0.3) 0%, rgba(5, 6, 10, 0.96) 85%), url(${nextLayer.bg})`,
                transform: `scale(${nextScale})`,
                opacity: nextOpacity
              }}
            />
          )}

          {/* Dynamic Color Aura Overlay */}
          <div
            className="zoom-hero__color-aura"
            style={{
              boxShadow: `inset 0 0 160px ${activeColor}33, 0 0 100px ${activeColor}44`
            }}
          />
        </div>

        {/* ───── INITIAL 3D SANCTUARY DOORS: THE SOLO LEVELING CARTENON DOUBLE DUNGEON GATE ───── */}
        <div
          className="zoom-hero__doors-portal"
          style={{
            opacity: doorOpacity,
            pointerEvents: scrollProgress > 0.3 ? 'none' : 'auto'
          }}
        >
          {/* Solo Leveling Cartenon Temple Double Dungeon - Left Wing */}
          <div
            className="door-wing door-wing--left door-wing--fullscreen sl-door-wing sl-door-wing--left"
            style={{ transform: `rotateY(-${doorAngle}deg)` }}
          >
            <div className="door-wing__inner sl-door-panel sl-door-panel--left">
              <div className="sl-door__full-canvas sl-door__full-canvas--left">
                <img
                  src={soloDoorImg}
                  alt="Solo Leveling Cartenon Temple Gate Left"
                  className="sl-door__image"
                />
              </div>
              <div className="sl-door__mana-cracks sl-door__mana-cracks--left" />
              <div className="sl-door__runic-inscription">
                <span>카르테논 신전 • 이중 던전</span>
              </div>
              <div className="sl-door__iron-brace" />
              <div className="sl-door__seam-edge sl-door__seam-edge--right" />
            </div>
          </div>

          {/* Solo Leveling Cartenon Temple Double Dungeon - Right Wing */}
          <div
            className="door-wing door-wing--right door-wing--fullscreen sl-door-wing sl-door-wing--right"
            style={{ transform: `rotateY(${doorAngle}deg)` }}
          >
            <div className="door-wing__inner sl-door-panel sl-door-panel--right">
              <div className="sl-door__full-canvas sl-door__full-canvas--right">
                <img
                  src={soloDoorImg}
                  alt="Solo Leveling Cartenon Temple Gate Right"
                  className="sl-door__image"
                />
              </div>
              <div className="sl-door__mana-cracks sl-door__mana-cracks--right" />
              <div className="sl-door__runic-inscription">
                <span>신을 경배하라 • 찬양하라 • 증명하라</span>
              </div>
              <div className="sl-door__iron-brace" />
              <div className="sl-door__seam-edge sl-door__seam-edge--left" />
            </div>
          </div>

          {/* Center Seam Mana Light Line */}
          <div
            className="sl-door__center-mana-beam"
            style={{
              opacity: Math.max(0, 1 - doorAngle / 20)
            }}
          />
        </div>

        {/* ───── HERO TYPOGRAPHY & INTRO STATE (0% to 55%) ───── */}
        <div
          className="zoom-hero__content-stage"
          style={{
            opacity: scrollProgress < 0.65 ? Math.max(0, 1 - scrollProgress * 1.6) : 0,
            transform: `translateY(${-scrollProgress * 80}px) scale(${1 + scrollProgress * 0.2})`,
            pointerEvents: scrollProgress < 0.4 ? 'auto' : 'none'
          }}
        >
          <div className="door-landing__theme-badge" style={{ borderColor: `${activeColor}88` }}>
            <span className="door-landing__theme-dot" style={{ background: activeColor }} />
            <span>{currentLayer.badge}</span>
          </div>

          <h1 className="door-landing__main-title">
            <span className="door-landing__title-tech">TECH</span>
            <span
              className="door-landing__title-utopia"
              style={{ textShadow: `0 0 35px ${activeColor}aa` }}
            >
              UTOPIA
            </span>
          </h1>

          <p className="door-landing__quote">
            {currentLayer.quote}
          </p>

          <div className="zoom-hero__scroll-indicator">
            <div className="zoom-hero__mouse-icon">
              <div className="zoom-hero__mouse-wheel" />
            </div>
            <span>
              DIMENSION {String(activeIndex + 1).padStart(2, '0')} / {totalLayers} • SCROLL TO DIVE DEEPER
            </span>
          </div>
        </div>

        {/* ───── STAGE 2: ROYAL ANIME MANA SCROLL OF TIME (UNROLLS ON SCROLL) ───── */}
        <div
          className="zoom-hero__timer-destination royal-scroll-stage"
          style={{
            opacity: timerOpacity,
            transform: `translate(-50%, -50%) scale(${timerScale})`,
            pointerEvents: scrollProgress > scrollStageStart ? 'auto' : 'none'
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {/* Authentic Anime Mana Scroll Apparatus */}
          <div
            className="royal-scroll anime-scroll"
            style={{
              '--roll': rollProgress.toFixed(4)
            }}
          >
            {/* Left Anime Mana Roller (Rolls left with glowing mana runes) */}
            <div className="royal-scroll__roller royal-scroll__roller--left anime-mana-roller">
              <div className="royal-scroll__finial royal-scroll__finial--top anime-mana-finial">
                <span className="royal-scroll__finial-gem anime-mana-core" />
              </div>
              <div className="royal-scroll__roller-cylinder anime-mana-cylinder">
                <div className="anime-cylinder-glow-vein" />
              </div>
              <div className="royal-scroll__finial royal-scroll__finial--bottom anime-mana-finial">
                <div className="royal-scroll__tassel anime-mana-tassel" />
              </div>
              <div
                className="royal-scroll__curl-shadow royal-scroll__curl-shadow--left"
                style={{ opacity: rollProgress > 0.03 ? 1 : 0 }}
              />
            </div>

            {/* Right Anime Mana Roller (Rolls right with glowing mana runes) */}
            <div className="royal-scroll__roller royal-scroll__roller--right anime-mana-roller">
              <div className="royal-scroll__finial royal-scroll__finial--top anime-mana-finial">
                <span className="royal-scroll__finial-gem anime-mana-core" />
              </div>
              <div className="royal-scroll__roller-cylinder anime-mana-cylinder">
                <div className="anime-cylinder-glow-vein" />
              </div>
              <div className="royal-scroll__finial royal-scroll__finial--bottom anime-mana-finial">
                <div className="royal-scroll__tassel anime-mana-tassel" />
              </div>
              <div
                className="royal-scroll__curl-shadow royal-scroll__curl-shadow--right"
                style={{ opacity: rollProgress > 0.03 ? 1 : 0 }}
              />
            </div>

            {/* Japanese Anime Cursed Seal (封印 • 覚醒 - breaks in half on scroll) */}
            <div className="royal-scroll__seal-system anime-seal-system">
              <div className="royal-scroll__seal-side royal-scroll__seal-side--left">
                <div className="royal-scroll__seal-ribbon royal-scroll__seal-ribbon--left anime-seal-ribbon" />
                <div className="royal-scroll__seal-half royal-scroll__seal-half--left anime-seal-half">
                  <span className="anime-seal-symbol">☯</span>
                  <span className="anime-seal-kanji">封印</span>
                  <span className="anime-seal-sub">SEALED</span>
                </div>
              </div>

              {/* Central neon mana fracture rupture */}
              <div
                className="royal-scroll__seal-rupture-beam anime-seal-rupture"
                style={{
                  opacity: rollProgress > 0.02 && rollProgress < 0.28 ? 1 : 0,
                  transform: `scaleY(${1 + rollProgress * 2})`
                }}
              />

              <div className="royal-scroll__seal-side royal-scroll__seal-side--right">
                <div className="royal-scroll__seal-half royal-scroll__seal-half--right anime-seal-half">
                  <span className="anime-seal-symbol">⚡</span>
                  <span className="anime-seal-kanji">覚醒</span>
                  <span className="anime-seal-sub">AWAKEN</span>
                </div>
                <div className="royal-scroll__seal-ribbon royal-scroll__seal-ribbon--right anime-seal-ribbon" />
              </div>
            </div>

            {/* Anime Parchment Letter Body with 23.png */}
            <div className="royal-scroll__parchment-window anime-parchment-window">
              <div className="royal-scroll__parchment-letter anime-timer-shrine anime-shrine-frame">
                {/* 23.png Anime Dimension Image inside the Letter */}
                <div
                  className="royal-scroll__letter-image anime-timer__shrine-backdrop"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 35%, rgba(0, 212, 255, 0.15) 0%, rgba(8, 10, 20, 0.90) 80%), url(${timerBg23})`
                  }}
                />

                {/* Floating ambient embers & sakura */}
                <div className="anime-timer__floating-embers" />
                <div className="anime-timer__floating-sakura" />
                <div className="royal-scroll__gold-trim-top anime-trim-top" />
                <div className="royal-scroll__gold-trim-bottom anime-trim-bottom" />

                {/* Left & Right Anime Shrine Pillars */}
                <div className="anime-timer__shrine-pillar anime-timer__shrine-pillar--left anime-pillar">
                  <span className="anime-timer__pillar-kanji">神</span>
                </div>
                <div className="anime-timer__shrine-pillar anime-timer__shrine-pillar--right anime-pillar">
                  <span className="anime-timer__pillar-kanji">魔</span>
                </div>

                {/* Letter Content: Anime Header, Countdown Talismans, and Actions */}
                <div
                  className="royal-scroll__letter-content anime-letter-content"
                  style={{
                    opacity: Math.min(1, Math.max(0, (rollProgress - 0.1) / 0.65)),
                    transform: `translateY(${(1 - Math.min(1, Math.max(0, (rollProgress - 0.1) / 0.65))) * 18}px)`
                  }}
                >
                  {/* Anime Torii & Creed Header */}
                  <div className="anime-timer__header">
                    <div className="anime-timer__header-decor">
                      <span className="anime-timer__lantern anime-timer__lantern--left">🏮</span>
                      <div className="anime-timer__torii-icon">⛩️</div>
                      <span className="anime-timer__lantern anime-timer__lantern--right">🏮</span>
                    </div>

                    <div className="anime-timer__shrine-creed anime-creed-badge">
                      <span className="anime-creed-spark">⚡</span>
                      <span>領域展開 • 特異点時空</span>
                      <span className="anime-timer__creed-sep">//</span>
                      <span>TEMPORAL AWAKENING MATRIX</span>
                      <span className="anime-creed-spark">⚡</span>
                    </div>
                  </div>

                  {/* Anime Title Block */}
                  <div className="anime-timer__title-block">
                    <div className="anime-timer__kanji-eyebrow">次元降臨カウントダウン</div>
                    <h2 className="anime-timer__headline anime-glow-text">
                      CHRONICLES OF TECHUTOPIA ’26
                    </h2>
                    <div className="anime-timer__mana-gauge">
                      <div className="anime-timer__mana-gauge-fill" />
                      <span className="anime-timer__mana-gauge-label">
                        CHRONO-MANA: 100% MAXIMUM RESONANCE
                      </span>
                    </div>
                  </div>

                  <div className="anime-timer__subline anime-quote-subline">
                    “「覚醒の刻が満ちる時、王の領域が開かれる」• When the celestial seal shatters, the supreme Monarchs of code and innovation shall awaken.”
                  </div>

                  {/* Authentic Anime Ofuda (お札) Talisman Countdown Cards */}
                  <div className="anime-timer__clock-row anime-ofuda-grid">
                    {clockItems.map(item => (
                      <div key={item.label} className="anime-timer__talisman-card anime-ofuda-card">
                        <div className="anime-timer__talisman-top-knot anime-ofuda-knot" />
                        
                        <div className="anime-ofuda-header">
                          <span className="anime-ofuda-kanji-stamp">{item.kanji}</span>
                          <span className="anime-ofuda-tag">{item.tag}</span>
                        </div>

                        <div className="anime-timer__talisman-number anime-ofuda-number">
                          {item.value}
                        </div>

                        <div className="anime-timer__talisman-unit anime-ofuda-unit">
                          {item.label}
                        </div>

                        <div className="anime-ofuda-mana-bar">
                          <div
                            className="anime-ofuda-mana-bar-fill"
                            style={{
                              width: `${Math.max(20, Math.min(100, (parseInt(item.value, 10) || 1) * 3))}%`
                            }}
                          />
                        </div>

                        <div className="anime-timer__talisman-tassel anime-ofuda-tassel" />
                      </div>
                    ))}
                  </div>

                  {/* Anime Imperial Date Edict Scroll */}
                  <div className="anime-timer__date-scroll anime-date-edict">
                    <span className="anime-timer__scroll-crest">📜</span>
                    <span className="anime-date-edict__text">
                      【 決戦期日: 2026年10月6日–7日 】 • CONVOCATION COLISEUM, UEM JAIPUR
                    </span>
                    <span className="anime-timer__seal-stamp anime-stamp-neon">特異点</span>
                  </div>

                  {/* ───── ANIME DOMAIN UNSEAL EXPLORE BUTTON ───── */}
                  <div className="zoom-hero__explore-action">
                    <button
                      type="button"
                      className="btn btn--primary zoom-hero__explore-btn anime-unseal-btn anime-btn-glow"
                      onClick={handleExploreClick}
                    >
                      ⚔️【 CLICK TO EXPLORE EVENTS // 領域展開 】⚡
                    </button>
                    <div className="zoom-hero__explore-sub anime-explore-hint">
                      “Click to enter Dimension 02: Dungeon Quests & Arena Trials”
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Navigation / Status Bar below the Anime Scroll */}
            <div className="royal-scroll__control-dock anime-dock">
              <button
                type="button"
                className="royal-scroll__dock-btn anime-dock-btn"
                onClick={() => handleRollTo('close')}
                title="Roll In"
              >
                ◀ 封印 (Seal)
              </button>
              <div className="royal-scroll__dock-indicator anime-dock-indicator">
                <span className="royal-scroll__dock-crest">⚡</span>
                <span>
                  {rollProgress < 0.98
                    ? `【 封印解除進行度: ${Math.round(rollProgress * 100)}% 】• SCROLL TO UNROLL MANA`
                    : "【 封印完全解除 // DOMAIN AWAKENED: OCTOBER 6–7, 2026 】"}
                </span>
                <span className="royal-scroll__dock-crest">⚡</span>
              </div>
              <button
                type="button"
                className="royal-scroll__dock-btn royal-scroll__dock-btn--active anime-dock-btn anime-dock-btn--active"
                onClick={() => handleRollTo('open')}
                title="Roll Out"
              >
                解放 (Open) ▶
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Zoom Scrub Progress Bar */}
        <div className="zoom-hero__progress-dock">
          <div className="zoom-hero__progress-rail">
            <div
              className="zoom-hero__progress-thumb"
              style={{
                width: `${Math.round(scrollProgress * 100)}%`,
                background: activeColor,
                boxShadow: `0 0 10px ${activeColor}`
              }}
            />
          </div>
          <span className="zoom-hero__progress-label">
            DEPTH: {Math.round(scrollProgress * 100)}% // DIMENSION {String(activeIndex + 1).padStart(2, '0')} OF {totalLayers} ({currentLayer.title})
          </span>
        </div>
      </div>
    </div>
  )
}
