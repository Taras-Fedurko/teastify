import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Provider from "@/components/providers";
import ToastProvider from "@/components/ui/toaster";
import { ThemeSwitch } from "@/components/ThemeSwitch";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Content Stream",
  description: "Manage your content in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-[100vh]`}
      >
        <Provider>
          <div className="absolute top-[16px] right-[16px]">
            <ThemeSwitch />
          </div>
          {children}
          <ToastProvider />
        </Provider>
      </body>
    </html>
  );
}
