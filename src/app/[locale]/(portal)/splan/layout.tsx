import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FX Killer - 外汇交易员培训丨时空交易丨职业交易员培训、外汇交易员培训",
  description: "FX Killer - 专业外汇交易员培训平台，提供系统化课程、实战训练和专业指导。完整的职业交易员培训和外汇交易员培训体系。",
};

export default function SplanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
