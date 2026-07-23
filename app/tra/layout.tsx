import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Navbar from "./_components/Navbar";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "500",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FELT Studio",
  description: "A minimalist studio portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}