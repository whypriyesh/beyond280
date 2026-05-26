/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          bg: '#050505',
          card: '#0D0D11',
          cardHover: '#13131A',
          border: 'rgba(255, 255, 255, 0.07)',
          accent: '#E2C29B', // Champagne Gold
          accentHover: '#EAD3B8',
          accentMuted: 'rgba(226, 194, 155, 0.1)',
          muted: '#8E8E9F',
          ai: '#6366F1', // AI Space Indigo
          aiMuted: 'rgba(99, 102, 241, 0.15)',
          aiGlow: 'rgba(99, 102, 241, 0.06)',
          success: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Syne', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
