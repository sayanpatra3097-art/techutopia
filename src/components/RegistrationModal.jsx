import { useState } from 'react'
import { ALL_EVENT_TITLES } from '../context/eventForms'

const allEventsList = ALL_EVENT_TITLES

export default function RegistrationModal({ event, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: 'UEM Jaipur',
    selectedEvent: event?.title || allEventsList[0],
    teamName: '',
    discord: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close modal">✕</button>

        {!submitted ? (
          <>
            <div className="modal__title">Hunter Registration</div>
            <div className="modal__event-name">
              {event ? `Target Quest: ${event.title}` : 'System Clearance Gateway'}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form__group">
                <label className="form__label">Hunter Name (Full Name)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sung Jin-woo"
                  className="form__input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form__group">
                <label className="form__label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="hunter@uemjaipur.ac.in"
                  className="form__input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form__group">
                <label className="form__label">Phone / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="form__input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form__group">
                <label className="form__label">College / Institution</label>
                <input
                  type="text"
                  required
                  placeholder="University of Engineering & Management, Jaipur"
                  className="form__input"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                />
              </div>

              <div className="form__group">
                <label className="form__label">Choose Event / Dungeon</label>
                <select
                  className="form__select"
                  value={formData.selectedEvent}
                  onChange={(e) => setFormData({ ...formData, selectedEvent: e.target.value })}
                >
                  {allEventsList.map((evt) => (
                    <option key={evt} value={evt}>{evt}</option>
                  ))}
                </select>
              </div>

              <div className="form__group">
                <label className="form__label">Guild / Team Name (Optional)</label>
                <input
                  type="text"
                  placeholder="Ahjin Guild"
                  className="form__input"
                  value={formData.teamName}
                  onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn btn--primary form__submit"
                disabled={loading}
              >
                {loading ? 'Transmitting Mana...' : 'Awaken & Enter Raid ⚡'}
              </button>
            </form>
          </>
        ) : (
          <div className="form__success">
            <div className="form__success-icon">🗡️</div>
            <div className="form__success-text">SYSTEM: AWAKENING COMPLETE!</div>
            <p className="form__success-sub">
              Congratulations, <strong>{formData.name}</strong>. You have been registered for{' '}
              <strong>{formData.selectedEvent}</strong>. A confirmation scroll has been sent to{' '}
              <strong>{formData.email}</strong>.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <button className="btn btn--outline" onClick={onClose}>
                Return to Sanctuary
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
