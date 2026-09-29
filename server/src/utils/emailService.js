import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resendApiKey = process.env.RESEND_API_KEY;
if (!resendApiKey) {
  console.warn('⚠️ RESEND_API_KEY is not defined in environment variables.');
}
const resend = new Resend(resendApiKey);

/**
 * Builds HTML email template for Referral System Launch & Credentials
 */
function buildAnnouncementEmailHtml({ name, email, password, loginUrl }) {
  const displayName = name ? name.split(' ')[0] : 'Innovator';

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechUtopia Referral System Announcement</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0f19; padding: 40px 15px;">
      <tr>
        <td align="center">
          <!-- Main Container -->
          <table role="presentation" width="100%" style="max-width: 600px; background: linear-gradient(180deg, #131b2e 0%, #0d121f 100%); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);">
            
            <!-- Header Glow Banner -->
            <tr>
              <td style="padding: 40px 30px 20px 30px; text-align: center; background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.25) 0%, transparent 70%);">
                <span style="display: inline-block; padding: 6px 14px; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(129, 140, 248, 0.3); border-radius: 9999px; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #818cf8; margin-bottom: 16px;">
                  🚀 New Feature Announcement
                </span>
                <h1 style="margin: 0; font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; line-height: 1.25;">
                  The Referral Program is Live!
                </h1>
                <p style="margin: 12px 0 0 0; font-size: 15px; color: #94a3b8; line-height: 1.5;">
                  Hey <strong style="color: #ffffff;">${displayName}</strong>, we've launched our official student referral system at TechUtopia!
                </p>
              </td>
            </tr>

            <!-- Prize Announcement Card -->
            <tr>
              <td style="padding: 0 30px 25px 30px;">
                <div style="background: linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(249, 115, 22, 0.1) 100%); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 12px; padding: 20px; text-align: center;">
                  <div style="font-size: 28px; margin-bottom: 8px;">🎁 🔥</div>
                  <h2 style="margin: 0 0 6px 0; font-size: 18px; font-weight: 700; color: #facc15;">
                    Unlock Exciting Prizes & Goodies!
                  </h2>
                  <p style="margin: 0; font-size: 14px; color: #fef08a; line-height: 1.5;">
                    Reach <strong>10+ Referrals</strong> to win exclusive merchandise, high-tier tech goodies, and secret rewards!
                  </p>
                </div>
              </td>
            </tr>

            <!-- Login Credentials Box -->
            <tr>
              <td style="padding: 0 30px 25px 30px;">
                <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 22px;">
                  <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8;">
                    🔑 Your Access Credentials
                  </h3>
                  <p style="margin: 0 0 16px 0; font-size: 13px; color: #cbd5e1; line-height: 1.5;">
                    As an existing registered student, we've automatically pre-activated your dashboard. <strong>Please log in with this password to get your unique referral code:</strong>
                  </p>

                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #090d16; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.06);">
                    <tr>
                      <td style="padding: 12px 16px; font-size: 13px; color: #64748b; width: 30%; border-bottom: 1px solid rgba(255, 255, 255, 0.06);">Email</td>
                      <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #f8fafc; border-bottom: 1px solid rgba(255, 255, 255, 0.06); font-family: monospace;">${email}</td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 16px; font-size: 13px; color: #64748b; width: 30%;">Password</td>
                      <td style="padding: 12px 16px; font-size: 14px; font-weight: 700; color: #38bdf8; font-family: monospace; letter-spacing: 1px;">${password}</td>
                    </tr>
                  </table>
                </div>
              </td>
            </tr>

            <!-- How it Works & Bonus -->
            <tr>
              <td style="padding: 0 30px 30px 30px;">
                <div style="background: rgba(255, 255, 255, 0.03); border-radius: 12px; padding: 18px 20px; font-size: 13px; color: #94a3b8; line-height: 1.6;">
                  <strong style="color: #e2e8f0;">⚡ How it Works:</strong>
                  <ul style="margin: 8px 0 0 0; padding-left: 20px;">
                    <li>Log in with your credentials to retrieve your personal <strong>Referral Code</strong>.</li>
                    <li>Share your code with friends. When a friend signs up with your code, they get <strong>1 starting bonus point</strong>!</li>
                    <li>When your referred friend invites someone, their count doubles to <strong>2 referrals</strong>!</li>
                    <li>Every successful referral adds <strong>+1 point</strong> to your tally towards the <strong>10+ Prizes</strong> threshold!</li>
                  </ul>
                </div>
              </td>
            </tr>

            <!-- CTA Button -->
            <tr>
              <td style="padding: 0 30px 40px 30px; text-align: center;">
                <a href="${loginUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 14px 36px; border-radius: 10px; font-weight: 700; font-size: 15px; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4); letter-spacing: 0.5px;">
                  Log In & Get Your Referral Code →
                </a>
                <p style="margin: 16px 0 0 0; font-size: 12px; color: #64748b;">
                  Or copy and open this URL in your browser: <br>
                  <a href="${loginUrl}" style="color: #818cf8; text-decoration: underline;">${loginUrl}</a>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding: 20px 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.06); background: rgba(0, 0, 0, 0.2);">
                <p style="margin: 0; font-size: 12px; color: #475569;">
                  © ${new Date().getFullYear()} TechUtopia. All rights reserved. You received this email because you registered for TechUtopia.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

/**
 * Sends announcement email to a single student
 */
export async function sendAnnouncementEmail({ name, email, password }) {
  const fromEmail = process.env.FROM_EMAIL || 'TechUtopia <noreply@techutopia.in>';
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const loginUrl = `${frontendUrl}/login`;

  const html = buildAnnouncementEmailHtml({
    name,
    email,
    password,
    loginUrl
  });

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: '🎁 TechUtopia Referral Program is Live: Win Exciting Prizes & Goodies!',
      html
    });

    if (error) {
      return { success: false, error: error.message || JSON.stringify(error) };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
    return { success: false, error: error.message };
  }
}
