"use client"
import { Montserrat } from 'next/font/google'
import "./globals.css";
import Navbar from '../app/Components/Partials/Navbar/index';
import Footer from '../app/Components/Partials/Footer/page';
import { usePathname } from 'next/navigation';

const monserrat = Montserrat({
  weight: ['500'],
  preload: false,
  subsets : ['latin'],
  display : 'swap'
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
        <body className={monserrat.className}>
          {!isDashboardPage && <Navbar />}
          {children}
          {!isDashboardPage && <Footer />}
        </body>
    </html>
  );
}
