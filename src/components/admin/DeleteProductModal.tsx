'use client'

import { useState } from 'react'
import { Product } from '@/types/database'

interface DeleteProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onDelete: (id: string) => Promise<void>
}

export function DeleteProductModal({ product, isOpen, onClose, onDelete }: DeleteProductModalProps) {
  const [loading, setLoading] = useState(false)

  if (!isOpen || !product) return null

  const handleDelete = async () => {
    setLoading(true)
    try {
      await onDelete(product.id)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={!loading ? onClose : undefined} />
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full relative z-10 p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-center text-[#222] mb-2">Delete Product</h3>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete <span className="font-semibold">"{product.name}"</span>? This action cannot be undone. All images associated with this product will also be deleted.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2 border border-[#ddd] text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? 'Deleting...' : 'Delete Product'}
          </button>
        </div>
      </div>
    </div>
  )
}
