import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: '#080611',
        card: '#0f0c1a',
        elevated: '#161228',
        border: '#231d3a',
        primary: {
          DEFAULT: '#473472',
          hover: '#5a4190',
          light: '#6b52a8',
        },
        accent: {
          DEFAULT: '#8b6ed4',
          bright: '#a98de8',
          dim: '#5d4e8a',
        },
        text: {
          primary: '#f0ebff',
          secondary: '#9d8ec0',
          muted: '#5d5279',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(71 52 114 / 0.15)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { from: { opacity: '0', transform: 'translateX(100%)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(71, 52, 114, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 110, 212, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
