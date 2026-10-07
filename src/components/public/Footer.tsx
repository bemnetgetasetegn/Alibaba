import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[#f5f5f5] border-t border-[#ddd] mt-12">
      {/* Tier 1 */}
      <div className="max-w-[1440px] mx-auto px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-[16px] font-bold text-alibaba-dark mb-4">Customer Support</h3>
            <ul className="space-y-2 text-[14px] text-alibaba-secondary">
              <li><Link href="#" className="hover:text-brand-orange">Help Center</Link></li>
              <li><Link href="#" className="hover:text-brand-orange">Report Abuse</Link></li>
              <li><Link href="#" className="hover:text-brand-orange">Submit a Dispute</Link></li>
              <li><Link href="#" className="hover:text-brand-orange">Policies & Rules</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-alibaba-dark mb-4">About Us</h3>
            <ul className="space-y-2 text-[14px] text-alibaba-secondary">
              <li><Link href="#" className="hover:text-brand-orange">About 2Emaeket</Link></li>
              <li><Link href="#" className="hover:text-brand-orange">About Our Factory</Link></li>
              <li><Link href="#" className="hover:text-brand-orange">Sitemap</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-alibaba-dark mb-4">Trade Services</h3>
            <ul className="space-y-2 text-[14px] text-alibaba-secondary">
              <li><Link href="#" className="hover:text-brand-orange">Trade Assurance</Link></li>
              <li><Link href="#" className="hover:text-brand-orange">Business Identity</Link></li>
              <li><Link href="#" className="hover:text-brand-orange">Logistics Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-alibaba-dark mb-4">Categories</h3>
            <ul className="space-y-2 text-[14px] text-alibaba-secondary">
              <li><Link href="#" className="hover:text-brand-orange">PC Strand & Wire</Link></li>
              <li><Link href="#" className="hover:text-brand-orange">Prestressed Steel</Link></li>
              <li><Link href="#" className="hover:text-brand-orange">Concrete Reinforcement</Link></li>
              <li><Link href="#" className="hover:text-brand-orange">Industrial Hardware</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tier 2 */}
      <div className="bg-[#e8e8e8] py-4">
        <div className="max-w-[1440px] mx-auto px-10 text-center flex flex-col md:flex-row items-center justify-between text-[14px] text-alibaba-secondary">
          <p>&copy; {new Date().getFullYear()} 2Emaeket. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="#" className="hover:text-brand-orange">Terms of Use</Link>
            <Link href="#" className="hover:text-brand-orange">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
