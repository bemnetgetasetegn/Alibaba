import { getProductBySlug, getProducts } from '@/lib/data/products';
import { notFound } from 'next/navigation';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { Breadcrumb } from '@/components/public/Breadcrumb';
import { ProductGallery } from '@/components/public/ProductGallery';
import { ProductPrice } from '@/components/public/ProductPrice';
import { QuantityPicker } from '@/components/public/QuantityPicker';
import { ProductOptions } from '@/components/public/ProductOptions';
import { KeyAttributes } from '@/components/public/KeyAttributes';
import { SupplierCard } from '@/components/public/SupplierCard';
import { RightPanel } from '@/components/public/RightPanel';
import { ProductDetails } from '@/components/public/ProductDetails';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const mainImage = product.product_images?.[0]?.image_url;

  return {
    title: `${product.name} - WeixinSteel`,
    description: product.description?.substring(0, 160) || `Buy ${product.name} on WeixinSteel`,
    openGraph: {
      title: `${product.name} - WeixinSteel`,
      description: product.description?.substring(0, 160) || `Buy ${product.name} on WeixinSteel`,
      images: mainImage ? [mainImage] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
  ]);

  if (!product) {
    notFound();
  }

  // Filter out current product for Similar Items
  const similarProducts = allProducts.filter((p) => p.slug !== slug);

  const breadcrumbItems = [
    { label: 'All Categories', href: '/' },
    { label: product.name.length > 40 ? product.name.substring(0, 40) + '...' : product.name, href: '#' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-[1580px] mx-auto px-4 md:px-10 pt-2">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Above Fold: Three-Column Layout */}
        <div className="max-w-[1580px] mx-auto px-4 md:px-10 pt-4 pb-8">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Left Column: Gallery + Supplier Card */}
            <div className="w-full lg:flex-[600] lg:min-w-0">
              <ProductGallery images={product.product_images || []} />
              <div className="mt-4 hidden lg:block">
                <SupplierCard product={product} />
              </div>
            </div>

            {/* Middle Column: Product Info */}
            <div className="w-full lg:flex-[650] lg:min-w-0">
              <div className="lg:shadow-[0_0_8px_0_rgba(0,0,0,0.06)] lg:rounded-lg lg:p-4 lg:pb-5">
                {/* Title */}
                <h1 className="text-[18px] font-semibold text-[#222] leading-[22px] mb-1.5 line-clamp-3">
                  {product.name}
                </h1>

                {/* Reviews */}
                <div className="text-sm space-y-[6px] mt-2 pb-4 border-b border-[#ddd] mb-4">
                  <div className="flex items-center">
                    <span className="text-[#666]">
                      {product.review_count > 0
                        ? `★★★★★ ${product.rating} (${product.review_count} reviews)`
                        : 'No reviews yet'}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <ProductPrice
                    price={product.price}
                    originalPrice={product.original_price}
                    priceTiers={product.price_tiers || []}
                    currency={product.currency}
                    unit={product.min_order_unit}
                  />
                </div>

                {/* Quantity */}
                <div className="border-t border-[#ddd] pt-4">
                  <h3 className="mb-0 text-base font-semibold leading-[24px] text-[#222]">Quantity</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <QuantityPicker min={0} max={99999} />
                    <span className="text-sm text-[#666]">
                      {product.min_order_unit} (Min. order: {product.min_order_quantity})
                    </span>
                  </div>
                </div>

                {/* Customization Options */}
                {product.product_options && product.product_options.length > 0 && (
                  <div className="pb-4 border-b border-[#ddd] mb-4 mt-4">
                    <div className="text-[16px] font-semibold mb-3">Customization options</div>
                    <ProductOptions options={product.product_options} />
                  </div>
                )}

                {/* Key Attributes (Compact) */}
                <div className="mt-4">
                  <h3 className="text-base font-bold leading-[22px] text-[#222]">Key attributes</h3>
                  <div className="mt-3">
                    <KeyAttributes specs={product.product_specifications || []} variant="compact" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Action Panel */}
            <div className="w-full lg:flex-[400] lg:min-w-0">
              <div className="lg:sticky lg:top-[20px]">
                <RightPanel product={product} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Supplier Card */}
        <div className="lg:hidden px-4 pb-8">
          <SupplierCard product={product} />
        </div>

        {/* Below Fold: Full Details */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-10 pb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-[1020] min-w-0">
              {/* Full Key Attributes Table */}
              <div className="mt-8 border-t border-[#ddd] pt-8">
                <h2 className="text-xl font-bold text-[#222] mb-4">Key attributes</h2>
                <KeyAttributes specs={product.product_specifications || []} variant="full" />
              </div>

              {/* Product Description */}
              <ProductDetails product={product} />
            </div>
          </div>
        </div>

        {/* ── SIMILAR ITEMS ── */}
        {similarProducts.length > 0 && (
          <div className="bg-[#f5f5f5] border-t border-[#ddd] py-8">
            <div className="max-w-[1580px] mx-auto px-4 md:px-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-[#222]">You May Also Like</h2>
                <Link
                  href="/"
                  className="text-sm text-brand-orange hover:underline font-medium"
                >
                  View all →
                </Link>
              </div>

              {/* Horizontal scroll on mobile, grid on desktop */}
              <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:overflow-visible md:pb-0 scrollbar-thin">
                {similarProducts.map((p) => {
                  const img =
                    p.product_images?.[0]?.image_url ||
                    'https://placehold.co/400x400/f8f8f8/cccccc?text=No+Image';
                  return (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      className="flex-shrink-0 w-[160px] md:w-auto bg-white rounded-lg overflow-hidden border border-transparent hover:border-brand-orange hover:shadow-md transition-all group"
                    >
                      <div className="relative aspect-square bg-[#f8f8f8]">
                        <Image
                          src={img}
                          alt={p.name}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 160px, 25vw"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-[13px] text-alibaba-dark line-clamp-2 leading-tight group-hover:text-brand-orange transition-colors mb-1.5">
                          {p.name}
                        </h3>
                        <div className="font-bold text-[15px] text-alibaba-dark mb-1">
                          {formatPrice(p.price, p.currency)}
                        </div>
                        <div className="text-[11px] text-alibaba-secondary">
                          {p.min_order_quantity} {p.min_order_unit} (MOQ)
                        </div>
                        {p.seller_name && (
                          <div className="pt-2 mt-1 border-t border-[#f5f5f5] flex items-center gap-1 text-[11px] text-alibaba-secondary">
                            <span className="truncate font-medium text-alibaba-dark">{p.seller_name}</span>
                            {p.seller_years && (
                              <span className="flex-shrink-0 text-[10px] bg-[#ffe4d6] text-brand-orange px-1 rounded-sm">
                                {p.seller_years} YR
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

