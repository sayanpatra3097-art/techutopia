import type { Metadata } from 'next';
import { Providers } from './providers';
import '@/index.css';
import Script from 'next/script';

export const metadata: Metadata = {
    metadataBase: new URL('https://www.techutopia.com'),
    title: {
        default: 'TECHUTOPIA 2026 | Greek Mythology Themed Hackathon at UEM',
        template: '%s | TECHUTOPIA 2026',
    },
    description:
        'Join TECHUTOPIA 2026, India\'s premier Greek mythology themed hackathon at UEM Jaipur. Compete, innovate, and win big prizes. Register now!',
    keywords: [
        'TECHUTOPIA 2026',
        'hackathon 2026',
        'UEM hackathon',
        'coding competition',
        'student developers',
        'tech innovation',
        'Jaipur',
        'Greek mythology hackathon',
    ],
    authors: [{ name: 'TECHUTOPIA Team' }],
    openGraph: {
        type: 'website',
        url: 'https://www.techutopia.com/',
        title: 'TECHUTOPIA 2026 | Greek Mythology Themed Hackathon',
        description:
            'Join TECHUTOPIA 2026, India\'s premier Greek mythology themed hackathon at UEM Jaipur. Compete, innovate, and win big prizes!',
        siteName: 'TECHUTOPIA 2026',
        images: [
            {
                url: '/logo.png?v=5.0.1',
                width: 1200,
                height: 630,
                alt: 'TECHUTOPIA 2026 - Greek Mythology Themed Hackathon Logo',
            },
        ],
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@techutopia',
        title: 'TECHUTOPIA 2026 | Greek Mythology Themed Hackathon',
        description:
            'Join TECHUTOPIA 2026, India\'s premier Greek mythology themed hackathon at UEM Jaipur. Compete, innovate, and win big prizes!',
        images: ['/logo.png?v=5.0.1'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
    alternates: {
        canonical: '/',
    },
    icons: {
        icon: '/owl-logo.png',
    },
    other: {
        'theme-color': '#6f1c16',
    },
};

// Structured data for JSON-LD
const structuredData = {
    organization: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'TECHUTOPIA 2026',
        alternateName: 'TECHUTOPIA 2026',
        url: 'https://www.techutopia.com/',
        logo: {
            '@type': 'ImageObject',
            url: 'https://www.techutopia.com/logo.png?v=5.0.1',
            width: 1200,
            height: 630,
        },
        image: 'https://www.techutopia.com/logo.png?v=5.0.1',
        description:
            "TECHUTOPIA 2026 is India's premier Greek mythology themed hackathon at UEM Jaipur.",
        foundingDate: '2022',
        parentOrganization: {
            '@type': 'EducationalOrganization',
            name: 'UEM Jaipur',
            url: 'https://www.uem.edu.in/',
        },
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Jaipur',
            addressRegion: 'Rajasthan',
            addressCountry: 'IN',
        },
    },
    website: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'TECHUTOPIA 2026',
        alternateName: ['TECHUTOPIA', 'TECHUTOPIA 2026', 'TECHUTOPIA Hackathon'],
        url: 'https://www.techutopia.com/',
        description:
            'Official website of TECHUTOPIA 2026 - Greek Mythology Themed Hackathon at UEM Jaipur',
        publisher: {
            '@type': 'Organization',
            name: 'TECHUTOPIA 2026',
            logo: {
                '@type': 'ImageObject',
                url: 'https://www.techutopia.com/logo.png?v=5.0.1',
            },
        },
        inLanguage: 'en-US',
    },
    event: {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: 'TECHUTOPIA 2026',
        description:
            "India's premier Greek mythology themed hackathon at UEM Jaipur. Compete, innovate, and win big prizes!",
        url: 'https://www.techutopia.com/',
        image: 'https://www.techutopia.com/logo.png?v=5.0.1',
        organizer: {
            '@type': 'Organization',
            name: 'UEM Jaipur',
            url: 'https://www.uem.edu.in/',
            logo: 'https://www.techutopia.com/logo.png?v=5.0.1',
        },
        location: {
            '@type': 'Place',
            name: 'UEM Jaipur',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'UEM Jaipur Campus',
                addressLocality: 'Jaipur',
                addressRegion: 'Rajasthan',
                postalCode: '302026',
                addressCountry: 'IN',
            },
        },
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        isAccessibleForFree: true,
        maximumAttendeeCapacity: 500,
        typicalAgeRange: '16-30',
        audience: {
            '@type': 'Audience',
            audienceType: 'Students, Developers, Tech Enthusiasts',
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Lato:ital,wght@0,300;0,400;0,700;1,400&family=Outfit:wght@400;700&display=swap"
                    rel="stylesheet"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData.organization),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData.website),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData.event),
                    }}
                />
            </head>
            <body suppressHydrationWarning>
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-3Y0KJ5TCMX"
                />
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-3Y0KJ5TCMX');
                    `,
                    }}
                />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
