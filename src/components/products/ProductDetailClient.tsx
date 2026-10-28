'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, MessageCircle, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';
import { buildWhatsAppOrderUrl } from '@/lib/whatsapp';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customerNote, setCustomerNote] = useState('');

  const currentPack = product.packs[selectedPackIndex] || product.packs[0];
  const unitPrice = currentPack?.price || 0;
  const totalPrice = unitPrice * quantity;

  // WhatsApp Order Link
  const orderUrl = buildWhatsAppOrderUrl({
    productName: product.name,
    packSize: currentPack?.size || '100g',
    quantity,
    unitPrice,
    customerNote,
  });

  // Related products
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="pt-28 pb-20 px-6 md:px-12 bg-[#FFF8EE] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Back Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#39251E]/60 hover:text-[#A9472A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Spices</span>
          </Link>
        </div>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Authentic Packshot Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white shadow-2xl border border-[#39251E]/10 p-6 flex items-center justify-center">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Floating Quality Seal */}
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase bg-[#A9472A] text-[#FFF8EE] shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-[#E8A33A]" />
                  <span>Authentic Recipe</span>
                </span>
              </div>
            </div>

            {/* Symmetrical Supporting Pillars (Agrumea-Style) */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-2xl bg-[#F0E2CF]/60 border border-[#39251E]/10">
                <span className="font-mono text-[10px] uppercase text-[#A9472A] tracking-wider block mb-1">
                  Regional Origin
                </span>
                <p className="text-xs font-medium text-[#39251E] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-[#A9472A]" />
                  <span>{product.regionalOrigin}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F0E2CF]/60 border border-[#39251E]/10">
                <span className="font-mono text-[10px] uppercase text-[#A9472A] tracking-wider block mb-1">
                  Purity Guarantee
                </span>
                <p className="text-xs font-medium text-[#39251E] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#496844]" />
                  <span>{product.purityBadge}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing, Pack Selectors & WhatsApp Conversion */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              {/* Category & Native Name */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#A9472A] font-bold">
                  {product.categoryLabel}
                </span>
                {product.nativeName && (
                  <span className="text-xs font-mono text-[#39251E]/50">
                    ({product.nativeName})
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#39251E] tracking-tight mb-3">
                {product.name}
              </h1>
              <p className="text-base text-[#A9472A] font-serif italic mb-6">
                &ldquo;{product.tagline}&rdquo;
              </p>

              <p className="text-sm sm:text-base text-[#39251E]/80 leading-relaxed font-normal mb-8">
                {product.description}
              </p>

              {/* Pack Size Selectors */}
              <div className="space-y-3 mb-8">
                <span className="block font-mono text-xs uppercase tracking-wider text-[#39251E]/70 font-bold">
                  Select Pack Size:
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {product.packs.map((pack, idx) => (
                    <button
                      key={pack.size}
                      onClick={() => setSelectedPackIndex(idx)}
                      className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                        selectedPackIndex === idx
                          ? 'bg-[#A9472A] text-[#FFF8EE] border-[#A9472A] shadow-md scale-102'
                          : 'bg-white text-[#39251E] border-[#39251E]/20 hover:border-[#A9472A]'
                      }`}
                    >
                      {pack.size} — ₹{pack.price}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Price Calculation */}
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-[#F0E2CF]/50 border border-[#39251E]/10 mb-8">
                <div>
                  <span className="font-mono text-xs uppercase text-[#39251E]/60 block mb-1">
                    Quantity
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-full border border-[#39251E]/20 bg-white font-mono font-bold hover:bg-[#A9472A] hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <span className="font-mono text-base font-bold w-6 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-full border border-[#39251E]/20 bg-white font-mono font-bold hover:bg-[#A9472A] hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="h-10 w-px bg-[#39251E]/15" />

                <div>
                  <span className="font-mono text-xs uppercase text-[#39251E]/60 block mb-1">
                    Estimated Total
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#A9472A]">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>

              {/* Optional Customer Note Input */}
              <div className="mb-6">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#39251E]/60 mb-1.5">
                  Optional Delivery or Note for WhatsApp:
                </label>
                <input
                  type="text"
                  placeholder="e.g., Deliver to Indiranagar, Bengaluru or Extra Spicy"
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#39251E]/20 text-xs font-mono focus:outline-hidden focus:border-[#A9472A] text-[#39251E]"
                />
              </div>

              {/* Prominent WhatsApp Ordering CTA Button */}
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#496844] hover:bg-[#39251E] text-[#FFF8EE] font-mono text-sm uppercase tracking-widest font-bold transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-98"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Order via WhatsApp (₹{totalPrice})</span>
              </a>
              <span className="block text-[11px] font-mono text-[#39251E]/50 text-center mt-2">
                Clicking opens WhatsApp directly with your prefilled order items.
              </span>
            </div>

            {/* Documented Ingredients Tag Cloud */}
            <div className="pt-6 border-t border-[#39251E]/10">
              <span className="block font-mono text-xs uppercase tracking-widest text-[#39251E]/70 font-bold mb-3">
                Crafted With These Authentic Ingredients:
              </span>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#FFF8EE] border border-[#39251E]/15 text-[#39251E]"
                  >
                    <Check className="w-3 h-3 text-[#496844]" />
                    <span>{ing}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Spices Carousel */}
        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#39251E]/10">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#39251E] uppercase tracking-tight mb-8">
              Explore Sibling Formulations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="group p-4 rounded-2xl bg-[#FAF1E4] border border-[#39251E]/10 hover:border-[#A9472A] transition-colors"
                >
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white mb-3">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#39251E] group-hover:text-[#A9472A]">
                    {rel.name}
                  </h4>
                  <span className="font-mono text-xs text-[#A9472A] block mt-1">
                    from ₹{rel.packs[0]?.price}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
