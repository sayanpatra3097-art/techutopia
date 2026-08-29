import type { StaticImageData } from 'next/image';

import goldRing from '../assets/partners/gold-ring.webp';
import silverRing from '../assets/partners/silver-ring.webp';
import bronzeRing from '../assets/partners/bronze-ring.webp';

import entionLogo from '../assets/partners/ention-logo.webp';
import wsCubeLogo from '../assets/partners/ws.cubetech-logo.webp';
import genesisLogo from '../../public/partners/Genesis Logo Vertical.png';

// Silver Partners
import belgianWaffleLogo from '../../public/partners/belgian_waffle.png';
import devfolioLogo from '../assets/partners/devfolio-logo.png';

// Bronze Partners
import interviewBuddyLogo from '../../public/partners/interview_buddy.png';
import truScholarLogo from '../../public/partners/TruScholar - Credential Partner.png';
import commudleLogo from '../../public/partners/Commudle - Ecosystem Partner.webp';
import dmvCoreLogo from '../../public/partners/DMV Core Tech - Internship Partner.png';
import helaLabsLogo from '../../public/partners/HeLa Labs - Track sponsor.png';
import mangalamWatersLogo from '../../public/partners/Mangalam Waters - Hydration Partner.jpeg';

// Community Partners
import gdgLogo from '../assets/partners/gdg.webp';
import gfgCampusLogo from '../../public/partners/geeksforgeeks-Camus.png';
import codechefLogo from '../../public/partners/codechef.png';
import mlcGniotLogo from '../../public/partners/microsoft_learn_community.png';
import juVerseLogo from '../../public/partners/ju_vers.jpeg';

export type Partner = {
    name: string;
    logo: string | StaticImageData;
    logoScale?: number;
};

export type PartnerGroup = {
    title: string;
    ring: string | StaticImageData;
    color: string;
    partners: Partner[];
};

export type StandardPartnerData = {
    id: number;
    type: 'standard';
    title: string;
    partnerName: string;
    ring: string | StaticImageData;
    logo: string | StaticImageData | null;
    description: string[];
    socials: boolean;
    themeColor: string;
    socialLinks?: {
        web?: string;
        linkedin?: string;
        instagram?: string;
        x?: string;
    };
    logoScale?: number;
};

export type GridPartnerData = {
    id: number;
    type: 'grid';
    title: string;
    groups: PartnerGroup[];
};

export type PartnerData = StandardPartnerData | GridPartnerData;

export const partnersData: PartnerData[] = [
    {
        id: 0,
        type: 'standard',
        title: 'GOLD PARTNER',
        partnerName: 'GENESIS',
        ring: goldRing,
        logo: genesisLogo,
        description: [
            'Genesis is a forward-thinking technology partner, focused on delivering state-of-the-art solutions and empowering the next generation of builders and creators.',
        ],
        socials: false,
        themeColor: '#FFEAA4', // Gold
        logoScale: 1.5, // Adjust to fit ring
    },
    {
        id: 3,
        type: 'standard',
        title: 'PRE-HACKATHON PARTNER',
        partnerName: 'WSCUBE TECH',
        ring: goldRing,
        logo: wsCubeLogo,
        description: [
            'WSCube is a Hybrid Upskilling Edtech, develops and disseminates Tech-powered Career Acceleration Programs and Job Oriented Professional curated for Aspirants of Bharat, readying them for Global workforce opportunities.',
            'WS Cube Tech is providing us with knowledge about HTML, CSS, JS, React, git and Github as part of pre-hackathon bootcamp.',
        ],
        socials: true,
        themeColor: '#FFEAA4', // Gold
        socialLinks: {
            web: 'https://www.wscubetech.com/',
            linkedin: 'https://www.linkedin.com/company/wscubetechindia/',
            instagram: 'https://www.instagram.com/wscubetechindia?igsh=cjJid2hxa3c3MjF3',
            x: 'https://share.google/GE3VTFtczttKcO33Z',
        },
    },
    {
        id: 4,
        type: 'grid',
        title: 'SILVER & BRONZE PARTNERS',
        groups: [
            {
                title: 'SILVER PARTNERS',
                ring: silverRing,
                color: '#C0C0C0',
                partners: [
                    { name: 'The Belgian Waffle Co.', logo: belgianWaffleLogo, logoScale: 0.9 },
                    { name: 'Devfolio', logo: devfolioLogo, logoScale: 0.45 },
                ],
            },
            {
                title: 'BRONZE PARTNERS',
                ring: bronzeRing,
                color: '#CD7F32',
                partners: [
                    { name: 'InterviewBuddy', logo: interviewBuddyLogo, logoScale: 0.392 },
                    { name: 'TruScholar', logo: truScholarLogo, logoScale: 0.8 },
                    { name: 'Commudle', logo: commudleLogo, logoScale: 0.8 },
                    { name: 'DMV Core Tech', logo: dmvCoreLogo, logoScale: 0.85 },
                    { name: 'HeLa Labs', logo: helaLabsLogo, logoScale: 0.45 },
                    { name: 'Mangalam Water', logo: mangalamWatersLogo, logoScale: 0.9 },
                ],
            },
        ],
    },
    {
        id: 5,
        type: 'grid',
        title: 'COMMUNITY PARTNERS',
        groups: [
            {
                title: 'COMMUNITY PARTNERS',
                ring: '/partners/white_perfect_ring.webp',
                color: '#FFFFFF',
                partners: [
                    { name: 'Geeksforgeeks Campus Body Gcet', logo: gfgCampusLogo, logoScale: 0.85 },
                    { name: 'Codechef ABESEC Chapter', logo: codechefLogo, logoScale: 0.75 },
                    { name: 'Microsoft Learn Community GNIOT', logo: mlcGniotLogo, logoScale: 0.75 },
                    { name: 'JU Verse', logo: juVerseLogo, logoScale: 0.85 },
                    { name: 'GDG Jaipur', logo: gdgLogo, logoScale: 0.85 },
                ],
            },
        ],
    },
];
