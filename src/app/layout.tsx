import type { Metadata } from "next";
import {
  Silkscreen,
  Plus_Jakarta_Sans,
  Reddit_Mono,
  Reddit_Sans,
} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import CustomCursor from "@/components/CustomCursor";
import ContactSection from "@/components/home/ContactSection";

// Site-wide type system: Plus Jakarta Sans for headings and body, Reddit
// Mono for metadata labels.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

// Home hero type: Silkscreen (pixel display) for the name, Reddit Mono
// for the description.
const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: "400",
});

const redditMono = Reddit_Mono({
  variable: "--font-reddit-mono",
  subsets: ["latin"],
});

// Top nav.
const redditSans = Reddit_Sans({
  variable: "--font-reddit-sans",
  subsets: ["latin"],
});

const SITE_URL = "https://jasminejackson.design";
const OG_ALT =
  "Two illustrated flowers around pill-shaped stickers reading “I’m Jasmine Jackson” and “designer and builder rooted in user needs, growing impactful experiences.”";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Jasmine Jackson, Product Designer",
  description:
    "Jasmine Jackson is a product designer rooting ideas in user needs and growing thoughtful, impactful experiences.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Jasmine Jackson, Product Designer",
    description:
      "Jasmine Jackson is a product designer rooting ideas in user needs and growing thoughtful, impactful experiences.",
    url: SITE_URL,
    siteName: "Jasmine Jackson",
    type: "website",
    images: [
      {
        url: "/og-hero.jpg",
        width: 1200,
        height: 630,
        alt: OG_ALT,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasmine Jackson, Product Designer",
    description:
      "Jasmine Jackson is a product designer rooting ideas in user needs and growing thoughtful, impactful experiences.",
    images: [
      {
        url: "/og-hero.jpg",
        width: 1200,
        height: 630,
        alt: OG_ALT,
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${silkscreen.variable} ${redditMono.variable} ${redditSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans font-normal">
        <CustomCursor />
        <Nav />
        <main className="flex-1">{children}</main>
        <ContactSection />
      </body>
    </html>
  );
}
