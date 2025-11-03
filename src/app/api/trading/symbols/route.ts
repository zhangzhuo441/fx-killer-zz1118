import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/trading/symbols
 *
 * Fetch available trading symbols from Binance Futures
 */
export async function GET(request: NextRequest) {
  try {
    // Fetch exchange info from Binance Futures
    const response = await fetch('https://fapi.binance.com/fapi/v1/exchangeInfo', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Binance API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Filter for active USDT perpetual contracts
    const symbols = data.symbols
      .filter((s: any) =>
        s.status === 'TRADING' &&
        s.contractType === 'PERPETUAL' &&
        s.quoteAsset === 'USDT'
      )
      .map((s: any) => ({
        symbol: s.symbol,
        baseAsset: s.baseAsset,
        quoteAsset: s.quoteAsset,
        pricePrecision: s.pricePrecision,
        quantityPrecision: s.quantityPrecision,
      }))
      .sort((a: any, b: any) => a.symbol.localeCompare(b.symbol));

    // Forex symbols (not from Binance, but supported by our data providers)
    const forexSymbols = [
      { symbol: 'XAUUSDT', baseAsset: 'XAU', quoteAsset: 'USDT', pricePrecision: 2, quantityPrecision: 3 },
      { symbol: 'EURUSD', baseAsset: 'EUR', quoteAsset: 'USD', pricePrecision: 5, quantityPrecision: 0 },
      { symbol: 'GBPUSD', baseAsset: 'GBP', quoteAsset: 'USD', pricePrecision: 5, quantityPrecision: 0 },
      { symbol: 'USDJPY', baseAsset: 'USD', quoteAsset: 'JPY', pricePrecision: 3, quantityPrecision: 0 },
    ];

    // Get popular crypto symbols
    const popularCryptoSymbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT', 'ADAUSDT', 'DOGEUSDT', 'SOLUSDT', 'MATICUSDT', 'DOTUSDT', 'AVAXUSDT'];

    const popularCrypto = symbols.filter((s: any) => popularCryptoSymbols.includes(s.symbol));
    const others = symbols.filter((s: any) => !popularCryptoSymbols.includes(s.symbol));

    // Combine: Forex first, then popular crypto
    const popular = [...forexSymbols, ...popularCrypto];

    return NextResponse.json({
      popular,
      all: symbols,
      total: symbols.length,
    });
  } catch (error) {
    console.error('Error fetching symbols:', error);

    // Fallback to default symbols if Binance API fails - forex + crypto
    const fallbackSymbols = [
      // Forex
      { symbol: 'XAUUSDT', baseAsset: 'XAU', quoteAsset: 'USDT', pricePrecision: 2, quantityPrecision: 3 },
      { symbol: 'EURUSD', baseAsset: 'EUR', quoteAsset: 'USD', pricePrecision: 5, quantityPrecision: 0 },
      { symbol: 'GBPUSD', baseAsset: 'GBP', quoteAsset: 'USD', pricePrecision: 5, quantityPrecision: 0 },
      { symbol: 'USDJPY', baseAsset: 'USD', quoteAsset: 'JPY', pricePrecision: 3, quantityPrecision: 0 },
      // Crypto
      { symbol: 'BTCUSDT', baseAsset: 'BTC', quoteAsset: 'USDT', pricePrecision: 2, quantityPrecision: 3 },
      { symbol: 'ETHUSDT', baseAsset: 'ETH', quoteAsset: 'USDT', pricePrecision: 2, quantityPrecision: 3 },
      { symbol: 'BNBUSDT', baseAsset: 'BNB', quoteAsset: 'USDT', pricePrecision: 2, quantityPrecision: 2 },
      { symbol: 'XRPUSDT', baseAsset: 'XRP', quoteAsset: 'USDT', pricePrecision: 4, quantityPrecision: 1 },
      { symbol: 'ADAUSDT', baseAsset: 'ADA', quoteAsset: 'USDT', pricePrecision: 4, quantityPrecision: 0 },
      { symbol: 'DOGEUSDT', baseAsset: 'DOGE', quoteAsset: 'USDT', pricePrecision: 5, quantityPrecision: 0 },
      { symbol: 'SOLUSDT', baseAsset: 'SOL', quoteAsset: 'USDT', pricePrecision: 2, quantityPrecision: 1 },
      { symbol: 'MATICUSDT', baseAsset: 'MATIC', quoteAsset: 'USDT', pricePrecision: 4, quantityPrecision: 0 },
      { symbol: 'DOTUSDT', baseAsset: 'DOT', quoteAsset: 'USDT', pricePrecision: 3, quantityPrecision: 1 },
      { symbol: 'AVAXUSDT', baseAsset: 'AVAX', quoteAsset: 'USDT', pricePrecision: 2, quantityPrecision: 1 },
    ];

    return NextResponse.json({
      popular: fallbackSymbols,
      all: fallbackSymbols,
      total: fallbackSymbols.length,
      fallback: true,
      error: error instanceof Error ? error.message : 'Failed to fetch symbols',
    });
  }
}
