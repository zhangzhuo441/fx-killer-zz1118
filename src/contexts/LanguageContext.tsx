"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 完整翻译字典
const translations: Record<Language, Record<string, string>> = {
  zh: {
    // 品牌名
    'brand.name': '汇刃',
    'brand.full': 'FX Killer',

    // 导航栏
    'nav.home': '首页',
    'nav.training': '外汇培训',
    'nav.psychology': '心理测评',
    'nav.dashboard': '交易系统',
    'nav.faq': '常见问题',
    'nav.membership': '会员',
    'nav.join': '立即报名',

    // Hero Section
    'hero.title': 'Professional FX Trader Training Platform',
    'hero.subtitle': '精准、专业、高效 - 培养真正的外汇交易专家',
    'hero.cta.learn': '了解外汇培训',
    'hero.cta.dashboard': '进入交易系统',

    // Why Choose Section
    'why.title': '为什么选择汇刃',
    'why.subtitle': '专注筛选和培养顶尖外汇交易员，培养真正适合的人，留下极少数，劝返大多数',

    // Advantages
    'advantage.selection.title': '精准筛选',
    'advantage.selection.desc': '30个工作日内判断是否适合外汇交易，避免浪费时间。不适合我们会如实告知，适合则全力培养。',
    'advantage.growth.title': '快速成长',
    'advantage.growth.desc': '科学避开错误定式，让合适的人在30个工作日内达到专家10-20年的外汇交易水平。',
    'advantage.commission.title': '高额分成',
    'advantage.commission.desc': '战利品至少60%属于你，随能力提升最高可达90%以上。荣辱与共，合作共赢。',

    // Comparison
    'comparison.vs': 'VS 传统外汇培训',
    'comparison.fxkiller': '汇刃',
    'comparison.traditional': '传统培训机构',
    'comparison.free': '完全免费 - 无任何培训费用',
    'comparison.practical': '实战培养 - 30天系统化职业训练',
    'comparison.selection': '精准筛选 - 不适合直接劝退，避免浪费时间',
    'comparison.funding': '资金支持 - 通过考核后提供交易资金',
    'comparison.share': '高额分成 - 盈利60%-90%归你所有',
    'comparison.career': '职业发展 - 培养独立交易员或基金经理',
    'comparison.discipline': '严格纪律 - 军事化管理，培养职业素养',
    'comparison.highfee': '高额学费 - 动辄数万元培训费',
    'comparison.theory': '理论为主 - 缺乏实战指导',
    'comparison.acceptall': '来者不拒 - 只要交钱就能学',
    'comparison.selffunded': '自负盈亏 - 交易全靠自己',
    'comparison.nosupport': '无后续支持 - 培训结束即结束',
    'comparison.noplan': '无职业规划 - 学完后自己摸索',
    'comparison.loose': '松散管理 - 容易养成不良交易习惯',
    'comparison.emphasis': '我们致力于用最短的时间从大量人群中筛选出少数适合做外汇交易的人才并进行培养并给予支持',

    // Career Path
    'career.title': '职业发展路径',
    'career.subtitle': '30个工作日系统化培养，从新手到职业外汇交易员的完整路径',
    'career.stage1.days': '第1-5个工作日',
    'career.stage1.title': '规则学习',
    'career.stage1.desc': '完成15个标准进场点练习，熟悉外汇交易系统基本规则',
    'career.stage1.warning': '⚠️ 5天内未通过规则考核将被劝退',
    'career.stage2.days': '第6-20个工作日',
    'career.stage2.title': '盈利练习',
    'career.stage2.desc': '找到适合自己的外汇交易品种，按照盈利考核标准进行练习',
    'career.stage2.tip': '💡 保持操作一致性，不错单、不漏单、不亏损',
    'career.stage3.days': '第21-30个工作日',
    'career.stage3.title': '盈利考核',
    'career.stage3.desc': '连续10个工作日每天做到不错单、不漏单、不亏损',
    'career.stage3.success': '✅ 通过考核进入小额实盘阶段',
    'career.stage4.path': '小额实盘 → 大额矩阵',
    'career.stage4.title': '职业交易员',
    'career.stage4.desc': '20个工作日小额实盘固化后，进入大额矩阵',
    'career.stage4.goal': '🎯 完全自由的工作时间，开始独立外汇交易员生涯',

    // Requirements
    'req.title': '你是否符合基本条件',
    'req.subtitle': '严格的准入标准，确保外汇培训质量 - 每个人只有一次进入的机会',
    'req.profile.title': '👤 人群画像',
    'req.profile.education': '学历与年龄',
    'req.profile.education.desc': '大专学历以上，35岁以下',
    'req.profile.psychology': '心理素质',
    'req.profile.psychology.desc': '认真、细心、耐心、心理健康',
    'req.profile.character': '性格特质',
    'req.profile.character.desc': '性格内向、稳重、纪律严明且执行力强',
    'req.time.title': '⏰ 时间与环境',
    'req.time.commitment': '时间投入',
    'req.time.commitment.desc': '连续30个工作日（约45天）',
    'req.time.equipment': '设备要求',
    'req.time.equipment.desc': 'Windows电脑',
    'req.time.environment': '环境要求',
    'req.time.environment.desc': '独立的交易环境，专注不被打扰',
    'req.online.title': '📅 在线时间',
    'req.online.hours': '交易时段',
    'req.online.hours.desc': '周一到周五 13:30-21:30',
    'req.online.debrief': '团队复盘',
    'req.online.debrief.desc': '每天20:00团队长会议室复盘',
    'req.notice.title': '重要提醒',
    'req.notice.once': '每个人只有一次进入的机会',
    'req.notice.desc': '请在充分了解并确认自己符合全部条件后再申请。',
    'req.notice.philosophy': '我们专注培养真正适合外汇交易的人才。在外汇交易的世界里，有些人天生不适合。他们急于求成，却不知自己真正追求什么；他们只瞥一眼表象，便止步不前，无法洞察事物的深层本质。如果你属于这一类，或许其他行业更能发挥你的长处。',

    // Video Section
    'video.title': '了解交易员职业',
    'video.subtitle': '交易员是个自由职业，不受时间空间限制 - 通过纪录片深入了解这个职业',
    'video.doc1.title': '百万美金交易员',
    'video.doc1.rating': '豆瓣评分 8.7',
    'video.doc1.desc': '这部纪录片展现了交易员培训的真实过程，从筛选到培养，再到成为职业交易员的完整路径。了解交易员这个职业的真实面貌，以及成为顶尖交易员需要具备的素质。',
    'video.doc1.cta': '观看视频 →',
    'video.doc2.title': '交易员：转瞬百万',
    'video.doc2.rating': '豆瓣评分 8.0',
    'video.doc2.desc': '深入展示交易员的日常工作和心理压力，揭示在二级市场中如何做出快速决策，以及职业交易员所需要的心理素质和专业技能。这是一个高压但充满机会的职业。',
    'video.doc2.cta': '观看视频 →',

    // Student Showcase
    'showcase.title': '学员真实收益展示',
    'showcase.junior': '初级交易员',
    'showcase.intermediate': '中级交易员',
    'showcase.senior': '资深交易员',
    'showcase.income.range': '月收入范围',
    'showcase.screenshots.title': '学员实盘收益截图',
    'showcase.screenshots.note': '以上为学员真实交易收益截图',

    // CTA Section
    'cta.title': '准备好开启你的外汇交易员生涯了吗？',
    'cta.subtitle': '记住：最大风险是淘汰，成本是时间。若明朗、准备就绪，预约面试。通过后，入训。',
    'cta.notice.title': '特别提示',
    'cta.passrate': '最终通过率',
    'cta.passrate.value': '10-15%',
    'cta.passrate.desc': '我们培养真正适合的人，留下极少数，劝返大多数',
    'cta.elimination': '淘汰原因',
    'cta.elimination.reason': '不适合这一行业',
    'cta.opportunity': '机会次数',
    'cta.opportunity.value': '只有一次',
    'cta.time.cost': '时间成本',
    'cta.time.value': '45天',
    'cta.money.cost': '金钱成本',
    'cta.money.value': '完全免费',
    'cta.button.interview': '立即预约面试',
    'cta.button.note': '请在充分了解并确认自己符合全部条件后再申请',

    // Footer
    'footer.about': '专注于外汇交易的职业交易员培训平台，用专业的方法筛选和培养真正适合外汇市场的交易人才。',
    'footer.nav.title': '快速导航',
    'footer.resources.title': '资源',
    'footer.contact.title': '联系我们',
    'footer.contact.focus': '专注外汇交易培训',
    'footer.contact.cultivate': '培养职业外汇交易员',
    'footer.contact.apply': '立即申请',
    'footer.copyright': '© 汇刃 · 专业外汇交易员培训平台 · fxkiller.com',
    'footer.disclaimer': '⚠️ 外汇交易有风险，投资需谨慎 · 本站内容仅供学习参考，不构成投资建议',
  },
  en: {
    // Brand Name
    'brand.name': 'FX Killer',
    'brand.full': 'FX Killer',

    // Navigation
    'nav.home': 'Home',
    'nav.training': 'FX Training',
    'nav.psychology': 'Psychology Test',
    'nav.dashboard': 'Dashboard',
    'nav.faq': 'FAQ',
    'nav.membership': 'Membership',
    'nav.join': 'Join Now',

    // Hero Section
    'hero.title': 'Professional FX Trader Training Platform',
    'hero.subtitle': 'Precise, Professional, Efficient - Cultivating True Forex Trading Experts',
    'hero.cta.learn': 'Learn About Forex Training',
    'hero.cta.dashboard': 'Enter Trading System',

    // Why Choose Section
    'why.title': 'Why Choose FX Killer',
    'why.subtitle': 'Focused on selecting and cultivating elite forex traders, nurturing those truly suited, retaining the few, and advising the majority to pursue other paths',

    // Advantages
    'advantage.selection.title': 'Precise Selection',
    'advantage.selection.desc': 'Within 30 working days, determine if forex trading is your calling. If not suited, we\'ll be honest; if suited, we\'ll invest fully in your development.',
    'advantage.growth.title': 'Rapid Growth',
    'advantage.growth.desc': 'Scientifically avoid common pitfalls, allowing suited individuals to achieve in 30 working days what experts take 10-20 years to accomplish.',
    'advantage.commission.title': 'High Commission Structure',
    'advantage.commission.desc': 'At least 60% of profits belong to you; as your ability grows, this can reach 90% and beyond. Shared success, mutual victory.',

    // Comparison
    'comparison.vs': 'VS Traditional Forex Training',
    'comparison.fxkiller': 'FX Killer',
    'comparison.traditional': 'Traditional Training Institutions',
    'comparison.free': 'Completely Free - No Training Fees',
    'comparison.practical': 'Practical Training - 30 Days of Systematic Professional Training',
    'comparison.selection': 'Precise Selection - Direct Advising if Not Suited, No Wasted Time',
    'comparison.funding': 'Funding Support - Capital Provided Upon Passing Assessment',
    'comparison.share': 'High Profit Share - 60%-90% of Profits Go to You',
    'comparison.career': 'Career Development - Development as Independent Trader or Fund Manager',
    'comparison.discipline': 'Strict Discipline - Military-Style Management, Professional Development',
    'comparison.highfee': 'High Tuition - Training Costs Often Reaching Tens of Thousands',
    'comparison.theory': 'Theory-Based - Lacking Practical Guidance',
    'comparison.acceptall': 'Accept Everyone - Anyone Can Learn if They Pay',
    'comparison.selffunded': 'Self-Funded - All Trading on Your Own',
    'comparison.nosupport': 'No Follow-up Support - Ends After Training',
    'comparison.noplan': 'No Career Planning - Self-Navigation After Training',
    'comparison.loose': 'Loose Management - Easy to Form Bad Trading Habits',
    'comparison.emphasis': 'We are dedicated to identifying, from a large population, the few individuals truly suited for forex trading, and providing them with comprehensive development and support in the shortest timeframe possible.',

    // Career Path
    'career.title': 'Career Development Path',
    'career.subtitle': '30-Day Systematic Development: Complete Path from Novice to Professional Forex Trader',
    'career.stage1.days': 'Days 1-5',
    'career.stage1.title': 'Rule Learning',
    'career.stage1.desc': 'Complete 15 standard entry point exercises, master fundamental forex trading system rules',
    'career.stage1.warning': '⚠️ Failure to pass rules assessment within 5 days results in advising to pursue other paths',
    'career.stage2.days': 'Days 6-20',
    'career.stage2.title': 'Profit Practice',
    'career.stage2.desc': 'Find suitable currency pairs for yourself, practice according to profitability standards',
    'career.stage2.tip': '💡 Maintain operational consistency: no missed entries, no missed exits, no losses',
    'career.stage3.days': 'Days 21-30',
    'career.stage3.title': 'Profit Assessment',
    'career.stage3.desc': '10 consecutive working days of: no missed entries, no missed exits, no losses daily',
    'career.stage3.success': '✅ Pass assessment, enter small-amount live trading phase',
    'career.stage4.path': 'Small-Amount Live Trading → Large-Amount Matrix',
    'career.stage4.title': 'Professional Trader',
    'career.stage4.desc': 'After 20 working days of small-amount live trading consolidation, enter large-amount matrix',
    'career.stage4.goal': '🎯 Complete work time freedom, begin independent forex trader career',

    // Requirements
    'req.title': 'Do You Meet Basic Requirements',
    'req.subtitle': 'Strict admission standards ensure training quality - Everyone has only one opportunity to enter',
    'req.profile.title': '👤 Profile',
    'req.profile.education': 'Education & Age',
    'req.profile.education.desc': 'Associate Degree or Higher, Under 35 Years Old',
    'req.profile.psychology': 'Psychological Qualities',
    'req.profile.psychology.desc': 'Serious, Meticulous, Patient, Psychologically Healthy',
    'req.profile.character': 'Character Traits',
    'req.profile.character.desc': 'Introverted, Steady, Disciplined, Strong Execution',
    'req.time.title': '⏰ Time & Environment',
    'req.time.commitment': 'Time Commitment',
    'req.time.commitment.desc': '30 Consecutive Working Days (Approximately 45 Days)',
    'req.time.equipment': 'Equipment Requirements',
    'req.time.equipment.desc': 'Windows Computer',
    'req.time.environment': 'Environment Requirements',
    'req.time.environment.desc': 'Independent Trading Environment, Uninterrupted Focus',
    'req.online.title': '📅 Online Hours',
    'req.online.hours': 'Trading Hours',
    'req.online.hours.desc': 'Monday to Friday 1:30 PM - 9:30 PM',
    'req.online.debrief': 'Team Debrief',
    'req.online.debrief.desc': 'Daily 8:00 PM Team Leader Conference Room Debrief',
    'req.notice.title': 'Important Reminder',
    'req.notice.once': 'Everyone has only ONE opportunity to enter',
    'req.notice.desc': 'Please apply only after fully understanding and confirming you meet ALL requirements.',
    'req.notice.philosophy': 'We focus on cultivating individuals truly suited for forex trading. In the world of forex trading, some people are inherently unsuited. They rush for success yet don\'t know what they truly seek; they glance at surfaces then stop, unable to perceive deeper truths. If this describes you, other industries may better suit your strengths.',

    // Video Section
    'video.title': 'Understand the Trader Profession',
    'video.subtitle': 'Traders are freelancers unrestricted by time and space - Deep dive into this profession through documentaries',
    'video.doc1.title': 'Million Dollar Trader',
    'video.doc1.rating': 'Douban Rating 8.7',
    'video.doc1.desc': 'This documentary reveals the true process of trader training, from selection to development to becoming a professional trader. Understand the real nature of the trader profession and the qualities needed to become an elite trader.',
    'video.doc1.cta': 'Watch Video →',
    'video.doc2.title': 'Trader: Instant Millions',
    'video.doc2.rating': 'Douban Rating 8.0',
    'video.doc2.desc': 'In-depth look at traders\' daily work and psychological stress, revealing how to make quick decisions in secondary markets, and the psychological and professional skills required. A high-pressure but opportunity-rich profession.',
    'video.doc2.cta': 'Watch Video →',

    // Student Showcase
    'showcase.title': 'Actual Student Profit Showcase',
    'showcase.junior': 'Junior Trader',
    'showcase.intermediate': 'Intermediate Trader',
    'showcase.senior': 'Senior Trader',
    'showcase.income.range': 'Monthly Income Range',
    'showcase.screenshots.title': 'Student Live Trading Profit Screenshots',
    'showcase.screenshots.note': 'Above are actual student trading profit screenshots',

    // CTA Section
    'cta.title': 'Ready to Start Your Forex Trading Career?',
    'cta.subtitle': 'Remember: The greatest risk is elimination, the cost is time. If clear-headed and ready, schedule an interview. After passing, enter training.',
    'cta.notice.title': 'Special Notice',
    'cta.passrate': 'Final Pass Rate',
    'cta.passrate.value': '10-15%',
    'cta.passrate.desc': 'We cultivate those truly suited, retaining the few, advising the majority to pursue other paths',
    'cta.elimination': 'Elimination Reason',
    'cta.elimination.reason': 'Not Suited for This Industry',
    'cta.opportunity': 'Number of Opportunities',
    'cta.opportunity.value': 'Only One',
    'cta.time.cost': 'Time Cost',
    'cta.time.value': '45 Days',
    'cta.money.cost': 'Financial Cost',
    'cta.money.value': 'Completely Free',
    'cta.button.interview': 'Schedule Interview Now',
    'cta.button.note': 'Please apply only after fully understanding and confirming you meet all requirements',

    // Footer
    'footer.about': 'Professional forex trader training platform focused on selecting and cultivating truly suited trading talent for forex markets using professional methods.',
    'footer.nav.title': 'Quick Navigation',
    'footer.resources.title': 'Resources',
    'footer.contact.title': 'Contact Us',
    'footer.contact.focus': 'Focused on forex training',
    'footer.contact.cultivate': 'Cultivating professional forex traders',
    'footer.contact.apply': 'Apply Now',
    'footer.copyright': '© FX Killer · Professional Forex Trader Training Platform · fxkiller.com',
    'footer.disclaimer': '⚠️ Forex trading carries risk, investment requires caution · Site content for learning reference only, not investment advice',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 从localStorage读取语言偏好
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
