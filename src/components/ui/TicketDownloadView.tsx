"use client";

import React, { useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import BoardingPass from '@/components/ui/BoardingPass';
import { Download, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TicketDownloadView({ ticket, event }: { ticket: any, event: any }) {
    const ticketRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (!ticketRef.current) return;
        setIsDownloading(true);
        try {
            // Need to wait slightly to ensure fonts/images are loaded
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Adjust scale if necessary to ensure high quality on export
            const dataUrl = await htmlToImage.toPng(ticketRef.current, {
                quality: 1.0,
                pixelRatio: 2,
                backgroundColor: 'rgba(0,0,0,0)' // transparent
            });
            const link = document.createElement('a');
            link.download = `TECHUTOPIA_Ticket_${ticket.ticketId.substring(0, 8)}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Failed to download ticket:', error);
            alert('Failed to download ticket. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    if (!event) {
        return (
            <div className="min-h-screen bg-[#020205] flex items-center justify-center text-white font-data">
                Event data not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020205] flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center py-24 px-4 sm:px-8 mt-12">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-3xl md:text-5xl font-[Cinzel] text-[#d4af37] font-black mb-4 text-glow">
                        YOUR OFFICIAL PASS
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto font-data text-sm md:text-base">
                        Present this ticket at the registration desk for entry. You can download a high-quality copy to your device using the button below. Verify it using the QR code.
                    </p>
                </motion.div>

                {/* Ticket Container */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-5xl flex justify-center mb-12 relative"
                >
                    {/* Glow effect behind the ticket */}
                    <div className="absolute inset-0 bg-[#d4af37] opacity-5 blur-[100px] rounded-full" />
                    
                    <div 
                        className="w-full flex justify-center bg-transparent rounded-xl overflow-x-auto overflow-y-hidden perspective-[1000px]"
                    >
                        {/* We add a wrapper for the ref so html-to-image captures just the ticket content cleanly */}
                        <div ref={ticketRef} className="shrink-0 p-4 transition-transform duration-500 hover:rotate-y-[5deg] hover:rotate-x-2">
                            <BoardingPass 
                                ticketId={ticket.ticketId || 'XXXXXXXX'}
                                attendee={ticket.attendeeName || 'GUEST'}
                                eventTitle={ticket.eventTitle || 'TBA'}
                                venue={event?.location || 'TBA'}
                                time={event?.time || 'TBA'}
                                poster={event?.poster || '/events/artist_reveal.webp'}
                                accessTier={ticket.accessTier || 'GA'}
                            />
                        </div>
                    </div>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(212,175,55,0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-3 bg-[#d4af37] text-[#0c0702] px-8 py-4 rounded-full font-[Cinzel] font-black tracking-[0.15em] hover:bg-[#ffe58f] transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                >
                    {isDownloading ? (
                        <>
                            <Loader2 className="animate-spin w-5 h-5" />
                            GENERATING HIGH-RES...
                        </>
                    ) : (
                        <>
                            <Download className="w-5 h-5" />
                            DOWNLOAD PASS
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
}
