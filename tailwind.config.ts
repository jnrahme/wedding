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
        gold: '#FFFFFF',
        champagne: '#F5F5F5',
      },
      fontFamily: {
        script: ['var(--font-script)', 'cursive'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 48px rgba(255, 255, 255, 0.2)',
      },
      backgroundImage: {
        'radial-gold':
          'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.14), transparent 32rem)',
      },
    },
  },
  plugins: [],
};

export default config;
