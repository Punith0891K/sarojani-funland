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
  title: "Sarojani Funland | Kids Play Zone in Mysore",
  description:
    "Indoor play area, trampoline, electric cars, scooter rides and VR games for children and families in Mysore.",
  keywords: [
    "Sarojani Funland",
    "Play Zone Mysore",
    "Kids Activities Mysore",
    "Trampoline Park Mysore",
    "VR Games Mysore",
  ],
  openGraph: {
    title: "Sarojani Funland",
    description:
      "Fun • Adventure • Family Entertainment in Mysore",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
