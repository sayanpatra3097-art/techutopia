'use client';

import React, { useState, useEffect } from 'react';
import { Download, Search, Loader2 } from 'lucide-react';

export default function AttendeesPage() {
    const [attendees, setAttendees] = useState<any[]>([]);
    const [collections, setCollections] = useState<{name: string, label: string}[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAttendees();
    }, [selectedEventId]);

    const fetchAttendees = async () => {
        setLoading(true);
        try {
            // Build the URL, including the eventId query param if 'all' is not selected
            // Use 'poseidon' password as requested
            let baseUrl = '/api/admin/attendees?password=poseidon';
            const url = selectedEventId ? `${baseUrl}&eventId=${selectedEventId}` : baseUrl;
            const res = await fetch(url);
            const data = await res.json();
            if (data.success) {
                setAttendees(data.data);
                if (data.collections) {
                    setCollections(data.collections);
                }
            }
        } catch (error) {
            console.error('Failed to fetch attendees:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExportCSV = () => {
        if (attendees.length === 0) return;

        const headers = ['Ticket ID', 'Event Title', 'Name', 'Email', 'Phone', 'College', 'Dance Style', 'Team Members', 'Paid', 'Checked In', 'Registration Date'];
        const csvContent = [
            headers.join(','),
            ...attendees.map(a => [
                a.ticketId,
                `"${a.eventTitle}"`,
                `"${a.attendeeName}"`,
                `"${a.attendeeEmail}"`,
                `"${a.attendeePhone || ''}"`,
                `"${a.college || ''}"`,
                `"${a.danceStyle || ''}"`,
                `"${(a.teamMembers || []).join(', ')}"`,
                a.isPaid ? 'Yes' : 'No',
                a.isCheckedIn ? 'Yes' : 'No',
                `"${a.createdAt ? new Date(a.createdAt).toLocaleString() : ''}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'techutopia_attendees.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredAttendees = attendees.filter(a =>
        (a.attendeeName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (a.attendeeEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (a.eventTitle || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#020205] text-white pt-24 pb-12 px-4 font-sans relative">
            <div className="absolute inset-0 bg-[#d4af37]/5 mix-blend-overlay pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-[Cinzel] font-black text-[#d4af37] mb-2 uppercase tracking-wider">
                            Attendee Manifest
                        </h1>
                        <p className="text-stone-400 text-sm italic">
                            Total Registrations: {attendees.length}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                        <select
                            title="Select Event Table"
                            value={selectedEventId}
                            onChange={(e) => setSelectedEventId(e.target.value)}
                            className="bg-[#1A1C23]/60 border border-[#d4af37]/20 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[#d4af37] text-[#d4af37] font-bold cursor-pointer"
                        >
                            <option value="">-- RECENT TICKETS (ALL) --</option>
                            {collections.map(col => (
                                <option key={col.name} value={col.name}>{col.label}</option>
                            ))}
                        </select>

                        <div className="relative flex-1 md:w-72">
                            <input
                                type="text"
                                placeholder="Search by name, email, or event..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full bg-[#1A1C23]/60 border border-[#d4af37]/20 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#d4af37] text-white placeholder-stone-500"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        </div>
                        <button
                            onClick={handleExportCSV}
                            className="bg-[#d4af37] hover:bg-white text-black font-[Cinzel] font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors whitespace-nowrap"
                        >
                            <Download size={18} />
                            Export CSV
                        </button>
                    </div>
                </div>

                <div className="bg-[#1A1C23]/40 border border-[#d4af37]/20 rounded-2xl overflow-hidden backdrop-blur-sm">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-[#d4af37] bg-black/40 uppercase tracking-wider font-[Cinzel] border-b border-[#d4af37]/20">
                                <tr>
                                    <th className="px-6 py-4 whitespace-nowrap">Event</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Attendee</th>
                                    <th className="px-6 py-4 hidden md:table-cell whitespace-nowrap">Contact</th>
                                    <th className="px-6 py-4 hidden lg:table-cell whitespace-nowrap">Reg. Details</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Team</th>
                                    <th className="px-6 py-4 whitespace-nowrap">Dance Style</th>
                                    <th className="px-6 py-4 text-center whitespace-nowrap">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#d4af37]/10">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center text-stone-400">
                                            <Loader2 className="animate-spin mx-auto mb-4 text-[#d4af37]" />
                                            Scanning scrolls...
                                        </td>
                                    </tr>
                                ) : filteredAttendees.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center text-stone-400 font-serif italic">
                                            No attendees found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredAttendees.map((a, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 min-w-[200px]">
                                                <div className="font-bold text-white mb-1 line-clamp-1">{a.eventTitle}</div>
                                                <div className="text-xs text-stone-500 font-mono">{a.ticketId}</div>
                                            </td>
                                            <td className="px-6 py-4 min-w-[200px]">
                                                <div className="font-bold text-[#e3cf9d] mb-1">{a.attendeeName}</div>
                                                <div className="text-xs text-stone-400 md:hidden truncate">{a.attendeeEmail}</div>
                                            </td>
                                            <td className="px-6 py-4 hidden md:table-cell min-w-[250px]">
                                                <div className="text-stone-300 mb-1 truncate">{a.attendeeEmail}</div>
                                                <div className="text-xs text-stone-500">{a.attendeePhone || 'N/A'}</div>
                                            </td>
                                            <td className="px-6 py-4 hidden lg:table-cell min-w-[200px]">
                                                <div className="text-stone-300 mb-1 truncate">{a.college || 'N/A'}</div>
                                                {a.createdAt && (
                                                    <div className="text-[10px] text-stone-500 font-mono">
                                                        {new Date(a.createdAt).toLocaleString()}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 min-w-[150px]">
                                                {a.teamMembers && a.teamMembers.length > 0 ? (
                                                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                        {a.teamMembers.map((m: string, idx: number) => (
                                                            <span key={idx} className="text-[10px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-stone-300">
                                                                {m}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="text-stone-600 text-[10px]">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 min-w-[120px]">
                                                {a.danceStyle ? (
                                                    <span className="text-xs bg-[#d4af37]/10 border border-[#d4af37]/20 px-2 py-1 rounded text-[#d4af37] font-bold uppercase tracking-wider">
                                                        {a.danceStyle}
                                                    </span>
                                                ) : (
                                                    <span className="text-stone-600 text-[10px]">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1 items-center">
                                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${a.isPaid ? 'bg-green-900/40 text-green-400 border border-green-500/30' : 'bg-stone-900/60 text-stone-400 border border-stone-700/50'}`}>
                                                        {a.isPaid ? 'Paid' : 'Free'}
                                                    </span>
                                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${a.isCheckedIn ? 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30' : 'bg-red-900/20 text-red-400 border border-red-500/30'}`}>
                                                        {a.isCheckedIn ? '✓ In' : '✗ Out'}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
