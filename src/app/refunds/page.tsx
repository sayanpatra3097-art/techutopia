import React from 'react';
import type { Metadata } from 'next';
import { PolicyLayout } from '@/components/ui/PolicyLayout';

export const metadata: Metadata = {
    title: 'Refunds & Cancellations - TECHUTOPIA 2026',
    description: 'Refunds and Cancellations policy for TECHUTOPIA 2026 ticketing.',
    alternates: {
        canonical: '/refunds/',
    },
};

export default function RefundsPage() {
    return (
        <PolicyLayout title="Refunds & Cancellations" lastUpdated="March 2026">
            <p>
                Thank you for registering for TECHUTOPIA 2026 hosted by UEM Jaipur. We strive to provide an incredible experience for all participants. Please read our policy on refunds and cancellations carefully before completing your registration and fee payments.
            </p>

            <h2>1. Non-Refundable Policy</h2>
            <p>
                <strong>Except as otherwise explicitly stated below, all ticket sales and event registration fees for TECHUTOPIA 2026 are strictly final and non-refundable.</strong>
            </p>
            <p>
                As event logistics, catering, and accommodations are planned based on the exact number of verified registrations, we are unable to process refunds or cancellations for participants who simply change their minds or are unable to attend due to personal reasons conflicts.
            </p>

            <h2>2. Event Cancellation by Organizers</h2>
            <p>
                In the rare event that TECHUTOPIA 2026 or a specific paid sub-event is entirely canceled by UEM Jaipur or the organizing committee, registered participants will be eligible for a full refund of their paid registration fee.
            </p>
            <ul>
                <li>Eligible refunds will be processed automatically back to the original method of payment used via Cashfree.</li>
                <li>Please allow 7-14 business days for the refunded amount to reflect in your bank account or credit card statement.</li>
            </ul>

            <h2>3. Failed Transactions</h2>
            <p>
                If your payment transaction fails but the amount is debited from your bank account, the amount is typically auto-refunded by the payment gateway (Cashfree) or your bank within 5-7 business days.
            </p>
            <p>
                If your account was debited but you did not receive a booking confirmation from our system within 24 hours, please <a href="/contact">Contact Us</a> immediately with your transaction ID, Name, and Email address so we can manually verify the payment status.
            </p>

            <h2>4. Transferability</h2>
            <p>
                Tickets and event registrations are <strong>non-transferable</strong>. You may not sell, trade, or transfer your registration to another individual. ID verification will be conducted at the venue check-in desk, and individuals presenting tickets not matching their verified ID will be denied entry without a refund.
            </p>

            <h2>Contact Information</h2>
            <p>
                If you have questions regarding this Refunds & Cancellations Policy, please reach out to us at <a href="mailto:techutopia@uem.edu.in">techutopia@uem.edu.in</a>.
            </p>
        </PolicyLayout>
    );
}
