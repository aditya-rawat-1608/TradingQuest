import React from 'react';
import { useStore } from '../store/useStore';

const ProfilePage: React.FC = () => {
  const { user, setUser } = useStore();

  const getLevelTitle = (level: number) => {
    if (level >= 35) return { title: 'The Whale', color: 'from-purple-500 to-pink-500', icon: '🐋', desc: 'Master of the markets with access to all trading tools' };
    if (level >= 20) return { title: 'The Speculator', color: 'from-red-500 to-orange-500', icon: '🎲', desc: 'Can trade high-volatility assets like crypto and forex' };
    if (level >= 10) return { title: 'The Analyst', color: 'from-blue-500 to-cyan-500', icon: '📊', desc: 'Unlocked technical analysis tools and indicators' };
    return { title: 'The Novice', color: 'from-green-500 to-emerald-500', icon: '🌱', desc: 'Learning the basics with blue chip stocks and ETFs' };
  };

  const levelInfo = getLevelTitle(user.level);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  ];

  const levelRequirements = [
    { level: 1, title: 'The Novice', unlocked: true, features: ['Blue Chip Stocks', 'ETFs', 'Basic Articles'] },
    { level: 5, title: 'Apprentice', unlocked: user.level >= 5, features: ['Growth Stocks', 'More Quiz Categories'] },
    { level: 10, title: 'The Analyst', unlocked: user.level >= 10, features: ['Technical Indicators', 'RSI/MACD Charts', 'Advanced Articles'] },
    { level: 15, title: 'Trader', unlocked: user.level >= 15, features: ['Forex Trading'] },
    { level: 20, title: 'The Speculator', unlocked: user.level >= 20, features: ['Cryptocurrency', 'High Volatility Assets'] },
    { level: 35, title: 'The Whale', unlocked: user.level >= 35, features: ['Margin Trading', '50x Leverage', 'Derivatives'] },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">👤 Your Profile</h1>

      {/* Profile Header */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${levelInfo.color} flex items-center justify-center text-5xl mb-3`}>
              {levelInfo.icon}
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className={`text-lg bg-gradient-to-r ${levelInfo.color} bg-clip-text text-transparent`}>
                {levelInfo.title}
              </p>
              <p className="text-sm text-slate-400">Level {user.level}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-1 grid md:grid-cols-2 gap-4">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-sm text-slate-400">Total XP</div>
              <div className="text-2xl font-bold text-blue-400">{user.xp.toLocaleString()}</div>
              <div className="text-xs text-slate-500">{user.xpToNextLevel - user.xp} XP to next level</div>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-sm text-slate-400">E-Coins Balance</div>
              <div className="text-2xl font-bold text-yellow-400">{user.eCoins.toLocaleString()}</div>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-sm text-slate-400">Trader Reputation</div>
              <div className="text-2xl font-bold text-purple-400">{user.reputation}/100</div>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-sm text-slate-400">Current Streak</div>
              <div className="text-2xl font-bold text-orange-400">🔥 {user.streak} days</div>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress to Level {user.level + 1}</span>
            <span>{Math.round((user.xp / user.xpToNextLevel) * 100)}%</span>
          </div>
          <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${levelInfo.color}`}
              style={{ width: `${(user.xp / user.xpToNextLevel) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Language Settings */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold mb-4">🌐 Language Preference</h2>
          <p className="text-sm text-slate-400 mb-4">Select your preferred language for AI explanations</p>
          
          <div className="grid grid-cols-2 gap-2">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setUser({ preferredLanguage: lang.code as any })}
                className={`p-3 rounded-lg flex items-center gap-2 transition-all ${
                  user.preferredLanguage === lang.code
                    ? 'bg-blue-600 border-2 border-blue-400'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Weakness Tags */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-xl font-bold mb-4">🎯 Weakness Tags</h2>
          <p className="text-sm text-slate-400 mb-4">Topics you need to improve on</p>
          
          {user.weaknessTags.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.weaknessTags.map((tag) => (
                <span key={tag} className="bg-red-900/30 text-red-400 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-green-400">🎉 No weaknesses detected! Keep up the good work!</p>
          )}
          
          <p className="text-xs text-slate-500 mt-4">
            Complete quizzes on weak areas to remove tags and improve your skills.
          </p>
        </div>
      </div>

      {/* Domain Skills */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold mb-4">📊 Domain Skills Breakdown</h2>
        
        <div className="grid md:grid-cols-4 gap-4">
          {Object.entries(user.domainSkills).map(([skill, value]) => (
            <div key={skill} className="bg-slate-700/50 p-4 rounded-lg text-center">
              <div className="text-4xl mb-2">
                {skill === 'technical' ? '📈' : skill === 'fundamental' ? '📊' : skill === 'risk' ? '🛡️' : '🧠'}
              </div>
              <div className="capitalize font-bold mb-2">{skill}</div>
              <div className="text-2xl font-bold text-blue-400">{value}%</div>
              <div className="h-2 bg-slate-600 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-blue-500"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Level Progression */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-bold mb-4">🏆 Level Progression</h2>
        
        <div className="space-y-3">
          {levelRequirements.map((req) => (
            <div 
              key={req.level}
              className={`p-4 rounded-lg flex items-center gap-4 ${
                req.unlocked ? 'bg-green-900/20 border border-green-500/30' : 'bg-slate-700/30 opacity-60'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                req.unlocked ? 'bg-green-600' : 'bg-slate-600'
              }`}>
                {req.level}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{req.title}</span>
                  {req.unlocked && <span className="text-green-400 text-sm">✓ Unlocked</span>}
                </div>
                <div className="text-sm text-slate-400">
                  {req.features.join(' • ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
