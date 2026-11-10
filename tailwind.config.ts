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
        // Sharp UI palette — sharp-ui/Main.dc.html
        //
        // ONE accent, not three. `brand-orange` is now the single chrome hue
        // and every call site that reached for it keeps working unchanged.
        // Driven by tokens rather than literals so both skins get the same hue
        // at the same contrast. The `<alpha-value>` form is required: ~40 call
        // sites use opacity modifiers (bg-brand-orange/15 and friends), and a
        // bare hsl(var(--x)) silently breaks every one of them.
        "brand-orange": "hsl(var(--primary) / <alpha-value>)",
        "brand-orange-strong": "hsl(var(--primary-strong) / <alpha-value>)",
        "brand-orange-soft": "#ffb073",
        // Semantic severity, NEVER restyled to fit the palette — these encode
        // data (module category, difficulty, status), so repainting them to
        // match the skin would destroy the thing they carry. Remapped onto the
        // pack's severity ramp rather than dropped.
        "brand-red": "hsl(var(--sev-critical) / <alpha-value>)",
        "brand-green": "hsl(var(--sev-low) / <alpha-value>)",
        "brand-blue": "hsl(var(--sev-info) / <alpha-value>)",
        "brand-teal": "hsl(var(--sev-low) / <alpha-value>)",
        "brand-purple": "hsl(var(--sev-medium) / <alpha-value>)",
        "brand-navy": "#0d0d0d",
        // Chrome
        "brand-ink": "#0d0d0d",
        "brand-cream": "#f2f0ed",
        // Tinted companions for severity backgrounds
        "sev-critical-bg": "#3f1616",
        "sev-high-bg": "#3d2410",
        "sev-medium-bg": "#362c0a",
        "sev-low-bg": "#132a1c",
        "sev-info-bg": "#24272d",
      },
      // Sharp geometry. All three flatten to zero, so the ~150 existing
      // rounded-lg / -md / -sm call sites go square with no edit. Pills
      // (rounded-full) and dots keep their own radius: they are a label
      // language, not a surface, and squaring them would make them read as
      // tiny cards.
      borderRadius: {
        lg: "var(--radius)",
        md: "var(--radius)",
        sm: "var(--radius)",
        xl: "var(--radius)",
        "2xl": "var(--radius)",
        "3xl": "var(--radius)",
      },
      // Three faces, one job each.
      //   sans  — all UI: headings, labels, body, buttons
      //   mono  — numerals and identifiers. If it is a number or a name a
      //           machine produced, it is mono.
      //   nav   — sidebar navigation only
      // `display` is kept pointing at the nav face so the existing font-display
      // call sites resolve to something in the system rather than a dead var.
      fontFamily: {
        sans: ["var(--font-outfit)", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
        nav: ["var(--font-space-grotesk)", "var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "var(--font-outfit)", "system-ui", "sans-serif"],
      },
      // Depth always comes from a token, never an inline value. Mapping the
      // stock shadow scale onto the --neu-* set means the existing shadow-sm /
      // -md / -lg call sites pick up Sharp bevels instead of blurred drops,
      // which on a near-black canvas would only pool light and read as a lamp.
      boxShadow: {
        none: "none",
        sm: "var(--neu-raised-xs)",
        DEFAULT: "var(--neu-raised-sm)",
        md: "var(--neu-raised-sm)",
        lg: "var(--neu-raised)",
        xl: "var(--neu-raised)",
        "2xl": "var(--neu-raised-lift)",
        inner: "var(--neu-inset)",
        raised: "var(--neu-raised)",
        tile: "var(--neu-raised-sm)",
        chip: "var(--neu-raised-xs)",
        well: "var(--neu-inset)",
        pressed: "var(--neu-pressed)",
        lift: "var(--neu-raised-lift)",
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
