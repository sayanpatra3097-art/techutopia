import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Ticket from '@/models/Ticket';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { ticketId, scannerEventId, password } = body;

        // Simple auth
        if (password !== 'poseidon') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!ticketId || typeof ticketId !== 'string' || scannerEventId === undefined) {
            return NextResponse.json({ error: 'Missing or invalid parameters' }, { status: 400 });
        }

        await connectDB();

        const ticket = await Ticket.findOne({ ticketId: ticketId.toString() });

        if (!ticket) {
            return NextResponse.json({ valid: false, message: 'Ticket not found' });
        }

        if (ticket.eventId !== Number(scannerEventId)) {
            // It's a valid ticket, but for a different event!
            return NextResponse.json({
                valid: false,
                message: `Ticket is for another event: ${ticket.eventTitle}`
            });
        }

        if (ticket.isCheckedIn) {
            return NextResponse.json({
                valid: false,
                message: 'Ticket already scanned.',
                attendeeName: ticket.attendeeName
            });
        }

        return NextResponse.json({
            valid: true,
            message: 'Valid Ticket',
            ticket: {
                _id: ticket._id,
                attendeeName: ticket.attendeeName,
                college: ticket.college,
                eventTitle: ticket.eventTitle
            }
        });

    } catch (err) {
        console.error('[verify-ticket]', err);
        return NextResponse.json({ error: 'Server error check console' }, { status: 500 });
    }
}
