import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Disable on touch / mobile devices to prevent frame lag and save CPU
    const isTouch = typeof window !== 'undefined' && (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches
    )
    if (isTouch) return

    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let mouseX = 0, mouseY = 0
    let cursorX = 0, cursorY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top = mouseY + 'px'
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      cursor.style.left = cursorX + 'px'
      cursor.style.top = cursorY + 'px'
      requestAnimationFrame(animate)
    }

    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, .event-card, .team-card, .gallery__item, .navbar__link')
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => setIsHovering(true))
        el.addEventListener('mouseleave', () => setIsHovering(false))
      })
    }

    document.addEventListener('mousemove', onMouseMove)
    animate()

    // Delay to let DOM render
    const timeout = setTimeout(addHoverListeners, 3000)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'custom-cursor--hover' : ''}`}
      />
      <div ref={dotRef} className="custom-cursor__dot" />
    </>
  )
}
