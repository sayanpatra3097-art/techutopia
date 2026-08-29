/**
 * Email Boarding Pass Preview Route
 * Visit: /api/preview/email-pass
 * Query params (all optional):
 *   ?tier=VIP|GA|HACK_TEAM|ALL_ACCESS|ARTIST_TEAM|BACKSTAGE
 *   &name=John Doe
 *   &event=Maan Panu Live Concert
 *   &venue=Sabrang Ground
 *   &time=15 March 2026 • 7:30 PM
 */
import { NextRequest, NextResponse } from 'next/server';
import { generateBoardingPassHTML } from '@/lib/emailBoardingPass';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const tier = searchParams.get('tier') || 'VIP';
    const name = searchParams.get('name') || 'MAAN PANU';
    const event = searchParams.get('event') || 'Maan Panu Live Concert';
    const venue = searchParams.get('venue') || 'Campus';
    const time = searchParams.get('time') || 'TBD';
    const ticketId = searchParams.get('ticketId') || 'FT-PNMI18SAI-XQ2026DEMO';

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${process.env.PORT || 3000}`;
    const posterUrl = `${siteUrl}/events/maan_panu_ticket.webp`;

    const html = generateBoardingPassHTML({
        ticketId,
        eventTitle: event,
        attendeeName: name,
        venue,
        time,
        posterUrl,
        siteUrl,
        accessTier: tier,
    });

    const fullPage = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Email Boarding Pass Preview</title>
        <style>
            body { margin:0; padding:20px; background:#111; font-family: sans-serif; }
            .controls { max-width:640px; margin:0 auto 20px auto; padding:16px; background:#222; border-radius:8px; color:#ccc; font-size:13px; }
            .controls a { color:#d4af37; margin-right:12px; text-decoration:none; }
            .controls a:hover { text-decoration:underline; }
        </style>
    </head>
    <body>
        <div class="controls">
            <strong style="color:#fff;">Preview Tiers:</strong><br/><br/>
            <a href="?tier=GA">GA</a>
            <a href="?tier=VIP">VIP</a>
            <a href="?tier=HACK_TEAM">Hack Team</a>
            <a href="?tier=ALL_ACCESS">All Access</a>
            <a href="?tier=ARTIST_TEAM">Artist Team</a>
            <a href="?tier=BACKSTAGE">Backstage</a>
        </div>
        ${html}
    </body>
    </html>`;

    return new NextResponse(fullPage, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
}
