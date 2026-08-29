import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITicket extends Document {
    ticketId: string; // The unique string embedded in the QR code
    orderId?: string; // Links to Cashfree Order if paid
    eventId: number;
    eventTitle: string;
    attendeeName: string;
    attendeeEmail: string;
    attendeePhone: string;
    college: string;
    teamMembers?: string[];
    danceStyle?: string; // Dance Battle only: 'Popping' or 'Rep Your Style'
    isPaid: boolean;
    paymentReference?: string;
    isCheckedIn: boolean;
    accessTier: 'GA' | 'VIP' | 'HACK_TEAM' | 'ALL_ACCESS' | 'ARTIST_TEAM' | 'BACKSTAGE';
    status?: 'pending' | 'approved' | 'rejected';
    transactionId?: string;
    paymentReceiptData?: string; // Base64 encoded image
    paymentReceiptMimeType?: string;
    createdAt: Date;
    updatedAt: Date;
}

const TicketSchema = new Schema<ITicket>(
    {
        ticketId: { type: String, required: true, index: true },
        orderId: { type: String, index: true },
        eventId: { type: Number, required: true },
        eventTitle: { type: String, required: true },
        attendeeName: { type: String, required: true },
        attendeeEmail: { type: String, required: true, lowercase: true },
        attendeePhone: { type: String, required: true },
        college: { type: String, required: true },
        teamMembers: { type: [String], default: [] },
        danceStyle: { type: String },
        isPaid: { type: Boolean, default: false },
        paymentReference: { type: String },
        isCheckedIn: { type: Boolean, default: false },
        accessTier: {
            type: String,
            enum: ['GA', 'VIP', 'HACK_TEAM', 'ALL_ACCESS', 'ARTIST_TEAM', 'BACKSTAGE'],
            default: 'GA'
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'approved' // Default to approved for free registrations, overridden for paid
        },
        transactionId: { type: String },
        paymentReceiptData: { type: String }, // Storing base64 string
        paymentReceiptMimeType: { type: String },
    },
    { timestamps: true }
);

// Force Mongoose to recompile the schema in development mode for hot-reloading
if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Ticket;
}

const Ticket: Model<ITicket> =
    (mongoose.models.Ticket as Model<ITicket>) ||
    mongoose.model<ITicket>('Ticket', TicketSchema);

export default Ticket;
