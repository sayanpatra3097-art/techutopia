import React from 'react';
import type { Metadata } from 'next';
import { PolicyLayout } from '@/components/ui/PolicyLayout';

export const metadata: Metadata = {
    title: 'Privacy Policy - TECHUTOPIA 2026',
    description: 'Privacy Policy for TECHUTOPIA 2026.',
    alternates: {
        canonical: '/privacy/',
    },
};

export default function PrivacyPage() {
    return (
        <PolicyLayout title="Privacy Policy" lastUpdated="March 2026">
            <p>
                At TECHUTOPIA 2026, accessible from techutopia.com, one of our main priorities is the privacy of our visitors and participants. This Privacy Policy document contains types of information that is collected and recorded by TECHUTOPIA and how we use it.
            </p>
            <p>
                If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:techutopia@uem.edu.in">techutopia@uem.edu.in</a>.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <ul>
                <li><strong>Registration Information:</strong> When you register for an event, we ask for your contact information, including items such as name, email address, telephone number, and university name.</li>
                <li><strong>Payment Information:</strong> When you purchase tickets or pay entry fees (priced in INR), your payment details are securely processed by our payment gateway partner, Cashfree. TECHUTOPIA does not store your full credit card or bank details on our servers.</li>
                <li><strong>Log Files:</strong> TECHUTOPIA follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect in various ways, including to:</p>
            <ul>
                <li>Provide, operate, and maintain our website and event logistics.</li>
                <li>Process your event registrations and ticket purchases.</li>
                <li>Improve, personalize, and expand our website and event offerings.</li>
                <li>Understand and analyze how you use our website.</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                <li>Send you emails regarding your registration or schedule changes.</li>
                <li>Find and prevent fraud.</li>
            </ul>

            <h2>3. Third-Party Privacy Policies</h2>
            <p>
                TECHUTOPIA's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers or payment gateways (such as Cashfree) for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>

            <h2>4. Data Retention</h2>
            <p>
                We will only retain your personal information for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements related to the hackathon.
            </p>

            <h2>5. CCPA & GDPR Data Protection Rights</h2>
            <p>
                We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul>
                <li>The right to access – You have the right to request copies of your personal data.</li>
                <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
            </ul>
        </PolicyLayout>
    );
}
