// /app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import ScrollToTop from "@/components/ScrollToTop";
import GoogleTagManager from "@/components/GoogleTagManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.keshavkumar.in"),
  title: {
    default: "Keshav Kumar | Full Stack Developer",
    template: "%s | Keshav Kumar",
  },
  description:
    "Professional Full Stack Developer specializing in React, Node.js, and modern web technologies. View my portfolio of projects and get in touch for collaboration.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Node.js Developer",
    "Web Development",
    "Software Engineer",
    "JavaScript Expert",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Keshav Kumar" }],
  creator: "Keshav Kumar",
  publisher: "Keshav Kumar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.keshavkumar.in",
    siteName: "Keshav Kumar - Full Stack Developer",
    title: "Keshav Kumar | Full Stack Developer",
    description:
      "Professional Full Stack Developer specializing in React, Node.js, and modern web technologies. View my portfolio of projects and get in touch for collaboration.",
    images: [
      {
        url: "https://www.keshavkumar.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Keshav Kumar - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keshav Kumar | Full Stack Developer",
    description:
      "Professional Full Stack Developer specializing in React, Node.js, and modern web technologies.",
    images: ["https://www.keshavkumar.in/twitter-image.jpg"],
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
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://keshavkumar.in",
    languages: {
      "en-US": "https://keshavkumar.in",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Only static tags/components here */}
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <GoogleTagManager />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
