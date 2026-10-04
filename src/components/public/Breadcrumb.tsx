import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-[12px] text-[#666] py-3">
      <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <svg className="w-3 h-3 mx-2 text-[#999]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href={item.href} className={`hover:text-brand-orange transition-colors ${index === items.length - 1 ? 'font-semibold text-alibaba-dark' : ''}`}>
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
