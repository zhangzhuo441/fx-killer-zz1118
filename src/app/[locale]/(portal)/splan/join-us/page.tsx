"use client";

import React, { useState } from 'react';
import EmailContactModal from '@/components/custom/EmailContactModal';
import { useLanguage } from '@/contexts/LanguageContext';
import ShineButton from '@/components/custom/ShineButton';
import LocaleLink from '@/components/navigation/LocaleLink';

export default function JoinUsPage() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const { t, language } = useLanguage();

  const handleApply = () => {
    setIsEmailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero - 增强版 */}
      <div className="relative bg-white text-blue-900 border-b-2 border-gray-200 overflow-hidden">
        {/* 装饰性背景 - 移除或改为浅色 */}
        <div className="absolute inset-0 opacity-5">
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="inline-block px-6 py-2 bg-blue-50 border border-blue-100 backdrop-blur-sm mb-6">
            <span className="text-sm font-semibold tracking-wider text-blue-800">{t('joinus.hero.badge')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-blue-900">
            <span className="font-black">{t('joinus.hero.title1')}</span>
            <br />
            <span className="text-3xl md:text-4xl font-normal text-gray-500">{t('joinus.hero.title2')}</span>
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('joinus.hero.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="px-4 py-2 bg-white border border-gray-200 shadow-sm backdrop-blur-sm">
              <span className="text-blue-800 font-bold">{t('joinus.hero.stat1.value')}</span> <span className="text-gray-600">{t('joinus.hero.stat1')}</span>
            </div>
            <div className="px-4 py-2 bg-white border border-gray-200 shadow-sm backdrop-blur-sm">
              <span className="text-blue-800 font-bold">{t('joinus.hero.stat2.value')}</span> <span className="text-gray-600">{t('joinus.hero.stat2')}</span>
            </div>
            <div className="px-4 py-2 bg-white border border-gray-200 shadow-sm backdrop-blur-sm">
              <span className="text-blue-800 font-bold">{t('joinus.hero.stat3.value')}</span> <span className="text-gray-600">{t('joinus.hero.stat3')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-24">

        {/* Welcome */}
        <section className="relative">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-blue-800"></div>
            <h2 className="text-4xl font-black text-blue-900 dark:text-white">{t('joinus.welcome.title')}</h2>
          </div>
          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 border-l-4 border-blue-800">
              <p className="mb-4 text-gray-700">
                {t('joinus.welcome.intro')}
              </p>
              <div className="inline-block bg-blue-800 text-white px-6 py-3 font-bold text-xl">
                {t('joinus.welcome.warning')}
              </div>
            </div>
            <p className="pl-8 border-l-2 border-gray-200">
              {t('joinus.welcome.desc')}
            </p>
          </div>
        </section>

        {/* About */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-blue-800"></div>
            <h2 className="text-4xl font-black text-blue-900 dark:text-white">{t('joinus.about.title')}</h2>
          </div>
          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            <p className="pl-8 border-l-2 border-gray-200">
              {t('joinus.about.desc1')}
            </p>
            <p className="pl-8 border-l-2 border-gray-200">
              {t('joinus.about.desc2')}
            </p>
            <div className="bg-blue-50 text-gray-800 p-8 border-2 border-blue-800">
              <h3 className="text-2xl font-bold mb-6 text-blue-900">{t('joinus.about.timeline')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                <div className="bg-white p-4 border border-blue-100 shadow-sm">
                  <p className="font-bold mb-2 text-blue-800">{t('joinus.about.phase1.title')}</p>
                  <p className="text-sm text-gray-600">{t('joinus.about.phase1.desc')}</p>
                </div>
                <div className="bg-white p-4 border border-blue-100 shadow-sm">
                  <p className="font-bold mb-2 text-blue-800">{t('joinus.about.phase2.title')}</p>
                  <p className="text-sm text-gray-600">{t('joinus.about.phase2.desc')}</p>
                </div>
                <div className="bg-white p-4 border border-blue-100 shadow-sm">
                  <p className="font-bold mb-2 text-blue-800">{t('joinus.about.notfit.title')}</p>
                  <p className="text-sm text-gray-600">{t('joinus.about.notfit.desc')}</p>
                </div>
                <div className="bg-white p-4 border border-blue-100 shadow-sm">
                  <p className="font-bold mb-2 text-blue-800">{t('joinus.about.fit.title')}</p>
                  <p className="text-sm text-gray-600">{t('joinus.about.fit.desc')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Resources */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-blue-800"></div>
            <h2 className="text-4xl font-black text-blue-900 dark:text-white">{t('joinus.videos.title')}</h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 pl-8 border-l-2 border-gray-200">
            {t('joinus.videos.desc')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://www.bilibili.com/video/BV19a411X7eY" target="_blank" rel="noopener noreferrer"
               className="group relative bg-white border border-gray-200 hover:border-blue-800 hover:shadow-lg transition-all p-8">
              <div className="text-5xl mb-4">📺</div>
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold mb-3 border border-blue-100">
                {t('joinus.videos.doc1.rating')}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-blue-900 group-hover:text-blue-700 transition-colors">{t('video.doc1.title')}</h3>
              <p className="text-sm text-gray-600">
                {t('joinus.videos.doc1.desc')}
              </p>
              <div className="mt-6 flex items-center text-blue-800 font-bold group-hover:translate-x-2 transition-transform">
                {t('joinus.videos.doc1.cta')}
                <span className="ml-2">→</span>
              </div>
            </a>
            <a href="https://www.bilibili.com/video/BV1FZ4y1o734" target="_blank" rel="noopener noreferrer"
               className="group relative bg-white border border-gray-200 hover:border-blue-800 hover:shadow-lg transition-all p-8">
              <div className="text-5xl mb-4">🎬</div>
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold mb-3 border border-blue-100">
                {t('joinus.videos.doc2.rating')}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-blue-900 group-hover:text-blue-700 transition-colors">{t('video.doc2.title')}</h3>
              <p className="text-sm text-gray-600">
                {t('joinus.videos.doc2.desc')}
              </p>
              <div className="mt-6 flex items-center text-blue-800 font-bold group-hover:translate-x-2 transition-transform">
                {t('joinus.videos.doc2.cta')}
                <span className="ml-2">→</span>
              </div>
            </a>
          </div>
        </section>

        {/* Your Profile */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-blue-800"></div>
            <h2 className="text-4xl font-black text-blue-900 dark:text-white">{t('joinus.profile.title')}</h2>
          </div>
          <div className="space-y-8">
            {/* Warning Box - kept gray/neutral but cleaner */}
            <div className="bg-gray-50 p-8 border-l-4 border-gray-400">
              <div className="flex gap-4">
                <span className="text-2xl">⚠️</span>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('joinus.profile.unsuited')}
                </p>
              </div>
            </div>

            {/* Income Potential - Highlighted in Blue */}
            <div className="bg-blue-900 text-white p-8 shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
               <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">{t('joinus.profile.income.title')}</h3>
                <p className="text-base leading-relaxed text-blue-100">
                  {t('joinus.profile.income.desc')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-50 text-blue-800 flex items-center justify-center text-2xl rounded-lg">
                    🎯
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900">{t('joinus.profile.basic.title')}</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    {t('joinus.profile.basic.1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    {t('joinus.profile.basic.2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    {t('joinus.profile.basic.3')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    {t('joinus.profile.basic.4')}
                  </li>
                </ul>
              </div>

              <div className="bg-white p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-50 text-blue-800 flex items-center justify-center text-2xl rounded-lg">
                    ⏰
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900">{t('joinus.profile.time.title')}</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    {t('joinus.profile.time.1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    {t('joinus.profile.time.2')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Training Plan */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-blue-800"></div>
            <h2 className="text-4xl font-black text-blue-900 dark:text-white">{t('joinus.plan.title')}</h2>
          </div>
          <div className="space-y-6">
            {/* Phase 1 */}
            <div className="group relative bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-blue-800 transition-all">
              <div className="absolute -left-3 -top-3 w-12 h-12 bg-blue-800 shadow-md flex items-center justify-center">
                <span className="text-white font-black text-xl">1</span>
              </div>
              <div className="ml-4">
                <div className="inline-block px-4 py-1 bg-blue-50 text-blue-800 text-sm font-bold mb-4 border border-blue-100">
                  {t('joinus.plan.phase1.days')}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-blue-900">{t('joinus.plan.phase1.title')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('joinus.plan.phase1.desc')}
                </p>
                <div className="bg-gray-50 p-4 border-l-2 border-blue-800">
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li><strong>{language === 'zh' ? '一阶段规则考核要求' : 'Phase 1 rules assessment requirement'}</strong>：{t('joinus.plan.phase1.req')}</li>
                    <li><strong className="text-blue-800">{t('joinus.plan.phase1.warning')}</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="group relative bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-blue-800 transition-all">
              <div className="absolute -left-3 -top-3 w-12 h-12 bg-blue-700 shadow-md flex items-center justify-center">
                <span className="text-white font-black text-xl">2</span>
              </div>
              <div className="ml-4">
                <div className="inline-block px-4 py-1 bg-blue-50 text-blue-800 text-sm font-bold mb-4 border border-blue-100">
                  {t('joinus.plan.phase2.days')}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-blue-900">{t('joinus.plan.phase2.title')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('joinus.plan.phase2.desc')}
                </p>
                <div className="bg-gray-50 p-4 border-l-2 border-blue-700">
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li><strong>{language === 'zh' ? '第一周' : 'Week 1'}</strong>：{t('joinus.plan.phase2.week1')}</li>
                    <li><strong>{language === 'zh' ? '第二周' : 'Week 2'}</strong>：{t('joinus.plan.phase2.week2')}</li>
                    <li><strong>{language === 'zh' ? '第三周' : 'Week 3'}</strong>：{t('joinus.plan.phase2.week3')}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="group relative bg-white border border-gray-200 p-8 hover:shadow-lg hover:border-blue-800 transition-all">
              <div className="absolute -left-3 -top-3 w-12 h-12 bg-blue-600 shadow-md flex items-center justify-center">
                <span className="text-white font-black text-xl">3</span>
              </div>
              <div className="ml-4">
                <div className="inline-block px-4 py-1 bg-blue-50 text-blue-800 text-sm font-bold mb-4 border border-blue-100">
                  {t('joinus.plan.phase3.days')}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-blue-900">{t('joinus.plan.phase3.title')}</h3>
                <p className="text-gray-600 mb-4">
                  {t('joinus.plan.phase3.desc')}
                </p>
                <div className="bg-gray-50 p-4 border-l-2 border-blue-600">
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li><strong>{language === 'zh' ? '盈利考核要求' : 'Profit assessment requirement'}</strong>：{t('joinus.plan.phase3.req')}</li>
                    <li><strong className="text-blue-800">{t('joinus.plan.phase3.warning')}</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="group relative bg-blue-900 text-white p-8 shadow-xl border border-blue-800">
              <div className="absolute -left-3 -top-3 w-12 h-12 bg-white shadow-md flex items-center justify-center text-blue-900">
                <span className="font-black text-xl">4</span>
              </div>
              <div className="ml-4">
                <div className="inline-block px-4 py-1 bg-blue-800 text-white text-sm font-bold mb-4 border border-blue-700">
                  {t('joinus.plan.phase4.days')}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{t('joinus.plan.phase4.title')}</h3>
                <p className="text-blue-100 mb-4">
                  {t('joinus.plan.phase4.desc')}
                </p>
                <div className="bg-blue-800 p-4 border-l-2 border-white/30">
                  <ul className="text-sm text-blue-100 space-y-2">
                    <li>{t('joinus.plan.phase4.1')}</li>
                    <li>{t('joinus.plan.phase4.2')}</li>
                    <li><strong>{t('joinus.plan.phase4.warning')}</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Phase 5 */}
            <div className="group relative bg-gradient-to-br from-blue-900 to-blue-950 text-white p-8 shadow-xl border border-blue-900">
              <div className="absolute -left-3 -top-3 w-12 h-12 bg-white shadow-md flex items-center justify-center text-blue-900">
                <span className="font-black text-xl">★</span>
              </div>
              <div className="ml-4">
                <div className="inline-block px-4 py-1 bg-blue-800 text-white text-sm font-bold mb-4 border border-blue-700">
                  {t('joinus.plan.phase5.days')}
                </div>
                <h3 className="text-2xl font-bold mb-3">{t('joinus.plan.phase5.title')}</h3>
                <p className="mb-4 text-blue-100">
                  {t('joinus.plan.phase5.desc')}
                </p>
                <div className="bg-white/10 p-4 border-l-2 border-white/30">
                  <ul className="text-sm space-y-2 text-blue-100">
                    <li>{t('joinus.plan.phase5.1')}</li>
                    <li>{t('joinus.plan.phase5.2')}</li>
                    <li>{t('joinus.plan.phase5.3')}</li>
                    <li>{t('joinus.plan.phase5.4')}</li>
                    <li>{t('joinus.plan.phase5.5')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trading Rules */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-blue-800"></div>
            <h2 className="text-4xl font-black text-blue-900 dark:text-white">{t('joinus.rules.title')}</h2>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
              {t('joinus.rules.desc')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 dark:bg-gray-900 p-6 border-l-4 border-blue-800 dark:border-white">
                <h3 className="text-xl font-bold mb-4 text-blue-900 dark:text-white">{t('joinus.rules.trading.title')}</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-800 font-bold">•</span>
                    {t('joinus.rules.trading.1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-800 font-bold">•</span>
                    {t('joinus.rules.trading.2')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-800 font-bold">•</span>
                    {t('joinus.rules.trading.3')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-800 font-bold">•</span>
                    {t('joinus.rules.trading.4')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-800 font-bold">•</span>
                    {t('joinus.rules.trading.5')}
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-gray-900 p-6 border-l-4 border-blue-800 dark:border-white">
                <h3 className="text-xl font-bold mb-4 text-blue-900 dark:text-white">{t('joinus.rules.meeting.title')}</h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-200">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-800 font-bold">•</span>
                    {t('joinus.rules.meeting.1')}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-800 font-bold">•</span>
                    {t('joinus.rules.meeting.2')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final Words */}
        <section className="bg-blue-900 text-white p-12 border-2 border-blue-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('joinus.final.title')}</h2>
            <div className="space-y-6 text-base leading-relaxed max-w-3xl mx-auto">
              <p className="text-center text-xl font-semibold text-white">
                {t('joinus.final.motto')}
              </p>
              <p className="text-blue-100">
                {t('joinus.final.p1')}
              </p>
              <p className="text-blue-100">
                {t('joinus.final.p2')}
              </p>
              <p className="text-blue-100">
                {t('joinus.final.p3')}
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-6 border-2 border-white/20">
                <p className="text-white font-bold text-lg text-center">
                  {t('joinus.final.highlight')}
                </p>
              </div>
              <p className="text-blue-200 text-sm">
                {t('joinus.final.p4')}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-white dark:bg-gray-900 p-12 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-3xl font-bold mb-4 text-blue-900 dark:text-white">{t('joinus.cta.title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {t('joinus.cta.desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <LocaleLink
              href="/splan/psychology-test"
              className="px-10 py-4 bg-white dark:bg-gray-900 border-2 border-blue-800 dark:border-white text-blue-800 dark:text-white font-bold text-lg hover:bg-blue-800 hover:text-white dark:hover:bg-white dark:hover:text-blue-900 transition-all hover:shadow-lg"
            >
              {t('joinus.cta.psychology')}
            </LocaleLink>
            <ShineButton
              onClick={handleApply}
              className="px-10 py-4 bg-blue-900 text-white font-bold text-lg border-2 border-blue-900 hover:bg-white hover:text-blue-900 dark:hover:bg-white dark:hover:text-blue-900 transition-all hover:shadow-lg animate-shake"
            >
              {t('joinus.cta.interview')}
            </ShineButton>
          </div>
        </section>
      </div>

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title={language === 'zh' ? '外汇交易员面试' : 'Forex Trader Interview'}
      />
    </div>
  );
}
