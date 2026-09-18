import { useRef, useState, useEffect } from 'react'

export default function Preloader() {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setExiting(true), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`preloader ${exiting ? 'preloader--exit' : ''}`}>
      <div className="preloader__logo">TECHUTOPIA</div>
      <div className="preloader__bar-track">
        <div className="preloader__bar-fill" />
      </div>
      <div className="preloader__text">Initializing Portal...</div>
    </div>
  )
}
