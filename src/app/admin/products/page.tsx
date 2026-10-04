import { getProducts } from '@/lib/data/products'
import AdminProductsPage from './AdminProductsPage'

export default async function ProductsRoute() {
  const products = await getProducts(100, 0)
  return <AdminProductsPage products={products as any} />
}
