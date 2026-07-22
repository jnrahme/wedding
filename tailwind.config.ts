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
        ivory: '#FFFFFF',
        ink: '#080807',
        emerald: '#0f3d32',
        gold: '#1A1A1A',
        champagne: '#2C2C2C',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 48px rgba(26, 26, 26, 0.18)',
      },
      backgroundImage: {
        'radial-gold':
          'radial-gradient(circle at 50% 30%, rgba(26,26,26,0.18), transparent 32rem)',
      },
    },
  },
  plugins: [],
};

export default config;
