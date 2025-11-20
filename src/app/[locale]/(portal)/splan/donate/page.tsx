"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import EmailContactModal from '@/components/custom/EmailContactModal';
import { useLanguage } from '@/contexts/LanguageContext';
import LocaleLink from '@/components/navigation/LocaleLink';

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState(0);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  // 修改点：直接设置默认值为目标地址，并不再设为空字符串
  const [walletAddress, setWalletAddress] = useState<string>('0x5dd5cad459131cdfd7cc427fa5dada34bf62d3a8');
  // 修改点：loading 状态直接设为 false，因为不需要等待 API
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t, language } = useLanguage();

  // 计算捐赠金额：从2025年10月1日开始，每天增加$5
  useEffect(() => {
    const startDate = new Date('2025-10-01T00:00:00');
    const today = new Date();
    const daysPassed = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const currentAmount = 999 + (daysPassed * 5);
    setDonationAmount(Math.max(999, currentAmount)); // 最低999
  }, []);

  // 注释掉 API 获取逻辑
  /*
  useEffect(() => {
    const fetchWalletAddress = async () => {
      try {
        const response = await fetch('/api/config/COFFEE');
        if (response.ok) {
          const data = await response.json();
          if (data.key_content) {
            setWalletAddress(data.key_content);
          } else {
            console.warn('Wallet address found but empty, using fallback');
            setWalletAddress('0x5dd5cad459131cdfd7cc427fa5dada34bf62d3a8'); 
          }
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error('Failed to fetch wallet address:', errorData.error || response.statusText);
          setWalletAddress('0x5dd5cad459131cdfd7cc427fa5dada34bf62d3a8'); 
        }
      } catch (error) {
        console.error('Error fetching wallet address:', error);
        setWalletAddress('0x5dd5cad459131cdfd7cc427fa5dada34bf62d3a8'); 
      } finally {
        setLoadingAddress(false);
      }
    };

    fetchWalletAddress();
  }, []);
  */

  // Copy wallet address to clipboard
  const copyToClipboard = async () => {
    if (walletAddress) {
      try {
        await navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section - 增强版 */}
      {/* 修改点：from-black -> from-blue-950, border-gray-800 -> border-blue-900 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 border-b-2 border-blue-900">
        {/* 装饰性背景 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-block px-6 py-2 bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
              <span className="text-sm font-semibold tracking-wider text-white">{t('donate.hero.badge')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-white">
              {t('donate.hero.title1')}<br />
              <span className="text-4xl md:text-5xl font-normal text-gray-300">{t('donate.hero.title2')}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              {t('donate.hero.desc')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm text-white">
                <span className="font-bold">{t('donate.hero.stat1.value')}</span> {t('donate.hero.stat1')}
              </div>
              <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm text-white">
                <span className="font-bold">{t('donate.hero.stat2.value')}</span> {t('donate.hero.stat2')}
              </div>
              <div className="px-4 py-2 bg-white/5 border border-white/20 backdrop-blur-sm text-white">
                <span className="font-bold">{t('donate.hero.stat3.value')}</span> {t('donate.hero.stat3')}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20 space-y-20">

        {/* Donation Amount Card - 重新设计 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          {/* 背景光效 */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-2xl"></div>

          {/* 修改点：from-black -> from-blue-950, border-black -> border-blue-900 */}
          <div className="relative bg-gradient-to-br from-blue-950 to-blue-900 dark:from-white dark:to-gray-100 p-12 border-2 border-blue-900 dark:border-white shadow-2xl">
            <div className="text-center">
              {/* 修改点：dark:bg-black/10 -> dark:bg-blue-950/10, dark:border-black/20 -> dark:border-blue-900/20 */}
              <div className="inline-block px-4 py-2 bg-white/10 dark:bg-blue-950/10 border border-white/20 dark:border-blue-900/20 backdrop-blur-sm mb-6">
                <p className="text-sm font-semibold text-white dark:text-black">{t('donate.amount.badge')}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline justify-center gap-3 mb-3">
                  <span className="text-7xl md:text-8xl font-black text-white dark:text-black">
                    ${donationAmount}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  {/* 修改点：dark:bg-black/20 -> dark:bg-blue-950/20 */}
                  <span className="px-3 py-1 bg-white/20 dark:bg-blue-950/20 text-white dark:text-black text-sm font-bold">USDT</span>
                  <span className="text-white/60 dark:text-black/60">/</span>
                  <span className="px-3 py-1 bg-white/20 dark:bg-blue-950/20 text-white dark:text-black text-sm font-bold">USDC</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500/20 border border-yellow-500/30 backdrop-blur-sm">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-yellow-500 font-bold text-sm">{t('donate.amount.warning')}</span>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 修改点：dark:bg-black/5 -> dark:bg-blue-950/5, dark:border-black/10 -> dark:border-blue-900/10 (x3) */}
                <div className="bg-white/5 dark:bg-blue-950/5 backdrop-blur-sm p-4 border border-white/10 dark:border-blue-900/10">
                  <p className="text-xs text-gray-400 dark:text-gray-600 mb-1">{t('donate.amount.start')}</p>
                  <p className="text-2xl font-bold text-white dark:text-black">$999</p>
                </div>
                <div className="bg-white/5 dark:bg-blue-950/5 backdrop-blur-sm p-4 border border-white/10 dark:border-blue-900/10">
                  <p className="text-xs text-gray-400 dark:text-gray-600 mb-1">{t('donate.amount.daily')}</p>
                  <p className="text-2xl font-bold text-white dark:text-black">+$5</p>
                </div>
                <div className="bg-white/5 dark:bg-blue-950/5 backdrop-blur-sm p-4 border border-white/10 dark:border-blue-900/10">
                  <p className="text-xs text-gray-400 dark:text-gray-600 mb-1">{t('donate.amount.payment')}</p>
                  <p className="text-sm font-bold text-white dark:text-black">{t('donate.amount.crypto')}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Wallet Address Section - 新增 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className="relative"
        >
          {/* 修改点：hover:border-black -> hover:border-blue-900 */}
          <div className="relative bg-white dark:bg-gray-800 p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-900 dark:hover:border-white transition-all">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {language === 'zh' ? '捐赠地址' : 'Donation Address'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {/* 修改点：更新显示的标签文本 */}
                {language === 'zh' ? 'USDT ERC20 钱包地址' : 'USDT ERC20 Wallet Address'}
              </p>
            </div>

            {loadingAddress ? (
              <div className="flex items-center justify-center py-6">
                <svg className="animate-spin w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : walletAddress ? (
              <div className="bg-gray-50 dark:bg-gray-900 p-6 border-2 border-gray-200 dark:border-gray-700">
                <p className="font-mono text-sm md:text-base text-gray-900 dark:text-white break-all text-center">
                  {walletAddress}
                </p>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                {language === 'zh' ? '暂无捐赠地址' : 'No donation address available'}
              </div>
            )}
          </div>
        </motion.div>

        {/* Benefits Section - 重新设计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <div className="flex items-center gap-4 justify-center mb-4">
              {/* 修改点：bg-black -> bg-blue-950 (x2) */}
              <div className="h-1 w-12 bg-blue-950 dark:bg-white"></div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">{t('donate.benefits.title')}</h2>
              <div className="h-1 w-12 bg-blue-950 dark:bg-white"></div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('donate.benefits.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 修改点：hover:border-black -> hover:border-blue-900, bg-black -> bg-blue-950 (x3) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-900 dark:hover:border-white transition-all hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-blue-950 dark:bg-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl text-white dark:text-black font-black">A</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('donate.benefits.a.title')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('donate.benefits.a.desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-900 dark:hover:border-white transition-all hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-blue-950 dark:bg-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl text-white dark:text-black font-black">B</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('donate.benefits.b.title')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('donate.benefits.b.desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="group bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-900 dark:hover:border-white transition-all hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-blue-950 dark:bg-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl text-white dark:text-black font-black">C</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('donate.benefits.c.title')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('donate.benefits.c.desc')}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Challenge Success Reward - 重新设计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative"
        >
          <div className="text-center mb-12">
            <div className="flex items-center gap-4 justify-center mb-4">
              {/* 修改点：bg-black -> bg-blue-950 (x2) */}
              <div className="h-1 w-12 bg-blue-950 dark:bg-white"></div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">{t('donate.rewards.title')}</h2>
              <div className="h-1 w-12 bg-blue-950 dark:bg-white"></div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('donate.rewards.desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-gray-900/5 dark:from-white/5 dark:to-gray-100/5 blur-xl group-hover:blur-2xl transition-all"></div>
              {/* 修改点：border-black -> border-blue-900 */}
              <div className="relative bg-white dark:bg-gray-800 p-10 border-2 border-blue-900 dark:border-white hover:shadow-2xl transition-all">
                {/* 修改点：bg-black -> bg-blue-950 */}
                <div className="w-20 h-20 bg-blue-950 dark:bg-white flex items-center justify-center mb-6">
                  <span className="text-4xl text-white dark:text-black font-black">A</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('donate.rewards.a.title')}
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t('donate.rewards.a.desc')}
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 blur-xl group-hover:blur-2xl transition-all"></div>
              {/* 修改点：bg-black -> bg-blue-950, border-black -> border-blue-900 */}
              <div className="relative bg-blue-950 dark:bg-white p-10 border-2 border-blue-900 dark:border-white hover:shadow-2xl transition-all">
                {/* 修改点：dark:bg-black -> dark:bg-blue-950 */}
                <div className="w-20 h-20 bg-white dark:bg-blue-950 flex items-center justify-center mb-6">
                  <span className="text-4xl text-black dark:text-white font-black">B</span>
                </div>
                <h3 className="text-3xl font-bold text-white dark:text-black mb-4">
                  {t('donate.rewards.b.title')}
                </h3>
                <p className="text-lg text-gray-300 dark:text-gray-700 leading-relaxed">
                  {t('donate.rewards.b.desc')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How to Donate Section - 重新设计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-12">
            <div className="flex items-center gap-4 justify-center mb-4">
              {/* 修改点：bg-black -> bg-blue-950 (x2) */}
              <div className="h-1 w-12 bg-blue-950 dark:bg-white"></div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white">{t('donate.how.title')}</h2>
              <div className="h-1 w-12 bg-blue-950 dark:bg-white"></div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('donate.how.desc')}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 p-10">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              {t('donate.how.flow.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {[
                {
                  num: "1",
                  title: t('donate.how.step1.title'),
                  desc: t('donate.how.step1.desc')
                },
                {
                  num: "2",
                  title: t('donate.how.step2.title'),
                  desc: t('donate.how.step2.desc')
                },
                {
                  num: "3",
                  title: t('donate.how.step3.title'),
                  desc: t('donate.how.step3.desc')
                },
                {
                  num: "4",
                  title: t('donate.how.step4.title'),
                  desc: t('donate.how.step4.desc')
                }
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4 bg-white dark:bg-gray-900 p-6 border-2 border-gray-200 dark:border-gray-700">
                  {/* 修改点：bg-black -> bg-blue-950 */}
                  <div className="w-14 h-14 bg-blue-950 dark:bg-white flex items-center justify-center flex-shrink-0">
                    <span className="text-white dark:text-black font-black text-2xl">{step.num}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <LocaleLink
                href="/splan/psychology-test"
                // 修改点：bg-black -> bg-blue-950, border-black -> border-blue-900
                className="px-10 py-5 bg-blue-950 dark:bg-white text-white dark:text-black font-bold text-lg hover:bg-blue-900 dark:hover:bg-gray-200 transition-all border-2 border-blue-900 dark:border-white text-center hover:shadow-lg"
              >
                {t('donate.how.cta.test')}
              </LocaleLink>
              <button
                onClick={() => setIsEmailModalOpen(true)}
                // 修改点：dark:bg-black -> dark:bg-blue-950, border-black -> border-blue-900
                className="px-10 py-5 bg-white dark:bg-blue-950 text-black dark:text-white font-bold text-lg border-2 border-blue-900 dark:border-white hover:bg-gray-100 dark:hover:bg-blue-900 transition-all text-center hover:shadow-lg animate-shake"
              >
                {t('donate.how.cta.email')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Important Notice - 重新设计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-yellow-500/10 to-red-500/10 blur-2xl"></div>

          {/* 修改点：from-black -> from-blue-950, border-black -> border-blue-900 */}
          <div className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 dark:from-white dark:via-gray-100 dark:to-white p-10 border-2 border-blue-900 dark:border-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-yellow-500 flex items-center justify-center">
                <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-black text-white dark:text-black">
                {t('donate.notice.title')}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                t('donate.notice.1'),
                t('donate.notice.2'),
                t('donate.notice.3'),
                t('donate.notice.4')
              ].map((text, index) => (
                // 修改点：dark:bg-black/5 -> dark:bg-blue-950/5, dark:border-black/10 -> dark:border-blue-900/10
                <div key={index} className="flex items-start gap-3 bg-white/5 dark:bg-blue-950/5 backdrop-blur-sm p-4 border border-white/10 dark:border-blue-900/10">
                  <svg className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white dark:text-black text-sm leading-relaxed">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Email Contact Modal */}
      <EmailContactModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        title={t('donate.modal.title')}
      />
    </div>
  );
}
