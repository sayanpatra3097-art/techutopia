import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import AnimeIntro from './components/AnimeIntro'
import ZoomingHeroToTimer from './components/ZoomingHeroToTimer'
import Events from './components/Events'
import StarConstellation from './components/StarConstellation'
import PhotoGlobe3D from './components/PhotoGlobe3D'
import Team from './components/Team'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import './App.css'

const DIMENSION_PAGES = [
  { id: 'door-hero', title: 'PORTAL & SHRINE TIMER', shortTitle: 'Shrine Timer', number: '01' },
  { id: 'events', title: 'DUNGEON QUESTS & EVENTS', shortTitle: 'Dungeon Quests', number: '02' },
  { id: 'constellation', title: 'CELESTIAL CONSTELLATION', shortTitle: 'Constellation', number: '03' },
  { id: 'photo-globe', title: '3D PHOTO GLOBE & MEMORIES', shortTitle: 'Photo Globe', number: '04' },
  { id: 'team', title: 'CORE GUILD HASHIRAS', shortTitle: 'Guild Hashiras', number: '05' }
]

function App() {
  const [introFinished, setIntroFinished] = useState(() => {
    try {
      return typeof window !== 'undefined' && sessionStorage.getItem('techutopia_intro_done') === 'true'
    } catch (e) {
      return false
    }
  })

  // 0: Portal & Countdown Timer (ZoomingHeroToTimer)
  // 1: DUNGEON QUESTS & EVENTS (Events) — Opens immediately on clicking explore button
  // 2: CELESTIAL CONSTELLATION (StarConstellation)
  // 3: 3D PHOTO GLOBE (PhotoGlobe3D)
  // 4: CORE GUILD HASHIRAS (Team + Footer)
  const [currentPage, setCurrentPage] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroFinished(true)
  }, [])

  const goToPage = (pageIndex) => {
    if (pageIndex === currentPage) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage(pageIndex)
      window.scrollTo({ top: 0, behavior: 'instant' })
      setTimeout(() => {
        setIsTransitioning(false)
      }, 350)
    }, 200)
  }

  const prevPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage < DIMENSION_PAGES.length - 1) {
      goToPage(currentPage + 1)
    } else {
      goToPage(0)
    }
  }

  return (
    <>
      <CustomCursor />

      {/* 1st Katana cut on black -> 2nd Clouds open -> 3rd TechUtopia text fades in */}
      {!introFinished && (
        <AnimeIntro onComplete={handleIntroComplete} />
      )}

      {/* Smooth dimensional unlock flash/veil on page change */}
      {isTransitioning && <div className="dimensional-unlock-veil" />}

      <div className={`app ${introFinished ? 'app--loaded' : 'app--intro'}`}>
        <Navbar
          currentPage={currentPage}
          onNavigatePage={goToPage}
        />
        
        <main className="dimensions-flow">
          {/* PAGE 0: Landing Experience leading to the King's Royal Scroll Countdown Timer */}
          {currentPage === 0 && (
            <div className="dimension-page-view dimension-page-view--hero">
              <ZoomingHeroToTimer
                isUnlocked={false}
                onExploreMore={() => goToPage(1)}
              />
            </div>
          )}

          {/* PAGE 1: DUNGEON QUESTS & EVENTS (Opens directly on tapping explore button) */}
          {currentPage === 1 && (
            <div className="dimension-page-view dimension-page-view--events">
              <Events
                onNext={nextPage}
                onPrev={prevPage}
              />
            </div>
          )}

          {/* PAGE 2: CELESTIAL CONSTELLATION ITINERARY */}
          {currentPage === 2 && (
            <div className="dimension-page-view">
              <StarConstellation
                onNext={nextPage}
                onPrev={prevPage}
              />
            </div>
          )}

          {/* PAGE 3: 3D PHOTO GLOBE & MEMORIES */}
          {currentPage === 3 && (
            <div className="dimension-page-view">
              <PhotoGlobe3D
                onNext={nextPage}
                onPrev={prevPage}
              />
            </div>
          )}

          {/* PAGE 4: CORE GUILD HASHIRAS & FOOTER */}
          {currentPage === 4 && (
            <div className="dimension-page-view">
              <Team
                onNext={nextPage}
                onPrev={prevPage}
              />
              <Footer />
            </div>
          )}
        </main>

        {/* ───── BOTTOM PREV & NEXT NAVIGATION DOCK (FROM CHRONICLES ONWARDS) ───── */}
        {currentPage >= 1 && (
          <nav className="dimension-bottom-nav" aria-label="Dimension Navigation">
            {/* Left PREV Button */}
            <button
              type="button"
              className="dimension-nav-btn dimension-nav-btn--prev"
              onClick={prevPage}
              title={`Go back to ${DIMENSION_PAGES[currentPage - 1]?.shortTitle || 'Previous'}`}
            >
              <span className="dimension-nav-btn__arrow">◀</span>
              <div className="dimension-nav-btn__text">
                <span className="dimension-nav-btn__sub">PREV</span>
                <span className="dimension-nav-btn__name">
                  {DIMENSION_PAGES[currentPage - 1]?.shortTitle || 'Shrine Portal'}
                </span>
              </div>
            </button>

            {/* Center Dimension Status & Quick Dots */}
            <div className="dimension-nav-indicator">
              <span className="dimension-nav-indicator__pill">
                DIMENSION {DIMENSION_PAGES[currentPage].number} / 05
              </span>
              <span className="dimension-nav-indicator__title">
                {DIMENSION_PAGES[currentPage].title}
              </span>
              <div className="dimension-nav-dots">
                {DIMENSION_PAGES.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`dimension-nav-dot ${currentPage === idx ? 'dimension-nav-dot--active' : ''}`}
                    onClick={() => goToPage(idx)}
                    title={p.title}
                  />
                ))}
              </div>
            </div>

            {/* Right NEXT Button */}
            <button
              type="button"
              className="dimension-nav-btn dimension-nav-btn--next"
              onClick={nextPage}
              title={currentPage === DIMENSION_PAGES.length - 1 ? 'Return to Shrine' : `Proceed to ${DIMENSION_PAGES[currentPage + 1]?.shortTitle}`}
            >
              <div className="dimension-nav-btn__text dimension-nav-btn__text--right">
                <span className="dimension-nav-btn__sub">
                  {currentPage === DIMENSION_PAGES.length - 1 ? 'RESTART' : 'NEXT'}
                </span>
                <span className="dimension-nav-btn__name">
                  {currentPage === DIMENSION_PAGES.length - 1
                    ? 'Shrine Portal ⛩️'
                    : DIMENSION_PAGES[currentPage + 1]?.shortTitle}
                </span>
              </div>
              <span className="dimension-nav-btn__arrow">▶</span>
            </button>
          </nav>
        )}
      </div>
    </>
  )
}

export default App

