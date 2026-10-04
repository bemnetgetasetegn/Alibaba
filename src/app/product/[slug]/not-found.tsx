import Link from 'next/link';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-12 text-center shadow-sm max-w-lg w-full">
          <h1 className="text-4xl font-bold text-brand-orange mb-4">404</h1>
          <h2 className="text-xl font-semibold text-alibaba-dark mb-4">Product not found</h2>
          <p className="text-alibaba-secondary mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-brand-orange text-white font-bold py-3 px-8 rounded-full hover:bg-[#b53600] transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
