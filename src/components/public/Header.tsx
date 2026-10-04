'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [mobileQuery, setMobileQuery] = useState('');

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* Top utility bar — desktop only */}
      <div className="h-[32px] bg-[#f5f5f5] border-b border-[#ddd] hidden md:block">
        <div className="max-w-[1580px] mx-auto px-10 h-full flex items-center justify-between text-[12px] text-alibaba-secondary">
          <div className="flex items-center gap-2">
            <span>Ship to:</span>
            <span className="font-semibold text-alibaba-dark flex items-center gap-1">
              🇺🇸 US
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-brand-orange transition-colors">Help Center</Link>
            <Link href="#" className="hover:text-brand-orange transition-colors">Become a Supplier</Link>
          </div>
        </div>
      </div>

      {/* ── MOBILE HEADER ── visible only on < md */}
      <div className="md:hidden bg-white border-b border-[#eee] px-2 py-2">
        <div className="flex items-center gap-2">
          {/* Back arrow */}
          <button
            aria-label="Go back"
            onClick={() => window.history.back()}
            className="flex-shrink-0 p-1 text-[#333]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* WeixinSteel logo */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center pr-1"
            aria-label="WeixinSteel Home"
          >
            <span className="text-[17px] font-black tracking-tight text-[#111] leading-none">
              Weixin<span className="text-brand-orange">Steel</span>
            </span>
          </Link>

          {/* Search input */}
          <div className="flex-1 flex items-center bg-[#f5f5f5] rounded-full overflow-hidden border border-[#e0e0e0] min-w-0">
            <input
              type="text"
              value={mobileQuery}
              onChange={(e) => setMobileQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent px-3 py-2 text-[13px] text-alibaba-dark placeholder:text-[#aaa] outline-none min-w-0"
            />
            {/* Camera icon */}
            <button
              aria-label="Search by image"
              className="flex-shrink-0 px-2 text-[#888] hover:text-brand-orange transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          {/* Orange circular search button */}
          <button
            aria-label="Search"
            className="flex-shrink-0 w-9 h-9 bg-brand-orange hover:bg-[#b53600] active:scale-95 transition-all rounded-full flex items-center justify-center shadow-sm"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── DESKTOP HEADER ── */}
      <div className="h-[72px] bg-white border-b border-[#ddd] hidden md:block">
        <div className="max-w-[1580px] mx-auto px-10 h-full flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <span className="text-[26px] font-black tracking-tight text-[#111] group-hover:opacity-95 transition-opacity">
              Weixin<span className="text-brand-orange">Steel</span>
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex flex-1 max-w-3xl">
            <div className="flex w-full border-2 border-brand-orange rounded-full overflow-hidden">
              <select className="bg-alibaba-surface text-alibaba-dark px-4 py-2 border-r border-[#ddd] outline-none text-sm font-medium">
                <option>Products</option>
                <option>Suppliers</option>
              </select>
              <input
                type="text"
                placeholder="What are you looking for..."
                className="flex-1 px-4 py-2 outline-none text-sm text-alibaba-dark"
              />
              <button className="bg-brand-orange text-white px-8 py-2 font-bold text-sm hover:bg-[#b53600] transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6 text-sm flex-shrink-0">
            <div className="flex items-center gap-2">
              <Link href="#" className="hover:text-brand-orange font-semibold text-alibaba-dark">Sign In</Link>
              <span className="text-[#ddd]">|</span>
              <Link href="#" className="text-brand-orange font-semibold hover:underline">Join Free</Link>
            </div>
            <button className="flex flex-col items-center text-alibaba-secondary hover:text-brand-orange transition-colors">
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                <span className="absolute -top-1 -right-2 bg-brand-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  0
                </span>
              </div>
              <span className="text-[12px] mt-1">Cart</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
