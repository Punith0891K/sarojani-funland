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
  metadataBase: new URL("https://sarojanifunland.vercel.app"),

  title: "Sarojani Funland | Kids Play Area & Indoor Play Zone in Mysuru (Mysore)",

  description:
    "Sarojani Funland is a premium indoor kids play area in Mysuru (Mysore) featuring trampolines, electric cars, scooter rides, VR games, family entertainment, and online booking.",

  keywords: [
    "Sarojani Funland",
    "Kids Play Area Mysuru",
    "Kids Play Area Mysore",
    "Indoor Play Zone Mysuru",
    "Indoor Play Zone Mysore",
    "Trampoline Park Mysuru",
    "Trampoline Park Mysore",
    "VR Games Mysuru",
    "VR Games Mysore",
    "Kids Activities Mysuru",
    "Kids Activities Mysore",
    "Family Entertainment Mysuru",
    "Family Entertainment Mysore",
    "Electric Car Ride Mysuru",
    "Play Area Near Me",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Sarojani Funland | Kids Play Area in Mysuru",
    description:
      "Fun • Adventure • Family Entertainment • Online Booking",
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
