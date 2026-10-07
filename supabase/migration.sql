-- ============================================
-- Alibaba Clone Database Migration
-- Run this in Supabase SQL Editor
-- ============================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  original_price NUMERIC(12,2),
  currency TEXT DEFAULT 'USD',
  description TEXT,
  min_order_quantity INTEGER DEFAULT 1,
  min_order_unit TEXT DEFAULT 'pieces',
  rating NUMERIC(2,1),
  review_count INTEGER DEFAULT 0,
  seller_name TEXT,
  seller_location TEXT,
  seller_years INTEGER,
  seller_logo_url TEXT,
  seller_response_time TEXT,
  seller_ontime_rate TEXT,
  seller_description TEXT,
  seller_images JSONB DEFAULT '[]'::jsonb,
  shipping_info TEXT,
  availability TEXT DEFAULT 'In Stock',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- In case table already exists:
ALTER TABLE products ADD COLUMN IF NOT EXISTS seller_description TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS seller_images JSONB DEFAULT '[]'::jsonb;

-- Product images table
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product options table (e.g., Color, Size)
CREATE TABLE IF NOT EXISTS product_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  option_name TEXT NOT NULL,
  option_values JSONB NOT NULL DEFAULT '[]',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product specifications table
CREATE TABLE IF NOT EXISTS product_specifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  spec_group TEXT NOT NULL DEFAULT 'Key attributes',
  spec_name TEXT NOT NULL,
  spec_value TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Price tiers table (volume pricing)
CREATE TABLE IF NOT EXISTS price_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  min_quantity INTEGER NOT NULL,
  max_quantity INTEGER,
  price NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_options_product_id ON product_options(product_id);
CREATE INDEX IF NOT EXISTS idx_product_specifications_product_id ON product_specifications(product_id);
CREATE INDEX IF NOT EXISTS idx_price_tiers_product_id ON price_tiers(product_id);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_products_updated_at ON products;
CREATE TRIGGER trigger_update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Row Level Security
-- ============================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_tiers ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public can read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Public can read product_images" ON product_images
  FOR SELECT USING (true);

CREATE POLICY "Public can read product_options" ON product_options
  FOR SELECT USING (true);

CREATE POLICY "Public can read product_specifications" ON product_specifications
  FOR SELECT USING (true);

CREATE POLICY "Public can read price_tiers" ON price_tiers
  FOR SELECT USING (true);

-- Authenticated users can manage all data
CREATE POLICY "Authenticated users can insert products" ON products
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update products" ON products
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products" ON products
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert product_images" ON product_images
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update product_images" ON product_images
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete product_images" ON product_images
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert product_options" ON product_options
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update product_options" ON product_options
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete product_options" ON product_options
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert product_specifications" ON product_specifications
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update product_specifications" ON product_specifications
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete product_specifications" ON product_specifications
  FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert price_tiers" ON price_tiers
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update price_tiers" ON price_tiers
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete price_tiers" ON price_tiers
  FOR DELETE TO authenticated USING (true);

-- ============================================
-- Storage bucket for product images
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public can read product images" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can update product images" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can delete product images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'product-images');

-- ============================================
-- Orders Table
-- ============================================

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name TEXT NOT NULL,
  product_slug TEXT,
  quantity NUMERIC(12,2) NOT NULL DEFAULT 1,
  unit TEXT NOT NULL DEFAULT 'pieces',
  unit_price NUMERIC(12,2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_telegram TEXT,
  delivery_address TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public can submit orders
CREATE POLICY "Public can submit orders" ON orders
  FOR INSERT WITH CHECK (true);

-- Authenticated users can view and manage orders
CREATE POLICY "Authenticated users can view orders" ON orders
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can update orders" ON orders
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated users can delete orders" ON orders
  FOR DELETE TO authenticated USING (true);

