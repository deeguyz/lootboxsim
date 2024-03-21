import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { type ReactNode } from 'react';
import Navbar from '@/components/navbar/Navbar';
import Providers from '@/components/providers/Providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LootSim',
  description: 'A lootbox simulator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className} bg-gray-900`}>
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
