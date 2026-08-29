import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { verifyCashfreeWebhook } from '@/lib/cashfree';
import type { IOrder } from '@/models/Order';
import type { CartItem } from '@/types/tickets';
import { getTicketModel } from '@/lib/dynamicTicket';
import crypto from 'crypto';
import { eventsData } from '@/data/events';
import { generateBoardingPassHTML } from '@/lib/emailBoardingPass';

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const signature = req.headers.get('x-webhook-signature') ?? '';
        const timestamp = req.headers.get('x-webhook-timestamp') ?? '';

        if (!verifyCashfreeWebhook(rawBody, signature, timestamp)) {
            console.warn('[webhook] Invalid signature');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const event = JSON.parse(rawBody) as { type: string; data: Record<string, unknown> };
        const { type, data } = event;

        await connectDB();

        if (type === 'PAYMENT_SUCCESS_WEBHOOK') {
            const orderId = (data.order as Record<string, string>).order_id;
            const paymentId = String((data.payment as Record<string, unknown>).cf_payment_id);

            const updated: IOrder | null = await Order.findOneAndUpdate(
                { cashfreeOrderId: orderId },
                { status: 'PAID', cashfreePaymentId: paymentId },
                { new: true },
            );

            if (updated) {
                // Group tickets by eventId to save them to separate collections
                const allCreatedTickets: any[] = [];
                const groups: Record<number, any[]> = {};
                
                for (const item of updated.items) {
                    if (!groups[item.eventId]) groups[item.eventId] = [];
                    for (let i = 0; i < item.quantity; i++) {
                        groups[item.eventId].push({
                            ticketId: crypto.randomUUID(),
                            orderId: updated.cashfreeOrderId,
                            eventId: item.eventId,
                            eventTitle: item.eventTitle,
                            attendeeName: updated.customerName,
                            attendeeEmail: updated.customerEmail,
                            attendeePhone: updated.customerPhone,
                            college: updated.customerCollege || 'N/A',
                            isPaid: true,
                            paymentReference: paymentId,
                            isCheckedIn: false,
                        });
                    }
                }

                // Batch insert into each event collection
                for (const [eventId, tickets] of Object.entries(groups)) {
                    const TicketModel = getTicketModel(eventId);
                    const inserted = await TicketModel.insertMany(tickets);
                    allCreatedTickets.push(...inserted);
                }

                if (process.env.RESEND_API_KEY || (process.env.EMAIL_USER && process.env.EMAIL_PASS)) {
                    await sendConfirmationEmail(updated, allCreatedTickets).catch((e) =>
                        console.error('[webhook] Email error:', e),
                    );
                }
            }
        } else if (type === 'PAYMENT_FAILED_WEBHOOK') {
            const orderId = (data.order as Record<string, string>).order_id;
            await Order.findOneAndUpdate(
                { cashfreeOrderId: orderId },
                { status: 'FAILED' },
            );
        }

        return NextResponse.json({ received: true });
    } catch (err) {
        console.error('[webhook]', err);
        return NextResponse.json({ error: 'Processing error' }, { status: 500 });
    }
}

