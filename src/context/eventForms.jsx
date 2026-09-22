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
import art4 from '../assets/4.webp'
import art5 from '../assets/EVENTS/launchpad real.webp'
import art6 from '../assets/EVENTS/hackpulse.webp'
import art7 from '../assets/7.webp'
import art8 from '../assets/EVENTS/visual echoes.webp'
import art9 from '../assets/EVENTS/bridge building.webp'
import art10 from '../assets/EVENTS/launchpad.webp'
import art11 from '../assets/EVENTS/PromptVerse.webp'
import art12 from '../assets/12.webp'
import art13 from '../assets/14.webp'
import art14 from '../assets/15.webp'
import art15 from '../assets/EVENTS/death race.webp'
import art16 from '../assets/EVENTS/robo soccer.webp'
import art17 from '../assets/EVENTS/drone compi (1).webp'
import art18 from '../assets/EVENTS/sustanibility.webp'
import art19 from '../assets/EVENTS/physio x.webp'
import art20 from '../assets/EVENTS/CySec.webp'
import art21 from '../assets/22.webp'

// Export all event card images for direct access if needed
export const EVENT_ASSETS = {
  art1,
  art2,
  art3,
  art4,
  art5,
  art6,
  art7,
  art8,
  art9,
  art10,
  art11,
  art12,
  art13,
  art14,
  art15,
  art16,
  art17,
  art18,
  art19,
  art20,
  art21
}

