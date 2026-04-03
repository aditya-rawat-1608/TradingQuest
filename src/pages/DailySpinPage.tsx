import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const DailySpinPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, addECoins, addXP, setUser } = useStore();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<{ coins: number; xp: number; message: string } | null>(null);
  const [hasSpunToday, setHasSpunToday] = useState(false);

  const prizes = [
    { coins: 50, xp: 25, message: 'Small boost! Every bit counts 📊' },
    { coins: 100, xp: 50, message: 'Nice! Keep that streak going! 🎯' },
    { coins: 200, xp: 100, message: 'Solid reward! You\'re on fire! 🔥' },
    { coins: 500, xp: 250, message: 'Jackpot! The market gods smile upon you! 🤑' },
    { coins: 1000, xp: 500, message: 'MEGA WIN! You\'re a trading legend! 🏆' },
  ];

  const spinWheel = () => {
    if (spinning || hasSpunToday) return;
    
    setSpinning(true);
    
    // Simulate spinning animation
    let spins = 0;
    const spinInterval = setInterval(() => {
      spins++;
      if (spins > 20) {
        clearInterval(spinInterval);
        
        // Determine prize based on probability
        const rand = Math.random();
        let prize;
        if (rand < 0.3) prize = prizes[0];       // 30% chance
        else if (rand < 0.55) prize = prizes[1];  // 25% chance
        else if (rand < 0.8) prize = prizes[2];   // 25% chance
        else if (rand < 0.95) prize = prizes[3];  // 15% chance
        else prize = prizes[4];                    // 5% chance
        
        setResult(prize);
        addECoins(prize.coins);
        addXP(prize.xp);
        setSpinning(false);
        setHasSpunToday(true);
        
        // Update streak
        setUser({ streak: user.streak + 1 });
      }
    }, 100);
  };

  const getStreakBonus = () => {
    if (user.streak >= 5) return { multiplier: 2, text: '2x Streak Bonus!' };
    if (user.streak >= 3) return { multiplier: 1.5, text: '1.5x Streak Bonus!' };
    return { multiplier: 1, text: '' };
  };

  const streakBonus = getStreakBonus();

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-slate-400 hover:text-white"
      >
        ← Back to Dashboard
      </button>

      <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
        <h1 className="text-4xl font-bold mb-2">🎰 Daily Spin</h1>
        <p className="text-slate-400 mb-6">Spin the wheel to earn bonus E-Coins!</p>

        {/* Streak Info */}
        <div className="bg-slate-700/50 rounded-lg p-4 mb-8">
          <div className="flex justify-center items-center gap-4">
            <span className="text-4xl">🔥</span>
            <div className="text-left">
              <div className="text-2xl font-bold">{user.streak} Day Streak</div>
              <div className="text-yellow-400">{streakBonus.text}</div>
            </div>
          </div>
        </div>

        {/* Wheel */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div 
            className={`w-full h-full rounded-full border-8 border-yellow-500 flex items-center justify-center text-8xl
              ${spinning ? 'animate-spin' : ''}`}
            style={{
              background: 'conic-gradient(from 0deg, #f59e0b, #ef4444, #a855f7, #3b82f6, #22c55e, #f59e0b)',
              animation: spinning ? 'spin 2s ease-out' : 'none'
            }}
          >
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center">
              🎲
            </div>
          </div>
          
          {/* Pointer */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-4xl">
            👆
          </div>
        </div>

        {/* Spin Button */}
        {!hasSpunToday ? (
          <button
            onClick={spinWheel}
            disabled={spinning}
            className={`bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 
              text-black font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {spinning ? 'Spinning...' : 'SPIN NOW!'}
          </button>
        ) : (
          <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
            <p className="text-green-400 font-bold">✅ You've already spun today!</p>
            <p className="text-sm text-slate-400">Come back tomorrow for another spin</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-xl border border-yellow-500/30">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="text-slate-300 mb-4">{result.message}</p>
            
            <div className="flex justify-center gap-8">
              <div>
                <div className="text-3xl font-bold text-yellow-400">+{result.coins * streakBonus.multiplier}</div>
                <div className="text-sm text-slate-400">E-Coins</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">+{result.xp * streakBonus.multiplier}</div>
                <div className="text-sm text-slate-400">XP</div>
              </div>
            </div>
          </div>
        )}

        {/* Prizes List */}
        <div className="mt-8 text-left">
          <h3 className="font-bold mb-3">Possible Prizes:</h3>
          <div className="space-y-2">
            {prizes.map((prize, idx) => (
              <div key={idx} className="flex justify-between items-center bg-slate-700/30 p-3 rounded-lg">
                <span>{prize.message}</span>
                <span className="text-yellow-400 font-bold">🪙 {prize.coins} + ⭐ {prize.xp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySpinPage;
