// Mock Translation API - Simulates OpenAI translation
export const translateText = async (text: string, targetLang: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const translations: Record<string, Record<string, string>> = {
    hi: {
      'stock': 'स्टॉक (शेयर)',
      'market': 'बाजार',
      'bull market': 'बैल बाजार (तेजी)',
      'bear market': 'भालू बाजार (मंदी)',
      'profit': 'लाभ',
      'loss': 'हानि',
      'trading': 'ट्रेडिंग',
      'investment': 'निवेश',
      'price': 'मूल्य',
      'buy': 'खरीदें',
      'sell': 'बेचें',
      'A stock represents partial ownership': 'एक स्टॉक आंशिक स्वामित्व का प्रतिनिधित्व करता है',
      'Support is a price level where buying pressure': 'सहारा एक मूल्य स्तर है जहां खरीद दबाव',
      'RSI stands for Relative Strength Index': 'RSI का पूर्ण रूप रिलेटिव स्ट्रेंथ इंडेक्स है',
    },
    es: {
      'stock': 'acción',
      'market': 'mercado',
      'bull market': 'mercado alcista',
      'bear market': 'mercado bajista',
      'profit': 'beneficio',
      'loss': 'pérdida',
      'trading': 'comercio',
      'investment': 'inversión',
      'price': 'precio',
      'buy': 'comprar',
      'sell': 'vender',
      'A stock represents partial ownership': 'Una acción representa propiedad parcial',
      'Support is a price level where buying pressure': 'El soporte es un nivel de precio donde la presión de compra',
      'RSI stands for Relative Strength Index': 'RSI significa Índice de Fuerza Relativa',
    },
    zh: {
      'stock': '股票',
      'market': '市场',
      'bull market': '牛市',
      'bear market': '熊市',
      'profit': '利润',
      'loss': '亏损',
      'trading': '交易',
      'investment': '投资',
      'price': '价格',
      'buy': '买入',
      'sell': '卖出',
      'A stock represents partial ownership': '股票代表部分所有权',
      'Support is a price level where buying pressure': '支撑位是买入压力的价格水平',
      'RSI stands for Relative Strength Index': 'RSI代表相对强弱指数',
    }
  };

  const langTranslations = translations[targetLang];
  if (!langTranslations) return text;

  // Simple word/phrase replacement
  let translated = text;
  for (const [key, value] of Object.entries(langTranslations)) {
    translated = translated.replace(new RegExp(key, 'gi'), value);
  }

  return translated;
};

// Mock AI explanation generator
export const generateExplanation = async (term: string, userLang: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const explanations: Record<string, Record<string, string>> = {
    hi: {
      'Stock': 'स्टॉक या शेयर किसी कंपनी का आंशिक स्वामित्व है। जब आप शेयर खरीदते हैं, तो आप उस कंपनी के मालिक बन जाते हैं।',
      'Market': 'बाजार एक ऐसी जगह है जहां खरीदार और विक्रेता वित्तीय संपत्तियों का व्यापार करते हैं।',
      'Bull Market': 'बैल बाजार तब होता है जब कीमतें बढ़ रही हों और निवेशक आशावादी हों।',
      'Bear Market': 'भालू बाजार तब होता है जब कीमतें गिर रही हों और निवेशक निराशावादी हों।',
      'Support': 'सहारा एक मूल्य स्तर है जहां खरीदारों की संख्या बिक्रेता से अधिक होती है, जिससे कीमत और नहीं गिरती।',
      'Resistance': 'प्रतिरोध एक मूल्य स्तर है जहां विक्रेता खरीदारों से अधिक होते हैं, जिससे कीमत और नहीं बढ़ती।',
      'RSI': 'RSI (रिलेटिव स्ट्रेंथ इंडेक्स) एक गति संकेतक है जो 0-100 के पैमाने पर मूल्य आंदोलन की गति को मापता है।',
      'Moving Average': 'मूविंग एवरेज एक तकनीकी संकेतक है जो एक निश्चित अवधि में औसत मूल्य दिखाता है।',
      'Volume': 'वॉल्यूम किसी विशेष अवधि में कितने शेयरों का व्यापार हुआ, यह दर्शाता है।',
    },
    es: {
      'Stock': 'Una acción representa propiedad parcial en una empresa. Cuando compras acciones, te conviertes en propietario de esa empresa.',
      'Market': 'El mercado es un lugar donde compradores y vendedores intercambian activos financieros.',
      'Bull Market': 'Un mercado alcista es cuando los precios están subiendo y los inversores son optimistas.',
      'Bear Market': 'Un mercado bajista es cuando los precios están cayendo y los inversores son pesimistas.',
      'Support': 'El soporte es un nivel de precio donde la presión de compra supera a la venta, evitando que el precio caiga más.',
      'Resistance': 'La resistencia es un nivel de precio donde la presión de venta supera a la compra, evitando que el precio suba más.',
      'RSI': 'RSI (Índice de Fuerza Relativa) es un indicador de momento que mide la velocidad del cambio de precios en una escala de 0-100.',
      'Moving Average': 'La media móvil es un indicador técnico que muestra el precio promedio durante un período específico.',
      'Volume': 'El volumen muestra cuántas acciones se negociaron durante un período específico.',
    },
    zh: {
      'Stock': '股票代表公司的部分所有权。购买股票后，您就成为了公司的股东。',
      'Market': '市场是买卖金融资产的地方。',
      'Bull Market': '牛市是指价格上涨、投资者乐观的时期。',
      'Bear Market': '熊市是指价格下跌、投资者悲观的时期。',
      'Support': '支撑位是指买盘压力超过卖盘的价格水平，防止价格进一步下跌。',
      'Resistance': '阻力位是指卖盘压力超过买盘的价格水平，防止价格进一步上涨。',
      'RSI': 'RSI（相对强弱指数）是一个动量指标，在0-100的范围内测量价格变化的速度。',
      'Moving Average': '移动平均线是一种技术指标，显示特定时期的平均价格。',
      'Volume': '成交量显示特定时期内交易了多少股票。',
    }
  };

  const termExplanations = explanations[userLang] || explanations['en'];
  return termExplanations[term] || `Here's an explanation of ${term}: In trading, ${term} is an important concept that helps you understand market dynamics.`;
};

