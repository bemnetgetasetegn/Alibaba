export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price: number | null;
  currency: string;
  description: string | null;
  min_order_quantity: number;
  min_order_unit: string;
  rating: number | null;
  review_count: number;
  seller_name: string | null;
  seller_location: string | null;
  seller_years: number | null;
  seller_logo_url: string | null;
  seller_response_time: string | null;
  seller_ontime_rate: string | null;
  seller_description: string | null;
  seller_images: string[] | null;
  shipping_info: string | null;
  availability: string;
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number;
  created_at: string;
}

export interface ProductOption {
  id: string;
  product_id: string;
  option_name: string;
  option_values: string[];
  sort_order: number;
  created_at: string;
}

export interface ProductSpecification {
  id: string;
  product_id: string;
  spec_group: string;
  spec_name: string;
  spec_value: string;
  sort_order: number;
  created_at: string;
}

export interface PriceTier {
  id: string;
  product_id: string;
  min_quantity: number;
  max_quantity: number | null;
  price: number;
  created_at: string;
}

export interface ProductWithDetails extends Product {
  product_images: ProductImage[];
  product_options: ProductOption[];
  product_specifications: ProductSpecification[];
  price_tiers: PriceTier[];
}

// Form data types for admin
export interface ProductFormData {
  name: string;
  slug: string;
  price: number;
  original_price: number | null;
  currency: string;
  description: string;
  min_order_quantity: number;
  min_order_unit: string;
  seller_name: string;
  seller_location: string;
  seller_years: number | null;
  seller_logo_url: string;
  seller_response_time: string;
  seller_ontime_rate: string;
  seller_description: string;
  seller_images: string[];
  shipping_info: string;
  availability: string;
}

export interface SpecificationInput {
  id?: string;
  spec_group: string;
  spec_name: string;
  spec_value: string;
  sort_order: number;
}

export interface OptionInput {
  id?: string;
  option_name: string;
  option_values: string[];
  sort_order: number;
}

export interface PriceTierInput {
  id?: string;
  min_quantity: number;
  max_quantity: number | null;
  price: number;
}
