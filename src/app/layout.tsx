import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "nora",
  description: "nora is an engineer who cares about the product and the design as much as the code.",
};

// Umami analytics. Only loads when the website ID is set, so local dev isn't counted.
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
        <Footer />
        <CustomCursor />
        {umamiWebsiteId && (
          <Script src="https://cloud.umami.is/script.js" data-website-id={umamiWebsiteId} strategy="afterInteractive" />
        )}
      </body>
    </html>
  );
}
