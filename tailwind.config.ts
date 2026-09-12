import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', 'class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    screens: {
      'xs': '450px',
      'sm': '575px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1400px',
    },
    extend: {
      colors: {
        'current': 'currentColor',
        'transparent': 'transparent',
        'white': '#FFFFFF',
        'black': '#121723',
        'dark': '#1D2430',
        'primary': {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        'yellow': '#FBB040',
        'body-color': '#788293',
        'body-color-dark': '#959CB1',
        'gray-dark': '#1E232E',
        'gray-light': '#F0F2F9',
        'stroke': '#E3E8EF',
        'stroke-dark': '#353943',
        'bg-color-dark': '#171C28',
        'fontSize': {
          'xs': '0.75rem',
          'sm': '0.875rem',
          'base': '1rem',
          'lg': '1.125rem',
          'xl': '1.25rem',
          '2xl': '1.5rem',
          '3xl': '2rem',
          '4xl': '2.5rem',
          '5xl': '3.25rem',
          '6xl': '4rem',
        },
        'inset': {
          full: '100%',
        },
        'letterSpacing': {
          tighter: '-0.02em',
          tight: '-0.01em',
          normal: '0',
          wide: '0.01em',
          wider: '0.02em',
          widest: '0.4em',
        },
        'minWidth': {
          10: '2.5rem',
        },
        'scale': {
          98: '.98',
        },
        'borderRadius': {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
        'keyframes': {
          'accordion-down': {
            from: {
              height: '0',
            },
            to: {
              height: 'var(--radix-accordion-content-height)',
            },
          },
          'accordion-up': {
            from: {
              height: 'var(--radix-accordion-content-height)',
            },
            to: {
              height: '0',
            },
          },
          'svg-stroke': {
            to: {
              strokeDashoffset: '0',
            },
          },
          'pulse': {
            '0%, 100%': { boxShadow: '0 0 0 0 var(--pulse-color)' },
            '50%': { boxShadow: '0 0 0 8px var(--pulse-color)' },
          },
        },
        'animation': {
          'svg-stroke': 'svg-stroke 1s ease-in',
          'accordion-down': 'accordion-down 0.2s ease-out',
          'accordion-up': 'accordion-up 0.2s ease-out',
          'pulse': 'pulse var(--duration) ease-out infinite',
        },
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'card': {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'popover': {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        'secondary': {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        'muted': {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        'accent': {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        'destructive': {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        'border': 'hsl(var(--border))',
        'input': 'hsl(var(--input))',
        'ring': 'hsl(var(--ring))',
        'chart': {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      rotate: {
        360: '360deg',
        720: '720deg',
      },
      boxShadow: {
        'signUp': '0px 5px 10px rgba(4, 10, 34, 0.2)',
        'one': '0px 2px 3px rgba(7, 7, 77, 0.05)',
        'two': '0px 5px 10px rgba(6, 8, 15, 0.1)',
        'three': '0px 5px 15px rgba(6, 8, 15, 0.05)',
        'sticky': 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)',
        'sticky-dark': 'inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)',
        'feature-2': '0px 10px 40px rgba(48, 86, 211, 0.12)',
        'submit': '0px 5px 20px rgba(4, 10, 34, 0.1)',
        'submit-dark': '0px 5px 20px rgba(4, 10, 34, 0.1)',
        'btn': '0px 1px 2px rgba(4, 10, 34, 0.15)',
        'btn-hover': '0px 1px 2px rgba(0, 0, 0, 0.15)',
        'btn-light': '0px 1px 2px rgba(0, 0, 0, 0.1)',
      },
      dropShadow: {
        three: '0px 5px 15px rgba(6, 8, 15, 0.05)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')],
} satisfies Config
