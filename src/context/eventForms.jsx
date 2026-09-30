import { createContext, useContext } from 'react'

// ══════════════════════════════════════════════════════════════════════════════
// TECHUTOPIA '26 — EVENT CARDS, DETAILS, ARTWORK & GOOGLE FORM LINKS DIRECTORY
// ══════════════════════════════════════════════════════════════════════════════
// You can edit event details, titles, images, categories, dates, venues, prizes,
// and Google Form links in this single centralized file.
// ══════════════════════════════════════════════════════════════════════════════

// ─── 1. EVENT ARTWORK IMPORTS (FROM ASSETS FOLDER) ────────────────────────────
import art1 from '../assets/EVENTS/robo war (2).webp'
import art2 from '../assets/EVENTS/Gravity Zone (1) (1).webp'
import art3 from '../assets/EVENTS/pragati 2.0.webp'
import art6 from '../assets/EVENTS/hackpulse.webp'
import art7 from '../assets/EVENTS/EsportZ.webp'
import art8 from '../assets/EVENTS/visual echos.webp'
import art9 from '../assets/EVENTS/bridge building (1).webp'
import art10 from '../assets/EVENTS/tech venture.webp'
import art11 from '../assets/EVENTS/Prompt Verse Poster.webp'
import art12 from '../assets/EVENTS/campus Zaika.webp'
import art13 from '../assets/EVENTS/byte battle.webp'
import art15 from '../assets/EVENTS/deathrace.webp'
import art16 from '../assets/EVENTS/robosoccer.webp'
import art17 from '../assets/EVENTS/drone comp (1).webp'
import art18 from '../assets/EVENTS/W2W.webp'
import art19 from '../assets/EVENTS/PhysioX (1).webp'
import art20 from '../assets/EVENTS/pixel ki paheli.webp'
import art21 from '../assets/EVENTS/fashion and cultural.webp'
import art22 from '../assets/EVENTS/wall canvas (2).webp'
import art23 from '../assets/EVENTS/agomoni.webp'
import artEuphoria from '../assets/EVENTS/euphoria.webp'
import artPov from '../assets/EVENTS/pov techutopia.webp'
import artDance from '../assets/EVENTS/dance competition.webp'
import artRampwalk from '../assets/EVENTS/ramp walk.webp'
import artAdCreation from '../assets/EVENTS/ad creation competition.webp'

// Export all event card images for direct access if needed
export const EVENT_ASSETS = {
  art1,
  art2,
  art3,
  art6,
  art7,
  art8,
  art9,
  art10,
  art11,
  art12,
  art13,
  art15,
  art16,
  art17,
  art18,
  art19,
  art20,
  art21,
  art22,
  art23,
  pragati: art3,
  pragati2: art3,
  promptVerse: art11,
  wasteToWealth: art18,
  w2w: art18,
  sustainability: art18,
  physioX: art19,
  physio: art19,
  wallCanvas: art22,
  agomoni: art23,
  artAgomoni: art23,
  euphoria: artEuphoria,
  artEuphoria,
  pov: artPov,
  povTechutopia: artPov,
  artPov,
  dance: artDance,
  danceCompetition: artDance,
  artDance,
  rampwalk: artRampwalk,
  rampWalk: artRampwalk,
  artRampwalk,
  adCreation: artAdCreation,
  addCreation: artAdCreation,
  adCreationCompetition: artAdCreation,
  artAdCreation
}

// ─── 2. DEFAULT & SPECIAL FORM LINKS ─────────────────────────────────────────
export const DEFAULT_FORM_LINK = "https://forms.gle/mLC9NQxHTFdsuCz9A"
export const LAST_CARD_FORM_LINK = "https://forms.gle/mLC9NQxHTFdsuCz9A"

