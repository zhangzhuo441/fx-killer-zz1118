import LocaleLink from '@/components/navigation/LocaleLink';
import { EducationPageContent } from '@/content/education/forex-basics.content';

interface EducationPageTemplateProps {
  content: EducationPageContent;
  children: React.ReactNode; // Main article content with sections
  language?: 'zh' | 'en'; // Optional language parameter
}

export default function EducationPageTemplate({
  content,
  children,
  language,
}: EducationPageTemplateProps) {
  // Determine language from prop or fallback to title detection
  const isZh = language ? language === 'zh' : !content.heroTitle.includes('Forex');
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <article className="max-w-4xl mx-auto px-6 py-24">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          <LocaleLink href="/" className="hover:text-black dark:hover:text-white">
            {isZh ? '首页' : 'Home'}
          </LocaleLink>
          {' > '}
          <LocaleLink href="/education" className="hover:text-black dark:hover:text-white">
            {isZh ? '教育中心' : 'Education Center'}
          </LocaleLink>
          {' > '}
          <span className="text-black dark:text-white">{content.heroTitle}</span>
        </nav>

        {/* Hero Section */}
        {/* 修改点：border-black -> border-blue-900 */}
        <header className="mb-12 pb-8 border-b-2 border-blue-900 dark:border-white">
          <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-6 leading-tight">
            {content.heroTitle}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            {content.heroDescription}
          </p>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">
                {isZh ? '📖 阅读时间：' : '📖 Reading Time:'}
              </span>
              <span className="font-bold text-black dark:text-white">{content.readingTime}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">
                {isZh ? '🎯 难度：' : '🎯 Difficulty:'}
              </span>
              <span className="font-bold text-black dark:text-white">{content.difficulty}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">
                {isZh ? '📅 更新：' : '📅 Updated:'}
              </span>
              <span className="font-bold text-black dark:text-white">{content.lastUpdated}</span>
            </div>
          </div>
        </header>

        {/* Table of Contents */}
        <nav className="mb-12 p-6 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-black dark:text-white mb-4">{content.tocTitle}</h2>
          <ul className="space-y-2">
            {content.tableOfContents.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors flex items-start gap-2"
                >
                  <span className="text-black dark:text-white font-bold">{index + 1}.</span>
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Main Content - Passed as children */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-16">
          {children}
        </div>

        {/* FAQ Section */}
        <section id="faq" className="mb-16">
          {/* 修改点：border-black -> border-blue-900 */}
          <h2 className="text-3xl font-black mb-8 text-black dark:text-white border-l-4 border-blue-900 dark:border-white pl-4">
            {content.faqTitle}
          </h2>

          <div className="space-y-4">
            {content.faqs.map((faq, index) => (
              <details
                key={index}
                // 修改点：border-black -> border-blue-900
                className="group border-2 border-blue-900 dark:border-white"
              >
                <summary className="cursor-pointer p-6 font-bold text-lg text-black dark:text-white list-none flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <span>{faq.question}</span>
                  <span className="transform group-open:rotate-180 transition-transform">▼</span>
                </summary>
                {/* 修改点：border-black -> border-blue-900 */}
                <div className="px-6 py-6 text-gray-700 dark:text-gray-300 border-t-2 border-blue-900 dark:border-white">
                  <p className="leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Resources */}
        <section className="mb-16">
          {/* 修改点：border-black -> border-blue-900 */}
          <h2 className="text-3xl font-black mb-6 text-black dark:text-white border-l-4 border-blue-900 dark:border-white pl-4">
            {content.relatedTitle}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {content.relatedResources.map((resource, index) => (
              <LocaleLink
                key={index}
                href={resource.href}
                // 修改点：border-black -> border-blue-900, hover:bg-black -> hover:bg-blue-950
                className="border-2 border-blue-900 dark:border-white p-6 hover:bg-blue-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all group"
              >
                <div className="text-3xl mb-4">{resource.icon}</div>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600">
                  {resource.description}
                </p>
              </LocaleLink>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        {/* 修改点：bg-black -> bg-blue-950, border-black -> border-blue-900 */}
        <section className="bg-blue-950 dark:bg-white text-white dark:text-black p-12 border-2 border-blue-900 dark:border-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              {content.ctaTitle}
            </h2>
            <p className="text-xl mb-8 text-gray-300 dark:text-gray-700">
              {content.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <LocaleLink
                href={
                  content.ctaPrimaryButton.includes('合作经纪商') ||
                  content.ctaPrimaryButton.includes('Partner Brokers')
                    ? '/partners/brokers'
                    : content.ctaPrimaryButton.includes('心理测评') ||
                      content.ctaPrimaryButton.includes('Psychology Test') ||
                      content.ctaPrimaryButton.includes('Psychology Assessment')
                    ? '/splan/psychology-test'
                    : content.ctaPrimaryButton.includes('使用工具') ||
                      content.ctaPrimaryButton.includes('Use Tools')
                    ? '/tools/position-calculator'
                    : '/splan/join-us'
                }
                className="px-10 py-4 bg-white dark:bg-black text-black dark:text-white font-bold text-lg border-2 border-white dark:border-black hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-black transition-all inline-block text-center"
              >
                {content.ctaPrimaryButton}
              </LocaleLink>
              <LocaleLink
                href={
                  content.ctaSecondaryButton.includes('心理测评') ||
                  content.ctaSecondaryButton.includes('Psychology Test') ||
                  content.ctaSecondaryButton.includes('Psychology Assessment')
                    ? '/splan/psychology-test'
                    : content.ctaSecondaryButton.includes('技术分析工具') ||
                      content.ctaSecondaryButton.includes('Technical Analysis Tools') ||
                      content.ctaSecondaryButton.includes('价格行为工具') ||
                      content.ctaSecondaryButton.includes('Price Action Tools') ||
                      content.ctaSecondaryButton.includes('使用工具') ||
                      content.ctaSecondaryButton.includes('Use Tools')
                    ? '/tools/position-calculator'
                    : '/splan/join-us'
                }
                className="px-10 py-4 bg-transparent text-white dark:text-black font-bold text-lg border-2 border-white dark:border-black hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-all inline-block text-center"
              >
                {content.ctaSecondaryButton}
              </LocaleLink>
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        {/* 修改点：border-black -> border-blue-900 */}
        <nav className="mt-16 flex justify-between items-center pt-8 border-t-2 border-blue-900 dark:border-white">
          <LocaleLink
            href={content.footerPrevHref || "/education"}
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-bold transition-colors"
          >
            {content.footerPrevText}
          </LocaleLink>
          <LocaleLink
            href={content.footerNextHref || "/education"}
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white font-bold transition-colors"
          >
            {content.footerNextText}
          </LocaleLink>
        </nav>
      </article>
    </div>
  );
}
