'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, ChevronDown, Zap, Shield, Hammer, Sun, ScrollText, Trophy, Flame, Coins, Scale, Gavel } from 'lucide-react';
import NextImage, { StaticImageData } from 'next/image';

// Background Images for FAQ Halls
import zeusBg from '../../assets/faq/zeus.webp';
import athenaBg from '../../assets/faq/athena.webp';
import hephaestusBg from '../../assets/faq/hephaestus.webp';
import apolloBg from '../../assets/faq/apollo.webp';

// --- Types ---
type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
};

type Question = {
  id: string;
  q: string;
  a: string;
  related?: string[];
};

type Hall = {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  colors: ThemeColors;
  questions: Question[];
  backgroundImage: StaticImageData;
};

// --- Data: Oracle Questions (FAQ) ---
const halls: Hall[] = [
  {
    id: 'zeus',
    name: 'Hall of Zeus',
    subtitle: "The King's Throne",
    icon: Zap,
    description: 'Seek guidance on the laws of the land, eligibility, and the divine rules that govern this realm.',
    colors: { primary: '#D4AF37', secondary: '#001F3F', accent: '#FFFFFF', glow: 'rgba(212, 175, 55, 0.6)' },
    backgroundImage: zeusBg,
    questions: [
      { id: 'z1', q: 'Who can participate?', a: 'Any student with a valid ID card from a recognized institute can participate. Undergraduate students are welcome into the arena.' },
      { id: 'z2', q: 'Do I need prior experience?', a: 'No! The gods favor the bold. Beginners are welcome, and we have mentors to guide you through your first odyssey.' },
      { id: 'z3', q: 'What are the eligibility criteria?', a: 'You must be a verified student. Teams can have 2-5 members. Inter-college teams are allowed.' },
    ],
  },
  {
    id: 'athena',
    name: 'Hall of Athena',
    subtitle: 'The Council Chamber',
    icon: Shield,
    description: 'Consult the goddess of wisdom for logistics, team formation, and strategic planning.',
    colors: { primary: '#C0C0C0', secondary: '#708090', accent: '#9CAF88', glow: 'rgba(192, 192, 192, 0.6)' },
    backgroundImage: athenaBg,
    questions: [
      { id: 'a1', q: 'What is the team size?', a: 'You can form an alliance of 2 to 5 members. Choose your companions wisely.' },
      { id: 'a2', q: 'Will accommodation be provided?', a: 'Yes, for our offline champions. Shelter will be available within the campus grounds during the event.' },
      { id: 'a3', q: 'What is the event schedule?', a: 'The hackathon is a 48-hour marathon. Detailed timelines will be revealed in the Hall of Apollo closer to the date.' },
    ],
  },
  {
    id: 'hephaestus',
    name: 'Hall of Hephaestus',
    subtitle: 'The Forge',
    icon: Hammer,
    description: 'Enter the forge to learn about technical requirements, submission guidelines, and judging criteria.',
    colors: { primary: '#CD7F32', secondary: '#36454F', accent: '#FF6B35', glow: 'rgba(205, 127, 50, 0.6)' },
    backgroundImage: hephaestusBg,
    questions: [
      { id: 'h1', q: 'Do we need specific tech stacks?', a: 'No specific stack is mandated. You are free to forge your creation using any tools or languages you prefer.' },
      { id: 'h2', q: 'What are the judging criteria?', a: 'Innovation, Technical Complexity, Practicality, and Presentation. Impress the judges with a complete, working prototype.' },
      { id: 'h3', q: 'How do we submit our work?', a: 'Submissions will be managed via Devfolio/GitHub. Ensure your repository is public and well-documented.' },
    ],
  },
  {
    id: 'apollo',
    name: 'Hall of Apollo',
    subtitle: "The Oracle's Chamber",
    icon: Sun,
    description: 'The Oracle sees all times. Here you will find dates, deadlines, and financial clarifications.',
    colors: { primary: '#FFD700', secondary: '#1A1510', accent: '#FFFFFF', glow: 'rgba(255, 215, 0, 0.6)' },
    backgroundImage: apolloBg,
    questions: [
      { id: 'ap1', q: 'When is the registration deadline?', a: 'The oracle decrees that registrations close few days before the event. Act swiftly!' },
      { id: 'ap2', q: 'Is there a registration fee?', a: 'No tribute is required. TECHUTOPIA 2026 is completely free for all participants.' },
      { id: 'ap3', q: 'What is the timeline?', a: 'The event happens on 13 to 15 March 2026. Hacking begins at 01:00 PM and ends 48 hours later.' },
    ],
  },
];