// ─── 3. COMPLETE EVENTS DATASET (DETAILS, ARTWORK & FORM MAPPINGS) ────────────
export const EVENTS_DATASET = [
  {
    id: 2,
    title: 'Gravity Zone',
    rank: 'A-RANK ARENA',
    threat: 'A-TIER',
    element: 'GRAVITY',
    category: 'Physics & Fun',
    icon: '🌌',
    color: '#f59e0b',
    image: art2,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Zero-G engineering challenges, water rockets, and high-altitude aerodynamic drops.',
    description: 'Zero-G engineering challenges, water rockets, and high-altitude aerodynamic drops.',
    date: 'Day 1 • 2:00 PM - 5:00 PM',
    venue: 'Central University Grounds, UEM Jaipur',
    prize: '₹35,000 + Medallions',
    team: 'Squad of 2-4'
  },
  {
    id: 3,
    title: 'PRAGATI 2.0',
    rank: 'SPECIAL GUILD',
    threat: 'SIH-TIER',
    element: 'INNOVATION',
    category: 'Smart India Hackathon',
    icon: '💡',
    color: '#ffb703',
    image: art3,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Smart India Hackathon 2026 — Igniting Ideas & Inspiring Innovation. Qualify for SIH.',
    description: 'Smart India Hackathon 2026: Pragati 2.0 — Igniting Ideas & Inspiring Innovation. Jointly organized by IEEE Student Branch & IIEDC. Bring your laptop, chargers, and great enthusiasm to qualify for SIH.',
    date: '05 October, 2026 • 9:00 AM - 5:00 PM',
    venue: 'Main Building, Basement Seminar Hall, UEM Jaipur',
    prize: '₹20,000 Cash Pool (1st: ₹10k, 2nd: ₹6k, 3rd: ₹4k) + SIH Qualification',
    team: 'Team Hackathon'
  },

  {
    id: 5,
    title: 'Hack Pulse',
    rank: 'SUPREME RAID',
    threat: 'MYTHIC',
    element: 'CYBER',
    category: 'Hackathon',
    icon: '⚡',
    color: '#ffaa00',
    image: art6,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: '24-hour non-stop code sprint building breakthrough AI, Web3, and Cloud solutions.',
    description: '24-hour non-stop code sprint building breakthrough AI, Web3, and Cloud solutions.',
    date: 'Day 1 - Day 2 • 24 Hours Non-Stop',
    venue: 'Innovation Hub & Sandbox Lab',
    prize: '₹1,00,000 + Incubation Support',
    team: 'Squad of 2-4'
  },
  {
    id: 6,
    title: 'Esports Championship',
    rank: 'COLISEUM APEX',
    threat: 'CHAOS',
    element: 'LIGHTNING',
    category: 'Gaming',
    icon: '🎮',
    color: '#ef4444',
    image: art7,
    formLink: "https://uemj-gaming-club.vercel.app/",
    snippet: 'High-octane BGMI, Valorant, and EA FC tournament on the stage with live commentary.',
    description: 'High-octane BGMI, Valorant, and EA FC tournament on the stage with live commentary.',
    date: 'Day 1 - Day 2 • Tournament Brackets',
    venue: 'Indoor Sports Stadium & Gaming Dome',
    prize: '₹60,000 + Pro Gaming Gear',
    team: 'Squad of 4-5'
  },
  {
    id: 7,
    title: 'Visual Echos',
    rank: 'B-RANK CHRONICLE',
    threat: 'VISION',
    element: 'OPTIC',
    category: 'Creative Arts',
    icon: '📸',
    color: '#f97316',
    image: art8,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Theme-based on-spot photography and cinematic storytelling competition.',
    description: 'Theme-based on-spot photography and cinematic storytelling competition.',
    date: 'Day 1 - Day 2 • On-Campus Submissions',
    venue: 'Media Center & Campus-Wide',
    prize: '₹25,000 + Lens Gear',
    team: 'Solo Hunter'
  },
  {
    id: 8,
    title: 'Bridge Building',
    rank: 'B-RANK STRUCTURE',
    threat: 'B-TIER',
    element: 'EARTH',
    category: 'Civil & Mechanics',
    icon: '🌉',
    color: '#d97706',
    image: art9,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Popsicle stick and balsa truss bridge engineering tested to absolute destruction.',
    description: 'Popsicle stick and balsa truss bridge engineering tested to absolute destruction.',
    date: 'Day 2 • 1:30 PM - 5:00 PM',
    venue: 'Civil Engineering Materials Lab',
    prize: '₹30,000 + Trophy',
    team: 'Team of 2-3'
  },
  {
    id: 9,
    title: 'Startup Expo',
    rank: 'S-RANK VENTURE',
    threat: 'VENTURE',
    element: 'CAPITAL',
    category: 'Startup & Pitch',
    icon: '🦈',
    color: '#06b6d4',
    image: art10,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'High-stakes startup pitch battleground before angel investors and venture capitalists.',
    description: 'High-stakes startup pitch battleground before angel investors and venture capitalists.',
    date: 'Day 2 • 3:00 PM - 6:00 PM',
    venue: 'Auditorium Hall B & Innovation Stage',
    prize: '₹50,000 + Seed Funding Mentorship',
    team: 'Team of 1-4'
  },
  {
    id: 10,
    title: 'Prompt Verse',
    rank: 'A-RANK CIPHER',
    threat: 'A-TIER',
    element: 'SHADOW',
    category: 'Gen AI & Prompt Engineering',
    icon: '🤖',
    color: '#dc2626',
    image: art11,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Competition using Gen AI tools — Ideate, prompt, create, repeat. Good prompts brighter tomorrows.',
    description: 'PromptVerse: Competition using Gen AI tools presented by Techfest in association with TCDS, Synapse Club, and Codesta. Showcase your prompt craft, creativity, and AI engineering.',
    date: 'Day 1 • 4:00 PM - 6:30 PM',
    venue: 'Computer Science Lab 4',
    prize: '₹25,000 + Exciting Awards',
    team: 'Solo Hunter'
  },
  {
    id: 11,
    title: 'Campus Zaika',
    rank: 'GOURMET FEAST',
    threat: 'FLAVOR',
    element: 'EMBER',
    category: 'Culinary & Feast',
    icon: '🍜',
    color: '#facc15',
    image: art12,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Gastronomic food carnival, live mocktail alchemy, and street food popups.',
    description: 'Gastronomic food carnival, live mocktail alchemy, and street food popups.',
    date: 'Day 1 - Day 2 • 12:00 PM - 8:00 PM',
    venue: 'Food Court Promenade & Central Plaza',
    prize: '₹30,000 + Chef Trophies',
    team: 'Solo / Squad'
  },
  {
    id: 12,
    title: 'BYTE BATTLE',
    rank: 'S-RANK EXHIBIT',
    threat: 'S-TIER',
    element: 'FORGE',
    category: 'Hardware & Science',
    icon: '🔬',
    color: '#e65100',
    image: art13,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Interactive working models of smart city infrastructures and green-energy grids.',
    description: 'Interactive working models of smart city infrastructures and green-energy grids.',
    date: 'Day 1 - Day 2 • Continuous Showcase',
    venue: 'Main Foyer & Exhibition Hall A',
    prize: '₹50,000 + Innovation Trophies',
    team: 'Exhibition Guilds'
  },
  {
    id: 13,
    title: 'Death Race',
    rank: 'APEX SPEED',
    threat: 'S-TIER',
    element: 'TURBO',
    category: 'RC Racing & Obstacles',
    icon: '🏎️',
    color: '#ef4444',
    image: art15,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'High-velocity RC car sprint across lethal obstacle tracks and sharp chicanes.',
    description: 'High-velocity RC car sprint across lethal obstacle tracks and sharp chicanes.',
    date: 'Day 1 • 2:30 PM - 5:30 PM',
    venue: 'Outdoor Grand Arena & Dirt Track',
    prize: '₹40,000 + Nitro Trophies',
    team: 'Team of 2-3'
  },
  {
    id: 14,
    title: 'Robosoccer',
    rank: 'STRIKER GUILD',
    threat: 'A-TIER',
    element: 'KINETIC',
    category: 'Robotics & Sports',
    icon: '⚽',
    color: '#10b981',
    image: art16,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Wireless mechanized bots clashing in tactical soccer penalty shootouts and matches.',
    description: 'Wireless mechanized bots clashing in tactical soccer penalty shootouts and matches.',
    date: 'Day 2 • 11:00 AM - 3:00 PM',
    venue: 'Robotics Arena, Workshop Ground',
    prize: '₹35,000 + Golden Boot Awards',
    team: 'Team of 2-4'
  },
  {
    id: 15,
    title: 'Drone Competition',
    rank: 'AERIAL ACE',
    threat: 'S-TIER',
    element: 'AERO',
    category: 'Aeronautics & FPV',
    icon: '🛸',
    color: '#06b6d4',
    image: art17,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'High-speed FPV drone racing through neon ring gates and precision payload drops.',
    description: 'High-speed FPV drone racing through neon ring gates and precision payload drops.',
    date: 'Day 1 • 3:00 PM - 6:00 PM',
    venue: 'Open Sky Amphitheatre Arena',
    prize: '₹50,000 + FPV Goggles Kit',
    team: 'Solo / Pilot & Co-Pilot'
  },
  {
    id: 16,
    title: 'Waste to Wealth',
    rank: 'GREEN TITAN',
    threat: 'ECO-TIER',
    element: 'TERRA',
    category: 'CleanTech & Sustainability',
    icon: '🌱',
    color: '#22c55e',
    image: art18,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Waste to Wealth: Innovate the Discarded — Waste today, wealth tomorrow. Think, innovate, regenerate.',
    description: 'Waste to Wealth (W2W): Innovate the Discarded — Transform agricultural residues, industrial effluents, urban waste, biochar, and microalgal bioproducts into sustainable solutions.',
    date: 'Day 2 • 10:00 AM - 2:00 PM',
    venue: 'Eco-Innovation Concourse, Block 2',
    prize: 'Cash Prizes + Winner & Runner-Up Trophies',
    team: 'Team of 2-4'
  },
  {
    id: 17,
    title: 'Physio X',
    rank: 'ELITE BIO-CORPS',
    threat: 'VITAL',
    element: 'REFLEX',
    category: 'Health Sciences & Agility',
    icon: '🩺',
    color: '#eab308',
    image: art19,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: "Physiotherapy Students' Hackathon — Move, Think, Heal, Innovate. Better Movement, Brighter Lives.",
    description: "Physio X: Physiotherapy Students' Hackathon — Multi-stage clinical assessment, case solving, and final presentation. Win cash prizes, trophies, mementos, and certificates.",
    date: 'Day 1 - Day 2 • Clinical Rounds',
    venue: 'Physiotherapy Clinical Arena',
    prize: 'Cash Prizes + Winner & Runner-Up Trophies',
    team: 'Solo / Duo'
  },
  {
    id: 18,
    title: 'Pixel Ki Paheli',
    rank: 'CYBER CIPHER',
    threat: 'DARK-TIER',
    element: 'SHADOW',
    category: 'Cybersecurity & CTF',
    icon: '🧩',
    color: '#8b5cf6',
    image: art20,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Capture the Flag (CTF) showdown: reverse engineering, cryptography, and penetration.',
    description: 'Capture the Flag (CTF) showdown: reverse engineering, cryptography, and penetration.',
    date: 'Day 2 • 12:00 PM - 5:00 PM',
    venue: 'Cyber Defense Command Lab 1',
    prize: '₹45,000 + Bug Bounty Certs',
    team: 'Squad of 1-3'
  },
  {
    id: 19,
    title: 'Wall Canvas',
    rank: 'A-RANK CREATIVE',
    threat: 'A-TIER',
    element: 'CHROMA',
    category: 'Creative Arts & Design',
    icon: '🎨',
    color: '#06b6d4',
    image: art22,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Live graffiti mural painting and wall art canvas showcase celebrating vibrant urban anime aesthetics.',
    description: 'Live graffiti mural painting and wall art canvas showcase celebrating vibrant urban anime aesthetics.',
    date: 'Day 1 - Day 2 • 10:00 AM - 4:00 PM',
    venue: 'Open Air Amphitheatre & Art Promenade',
    prize: '₹35,000 + Golden Brush Trophy',
    team: 'Team of 2-4 / Solo'
  },
  {
    id: 20,
    title: 'Euphoria',
    rank: 'HARMONIC MELODY',
    threat: 'VOCAL-TIER',
    element: 'SONIC AURA',
    category: 'Annual Singing Competition',
    icon: '🎤',
    color: '#f59e0b',
    image: artEuphoria,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Where Talent Finds Its Melody — UEMJ Annual Singing Competition showcasing vocal mastery.',
    description: 'Where Talent Finds Its Melody — Step into the spotlight at the UEMJ Annual Singing Competition. Showcase your vocal prowess across solo and duet performances in front of an enthusiastic audience and expert judges.',
    date: '5th October, 2026',
    venue: 'Ground Floor Stage, Academic Block I',
    prize: 'Prestigious Trophies & Awards',
    team: 'Solo / Duet Vocalists'
  },
  {
    id: 21,
    title: 'Agomoni',
    rank: 'CELESTIAL DIVINE',
    threat: 'SACRED-TIER',
    element: 'DIVINE',
    category: 'Cultural & Performing Arts',
    icon: '🪔',
    color: '#dc2626',
    image: art23,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Welcoming Maa Durga — Showcase your talents in Music, Dance, Singing, Recitation, Acting, and Creative Performances.',
    description: 'Welcoming Maa Durga — Showcase your talents in Music, Dance, Singing, Recitation, Acting, and Creative Performances.',
    date: 'Day 2 • 6th October 2026',
    venue: 'UEM Jaipur Campus',
    prize: 'Agomoni Selection Badges & Honors',
    team: 'Solo / Group Selection'
  },
  {
    id: 22,
    title: 'POV TechUtopia',
    rank: 'S-RANK CHRONICLER',
    threat: 'CREATIVE-TIER',
    element: 'VISUAL AURA',
    category: 'Cinematography & Reel Contest',
    icon: '🎥',
    color: '#06b6d4',
    image: artPov,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Capture the festival through your lens — create dynamic reels, cinematic vlogs, and campus stories.',
    description: 'Showcase your filmmaking and storytelling prowess. Capture the electric vibe, anime installations, and unforgettable moments of TechUtopia from your perspective.',
    date: 'Day 1 - Day 2 • Festival Hours',
    venue: 'UEM Jaipur Campus Grounds',
    prize: '₹25,000 + Best Creator Trophy',
    team: 'Solo / Duo Creators'
  },
  {
    id: 23,
    title: 'Dance Competition',
    rank: 'A-RANK RHYTHM',
    threat: 'S-TIER SHOWDOWN',
    element: 'KINETIC FIRE',
    category: 'Cultural Dance Competition',
    icon: '💃',
    color: '#e11d48',
    image: artDance,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Move • Express • Inspire — Cultural Fest presents the grand dance battle for solo, duet, and group performers.',
    description: 'Move • Express • Inspire — Cultural Fest presents the grand dance competition. Showcase your rhythm, expression, and passion across classical, contemporary, western, and fusion dance.',
    date: '5th October, 2026',
    venue: 'University of Engineering and Management, Jaipur',
    prize: 'Championship Trophies & Recognition',
    team: 'Solo / Duet / Group'
  },
  {
    id: 24,
    title: 'Rampwalk',
    rank: 'COUTURE RUNWAY',
    threat: 'GLAMOUR-TIER',
    element: 'DIVINE COUTURE',
    category: 'Ramp Walk Competition',
    icon: '👑',
    color: '#8b5cf6',
    image: artRampwalk,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Cultural Diversity of India — "Unity in Diversity: A Walk Through Indian Traditions" couture runway.',
    description: 'Different States, Same Heart, India — One Country, Many Cultures. Strut your style and grace in traditional and couture Indian attire celebrating the rich heritage of India.',
    date: '5th October, 2026 (Monday)',
    venue: 'UEM Jaipur Campus',
    prize: 'Best Model & Designer Trophies',
    team: 'Solo Models / Fashion Teams'
  },
  {
    id: 25,
    title: 'Ad Creation Competition',
    rank: 'CREATIVE APEX',
    threat: 'CHROMA-TIER',
    element: 'MEDIA AURA',
    category: 'Media & Advertisement',
    icon: '🎬',
    color: '#ec4899',
    image: artAdCreation,
    formLink: DEFAULT_FORM_LINK,
    snippet: 'Unleash your marketing genius and creative vision in designing impactful, original advertisements.',
    description: 'Ad Creation Competition — Step into the director’s chair and craft compelling, creative ad campaigns. From quirky brand concepts to cinematic promotional videos and posters, showcase your advertising power.',
    date: 'Day 1 - Day 2 • Festival Hours',
    venue: 'Media Center / Central Hall, UEM Jaipur',
    prize: '₹25,000 + Best Creator Trophy',
    team: 'Solo / Duo / Squad'
  }
]

