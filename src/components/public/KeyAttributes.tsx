import { ProductSpecification } from '@/types/database';

interface KeyAttributesProps {
  specs: ProductSpecification[];
  variant: 'compact' | 'full';
}

export function KeyAttributes({ specs, variant }: KeyAttributesProps) {
  if (!specs || specs.length === 0) return null;

  if (variant === 'compact') {
    const compactSpecs = specs.slice(0, 6);
    return (
      <div className="bg-[#f8f8f8] rounded-lg p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 relative">
        {compactSpecs.map((spec, index) => (
          <div key={spec.id || index} className="flex flex-col px-4 relative">
            {index % 3 !== 0 && (
              <div className="hidden md:block absolute left-0 top-1 bottom-1 w-[1px] bg-[#ddd]" />
            )}
            <span className="text-[14px] text-alibaba-dark truncate" title={spec.spec_name}>{spec.spec_name}</span>
            <span className="text-[16px] font-semibold text-alibaba-dark truncate mt-1" title={spec.spec_value}>{spec.spec_value}</span>
          </div>
        ))}
      </div>
    );
  }

  // Full variant
  const groupedSpecs = specs.reduce((acc, spec) => {
    const group = spec.spec_group || 'General';
    if (!acc[group]) acc[group] = [];
    acc[group].push(spec);
    return acc;
  }, {} as Record<string, ProductSpecification[]>);

  return (
    <div className="w-full">
      <div className="space-y-6">
        {Object.entries(groupedSpecs).map(([group, groupSpecs]) => (
          <div key={group} className="border border-[#ddd] rounded-lg overflow-hidden">
            {group !== 'General' && (
              <div className="bg-[#f8f8f8] p-4 border-b border-[#ddd]">
                <h3 className="text-[16px] font-bold text-alibaba-dark">{group}</h3>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {groupSpecs.map((spec, idx) => (
                <div key={spec.id || idx} className="flex border-b border-[#ddd] md:even:border-l">
                  <div className="w-2/5 bg-[#f8f8f8] p-4 text-[14px] text-alibaba-secondary border-r border-[#ddd] flex items-center break-words">
                    {spec.spec_name}
                  </div>
                  <div className="w-3/5 bg-white p-4 text-[14px] text-alibaba-dark flex items-center break-words font-medium">
                    {spec.spec_value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
