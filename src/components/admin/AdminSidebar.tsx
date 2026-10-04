'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAction } from '@/app/actions/auth'
import { cn } from '@/lib/utils'

export function AdminSidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname()

  const links = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/products', label: 'Products', icon: '📦' },
    { href: '/admin/products/new', label: 'Add Product', icon: '➕' },
  ]

  return (
    <>
      <div 
        className={cn("fixed inset-0 bg-black/50 z-40 lg:hidden", isOpen ? "block" : "hidden")} 
        onClick={() => setIsOpen(false)}
      />
      <div className={cn(
        "fixed top-0 left-0 h-screen w-64 bg-white border-r border-[#ddd] z-50 transform transition-transform duration-200 ease-in-out lg:translate-x-0 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-center border-b border-[#ddd]">
          <h1 className="text-xl font-black text-[#222]">
            Weixin<span className="text-brand-orange">Steel</span> <span className="bg-[#D64000] text-white text-[11px] font-bold px-2 py-0.5 rounded ml-1">Admin</span>
          </h1>
        </div>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href || (pathname.startsWith('/admin/products') && link.href === '/admin/products' && pathname !== '/admin/products/new')
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center px-6 py-3 text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-[#D64000]/10 text-[#D64000] border-l-2 border-[#D64000]" 
                        : "text-[#222] hover:bg-gray-50 hover:text-[#D64000] border-l-2 border-transparent"
                    )}
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-[#ddd]">
          <button 
            onClick={() => logoutAction()}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <span className="mr-3">🚪</span>
            Logout
          </button>
        </div>
      </div>
    </>
  )
}
