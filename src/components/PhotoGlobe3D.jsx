import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import useScrollReveal from '../hooks/useScrollReveal'
import universeBg from '../assets/anime_universe_bg.webp'

// Dynamically import all photos from src/assets/pastphotos
const pastPhotosGlob = import.meta.glob('../assets/pastphotos/*.webp', { eager: true, import: 'default' })

// Curated anime-themed lore captions for the memory fragments
const memoryCaptions = [
  { title: 'MIDNIGHT CODELAB FORGE', caption: '24-hour hackathon warriors writing algorithms under neon lights.' },
  { title: 'SUMO BATTLEBOT ARENA', caption: 'High-torque autonomous combat robots clashing in the steel cage.' },
  { title: 'ESPORTS STAGE CHAMPIONSHIP', caption: 'Packed auditorium cheering during the tactical shooter grand final.' },
  { title: 'LASER NIGHT CONCERT', caption: 'Spectacular beam symphony closing the ceremonies of TechUtopia.' },
  { title: 'NEURAL VR & MIXED REALITY', caption: 'Students testing next-gen spatial computing and neural interfaces.' },
  { title: 'HASHIRA TROPHY CONVOCATION', caption: 'Recognizing supreme university guilds with gold medallions and awards.' },
  { title: 'QUANTUM WEB DEV SPRINT', caption: 'Real-time 3D WebGL interfaces and full-stack battleground.' },
  { title: 'MECHATRONICS WORKSHOP', caption: 'Hands-on assembly of combat microcontrollers and chassis.' },
  { title: 'ANIME COSPLAY MASQUERADE', caption: 'Hunters embodying legendary anime characters across the campus arena.' },
  { title: 'DRONE SWARM OBSTACLE DERBY', caption: 'High-speed FPV racing drones navigating illuminated ring gates.' },
  { title: 'CYBERSECURITY CAPTURE-THE-FLAG', caption: 'Elite white-hat hackers defending servers against penetration.' },
  { title: 'AI GENERATIVE ART SHOWCASE', caption: 'Neural network installations reacting to audience movement.' }
]

const allPastPhotos = Object.entries(pastPhotosGlob)
  .map(([filepath, url], index) => {
    const filename = filepath.split('/').pop() || ''
    const match = filename.match(/^(\d+)\.(png|webp)$/)
    const num = match ? parseInt(match[1], 10) : (index + 1)
    const captionIdx = Math.abs(num - 1) % (memoryCaptions.length || 1)
    const meta = memoryCaptions[captionIdx] || memoryCaptions[0] || { title: 'TECHUTOPIA MEMORY', caption: 'Moments from TechUtopia celebrations.' }
    return {
      id: `${num}-${index}`,
      num,
      filename,
      url,
      title: `${meta.title} • #${String(num).padStart(2, '0')}`,
      caption: meta.caption
    }
  })
  .sort((a, b) => a.num - b.num)

// Texture cache so duplicated photo tiles share the exact same GPU texture
const textureCache = new Map()

function getSharedTexture(url, isMobile) {
  const cacheKey = `${url}_${isMobile ? 'm' : 'd'}`
  if (!textureCache.has(cacheKey)) {
    const loader = new THREE.TextureLoader()
    const tex = loader.load(url)
    tex.colorSpace = THREE.SRGBColorSpace
    if (isMobile) {
      tex.generateMipmaps = false
      tex.minFilter = THREE.LinearFilter
    } else {
      tex.generateMipmaps = true
      tex.minFilter = THREE.LinearMipmapLinearFilter
    }
    textureCache.set(cacheKey, tex)
  }
  return textureCache.get(cacheKey)
}

