import { NextRequest, NextResponse } from 'next/server';
import { BacktestEngine } from '@/lib/trading/backtest/engine';
import { HistoricalDataProvider } from '@/lib/trading/connectors/historicalDataProvider';
import { ForexDataProvider } from '@/lib/trading/connectors/forexDataProvider';
import type { TradingConfig, Candle } from '@/lib/trading/types';

/**
 * Fetch with retry logic and longer timeout
 */
async function fetchWithRetry(url: string, retries = 2, timeout = 5000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error: any) {
      if (i === retries - 1) throw error;

      console.log(`Fetch attempt ${i + 1} failed, retrying... (${error.message})`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }

  throw new Error('All retry attempts failed');
}

/**
 * Fetch historical candles from Binance public API (no authentication needed)
 */
async function fetchBinancePublicCandles(
  symbol: string,
  interval: string,
  startTime: number,
  endTime: number
): Promise<Candle[]> {
  // Try multiple Binance endpoints
  const endpoints = [
    'https://fapi.binance.com',
    'https://fapi1.binance.com',
    'https://fapi2.binance.com',
    'https://fapi3.binance.com',
  ];

  const limit = 1500;
  const allCandles: Candle[] = [];
  let currentStart = startTime;
  let lastError: Error | null = null;

  // Fetch in batches of 1500 candles until we reach endTime
  while (currentStart < endTime && allCandles.length < 20000) {
    let success = false;

    // Try each endpoint
    for (const baseUrl of endpoints) {
      try {
        const url = `${baseUrl}/fapi/v1/klines?symbol=${symbol}&interval=${interval}&startTime=${currentStart}&endTime=${endTime}&limit=${limit}`;

        console.log(`Fetching from ${baseUrl}...`);
        const response = await fetchWithRetry(url, 2, 5000);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
          success = true;
          break; // No more data available
        }

        // Convert Binance format to our Candle format
        const candles: Candle[] = data.map((k: any[]) => ({
          openTime: k[0],
          open: parseFloat(k[1]),
          high: parseFloat(k[2]),
          low: parseFloat(k[3]),
          close: parseFloat(k[4]),
          volume: parseFloat(k[5]),
          closeTime: k[6],
        }));

        allCandles.push(...candles);

        // Move to next batch
        if (candles.length < limit) {
          success = true;
          break; // Got less than limit, means we reached the end
        }

        // Start from the last candle's closeTime + 1ms
        currentStart = candles[candles.length - 1].closeTime + 1;

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));

        success = true;
        break; // Success, move to next batch

      } catch (error) {
        lastError = error as Error;
        console.warn(`Failed to fetch from ${baseUrl}:`, error);
        continue; // Try next endpoint
      }
    }

    if (!success) {
      throw new Error(`Failed to fetch data from all Binance endpoints. Last error: ${lastError?.message}`);
    }

    if (allCandles.length >= 20000) {
      console.log('Reached maximum candle limit (20000)');
      break;
    }
  }

  return allCandles;
}

