'use server';

import { createClient } from '@/lib/supabase/server';
import { sendTelegramOrderNotification, type OrderNotificationPayload } from '@/lib/telegram';

export interface SubmitOrderResponse {
  success: boolean;
  error?: string;
  warning?: string;
  orderId?: string;
}

export async function submitOrderAction(formData: FormData): Promise<SubmitOrderResponse> {
  const productName = (formData.get('product_name') as string)?.trim() || 'Unknown Product';
  const productSlug = (formData.get('product_slug') as string)?.trim() || '';
  const quantity = parseFloat(formData.get('quantity') as string) || 1;
  const unit = (formData.get('unit') as string)?.trim() || 'pieces';
  const unitPrice = parseFloat(formData.get('unit_price') as string) || 0;
  const currency = (formData.get('currency') as string)?.trim() || 'USD';

  const customerName = (formData.get('customer_name') as string)?.trim();
  const customerPhone = (formData.get('customer_phone') as string)?.trim();
  const customerEmail = (formData.get('customer_email') as string)?.trim();
  const customerTelegram = (formData.get('customer_telegram') as string)?.trim();
  const deliveryAddress = (formData.get('delivery_address') as string)?.trim();
  const notes = (formData.get('notes') as string)?.trim();

  // Validation
  if (!customerName) {
    return { success: false, error: 'Please enter your full name.' };
  }
  if (!customerPhone) {
    return { success: false, error: 'Please enter your phone number or WhatsApp.' };
  }
  if (!deliveryAddress) {
    return { success: false, error: 'Please provide your delivery destination or address.' };
  }
  if (quantity <= 0) {
    return { success: false, error: 'Please enter a valid order quantity.' };
  }

  // 1. Try to record in Supabase (if database is connected)
  let orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
  try {
    const supabase = await createClient();
    const { data: insertedOrder, error: dbError } = await supabase
      .from('orders')
      .insert({
        product_name: productName,
        product_slug: productSlug,
        quantity,
        unit,
        unit_price: unitPrice,
        currency,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail || null,
        customer_telegram: customerTelegram || null,
        delivery_address: deliveryAddress,
        notes: notes || null,
      })
      .select('id')
      .single();

    if (!dbError && insertedOrder) {
      orderId = insertedOrder.id;
    }
  } catch (dbErr) {
    // Graceful fallback if table doesn't exist yet or offline
    console.warn('[Orders DB warning]:', dbErr);
  }

  // 2. Dispatch to Telegram Channel
  const telegramPayload: OrderNotificationPayload = {
    productName,
    productSlug,
    quantity,
    unit,
    unitPrice,
    currency,
    customerName,
    customerPhone,
    customerEmail,
    customerTelegram,
    deliveryAddress,
    notes,
  };

  const telegramRes = await sendTelegramOrderNotification(telegramPayload);

  return {
    success: true,
    orderId,
    warning: telegramRes.warning,
    error: telegramRes.error,
  };
}
