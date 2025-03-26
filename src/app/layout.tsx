// /app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.keshavumar.in"),
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
    url: "https://www.keshavumar.in",
    siteName: "Keshav Kumar - Full Stack Developer",
    title: "Keshav Kumar | Full Stack Developer Portfolio",
    description:
      "Professional Full Stack Developer specializing in React, Node.js, and modern web technologies. View my portfolio of projects and get in touch for collaboration.",
    images: [
      {
        url: "https://www.keshavumar.in/og-image.jpg",
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
    images: ["https://www.keshavumar.in/twitter-image.jpg"],
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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your_google_verification_code",
  },
  alternates: {
    canonical: "https://keshavumar.in",
    languages: {
      "en-US": "https://keshavumar.in",
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
      <body className={inter.className}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
