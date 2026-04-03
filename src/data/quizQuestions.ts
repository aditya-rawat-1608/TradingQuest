import { Quiz } from '../types';

export const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Stock Market Fundamentals Quiz",
    category: "Fundamentals",
    questions: [
      {
        question: "What does a stock represent?",
        options: ["A loan to a company", "Partial ownership in a company", "A bond", "A government security"],
        correctAnswer: 1,
        category: "basics",
        explanation: "Stocks represent partial ownership (equity) in a company. When you buy stock, you become a shareholder."
      },
      {
        question: "What are the two main stock exchanges in the US?",
        options: ["NYSE and NASDAQ", "LSE and TSE", "DAX and CAC", "SSE and HKEX"],
        correctAnswer: 0,
        category: "basics",
        explanation: "The New York Stock Exchange (NYSE) and NASDAQ are the two main US stock exchanges."
      },
      {
        question: "What is fundamental analysis?",
        options: ["Analyzing price charts only", "Evaluating company financials and value", "Studying trading volume", "Watching candlestick patterns"],
        correctAnswer: 1,
        category: "fundamentals",
        explanation: "Fundamental analysis examines financial statements, management, competitive advantages, and industry conditions."
      },
      {
        question: "What is the P/E ratio used for?",
        options: ["Measuring profit efficiency", "Comparing price to earnings", "Calculating dividends", "Determining market cap"],
        correctAnswer: 1,
        category: "fundamentals",
        explanation: "P/E (Price-to-Earnings) ratio compares a company's stock price to its earnings per share."
      },
      {
        question: "What does GDP measure?",
        options: ["Inflation rate", "Unemployment", "Economic output", "Stock prices"],
        correctAnswer: 2,
        category: "economics",
        explanation: "GDP (Gross Domestic Product) measures the total economic output of a country."
      }
    ]
  },
  {
    id: 2,
    title: "Technical Analysis Quiz",
    category: "Technical Analysis",
    questions: [
      {
        question: "What does RSI stand for?",
        options: ["Real Stock Index", "Relative Strength Index", "Risk Standard Indicator", "Return on Stock Investment"],
        correctAnswer: 1,
        category: "indicators",
        explanation: "RSI stands for Relative Strength Index, a momentum oscillator measuring speed of price changes."
      },
      {
        question: "What RSI level typically indicates oversold conditions?",
        options: ["Above 70", "Below 30", "At 50", "At 100"],
        correctAnswer: 1,
        category: "indicators",
        explanation: "RSI below 30 typically indicates oversold conditions; above 70 indicates overbought."
      },
      {
        question: "What is a moving average?",
        options: ["A prediction of future prices", "Average price over a period", "The highest price ever", "Trading volume indicator"],
        correctAnswer: 1,
        category: "indicators",
        explanation: "Moving average calculates the average price over a specific period, smoothing price data."
      },
      {
        question: "What does MACD stand for?",
        options: ["Moving Average Convergence Divergence", "Market Analysis Current Direction", "Mean Average Change Daily", "Momentum And Capital Distribution"],
        correctAnswer: 0,
        category: "indicators",
        explanation: "MACD is Moving Average Convergence Divergence, a trend-following momentum indicator."
      },
      {
        question: "What is support in trading?",
        options: ["A level where selling increases", "A level where buying pressure prevents further decline", "A stop loss order", "A market top"],
        correctAnswer: 1,
        category: "price-action",
        explanation: "Support is a price level where buying pressure exceeds selling, preventing further price decline."
      }
    ]
  },
  {
    id: 3,
    title: "Risk Management Quiz",
    category: "Risk Management",
    questions: [
      {
        question: "What percentage of capital should you risk per trade?",
        options: ["5-10%", "1-2%", "50%", "25%"],
        correctAnswer: 1,
        category: "position-sizing",
        explanation: "Standard risk management suggests risking no more than 1-2% of capital per trade."
      },
      {
        question: "What is a stop loss?",
        options: ["A type of order to buy", "A predetermined exit point limiting losses", "A guarantee of profit", "A trading strategy"],
        correctAnswer: 1,
        category: "risk",
        explanation: "Stop loss is a predetermined exit point that limits your loss if trade moves against you."
      },
      {
        question: "What is a good risk-to-reward ratio?",
        options: ["1:1", "1:2 or higher", "2:1", "0.5:1"],
        correctAnswer: 1,
        category: "risk",
        explanation: "A minimum 1:2 ratio means risking $1 to potentially make $2."
      },
      {
        question: "What does position sizing determine?",
        options: ["Which stock to buy", "How much capital to allocate to a trade", "When to exit", "Which broker to use"],
        correctAnswer: 1,
        category: "position-sizing",
        explanation: "Position sizing determines how much capital to allocate to each trade based on risk parameters."
      },
      {
        question: "Why is diversification important?",
        options: ["It guarantees profits", "It reduces impact of single trade losses", "It eliminates all risk", "It increases leverage"],
        correctAnswer: 1,
        category: "risk",
        explanation: "Diversification spreads risk across assets, reducing impact of any single trade going wrong."
      }
    ]
  },
  {
    id: 4,
    title: "Cryptocurrency Quiz",
    category: "Crypto",
    questions: [
      {
        question: "What is the maximum supply of Bitcoin?",
        options: ["100 million", "21 million", "1 billion", "Unlimited"],
        correctAnswer: 1,
        category: "crypto",
        explanation: "Bitcoin's supply is capped at 21 million coins, making it deflationary by design."
      },
      {
        question: "What technology underlies Bitcoin?",
        options: ["Cloud computing", "Blockchain", "Artificial intelligence", "Internet of Things"],
        correctAnswer: 1,
        category: "crypto",
        explanation: "Bitcoin uses blockchain technology to record transactions transparently and immutably."
      },
      {
        question: "What are smart contracts?",
        options: ["Legal documents", "Self-executing programs on blockchain", "Trading algorithms", "Bank agreements"],
        correctAnswer: 1,
        category: "crypto",
        explanation: "Smart contracts are self-executing programs that automatically enforce agreements on blockchain."
      },
      {
        question: "What consensus mechanism does Ethereum use?",
        options: ["Proof of Work", "Proof of Stake", "Proof of Authority", "Proof of History"],
        correctAnswer: 1,
        category: "crypto",
        explanation: "Ethereum uses Proof of Stake (after The Merge), where validators stake ETH to secure the network."
      },
      {
        question: "What is typical crypto daily volatility?",
        options: ["0.1-0.5%", "1-2%", "5-10%", "50%"],
        correctAnswer: 2,
        category: "crypto",
        explanation: "Crypto markets are highly volatile with daily swings of 5-10% being common."
      }
    ]
  },
  {
    id: 5,
    title: "Trading Psychology Quiz",
    category: "Psychology",
    questions: [
      {
        question: "What is FOMO?",
        options: ["Fear Of Missing Out", "First Order Market Operation", "Financial Options Market Order", "Fundamental Optimization Method"],
        correctAnswer: 0,
        category: "psychology",
        explanation: "FOMO (Fear Of Missing Out) leads traders to buy at tops after seeing others profit."
      },
      {
        question: "What is overtrading?",
        options: ["Trading with leverage", "Taking too many trades", "Trading in over-the-counter markets", "Trading after hours"],
        correctAnswer: 1,
        category: "psychology",
        explanation: "Overtrading is taking too many trades, often driven by boredom or need for action."
      },
      {
        question: "What is the primary purpose of a trading plan?",
        options: ["To guarantee profits", "To prevent emotional decisions", "To select stocks", "To calculate taxes"],
        correctAnswer: 1,
        category: "psychology",
        explanation: "Trading plan defends against emotional decisions by specifying entry/exit rules and position sizing."
      },
      {
        question: "Which emotion typically destroys trading accounts?",
        options: ["Happiness", "Boredom", "Fear and Greed", "Excitement"],
        correctAnswer: 2,
        category: "psychology",
        explanation: "Fear and greed are the two primary emotions that destroy trading accounts."
      },
      {
        question: "What should you do when feeling stressed or fatigued?",
        options: ["Trade more aggressively", "Take more trades", "Take a break", "Increase position size"],
        correctAnswer: 2,
        category: "psychology",
        explanation: "Trading while stressed or fatigued leads to poor decisions. Take breaks to maintain clarity."
      }
    ]
  }
];

export default quizzes;
