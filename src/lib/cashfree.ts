import crypto from 'crypto';

const BASE_URL =
    process.env.CASHFREE_ENV === 'PROD'
        ? 'https://api.cashfree.com/pg'
        : 'https://sandbox.cashfree.com/pg';

const CF_HEADERS = {
    'Content-Type': 'application/json',
    'x-api-version': '2023-08-01',
    'x-client-id': process.env.CASHFREE_APP_ID ?? '',
    'x-client-secret': process.env.CASHFREE_SECRET_KEY ?? '',
};

export interface CashfreeOrderResponse {
    order_id: string;
    payment_session_id: string;
    order_status: string;
}

export async function createCashfreeOrder(params: {
    orderId: string;
    amount: number; // INR
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    returnUrl: string;
    notifyUrl: string;
}): Promise<CashfreeOrderResponse> {
    const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: CF_HEADERS,
        body: JSON.stringify({
            order_id: params.orderId,
            order_amount: params.amount,
            order_currency: 'INR',
            customer_details: {
                customer_id: `cust_${params.customerPhone}`,
                customer_name: params.customerName,
                customer_email: params.customerEmail,
                customer_phone: params.customerPhone,
            },
            order_meta: {
                return_url: params.returnUrl,
                notify_url: params.notifyUrl,
            },
        }),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message ?? 'Cashfree order creation failed');
    }

    return res.json();
}

export async function getCashfreeOrderStatus(orderId: string): Promise<any> {
    const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: 'GET',
        headers: CF_HEADERS,
    });

    if (!res.ok) {
        return null;
    }

    return res.json();
}

export function verifyCashfreeWebhook(
    rawBody: string,
    signature: string,
    timestamp: string,
): boolean {
    const secret = process.env.CASHFREE_SECRET_KEY ?? '';
    const expected = crypto
        .createHmac('sha256', secret)
        .update(timestamp + rawBody)
        .digest('base64');
    return expected === signature;
}
