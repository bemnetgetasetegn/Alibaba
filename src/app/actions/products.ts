'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';
import { getImagePath, generateSlug } from '@/lib/utils';

export async function createProductAction(formData: FormData) {
  const supabase = await createClient();
  
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  
  if (!name || !price) {
    return { success: false, error: 'Name and price are required' };
  }
  
  const slug = (formData.get('slug') as string) || generateSlug(name);
  
  const productData = {
    name,
    slug,
    price: parseFloat(price),
    original_price: formData.get('original_price') ? parseFloat(formData.get('original_price') as string) : null,
    description: formData.get('description') as string,
    currency: (formData.get('currency') as string) || 'USD',
    min_order_quantity: formData.get('min_order_quantity') ? parseInt(formData.get('min_order_quantity') as string, 10) : 1,
    min_order_unit: (formData.get('min_order_unit') as string) || 'pieces',
    seller_name: formData.get('seller_name') as string,
    seller_location: formData.get('seller_location') as string,
    seller_years: formData.get('seller_years') ? parseInt(formData.get('seller_years') as string, 10) : null,
    seller_response_time: formData.get('seller_response_time') as string,
    seller_ontime_rate: formData.get('seller_ontime_rate') as string,
    seller_description: (formData.get('seller_description') as string) || null,
    seller_images: formData.get('seller_images')
      ? (() => {
          try {
            const parsed = JSON.parse(formData.get('seller_images') as string);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        })()
      : null,
    shipping_info: formData.get('shipping_info') as string,
    availability: (formData.get('availability') as string) || 'In Stock',
  };
  
  const { data: product, error: productError } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();
    
  if (productError) {
    return { success: false, error: productError.message };
  }
  
  const productId = product.id;
  
  try {
    const imagesStr = formData.get('images') as string;
    if (imagesStr) {
      const parsedImages = JSON.parse(imagesStr);
      const images = parsedImages
        .filter((img: any) => img.image_url && img.image_url.trim() !== '')
        .map((img: any, idx: number) => ({
          product_id: productId,
          image_url: img.image_url.trim(),
          alt_text: img.alt_text?.trim() || null,
          sort_order: typeof img.sort_order === 'number' ? img.sort_order : idx + 1,
        }));
      if (images.length) await supabase.from('product_images').insert(images);
    }

    const specsStr = formData.get('specifications') as string;
    if (specsStr) {
      const specs = JSON.parse(specsStr).map((s: any) => ({
        product_id: productId,
        spec_group: s.spec_group || 'Key attributes',
        spec_name: s.spec_name,
        spec_value: s.spec_value,
        sort_order: s.sort_order ?? 0,
      }));
      if (specs.length) await supabase.from('product_specifications').insert(specs);
    }
    
    const optionsStr = formData.get('options') as string;
    if (optionsStr) {
      const options = JSON.parse(optionsStr).map((o: any) => ({
        product_id: productId,
        option_name: o.option_name,
        option_values: Array.isArray(o.option_values) ? o.option_values : [],
        sort_order: o.sort_order ?? 0,
      }));
      if (options.length) await supabase.from('product_options').insert(options);
    }
    
    const tiersStr = formData.get('price_tiers') as string;
    if (tiersStr) {
      const tiers = JSON.parse(tiersStr).map((t: any) => ({
        product_id: productId,
        min_quantity: parseInt(t.min_quantity, 10) || 1,
        max_quantity: t.max_quantity ? parseInt(t.max_quantity, 10) : null,
        price: parseFloat(t.price) || 0,
      }));
      if (tiers.length) await supabase.from('price_tiers').insert(tiers);
    }
  } catch (e: any) {
    console.error('Error saving related product records:', e);
  }
  
  revalidatePath('/admin/products');
  revalidatePath('/');
  return { success: true, productId };
}

export async function updateProductAction(id: string, formData: FormData) {
  const supabase = await createClient();
  
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  
  if (!name || !price) {
    return { success: false, error: 'Name and price are required' };
  }
  
  const slug = (formData.get('slug') as string) || generateSlug(name);
  
  const productData = {
    name,
    slug,
    price: parseFloat(price),
    original_price: formData.get('original_price') ? parseFloat(formData.get('original_price') as string) : null,
    description: formData.get('description') as string,
    currency: (formData.get('currency') as string) || 'USD',
    min_order_quantity: formData.get('min_order_quantity') ? parseInt(formData.get('min_order_quantity') as string, 10) : 1,
    min_order_unit: (formData.get('min_order_unit') as string) || 'pieces',
    seller_name: formData.get('seller_name') as string,
    seller_location: formData.get('seller_location') as string,
    seller_years: formData.get('seller_years') ? parseInt(formData.get('seller_years') as string, 10) : null,
    seller_response_time: formData.get('seller_response_time') as string,
    seller_ontime_rate: formData.get('seller_ontime_rate') as string,
    seller_description: (formData.get('seller_description') as string) || null,
    seller_images: formData.get('seller_images')
      ? (() => {
          try {
            const parsed = JSON.parse(formData.get('seller_images') as string);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        })()
      : null,
    shipping_info: formData.get('shipping_info') as string,
    availability: (formData.get('availability') as string) || 'In Stock',
  };
  
  const { error: productError } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id);
    
  if (productError) {
    return { success: false, error: productError.message };
  }
  
  try {
    const imagesStr = formData.get('images') as string;
    if (imagesStr) {
      await supabase.from('product_images').delete().eq('product_id', id);
      const parsedImages = JSON.parse(imagesStr);
      const images = parsedImages
        .filter((img: any) => img.image_url && img.image_url.trim() !== '')
        .map((img: any, idx: number) => ({
          product_id: id,
          image_url: img.image_url.trim(),
          alt_text: img.alt_text?.trim() || null,
          sort_order: typeof img.sort_order === 'number' ? img.sort_order : idx + 1,
        }));
      if (images.length) await supabase.from('product_images').insert(images);
    }

    const specsStr = formData.get('specifications') as string;
    if (specsStr) {
      await supabase.from('product_specifications').delete().eq('product_id', id);
      const specs = JSON.parse(specsStr).map((s: any) => ({
        product_id: id,
        spec_group: s.spec_group || 'Key attributes',
        spec_name: s.spec_name,
        spec_value: s.spec_value,
        sort_order: s.sort_order ?? 0,
      }));
      if (specs.length) await supabase.from('product_specifications').insert(specs);
    }
    
    const optionsStr = formData.get('options') as string;
    if (optionsStr) {
      await supabase.from('product_options').delete().eq('product_id', id);
      const options = JSON.parse(optionsStr).map((o: any) => ({
        product_id: id,
        option_name: o.option_name,
        option_values: Array.isArray(o.option_values) ? o.option_values : [],
        sort_order: o.sort_order ?? 0,
      }));
      if (options.length) await supabase.from('product_options').insert(options);
    }
    
    const tiersStr = formData.get('price_tiers') as string;
    if (tiersStr) {
      await supabase.from('price_tiers').delete().eq('product_id', id);
      const tiers = JSON.parse(tiersStr).map((t: any) => ({
        product_id: id,
        min_quantity: parseInt(t.min_quantity, 10) || 1,
        max_quantity: t.max_quantity ? parseInt(t.max_quantity, 10) : null,
        price: parseFloat(t.price) || 0,
      }));
      if (tiers.length) await supabase.from('price_tiers').insert(tiers);
    }
  } catch (e: any) {
    console.error('Error updating related product records:', e);
  }
  
  revalidatePath('/admin/products');
  revalidatePath(`/product/${slug}`);
  revalidatePath('/');
  return { success: true };
}

export async function deleteProductAction(id: string) {
  const supabase = await createClient();
  const adminAuth = createAdminClient();
  
  const { data: images } = await supabase.from('product_images').select('*').eq('product_id', id);
  
  if (images && images.length > 0) {
    for (const img of images) {
      const path = getImagePath(img.image_url);
      if (path) {
        await adminAuth.storage.from('product-images').remove([path]);
      }
    }
  }
  
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) {
    return { success: false, error: error.message };
  }
  
  revalidatePath('/admin/products');
  revalidatePath('/');
  return { success: true };
}

