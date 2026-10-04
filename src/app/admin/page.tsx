import { getProductCount, getProducts } from '@/lib/data/products'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

export default async function AdminDashboard() {
  const productCount = await getProductCount()
  const recentProducts = await getProducts(5, 0)
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#ddd] flex items-center">
          <div className="p-4 bg-orange-100 rounded-full mr-4">
            <span className="text-2xl">📦</span>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Products</p>
            <p className="text-2xl font-bold text-[#222]">{productCount}</p>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <Link href="/admin/products/new" className="bg-[#D64000] hover:bg-[#C03800] text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Add New Product
        </Link>
        <Link href="/" target="_blank" className="bg-white border border-[#ddd] hover:bg-gray-50 text-[#222] px-4 py-2 rounded-lg font-medium transition-colors">
          View Store
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-[#ddd] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#ddd]">
          <h3 className="font-semibold text-[#222]">Recent Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-[#ddd]">
                <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ddd]">
              {recentProducts.length > 0 ? (
                recentProducts.map(product => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-[#222]">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#222] font-semibold">{formatPrice(product.price, product.currency)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {product.availability || 'Active'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                    No products found. Add your first product!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-[#ddd] bg-gray-50 text-right">
          <Link href="/admin/products" className="text-[#D64000] hover:text-[#C03800] text-sm font-medium">
            View all products &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
