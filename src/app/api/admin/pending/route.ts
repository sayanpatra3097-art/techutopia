import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Ticket from '@/models/Ticket';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { password, eventId } = body;

        // Simple auth
        if (password !== 'poseidon') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Find all pending tickets
        const pendingTickets = await Ticket.find({ status: 'pending' }).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            tickets: pendingTickets,
        });
    } catch (err: any) {
        console.error('[admin-pending]', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
