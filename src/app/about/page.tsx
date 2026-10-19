'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Award, Flame, Leaf } from 'lucide-react';

export default function AboutPage() {
  const pillars = [
    {
      step: '01',
      title: 'Heavy Granite Stones',
      subtitle: 'Slow RPM Milling',
      desc: 'High-speed industrial pulverizers rotate at 10,000+ RPM, burning off fragile aromatic terpenes. We grind on heavy granite stones at under 60 RPM to keep spices cool and vibrant.',
      icon: Flame,
    },
    {
      step: '02',
      title: 'No Middlemen Fillers',
      subtitle: 'Direct From Origin',
      desc: 'From Salem turmeric farmers to Byadgi red chilli cooperatives in Haveri, we procure directly at harvest peak, ensuring that every pouch contains 100% whole spice tissue.',
      icon: Leaf,
    },
    {
      step: '03',
      title: 'Pure Clean Labels',
      subtitle: 'Zero Adulteration',
      desc: 'No Sudan red dyes, no added starch fillers, no MSG, no artificial anticaking chemicals, and no hydrogenated palm oils. Read our labels—pure spices only.',
      icon: Award,
    },
  ];

  return (
    <div className="pt-28 pb-24 px-6 md:px-12 bg-[#FFF8EE] min-h-screen overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header Hero */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF1E4] text-[#A9472A] border border-[#A9472A]/20 font-mono text-xs uppercase tracking-widest font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E8A33A]" />
            <span>Since 1998 · Akshaya Foods, Bengaluru</span>
          </motion.span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#39251E] uppercase tracking-tight leading-tight mb-6">
            The Secret in Every Spoon
          </h1>
          <p className="text-base sm:text-lg text-[#39251E]/80 leading-relaxed font-normal">
            Mom’s Secret Spices was born out of a simple, urgent observation: modern supermarket shelves had become flooded with burnt, artificially colored powders cut with starch, sawdust, and synthetic anti-caking chemicals. We set out to restore what our mothers and grandmothers took for granted—pure, cold stone-ground spice magic.
          </p>
        </motion.div>

        {/* Feature Heritage Banner Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden shadow-2xl border border-[#39251E]/10 mb-20 bg-white group"
        >
          <Image
            src="/spice-catalog-banner.jpg"
            alt="Akshaya Foods Spice Milling Craft"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#39251E]/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-[#FFF8EE]">
            <span className="font-mono text-xs uppercase tracking-widest text-[#E8A33A] font-semibold block mb-1">
              Stone-Grinding Traditions
            </span>
            <p className="font-serif text-xl sm:text-2xl font-bold">Cold Granite Milling At &lt;35°C</p>
          </div>
        </motion.div>

        {/* The 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.step}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="p-8 rounded-3xl bg-[#FAF1E4] border border-[#39251E]/10 flex flex-col justify-between hover:border-[#A9472A]/40 transition-colors shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#A9472A] font-bold">
                      {pillar.step} / {pillar.subtitle}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#A9472A]/10 text-[#A9472A] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#39251E] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#39251E]/75 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Heritage Story & CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-10 sm:p-14 rounded-3xl bg-[#A9472A] text-[#FFF8EE] flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full bg-[#E8A33A]/20 blur-2xl pointer-events-none" />
          
          <div className="space-y-3 relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-[#E8A33A] font-bold block">
              Ready to Taste the Difference?
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Bring Heritage Cooking Home
            </h3>
            <p className="text-sm sm:text-base text-[#FFF8EE]/80 max-w-lg font-normal">
              Explore our verified catalogue of 27 artisanal blends with instant WhatsApp ordering.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="shrink-0 relative z-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FFF8EE] text-[#A9472A] hover:bg-[#E8A33A] hover:text-[#39251E] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-lg hover:shadow-xl"
            >
              <span>Browse Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
