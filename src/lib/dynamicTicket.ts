import mongoose, { Schema, Model } from 'mongoose';
import { ITicket } from '@/models/Ticket';
import { eventsData } from '@/data/events';

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
            default: 'approved'
        },
        transactionId: { type: String },
        paymentReceiptData: { type: String },
        paymentReceiptMimeType: { type: String },
    },
    { timestamps: true }
);

/**
 * Sanitizes a title for use as a MongoDB collection name.
 */
export function sanitizeTitle(title: string): string {
    return title.toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
}

/**
 * Returns a Mongoose model for a specific event collection.
 * Collections are named like 'tickets_maan_panu_live_concert', etc.
 */
export function getTicketModel(identifier: number | string, providedTitle?: string): Model<ITicket> {
    let collectionName = '';

    if (typeof identifier === 'string' && identifier.startsWith('tickets_')) {
        collectionName = identifier;
    } else {
        let title = providedTitle;
        
        // Try to find title in eventsData if not provided
        if (!title) {
            if (Number(identifier) === 999) {
                title = 'Maan Panu Live Concert';
            } else {
                const event = eventsData.find(e => Number(e.id) === Number(identifier));
                title = event?.title;
            }
        }

        const sanitizedTitle = title ? sanitizeTitle(title) : identifier.toString();
        collectionName = `tickets_${sanitizedTitle}`;
    }
    
    // Check if model already exists in Mongoose to avoid OverwriteModelError
    if (mongoose.models[collectionName]) {
        return mongoose.models[collectionName] as Model<ITicket>;
    }
    
    // Create new model with the specific collection name
    return mongoose.model<ITicket>(collectionName, TicketSchema, collectionName);
}

/**
 * Utility to get all possible event collections with human-friendly labels
 */
export async function getAllEventCollections(): Promise<{name: string, label: string}[]> {
    if (!mongoose.connection.db) return [];
    const collections = await mongoose.connection.db.listCollections().toArray();
    return collections
        .map(c => c.name)
        .filter(name => name.startsWith('tickets_') && name !== 'tickets')
        .map(name => ({
            name,
            label: name.replace('tickets_', '').replace(/_/g, ' ').toUpperCase()
        }));
}
