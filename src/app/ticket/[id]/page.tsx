import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import Ticket from '@/models/Ticket';
import { eventsData } from '@/data/events';
import TicketDownloadView from '@/components/ui/TicketDownloadView';

export default async function TicketPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    
    try {
        await connectDB();
        const ticket = await Ticket.findOne({ ticketId: id });

        if (!ticket) {
            return notFound();
        }

        const event = eventsData.find((e: any) => e.title === ticket.eventTitle || e.id === ticket.eventId);
        
        // Convert Mongoose document to plain object to pass as prop
        const ticketData = JSON.parse(JSON.stringify(ticket));

        return (
            <TicketDownloadView 
                ticket={ticketData} 
                event={event} 
            />
        );
    } catch (error) {
        console.error("Error fetching ticket:", error);
        return notFound();
    }
}
