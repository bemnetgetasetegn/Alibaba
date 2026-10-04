# Alibaba

A production-ready full-stack web application built with **Next.js 14 (App Router), TypeScript, Tailwind CSS, and Supabase**, faithfully recreating the visual structure, layout, proportions, and interactions of the reference Alibaba product-detail page.

---

## 🛠️ Technology Stack

* **Next.js 14** (App Router, Server Components by default, Client Components for interactivity)
* **TypeScript** (Strict mode, fully typed database and component models)
* **Tailwind CSS** (Custom palette reproducing Alibaba design tokens: `#D64000` brand orange, `#222` typography, `#f8f8f8` surface cards, `#ddd` borders)
* **Supabase PostgreSQL** (Relational schema: products, images, price tiers, specifications, options)
* **Supabase Storage** (`product-images` bucket for media uploads, reordering, and cleanup)
* **Supabase Authentication** (Secure admin dashboard session management via cookies)

---

## 🚀 Getting Started

### 1. Configure Supabase Environment Variables
Copy `.env.local.example` to `.env.local` and add your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Inside `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 2. Run Database Migration & Seed
1. Open your Supabase Project dashboard.
2. Go to the **SQL Editor**.
3. Copy and run the contents of [`supabase/migration.sql`](./supabase/migration.sql):
   - Creates `products`, `product_images`, `product_options`, `product_specifications`, and `price_tiers` tables.
   - Configures Row Level Security (RLS) policies allowing public read and authenticated management.
   - Configures the `product-images` Storage bucket and permissions.
4. Copy and run the contents of [`supabase/seed.sql`](./supabase/seed.sql):
   - Seeds the exact referenced product: *"High Tensile Steel Strand Wire 9.53mm 12.7mm 15.2mm PC Strand ASTM BS5896 for Concrete Building Materials"*, complete with tiered USD pricing, 20 specifications, and multi-value options.

### 3. Create Administrator Account
In Supabase Dashboard under **Authentication > Users**, invite or add an admin user (e.g. `admin@tradehub.com` with a secure password).

### 4. Start Development Server
```bash
npm run dev
```

Visit:
- **Public Product Page**: `http://localhost:3000/product/high-tensile-steel-strand-wire`
- **Homepage Storefront**: `http://localhost:3000`
- **Admin Dashboard**: `http://localhost:3000/admin`
- **Admin Login**: `http://localhost:3000/admin/login`

---

## 📋 Features Overview

### 🛍️ Public Product Detail Experience (Alibaba Fidelity)
* **Three-Column Desktop Layout**:
  - **Left (flex: 600)**: Vertical thumbnail strip (70px wide, hover triggers swap), main square image showcase with 2.5x interactive magnifier zoom panel, overlay prev/next buttons, full lightbox modal, and Photos/Video indicator pill. Below the gallery sits the verified Supplier mini card.
  - **Middle (flex: 650)**: Product title (18px semibold), rating/reviews indicator, tiered USD volume pricing matrix (`$650` for 3-24 tons, `$630` for ≥25 tons), circular quantity stepper, dynamic option selectors, and 3-column compact key attributes preview.
  - **Right (flex: 400)**: Sticky purchase action card with shipping breakdown, item and shipping subtotals, full-width pill CTAs (*Send inquiry* in brand orange and *Chat now* in dark outline with interactive dialogs), and buyer payment/financing highlights.
* **Below the Fold**: Full 2-column zebra-striped specifications table, lead time matrix, customization options, and supplier descriptions.
* **Fully Responsive**: Adapts seamlessly to 320px, 768px, 1024px, 1440px, and 1920px viewports with touch-friendly carousels and collapsible modules.

### ⚙️ Admin Dashboard & CRUD
* **Authentication Protection**: Middleware guards all `/admin/*` routes; unauthenticated requests redirect to `/admin/login`.
* **Full CRUD Operations**:
  - Create new products with automatic or custom slug generation.
  - Edit basic info, descriptions, MOQ, unit types, and supplier operational details.
  - Configure dynamic key-value specifications and multi-attribute options.
  - Configure volume-based tiered pricing in USD.
  - Upload multiple product images directly to Supabase Storage with instant sort reordering and deletion.
  - Safe product deletion modal with automatic database cascade and storage file removal.
