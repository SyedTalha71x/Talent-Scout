"use client"
import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";
import Navbar from '../app/Components/Partials/Navbar/index';
import Footer from '../app/Components/Partials/Footer/page';
import SessionProvider from "@/utils/SessionProvider";
import { usePathname } from 'next/navigation';

const monserrat = Montserrat({
  weight: ['100', '400', '900'],
})
 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isDashboardPage = pathname.startsWith('/Components/Partials/DashboardComponents');

  return (
    <html lang="en">
      <SessionProvider>
        <body className={monserrat.className}>
          {!isDashboardPage && <Navbar />}
          {children}
          {!isDashboardPage && <Footer />}
        </body>
      </SessionProvider>
    </html>
  );
}
