import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import ContactSection from "@/components/home/ContactSection";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jasmine Jackson — Product Designer",
  description:
    "Jasmine Jackson is a product designer rooting ideas in user needs and growing thoughtful, impactful experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <ContactSection />
      </body>
    </html>
  );
}
