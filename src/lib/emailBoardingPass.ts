/**
 * Generates email-safe HTML for a boarding pass ticket.
 * Layout: Full-width poster banner on top → QR stub + Info panel below.
 * Uses ONLY email-compatible HTML: nested tables, inline styles, direct <img> tags.
 * No position:absolute, no background-image, no object-fit, no flex/grid.
 * Works in Gmail, Outlook, Yahoo Mail, Apple Mail.
 */

interface BoardingPassEmailParams {
    ticketId: string;
    eventTitle: string;
    attendeeName: string;
    venue: string;
    time: string;
    posterUrl?: string;
    siteUrl: string;
    accessTier?: string;
    teamMembers?: string[];
    danceStyle?: string;
}

export function generateBoardingPassHTML({
    ticketId,
    eventTitle,
    attendeeName,
    venue,
    time,
    posterUrl,
    siteUrl,
    accessTier = 'GA',
    teamMembers = [],
    danceStyle,
}: BoardingPassEmailParams): string {
    const shortId = ticketId.length > 10
        ? ticketId.slice(0, 6) + '...' + ticketId.slice(-4)
        : ticketId;

    const mainTitle = eventTitle.toUpperCase().includes('LIVE')
        ? eventTitle.substring(0, eventTitle.toUpperCase().indexOf('LIVE')).trim()
        : eventTitle;

    const isMaanPanu = eventTitle.toLowerCase().includes('maan panu');
    const subTitle = eventTitle.toUpperCase().includes('LIVE')
        ? eventTitle.substring(eventTitle.toUpperCase().indexOf('LIVE')).trim()
        : isMaanPanu
            ? 'LIVE PERFORMANCE'
            : 'EVENT PASS';

    const timeParts = time.split('&#8226;');
    const datePart = timeParts[0]?.trim() || time;
    const timePart = timeParts[1]?.trim() || '';

    // Color mapping for tiers (Sync with BoardingPass.tsx)
    const tierColors: Record<string, { border: string; accent: string; label: string }> = {
        'GA': { border: '#16a34a', accent: '#22c55e', label: 'GENERAL PASS' },
        'VIP': { border: '#b8860b', accent: '#d4af37', label: 'VVIP ACCESS' },
        'HACK_TEAM': { border: '#7e22ce', accent: '#a855f7', label: 'HACK TEAM' },
        'ALL_ACCESS': { border: '#9ca3af', accent: '#d1d5db', label: 'ALL ACCESS' },
        'ARTIST_TEAM': { border: '#dc2626', accent: '#ef4444', label: 'ARTIST TEAM' },
        'BACKSTAGE': { border: '#2563eb', accent: '#3b82f6', label: 'BACKSTAGE' },
    };

    const style = tierColors[accessTier] || tierColors['GA'];
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(ticketId)}`;

    return `
    <div style="max-width:640px;margin:24px auto;font-family:Georgia,'Times New Roman',serif;background:#020205;padding:20px;border-radius:16px;">
        
        <!-- ============ FRONT SIDE ============ -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:30px;">
            <tr>
                <td style="background:${style.border};padding:3px;border-radius:12px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0c0702;border-radius:10px;">
                        <tr>
                            <td>
                                <!-- TOP: POSTER BANNER -->
                                ${posterUrl ? `
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                        <td style="padding:0;line-height:0;">
                                            <img src="${posterUrl}" alt="${eventTitle}" width="600" style="display:block;width:100%;max-width:600px;border-radius:10px 10px 0 0;" />
                                        </td>
                                    </tr>
                                </table>
                                ` : ''}

                                <!-- LOGOS BAR -->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0500;border-top:2px solid ${style.border};border-bottom:2px solid ${style.border};">
                                    <tr>
                                        <td align="center" style="padding:12px 20px;">
                                            <table cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td align="center" valign="middle" style="padding-right:30px;">
                                                        <img src="${siteUrl}/logo.png" alt="TECHUTOPIA" width="80" style="display:block;max-width:80px;height:auto;border:0;" />
                                                        <p style="margin:4px 0 0 0;font-family:Georgia,serif;font-weight:900;font-size:11px;color:#fff;letter-spacing:2px;text-transform:uppercase;">TECHUTOPIA</p>
                                                    </td>
                                                    <td align="center" valign="middle">
                                                        <img src="${siteUrl}/events/UEM_Logo.webp" alt="UEM" width="65" style="display:block;max-width:65px;height:auto;border:0;" />
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>

                                <!-- BOTTOM: QR + INFO -->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                    <tr>
                                        <!-- QR STUB -->
                                        <td width="35%" valign="top" style="padding:16px;">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ebd9b2;border-radius:10px;border:1px solid #a88243;">
                                                <tr>
                                                    <td style="padding:12px;" align="center">
                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #c9a65c;border-radius:8px;">
                                                            <tr>
                                                                <td style="padding:10px;" align="center">
                                                                    <table cellpadding="0" cellspacing="0" border="0" style="background:#fff;border-radius:6px;border:2px solid #c9a65c;">
                                                                        <tr><td style="padding:6px;"><img src="${qrUrl}" alt="QR" width="120" style="display:block;max-width:100%;" /></td></tr>
                                                                    </table>
                                                                    <p style="color:#5c4022;font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:2px;margin:8px 0 2px 0;">SCAN TO VERIFY</p>
                                                                    <p style="color:#6b5133;font-size:8px;font-family:monospace;font-weight:bold;margin:0 0 4px 0;">${shortId}</p>
                                                                    <div style="border-top:2px dashed #c9a65c;margin:8px 0;"></div>
                                                                    <p style="color:#3b2512;font-size:10px;font-weight:bold;font-family:monospace;margin:0;">MT-2026-XQ</p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>

                                        <!-- INFO PANEL -->
                                        <td width="65%" valign="top" style="padding:16px 16px 16px 8px;">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <tr>
                                                    <td style="padding-bottom:12px;">
                                                        <h1 style="font-family:Georgia,serif;font-size:24px;font-weight:900;text-transform:uppercase;letter-spacing:4px;color:#ffd700;margin:0;line-height:1.1;">${mainTitle}</h1>
                                                        ${subTitle ? `<p style="color:#e3cf9d;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:4px 0 0 0;">${subTitle}</p>` : ''}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-bottom:14px; border-bottom:1px solid #3d3520;">
                                                        <p style="color:${style.accent};font-size:14px;font-weight:900;text-transform:uppercase;letter-spacing:3px;margin:0;">&#10022; ${style.label}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="border-bottom:1px solid #3d3520;padding:12px 0;">
                                                        <p style="color:${style.accent};font-size:8px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px 0;">ATTENDEE</p>
                                                        <p style="color:#fff;font-size:18px;font-weight:900;margin:0;">${attendeeName}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="border-bottom:1px solid #3d3520;padding:12px 0;">
                                                        <p style="color:${style.accent};font-size:8px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px 0;">VENUE</p>
                                                        <p style="color:#fff;font-size:14px;font-weight:900;margin:0;">${venue}</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:12px 0;">
                                                        <p style="color:${style.accent};font-size:8px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px 0;">SCHEDULE</p>
                                                        <p style="color:#fff;font-size:14px;font-weight:900;margin:0;">${datePart}</p>
                                                        ${timePart ? `<p style="color:#ccc;font-size:11px;font-style:italic;margin:2px 0 0 0;">&#8226; ${timePart}</p>` : ''}
                                                    </td>
                                                </tr>
                                                ${teamMembers && teamMembers.length > 0 ? `
                                                <tr>
                                                    <td style="border-bottom:1px solid #3d3520;padding:12px 0;">
                                                        <p style="color:${style.accent};font-size:8px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px 0;">TEAM MEMBERS</p>
                                                        <p style="color:#fff;font-size:12px;font-weight:900;margin:0;">${teamMembers.join(', ')}</p>
                                                    </td>
                                                </tr>
                                                ` : ''}
                                                ${danceStyle ? `
                                                <tr>
                                                    <td style="border-bottom:1px solid #3d3520;padding:12px 0;">
                                                        <p style="color:${style.accent};font-size:8px;font-weight:bold;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px 0;">DANCE STYLE</p>
                                                        <p style="color:#fff;font-size:14px;font-weight:900;margin:0;">${danceStyle}</p>
                                                    </td>
                                                </tr>
                                                ` : ''}
                                                <tr><td><p style="color:${style.accent};font-size:10px;margin-top:4px;font-style:italic;opacity:0.8;">* Terms and conditions are on backside</p></td></tr>
                                                <tr>
                                                    <td style="padding-top:12px;">
                                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                            <tr>
                                                                <td valign="middle"><span style="color:#a09476;font-size:7px;font-family:monospace;border:1px solid #5c5340;padding:3px 6px;">MT-2026-XQ</span></td>
                                                                <td align="right" valign="middle">
                                                                    <span style="color:#22c55e;font-size:9px;font-weight:900;padding:4px 10px;border:1px solid #16a34a;background:#14532d;border-radius:4px;">VERIFIED</span>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <!-- ============ BACK SIDE ============ -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td style="background:${style.border};padding:3px;border-radius:12px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0c0702;border-radius:10px;">
                        <tr>
                            <td style="padding:1.2cqw; background: radial-gradient(circle at center, rgba(139, 0, 0, 0.95) 0%, rgba(45, 0, 0, 0.98) 45%, rgba(0, 0, 0, 1) 85%); border-radius:10px;">
                                <div style="padding:24px; border:1px solid rgba(255, 0, 0, 0.2); border-radius:8px;">
                                    <!-- Back Header -->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom:1px solid rgba(239, 68, 68, 0.2); padding-bottom:16px; margin-bottom:16px;">
                                        <tr>
                                            <td width="20%"><img src="${siteUrl}/logo.png" alt="TECHUTOPIA" width="50" style="display:block;" /></td>
                                            <td align="center"><h2 style="font-family:Georgia,serif;font-size:22px;font-weight:900;color:#ef4444;margin:0;letter-spacing:2px;">TERMS & CONDITIONS</h2></td>
                                            <td width="20%" align="right"><img src="${siteUrl}/events/UEM_Logo.webp" alt="UEM" width="60" style="display:block;" /></td>
                                        </tr>
                                    </table>

                                    <!-- Rules Content -->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                                        <tr>
                                            <td width="48%" valign="top">
                                                <p style="color:#ef4444;font-size:12px;font-weight:bold;margin:0 0 4px 0;">1. IDENTIFICATION & ENTRY</p>
                                                <p style="color:#d1d5db;font-size:10px;line-height:1.4;margin:0 0 12px 0;">Physical ID (Aadhar/DL) is mandatory. Entry pass required for gate verification. No re-entry allowed.</p>
                                                
                                                <p style="color:#ef4444;font-size:12px;font-weight:bold;margin:0 0 4px 0;">2. PROHIBITED SUBSTANCES</p>
                                                <p style="color:#d1d5db;font-size:10px;line-height:1.4;margin:0 0 12px 0;">Alcohol and banned substances are strictly prohibited. Security may use breath analyzers.</p>
                                                
                                                <p style="color:#ef4444;font-size:12px;font-weight:bold;margin:0 0 4px 0;">3. IMPORTANT TIMINGS</p>
                                                <p style="color:#d1d5db;font-size:10px;line-height:1.4;margin:0;">Gate Closing Time: 12:00 PM (Sharp) on event days. Arrive early for smooth processing.</p>
                                            </td>
                                            <td width="4%">&nbsp;</td>
                                            <td width="48%" valign="top">
                                                <p style="color:#ef4444;font-size:12px;font-weight:bold;margin:0 0 4px 0;">4. CONCERT RULES (15th MARCH)</p>
                                                <p style="color:#d1d5db;font-size:10px;line-height:1.4;margin:0 0 12px 0;">No bottles, food, or bags allowed at Sabrang Ground during the concert. Strict security checks.</p>
                                                
                                                <p style="color:#ef4444;font-size:12px;font-weight:bold;margin:0 0 4px 0;">5. CONDUCT & MISBEHAVIOR</p>
                                                <p style="color:#d1d5db;font-size:10px;line-height:1.4;margin:0 0 12px 0;">Misconduct will lead to immediate expulsion and disciplinary action by the institute.</p>
                                                
                                                <p style="color:#ef4444;font-size:12px;font-weight:bold;margin:0 0 4px 0;">6. PROPERTY DAMAGE</p>
                                                <p style="color:#d1d5db;font-size:10px;line-height:1.4;margin:0;">Damage to institute property will invite strict financial and disciplinary penalties.</p>
                                            </td>
                                        </tr>
                                    </table>

                                    <!-- Back Footer -->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid rgba(239, 68, 68, 0.2); padding-top:12px;">
                                        <tr>
                                            <td style="color:#9ca3af;font-size:9px;">techutopia@uem.edu.in | Sabrang Ground</td>
                                        </tr>
                                    </table>
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <!-- Download Button -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 30px;">
            <tr>
                <td align="center">
                    <a href="${siteUrl}/ticket/${ticketId}" target="_blank" style="background-color: ${style.accent}; color: #0c0702; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-family: 'Times New Roman', serif; font-weight: bold; font-size: 16px; letter-spacing: 2px; display: inline-block; text-transform: uppercase;">
                        VIEW & DOWNLOAD HIGH-RES TICKET
                    </a>
                </td>
            </tr>
        </table>

        <p style="text-align:center;color:#444;font-size:11px;margin-top:32px;letter-spacing:1px;">Ticket ID: ${ticketId} | Verified Digital Entry Pass</p>
    </div>`;
}
