import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#C8B49A',
          light: '#D4C4B0',
          dark: '#A89070',
        },
        ob: {
          black: '#0A0A0A',
          dark: '#111111',
          panel: '#181818',
          border: '#272727',
          muted: '#666666',
          white: '#F5F0EB',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config