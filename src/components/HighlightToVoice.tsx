import React, { useState } from 'react';
import { useStore } from '../store/useStore';

// Mock translation dictionary
const mockTranslations: { [key: string]: { [lang: string]: string } } = {
  'stock': { en: 'A stock represents partial ownership in a company.', hi: 'स्टॉक कंपनी में आंशिक स्वामित्व का प्रतिनिधित्व करता है।', es: 'Una acción representa propiedad parcial de una empresa.' },
  'bull market': { en: 'A bull market is when prices are rising.', hi: 'बुल मार्केट तब होता है जब कीमतें बढ़ रही हों।', es: 'Un mercado alcista es cuando los precios están subiendo.' },
  'bear market': { en: 'A bear market is when prices are falling.', hi: 'बियर मार्केट तब होता है जब कीमतें गिर रही हों।', es: 'Un mercado bajista es cuando los precios están bajando.' },
  'dividend': { en: 'A dividend is a payment made by a company to its shareholders.', hi: 'डिविडेंड कंपनी द्वारा अपने शेयरधारकों को किया जाने वाला भुगतान है।', es: 'Un dividendo es un pago realizado por una empresa a sus accionistas.' },
  'volatility': { en: 'Volatility measures how much the price fluctuates.', hi: 'अस्थिरता यह मापती है कि कीमत कितनी बार fluctuates।', es: 'La volatilidad mide cuánto fluctúa el precio.' },
  'market cap': { en: 'Market capitalization is the total value of all company shares.', hi: 'मार्केट कैपिटलाइजेशन सभी कंपनी शेयरों का कुल मूल्य है।', es: 'La capitalización de mercado es el valor total de todas las acciones de la empresa.' },
  'portfolio': { en: 'A portfolio is a collection of investments you hold.', hi: 'पोर्टफोलियो आपके द्वारा रखे गए निवेशों का संग्रह है।', es: 'Un portafolio es una colección de inversiones que posees.' },
  'diversification': { en: 'Diversification means spreading investments to reduce risk.', hi: 'विविधीकरण का अर्थ है जोखिम को कम करने के लिए निवेश को फैलाना।', es: 'La diversificación significa distribuir las inversiones para reducir el riesgo.' },
  'etf': { en: 'An ETF (Exchange Traded Fund) is like a basket of securities.', hi: 'ETF (एक्सचेंज ट्रेडेड फंड) प्रतिभूतियों की टोकरी जैसा है।', es: 'Un ETF (Fondo Cotizado) es como una cesta de valores.' },
  'forex': { en: 'Forex is the foreign exchange market for trading currencies.', hi: 'फॉरेक्स मुद्राओं के व्यापार के लिए विदेशी मुद्रा बाजार है।', es: 'Forex es el mercado de divisas para operar con monedas.' },
};

const languageNames: { [key: string]: string } = {
  en: 'English',
  hi: 'हिंदी',
  es: 'Español',
  zh: '中文',
  ja: '日本語',
};

interface HighlightToVoiceProps {
  content: string;
}

