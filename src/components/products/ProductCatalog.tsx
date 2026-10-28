'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, MessageCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { PRODUCTS, CATEGORIES, ProductCategory } from '@/data/products';
import { buildWhatsAppOrderUrl } from '@/lib/whatsapp';
import { useCartStore } from '@/store/cartStore';

export default function ProductCatalog({ limit }: { limit?: number } = {}) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const { addItem } = useCartStore();

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.regionalOrigin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return (a.packs[0]?.price || 0) - (b.packs[0]?.price || 0);
      }
      if (sortBy === 'price-desc') {
        return (b.packs[0]?.price || 0) - (a.packs[0]?.price || 0);
      }
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // If limit is provided, only show top N items
  const displayedProducts = useMemo(() => {
    return limit ? filteredProducts.slice(0, limit) : filteredProducts;
  }, [filteredProducts, limit]);

  return (
    <section className="py-20 px-6 md:px-12 bg-[#FFF8EE]">
      <div className="max-w-7xl mx-auto">
        {/* Header & Manifesto */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0E2CF] text-[#A9472A] font-mono text-xs uppercase tracking-widest font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E8A33A]" />
            <span>The Artisanal Spice Collection</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#39251E] uppercase tracking-tight mb-4">
            {limit ? 'Featured Spice Pantry' : 'Our Complete Pantry'}
          </h2>
          <p className="text-sm md:text-base text-[#39251E]/75 font-normal leading-relaxed">
            {limit
              ? 'Hand-selected stone-ground single spices and authentic regional heirloom formulations Artisanal Heritage Spices.'
              : 'All 27 authentic spice blends freshly stone-ground Artisanal Heritage Spices. Selected with total integrity, packed with zero synthetic fillers.'}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 pb-6 border-b border-[#39251E]/10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-[#A9472A] text-white shadow-xs'
                  : 'bg-[#39251E]/5 text-[#39251E]/80 hover:bg-[#39251E]/10'
              }`}
            >
              All Blends ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#A9472A] text-white shadow-xs'
                    : 'bg-[#39251E]/5 text-[#39251E]/80 hover:bg-[#39251E]/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input & Sort Menu */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#39251E]/40" />
              <input
                type="text"
                placeholder="Search turmeric, biryani..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#39251E]/15 text-xs font-sans text-[#39251E] focus:outline-hidden focus:border-[#A9472A] placeholder:text-[#39251E]/40 shadow-2xs"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
              className="px-4 py-2 rounded-full bg-white border border-[#39251E]/15 text-xs font-mono text-[#39251E] focus:outline-hidden focus:border-[#A9472A] shadow-2xs cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {displayedProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-[#39251E]/60 mb-2">No spice blends found</p>
            <p className="text-sm font-mono text-[#39251E]/40">
              Try adjusting your search query or selecting &quot;All Blends&quot;.
            </p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {displayedProducts.map((product, index) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, y: 35, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                  transition={{ 
                    duration: 0.5, 
                    delay: Math.min(index * 0.08, 0.4), 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  whileHover={{ 
                    y: -8, 
                    transition: { duration: 0.25, ease: 'easeOut' } 
                  }}
                  className="group flex flex-col justify-between bg-[#FDF8F0] rounded-3xl p-6 border border-[#39251E]/10 hover:border-[#A9472A]/40 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                >
                  {/* Subtle hover gradient glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#A9472A]/[0.02] to-[#E8A33A]/[0.05] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <div className="relative z-10">
                    {/* Top Card Pills */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#FFF8EE] border border-[#39251E]/10 text-[#A9472A] font-semibold">
                        {product.categoryLabel.split(' ')[0]}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#39251E] bg-[#E8A33A]/15 px-2.5 py-0.5 rounded-full">
                        from ₹{product.packs[0]?.price}
                      </span>
                    </div>

                    {/* Image Area with Zoom & Micro-floating */}
                    <Link
                      href={`/products/${product.slug}`}
                      className="block relative aspect-square w-full rounded-2xl overflow-hidden mb-6 flex items-center justify-center "
                    >
                      <motion.div
                        className="relative w-full h-full flex items-center justify-center"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain drop-shadow-[0_15px_22px_rgba(57,37,30,0.22)]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </motion.div>
                    </Link>

                    {/* Product Typography */}
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-serif text-xl font-bold text-[#39251E] group-hover:text-[#A9472A] transition-colors leading-tight mb-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#39251E]/70 line-clamp-2 leading-relaxed mb-4">
                      {product.tagline}
                    </p>
                  </div>

                  {/* Card Bottom: Pack Sizes & Quick WhatsApp Action */}
                  <div className="pt-4 border-t border-[#39251E]/10 relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {product.packs.map((p) => (
                          <span
                            key={p.size}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FFF8EE] border border-[#39251E]/15 text-[#39251E]/80"
                          >
                            {p.size}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Quick Add To Basket Button */}
                        <motion.button
                          whileHover={{ scale: 1.12 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => {
                            addItem({
                              productId: product.id,
                              slug: product.slug,
                              name: product.name,
                              packSize: product.packs[0]?.size || '100g',
                              unitPrice: product.packs[0]?.price || 45,
                              quantity: 1,
                              image: product.image,
                              categoryLabel: product.categoryLabel,
                            });
                          }}
                          aria-label={`Add ${product.name} to basket`}
                          className="w-9 h-9 rounded-full bg-[#39251E] hover:bg-[#A9472A] text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </motion.button>

                        {/* WhatsApp Direct Order Button */}
                        <motion.a
                          whileHover={{ scale: 1.12 }}
                          whileTap={{ scale: 0.92 }}
                          href={buildWhatsAppOrderUrl({
                            productName: product.name,
                            packSize: product.packs[0]?.size || '100g',
                            quantity: 1,
                            unitPrice: product.packs[0]?.price || 45,
                            image: product.image,
                          })}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Order ${product.name} on WhatsApp`}
                          className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
                        >
                          <MessageCircle className="w-4 h-4 fill-current" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View All Products Option Button */}
        {limit && (
          <div className="mt-16 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#A9472A] hover:bg-[#39251E] text-[#FFF8EE] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md hover:shadow-xl active:scale-98 group"
            >
              <span>View All 27 Spice Blends</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <p className="text-xs font-mono text-[#39251E]/60 mt-3">
              Explore our full collection across Pure Spices, Masala Blends, Regional Heirlooms & Seasonings
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
