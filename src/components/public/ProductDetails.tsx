import { ProductWithDetails } from '@/types/database';

interface ProductDetailsProps {
  product: ProductWithDetails;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="w-full mt-12 space-y-12">
      {/* Description */}
      <div className="border-t border-[#ddd] pt-8">
        <h2 className="text-[20px] font-bold text-alibaba-dark mb-6">Product descriptions from the supplier</h2>
        <div className="text-[14px] text-alibaba-dark whitespace-pre-wrap leading-relaxed max-w-4xl">
          {product.description || 'No description provided.'}
        </div>
      </div>

      {/* Lead Time */}
      <div className="border-t border-[#ddd] pt-8">
        <h2 className="text-[20px] font-bold text-alibaba-dark mb-6">Lead time</h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-2xl text-left border-collapse border border-[#ddd]">
            <thead>
              <tr className="bg-[#f8f8f8]">
                <th className="p-3 border border-[#ddd] text-[14px] font-semibold text-alibaba-dark">Quantity ({product.min_order_unit || 'pieces'})</th>
                <th className="p-3 border border-[#ddd] text-[14px] font-semibold text-alibaba-dark">Lead time (days)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border border-[#ddd] text-[14px] text-alibaba-dark">1 - 25</td>
                <td className="p-3 border border-[#ddd] text-[14px] text-alibaba-dark">15</td>
              </tr>
              <tr>
                <td className="p-3 border border-[#ddd] text-[14px] text-alibaba-dark">26 - 100</td>
                <td className="p-3 border border-[#ddd] text-[14px] text-alibaba-dark">30</td>
              </tr>
              <tr>
                <td className="p-3 border border-[#ddd] text-[14px] text-alibaba-dark">&gt; 100</td>
                <td className="p-3 border border-[#ddd] text-[14px] text-alibaba-dark">To be negotiated</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Customization */}
      {product.product_options && product.product_options.length > 0 && (
        <div className="border-t border-[#ddd] pt-8">
          <h2 className="text-[20px] font-bold text-alibaba-dark mb-6">Customization options</h2>
          <ul className="list-disc pl-5 space-y-2 text-[14px] text-alibaba-dark">
            {product.product_options.map((opt) => (
              <li key={opt.id}>Customized {opt.option_name.toLowerCase()} (Min. order: {product.min_order_quantity * 5} {product.min_order_unit})</li>
            ))}
            <li>Customized packaging (Min. order: {product.min_order_quantity * 10} {product.min_order_unit})</li>
            <li>Graphic customization (Min. order: {product.min_order_quantity * 10} {product.min_order_unit})</li>
          </ul>
        </div>
      )}

      {/* Related Searches */}
      <div className="border-t border-[#ddd] pt-8">
        <h2 className="text-[20px] font-bold text-alibaba-dark mb-6">Related searches</h2>
        <div className="flex flex-wrap gap-3">
          {['High tensile steel wire', 'PC strand ASTM BS5896', 'Precast concrete materials', 'Bridge building steel', 'Metal building supplies'].map((tag) => (
            <span 
              key={tag} 
              className="px-4 py-2 border border-[#ddd] rounded-full text-[14px] text-alibaba-secondary hover:text-brand-orange hover:border-brand-orange transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
