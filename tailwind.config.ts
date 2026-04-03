import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        craft: {
          paper: 'var(--craft-paper)',
          ink: 'var(--craft-ink)',
          muted: 'var(--craft-muted)',
          orange: 'var(--craft-orange)',
          green: 'var(--craft-green)',
          pink: 'var(--craft-pink)',
          yellow: 'var(--craft-yellow)',
          red: 'var(--craft-red)',
          blue: 'var(--craft-blue)',
          lime: 'var(--craft-lime)',
          twine: 'var(--craft-twine)',
          rope: {
            light: 'var(--craft-rope-light)',
            mid: 'var(--craft-rope-mid)',
            dark: 'var(--craft-rope-dark)',
          },
        },
      },
      fontFamily: {
        craft: ['var(--craft-font-display)', 'Caveat', 'cursive'],
        craftMarker: ['var(--craft-font-marker)', 'Kalam', 'Caveat', 'cursive'],
        craftSans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'craft-paper':
          '0 1px 2px rgb(0 0 0 / 0.06), 0 2px 8px rgb(0 0 0 / 0.04), 0 0 0 1px rgb(0 0 0 / 0.04)',
        'craft-paper-lg':
          '0 2px 4px rgb(0 0 0 / 0.07), 0 8px 24px rgb(0 0 0 / 0.06), 0 0 0 1px rgb(0 0 0 / 0.05)',
        clay: 'inset 0 2px 4px rgb(255 255 255 / 0.45), inset 0 -3px 6px rgb(0 0 0 / 0.12), 0 4px 12px rgb(0 0 0 / 0.1)',
        eraser:
          '4px 4px 0 0 var(--craft-ink), 6px 6px 0 0 rgb(0 0 0 / 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config
