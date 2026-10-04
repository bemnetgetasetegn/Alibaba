import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WeixinSteel - Leading Steel & Industrial Metal Products',
  description: 'Find quality steel strands, PC wire, and industrial metal products from WeixinSteel.',
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
