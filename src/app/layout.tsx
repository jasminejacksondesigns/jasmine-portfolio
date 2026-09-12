import type { Metadata } from "next";
import { Inter, Anonymous_Pro } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import ContactSection from "@/components/home/ContactSection";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anonymousPro = Anonymous_Pro({
  variable: "--font-anonymous-pro",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = localFont({
  src: [
    {
      path: "./fonts/poppins/Poppins-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/poppins/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const redHatDisplay = localFont({
  src: "./fonts/red-hat-display/RedHatDisplay-VariableFont_wght.ttf",
  variable: "--font-red-hat-display",
  display: "swap",
  weight: "300 900",
});

const SITE_URL = "https://jasminejackson.design";
const OG_ALT =
  "Illustrated cream flower with green leaves, Jasmine Jackson’s portfolio mark.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Jasmine Jackson — Product Designer",
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
    title: "Jasmine Jackson — Product Designer",
    description:
      "Jasmine Jackson is a product designer rooting ideas in user needs and growing thoughtful, impactful experiences.",
    url: SITE_URL,
    siteName: "Jasmine Jackson",
    type: "website",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 1200,
        alt: OG_ALT,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasmine Jackson — Product Designer",
    description:
      "Jasmine Jackson is a product designer rooting ideas in user needs and growing thoughtful, impactful experiences.",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 1200,
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
      className={`${inter.variable} ${poppins.variable} ${redHatDisplay.variable} ${anonymousPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans font-light">
        <Nav />
        <main className="flex-1">{children}</main>
        <ContactSection />
      </body>
    </html>
  );
}