async function sendConfirmationEmail(order: IOrder, tickets: any[]) {
    console.log('[webhook API] Attempting to send confirmation email to:', order.customerEmail);
    const items = order.items as CartItem[];
    const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
    const siteUrl = rawSiteUrl.includes('localhost') ? 'https://techutopia-v5.vercel.app' : (rawSiteUrl || 'https://techutopia-v5.vercel.app');

    const passRows = tickets.map(t => {
        const eventInfo: any = eventsData.find(e => Number(e.id) === Number(t.eventId)) || eventsData.find(e => e.title === t.eventTitle) || { time: 'TBD', location: 'Campus' };
        const posterUrl = eventInfo.poster && eventInfo.poster.startsWith('/') ? `${siteUrl}${eventInfo.poster}` : eventInfo.poster;

        return generateBoardingPassHTML({
            ticketId: t.ticketId,
            eventTitle: t.eventTitle,
            attendeeName: order.customerName,
            venue: eventInfo.location || 'Campus',
            time: eventInfo.time || 'TBD',
            posterUrl,
            siteUrl,
        });
    }).join('');

    const emailHtml = `<!DOCTYPE html><html><body style="background:#020205;color:#ffecd1;font-family:Georgia,serif;padding:32px">
      <div style="max-width:600px;margin:0 auto">
        <h1 style="color:#d4af37;margin-bottom:4px;font-size:28px">TECHUTOPIA 2026</h1>
        <p style="color:#8b8680;margin:0 0 32px 0;font-size:14px;letter-spacing:2px">YOUR QUEST CONFIRMATION</p>

        <div style="background:#111;border:1px solid #d4af3722;border-radius:16px;padding:32px;margin-bottom:40px;box-shadow:0 10px 30px rgba(0,0,0,0.4)">
            <p style="margin:0 0 20px 0;font-size:16px">Hi <strong>${order.customerName}</strong>, your tickets are secured!</p>
            <table style="width:100%;border-collapse:collapse">
                <thead><tr style="border-bottom:1px solid #d4af3733">
                    <th style="padding:12px 0;text-align:left;color:#d4af37;font-size:11px;text-transform:uppercase;letter-spacing:2px">Event Description</th>
                    <th style="padding:12px 0;text-align:right;color:#d4af37;font-size:11px;text-transform:uppercase;letter-spacing:2px">Amount</th>
                </tr></thead>
                <tbody>${items.map(i => `<tr><td style="padding:16px 0;font-size:14px;color:#fff">${i.eventTitle} (x${i.quantity})</td><td style="padding:16px 0;text-align:right;font-weight:bold;color:#fff">₹${i.pricePerUnit * i.quantity}</td></tr>`).join('')}</tbody>
                <tfoot><tr style="border-top:2px solid #d4af3733">
                    <td style="padding:20px 0 0 0;font-weight:bold;color:#d4af37;text-transform:uppercase;font-size:12px;letter-spacing:1px">Total Paid</td>
                    <td style="padding:20px 0 0 0;text-align:right;font-weight:bold;color:#d4af37;font-size:22px">₹${order.totalAmount / 100}</td>
                </tr></tfoot>
            </table>
        </div>

        <h3 style="color:#fff;margin-bottom:20px;text-align:center;font-size:22px;text-transform:uppercase;letter-spacing:4px">Your Digital Boarding Passes</h3>
        
        ${passRows}

        <div style="text-align:center;margin-top:48px;padding-top:32px;border-top:1px solid #d4af3722">
            <p style="color:#8b8680;font-size:11px;text-transform:uppercase;letter-spacing:1px">Order ID: ${order.cashfreeOrderId}</p>
            <p style="color:#d4af37;font-size:10px;letter-spacing:4px;margin-top:12px;font-weight:bold">THE GREAT LEGEND • MARCH 2026</p>
        </div>
      </div></body></html>`;

    const emailSubject = '✅ Booking Confirmed — TECHUTOPIA 2026';
    const emailText = `Hi ${order.customerName}, your booking is confirmed! Total Paid: ₹${order.totalAmount / 100}. Please check your email for QR codes.`;

    // Primary: Resend
    try {
        if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured');
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'TECHUTOPIA 2026 <teams@techutopia.com>',
            to: order.customerEmail,
            replyTo: 'teams@uem.edu.in',
            subject: emailSubject,
            html: emailHtml,
        });
        console.log(`[Resend Webhook] Successfully sent confirmation email to ${order.customerEmail}`);
    } catch (resendError: any) {
        console.warn('[Resend Webhook] Failed:', resendError.message);

        // Fallback: Gmail SMTP
        try {
            const nodemailer = await import('nodemailer');
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const info = await transporter.sendMail({
                from: `"TECHUTOPIA 2026" <teams@uem.edu.in>`,
                to: order.customerEmail,
                replyTo: 'teams@uem.edu.in',
                subject: emailSubject,
                text: emailText,
                html: emailHtml,
            });
            console.log(`[NodeMailer Webhook Fallback] Successfully sent to ${order.customerEmail}. MessageId: ${info.messageId}`);
        } catch (gmailError: any) {
            console.error('[NodeMailer Webhook Fallback] Failed:', gmailError.message);
            throw gmailError;
        }
    }
}
