// src/app/layout.tsx
"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '../app/Components/Partials/Navbar/index';
import Footer from '../app/Components/Partials/Footer/page';
import SessionProvider from "@/utils/SessionProvider";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Determine if Navbar and Footer should be displayed
  const isDashboardPage = pathname.startsWith('/Components/Partials/DashboardComponents');

  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>
          {!isDashboardPage && <Navbar />}
          {children}
          {!isDashboardPage && <Footer />}
        </body>
      </SessionProvider>
    </html>
  );
}
