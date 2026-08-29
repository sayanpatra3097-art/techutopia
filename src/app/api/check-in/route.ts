import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Ticket from '@/models/Ticket';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { ticketId, password } = body;

        // Simple auth
        if (password !== 'poseidon') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!ticketId || typeof ticketId !== 'string') {
            return NextResponse.json({ error: 'Missing or invalid ticketId' }, { status: 400 });
        }

        await connectDB();

        const updated = await Ticket.findOneAndUpdate(
            { ticketId: ticketId.toString(), isCheckedIn: false },
            { isCheckedIn: true },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ error: 'Ticket not found or already checked in' }, { status: 400 });
        }

        return NextResponse.json({ success: true, attendeeName: updated.attendeeName });

    } catch (err) {
        console.error('[check-in]', err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
