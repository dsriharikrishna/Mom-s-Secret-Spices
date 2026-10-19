import Link from 'next/link';
import { BRAND_PHONE_DISPLAY, BRAND_EMAIL } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-[#39251E] text-[#FFF8EE] pt-20 pb-12 border-t border-[#FFF8EE]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#FFF8EE]/10">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rotate-45 bg-[#E8A33A]"></span>
                <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[#FFF8EE]">
                  MOM’S SECRET SPICES
                </span>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#E8A33A] mb-4">
                Crafted by Akshaya Foods · Bengaluru, India
              </p>
              <p className="text-sm text-[#FFF8EE]/70 max-w-sm leading-relaxed mb-6">
                Authentic artisanal Indian spice blends freshly stone-ground and curated for everyday culinary magic. Free from synthetic additives, preservatives, and artificial food colorants.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#FFF8EE]/5 border border-[#FFF8EE]/10 max-w-sm">
              <span className="font-mono text-xs text-[#E8A33A] uppercase tracking-wider block mb-1">
                Direct WhatsApp Ordering
              </span>
              <p className="text-sm font-semibold">{BRAND_PHONE_DISPLAY}</p>
              <span className="text-xs text-[#FFF8EE]/50 block mt-1">Available 9:00 AM – 8:00 PM IST</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#E8A33A] mb-6">
              Navigation
            </h3>
            <ul className="space-y-3 font-serif text-lg text-[#FFF8EE]/80">
              <li>
                <Link href="/" className="hover:text-[#E8A33A] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#E8A33A] transition-colors">
                  Spice Collection (27)
                </Link>
              </li>
              <li>
                <Link href="/experience" className="hover:text-[#E8A33A] transition-colors">
                  Culinary Experience
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#E8A33A] transition-colors">
                  Stone-Milling Craft
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#E8A33A] transition-colors">
                  Wholesale & HoReCa
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#E8A33A] mb-6">
              The Four Collections
            </h3>
            <ul className="space-y-3 text-sm text-[#FFF8EE]/70">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33A] mt-1.5 shrink-0"></span>
                <span><strong>Pure Spices:</strong> High-curcumin Turmeric, stemless Guntur Chilli, roasted Coriander.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A9472A] mt-1.5 shrink-0"></span>
                <span><strong>Signature Masala:</strong> 14-Spice Royal Garam Masala, Hyderabadi Dum Biryani, Chicken Kabab.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#496844] mt-1.5 shrink-0"></span>
                <span><strong>Regional Heirlooms:</strong> Mysore Bisi Bele Bath, Traditional Sambar, Gunpowder Chutney Podi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F6BE68] mt-1.5 shrink-0"></span>
                <span><strong>Gourmet Seasonings:</strong> Magic Masala All-in-One, Chilli Garlic Fire, Jal Jeera Refresher.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Agrumea-inspired subtle typography */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-[#FFF8EE]/50">
          <div className="flex items-center gap-4">
            <span>© 2026 Akshaya Foods. All Rights Reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span>Food License & Agmark Certified</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#FFF8EE] transition-colors underline">
              Privacy Policy
            </Link>
            <a href={`mailto:${BRAND_EMAIL}`} className="hover:text-[#FFF8EE] transition-colors">
              {BRAND_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
