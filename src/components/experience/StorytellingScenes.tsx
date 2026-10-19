'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function StorytellingScenes() {
  const scenes = [
    {
      number: 'SCENE 01',
      title: 'THE WHOLE SPICES',
      subtitle: 'From Heritage Soil to Kitchen Hearth',
      description:
        'We reject machine-extruded spice extracts. We source sun-dried Byadgi chillies with wrinkly oil-rich skin, high-curcumin Salem turmeric rhizomes, and hand-plucked green cardamom from Western Ghat rainforests.',
      image: '/images/products/turmeric-powder.jpg',
      badge: 'Single-Origin Sourcing',
    },
    {
      number: 'SCENE 02',
      title: 'THE ANCIENT CRAFT',
      subtitle: 'Slow Cold Stone-Milling',
      description:
        'Industrial high-speed steel pulverizers heat spices up to 90°C, scorching volatile essential oils before they reach your pan. Akshaya Foods uses traditional heavy granite stones operating at low RPMs to keep the spices cool and aromatically intact.',
      image: '/Akshaya Foods Spice Scroll Mockup.png',
      badge: 'Cold-Milled at <35°C',
    },
    {
      number: 'SCENE 03',
      title: 'THE SACRED BLEND',
      subtitle: 'Century-Old Regional Recipes',
      description:
        'Every masala carries a generational legacy: Marathi Moggu and dry copra in royal Mysore Bisi Bele Bath, stone flower and shahi jeera in Hyderabadi Dum Biryani, and slow-roasted lentils in authentic Thanjavur Sambar.',
      image: '/images/products/bisibelebath.jpg',
      badge: 'Authentic Regional Ratios',
    },
    {
      number: 'SCENE 04',
      title: 'THE LIVING KITCHEN',
      subtitle: 'The Sizzle of Pure Tempering',
      description:
        'The true test of a spice is the moment it meets hot ghee: mustard seeds crackling like fireworks, curry leaves releasing intense fragrance, and golden turmeric unfurling its therapeutic brilliance.',
      image: '/images/products/distributor-campaign-artwork.jpg',
      badge: 'Everyday Culinary Magic',
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-[#F0E2CF]/50 border-t border-[#39251E]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#39251E]/15 gap-6"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#A9472A] font-semibold block mb-2">
              The Journey of Flavor
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#39251E] tracking-tight uppercase">
              From Seed to Spoon
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#39251E]/75 max-w-md font-normal leading-relaxed">
            Discover the artisanal philosophy that separates Mom’s Secret Spices from mass-produced supermarket powders.
          </p>
        </motion.div>

        {/* Alternating Cinematic Editorial Scenes */}
        <div className="space-y-20 md:space-y-32">
          {scenes.map((scene, index) => {
            const isEven = index % 2 === 1;
            return (
              <motion.div
                key={scene.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center ${
                  isEven ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Visual Image Column */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className={`lg:col-span-6 relative ${isEven ? 'lg:col-start-7' : ''}`}
                >
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#39251E]/15 group">
                    <Image
                      src={scene.image}
                      alt={scene.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#39251E]/60 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Floating Pill Badge */}
                    <div className="absolute top-5 left-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase bg-[#FFF8EE] text-[#39251E] shadow-md border border-[#39251E]/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33A]"></span>
                        {scene.badge}
                      </span>
                    </div>

                    <div className="absolute bottom-5 left-5 right-5 text-[#FFF8EE]">
                      <span className="font-mono text-xs text-[#E8A33A] tracking-widest uppercase">
                        {scene.number}
                      </span>
                      <h4 className="font-serif text-xl sm:text-2xl font-bold">{scene.subtitle}</h4>
                    </div>
                  </div>
                </motion.div>

                {/* Typography Column */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:col-start-1' : ''}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4 max-w-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#A9472A]">
                        {scene.number}
                      </span>
                      <span className="w-8 h-px bg-[#A9472A]/40" />
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#39251E] tracking-tight uppercase">
                      {scene.title}
                    </h3>

                    <p className="text-base sm:text-lg text-[#39251E]/80 leading-relaxed font-normal">
                      {scene.description}
                    </p>

                    <div className="pt-4">
                      <Link
                        href="/experience"
                        className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-widest uppercase text-[#A9472A] hover:text-[#39251E] transition-colors group"
                      >
                        <span>Experience the Craft</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