export async function uploadImageAction(formData: FormData) {
  const file = formData.get('file') as File;
  const productId = formData.get('productId') as string;
  
  if (!file || !productId) return { success: false, error: 'File and productId required' };
  
  const supabase = await createClient();
  const fileName = `${productId}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  
  const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file);
  if (uploadError) return { success: false, error: uploadError.message };
  
  const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(fileName);
  
  const { data: imgData, error: dbError } = await supabase.from('product_images').insert({
    product_id: productId,
    image_url: publicUrlData.publicUrl,
    sort_order: 0,
  }).select().single();
  
  if (dbError) return { success: false, error: dbError.message };
  
  revalidatePath('/admin/products');
  return { success: true, image: imgData };
}

export async function deleteImageAction(imageId: string) {
  const supabase = await createClient();
  const adminAuth = createAdminClient();
  
  const { data: img } = await supabase.from('product_images').select('*').eq('id', imageId).single();
  if (!img) return { success: false, error: 'Not found' };
  
  const path = getImagePath(img.image_url);
  if (path) {
    await adminAuth.storage.from('product-images').remove([path]);
  }
  
  await supabase.from('product_images').delete().eq('id', imageId);
  
  revalidatePath('/admin/products');
  return { success: true };
}

export async function reorderImagesAction(imageIds: string[]) {
  const supabase = await createClient();
  
  for (let i = 0; i < imageIds.length; i++) {
    await supabase.from('product_images').update({ sort_order: i }).eq('id', imageIds[i]);
  }
  
  revalidatePath('/admin/products');
  return { success: true };
}

export async function uploadStandaloneImageAction(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  const file = formData.get('file') as File;
  if (!file) return { success: false, error: 'No file provided' };
  
  try {
    const supabase = await createClient();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `uploads/${Date.now()}-${cleanFileName}`;
    
    const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file);
    if (uploadError) {
      return { success: false, error: uploadError.message };
    }
    
    const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(fileName);
    return { success: true, url: publicUrlData.publicUrl };
  } catch (err: any) {
    return { success: false, error: err.message || 'Upload failed' };
  }
}

