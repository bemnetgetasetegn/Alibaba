'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductWithDetails } from '@/types/database';
import { formatPrice } from '@/lib/utils';
import { deleteProductAction } from '@/app/actions/products';
import { DeleteProductModal } from '@/components/admin/DeleteProductModal';

export default function AdminProductsPage({
  products
}: {
  products: ProductWithDetails[];
}) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductWithDetails | null>(null);

  const openDeleteModal = (product: ProductWithDetails) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#222]">Products</h1>
        <Link 
          href="/admin/products/new" 
          className="bg-[#D64000] hover:bg-[#C03800] text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center"
        >
          <span className="mr-2">+</span> Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#ddd] overflow-hidden">
        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-[#ddd]">
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Name & Slug</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ddd]">
                {products.map(product => {
                  const firstImage = product.product_images?.[0]?.image_url;
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-12 w-12 rounded border border-[#ddd] overflow-hidden bg-gray-50 relative flex items-center justify-center">
                          {firstImage ? (
                            <Image src={firstImage} alt={product.name} fill className="object-cover" unoptimized />
                          ) : (
                            <span className="text-gray-400 text-xs">No img</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-[#222] truncate max-w-xs">{product.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{product.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-[#222] font-semibold">{formatPrice(product.price, product.currency)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(product.created_at || '').toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                        <Link href={`/product/${product.slug}`} target="_blank" className="text-gray-500 hover:text-gray-900" title="View Store">
                          👁️
                        </Link>
                        <Link href={`/admin/products/${product.id}/edit`} className="text-blue-600 hover:text-blue-900">
                          Edit
                        </Link>
                        <button 
                          onClick={() => openDeleteModal(product)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-[#222] mb-2">No products yet</h3>
            <p className="text-gray-500 mb-6">Create your first product to get started.</p>
            <Link 
              href="/admin/products/new" 
              className="bg-[#D64000] hover:bg-[#C03800] text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Add Product
            </Link>
          </div>
        )}
      </div>

      <DeleteProductModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        product={productToDelete}
        onDelete={async (id: string) => {
          await deleteProductAction(id);
        }}
      />
    </div>
  );
}
