import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { getProducts } from '@/lib/data/products';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

export const revalidate = 60; // ISR every 60 seconds

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
      
      <main className="flex-1 max-w-[1580px] w-full mx-auto px-4 md:px-10 py-8">
        <h1 className="text-2xl font-bold text-alibaba-dark mb-6">Featured Products</h1>
        
        {(!products || products.length === 0) ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-alibaba-dark mb-4">No products found</h2>
            <p className="text-alibaba-secondary mb-6">Get started by creating your first product.</p>
            <Link 
              href="/admin/products/new" 
              className="inline-block bg-brand-orange text-white font-bold py-3 px-6 rounded-full hover:bg-brand-orange-hover transition-colors"
            >
              Add Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product) => {
              const mainImage = product.product_images?.[0]?.image_url 
                || 'https://placehold.co/400x400/f8f8f8/cccccc?text=No+Image';

              return (
                <Link 
                  key={product.id} 
                  href={`/product/${product.slug}`}
                  className="bg-white rounded-lg overflow-hidden border border-transparent hover:border-brand-orange hover:shadow-lg transition-all group"
                >
                  <div className="relative aspect-square bg-[#f8f8f8]">
                    <Image 
                      src={mainImage} 
                      alt={product.name} 
                      fill 
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="text-[14px] text-alibaba-dark line-clamp-2 leading-tight group-hover:text-brand-orange transition-colors mb-2">
                      {product.name}
                    </h3>
                    <div className="font-bold text-[16px] text-alibaba-dark mb-1">
                      {formatPrice(product.price, product.currency)}
                    </div>
                    <div className="text-[12px] text-alibaba-secondary mb-2">
                      {product.min_order_quantity} {product.min_order_unit} (MOQ)
                    </div>
                    
                    {/* Mini seller info */}
                    <div className="pt-2 border-t border-[#f5f5f5] flex items-center gap-1.5 text-[12px] text-alibaba-secondary">
                      <span className="font-semibold text-alibaba-dark truncate">{product.seller_name || 'Global Supplier'}</span>
                      {product.seller_years && (
                        <span className="text-[10px] bg-[#ffe4d6] text-brand-orange px-1 rounded-sm flex-shrink-0">
                          {product.seller_years} YR
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
