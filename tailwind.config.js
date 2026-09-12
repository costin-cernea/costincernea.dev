/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Zinc-950 centered dark palette
        surface: {
          DEFAULT: '#09090b', // zinc-950 — page background
          raised: '#111113',  // slightly lifted cards
          sunken: '#050507',
        },
        ink: {
          DEFAULT: '#fafafa', // primary text
          muted: '#a1a1aa',   // zinc-400 — sub-labels
          subtle: '#71717a',  // zinc-500 — meta text
        },
        accent: {
          DEFAULT: '#e4e4e7', // zinc-200 — minimalist accent
          glow: '#8b5cf6',    // violet-500 — cursor-follow glow
          edge: '#27272a',    // zinc-800 — hairlines
        },
      },
      fontFamily: {
        sans: ['Inter', 'Geist Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        // Balanced display scale for hero typography — text-4xl → text-6xl range
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '600' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '600' }],
      },
      backgroundImage: {
        'radial-glow':
          'radial-gradient(600px circle at var(--mx) var(--my), rgba(139, 92, 246, 0.15), transparent 40%)',
        'card-glow':
          'radial-gradient(400px circle at var(--mx) var(--my), rgba(255, 255, 255, 0.06), transparent 40%)',
        'noise':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'card': '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(255,255,255,0.04)',
        'card-hover': '0 1px 0 0 rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px -20px rgba(139,92,246,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
