'use client';

import { useState } from 'react';

interface QuantityPickerProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (val: number) => void;
}

export function QuantityPicker({ min = 1, max, value: controlledValue, onChange }: QuantityPickerProps) {
  const [internalValue, setInternalValue] = useState(min);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const updateValue = (newVal: number) => {
    if (!isControlled) {
      setInternalValue(newVal);
    }
    onChange?.(newVal);
  };

  const handleDecrement = () => {
    if (value > min) {
      updateValue(value - 1);
    }
  };

  const handleIncrement = () => {
    if (max === undefined || value < max) {
      updateValue(value + 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (val < min) updateValue(min);
      else if (max !== undefined && val > max) updateValue(max);
      else updateValue(val);
    }
  };

  return (
    <div className="flex items-center w-[120px] border border-[#ccc] rounded-full overflow-hidden">
      <button 
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="w-8 h-8 flex items-center justify-center text-alibaba-dark hover:bg-brand-orange hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-alibaba-dark"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
      </button>
      <input 
        type="text" 
        value={value}
        onChange={handleChange}
        className="flex-1 w-12 text-center text-[14px] outline-none text-alibaba-dark border-x border-[#ccc]"
      />
      <button 
        type="button"
        onClick={handleIncrement}
        disabled={max !== undefined && value >= max}
        className="w-8 h-8 flex items-center justify-center text-alibaba-dark hover:bg-brand-orange hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-alibaba-dark"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
      </button>
    </div>
  );
}
