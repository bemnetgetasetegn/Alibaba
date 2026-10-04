'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Dashboard';
    if (pathname === '/admin/products') return 'Products';
    if (pathname === '/admin/products/new') return 'Add Product';
    if (pathname.includes('/edit')) return 'Edit Product';
    return 'Admin Panel';
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <AdminHeader 
          title={getPageTitle()} 
          onMenuClick={() => setSidebarOpen(true)} 
        />
        <main className="p-4 sm:p-6 flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
