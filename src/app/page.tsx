'use client';

import React from 'react';
import Hero from '@/components/hero/Hero';
import StorytellingScenes from '@/components/experience/StorytellingScenes';
import ProductCatalog from '@/components/products/ProductCatalog';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, Award, Flame, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const commitments = [
    {
      icon: ShieldCheck,
      title: 'Authentic Regional Recipes',
      desc: 'Formulations handed down across generations in Karnataka, Andhra Pradesh, Tamil Nadu, and North India.',
      tag: 'Heritage Formula',
    },
    {
      icon: Flame,
      title: 'Cold Granite Stone-Milling',
      desc: 'Slow rotational milling prevents friction heat, locking in volatile aromatic essential oils.',
      tag: '<35°C Process',
    },
    {
      icon: Award,
      title: 'Zero Chemical Additives',
      desc: 'Free from synthetic red food coloring, anticaking agents, MSG, and palm oil fillers.',
      tag: '100% Pure',
    },
    {
      icon: Sparkles,
      title: 'Small Batch Freshness',
      desc: 'Stone-pounded in weekly micro-batches so your kitchen receives freshly prepared spices.',
      tag: 'Weekly Batches',
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* 1. Agrumea Signature Hero with Pinned 3D Perspective Radial Carousel */}
      <Hero />

      {/* 2. The 4 Purity & Craftsmanship Commitments */}
      <section className="relative py-24 px-6 md:px-12 bg-[#39251E] text-[#FFF8EE] overflow-hidden">
        {/* Ambient background glow & motif elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E8A33A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#A9472A]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF8EE]/10 border border-[#FFF8EE]/15 font-mono text-xs uppercase tracking-widest text-[#E8A33A] font-semibold mb-3 backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33A] animate-pulse" />
              The Akshaya Foods Standard
            </motion.span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              Four Purity Guarantees
            </h2>
            <div className="w-16 h-0.5 bg-[#E8A33A] mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {commitments.map((c, index) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.12, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  whileHover={{ 
                    y: -8, 
                    transition: { duration: 0.25, ease: 'easeOut' } 
                  }}
                  className="group relative p-8 rounded-3xl bg-[#FFF8EE]/5 border border-[#FFF8EE]/10 hover:border-[#E8A33A]/50 hover:bg-[#FFF8EE]/[0.08] transition-colors flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#E8A33A]/15 text-[#E8A33A] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#E8A33A] group-hover:text-[#39251E] transition-all duration-300">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#E8A33A] font-bold px-2.5 py-1 rounded-full bg-[#E8A33A]/10">
                        {c.tag}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold mb-3 text-[#FFF8EE] group-hover:text-[#E8A33A] transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-sm text-[#FFF8EE]/70 leading-relaxed font-normal">
                      {c.desc}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-[#FFF8EE]/10 flex items-center gap-2 text-xs font-mono text-[#E8A33A] opacity-80 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Craft</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. The 5 Cinematic Storytelling Scenes */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
      >
        <StorytellingScenes />
      </motion.div>

      {/* 5. Featured 6 Spice Blends with View All Option */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <ProductCatalog limit={6} />
      </motion.div>

      {/* 6. Wholesale & HoReCa Callout Banner */}
      <section className="py-24 px-6 md:px-12 bg-[#A9472A] text-[#FFF8EE] relative overflow-hidden">
        {/* Atmospheric Floating Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1], 
            rotate: [0, 90, 0] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#E8A33A]/20 blur-3xl pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1], 
            x: [0, 20, 0] 
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#39251E]/30 blur-3xl pointer-events-none" 
        />

        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto rounded-3xl p-8 sm:p-14 bg-[#FFF8EE]/10 border border-[#FFF8EE]/20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-2xl backdrop-blur-md relative z-10"
        >
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#E8A33A] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33A]" />
              Distributor & Commercial Supply
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Supply Your Restaurant or Retail Store
            </h3>
            <p className="text-sm sm:text-base text-[#FFF8EE]/80 max-w-lg">
              We supply 5kg, 10kg, and 25kg bulk commercial bags for caterers, cloud kitchens, and gourmet grocers across India.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="shrink-0"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FFF8EE] text-[#A9472A] hover:bg-[#E8A33A] hover:text-[#39251E] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-xl hover:shadow-2xl"
            >
              <span>Inquire HoReCa</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
