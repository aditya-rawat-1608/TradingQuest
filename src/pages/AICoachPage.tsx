import React, { useState } from "react";
import { useStore } from "../store/useStore";

const AICoachPage: React.FC = () => {
  const { user, aiMessages, addAIMessage, trades } = useStore();

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    addAIMessage({ role: "user", content: userMessage });
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      addAIMessage({
        role: "ai",
        content: data.reply,
      });
    } catch (error) {
      console.error(error);
      addAIMessage({
        role: "ai",
        content: "Error connecting to AI 😢",
      });
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const losingTrades = trades.filter(
    (t) => t.status === "closed" && (t.pnl || 0) < 0 && t.aiFeedback
  );

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">🤖 AI Coach</h1>
        <p className="text-slate-400">
          Your personal trading mentor and critic
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-700">
            <h2 className="font-bold">TradeQuest AI Coach</h2>
            <p className="text-xs text-slate-400">Online</p>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {aiMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-white"
                  }`}
                >
                  {msg.role === "ai" && "🤖 "}
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="text-slate-400">AI is typing...</div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 bg-slate-700 px-4 py-2 rounded-lg outline-none"
            />

            <button
              onClick={handleSendMessage}
              className="bg-blue-600 px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-slate-800 p-4 rounded-xl">
            <h3 className="font-bold mb-2">Stats</h3>
            <p>Total Trades: {trades.length}</p>
            <p>Panic Sells: {user.panicSells}</p>
          </div>

          <div className="bg-slate-800 p-4 rounded-xl">
            <h3 className="font-bold mb-2">Losing Trades</h3>
            {losingTrades.length === 0 ? (
              <p>No losses yet 👍</p>
            ) : (
              losingTrades.slice(0, 3).map((t) => (
                <p key={t._id}>
                  {t.asset}: {t.pnlPercent?.toFixed(2)}%
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICoachPage;