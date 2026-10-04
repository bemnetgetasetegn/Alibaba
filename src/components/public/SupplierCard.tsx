'use client';

import { Product } from '@/types/database';
import { useState } from 'react';
import Image from 'next/image';

interface SupplierCardProps {
  product: Product;
}

export function SupplierCard({ product }: SupplierCardProps) {
  const sellerName = product.seller_name || 'Hebei Victory Metal Product Co., Ltd.';
  const sellerLocation = product.seller_location || 'Hebei, China';
  const sellerYears = product.seller_years || 18;
  const responseTime = product.seller_response_time || '≤1h';
  const ontimeRate = product.seller_ontime_rate || '≥100%';
  const description = product.seller_description;
  const images = product.seller_images && product.seller_images.length > 0 ? product.seller_images : [];

  const [activeImg, setActiveImg] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false);

  // Short desc is first 240 chars
  const SHORT_LIMIT = 240;
  const isLong = description && description.length > SHORT_LIMIT;
  const visibleDesc = description
    ? descExpanded || !isLong
      ? description
      : description.substring(0, SHORT_LIMIT) + '…'
    : null;

  return (
    <div className="bg-[#f8f8f8] rounded-lg overflow-hidden border border-[#ddd]">
      {/* ── Header: logo + name + location */}
      <div className="p-4 border-b border-[#ddd]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded bg-white border border-[#ddd] flex items-center justify-center text-brand-orange font-bold text-lg flex-shrink-0">
            {sellerName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <h3
              className="text-[14px] font-semibold text-alibaba-dark underline truncate mb-1"
              title={sellerName}
            >
              {sellerName}
            </h3>
            <div className="flex items-center gap-2 text-[12px] text-alibaba-dark">
              <span>📍 {sellerLocation}</span>
              <span className="bg-[#ffe4d6] text-brand-orange px-1.5 rounded text-[10px] font-bold">
                {sellerYears} YRS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats row */}
      <div className="px-4 py-3 border-b border-[#ddd]">
        <div className="bg-white/80 rounded-lg p-3 grid grid-cols-2 gap-4">
          <div>
            <div className="text-[12px] text-alibaba-secondary">Response Time</div>
            <div className="text-[14px] font-bold text-alibaba-dark">{responseTime}</div>
          </div>
          <div>
            <div className="text-[12px] text-alibaba-secondary">On-time dispatch rate</div>
            <div className="text-[14px] font-bold text-alibaba-dark">{ontimeRate}</div>
          </div>
        </div>
      </div>

      {/* ── Company Images gallery */}
      {images.length > 0 && (
        <div className="p-4 border-b border-[#ddd]">
          <div className="text-[12px] font-semibold text-alibaba-secondary uppercase tracking-wide mb-2">
            Company Photos
          </div>
          {/* Main image */}
          <div className="relative w-full aspect-video rounded overflow-hidden bg-white border border-[#eee] mb-2">
            <Image
              src={images[activeImg]}
              alt={`${sellerName} — photo ${activeImg + 1}`}
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 flex-wrap">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(idx)}
                  className={`relative w-14 h-14 rounded overflow-hidden border-2 transition-colors flex-shrink-0 ${
                    idx === activeImg
                      ? 'border-brand-orange'
                      : 'border-[#ddd] hover:border-[#aaa]'
                  }`}
                  aria-label={`View company photo ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${sellerName} thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Company Description */}
      {description && (
        <div className="p-4">
          <div className="text-[12px] font-semibold text-alibaba-secondary uppercase tracking-wide mb-2">
            About the Supplier
          </div>
          <p className="text-[13px] text-alibaba-dark leading-[1.65] whitespace-pre-line">
            {visibleDesc}
          </p>
          {isLong && (
            <button
              onClick={() => setDescExpanded((v) => !v)}
              className="mt-2 text-[12px] text-brand-orange hover:underline font-medium"
            >
              {descExpanded ? 'Show less ▲' : 'Read more ▼'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
