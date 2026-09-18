import { createContext, useContext } from 'react'

/**
 * =========================================================================
 * TECHUTOPIA GOOGLE FORM LINKS CONFIGURATION
 * =========================================================================
 * You can edit any Google Form URL here anytime.
 * Each event card has its own dedicated form link, and the last card
 * (Corridor Finale End Board) has its own separate form link as well.
 * =========================================================================
 */

// Fallback Google Form link if a specific event link is not found
export const DEFAULT_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm/viewform"

// Dedicated Google Form link for the LAST CARD (Corridor End Board - "ALL 14 QUESTS EXPLORED")
export const LAST_CARD_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_FinaleAllEvents/viewform"

// Individual Google Form links for every event card (by ID or Title)
export const EVENT_FORM_LINKS = {
  // Event 1: Robo Mania
  1: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_RoboMania/viewform",
  "Robo Mania": "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_RoboMania/viewform",

  // Event 2: Gravity Zone
  2: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_GravityZone/viewform",
  "Gravity Zone": "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_GravityZone/viewform",

  // Event 3: Physio Event
  3: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_PhysioEvent/viewform",
  "Physio Event": "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_PhysioEvent/viewform",

  // Event 4: TechVenture
  4: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_TechVenture/viewform",
  "TechVenture": "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_TechVenture/viewform",

  // Event 5: Launchpad
  5: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_Launchpad/viewform",
  "Launchpad": "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_Launchpad/viewform",

  // Event 6: Hackathon (24hr)
  6: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_Hackathon/viewform",
  "Hackathon (24hr)": "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_Hackathon/viewform",

  // Event 7: Esports Championship
  7: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_Esports/viewform",
  "Esports Championship": "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_Esports/viewform",

  // Event 8: Photography
  8: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_Photography/viewform",
  "Photography": "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_Photography/viewform",

  // Event 9: Bridge Building
  9: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_BridgeBuilding/viewform",
  "Bridge Building": "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_BridgeBuilding/viewform",

  // Event 10: Generative Media
  10: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_GenerativeMedia/viewform",
  "Generative Media": "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_GenerativeMedia/viewform",

  // Event 11: Blind Coding
  11: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_BlindCoding/viewform",
  "Blind Coding": "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_BlindCoding/viewform",

  // Event 12: Circuit Design
  12: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_CircuitDesign/viewform",
  "Circuit Design": "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_CircuitDesign/viewform",

  // Event 13: Tech Model Expo
  13: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_TechModelExpo/viewform",
  "Tech Model Expo": "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_TechModelExpo/viewform",

  // Event 14: Fashion Carnival
  14: "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_FashionCarnival/viewform",
  "Fashion Carnival": "https://docs.google.com/forms/d/e/1FAIpQLScTechUtopiaSampleForm_FashionCarnival/viewform",

  // Last Card / Finale Sanctuary
  "last_card": LAST_CARD_FORM_LINK,
  "end_board": LAST_CARD_FORM_LINK
}

/**
 * Helper function to retrieve the appropriate Google Form link.
 * Pass in an event object, event id (1..14), or event title.
 * For the last card / end board, pass 'last_card' or 'end_board'.
 */
export function getEventFormLink(eventOrId) {
  if (!eventOrId) return DEFAULT_FORM_LINK

  // Special key for last card / end board
  if (eventOrId === 'last_card' || eventOrId === 'end_board') {
    return LAST_CARD_FORM_LINK
  }

  // If passed an event object: { id: 1, title: 'Robo Mania', ... }
  if (typeof eventOrId === 'object') {
    if (eventOrId.id && EVENT_FORM_LINKS[eventOrId.id]) {
      return EVENT_FORM_LINKS[eventOrId.id]
    }
    if (eventOrId.title && EVENT_FORM_LINKS[eventOrId.title]) {
      return EVENT_FORM_LINKS[eventOrId.title]
    }
    return DEFAULT_FORM_LINK
  }

  // If passed an id number or string key
  if (EVENT_FORM_LINKS[eventOrId]) {
    return EVENT_FORM_LINKS[eventOrId]
  }

  return DEFAULT_FORM_LINK
}

// React Context & Provider for optional context consumption
export const EventFormsContext = createContext({
  formLinks: EVENT_FORM_LINKS,
  lastCardFormLink: LAST_CARD_FORM_LINK,
  defaultFormLink: DEFAULT_FORM_LINK,
  getEventFormLink
})

export function EventFormsProvider({ children }) {
  return (
    <EventFormsContext.Provider
      value={{
        formLinks: EVENT_FORM_LINKS,
        lastCardFormLink: LAST_CARD_FORM_LINK,
        defaultFormLink: DEFAULT_FORM_LINK,
        getEventFormLink
      }}
    >
      {children}
    </EventFormsContext.Provider>
  )
}

export function useEventForms() {
  return useContext(EventFormsContext)
}

export default getEventFormLink