const HighlightToVoice: React.FC<HighlightToVoiceProps> = ({ content }) => {
  const { user } = useStore();
  const [selectedText, setSelectedText] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [translatedText, setTranslatedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleTextSelect = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 2) {
      const text = selection.toString().trim().toLowerCase();
      setSelectedText(text);
      
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setTooltipPosition({ x: rect.left + window.scrollX, y: rect.top + window.scrollY - 50 });
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  };

  const translateText = async (text: string, targetLang: string): Promise<string> => {
    // Check mock dictionary first
    for (const [term, translations] of Object.entries(mockTranslations)) {
      if (text.includes(term) && translations[targetLang]) {
        return translations[targetLang];
      }
    }
    
    // Mock API response for unknown terms
    const mockResponses: { [key: string]: string } = {
      en: `Here's an explanation of "${text}": This is a financial term used in trading and investment contexts.`,
      hi: `"${text}" की व्याख्या: यह व्यापार और निवेश संदर्भ में उपयोग की जाने वाली वित्तीय शब्द है।`,
      es: `Aquí está la explicación de "${text}": Este es un término financiero utilizado en contextos de trading e inversión.`,
    };
    
    return mockResponses[targetLang] || mockResponses['en'];
  };

  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'es' ? 'es-ES' : lang === 'zh' ? 'zh-CN' : lang === 'ja' ? 'ja-JP' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleExplain = async () => {
    if (!selectedText) return;
    
    const translated = await translateText(selectedText, user.preferredLanguage);
    setTranslatedText(translated);
    speakText(translated, user.preferredLanguage);
    setShowTooltip(false);
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
    setSelectedText('');
    setTranslatedText('');
    window.speechSynthesis.cancel();
  };

  // Parse content and render with proper formatting
  const renderContent = () => {
    const paragraphs = content.trim().split('\n\n');
    
    return paragraphs.map((para, idx) => {
      // Handle headings
      if (para.startsWith('# ')) {
        return <h1 key={idx} className="text-3xl font-bold text-blue-400 mt-8 mb-4">{para.replace('# ', '')}</h1>;
      }
      if (para.startsWith('## ')) {
        return <h2 key={idx} className="text-2xl font-bold text-white mt-6 mb-3">{para.replace('## ', '')}</h2>;
      }
      if (para.startsWith('### ')) {
        return <h3 key={idx} className="text-xl font-bold text-yellow-400 mt-4 mb-2">{para.replace('### ', '')}</h3>;
      }
      
      // Handle lists
      if (para.includes('\n- ') || para.includes('\n1. ')) {
        const items = para.split('\n').filter(line => line.trim());
        const listItems = items.map((item, i) => {
          const text = item.replace(/^[-\d.]\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400">$1</strong>');
          return (
            <li key={i} className="text-slate-300 ml-6 mb-1" dangerouslySetInnerHTML={{ __html: text }} />
          );
        });
        return <ul key={idx} className="my-4">{listItems}</ul>;
      }
      
      // Regular paragraph with bold text
      const formattedPara = para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400 font-semibold">$1</strong>');
      return <p key={idx} className="text-slate-300 my-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedPara }} />;
    });
  };

  return (
    <div className="relative" onMouseUp={handleTextSelect}>
      {/* Content */}
      <div className="prose prose-invert max-w-none">
        {renderContent()}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="fixed z-50 bg-slate-800 border border-blue-500 rounded-lg shadow-xl p-3"
          style={{ left: tooltipPosition.x, top: tooltipPosition.y, transform: 'translateX(-50%)' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-slate-400">Selected: </span>
            <span className="text-sm font-medium text-white">"{selectedText}"</span>
          </div>
          <button
            onClick={handleExplain}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
          >
            🔊 Explain in {languageNames[user.preferredLanguage]}
          </button>
          <button
            onClick={handleCloseTooltip}
            className="w-full mt-1 text-slate-400 hover:text-white text-xs"
          >
            Close
          </button>
        </div>
      )}

      {/* Translation Display */}
      {translatedText && !showTooltip && (
        <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-lg ${isSpeaking ? 'animate-pulse' : ''}`}>🔊</span>
            <span className="text-sm text-slate-400">{languageNames[user.preferredLanguage]} Explanation:</span>
            {isSpeaking && <span className="text-xs text-blue-400 animate-pulse">Speaking...</span>}
          </div>
          <p className="text-white">{translatedText}</p>
        </div>
      )}

      {/* Language Selector Hint */}
      <div className="mt-6 p-3 bg-slate-700/30 rounded-lg">
        <p className="text-sm text-slate-400">
          💡 <strong>Tip:</strong> Select any text above and click "Explain" to hear it in {languageNames[user.preferredLanguage]}. 
          Change your preferred language in your Profile settings.
        </p>
      </div>
    </div>
  );
};

export default HighlightToVoice;
