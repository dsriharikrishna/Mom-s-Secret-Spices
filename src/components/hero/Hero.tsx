'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';

export default function Hero() {
  const carouselProducts = PRODUCTS.slice(0, 8); // Top 8 authentic blends

  const [activeIndex, setActiveIndex] = useState(0); // Start at first product
  const [hasCompletedAll, setHasCompletedAll] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isFlying, setIsFlying] = useState(false);
  const [flyingProduct, setFlyingProduct] = useState<Product | null>(null);
  
  // Track wheel rotation count to rotate products on mousewheel
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);
  const scrollAccumulator = useRef<number>(0);
  const router = useRouter();

  const activeProduct: Product = carouselProducts[activeIndex];

  // Mouse Parallax for Agrumea floating physics
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intercept wheel in Hero so scrolling scrubs through all products first, then releases page scroll down!
  const handleWheel = (e: React.WheelEvent) => {
    // If user has already reached the last product and scrolls down again, allow normal page scroll down
    if (hasCompletedAll && e.deltaY > 0) {
      return;
    }

    // If scrolling up when at index 0, let user stay or scroll up naturally
    if (e.deltaY < 0 && activeIndex === 0) {
      return;
    }

    // Lock page scroll and advance carousel through every product
    e.preventDefault();

    const now = Date.now();
    scrollAccumulator.current += e.deltaY;

    if (Math.abs(scrollAccumulator.current) > 35) {
      if (now - lastScrollTime.current > 140) {
        if (scrollAccumulator.current > 0) {
          // Scroll Down -> Advance forward
          if (activeIndex < carouselProducts.length - 1) {
            const nextIdx = activeIndex + 1;
            setActiveIndex(nextIdx);
            if (nextIdx === carouselProducts.length - 1) {
              // Now user has viewed all products; give them one more gesture before releasing scroll
              setTimeout(() => setHasCompletedAll(true), 300);
            }
          } else {
            setHasCompletedAll(true);
          }
        } else {
          // Scroll Up -> Advance backward
          if (activeIndex > 0) {
            setActiveIndex((prev) => prev - 1);
            setHasCompletedAll(false);
          }
        }
        lastScrollTime.current = now;
        scrollAccumulator.current = 0;
      }
    }
  };

  const triggerJarFlight = (product: Product) => {
    setFlyingProduct(product);
    setIsFlying(true);
    setTimeout(() => {
      router.push(`/products/${product.slug}`);
    }, 750);
  };

  return (
    <section 
      ref={containerRef}
      onWheel={handleWheel}
      className="relative h-screen w-full flex flex-col justify-between pt-16 pb-8 px-6 md:px-12 overflow-hidden bg-[#FDF8F0] select-none"
    >
      {/* 1. Agrumea Massive Burgundy Elliptical Disc with Integrated Curved Arch Text */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1050px] md:w-[1380px] aspect-[1.3/1] pointer-events-none select-none will-change-transform z-0"
        style={{
          transform: `translate(-50%, -38%) translate3d(${mousePos.x * -20}px, ${mousePos.y * -12}px, 0)`,
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <svg viewBox="0 0 1000 750" className="w-full h-full drop-shadow-[0_25px_60px_rgba(57,37,30,0.2)]">
          <defs>
            <path
              id="archTextPath"
              d="M 120 540 A 420 330 0 0 1 880 540"
              fill="none"
            />
          </defs>
          {/* Deep Dark Heritage Gold Elliptical Wedge Disc */}
          <ellipse cx="500" cy="460" rx="460" ry="340" fill="#B8731E" />
          
          {/* Monumental Curved Arc Typography in Warm Cream */}
          <text className="font-serif uppercase font-bold text-[44px] fill-[#FFF8EE] tracking-[0.22em] opacity-95">
            <textPath href="#archTextPath" startOffset="50%" textAnchor="middle">
              STONE-GROUND · WE GROW · WE PRESERVE
            </textPath>
          </text>
        </svg>
      </div>

      {/* 2. Pure Agrumea Free-Floating Jars Stage */}
      <div className="relative flex-1 w-full flex items-center justify-center perspective-[1200px] z-10 my-auto">
        {carouselProducts.map((product, index) => {
          const offset = (index - activeIndex + carouselProducts.length) % carouselProducts.length;
          let position = offset;
          if (position > carouselProducts.length / 2) {
            position -= carouselProducts.length;
          }

          const isCenter = position === 0;
          const isNear = Math.abs(position) === 1;

          // Realistic spacing in pixels
          const xTranslation = position * 300 + (isCenter ? mousePos.x * 25 : position * 18);
          // Agrumea's downward dip arc
          const yTranslation = isCenter ? mousePos.y * 14 : Math.abs(position) * 48;
          const scale = isCenter ? 1.3 : isNear ? 0.88 : 0.62;
          const zIndex = isCenter ? 40 : isNear ? 20 : 10;
          const opacity = Math.abs(position) > 2 ? 0 : isCenter ? 1 : isNear ? 0.88 : 0.5;
          
          // Agrumea's authentic tilted angles: -14deg to +14deg
          const rotateZ = isCenter ? -12 + mousePos.x * 4 : position * 14;
          const rotateY = position * -20;

          return (
            <motion.div
              key={product.id}
              animate={{
                x: xTranslation,
                y: yTranslation,
                scale: scale,
                rotateZ: rotateZ,
                rotateY: rotateY,
                opacity: opacity,
                zIndex: zIndex,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28,
              }}
              onClick={() => {
                if (isCenter) {
                  triggerJarFlight(product);
                } else {
                  setActiveIndex(index);
                }
              }}
              data-cursor={isCenter ? 'DISCOVER' : 'SELECT'}
              className="absolute cursor-pointer flex flex-col items-center will-change-transform group"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Isolated Floating Cutout Jar */}
              <div className="relative w-64 sm:w-72 md:w-84 h-[380px] sm:h-[420px] md:h-[460px] flex items-center justify-center">
                {/* Natural Ground Contact Shadow */}
                <div
                  className={`absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full blur-xl transition-all duration-300 pointer-events-none ${
                    isCenter
                      ? 'w-64 h-10 bg-[#39251E]/40 scale-110'
                      : 'w-48 h-8 bg-[#39251E]/25'
                  }`}
                  style={{
                    transform: `translateX(-50%) translate3d(${mousePos.x * -12}px, 0, 0)`,
                  }}
                />

                {/* Floating Jar Image with Realistic Ambient Shadow */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={`object-contain transition-transform duration-500 ${
                      isCenter
                        ? 'drop-shadow-[0_30px_45px_rgba(30,15,10,0.45)] hover:scale-105'
                        : 'drop-shadow-[0_18px_25px_rgba(30,15,10,0.3)] hover:scale-105'
                    }`}
                    sizes="(max-width: 768px) 260px, 340px"
                    priority={isCenter}
                  />

                  {/* Agrumea's Floating "DISCOVER THE PRODUCT" Capsule on Active Center Jar */}
                  {isCenter && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-x-0 bottom-4 flex justify-center pointer-events-none"
                    >
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFF8EE] text-[#39251E] text-xs font-mono uppercase tracking-widest font-bold shadow-2xl border border-[#39251E]/15 backdrop-blur-md">
                        <span className="w-2 h-2 rotate-45 bg-[#E8A33A]"></span>
                        <span>Discover the Blend</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#A9472A]" />
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Pure Agrumea Bottom Footer Bar: "Privacy & Cookies" on left, "SCROLL TO DISCOVER" centered */}
      <div className="max-w-7xl mx-auto w-full z-10 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#39251E]/70 border-t border-[#39251E]/10 pt-4">
        {/* Left: Agrumea Legal Link */}
        <a 
          href="/privacy-policy" 
          className="hover:text-[#A9472A] transition-colors underline underline-offset-4"
        >
          Privacy & Cookies
        </a>

        {/* Center: Agrumea Signature Cue */}
        <div className="text-center font-bold tracking-[0.2em] text-[#39251E] flex items-center justify-center gap-2">
          <span>{activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1} / {carouselProducts.length < 10 ? `0${carouselProducts.length}` : carouselProducts.length}</span>
          <span>·</span>
          <span>{hasCompletedAll ? 'SCROLL DOWN TO EXPLORE MORE' : 'SCROLL TO CYCLE BLENDS'}</span>
        </div>

        {/* Right: Active Blend Quick Hint */}
        <div className="text-right hidden sm:block">
          <span className="text-[#A9472A] font-semibold">{activeProduct.name}</span>
          <span className="text-[#39251E]/50 ml-2">₹{activeProduct.packs[0]?.price}</span>
        </div>
      </div>

      {/* Agrumea Jar-Flight Fullscreen Transition Overlay */}
      <AnimatePresence>
        {isFlying && flyingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#762530] text-[#FFF8EE] overflow-hidden p-6"
          >
            {/* Background Kinetic Headline */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              transition={{ duration: 0.6 }}
              className="absolute font-serif text-[12vw] font-bold text-[#FFF8EE] tracking-tighter uppercase pointer-events-none select-none text-center"
            >
              {flyingProduct.name}
            </motion.div>

            {/* Flying Jar in 3D Motion */}
            <motion.div
              initial={{ scale: 0.5, y: 100, rotate: -15, opacity: 0 }}
              animate={{ scale: 1.25, y: 0, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-72 h-96 sm:w-88 sm:h-[440px] flex items-center justify-center"
            >
              <Image
                src={flyingProduct.image}
                alt={flyingProduct.name}
                fill
                className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
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
                Stone-Ground Formulations
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
