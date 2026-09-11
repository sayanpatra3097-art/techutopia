import { useRef } from 'react'
import TeamFlipCard from './TeamFlipCard'
import useScrollReveal from '../hooks/useScrollReveal'
import coreTeamBg from '../assets/core_team.webp'

const teamMembers = [
  {
    name: 'Aarav Sharma',
    role: 'Lead Convener',
    classTitle: 'Shadow Sovereign (S-Rank)',
    rank: 'S-RANK CONVENER',
    color: '#ff9e00',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    ability: 'Arise: Supreme Guild Orchestration',
    stats: { strategy: 98, tech: 92, leadership: 99 },
    socials: { github: '#', linkedin: '#', email: 'aarav@uem.edu.in' }
  },
  {
    name: 'Rohan Verma',
    role: 'Tech & Platform Lead',
    classTitle: 'Sun Breathing Dev',
    rank: 'HASHIRA ARCHITECT',
    color: '#ff6b35',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    ability: 'Hinokami: Zero-Latency Systems',
    stats: { strategy: 90, tech: 99, leadership: 88 },
    socials: { github: '#', linkedin: '#', email: 'rohan@uem.edu.in' }
  },
  {
    name: 'Ananya Sen',
    role: 'Operations & Stage Head',
    classTitle: 'Flame Hashira of Logistics',
    rank: 'HASHIRA OF COLISEUM',
    color: '#e63946',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    ability: 'Unbroken Focus: 72hr Event Flow',
    stats: { strategy: 95, tech: 85, leadership: 96 },
    socials: { github: '#', linkedin: '#', email: 'ananya@uem.edu.in' }
  },
  {
    name: 'Vikramaditya Roy',
    role: 'Design & Visual Director',
    classTitle: 'Domain Expansion Artist',
    rank: 'S-RANK CREATIVE',
    color: '#ff6b35',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    ability: 'Infinite Void: Spatial Web & 3D Shaders',
    stats: { strategy: 88, tech: 96, leadership: 90 },
    socials: { github: '#', linkedin: '#', email: 'vikram@uem.edu.in' }
  },
  {
    name: 'Ishita Kapoor',
    role: 'Hackathon & Code Master',
    classTitle: 'Raid Master (Algorithms)',
    rank: 'SPECIAL GRADE CODER',
    color: '#ffd166',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    ability: 'Shadow Extraction: Clean Codebase',
    stats: { strategy: 94, tech: 98, leadership: 89 },
    socials: { github: '#', linkedin: '#', email: 'ishita@uem.edu.in' }
  },
  {
    name: 'Devendra Meena',
    role: 'Robotics & Hardware Head',
    classTitle: 'Mecha Architect',
    rank: 'TITAN OVERSEER',
    color: '#ffd700',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    ability: 'Iron Core: Pneumatic Combat Tuning',
    stats: { strategy: 89, tech: 97, leadership: 91 },
    socials: { github: '#', linkedin: '#', email: 'devendra@uem.edu.in' }
  },
  {
    name: 'Pooja Agarwal',
    role: 'Sponsorship & PR Head',
    classTitle: 'Guild Treasurer & Envoy',
    rank: 'GOLD GUILD ENVOY',
    color: '#ff70a6',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
    ability: 'Bounty Summoner: ₹10L+ Prize Vault',
    stats: { strategy: 97, tech: 82, leadership: 95 },
    socials: { github: '#', linkedin: '#', email: 'pooja@uem.edu.in' }
  },
  {
    name: 'Sahil Sheikh',
    role: 'Esports & Community Head',
    classTitle: 'Final Boss Coliseum Warden',
    rank: 'APEX WARDEN',
    color: '#e63946',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    ability: 'Tactical Clutch: Grand Final Broadcast',
    stats: { strategy: 91, tech: 93, leadership: 94 },
    socials: { github: '#', linkedin: '#', email: 'sahil@uem.edu.in' }
  }
]

export default function Team() {
  const ref = useRef(null)
  const isVisible = useScrollReveal(ref)

  return (
    <section className="team-dimension section" id="team" ref={ref}>
      {/* Fixed Background Image Layer */}
      <div
        className="team-dimension__backdrop"
        style={{
          backgroundImage: `url(${coreTeamBg})`
        }}
      />
      <div className="team-dimension__backdrop-overlay" />

      <div className="section__container">
        <div className={`fade-in-up ${isVisible ? 'fade-in-up--visible' : ''}`}>
          {/* Ornate Section Header */}
          <div className="team-dimension__header">
            <span className="team-dimension__header-gem">◆◆</span>
            <h2 className="team-dimension__title">CORE MEMBERS</h2>
            <span className="team-dimension__header-gem">◆</span>
          </div>
          <p className="section__subtitle" style={{ textAlign: 'center', margin: '0 auto var(--space-lg)' }}>
            The conveners and architects leading UEM Jaipur's supreme festival.
          </p>
        </div>

        {/* Team Card Grid */}
        <div className="team-card-grid">
          {teamMembers.map((member) => (
            <TeamFlipCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  )
}
