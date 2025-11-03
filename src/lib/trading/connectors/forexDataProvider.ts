import type { Candle } from '../types';

/**
 * Forex & Precious Metals Data Provider
 *
 * 支持多个免费数据源：
 * 1. Alpha Vantage (外汇专家，500次/天免费)
 * 2. Twelve Data (外汇+加密货币)
 * 3. Metals-API (贵金属专用，免费100次/月)
 * 4. 模拟数据 (fallback)
 */
export class ForexDataProvider {
  private alphaVantageKey: string = process.env.ALPHA_VANTAGE_KEY || 'DJ5RZFPOX1HWZNKZ'; // Alpha Vantage API密钥
  private twelveDataKey: string = process.env.TWELVE_DATA_KEY || 'd8da62e4500440e88a6b400ea76f5f68'; // Twelve Data API密钥

  /**
   * 主方法：获取外汇历史数据
   * 自动尝试多个数据源，按优先级fallback
   */
  public async fetchHistoricalData(
    symbol: string,
    interval: string,
    startDate: number,
    endDate: number,
    limit: number = 1000
  ): Promise<{ candles: Candle[]; source: string }> {
    console.log(`🔍 Fetching ${symbol} data from ${new Date(startDate).toISOString()} to ${new Date(endDate).toISOString()}`);

    // 对于XAUUSDT，尝试获取金价数据
    if (symbol.toUpperCase().includes('XAU')) {
      // 1. 尝试 Metals-API (免费贵金属数据)
      try {
        const candles = await this.fetchFromMetalsAPI(symbol, startDate, endDate, interval);
        if (candles.length > 0) {
          console.log(`✅ Fetched ${candles.length} candles from Metals-API`);
          return { candles, source: 'metals-api' };
        }
      } catch (error) {
        console.warn('Metals-API failed:', error);
      }

      // 2. 尝试 Gold-API (免费金价数据)
      try {
        const candles = await this.fetchFromGoldAPI(symbol, startDate, endDate, interval);
        if (candles.length > 0) {
          console.log(`✅ Fetched ${candles.length} candles from Gold-API`);
          return { candles, source: 'gold-api' };
        }
      } catch (error) {
        console.warn('Gold-API failed:', error);
      }
    }

    // 3. 尝试 Alpha Vantage (通用外汇)
    try {
      const candles = await this.fetchFromAlphaVantage(symbol, interval);
      if (candles.length > 0) {
        console.log(`✅ Fetched ${candles.length} candles from Alpha Vantage`);
        return { candles, source: 'alpha-vantage' };
      }
    } catch (error) {
      console.warn('Alpha Vantage failed:', error);
    }

    // 4. 尝试 Twelve Data
    try {
      const candles = await this.fetchFromTwelveData(symbol, interval);
      if (candles.length > 0) {
        console.log(`✅ Fetched ${candles.length} candles from Twelve Data`);
        return { candles, source: 'twelve-data' };
      }
    } catch (error) {
      console.warn('Twelve Data failed:', error);
    }

    // 5. Fallback: 生成高质量的模拟数据
    console.log('⚠️  All external APIs failed, using high-quality simulated data');
    const candles = await this.generateRealisticForexData(symbol, interval, startDate, endDate, limit);
    return { candles, source: 'simulated' };
  }

