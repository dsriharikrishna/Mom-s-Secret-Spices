'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  MessageCircle,
  Truck,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCartStore } from '@/store/cartStore';
import { buildWhatsAppCartCheckoutUrl } from '@/lib/whatsapp';
import { formatPrice } from '@/lib/formatPrice';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    customer,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    updateCustomer,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; phone?: string }>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  const handleCheckout = () => {
    // Basic validation
    const errors: { name?: string; phone?: string } = {};
    if (!customer.name.trim()) errors.name = 'Please provide your name';
    if (!customer.phone.trim()) errors.phone = 'Please provide your phone / WhatsApp number';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setShowCheckoutForm(true);
      return;
    }

    // Fire celebratory confetti!
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E8A33A', '#A9472A', '#496844', '#39251E'],
    });

    // Generate full WhatsApp message with image links & customer delivery info
    const whatsappUrl = buildWhatsAppCartCheckoutUrl(items, customer, totalPrice);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#39251E]/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md sm:max-w-lg bg-[#FFF8EE] h-full shadow-2xl flex flex-col z-10 border-l border-[#39251E]/10"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-[#39251E]/10 flex items-center justify-between bg-[#FDF8F0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8A33A]/20 flex items-center justify-center text-[#A9472A]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#39251E] flex items-center gap-2">
                    Your Spice Basket
                    {items.length > 0 && (
                      <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-[#39251E] text-[#FFF8EE]">
                        {totalItems}
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-[#39251E]/70 font-sans">
                    Hand-packed fresh from Bengaluru
                  </p>
                </div>
              </div>

              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#39251E]/70 hover:text-[#39251E] hover:bg-[#39251E]/5 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-[#39251E]/5 flex items-center justify-center text-[#39251E]/40 mb-4">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#39251E] mb-2">
                    Your basket is empty
                  </h3>
                  <p className="text-sm text-[#39251E]/70 max-w-xs mb-6">
                    Discover our authentic stone-ground spice blends and add culinary magic to your home.
                  </p>
                  <button
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#39251E] text-[#FFF8EE] text-sm font-semibold hover:bg-[#A9472A] transition-colors"
                  >
                    <span>Browse Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between pb-2 border-b border-[#39251E]/10 text-xs font-mono uppercase text-[#39251E]/60 tracking-wider">
                    <span>Selected Blends</span>
                    <button
                      onClick={clearCart}
                      className="hover:text-[#A9472A] transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Clear all
                    </button>
                  </div>

                  <div className="space-y-3">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-3.5 rounded-2xl bg-white border border-[#39251E]/10 shadow-xs flex gap-3.5 items-center"
                      >
                        {/* Pouch Image Thumbnail */}
                        <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-[#FAF6EE] shrink-0 border border-[#39251E]/5">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="64px"
                            className="object-contain p-1"
                          />
                        </div>

                        {/* Item Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-sm sm:text-base font-bold text-[#39251E] truncate">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[#39251E]/40 hover:text-red-600 transition-colors shrink-0 p-1"
                              aria-label="Remove item"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-[#A9472A] font-semibold mt-0.5">
                            <span className="px-2 py-0.5 rounded-md bg-[#A9472A]/10 font-mono">
                              {item.packSize}
                            </span>
                            <span>•</span>
                            <span className="font-mono text-[#39251E]">₹{formatPrice(item.unitPrice)} each</span>
                          </div>

                          {/* Quantity Controls & Subtotal */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="inline-flex items-center border border-[#39251E]/20 rounded-full bg-[#FAF6EE]">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-[#39251E]/80 hover:text-[#39251E] hover:bg-[#39251E]/10 rounded-full transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-xs font-mono font-bold text-[#39251E]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-[#39251E]/80 hover:text-[#39251E] hover:bg-[#39251E]/10 rounded-full transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-mono text-sm font-bold text-[#39251E]">
                              ₹{formatPrice(item.unitPrice * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Delivery Info Accordion / Card */}
                  <div className="mt-6 pt-4 border-t border-[#39251E]/10">
                    <button
                      onClick={() => setShowCheckoutForm(!showCheckoutForm)}
                      className="w-full text-left flex items-center justify-between text-xs font-mono uppercase text-[#39251E] font-bold tracking-wider py-2"
                    >
                      <span className="flex items-center gap-2">
                        <span>📍 Delivery Address & Note</span>
                        {(customer.name || customer.phone) && (
                          <CheckCircle className="w-3.5 h-3.5 text-[#496844]" />
                        )}
                      </span>
                      <span className="text-[11px] text-[#A9472A]">
                        {showCheckoutForm ? 'Hide' : 'Add Details'}
                      </span>
                    </button>

                    <AnimatePresence>
                      {showCheckoutForm && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden space-y-3 pt-3"
                        >
                          <div>
                            <label className="block text-[11px] font-mono uppercase text-[#39251E]/70 mb-1">
                              Your Full Name *
                            </label>
                            <input
                              type="text"
                              value={customer.name}
                              onChange={(e) => {
                                updateCustomer({ name: e.target.value });
                                if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: undefined }));
                              }}
                              placeholder="e.g. Priya Sharma"
                              className="w-full text-sm px-3 py-2 rounded-xl border border-[#39251E]/20 bg-white focus:outline-hidden focus:border-[#E8A33A]"
                            />
                            {formErrors.name && (
                              <p className="text-[11px] text-red-600 mt-0.5">{formErrors.name}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[11px] font-mono uppercase text-[#39251E]/70 mb-1">
                                WhatsApp / Phone *
                              </label>
                              <input
                                type="tel"
                                value={customer.phone}
                                onChange={(e) => {
                                  updateCustomer({ phone: e.target.value });
                                  if (formErrors.phone) setFormErrors((prev) => ({ ...prev, phone: undefined }));
                                }}
                                placeholder="e.g. 9876543210"
                                className="w-full text-sm px-3 py-2 rounded-xl border border-[#39251E]/20 bg-white focus:outline-hidden focus:border-[#E8A33A]"
                              />
                              {formErrors.phone && (
                                <p className="text-[11px] text-red-600 mt-0.5">{formErrors.phone}</p>
                              )}
                            </div>

                            <div>
                              <label className="block text-[11px] font-mono uppercase text-[#39251E]/70 mb-1">
                                City
                              </label>
                              <input
                                type="text"
                                value={customer.city}
                                onChange={(e) => updateCustomer({ city: e.target.value })}
                                placeholder="e.g. Bengaluru"
                                className="w-full text-sm px-3 py-2 rounded-xl border border-[#39251E]/20 bg-white focus:outline-hidden focus:border-[#E8A33A]"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase text-[#39251E]/70 mb-1">
                              Delivery Address & Pincode
                            </label>
                            <textarea
                              rows={2}
                              value={customer.address}
                              onChange={(e) => updateCustomer({ address: e.target.value })}
                              placeholder="Flat/House No, Street, Area, Pincode"
                              className="w-full text-sm px-3 py-2 rounded-xl border border-[#39251E]/20 bg-white focus:outline-hidden focus:border-[#E8A33A] resize-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase text-[#39251E]/70 mb-1">
                              Special Instructions (Optional)
                            </label>
                            <input
                              type="text"
                              value={customer.notes}
                              onChange={(e) => updateCustomer({ notes: e.target.value })}
                              placeholder="e.g. Extra fine stone-grind preference"
                              className="w-full text-sm px-3 py-2 rounded-xl border border-[#39251E]/20 bg-white focus:outline-hidden focus:border-[#E8A33A]"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              )}
            </div>

            {/* Footer / Checkout CTA */}
            {items.length > 0 && (
              <div className="p-5 sm:p-6 border-t border-[#39251E]/10 bg-[#FDF8F0] space-y-3">
                <div className="space-y-1.5 text-xs text-[#39251E]/80">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} packs)</span>
                    <span className="font-mono font-semibold text-[#39251E]">₹{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-[#496844] font-medium">
                    <span>Shipping</span>
                    <span>Calculated on WhatsApp (Direct ho-re-ca / courier)</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-[#39251E] pt-2 border-t border-[#39251E]/10">
                    <span>Estimated Total</span>
                    <span className="font-mono text-lg text-[#A9472A]">₹{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Instant WhatsApp Order CTA Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Order Directly on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </button>

                <div className="flex items-center justify-center gap-4 text-[10px] text-[#39251E]/60 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#496844]" /> 100% Pure Guaranteed
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#A9472A]" /> Fresh Batch Ground to Order
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