// --- Data: Laws of Olympus (Rules) ---
const laws = [
  {
    id: 'general',
    title: 'General Rules',
    subtitle: 'Zeus Decree',
    icon: Zap,
    content: [
      'TECHUTOPIA 2026 is open to students currently enrolled in any recognized educational institution.',
      'Each team must consist of 2 to 5 members. Teams not meeting this requirement may be disqualified.',
      'Team members may belong to different colleges or universities.',
      'A participant may be part of only one team throughout the hackathon.',
      'Participants must follow all instructions provided by the organizing team.',
      'The organizing committee reserves the right to modify rules or event structure at any time.'
    ],
    color: 'from-yellow-400 to-yellow-600',
    backgroundImage: zeusBg,
  },
  {
    id: 'equipment',
    title: 'Equipment Rules',
    subtitle: 'Hephaestus Forge',
    icon: Hammer,
    content: [
      'Participants must bring their own laptops, chargers, and any required accessories.',
      'All projects must be developed entirely during the hackathon duration. Pre-built projects are not allowed.',
      'Teams may use open-source libraries, APIs, and frameworks, but proper attribution must be provided.',
      'Each team is allowed to submit only one project.'
    ],
    color: 'from-red-400 to-orange-600',
    backgroundImage: hephaestusBg,
  },
  {
    id: 'judging',
    title: 'Judging Rules',
    subtitle: 'Athena Wisdom',
    icon: Gavel,
    content: [
      'Projects will be judged based on: Innovation, Technical Implementation, Problem Relevance, Usability, and Impact.',
      'A panel of experienced industry professionals, mentors, and faculty members will evaluate the projects.',
      'The decision of the judges will be final and binding.',
      'Incomplete or late submissions may not be considered for evaluation.'
    ],
    color: 'from-blue-400 to-blue-600',
    backgroundImage: athenaBg,
  },
  {
    id: 'scoring',
    title: 'Scoring & Winning Criteria',
    subtitle: 'Nike Blessing',
    icon: Trophy,
    content: [
      'All projects must be submitted before the official submission deadline.',
      'Final submission must include: Project description, Source code repository link, and Demo video/live prototype.',
      'Certificates will be awarded to all participants who successfully complete the hackathon.',
      'Awards granted only to those who uphold the laws.'
    ],
    color: 'from-green-400 to-emerald-600',
    backgroundImage: apolloBg,
  },
  {
    id: 'safety',
    title: 'Safety & Conduct',
    subtitle: 'Code of Honor',
    icon: Shield,
    content: [
      'All participants must behave respectfully towards fellow participants, mentors, judges, volunteers, and organizers.',
      'Any attempt to gain unfair advantage, disrupt the event, or misuse resources will result in disqualification.',
      'Harassment of any kind will not be tolerated and may lead to immediate removal from the event.'
    ],
    color: 'from-indigo-400 to-violet-600',
    backgroundImage: athenaBg,
  },
  {
    id: 'disqualification',
    title: 'Disqualification',
    subtitle: 'Hades Warning',
    icon: Flame,
    content: [
      'Any form of plagiarism or unauthorized copying of code, ideas, or assets will lead to immediate disqualification.',
      'Failure to comply with any rules may result in disqualification at the discretion of the organizers.',
      'Any form of misconduct or unfair practices may lead to immediate disqualification.',
      'False registration details will lead to immediate removal.'
    ],
    color: 'from-purple-500 to-rose-800',
    backgroundImage: hephaestusBg,
  },
];

