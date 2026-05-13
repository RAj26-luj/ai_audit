import type { Metadata } from "next";

import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

//fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//meta data
export const metadata: Metadata = {
  title: "StackAudit",
  description:
    "AI infrastructure audit and spend optimization platform",
};

//root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#020205]`}
    >

      <body className="min-h-screen bg-[#020205] text-white overflow-x-hidden">
        {children}
      </body>

    </html>
  );
}