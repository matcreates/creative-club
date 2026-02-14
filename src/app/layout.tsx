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
  title: "Creative Club — Where Ideas Come to Life",
  description:
    "Creative Club is a community and studio for bold creators, designers, and makers. Join us at creativeclub.pro.",
  openGraph: {
    title: "Creative Club — Where Ideas Come to Life",
    description:
      "A community and studio for bold creators, designers, and makers.",
    url: "https://creativeclub.pro",
    siteName: "Creative Club",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Club",
    description:
      "A community and studio for bold creators, designers, and makers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
