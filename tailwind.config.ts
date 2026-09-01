import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
        // Technieum brand palette
        "brand-navy": "#0D1B2A",
        "brand-blue": "#1B4F72",
        "brand-teal": "#1ABC9C",
        "brand-orange": "#E8792A",
        "brand-green": "#27AE60",
        "brand-red": "#C0392B",
        "brand-purple": "#8E44AD",
        // Technieum OS v2 — near-black chrome + warm paper surface (sidebar, title bands, hero cards)
        "brand-ink": "#0E0D0B",
        "brand-cream": "#F7F4EF",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        display: ["var(--font-fraunces)", "serif"],
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
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pop-check": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "60%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "fill-bar": {
          from: { width: "0%" },
          to: { width: "var(--fill-to, 100%)" },
        },
        // Slideshow: each element rises into place from the travel direction.
        // `--enter-x` is set per-slide so one keyframe serves both directions.
        "slide-rise": {
          from: {
            opacity: "0",
            transform: "translate3d(var(--enter-x, 0px), 14px, 0)",
            filter: "blur(5px)",
          },
          to: {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
            filter: "blur(0px)",
          },
        },
        // Same motion without the blur — for diagrams/SVG, where filtering is costly.
        "slide-rise-soft": {
          from: {
            opacity: "0",
            transform: "translate3d(var(--enter-x, 0px), 14px, 0)",
          },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        "slide-sink": {
          from: { opacity: "1", transform: "translate3d(0, 0, 0)" },
          to: {
            opacity: "0",
            transform: "translate3d(var(--exit-x, 0px), -8px, 0)",
            filter: "blur(4px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "pop-check": "pop-check 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "fill-bar": "fill-bar 0.8s ease-out forwards",
        // Expo-out easing — long, decisive settle rather than a linear-feeling glide.
        "slide-rise": "slide-rise 520ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-rise-soft":
          "slide-rise-soft 520ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-sink": "slide-sink 240ms cubic-bezier(0.4, 0, 1, 1) both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
