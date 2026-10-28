'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, MessageCircle, Sparkles, ExternalLink } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';
import { buildWhatsAppOrderUrl } from '@/lib/whatsapp';

export default function RadialCarousel() {
  // Feature 6 prime blends for the signature perspective carousel
  const carouselProducts = PRODUCTS.filter(
    (p) =>
      p.featured ||
      [
        'turmeric-powder',
        'chilli-powder',
        'garam-masala',
        'dum-biryani',
        'sambar-powder',
        'magic-masala',
      ].includes(p.slug)
  ).slice(0, 6);

  const [activeIndex, setActiveIndex] = useState(2); // Garam Masala center initially
  const [isFlying, setIsFlying] = useState(false);
  const [flyingProduct, setFlyingProduct] = useState<Product | null>(null);
  const router = useRouter();

  const activeProduct: Product = carouselProducts[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % carouselProducts.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length);
  };

  // Agrumea "Jar-Flight" Transition to Product Page
  const triggerJarFlight = (product: Product) => {
    setFlyingProduct(product);
    setIsFlying(true);
    setTimeout(() => {
      router.push(`/products/${product.slug}`);
    }, 750);
  };

  return (
    <section className="relative py-28 md:py-36 px-6 md:px-12 lg:px-16 bg-[#FFF8EE] overflow-hidden border-t border-[#39251E]/10">
      {/* Curved Background Arc Text (Agrumea-Style) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none select-none opacity-10 whitespace-nowrap font-serif text-[7rem] md:text-[12rem] font-bold text-[#A9472A] tracking-wider">
        AUTHENTIC · STONE-GROUND · MAGIC
      </div>

      <div className="w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0E2CF] text-[#A9472A] font-mono text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E8A33A]" />
            <span>Interactive 3D Radial Discovery</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#39251E] uppercase tracking-tight">
            The Masala Vault
          </h2>
          <p className="text-sm md:text-base text-[#39251E]/75 mt-3 font-normal">
            Click on any blend to trigger the sensory jar-flight experience, or inspect notes below.
          </p>
        </div>

        {/* 3D Perspective Radial Carousel Viewport */}
        <div className="relative h-[480px] sm:h-[540px] md:h-[600px] w-full flex items-center justify-center select-none perspective-[1200px]">
          {carouselProducts.map((product, index) => {
            const offset = (index - activeIndex + carouselProducts.length) % carouselProducts.length;
            let position = offset;
            if (position > carouselProducts.length / 2) {
              position -= carouselProducts.length;
            }

            const isCenter = position === 0;
            const isNear = Math.abs(position) === 1;

            const xTranslation = position * 230; // 230px step for realistic spacing
            const scale = isCenter ? 1.05 : isNear ? 0.8 : 0.58;
            const zIndex = isCenter ? 30 : isNear ? 20 : 10;
            const opacity = Math.abs(position) > 2 ? 0 : isCenter ? 1 : isNear ? 0.8 : 0.45;
            const rotateY = position * -22; // Inward curved 3D angle
            const rotateZ = position * -3;

            return (
              <motion.div
                key={product.id}
                animate={{
                  x: xTranslation,
                  scale: scale,
                  rotateY: rotateY,
                  rotateZ: rotateZ,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 30,
                }}
                onClick={() => {
                  if (isCenter) {
                    triggerJarFlight(product);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                data-cursor={isCenter ? 'DISCOVER' : 'SELECT'}
                className="absolute cursor-pointer flex flex-col items-center will-change-transform"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Product Jar/Pouch Card Container */}
                <div
                  className={`relative w-60 sm:w-68 md:w-76 aspect-[3/4] rounded-3xl p-4 transition-all duration-300 ${
                    isCenter
                      ? 'bg-gradient-to-b from-[#FFF8EE] to-[#F0E2CF] shadow-2xl border-2 border-[#A9472A]/50 ring-8 ring-[#E8A33A]/15'
                      : 'bg-[#FFF8EE]/70 backdrop-blur-xs shadow-lg border border-[#39251E]/15 hover:border-[#A9472A]/40'
                  }`}
                >
                  {/* Top Bar with Agrumea-Style Tag */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#39251E]/5 text-[#39251E]/80 font-medium">
                      {product.categoryLabel.split(' ')[0]}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#A9472A]">
                      ₹{product.packs[0]?.price}
                    </span>
                  </div>

                  {/* High Resolution Jar Image */}
                  <div className="relative w-full h-[78%] rounded-2xl overflow-hidden bg-white shadow-inner flex items-center justify-center p-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-2 transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 260px, 320px"
                      priority={isCenter}
                    />

                    {/* Floating Center Pill (Agrumea Discovery Indicator) */}
                    {isCenter && (
                      <div className="absolute inset-x-4 bottom-4 flex justify-center">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#39251E]/90 text-[#FFF8EE] text-[10px] font-mono uppercase tracking-widest font-bold shadow-lg backdrop-blur-xs">
                          <span>Click to Discover</span>
                          <ExternalLink className="w-3 h-3 text-[#E8A33A]" />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Text Label */}
                  <div className="mt-3 text-center">
                    <span className="block font-serif text-base font-bold text-[#39251E] truncate">
                      {product.name}
                    </span>
                    <span className="block text-[11px] font-mono text-[#39251E]/60 truncate">
                      {product.tagline}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Active Product Details & Quick Actions Bar */}
        <div className="mt-8 max-w-xl mx-auto text-center flex flex-col items-center">
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-2 mb-6"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rotate-45 bg-[#E8A33A]"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-[#A9472A] font-semibold">
                {activeProduct.categoryLabel} · {activeProduct.regionalOrigin}
              </span>
            </div>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#39251E]">
              {activeProduct.name}
            </h3>
            <p className="text-xs md:text-sm text-[#39251E]/75 leading-relaxed max-w-md mx-auto">
              {activeProduct.description}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => triggerJarFlight(activeProduct)}
              data-cursor="DISCOVER"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#A9472A] hover:bg-[#39251E] text-[#FFF8EE] text-xs font-mono font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95"
            >
              <span>Discover the Blend</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={buildWhatsAppOrderUrl({
                productName: activeProduct.name,
                packSize: activeProduct.packs[0]?.size || '100g',
                quantity: 1,
                unitPrice: activeProduct.packs[0]?.price || 85,
              })}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="WHATSAPP"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#496844] hover:bg-[#39251E] text-[#FFF8EE] text-xs font-mono font-semibold tracking-wider uppercase transition-colors shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Order on WhatsApp (₹{activeProduct.packs[0]?.price})</span>
            </a>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              aria-label="Previous Spice Blend"
              data-cursor="PREV"
              className="w-11 h-11 rounded-full border border-[#39251E]/20 hover:border-[#A9472A] hover:bg-[#A9472A] hover:text-white flex items-center justify-center transition-colors text-[#39251E]"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-[#39251E]/70 font-semibold tracking-widest">
              0{activeIndex + 1} / 0{carouselProducts.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next Spice Blend"
              data-cursor="NEXT"
              className="w-11 h-11 rounded-full border border-[#39251E]/20 hover:border-[#A9472A] hover:bg-[#A9472A] hover:text-white flex items-center justify-center transition-colors text-[#39251E]"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Agrumea Jar-Flight Fullscreen Transition Overlay */}
      <AnimatePresence>
        {isFlying && flyingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#A9472A] text-[#FFF8EE] overflow-hidden p-6"
          >
            {/* Background Kinetic Text */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              transition={{ duration: 0.6 }}
              className="absolute font-serif text-[12vw] font-bold text-[#FFF8EE] tracking-tighter uppercase pointer-events-none select-none text-center"
            >
              {flyingProduct.name}
            </motion.div>

            {/* Flying Jar Image in 3D Motion */}
            <motion.div
              initial={{ scale: 0.5, y: 100, rotate: -15, opacity: 0 }}
              animate={{ scale: 1.1, y: 0, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-64 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden bg-white shadow-2xl p-6 border-4 border-[#FFF8EE]/30"
            >
              <Image
                src={flyingProduct.image}
                alt={flyingProduct.name}
                fill
                className="object-contain p-4"
                priority
              />
            </motion.div>

            {/* Transition Status Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mt-8 text-center"
            >
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#E8A33A] font-semibold block mb-2">
                Unveiling Generational Recipe
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight">
                {flyingProduct.name}
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
