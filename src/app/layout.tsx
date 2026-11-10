import type { Metadata } from "next";
import { Outfit, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";

// Sharp UI — three faces, one job each (sharp-ui/Main.dc.html).
// All UI: headings, labels, body, buttons.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

// Sidebar navigation only.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Numerals and identifiers. No variable axis is published for this family, so
// the weights the skin uses are requested explicitly.
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Technieum | Cybersecurity Onboarding",
  description: "Internal self-paced offensive security onboarding portal for Technieum new hires.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full bg-background text-foreground font-sans">
        {/* Light-only portal: the clean paper skin is the whole product now, so
            the theme is forced and the dark canvas is retired. */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          storageKey="technieum-theme"
        >
          {children}
          <Toaster richColors position="top-right" theme="light" />
        </ThemeProvider>
      </body>
    </html>
  );
}
