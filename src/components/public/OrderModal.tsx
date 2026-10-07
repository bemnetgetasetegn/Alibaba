'use client';

import { useState } from 'react';
import { Product } from '@/types/database';
import { formatPrice } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { submitOrderAction } from '@/app/actions/orders';
import Image from 'next/image';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  initialQuantity?: number;
}

export function OrderModal({
  isOpen,
  onClose,
  product,
  initialQuantity,
}: OrderModalProps) {
  const minQty = product.min_order_quantity || 1;
  const unit = product.min_order_unit || 'tons';

  const [quantity, setQuantity] = useState<number>(initialQuantity || minQty);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerTelegram, setCustomerTelegram] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [telegramWarning, setTelegramWarning] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  // Price calculation
  const subtotal = (product.price || 0) * (quantity || 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('product_name', product.name);
    formData.append('product_slug', product.slug);
    formData.append('quantity', quantity.toString());
    formData.append('unit', unit);
    formData.append('unit_price', product.price.toString());
    formData.append('currency', product.currency || 'USD');

    formData.append('customer_name', customerName);
    formData.append('customer_phone', customerPhone);
    formData.append('customer_email', customerEmail);
    formData.append('customer_telegram', customerTelegram);
    formData.append('delivery_address', deliveryAddress);
    formData.append('notes', notes);

    try {
      const res = await submitOrderAction(formData);
      if (res.success) {
        setOrderSuccess(true);
        if (res.orderId) setOrderId(res.orderId);
        if (res.warning) setTelegramWarning(res.warning);
      } else {
        setErrorMessage(res.error || 'Failed to place order. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOrderSuccess(false);
    setErrorMessage(null);
    setTelegramWarning(null);
    onClose();
  };

  const mainImageUrl = (product as any).product_images?.[0]?.image_url || null;

  return (
    <Modal isOpen={isOpen} onClose={handleReset} title="🛒 Place Order (Direct to Factory)">
      {orderSuccess ? (
        <div className="py-6 px-2 text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-inner">
            ✓
          </div>
          <div>
            <h3 className="text-2xl font-bold text-alibaba-dark">Order Submitted!</h3>
            <p className="text-sm text-gray-500 mt-1">
              Order Reference: <strong className="font-mono text-alibaba-dark">{orderId}</strong>
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-left max-w-md mx-auto text-sm space-y-1.5 text-gray-800">
            <p className="font-semibold text-brand-orange flex items-center gap-1.5">
              <span>✈️ Forwarded to Telegram Channel</span>
            </p>
            <p className="text-xs text-gray-600">
              Our factory sales representatives will contact you shortly via <strong>{customerPhone}</strong> to confirm shipping specs, proforma invoice, and payment terms.
            </p>
            {telegramWarning && (
              <p className="text-[11px] text-amber-700 bg-amber-100/60 p-2 rounded mt-2 border border-amber-300">
                ℹ️ Note: {telegramWarning}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-8 py-2.5 bg-brand-orange hover:bg-[#b53600] text-white rounded-full font-bold text-sm shadow transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {errorMessage && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
              {errorMessage}
            </div>
          )}

          {/* Product Overview Card */}
          <div className="bg-[#f8f8f8] border border-[#e5e5e5] rounded-lg p-3.5 flex items-center gap-3.5">
            {mainImageUrl ? (
              <div className="relative w-16 h-16 rounded bg-white border border-[#ddd] overflow-hidden flex-shrink-0">
                <Image
                  src={mainImageUrl}
                  alt={product.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center text-xs text-gray-500 flex-shrink-0">
                Item
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-alibaba-dark line-clamp-1" title={product.name}>
                {product.name}
              </h4>
              <div className="flex items-center gap-3 mt-1 text-xs">
                <span className="font-bold text-brand-orange text-sm">
                  {formatPrice(product.price, product.currency)} / {unit}
                </span>
                <span className="text-gray-500">
                  Min Order: {product.min_order_quantity} {unit}
                </span>
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. David Miller"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone Number / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. +1 555 123 4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Telegram Username (optional)
                </label>
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden focus-within:border-brand-orange">
                  <span className="bg-gray-100 text-gray-500 text-xs px-2.5 py-2 border-r border-gray-300">@</span>
                  <input
                    type="text"
                    value={customerTelegram}
                    onChange={(e) => setCustomerTelegram(e.target.value.replace(/^@/, ''))}
                    placeholder="username"
                    className="flex-1 px-3 py-2 text-sm outline-none bg-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address (optional)
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Order Quantity ({unit}) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-brand-orange font-semibold"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Delivery Destination / Port / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. Port of Djibouti / Houston Port / Warehouse Address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Order Notes / Specifications (optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specific wire diameter, ASTM standards, reel weight, CIF/FOB delivery terms..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-brand-orange resize-none"
              />
            </div>
          </div>

          {/* Subtotal Summary Footer */}
          <div className="pt-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 bg-gray-50 p-3 rounded-lg">
            <div>
              <div className="text-xs text-gray-500">Estimated Total:</div>
              <div className="text-xl font-black text-brand-orange">
                {formatPrice(subtotal, product.currency)}
              </div>
              <div className="text-[11px] text-gray-400">
                {quantity} {unit} @ {formatPrice(product.price, product.currency)} / {unit}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-full text-xs font-semibold text-gray-700 hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-brand-orange hover:bg-[#b53600] active:scale-95 text-white rounded-full text-sm font-bold shadow-sm transition-all disabled:opacity-50 flex items-center gap-1.5"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <span>Sending to Telegram...</span>
                  </>
                ) : (
                  <span>Submit Order 🚀</span>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
}
