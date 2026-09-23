import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { HISTORY_EDITIONS, sunWebp } from '../data/historyData'
import historyBg from '../assets/history.webp'

// Pure spherical offscreen canvas generator (100% zero background for planets)
const createSphereCanvas = (img, cropFactor = 0.68) => {
  const c = document.createElement('canvas')
  const size = 512
  c.width = size
  c.height = size
  const cCtx = c.getContext('2d')

  const w = img.naturalWidth || 1024
  const h = img.naturalHeight || 1024
  const sw = w * cropFactor
  const sh = h * cropFactor
  const sx = (w - sw) / 2
  const sy = (h - sh) / 2

  // Pure circle clip: anything outside the circle is completely transparent (alpha = 0)
  cCtx.beginPath()
  cCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
  cCtx.clip()

  cCtx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size)
  return c
}

// Seamless equirectangular solar texture generator from sun.webp for 3D sphere mapping
const createSunEquirectangularCanvas = (img) => {
  const c = document.createElement('canvas')
  c.width = 1024
  c.height = 512
  const ctx = c.getContext('2d')

  const coreW = Math.min(img.naturalWidth || 1024, 860)
  const coreH = Math.min(img.naturalHeight || 1024, 860)
  const sx = ((img.naturalWidth || 1024) - coreW) / 2
  const sy = ((img.naturalHeight || 1024) - coreH) / 2

  // Left hemisphere (0 to 512)
  ctx.drawImage(img, sx, sy, coreW, coreH, 0, 0, 512, 512)

  // Right hemisphere mirrored (512 to 1024) for seamless 360-degree rotation around the 3D sphere
  ctx.save()
  ctx.translate(1024, 0)
  ctx.scale(-1, 1)
  ctx.drawImage(img, sx, sy, coreW, coreH, 0, 0, 512, 512)
  ctx.restore()

  return c
}

// Seamless equirectangular texture generator for 3D planet sphere mapping
const createPlanetEquirectangularCanvas = (img, cropFactor = 0.70) => {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 256
  const ctx = c.getContext('2d')

  const w = img.naturalWidth || 512
  const h = img.naturalHeight || 512
  const sw = w * cropFactor
  const sh = h * cropFactor
  const sx = (w - sw) / 2
  const sy = (h - sh) / 2

  // Left hemisphere (0 to 256)
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 256, 256)

  // Right hemisphere mirrored (256 to 512) for seamless 360-degree sphere rotation
  ctx.save()
  ctx.translate(512, 0)
  ctx.scale(-1, 1)
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 256, 256)
  ctx.restore()

  return c
}

