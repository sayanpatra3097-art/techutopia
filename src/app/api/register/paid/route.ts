import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getTicketModel } from '@/lib/dynamicTicket';

export const config = {
    api: {
        bodyParser: false, // Disallow Next.js default body parser to handle FormData
    },
};

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        
        const eventId = formData.get('eventId') as string;
        const eventTitle = formData.get('eventTitle') as string;
        const attendeeName = formData.get('attendeeName') as string;
        const attendeeEmail = formData.get('attendeeEmail') as string;
        const attendeePhone = formData.get('attendeePhone') as string;
        const college = formData.get('college') as string;
        const teamMembersStr = formData.get('teamMembers') as string;
        const transactionId = formData.get('transactionId') as string;
        const receiptFile = formData.get('receipt') as File;
        const danceStyle = formData.get('danceStyle') as string;

        let teamMembers: string[] = [];
        if (teamMembersStr) {
            try {
                teamMembers = JSON.parse(teamMembersStr);
            } catch (e) {
                console.error('Failed to parse team members:', e);
            }
        }

        if (!eventId || !eventTitle || !attendeeName || !attendeeEmail || !transactionId || !receiptFile) {
            return NextResponse.json({ error: 'Missing required fields or receipt image' }, { status: 400 });
        }

        await connectDB();
        
        // Use dynamic model for specific event
        const TicketModel = getTicketModel(eventId);

        // Check for existing registration for this event by this email
        const existingTicket = await TicketModel.findOne({ attendeeEmail, eventId: Number(eventId) });
        if (existingTicket) {
            if (existingTicket.status === 'pending') {
                 return NextResponse.json({ error: 'You already have a pending registration for this event. Please wait for verification.' }, { status: 400 });
            } else if (existingTicket.status === 'approved') {
                 return NextResponse.json({ error: 'Your registration for this event is already approved.' }, { status: 400 });
            } else {
                 // Allowing retry if rejected
                 await TicketModel.deleteOne({ _id: existingTicket._id });
            }
        }

        // Convert the File back to a Base64 string for storage in MongoDB
        const arrayBuffer = await receiptFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString('base64');
        const mimeType = receiptFile.type;

        // Create pending ticket
        const newTicket = await TicketModel.create({
            ticketId: `PT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`, // Temp ID
            eventId: Number(eventId),
            eventTitle,
            attendeeName,
            attendeeEmail,
            attendeePhone: attendeePhone || 'N/A',
            college: college || 'N/A',
            teamMembers: teamMembers,
            danceStyle: danceStyle || undefined,
            isPaid: true,
            isCheckedIn: false,
            accessTier: 'GA',
            status: 'pending',
            transactionId: transactionId,
            paymentReceiptData: base64Image,
            paymentReceiptMimeType: mimeType
        });

        // We do not send the email yet because it's pending verification

        return NextResponse.json({
            success: true,
            message: 'Details Submitted! Your ticket will be emailed to you after verification.',
            status: 'pending'
        });
    } catch (err: any) {
        console.error('[register-paid]', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
