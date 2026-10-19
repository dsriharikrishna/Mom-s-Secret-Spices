'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Shield } from 'lucide-react';
import { BRAND_EMAIL } from '@/lib/whatsapp';

export default function PrivacyPolicyPage() {
  const sections = [
    {
      num: '1',
      title: 'Our Commitment to Your Privacy',
      desc: 'Mom’s Secret Spices (crafted by Akshaya Foods, Bengaluru, Karnataka) respects your privacy. We strictly do not sell, rent, trade, or distribute your personal customer data to any external marketing brokers or third-party advertising exchanges.',
      highlight: true,
    },
    {
      num: '2',
      title: 'Information Collected',
      desc: 'When you communicate with us through WhatsApp or submit an order enquiry form, we receive the details you voluntarily provide (your name, contact telephone number, shipping address, and spice preferences). This information is solely used to fulfill your spice orders, respond to wholesale enquiries, and provide customer support.',
    },
    {
      num: '3',
      title: 'WhatsApp Order Protocol',
      desc: 'Clicking "Order on WhatsApp" initiates a secure, direct encrypted chat through WhatsApp. No credit card or sensitive banking credentials are saved or processed on our web server. Payment links provided via WhatsApp are handled through authorized, RBI-compliant Indian payment aggregators.',
    },
    {
      num: '4',
      title: 'Questions & Privacy Contact',
      desc: `If you have any questions regarding how your details are managed, you may contact our privacy team directly at ${BRAND_EMAIL}.`,
    },
  ];

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 bg-[#FFF8EE] min-h-screen overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-[#39251E]/60 hover:text-[#A9472A] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-[#A9472A]" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#A9472A] font-semibold">
              Governance & Consumer Trust
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#39251E] uppercase tracking-tight mb-8">
            Privacy Policy
          </h1>
        </motion.div>

        <div className="space-y-6 text-sm sm:text-base text-[#39251E]/80 leading-relaxed font-normal">
          {sections.map((sec, idx) => (
            <motion.section
              key={sec.num}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.6 }}
              className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                sec.highlight
                  ? 'bg-[#FAF1E4] border-[#39251E]/20 shadow-sm'
                  : 'bg-white border-[#39251E]/10'
              }`}
            >
              <h2 className="font-serif text-xl font-bold text-[#39251E] mb-2">
                {sec.num}. {sec.title}
              </h2>
              <p>{sec.desc}</p>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
