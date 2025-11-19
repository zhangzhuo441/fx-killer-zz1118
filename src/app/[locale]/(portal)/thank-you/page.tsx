import LocaleLink from '@/components/navigation/LocaleLink';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '感谢您的联系 | 时空交易 | Thank You',
  description: '我们已收到您的信息，会尽快与您联系。',
};

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Thank You Message */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
          {isZh ? '感谢您的联系！' : 'Thank You!'}
        </h1>

        <div className="space-y-4 mb-12">
          <p className="text-xl text-gray-700 dark:text-gray-300">
            {isZh
              ? '我们已经收到您的信息'
              : 'We have received your message'}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {isZh
              ? '我们的团队会在24小时内与您取得联系，请留意您的邮箱。'
              : 'Our team will contact you within 24 hours. Please check your email.'}
          </p>
          <p className="text-md text-gray-500 dark:text-gray-500">
            {isZh
              ? '期待与您一起开启时空交易职业交易员之旅！'
              : 'Looking forward to starting your professional trading journey with 时空交易!'}
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-8"></div>

        {/* Back to Home Button */}
        <LocaleLink
          href="/"
          className="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-lg font-semibold border-2 border-black dark:border-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors"
        >
          {isZh ? '返回主页' : 'Back to Home'}
        </LocaleLink>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
            {isZh ? '接下来会发生什么？' : 'What happens next?'}
          </h3>
          <ul className="space-y-2 text-left text-gray-700 dark:text-gray-300 max-w-md mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold mt-1">1.</span>
              <span>
                {isZh
                  ? '我们的交易专家会审阅您的信息'
                  : 'Our trading expert will review your information'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold mt-1">2.</span>
              <span>
                {isZh
                  ? '通过邮件或电话与您取得联系'
                  : 'Contact you via email or phone'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 font-bold mt-1">3.</span>
              <span>
                {isZh
                  ? '为您提供个性化的培训方案'
                  : 'Provide you with a personalized training plan'}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
