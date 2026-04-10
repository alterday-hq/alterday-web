/**
 * Brand color palette — 60/30/10 rule applied to dark and light themes.
 *
 * 60% — dominant background
 * 30% — secondary surface / supporting
 * 10% — accent / call-to-action
 */

export const darkPalette = {
  /** 60% — primary background */
  background: '#0F1117',
  /** 30% — secondary surface (cards, panels) */
  surface: '#1A2E2E',
  /** 10% — accent, CTAs, highlights */
  accent: '#00E5C3',
} as const;

export const lightPalette = {
  /** 60% — primary background */
  background: '#F5F7F7',
  /** 30% — secondary surface (cards, panels) */
  surface: '#D6EEEB',
  /** 10% — accent, CTAs, highlights */
  accent: '#00967D',
} as const;

/** Semantic foreground pairings — text colour to use on each background */
export const foreground = {
  dark: {
    onBackground: '#F5F7F7',
    onSurface: '#D6EEEB',
    onAccent: '#0F1117',
  },
  light: {
    onBackground: '#0F1117',
    onSurface: '#1A2E2E',
    onAccent: '#F5F7F7',
  },
} as const;

/** Utility: destructive / error state (theme-agnostic) */
export const semantic = {
  destructive: '#E53E3E',
  warning: '#D97706',
  success: '#00967D',
} as const;
