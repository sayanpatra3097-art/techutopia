// Unified color palette for Greek mythology theme
export const colors = {
    // Primary Gold - Used across all headers, buttons, countdown, accents
    gold: {
        primary: '#D4AF37',
        light: '#FFD700',
        dark: '#B8860B',
        glow: 'rgba(212, 175, 55, 0.6)',
        subtle: 'rgba(212, 175, 55, 0.2)',
    },

    // Background colors
    background: {
        black: '#000000',
        dark: '#0A0A0A',
        marble: '#E8E4DC',
        parchment: '#F5F0E6',
        stone: '#2A2520',
    },

    // Greek god theme colors
    gods: {
        zeus: { primary: '#FFD700', glow: 'rgba(255, 215, 0, 0.6)' },
        poseidon: { primary: '#1E90FF', glow: 'rgba(30, 144, 255, 0.6)' },
        hades: { primary: '#8B008B', glow: 'rgba(139, 0, 139, 0.6)' },
        athena: { primary: '#C0C0C0', glow: 'rgba(192, 192, 192, 0.6)' },
    },

    // Navigation sections for Ariadne's Thread
    sections: ['hero', 'about', 'themes', 'prizes', 'partners'] as const,
};

export type SectionName = typeof colors.sections[number];
