import { PriceTier } from '@/types/database';
import { formatPrice } from '@/lib/utils';

interface ProductPriceProps {
  price: number;
  originalPrice?: number | null;
  priceTiers: PriceTier[];
  currency?: string;
  unit?: string;
}

export function ProductPrice({ price, originalPrice, priceTiers, currency = 'USD', unit = 'pieces' }: ProductPriceProps) {
  if (priceTiers && priceTiers.length > 0) {
    return (
      <div className="flex items-center gap-x-6 py-4">
        {priceTiers.map((tier) => (
          <div key={tier.id} className="flex flex-col">
            <span className="text-[26px] font-bold text-alibaba-dark">
              {formatPrice(tier.price, currency)}
            </span>
            <span className="text-[14px] text-[#666]">
              {tier.min_quantity}{tier.max_quantity ? ` - ${tier.max_quantity}` : '+'} {unit}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="flex items-end gap-2">
        <span className="text-[26px] font-bold text-alibaba-dark">
          {formatPrice(price, currency)}
        </span>
        <span className="text-[14px] text-[#666] mb-1">
          / {unit}
        </span>
        {originalPrice && (
          <span className="text-[14px] text-[#999] line-through mb-1.5">
            {formatPrice(originalPrice, currency)}
          </span>
        )}
      </div>
    </div>
  );
}
