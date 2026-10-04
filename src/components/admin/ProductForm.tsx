'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ProductWithDetails } from '@/types/database';
import { createProductAction, updateProductAction, uploadStandaloneImageAction } from '@/app/actions/products';
import { ImageManager } from '@/components/admin/ImageManager';
import { generateSlug } from '@/lib/utils';

interface ProductFormProps {
  initialData?: ProductWithDetails | null;
  mode: 'create' | 'edit';
}

interface ImageRowItem {
  id?: string;
  image_url: string;
  alt_text?: string;
  sort_order: number;
}

interface SpecItem {
  id?: string;
  spec_group: string;
  spec_name: string;
  spec_value: string;
  sort_order?: number;
}

interface OptionItem {
  id?: string;
  option_name: string;
  option_values: string[];
  sort_order?: number;
}

interface TierItem {
  id?: string;
  min_quantity: number;
  max_quantity: number | null;
  price: number;
}

const DEMO_REFERENCE_IMAGES: ImageRowItem[] = [
  {
    image_url: 'https://s.alicdn.com/@sc04/kf/H1c6677f5d4724be2a6828f5d18056469u.jpg_960x960q80.jpg',
    alt_text: 'Main coil wire',
    sort_order: 1,
  },
  {
    image_url: 'https://s.alicdn.com/@sc04/kf/H7fe3ae65a3f443c49a4b07fa2c3c0807Y.jpg_960x960q80.jpg',
    alt_text: 'Manufacturing factory line',
    sort_order: 2,
  },
  {
    image_url: 'https://s.alicdn.com/@sc04/kf/Hd0d0a4d54f9c41b89379e3eb16c934e5c.jpg_960x960q80.jpg',
    alt_text: 'Strand cross section',
    sort_order: 3,
  },
  {
    image_url: 'https://s.alicdn.com/@sc04/kf/He479d8ede5f94305a02aaa262a24ff5dV.jpg_960x960q80.jpg',
    alt_text: 'Packaging and pallet',
    sort_order: 4,
  },
  {
    image_url: 'https://s.alicdn.com/@sc04/kf/Hc2815aad98ee48c1b28d03a2f7cfb162r.png_960x960q80.jpg',
    alt_text: 'Quality inspection certificate',
    sort_order: 5,
  },
  {
    image_url: 'https://s.alicdn.com/@sc04/kf/H4d4fa6e54076472bbcff6dc40a8784c5D.jpg_960x960q80.jpg',
    alt_text: 'Shipping and warehouse storage',
    sort_order: 6,
  },
];

const DEMO_SELLER_DESCRIPTION = `Hebei Victory Metal Product Co.,Ltd. is the one of the largest enterprises of China who professionally produce PC Strand, PC wire and PC bar. The company was founded in 1996, covers an area of 150,000 square meters, registered capital 10.1499 million.

Hebei Victory located in the historical ancient Baoding city which is near to Tianjin and Beijing. Main production 'Sideli' brand low relaxation prestressed steel strand, low relaxation smooth prestressed steel wire, spiral ribs prestressed steel wire, indented PC wire, prestressed steel bar etc all series products. Products are widely applied in railway bridge, railway with concrete sleeper, rail board, road Bridges, water conservancy large diameter water pipe, power transmission pole, high-rise building pipes and hollow floor. We usually export them to Southeast Asia, the middle east and Americas and so on.

The company sets up a strict quality guarantee system, the company in September 2000 passed ISO 9001-2000 quality management system certification, 2008 changed plate made quality management system and the UKAS international quality system authentication double. 'Sideli' brand products for years with high quality and satisfactory service has won the domestic and foreign customer high praise.`;

