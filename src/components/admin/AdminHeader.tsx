'use client'

import React from 'react'

interface AdminHeaderProps {
  title: string
  email?: string
  onMenuClick: () => void
}

export function AdminHeader({ title, email, onMenuClick }: AdminHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-[#ddd] flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className="mr-4 lg:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#D64000]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold text-[#222] hidden sm:block">{title}</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        {email && <span className="text-sm text-gray-600 hidden sm:block">{email}</span>}
        <div className="h-8 w-8 rounded-full bg-[#D64000] text-white flex items-center justify-center font-bold text-sm">
          {email ? email.charAt(0).toUpperCase() : 'A'}
        </div>
      </div>
    </header>
  )
}
