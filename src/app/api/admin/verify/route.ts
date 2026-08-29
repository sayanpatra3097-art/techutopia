import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Ticket from '@/models/Ticket';
import { eventsData } from '@/data/events';
import { generateBoardingPassHTML } from '@/lib/emailBoardingPass';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { ticketId, action, password } = body;

        // Simple auth
        if (password !== 'poseidon') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!ticketId || !['approve', 'reject'].includes(action)) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        await connectDB();

        const ticket = await Ticket.findOne({ ticketId });
        
        if (!ticket) {
            return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
        }

        if (ticket.status !== 'pending') {
             return NextResponse.json({ error: `Registration is already ${ticket.status}` }, { status: 400 });
        }

        if (action === 'reject') {
            ticket.status = 'rejected';
            await ticket.save();
            return NextResponse.json({ success: true, message: 'Registration rejected.' });
        }

        // --- APPROVAL FLOW ---
        ticket.status = 'approved';
        await ticket.save();

        // Send Email using same logic as free RSVP
        if (process.env.RESEND_API_KEY || (process.env.EMAIL_USER && process.env.EMAIL_PASS)) {
            const eventInfo: any = eventsData.find(e => Number(e.id) === Number(ticket.eventId)) || eventsData.find(e => e.title === ticket.eventTitle) || { time: 'TBD', location: 'Campus' };

            const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
            const siteUrl = rawSiteUrl.includes('localhost') ? 'https://techutopia-v5.vercel.app' : (rawSiteUrl || 'https://techutopia-v5.vercel.app');
            let posterUrl = eventInfo.poster && eventInfo.poster.startsWith('/') ? `${siteUrl}${eventInfo.poster}` : eventInfo.poster;

            const emailHtml = `<!DOCTYPE html><html><body style="background:#020205;color:#ffecd1;font-family:Georgia,serif;padding:32px">
            <div style="max-width:640px;margin:0 auto">
                <h1 style="color:#d4af37;margin-bottom:4px;font-size:28px">TECHUTOPIA 2026</h1>
                <p style="color:#8b8680;margin:0 0 32px 0;font-size:14px;letter-spacing:2px">PAYMENT VERIFIED & RSVP CONFIRMED</p>
                
                <div style="margin-bottom:40px; line-height:1.6; font-size:16px;">
                    <p>Hi <strong>${ticket.attendeeName}</strong>,</p>
                    <p>Good news! Your payment for <strong>${ticket.eventTitle}</strong> has been successfully verified.</p>
                    <p>Below is your digital boarding pass, containing both the entry details and the official terms and conditions.</p>
                </div>

                <h3 style="color:#fff;margin-bottom:20px;text-align:center;font-size:22px;text-transform:uppercase;letter-spacing:4px">Your Digital Boarding Pass</h3>
                
                ${generateBoardingPassHTML({
                    ticketId: ticket.ticketId,
                    eventTitle: ticket.eventTitle,
                    attendeeName: ticket.attendeeName,
                    venue: eventInfo.location || 'Campus',
                    time: eventInfo.time || 'TBD',
                    posterUrl: posterUrl,
                    siteUrl: siteUrl,
                    accessTier: ticket.accessTier,
                    teamMembers: ticket.teamMembers,
                    danceStyle: ticket.danceStyle,
                })}
                
                <div style="margin-top:40px; border-top:1px solid #3d3520; padding-top:20px; color:#8b8680; font-size:14px;">
                    <p>We look forward to seeing you at the event!</p>
                    <p style="margin-top:20px;"><strong>Regards,</strong><br/>UEM & TECHUTOPIA 2026 Team</p>
                </div>

                <p style="text-align:center;color:#444;font-size:11px;margin-top:40px">Ticket ID: ${ticket.ticketId} | Verified Digital Entry Pass</p>
            </div></body></html>`;

            try {
                if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured');
                const { Resend } = await import('resend');
                const resend = new Resend(process.env.RESEND_API_KEY);

                await resend.emails.send({
                    from: 'TECHUTOPIA 2026 <teams@techutopia.com>',
                    to: ticket.attendeeEmail,
                    replyTo: 'teams@techutopia.com',
                    subject: `✅ Payment Verified: ${ticket.eventTitle} — TECHUTOPIA 2026`,
                    html: emailHtml,
                });
                console.log('[admin-verify] Resend: Email sent successfully');
            } catch (resendError: any) {
                console.warn('[admin-verify] Resend failed:', resendError.message);

                // Fallback to Gmail SMTP
                const cleanEmail = (process.env.EMAIL_USER || '').trim();
                const cleanPass = (process.env.EMAIL_PASS || '').trim().replace(/\s+/g, '');
                if (cleanEmail && cleanPass) {
                    console.log('[admin-verify] Fallback: Attempting via Gmail SMTP...');
                    try {
                        const nodemailer = await import('nodemailer');
                        const transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: { user: cleanEmail, pass: cleanPass },
                        });

                        await transporter.sendMail({
                            from: `"TECHUTOPIA 2026" <teams@uem.edu.in>`,
                            to: ticket.attendeeEmail,
                            replyTo: 'teams@uem.edu.in',
                            subject: `✅ Payment Verified: ${ticket.eventTitle} — TECHUTOPIA 2026`,
                            text: `Your payment is verified! Hi ${ticket.attendeeName}, your RSVP for ${ticket.eventTitle} is confirmed! Ticket ID: ${ticket.ticketId}.`,
                            html: emailHtml,
                        });
                        console.log('[admin-verify] Gmail fallback: Email sent successfully');
                    } catch (gmailError: any) {
                        console.error('[admin-verify] Gmail fallback failed also:', gmailError.message);
                    }
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Registration approved and email sent.',
            ticketId: ticket.ticketId,
        });
    } catch (err: any) {
        console.error('[admin-verify]', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
