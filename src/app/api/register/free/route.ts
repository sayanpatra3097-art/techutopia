import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { getTicketModel } from '@/lib/dynamicTicket';
import { eventsData } from '@/data/events';
import { generateBoardingPassHTML } from '@/lib/emailBoardingPass';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { eventId, eventTitle, attendeeName, attendeeEmail, attendeePhone, college, accessCode, teamMembers } = body;

        if (!eventId || !eventTitle || !attendeeName || !attendeeEmail) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }

        const event = eventsData.find(e => Number(e.id) === Number(eventId));
        if (event && event.entryFee > 0) {
            return NextResponse.json({ error: 'This is a paid event. Please use the paid registration flow.' }, { status: 400 });
        }

        await connectDB();
        
        // Use dynamic model for specific event
        const TicketModel = getTicketModel(eventId);

        // Check for existing registration for this event by this email
        const existingTicket = await TicketModel.findOne({ attendeeEmail, eventId });
        if (existingTicket) {
            return NextResponse.json({ error: 'You have already registered for this event.' }, { status: 400 });
        }

        let accessTier = 'GA';
        if (accessCode) {
            const code = accessCode.toUpperCase().trim();
            if (code === '1F4A9C3B') accessTier = 'VIP';
            else if (code === '8B2E5D1F') accessTier = 'HACK_TEAM';
            else if (code === '4C90A7E2') accessTier = 'ALL_ACCESS';
            else if (code === 'D5132F8C') accessTier = 'ARTIST_TEAM';
            else if (code === 'E7A64B09') accessTier = 'BACKSTAGE';
        }

        // Create ticket
        const newTicket = await TicketModel.create({
            ticketId: `FT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            eventId,
            eventTitle,
            attendeeName,
            attendeeEmail,
            attendeePhone: attendeePhone || 'N/A',
            college: college || 'N/A',
            teamMembers: teamMembers || [],
            isPaid: false,
            isCheckedIn: false,
            accessTier,
        });

        // Send Email (optional/async)
        if (process.env.RESEND_API_KEY || (process.env.EMAIL_USER && process.env.EMAIL_PASS)) {
            const maanPanuFallback = { time: '15th March, 2026 \u2022 07:00 PM onwards', location: 'UEM Jaipur', poster: '/events/maan_panu_ticket.webp' };
            const eventInfo: any = eventsData.find(e => Number(e.id) === Number(eventId)) || eventsData.find(e => e.title === eventTitle) || (Number(eventId) === 999 || eventTitle.toLowerCase().includes('maan panu') ? maanPanuFallback : { time: 'TBD', location: 'Campus' });

            const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
            const siteUrl = rawSiteUrl.includes('localhost') ? 'https://techutopia-v5.vercel.app' : (rawSiteUrl || 'https://techutopia-v5.vercel.app');
            const posterUrl = eventInfo.poster && eventInfo.poster.startsWith('/') ? `${siteUrl}${eventInfo.poster}` : eventInfo.poster;

            const emailHtml = `<!DOCTYPE html><html><body style="background:#020205;color:#ffecd1;font-family:Georgia,serif;padding:32px">
            <div style="max-width:640px;margin:0 auto">
                <h1 style="color:#d4af37;margin-bottom:4px;font-size:28px">TECHUTOPIA 2026</h1>
                <p style="color:#8b8680;margin:0 0 32px 0;font-size:14px;letter-spacing:2px">RSVP CONFIRMATION</p>
                
                <div style="margin-bottom:40px; line-height:1.6; font-size:16px;">
                    <p>Hi <strong>${newTicket.attendeeName}</strong>,</p>
                    <p>Welcome to the TECHUTOPIA 2026 experience! We're thrilled to have you join us for this legendary edition of the festival.</p>
                    <p>Your RSVP for <strong>${newTicket.eventTitle}</strong> has been successfully confirmed. Below is your digital boarding pass, containing both the entry details and the official terms and conditions.</p>
                </div>

                <h3 style="color:#fff;margin-bottom:20px;text-align:center;font-size:22px;text-transform:uppercase;letter-spacing:4px">Your Digital Boarding Pass</h3>
                
                ${generateBoardingPassHTML({
                ticketId: newTicket.ticketId,
                eventTitle: newTicket.eventTitle,
                attendeeName: newTicket.attendeeName,
                venue: eventInfo.location || 'Campus',
                time: eventInfo.time || 'TBD',
                posterUrl,
                siteUrl,
                accessTier: newTicket.accessTier,
            })}
                
                <div style="margin-top:40px; border-top:1px solid #3d3520; padding-top:20px; color:#8b8680; font-size:14px;">
                    <p>We look forward to seeing you at the event!</p>
                    <p style="margin-top:20px;"><strong>Regards,</strong><br/>UEM & TECHUTOPIA 2026 Team</p>
                </div>

                <p style="text-align:center;color:#444;font-size:11px;margin-top:40px">Ticket ID: ${newTicket.ticketId} | Verified Digital Entry Pass</p>
            </div></body></html>`;

            console.log('[register-free] Attempting to send email via Resend...');

            try {
                if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured');
                const { Resend } = await import('resend');
                const resend = new Resend(process.env.RESEND_API_KEY);

                await resend.emails.send({
                    from: 'TECHUTOPIA 2026 <teams@techutopia.com>',
                    to: newTicket.attendeeEmail,
                    replyTo: 'teams@techutopia.com',
                    subject: `✅ RSVP Confirmed: ${newTicket.eventTitle} — TECHUTOPIA 2026`,
                    html: emailHtml,
                });
                console.log('[register-free] Resend: Email sent successfully');
            } catch (resendError: any) {
                console.warn('[register-free] Resend failed:', resendError.message);

                // Fallback to Gmail SMTP
                const cleanEmail = (process.env.EMAIL_USER || '').trim();
                const cleanPass = (process.env.EMAIL_PASS || '').trim().replace(/\s+/g, '');
                if (cleanEmail && cleanPass) {
                    console.log('[register-free] Fallback: Attempting via Gmail SMTP...');
                    try {
                        const nodemailer = await import('nodemailer');
                        const transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: { user: cleanEmail, pass: cleanPass },
                        });

                        await transporter.sendMail({
                            from: `"TECHUTOPIA 2026" <teams@techutopia.com>`,
                            to: newTicket.attendeeEmail,
                            replyTo: 'teams@techutopia.com',
                            subject: `✅ RSVP Confirmed: ${newTicket.eventTitle} — TECHUTOPIA 2026`,
                            text: `Welcome to the TECHUTOPIA 2026 experience! Hi ${newTicket.attendeeName}, your RSVP for ${newTicket.eventTitle} is confirmed! Ticket ID: ${newTicket.ticketId}. Regards, UEM & TECHUTOPIA 2026 Team`,
                            html: emailHtml,
                        });
                        console.log('[register-free] Gmail fallback: Email sent successfully');
                    } catch (gmailError: any) {
                        console.error('[register-free] Gmail fallback failed also:', gmailError.message);
                    }
                } else {
                    console.error('[register-free] No fallback available (EMAIL_USER/EMAIL_PASS missing)');
                }
            }
        }

        return NextResponse.json({
            success: true,
            ticketId: newTicket.ticketId,
            accessTier: newTicket.accessTier,
        });
    } catch (err: any) {
        console.error('[register-free]', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
