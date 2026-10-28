'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ExperiencePage() {
  const steps = [
    {
      num: '01',
      title: 'THE SUN-DRIED HARVEST',
      desc: 'Selected from certified heirloom farms: Byadgi chillies, Salem turmeric, and Salem coriander dried under natural sunlight.',
      highlight: 'Single-Origin Sourcing',
    },
    {
      num: '02',
      title: 'THE COLD STONE-POUNDING',
      desc: 'Heavy granite stones turn at low speeds. Temperature never exceeds 35°C, ensuring essential aromatic oils never burn away.',
      highlight: 'Zero Heat Friction',
    },
    {
      num: '03',
      title: 'THE AROMATIC HARMONY',
      desc: 'Generational spice blending formulas balancing sweet, pungent, woody, and astringent notes with surgical precision.',
      highlight: 'Regional Culinary Roots',
    },
    {
      num: '04',
      title: 'THE SIZZLE (TADKA)',
      desc: 'The moment spices hit hot ghee or cold-pressed sesame oil, releasing their full therapeutic and gastronomic power.',
      highlight: 'Pure Culinary Magic',
    },
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#FFF8EE] overflow-hidden">
      {/* Hero Film Section */}
      <section className="relative px-6 md:px-12 lg:px-16 pt-8 pb-16">
        <div className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF1E4] text-[#A9472A] border border-[#A9472A]/20 font-mono text-xs uppercase tracking-widest font-semibold mb-3"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E8A33A]" />
              <span>Visual Culinary Narrative</span>
            </motion.span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#39251E] uppercase tracking-tight">
              The Art of Stone & Flame
            </h1>
            <p className="text-sm sm:text-base text-[#39251E]/75 mt-4 leading-relaxed font-normal">
              Step inside the sensory realm of traditional Indian spice preparation. Where slow granite milling preserves what industrial machines destroy.
            </p>
          </motion.div>

          {/* Authentic Kitchen Video Presentation Theater */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(57,37,30,0.35)] border-2 border-[#39251E]/20 bg-[#1F1410] group"
          >
            <video
              src="/Moms.mp4"
              controls
              playsInline
              preload="metadata"
              poster="/moms-secret-spices-scroll-mockup.png"
              className="w-full h-full object-cover"
            />
            
            {/* Top Quality Badge Overlay */}
            <div className="absolute top-5 left-5 pointer-events-none">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#39251E]/80 backdrop-blur-md text-[#FFF8EE] font-mono text-[11px] font-bold uppercase tracking-wider border border-[#FFF8EE]/20 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#E8A33A] animate-ping" />
                <span>Mom&apos;s Secret Spices · Brand Film</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Saffron Section Transition (Agrumea-Inspired Color Shift) */}
      <section className="py-20 px-6 md:px-12 lg:px-16 bg-[#E8A33A] text-[#39251E] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-[#39251E]/80 font-bold block mb-2">
              Four Stages of Perfection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight">
              From Soil to Sputtering Flame
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="p-8 sm:p-10 rounded-3xl bg-[#FFF8EE] border border-[#39251E]/10 shadow-lg flex flex-col justify-between hover:shadow-2xl transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-3xl font-bold text-[#A9472A]">
                      {step.num}.
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full bg-[#E8A33A]/20 text-[#39251E] font-semibold">
                      {step.highlight}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#39251E] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#39251E]/75 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#39251E] text-[#FFF8EE] hover:bg-[#A9472A] font-mono text-xs uppercase tracking-widest font-bold transition-colors shadow-xl"
              >
                <span>Explore The 27 Spices</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
