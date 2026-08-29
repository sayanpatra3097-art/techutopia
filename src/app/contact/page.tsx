import React from 'react';
import type { Metadata } from 'next';
import { PolicyLayout } from '@/components/ui/PolicyLayout';

export const metadata: Metadata = {
    title: 'Contact Us - TECHUTOPIA 2026',
    description: 'Get in touch with the TECHUTOPIA Team.',
    alternates: {
        canonical: '/contact/',
    },
};

export default function ContactPage() {
    return (
        <PolicyLayout title="Contact Us">
            <p>
                We're here to help! Whether you have questions about the hackathon, ticketing, sponsorships, or general inquiries, feel free to reach out to the TECHUTOPIA organizing committee.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-12">
                <div className="bg-black/30 border border-[#d4af37]/20 rounded-xl p-8 flex flex-col gap-4">
                    <h3 className="font-[Cinzel] text-[#d4af37] text-xl m-0 border-b-0 pb-0">General Enquiries</h3>
                    <p className="text-stone-400 m-0">
                        For all general questions, registration help, or technical support, drop us an email. We aim to respond within 24-48 hours.
                    </p>
                    <a href="mailto:techutopia@uem.edu.in" className="text-lg font-bold text-white no-underline hover:text-[#d4af37] transition-colors mt-2">
                        techutopia@uem.edu.in
                    </a>
                </div>

                <div className="bg-black/30 border border-[#d4af37]/20 rounded-xl p-8 flex flex-col gap-4">
                    <h3 className="font-[Cinzel] text-[#d4af37] text-xl m-0 border-b-0 pb-0">Phone Support</h3>
                    <p className="text-stone-400 m-0">
                        For urgent registration queries or emergency assistance during the event, you can reach our team lead directly.
                    </p>
                    <a href="tel:+919376666070" className="text-lg font-mono font-bold text-white no-underline hover:text-[#d4af37] transition-colors mt-2">
                        +91 93766 66070
                    </a>
                </div>
            </div>

            <h2>Our Location</h2>
            <p>
                UEM Jaipur is located on the outskirts of Jaipur, offering a serene campus perfect for a 48-hour coding odyssey.
            </p>

            <div className="pl-6 border-l-2 border-[#d4af37]/40 mb-12">
                <strong className="text-white block text-lg mb-2">UEM Jaipur</strong>
                Near Mahindra SEZ,<br />
                Mahapura, Ajmer Road,<br />
                Jaipur, Rajasthan<br />
                India — 302026
            </div>

            <div className="w-full h-64 md:h-96 rounded-xl overflow-hidden border border-[#d4af37]/20 bg-black/40 relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.117070008914!2d75.64722912457951!3d26.836228513374916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4af4fe68f403%3A0x3bf05f95df22b8c4!2sJK%20Lakshmipat%20University!5e0!3m2!1sen!2sin!4v1695563431231!5m2!1sen!2sin"
                    title="Google Maps Location"
                    width="100%"
                    height="100%"
                    allowFullScreen
                    loading="lazy"
                    className="opacity-80 hover:opacity-100 transition-opacity duration-300 filter-[invert(90%)_hue-rotate(180deg)_brightness(85%)_contrast(120%)_sepia(30%)] border-0"
                />
            </div>

            <h2 className="mt-12">Follow Us</h2>
            <p>
                Stay updated with the latest announcements, speaker reveals, and behind-the-scenes action on our social channels:
            </p>
            <ul>
                <li><a href="https://www.instagram.com/techutopia" target="_blank" rel="noopener noreferrer">Instagram (@techutopia)</a></li>
                <li><a href="https://x.com/TechUtopia" target="_blank" rel="noopener noreferrer">Twitter / X (@TechUtopia)</a></li>
                <li><a href="https://discord.gg/TYyAmwzC38" target="_blank" rel="noopener noreferrer">Official Discord Server</a></li>
            </ul>
        </PolicyLayout>
    );
}
