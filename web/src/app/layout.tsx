import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-serif",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Selene | Literature & Social Analysis",
  description: "A platform for Christian Realism, Literature, and Social Analysis.",
};

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km">
      <head>
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      </head>
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased font-serif bg-background text-foreground flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
