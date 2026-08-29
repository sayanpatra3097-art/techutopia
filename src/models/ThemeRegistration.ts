import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IThemeRegistration extends Document {
    teamName: string;
    leaderName: string;
    email: string;
    phone: string;
    domain: string;
    problemId: string;
    problemTitle: string;
    createdAt: Date;
}

const ThemeRegistrationSchema: Schema = new Schema({
        teamName: {
            type: String,
            required: [true, 'Please provide a team name'],
        },
        leaderName: {
            type: String,
            required: [true, 'Please provide a leader name'],
        },
        email: {
            type: String,
            required: [true, 'Please provide an email address'],
        },
        phone: {
            type: String,
            required: [true, 'Please provide a phone number'],
        },
        domain: {
            type: String,
            required: [true, 'Please provide a domain/theme'],
        },
        problemId: {
            type: String,
            required: [true, 'Please provide a problem ID'],
        },
        problemTitle: {
            type: String,
            required: [true, 'Please provide a problem title'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        collection: 'themeregistrations',
        timestamps: true,
    }
);

// Prevent model overwrite upon Next.js HMR compilation
const ThemeRegistration: Model<IThemeRegistration> = mongoose.models.ThemeRegistration || mongoose.model<IThemeRegistration>('ThemeRegistration', ThemeRegistrationSchema);

export default ThemeRegistration;
