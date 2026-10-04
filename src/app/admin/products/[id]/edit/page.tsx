import { getProductById } from '@/lib/data/products'
import { ProductForm } from '@/components/admin/ProductForm'
import { notFound } from 'next/navigation'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#222]">Edit Product: {product.name}</h1>
      <ProductForm mode="edit" initialData={product as any} />
    </div>
  )
}
