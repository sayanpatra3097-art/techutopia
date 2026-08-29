/**
 * Centralized email service using Mailgun (primary) with Resend fallback.
 * Replaces the previous inline Nodemailer/Gmail logic across all API routes.
 */

import Mailgun from 'mailgun.js';
import FormData from 'form-data';

interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || '';
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || '';
const MAILGUN_FROM = process.env.MAILGUN_FROM_EMAIL || `TECHUTOPIA 2026 <tickets@${MAILGUN_DOMAIN}>`;

/**
 * Sends an email via Mailgun. Falls back to Resend if Mailgun fails.
 */
export async function sendEmail({ to, subject, html, text }: SendEmailParams): Promise<void> {
    // --- Primary: Mailgun ---
    if (MAILGUN_API_KEY && MAILGUN_DOMAIN) {
        try {
            const mailgun = new Mailgun(FormData);
            const mg = mailgun.client({
                username: 'api',
                key: MAILGUN_API_KEY,
            });

            const result = await mg.messages.create(MAILGUN_DOMAIN, {
                from: MAILGUN_FROM,
                to: [to],
                subject,
                html,
                text: text || '',
            });

            console.log(`[emailService] Mailgun: Email sent to ${to}. ID: ${result.id}`);
            return; // Success — exit early
        } catch (mgError: any) {
            console.error(`[emailService] Mailgun failed for ${to}:`, mgError.message);
            // Fall through to Resend
        }
    } else {
        console.warn('[emailService] Mailgun not configured (MAILGUN_API_KEY or MAILGUN_DOMAIN missing). Trying fallback...');
    }

    // --- Fallback: Resend ---
    if (process.env.RESEND_API_KEY) {
        try {
            const { Resend } = await import('resend');
            const resend = new Resend(process.env.RESEND_API_KEY);

            await resend.emails.send({
                from: 'TECHUTOPIA 2026 <onboarding@resend.dev>',
                to,
                subject,
                html,
            });
            console.log(`[emailService] Resend (fallback): Email sent to ${to}`);
            return;
        } catch (resendError: any) {
            console.error(`[emailService] Resend fallback also failed for ${to}:`, resendError.message);
        }
    }

    console.error(`[emailService] All email providers failed. Could not send email to ${to}.`);
}
