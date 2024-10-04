"use client";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import { AuthProvider } from "@/context/auth";
import Navbar from "@/components/ui/header/Navbar";
import Foot from "@/components/footer/Foot";
import { CartProvider } from "@/context/cart";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <AuthProvider>
            <Navbar />
            <Toaster />

            {children}
            <Foot />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
