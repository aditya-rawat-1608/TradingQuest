// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonValue = any;

export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  eCoins: number;
  energy: number;
  maxEnergy: number;
  energyRegenRate: number;
  preferredLanguage: string;
  weaknessTags: string[];
  domainSkills: {
    technical: number;
    fundamental: number;
    risk: number;
    psychology: number;
  };
  reputation: number;
  panicSells: number;
  overTrades: number;
  streak: number;
  lastLogin: Date;
  createdAt: Date;
}

export interface Trade {
  _id: string;
  userId: string;
  asset: string;
  assetType: 'stock' | 'crypto' | 'forex' | 'etf';
  type: 'long' | 'short';
  status: 'open' | 'closed';
  entryPrice: number;
  exitPrice?: number;
  quantity: number;
  leverage: number;
  pnl?: number;
  pnlPercent?: number;
  aiFeedback?: string;
  openedAt: Date;
  closedAt?: Date;
}

export interface Article {
  id: number;
  _id?: number | string;
  title: string;
  category: string;
  content: string;
  xpReward: number;
  eCoinReward?: number;
  readTime?: number;
  summary?: string;
  difficulty?: string;
  tags?: string[];
  keyTakeaways: string[];
}

export interface Quiz {
  id: number;
  title: string;
  category: string;
  questions: Question[];
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  explanation: string;
}

export interface Asset {
  symbol: string;
  name: string;
  type: 'stock' | 'crypto' | 'forex' | 'etf';
  price: number;
  currentPrice?: number;
  minLevel: number;
  minEnergy?: number;
  volatility: 'low' | 'medium' | 'high';
  change24h: number;
  sector?: string;
  _id?: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface PsychologyMetrics {
  stressLevel: number;
  decisionQuality: number;
  patienceScore: number;
  riskTolerance: number;
}

export interface MarketEvent {
  id: string;
  name: string;
  description: string;
  type: 'bull' | 'bear' | 'volatile';
  sectors: string[];
  volatilityMultiplier: number;
  duration: number;
  active: boolean;
}

export interface QuizQuestion {
  id?: number;
  _id?: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  explanation: string;
}
