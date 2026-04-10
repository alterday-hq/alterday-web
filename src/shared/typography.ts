/**
 * Typography system — Geist Variable is the single typeface for both
 * body copy and headings. Scale follows a Major Third (1.25) modular ratio.
 */

export const fontFamily = {
  sans: '"Geist Variable", sans-serif',
} as const;

export const fontSize = {
  xs:   '0.75rem',   //  12px
  sm:   '0.875rem',  //  14px
  base: '1rem',      //  16px
  lg:   '1.125rem',  //  18px
  xl:   '1.25rem',   //  20px
  '2xl':'1.563rem',  //  25px
  '3xl':'1.953rem',  //  31px
  '4xl':'2.441rem',  //  39px
  '5xl':'3.052rem',  //  49px
} as const;

export const fontWeight = {
  regular:  '400',
  medium:   '500',
  semibold: '600',
  bold:     '700',
} as const;

export const lineHeight = {
  tight:   '1.2',
  snug:    '1.375',
  normal:  '1.5',
  relaxed: '1.625',
} as const;

export const letterSpacing = {
  tight:  '-0.02em',
  normal: '0em',
  wide:   '0.04em',
  widest: '0.08em',
} as const;

/**
 * Preset text styles — maps semantic roles to scale values.
 * Use these as a reference when building components.
 */
export const textStyles = {
  displayLg: { fontSize: fontSize['5xl'], fontWeight: fontWeight.bold,     lineHeight: lineHeight.tight,   letterSpacing: letterSpacing.tight  },
  displaySm: { fontSize: fontSize['4xl'], fontWeight: fontWeight.bold,     lineHeight: lineHeight.tight,   letterSpacing: letterSpacing.tight  },
  h1:        { fontSize: fontSize['3xl'], fontWeight: fontWeight.bold,     lineHeight: lineHeight.snug,    letterSpacing: letterSpacing.tight  },
  h2:        { fontSize: fontSize['2xl'], fontWeight: fontWeight.semibold, lineHeight: lineHeight.snug,    letterSpacing: letterSpacing.tight  },
  h3:        { fontSize: fontSize.xl,    fontWeight: fontWeight.semibold, lineHeight: lineHeight.snug,    letterSpacing: letterSpacing.normal },
  h4:        { fontSize: fontSize.lg,    fontWeight: fontWeight.medium,   lineHeight: lineHeight.normal,  letterSpacing: letterSpacing.normal },
  bodyLg:    { fontSize: fontSize.lg,    fontWeight: fontWeight.regular,  lineHeight: lineHeight.relaxed, letterSpacing: letterSpacing.normal },
  body:      { fontSize: fontSize.base,  fontWeight: fontWeight.regular,  lineHeight: lineHeight.relaxed, letterSpacing: letterSpacing.normal },
  bodySm:    { fontSize: fontSize.sm,    fontWeight: fontWeight.regular,  lineHeight: lineHeight.normal,  letterSpacing: letterSpacing.normal },
  caption:   { fontSize: fontSize.xs,    fontWeight: fontWeight.medium,   lineHeight: lineHeight.normal,  letterSpacing: letterSpacing.wide   },
  label:     { fontSize: fontSize.sm,    fontWeight: fontWeight.semibold, lineHeight: lineHeight.normal,  letterSpacing: letterSpacing.widest },
} as const;
