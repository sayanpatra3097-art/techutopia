import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { createCashfreeOrder } from '@/lib/cashfree';
import type { CreateOrderPayload } from '@/types/tickets';

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as CreateOrderPayload;
        const { name, email, phone, college, items } = body as { name: string, email: string, phone: string, college: string, items: any[] };

        // Validation
        if (!name?.trim() || !email?.trim() || !phone?.trim() || !college?.trim() || !items?.length) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }
        if (!/^\d{10}$/.test(phone)) {
            return NextResponse.json({ error: 'Phone must be 10 digits' }, { status: 400 });
        }

        // Calculate total (INR)
        const totalINR = items.reduce((sum, i) => sum + i.pricePerUnit * i.quantity, 0);
        if (totalINR <= 0) {
            return NextResponse.json({ error: 'Cart total must be greater than ₹0' }, { status: 400 });
        }

        // Unique order ID
        const cashfreeOrderId = `HJ5_${Date.now()}_${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

        // Save to MongoDB as PENDING
        await connectDB();
        await Order.create({
            cashfreeOrderId,
            customerName: name.trim(),
            customerEmail: email.toLowerCase().trim(),
            customerPhone: phone.trim(),
            customerCollege: college.trim(),
            totalAmount: Math.round(totalINR * 100), // paise
            items,
            status: 'PENDING',
        });

        // Create Cashfree order
        const cfOrder = await createCashfreeOrder({
            orderId: cashfreeOrderId,
            amount: totalINR,
            customerName: name.trim(),
            customerEmail: email.trim(),
            customerPhone: phone.trim(),
            returnUrl: `${siteUrl}/booking/success?order_id=${cashfreeOrderId}`,
            notifyUrl: `${siteUrl}/api/tickets/webhook`,
        });

        return NextResponse.json({
            orderId: cashfreeOrderId,
            paymentSessionId: cfOrder.payment_session_id,
        });
    } catch (err) {
        console.error('[create-order]', err);
        const message = err instanceof Error ? err.message : 'Internal server error';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
