'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types/database';
import { cn } from '@/lib/utils';
import { Modal } from '../ui/Modal';

interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ backgroundPosition: '0% 0%' });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);

  const activeImage = images[activeIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainImageRef.current) return;
    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ backgroundPosition: `${x}% ${y}%` });
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images || images.length === 0) {
    return <div className="w-full aspect-square bg-alibaba-surface rounded-lg flex items-center justify-center text-alibaba-muted">No images</div>;
  }

  return (
    <div className="relative w-full">
      <div className="flex flex-col md:flex-row gap-4">
        {/* LEFT: Thumbnails */}
        <div className="hidden md:flex flex-col gap-[12px] w-[70px]">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className={cn(
                "relative w-[64px] h-[64px] border-2 cursor-pointer rounded-md overflow-hidden",
                activeIndex === idx ? "border-brand-orange" : "border-transparent hover:border-brand-orange"
              )}
              onMouseEnter={() => setActiveIndex(idx)}
            >
              <Image src={img.image_url} alt={img.alt_text || "Product thumbnail"} fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* RIGHT: Main Image */}
        <div 
          className="relative flex-1 aspect-square bg-alibaba-surface border border-alibaba-border rounded-lg overflow-hidden group md:ml-[12px]"
          ref={mainImageRef}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsLightboxOpen(true)}
        >
          {activeImage && (
            <Image 
              src={activeImage.image_url} 
              alt={activeImage.alt_text || "Product image"} 
              fill 
              className="object-contain cursor-crosshair" 
            />
          )}

          {/* Overlaid prev/next buttons (hidden on mobile, shown on hover in desktop) */}
          <button 
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            onClick={prevImage}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            onClick={nextImage}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          {/* Zoom Panel */}
          {isZoomed && activeImage && (
            <div className="absolute top-0 right-[-420px] w-[400px] h-[400px] bg-white border border-alibaba-border shadow-lg z-50 overflow-hidden hidden lg:block">
              <div 
                className="w-full h-full bg-no-repeat"
                style={{
                  backgroundImage: `url(${activeImage.image_url})`,
                  backgroundSize: '250%',
                  ...zoomStyle
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile thumbnails (horizontal) */}
      <div className="flex md:hidden gap-2 mt-4 overflow-x-auto pb-2">
        {images.map((img, idx) => (
          <div
            key={img.id}
            className={cn(
              "relative w-[64px] h-[64px] flex-shrink-0 border-2 rounded-md overflow-hidden",
              activeIndex === idx ? "border-brand-orange" : "border-transparent"
            )}
            onClick={() => setActiveIndex(idx)}
          >
            <Image src={img.image_url} alt={img.alt_text || "Product thumbnail"} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Modal isOpen={isLightboxOpen} onClose={() => setIsLightboxOpen(false)}>
        <div className="relative w-full h-[70vh] flex items-center justify-center bg-black/5 rounded-lg">
          {activeImage && (
            <Image 
              src={activeImage.image_url} 
              alt={activeImage.alt_text || "Product image"} 
              fill 
              className="object-contain" 
            />
          )}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            onClick={prevImage}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            onClick={nextImage}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </Modal>
    </div>
  );
}
