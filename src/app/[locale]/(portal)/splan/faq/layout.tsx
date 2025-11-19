import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "常见问题 - 外汇交易员培训FAQ丨时空交易丨日内交易员培训、全职交易员培训",
  description: "FX Killer 外汇交易员培训常见问题解答：培训是否免费、基础条件要求、考核标准、收入分配、交易铁律、时间安排等。全面了解日内交易员培训和全职交易员培训的各个方面，解答您的疑问。",
  keywords: ["外汇交易FAQ", "日内交易员培训", "全职交易员培训", "培训问题", "考核要求", "收入分配", "交易纪律", "培训条件", "外汇交易员问答"],
  openGraph: {
    title: "常见问题 - 外汇交易员培训FAQ丨时空交易丨日内交易员培训、全职交易员培训",
    description: "全面解答外汇交易员培训的各类问题：培训免费、考核标准、收入分配、交易纪律等。日内交易员培训和全职交易员培训FAQ。",
    url: "https://fxkiller.com/splan/faq",
    type: "website",
  },
  alternates: {
    canonical: "https://fxkiller.com/splan/faq",
  },
};

export default function FAQLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
