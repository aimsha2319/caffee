import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4C3A51',
        secondary: '#E7AB79',
        accent: '#FFBC80'
      }
    }
  },
  plugins: []
};

export default config;
