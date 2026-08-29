'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { QRCodeCanvas } from 'qrcode.react';
import { ShoppingCart, CheckCircle, Clock, MapPin, X, Loader2, User, Ticket as TicketIcon, Gamepad2, Music, Map, Mic, Cpu, Zap, Star, Camera, Code2, Search, SlidersHorizontal, Sparkles, Flame, Bot, Palette, Glasses, Download, Linkedin } from 'lucide-react';
import { toPng } from 'html-to-image';
import BoardingPass from '@/components/ui/BoardingPass';

import { eventsData } from '@/data/events';

const iconMap: Record<number, any> = {
  1: Star,
  2: Code2,
  3: Mic,
  4: Gamepad2,
  13: Gamepad2,
  5: Zap,
  6: Bot,
  7: Camera,
  8: Cpu,
  9: Palette,
  10: Music,
  11: Map,
  12: Flame,
  14: Glasses,
};

export const events = eventsData.map(e => ({
  ...e,
  icon: iconMap[e.id] || Zap
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// Pre-seeded, stable ember particle data (no Math.random - avoids hydration mismatch)
const EMBER_PARTICLES = [
  { left: 23, top: 11, dur: 5.41, delay: 3.53, opacity: 0.05 },
  { left: 16, top: 80, dur: 5.81, delay: 4.56, opacity: 0.39 },
  { left: 67, top: 52, dur: 8.26, delay: 2.91, opacity: 0.09 },
  { left: 17, top: 27, dur: 9.70, delay: 3.50, opacity: 0.30 },
  { left: 70, top: 31, dur: 8.69, delay: 3.12, opacity: 0.23 },
  { left: 65, top: 73, dur: 9.73, delay: 1.07, opacity: 0.46 },
  { left: 70, top: 57, dur: 7.43, delay: 4.22, opacity: 0.08 },
  { left: 93, top: 18, dur: 9.98, delay: 0.85, opacity: 0.47 },
  { left: 77, top: 21, dur: 5.21, delay: 3.61, opacity: 0.36 },
  { left: 55, top: 34, dur: 9.76, delay: 4.39, opacity: 0.12 },
  { left: 77, top: 58, dur: 7.93, delay: 3.63, opacity: 0.46 },
  { left: 9, top: 50, dur: 6.14, delay: 0.28, opacity: 0.39 },
  { left: 39, top: 46, dur: 7.05, delay: 0.90, opacity: 0.01 },
  { left: 19, top: 60, dur: 7.07, delay: 4.99, opacity: 0.26 },
  { left: 69, top: 96, dur: 9.48, delay: 4.26, opacity: 0.02 },
  { left: 99, top: 47, dur: 6.10, delay: 1.35, opacity: 0.37 },
  { left: 32, top: 36, dur: 9.61, delay: 4.81, opacity: 0.16 },
  { left: 87, top: 46, dur: 6.98, delay: 1.42, opacity: 0.13 },
  { left: 40, top: 35, dur: 5.51, delay: 0.82, opacity: 0.08 },
  { left: 27, top: 59, dur: 5.83, delay: 3.55, opacity: 0.19 },
];

// Build a CSS string from the ember data - avoids inline style props on DOM elements
const EMBER_CSS = [
  `.ember-particle { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: radial-gradient(circle, #fff 0%, #d4af37 40%, transparent 100%); will-change: transform, opacity; }`,
  ...EMBER_PARTICLES.map((p, i) =>
    `.ember-${i} { left: ${p.left}%; top: ${p.top}%; animation: ember-rise ${p.dur}s infinite linear; animation-delay: ${p.delay}s; opacity: ${p.opacity}; }`
  ),
].join('\n');

const SPEAKERS = [
  {
    id: 1,
    name: 'Urvij Saroliya',
    role: 'Keynote Speaker',
    topic: 'Engine Behind Innovation: HPC in the Age of AI',
    bio: 'An expert in High-Performance Computing (HPC) and its critical role in modern innovation. In this talk, Urvij explores how HPC serves as the essential engine behind the AI revolution, enabling the massive compute power required to train large-scale models and drive next-generation breakthroughs across industries.',
    photo: '/events/Speaker_1.webp',
    linkedin: 'https://www.linkedin.com/in/urvijsaroliya/?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    id: 2,
    name: 'Keerti Purswani',
    role: 'Judge & Speaker',
    company: 'Founder of Educosys',
    topic: 'How to Be Job-Ready in the AI Era',
    bio: 'Founder of Educosys and a renowned tech educator. Keerti will be delivering an essential talk on "How to Be Job-Ready in the AI Era," exploring how to leverage AI tools to enhance productivity, staying relevant in a rapidly evolving tech landscape, and the core skills every developer needs to thrive in the age of artificial intelligence.',
    photo: '/events/Speaker_2.webp',
    linkedin: 'https://www.linkedin.com/in/keertipurswani/',
  },
];

export function Events() {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState<typeof SPEAKERS[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'popular' | 'trending'>('all');
  type FilterId = 'all' | 'popular' | 'trending';
  const [mounted, setMounted] = useState(false);
  const { addItem, items } = useCart();

  const [showRsvpForm, setShowRsvpForm] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({ name: '', email: '', phone: '', college: '', accessCode: '', transactionId: '', receipt: null as File | null, teamMembers: [] as string[], danceStyle: '' });
  const [rsvpStatus, setRsvpStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [rsvpError, setRsvpError] = useState('');
  const [rsvpTicketId, setRsvpTicketId] = useState<string | null>(null);
  const [rsvpAccessTier, setRsvpAccessTier] = useState<string>('GA');

  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownloadTicket = async () => {
    if (!ticketRef.current || !selectedEvent) return;

    try {
      const dataUrl = await toPng(ticketRef.current, {
        backgroundColor: '#0c0702',
        pixelRatio: 2,
        cacheBust: true,
        // Prevent html-to-image from aggressively fetching external stylesheets like Google Fonts which throw CORS errors
        fontEmbedCSS: '',
        skipFonts: true, // Alternatively, you can use skipFonts: true to prevent font embedding entirely
      });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `TECHUTOPIA-Ticket-${selectedEvent.title.replace(/\s+/g, '-')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to download ticket:', err);
    }
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    setShowRsvpForm(false);
    setRsvpStatus('idle');
    setRsvpTicketId(null);
    setRsvpAccessTier('GA');
    setRsvpForm({ name: '', email: '', phone: '', college: '', accessCode: '', transactionId: '', receipt: null, teamMembers: [], danceStyle: '' });
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    if (!rsvpForm.name || !rsvpForm.email || !rsvpForm.phone || !rsvpForm.college) {
      setRsvpError('All fields are required');
      setRsvpStatus('error');
      return;
    }

    if (selectedEvent.entryFee > 0) {
      if (!rsvpForm.transactionId || !rsvpForm.receipt) {
        setRsvpError('Transaction ID and Payment Receipt are required for paid events');
        setRsvpStatus('error');
        return;
      }
    }

    setRsvpStatus('loading');
    setRsvpError('');

    try {
      let res;
      if (selectedEvent.entryFee > 0) {
        const formData = new FormData();
        formData.append('eventId', selectedEvent.id.toString());
        formData.append('eventTitle', selectedEvent.title);
        formData.append('attendeeName', rsvpForm.name);
        formData.append('attendeeEmail', rsvpForm.email);
        formData.append('attendeePhone', rsvpForm.phone);
        formData.append('college', rsvpForm.college);
        formData.append('transactionId', rsvpForm.transactionId);
        formData.append('receipt', rsvpForm.receipt as Blob);
        formData.append('teamMembers', JSON.stringify(rsvpForm.teamMembers));
        if (rsvpForm.danceStyle) {
          formData.append('danceStyle', rsvpForm.danceStyle);
        }

        res = await fetch('/api/register/paid', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to submit details');

        setRsvpStatus('success');
        // Paid tickets won't have a ticketId yet because they are pending
      } else {
        res = await fetch('/api/register/free', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventId: selectedEvent.id,
            eventTitle: selectedEvent.title,
            attendeeName: rsvpForm.name,
            attendeeEmail: rsvpForm.email,
            attendeePhone: rsvpForm.phone,
            college: rsvpForm.college,
            accessCode: rsvpForm.accessCode,
            teamMembers: rsvpForm.teamMembers,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to register');

        setRsvpStatus('success');
        setRsvpTicketId(data.ticketId);
        setRsvpAccessTier(data.accessTier || 'GA');
      }
    } catch (err) {
      setRsvpStatus('error');
      setRsvpError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.desc.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterType === 'all') return true;
      if (filterType === 'popular') return evt.isEpic;
      if (filterType === 'trending') return evt.isMythic;
      return true;
    });
  }, [searchQuery, filterType]);

  return (
    <section
      id="events"
      className="relative min-h-screen bg-[#020205] flex flex-col items-center pt-20 sm:pt-28 md:pt-40 pb-12 sm:pb-20 px-3 sm:px-4 overflow-hidden"
    >
      {/* 4-Layer Deep Parallax Background - Using fixed wrapper instead of bg-fixed to prevent severe mobile scroll lag */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Base Etching - CSS class handles filter to avoid inline style warning */}
        <div className="absolute inset-x-0 top-0 h-full opacity-20 bg-[url('/events/bg.png')] bg-cover bg-center bg-etch will-change-transform" />

        {/* Layer 2: Floating Sigils (Slow) */}
        <div className="absolute inset-0 flex items-center justify-around opacity-10 blur-sm overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="text-[8rem] sm:text-[14rem] md:text-[20rem] font-serif select-none will-change-transform"
              animate={{
                y: [0, -40, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {['╬⌐', '╬ú', '╬ª', '╬ö', '╬ô', '╬¿'][i]}
            </motion.div>
          ))}
        </div>

        {/* Layer 3: Ember Particle Effect - styles injected via <style> to avoid inline style warnings */}
        {mounted && (
          <div className="absolute inset-0" id="ember-layer">
            <style>{EMBER_CSS}</style>
            {EMBER_PARTICLES.map((_, i) => (
              <div key={i} className={`ember-particle ember-${i}`} />
            ))}
          </div>
        )}

        {/* Layer 4: Vignette & Depth */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,#020205_90%]" />
      </div>

      {(
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative z-10 w-full flex flex-col items-center mb-12 sm:mb-16 md:mb-24"
        >
          <div className="relative">
            <h2 className="text-5xl sm:text-7xl md:text-[9rem] lg:text-[12rem] font-[Cinzel] font-black tracking-[-0.05em] text-transparent stroke-1 stroke-[#d4af37]/30 absolute inset-0 select-none">
              EVENTS
            </h2>
            {/* Animated Glow Layer - cheaper than animating textShadow */}
            <motion.h2
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-5xl sm:text-7xl md:text-[9rem] lg:text-[12rem] font-[Cinzel] font-black tracking-[-0.05em] text-[#d4af37] absolute inset-0 blur-xl z-0 will-change-opacity select-none"
            >
              EVENTS
            </motion.h2>
            {/* Foreground Text */}
            <h2 className="text-5xl sm:text-7xl md:text-[9rem] lg:text-[12rem] font-[Cinzel] font-black tracking-[-0.05em] bg-linear-to-b from-[#fff8e7] via-[#d4af37] to-[#8a6d3b] bg-clip-text text-transparent relative z-10 select-none">
              EVENTS
            </h2>
          </div>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "min(300px, 80vw)" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-px bg-linear-to-r from-transparent via-[#d4af37] to-transparent mt-3 sm:mt-4"
          />
          <p className="mt-4 sm:mt-6 text-[#d4af37] font-[Cinzel] italic text-sm sm:text-base md:text-xl tracking-[0.25em] sm:tracking-[0.4em] uppercase text-center opacity-80 px-4">
            - The XII Labours -
          </p>
        </motion.div>
      )}





      {(
        <div className="relative z-10 w-full mb-8 flex items-center justify-center mt-16">
          <h3 className="text-4xl md:text-6xl font-[Cinzel] font-black text-white tracking-wider uppercase text-center border-b-2 border-[#d4af37] pb-4 px-12">The Events</h3>
        </div>
      )}

      {(
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mb-10 sm:mb-16 md:mb-24 px-4 sm:px-4 italic">
          {/* Divine Search */}
          <div className="relative w-full max-w-2xl group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-[#d4af37]/0 via-[#d4af37]/20 to-[#d4af37]/0 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A1C23]/40 border border-[#d4af37]/20 rounded-2xl py-4 sm:py-5 pl-12 sm:pl-14 pr-4 sm:pr-6 text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] transition-all backdrop-blur-xl relative z-10 text-base sm:text-lg font-[Cinzel]"
            />
            <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-[#d4af37] transition-colors z-20" size={20} />
          </div>
        </div>
      )}

      {/* Masonry Temple Pillar Grid */}
      {(
        <div className="relative z-10 columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 md:gap-12 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 pb-24">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((evt, idx) => (
              <motion.div
                key={evt.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.4, ease: "easeOut", delay: idx * 0.04 }}
                className="break-inside-avoid w-full mb-6 sm:mb-8 md:mb-12"
              >
                <EventCard evt={evt} onClick={() => setSelectedEvent(evt)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* No Results Placeholder */}
      {filteredEvents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 flex flex-col items-center justify-center py-20 text-stone-500"
        >
          <Search size={48} className="mb-4 opacity-20" />
          <p className="font-[Cinzel] text-xl">No events found in the scrolls...</p>
        </motion.div>
      )}

      {/* Temple Portal Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeEventModal}
              className="absolute inset-0 bg-[#020205]/98 backdrop-blur-3xl"
            />

            <motion.div
              initial={{ scale: 0.8, y: 60, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, y: 60, opacity: 0, rotateY: -90 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              style={{ perspective: 2000 }}
              className="relative z-10 w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl h-[85vh] sm:max-h-[85vh] bg-[#0B0C10] border border-[#d4af37]/30 rounded-t-3xl sm:rounded-3xl shadow-[0_0_100px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col md:flex-row mythic-border-gold"
            >
              <button
                onClick={closeEventModal}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/50 text-white rounded-full hover:scale-110 transition-transform backdrop-blur-md border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-black"
                aria-label="Close event details"
              >
                <X size={20} />
              </button>



              {/* Details Side: The Legend */}
              <div className="flex-1 p-5 sm:p-8 md:p-10 lg:p-14 overflow-y-auto italic bg-[#1A1C23]/30 backdrop-blur-sm custom-scrollbar flex flex-col">
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-[Cinzel] font-black text-[#d4af37] mb-4 sm:mb-6 uppercase tracking-widest leading-tight"
                >
                  {selectedEvent.title}
                </motion.h2>
                <div className="mb-6 sm:mb-10 flex flex-wrap gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/5 px-3 sm:px-5 py-2 sm:py-3 rounded-xl border border-[#d4af37]/10">
                    <Clock className="text-[#d4af37] shrink-0" size={16} />
                    <span className="text-white text-xs sm:text-sm md:text-base font-data font-bold tracking-wider sm:tracking-widest uppercase">{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 bg-white/5 px-3 sm:px-5 py-2 sm:py-3 rounded-xl border border-[#d4af37]/10">
                    <MapPin className="text-[#d4af37] shrink-0" size={16} />
                    <span className="text-white text-xs sm:text-sm md:text-base font-bold tracking-wider sm:tracking-widest uppercase">{selectedEvent.location}</span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="prose prose-invert max-w-none mb-8 sm:mb-12"
                >
                  <div className="flex items-center gap-4 mb-4 sm:mb-6">
                    <div className="h-0.5 w-8 sm:w-12 bg-[#d4af37]/30" />
                    <span className="text-[#d4af37] font-[Cinzel] text-xs sm:text-sm font-black tracking-widest uppercase">About the Event</span>
                  </div>
                  <p className="text-stone-300 text-base sm:text-lg md:text-xl leading-relaxed italic font-serif">
                    {selectedEvent.details}
                  </p>
                </motion.div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  {showRsvpForm ? (
                    <div className="bg-[#1A1C23]/60 p-4 sm:p-5 rounded-2xl border border-[#d4af37]/20 mt-2">
                      {rsvpStatus === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center">
                          <CheckCircle size={48} className="text-green-400 mb-6" />
                          <h4 className="text-xl font-[Cinzel] font-black text-white mb-2">
                            {selectedEvent.entryFee === 0 ? 'Registration Confirmed' : 'Submission Received'}
                          </h4>
                          <p className="text-stone-400 text-sm mb-8 italic">
                            {selectedEvent.entryFee === 0 ? 'Your boarding pass is ready for the quest!' : 'Your payment proof will be verified by our team. You will receive an email with your boarding pass once approved!'}
                          </p>

                          {selectedEvent.entryFee === 0 && rsvpTicketId && (
                            <div ref={ticketRef} className="w-full flex justify-center mb-4">
                              <BoardingPass
                                ticketId={rsvpTicketId}
                                eventTitle={selectedEvent.title}
                                attendee={rsvpForm.name}
                                time={selectedEvent.time}
                                venue={selectedEvent.location}
                                poster={selectedEvent.poster || '/events/artist_reveal.webp'}
                                accessTier={rsvpAccessTier}
                                teamMembers={rsvpForm.teamMembers}
                              />
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
                            {selectedEvent.entryFee === 0 && (
                              <button
                                onClick={handleDownloadTicket}
                                className="px-6 sm:px-8 py-3 bg-white/10 hover:bg-[#d4af37] border border-[#d4af37]/30 text-white hover:text-black rounded-xl transition-all font-[Cinzel] font-black uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2"
                              >
                                <Download size={16} />
                                Download Pass
                              </button>
                            )}
                            <button
                              onClick={closeEventModal}
                              className="px-6 sm:px-8 py-3 bg-[#d4af37] hover:bg-white text-black rounded-xl transition-all font-[Cinzel] font-black uppercase tracking-wider text-xs sm:text-sm"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handleRsvpSubmit} className="flex flex-col gap-3">
                          <h4 className="text-[#d4af37] font-[Cinzel] font-black text-lg mb-2 uppercase text-center">
                            {selectedEvent.entryFee === 0 ? 'RSVP for Free Entry' : 'Submit Payment Proof'}
                          </h4>

                          {selectedEvent.entryFee > 0 && (
                            <div className="mb-4 bg-white/5 p-4 rounded-xl border border-[#d4af37]/20 text-center text-sm font-sans flex flex-col gap-3">
                              <p className="text-stone-300">
                                Step 1: Complete your payment of <strong className="text-[#d4af37]">₹{selectedEvent.entryFee}</strong>{(selectedEvent.id === 4 || selectedEvent.id === 13) ? ' (for entire team)' : ''} on Cashfree.
                              </p>
                                <button
                                  type="button"
                                  onClick={() => {
                                    let link = '';
                                    if (selectedEvent.id === 4) link = 'https://payments.cashfree.com/forms/bgmitechutopia';
                                    else if (selectedEvent.id === 13) link = 'https://payments.cashfree.com/forms/valoranttechutopia';
                                    else if (selectedEvent.id === 12) link = 'https://payments.cashfree.com/forms/dancebattletechutopia';
                                    else if (selectedEvent.id === 11) link = 'https://payments.cashfree.com/forms/astronomyuem';
                                    if (link) window.open(link, '_blank');
                                  }}
                                className="bg-[#d4af37] hover:bg-white text-black font-black py-2 px-4 rounded-lg uppercase tracking-wide transition-colors"
                              >
                                Pay on Cashfree
                              </button>
                              <p className="text-stone-300 mt-2">
                                Step 2: Save your receipt and submit its details below.
                              </p>
                            </div>
                          )}

                          <input
                            type="text"
                            placeholder="Full Name"
                            value={rsvpForm.name}
                            onChange={e => setRsvpForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] font-[Cinzel] text-sm"
                            required
                          />
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={rsvpForm.email}
                            onChange={e => setRsvpForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] font-[Cinzel] text-sm"
                            required
                          />
                          <div className="flex gap-3">
                            <input
                              type="tel"
                              placeholder="Phone"
                              value={rsvpForm.phone}
                              onChange={e => setRsvpForm(prev => ({ ...prev, phone: e.target.value }))}
                              className="w-1/2 bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] font-[Cinzel] text-sm"
                              required
                            />
                            <input
                              type="text"
                              placeholder="College"
                              value={rsvpForm.college}
                              onChange={e => setRsvpForm(prev => ({ ...prev, college: e.target.value }))}
                              className="w-1/2 bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] font-[Cinzel] text-sm"
                              required
                            />
                          </div>

                          {selectedEvent.id === 12 && (
                            <select
                              title="Select Dance Style"
                              value={rsvpForm.danceStyle}
                              onChange={e => setRsvpForm(prev => ({ ...prev, danceStyle: e.target.value }))}
                              className="w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] font-[Cinzel] text-sm appearance-none cursor-pointer"
                              required
                            >
                              <option value="" disabled>Select Dance Style</option>
                              <option value="Popping">Popping</option>
                              <option value="Rep Your Style">Rep Your Style</option>
                            </select>
                          )}

                          {(selectedEvent.id === 4 || selectedEvent.id === 13) && (
                            Array.from({ length: selectedEvent.id === 4 ? 3 : 4 }).map((_, idx) => (
                              <input
                                key={`teammate-${idx}`}
                                type="text"
                                placeholder={`Teammate ${idx + 1} Name`}
                                value={rsvpForm.teamMembers[idx] || ''}
                                onChange={e => {
                                  const newMembers = [...rsvpForm.teamMembers];
                                  newMembers[idx] = e.target.value;
                                  setRsvpForm(prev => ({ ...prev, teamMembers: newMembers }));
                                }}
                                className="w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-stone-600 focus:outline-none focus:border-[#d4af37] font-[Cinzel] text-sm"
                                required
                              />
                            ))
                          )}
                          <input
                            type="text"
                            placeholder={selectedEvent.entryFee === 0 ? "Access Code (Optional)" : "Access Code"}
                            value={rsvpForm.accessCode}
                            onChange={e => setRsvpForm(prev => ({ ...prev, accessCode: e.target.value.toUpperCase() }))}
                            className={`w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-[#d4af37]/50 focus:outline-none focus:border-[#d4af37] font-[Cinzel] text-sm text-center tracking-[0.2em] ${selectedEvent.entryFee > 0 ? 'hidden' : ''}`}
                            maxLength={8}
                          />

                          {selectedEvent.entryFee > 0 && (
                            <>
                              <input
                                type="text"
                                placeholder="Cashfree Transaction ID"
                                value={rsvpForm.transactionId}
                                onChange={e => setRsvpForm(prev => ({ ...prev, transactionId: e.target.value }))}
                                className="w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3 text-white placeholder-[#d4af37]/50 focus:outline-none focus:border-[#d4af37] font-sans text-sm tracking-wider"
                                required={selectedEvent.entryFee > 0}
                              />
                              <div className="w-full bg-black/40 border border-[#d4af37]/20 rounded-xl px-4 py-3">
                                <label className="block text-xs text-stone-400 mb-2 uppercase tracking-widest font-[Cinzel]">Upload Payment Receipt (Image/PDF)</label>
                                <input
                                  type="file"
                                  accept="image/*,application/pdf"
                                  title="Upload Receipt Document"
                                  onChange={e => setRsvpForm(prev => ({ ...prev, receipt: e.target.files ? e.target.files[0] : null }))}
                                  className="w-full text-sm text-stone-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#d4af37] file:text-black hover:file:bg-white transition-colors"
                                  required={selectedEvent.entryFee > 0}
                                />
                              </div>
                            </>
                          )}

                          {rsvpStatus === 'error' && (
                            <div className="text-red-400 text-xs text-center mt-1">{rsvpError}</div>
                          )}

                          <div className="flex gap-3 mt-2">
                            <button
                              type="button"
                              onClick={() => setShowRsvpForm(false)}
                              className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-[Cinzel] py-3 rounded-xl transition-colors text-sm uppercase tracking-wider"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={rsvpStatus === 'loading'}
                              className="flex-1 bg-[#d4af37] hover:bg-white text-black font-[Cinzel] font-black py-3 rounded-xl transition-colors text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                            >
                              {rsvpStatus === 'loading' ? <Loader2 size={16} className="animate-spin" /> : (selectedEvent.entryFee === 0 ? 'Confirm RSVP' : 'Submit Proof')}
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  ) : selectedEvent.requiresBooking ? (
                    <>
                      <div className="flex items-center justify-between bg-[#1A1C23] rounded-xl px-4 sm:px-5 py-3 border border-[#d4af37]/20">
                        <span className="text-stone-400 font-[Cinzel] text-sm">Entry Fee</span>
                        <span className="text-[#d4af37] font-data font-black text-base sm:text-lg">
                          {selectedEvent.entryFee === 0 ? 'Free' : `₹${selectedEvent.entryFee}${(selectedEvent.id === 4 || selectedEvent.id === 13) ? ' (Per Team)' : ''}`}
                        </span>
                      </div>
                      <div className="relative group/btn mt-2">
                        <div className="absolute -inset-1 bg-[#d4af37] blur-lg opacity-20 group-hover/btn:opacity-40 transition-opacity duration-500" />
                        <button
                          onClick={() => setShowRsvpForm(true)}
                          aria-label={`Register for ${selectedEvent.title}`}
                          className="w-full bg-[#d4af37] text-black font-[Cinzel] font-black py-4 sm:py-5 rounded-2xl hover:bg-white transition-all active:scale-95 text-sm sm:text-base md:text-lg tracking-[0.15em] sm:tracking-[0.2em] uppercase relative z-10 flex items-center justify-center gap-2 sm:gap-3"
                        >
                          <TicketIcon size={18} />
                          {selectedEvent.entryFee === 0 ? 'Register Free' : `Register Now - ₹${selectedEvent.entryFee}${(selectedEvent.id === 4 || selectedEvent.id === 13) ? ' (Per Team)' : ''}`}
                        </button>
                      </div>
                    </>
                  ) : selectedEvent.id !== 999 ? (
                    <div className="mt-2 w-full bg-[#1A1C23] border border-[#d4af37]/30 text-[#d4af37] font-[Cinzel] py-4 sm:py-5 rounded-2xl flex flex-col items-center justify-center gap-2 relative z-10 cursor-default">
                      <div className="flex items-center gap-2 font-black text-base sm:text-lg tracking-[0.2em] uppercase">
                        <CheckCircle size={20} />
                        Open For All
                      </div>
                      <span className="text-xs sm:text-sm text-stone-400 italic font-serif lowercase tracking-widest">(No RSVP Required)</span>
                    </div>
                  ) : (
                    <div className="relative group/btn mt-2">
                      <div className="absolute -inset-1 bg-[#d4af37] blur-lg opacity-20 group-hover/btn:opacity-40 transition-opacity duration-500" />
                      <button
                        onClick={() => setShowRsvpForm(true)}
                        aria-label={`RSVP for ${selectedEvent.title}`}
                        className="w-full bg-[#d4af37] text-black font-[Cinzel] font-black py-4 sm:py-5 rounded-2xl hover:bg-white transition-all active:scale-95 text-base sm:text-lg md:text-xl tracking-[0.2em] uppercase relative z-10"
                      >
                        RSVP For Free
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-4 text-stone-500 text-xs font-black tracking-[0.3em] uppercase opacity-60">
                    <div className="h-px w-8 bg-current" />
                    Status: Open
                    <div className="h-px w-8 bg-current" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speaker Detail Modal */}
      <AnimatePresence>
        {selectedSpeaker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSpeaker(null)}
              className="absolute inset-0 bg-[#020205]/98 backdrop-blur-3xl"
            />
            <motion.div
              initial={{ scale: 0.8, y: 60, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, y: 60, opacity: 0, rotateY: -90 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              style={{ perspective: 2000 }}
              className="relative z-10 w-full sm:max-w-3xl md:max-w-5xl lg:max-w-6xl h-[80vh] sm:max-h-[85vh] bg-[#0B0C10] border border-[#d4af37]/30 rounded-t-3xl sm:rounded-3xl shadow-[0_0_100px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col md:flex-row mythic-border-gold"
            >
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/50 text-white rounded-full hover:scale-110 transition-transform backdrop-blur-md border border-[#d4af37]/30 hover:bg-[#d4af37] hover:text-black"
                aria-label="Close speaker details"
              >
                <X size={20} />
              </button>

              {/* Photo Side */}
              <div className="w-full md:w-1/2 relative shrink-0 overflow-hidden bg-black">
                <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={selectedSpeaker.photo}
                  alt={selectedSpeaker.name}
                  className="w-full h-[40vh] md:h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0B0C10] via-transparent to-black/40 md:bg-linear-to-r md:from-[#0B0C10]/80 md:to-transparent pointer-events-none" />
              </div>

              {/* Info Side */}
              <div className="flex-1 p-6 sm:p-8 md:p-12 overflow-y-auto bg-[#1A1C23]/30 backdrop-blur-sm custom-scrollbar flex flex-col justify-center">
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#d4af37] text-xs font-black tracking-[0.3em] uppercase mb-1"
                >
                  {selectedSpeaker.role}
                </motion.p>
                {/* @ts-ignore */}
                {selectedSpeaker.company && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-stone-400 text-sm font-bold tracking-widest uppercase mb-3"
                  >
                    {/* @ts-ignore */}
                    {selectedSpeaker.company}
                  </motion.p>
                )}
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-[Cinzel] font-black text-white mb-2 uppercase tracking-wider leading-tight"
                >
                  {selectedSpeaker.name}
                </motion.h2>

                {/* @ts-ignore */}
                {selectedSpeaker.topic && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <span className="text-[#d4af37] text-[10px] font-black tracking-[0.2em] uppercase block mb-1">Talk Topic</span>
                    <h3 className="text-white text-lg sm:text-xl font-bold italic tracking-wide">
                      {/* @ts-ignore */}
                      "{selectedSpeaker.topic}"
                    </h3>
                  </motion.div>
                )}

                <div className="h-px w-16 bg-[#d4af37]/40 mb-6" />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-stone-300 text-base sm:text-lg leading-relaxed italic font-serif mb-8"
                >
                  {selectedSpeaker.bio}
                </motion.p>

                {/* @ts-ignore */}
                {selectedSpeaker.linkedin && (
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    /* @ts-ignore */
                    href={selectedSpeaker.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-[#d4af37] hover:text-white transition-colors group/link w-fit"
                  >
                    <div className="w-10 h-10 rounded-full border border-[#d4af37]/30 flex items-center justify-center group-hover/link:border-[#d4af37] transition-all">
                      <Linkedin size={18} />
                    </div>
                    <span className="font-black tracking-[0.2em] uppercase text-xs">View LinkedIn Profile</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function EventCard({ evt, onClick }: { evt: typeof events[0], onClick: () => void }) {
  // Use a ref to set CSS variables directly on the DOM node - avoids the inline-style lint warning
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const el = cardRef.current;
    if (el) {
      el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    }
  };

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV'];

  return (
    <motion.div
      ref={cardRef}
      layout="position"
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`group cursor-pointer flex flex-col w-full h-full relative mythic-border-gold mask-relic p-3 sm:p-4 bg-[#1A1C23] event-color-${evt.id}`}
    >
      {/* Glow Follow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 relic-glow-follow pointer-events-none" />

      {/* Background Labour Number */}
      <div className="absolute top-3 left-4 sm:top-4 sm:left-6 text-5xl sm:text-7xl font-[Cinzel] font-black text-white/5 select-none pointer-events-none group-hover:text-[#d4af37]/10 transition-colors duration-500">
        {romanNumerals[evt.id - 1]}
      </div>

      {/* Image Container */}
      <div className="relative w-full overflow-hidden mb-3 sm:mb-6 bg-black mask-relic shrink-0 flex items-center justify-center">
        {/* The organically fitted actual poster */}
        <img
          src={evt.poster}
          alt={evt.title}
          className="relative z-10 w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0 drop-shadow-2xl"
          loading="lazy"
        />

        {/* Overlay Gradients */}
        <div className="absolute inset-0 z-20 bg-linear-to-t from-[#1A1C23] via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col italic px-1 sm:px-2">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#d4af37]/30 to-transparent" />
          <span className="text-[#d4af37] font-data text-[9px] sm:text-[10px] font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            Day {evt.time.split(',')[0]}
          </span>
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-[#d4af37]/30 to-transparent" />
        </div>

        <h3 className="text-sm sm:text-lg lg:text-xl font-[Cinzel] font-black text-white mb-1 sm:mb-2 tracking-tight group-hover:text-[#d4af37] transition-all duration-300 uppercase line-clamp-2">
          {evt.title}
        </h3>


        <div className="mt-auto flex items-center justify-between py-2 sm:py-3 border-t border-[#d4af37]/10">
          <div className="flex items-center gap-1 sm:gap-1.5 text-stone-500 min-w-0">
            <MapPin size={10} className="text-[#d4af37]/70 shrink-0" />
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider truncate">{evt.location}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-1">
            <span className="text-[#d4af37] font-data font-black text-sm sm:text-base">{evt.entryFee === 0 ? 'Free' : `₹${evt.entryFee}`}</span>
            {evt.entryFee > 0 && <span className="text-white text-[9px] sm:text-[10px] font-black tracking-widest uppercase">Select</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
