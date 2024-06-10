import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      shadow: {
        xs: (_ = 'rgb(0 0 0 / 0.1)') =>
          `0 1px 2px 0 rgb(0 0 0 / 0.05)`,
        sm: (color = 'rgb(0 0 0 / 0.1)') =>
          `0 1px 3px 0 ${color}, 0 1px 2px -1px ${color}`,
        md: (color = 'rgb(0 0 0 / 0.1)') =>
          `0 4px 6px -1px ${color}, 0 2px 4px -2px ${color}`,
        lg: (color = 'rgb(0 0 0 / 0.1)') =>
          `0 10px 15px -3px ${color}, 0 4px 6px -4px ${color}`,
        xl: (color = 'rgb(0 0 0 / 0.1)') =>
          `0 20px 25px -5px ${color}, 0 8px 10px -6px ${color}`,
        '2xl': (color = 'rgb(0 0 0 / 0.25)') =>
          `0 25px 50px -12px ${color}`,
        inner: (color = 'rgb(0 0 0 / 0.05)') =>
          `inset 0 2px 4px 0 ${color}`,
        none: () => `none`,
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), 
    plugin(({ addUtilities }) => {
      addUtilities({
        '.scrollbar-hide': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      })
    }),
  ],
}