/**
 * 参数优化脚本 - Parameter Optimization Script
 *
 * 自动测试各种参数组合，找到最优参数配置
 * Automatically test various parameter combinations to find optimal configuration
 */

import { BacktestEngine } from '../src/lib/trading/backtest/engine';
import { HistoricalDataProvider } from '../src/lib/trading/connectors/historicalDataProvider';
import type { TradingConfig, BacktestResult } from '../src/lib/trading/types';

// 参数范围定义 - Parameter ranges to test
const PARAMETER_RANGES = {
  // Bollinger Bands 周期
  bbPeriod: [15, 20, 25, 30, 34],

  // Keltner Channel 参数
  keltnerMAPeriod: [15, 20, 25],
  keltnerATRPeriod: [10, 14, 20],
  keltnerATRMultiple: [1.0, 1.5, 2.0, 2.5],

  // CCI 周期
  cciPeriod: [14, 20],

  // CCI 阈值 (Level 3激进模式)
  cciThreshold: [-50, 0, 25, 50],

  // 止损倍数 (ATR multiple)
  stopLossMultiple: [1.5, 2.0, 2.5, 3.0],

  // 跟踪止盈参数
  trailingActivation: [0.8, 1.0, 1.5, 2.0], // R倍数激活
  trailingDistance: [0.3, 0.5, 0.7, 1.0], // ATR倍数距离

  // 止盈目标 (R倍数)
  takeProfitLevels: [
    [1.5, 2.5, 4.0],
    [2.0, 3.0, 5.0],
    [2.5, 4.0, 6.0],
    [3.0, 5.0, 8.0],
  ],

  // 杠杆
  leverage: [10, 20, 30],
};

// 基础配置模板
const BASE_CONFIG: TradingConfig = {
  symbol: 'XAUUSDT',
  interval: '1m',
  strategy: {
    aggressiveness: 3, // 激进模式
    trailingActivation: 1.0,
    trailingDistance: 0.5,
    indicators: {
      keltner: {
        maPeriod: 20,
        atrPeriod: 14,
        atrMultiple: 1.5,
      },
      bollinger: {
        period: 20,
        deviation: 2.0,
      },
      macd: {
        fastPeriod: 12,
        slowPeriod: 26,
        signalPeriod: 9,
      },
      cci: {
        period: 14,
      },
      supertrend: {
        period: 10,
        multiplier: 3.0,
      },
    },
  },
  risk: {
    maxDailyLoss: 90000,
    maxDrawdown: 0.50,
    maxPositions: 1,
    positionSize: 0.01,
    leverage: 20,
    stopLossMultiple: 2.0,
    takeProfitLevels: [2.0, 3.0, 5.0],
  },
};

// 测试结果接口
interface TestResult {
  config: TradingConfig;
  result: BacktestResult;
  score: number; // 综合评分
}

// 评分函数 - 综合考虑胜率、盈亏比、总收益
function calculateScore(result: BacktestResult): number {
  const winRate = result.winRate;
  const profitFactor = result.profitFactor;
  const totalPnlPercent = result.totalPnlPercent;
  const totalTrades = result.totalTrades;
  const maxDrawdownPercent = result.maxDrawdownPercent;

  // 胜率权重: 40%
  const winRateScore = winRate * 0.4;

  // 盈亏比权重: 30%
  const profitFactorScore = Math.min(profitFactor / 3.0, 1.0) * 0.3;

  // 总收益权重: 20%
  const pnlScore = Math.min(totalPnlPercent / 100, 1.0) * 0.2;

  // 交易次数惩罚（太少不稳定）: -10% if < 30 trades
  const tradesPenalty = totalTrades < 30 ? -0.1 : 0;

  // 最大回撤惩罚: -10% if > 30%
  const drawdownPenalty = maxDrawdownPercent > 30 ? -0.1 : 0;

  return winRateScore + profitFactorScore + pnlScore + tradesPenalty + drawdownPenalty;
}

