import { create } from 'zustand';
import type { User, Trade, Article, QuizQuestion, Asset, MarketEvent, PsychologyMetrics } from '../types';

// Mock initial user data
const initialUser: User = {
  _id: '1',
  username: 'TraderX',
  email: 'trader@tradequest.io',
  avatar: '',
  level: 3,
  xp: 450,
  xpToNextLevel: 1000,
  eCoins: 250,
  energy: 85,
  maxEnergy: 100,
  energyRegenRate: 10,
  preferredLanguage: 'en',
  weaknessTags: ['support-resistance', 'macd'],
  domainSkills: {
    technical: 35,
    fundamental: 25,
    risk: 40,
    psychology: 20,
  },
  reputation: 72,
  panicSells: 3,
  overTrades: 5,
  streak: 4,
  lastLogin: new Date(),
  createdAt: new Date('2024-01-15'),
};

// Mock assets
const mockAssets: Asset[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', price: 178.52, volatility: 'low', minLevel: 1, minEnergy: 10, change24h: 1.2, sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft', type: 'stock', price: 378.91, volatility: 'low', minLevel: 1, minEnergy: 10, change24h: 0.8, sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet', type: 'stock', price: 141.80, volatility: 'low', minLevel: 1, minEnergy: 10, change24h: -0.3, sector: 'Technology' },
  { symbol: 'AMZN', name: 'Amazon', type: 'stock', price: 178.25, volatility: 'medium', minLevel: 3, minEnergy: 10, change24h: 1.5, sector: 'Consumer' },
  { symbol: 'TSLA', name: 'Tesla', type: 'stock', price: 248.50, volatility: 'high', minLevel: 5, minEnergy: 15, change24h: -2.1, sector: 'Automotive' },
  { symbol: 'SPY', name: 'S&P 500 ETF', type: 'etf', price: 478.32, volatility: 'low', minLevel: 1, minEnergy: 10, change24h: 0.4, sector: 'Index' },
  { symbol: 'BTC', name: 'Bitcoin', type: 'crypto', price: 43250.00, volatility: 'high', minLevel: 20, minEnergy: 20, change24h: 3.2, sector: 'Crypto' },
  { symbol: 'ETH', name: 'Ethereum', type: 'crypto', price: 2280.50, volatility: 'high', minLevel: 20, minEnergy: 20, change24h: 2.8, sector: 'Crypto' },
  { symbol: 'EUR/USD', name: 'Euro/Dollar', type: 'forex', price: 1.0875, volatility: 'medium', minLevel: 15, minEnergy: 15, change24h: 0.1, sector: 'Forex' },
  { symbol: 'NVDA', name: 'NVIDIA', type: 'stock', price: 495.22, volatility: 'high', minLevel: 8, minEnergy: 15, change24h: 2.5, sector: 'Technology' },
];

// Mock trades
const mockTrades: Trade[] = [
  { _id: '1', userId: '1', asset: 'AAPL', assetType: 'stock', type: 'long', status: 'open', entryPrice: 175.00, quantity: 10, leverage: 1, openedAt: new Date('2024-02-10') },
  { _id: '2', userId: '1', asset: 'TSLA', assetType: 'stock', type: 'long', status: 'closed', entryPrice: 240.00, exitPrice: 235.00, quantity: 5, leverage: 1, pnl: -25, pnlPercent: -2.08, aiFeedback: "FOMO struck again! You bought the dip that kept dipping. Remember: not every red candle is a buying opportunity.", openedAt: new Date('2024-02-08'), closedAt: new Date('2024-02-09') },
  { _id: '3', userId: '1', asset: 'SPY', assetType: 'etf', type: 'long', status: 'closed', entryPrice: 470.00, exitPrice: 478.00, quantity: 20, leverage: 1, pnl: 160, pnlPercent: 1.70, openedAt: new Date('2024-02-05'), closedAt: new Date('2024-02-07') },
];

// Psychology metrics
const initialPsychology: PsychologyMetrics = {
  stressLevel: 45,
  decisionQuality: 68,
  patienceScore: 52,
  riskTolerance: 60,
};

