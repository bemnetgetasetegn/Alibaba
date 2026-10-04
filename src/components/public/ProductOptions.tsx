'use client';

import { useState } from 'react';
import { ProductOption } from '@/types/database';
import { cn } from '@/lib/utils';

interface ProductOptionsProps {
  options: ProductOption[];
  onChange?: (selectedValues: Record<string, string>) => void;
}

export function ProductOptions({ options, onChange }: ProductOptionsProps) {
  const [selected, setSelected] = useState<Record<string, string>>({});

  const handleSelect = (optionName: string, value: string) => {
    const newSelected = { ...selected, [optionName]: value };
    setSelected(newSelected);
    if (onChange) {
      onChange(newSelected);
    }
  };

  if (!options || options.length === 0) return null;

  return (
    <div className="space-y-4">
      {options.map((option) => {
        const values = Array.isArray(option.option_values) ? (option.option_values as string[]) : [];
        if (values.length === 0) return null;

        return (
          <div key={option.id} className="space-y-2">
            <h4 className="text-[14px] font-semibold text-alibaba-dark">{option.option_name}</h4>
            <div className="flex flex-wrap gap-2">
              {values.map((val) => {
                const isSelected = selected[option.option_name] === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleSelect(option.option_name, val)}
                    className={cn(
                      "h-8 px-3 rounded-md border text-[13px] transition-colors",
                      isSelected 
                        ? "border-brand-orange bg-brand-orange/10 text-brand-orange font-medium" 
                        : "border-[#ddd] text-alibaba-dark hover:border-brand-orange"
                    )}
                  >
                    {val}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
