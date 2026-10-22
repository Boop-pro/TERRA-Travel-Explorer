import { Platform } from 'react-native';

export const Colors = {
  // Primary Palette
  background: '#F4EFE6',         // Warm ivory & parchment
  forestGreen: '#20382B',        // Deep forest-green typography & accents
  terracotta: '#B96548',         // Terracotta orange & badge highlights
  terracottaDark: '#9C4D32',     // Hover / pressed terracotta
  terracottaSoft: 'rgba(185, 101, 72, 0.12)', // Subtle terracotta badge tint
  mutedOlive: '#858B70',         // Muted olive accents & subtle borders
  oliveSoft: 'rgba(133, 139, 112, 0.18)',
  softCream: '#E9E0D2',          // Subtle parchment surface
  paperLight: '#FAF7F2',         // Card container background
  cardBorder: '#E2D9CC',         // Organic separator borders
  darkText: '#252B24',           // Editorial readable dark charcoal
  mutedText: '#6A7268',          // Secondary captions & metadata
  subtleText: '#8E968C',         // Micro labels
  white: '#FFFFFF',
  
  // Status & interactive
  heartActive: '#C94A29',
  heartInactive: 'rgba(37, 43, 36, 0.45)',
  heartBg: 'rgba(244, 239, 230, 0.92)',
  overlayDark: 'rgba(18, 30, 23, 0.55)',
  overlayGradient: 'rgba(18, 30, 23, 0.85)',
};

export const Fonts = {
  serifBold: Platform.select({
    web: "'Cormorant Garamond', Georgia, serif",
    default: 'CormorantGaramond_700Bold',
  }),
  serifSemiBold: Platform.select({
    web: "'Cormorant Garamond', Georgia, serif",
    default: 'CormorantGaramond_600SemiBold',
  }),
  serifRegular: Platform.select({
    web: "'Cormorant Garamond', Georgia, serif",
    default: 'CormorantGaramond_400Regular',
  }),
  sansBold: Platform.select({
    web: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    default: 'DMSans_700Bold',
  }),
  sansMedium: Platform.select({
    web: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    default: 'DMSans_500Medium',
  }),
  sansRegular: Platform.select({
    web: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    default: 'DMSans_400Regular',
  }),
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  hero: 64,
};

export const Layout = {
  maxWidth: 1200,
  contentPadding: 20,
  borderRadiusSm: 8,
  borderRadiusMd: 14,
  borderRadiusLg: 22,
  borderRadiusPill: 9999,
};

export const Shadows = {
  subtle: {
    shadowColor: '#20382B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  card: {
    shadowColor: '#20382B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  hover: {
    shadowColor: '#20382B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
};