// Active market event
const initialMarketEvent: MarketEvent | null = {
  id: 'event-1',
  name: 'AI Tech Boom',
  description: 'AI sector experiencing 2x volatility due to breakthrough announcements!',
  type: 'bull',
  sectors: ['Technology'],
  volatilityMultiplier: 2.0,
  duration: 24,
  active: true,
};

interface AppState {
  // User state
  user: User;
  setUser: (user: Partial<User>) => void;
  
  // Energy management
  energy: number;
  maxEnergy: number;
  useEnergy: (amount: number) => boolean;
  deductEnergy: (amount: number) => void;
  regenerateEnergy: () => void;
  
  // XP & Level
  addXP: (amount: number) => void;
  addECoins: (amount: number) => void;
  setWeaknessTag: (tags: string[]) => void;
  
  // Trades
  trades: Trade[];
  openTrade: (trade: Omit<Trade, '_id'>) => void;
  closeTrade: (tradeId: string, exitPrice: number) => void;
  
  // Assets
  assets: Asset[];
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset | null) => void;
  
  // Articles & Learning
  articles: Article[];
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
  
  // Quiz
  currentQuiz: QuizQuestion[];
  currentQuestionIndex: number;
  setCurrentQuiz: (questions: QuizQuestion[]) => void;
  answerQuestion: (answer: number) => boolean;
  
  // Psychology
  psychology: PsychologyMetrics;
  updatePsychology: (metrics: Partial<PsychologyMetrics>) => void;
  
  // Market Events
  marketEvent: MarketEvent | null;
  setMarketEvent: (event: MarketEvent | null) => void;
  
  // UI State
  activeTab: 'dashboard' | 'trade' | 'learn' | 'quiz' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'trade' | 'learn' | 'quiz' | 'profile') => void;
  
  // AI Coach
  aiMessages: { role: 'user' | 'ai'; content: string }[];
  addAIMessage: (message: { role: 'user' | 'ai'; content: string }) => void;
  
  // Streak
  checkStreak: () => void;
  checkAndRegenerateEnergy: () => void;
}

