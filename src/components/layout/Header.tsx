'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowUpRight, X, ShoppingBag } from 'lucide-react';
import { BRAND_PHONE } from '@/lib/whatsapp';
import { useCartStore } from '@/store/cartStore';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { openCart, getTotalItems } = useCartStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = mounted ? getTotalItems() : 0;

  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close menu on route change during render without an effect setState
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  const navLinks = [
    { label: 'Home', href: '/', number: '01', desc: 'Crafted stone-ground culinary entrance' },
    { label: 'Collection', href: '/products', number: '02', desc: 'Explore all 27 artisanal spice formulations' },
    { label: 'The Experience', href: '/experience', number: '03', desc: 'Cinematic journey from soil to sputtering flame' },
    { label: 'Ancient Craft', href: '/about', number: '04', desc: 'Generational slow cold stone-milling heritage' },
    { label: 'Contact & Wholesale', href: '/contact', number: '05', desc: 'Commercial HoReCa & direct retail orders' },
  ];

  return (
    <>
      {/* Sticky Fixed Header Bar (Slim & Elegant) */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-1.5 bg-[#FDF8F0]/95 backdrop-blur-md border-b border-[#39251E]/10 shadow-xs'
            : 'py-2 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Left: Brand Logo with Home Link */}
          <Link href="/" className="relative w-36 h-11 sm:w-52 sm:h-14 transition-transform duration-300 hover:scale-105 flex items-center">
            <Image
              src="/brand-logo-transparent.webp"
              alt="Mom’s Secret Spices Logo"
              fill
              sizes="(max-width: 640px) 144px, 208px"
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Center: Clean Symmetrical Brand Wordmark with Luxury MSS Emblem */}
          <Link href="/" className="hidden md:flex items-center gap-3 group -my-1">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#39251E]/20 shadow-xs transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/apple-icon.jpg"
                alt="Mom's Secret Spices Emblem"
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-serif text-base tracking-[0.14em] text-[#39251E] font-bold group-hover:text-[#A9472A] transition-colors leading-tight">
                MOM’S SECRET SPICES
              </span>
              <span className="text-[9px] uppercase font-mono tracking-[0.25em] text-[#A9472A]">
                Artisanal Heritage Spices
              </span>
            </div>
          </Link>

          {/* Right: Cart Button, WhatsApp Quick Link & Refined Menu Toggle Pill */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart Trigger Button */}
            <button
              onClick={openCart}
              aria-label="Open Shopping Basket"
              className="relative p-2 rounded-full border border-[#39251E]/15 bg-[#FFF8EE]/90 hover:bg-[#39251E] text-[#39251E] hover:text-[#FFF8EE] transition-all shadow-xs flex items-center justify-center cursor-pointer group"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#A9472A] text-[#FFF8EE] text-[10px] font-mono font-bold flex items-center justify-center shadow-xs animate-in zoom-in-75">
                  {totalCartItems}
                </span>
              )}
            </button>

            <a
              href={`https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(
                "Namaste! I would like to inquire about Mom's Secret Spices."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#496844] text-[#FFF8EE] hover:bg-[#39251E] transition-colors shadow-xs"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>

            {/* Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={isOpen}
              className={`group flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-200 ${
                isOpen
                  ? 'bg-[#39251E] text-[#FFF8EE] border-[#39251E]'
                  : 'border-[#39251E]/20 bg-[#FDF8F0]/90 text-[#39251E] hover:border-[#A9472A] hover:bg-[#A9472A] hover:text-[#FFF8EE]'
              }`}
            >
              <span className="text-xs font-mono font-bold tracking-wider uppercase">
                {isOpen ? 'CLOSE' : 'MENU'}
              </span>
              <span
                className={`w-1.5 h-1.5 rounded-xs rotate-45 transition-transform duration-300 ${
                  isOpen
                    ? 'bg-[#E8A33A] rotate-90 scale-125'
                    : 'bg-[#A9472A] group-hover:bg-[#FFF8EE]'
                }`}
              ></span>
            </button>
          </div>
        </div>
      </header>

      {/* Refined Luxury Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-[#1F1410] text-[#FDF8F0] flex flex-col justify-between p-5 sm:p-10 md:p-12 min-h-screen overflow-y-auto select-none"
          >
            {/* Top Bar inside Menu: Logo & Status */}
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-b border-[#FDF8F0]/15 pb-4 pt-2 shrink-0">
              <Link href="/" onClick={() => setIsOpen(false)} className="relative w-28 h-10 sm:w-36 sm:h-11">
                <Image
                  src="/brand-logo-transparent.webp"
                  alt="Mom’s Secret Spices Logo"
                  fill
                  sizes="(max-width: 640px) 112px, 144px"
                  className="object-contain"
                  priority
                />
              </Link>

              <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-[#FDF8F0]/70">
                <span className="hidden sm:inline-block">Bengaluru, Karnataka · Est. 1998</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#FDF8F0]/25 hover:border-[#E8A33A] hover:text-[#E8A33A] transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Esc</span>
                </button>
              </div>
            </div>

            {/* Main Editorial Nav Links Layout */}
            <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 sm:py-2">
              {/* Left Column: Staggered Display Links */}
              <div className="lg:col-span-8 flex flex-col">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + index * 0.05, duration: 0.35 }}
                      className="group"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between border-b border-[#FDF8F0]/10 py-2.5 sm:py-3 transition-all duration-300 group-hover:pl-4 group-hover:border-[#E8A33A]"
                      >
                        <div className="flex items-baseline gap-4 sm:gap-6">
                          <span className="font-mono text-xs sm:text-sm text-[#E8A33A] font-semibold">
                            {link.number}.
                          </span>
                          <span
                            className={`font-serif text-2xl sm:text-4xl md:text-5xl tracking-tight transition-colors ${
                              isActive
                                ? 'text-[#F39200] font-bold'
                                : 'text-[#FDF8F0]/85 group-hover:text-[#FDF8F0]'
                            }`}
                          >
                            {link.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="hidden md:inline-block text-xs font-mono text-[#FDF8F0]/40 group-hover:text-[#FDF8F0]/70 transition-colors">
                            {link.desc}
                          </span>
                          <ArrowUpRight className="w-5 h-5 text-[#FDF8F0]/30 group-hover:text-[#E8A33A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Column: Editorial Sensory Showcase */}
              <div className="lg:col-span-4 hidden lg:flex flex-col justify-between p-7 rounded-3xl bg-[#FDF8F0]/5 border border-[#FDF8F0]/10 space-y-5">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#E8A33A] font-bold block mb-1.5">
                    The Pure Spice Standard
                  </span>
                  <h4 className="font-serif text-xl font-bold text-[#FDF8F0] leading-snug">
                    Stone-Ground in Micro-Batches
                  </h4>
                  <p className="text-xs text-[#FDF8F0]/70 mt-2 leading-relaxed">
                    Heavy granite wheels turn slowly to keep friction temperatures under 35°C, ensuring precious volatile oils remain locked inside each blend.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#FDF8F0]/15 space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between text-[#FDF8F0]/80">
                    <span>Direct WhatsApp:</span>
                    <a href={`https://wa.me/${BRAND_PHONE}`} target="_blank" rel="noopener noreferrer" className="text-[#E8A33A] hover:underline font-bold">
                      +91 99001 61030
                    </a>
                  </div>
                  <div className="flex justify-between text-[#FDF8F0]/80">
                    <span>Authentic Varieties:</span>
                    <span className="text-[#FDF8F0]">27 Formulations</span>
                  </div>
                  <div className="flex justify-between text-[#FDF8F0]/80">
                    <span>Location:</span>
                    <span className="text-[#FDF8F0]">Bengaluru, Karnataka</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Info inside Menu */}
            <div className="max-w-7xl mx-auto w-full pt-4 border-t border-[#FDF8F0]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-[#FDF8F0]/60 pb-2">
              <div className="flex items-center gap-6">
                <span>© 2026 Mom’s Secret Spices</span>
                <span>Crafted by Mom&apos;s Secret Spices</span>
              </div>
              <div className="flex items-center gap-6">
                <Link href="/privacy-policy" onClick={() => setIsOpen(false)} className="hover:text-white underline underline-offset-4">
                  Privacy Policy
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-white underline underline-offset-4">
                  Wholesale Inquiries
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