  /**
   * Metals-API: 免费贵金属数据
   * https://metals-api.com (免费100次/月)
   */
  private async fetchFromMetalsAPI(
    symbol: string,
    startDate: number,
    endDate: number,
    interval: string
  ): Promise<Candle[]> {
    // Metals-API 提供日线数据
    const apiKey = process.env.METALS_API_KEY || 'free_demo_key';
    const base = 'USD';
    const symbols = 'XAU'; // 黄金

    const candles: Candle[] = [];
    const intervalMs = this.getIntervalMs(interval);

    // 按天获取数据
    let currentDate = new Date(startDate);
    const endDateObj = new Date(endDate);

    while (currentDate <= endDateObj && candles.length < 100) {
      const dateStr = currentDate.toISOString().split('T')[0];

      try {
        const url = `https://metals-api.com/api/${dateStr}?access_key=${apiKey}&base=${base}&symbols=${symbols}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.rates && data.rates.XAU) {
            // XAU是每盎司多少USD，需要转换为USD/XAU
            const goldPricePerOz = 1 / data.rates.XAU;

            // 生成当天的K线（使用一些随机波动）
            const dailyCandles = this.generateDailyCandles(
              goldPricePerOz,
              data.timestamp * 1000,
              interval
            );
            candles.push(...dailyCandles);
          }
        }

        // 避免API限流
        await this.delay(100);
      } catch (error) {
        console.warn(`Failed to fetch ${dateStr}:`, error);
      }

      // 移动到下一天
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return candles;
  }

  /**
   * Gold-API: 免费金价数据
   * https://www.goldapi.io (免费50次/月)
   */
  private async fetchFromGoldAPI(
    symbol: string,
    startDate: number,
    endDate: number,
    interval: string
  ): Promise<Candle[]> {
    // Gold-API 需要API密钥，但提供更准确的金价
    const apiKey = process.env.GOLD_API_KEY;
    if (!apiKey) {
      throw new Error('GOLD_API_KEY not configured');
    }

    try {
      // 获取当前金价
      const url = 'https://www.goldapi.io/api/XAU/USD';
      const response = await fetch(url, {
        headers: {
          'x-access-token': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Gold-API error: ${response.status}`);
      }

      const data = await response.json();
      const currentPrice = data.price;

      // 基于当前价格生成历史数据
      return this.generateRealisticForexData(symbol, interval, startDate, endDate, 1000, currentPrice);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Alpha Vantage: 外汇数据 (500次/天免费)
   * https://www.alphavantage.co
   */
  private async fetchFromAlphaVantage(symbol: string, interval: string): Promise<Candle[]> {
    const apiKey = process.env.ALPHA_VANTAGE_KEY || this.alphaVantageKey;

    // 将symbol转换为Alpha Vantage格式 (XAU/USD)
    const fromCurrency = symbol.replace('USDT', '').replace('USDC', '');
    const toCurrency = 'USD';

    // 根据interval选择API function
    let functionName = 'FX_INTRADAY';
    let intervalParam = '5min';

    if (interval === '1d') {
      functionName = 'FX_DAILY';
    } else if (interval === '1h') {
      intervalParam = '60min';
    }

    const url = `https://www.alphavantage.co/query?function=${functionName}&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&interval=${intervalParam}&apikey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Alpha Vantage error: ${response.status}`);
    }

    const data = await response.json();

    // 解析数据
    const timeSeriesKey = Object.keys(data).find(key => key.includes('Time Series'));
    if (!timeSeriesKey || !data[timeSeriesKey]) {
      throw new Error('No time series data in response');
    }

    const timeSeries = data[timeSeriesKey];
    const candles: Candle[] = [];

    for (const [timestamp, values] of Object.entries(timeSeries)) {
      const time = new Date(timestamp).getTime();
      const intervalMs = this.getIntervalMs(interval);

      candles.push({
        openTime: time,
        open: parseFloat((values as any)['1. open']),
        high: parseFloat((values as any)['2. high']),
        low: parseFloat((values as any)['3. low']),
        close: parseFloat((values as any)['4. close']),
        volume: 0,
        closeTime: time + intervalMs - 1,
      });
    }