const DEMO_SELLER_IMAGES = [
  'https://s.alicdn.com/@sc04/kf/H7fe3ae65a3f443c49a4b07fa2c3c0807Y.jpg_960x960q80.jpg',
  'https://s.alicdn.com/@sc04/kf/Hd0d0a4d54f9c41b89379e3eb16c934e5c.jpg_960x960q80.jpg',
  'https://s.alicdn.com/@sc04/kf/He479d8ede5f94305a02aaa262a24ff5dV.jpg_960x960q80.jpg',
  'https://s.alicdn.com/@sc04/kf/Hc2815aad98ee48c1b28d03a2f7cfb162r.png_960x960q80.jpg',
];

export function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Seller company details state
  const [sellerDescription, setSellerDescription] = useState(initialData?.seller_description || '');
  const [sellerImages, setSellerImages] = useState<string[]>(
    initialData?.seller_images && Array.isArray(initialData.seller_images)
      ? initialData.seller_images
      : []
  );
  const [isUploadingSeller, setIsUploadingSeller] = useState(false);
  const sellerFileInputRef = useRef<HTMLInputElement>(null);

  // Images state (available in both create and edit modes!)
  const [imageRows, setImageRows] = useState<ImageRowItem[]>(
    initialData?.product_images?.map((img, idx) => ({
      id: img.id,
      image_url: img.image_url,
      alt_text: img.alt_text || '',
      sort_order: img.sort_order ?? idx + 1,
    })) || []
  );
  
  const [specs, setSpecs] = useState<SpecItem[]>(initialData?.product_specifications || []);
  const [options, setOptions] = useState<OptionItem[]>(initialData?.product_options || []);
  const [tiers, setTiers] = useState<TierItem[]>(initialData?.price_tiers || []);
  const [minOrderUnit, setMinOrderUnit] = useState<string>(initialData?.min_order_unit || 'tons');

  // Auto-generate slug
  const [name, setName] = useState(initialData?.name || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [autoSlug, setAutoSlug] = useState(mode === 'create');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    if (autoSlug) {
      setSlug(generateSlug(newName));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setAutoSlug(false);
  };

  // Image row helpers
  const addImageRow = () => {
    setImageRows((prev) => [
      ...prev,
      {
        image_url: '',
        alt_text: '',
        sort_order: prev.length + 1,
      },
    ]);
  };

  const updateImageRow = (index: number, field: keyof ImageRowItem, value: any) => {
    setImageRows((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const removeImageRow = (index: number) => {
    setImageRows((prev) => prev.filter((_, idx) => idx !== index));
  };

  const moveImageRow = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === imageRows.length - 1)) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    setImageRows((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy.map((item, idx) => ({ ...item, sort_order: idx + 1 }));
    });
  };

  const loadDemoImages = () => {
    setImageRows(DEMO_REFERENCE_IMAGES);
  };

  // Handle direct file uploads (for new rows or a specific row)
  const handleFilesUpload = async (files: FileList | null, targetIndex?: number) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let finalUrl = '';

        // Try Supabase Storage upload
        try {
          const uploadData = new FormData();
          uploadData.append('file', file);
          const res = await uploadStandaloneImageAction(uploadData);
          if (res.success && res.url) {
            finalUrl = res.url;
          }
        } catch (uploadErr) {
          console.warn('Storage upload error, using local data URL fallback:', uploadErr);
        }

        // Fallback to Base64 data URL
        if (!finalUrl) {
          finalUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
        }

        const fileNameLabel = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

        if (typeof targetIndex === 'number' && i === 0) {
          // Replace target row
          updateImageRow(targetIndex, 'image_url', finalUrl);
          if (!imageRows[targetIndex]?.alt_text) {
            updateImageRow(targetIndex, 'alt_text', fileNameLabel);
          }
        } else {
          // Append new image row
          setImageRows((prev) => [
            ...prev,
            {
              image_url: finalUrl,
              alt_text: fileNameLabel,
              sort_order: prev.length + 1,
            },
          ]);
        }
      }
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesUpload(e.dataTransfer.files);
    }
  };

  const addSellerImageRow = () => {
    setSellerImages((prev) => [...prev, '']);
  };

  const updateSellerImageRow = (index: number, val: string) => {
    setSellerImages((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const removeSellerImageRow = (index: number) => {
    setSellerImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSellerFilesUpload = async (files: FileList | null, targetIndex?: number) => {
    if (!files || files.length === 0) return;
    setIsUploadingSeller(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let finalUrl = '';

        try {
          const uploadData = new FormData();
          uploadData.append('file', file);
          const res = await uploadStandaloneImageAction(uploadData);
          if (res.success && res.url) {
            finalUrl = res.url;
          }
        } catch (uploadErr) {
          console.warn('Storage upload error, using local data URL fallback:', uploadErr);
        }

        if (!finalUrl) {
          finalUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
        }

        if (typeof targetIndex === 'number' && i === 0) {
          updateSellerImageRow(targetIndex, finalUrl);
        } else {
          setSellerImages((prev) => [...prev, finalUrl]);
        }
      }
    } finally {
      setIsUploadingSeller(false);
      if (sellerFileInputRef.current) sellerFileInputRef.current.value = '';
    }
  };

  const loadDemoSellerInfo = () => {
    setSellerDescription(DEMO_SELLER_DESCRIPTION);
    setSellerImages(DEMO_SELLER_IMAGES);
  };

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    
    // Append JSON strings
    formData.append('images', JSON.stringify(imageRows));
    formData.append('specifications', JSON.stringify(specs));
    formData.append('options', JSON.stringify(options));
    formData.append('price_tiers', JSON.stringify(tiers));
    formData.append('seller_description', sellerDescription);
    formData.append('seller_images', JSON.stringify(sellerImages.filter(Boolean)));
    
    try {
      let res;
      if (mode === 'create') {
        res = await createProductAction(formData);
      } else {
        res = await updateProductAction(initialData!.id, formData);
      }
      
      if (res.success) {
        router.push('/admin/products');
      } else {
        setError(res.error || 'An error occurred');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-8 max-w-4xl pb-20">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* 1. Basic Info */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#ddd] space-y-4">
        <h3 className="text-lg font-bold text-[#222] border-b pb-2">1. Basic Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name *</label>
            <input 
              type="text" 
              name="name" 
              value={name} 
              onChange={handleNameChange} 
              placeholder="e.g. High Tensile Steel Strand Wire 9.53mm 12.7mm 15.2mm..."
              required 
              className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000]" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Slug (URL identifier) *</label>
            <input 
              type="text" 
              name="slug" 
              value={slug} 
              onChange={handleSlugChange} 
              placeholder="e.g. high-tensile-steel-strand-wire"
              required 
              className="w-full px-3 py-2 border border-[#ddd] rounded-md bg-gray-50 text-sm outline-none focus:border-[#D64000]" 
            />
            <span className="text-xs text-gray-400 mt-1 block">Public URL: /product/{slug || '[slug]'}</span>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Price (USD) *</label>
            <input 
              type="number" 
              step="0.01" 
              name="price" 
              defaultValue={initialData?.price || ''} 
              placeholder="e.g. 650.00"
              required 
              className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000]" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Original Price (optional strikethrough)</label>
            <input 
              type="number" 
              step="0.01" 
              name="original_price" 
              defaultValue={initialData?.original_price || ''} 
              placeholder="e.g. 720.00"
              className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000]" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Currency</label>
            <select name="currency" defaultValue={initialData?.currency || 'USD'} className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000]">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Product Images (Upload & Rows) */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#ddd] space-y-4">
        <div className="flex flex-wrap justify-between items-center border-b pb-2 gap-2">
          <div>
            <h3 className="text-lg font-bold text-[#222]">2. Product Images</h3>
            <p className="text-xs text-gray-500">Upload images from your computer or paste image URLs. The first image (#1) becomes the main display photo.</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button 
              type="button" 
              onClick={() => fileInputRef.current?.click()} 
              disabled={isUploading}
              className="text-xs bg-[#D64000] hover:bg-[#C03800] text-white px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1 shadow-sm disabled:opacity-50"
            >
              {isUploading ? '⏳ Uploading...' : '📁 Upload Image Files'}
            </button>
            <input 
              ref={fileInputRef} 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => handleFilesUpload(e.target.files)} 
            />
            <button 
              type="button" 
              onClick={addImageRow} 
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md font-semibold transition-colors"
            >
              + Add URL Row
            </button>
            <button 
              type="button" 
              onClick={loadDemoImages} 
              className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-1.5 rounded-md font-medium transition-colors"
            >
              ⚡ Load Demo Images
            </button>
          </div>
        </div>

        {/* Drag & Drop Upload Zone */}
        <div 
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-colors ${
            dragActive ? 'border-[#D64000] bg-orange-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-1 text-gray-600">
            <span className="text-2xl">📸</span>
            <p className="text-sm font-semibold text-gray-700">
              Drag &amp; drop product images here, or <span className="text-[#D64000] underline">browse files</span>
            </p>
            <p className="text-xs text-gray-400">Supports JPG, PNG, WEBP, GIF. Multiple files supported.</p>
          </div>
        </div>

        {/* Image Rows List */}
        {imageRows.length > 0 && (
          <div className="space-y-3 pt-2">
            {imageRows.map((img, index) => {
              const rowFileInputId = `row-file-input-${index}`;
              return (
                <div 
                  key={index} 
                  className="flex flex-col sm:flex-row gap-3 items-center p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  {/* Thumbnail Preview */}
                  <div className="w-16 h-16 rounded border bg-white flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                    {img.image_url ? (
                      <img 
                        src={img.image_url} 
                        alt={img.alt_text || 'Preview'} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-[11px] text-gray-400">No img</span>
                    )}
                    <span className="absolute top-0.5 left-0.5 bg-black/60 text-white text-[10px] px-1 rounded">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Image URL or Upload button */}
                  <div className="flex-1 w-full sm:w-auto">
                    <div className="flex justify-between items-center mb-0.5">
                      <label className="text-[11px] font-semibold text-gray-500">Image Source (URL or Upload) *</label>
                      <label 
                        htmlFor={rowFileInputId} 
                        className="text-[11px] font-semibold text-[#D64000] hover:underline cursor-pointer flex items-center gap-1"
                      >
                        📁 Choose File
                      </label>
                      <input 
                        id={rowFileInputId} 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleFilesUpload(e.target.files, index)} 
                      />
                    </div>
                    <input 
                      type="text" 
                      value={img.image_url} 
                      onChange={(e) => updateImageRow(index, 'image_url', e.target.value)} 
                      placeholder="https://... or click 'Choose File' above" 
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm bg-white outline-none focus:border-[#D64000]" 
                    />
                  </div>

                  {/* Alt Text Input */}
                  <div className="w-full sm:w-48">
                    <label className="block text-[11px] font-semibold text-gray-500 mb-0.5">Alt Text / Caption</label>
                    <input 
                      type="text" 
                      value={img.alt_text || ''} 
                      onChange={(e) => updateImageRow(index, 'alt_text', e.target.value)} 
                      placeholder="e.g. Front view" 
                      className="w-full px-2.5 py-1.5 border border-gray-300 rounded text-sm bg-white outline-none focus:border-[#D64000]" 
                    />
                  </div>

                  {/* Reorder and Delete controls */}
                  <div className="flex items-center gap-1 self-end sm:self-center pt-2 sm:pt-0">
                    <button 
                      type="button" 
                      onClick={() => moveImageRow(index, 'up')} 
                      disabled={index === 0} 
                      className="p-1.5 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-30" 
                      title="Move up"
                    >
                      ▲
                    </button>
                    <button 
                      type="button" 
                      onClick={() => moveImageRow(index, 'down')} 
                      disabled={index === imageRows.length - 1} 
                      className="p-1.5 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-30" 
                      title="Move down"
                    >
                      ▼
                    </button>
                    <button 
                      type="button" 
                      onClick={() => removeImageRow(index)} 
                      className="p-1.5 text-xs text-red-600 hover:text-white hover:bg-red-600 border border-red-200 rounded transition-colors ml-1" 
                      title="Delete row"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* In edit mode, allow Storage file upload too */}
        {mode === 'edit' && initialData && (
          <div className="pt-4 mt-4 border-t border-gray-200">
            <h4 className="text-sm font-bold text-gray-700 mb-2">Existing Storage Gallery:</h4>
            <ImageManager 
              productId={initialData.id} 
              images={initialData.product_images || []} 
              onUpdate={() => router.refresh()} 
            />
          </div>
        )}
      </div>

      {/* 3. Details & Procurement */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#ddd] space-y-4">
        <h3 className="text-lg font-bold text-[#222] border-b pb-2">3. Details &amp; Procurement</h3>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Product Description</label>
          <textarea 
            name="description" 
            rows={6} 
            defaultValue={initialData?.description || ''} 
            placeholder="Detailed product descriptions, features, applications, technical parameters..."
            className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000]"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Minimum Order Quantity (MOQ)</label>
            <input 
              type="number" 
              name="min_order_quantity" 
              defaultValue={initialData?.min_order_quantity || 1} 
              className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000]" 
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-semibold text-gray-700">Minimum Order Unit *</label>
              <span className="text-xs text-gray-500">
                Selected: <strong className="text-[#D64000]">{minOrderUnit}</strong>
              </span>
            </div>
            {/* Quick unit pills */}
            <div className="flex flex-wrap gap-1.5 mb-2">
              {['tons', 'pieces', 'sets', 'meters', 'kg', 'cartons'].map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setMinOrderUnit(u)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors ${
                    minOrderUnit.toLowerCase() === u
                      ? 'bg-brand-orange text-white border-brand-orange shadow-sm font-semibold'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
            <input 
              type="text" 
              name="min_order_unit" 
              value={minOrderUnit} 
              onChange={(e) => setMinOrderUnit(e.target.value)} 
              className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000]" 
              placeholder="e.g. tons, pieces, sets, meters" 
              required
            />
          </div>
        </div>
      </div>

      {/* 4. Seller & Logistics */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#ddd] space-y-4">
        <h3 className="text-lg font-bold text-[#222] border-b pb-2">4. Seller Credentials &amp; Logistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Seller / Supplier Name</label>
            <input 
              type="text" 
              name="seller_name" 
              defaultValue={initialData?.seller_name || ''} 
              placeholder="e.g. Hebei Victory Metal Product Co., Ltd."
              className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000]" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Seller Location</label>
            <input 
              type="text" 
              name="seller_location" 
              defaultValue={initialData?.seller_location || ''} 
              placeholder="e.g. Hebei, China"
              className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000]" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Years on Platform (YRS)</label>
            <input 
              type="number" 
              name="seller_years" 
              defaultValue={initialData?.seller_years || ''} 
              placeholder="e.g. 18"
              className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000]" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Average Response Time</label>
            <input 
              type="text" 
              name="seller_response_time" 
              defaultValue={initialData?.seller_response_time || ''} 
              placeholder="e.g. ≤1h" 
              className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000]" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">On-Time Dispatch Rate</label>
            <input 
              type="text" 
              name="seller_ontime_rate" 
              defaultValue={initialData?.seller_ontime_rate || ''} 
              placeholder="e.g. ≥100%" 
              className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000]" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Availability Status</label>
            <select 
              name="availability" 
              defaultValue={initialData?.availability || 'In Stock'} 
              className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000]"
            >
              <option value="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Pre-order">Pre-order</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Shipping &amp; Delivery Information</label>
            <input 
              type="text" 
              name="shipping_info" 
              defaultValue={initialData?.shipping_info || ''} 
              placeholder="e.g. FOB, CIF, CFR available. Major ports: Tianjin, Shanghai, Qingdao."
              className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000]" 
            />
          </div>

          {/* Company Description & Photos */}
          <div className="md:col-span-2 pt-4 mt-2 border-t border-gray-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-gray-800">Company Overview &amp; Verification</h4>
                <p className="text-xs text-gray-500">Displayed in the Supplier Card and Company Profile section on the product page.</p>
              </div>
              <button
                type="button"
                onClick={loadDemoSellerInfo}
                className="text-xs bg-orange-50 hover:bg-orange-100 text-brand-orange border border-brand-orange/30 px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1"
              >
                ⚡ Load Hebei Victory Info
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Company Description</label>
              <textarea 
                value={sellerDescription}
                onChange={(e) => setSellerDescription(e.target.value)}
                rows={5} 
                placeholder="Company history, manufacturing facilities, certifications (ISO), capacity, export regions..."
                className="w-full px-3 py-2 border border-[#ddd] rounded-md text-sm outline-none focus:border-[#D64000] leading-relaxed"
              />
            </div>

            {/* Company Photos */}
            <div>
              <div className="flex flex-wrap justify-between items-center mb-2 gap-2">
                <label className="block text-sm font-semibold text-gray-700">Company / Factory Photos</label>
                <div className="flex items-center gap-2">
                  <button 
                    type="button" 
                    onClick={() => sellerFileInputRef.current?.click()} 
                    disabled={isUploadingSeller}
                    className="text-xs bg-[#D64000] hover:bg-[#C03800] text-white px-3 py-1 rounded-md font-medium transition-colors shadow-sm disabled:opacity-50"
                  >
                    {isUploadingSeller ? '⏳ Uploading...' : '📁 Upload Photo Files'}
                  </button>
                  <input 
                    ref={sellerFileInputRef} 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleSellerFilesUpload(e.target.files)} 
                  />
                  <button 
                    type="button" 
                    onClick={addSellerImageRow} 
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md font-medium transition-colors"
                  >
                    + Add URL
                  </button>
                </div>
              </div>

              {sellerImages.length === 0 ? (
                <p className="text-xs text-gray-400 py-1 italic">No company photos added yet. Upload files or click "Load Hebei Victory Info" above.</p>
              ) : (
                <div className="space-y-2">
                  {sellerImages.map((imgUrl, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-center gap-2 p-2 bg-gray-50 border border-gray-200 rounded-md">
                      <div className="w-12 h-12 rounded border bg-white flex items-center justify-center overflow-hidden flex-shrink-0 relative">
                        {imgUrl ? (
                          <img 
                            src={imgUrl} 
                            alt={`Company photo ${idx + 1}`} 
                            className="w-full h-full object-cover" 
                            onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                          />
                        ) : (
                          <span className="text-[10px] text-gray-400">Empty</span>
                        )}
                        <span className="absolute top-0 left-0 bg-black/60 text-white text-[9px] px-1 rounded-br">
                          #{idx + 1}
                        </span>
                      </div>
                      <input 
                        type="text" 
                        value={imgUrl} 
                        onChange={(e) => updateSellerImageRow(idx, e.target.value)} 
                        placeholder="https://... or choose file"
                        className="flex-1 w-full px-2.5 py-1.5 border border-gray-300 rounded text-xs bg-white outline-none focus:border-[#D64000]"
                      />
                      <label className="text-xs text-brand-orange hover:underline cursor-pointer font-medium px-2 py-1 flex-shrink-0">
                        📁 Replace
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleSellerFilesUpload(e.target.files, idx)} 
                        />
                      </label>
                      <button 
                        type="button" 
                        onClick={() => removeSellerImageRow(idx)}
                        className="text-xs text-red-500 hover:text-white hover:bg-red-500 border border-red-200 rounded px-2 py-1 transition-colors flex-shrink-0"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Key Attributes & Specifications */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#ddd] space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <h3 className="text-lg font-bold text-[#222]">5. Specifications &amp; Attributes</h3>
            <p className="text-xs text-gray-500">Zebra-striped table displayed on the public product page.</p>
          </div>
          <button 
            type="button" 
            onClick={() => setSpecs([...specs, { spec_group: 'Key attributes', spec_name: '', spec_value: '' }])} 
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md font-semibold transition-colors"
          >
            + Add Spec Row
          </button>
        </div>
        {specs.length === 0 ? (
          <p className="text-sm text-gray-400 py-2">No specifications added. Click "+ Add Spec Row" to add technical specs.</p>
        ) : (
          <div className="space-y-2">
            {specs.map((spec: SpecItem, i: number) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 items-center">
                <input 
                  type="text" 
                  value={spec.spec_group} 
                  onChange={e => { const n = [...specs]; n[i].spec_group = e.target.value; setSpecs(n); }} 
                  placeholder="Group (e.g. Key attributes)" 
                  className="w-full sm:w-1/3 px-3 py-1.5 border rounded text-sm bg-gray-50" 
                />
                <input 
                  type="text" 
                  value={spec.spec_name} 
                  onChange={e => { const n = [...specs]; n[i].spec_name = e.target.value; setSpecs(n); }} 
                  placeholder="Attribute Name (e.g. Application)" 
                  className="w-full sm:w-1/3 px-3 py-1.5 border rounded text-sm" 
                />
                <input 
                  type="text" 
                  value={spec.spec_value} 
                  onChange={e => { const n = [...specs]; n[i].spec_value = e.target.value; setSpecs(n); }} 
                  placeholder="Value (e.g. Bridge Building)" 
                  className="w-full sm:flex-1 px-3 py-1.5 border rounded text-sm" 
                />
                <button 
                  type="button" 
                  onClick={() => setSpecs(specs.filter((_: SpecItem, idx: number) => idx !== i))} 
                  className="text-red-500 font-bold px-2 py-1 hover:bg-red-50 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Product Options & Variations */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#ddd] space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <div>
            <h3 className="text-lg font-bold text-[#222]">6. Product Options / Variations</h3>
            <p className="text-xs text-gray-500">Buyer-selectable pills (e.g. Diameter, Color, Size, Strand Type).</p>
          </div>
          <button 
            type="button" 
            onClick={() => setOptions([...options, { option_name: '', option_values: [] }])} 
            className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md font-semibold transition-colors"
          >
            + Add Option Group
          </button>
        </div>
        {options.length === 0 ? (
          <p className="text-sm text-gray-400 py-2">No option groups added. Click "+ Add Option Group" to configure variants.</p>
        ) : (
          <div className="space-y-2">
            {options.map((opt: OptionItem, i: number) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 items-center">
                <input 
                  type="text" 
                  value={opt.option_name} 
                  onChange={e => { const n = [...options]; n[i].option_name = e.target.value; setOptions(n); }} 
                  placeholder="Option Name (e.g. Diameter)" 
                  className="w-full sm:w-1/3 px-3 py-1.5 border rounded text-sm" 
                />
                <input 
                  type="text" 
                  value={Array.isArray(opt.option_values) ? opt.option_values.join(', ') : opt.option_values} 
                  onChange={e => { const n = [...options]; n[i].option_values = e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean); setOptions(n); }} 
                  placeholder="Comma-separated values (e.g. 9.53mm, 12.7mm, 15.2mm)" 
                  className="w-full sm:flex-1 px-3 py-1.5 border rounded text-sm" 
                />
                <button 
                  type="button" 
                  onClick={() => setOptions(options.filter((_: OptionItem, idx: number) => idx !== i))} 
                  className="text-red-500 font-bold px-2 py-1 hover:bg-red-50 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 7. Volume Pricing Tiers */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[#ddd] space-y-4">
        <div className="flex flex-wrap justify-between items-center border-b pb-2 gap-2">
          <div>
            <h3 className="text-lg font-bold text-[#222]">7. Tiered Volume Pricing Matrix</h3>
            <p className="text-xs text-gray-500">
              Tiered bulk discounts for <span className="font-semibold text-brand-orange uppercase">{minOrderUnit}</span> (e.g. $650 for 3-24 {minOrderUnit}, $630 for ≥25 {minOrderUnit}).
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-gray-500">Unit:</span>
            <div className="flex gap-1">
              {['tons', 'pieces', 'sets', 'kg'].map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setMinOrderUnit(u)}
                  className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                    minOrderUnit.toLowerCase() === u
                      ? 'bg-brand-orange text-white border-brand-orange font-bold shadow-xs'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
            <button 
              type="button" 
              onClick={() => setTiers([...tiers, { min_quantity: 1, max_quantity: null, price: 0 }])} 
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md font-semibold transition-colors ml-1"
            >
              + Add Price Tier
            </button>
          </div>
        </div>
        {tiers.length === 0 ? (
          <p className="text-sm text-gray-400 py-2">No volume tiers. The product will sell at the base price.</p>
        ) : (
          <div className="space-y-2">
            {tiers.map((tier: TierItem, i: number) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 items-center">
                <div className="w-full sm:w-1/3">
                  <label className="text-[11px] text-gray-500 block mb-0.5">
                    Min Quantity ({minOrderUnit})
                  </label>
                  <input 
                    type="number" 
                    value={tier.min_quantity} 
                    onChange={e => { const n = [...tiers]; n[i].min_quantity = parseInt(e.target.value) || 1; setTiers(n); }} 
                    placeholder={`Min Qty (e.g. 3)`} 
                    className="w-full px-3 py-1.5 border rounded text-sm" 
                  />
                </div>
                <div className="w-full sm:w-1/3">
                  <label className="text-[11px] text-gray-500 block mb-0.5">
                    Max Quantity ({minOrderUnit}, empty for ≥)
                  </label>
                  <input 
                    type="number" 
                    value={tier.max_quantity || ''} 
                    onChange={e => { const n = [...tiers]; n[i].max_quantity = e.target.value ? parseInt(e.target.value) : null; setTiers(n); }} 
                    placeholder={`e.g. 24 (or empty for ≥)`} 
                    className="w-full px-3 py-1.5 border rounded text-sm" 
                  />
                </div>
                <div className="w-full sm:flex-1">
                  <label className="text-[11px] text-gray-500 block mb-0.5">
                    Unit Price (USD / {minOrderUnit})
                  </label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={tier.price} 
                    onChange={e => { const n = [...tiers]; n[i].price = parseFloat(e.target.value) || 0; setTiers(n); }} 
                    placeholder="Price (e.g. 650.00)" 
                    className="w-full px-3 py-1.5 border rounded text-sm" 
                  />
                </div>
                <button 
                  type="button" 
                  onClick={() => setTiers(tiers.filter((_: TierItem, idx: number) => idx !== i))} 
                  className="text-red-500 font-bold px-2 py-1 hover:bg-red-50 rounded self-end sm:self-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submission Actions */}
      <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-200">
        <button 
          type="button" 
          onClick={() => router.back()} 
          className="px-6 py-3 border border-[#ddd] text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          disabled={loading || isUploading} 
          className="px-8 py-3 bg-[#D64000] text-white rounded-lg hover:bg-[#C03800] font-bold text-base disabled:opacity-50 shadow-md transition-all flex items-center gap-2"
        >
          {loading ? 'Saving to Database...' : isUploading ? 'Uploading Image...' : mode === 'create' ? 'Create Product' : 'Update Product'}
        </button>
      </div>
    </form>
  );
}
