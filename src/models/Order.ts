import mongoose, { Schema, Document, Model } from 'mongoose';
import type { CartItem, OrderStatus } from '@/types/tickets';

export interface IOrder extends Document {
    cashfreeOrderId: string;
    cashfreePaymentId?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    customerCollege: string;
    totalAmount: number; // paise
    items: CartItem[];
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
}

const CartItemSchema = new Schema<CartItem>(
    {
        eventId: { type: Number, required: true },
        eventTitle: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        pricePerUnit: { type: Number, required: true, min: 0 },
    },
    { _id: false },
);

const OrderSchema = new Schema<IOrder>(
    {
        cashfreeOrderId: { type: String, required: true, unique: true, index: true },
        cashfreePaymentId: { type: String },
        customerName: { type: String, required: true },
        customerEmail: { type: String, required: true, lowercase: true },
        customerPhone: { type: String, required: true },
        customerCollege: { type: String, required: true },
        totalAmount: { type: Number, required: true },
        items: { type: [CartItemSchema], required: true },
        status: {
            type: String,
            enum: ['PENDING', 'PAID', 'FAILED'],
            default: 'PENDING',
        },
    },
    { timestamps: true },
);

// Prevent model recompilation on hot reload in dev
const Order: Model<IOrder> =
    (mongoose.models.Order as Model<IOrder>) ||
    mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
