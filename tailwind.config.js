/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#070913',
          card: 'rgba(15, 23, 42, 0.65)',
          subtle: '#0d1124',
          surface: '#121833',
        },
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        neon: {
          purple: '#a855f7',
          cyan: '#06b6d4',
          blue: '#3b82f6',
          pink: '#ec4899',
          emerald: '#10b981',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 1px, transparent 1px)',
        'hero-glow': 'radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.25) 0%, rgba(6, 182, 212, 0.15) 35%, transparent 70%)',
      },
      boxShadow: {
        'neon-purple': '0 0 25px -5px rgba(168, 85, 247, 0.45)',
        'neon-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.45)',
        'neon-blue': '0 0 25px -5px rgba(59, 130, 246, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-sm': '0 0 12px rgba(168, 85, 247, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
