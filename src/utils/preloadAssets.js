/**
 * High-performance asset preloader & cache warmer.
 * Warms browser HTTP cache and decodes textures into GPU memory during idle cycles,
 * ensuring instantaneous page and modal transitions across the entire site.
 */

import { HISTORY_EDITIONS, sunWebp } from '../data/historyData'
import historyBg from '../assets/history.webp'
import animeEventBg from '../assets/anime_event_bg.webp'
import animeSkyBg from '../assets/anime_sky_bg.webp'
import animeUniverseBg from '../assets/anime_universe_bg.webp'
import coreTeamBg from '../assets/core_team.webp'
import sponsorsBg from '../assets/sponsors_bg.webp'
import faqBg from '../assets/faq_bg.webp'
import soloMonarchImg from '../assets/solo_monarch_globe.webp'
import { EVENTS_DATASET } from '../context/eventForms'

const cachedImages = new Set()

export function preloadImage(src) {
  if (!src || cachedImages.has(src)) return Promise.resolve()
  cachedImages.add(src)

  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    if (img.decode) {
      img.decode().then(resolve).catch(resolve)
    } else {
      img.onload = resolve
      img.onerror = resolve
    }
  })
}

/**
 * Preload all images used across the History dimension (editions, background, sun & planets).
 */
export function preloadHistoryAssets() {
  const urls = [historyBg, sunWebp]

  HISTORY_EDITIONS.forEach((ed) => {
    if (ed.images) {
      Object.values(ed.images).forEach((url) => {
        if (url) urls.push(url)
      })
    }
    if (ed.planet?.image) {
      urls.push(ed.planet.image)
    }
  })

  return Promise.allSettled(urls.map(preloadImage))
}

/**
 * Preload major section background wallpapers.
 */
export function preloadDimensionBackgrounds() {
  const bgUrls = [
    animeEventBg,
    animeSkyBg,
    animeUniverseBg,
    coreTeamBg,
    sponsorsBg,
    faqBg,
    soloMonarchImg
  ]
  return Promise.allSettled(bgUrls.map(preloadImage))
}

/**
 * Preload all event card artworks.
 */
export function preloadEventArtworks() {
  const eventUrls = EVENTS_DATASET.map((ev) => ev.image).filter(Boolean)
  return Promise.allSettled(eventUrls.map(preloadImage))
}

/**
 * Progressive cache warmer: loads History assets first (top priority),
 * then dimension wallpapers and event cards when the browser is idle.
 */
export function preloadSecondaryAssets() {
  // 1. History assets first (critical request from user)
  preloadHistoryAssets().then(() => {
    // 2. Section backgrounds
    preloadDimensionBackgrounds().then(() => {
      // 3. Event card artworks
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => preloadEventArtworks(), { timeout: 3000 })
      } else {
        setTimeout(preloadEventArtworks, 1200)
      }
    })
  })
}
