// @ts-ignore
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogType?: string;
    twitterCard?: string;
    canonicalUrl?: string;
    structuredData?: object;
}

export function SEOHead({
    title = 'TECHUTOPIA 2026 - Greek Mythology Themed Hackathon',
    description = 'Join TECHUTOPIA 2026, an immersive hackathon experience inspired by Greek mythology. Compete in exciting challenges, win amazing prizes, and connect with innovators.',
    keywords = 'TECHUTOPIA 2026, hackathon 2025, UEM hackathon, coding competition, student developers, tech innovation, Jaipur',
    ogImage = '/logo.png',
    ogType = 'website',
    twitterCard = 'summary_large_image',
    canonicalUrl,
    structuredData,
}: SEOHeadProps) {
    const baseUrl = 'https://www.techutopia.com';
    const fullCanonicalUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

    return (
        <>
            {/* @ts-ignore */}
            <Helmet>
                {/* Primary Meta Tags */}
                <title>{title}</title>
                <meta name="title" content={title} />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <link rel="canonical" href={fullCanonicalUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content={ogType} />
                <meta property="og:url" content={fullCanonicalUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={fullOgImage} />
                <meta property="og:site_name" content="TECHUTOPIA 2026" />

                {/* Twitter */}
                <meta property="twitter:card" content={twitterCard} />
                <meta property="twitter:url" content={fullCanonicalUrl} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
                <meta property="twitter:image" content={fullOgImage} />

                {/* Structured Data */}
                {structuredData && (
                    <script type="application/ld+json">
                        {JSON.stringify(structuredData)}
                    </script>
                )}
            </Helmet>
        </>
    );
}
