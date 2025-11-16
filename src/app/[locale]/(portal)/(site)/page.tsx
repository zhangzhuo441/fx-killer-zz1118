"use client";
import { Code, Flex, Text } from "@radix-ui/themes";
import { LinkPreview } from "@/components/ui/link-preview";
import { SparklesCore } from "@/components/ui/sparkles";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EmailContactModal from '@/components/custom/EmailContactModal';
import BrandName from '@/components/custom/BrandName';
import BrandSlogans from '@/components/custom/BrandSlogans';
import { FadeInSlide, ScaleFadeIn, HoverCard, PulseButton, FloatingBadge, StaggeredFadeIn } from '@/components/custom/AnimatedSection';
import Testimonials from '@/components/custom/Testimonials';
import StatsSection from '@/components/custom/StatsSection';
import InterviewCTA from '@/components/custom/InterviewCTA';
import PartnersLogos from '@/components/custom/PartnersLogos';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import ShineButton from '@/components/custom/ShineButton';
import { CosmicPortal } from '@/components/ui/cosmic-portal';
import { NeuralBackground } from '@/components/ui/neural-background';
import { BackgroundBeams } from '@/components/ui/background-beams';
import Hyperspeed, { hyperspeedPresets } from '@/components/effects/Hyperspeed';

const DummyContent = () => {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 收益图片列表 (1-15)
  const profitImages = [
    '/profits/1.png',
    '/profits/2.png',
    '/profits/3.png',
    '/profits/4.png',
    '/profits/5.png',
    '/profits/6.png',
    '/profits/7.png',
    '/profits/8.png',
    '/profits/9.png',
    '/profits/10.png',
    '/profits/11.png',
    '/profits/12.jpg',
    '/profits/13.png',
    '/profits/14.png',
    '/profits/15.png',
  ];

  // 自动滚动图片 - 每次显示3张
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => {
        const nextIndex = prev + 3;
        // 如果超出范围，回到开头
        return nextIndex >= profitImages.length ? 0 : nextIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [profitImages.length]);

  return (
    <div className="w-full -mt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden h-screen bg-black">
        {/* Hyperspeed Background with Akira Preset */}
        <div className="absolute inset-0 w-full h-full">
          <Hyperspeed effectOptions={hyperspeedPresets.akira} />
        </div>

        {/* Content Overlay - Centered in viewport */}
        <div className="relative z-10 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl flex flex-col space-y-10">
            {/* Main Title */}
            <ScaleFadeIn delay={0.2}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tight leading-none">
                <BrandName inHero={true} />
              </h1>
            </ScaleFadeIn>

            {/* Subtitle */}
            <FadeInSlide direction="right" delay={0.4}>
              <div className="text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight space-y-2">
                {language === 'zh' ? (
                  <>
                    <p>精准、专业、高效</p>
                    <p>
                      <span className="inline-block bg-[#ff102a] text-white px-3 py-1 animate-pulse">免费培养</span>真正的外汇交易专家
                    </p>
                  </>
                ) : (
                  <>
                    <p>Precise, Professional, Efficient</p>
                    <p>
                      <span className="inline-block bg-[#ff102a] text-white px-3 py-1 animate-pulse whitespace-nowrap">Free Training</span>{' '}
                      for True Forex Trading&nbsp;Experts
                    </p>
                  </>
                )}
              </div>
            </FadeInSlide>

            {/* CTAs */}
            <FadeInSlide direction="right" delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-6">
                <PulseButton className="w-full sm:w-auto">
                  <ShineButton
                    onClick={() => router.push(`/${language}/splan/join-us`)}
                    className="w-full px-12 py-6 bg-[#ff102a] text-white text-xl font-black border-2 border-[#ff102a] hover:bg-[#eb383e] hover:border-[#eb383e] transition-all shadow-lg"
                  >
                    {t('hero.cta.learn')}
                  </ShineButton>
                </PulseButton>
                <button
                  onClick={() => router.push(`/${language}/dashboard`)}
                  className="w-full sm:w-auto px-12 py-6 bg-transparent text-white text-xl font-black border-2 border-[#dadafa] hover:bg-[#dadafa] hover:text-black transition-all"
                >
                  {t('hero.cta.dashboard')}
                </button>
              </div>
            </FadeInSlide>
            </div>
          </div>
        </div>
      </div>

      {/* 为什么选择 FX Killer - Akira 风格 */}
      <div className="relative bg-black w-full">
        <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#ff102a]">
            {t('why.title')}
          </h2>
          <div className="w-24 h-1 bg-[#ff102a] mx-auto mb-4"></div>
          <p className="text-[#dadafa] text-lg">
            {t('why.subtitle')}
          </p>
        </div>

        {/* 核心优势 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FadeInSlide direction="up" delay={0.1}>
            <HoverCard className="h-full">
              <div className="p-8 bg-[#0a0a0a] border-2 border-[#dadafa]/30 h-full hover:border-[#ff102a] transition-colors group">
                <div className="mb-4 w-12 h-12 bg-[#ff102a] flex items-center justify-center group-hover:bg-[#eb383e] transition-colors">
                  <span className="text-2xl text-white font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{t('advantage.selection.title')}</h3>
                <p className="text-[#b0b0b0] leading-relaxed">
                  {t('advantage.selection.desc')}
                </p>
              </div>
            </HoverCard>
          </FadeInSlide>

          <FadeInSlide direction="up" delay={0.2}>
            <HoverCard className="h-full">
              <div className="p-8 bg-[#0a0a0a] border-2 border-[#dadafa]/30 h-full hover:border-[#ff102a] transition-colors group">
                <div className="mb-4 w-12 h-12 bg-[#ff102a] flex items-center justify-center group-hover:bg-[#eb383e] transition-colors">
                  <span className="text-2xl text-white font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{t('advantage.growth.title')}</h3>
                <p className="text-[#b0b0b0] leading-relaxed">
                  {t('advantage.growth.desc')}
                </p>
              </div>
            </HoverCard>
          </FadeInSlide>

          <FadeInSlide direction="up" delay={0.3}>
            <HoverCard className="h-full">
              <div className="p-8 bg-[#0a0a0a] border-2 border-[#dadafa]/30 h-full hover:border-[#ff102a] transition-colors group">
                <div className="mb-4 w-12 h-12 bg-[#ff102a] flex items-center justify-center group-hover:bg-[#eb383e] transition-colors">
                  <span className="text-2xl text-white font-bold">3</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{t('advantage.commission.title')}</h3>
                <p className="text-[#b0b0b0] leading-relaxed">
                  {t('advantage.commission.desc')}
                </p>
              </div>
            </HoverCard>
          </FadeInSlide>
        </div>

        {/* 与传统培训对比 */}
        <div className="bg-[#131318] border-2 border-[#dadafa]/20 p-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            <span className="bg-[#ff102a] text-white px-4 py-2">{t('comparison.vs')}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FX Killer */}
            <div className="bg-[#0a0a0a] p-6 border-l-4 border-[#ff102a]">
              <h4 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                <span className="text-2xl"></span> {t('comparison.fxkiller')}
              </h4>
              <ul className="space-y-3 text-[#e0e0e0]">
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{t('comparison.free')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{t('comparison.practical')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{t('comparison.selection')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{t('comparison.funding')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{t('comparison.share')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{t('comparison.career')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#ff102a] font-bold">•</span>
                  <span>{t('comparison.discipline')}</span>
                </li>
              </ul>
            </div>

            {/* 传统培训 */}
            <div className="bg-[#1a1a1a] p-6 border-l-4 border-[#dadafa]/30">
              <h4 className="text-xl font-bold mb-4 text-[#dadafa] flex items-center gap-2">
                <span className="text-2xl"></span> {t('comparison.traditional')}
              </h4>
              <ul className="space-y-3 text-[#909090]">
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('comparison.highfee')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('comparison.theory')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('comparison.acceptall')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('comparison.selffunded')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('comparison.nosupport')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('comparison.noplan')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">•</span>
                  <span>{t('comparison.loose')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-black border-2 border-[#ff102a] text-white p-6 text-center">
            <p className="text-lg font-semibold">
              {t('comparison.emphasis')}
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* 职业发展路径 - Akira 风格 */}
      <div className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* 发展阶梯 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {/* 阶段 1 */}
            <div className="relative">
              <div className="bg-[#0a0a0a] border-2 border-[#ff102a] p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#ff102a] border-2 border-[#ff102a] flex items-center justify-center">
                  <span className="text-white font-black text-2xl">1</span>
                </div>
                <div className="mt-4">
                  <div className="inline-block px-3 py-1 bg-[#ff102a] text-white text-xs font-bold mb-3">
                    {t('career.stage1.days')}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{t('career.stage1.title')}</h3>
                  <p className="text-sm text-[#b0b0b0] mb-4">
                    {t('career.stage1.desc')}
                  </p>
                  <div className="bg-[#131318] p-3 border-l-2 border-[#eb383e]">
                    <p className="text-xs text-[#dadafa]">
                      {t('career.stage1.warning')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 阶段 2 */}
            <div className="relative">
              <div className="bg-[#0a0a0a] border-2 border-[#eb383e] p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#eb383e] border-2 border-[#eb383e] flex items-center justify-center">
                  <span className="text-white font-black text-2xl">2</span>
                </div>
                <div className="mt-4">
                  <div className="inline-block px-3 py-1 bg-[#eb383e] text-white text-xs font-bold mb-3">
                    {t('career.stage2.days')}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{t('career.stage2.title')}</h3>
                  <p className="text-sm text-[#b0b0b0] mb-4">
                    {t('career.stage2.desc')}
                  </p>
                  <div className="bg-[#131318] p-3 border-l-2 border-[#dadafa]/50">
                    <p className="text-xs text-[#dadafa]">
                      {t('career.stage2.tip')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 阶段 3 */}
            <div className="relative">
              <div className="bg-[#0a0a0a] border-2 border-[#dadafa]/50 p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#dadafa] border-2 border-[#dadafa] flex items-center justify-center">
                  <span className="text-black font-black text-2xl">3</span>
                </div>
                <div className="mt-4">
                  <div className="inline-block px-3 py-1 bg-[#dadafa] text-black text-xs font-bold mb-3">
                    {t('career.stage3.days')}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{t('career.stage3.title')}</h3>
                  <p className="text-sm text-[#b0b0b0] mb-4">
                    {t('career.stage3.desc')}
                  </p>
                  <div className="bg-[#131318] p-3 border-l-2 border-[#dadafa]">
                    <p className="text-xs text-[#dadafa]">
                      {t('career.stage3.success')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 阶段 4 */}
            <div className="relative">
              <div className="bg-[#ff102a] border-2 border-[#ff102a] p-6 h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white border-2 border-white flex items-center justify-center">
                  <span className="text-[#ff102a] font-black text-2xl">★</span>
                </div>
                <div className="mt-4">
                  <div className="inline-block px-3 py-1 bg-white text-[#ff102a] text-xs font-bold mb-3">
                    {t('career.stage4.path')}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{t('career.stage4.title')}</h3>
                  <p className="text-sm text-white/90 mb-4">
                    {t('career.stage4.desc')}
                  </p>
                  <div className="bg-[#eb383e] p-3 border-l-2 border-white">
                    <p className="text-xs text-white font-semibold">
                      {t('career.stage4.goal')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 你是否符合基本条件 - Akira 风格 */}
      <div className="relative bg-black w-full">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#ff102a]">
            {t('req.title')}
          </h2>
          <div className="w-24 h-1 bg-[#ff102a] mx-auto mb-4"></div>
          <p className="text-[#dadafa] text-lg">
            {t('req.subtitle')}
          </p>
        </div>

        {/* 条件卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 人群画像 */}
          <div className="bg-[#0a0a0a] p-8 border-2 border-[#dadafa]/30 hover:border-[#ff102a] transition-colors group">
            <div className="text-white">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{t('req.profile.title')}</h3>
              </div>
              <div className="space-y-5">
                <div className="border-l-4 border-[#dadafa] pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.profile.education')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.profile.education.desc')}</p>
                </div>
                <div className="border-l-4 border-[#dadafa] pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.profile.psychology')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.profile.psychology.desc')}</p>
                </div>
                <div className="border-l-4 border-[#dadafa] pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.profile.character')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.profile.character.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 时间与环境 */}
          <div className="bg-[#0a0a0a] p-8 border-2 border-[#dadafa]/30 hover:border-[#ff102a] transition-colors group">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">{t('req.time.title')}</h3>
            </div>
            <div className="space-y-5">
              <div className="flex items-start gap-3 hover:bg-[#131318] p-3 -m-3 transition-colors">
                <div>
                  <p className="font-bold text-white mb-1">{t('req.time.commitment')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.time.commitment.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#131318] p-3 -m-3 transition-colors">
                <div>
                  <p className="font-bold text-white mb-1">{t('req.time.equipment')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.time.equipment.desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 hover:bg-[#131318] p-3 -m-3 transition-colors">
                <div>
                  <p className="font-bold text-white mb-1">{t('req.time.environment')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.time.environment.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 在线时间 */}
          <div className="bg-[#0a0a0a] p-8 border-2 border-[#dadafa]/30 hover:border-[#ff102a] transition-colors group">
            <div className="text-white">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{t('req.online.title')}</h3>
              </div>
              <div className="space-y-5">
                <div className="border-l-4 border-[#dadafa] pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.online.hours')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.online.hours.desc')}</p>
                </div>
                <div className="border-l-4 border-[#dadafa] pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg mb-1">{t('req.online.debrief')}</p>
                  <p className="text-sm text-[#b0b0b0]">{t('req.online.debrief.desc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 适合与否 */}
          <div className="bg-[#0a0a0a] p-8 border-2 border-[#dadafa]/30 hover:border-[#ff102a] transition-colors group">
            <div className="text-white">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{t('unsuitable.title')}</h3>
              </div>
              <div className="space-y-5">
                <div className="border-l-4 border-[#eb383e] pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg flex items-center gap-2 mb-1">
                    <span className="text-[#ff102a]">✗</span>
                    {t('unsuitable.gambler')}
                  </p>
                  <p className="text-sm text-[#b0b0b0]">{t('unsuitable.gambler.desc')}</p>
                </div>
                <div className="border-l-4 border-[#dadafa] pl-4 hover:pl-6 transition-all">
                  <p className="font-bold text-lg flex items-center gap-2 mb-1">
                    <span className="text-[#dadafa]">✓</span>
                    {t('expectations.mindset')}
                  </p>
                  <p className="text-sm text-[#b0b0b0]">{t('expectations.mindset.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 重要提示 */}
        <div className="mt-8 bg-[#131318] text-white p-8 border-2 border-[#ff102a]">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-[#ff102a] flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold mb-3">{t('req.notice.title')}</h4>
              <p className="text-lg leading-relaxed mb-4">
                {t('req.notice.once')}{t('req.notice.desc')}
              </p>
              <p className="text-[#dadafa]">
                {t('req.notice.philosophy')}
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* 视频介绍板块 - Akira 风格 */}
      <div className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-[#ff102a] w-full">
            {t('video.title')}
          </h2>
          <p className="text-center text-[#dadafa] mb-12 text-lg">
            {t('video.subtitle')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 视频 1 */}
            <div className="bg-[#0a0a0a] border-2 border-[#dadafa]/30 overflow-hidden group hover:border-[#ff102a] transition-all">
              <div className="relative h-64 bg-[#131318] flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4"></div>
                  <p className="text-lg font-semibold">{t('video.doc1.title')}</p>
                  <p className="text-sm text-[#dadafa]">{t('video.doc1.rating')}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{t('video.doc1.title')}</h3>
                <p className="text-[#b0b0b0] mb-4 text-sm leading-relaxed">
                  {t('video.doc1.desc')}
                </p>
                <a
                  href="https://www.bilibili.com/video/BV19a411X7eY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#ff102a] text-white font-bold border-2 border-[#ff102a] hover:bg-[#eb383e] hover:border-[#eb383e] transition-colors"
                >
                  {t('video.doc1.cta')}
                </a>
              </div>
            </div>

            {/* 视频 2 */}
            <div className="bg-[#0a0a0a] border-2 border-[#dadafa]/30 overflow-hidden group hover:border-[#ff102a] transition-all">
              <div className="relative h-64 bg-[#131318] flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4"></div>
                  <p className="text-lg font-semibold">{t('video.doc2.title')}</p>
                  <p className="text-sm text-[#dadafa]">{t('video.doc2.rating')}</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white">{t('video.doc2.title')}</h3>
                <p className="text-[#b0b0b0] mb-4 text-sm leading-relaxed">
                  {t('video.doc2.desc')}
                </p>
                <a
                  href="https://www.bilibili.com/video/BV1FZ4y1o734"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-[#ff102a] text-white font-bold border-2 border-[#ff102a] hover:bg-[#eb383e] hover:border-[#eb383e] transition-colors"
                >
                  {t('video.doc2.cta')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 学员展示 - 收益统计 - Akira 风格 */}
      <div className="relative bg-black w-full">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* 收益统计 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0a0a0a] p-6 border-2 border-[#dadafa]/30 text-center">
            <div className="text-4xl font-black text-white mb-2">{t('showcase.junior')}</div>
            <p className="text-2xl font-bold text-[#dadafa]">¥10,000 - ¥30,000</p>
            <p className="text-sm text-[#b0b0b0] mt-2">{t('showcase.income.range')}</p>
          </div>
          <div className="bg-[#0a0a0a] p-6 border-2 border-[#ff102a] text-center">
            <div className="text-4xl font-black text-white mb-2">{t('showcase.intermediate')}</div>
            <p className="text-2xl font-bold text-[#eb383e]">¥30,000 - ¥60,000</p>
            <p className="text-sm text-[#b0b0b0] mt-2">{t('showcase.income.range')}</p>
          </div>
          <div className="bg-[#ff102a] p-6 border-2 border-[#ff102a] text-center">
            <div className="text-4xl font-black text-white mb-2">{t('showcase.senior')}</div>
            <p className="text-2xl font-bold text-white">¥60,000 - ¥100,000+</p>
            <p className="text-sm text-white/70 mt-2">{t('showcase.income.range')}</p>
          </div>
        </div>
      </div>
      </div>

      {/* CTA - Akira 风格 */}
      <div className="relative bg-black py-20 w-full overflow-hidden">
        {/* Neural Background - Light mode (白色神经网络) */}
        <div className="dark:hidden">
          <NeuralBackground
            hue={0}
            saturation={0.5}
            chroma={0.4}
            isDark={false}
          />
        </div>

        {/* Neural Background - Dark mode (黑色神经网络) */}
        <div className="hidden dark:block">
          <NeuralBackground
            hue={0}
            saturation={0.5}
            chroma={0.4}
            isDark={true}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-[#dadafa] mb-4">
            {t('cta.subtitle')}
          </p>

          {/* 通过率警告 - Akira 重新设计 */}
          <div className="relative max-w-3xl mx-auto mb-12">
            {/* 背景装饰 */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff102a]/20 via-[#eb383e]/20 to-[#ff102a]/20 blur-xl"></div>

            <div className="relative bg-[#131318] border-2 border-[#ff102a]/50 p-8 shadow-2xl">
              <div className="flex flex-col items-center mb-6">
                <div className="w-16 h-16 bg-[#ff102a] flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-[#ff102a] mb-2">{t('cta.notice.title')}</h3>
                <div className="h-1 w-24 bg-[#ff102a]"></div>
              </div>

              <div className="text-center mb-8">
                <p className="text-sm text-[#dadafa] mb-3">{t('cta.passrate')}</p>
                <p className="text-6xl font-black text-white mb-2">
                  <span className="text-[#ff102a]">10</span>-<span className="text-[#ff102a]">15</span><span className="text-4xl">%</span>
                </p>
                <p className="text-[#dadafa] text-lg">
                  {t('cta.passrate.desc')}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#0a0a0a] backdrop-blur-sm p-4 border border-[#eb383e]/30">
                  <p className="text-xs text-[#b0b0b0] mb-2">{t('cta.elimination')}</p>
                  <p className="text-sm text-white font-bold">{t('cta.elimination.reason')}</p>
                </div>
                <div className="bg-[#0a0a0a] backdrop-blur-sm p-4 border border-[#eb383e]/30">
                  <p className="text-xs text-[#b0b0b0] mb-2">{t('cta.opportunity')}</p>
                  <p className="text-sm text-white font-bold">{t('cta.opportunity.value')}</p>
                </div>
                <div className="bg-[#0a0a0a] backdrop-blur-sm p-4 border border-[#eb383e]/30">
                  <p className="text-xs text-[#b0b0b0] mb-2">{t('cta.time.cost')}</p>
                  <p className="text-sm text-white font-bold">{t('cta.time.value')}</p>
                </div>
                <div className="bg-[#0a0a0a] backdrop-blur-sm p-4 border border-[#dadafa]/30">
                  <p className="text-xs text-[#b0b0b0] mb-2">{t('cta.money.cost')}</p>
                  <p className="text-sm text-[#dadafa] font-bold">{t('cta.money.value')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="px-10 py-5 bg-[#ff102a] text-white font-bold text-lg border-2 border-[#ff102a] hover:bg-[#eb383e] hover:border-[#eb383e] transition-colors animate-shake"
            >
              {t('cta.button.interview')}
            </button>
            <p className="text-sm text-[#b0b0b0]">
              {t('cta.button.note')}
            </p>
          </div>
        </div>
      </div>

      {/* Email Contact Modal */}
      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <Testimonials />

      {/* Partners Logos */}
      <PartnersLogos />

      {/* Interview CTA */}
      <InterviewCTA />

      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title="职业交易员面试"
      />
    </div>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="w-full">
      <DummyContent />
    </div>
  );
}
