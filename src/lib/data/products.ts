import { createClient } from '@/lib/supabase/server';
import type { Product, ProductWithDetails } from '@/types/database';

export const REFERENCE_PRODUCT: ProductWithDetails = {
  id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  name: 'High Tensile Steel Strand Wire 9.53mm 12.7mm 15.2mm PC Strand ASTM BS5896 for Concrete Building Materials',
  slug: 'high-tensile-steel-strand-wire',
  price: 650.00,
  original_price: 720.00,
  currency: 'USD',
  description: `High Tensile Steel Strand Wire for Concrete Building Materials

Our prestressed concrete steel strand is manufactured using high-quality raw materials and advanced production technology. The product meets international standards including ASTM A416, BS 5896, and GB/T 5224.

Features:
• High tensile strength: 1860MPa
• Low relaxation: ≤2.5%
• Excellent bonding with concrete
• Superior fatigue resistance
• Consistent quality and performance

Applications:
• Pre-tensioned and post-tensioned concrete structures
• Bridge construction and railway sleepers
• Nuclear power plant containment structures
• Rock and soil anchoring systems
• Building foundation piles

Available in various diameters: 9.53mm, 12.7mm, 15.2mm, and custom sizes upon request.

All products come with mill test certificates and quality inspection reports. We support OEM and custom packaging services.`,
  min_order_quantity: 3,
  min_order_unit: 'tons',
  rating: 5.0,
  review_count: 24,
  seller_name: 'Hebei Victory Metal Product Co., Ltd.',
  seller_location: 'Hebei, China',
  seller_years: 18,
  seller_logo_url: null,
  seller_response_time: '≤1h',
  seller_ontime_rate: '≥100%',
  seller_description: `Hebei Victory Metal Product Co.,Ltd. is the one of the largest enterprises of China who professionally produce PC Strand, PC wire and PC bar. The company was founded in 1996, covers an area of 150,000 square meters, registered capital 10.1499 million.

Hebei Victory located in the historical ancient Baoding city which is near to Tianjin and Beijing. Main production 'Sideli' brand low relaxation prestressed steel strand, low relaxation smooth prestressed steel wire, spiral ribs prestressed steel wire, indented PC wire, prestressed steel bar etc all series products. Products are widely applied in railway bridge, railway with concrete sleeper, rail board, road Bridges, water conservancy large diameter water pipe, power transmission pole, high-rise building pipes and hollow floor. We usually export them to Southeast Asia, the middle east and Americas and so on.

The company sets up a strict quality guarantee system, the company in September 2000 passed ISO 9001-2000 quality management system certification, 2008 changed plate made quality management system and the UKAS international quality system authentication double. 'Sideli' brand products for years with high quality and satisfactory service has won the domestic and foreign customer high praise.`,
  seller_images: [
    'https://s.alicdn.com/@sc04/kf/H7fe3ae65a3f443c49a4b07fa2c3c0807Y.jpg_960x960q80.jpg',
    'https://s.alicdn.com/@sc04/kf/Hd0d0a4d54f9c41b89379e3eb16c934e5c.jpg_960x960q80.jpg',
    'https://s.alicdn.com/@sc04/kf/He479d8ede5f94305a02aaa262a24ff5dV.jpg_960x960q80.jpg',
    'https://s.alicdn.com/@sc04/kf/Hc2815aad98ee48c1b28d03a2f7cfb162r.png_960x960q80.jpg',
  ],
  shipping_info: 'FOB, CIF, CFR available. Major ports: Tianjin, Shanghai, Qingdao.',
  availability: 'In Stock',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  product_images: [
    {
      id: 'img-1',
      product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      image_url: 'https://s.alicdn.com/@sc04/kf/H1c6677f5d4724be2a6828f5d18056469u.jpg_960x960q80.jpg',
      alt_text: 'High Tensile Steel Strand Wire - Main Coil View',
      sort_order: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 'img-2',
      product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      image_url: 'https://s.alicdn.com/@sc04/kf/H7fe3ae65a3f443c49a4b07fa2c3c0807Y.jpg_960x960q80.jpg',
      alt_text: 'Prestressed Concrete Steel Strand Manufacturing Process',
      sort_order: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: 'img-3',
      product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      image_url: 'https://s.alicdn.com/@sc04/kf/Hd0d0a4d54f9c41b89379e3eb16c934e5c.jpg_960x960q80.jpg',
      alt_text: 'Steel Strand Cross-section & Structural Detail',
      sort_order: 3,
      created_at: new Date().toISOString(),
    },
    {
      id: 'img-4',
      product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      image_url: 'https://s.alicdn.com/@sc04/kf/He479d8ede5f94305a02aaa262a24ff5dV.jpg_960x960q80.jpg',
      alt_text: 'Concrete Building Material Packaging & Pallet',
      sort_order: 4,
      created_at: new Date().toISOString(),
    },
    {
      id: 'img-5',
      product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      image_url: 'https://s.alicdn.com/@sc04/kf/Hc2815aad98ee48c1b28d03a2f7cfb162r.png_960x960q80.jpg',
      alt_text: 'Factory Quality Inspection & Tensile Testing',
      sort_order: 5,
      created_at: new Date().toISOString(),
    },
    {
      id: 'img-6',
      product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      image_url: 'https://s.alicdn.com/@sc04/kf/H4d4fa6e54076472bbcff6dc40a8784c5D.jpg_960x960q80.jpg',
      alt_text: 'Warehouse Storage & Export Shipping Container',
      sort_order: 6,
      created_at: new Date().toISOString(),
    },
  ],
  product_options: [
    {
      id: 'opt-1',
      product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      option_name: 'Diameter',
      option_values: ['9.53mm', '12.7mm', '15.2mm', '15.7mm'],
      sort_order: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 'opt-2',
      product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      option_name: 'Strand Type',
      option_values: ['1x3', '1x7', '1x19'],
      sort_order: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: 'opt-3',
      product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      option_name: 'Surface',
      option_values: ['Plain/Smooth', 'Indented', 'Galvanized', 'Epoxy Coated'],
      sort_order: 3,
      created_at: new Date().toISOString(),
    },
  ],
  product_specifications: [
    { id: 'sp-1', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Application', spec_value: 'Bridge Building', sort_order: 1, created_at: new Date().toISOString() },
    { id: 'sp-2', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Design Style', spec_value: 'Industrial', sort_order: 2, created_at: new Date().toISOString() },
    { id: 'sp-3', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Alloy Or Not', spec_value: 'Non-Alloy', sort_order: 3, created_at: new Date().toISOString() },
    { id: 'sp-4', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Secondary Or Not', spec_value: 'Non-Secondary', sort_order: 4, created_at: new Date().toISOString() },
    { id: 'sp-5', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Project Solution Capability', spec_value: 'Total solution for projects, Others', sort_order: 5, created_at: new Date().toISOString() },
    { id: 'sp-6', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'After-sale Service', spec_value: 'Online Technical Support, Onsite Installation, Onsite Training, Onsite Inspection, Other', sort_order: 6, created_at: new Date().toISOString() },
    { id: 'sp-7', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Warranty', spec_value: '1 Year', sort_order: 7, created_at: new Date().toISOString() },
    { id: 'sp-8', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Place of Origin', spec_value: 'Hebei, China', sort_order: 8, created_at: new Date().toISOString() },
    { id: 'sp-9', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Chemical Composition', spec_value: 'Swrh77B; Swrh82B', sort_order: 9, created_at: new Date().toISOString() },
    { id: 'sp-10', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Brand Name', spec_value: 'Sideli', sort_order: 10, created_at: new Date().toISOString() },
    { id: 'sp-11', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Model Number', spec_value: '1*3; 1*7', sort_order: 11, created_at: new Date().toISOString() },
    { id: 'sp-12', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Color', spec_value: 'Black', sort_order: 12, created_at: new Date().toISOString() },
    { id: 'sp-13', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Certificate', spec_value: 'DCL; CE', sort_order: 13, created_at: new Date().toISOString() },
    { id: 'sp-14', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Keyword', spec_value: 'Precast Concrete Steel Strand', sort_order: 14, created_at: new Date().toISOString() },
    { id: 'sp-15', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'MOQ', spec_value: '25 tons', sort_order: 15, created_at: new Date().toISOString() },
    { id: 'sp-16', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Diameter', spec_value: '9.53mm; 12.3mm; 15.7mm', sort_order: 16, created_at: new Date().toISOString() },
    { id: 'sp-17', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Key attributes', spec_name: 'Payment terms', spec_value: 'T/T 30% Deposit', sort_order: 17, created_at: new Date().toISOString() },
    { id: 'sp-18', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Packaging and delivery', spec_name: 'Selling Units', spec_value: 'Single item', sort_order: 18, created_at: new Date().toISOString() },
    { id: 'sp-19', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Packaging and delivery', spec_name: 'Single package size', spec_value: '140X75X80 cm', sort_order: 19, created_at: new Date().toISOString() },
    { id: 'sp-20', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', spec_group: 'Packaging and delivery', spec_name: 'Single gross weight', spec_value: '3.0 kg', sort_order: 20, created_at: new Date().toISOString() },
  ],
  price_tiers: [
    { id: 'pt-1', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', min_quantity: 3, max_quantity: 24, price: 650.00, created_at: new Date().toISOString() },
    { id: 'pt-2', product_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', min_quantity: 25, max_quantity: null, price: 630.00, created_at: new Date().toISOString() },
  ]
};

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes('your-project') && url.startsWith('http'));
}

export async function getProducts(limit?: number, offset?: number): Promise<ProductWithDetails[]> {
  if (!isSupabaseConfigured()) {
    return [REFERENCE_PRODUCT];
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from('products')
      .select(`
        *,
        product_images (
          id, product_id, image_url, alt_text, sort_order, created_at
        ),
        product_options (
          id, product_id, option_name, option_values, sort_order, created_at
        ),
        product_specifications (
          id, product_id, spec_group, spec_name, spec_value, sort_order, created_at
        ),
        price_tiers (
          id, product_id, min_quantity, max_quantity, price, created_at
        )
      `)
      .order('created_at', { ascending: false });

    if (typeof limit === 'number') {
      const from = offset || 0;
      const to = from + limit - 1;
      query = query.range(from, to);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      return [REFERENCE_PRODUCT];
    }
    
    data.forEach((prod: any) => {
      prod.product_images?.sort((a: any, b: any) => a.sort_order - b.sort_order);
      prod.product_options?.sort((a: any, b: any) => a.sort_order - b.sort_order);
      prod.product_specifications?.sort((a: any, b: any) => a.sort_order - b.sort_order);
      prod.price_tiers?.sort((a: any, b: any) => a.min_quantity - b.min_quantity);
    });

    return data as ProductWithDetails[];
  } catch (err) {
    console.warn('Falling back to reference product data:', err);
    return [REFERENCE_PRODUCT];
  }
}

export async function getProductBySlug(slug: string): Promise<ProductWithDetails | null> {
  if (!isSupabaseConfigured()) {
    if (slug === REFERENCE_PRODUCT.slug || slug === 'sample' || slug === 'default') {
      return REFERENCE_PRODUCT;
    }
    return REFERENCE_PRODUCT;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images (
          id, product_id, image_url, alt_text, sort_order, created_at
        ),
        product_options (
          id, product_id, option_name, option_values, sort_order, created_at
        ),
        product_specifications (
          id, product_id, spec_group, spec_name, spec_value, sort_order, created_at
        ),
        price_tiers (
          id, product_id, min_quantity, max_quantity, price, created_at
        )
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        if (slug === REFERENCE_PRODUCT.slug) return REFERENCE_PRODUCT;
        return null;
      }
      return REFERENCE_PRODUCT;
    }

    if (data) {
      data.product_images?.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);
      data.product_options?.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);
      data.product_specifications?.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);
      data.price_tiers?.sort((a: { min_quantity: number }, b: { min_quantity: number }) => a.min_quantity - b.min_quantity);
    }

    return data as ProductWithDetails;
  } catch (err) {
    console.warn('Falling back to reference product data for slug:', slug);
    return REFERENCE_PRODUCT;
  }
}

export async function getProductById(id: string): Promise<ProductWithDetails | null> {
  if (!isSupabaseConfigured()) {
    return REFERENCE_PRODUCT;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_images (
          id, product_id, image_url, alt_text, sort_order, created_at
        ),
        product_options (
          id, product_id, option_name, option_values, sort_order, created_at
        ),
        product_specifications (
          id, product_id, spec_group, spec_name, spec_value, sort_order, created_at
        ),
        price_tiers (
          id, product_id, min_quantity, max_quantity, price, created_at
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      return REFERENCE_PRODUCT;
    }

    if (data) {
      data.product_images?.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);
      data.product_options?.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);
      data.product_specifications?.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);
      data.price_tiers?.sort((a: { min_quantity: number }, b: { min_quantity: number }) => a.min_quantity - b.min_quantity);
    }

    return data as ProductWithDetails;
  } catch (err) {
    return REFERENCE_PRODUCT;
  }
}

export async function getProductCount(): Promise<number> {
  if (!isSupabaseConfigured()) {
    return 1;
  }

  try {
    const supabase = await createClient();
    const { count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (error) return 1;
    return count || 0;
  } catch {
    return 1;
  }
}

export async function getAllProductSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return [REFERENCE_PRODUCT.slug];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('slug');

    if (error) return [REFERENCE_PRODUCT.slug];
    return (data || []).map((p: { slug: string }) => p.slug);
  } catch {
    return [REFERENCE_PRODUCT.slug];
  }
}
