import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getTicketModel, getAllEventCollections } from '@/lib/dynamicTicket';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const password = searchParams.get('password');
        const eventId = searchParams.get('eventId');

        if (password !== 'poseidon') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        if (eventId) {
            // Fetch from specific event collection
            const TicketModel = getTicketModel(eventId);
            const tickets = await TicketModel.find().sort({ createdAt: -1 }).lean();
            return NextResponse.json({ success: true, count: tickets.length, data: tickets });
        } else {
            // Return list of available event collections so Admin can choose
            const collections = await getAllEventCollections();
            
            // For backward compatibility or "Global View", find all tickets in main collection if any
            // but we'll primarily encourage event-specific selection.
            const Ticket = (mongoose.models.Ticket as any) || mongoose.model('Ticket');
            const mainTickets = await Ticket.find().sort({ createdAt: -1 }).limit(100).lean();

            return NextResponse.json({ 
                success: true, 
                count: mainTickets.length, 
                data: mainTickets,
                collections: collections 
            });
        }
    } catch (error: any) {
        console.error('Error fetching attendees:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
