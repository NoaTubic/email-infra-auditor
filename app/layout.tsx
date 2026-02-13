import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Email Infrastructure Auditor | SendScore",
  description:
    "Audit your cold email infrastructure in 2 minutes. Get a deliverability health score with actionable fixes based on 10,000+ campaign best practices.",
  openGraph: {
    title: "Email Infrastructure Auditor | SendScore",
    description: "Free deliverability audit for your cold email setup.",
    url: "https://sendscore.vercel.app",
    siteName: "SendScore",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