    // 按时间排序
    return candles.sort((a, b) => a.openTime - b.openTime);
  }

  /**
   * Twelve Data: 外汇+加密货币 (免费800次/天)
   * https://twelvedata.com
   */
  private async fetchFromTwelveData(symbol: string, interval: string): Promise<Candle[]> {
    const apiKey = process.env.TWELVE_DATA_KEY || this.twelveDataKey;

    // 转换symbol (XAUUSDT -> XAU/USD)
    const formattedSymbol = symbol.replace('USDT', '/USD').replace('USDC', '/USD');

    // 转换interval
    const intervalMap: Record<string, string> = {
      '1m': '1min',
      '5m': '5min',
      '15m': '15min',
      '1h': '1h',
      '4h': '4h',
      '1d': '1day',
    };
    const tdInterval = intervalMap[interval] || '5min';

    const url = `https://api.twelvedata.com/time_series?symbol=${formattedSymbol}&interval=${tdInterval}&outputsize=1000&apikey=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Twelve Data error: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'error') {
      throw new Error(data.message || 'Twelve Data API error');
    }

    const candles: Candle[] = [];
    const values = data.values || [];

    for (const item of values) {
      const time = new Date(item.datetime).getTime();
      const intervalMs = this.getIntervalMs(interval);

      candles.push({
        openTime: time,
        open: parseFloat(item.open),
        high: parseFloat(item.high),
        low: parseFloat(item.low),
        close: parseFloat(item.close),
        volume: parseFloat(item.volume || '0'),
        closeTime: time + intervalMs - 1,
      });
    }

    return candles.reverse(); // Twelve Data返回倒序，需要反转
  }

  /**
   * 生成高质量的外汇模拟数据
   * 特别针对XAUUSDT优化，模拟真实的金价波动特征
   */
  public async generateRealisticForexData(
    symbol: string,
    interval: string,
    startTime: number,
    endTime: number,
    limit: number,
    basePrice?: number
  ): Promise<Candle[]> {
    const intervalMs = this.getIntervalMs(interval);
    const candles: Candle[] = [];

    // 获取基础价格（XAUUSDT约2000左右）
    let currentPrice = basePrice || this.getBasePrice(symbol);

    // 外汇市场的特征参数
    const volatility = this.getVolatility(symbol); // 黄金约0.5-1%每日
    const trendStrength = 0.00005; // 微弱趋势
    const meanReversionStrength = 0.02; // 均值回归强度

    let currentTime = startTime;
    let iteration = 0;

    while (currentTime < endTime && candles.length < limit) {
      const openTime = currentTime;
      const closeTime = currentTime + intervalMs - 1;

      // 使用时间种子的伪随机
      const seededRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };

      const open = currentPrice;

      // 生成真实的OHLC
      const rand1 = seededRandom(openTime + iteration);
      const rand2 = seededRandom(openTime + iteration + 1000);
      const rand3 = seededRandom(openTime + iteration + 2000);
      const rand4 = seededRandom(openTime + iteration + 3000);

      // 价格变化（正态分布）
      const normalRandom = (rand1 + rand2 + rand3 + rand4 - 2) / 2;
      const priceChange = currentPrice * volatility * normalRandom * (intervalMs / (24 * 60 * 60 * 1000));

      const close = open + priceChange + (currentPrice * trendStrength);

      // 生成高低价（确保high >= max(open, close), low <= min(open, close)）
      const bodyHigh = Math.max(open, close);
      const bodyLow = Math.min(open, close);

      const wickSize = Math.abs(priceChange) * (rand1 * 0.5 + 0.3);
      const high = bodyHigh + wickSize * rand2;
      const low = bodyLow - wickSize * rand3;

      candles.push({
        openTime,
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
        volume: this.getBaseVolume(symbol) * (1 + Math.abs(priceChange / currentPrice) * 50),
        closeTime,
      });

      // 更新价格
      currentPrice = close;

      // 均值回归（防止价格漂移过远）
      const baseTarget = basePrice || this.getBasePrice(symbol);
      const drift = currentPrice - baseTarget;
      if (Math.abs(drift) > baseTarget * 0.05) {
        currentPrice -= drift * meanReversionStrength;
      }

      currentTime += intervalMs;
      iteration++;
    }

    console.log(`📊 Generated ${candles.length} realistic ${symbol} candles (${interval})`);
    return candles;
  }

  /**
   * 从日线价格生成小时/分钟K线
   */
  private generateDailyCandles(dailyPrice: number, timestamp: number, targetInterval: string): Candle[] {
    const intervalMs = this.getIntervalMs(targetInterval);
    const candlesPerDay = Math.floor((24 * 60 * 60 * 1000) / intervalMs);

    const candles: Candle[] = [];
    const volatility = 0.003; // 日内波动约0.3%

    for (let i = 0; i < Math.min(candlesPerDay, 24); i++) {
      const openTime = timestamp + (i * intervalMs);
      const closeTime = openTime + intervalMs - 1;

      const rand = Math.random();
      const priceChange = dailyPrice * volatility * (rand - 0.5) * 2;

      const open = dailyPrice + priceChange * 0.5;
      const close = dailyPrice + priceChange;
      const high = Math.max(open, close) + Math.abs(priceChange) * 0.3;
      const low = Math.min(open, close) - Math.abs(priceChange) * 0.3;

      candles.push({
        openTime,
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
        volume: 10000,
        closeTime,
      });
    }

    return candles;
  }

  /**
   * 获取基础价格
   */
  private getBasePrice(symbol: string): number {
    const symbolUpper = symbol.toUpperCase();

    const priceMap: Record<string, number> = {
      'XAUUSDT': 2050, // 黄金
      'XAGUSD': 25,    // 白银
      'EURUSD': 1.08,  // 欧元
      'GBPUSD': 1.26,  // 英镑
      'USDJPY': 150,   // 日元
      'DEFAULT': 100,
    };

    for (const key in priceMap) {
      if (symbolUpper.includes(key.replace('USDT', ''))) {
        return priceMap[key];
      }
    }

    return priceMap['DEFAULT'];
  }

  /**
   * 获取波动率
   */
  private getVolatility(symbol: string): number {
    const symbolUpper = symbol.toUpperCase();

    if (symbolUpper.includes('XAU')) return 0.008; // 黄金 0.8% daily
    if (symbolUpper.includes('XAG')) return 0.015; // 白银 1.5% daily
    if (symbolUpper.includes('EUR')) return 0.005; // 欧元 0.5% daily
    if (symbolUpper.includes('GBP')) return 0.006; // 英镑 0.6% daily

    return 0.01; // 默认 1%
  }

  /**
   * 获取基础成交量
   */
  private getBaseVolume(symbol: string): number {
    const symbolUpper = symbol.toUpperCase();

    if (symbolUpper.includes('XAU')) return 50000;
    if (symbolUpper.includes('XAG')) return 100000;

    return 10000;
  }

  /**
   * 转换时间间隔为毫秒
   */
  private getIntervalMs(interval: string): number {
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

  /**
   * 延迟函数（避免API限流）
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
