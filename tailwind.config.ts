import type { Config } from 'tailwindcss';

/**
 * LoStocco "Bold & Bright" design tokens.
 * These eight colors are the entire palette. No gradients, no new hues.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    // Breakpoints are defined outright (not extended) so the scale is exactly
    // the four the design calls for: 480 / 768 / 1024 / 1440.
    screens: {
      xs: '480px',
      sm: '768px',
      md: '1024px',
      lg: '1440px',
    },
    extend: {
      colors: {
        forest: '#1B4D2E',
        ink: '#14211A',
        amber: '#F2A50C',
        mint: '#EAF2E7',
        page: '#F7FBF4',
        paper: '#FFFFFF',
        bone: '#F7F6F1',
        warning: '#C0392B',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.875rem, 6.2vw, 5.125rem)', { lineHeight: '1.06' }],
        section: ['clamp(1.875rem, 3.4vw, 3.25rem)', { lineHeight: '1.04' }],
        subsection: ['clamp(1.5rem, 2.4vw, 2.25rem)', { lineHeight: '1.06' }],
        cardhead: ['clamp(1.125rem, 1.3vw, 1.5rem)', { lineHeight: '1.12' }],
        lede: ['clamp(1rem, 1.05vw, 1.1875rem)', { lineHeight: '1.6' }],
      },
      borderWidth: {
        '3': '3px',
        '3.5': '3.5px',
      },
      borderRadius: {
        card: '20px',
        frame: '18px',
      },
      boxShadow: {
        hard: '6px 6px 0 #1B4D2E',
        'hard-amber': '9px 9px 0 #F2A50C',
        'hard-ink': '6px 6px 0 #14211A',
        'hard-sm': '4px 4px 0 #14211A',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        bob: 'bob 3.4s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
