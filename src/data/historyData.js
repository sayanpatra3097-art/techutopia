// ═══════════════════════════════════════════════════════════════════════
// TECHUTOPIA HISTORY & CHRONICLES DATA
// You can easily change the Year, Text, and Images for each edition here!
// ═══════════════════════════════════════════════════════════════════════

import img1 from '../assets/1.webp'
import img2 from '../assets/2.webp'
import img3 from '../assets/3.webp'
import img4 from '../assets/4.webp'
import img5 from '../assets/5.webp'
import img6 from '../assets/6.webp'
import img7 from '../assets/7.webp'
import img8 from '../assets/8.webp'
import img9 from '../assets/9.webp'
import img10 from '../assets/10.webp'
import img11 from '../assets/11.webp'
import img12 from '../assets/12.webp'
import img14 from '../assets/14.webp'
import img15 from '../assets/15.webp'
import img16 from '../assets/16.webp'
import img17 from '../assets/17.webp'

import planetCyan from '../assets/planets/planet_cyan.webp'
import planetPurple from '../assets/planets/planet_purple.webp'
import planetEmerald from '../assets/planets/planet_emerald.webp'
import planetAmber from '../assets/planets/planet_amber.webp'
import sunWebp from '../assets/planets/sun.webp'

export { sunWebp, sunWebp as sunReal }

export const HISTORY_EDITIONS = [
  {
    id: '2021-22',
    year: '2021-22',
    theme: 'THE GENESIS DAWN',
    subtitle: 'Awakening the Techno-Cultural Era',
    description: `Launched the Tech Fest at UEM Jaipur, bringing together UEM students to showcase innovation, creativity, and technical talent through exciting competitions and projects.`,
    stats: {
      footfall: '1,200+',
      events: '18 Quests',
      institutes: '35 Colleges',
      prizePool: '₹1,50,000'
    },
    images: {
      leftTop: img1,      // Small top-left horizontal
      leftBottom: img2,   // Large vertical portrait
      rightTop: img3,     // Top-right horizontal
      rightBottom: img4   // Bottom-right horizontal
    },
    planet: {
      name: 'Aethel-I',
      size: 52,
      color: '#38bdf8', // Ice Cyan
      glow: 'rgba(56, 189, 248, 0.32)',
      image: planetCyan
    }
  },
  {
    id: '2022-23',
    year: '2022-23',
    theme: 'CYBER RENAISSANCE',
    subtitle: 'Statewide Expansion & Autonomous Machines',
    description: `Expanded into a nationwide tech summit with the flagship Hack Pulse 24-hour non-stop hackathon. Featured pneumatic 60kg combat bots, high-speed RC dirt racing, and state esports arenas with 2,800+ contenders.`,
    stats: {
      footfall: '2,800+',
      events: '26 Quests',
      institutes: '60 Colleges',
      prizePool: '₹2,50,000'
    },
    images: {
      leftTop: img5,
      leftBottom: img6,
      rightTop: img7,
      rightBottom: img8
    },
    planet: {
      name: 'Ignis-II',
      size: 56,
      color: '#c084fc', // Nebula Purple
      glow: 'rgba(192, 132, 252, 0.32)',
      image: planetPurple
    }
  },
  {
    id: '2023-24',
    year: '2023-24',
    theme: 'CELESTIAL ASCENDANCE',
    subtitle: 'National Footprint & Star-Studded Nights',
    description: `Shattered collegiate records with 4,500+ delegates from 80+ top universities across India. Debuted Physio X biomechanics testing, grand laser light shows, and headline concerts under open skies.`,
    stats: {
      footfall: '4,500+',
      events: '34 Quests',
      institutes: '85 Colleges',
      prizePool: '₹3,50,000'
    },
    images: {
      leftTop: img9,
      leftBottom: img10,
      rightTop: img11,
      rightBottom: img12
    },
    planet: {
      name: 'Verdant-III',
      size: 54,
      color: '#34d399', // Emerald Neon
      glow: 'rgba(52, 211, 153, 0.32)',
      image: planetEmerald
    }
  },
  {
    id: '2024-25',
    year: '2024-25',
    theme: 'THE MONARCH’S REALM',
    subtitle: 'Solo Leveling Dimension & The Future Unlocked',
    description: `The grandest edition in history! Ascending into a Solo Leveling dungeon multiverse with an interactive 3D Photo Globe, Celestial Eridanus star maps, and an unprecedented ₹5,00,000+ bounty pool for 5,000+ warriors.`,
    stats: {
      footfall: '5,000+',
      events: '40 Quests',
      institutes: '100+ Colleges',
      prizePool: '₹5,00,000+'
    },
    images: {
      leftTop: img14,
      leftBottom: img15,
      rightTop: img16,
      rightBottom: img17
    },
    planet: {
      name: 'Sol-Monarch',
      size: 60,
      color: '#fbbf24', // Golden Amber
      glow: 'rgba(251, 191, 36, 0.36)',
      image: planetAmber
    }
  }
]
