import { useState, useRef } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const galleryItems = [
  {
    id: 1,
    title: 'Hackathon War Room',
    category: 'Innovation',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
    caption: 'Coders pushing through the midnight hour at the 24hr Hackathon.'
  },
  {
    id: 2,
    title: 'Robotics Combat Ring',
    category: 'Arena',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80',
    caption: 'Sumo bots clashing in the high-voltage arena battle.'
  },
  {
    id: 3,
    title: 'Esports Championship',
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
    caption: 'Grand final showdown on the neon tournament mainstage.'
  },
  {
    id: 4,
    title: 'Neon Light & Anime Night',
    category: 'Celebration',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
    caption: 'Crowd celebrating under laser lights at the closing ceremony.'
  },
  {
    id: 5,
    title: 'VR & Cyber Demos',
    category: 'Tech Expo',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=900&q=80',
    caption: 'Students exploring next-gen spatial compute and AI gear.'
  },
  {
    id: 6,
    title: 'Keynote & Level Up Awards',
    category: 'Stage',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80',
    caption: 'Honoring victorious hunters and top innovators of UEM.'
  }
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
  const ref = useRef(null)
  const isVisible = useScrollReveal(ref)

  return (
    <section className="gallery section" id="gallery" ref={ref}>
      <div className="section__container">
        <div className={`fade-in-up ${isVisible ? 'fade-in-up--visible' : ''}`}>
          <div className="section__label">📸 Chronicles</div>
          <h2 className="section__title">Past Memories</h2>
          <p className="section__subtitle">
            Relive legendary battles and unforgettable moments from previous editions of TechUtopia at UEM Jaipur.
          </p>
        </div>

        <div className="gallery__grid">
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              className={`gallery__item fade-in-up stagger-${(i % 4) + 1} ${isVisible ? 'fade-in-up--visible' : ''}`}
              onClick={() => setSelectedImage(item)}
            >
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="gallery__item-overlay">
                <div>
                  <div className="schedule__event-tag" style={{ marginBottom: '6px' }}>{item.category}</div>
                  <div className="gallery__item-caption" style={{ fontWeight: 700 }}>{item.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{item.caption}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal" style={{ maxWidth: '800px', padding: '1.5rem' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setSelectedImage(null)}>✕</button>
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              style={{ width: '100%', maxHeight: '65vh', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}
            />
            <div className="modal__title" style={{ fontSize: '1.25rem' }}>{selectedImage.title}</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{selectedImage.caption}</p>
          </div>
        </div>
      )}
    </section>
  )
}
