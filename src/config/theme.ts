/**
 * Greek Mythology Theme Configuration
 * Color palette inspired by ancient Greece: blood, terracotta, gold, and marble
 */

export const theme = {
  colors: {
    // Primary Colors
    'blood-red': '#6f1c16',
    'void-black': '#000000',
    terracotta: '#7e4031',
    'golden-amber': '#ee8a3c',
    'ivory-cream': '#ffecd1',

    // Extended Palette
    bronze: '#CD7F32',
    'olive-green': '#6B8E23',
    'marble-white': '#F8F8FF',
    'deep-wine': '#4A0E0E',
    'gold-shimmer': '#FFD700',
    'stone-gray': '#8B8680',
  },

  // Semantic color mappings
  semantic: {
    primary: '#6f1c16', // blood-red
    secondary: '#7e4031', // terracotta
    accent: '#ee8a3c', // golden-amber
    background: '#000000', // void-black
    text: '#ffecd1', // ivory-cream
    textSecondary: '#8B8680', // stone-gray
    highlight: '#FFD700', // gold-shimmer
    border: '#7e4031', // terracotta
    glow: '#ee8a3c', // golden-amber
    shadow: '#4A0E0E', // deep-wine
  },

  // Greek mythology inspired gradients
  gradients: {
    blood: 'linear-gradient(135deg, #6f1c16 0%, #4A0E0E 100%)',
    gold: 'linear-gradient(135deg, #FFD700 0%, #ee8a3c 100%)',
    terracotta: 'linear-gradient(135deg, #7e4031 0%, #6f1c16 100%)',
    marble: 'linear-gradient(135deg, #F8F8FF 0%, #ffecd1 100%)',
    bronze: 'linear-gradient(135deg, #CD7F32 0%, #7e4031 100%)',
  },

  // Typography
  fonts: {
    serif: "'Allrounder Monument Test', 'Cinzel', serif", // primary heading
    sans: "'IM Fell English', 'Libre Baskerville', serif", // secondary / body
  },

  // Effects
  effects: {
    glow: {
      blood: '0 0 20px rgba(111, 28, 22, 0.5)',
      gold: '0 0 30px rgba(255, 215, 0, 0.6)',
      amber: '0 0 25px rgba(238, 138, 60, 0.5)',
    },
    shadow: {
      deep: '0 10px 40px rgba(74, 14, 14, 0.8)',
      medium: '0 5px 20px rgba(74, 14, 14, 0.5)',
      light: '0 2px 10px rgba(74, 14, 14, 0.3)',
    },
  },
} as const;

export type ThemeColors = typeof theme.colors;
export type SemanticColors = typeof theme.semantic;
