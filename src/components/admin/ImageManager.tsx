'use client'

import { useState } from 'react'
import { ProductImage } from '@/types/database'
import { uploadImageAction, deleteImageAction, reorderImagesAction } from '@/app/actions/products'
import Image from 'next/image'

interface ImageManagerProps {
  productId: string
  images: ProductImage[]
  onUpdate: () => void
}

export function ImageManager({ productId, images, onUpdate }: ImageManagerProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setError(null)
    
    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData()
        formData.append('file', files[i])
        formData.append('productId', productId)
        const res = await uploadImageAction(formData)
        if (!res.success) {
          setError(res.error || 'Upload failed')
          break
        }
      }
      onUpdate()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
      if (e.target) e.target.value = ''
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    try {
      const res = await deleteImageAction(id)
      if (res.success) {
        onUpdate()
      } else {
        setError(res.error || 'Delete failed')
      }
    } catch (err: any) {
      setError(err.message)
    }
  }

  const moveImage = async (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === images.length - 1)) return
    
    const newImages = [...images]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    const temp = newImages[index]
    newImages[index] = newImages[targetIndex]
    newImages[targetIndex] = temp
    
    const imageIds = newImages.map(img => img.id)
    const res = await reorderImagesAction(imageIds)
    if (res.success) {
      onUpdate()
    }
  }

  const sortedImages = [...images].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {sortedImages.map((img, index) => (
          <div key={img.id} className="relative group rounded-lg border border-[#ddd] overflow-hidden bg-white">
            <div className="aspect-square relative">
              <Image 
                src={img.image_url} 
                alt="Product image" 
                fill 
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="absolute top-1 left-1 bg-black/60 text-white text-xs px-2 py-1 rounded">
              {index + 1}
            </div>
            <button 
              type="button"
              onClick={() => handleDelete(img.id)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              &times;
            </button>
            <div className="flex border-t border-[#ddd]">
              <button 
                type="button"
                onClick={() => moveImage(index, 'up')}
                disabled={index === 0}
                className="flex-1 py-1 bg-gray-50 hover:bg-gray-100 disabled:opacity-30 text-xs border-r border-[#ddd]"
              >
                &larr;
              </button>
              <button 
                type="button"
                onClick={() => moveImage(index, 'down')}
                disabled={index === sortedImages.length - 1}
                className="flex-1 py-1 bg-gray-50 hover:bg-gray-100 disabled:opacity-30 text-xs"
              >
                &rarr;
              </button>
            </div>
          </div>
        ))}
        
        <div className="relative rounded-lg border-2 border-dashed border-[#ddd] bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center aspect-square text-gray-500">
          {uploading ? (
            <span className="text-sm font-medium">Uploading...</span>
          ) : (
            <>
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-medium">Add Images</span>
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
