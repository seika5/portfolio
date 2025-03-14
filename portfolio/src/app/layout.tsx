import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ryan Mar | SWE",
  description: "Ryan Mar—software engineer experienced in full-stack development, artificial intelligence, cloud solutions, and more.",
  keywords: ["software engineer", "portfolio", "full-stack developer", "AI engineer", "web development", "cloud solutions"],
  authors: [{ name: "Ryan Mar" }],
  openGraph: {
    title: "Ryan Mar | SWE",
    description: "Ryan Mar—software engineer experienced in full-stack development, artificial intelligence, cloud solutions, and more.",
    images: [
      {
        url: "/meta.png",
        width: 1200,
        height: 630,
        alt: "Ryan Mar - Software Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Mar | Software Engineer",
    description: "Ryan Mar—software engineer experienced in full-stack development, artificial intelligence, cloud solutions, and more.",
    images: ["/meta.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <ClientBody>
        {children}
      </ClientBody>
    </html>
  );
}
