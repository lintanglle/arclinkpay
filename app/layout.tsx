import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
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
  metadataBase: new URL("https://arclinkpay.vercel.app"),
  title: "ArcLinkPay - USDC Payment Links on Arc Testnet",
  description:
    "Create USDC payment requests, share payment links, and track receipts on Arc Testnet.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  openGraph: {
    title: "ArcLinkPay - USDC Payment Links on Arc Testnet",
    description:
      "Create USDC payment requests, share payment links, and track receipts on Arc Testnet.",
    url: "https://arclinkpay.vercel.app",
    siteName: "ArcLinkPay",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ArcLinkPay - USDC Payment Links on Arc Testnet",
    description:
      "Create USDC payment requests, share payment links, and track receipts on Arc Testnet.",
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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