/* Single Floating Photo Card in 3D Spherical Formation with Golden Trim & Drag-Proof Tap */
function GlobePhotoCard({ photo, position, rotation, w, h, onSelect, isMobile }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const pointerStartRef = useRef({ x: 0, y: 0, time: 0 })

  // Load image texture safely with SRGB color space (cached for duplicate tiles)
  const texture = useMemo(() => {
    return getSharedTexture(photo.url, isMobile)
  }, [photo.url, isMobile])

  return (
    <group position={position} rotation={rotation} ref={groupRef}>
      {/* 3D Photo Plane */}
      <mesh
        scale={hovered ? 1.08 : 1}
        onPointerDown={(e) => {
          pointerStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() }
        }}
        onPointerUp={(e) => {
          const dx = e.clientX - pointerStartRef.current.x
          const dy = e.clientY - pointerStartRef.current.y
          const dist = Math.hypot(dx, dy)
          const elapsed = Date.now() - pointerStartRef.current.time
          // Deliberate tap/click threshold (< 8px movement and < 400ms duration)
          // Ensures dragging to rotate NEVER accidentally triggers modal open!
          if (dist < 8 && elapsed < 400) {
            e.stopPropagation()
            onSelect(photo)
          }
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          if (!isMobile) {
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }
        }}
        onPointerOut={() => {
          if (!isMobile) {
            setHovered(false)
            document.body.style.cursor = 'auto'
          }
        }}
      >
        <planeGeometry args={[w, h]} />
        <meshBasicMaterial map={texture} side={THREE.FrontSide} />

        {/* Glowing Gold Border Trim (HackJKLU Aesthetic) */}
        <mesh position={[0, 0, -0.005]}>
          <planeGeometry args={[w + 0.04, h + 0.04]} />
          <meshBasicMaterial color={hovered ? '#fbbf24' : '#d97706'} transparent opacity={hovered ? 0.95 : 0.65} />
        </mesh>

        {/* Polished Obsidian Backing Plate for Back-Facing Cards */}
        <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[w + 0.04, h + 0.04]} />
          <meshBasicMaterial color="#1a0b04" side={THREE.FrontSide} />
        </mesh>
      </mesh>
    </group>
  )
}

/* 3D Spherical Cluster of Photos (Continuous Left-to-Right Drift & Cosmic Sparkles) */
function GlobeScene({ onSelect, isMobile }) {
  const groupRef = useRef()

  // Sizing and spherical grid configuration (HackJKLU style with negligible spacing)
  const segmentsX = isMobile ? 14 : 18
  const segmentsY = isMobile ? 4 : 5
  const totalSlots = segmentsX * segmentsY
  const radius = isMobile ? 4.5 : 4.85
  const stepThetaDeg = isMobile ? 18 : 17.5
  const stepThetaRad = (stepThetaDeg * Math.PI) / 180
  const wBase = isMobile ? 1.95 : 1.63
  const h = isMobile ? 1.35 : 1.42

  // Duplicate photos cyclically if number of photos is less than totalSlots,
  // ensuring the space between photos is completely filled and negligible.
  const photoSlots = useMemo(() => {
    if (allPastPhotos.length === 0) return []

    const dummy = new THREE.Object3D()

    return Array.from({ length: totalSlots }).map((_, i) => {
      const photo = allPastPhotos[i % allPastPhotos.length]
      const col = i % segmentsX
      const row = Math.floor(i / segmentsX)

      // Horizontal angle around Y axis (0 to 360 deg)
      const phi = (col / segmentsX) * Math.PI * 2
      // Elevation angle from center equator
      const theta = (row - (segmentsY - 1) / 2) * stepThetaRad

      const cosTheta = Math.cos(theta)
      const sinTheta = Math.sin(theta)

      const x = radius * Math.sin(phi) * cosTheta
      const y = radius * sinTheta
      const z = radius * Math.cos(phi) * cosTheta

      // Compute outward orientation pointing away from origin
      dummy.position.set(x, y, z)
      dummy.lookAt(x * 2, y * 2, z * 2)

      // Calculate width adapting to row latitude so gap is uniform and negligible across all rows
      const rowWidth = wBase * cosTheta

      return {
        key: `${photo.id}-slot-${i}`,
        photo,
        pos: [x, y, z],
        rot: [dummy.rotation.x, dummy.rotation.y, dummy.rotation.z],
        w: rowWidth,
        h
      }
    })
  }, [segmentsX, segmentsY, totalSlots, radius, stepThetaRad, wBase, h])

  return (
    <group ref={groupRef}>
      {/* Seamless tightly packed photo globe with negligible gaps */}
      {photoSlots.map((slot) => (
        <GlobePhotoCard
          key={slot.key}
          photo={slot.photo}
          position={slot.pos}
          rotation={slot.rot}
          w={slot.w}
          h={slot.h}
          onSelect={onSelect}
          isMobile={isMobile}
        />
      ))}

      {/* Atmospheric Cosmic Sparkles around the globe (HackJKLU Aesthetic) */}
      <Sparkles
        count={isMobile ? 36 : 75}
        scale={13}
        size={isMobile ? 2.5 : 4}
        speed={0.45}
        color="#ffb703"
        opacity={0.75}
      />
    </group>
  )
}

