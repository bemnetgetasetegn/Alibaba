'use client';

import { useState } from 'react';
import { Product } from '@/types/database';
import { formatPrice } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { OrderModal } from '@/components/public/OrderModal';

interface RightPanelProps {
  product: Product;
}

export function RightPanel({ product }: RightPanelProps) {
  const [orderOpen, setOrderOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(product.min_order_quantity || 1);

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryOpen(false);
      setMessage('');
    }, 2000);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-[0_0_8px_0_rgba(0,0,0,0.06)] border border-[#e6e7eb] p-5">
        {/* Shipping Section */}
        <div className="border-b border-[#ddd] pb-4 mb-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-[16px] font-semibold text-alibaba-dark">Shipping</h3>
            <button 
              type="button"
              onClick={() => alert(`Shipping options for ${product.name}: Standard Sea Freight (15-30 days), Air Express (5-8 days). Please contact supplier for exact quotes.`)} 
              className="text-[#222] text-[14px] hover:underline flex items-center gap-1 font-normal"
            >
              Change &gt;
            </button>
          </div>
          <p className="text-[14px] text-alibaba-secondary">
            {product.shipping_info || 'FOB, CIF, CFR available. Select destination for quotes.'}
          </p>
        </div>

        {/* Settlement Section */}
        <div className="border-b border-[#e6e7eb] pb-4 mb-4 space-y-2 text-[14px]">
          <div className="flex justify-between text-alibaba-secondary">
            <span>Item subtotal</span>
            <span>{formatPrice(product.price, product.currency)}</span>
          </div>
          <div className="flex justify-between text-alibaba-secondary">
            <span>Shipping total</span>
            <span>To be negotiated</span>
          </div>
          <div className="flex justify-between font-bold text-alibaba-dark text-[16px] pt-2">
            <span>Subtotal</span>
            <span>{formatPrice(product.price, product.currency)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 mb-6">
          <button 
            type="button" 
            onClick={() => setOrderOpen(true)}
            className="h-12 w-full rounded-full bg-[#D64000] text-white font-bold text-[16px] hover:bg-[#C03800] active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Order now</span>
            <span className="text-white/80 font-normal">→</span>
          </button>
          
          <div className="grid grid-cols-2 gap-2">
            <button 
              type="button" 
              onClick={() => setInquiryOpen(true)}
              className="h-11 rounded-full border border-brand-orange bg-orange-50/50 text-brand-orange font-bold text-[14px] hover:bg-orange-100/60 transition-colors flex items-center justify-center cursor-pointer"
            >
              Send inquiry
            </button>
            <button 
              type="button" 
              onClick={() => setChatOpen(true)}
              className="h-11 rounded-full border border-[#222] bg-white text-[#222] font-bold text-[14px] hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer"
            >
              Chat now
            </button>
          </div>
        </div>

        {/* Payment Section */}
        <div>
          <h4 className="text-[14px] font-semibold text-alibaba-dark mb-2">Payment &amp; financing</h4>
          <p className="text-[12px] text-alibaba-secondary mb-3">Buy now, pay later options available</p>
          <div className="flex gap-2 flex-wrap items-center">
            <span className="px-2 py-1 bg-[#f0f0f0] rounded border border-[#ddd] text-[11px] font-bold text-blue-900">VISA</span>
            <span className="px-2 py-1 bg-[#f0f0f0] rounded border border-[#ddd] text-[11px] font-bold text-red-600">MasterCard</span>
            <span className="px-2 py-1 bg-[#f0f0f0] rounded border border-[#ddd] text-[11px] font-bold text-blue-500">PayPal</span>
            <span className="px-2 py-1 bg-[#f0f0f0] rounded border border-[#ddd] text-[11px] font-bold text-gray-800">T/T Wire</span>
          </div>
        </div>
      </div>

      {/* Order Now Modal */}
      <OrderModal
        isOpen={orderOpen}
        onClose={() => setOrderOpen(false)}
        product={product}
        initialQuantity={quantity}
      />

      {/* Inquiry Modal */}
      <Modal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} title="Send Inquiry to Supplier">
        {inquirySent ? (
          <div className="p-6 text-center">
            <div className="text-4xl text-green-500 mb-2">✓</div>
            <h4 className="text-lg font-bold text-[#222] mb-1">Inquiry Sent Successfully!</h4>
            <p className="text-sm text-gray-600">The supplier ({product.seller_name || 'Verified Supplier'}) has received your inquiry and will respond shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSendInquiry} className="space-y-4 p-2">
            <div>
              <p className="text-xs text-gray-500 mb-1">Product</p>
              <p className="text-sm font-semibold text-[#222] line-clamp-2">{product.name}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Quantity ({product.min_order_unit})</label>
                <input 
                  type="number" 
                  min={product.min_order_quantity || 1}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Target Price ({product.currency})</label>
                <input 
                  type="number" 
                  step="0.01" 
                  defaultValue={product.price} 
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Message</label>
              <textarea 
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail your requirements including specifications, packaging, delivery destination..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button 
                type="button" 
                onClick={() => setInquiryOpen(false)} 
                className="px-4 py-2 border rounded-full text-sm font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2 bg-[#D64000] text-white rounded-full text-sm font-semibold hover:bg-[#C03800]"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Chat Modal */}
      <Modal isOpen={chatOpen} onClose={() => setChatOpen(false)} title={`Chat with ${product.seller_name || 'Supplier'}`}>
        <div className="p-4 space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg border text-xs text-gray-600">
            <span className="font-semibold text-green-600">● Online</span> · Average response time: {product.seller_response_time || '≤1h'}
          </div>
          <div className="border rounded-lg p-3 h-48 overflow-y-auto space-y-2 bg-[#fafafa]">
            <div className="bg-white p-2.5 rounded-lg border text-xs max-w-[80%] shadow-sm">
              <p className="font-semibold text-gray-800 mb-1">{product.seller_name || 'Supplier'}:</p>
              <p className="text-gray-700">Hello! Thank you for your interest in "{product.name}". How can we assist you today with pricing, samples, or specifications?</p>
            </div>
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:border-[#D64000]"
            />
            <button 
              type="button"
              onClick={() => alert('Message sent to supplier agent!')}
              className="px-4 py-2 bg-[#D64000] text-white rounded-lg text-sm font-semibold hover:bg-[#C03800]"
            >
              Send
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
