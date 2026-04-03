import { Article } from '../types';

export const articles: Article[] = [
  {
    id: 1,
    title: "Introduction to Stock Market Investing",
    category: "Fundamentals",
    content: `The stock market is a collection of markets where stocks (pieces of ownership in businesses) are traded between investors. It serves as a platform where companies can raise capital by selling shares to the public, and investors can buy and sell these ownership stakes.

Stocks represent partial ownership in a company. When you buy a stock, you become a shareholder, which means you have a claim to part of the company's assets and earnings. The value of your investment can increase or decrease based on the company's performance and market conditions.

The two main stock exchanges in the United States are the New York Stock Exchange (NYSE) and the NASDAQ. These exchanges provide the infrastructure for buying and selling stocks, with strict listing requirements and regulatory oversight.

When investing in stocks, it's crucial to understand the difference between price and value. The price is what you pay for a share, while value is what the company is actually worth. Successful investors learn to identify companies trading below their intrinsic value.

There are two primary approaches to stock analysis: Fundamental Analysis and Technical Analysis. Fundamental analysis examines financial statements, management, competitive advantages, and industry conditions to determine a stock's intrinsic value. Technical analysis focuses on price patterns and trading volume to predict future price movements.`,
    xpReward: 50,
    eCoinReward: 25,
    readTime: 8,
    difficulty: "Beginner",
    keyTakeaways: [
      "Stock market is a platform for trading company ownership shares",
      "Stocks represent partial ownership in a company",
      "NYSE and NASDAQ are major US stock exchanges",
      "Fundamental vs Technical analysis are two main approaches",
      "Understanding price vs value is crucial for investors"
    ]
  },
  {
    id: 2,
    title: "Understanding Technical Indicators: RSI, MACD, and Moving Averages",
    category: "Technical Analysis",
    content: `Technical indicators are mathematical calculations based on historical price, volume, or open interest data. They help traders identify trends, reversals, and potential entry/exit points.

The Relative Strength Index (RSI) is a momentum oscillator that measures the speed and change of price movements. RSI ranges from 0 to 100. Traditionally, an asset is considered overbought when RSI is above 70 and oversold when below 30. Divergences between price and RSI can signal potential reversals.

Moving Averages smooth out price data to create a single flowing line. The Simple Moving Average (SMA) calculates the average price over a specific period. The Exponential Moving Average (EMA) gives more weight to recent prices, making it more responsive to new information. Common periods include 50-day and 200-day moving averages.

The Moving Average Convergence Divergence (MACD) is a trend-following momentum indicator. It consists of the MACD line (difference between 12-period and 26-period EMAs), the signal line (9-period EMA of MACD), and the histogram (difference between MACD and signal line). Crossovers between these lines generate buy and sell signals.

Bollinger Bands are volatility indicators that consist of a middle band (SMA) and two outer bands at standard deviation levels. When bands contract, it indicates low volatility (potential breakout); when they expand, it indicates high volatility.`,
    xpReward: 75,
    eCoinReward: 40,
    readTime: 12,
    difficulty: "Intermediate",
    keyTakeaways: [
      "RSI measures momentum; overbought >70, oversold <30",
      "Moving averages smooth price data to identify trends",
      "MACD uses EMA crossovers for buy/sell signals",
      "Bollinger Bands measure volatility",
      "No single indicator is foolproof; use multiple"
    ]
  },
  {
    id: 3,
    title: "Risk Management: Position Sizing and Stop Losses",
    category: "Risk Management",
    content: `Risk management is the cornerstone of successful trading. Without proper risk management, even the best trading strategy can lead to account destruction. The golden rule is: never risk more than you can afford to lose.

Position sizing determines how much capital to allocate to each trade. The standard rule is to risk no more than 1-2% of your trading capital on any single trade. This ensures that a series of losing trades won't significantly impact your account. To calculate position size: (Account Risk ÷ Trade Risk) = Position Size.

Stop losses are predetermined exit points that limit your losses if a trade moves against you. They should be placed based on technical levels (below support for long positions, above resistance for shorts), not arbitrary percentages. A well-placed stop loss gives the trade room to breathe while protecting your capital.

The risk-to-reward ratio measures potential profit against potential loss. A minimum ratio of 1:2 (risking $1 to potentially make $2) is often recommended. This means even with a 50% win rate, you can be profitable. Always calculate your risk-to-reward before entering any trade.

Diversification involves spreading capital across different assets, sectors, or strategies. This reduces the impact of any single trade going wrong. However, over-diversification can dilute returns. Find the right balance based on your risk tolerance and trading capital.`,
    xpReward: 80,
    eCoinReward: 45,
    readTime: 10,
    difficulty: "Intermediate",
    keyTakeaways: [
      "Never risk more than 1-2% per trade",
      "Position sizing = (Account Risk ÷ Trade Risk)",
      "Place stop losses at technical levels, not arbitrary points",
      "Maintain minimum 1:2 risk-to-reward ratio",
      "Diversify across assets and sectors"
    ]
  },
  {
    id: 4,
    title: "Cryptocurrency Fundamentals: Bitcoin and Ethereum",
    category: "Crypto",
    content: `Cryptocurrencies are digital assets that use cryptography for security and operate on decentralized networks. Bitcoin (BTC), created in 2009, was the first cryptocurrency and remains the largest by market cap. It uses blockchain technology to record transactions transparently and immutably.

Bitcoin's supply is capped at 21 million coins, making it deflationary by design. Transactions are verified through proof-of-work, where miners compete to solve complex mathematical puzzles. This process consumes significant energy but provides robust security.

Ethereum (ETH) launched in 2015 and introduced smart contracts - self-executing programs that automatically enforce agreements. This enabled decentralized applications (dApps) and sparked the DeFi revolution. Ethereum is transitioning to proof-of-stake (The Merge) to reduce energy consumption.

Crypto markets are highly volatile. Daily price swings of 5-10% are common, compared to 1-2% for stocks. This volatility creates both opportunities and risks. Never invest more than you can afford to lose in crypto.

Cryptocurrency trading requires understanding wallets (hot vs cold), exchanges, private keys, and security practices. Two-factor authentication and hardware wallets are essential for protecting your assets.`,
    xpReward: 70,
    eCoinReward: 35,
    readTime: 10,
    difficulty: "Intermediate",
    keyTakeaways: [
      "Bitcoin capped at 21 million coins; uses proof-of-work",
      "Ethereum enables smart contracts and DeFi",
      "Crypto volatility is 5-10x higher than stocks",
      "Understand wallets, private keys, and security",
      "Only invest what you can afford to lose"
    ]
  },
  {
    id: 5,
    title: "Trading Psychology: Controlling Emotions",
    category: "Psychology",
    content: `Trading psychology refers to the mental and emotional factors that influence trading decisions. Fear and greed are the two primary emotions that destroy trading accounts. Understanding and controlling these emotions is crucial for long-term success.

Fear manifests in various forms: fear of missing out (FOMO), fear of losing money, and fear of being wrong. FOMO leads to buying at market tops after seeing others profit. Fear of losses causes premature exits or inability to take valid trades.

Greed shows as overtrading, increasing position sizes after wins, and holding positions too long for "one more tick." Greed blinds traders to risk and often turns winning trades into losers.

Overtrading is the habit of taking too many trades, often driven by boredom or the need for action. Every trade has costs (spread, commission, slippage). Quality over quantity should be your mantra. The best traders wait for high-probability setups.

The trading plan is your defense against emotional decisions. It should specify entry criteria, exit rules, position sizing, and maximum daily loss. When emotions surge, return to your plan. Discipline is doing what needs to be done when you don't want to do it.

Psychology meters in trading simulators help track emotional patterns. High stress levels often precede poor decisions. Take breaks when frustrated or fatigued. Trading is a marathon, not a sprint.`,
    xpReward: 65,
    eCoinReward: 30,
    readTime: 9,
    difficulty: "Beginner",
    keyTakeaways: [
      "Fear and greed are primary emotion-based enemies",
      "FOMO leads to buying at tops",
      "Overtrading destroys accounts through costs",
      "A trading plan prevents emotional decisions",
      "Take breaks when stressed or fatigued"
    ]
  },
  {
    id: 6,
    title: "Support and Resistance: Key Price Levels",
    category: "Technical Analysis",
    content: `Support and resistance levels are price zones where buying or selling pressure historically emerges. Understanding these levels helps traders identify potential entry points, stop loss placements, and price targets.

Support is a price level where buying pressure exceeds selling pressure, preventing further price decline. When price approaches support, buyers become more aggressive, causing price to bounce. The more times price tests a support level without breaking it, the stronger it becomes.

Resistance is the opposite - a level where selling pressure exceeds buying pressure, preventing further price rise. When price approaches resistance, sellers become more aggressive. Strong resistance can become support after breakout (and vice versa).

Traders use various methods to identify support/resistance: previous swing highs and lows, round numbers, trendlines, moving averages, and Fibonacci retracements. The key is finding levels where price has reacted multiple times.

When support breaks, it often becomes resistance. This is because traders who bought at support now sell to break even when price returns. This phenomenon is called polarity switch. Always watch for retests of broken levels.

Pivot points are calculated based on previous day's high, low, and close. They provide intraday support and resistance levels popular with day traders. Weekly and monthly pivot points offer longer-term reference levels.`,
    xpReward: 60,
    eCoinReward: 30,
    readTime: 8,
    difficulty: "Beginner",
    keyTakeaways: [
      "Support = buying pressure; Resistance = selling pressure",
      "More tests = stronger level",
      "Support often becomes resistance after break",
      "Use multiple methods to identify levels",
      "Pivot points provide calculated S/R levels"
    ]
  },
  {
    id: 7,
    title: "Candlestick Patterns: Reading Price Action",
    category: "Technical Analysis",
    content: `Candlestick charts originated in Japan in the 18th century. Each candlestick shows four prices: open, high, low, and close (OHLC). The body represents the range between open and close, while wicks (shadows) show high and low.

Common patterns signal potential reversals or continuations. The doji has equal open and close, indicating indecision. Hammer and hanging man have small bodies with long lower wicks, signaling potential reversal (bullish for hammer, bearish for hanging man).

Engulfing patterns occur when a candle's body completely covers the previous candle's body. Bullish engulfing (green candle covering red) suggests upward reversal. Bearish engulfing (red covering green) suggests downward reversal.

Morning star and evening star are three-candle reversal patterns. Morning star: small candle between large red and green candles (bullish). Evening star: small candle between large green and red candles (bearish).

Three white soldiers and three black crows are three-consecutive candle patterns indicating strong trends. Three white soldiers (three green candles with higher closes) signal bullish continuation. Three black crows (three red candles with lower closes) signal bearish continuation.

Always confirm candlestick patterns with volume and other indicators. A pattern alone doesn't guarantee reversal. Context matters - what works in a trending market may fail in ranging markets.`,
    xpReward: 70,
    eCoinReward: 35,
    readTime: 11,
    difficulty: "Intermediate",
    keyTakeaways: [
      "Candlesticks show OHLC in visual form",
      "Doji indicates indecision",
      "Engulfing patterns show reversal potential",
      "Morning/Evening star are 3-candle reversals",
      "Confirm patterns with volume and context"
    ]
  },
  {
    id: 8,
    title: "Fundamental Analysis: Reading Financial Statements",
    category: "Fundamentals",
    content: `Fundamental analysis evaluates a company's intrinsic value by examining financial statements, industry conditions, and economic factors. It answers: "Is this company worth more than its current price?"

The income statement shows revenue, expenses, and profit over a period. Key metrics include revenue growth (year-over-year), gross margin (revenue minus cost of goods sold), and net profit margin (net income divided by revenue).

The balance sheet provides a snapshot at a point in time. Assets = Liabilities + Equity. Key metrics: Current ratio (current assets ÷ current liabilities) measures short-term liquidity. Debt-to-equity ratio measures financial leverage.

The cash flow statement tracks money moving in and out. Operating cash flow shows core business health. Free cash flow (operating cash flow minus capital expenditures) is cash available for dividends, buybacks, or growth.

Key ratios: P/E (price-to-earnings) compares price to annual earnings. Lower P/E might indicate undervalued stock. PEG (P/E divided by earnings growth) adjusts for growth. Dividend yield shows annual dividend as percentage of stock price.

Beyond numbers, consider qualitative factors: competitive advantage (moat), quality of management, industry trends, and regulatory environment. A great company at fair price beats a fair company at great price.`,
    xpReward: 85,
    eCoinReward: 50,
    readTime: 13,
    difficulty: "Advanced",
    keyTakeaways: [
      "Income statement shows revenue, expenses, profit",
      "Balance sheet: Assets = Liabilities + Equity",
      "Cash flow tracks money movement",
      "P/E ratio compares price to earnings",
      "Consider qualitative factors too"
    ]
  },
  {
    id: 9,
    title: "Trading Strategies: Day Trading vs Swing Trading",
    category: "Strategies",
    content: `Day trading involves opening and closing positions within the same trading day. Day traders capitalize on small price movements using leverage. They typically use technical analysis, chart patterns, and momentum indicators. Requires screen time, discipline, and quick decision-making.

Swing trading holds positions from days to weeks, capturing medium-term moves. Swing traders use a combination of technical and fundamental analysis. They look for multi-day chart patterns and sector rotations. More suitable for part-time traders.

Position trading is long-term, holding for months to years. Position traders focus on fundamental analysis and macro trends. They ignore short-term noise and require patience. Requires larger capital and higher risk tolerance.

Scalping is the fastest style, holding seconds to minutes. Scalpers aim for tiny profits that compound quickly. Requires ultra-low latency, tight spreads, and disciplined execution. Most challenging style with highest failure rate.

Choosing a strategy depends on: time availability, capital, risk tolerance, and personality. No strategy is superior - consistency matters more. Master one approach before diversifying. Track your trades to identify what works.

Hybrid approaches combine elements. For example, a swing trader might scalp on intraday volatility or a day trader might hold overnight positions occasionally. Start simple and evolve as experience grows.`,
    xpReward: 65,
    eCoinReward: 35,
    readTime: 10,
    difficulty: "Intermediate",
    keyTakeaways: [
      "Day trading: same day, requires screen time",
      "Swing trading: days to weeks, more flexible",
      "Position trading: months to years, patient",
      "Scalping: seconds to minutes, high stress",
      "Choose based on time, capital, personality"
    ]
  },
  {
    id: 10,
    title: "Market Cycles and Economic Indicators",
    category: "Fundamentals",
    content: `Markets move in cycles driven by economic conditions, interest rates, and investor sentiment. Understanding these cycles helps time entries and manage risk. The four phases: accumulation, markup, distribution, and markdown.

The business cycle has phases: expansion (growth), peak, contraction (recession), and trough. Different sectors perform better in different phases. Consumer discretionary thrives during expansion; utilities and healthcare perform during contraction.

Key economic indicators: GDP (gross domestic product) measures economic output. GDP growth of 2-3% is considered healthy. Inflation (CPI/PPI) erodes purchasing power. Central banks target 2% inflation in developed economies.

Interest rates profoundly impact markets. Higher rates increase borrowing costs, reducing corporate profits and valuations. They make bonds more attractive, pulling money from stocks. Federal Reserve decisions move markets significantly.

Unemployment rate indicates labor market health. Below 4% is considered full employment. Rising unemployment signals economic weakening. The unemployment report (NFP) is one of the most market-moving data releases.

Consumer confidence measures how optimistic households are about their financial situation. High confidence drives spending, boosting corporate earnings. Weak confidence leads to reduced spending and economic slowdown.`,
    xpReward: 75,
    eCoinReward: 40,
    readTime: 11,
    difficulty: "Advanced",
    keyTakeaways: [
      "Market cycles: accumulation, markup, distribution, markdown",
      "Business cycle: expansion, peak, contraction, trough",
      "GDP measures economic output; 2-3% is healthy",
      "Interest rates significantly impact valuations",
      "NFP report is highly market-moving"
    ]
  }
];

export default articles;
