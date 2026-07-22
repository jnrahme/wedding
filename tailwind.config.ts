import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './config/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#f7f1e6',
        ink: '#080807',
        emerald: '#0f3d32',
        gold: '#c6a15b',
        champagne: '#ead8b7',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 48px rgba(198, 161, 91, 0.24)',
      },
      backgroundImage: {
        'radial-gold':
          'radial-gradient(circle at 50% 30%, rgba(198,161,91,0.22), transparent 32rem)',
      },
    },
  },
  plugins: [],
};

export default config;
