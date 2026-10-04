-- ============================================
-- Seed Data: Example Product
-- Run this after migration.sql
-- ============================================

-- Insert example product
INSERT INTO products (
  id, name, slug, price, original_price, currency, description,
  min_order_quantity, min_order_unit, rating, review_count,
  seller_name, seller_location, seller_years, seller_response_time,
  seller_ontime_rate, shipping_info, availability
) VALUES (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'High Tensile Steel Strand Wire 9.53mm 12.7mm 15.2mm PC Strand ASTM BS5896 for Concrete Building Materials',
  'high-tensile-steel-strand-wire',
  650.00,
  720.00,
  'USD',
  'High Tensile Steel Strand Wire for Concrete Building Materials

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

All products come with mill test certificates and quality inspection reports. We support OEM and custom packaging services.',
  3,
  'tons',
  NULL,
  0,
  'Hebei Victory Metal Product Co., Ltd.',
  'Hebei, China',
  18,
  '≤1h',
  '≥100%',
  'FOB, CIF, CFR available. Major ports: Tianjin, Shanghai, Qingdao.',
  'In Stock'
);

-- Insert product images (authentic images from reference)
INSERT INTO product_images (product_id, image_url, alt_text, sort_order) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'https://s.alicdn.com/@sc04/kf/H1c6677f5d4724be2a6828f5d18056469u.jpg_960x960q80.jpg', 'High Tensile Steel Strand Wire - Main Coil View', 1),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'https://s.alicdn.com/@sc04/kf/H7fe3ae65a3f443c49a4b07fa2c3c0807Y.jpg_960x960q80.jpg', 'Prestressed Concrete Steel Strand Manufacturing Process', 2),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'https://s.alicdn.com/@sc04/kf/Hd0d0a4d54f9c41b89379e3eb16c934e5c.jpg_960x960q80.jpg', 'Steel Strand Cross-section & Structural Detail', 3),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'https://s.alicdn.com/@sc04/kf/He479d8ede5f94305a02aaa262a24ff5dV.jpg_960x960q80.jpg', 'Concrete Building Material Packaging & Pallet', 4),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'https://s.alicdn.com/@sc04/kf/Hc2815aad98ee48c1b28d03a2f7cfb162r.png_960x960q80.jpg', 'Factory Quality Inspection & Tensile Testing', 5),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'https://s.alicdn.com/@sc04/kf/H4d4fa6e54076472bbcff6dc40a8784c5D.jpg_960x960q80.jpg', 'Warehouse Storage & Export Shipping Container', 6);

-- Insert price tiers
INSERT INTO price_tiers (product_id, min_quantity, max_quantity, price) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 3, 24, 650.00),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 25, NULL, 630.00);

-- Insert specifications - Key attributes
INSERT INTO product_specifications (product_id, spec_group, spec_name, spec_value, sort_order) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Application', 'Bridge Building', 1),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Design Style', 'Industrial', 2),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Alloy Or Not', 'Non-Alloy', 3),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Secondary Or Not', 'Non-Secondary', 4),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Project Solution Capability', 'Total solution for projects, Others', 5),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'After-sale Service', 'Online Technical Support, Onsite Installation, Onsite Training, Onsite Inspection, Other', 6),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Warranty', '1 Year', 7),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Place of Origin', 'Hebei, China', 8),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Chemical Composition', 'Swrh77B; Swrh82B', 9),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Brand Name', 'Sideli', 10),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Model Number', '1*3; 1*7', 11),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Color', 'Black', 12),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Certificate', 'DCL; CE', 13),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Keyword', 'Precast Concrete Steel Strand', 14),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'MOQ', '25 tons', 15),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Diameter', '9.53mm; 12.3mm; 15.7mm', 16),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Key attributes', 'Payment terms', 'T/T 30% Deposit', 17);

-- Insert specifications - Packaging and delivery
INSERT INTO product_specifications (product_id, spec_group, spec_name, spec_value, sort_order) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Packaging and delivery', 'Selling Units', 'Single item', 18),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Packaging and delivery', 'Single package size', '140X75X80 cm', 19),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Packaging and delivery', 'Single gross weight', '3.0 kg', 20);

-- Insert product options
INSERT INTO product_options (product_id, option_name, option_values, sort_order) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Diameter', '["9.53mm", "12.7mm", "15.2mm", "15.7mm"]', 1),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Strand Type', '["1x3", "1x7", "1x19"]', 2),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Surface', '["Plain/Smooth", "Indented", "Galvanized", "Epoxy Coated"]', 3);
