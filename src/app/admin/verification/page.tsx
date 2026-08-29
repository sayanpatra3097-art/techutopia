'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle, XCircle, Search, Eye, X } from 'lucide-react';

export default function VerificationDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [tickets, setTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // ticketId

  const [selectedImage, setSelectedImage] = useState<{ url: string, type: string } | null>(null);

  const fetchPendingTickets = async (pwd: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/pending', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 401) {
          setAuthError('Incorrect Password');
          setIsAuthenticated(false);
        } else {
          setAuthError(data.error || 'Failed to fetch');
        }
      } else {
        setIsAuthenticated(true);
        setAuthError('');
        setTickets(data.tickets || []);
      }
    } catch (err) {
      setAuthError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    fetchPendingTickets(password);
  };

  const handleAction = async (ticketId: string, action: 'approve' | 'reject') => {
    if (!confirm(`Are you sure you want to ${action} this registration?`)) return;
    
    setActionLoading(ticketId);
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId, action, password }),
      });
      const data = await res.json();
      
      if (res.ok) {
        // Remove from list
        setTickets(prev => prev.filter(t => t.ticketId !== ticketId));
        alert(`Success: ${data.message}`);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert('Network error occurred.');
    } finally {
      setActionLoading(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020205] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-[#1A1C23] p-8 rounded-2xl border border-[#d4af37]/30 max-w-md w-full flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-[Cinzel] font-black text-[#d4af37] mb-2 uppercase">Admin Portal</h1>
            <p className="text-stone-400 font-serif italic text-sm">Verification Dashboard</p>
          </div>
          
          <div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Access Key"
              className="w-full bg-black/50 border border-[#d4af37]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] font-mono tracking-widest text-center"
              autoFocus
            />
            {authError && <p className="text-red-400 text-xs text-center mt-2">{authError}</p>}
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#d4af37] text-black font-[Cinzel] font-black py-3 rounded-xl hover:bg-white transition-colors uppercase tracking-widest flex items-center justify-center"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Authenticate'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020205] p-4 sm:p-8 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-[Cinzel] font-black text-[#d4af37] uppercase">Pending Verifications</h1>
            <p className="text-stone-400 font-serif italic mt-1">{tickets.length} registrations awaiting review</p>
          </div>
          <button 
            onClick={() => fetchPendingTickets(password)}
            className="text-stone-300 hover:text-white flex items-center gap-2 text-sm bg-white/5 px-4 py-2 rounded-lg border border-white/10"
          >
            Refresh Data
          </button>
        </div>

        {tickets.length === 0 ? (
          <div className="bg-[#1A1C23]/50 border border-[#d4af37]/20 rounded-2xl p-12 flex flex-col items-center justify-center text-stone-500">
            <CheckCircle size={48} className="mb-4 opacity-50" />
            <p className="font-[Cinzel] text-xl uppercase">All caught up!</p>
            <p className="font-serif italic text-sm mt-2">No pending verifications found.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {tickets.map(ticket => (
              <div key={ticket.ticketId} className="bg-[#1A1C23] border border-[#d4af37]/30 rounded-2xl p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
                
                {/* Details Section */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-[Cinzel] font-black text-white">{ticket.attendeeName}</h3>
                      <p className="text-[#d4af37] text-sm uppercase tracking-wider font-bold mb-2">{ticket.eventTitle}</p>
                    </div>
                    <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Pending
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm bg-black/30 p-4 rounded-xl">
                    <div className="flex flex-col">
                      <span className="text-stone-500 text-xs uppercase tracking-wider">Email</span>
                      <span className="text-stone-200">{ticket.attendeeEmail}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-stone-500 text-xs uppercase tracking-wider">Phone</span>
                      <span className="text-stone-200">{ticket.attendeePhone}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-stone-500 text-xs uppercase tracking-wider">College</span>
                      <span className="text-stone-200">{ticket.college}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-wider font-bold text-[#d4af37]">Transaction ID</span>
                      <span className="text-[#d4af37] font-mono">{ticket.transactionId || 'N/A'}</span>
                    </div>
                    {ticket.danceStyle && (
                      <div className="flex flex-col">
                        <span className="text-stone-500 text-xs uppercase tracking-wider">Dance Style</span>
                        <span className="text-stone-200 font-bold">{ticket.danceStyle}</span>
                      </div>
                    )}
                  </div>

                  {ticket.teamMembers && ticket.teamMembers.length > 0 && (
                    <div className="bg-black/30 p-4 rounded-xl text-sm">
                      <span className="text-stone-500 text-xs uppercase tracking-wider mb-2 block">Team Members</span>
                      <div className="flex flex-wrap gap-2">
                        {ticket.teamMembers.map((member: string, idx: number) => (
                          <span key={idx} className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-stone-200">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions & Receipt Section */}
                <div className="lg:w-64 flex flex-col gap-4 justify-between border-t lg:border-t-0 lg:border-l border-[#d4af37]/10 pt-4 lg:pt-0 lg:pl-6">
                  {ticket.paymentReceiptData ? (
                    <button
                      onClick={() => setSelectedImage({ url: `data:${ticket.paymentReceiptMimeType};base64,${ticket.paymentReceiptData}`, type: ticket.paymentReceiptMimeType })}
                      className="w-full h-24 sm:h-32 bg-black rounded-xl border border-white/10 flex flex-col items-center justify-center gap-2 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/5 transition-all text-stone-400 hover:text-[#d4af37] overflow-hidden relative group"
                    >
                      {ticket.paymentReceiptMimeType?.includes('pdf') ? (
                         <div className="flex flex-col items-center">
                            <Eye size={24} />
                            <span className="text-xs uppercase tracking-wider mt-2">View PDF</span>
                         </div>
                      ) : (
                        <>
                          <img src={`data:${ticket.paymentReceiptMimeType};base64,${ticket.paymentReceiptData}`} alt="Receipt" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-20 transition-opacity" />
                          <div className="relative z-10 flex flex-col items-center drop-shadow-md">
                            <Eye size={24} className="text-white" />
                            <span className="text-xs uppercase tracking-wider mt-2 font-bold text-white">View Receipt</span>
                          </div>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="w-full h-24 sm:h-32 bg-black rounded-xl border border-red-500/20 flex items-center justify-center text-red-400 text-xs uppercase tracking-wider">
                      No Receipt Attached
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAction(ticket.ticketId, 'reject')}
                      disabled={actionLoading === ticket.ticketId}
                      className="flex-1 bg-red-500/10 hover:bg-red-500 border border-red-500/30 text-red-500 hover:text-white py-2 rounded-lg transition-colors font-bold text-xs uppercase tracking-wider flex items-center justify-center"
                    >
                      {actionLoading === ticket.ticketId ? <Loader2 className="animate-spin" size={16} /> : 'Reject'}
                    </button>
                    <button 
                      onClick={() => handleAction(ticket.ticketId, 'approve')}
                      disabled={actionLoading === ticket.ticketId}
                      className="flex-1 bg-[#d4af37]/10 hover:bg-[#d4af37] border border-[#d4af37]/30 text-[#d4af37] hover:text-black py-2 rounded-lg transition-colors font-bold text-xs uppercase tracking-wider flex items-center justify-center"
                    >
                      {actionLoading === ticket.ticketId ? <Loader2 className="animate-spin" size={16} /> : 'Approve'}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-[#d4af37] transition-colors bg-black/50 p-2 rounded-full border border-white/10"
              onClick={() => setSelectedImage(null)}
              title="Close image view"
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              {selectedImage.type.includes('pdf') ? (
                 <iframe src={selectedImage.url} className="w-full h-full rounded-xl bg-white" title="Receipt PDF Document" />
              ) : (
                <img src={selectedImage.url} alt="Receipt Full" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
