import { createContext, useContext } from 'react'

// ══════════════════════════════════════════════════════════════════════════════
// TECHUTOPIA '26 — EVENT CARDS, DETAILS, ARTWORK & GOOGLE FORM LINKS DIRECTORY
// ══════════════════════════════════════════════════════════════════════════════
// You can edit event details, titles, images, categories, dates, venues, prizes,
// and Google Form links in this single centralized file.
// ══════════════════════════════════════════════════════════════════════════════

// ─── 1. EVENT ARTWORK IMPORTS (FROM ASSETS FOLDER) ────────────────────────────
import art1 from '../assets/EVENTS/robo war.webp'
import art2 from '../assets/EVENTS/gravity zone.webp'
import art3 from '../assets/EVENTS/pragati.webp'
import art5 from '../assets/EVENTS/launchpad real.webp'
import art6 from '../assets/EVENTS/hackpulse.webp'
import art7 from '../assets/EVENTS/esportz final.webp'
import art8 from '../assets/EVENTS/visual echoes.webp'
import art9 from '../assets/EVENTS/bridge building.webp'
import art10 from '../assets/EVENTS/launchpad.webp'
import art11 from '../assets/EVENTS/PromptVerse.webp'
import art12 from '../assets/EVENTS/food festival.webp'
import art13 from '../assets/EVENTS/code fusion.webp'
import art15 from '../assets/EVENTS/death race.webp'
import art16 from '../assets/EVENTS/robo soccer.webp'
import art17 from '../assets/EVENTS/drone compi (1).webp'
import art18 from '../assets/EVENTS/sustanibility.webp'
import art19 from '../assets/EVENTS/physio x.webp'
import art20 from '../assets/EVENTS/CySec.webp'
import art21 from '../assets/EVENTS/agomoni.webp'

// Export all event card images for direct access if needed
export const EVENT_ASSETS = {
  art1,
  art2,
  art3,
  art5,
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
  agomoni: art21,
  artAgomoni: art21
}

// ─── 2. DEFAULT & SPECIAL FORM LINKS ─────────────────────────────────────────
export const DEFAULT_FORM_LINK = "https://forms.gle/mLC9NQxHTFdsuCz9A"
export const LAST_CARD_FORM_LINK = "https://forms.gle/mLC9NQxHTFdsuCz9A"

