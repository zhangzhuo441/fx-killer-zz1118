import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '仓位计算器丨时空交易丨日内交易员培训、全职交易员培训',
    'Position Calculator丨Space-time trading丨Day Trader Training, Full-Time Trader Training',
    '专业仓位计算器，根据账户余额、风险比例、止损点数自动计算最佳交易手数。日内交易员培训和全职交易员培训必备工具，科学管理资金，提高交易稳定性。',
    'Professional position calculator. Auto-calculates optimal lot size based on account balance, risk percentage and stop loss. Essential tool for day trader training and full-time trader training to manage funds scientifically.',
    '仓位计算器, 头寸计算器, 日内交易员培训, 全职交易员培训, 日内交易员, 全职交易, 风险管理工具',
    'position calculator, lot size calculator, day trader training, full-time trader training, day trader, full-time trading, risk management tool',
    lang,
    {
      url: '/tools/position-calculator',
      type: 'website',
      section: 'Tools',
      author: 'Space-time trading Team',
    }
  );
}

export default function PositionCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
