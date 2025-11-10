"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';

const logos = [
  { id: 1, src: '/logos/2.png', alt: 'Partner 2' },
  { id: 2, src: '/logos/3.png', alt: 'Partner 3' },
  { id: 3, src: '/logos/4.svg', alt: 'Partner 4' },
  { id: 4, src: '/logos/5.png', alt: 'Partner 5' },
  { id: 5, src: '/logos/6.png', alt: 'Partner 6' },
  { id: 6, src: '/logos/7.png', alt: 'Partner 7' },
  { id: 7, src: '/logos/8.png', alt: 'Partner 8' },
  { id: 8, src: '/logos/9.svg', alt: 'Partner 9' },
  { id: 9, src: '/logos/10.svg', alt: 'Partner 10' },
];

export default function PartnersLogos() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  return (
    <section className="py-16 bg-white dark:bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            {isZh ? '合作伙伴' : 'Our Partners'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {isZh
              ? '与全球领先的金融机构和平台建立战略合作伙伴关系'
              : 'Strategic partnerships with leading global financial institutions and platforms'}
          </p>
        </motion.div>

        {/* Logos Horizontal Scroll */}
        <div className="overflow-x-auto pb-4">
          <div className="flex items-center gap-12 min-w-max px-4">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center hover:scale-110 transition-transform duration-300"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    sizes="160px"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