// --- Components ---

const QuestionCard = ({ question, hallColors, isOpen, onToggle }: { question: Question; hallColors: ThemeColors; isOpen: boolean; onToggle: () => void; }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group relative overflow-hidden rounded-lg border transition-all duration-300 backdrop-blur-sm ${isOpen ? 'bg-black/40' : 'bg-black/20 hover:bg-black/30'}`}
      style={{
        borderColor: isOpen ? hallColors.primary : 'rgba(255,255,255,0.2)',
        boxShadow: isOpen ? `0 0 20px ${hallColors.glow}` : 'none',
      }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300" style={{ backgroundColor: hallColors.primary, opacity: isOpen ? 1 : 0.7 }} />
      <button onClick={onToggle} className="w-full flex items-center justify-between p-4 md:p-5 pl-6 md:pl-8 text-left relative z-10">
        <div className="flex items-center gap-4 pr-4">
          <span className="text-base md:text-lg font-medium transition-colors duration-300 line-clamp-2 md:line-clamp-none" style={{ color: isOpen ? hallColors.primary : '#E6E6E6' }}>{question.q}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0">
          <ChevronDown className={`w-5 h-5 transition-colors duration-300`} style={{ color: isOpen ? hallColors.primary : '#6B7280' }} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="px-4 md:px-5 pl-6 md:pl-8 pb-5 md:pb-6 relative z-10">
              <div className="h-px w-full mb-3 md:mb-4 opacity-30" style={{ backgroundColor: hallColors.primary }} />
              <p className="text-gray-200 leading-relaxed font-sans text-sm md:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{question.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};




export function FAQ() {
  const [activeTab, setActiveTab] = useState<'oracle' | 'laws'>('oracle');
  const [activeHallId, setActiveHallId] = useState<string>('zeus');
  const [activeLawId, setActiveLawId] = useState<string>('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ top: number; left: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    setParticles(
      [...Array(15)].map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 10 + Math.random() * 20,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  useEffect(() => {
    setSearchQuery('');
  }, [activeTab]);

  const activeHall = halls.find((h) => h.id === activeHallId) || halls[0];
  const activeLaw = laws.find((l) => l.id === activeLawId) || laws[0];

  const activeLawColor = activeLaw.color.includes('yellow') ? '#F59E0B' :
    activeLaw.color.includes('red') ? '#EF4444' :
      activeLaw.color.includes('blue') ? '#3B82F6' :
        activeLaw.color.includes('green') ? '#10B981' :
          activeLaw.color.includes('indigo') ? '#6366F1' : '#A855F7';

  const filteredHalls = searchQuery
    ? halls.map((hall) => ({
      ...hall,
      questions: hall.questions.filter(
        (q) => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    })).filter((h) => h.questions.length > 0)
    : [activeHall];

  const filteredLaws = searchQuery
    ? laws.map((law) => ({
      ...law,
      content: law.content.filter((c) => c.toLowerCase().includes(searchQuery.toLowerCase())),
    })).filter((l) => l.content.length > 0)
    : [];

  const handleHallChange = (id: string) => {
    setActiveHallId(id);
    setSearchQuery('');
    setOpenQuestionId(null);
  };

  const handleLawChange = (id: string) => {
    setActiveLawId(id);
  };

  return (
    <section className="h-[100dvh] min-h-[500px] w-full bg-[#0F172A] text-white relative overflow-hidden font-cinzel flex flex-col">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-1000">
        <AnimatePresence>
          {activeTab === 'oracle' ? (
            <motion.div
              key={`bg-hall-${activeHall.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
              style={{ backgroundColor: activeHall.colors.secondary }}
            >
              <NextImage src={activeHall.backgroundImage} alt="Background" fill className="object-cover opacity-60 filter brightness-50 contrast-125 scale-105" placeholder="blur" priority />
              {/* Glow */}
              <motion.div initial={{ opacity: 0.1 }} animate={{ opacity: 0.15 }} className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] blur-[100px]" style={{ backgroundColor: activeHall.colors.primary }} />
            </motion.div>
          ) : (
            <motion.div
              key={`bg-law-${activeLaw.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
              style={{
                backgroundColor: 'rgba(12, 12, 12, 0.95)' // Fallback dark bg
              }}
            >
              <NextImage
                src={activeLaw.backgroundImage}
                alt="Background"
                fill
                className="object-cover opacity-60 filter brightness-50 contrast-125 scale-105"
                placeholder="blur"
                priority
              />

              {/* Overlay Pattern */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]" />

              {/* Dynamic Law Color Glow */}
              <motion.div
                key={activeLaw.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                transition={{ duration: 1 }}
                className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-amber-500/20 to-transparent pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${activeLawColor}40, transparent 70%)`
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Preload inactive images (hidden) to prevent loading delay on switch */}
        <div className="fixed inset-0 pointer-events-none opacity-0 overflow-hidden w-0 h-0">
          {halls.filter(h => h.id !== activeHall.id).map(h => (
            <NextImage key={h.id} src={h.backgroundImage} alt="" fill priority={false} loading="eager" />
          ))}
          {laws.filter(l => l.id !== activeLaw.id).map(l => (
            <NextImage key={l.id} src={l.backgroundImage} alt="" fill priority={false} loading="eager" />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl flex-1 flex flex-col min-h-0 pt-20 md:pt-32 pb-4 md:pb-8">
        {/* Page Header */}
        <header className="text-center mb-6 shrink-0">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-1 md:mb-2 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 drop-shadow-sm">
              MOUNT OLYMPUS LIBRARY
            </h1>
            <p className="text-gray-400 font-serif italic text-sm md:text-base lg:text-lg opacity-80 decoration-slice">
              &quot;Hall of Wisdom&quot;
            </p>
          </motion.div>
        </header>

        {/* --- TABS --- */}
        <div className="flex justify-center gap-4 mb-6 md:mb-8 shrink-0">
          {['oracle', 'laws'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'oracle' | 'laws')}
              className={`
                        relative px-6 py-2 md:px-10 md:py-3 rounded-full border-2 transition-all duration-300 overflow-hidden group
                        ${activeTab === tab
                  ? 'border-yellow-500 bg-black/60 shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                  : 'border-white/20 bg-black/30 hover:bg-black/40 hover:border-yellow-500/50'}
                    `}
            >
              {activeTab === tab && (
                <motion.div layoutId="tab-glow" className="absolute inset-0 bg-yellow-500/10 blur-sm" />
              )}
              <div className="relative z-10 flex items-center gap-2">
                {tab === 'oracle' ? <Coins className={`w-4 h-4 ${activeTab === tab ? 'text-yellow-400' : 'text-gray-400'}`} /> : <Scale className={`w-4 h-4 ${activeTab === tab ? 'text-yellow-400' : 'text-gray-400'}`} />}
                <span className={`font-serif font-bold tracking-wider text-sm md:text-lg ${activeTab === tab ? 'text-yellow-100' : 'text-gray-400'}`}>
                  {tab === 'oracle' ? 'Oracle Questions' : 'Laws of Olympus'}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'oracle' ? (
              /* ORACLE QUESTIONS TAB */
              <motion.div
                key="oracle-content"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full h-full overflow-hidden"
              >
                {/* Sidebar */}
                <aside className="w-full lg:w-[300px] shrink-0 lg:h-full flex flex-col gap-3 md:gap-4">
                  <div className="relative group shrink-0">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400 group-focus-within:text-white transition-colors" />
                    <input
                      type="text"
                      placeholder="Search wisdom..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg py-2 md:py-3 pl-9 md:pl-10 pr-4 text-sm font-sans focus:outline-none focus:border-yellow-500/50 transition-all placeholder:text-gray-500"
                    />
                  </div>
                  <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto scrollbar-thin scrollbar-track-transparent pr-1 pb-1 min-h-[60px] lg:min-h-0">
                    {halls.map((hall) => {
                      const isActive = activeHallId === hall.id && !searchQuery;
                      const Icon = hall.icon;
                      return (
                        <button key={hall.id} onClick={() => handleHallChange(hall.id)} className={`relative group shrink-0 lg:w-full text-left p-3 md:p-4 rounded-lg border transition-all duration-300 overflow-hidden backdrop-blur-sm ${isActive ? 'bg-black/40 border-white/20 shadow-lg' : 'bg-black/20 border-white/10 hover:bg-black/30'}`}>
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: hall.colors.primary }} />
                          {isActive && <div className="absolute left-0 bottom-0 right-0 h-1 lg:top-0 lg:bottom-0 lg:right-auto lg:w-1 lg:h-auto" style={{ backgroundColor: hall.colors.primary }} />}
                          <div className="flex items-center justify-between relative z-10 w-full min-w-[140px] lg:min-w-0">
                            <div className="flex items-center gap-2 md:gap-3">
                              <div className={`p-1.5 md:p-2 rounded-md transition-colors duration-300 backdrop-blur-sm bg-black/50`}><Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: isActive ? hall.colors.primary : '#9CA3AF' }} /></div>
                              <div className="flex flex-col"><h3 className={`font-bold text-xs tracking-wide whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{hall.name.replace('Hall of ', '')}</h3><p className="hidden md:block text-[10px] text-gray-500 uppercase tracking-widest font-sans">{hall.questions.length} Questions</p></div>
                            </div>
                            {isActive && <motion.div layoutId="active-dot-hall" className="hidden lg:block"><ChevronRight className="w-4 h-4 text-white opacity-50" /></motion.div>}
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </aside>

                {/* Main Questions Area */}
                <main className="flex-1 rounded-2xl p-4 md:p-6 lg:p-8 relative overflow-hidden flex flex-col min-h-0 bg-black/10 border border-white/5 backdrop-blur-sm">
                  <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2">
                    {searchQuery ? (
                      <div className="space-y-6 md:space-y-8">
                        <h2 className="text-lg md:text-xl font-bold text-gray-400 mb-4 md:mb-6 flex items-center gap-2"><Search className="w-5 h-5" /> Search Results for &quot;{searchQuery}&quot;</h2>
                        {filteredHalls.map((hall) => (
                          <div key={hall.id} className="mb-6 md:mb-8">
                            <h3 className="text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 font-bold flex items-center gap-2" style={{ color: hall.colors.primary }}><hall.icon className="w-4 h-4" />{hall.name}</h3>
                            <div className="space-y-3 md:space-y-4">{hall.questions.map((q) => <QuestionCard key={q.id} question={q} hallColors={hall.colors} isOpen={openQuestionId === q.id} onToggle={() => setOpenQuestionId(openQuestionId === q.id ? null : q.id)} />)}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <AnimatePresence mode="wait">
                        <motion.div key={activeHall.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="flex flex-col">
                          <div className="mb-6 md:mb-8 text-center md:text-left border-b border-white/20 pb-4 md:pb-6 relative shrink-0">
                            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 opacity-15 blur-3xl rounded-full pointer-events-none" style={{ backgroundColor: activeHall.colors.primary }} />
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-3 md:mb-4">
                              <div className="p-2 md:p-3 rounded-xl bg-black/40 backdrop-blur-md shadow-xl border border-white/20"><activeHall.icon className="w-6 h-6 md:w-10 md:h-10" style={{ color: activeHall.colors.primary, filter: `drop-shadow(0 0 10px ${activeHall.colors.glow})` }} /></div>
                              <div><h2 className="text-xl md:text-3xl font-bold tracking-wider mb-1 md:mb-2" style={{ color: activeHall.colors.primary }}>{activeHall.name}</h2><h3 className="text-base md:text-lg text-gray-300 font-serif italic drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{activeHall.subtitle}</h3></div>
                            </div>
                            <p className="text-gray-200 font-sans leading-relaxed max-w-2xl mx-auto md:mx-0 text-xs md:text-base drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{activeHall.description}</p>
                          </div>
                          <div className="space-y-3 md:space-y-4">{activeHall.questions.map((q, i) => <motion.div key={q.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}><QuestionCard question={q} hallColors={activeHall.colors} isOpen={openQuestionId === q.id} onToggle={() => setOpenQuestionId(openQuestionId === q.id ? null : q.id)} /></motion.div>)}</div>
                        </motion.div>
                      </AnimatePresence>
                    )}
                  </div>
                </main>
              </motion.div>
            ) : (
              /* LAWS OF OLYMPUS TAB (Redesigned) */
              <motion.div
                key="laws-content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full h-full overflow-hidden"
              >
                {/* Sidebar - Law Categories */}
                <aside className="w-full lg:w-[300px] shrink-0 lg:h-full flex flex-col gap-3 md:gap-4">
                  {/* Optional: Small header for the sidebar or just the list */}
                  {/* Search Input for Laws */}
                  <div className="relative group shrink-0 mb-2 hidden lg:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-gray-400 group-focus-within:text-white transition-colors" />
                    <input
                      type="text"
                      placeholder="Search laws..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg py-2 md:py-3 pl-9 md:pl-10 pr-4 text-sm font-sans focus:outline-none focus:border-yellow-500/50 transition-all placeholder:text-gray-500"
                    />
                  </div>

                  <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto scrollbar-thin scrollbar-track-transparent pr-1 pb-1 min-h-[60px] lg:min-h-0">
                    {laws.map((rule) => {
                      const isActive = activeLawId === rule.id;
                      const Icon = rule.icon;

                      // Extract color for border/active state from the Tailwind class (simplified)
                      const activeColor = rule.color.includes('yellow') ? '#F59E0B' :
                        rule.color.includes('red') ? '#EF4444' :
                          rule.color.includes('blue') ? '#3B82F6' :
                            rule.color.includes('green') ? '#10B981' :
                              rule.color.includes('indigo') ? '#6366F1' : '#A855F7';

                      return (
                        <button key={rule.id} onClick={() => handleLawChange(rule.id)} className={`relative group shrink-0 lg:w-full text-left p-3 md:p-4 rounded-lg border transition-all duration-300 overflow-hidden backdrop-blur-sm ${isActive ? 'bg-black/40 border-white/20 shadow-lg' : 'bg-black/20 border-white/10 hover:bg-black/30'}`}>
                          {/* Active Background Tint */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: activeColor }} />
                          {isActive && <div className="absolute left-0 bottom-0 right-0 h-1 lg:top-0 lg:bottom-0 lg:right-auto lg:w-1 lg:h-auto" style={{ backgroundColor: activeColor }} />}

                          <div className="flex items-center justify-between relative z-10 w-full min-w-[140px] lg:min-w-0">
                            <div className="flex items-center gap-2 md:gap-3">
                              <div className={`p-1.5 md:p-2 rounded-md transition-colors duration-300 backdrop-blur-sm bg-black/50`}><Icon className="w-4 h-4 md:w-5 md:h-5" style={{ color: isActive ? activeColor : '#9CA3AF' }} /></div>
                              <div className="flex flex-col">
                                <h3 className={`font-bold text-xs tracking-wide whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{rule.title}</h3>
                                <p className="hidden md:block text-[10px] text-gray-500 uppercase tracking-widest font-sans">{rule.subtitle}</p>
                              </div>
                            </div>
                            {isActive && <motion.div layoutId="active-dot-law" className="hidden lg:block"><ChevronRight className="w-4 h-4 text-white opacity-50" /></motion.div>}
                          </div>
                        </button>
                      );
                    })}
                  </nav>
                </aside>

                {/* Main Laws Content Area */}
                <main className="flex-1 rounded-2xl p-4 md:p-6 lg:p-8 relative overflow-hidden flex flex-col min-h-0 bg-black/10 border border-white/5 backdrop-blur-sm">
                  <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent pr-2">
                    {searchQuery ? (
                      <div className="space-y-6 md:space-y-8">
                        <h2 className="text-lg md:text-xl font-bold text-gray-400 mb-4 md:mb-6 flex items-center gap-2"><Search className="w-5 h-5" /> Search Results for &quot;{searchQuery}&quot;</h2>
                        {filteredLaws.map((law) => (
                          <div key={law.id} className="mb-6 md:mb-8">
                            <h3 className="text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 font-bold flex items-center gap-2" style={{ color: activeLawColor }}><law.icon className="w-4 h-4" />{law.title}</h3>
                            <div className="space-y-3">
                              {law.content.map((rule, idx) => (
                                <div key={idx} className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/20 p-4 md:p-5 hover:bg-black/30 transition-colors">
                                  <div className="flex items-start gap-4">
                                    <div className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: activeLawColor }} />
                                    <p className="text-gray-200 leading-relaxed font-sans text-sm md:text-base">{rule}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        {filteredLaws.length === 0 && <p className="text-gray-500 text-center py-10 font-sans italic">No laws found matching your query.</p>}
                      </div>
                    ) : (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeLaw.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.4 }}
                          className="flex flex-col"
                        >
                          {/* Header */}
                          <div className="mb-6 md:mb-8 text-center md:text-left border-b border-white/20 pb-4 md:pb-6 relative shrink-0">
                            {/* BG Glow */}
                            <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 opacity-15 blur-3xl rounded-full pointer-events-none" style={{ backgroundColor: activeLawColor }} />

                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-3 md:mb-4">
                              <div className="p-2 md:p-3 rounded-xl bg-black/40 backdrop-blur-md shadow-xl border border-white/20">
                                <activeLaw.icon className="w-6 h-6 md:w-10 md:h-10" style={{ color: activeLawColor }} />
                              </div>
                              <div>
                                <h2 className="text-xl md:text-3xl font-bold tracking-wider mb-1 md:mb-2" style={{ color: activeLawColor }}>{activeLaw.title}</h2>
                                <h3 className="text-base md:text-lg text-gray-300 font-serif italic drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{activeLaw.subtitle}</h3>
                              </div>
                            </div>
                          </div>

                          {/* Fog & Dust Particles (Client-side only to avoid hydration mismatch) */}
                          {particles.map((p, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                              style={{
                                top: `${p.top}%`,
                                left: `${p.left}%`,
                                boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.1)',
                              }}
                              animate={{
                                y: [-20, -100],
                                opacity: [0, 0.3, 0],
                                scale: [0, 1.5, 0],
                              }}
                              transition={{
                                duration: p.duration,
                                repeat: Infinity,
                                ease: "linear",
                                delay: p.delay,
                              }}
                            />
                          ))}

                          {/* Content List */}
                          <div className="space-y-4">
                            {activeLaw.content.map((ruleText, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/20 p-4 md:p-5 hover:bg-black/30 transition-colors"
                              >
                                <div className="flex items-start gap-4">
                                  <div className="mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: activeLawColor }} />
                                  <p className="text-gray-200 leading-relaxed font-sans text-sm md:text-base">{ruleText}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Footer for content */}
                          <motion.div
                            className="flex items-center justify-center gap-3 mt-12 pt-6 border-t border-white/10 opacity-60"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 0.8 }}
                          >
                            <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/50" style={{ backgroundImage: `linear-gradient(to right, transparent, ${activeLawColor}80)` }} />
                            <span className="text-lg" style={{ color: activeLawColor }}>⚖</span>
                            <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/50" style={{ backgroundImage: `linear-gradient(to left, transparent, ${activeLawColor}80)` }} />
                          </motion.div>
                        </motion.div>

                      </AnimatePresence>
                    )}
                  </div>
                </main>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
