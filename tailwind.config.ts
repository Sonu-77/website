import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — resolved via CSS variables so light/dark both work
        base: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--bg-2) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-2': 'rgb(var(--ink-2) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        primary: '#2563EB',
        cyan: '#22D3EE',
        violet: '#8B5CF6',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        wrap: '76rem',
      },
      animation: {
        'orb-a': 'orb-a 26s ease-in-out infinite alternate',
        'orb-b': 'orb-b 32s ease-in-out infinite alternate',
        'orb-c': 'orb-c 38s ease-in-out infinite alternate',
        'spin-slow': 'spin 40s linear infinite',
        shimmer: 'shimmer 2.4s linear infinite',
      },
      keyframes: {
        'orb-a': {
          '0%': { transform: 'translate(-8%, -4%) scale(1)' },
          '100%': { transform: 'translate(10%, 12%) scale(1.15)' },
        },
        'orb-b': {
          '0%': { transform: 'translate(6%, 8%) scale(1.1)' },
          '100%': { transform: 'translate(-10%, -6%) scale(0.95)' },
        },
        'orb-c': {
          '0%': { transform: 'translate(0%, 10%) scale(0.9)' },
          '100%': { transform: 'translate(4%, -8%) scale(1.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
