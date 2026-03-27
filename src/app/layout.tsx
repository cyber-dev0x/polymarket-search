import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Polymarket Search — Search prediction markets at market speed.",
  description:
    "A high-speed discovery engine for prediction markets. Search, explore, and understand Polymarket markets, narratives, and probabilities before they price in.",
  keywords: [
    "polymarket",
    "prediction markets",
    "market search",
    "betting markets",
    "probability",
    "narratives",
  ],
  openGraph: {
    title: "Polymarket Search",
    description: "Search prediction markets at market speed.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Polymarket Search",
    description: "Search prediction markets at market speed.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <meta name="theme-color" content="#080808" />
      </head>
      <body className="bg-[#080808] text-white overflow-x-hidden">{children}</body>
    </html>
  );
}
