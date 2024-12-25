import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientProvider from '@/Providers/ClientProvider';
import { CommonStoreProvider } from '@/Providers/commonStoreProvider';
import Header from '@/components/Header';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Front Row Labs LLC',
  description: 'Front Row Labs LLC',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-dvh`}>
        <Header />
        <div className="p-4 flex-1">
          <CommonStoreProvider>
            <ClientProvider>{children}</ClientProvider>
          </CommonStoreProvider>
        </div>
      </body>
    </html>
  );
}
