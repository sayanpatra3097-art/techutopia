"use client";

import TicketDownloadView from '@/components/ui/TicketDownloadView';

const sampleTicket = {
    ticketId: 'HUEM-2026-SAMPLE-PREVIEW',
    attendeeName: 'John Doe',
    eventTitle: 'Dreamscape VR',
    eventId: 14,
    accessTier: 'GA',
};

const sampleEvent = {
    id: 14,
    title: 'Dreamscape VR',
    time: '14th March, 10:00 AM onwards',
    location: 'Experience Zone',
    poster: '/events/VR.webp',
    color: '#74c0fc',
};

export default function TicketPreviewPage() {
    return <TicketDownloadView ticket={sampleTicket} event={sampleEvent} />;
}