export const useStore = create<AppState>((set, get) => ({
  // User
  user: initialUser,
  setUser: (updates) => set((state) => ({ user: { ...state.user, ...updates } })),
  
  // Energy
  energy: initialUser.energy,
  maxEnergy: initialUser.maxEnergy,
  useEnergy: (amount) => {
    const { energy, user } = get();
    if (energy >= amount && user.energy >= amount) {
      set((state) => ({ 
        energy: state.energy - amount,
        user: { ...state.user, energy: state.user.energy - amount }
      }));
      return true;
    }
    return false;
  },
  deductEnergy: (amount) => {
    set((state) => {
      const newEnergy = Math.max(0, state.energy - amount);
      return {
        energy: newEnergy,
        user: { ...state.user, energy: newEnergy }
      };
    });
  },
  regenerateEnergy: () => {
    set((state) => {
      const newEnergy = Math.min(state.energy + state.user.energyRegenRate, state.maxEnergy);
      return { 
        energy: newEnergy,
        user: { ...state.user, energy: newEnergy }
      };
    });
  },
  
  // XP & Level
  addXP: (amount) => {
    set((state) => {
      let newXP = state.user.xp + amount;
      let newLevel = state.user.level;
      let newXPToNext = state.user.xpToNextLevel;
      
      if (newXP >= newXPToNext) {
        newXP -= newXPToNext;
        newLevel += 1;
        newXPToNext = Math.floor(newXPToNext * 1.5);
      }
      
      return {
        user: {
          ...state.user,
          xp: newXP,
          level: newLevel,
          xpToNextLevel: newXPToNext,
        }
      };
    });
  },
  addECoins: (amount) => {
    set((state) => ({
      user: { ...state.user, eCoins: state.user.eCoins + amount }
    }));
  },
  setWeaknessTag: (tags) => {
    set((state) => ({
      user: { ...state.user, weaknessTags: tags }
    }));
  },
  
  // Trades
  trades: mockTrades,
  openTrade: (trade) => {
    const newTrade: Trade = { ...trade, _id: `trade-${Date.now()}` };
    set((state) => ({ trades: [...state.trades, newTrade] }));
  },
  closeTrade: (tradeId, exitPrice) => {
    set((state) => {
      const trades = state.trades.map((t) => {
        if (t._id === tradeId && t.status === 'open') {
          const pnl = (exitPrice - t.entryPrice) * t.quantity * t.leverage;
          const pnlPercent = ((exitPrice - t.entryPrice) / t.entryPrice) * 100;
          
          // Generate AI feedback for losing trades
          let aiFeedback = '';
          if (pnlPercent < -5) {
            const roasts = [
              "Ouch! That's a 5%+ loss. Did you forget to set a stop-loss? Or did FOMO grab the wheel again?",
              "Yikes! You're basically burning money. Remember: not every 'hot tip' is worth your hard-earned E-Coins.",
              "Oof! Another victim of the 'buy high, sell lower' club. Have you tried... not doing that?",
              "That's rough. Quick tip: maybe check the chart before clicking 'buy'? Just a thought!",
            ];
            aiFeedback = roasts[Math.floor(Math.random() * roasts.length)];
          }
          
          return {
            ...t,
            status: 'closed' as const,
            exitPrice,
            pnl,
            pnlPercent,
            aiFeedback,
            closedAt: new Date(),
          };
        }
        return t;
      });
      return { trades };
    });
  },
  
  // Assets
  assets: mockAssets,
  selectedAsset: mockAssets[0],
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
  
  // Articles - will be populated from mock data
  articles: [],
  selectedArticle: null,
  setSelectedArticle: (article) => set({ selectedArticle: article }),
  
  // Quiz
  currentQuiz: [],
  currentQuestionIndex: 0,
  setCurrentQuiz: (questions) => set({ currentQuiz: questions, currentQuestionIndex: 0 }),
  answerQuestion: (answer) => {
    const { currentQuiz, currentQuestionIndex } = get();
    const isCorrect = currentQuiz[currentQuestionIndex]?.correctAnswer === answer;
    if (!isCorrect) {
      set((state) => ({
        user: {
          ...state.user,
          weaknessTags: [...state.user.weaknessTags, currentQuiz[currentQuestionIndex]?.category || 'general'],
        }
      }));
    }
    set((state) => ({ currentQuestionIndex: state.currentQuestionIndex + 1 }));
    return isCorrect;
  },
  
  // Psychology
  psychology: initialPsychology,
  updatePsychology: (metrics) => set((state) => ({ 
    psychology: { ...state.psychology, ...metrics } 
  })),
  
  // Market Events
  marketEvent: initialMarketEvent,
  setMarketEvent: (event) => set({ marketEvent: event }),
  
  // UI
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  // AI Coach
  aiMessages: [
    { role: 'ai', content: "Welcome to TradeQuest! I'm your AI Coach. I'll help you learn trading, roast your bad trades, and guide your journey to becoming a profitable trader. Let's make some money! 📈" }
  ],
  addAIMessage: (message) => set((state) => ({ 
    aiMessages: [...state.aiMessages, message] 
  })),
  
  // Streak
  checkStreak: () => {
    const { user } = get();
    const now = new Date();
    const lastLogin = new Date(user.lastLogin);
    const diffDays = Math.floor((now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      set((state) => ({
        user: { ...state.user, streak: state.user.streak + 1 }
      }));
    } else if (diffDays > 1) {
      set((state) => ({
        user: { ...state.user, streak: 0 }
      }));
    }
  },

  // Check and regenerate energy based on time passed
  checkAndRegenerateEnergy: () => {
    set((state) => {
      const newEnergy = Math.min(state.energy + 5, state.maxEnergy);
      return {
        energy: newEnergy,
        user: { ...state.user, energy: newEnergy }
      };
    });
  },
}));

export default useStore;
