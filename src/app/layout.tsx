import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '2Emarket - Global B2B Marketplace & Direct Factory Sourcing',
  description: 'Find quality products, steel, hardware, and verified manufacturers on 2Emarket.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-[#222] bg-white">{children}</body>
    </html>
  );
}