// 生成参数组合（采样策略：不测试所有组合，选择代表性组合）
function generateParameterCombinations(): TradingConfig[] {
  const combinations: TradingConfig[] = [];

  // 策略1: 快速测试所有单一参数变化（基线对比）
  console.log('🔍 生成基线对比测试组合...');

  // BB周期变化
  for (const bbPeriod of PARAMETER_RANGES.bbPeriod) {
    const config = JSON.parse(JSON.stringify(BASE_CONFIG)) as TradingConfig;
    config.strategy.indicators.bollinger.period = bbPeriod;
    combinations.push(config);
  }

  // Keltner通道参数变化
  for (const maPeriod of PARAMETER_RANGES.keltnerMAPeriod) {
    for (const atrMultiple of PARAMETER_RANGES.keltnerATRMultiple) {
      const config = JSON.parse(JSON.stringify(BASE_CONFIG)) as TradingConfig;
      config.strategy.indicators.keltner.maPeriod = maPeriod;
      config.strategy.indicators.keltner.atrMultiple = atrMultiple;
      combinations.push(config);
    }
  }

  // 止损倍数变化
  for (const stopLoss of PARAMETER_RANGES.stopLossMultiple) {
    const config = JSON.parse(JSON.stringify(BASE_CONFIG)) as TradingConfig;
    config.risk.stopLossMultiple = stopLoss;
    combinations.push(config);
  }

  // 跟踪止盈参数变化
  for (const activation of PARAMETER_RANGES.trailingActivation) {
    for (const distance of PARAMETER_RANGES.trailingDistance) {
      const config = JSON.parse(JSON.stringify(BASE_CONFIG)) as TradingConfig;
      config.strategy.trailingActivation = activation;
      config.strategy.trailingDistance = distance;
      combinations.push(config);
    }
  }

  // 止盈目标变化
  for (const tpLevels of PARAMETER_RANGES.takeProfitLevels) {
    const config = JSON.parse(JSON.stringify(BASE_CONFIG)) as TradingConfig;
    config.risk.takeProfitLevels = tpLevels;
    combinations.push(config);
  }

  // 杠杆变化
  for (const leverage of PARAMETER_RANGES.leverage) {
    const config = JSON.parse(JSON.stringify(BASE_CONFIG)) as TradingConfig;
    config.risk.leverage = leverage;
    combinations.push(config);
  }

  // 策略2: 组合优化（选择一些有代表性的组合）
  console.log('🔍 生成组合优化测试...');

  // 保守止损 + 积极止盈
  for (const stopLoss of [2.5, 3.0]) {
    for (const tpLevels of PARAMETER_RANGES.takeProfitLevels.slice(2)) { // 取后两个止盈组合
      const config = JSON.parse(JSON.stringify(BASE_CONFIG)) as TradingConfig;
      config.risk.stopLossMultiple = stopLoss;
      config.risk.takeProfitLevels = tpLevels;
      combinations.push(config);
    }
  }

  // 宽通道 + 紧跟踪
  for (const atrMultiple of [2.0, 2.5]) {
    for (const distance of [0.3, 0.5]) {
      const config = JSON.parse(JSON.stringify(BASE_CONFIG)) as TradingConfig;
      config.strategy.indicators.keltner.atrMultiple = atrMultiple;
      config.strategy.trailingDistance = distance;
      combinations.push(config);
    }
  }

  // 不同BB周期 + 不同Keltner周期
  for (const bbPeriod of [20, 25, 30]) {
    for (const keltnerMA of [15, 20, 25]) {
      const config = JSON.parse(JSON.stringify(BASE_CONFIG)) as TradingConfig;
      config.strategy.indicators.bollinger.period = bbPeriod;
      config.strategy.indicators.keltner.maPeriod = keltnerMA;
      combinations.push(config);
    }
  }

  console.log(`✅ 生成了 ${combinations.length} 个测试组合`);
  return combinations;
}

// 运行单个回测
async function runSingleBacktest(
  config: TradingConfig,
  candles: any[],
  startDate: number,
  endDate: number,
  initialCapital: number
): Promise<BacktestResult> {
  const engine = new BacktestEngine({
    startDate,
    endDate,
    initialCapital,
    tradingConfig: config,
  });

  return await engine.runBacktest(candles);
}