// ─── 3. COMPLETE EVENTS DATASET (DETAILS, ARTWORK & FORM MAPPINGS) ────────────
export const EVENTS_DATASET = [
  {
    id: 1,
    title: 'Robo War',
    rank: 'S-RANK COLISEUM',
    threat: 'S-TIER',
    element: 'MECHA',
    category: 'Robotics',
    icon: '🤖',
    color: '#ff4500',
    image: art1,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Heavyweight combat bots and autonomous rovers clashing in the steel cage arena.',
    description: 'Heavyweight combat bots and autonomous rovers clashing in the steel cage arena.',
    date: 'Day 1 • 11:00 AM - 3:00 PM',
    venue: 'Mechanical Arena, Workshop Block',
    prize: '₹50,000 + Champion Trophy',
    team: 'Team of 2-5'
  },
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
    threat: 'BIO-RANK',
    element: 'VITALITY',
    category: 'Healthcare & Wellness',
    icon: '🩺',
    color: '#ffb703',
    image: art3,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Biomechanics agility sprint, posture AI analysis, and ergonomic reflex testing.',
    description: 'Biomechanics agility sprint, posture AI analysis, and ergonomic reflex testing.',
    date: 'Day 2 • 10:00 AM - 1:00 PM',
    venue: 'Physiotherapy & Health Sciences Wing',
    prize: '₹30,000 + Clinical Kits',
    team: 'Solo / Duo'
  },
  {
    id: 4,
    title: 'Launchpad',
    rank: 'A-RANK INNOVATION',
    threat: 'A-TIER',
    element: 'COSMIC',
    category: 'Project Expo',
    icon: '🚀',
    color: '#ea580c',
    image: art5,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Grand tech project exhibition showcasing IoT, renewable energy, and AI inventions.',
    description: 'Grand tech project exhibition showcasing IoT, renewable energy, and AI inventions.',
    date: 'Day 1 • 10:00 AM - 4:00 PM',
    venue: 'Exhibition Center, Main Foyer',
    prize: '₹45,000 + Research Grants',
    team: 'Team of 2-4'
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
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
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
    title: "Dragon's Den",
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
    category: 'Coding & Logic',
    icon: '🕶️',
    color: '#dc2626',
    image: art11,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Screen-off algorithmic coding duels testing sheer syntax muscle memory.',
    description: 'Screen-off algorithmic coding duels testing sheer syntax muscle memory.',
    date: 'Day 1 • 4:00 PM - 6:30 PM',
    venue: 'Computer Science Lab 4',
    prize: '₹25,000 + Mechanical Keyboards',
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
    title: 'Sustainability',
    rank: 'GREEN TITAN',
    threat: 'ECO-TIER',
    element: 'TERRA',
    category: 'CleanTech & Green Innovation',
    icon: '🌱',
    color: '#22c55e',
    image: art18,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Innovative clean energy models, zero-waste tech, and eco-sustainable engineering.',
    description: 'Innovative clean energy models, zero-waste tech, and eco-sustainable engineering.',
    date: 'Day 2 • 10:00 AM - 2:00 PM',
    venue: 'Eco-Innovation Concourse, Block 2',
    prize: '₹35,000 + Eco Innovation Grant',
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
    snippet: 'Advanced biomechanics testing, EMG signal analysis, and athletic speed trials.',
    description: 'Advanced biomechanics testing, EMG signal analysis, and athletic speed trials.',
    date: 'Day 1 • 11:30 AM - 3:00 PM',
    venue: 'Physiotherapy Clinical Arena',
    prize: '₹30,000 + Diagnostic Medals',
    team: 'Solo / Duo'
  },
  {
    id: 18,
    title: 'CySec',
    rank: 'CYBER CIPHER',
    threat: 'DARK-TIER',
    element: 'SHADOW',
    category: 'Cybersecurity & CTF',
    icon: '🛡️',
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
    title: 'Agomoni',
    rank: 'STARLIGHT GALA',
    threat: 'CELEBRATION',
    element: 'AURA',
    category: 'Music & Cultural Fest',
    icon: '🎭',
    color: '#ec4899',
    image: art21,
    formLink: "https://forms.gle/mLC9NQxHTFdsuCz9A",
    snippet: 'Celebrity live music concert, theatrical dance ensembles, and DJ night.',
    description: 'Celebrity live music concert, theatrical dance ensembles, and DJ night.',
    date: 'Day 2 • 7:00 PM - 10:30 PM (Grand Night)',
    venue: 'Main University Stadium Open Grounds',
    prize: 'Grand Night Passes + All-Star Badges',
    team: 'Open Festival Gala'
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
  "Physio Event": findLink('PRAGATI 2.0'),
  "Hackathon": findLink('Hack Pulse'),
  "Hackathon (24hr)": findLink('Hack Pulse'),
  "24Hr Hackathon": findLink('Hack Pulse'),
  "Esports": findLink('Esports Championship'),
  "Esports Arena": findLink('Esports Championship'),
  "Photography": findLink('Visual Echos'),
  "Visual Echoes": findLink('Visual Echos'),
  "SharkTank": findLink("Dragon's Den"),
  "Shark Tank": findLink("Dragon's Den"),
  "Dragon's Den": findLink("Dragon's Den"),
  "Dragons Den": findLink("Dragon's Den"),
  "Generative Media": findLink("Dragon's Den"),
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
  "Sustainibility": findLink('Sustainability'),
  "PhysioX": findLink('Physio X'),
  "Physio x": findLink('Physio X'),
  "Cysec": findLink('CySec'),
  "CySEC": findLink('CySec'),
  "CYSEC": findLink('CySec'),
  "CulturalEvening": findLink('Agomoni'),
  "CULTURAL Evening": findLink('Agomoni'),
  "Cultural Evening": findLink('Agomoni'),
  "Agomoni": findLink('Agomoni'),
  "agomoni": findLink('Agomoni'),
  "AGOMONI": findLink('Agomoni'),

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