/**
 * POST /api/trading/backtest
 *
 * Run backtest on historical data from Binance public API
 *
 * Request body:
 * {
 *   startDate: number (timestamp)
 *   endDate: number (timestamp)
 *   initialCapital: number
 *   tradingConfig: TradingConfig
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      startDate,
      endDate,
      initialCapital,
      tradingConfig,
    } = body;

    // Validate required fields
    if (!startDate || !endDate || !initialCapital || !tradingConfig) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let candles1m: Candle[] = [];
    let candles5m: Candle[] | undefined;
    let dataSource = 'generated';

    // CRITICAL FIX: Determine if we need dual timeframe
    const needsDualTimeframe = tradingConfig.interval === '1m' &&
                               (tradingConfig.strategy.aggressiveness === 1 ||
                                tradingConfig.strategy.aggressiveness === 2);

    // 优先级: 外汇数据提供商 -> Binance -> 模拟数据
    // 对于XAUUSDT等外汇品种，使用专门的外汇数据源
    const isForexSymbol = tradingConfig.symbol.toUpperCase().includes('XAU') ||
                          tradingConfig.symbol.toUpperCase().includes('XAG') ||
                          tradingConfig.symbol.toUpperCase().includes('EUR') ||
                          tradingConfig.symbol.toUpperCase().includes('GBP');

    // 尝试从外汇数据提供商获取数据（免费API）
    if (isForexSymbol) {
      try {
        console.log(`🌍 Fetching ${tradingConfig.symbol} from free forex data providers...`);
        const forexProvider = new ForexDataProvider();

        const candlesNeeded = Math.min(20000, Math.ceil((endDate - startDate) / getIntervalMs(tradingConfig.interval)));

        const result = await forexProvider.fetchHistoricalData(
          tradingConfig.symbol,
          tradingConfig.interval,
          startDate,
          endDate,
          candlesNeeded
        );

        candles1m = result.candles;
        dataSource = result.source;

        if (candles1m.length > 0) {
          console.log(`✅ Fetched ${candles1m.length} candles from ${dataSource}`);
          console.log(`   First: ${new Date(candles1m[0].openTime).toISOString()}, Last: ${new Date(candles1m[candles1m.length - 1].closeTime).toISOString()}`);

          // 如果需要双时间框架，生成5m数据
          if (needsDualTimeframe) {
            console.log('⏰ Generating 5m confirmation data for dual timeframe strategy...');
            const result5m = await forexProvider.fetchHistoricalData(
              tradingConfig.symbol,
              '5m',
              startDate,
              endDate,
              Math.min(20000, Math.ceil((endDate - startDate) / getIntervalMs('5m')))
            );
            candles5m = result5m.candles;
            console.log(`✅ Fetched ${candles5m.length} candles (5m) for confirmation`);
          }
        }
      } catch (error) {
        console.warn('⚠️  Forex data providers failed, trying Binance fallback:', error);
      }
    }

    // Fallback: 尝试从Binance获取数据 (仅加密货币)
    if (candles1m.length === 0 && !isForexSymbol) {
      try {
      console.log(`Fetching historical data from Binance for ${tradingConfig.symbol}...`);
      console.log(`Date range: ${new Date(startDate).toISOString()} to ${new Date(endDate).toISOString()}`);
      console.log(`Primary interval: ${tradingConfig.interval}, Aggressiveness: ${tradingConfig.strategy.aggressiveness}`);

      // Fetch primary timeframe
      candles1m = await fetchBinancePublicCandles(
        tradingConfig.symbol,
        tradingConfig.interval,
        startDate,
        endDate
      );

      if (candles1m.length > 0) {
        dataSource = 'binance-public';
        console.log(`Fetched ${candles1m.length} candles (${tradingConfig.interval}) from Binance`);
        console.log(`First candle: ${new Date(candles1m[0].openTime).toISOString()}`);
        console.log(`Last candle: ${new Date(candles1m[candles1m.length - 1].closeTime).toISOString()}`);
      }

      // CRITICAL FIX: Fetch 5m confirmation data if needed
      if (needsDualTimeframe) {
        console.log('⏰ Fetching 5m confirmation data for Level 1-2 strategy...');
        try {
          candles5m = await fetchBinancePublicCandles(
            tradingConfig.symbol,
            '5m',
            startDate,
            endDate
          );
          console.log(`✅ Fetched ${candles5m.length} candles (5m) for confirmation`);
        } catch (error5m) {
          console.warn('⚠️  Failed to fetch 5m data, continuing with 1m only:', error5m);
          candles5m = undefined;
        }
      } else {
        console.log(`ℹ️  Single timeframe mode (${tradingConfig.interval}, Aggressiveness: ${tradingConfig.strategy.aggressiveness})`);
      }
      } catch (error) {
        console.warn('Binance API failed, falling back to simulated data:', error);
      }
    }

    // Final fallback: 使用高质量模拟数据
    if (candles1m.length === 0) {
      console.log('⚠️  All external data sources failed, using high-quality simulated data...');

      // 对于外汇，使用专门的外汇模拟数据生成器
      if (isForexSymbol) {
        const forexProvider = new ForexDataProvider();
        const intervalMs = getIntervalMs(tradingConfig.interval);
        const candlesNeeded = Math.min(20000, Math.ceil((endDate - startDate) / intervalMs));

        candles1m = await forexProvider.generateRealisticForexData(
          tradingConfig.symbol,
          tradingConfig.interval,
          startDate,
          endDate,
          candlesNeeded
        );

        dataSource = 'simulated-forex';
        console.log(`📊 Generated ${candles1m.length} realistic forex candles (${tradingConfig.interval})`);

        // 生成5m数据（如果需要）
        if (needsDualTimeframe) {
          const candles5mNeeded = Math.min(20000, Math.ceil((endDate - startDate) / getIntervalMs('5m')));
          candles5m = await forexProvider.generateRealisticForexData(
            tradingConfig.symbol,
            '5m',
            startDate,
            endDate,
            candles5mNeeded
          );
          console.log(`✅ Generated ${candles5m.length} realistic forex candles (5m) for confirmation`);
        }
      } else {
        // 加密货币使用通用模拟数据
        const historicalProvider = new HistoricalDataProvider();
        const intervalMs = getIntervalMs(tradingConfig.interval);
        const candlesNeeded = Math.min(20000, Math.ceil((endDate - startDate) / intervalMs));

        candles1m = await historicalProvider.generateHistoricalCandles(
          tradingConfig.symbol,
          tradingConfig.interval,
          candlesNeeded,
          startDate,
          endDate
        );

        dataSource = 'simulated-crypto';
        console.log(`Generated ${candles1m.length} simulated crypto candles (${tradingConfig.interval})`);

        // 生成5m数据（如果需要）
        if (needsDualTimeframe) {
          const candles5mNeeded = Math.min(20000, Math.ceil((endDate - startDate) / getIntervalMs('5m')));
          candles5m = await historicalProvider.generateHistoricalCandles(
            tradingConfig.symbol,
            '5m',
            candles5mNeeded,
            startDate,
            endDate
          );
          console.log(`✅ Generated ${candles5m.length} simulated crypto candles (5m) for confirmation`);
        }
      }
    }

    if (candles1m.length === 0) {
      return NextResponse.json(
        { error: 'No candles found for specified date range' },
        { status: 404 }
      );
    }

    // Run backtest with dual timeframe if available
    const engine = new BacktestEngine({
      startDate,
      endDate,
      initialCapital,
      tradingConfig,
    });

    console.log('Running backtest...');
    const results = await engine.runBacktest(candles1m, candles5m);
    console.log('Backtest complete');

    return NextResponse.json({
      ...results,
      candles: candles1m.slice(-500), // Return last 500 candles for charting
      dataSource, // 'binance-public' or 'generated'
      totalCandles: candles1m.length,
    });
  } catch (error) {
    console.error('Backtest error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * Helper function to convert interval string to milliseconds
 */
function getIntervalMs(interval: string): number {
  const intervalMap: Record<string, number> = {
    '1m': 60 * 1000,
    '5m': 5 * 60 * 1000,
    '15m': 15 * 60 * 1000,
    '1h': 60 * 60 * 1000,
    '4h': 4 * 60 * 60 * 1000,
    '1d': 24 * 60 * 60 * 1000,
  };
  return intervalMap[interval] || 60 * 1000;
}