// Re-export alias
export const eventsDataset = EVENTS_DATASET

// Safe link resolver by event title
const findLink = (title) => EVENTS_DATASET.find((e) => e.title.toLowerCase() === title.toLowerCase())?.formLink || DEFAULT_FORM_LINK

// ─── 4. FORM LINKS LOOKUP TABLE (BY ID, TITLE & ALIASES) ──────────────────────
export const EVENT_FORM_LINKS = {
  // Map all events dynamically from EVENTS_DATASET
  ...EVENTS_DATASET.reduce((acc, ev) => {
    acc[ev.id] = ev.formLink
    acc[ev.title] = ev.formLink
    return acc
  }, {}),

  // Aliases & Alternate Spellings for backwards compatibility
  "RoboWar": findLink('Robo War'),
  "Robo Mania": findLink('Robo War'),
  "RoboMania": findLink('Robo War'),
  "Pragati 2.0": findLink('PRAGATI 2.0'),
  "Pragati": findLink('PRAGATI 2.0'),
  "Smart India Hackathon": findLink('PRAGATI 2.0'),
  "SIH": findLink('PRAGATI 2.0'),
  "Physio Event": findLink('Physio X'),
  "Hackathon": findLink('Hack Pulse'),
  "Hackathon (24hr)": findLink('Hack Pulse'),
  "24Hr Hackathon": findLink('Hack Pulse'),
  "Esports": findLink('Esports Championship'),
  "Esports Arena": findLink('Esports Championship'),
  "Esportz": findLink('Esports Championship'),
  "EsportZ": findLink('Esports Championship'),
  "esportz": findLink('Esports Championship'),
  "Photography": findLink('Visual Echos'),
  "Visual Echoes": findLink('Visual Echos'),
  "Launchpad": DEFAULT_FORM_LINK,
  "Startup Expo": findLink('Startup Expo'),
  "StartupExpo": findLink('Startup Expo'),
  "startup expo": findLink('Startup Expo'),
  "SharkTank": findLink('Startup Expo'),
  "Shark Tank": findLink('Startup Expo'),
  "Dragon's Den": findLink('Startup Expo'),
  "Dragons Den": findLink('Startup Expo'),
  "Tech Venture": findLink('Startup Expo'),
  "TechVenture": findLink('Startup Expo'),
  "Generative Media": findLink('Startup Expo'),
  "PromptVerse": findLink('Prompt Verse'),
  "Blind Coding": findLink('Prompt Verse'),
  "Food Fest": findLink('Campus Zaika'),
  "Food Festival": findLink('Campus Zaika'),
  "Campus Zaika": findLink('Campus Zaika'),
  "CampusZaika": findLink('Campus Zaika'),
  "Circuit Design": findLink('Campus Zaika'),
  "BYTE BATTLE": findLink('BYTE BATTLE'),
  "Byte Battle": findLink('BYTE BATTLE'),
  "byte battle": findLink('BYTE BATTLE'),
  "Code Fusion": findLink('BYTE BATTLE'),
  "CodeFusion": findLink('BYTE BATTLE'),
  "Tech Model Expo": findLink('BYTE BATTLE'),
  "DeathRace": findLink('Death Race'),
  "Robo Soccer": findLink('Robosoccer'),
  "RoboSoccer": findLink('Robosoccer'),
  "DroneCompetition": findLink('Drone Competition'),
  "Sustainability": findLink('Waste to Wealth'),
  "Sustainibility": findLink('Waste to Wealth'),
  "sustainability": findLink('Waste to Wealth'),
  "Waste to Wealth": findLink('Waste to Wealth'),
  "Waste To Wealth": findLink('Waste to Wealth'),
  "W2W": findLink('Waste to Wealth'),
  "w2w": findLink('Waste to Wealth'),
  "PhysioX": findLink('Physio X'),
  "Physio x": findLink('Physio X'),
  "Cysec": findLink('Pixel Ki Paheli'),
  "CySEC": findLink('Pixel Ki Paheli'),
  "CYSEC": findLink('Pixel Ki Paheli'),
  "CySec": findLink('Pixel Ki Paheli'),
  "Pixel Ki Paheli": findLink('Pixel Ki Paheli'),
  "pixel ki paheli": findLink('Pixel Ki Paheli'),
  "PixelKiPaheli": findLink('Pixel Ki Paheli'),
  "Wall Canvas": findLink('Wall Canvas'),
  "wall canvas": findLink('Wall Canvas'),
  "WallCanvas": findLink('Wall Canvas'),
  "Fashion Carnival & Cultural Evening": findLink('Euphoria'),
  "Fashion Carnival": findLink('Euphoria'),
  "CulturalEvening": findLink('Euphoria'),
  "CULTURAL Evening": findLink('Euphoria'),
  "Cultural Evening": findLink('Euphoria'),
  "Euphoria": findLink('Euphoria'),
  "euphoria": findLink('Euphoria'),
  "EUPHORIA": findLink('Euphoria'),
  "Singing Competition": findLink('Euphoria'),
  "singing competition": findLink('Euphoria'),
  "Singing": findLink('Euphoria'),
  "singing": findLink('Euphoria'),
  "UEMJ Annual Singing Competition": findLink('Euphoria'),
  "POV TechUtopia": findLink('POV TechUtopia'),
  "pov techutopia": findLink('POV TechUtopia'),
  "POV Techutopia": findLink('POV TechUtopia'),
  "POV": findLink('POV TechUtopia'),
  "pov": findLink('POV TechUtopia'),
  "Dance Competition": findLink('Dance Competition'),
  "dance competition": findLink('Dance Competition'),
  "Dance": findLink('Dance Competition'),
  "dance": findLink('Dance Competition'),
  "Dance Battle": findLink('Dance Competition'),
  "Rampwalk": findLink('Rampwalk'),
  "rampwalk": findLink('Rampwalk'),
  "Ramp Walk": findLink('Rampwalk'),
  "ramp walk": findLink('Rampwalk'),
  "Fashion Runway": findLink('Rampwalk'),
  "Ad Creation Competition": findLink('Ad Creation Competition'),
  "ad creation competition": findLink('Ad Creation Competition'),
  "Ad Creation": findLink('Ad Creation Competition'),
  "ad creation": findLink('Ad Creation Competition'),
  "Add Creation Competition": findLink('Ad Creation Competition'),
  "add creation competition": findLink('Ad Creation Competition'),
  "Add Creation": findLink('Ad Creation Competition'),
  "add creation": findLink('Ad Creation Competition'),
  "Ad-Creation": findLink('Ad Creation Competition'),
  "Ad-Mad": findLink('Ad Creation Competition'),
  "Agomoni": findLink('Agomoni'),
  "agomoni": findLink('Agomoni'),
  "AGOMONI": findLink('Agomoni'),
  "Agomani": findLink('Agomoni'),
  "Shubho Agomoni": findLink('Agomoni'),

  // Last Card / Finale Sanctuary
  "last_card": LAST_CARD_FORM_LINK,
  "end_board": LAST_CARD_FORM_LINK
}

