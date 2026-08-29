import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { getCashfreeOrderStatus } from '@/lib/cashfree';
import { getTicketModel } from '@/lib/dynamicTicket';
import { eventsData } from '@/data/events';
import crypto from 'crypto';
import type { IOrder } from '@/models/Order';
import type { CartItem } from '@/types/tickets';
import { generateBoardingPassHTML } from '@/lib/emailBoardingPass';

export async function GET(req: NextRequest) {
    const orderId = req.nextUrl.searchParams.get('orderId');

    if (!orderId) {
        return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    }

    await connectDB();

    let order = await Order.findOne({ cashfreeOrderId: orderId });

    if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Find all tickets for this order across multiple event collections
    const ticketPromises = order.items.map(async (item) => {
        const TicketModel = getTicketModel(item.eventId);
        return await TicketModel.find({ orderId: order.cashfreeOrderId }).lean();
    });
    
    const ticketResults = await Promise.all(ticketPromises);
    let tickets = ticketResults.flat();

    // Local dev workaround: If webhooks failed but the user paid, resolve it here.
    if (order.status === 'PENDING') {
        try {
            const cfStatus = await getCashfreeOrderStatus(order.cashfreeOrderId);
            if (cfStatus && cfStatus.order_status === 'PAID') {
                order.status = 'PAID';
                order.cashfreePaymentId = cfStatus.payment_session_id || 'manual_sync_cf';
                await order.save();

                if (tickets.length === 0) {
                    // Generate Tickets and save to correct collections
                    const allCreated: any[] = [];
                    const groups: Record<number, any[]> = {};
                    
                    for (const item of order.items) {
                        if (!groups[item.eventId]) groups[item.eventId] = [];
                        for (let i = 0; i < item.quantity; i++) {
                            groups[item.eventId].push({
                                ticketId: crypto.randomUUID(),
                                orderId: order.cashfreeOrderId,
                                eventId: item.eventId,
                                eventTitle: item.eventTitle,
                                attendeeName: order.customerName,
                                attendeeEmail: order.customerEmail,
                                attendeePhone: order.customerPhone,
                                college: order.customerCollege || 'N/A',
                                isPaid: true,
                                paymentReference: order.cashfreePaymentId,
                                isCheckedIn: false,
                            });
                        }
                    }

                    for (const [eventId, groupTickets] of Object.entries(groups)) {
                        const TicketModel = getTicketModel(eventId);
                        const inserted = await TicketModel.insertMany(groupTickets);
                        allCreated.push(...inserted);
                    }
                    tickets = allCreated;

                    if (process.env.RESEND_API_KEY || (process.env.EMAIL_USER && process.env.EMAIL_PASS)) {
                        await sendConfirmationEmail(order, tickets).catch(e => {
                            console.error('[status API] Failed to send email via NodeMailer:', e);
                        });
                    } else {
                        console.warn('[status API] EMAIL_USER is not defined, skipping email.');
                    }
                }
            } else if (cfStatus && cfStatus.order_status === 'ACTIVE') {
                // Still unpaid
            } else if (cfStatus && cfStatus.order_status !== 'PENDING') {
                // FAILED or similar
                order.status = 'FAILED';
                await order.save();
            }
        } catch (error) {
            console.error('[status] Cashfree status check error', error);
        }
    }

    return NextResponse.json({
        orderId: order.cashfreeOrderId,
        status: order.status,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
        tickets: tickets
    });
}

async function sendConfirmationEmail(order: IOrder, tickets: any[]) {
    console.log('[status API] Attempting to send paid confirmation email to:', order.customerEmail);
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
        <h1 style="color:#d4af37;margin-bottom:8px;font-size:32px">TECHUTOPIA 2026</h1>
        <p style="color:#8b8680;margin:0 0 40px 0;font-size:12px;letter-spacing:4px">STATUS VERIFICATION • CONFIRMED</p>

        <div style="background:#111;border:1px solid #d4af3722;border-radius:24px;padding:40px;margin-bottom:48px;box-shadow:0 15px 50px rgba(0,0,0,0.6)">
            <p style="margin:0 0 24px 0;font-size:18px;color:#fff">Hi <strong>${order.customerName}</strong>, your verification is complete!</p>
            <table style="width:100%;border-collapse:collapse">
                <thead><tr style="border-bottom:1px solid #d4af3733">
                    <th style="padding:16px 0;text-align:left;color:#d4af37;font-size:12px;text-transform:uppercase;letter-spacing:2px">Description</th>
                    <th style="padding:16px 0;text-align:right;color:#d4af37;font-size:12px;text-transform:uppercase;letter-spacing:2px">Amount</th>
                </tr></thead>
                <tbody>${items.map(i => `<tr><td style="padding:20px 0;font-size:15px;color:#fff">${i.eventTitle} (x${i.quantity})</td><td style="padding:20px 0;text-align:right;font-weight:bold;color:#fff;font-size:16px">₹${i.pricePerUnit * i.quantity}</td></tr>`).join('')}</tbody>
                <tfoot><tr style="border-top:2px solid #d4af3733">
                    <td style="padding:24px 0 0 0;font-weight:bold;color:#d4af37;text-transform:uppercase;font-size:14px;letter-spacing:2px">Total Verified</td>
                    <td style="padding:24px 0 0 0;text-align:right;font-weight:bold;color:#d4af37;font-size:26px">₹${order.totalAmount / 100}</td>
                </tr></tfoot>
            </table>
        </div>

        <h3 style="color:#fff;margin-bottom:24px;text-align:center;font-size:24px;text-transform:uppercase;letter-spacing:6px">Your Digital Boarding Passes</h3>
        
        ${passRows}

        <div style="text-align:center;margin-top:64px;padding-top:40px;border-top:1px solid #d4af3722">
            <p style="color:#8b8680;font-size:12px;text-transform:uppercase;letter-spacing:2px">Order ID: ${order.cashfreeOrderId}</p>
            <p style="color:#d4af37;font-size:11px;letter-spacing:6px;margin-top:16px;font-weight:900">THE GREAT LEGEND • MARCH 2026</p>
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
            replyTo: 'teams@techutopia.com',
            subject: emailSubject,
            html: emailHtml,
        });
        console.log(`[Resend Status] Successfully sent confirmation email to ${order.customerEmail}`);
    } catch (resendError: any) {
        console.warn('[Resend Status] Failed:', resendError.message);

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
            console.log(`[NodeMailer Status Fallback] Successfully sent to ${order.customerEmail}. MessageId: ${info.messageId}`);
        } catch (gmailError: any) {
            console.error('[NodeMailer Status Fallback] Failed:', gmailError.message);
            throw gmailError;
        }
    }
}
