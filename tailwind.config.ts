import type { Config } from 'tailwindcss';

/**
 * BannerView 3D Design System — Tailwind theme.
 *
 * All design tokens are exposed as CSS variables in `src/styles/tokens.css`
 * so consumers can theme the system at runtime.
 */
const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(var(--bv-bg) / <alpha-value>)',
        panel: 'hsl(var(--bv-panel) / <alpha-value>)',
        card: 'hsl(var(--bv-card) / <alpha-value>)',
        border: 'hsl(var(--bv-border) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--bv-primary) / <alpha-value>)',
          foreground: 'hsl(var(--bv-primary-fg) / <alpha-value>)',
        },
        success: 'hsl(var(--bv-success) / <alpha-value>)',
        warning: 'hsl(var(--bv-warning) / <alpha-value>)',
        danger: 'hsl(var(--bv-danger) / <alpha-value>)',
        text: {
          primary: 'hsl(var(--bv-text) / <alpha-value>)',
          secondary: 'hsl(var(--bv-text-secondary) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        h1: ['36px', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        h2: ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        h3: ['24px', { lineHeight: '1.25', fontWeight: '600' }],
        h4: ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.5' }],
        small: ['14px', { lineHeight: '1.45' }],
        caption: ['12px', { lineHeight: '1.4', letterSpacing: '0.01em' }],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        'bv-1': '0 1px 2px 0 rgba(0,0,0,0.25)',
        'bv-2': '0 4px 12px -2px rgba(0,0,0,0.4)',
        'bv-3': '0 12px 32px -8px rgba(0,0,0,0.55)',
        // 3D depth — subtle inner highlight + outer drop
        'bv-3d':
          'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 1px 0 0 rgba(255,255,255,0.04), 0 8px 20px -6px rgba(0,0,0,0.55)',
        'bv-3d-pressed':
          'inset 0 2px 4px 0 rgba(0,0,0,0.45), 0 1px 0 0 rgba(255,255,255,0.03)',
        'bv-focus': '0 0 0 3px hsl(var(--bv-primary) / 0.45)',
      },
      transitionTimingFunction: {
        'bv-spring': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
