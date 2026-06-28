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
  title: "StepsWidget - Private Step Counter Widgets",
  description:
    "Show daily steps on your iPhone Home Screen, Lock Screen, and Apple Watch with a private Apple Health step counter widget.",
  keywords: [
    "StepsWidget",
    "steps widget",
    "iPhone step counter widget",
    "Apple Health steps widget",
    "Lock Screen steps widget",
    "Apple Watch steps widget",
  ],
  icons: {
    icon: "/assets/stepswidget-icon.png",
    apple: "/assets/stepswidget-icon.png",
  },
  openGraph: {
    title: "StepsWidget - Private Step Counter Widgets",
    description:
      "No pressure, just visible progress for iPhone, Lock Screen, and Apple Watch.",
    images: ["/assets/feature-every-screen.png"],
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
