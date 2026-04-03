import React, { useState } from 'react';
import { useStore } from '../store/useStore';

const AICoachPage: React.FC = () => {
  const { user, aiMessages, addAIMessage, trades } = useStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMessage = input.trim();
    setInput('');
    addAIMessage({ role: 'user', content: userMessage });
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Great question! Let me break that down for you. Based on your trading history, I think you should focus on risk management.",
        "I've analyzed your recent trades. You're showing good patience scores! Keep it up! 📈",
        "Remember, the key to successful trading is discipline. Your psychology score could use some work.",
        "Based on your weakness tags, I'd recommend reviewing our articles on support and resistance levels.",
        "Looking at your portfolio, you have a good mix of positions. But remember - don't put all your eggs in one basket!",
        "Trading is 90% psychology and 10% strategy. Your panic sell count is a bit high - try to stick to your trading plan!",
        "Nice win on your recent trade! You're improving. The AI is proud of you. 🤖",
        "FOMO (Fear Of Missing Out) is the trader's worst enemy. Always stick to your analysis, not the crowd.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addAIMessage({ role: 'ai', content: randomResponse });
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Get trade roasts
  const losingTrades = trades.filter(t => t.status === 'closed' && (t.pnl || 0) < 0 && t.aiFeedback);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">🤖 AI Coach</h1>
        <p className="text-slate-400">Your personal trading mentor and critic</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-700 bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h2 className="font-bold">TradeQuest AI Coach</h2>
                <p className="text-xs text-slate-400">Always here to help • Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {aiMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-xl ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-100'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {msg.role === 'ai' && <span className="text-lg">🤖</span>}
                    <p>{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-700 p-4 rounded-xl">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about trading..."
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 px-6 py-2 rounded-lg font-bold"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="font-bold mb-3">⚡ Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => setInput("Give me trading tips")}
                className="w-full text-left bg-slate-700 hover:bg-slate-600 p-3 rounded-lg text-sm"
              >
                💡 Get Trading Tips
              </button>
              <button
                onClick={() => setInput("Analyze my portfolio")}
                className="w-full text-left bg-slate-700 hover:bg-slate-600 p-3 rounded-lg text-sm"
              >
                📊 Analyze My Portfolio
              </button>
              <button
                onClick={() => setInput("What should I learn next?")}
                className="w-full text-left bg-slate-700 hover:bg-slate-600 p-3 rounded-lg text-sm"
              >
                📚 Learning Recommendations
              </button>
              <button
                onClick={() => setInput("How is my psychology?")}
                className="w-full text-left bg-slate-700 hover:bg-slate-600 p-3 rounded-lg text-sm"
              >
                🧠 Psychology Assessment
              </button>
            </div>
          </div>

          {/* Trade Roasts */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="font-bold mb-3">🔥 Trade Roasts</h3>
            {losingTrades.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {losingTrades.slice(0, 5).map(trade => (
                  <div key={trade._id} className="p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{trade.asset}</span>
                      <span className="text-red-400 text-sm">
                        {trade.pnlPercent?.toFixed(2)}%
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 italic">{trade.aiFeedback}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 text-sm">No trade roasts yet. Keep trading! 🔥</p>
            )}
          </div>

          {/* Stats */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <h3 className="font-bold mb-3">📈 Your Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Trades:</span>
                <span>{trades.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Win Rate:</span>
                <span>
                  {trades.filter(t => t.status === 'closed').length > 0
                    ? Math.round(
                        (trades.filter(t => t.status === 'closed' && (t.pnl || 0) > 0).length /
                          trades.filter(t => t.status === 'closed').length) *
                          100
                      )
                    : 0}
                  %
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Panic Sells:</span>
                <span className="text-red-400">{user.panicSells}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Over-Trades:</span>
                <span className="text-orange-400">{user.overTrades}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoachPage;
