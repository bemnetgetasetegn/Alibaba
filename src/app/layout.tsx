import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Alibaba.com - Leading B2B e-Commerce Marketplace',
  description: 'Find quality products, manufacturers, and verified suppliers on Alibaba.com.',
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
