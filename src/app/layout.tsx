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

export const metadata: Metadata = {
  metadataBase: new URL("https://jasmine-portfolio-one.vercel.app"),
  title: "Jasmine Jackson — Product Designer",
  description:
    "Jasmine Jackson is a product designer rooting ideas in user needs and growing thoughtful, impactful experiences.",
  openGraph: {
    title: "Jasmine Jackson — Product Designer",
    description:
      "Jasmine Jackson is a product designer rooting ideas in user needs and growing thoughtful, impactful experiences.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasmine Jackson — Product Designer",
    description:
      "Jasmine Jackson is a product designer rooting ideas in user needs and growing thoughtful, impactful experiences.",
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
