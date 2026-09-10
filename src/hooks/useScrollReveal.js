import { useState, useEffect, useRef } from 'react'

export default function useScrollReveal(ref, threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])

  return isVisible
}
