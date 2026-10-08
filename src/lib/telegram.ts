export interface OrderNotificationPayload {
  productName: string;
  productSlug?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  currency: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerTelegram?: string;
  deliveryAddress: string;
  notes?: string;
}

export async function sendTelegramOrderNotification(
  payload: OrderNotificationPayload
): Promise<{ success: boolean; error?: string; warning?: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    console.warn(
      '[Telegram Notification] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in .env / .env.local.'
    );
    return {
      success: false,
      warning:
        'Order recorded! Telegram notification was skipped because TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not yet configured in your .env file.',
    };
  }

  const subtotal = payload.unitPrice * payload.quantity;
  const formattedSubtotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: payload.currency || 'USD',
  }).format(subtotal);

  const formattedUnitPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: payload.currency || 'USD',
  }).format(payload.unitPrice);

  const escapeHtml = (str: string = '') =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const messageText = `
🚨 <b>NEW ORDER RECEIVED — 2EMARKET</b>
━━━━━━━━━━━━━━━━━━━━━
📦 <b>Product:</b> ${escapeHtml(payload.productName)}
📊 <b>Quantity:</b> ${payload.quantity} ${escapeHtml(payload.unit)}
${payload.unitPrice > 0 ? `💰 <b>Base Price:</b> ${formattedUnitPrice} / ${escapeHtml(payload.unit)}\n` : ''}
👤 <b>CUSTOMER DETAILS:</b>
• <b>Name:</b> ${escapeHtml(payload.customerName)}
• <b>Phone / WhatsApp:</b> <code>${escapeHtml(payload.customerPhone)}</code>
${payload.customerTelegram ? `• <b>Telegram:</b> ${escapeHtml(payload.customerTelegram)}\n` : ''}${payload.customerEmail ? `• <b>Email:</b> ${escapeHtml(payload.customerEmail)}\n` : ''}• <b>Delivery Address / Port:</b> ${escapeHtml(payload.deliveryAddress)}

${payload.notes ? `📝 <b>Customer Notes:</b>\n${escapeHtml(payload.notes)}\n\n` : ''}━━━━━━━━━━━━━━━━━━━━━
⏱ <i>Received: ${new Date().toISOString().replace('T', ' ').substring(0, 19)} UTC</i>
🌐 <i>Source: 2Emarket Storefront</i>
  `.trim();

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      console.error('[Telegram API Response Error]:', data);
      return {
        success: false,
        error: data?.description || 'Failed to dispatch Telegram message',
      };
    }

    return { success: true };
  } catch (err: any) {
    console.error('[Telegram Network Error]:', err);
    return {
      success: false,
      error: err.message || 'Network error reaching Telegram API',
    };
  }
}
