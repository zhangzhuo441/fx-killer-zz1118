"use client";

import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { blogPosts } from '@/data/blogPosts';
import { motion } from 'motion/react';

export default function BlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const { language, t } = useLanguage();
  const slug = params.slug as string;

  // Find the post
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('blog.notFound')}
          </h1>
          <button
            onClick={() => router.push(`/${language}/splan/blog`)}
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            {t('blog.backToBlog')}
          </button>
        </div>
      </div>
    );
  }

  // Get category name
  const getCategoryName = (cat: string) => {
    const names: Record<string, {zh: string, en: string}> = {
      about: {zh: '关于我们', en: 'About'},
      forex: {zh: '外汇交易', en: 'Forex'},
      gold: {zh: '黄金交易', en: 'Gold'},
      crypto: {zh: '数字货币', en: 'Crypto'},
      psychology: {zh: '交易心理', en: 'Psychology'},
      professional: {zh: '职业交易员', en: 'Professional'},
      wisdom: {zh: '交易智慧', en: 'Wisdom'}
    };
    return names[cat]?.[language] || cat;
  };

  // Get related posts (same category, exclude current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => router.push(`/${language}/splan/blog`)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('blog.backToBlog')}
          </button>

          {/* Category & Featured Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase">
              {getCategoryName(post.category)}
            </span>
            {post.featured && (
              <>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <span className="px-2 py-1 bg-black dark:bg-white text-white dark:text-black text-xs font-bold">
                  {t('blog.featured')}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {post.title[language]}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold">{post.author}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>•</span>
            <span>{post.readTime} {t('blog.minRead')}</span>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-h1:text-4xl prose-h1:mb-8
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-bold
            prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
            prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
            prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-2
            prose-hr:my-12 prose-hr:border-gray-300 dark:prose-hr:border-gray-700
            prose-blockquote:border-l-4 prose-blockquote:border-black dark:prose-blockquote:border-white
            prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
            prose-code:text-gray-900 dark:prose-code:text-white prose-code:bg-gray-100 dark:prose-code:bg-gray-800
            prose-code:px-2 prose-code:py-1 prose-code:rounded"
        >
          <div dangerouslySetInnerHTML={{ __html: post.content[language] }} />
        </motion.article>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {t('blog.relatedPosts')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  onClick={() => router.push(`/${language}/splan/blog/${relatedPost.slug}`)}
                  className="bg-gray-50 dark:bg-gray-950 border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white p-6 cursor-pointer transition-all group"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:underline">
                    {relatedPost.title[language]}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {relatedPost.excerpt[language]}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {relatedPost.readTime} {t('blog.minRead')}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-black dark:bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white dark:text-black mb-4">
            {t('blog.cta.title')}
          </h2>
          <p className="text-lg text-gray-300 dark:text-gray-700 mb-8">
            {t('blog.cta.subtitle')}
          </p>
          <button
            onClick={() => router.push(`/${language}/splan/join-us`)}
            className="px-8 py-4 bg-white dark:bg-black text-black dark:text-white font-bold border-2 border-white dark:border-black hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-black transition-colors"
          >
            {t('blog.cta.button')}
          </button>
        </div>
      </div>
    </div>
  );
}
