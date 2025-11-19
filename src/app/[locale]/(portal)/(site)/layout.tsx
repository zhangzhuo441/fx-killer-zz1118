import type { Metadata } from "next";
import StructuredData from "@/components/seo/StructuredData";
import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '职业交易员培训平台丨时空交易丨职业交易员培训、外汇交易员培训',
    'Professional Trader Training Platform丨FX Killer丨Professional Trader Training, Forex Trader Training',
    '时空交易(FX Killer)专业外汇交易员培训平台，30天系统化培养职业交易员。提供免费职业交易员培训、实战训练和资金支持。通过考核获得资金管理权限，分润高达90%。',
    'FX Killer professional forex trader training platform. 30-day systematic professional trader training with free education, practical training and funding support. Pass the evaluation to get funded trading account with up to 90% profit split.',
    '职业交易员培训, 外汇交易员培训, 日内交易员培训, 全职交易员培训, 职业交易员, 外汇交易员, FX Killer, 时空交易, 交易员培训, 资金管理',
    'professional trader training, forex trader training, day trader training, full-time trader training, professional trader, forex trader, FX Killer, trader training, funded trading',
    lang,
    {
      url: '/',
      type: 'website',
      section: 'Home',
      author: 'FX Killer Team',
    }
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StructuredData />
      {children}
    </>
  );
}