// Text-to-Speech function using Web Speech API
export const speakText = (text: string, lang: string = 'en-US'): void => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language
    const langMap: Record<string, string> = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'es': 'es-ES',
      'zh': 'zh-CN'
    };
    
    utterance.lang = langMap[lang] || 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    // Try to get a natural voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith(lang));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    window.speechSynthesis.speak(utterance);
  }
};

// Generate AI Roast for losing trades
export const generateRoast = (pnlPercent: number, asset: string, mistakes: string[]): string => {
  const roasts = [
    `Ouch! ${Math.abs(pnlPercent).toFixed(1)}% loss on ${asset}? Did you just yolo into that trade? 😬`,
    `Breaking news: Another trader just discovered that timing is EVERYTHING! Your ${asset} trade is down ${Math.abs(pnlPercent).toFixed(1)}%.`,
    `Yikes! ${asset} just taught you a expensive lesson. That's what we call "buying high, selling lower." Classic!`,
    `Well well well... look at you, getting a master's degree in losing money on ${asset}! ${Math.abs(pnlPercent).toFixed(1)}% gone just like that!`,
    `Your ${asset} trade is down ${Math.abs(pnlPercent).toFixed(1)}%. Quick tip: Have you tried... not doing that?`,
  ];
  
  const mistakesRoasts = [
    {
      tag: 'fomo',
      message: "FOMO got you again! You saw green candles and your brain just... stopped working. Classic FOMO trap!"
    },
    {
      tag: 'nostoploss',
      message: "No stop-loss? Bold strategy, Cotton. Let's see how that works out for you... oh wait, we already know."
    },
    {
      tag: 'overtrading',
      message: "You're trading more than a day trader on caffeine! Sometimes less is more. Quality over quantity!"
    },
    {
      tag: 'revenge',
      message: "Revenge trading? That's like trying to put out a fire with gasoline. We all lose sometimes - it's how we learn!"
    }
  ];
  
  const baseRoast = roasts[Math.floor(Math.random() * roasts.length)];
  
  // Add specific mistake feedback if available
  const matchedMistake = mistakes.find(m => mistakesRoasts.some(r => r.tag === m));
  const mistakeFeedback = matchedMistake ? ' ' + mistakesRoasts.find(r => r.tag === matchedMistake)?.message : '';
  
  return baseRoast + mistakeFeedback;
};

// Generate adaptive quiz based on weakness tags
export const generateAdaptiveQuiz = (weaknessTags: string[]): string[] => {
  const quizMap: Record<string, string[]> = {
    'support-resistance': [
      "What is a support level?",
      "What is a resistance level?",
      "How do you identify support and resistance?",
      "What happens when support is broken?"
    ],
    'rsi': [
      "What does RSI measure?",
      "What is an overbought RSI reading?",
      "What is an oversold RSI reading?",
      "What is RSI divergence?"
    ],
    'macd': [
      "What does MACD stand for?",
      "What is a MACD crossover?",
      "What does the MACD histogram show?",
      "What is signal line?"
    ],
    'fundamental': [
      "What is P/E ratio?",
      "What is market cap?",
      "What are earnings?",
      "What is dividend?"
    ],
    'risk': [
      "What is position sizing?",
      "What is the 2% rule?",
      "What is stop-loss?",
      "What is risk/reward ratio?"
    ]
  };
  
  const questions: string[] = [];
  weaknessTags.forEach(tag => {
    if (quizMap[tag]) {
      questions.push(...quizMap[tag]);
    }
  });
  
  return questions.slice(0, 10);
};

// Format number with commas
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

// Format currency
export const formatCurrency = (num: number, decimals: number = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num);
};

// Calculate XP needed for next level
export const calculateXPForLevel = (level: number): number => {
  return Math.floor(1000 * Math.pow(1.5, level - 1));
};

// Get level title
export const getLevelTitle = (level: number): string => {
  if (level < 5) return 'Novice';
  if (level < 10) return 'Apprentice';
  if (level < 15) return 'Trader';
  if (level < 20) return 'Analyst';
  if (level < 25) return 'Speculator';
  if (level < 30) return 'Expert';
  if (level < 35) return 'Master';
  return 'Whale';
};

// Check if asset is unlocked based on user level
export const isAssetUnlocked = (minLevel: number, userLevel: number): boolean => {
  return userLevel >= minLevel;
};

// Calculate energy regeneration time
export const getEnergyRegenTime = (currentEnergy: number, maxEnergy: number, regenRate: number): string => {
  const needed = maxEnergy - currentEnergy;
  const hours = Math.ceil(needed / regenRate);
  return hours === 1 ? '1 hour' : `${hours} hours`;
};
