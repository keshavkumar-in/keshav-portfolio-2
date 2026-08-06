// /app/layout.tsx
import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.scss";
import ScrollToTop from "@/components/layout/ScrollToTop";
import GoogleTagManager from "@/components/GoogleTagManager";
import { SITE } from "@/lib/site";

// Display face — carries the whole visual identity. Variable, so the full
// 100–900 range is available without shipping extra files.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Utility face — eyebrows, metadata, metric deltas.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Body face — prose only.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Keshav Kumar — Full Stack Developer for hire",
    template: "%s | Keshav Kumar",
  },
  description:
    "Freelance full stack developer. I build and rescue web platforms — Core Web Vitals, payment flows, and systems that hold up at scale. LCP 4.5s to 0.6s. Query times 60s to 1.2s.",
  keywords: [
    "Freelance Full Stack Developer",
    "Hire React Developer",
    "Next.js Developer",
    "Web Performance Consultant",
    "Core Web Vitals",
    "Node.js Developer",
    "Freelance Web Developer India",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: `${SITE.name} — Full Stack Developer`,
    title: "Keshav Kumar — Full Stack Developer for hire",
    description:
      "Freelance full stack developer. I build and rescue web platforms that hold up at scale. See the case studies.",
    // No `images` here on purpose. src/app/opengraph-image.tsx generates the
    // card and Next wires the tags itself; a hand-written path is what broke
    // previously, pointing at an /og-image.jpg that was never in the repo.
  },
  twitter: {
    card: "summary_large_image",
    title: "Keshav Kumar — Full Stack Developer for hire",
    description:
      "Freelance full stack developer. I build and rescue web platforms that hold up at scale.",
    creator: "@keshavcodes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      // Preferred where supported — stays sharp on any display density.
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body suppressHydrationWarning>
        <GoogleTagManager />
        <a href="#main" className="skipLink">
          Skip to content
        </a>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