export default function HistoryPage({ onBack, onOpenSponsors, onOpenFaq }) {
  const [activeIndex, setActiveIndex] = useState(0)
  // Animation states: 'idle' | 'exit' | 'enter'
  const [animState, setAnimState] = useState('idle')
  const containerRef = useRef(null)

  // Ref tracking for canvas loop so canvas never needs to restart on state change
  const activeIndexRef = useRef(0)
  activeIndexRef.current = activeIndex

  // Progress references for smooth scroll-driven revolution
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const lastScrollTime = useRef(0)
  const touchStartY = useRef(0)
  const canvasRef = useRef(null)

  // Cached pure sphere textures (loaded once, zero square backgrounds)
  const sphereCanvasesRef = useRef({})
  // Three.js 3D rotating Sun model ref
  const threeSunRef = useRef(null)
  // Three.js 3D rotating Planets models ref
  const threePlanetsRef = useRef(null)
  // Dynamic asteroid belt particles (between 2nd last and last planet)
  const asteroidsRef = useRef([])

  // Preload sun.webp, planet sphere canvases, edition images, and asteroid belt once on mount
  useEffect(() => {
    // Eagerly pre-decode all edition photos for all 4 years into GPU memory for instant display
    HISTORY_EDITIONS.forEach((ed) => {
      if (!ed.images) return
      Object.values(ed.images).forEach((url) => {
        if (!url) return
        const img = new Image()
        img.src = url
        if (img.decode) img.decode().catch(() => {})
      })
    })

    // 1. Initialize 3D model of the Sun using Three.js and sun.webp
    const sunImg = new Image()
    sunImg.crossOrigin = 'anonymous'
    const onSunDone = () => {
      sphereCanvasesRef.current.sun = sunImg

      try {
        const texCanvas = createSunEquirectangularCanvas(sunImg)
        const sunTexture = new THREE.CanvasTexture(texCanvas)
        sunTexture.wrapS = THREE.RepeatWrapping
        sunTexture.wrapT = THREE.ClampToEdgeWrapping
        sunTexture.colorSpace = THREE.SRGBColorSpace

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
        renderer.setSize(512, 512)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        renderer.outputColorSpace = THREE.SRGBColorSpace

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
        // Set camera distance to 3.65 so the sphere and glow have ample padding and never clip flat on any side
        camera.position.z = 3.65

        // Inner glowing solar 3D sphere
        const sunGeo = new THREE.SphereGeometry(1, 64, 64)
        const sunMat = new THREE.MeshBasicMaterial({
          map: sunTexture,
        })
        const sunMesh = new THREE.Mesh(sunGeo, sunMat)
        scene.add(sunMesh)

        // Outer atmospheric plasma glow shell
        const atmoGeo = new THREE.SphereGeometry(1.025, 48, 48)
        const atmoMat = new THREE.ShaderMaterial({
          vertexShader: `
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
              gl_FragColor = vec4(1.0, 0.62, 0.12, 1.0) * intensity * 1.6;
            }
          `,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
          transparent: true,
        })
        const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat)
        scene.add(atmoMesh)

        threeSunRef.current = { renderer, scene, camera, sunMesh, atmoMesh }
      } catch (err) {
        console.warn('Three.js 3D Sun initialization fallback:', err)
      }
    }
    sunImg.onload = onSunDone
    sunImg.src = sunWebp
    if (sunImg.complete && sunImg.naturalWidth > 0) {
      onSunDone()
    }

    // 2. Initialize dynamic asteroid belt between 2nd last (planet 2) and last (planet 3)
    const asteroidCount = 140
    const astList = []
    for (let i = 0; i < asteroidCount; i++) {
      astList.push({
        angle: Math.random() * Math.PI * 2,
        speed: 0.0010 + Math.random() * 0.0016,
        spanT: Math.random(),
        zJitter: (Math.random() - 0.5) * 12,
        size: Math.random() * 2.2 + 0.9,
        color: ['#e4d5c3', '#cfbda8', '#a8947f', '#f5ece1', '#857565', '#d6a97a'][Math.floor(Math.random() * 6)],
        alpha: Math.random() * 0.45 + 0.35
      })
    }
    asteroidsRef.current = astList

    // 3. Initialize Three.js renderer for 3D rotating planets
    try {
      const planetRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      planetRenderer.setSize(256, 256)
      planetRenderer.outputColorSpace = THREE.SRGBColorSpace
      const planetScene = new THREE.Scene()
      const planetCamera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
      // Camera distance 3.2 leaves ~15% padding in 256x256 buffer for 100% circular silhouette
      planetCamera.position.z = 3.2

      threePlanetsRef.current = {
        renderer: planetRenderer,
        scene: planetScene,
        camera: planetCamera,
        meshes: {},
        canvases: {}
      }
    } catch (err) {
      console.warn('Three.js Planet initialization fallback:', err)
    }

    // 4. Crop each planet tightly (0.68) and build 3D rotating planet models
    const loadPlanetSphere = (key, src) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      const onDone = () => {
        sphereCanvasesRef.current[key] = createSphereCanvas(img, 0.68)

        if (threePlanetsRef.current) {
          try {
            const texCanvas = createPlanetEquirectangularCanvas(img, 0.70)
            const texture = new THREE.CanvasTexture(texCanvas)
            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.ClampToEdgeWrapping
            texture.colorSpace = THREE.SRGBColorSpace

            const geo = new THREE.SphereGeometry(1, 48, 48)
            const mat = new THREE.MeshBasicMaterial({ map: texture })
            const mesh = new THREE.Mesh(geo, mat)
            // Realistic planetary axial tilt (like Earth's 23.5-degree tilt)
            mesh.rotation.z = 0.22
            threePlanetsRef.current.meshes[key] = mesh

            const outCanvas = document.createElement('canvas')
            outCanvas.width = 256
            outCanvas.height = 256
            threePlanetsRef.current.canvases[key] = outCanvas
          } catch (e) {
            console.warn('3D Planet texture mapping fallback:', e)
          }
        }
      }
      img.onload = onDone
      img.src = src
      if (img.complete && img.naturalWidth > 0) {
        onDone()
      }
    }

    HISTORY_EDITIONS.forEach((ed) => {
      if (ed.planet.image) {
        loadPlanetSphere(ed.id, ed.planet.image)
      }
    })

    return () => {
      if (threeSunRef.current) {
        try {
          threeSunRef.current.renderer.dispose()
        } catch (e) { }
        threeSunRef.current = null
      }
      if (threePlanetsRef.current) {
        try {
          threePlanetsRef.current.renderer.dispose()
        } catch (e) { }
        threePlanetsRef.current = null
      }
    }
  }, [])

  const currentEdition = HISTORY_EDITIONS[activeIndex] || HISTORY_EDITIONS[0]

  // Transition: Animate to middle and fade out -> new images & text bloom from middle with fade in
  const goToIndex = useCallback((targetIdx) => {
    if (targetIdx === activeIndexRef.current) return

    // Phase 1: Animate current items towards the middle and fade out
    setAnimState('exit')
    targetProgressRef.current = targetIdx

    setTimeout(() => {
      // Phase 2: Switch active edition and prepare incoming items collapsed at middle
      setActiveIndex(targetIdx)
      setAnimState('enter')

      // Phase 3: Transition new items from the middle outward to resting spots with fade in
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimState('idle')
        })
      })
    }, 340)
  }, [])

  // Continuous infinite looping wheel/touch scroll
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      const now = Date.now()
      if (now - lastScrollTime.current < 340) return

      if (e.deltaY > 15) {
        lastScrollTime.current = now
        const next = (activeIndexRef.current + 1) % HISTORY_EDITIONS.length
        goToIndex(next)
      } else if (e.deltaY < -15) {
        lastScrollTime.current = now
        const prev = (activeIndexRef.current - 1 + HISTORY_EDITIONS.length) % HISTORY_EDITIONS.length
        goToIndex(prev)
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const next = (activeIndexRef.current + 1) % HISTORY_EDITIONS.length
        goToIndex(next)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const prev = (activeIndexRef.current - 1 + HISTORY_EDITIONS.length) % HISTORY_EDITIONS.length
        goToIndex(prev)
      } else if (e.key === 'Escape' && onBack) {
        onBack()
      }
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      const now = Date.now()
      if (now - lastScrollTime.current < 340) return
      const touchEndY = e.changedTouches[0].clientY
      const diff = touchStartY.current - touchEndY

      if (diff > 30) {
        lastScrollTime.current = now
        const next = (activeIndexRef.current + 1) % HISTORY_EDITIONS.length
        goToIndex(next)
      } else if (diff < -30) {
        lastScrollTime.current = now
        const prev = (activeIndexRef.current - 1 + HISTORY_EDITIONS.length) % HISTORY_EDITIONS.length
        goToIndex(prev)
      }
    }

    const el = containerRef.current || window
    el.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [goToIndex, onBack])

  // Canvas Solar System Rendering:
  // - Background moving stars
  // - 4 Distinct elliptical orbits around the Sun (RESTORED and clearly visible)
  // - Pure Sun & Planet spheres with ZERO background (transparent offscreen canvas crop)
  // - NO border strokes around Sun or planets
  // - 3D occlusion: back planets pass behind the Sun
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let isRunning = true

    // Generate animated moving stars in the background
    const starCount = 160
    const stars = []
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * 2000,
        y: Math.random() * 1200,
        size: Math.random() * 1.8 + 0.5,
        speed: Math.random() * 0.35 + 0.1,
        baseAlpha: Math.random() * 0.65 + 0.25,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      })
    }

    const resize = () => {
      if (!canvas.parentElement) return
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const totalEditions = HISTORY_EDITIONS.length

    const render = () => {
      if (!isRunning) return

      // Smooth lerp towards target progress on scroll
      const diff = targetProgressRef.current - currentProgressRef.current
      currentProgressRef.current += diff * 0.085

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width * 0.5
      const isMobile = canvas.width <= 768
      // On mobile, keep Sun and planets dead-center in the middle; on desktop slightly lower
      const centerY = isMobile ? canvas.height * 0.50 : canvas.height * 0.54

      // ─── 0. DRAW MOVING STARRY BACKGROUND ───
      ctx.save()
      stars.forEach((star) => {
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }
        star.twinklePhase += star.twinkleSpeed
        const alpha = star.baseAlpha * (0.7 + 0.3 * Math.sin(star.twinklePhase))

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.restore()

      // Responsive scale (tuned for desktop and compact mobile screens)
      const baseScale = isMobile
        ? Math.min(0.58, Math.max(0.40, canvas.width / 750))
        : Math.min(1.2, Math.max(0.85, canvas.width / 1300))

      // Sun radius
      const sunRadius = 175 * baseScale

      // Orbits scale factors: on mobile compress horizontal reach so entire system fits inside screen
      const rxScale = isMobile ? 0.52 : 1.0
      const ryScale = isMobile ? 0.55 : 1.0

      // 4 Distinct Elliptical Orbits (Side-view perspective, lined one after another)
      const orbits = [
        { rx: 375 * baseScale * rxScale, ry: 64 * baseScale * ryScale },
        { rx: 500 * baseScale * rxScale, ry: 92 * baseScale * ryScale },
        { rx: 630 * baseScale * rxScale, ry: 122 * baseScale * ryScale },
        { rx: 780 * baseScale * rxScale, ry: 154 * baseScale * ryScale }
      ]

      // Asteroid belt swath boundaries between Orbit 2 (2nd last planet) and Orbit 3 (last planet)
      const orb2 = orbits[2]
      const orb3 = orbits[3]
      const beltInnerRx = orb2.rx + (orb3.rx - orb2.rx) * 0.28
      const beltOuterRx = orb2.rx + (orb3.rx - orb2.rx) * 0.76
      const beltInnerRy = orb2.ry + (orb3.ry - orb2.ry) * 0.28
      const beltOuterRy = orb2.ry + (orb3.ry - orb2.ry) * 0.76

      // Helper to render the dynamic asteroid belt (always moving!)
      const drawAsteroidBelt = (drawBackHalf) => {
        ctx.save()
        asteroidsRef.current.forEach((ast) => {
          // Continuous orbit motion always
          ast.angle += ast.speed

          const isBack = Math.sin(ast.angle) < 0
          if (isBack !== drawBackHalf) return

          const curRx = beltInnerRx + (beltOuterRx - beltInnerRx) * ast.spanT
          const curRy = beltInnerRy + (beltOuterRy - beltInnerRy) * ast.spanT

          const ax = centerX + curRx * Math.cos(ast.angle)
          const ay = centerY + curRy * Math.sin(ast.angle) + ast.zJitter * baseScale

          ctx.fillStyle = ast.color
          ctx.globalAlpha = ast.alpha * (isBack ? 0.45 : 0.85)
          ctx.beginPath()
          ctx.arc(ax, ay, ast.size * baseScale, 0, Math.PI * 2)
          ctx.fill()
        })
        ctx.restore()
      }

      const currentActiveIdx = activeIndexRef.current

      // Helper function to render a pure planet sphere (NO borders, NO image background)
      const drawPlanet = (ed, idx, orb, px, py, isBack) => {
        const cachedSphere = sphereCanvasesRef.current[ed.id]

        // 3D side-view perspective depth factor: front planets are closer and larger, rear are farther
        const depthFactor = isBack ? 0.72 : 1.26
        const planetRadius = (ed.planet.size * 1.05 * baseScale) * depthFactor

        // 1. Subtle soft rim glow behind the planet (significantly lowered glow effect)
        ctx.save()
        ctx.globalAlpha = isBack ? 0.20 : 0.40
        const pGlowGrad = ctx.createRadialGradient(
          px,
          py,
          planetRadius * 0.65,
          px,
          py,
          planetRadius * 1.35
        )
        pGlowGrad.addColorStop(0, ed.planet.glow || 'rgba(56, 189, 248, 0.40)')
        pGlowGrad.addColorStop(0.55, ed.planet.color || 'rgba(56, 189, 248, 0.20)')
        pGlowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = pGlowGrad
        ctx.beginPath()
        ctx.arc(px, py, planetRadius * 1.35, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // 2. Pure circular sphere clipping (guarantees NO square background)
        ctx.save()
        ctx.beginPath()
        ctx.arc(px, py, planetRadius, 0, Math.PI * 2)
        ctx.clip()

        const rotatingPlanet = threePlanetsRef.current?.canvases[ed.id]
        const sphereImg = rotatingPlanet || cachedSphere

        if (sphereImg) {
          // Camera distance 3.2 leaves ~15% padding in 256x256 buffer for 100% round silhouette
          const drawDiameter = rotatingPlanet ? (planetRadius * 2) / 0.85 : (planetRadius * 2)
          ctx.drawImage(
            sphereImg,
            px - drawDiameter / 2,
            py - drawDiameter / 2,
            drawDiameter,
            drawDiameter
          )
        } else {
          // Fallback realistic procedural shading
          const planetGrad = ctx.createRadialGradient(
            px - planetRadius * 0.3,
            py - planetRadius * 0.3,
            planetRadius * 0.1,
            px,
            py,
            planetRadius
          )
          planetGrad.addColorStop(0, '#ffffff')
          planetGrad.addColorStop(0.25, ed.planet.color)
          planetGrad.addColorStop(0.7, '#140e14')
          planetGrad.addColorStop(1, '#050305')
          ctx.fillStyle = planetGrad
          ctx.fill()
        }

        // Realistic 3D Shading Overlay (Light radiates outward from Sun at center)
        const lightAngle = Math.atan2(py - centerY, px - centerX)
        const shadowGrad = ctx.createLinearGradient(
          px - Math.cos(lightAngle) * planetRadius,
          py - Math.sin(lightAngle) * planetRadius,
          px + Math.cos(lightAngle) * planetRadius,
          py + Math.sin(lightAngle) * planetRadius
        )
        shadowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)')
        shadowGrad.addColorStop(0.52, 'rgba(0, 0, 0, 0)')
        shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.72)')
        ctx.fillStyle = shadowGrad
        ctx.fill()

        ctx.restore() // End planet clipping (NO border strokes)
      }

      // Calculate 2D position and depth for each planet
      const planetPositions = HISTORY_EDITIONS.map((ed, idx) => {
        const orb = orbits[idx] || orbits[0]
        const angleOffset = (idx - currentProgressRef.current) * ((Math.PI * 2) / totalEditions)
        // Middle-bottom is angle = Math.PI / 2
        const planetAngle = (Math.PI / 2) + angleOffset

        const cosA = Math.cos(planetAngle)
        const sinA = Math.sin(planetAngle)
        const px = centerX + orb.rx * cosA
        const py = centerY + orb.ry * sinA

        // When sinA < 0 (i.e. py < centerY), the planet is in the back half of orbit (behind the Sun!)
        const isBack = sinA < 0

        return { ed, idx, orb, px, py, isBack, planetAngle }
      })

      // ─── ROTATE 3D PLANET MODELS (LIKE THE SUN, BUT MORE SLOWLY — ESPECIALLY ON FRONT PLANETS) ───
      if (threePlanetsRef.current && threePlanetsRef.current.renderer) {
        const { renderer, scene, camera, meshes, canvases } = threePlanetsRef.current
        planetPositions.forEach((p) => {
          const mesh = meshes[p.ed.id]
          const outCanvas = canvases[p.ed.id]
          if (!mesh || !outCanvas) return

          // The Sun rotates at 0.0018 rad/frame.
          // Planets rotate like the Sun but more slowly:
          // Front planets rotate at a steady, majestic pace (~0.00075 rad/frame, ~40% of Sun's speed)
          const rotSpeed = p.isBack ? 0.0010 : 0.00075
          mesh.rotation.y += rotSpeed

          scene.clear()
          scene.add(mesh)
          try {
            renderer.render(scene, camera)
            const outCtx = outCanvas.getContext('2d')
            outCtx.clearRect(0, 0, 256, 256)
            outCtx.drawImage(renderer.domElement, 0, 0)
          } catch (e) { }
        })
      }

      // ─── STEP 1: DRAW BACK HALF OF ORBIT TRAILS & REAR ASTEROIDS (py < centerY) ───
      // Reduced opacity for subtle, sleek orbital tracks
      orbits.forEach((orb, i) => {
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.beginPath()
        // Upper/back arc: PI to 2*PI
        ctx.ellipse(0, 0, orb.rx, orb.ry, 0, Math.PI, Math.PI * 2)
        const isActive = i === currentActiveIdx
        ctx.strokeStyle = isActive
          ? 'rgba(251, 191, 36, 0.38)'
          : 'rgba(255, 255, 255, 0.12)'
        ctx.lineWidth = isActive ? 1.4 : 0.8
        ctx.stroke()
        ctx.restore()
      })

      // Draw rear asteroids (behind the Sun)
      drawAsteroidBelt(true)

      // ─── STEP 2: DRAW BACK PLANETS (BEHIND THE SUN) ───
      // When rear planets travel behind the Sun, they are drawn here and then
      // covered/hidden by the Sun image in Step 3!
      planetPositions.forEach((p) => {
        if (p.isBack) {
          drawPlanet(p.ed, p.idx, p.orb, p.px, p.py, true)
        }
      })

      // ─── STEP 3: DRAW SUN GLOW & 3D ROTATING SUN MODEL (FLAWLESSLY ROUND, NO FLAT EDGES) ───
      // Rotate 3D Sun model continuously very slowly
      if (threeSunRef.current) {
        threeSunRef.current.sunMesh.rotation.y += 0.0018
        if (threeSunRef.current.atmoMesh) {
          threeSunRef.current.atmoMesh.rotation.y -= 0.001
        }
        try {
          threeSunRef.current.renderer.render(
            threeSunRef.current.scene,
            threeSunRef.current.camera
          )
        } catch (e) { }
      }

      // Warm reddish-yellow glowing aura behind the sun
      ctx.save()
      const auraGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        sunRadius * 0.45,
        centerX,
        centerY,
        sunRadius * 1.85
      )
      auraGrad.addColorStop(0, 'rgba(255, 200, 50, 0.75)')
      auraGrad.addColorStop(0.35, 'rgba(255, 120, 0, 0.48)')
      auraGrad.addColorStop(0.7, 'rgba(220, 38, 38, 0.25)')
      auraGrad.addColorStop(1, 'rgba(220, 38, 38, 0)')
      ctx.fillStyle = auraGrad
      ctx.beginPath()
      ctx.arc(centerX, centerY, sunRadius * 1.85, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Draw 3D Sun model (or 2D sun.webp fallback) — occludes back planets & back asteroids
      if (threeSunRef.current && threeSunRef.current.renderer) {
        // Since camera.z = 3.65, the sphere occupies 74% of the 512x512 canvas with zero flat edge clipping
        const drawDiameter = (sunRadius * 2) / 0.74
        ctx.drawImage(
          threeSunRef.current.renderer.domElement,
          centerX - drawDiameter / 2,
          centerY - drawDiameter / 2,
          drawDiameter,
          drawDiameter
        )
      } else {
        const cachedSun = sphereCanvasesRef.current.sun
        if (cachedSun) {
          ctx.drawImage(
            cachedSun,
            centerX - sunRadius,
            centerY - sunRadius,
            sunRadius * 2,
            sunRadius * 2
          )
        } else {
          const fallbackSun = ctx.createRadialGradient(
            centerX - sunRadius * 0.25,
            centerY - sunRadius * 0.25,
            sunRadius * 0.1,
            centerX,
            centerY,
            sunRadius
          )
          fallbackSun.addColorStop(0, '#ffffff')
          fallbackSun.addColorStop(0.25, '#fef08a')
          fallbackSun.addColorStop(0.55, '#f59e0b')
          fallbackSun.addColorStop(0.85, '#d97706')
          fallbackSun.addColorStop(1, '#92400e')
          ctx.fillStyle = fallbackSun
          ctx.beginPath()
          ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // ─── STEP 4: DRAW FRONT HALF OF ORBIT TRAILS & FRONT ASTEROIDS (py >= centerY) ───
      // Reduced opacity for subtle, sleek orbital tracks
      orbits.forEach((orb, i) => {
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.beginPath()
        // Lower/front arc: 0 to PI
        ctx.ellipse(0, 0, orb.rx, orb.ry, 0, 0, Math.PI)
        const isActive = i === currentActiveIdx
        ctx.strokeStyle = isActive
          ? 'rgba(251, 191, 36, 0.55)'
          : 'rgba(255, 255, 255, 0.18)'
        ctx.lineWidth = isActive ? 1.6 : 1.0
        ctx.stroke()
        ctx.restore()
      })

      // Draw front asteroids (in front of the Sun)
      drawAsteroidBelt(false)

      // ─── STEP 5: DRAW FRONT PLANETS (IN FRONT OF THE SUN) ───
      // Active planet comes right in front of the Sun with full brilliant glow
      planetPositions.forEach((p) => {
        if (!p.isBack) {
          drawPlanet(p.ed, p.idx, p.orb, p.px, p.py, false)
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      isRunning = false
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="history-page" ref={containerRef}>
      {/* 1. Background Image (history.webp) with stars animating above it */}
      <div
        className="history-page__bg"
        style={{ backgroundImage: `url(${historyBg})` }}
      />

      {/* 2. Top Header: Centered "HISTORY" Title with clear readable font and NO border */}
      <header className="history-page__top-center-header">
        <h1 className="history-page__title">HISTORY</h1>
      </header>

      {/* 3. Central Canvas: Moving Stars, Restored Orbits, Pure Sun & Planet Spheres (No borders) */}
      <div className="history-page__solar-canvas-wrap">
        <canvas ref={canvasRef} className="history-page__solar-canvas" />
      </div>

      {/* 4. Content Stage: Animate to Middle & Fade Out / Come from Middle & Fade In */}
      <main className={`history-page__scatter-stage anim-${animState}`}>
        {/* Item 1: Top Left Horizontal Image */}
        <div className="history-scatter-item history-scatter-item--left-top">
          <div className="history-frame">
            <img
              src={currentEdition.images.leftTop}
              alt="Archive highlight"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Item 2: Bottom Left Tall Vertical Image */}
        <div className="history-scatter-item history-scatter-item--left-bottom">
          <div className="history-frame">
            <img
              src={currentEdition.images.leftBottom}
              alt="Festival chronicle"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Item 3: Top Right Horizontal Image */}
        <div className="history-scatter-item history-scatter-item--right-top">
          <div className="history-frame">
            <img
              src={currentEdition.images.rightTop}
              alt="Edition event"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Item 4: Right Text with light translucent black backdrop */}
        <div className="history-scatter-item history-scatter-item--right-text">
          <div className="history-text-backdrop">
            <h2 className="history-year-bold">{currentEdition.year}</h2>
            <p className="history-desc-clean">{currentEdition.description}</p>
          </div>
        </div>

        {/* Item 5: Bottom Right Horizontal Image */}
        <div className="history-scatter-item history-scatter-item--right-bottom">
          <div className="history-frame">
            <img
              src={currentEdition.images.rightBottom}
              alt="Celebration moment"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>
      </main>

      {/* 5. Bottom Navigation Elements (NO footer bar) */}
      {/* Left Bottom Corner: PORTAL Back Button */}
      <button
        type="button"
        className="history-corner-portal-btn"
        onClick={onBack}
        aria-label="Back to festival portal"
      >
        <span className="portal-arrow">←</span>
        <span className="portal-text">BACK</span>
      </button>

      {/* Bottom Middle: Scroll Text lined up with PORTAL button (No mouse icon) */}
      <div className="history-bottom-middle-scroll">
        <span className="scroll-text-label">SCROLL OR USE ARROW KEYS TO REVOLVE</span>
      </div>
    </div>
  )
}
