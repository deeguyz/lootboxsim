import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${inter.className} dark:bg-gray-900`}>{children}</body>
      </Providers>
    </html>
  );
}