// ─── 5. HELPER UTILITIES ──────────────────────────────────────────────────────
/**
 * Retrieve the Google Form link for an event object, id, or title string.
 */
export function getEventFormLink(eventOrId) {
  if (!eventOrId) return DEFAULT_FORM_LINK

  if (eventOrId === 'last_card' || eventOrId === 'end_board') {
    return LAST_CARD_FORM_LINK
  }

  if (typeof eventOrId === 'object') {
    if (eventOrId.formLink) return eventOrId.formLink
    if (eventOrId.id && EVENT_FORM_LINKS[eventOrId.id]) return EVENT_FORM_LINKS[eventOrId.id]
    if (eventOrId.title && EVENT_FORM_LINKS[eventOrId.title]) return EVENT_FORM_LINKS[eventOrId.title]
    return DEFAULT_FORM_LINK
  }

  if (EVENT_FORM_LINKS[eventOrId]) {
    return EVENT_FORM_LINKS[eventOrId]
  }

  return DEFAULT_FORM_LINK
}

/**
 * Retrieve an event by its numeric ID (1..21)
 */
export function getEventById(id) {
  return EVENTS_DATASET.find((e) => e.id === Number(id)) || null
}

/**
 * Retrieve an event by title or alias
 */
export function getEventByTitle(title) {
  if (!title) return null
  const query = String(title).toLowerCase().trim()
  return EVENTS_DATASET.find((e) => e.title.toLowerCase() === query) || null
}

/**
 * List of all event titles (ideal for dropdowns & selectors)
 */
export const ALL_EVENT_TITLES = EVENTS_DATASET.map((e) => e.title)

// ─── 6. REACT CONTEXT (OPTIONAL) ──────────────────────────────────────────────
export const EventFormsContext = createContext({
  events: EVENTS_DATASET,
  formLinks: EVENT_FORM_LINKS,
  lastCardFormLink: LAST_CARD_FORM_LINK,
  defaultFormLink: DEFAULT_FORM_LINK,
  getEventFormLink,
  getEventById,
  getEventByTitle
})

export function EventFormsProvider({ children }) {
  return (
    <EventFormsContext.Provider
      value={{
        events: EVENTS_DATASET,
        formLinks: EVENT_FORM_LINKS,
        lastCardFormLink: LAST_CARD_FORM_LINK,
        defaultFormLink: DEFAULT_FORM_LINK,
        getEventFormLink,
        getEventById,
        getEventByTitle
      }}
    >
      {children}
    </EventFormsContext.Provider>
  )
}

export function useEventForms() {
  return useContext(EventFormsContext)
}

export default EVENTS_DATASET