export default function PhotoGlobe3D() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const containerRef = useRef(null)
  const isVisible = useScrollReveal(containerRef)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 860)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 860)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle ESC key to close modal & lock body scroll when open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null)
      }
    }
    if (selectedPhoto) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedPhoto])

  return (
    <section className="photo-globe-dimension section" id="photo-globe" ref={containerRef}>
      {/* Anime Cosmic Universe Background with fixed positioning */}
      <div
        className="photo-globe__universe-bg"
        style={{ backgroundImage: `url(${universeBg})` }}
      />
      <div className="photo-globe__universe-overlay" />

      <div className="section__container">
        <div className={`fade-in-up ${isVisible ? 'fade-in-up--visible' : ''}`}>
          <h2 className="photo-globe__title">
            CHRONICLES OF PAST GLORY
          </h2>
          <p className="section__subtitle" style={{ textAlign: 'center', margin: '0 auto var(--space-sm)', color: '#fde68a' }}>
            Click to open pic and tap and drag to rotate
          </p>
        </div>

        {/* 3D Canvas Photo Globe Box */}
        <div className="photo-globe__canvas-box">
          <Canvas
            dpr={isMobile ? [1, 1.25] : [1, 1.75]}
            gl={{
              powerPreference: 'high-performance',
              antialias: !isMobile,
              precision: isMobile ? 'mediump' : 'highp',
              depth: true,
              stencil: false,
              alpha: true
            }}
            camera={{ position: [0, 0, isMobile ? 11.8 : 10.5], fov: 48 }}
          >
            <ambientLight intensity={1.5} color="#ffe8d6" />
            <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffb703" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#ff4500" />
            <Suspense fallback={null}>
              <GlobeScene onSelect={setSelectedPhoto} isMobile={isMobile} />
            </Suspense>
            {/* 
              OrbitControls:
              - ONLY tap and drag can rotate the globe (enableRotate={true}, enableZoom={false}, enablePan={false})
              - Continuously moves from left to right via autoRotateSpeed={-1.3}
            */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              autoRotate={true}
              autoRotateSpeed={-1.3}
              rotateSpeed={isMobile ? 0.9 : 0.75}
              dampingFactor={0.06}
              enableDamping={true}
              minPolarAngle={Math.PI * 0.15}
              maxPolarAngle={Math.PI * 0.85}
            />
          </Canvas>
        </div>
      </div>

      {/* Lightbox Modal on Photo Selection (Opens exactly in middle of screen) */}
      {selectedPhoto && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal photo-globe__modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prominent Cross Button to close */}
            <button
              type="button"
              className="modal__close"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo"
              title="Close (Esc or tap outside)"
            >
              ✕
            </button>

            {/* Only title on top: memories to be noticed */}
            <div className="photo-globe__modal-header">
              <h3 className="photo-globe__modal-title">MEMORIES TO BE NOTICED</h3>
            </div>

            {/* The image only, no description */}
            <div className="photo-globe__modal-img-container">
              <img
                src={selectedPhoto.url}
                alt="memories to be noticed"
                className="photo-globe__modal-img"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