// 主函数
async function main() {
  console.log('🚀 开始参数优化测试...\n');

  // 生成历史数据
  const historicalProvider = new HistoricalDataProvider();
  const endDate = Date.now();
  const startDate = endDate - 30 * 24 * 60 * 60 * 1000; // 最近30天
  const initialCapital = 100000; // 10万美元初始资金

  console.log(`📊 生成历史数据: ${new Date(startDate).toISOString()} 到 ${new Date(endDate).toISOString()}`);
  console.log(`💰 初始资金: $${initialCapital.toLocaleString()}\n`);

  // 生成1分钟K线数据
  const candlesNeeded = Math.min(20000, Math.ceil((endDate - startDate) / (60 * 1000)));
  const candles = await historicalProvider.generateHistoricalCandles(
    'XAUUSDT',
    '1m',
    candlesNeeded,
    startDate,
    endDate
  );

  console.log(`✅ 生成了 ${candles.length} 根K线\n`);

  // 生成参数组合
  const combinations = generateParameterCombinations();

  // 运行所有测试
  const results: TestResult[] = [];
  let completedTests = 0;

  console.log(`\n🧪 开始测试 ${combinations.length} 个参数组合...\n`);
  console.log('=' .repeat(80));

  for (const config of combinations) {
    try {
      const result = await runSingleBacktest(config, candles, startDate, endDate, initialCapital);
      const score = calculateScore(result);

      results.push({
        config,
        result,
        score,
      });

      completedTests++;

      // 打印进度
      if (completedTests % 10 === 0 || completedTests === combinations.length) {
        const progress = ((completedTests / combinations.length) * 100).toFixed(1);
        console.log(`[${progress}%] 完成 ${completedTests}/${combinations.length} - 胜率: ${(result.winRate * 100).toFixed(1)}%, 盈亏比: ${result.profitFactor.toFixed(2)}, 总收益: ${result.totalPnlPercent.toFixed(1)}%`);
      }
    } catch (error) {
      console.error(`测试失败:`, error);
    }
  }

  console.log('=' .repeat(80));
  console.log(`\n✅ 测试完成! 共测试 ${completedTests} 个组合\n`);

  // 按评分排序
  results.sort((a, b) => b.score - a.score);

  // 输出Top 10结果
  console.log('\n🏆 Top 10 最佳参数组合:\n');
  console.log('=' .repeat(100));

  for (let i = 0; i < Math.min(10, results.length); i++) {
    const { config, result, score } = results[i];

    console.log(`\n#${i + 1} - 综合评分: ${(score * 100).toFixed(2)}`);
    console.log('-' .repeat(100));
    console.log(`📈 胜率: ${(result.winRate * 100).toFixed(2)}% (${result.winningTrades}胜/${result.losingTrades}负)`);
    console.log(`💰 盈亏比: ${result.profitFactor.toFixed(3)}`);
    console.log(`💵 总收益: ${result.totalPnlPercent.toFixed(2)}% ($${result.totalPnl.toLocaleString()})`);
    console.log(`📊 总交易: ${result.totalTrades} 笔`);
    console.log(`📉 最大回撤: ${result.maxDrawdownPercent.toFixed(2)}%`);
    console.log(`📐 平均盈利: $${result.averageWin.toFixed(2)} | 平均亏损: $${Math.abs(result.averageLoss).toFixed(2)}`);
    console.log(`\n参数配置:`);
    console.log(`  - BB周期: ${config.strategy.indicators.bollinger.period}`);
    console.log(`  - Keltner MA: ${config.strategy.indicators.keltner.maPeriod}, ATR倍数: ${config.strategy.indicators.keltner.atrMultiple}`);
    console.log(`  - CCI周期: ${config.strategy.indicators.cci.period}`);
    console.log(`  - 止损倍数: ${config.risk.stopLossMultiple} ATR`);
    console.log(`  - 跟踪止盈: 激活=${config.strategy.trailingActivation}R, 距离=${config.strategy.trailingDistance} ATR`);
    console.log(`  - 止盈目标: ${config.risk.takeProfitLevels.join('R, ')}R`);
    console.log(`  - 杠杆: ${config.risk.leverage}x`);
  }

  console.log('\n' + '=' .repeat(100));

  // 分析统计
  console.log('\n📊 统计分析:\n');

  const avgWinRate = results.reduce((sum, r) => sum + r.result.winRate, 0) / results.length;
  const avgProfitFactor = results.reduce((sum, r) => sum + r.result.profitFactor, 0) / results.length;
  const avgTotalPnl = results.reduce((sum, r) => sum + r.result.totalPnlPercent, 0) / results.length;

  console.log(`平均胜率: ${(avgWinRate * 100).toFixed(2)}%`);
  console.log(`平均盈亏比: ${avgProfitFactor.toFixed(3)}`);
  console.log(`平均总收益: ${avgTotalPnl.toFixed(2)}%`);

  // 最优参数的共性分析
  const top10 = results.slice(0, 10);

  const bbPeriods = top10.map(r => r.config.strategy.indicators.bollinger.period);
  const mostCommonBB = mode(bbPeriods);

  const stopLosses = top10.map(r => r.config.risk.stopLossMultiple);
  const mostCommonStopLoss = mode(stopLosses);

  console.log(`\n🎯 Top 10 共性分析:`);
  console.log(`  - 最常见BB周期: ${mostCommonBB}`);
  console.log(`  - 最常见止损倍数: ${mostCommonStopLoss} ATR`);

  // 保存最佳配置到JSON文件
  const bestConfig = results[0].config;
  const fs = require('fs');
  const outputPath = '/tmp/best_config.json';

  fs.writeFileSync(outputPath, JSON.stringify(bestConfig, null, 2));
  console.log(`\n💾 最佳配置已保存到: ${outputPath}`);

  console.log('\n✅ 优化完成!\n');
}

// 辅助函数：计算众数
function mode(arr: number[]): number {
  const frequency: Record<number, number> = {};
  let maxFreq = 0;
  let modeValue = arr[0];

  for (const value of arr) {
    frequency[value] = (frequency[value] || 0) + 1;
    if (frequency[value] > maxFreq) {
      maxFreq = frequency[value];
      modeValue = value;
    }
  }

  return modeValue;
}

// 运行主函数
main().catch(console.error);
