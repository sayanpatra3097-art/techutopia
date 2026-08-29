export interface CartItem {
    eventId: number;
    eventTitle: string;
    quantity: number;
    pricePerUnit: number; // INR
}

export interface CreateOrderPayload {
    name: string;
    email: string;
    phone: string;
    items: CartItem[];
}

export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED';

export interface OrderStatusResponse {
    orderId: string;
    status: OrderStatus;
    customerName: string;
    customerEmail: string;
    items: CartItem[];
    totalAmount: number; // paise
    createdAt: string;
    tickets?: any[];
}
