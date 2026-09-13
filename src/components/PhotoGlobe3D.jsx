import { useRef, useState, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import useScrollReveal from '../hooks/useScrollReveal'
import universeBg from '../assets/anime_universe_bg.webp'

// Dynamically import all 41 photos from src/assets/pastphotos
const pastPhotosGlob = import.meta.glob('../assets/pastphotos/*.webp', { eager: true, import: 'default' })

// Curated anime-themed lore captions for the memory fragments
const memoryCaptions = [
  { title: 'MIDNIGHT CODELAB FORGE', caption: '24-hour hackathon warriors writing algorithms under neon lights.' },
  { title: 'SUMO BATTLEBOT ARENA', caption: 'High-torque autonomous combat robots clashing in the steel cage.' },
  { title: 'ESPORTS STAGE CHAMPIONSHIP', caption: 'Packed auditorium cheering during the tactical shooter grand final.' },
  { title: 'LASER NIGHT CONCERT', caption: 'Spectacular beam symphony closing the ceremonies of TechUthopia.' },
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
  .map(([filepath, url]) => {
    const filename = filepath.split('/').pop() || ''
    const match = filename.match(/^(\d+)\.(png|webp)$/)
    const num = match ? parseInt(match[1], 10) : 0
    const meta = memoryCaptions[(num - 1) % memoryCaptions.length]
    return {
      id: num || filename,
      num,
      filename,
      url,
      title: `${meta.title} • #${String(num).padStart(2, '0')}`,
      caption: meta.caption
    }
  })
  .sort((a, b) => a.num - b.num)

/* Single Floating Photo Card in 3D Spherical Formation */
function GlobePhotoCard({ photo, position, onSelect }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // Load image texture safely with SRGB color space
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    const tex = loader.load(photo.url)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.generateMipmaps = true
    tex.minFilter = THREE.LinearMipmapLinearFilter
    return tex
  }, [photo.url])

  useFrame(() => {
    if (meshRef.current) {
      // Face outward from origin (0,0,0)
      meshRef.current.lookAt(0, 0, 0)
      meshRef.current.rotateY(Math.PI)
    }
  })

  return (
    <group position={position} ref={meshRef}>
      {/* 3D Photo Plane */}
      <mesh
        scale={hovered ? 1.15 : 1}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(photo)
        }}
      >
        <planeGeometry args={[2.1, 1.45]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

/* 3D Spherical Cluster of Photos (NO globe mesh, NO orbit rings) */
function GlobeScene({ onSelect }) {
  const groupRef = useRef()

  // Calculate 3D spherical positions for all 41 photos (Fibonacci sphere distribution)
  // Radius of 4.5 combined with enlarged cards (2.1 x 1.45) packs them densely with minimal gaps!
  const photoPositions = useMemo(() => {
    const count = allPastPhotos.length
    const radius = 4.5
    return allPastPhotos.map((photo, i) => {
      const phi = Math.acos(-1 + (2 * (i + 0.5)) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)
      return { photo, pos: [x, y, z] }
    })
  }, [])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.075 // Smooth celestial rotation
    }
  })

  return (
    <group ref={groupRef}>
      {/* ONLY the floating photos in dense spherical formation — NO globe and NO orbits */}
      {photoPositions.map(({ photo, pos }) => (
        <GlobePhotoCard
          key={photo.id}
          photo={photo}
          position={pos}
          onSelect={onSelect}
        />
      ))}
    </group>
  )
}

export default function PhotoGlobe3D() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const containerRef = useRef(null)
  const isVisible = useScrollReveal(containerRef)

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
      {/* Anime Cosmic Universe Background with subtle low opacity */}
      <div
        className="photo-globe__universe-bg"
        style={{ backgroundImage: `url(${universeBg})` }}
      />

      <div className="section__container">
        <div className={`fade-in-up ${isVisible ? 'fade-in-up--visible' : ''}`}>
          <h2 className="section__title anime-glow-text" style={{ textAlign: 'center' }}>
            CHRONICLES OF PAST GLORY
          </h2>
          <p className="section__subtitle" style={{ textAlign: 'center', margin: '0 auto var(--space-sm)', color: 'rgba(226, 232, 240, 0.85)' }}>
            “41 historical fragments revolving in the cosmic void • Drag in 3D to rotate • Tap any photo talisman to inspect”
          </p>
        </div>

        {/* 3D Canvas Photo Globe Box */}
        <div className="photo-globe__canvas-box">
          <Canvas camera={{ position: [0, 0, 10.5], fov: 48 }}>
            <ambientLight intensity={1.3} />
            <directionalLight position={[10, 10, 10]} intensity={0.7} />
            <Suspense fallback={null}>
              <GlobeScene onSelect={setSelectedPhoto} />
            </Suspense>
            <OrbitControls
              enableZoom={true}
              minDistance={5}
              maxDistance={14}
              enablePan={false}
              autoRotate={false}
              dampingFactor={0.05}
            />
          </Canvas>

          <div className="photo-globe__drag-hint">
            <span>✨ 41 MEMORY TALISMANS • ↺ DRAG TO ROTATE 3D SPHERE • SCROLL TO ZOOM</span>
          </div>
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

            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="photo-globe__modal-img"
            />

            <div className="photo-globe__modal-meta">
              <div className="modal__title" style={{ fontSize: '1.25rem', marginTop: '1.1rem', color: '#ffffff' }}>
                <span className="photo-globe__modal-stamp">覚醒記憶</span>
                {selectedPhoto.title}
              </div>
              <p style={{ color: 'rgba(226, 232, 240, 0.85)', fontSize: '0.92rem', marginTop: '0.5rem', lineHeight: '1.55' }}>
                {selectedPhoto.caption}
              </p>
              <div className="photo-globe__modal-hint">
                <span>[ Tap ✕ button or tap anywhere outside to close ]</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
