import { getLanguageFromLocale, generateBilingualMetadata } from '@/lib/getServerLanguage';
import { parseVideoUrl } from '@/lib/videoEmbedParser';
import LiveTradingClient from './LiveTradingClient';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = getLanguageFromLocale(locale);

  return generateBilingualMetadata(
    '实盘直播丨时空交易丨职业交易员培训、外汇交易员培训',
    'Live Trading丨FX Killer丨Professional Trader Training, Forex Trader Training',
    '观看时空交易矩阵成员的实盘交易直播，学习真实的交易决策过程。6位职业交易员同步直播，展示专业的交易技巧和风险管理策略。',
    'Watch FX Killer matrix members\' live trading sessions and learn real trading decision-making processes. 6 professional traders streaming simultaneously, demonstrating expert trading skills and risk management strategies.',
    '实盘直播, 外汇直播, 交易直播, 职业交易员培训, 外汇交易员培训, 日内交易员培训',
    'live trading, forex live, trading stream, professional trader training, forex trader training, day trader training',
    lang,
    {
      url: '/live-trading',
      type: 'website',
      section: 'Live Trading',
      author: 'FX Killer Team',
    }
  );
}

export default async function LiveTradingPage() {
  // Fetch livestreams from Supabase directly
  let streams = [];
  try {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase
      .from('LiveStream')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      streams = data;
    }
  } catch (error) {
    console.error('Failed to fetch livestreams:', error);
  }

  // Default 6 placeholders
  const defaultMembers = [
    {
      id: 1,
      name: 'Alex Chen',
      isLive: true,
      youtubeId: 'T5x1oKyze7E',
      specialty: '趋势交易 / Trend Trading',
      lastLive: null,
      liveUrl: 'https://youtube.com/watch?v=T5x1oKyze7E', // Default YouTube URL
    },
    {
      id: 2,
      name: 'Sarah Wang',
      isLive: false,
      youtubeId: null,
      specialty: '剥头皮交易 / Scalping',
      lastLive: '2025-11-10 14:30',
      liveUrl: undefined,
    },
    {
      id: 3,
      name: 'Michael Zhang',
      isLive: false,
      youtubeId: null,
      specialty: '波段交易 / Swing Trading',
      lastLive: '2025-11-09 09:15',
      liveUrl: undefined,
    },
    {
      id: 4,
      name: 'Emily Liu',
      isLive: false,
      youtubeId: null,
      specialty: '日内交易 / Day Trading',
      lastLive: '2025-11-08 16:45',
      liveUrl: undefined,
    },
    {
      id: 5,
      name: 'David Lin',
      isLive: false,
      youtubeId: null,
      specialty: '突破交易 / Breakout Trading',
      lastLive: '2025-11-07 11:20',
      liveUrl: undefined,
    },
    {
      id: 6,
      name: 'Jessica Wu',
      isLive: false,
      youtubeId: null,
      specialty: '新闻交易 / News Trading',
      lastLive: '2025-11-06 08:00',
      liveUrl: undefined,
    },
  ];

  // Convert streams to member format
  const matrixMembers = [...defaultMembers];

  streams.forEach((stream: any, index: number) => {
    // Parse video URL using the multi-platform parser
    const videoEmbed = stream.live_url ? parseVideoUrl(stream.live_url) : null;

    const member = {
      id: stream.id || (index + 1),
      name: stream.nickname,
      isLive: !!videoEmbed,
      youtubeId: null, // Deprecated, keeping for backwards compatibility
      specialty: stream.description,
      lastLive: stream.remark || null, // Always show remark if available
      liveUrl: stream.live_url, // Full URL for multi-platform support
    };

    // Replace or add members
    if (index < 6) {
      matrixMembers[index] = member;
    } else {
      matrixMembers.push(member);
    }
  });

  return <LiveTradingClient members={matrixMembers} />;
}
