"use client";

import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';

const logos = [
  { id: 1, src: '/logos/1.png', alt: 'Partner 1' },
  { id: 2, src: '/logos/2.png', alt: 'Partner 2' },
  { id: 3, src: '/logos/3.png', alt: 'Partner 3' },
  { id: 4, src: '/logos/4.png', alt: 'Partner 4' },
  { id: 5, src: '/logos/5.png', alt: 'Partner 5' },
  { id: 6, src: '/logos/6.png', alt: 'Partner 6' },
  { id: 7, src: '/logos/7.png', alt: 'Partner 7' },
  { id: 8, src: '/logos/8.png', alt: 'Partner 8' },
  { id: 9, src: '/logos/9.png', alt: 'Partner 9' },
  { id: 10, src: '/logos/10.png', alt: 'Partner 10' },
];

export default function PartnersLogos() {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  // 双倍数组用于无缝循环
  const doubledLogos = [...logos, ...logos];

  const partners = [
    {
      name: 'EC Markets',
      code: '99R9C',
      link: 'https://i.ecmarkets.com/api/client/pm/2/99R9C',
      benefit: isZh ? '超低点差 + 全额返佣' : 'Ultra-low spreads + Full rebate'
    },
    {
      name: 'TickMill',
      code: 'IB47958600',
      link: 'https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB47958600&utm_medium=Open+Account&utm_source=link&lp=https%3A%2F%2Fmy.tickmill.com%2Fzh%2Fsign-up%2F',
      benefit: isZh ? '超低点差 + 全额返佣' : 'Ultra-low spreads + Full rebate'
    },
    {
      name: 'Binance',
      code: 'YYSTARK',
      link: 'https://www.maxweb.red/join?ref=YYSTARK',
      benefit: isZh ? '最低手续费 + 最高返佣' : 'Lowest fees + Maximum rebate'
    },
    {
      name: 'FTMO',
      code: null,
      link: 'https://trader.ftmo.com/?affiliates=UUdNjacFYttdgsZcEozt',
      benefit: isZh ? '专属优惠 + 立减折扣' : 'Exclusive offers + Instant discount'
    },
    {
      name: 'FundedNext',
      code: 'REFQKEAYK',
      link: 'https://fundednext.com/',
      benefit: isZh ? '专属优惠 + 立减折扣' : 'Exclusive offers + Instant discount'
    }
  ];

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            {isZh ? '合作伙伴' : 'Our Partners'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {isZh
              ? '与全球领先的金融机构和平台建立战略合作伙伴关系'
              : 'Strategic partnerships with leading global financial institutions and platforms'}
          </p>
        </motion.div>

        {/* Logos Auto Scroll */}
        <div className="relative mb-12 overflow-hidden">
          <motion.div
            className="flex gap-12"
            animate={{
              x: [0, -(160 + 48) * logos.length], // 160px width + 48px gap
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {doubledLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                  className="object-contain hover:scale-110 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Partnership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-50 border-2 border-blue-800 p-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left: Description */}
            <div className="text-center md:text-left">
              <p className="text-base md:text-lg text-blue-800">
                {isZh ? (
                  <>
                    时空交易是 <span className="font-bold">EC Markets</span>、<span className="font-bold">TickMill</span>、<span className="font-bold">Binance</span>、<span className="font-bold">FTMO</span>、<span className="font-bold">FundedNext</span> 的<span className="font-black text-xl underline decoration-2 underline-offset-4">官方合作伙伴</span>
                  </>
                ) : (
                  <>
                    Space-time trading is an <span className="font-black text-xl underline decoration-2 underline-offset-4">official partner</span> of <span className="font-bold">EC Markets</span>, <span className="font-bold">TickMill</span>, <span className="font-bold">Binance</span>, <span className="font-bold">FTMO</span>, <span className="font-bold">FundedNext</span>
                  </>
                )}
              </p>
              <p className="text-sm text-gray-600 mt-2">
                {isZh ? (
                  <>
                    使用专属链接注册，享受<span className="font-black bg-blue-800 text-white px-2 py-0.5">平台最高自动返佣</span>、<span className="font-bold underline">超低点差</span>、<span className="font-bold underline">手续费</span>
                    <br />
                    <span className="font-black">FTMO</span> 和 <span className="font-black">FundedNext</span> 更有<span className="font-black text-base bg-blue-800 text-white px-2 py-0.5 ml-1">立减优惠</span>
                  </>
                ) : (
                  <>
                    Register with exclusive links for <span className="font-black bg-blue-800 text-white px-2 py-0.5">maximum auto-rebates</span>, <span className="font-bold underline">ultra-low spreads & fees</span>
                    <br />
                    <span className="font-black">FTMO</span> & <span className="font-black">FundedNext</span> with <span className="font-black text-base bg-blue-800 text-white px-2 py-0.5 ml-1">instant discounts</span>
                  </>
                )}
              </p>
            </div>

            {/* Right: Partner Links */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {partners.map((partner, index) => (
                <motion.a
                  key={partner.name}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group"
                >
                  <div className="bg-white border-2 border-gray-200 hover:border-blue-800 transition-all px-4 py-2 flex items-center gap-2">
                    <span className="font-bold text-gray-800 group-hover:text-blue-800 text-sm group-hover:underline transition-colors">
                      {partner.name}
                    </span>
                    {partner.name === 'FundedNext' && partner.code && (
                      <>
                        <span className="text-gray-400">|</span>
                        <code className="text-xs bg-gray-100 px-2 py-0.5 text-gray-800 group-hover:text-blue-800 font-mono transition-colors">
                          {partner.code}
                        </code>
                      </>
                    )}
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-blue-800 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
