'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import { BRAND_PHONE, BRAND_PHONE_DISPLAY, BRAND_EMAIL, buildWhatsAppWholesaleUrl } from '@/lib/whatsapp';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'Retail Customer Order',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = 
      `Namaste Mom’s Secret Spices! 🙏\n\n` +
      `New Website Contact Form Submission:\n` +
      `• Name: ${formState.name}\n` +
      `• Phone: ${formState.phone}\n` +
      `• Email: ${formState.email}\n` +
      `• Type: ${formState.inquiryType}\n` +
      `• Message: ${formState.message}`;

    window.open(`https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 bg-[#FFF8EE] min-h-screen overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF1E4] text-[#A9472A] border border-[#A9472A]/20 font-mono text-xs uppercase tracking-widest font-semibold mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E8A33A]" />
            <span>Get in Touch · Customer & HoReCa Support</span>
          </motion.span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#39251E] uppercase tracking-tight mb-4">
            Connect With Us
          </h1>
          <p className="text-sm sm:text-base text-[#39251E]/75 leading-relaxed font-normal">
            Whether you are ordering your weekly kitchen spices, looking for distributor terms, or stocking a restaurant kitchen, our team in Bengaluru is ready to assist.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Contact Info & Wholesale Buttons */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="p-8 rounded-3xl bg-[#FAF1E4] border border-[#39251E]/10 space-y-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-serif text-2xl font-bold text-[#39251E]">
                Mom’s Secret Spices Headquarters
              </h3>

              <div className="space-y-4 text-sm text-[#39251E]/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#A9472A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#39251E]">Production & Milling Facility:</strong>
                    <span>Bengaluru, Karnataka, India</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#A9472A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#39251E]">Direct Hotline / WhatsApp:</strong>
                    <span>{BRAND_PHONE_DISPLAY}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#A9472A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#39251E]">Customer & B2B Email:</strong>
                    <span>{BRAND_EMAIL}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout Button */}
              <div className="pt-4 border-t border-[#39251E]/10">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`https://wa.me/${BRAND_PHONE}?text=${encodeURIComponent(
                    "Namaste Mom’s Secret Spices! I would like to inquire about Mom's Secret Spices."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#496844] hover:bg-[#39251E] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Now</span>
                </motion.a>
              </div>
            </div>

            {/* Wholesale HoReCa Info Box */}
            <div className="p-8 rounded-3xl bg-[#39251E] text-[#FFF8EE] space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8A33A]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-2 text-[#E8A33A] font-mono text-xs uppercase tracking-widest font-bold">
                <Building2 className="w-4 h-4" />
                <span>HoReCa & Commercial</span>
              </div>
              <h4 className="font-serif text-xl font-bold">Bulk Supply Enquiries</h4>
              <p className="text-xs text-[#FFF8EE]/75 leading-relaxed font-normal">
                Discounts apply for bulk sacks (5kg / 10kg / 25kg) for restaurants, wedding caterers, and distribution partners across Karnataka & South India.
              </p>
              <a
                href={buildWhatsAppWholesaleUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#E8A33A] hover:underline"
              >
                <span>Request B2B Price Matrix</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact & Enquiry Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#39251E]/10 shadow-xl">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#39251E] mb-2">
                Send an Enquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#39251E]/60 mb-8 font-mono">
                Fill this form to dispatch an order request directly to our customer team.
              </p>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#496844]/15 text-[#496844] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#39251E]">
                    Thank You, Inquiry Sent!
                  </h3>
                  <p className="text-sm text-[#39251E]/75 max-w-md mx-auto">
                    Your details have been submitted. If WhatsApp did not open automatically, our Bengaluru dispatch desk will follow up directly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#FAF1E4] text-[#A9472A] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#A9472A] hover:text-[#FFF8EE] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#39251E]/70 mb-2 font-bold">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF8EE] border border-[#39251E]/20 text-sm font-mono focus:outline-hidden focus:border-[#A9472A] text-[#39251E]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#39251E]/70 mb-2 font-bold">
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FFF8EE] border border-[#39251E]/20 text-sm font-mono focus:outline-hidden focus:border-[#A9472A] text-[#39251E]"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#39251E]/70 mb-2 font-bold">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="you@domain.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FFF8EE] border border-[#39251E]/20 text-sm font-mono focus:outline-hidden focus:border-[#A9472A] text-[#39251E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#39251E]/70 mb-2 font-bold">
                      Inquiry Category
                    </label>
                    <select
                      value={formState.inquiryType}
                      onChange={(e) => setFormState({ ...formState, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF8EE] border border-[#39251E]/20 text-sm font-mono focus:outline-hidden focus:border-[#A9472A] text-[#39251E]"
                    >
                      <option>Retail Customer Order</option>
                      <option>Restaurant & Cloud Kitchen (HoReCa)</option>
                      <option>Retail Dealership / Distributor</option>
                      <option>Corporate Gifting & Custom Gift Boxes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-[#39251E]/70 mb-2 font-bold">
                      Message / Spices Needed *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us what spices you would like to order or questions you have..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FFF8EE] border border-[#39251E]/20 text-sm font-mono focus:outline-hidden focus:border-[#A9472A] text-[#39251E]"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#A9472A] hover:bg-[#39251E] text-[#FFF8EE] font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to WhatsApp</span>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
