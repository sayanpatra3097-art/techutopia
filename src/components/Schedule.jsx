import { useState, useRef } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const scheduleData = {
  'Day 1': [
    { time: '09:00 AM', title: 'Grand Opening Ceremony', venue: 'Main Auditorium', tag: 'Ceremony' },
    { time: '10:00 AM', title: 'Shadow Monarch Code Clash — Round 1', venue: 'Auditorium Hall A', tag: 'Coding' },
    { time: '10:30 AM', title: 'Hashira Hackathon Kickoff', venue: 'Innovation Lab', tag: 'Hackathon' },
    { time: '12:00 PM', title: 'Lunch Break + Networking Zone', venue: 'Cafeteria', tag: 'Break' },
    { time: '02:00 PM', title: 'Breathing Technique: Design Sprint', venue: 'Design Studio', tag: 'Design' },
    { time: '02:00 PM', title: 'Boss Battle: Gaming Tournament Begins', venue: 'Gaming Arena', tag: 'Gaming' },
    { time: '04:00 PM', title: 'Shadow Monarch Code Clash — Round 2', venue: 'Auditorium Hall A', tag: 'Coding' },
    { time: '06:00 PM', title: 'Evening Cultural Show: "Anime Night"', venue: 'Open Air Theatre', tag: 'Cultural' },
  ],
  'Day 2': [
    { time: '09:00 AM', title: 'Infinity Castle: Web Dev Battle', venue: 'Auditorium Hall B', tag: 'Coding' },
    { time: '10:30 AM', title: 'Hashira Hackathon continues', venue: 'Innovation Lab', tag: 'Hackathon' },
    { time: '11:00 AM', title: 'Neural Network Dojo', venue: 'CS Lab 2', tag: 'AI/ML' },
    { time: '12:30 PM', title: 'Guest Speaker: "The Future of AI"', venue: 'Main Auditorium', tag: 'Talk' },
    { time: '02:00 PM', title: 'Mecha Titan Arena — Robot Battles', venue: 'Workshop Bay', tag: 'Robotics' },
    { time: '04:00 PM', title: 'Shadow Monarch Code Clash — Finals', venue: 'Auditorium Hall A', tag: 'Coding' },
    { time: '06:00 PM', title: 'Hashira Hackathon Judging', venue: 'Innovation Lab', tag: 'Hackathon' },
    { time: '07:30 PM', title: 'DJ Night + Star Night & Closing Ceremony', venue: 'Open Air Theatre', tag: 'Cultural' },
  ],
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('Day 1')
  const ref = useRef(null)
  const isVisible = useScrollReveal(ref)

  return (
    <section className="schedule section" id="schedule" ref={ref}>
      <div className="section__container">
        <div className={`fade-in-up ${isVisible ? 'fade-in-up--visible' : ''}`}>
          <div className="section__label">📋 Schedule</div>
          <h2 className="section__title">Itinerary</h2>
          <p className="section__subtitle">
            Two days of non-stop action. Plan your dungeon raids wisely.
          </p>
        </div>

        <div className={`schedule__tabs fade-in-up stagger-2 ${isVisible ? 'fade-in-up--visible' : ''}`}>
          {Object.keys(scheduleData).map(day => (
            <button
              key={day}
              className={`schedule__tab ${activeDay === day ? 'schedule__tab--active' : ''}`}
              onClick={() => setActiveDay(day)}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="schedule__timeline">
          {scheduleData[activeDay].map((event, i) => (
            <div
              key={i}
              className={`schedule__event fade-in-up stagger-${(i % 5) + 1} ${isVisible ? 'fade-in-up--visible' : ''}`}
            >
              <div className="schedule__event-time">{event.time}</div>
              <div className="schedule__event-title">{event.title}</div>
              <div className="schedule__event-venue">📍 {event.venue}</div>
              <span className="schedule__event-tag">{event.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