// ─── 2. DEFAULT & SPECIAL FORM LINKS ─────────────────────────────────────────
export const DEFAULT_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm/viewform"
export const LAST_CARD_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_FinaleAllEvents/viewform"

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
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_RoboMania/viewform",
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
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_GravityZone/viewform",
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
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_PhysioEvent/viewform",
    snippet: 'Biomechanics agility sprint, posture AI analysis, and ergonomic reflex testing.',
    description: 'Biomechanics agility sprint, posture AI analysis, and ergonomic reflex testing.',
    date: 'Day 2 • 10:00 AM - 1:00 PM',
    venue: 'Physiotherapy & Health Sciences Wing',
    prize: '₹30,000 + Clinical Kits',
    team: 'Solo / Duo'
  },
  {
    id: 4,
    title: 'TechVenture',
    rank: 'S-RANK SUMMON',
    threat: 'VENTURE',
    element: 'GOLD',
    category: 'Startup & Business',
    icon: '💼',
    color: '#fbbf24',
    image: art4,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_TechVenture/viewform",
    snippet: 'High-stakes startup pitch arena in front of venture capitalists and angel investors.',
    description: 'High-stakes startup pitch arena in front of venture capitalists and angel investors.',
    date: 'Day 2 • 11:30 AM - 3:30 PM',
    venue: 'Auditorium Hall B, UEM Jaipur',
    prize: '₹75,000 + Seed Mentorship',
    team: 'Team of 1-4'
  },
  {
    id: 5,
    title: 'Launchpad',
    rank: 'A-RANK INNOVATION',
    threat: 'A-TIER',
    element: 'COSMIC',
    category: 'Project Expo',
    icon: '🚀',
    color: '#ea580c',
    image: art5,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_Launchpad/viewform",
    snippet: 'Grand tech project exhibition showcasing IoT, renewable energy, and AI inventions.',
    description: 'Grand tech project exhibition showcasing IoT, renewable energy, and AI inventions.',
    date: 'Day 1 • 10:00 AM - 4:00 PM',
    venue: 'Exhibition Center, Main Foyer',
    prize: '₹45,000 + Research Grants',
    team: 'Team of 2-4'
  },
  {
    id: 6,
    title: 'Hack Pulse',
    rank: 'SUPREME RAID',
    threat: 'MYTHIC',
    element: 'CYBER',
    category: 'Hackathon',
    icon: '⚡',
    color: '#ffaa00',
    image: art6,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_Hackathon/viewform",
    snippet: '24-hour non-stop code sprint building breakthrough AI, Web3, and Cloud solutions.',
    description: '24-hour non-stop code sprint building breakthrough AI, Web3, and Cloud solutions.',
    date: 'Day 1 - Day 2 • 24 Hours Non-Stop',
    venue: 'Innovation Hub & Sandbox Lab',
    prize: '₹1,00,000 + Incubation Support',
    team: 'Squad of 2-4'
  },
  {
    id: 7,
    title: 'Esports Championship',
    rank: 'COLISEUM APEX',
    threat: 'CHAOS',
    element: 'LIGHTNING',
    category: 'Gaming',
    icon: '🎮',
    color: '#ef4444',
    image: art7,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_Esports/viewform",
    snippet: 'High-octane BGMI, Valorant, and EA FC tournament on the stage with live commentary.',
    description: 'High-octane BGMI, Valorant, and EA FC tournament on the stage with live commentary.',
    date: 'Day 1 - Day 2 • Tournament Brackets',
    venue: 'Indoor Sports Stadium & Gaming Dome',
    prize: '₹60,000 + Pro Gaming Gear',
    team: 'Squad of 4-5'
  },
  {
    id: 8,
    title: 'Visual Echos',
    rank: 'B-RANK CHRONICLE',
    threat: 'VISION',
    element: 'OPTIC',
    category: 'Creative Arts',
    icon: '📸',
    color: '#f97316',
    image: art8,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_Photography/viewform",
    snippet: 'Theme-based on-spot photography and cinematic storytelling competition.',
    description: 'Theme-based on-spot photography and cinematic storytelling competition.',
    date: 'Day 1 - Day 2 • On-Campus Submissions',
    venue: 'Media Center & Campus-Wide',
    prize: '₹25,000 + Lens Gear',
    team: 'Solo Hunter'
  },
  {
    id: 9,
    title: 'Bridge Building',
    rank: 'B-RANK STRUCTURE',
    threat: 'B-TIER',
    element: 'EARTH',
    category: 'Civil & Mechanics',
    icon: '🌉',
    color: '#d97706',
    image: art9,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_BridgeBuilding/viewform",
    snippet: 'Popsicle stick and balsa truss bridge engineering tested to absolute destruction.',
    description: 'Popsicle stick and balsa truss bridge engineering tested to absolute destruction.',
    date: 'Day 2 • 1:30 PM - 5:00 PM',
    venue: 'Civil Engineering Materials Lab',
    prize: '₹30,000 + Trophy',
    team: 'Team of 2-3'
  },
  {
    id: 10,
    title: 'Shark Tank',
    rank: 'S-RANK VENTURE',
    threat: 'VENTURE',
    element: 'CAPITAL',
    category: 'Startup & Pitch',
    icon: '🦈',
    color: '#06b6d4',
    image: art10,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_SharkTank/viewform",
    snippet: 'High-stakes startup pitch battleground before angel investors and venture capitalists.',
    description: 'High-stakes startup pitch battleground before angel investors and venture capitalists.',
    date: 'Day 2 • 3:00 PM - 6:00 PM',
    venue: 'Auditorium Hall B & Innovation Stage',
    prize: '₹50,000 + Seed Funding Mentorship',
    team: 'Team of 1-4'
  },
  {
    id: 11,
    title: 'Prompt Verse',
    rank: 'A-RANK CIPHER',
    threat: 'A-TIER',
    element: 'SHADOW',
    category: 'Coding & Logic',
    icon: '🕶️',
    color: '#dc2626',
    image: art11,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_BlindCoding/viewform",
    snippet: 'Screen-off algorithmic coding duels testing sheer syntax muscle memory.',
    description: 'Screen-off algorithmic coding duels testing sheer syntax muscle memory.',
    date: 'Day 1 • 4:00 PM - 6:30 PM',
    venue: 'Computer Science Lab 4',
    prize: '₹25,000 + Mechanical Keyboards',
    team: 'Solo Hunter'
  },
  {
    id: 12,
    title: 'Food Festival',
    rank: 'GOURMET FEAST',
    threat: 'FLAVOR',
    element: 'EMBER',
    category: 'Culinary & Feast',
    icon: '🍜',
    color: '#facc15',
    image: art12,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_FoodFest/viewform",
    snippet: 'Gastronomic food carnival, live mocktail alchemy, and street food popups.',
    description: 'Gastronomic food carnival, live mocktail alchemy, and street food popups.',
    date: 'Day 1 - Day 2 • 12:00 PM - 8:00 PM',
    venue: 'Food Court Promenade & Central Plaza',
    prize: '₹30,000 + Chef Trophies',
    team: 'Solo / Squad'
  },
  {
    id: 13,
    title: 'Code Fusion',
    rank: 'S-RANK EXHIBIT',
    threat: 'S-TIER',
    element: 'FORGE',
    category: 'Hardware & Science',
    icon: '🔬',
    color: '#e65100',
    image: art13,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_TechModelExpo/viewform",
    snippet: 'Interactive working models of smart city infrastructures and green-energy grids.',
    description: 'Interactive working models of smart city infrastructures and green-energy grids.',
    date: 'Day 1 - Day 2 • Continuous Showcase',
    venue: 'Main Foyer & Exhibition Hall A',
    prize: '₹50,000 + Innovation Trophies',
    team: 'Exhibition Guilds'
  },
  {
    id: 14,
    title: 'Fashion Carnival',
    rank: 'SUPREME GALA',
    threat: 'MYTHIC',
    element: 'RADIANCE',
    category: 'Cultural Runway',
    icon: '✨',
    color: '#ff3366',
    image: art14,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_FashionCarnival/viewform",
    snippet: 'Anime cosplay masquerade, avant-garde cyber couture, and celebrity runway night.',
    description: 'Anime cosplay masquerade, avant-garde cyber couture, and celebrity runway night.',
    date: 'Day 2 • 6:30 PM - 10:00 PM (Grand Finale)',
    venue: 'Grand Amphitheatre Open Stage',
    prize: '₹70,000 + Fashion Crowns',
    team: 'Guild Roster / Squad'
  },
  {
    id: 15,
    title: 'Death Race',
    rank: 'APEX SPEED',
    threat: 'S-TIER',
    element: 'TURBO',
    category: 'RC Racing & Obstacles',
    icon: '🏎️',
    color: '#ef4444',
    image: art15,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_DeathRace/viewform",
    snippet: 'High-velocity RC car sprint across lethal obstacle tracks and sharp chicanes.',
    description: 'High-velocity RC car sprint across lethal obstacle tracks and sharp chicanes.',
    date: 'Day 1 • 2:30 PM - 5:30 PM',
    venue: 'Outdoor Grand Arena & Dirt Track',
    prize: '₹40,000 + Nitro Trophies',
    team: 'Team of 2-3'
  },
  {
    id: 16,
    title: 'Robosoccer',
    rank: 'STRIKER GUILD',
    threat: 'A-TIER',
    element: 'KINETIC',
    category: 'Robotics & Sports',
    icon: '⚽',
    color: '#10b981',
    image: art16,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_Robosoccer/viewform",
    snippet: 'Wireless mechanized bots clashing in tactical soccer penalty shootouts and matches.',
    description: 'Wireless mechanized bots clashing in tactical soccer penalty shootouts and matches.',
    date: 'Day 2 • 11:00 AM - 3:00 PM',
    venue: 'Robotics Arena, Workshop Ground',
    prize: '₹35,000 + Golden Boot Awards',
    team: 'Team of 2-4'
  },
  {
    id: 17,
    title: 'Drone Competition',
    rank: 'AERIAL ACE',
    threat: 'S-TIER',
    element: 'AERO',
    category: 'Aeronautics & FPV',
    icon: '🛸',
    color: '#06b6d4',
    image: art17,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_DroneCompetition/viewform",
    snippet: 'High-speed FPV drone racing through neon ring gates and precision payload drops.',
    description: 'High-speed FPV drone racing through neon ring gates and precision payload drops.',
    date: 'Day 1 • 3:00 PM - 6:00 PM',
    venue: 'Open Sky Amphitheatre Arena',
    prize: '₹50,000 + FPV Goggles Kit',
    team: 'Solo / Pilot & Co-Pilot'
  },
  {
    id: 18,
    title: 'Sustainability',
    rank: 'GREEN TITAN',
    threat: 'ECO-TIER',
    element: 'TERRA',
    category: 'CleanTech & Green Innovation',
    icon: '🌱',
    color: '#22c55e',
    image: art18,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_Sustainability/viewform",
    snippet: 'Innovative clean energy models, zero-waste tech, and eco-sustainable engineering.',
    description: 'Innovative clean energy models, zero-waste tech, and eco-sustainable engineering.',
    date: 'Day 2 • 10:00 AM - 2:00 PM',
    venue: 'Eco-Innovation Concourse, Block 2',
    prize: '₹35,000 + Eco Innovation Grant',
    team: 'Team of 2-4'
  },
  {
    id: 19,
    title: 'Physio X',
    rank: 'ELITE BIO-CORPS',
    threat: 'VITAL',
    element: 'REFLEX',
    category: 'Health Sciences & Agility',
    icon: '🩺',
    color: '#eab308',
    image: art19,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_PhysioX/viewform",
    snippet: 'Advanced biomechanics testing, EMG signal analysis, and athletic speed trials.',
    description: 'Advanced biomechanics testing, EMG signal analysis, and athletic speed trials.',
    date: 'Day 1 • 11:30 AM - 3:00 PM',
    venue: 'Physiotherapy Clinical Arena',
    prize: '₹30,000 + Diagnostic Medals',
    team: 'Solo / Duo'
  },
  {
    id: 20,
    title: 'CySec',
    rank: 'CYBER CIPHER',
    threat: 'DARK-TIER',
    element: 'SHADOW',
    category: 'Cybersecurity & CTF',
    icon: '🛡️',
    color: '#8b5cf6',
    image: art20,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_CySec/viewform",
    snippet: 'Capture the Flag (CTF) showdown: reverse engineering, cryptography, and penetration.',
    description: 'Capture the Flag (CTF) showdown: reverse engineering, cryptography, and penetration.',
    date: 'Day 2 • 12:00 PM - 5:00 PM',
    venue: 'Cyber Defense Command Lab 1',
    prize: '₹45,000 + Bug Bounty Certs',
    team: 'Squad of 1-3'
  },
  {
    id: 21,
    title: 'Agomoni',
    rank: 'STARLIGHT GALA',
    threat: 'CELEBRATION',
    element: 'AURA',
    category: 'Music & Cultural Fest',
    icon: '🎭',
    color: '#ec4899',
    image: art21,
    formLink: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_CulturalEvening/viewform",
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

// ─── 4. FORM LINKS LOOKUP TABLE (BY ID, TITLE & ALIASES) ──────────────────────
export const EVENT_FORM_LINKS = {
  // Map all events dynamically from EVENTS_DATASET
  ...EVENTS_DATASET.reduce((acc, ev) => {
    acc[ev.id] = ev.formLink
    acc[ev.title] = ev.formLink
    return acc
  }, {}),

  // Aliases & Alternate Spellings for backwards compatibility
  "RoboWar": EVENTS_DATASET[0].formLink,
  "Robo Mania": EVENTS_DATASET[0].formLink,
  "RoboMania": EVENTS_DATASET[0].formLink,
  "Pragati 2.0": EVENTS_DATASET[2].formLink,
  "Physio Event": EVENTS_DATASET[2].formLink,
  "Hackathon": EVENTS_DATASET[5].formLink,
  "Hackathon (24hr)": EVENTS_DATASET[5].formLink,
  "24Hr Hackathon": EVENTS_DATASET[5].formLink,
  "Esports": EVENTS_DATASET[6].formLink,
  "Esports Arena": EVENTS_DATASET[6].formLink,
  "Photography": EVENTS_DATASET[7].formLink,
  "Visual Echoes": EVENTS_DATASET[7].formLink,
  "SharkTank": EVENTS_DATASET[9].formLink,
  "Generative Media": EVENTS_DATASET[9].formLink,
  "PromptVerse": EVENTS_DATASET[10].formLink,
  "Blind Coding": EVENTS_DATASET[10].formLink,
  "Food Fest": EVENTS_DATASET[11].formLink,
  "Circuit Design": EVENTS_DATASET[11].formLink,
  "CodeFusion": EVENTS_DATASET[12].formLink,
  "Tech Model Expo": EVENTS_DATASET[12].formLink,
  "DeathRace": EVENTS_DATASET[14].formLink,
  "Robo Soccer": EVENTS_DATASET[15].formLink,
  "RoboSoccer": EVENTS_DATASET[15].formLink,
  "DroneCompetition": EVENTS_DATASET[16].formLink,
  "Sustainibility": EVENTS_DATASET[17].formLink,
  "PhysioX": EVENTS_DATASET[18].formLink,
  "Physio x": EVENTS_DATASET[18].formLink,
  "Cysec": EVENTS_DATASET[19].formLink,
  "CySEC": EVENTS_DATASET[19].formLink,
  "CYSEC": EVENTS_DATASET[19].formLink,
  "CulturalEvening": EVENTS_DATASET[20].formLink,
  "CULTURAL Evening": EVENTS_DATASET[20].formLink,
  "Cultural Evening": EVENTS_DATASET[20].formLink,
  "Agomoni": EVENTS_DATASET[20].formLink,
  "agomoni": EVENTS_DATASET[20].formLink,
  "AGOMONI": EVENTS_DATASET[20].formLink,

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
