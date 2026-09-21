import { useState, useCallback } from 'react'
import Navbar from './components/Navbar'
import AnimeIntro from './components/AnimeIntro'
import ZoomingHeroToTimer from './components/ZoomingHeroToTimer'
import Events from './components/Events'
import StarConstellation from './components/StarConstellation'
import PhotoGlobe3D from './components/PhotoGlobe3D'
import Team from './components/Team'
import Footer from './components/Footer'
import FloatingSocials from './components/FloatingSocials'
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
  const [eventsInitialStage, setEventsInitialStage] = useState('outro')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroFinished(true)
  }, [])

  const goToPage = (pageIndex, options = {}) => {
    if (pageIndex === 1 && options.stage) {
      setEventsInitialStage(options.stage)
    } else if (pageIndex === 1 && !options.stage) {
      setEventsInitialStage('outro')
    }

    if (pageIndex === currentPage) {
      if (pageIndex === 1 && options.stage) {
        setEventsInitialStage(options.stage)
      }
      return
    }
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
        
        {/* Floating Social Media Buttons (Left Center: Instagram, Twitter/X, Discord) */}
        <FloatingSocials />
        
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
                initialStage={eventsInitialStage}
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
            <div className="dimension-page-view dimension-page-view--globe">
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
              title="Previous Dimension"
            >
              <span className="dimension-nav-btn__arrow">◀</span>
              <span className="dimension-nav-btn__label">PREV</span>
            </button>

            {/* Right NEXT Button */}
            <button
              type="button"
              className="dimension-nav-btn dimension-nav-btn--next"
              onClick={nextPage}
              title="Next Dimension"
            >
              <span className="dimension-nav-btn__label">NEXT</span>
              <span className="dimension-nav-btn__arrow">▶</span>
            </button>
          </nav>
        )}
      </div>
    </>
  )
}

export default App

