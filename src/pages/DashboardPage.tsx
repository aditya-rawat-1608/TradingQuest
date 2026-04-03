import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/useStore';

const DashboardPage: React.FC = () => {
  const { user, trades, marketEvent, psychology } = useStore();
  const [chartData, setChartData] = useState<{ time: string; value: number }[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  // Generate mock chart data
  useEffect(() => {
    const generateChartData = () => {
      const data: { time: string; value: number }[] = [];
      let value = 10000;
      for (let i = 24; i >= 0; i--) {
        const date = new Date();
        date.setHours(date.getHours() - i);
        value = value * (1 + (Math.random() - 0.5) * 0.02);
        data.push({
          time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          value: Math.round(value * 100) / 100,
        });
      }
      setChartData(data);
    };
    generateChartData();
    const interval = setInterval(generateChartData, 5000);
    return () => clearInterval(interval);
  }, []);

  const getLevelTitle = (level: number) => {
    if (level >= 35) return { title: 'The Whale', color: 'from-purple-500 to-pink-500', icon: '🐋' };
    if (level >= 20) return { title: 'The Speculator', color: 'from-red-500 to-orange-500', icon: '🎲' };
    if (level >= 10) return { title: 'The Analyst', color: 'from-blue-500 to-cyan-500', icon: '📊' };
    return { title: 'The Novice', color: 'from-green-500 to-emerald-500', icon: '🌱' };
  };

  const levelInfo = getLevelTitle(user.level);
  const totalPnL = trades.reduce((sum, t) => sum + (t.pnl || 0), 0);
  const openTrades = trades.filter(t => t.status === 'open');
  const closedTrades = trades.filter(t => t.status === 'closed');

  // Calculate domain skills for radar chart
  const skills = [
    { name: 'Technical', value: user.domainSkills.technical },
    { name: 'Fundamental', value: user.domainSkills.fundamental },
    { name: 'Risk', value: user.domainSkills.risk },
    { name: 'Psychology', value: user.domainSkills.psychology },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.username}! 👋</h1>
          <p className="text-slate-400">Here's your trading overview</p>
        </div>
        
        {/* Market Event Banner */}
        {marketEvent?.active && (
          <div className={`px-4 py-2 rounded-lg bg-gradient-to-r ${marketEvent.type === 'bull' ? 'from-green-600 to-emerald-600' : marketEvent.type === 'bear' ? 'from-red-600 to-orange-600' : 'from-purple-600 to-pink-600'}`}>
            <span className="font-bold">{marketEvent.name}</span>
            <span className="text-sm ml-2 opacity-90">{marketEvent.description}</span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total P&L */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-sm text-slate-400 mb-1">Total P&L</div>
          <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {totalPnL >= 0 ? '+' : ''}{totalPnL.toLocaleString()} E-Coins
          </div>
        </div>

        {/* Open Trades */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-sm text-slate-400 mb-1">Open Trades</div>
          <div className="text-2xl font-bold text-blue-400">{openTrades.length}</div>
        </div>

        {/* Win Rate */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-sm text-slate-400 mb-1">Win Rate</div>
          <div className="text-2xl font-bold text-purple-400">
            {closedTrades.length > 0 
              ? Math.round((closedTrades.filter(t => (t.pnl || 0) > 0).length / closedTrades.length) * 100)
              : 0}%
          </div>
        </div>

        {/* Reputation */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="text-sm text-slate-400 mb-1">Trader Reputation</div>
          <div className="text-2xl font-bold text-yellow-400">{user.reputation}/100</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Live Chart */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">📈 Portfolio Performance</h2>
            <select className="bg-slate-700 text-sm px-3 py-1 rounded">
              <option>24H</option>
              <option>7D</option>
              <option>30D</option>
            </select>
          </div>
          
          {/* Simple Chart Visualization */}
          <div className="h-64 flex items-end gap-1" ref={chartRef}>
            {chartData.map((point, idx) => {
              const maxVal = Math.max(...chartData.map(d => d.value));
              const minVal = Math.min(...chartData.map(d => d.value));
              const height = ((point.value - minVal) / (maxVal - minVal)) * 100;
              const isPositive = idx > 0 ? point.value >= chartData[idx - 1].value : true;
              
              return (
                <div
                  key={idx}
                  className={`flex-1 rounded-t transition-all hover:opacity-80 ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ height: `${Math.max(height, 5)}%` }}
                  title={`${point.time}: ${point.value}`}
                />
              );
            })}
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>{chartData[0]?.time}</span>
            <span>{chartData[chartData.length - 1]?.time}</span>
          </div>
        </div>

        {/* Domain Skills Radar */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h2 className="text-xl font-bold mb-4">🎯 Domain Skills</h2>
          
          {/* Radar Chart Visualization */}
          <div className="relative h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Background circles */}
              {[25, 50, 75, 100].map(r => (
                <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#334155" strokeWidth="0.5" />
              ))}
              
              {/* Axis lines */}
              {[0, 90, 180, 270].map((angle, idx) => {
                const rad = (angle - 90) * Math.PI / 180;
                return (
                  <line
                    key={idx}
                    x1="50" y1="50"
                    x2={50 + 45 * Math.cos(rad)}
                    y2={50 + 45 * Math.sin(rad)}
                    stroke="#334155"
                    strokeWidth="0.5"
                  />
                );
              })}
              
              {/* Skills polygon */}
              <polygon
                points={skills.map((skill, idx) => {
                  const angle = (idx * 90 - 90) * Math.PI / 180;
                  const r = (skill.value / 100) * 45;
                  return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
                }).join(' ')}
                fill="rgba(59, 130, 246, 0.3)"
                stroke="#3b82f6"
                strokeWidth="1"
              />
              
              {/* Skill points */}
              {skills.map((skill, idx) => {
                const angle = (idx * 90 - 90) * Math.PI / 180;
                const r = (skill.value / 100) * 45;
                const x = 50 + r * Math.cos(angle);
                const y = 50 + r * Math.sin(angle);
                return (
                  <circle key={idx} cx={x} cy={y} r="2" fill="#3b82f6" />
                );
              })}
            </svg>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {skills.map(skill => (
              <div key={skill.name} className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{skill.name}</span>
                <span className="font-bold text-blue-400">{skill.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Psychology Meter */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h2 className="text-xl font-bold mb-4">🧠 Psychology Meter</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Stress Level</span>
                <span className={psychology.stressLevel > 70 ? 'text-red-400' : psychology.stressLevel > 40 ? 'text-yellow-400' : 'text-green-400'}>
                  {psychology.stressLevel}%
                </span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${psychology.stressLevel > 70 ? 'bg-red-500' : psychology.stressLevel > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${psychology.stressLevel}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Decision Quality</span>
                <span className="text-blue-400">{psychology.decisionQuality}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${psychology.decisionQuality}%` }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Patience Score</span>
                <span className="text-purple-400">{psychology.patienceScore}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: `${psychology.patienceScore}%` }} />
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Panic Sells:</span>
              <span className="text-red-400 font-bold">{user.panicSells}</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>Over-Trades:</span>
              <span className="text-orange-400 font-bold">{user.overTrades}</span>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h2 className="text-xl font-bold mb-4">⭐ Level Progress</h2>
          
          <div className="text-center mb-4">
            <div className={`text-5xl mb-2 ${levelInfo.color} bg-clip-text text-transparent`}>
              {levelInfo.icon}
            </div>
            <div className="text-2xl font-bold">{levelInfo.title}</div>
            <div className="text-slate-400">Level {user.level}</div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>XP Progress</span>
              <span>{user.xp} / {user.xpToNextLevel} XP</span>
            </div>
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{ width: `${(user.xp / user.xpToNextLevel) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
            <h3 className="font-bold mb-2">Next Unlocks:</h3>
            {user.level < 10 && (
              <p className="text-sm text-slate-400">📈 Technical Tools (Level 10)</p>
            )}
            {user.level >= 10 && user.level < 20 && (
              <p className="text-sm text-slate-400">₿ Crypto & Forex (Level 20)</p>
            )}
            {user.level >= 20 && user.level < 35 && (
              <p className="text-sm text-slate-400">⚡ Margin & Leverage (Level 35)</p>
            )}
            {user.level >= 35 && (
              <p className="text-sm text-green-400">🎉 All features unlocked!</p>
            )}
          </div>
        </div>

        {/* Recent Trades */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h2 className="text-xl font-bold mb-4">📋 Recent Trades</h2>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {trades.slice(0, 5).map(trade => (
              <div key={trade._id} className="p-3 bg-slate-700/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold">{trade.asset}</span>
                    <span className={`text-xs ml-2 px-2 py-0.5 rounded ${trade.type === 'long' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                      {trade.type.toUpperCase()}
                    </span>
                  </div>
                  <span className={`font-bold ${(trade.pnl || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.pnl ? `${trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}` : 'Open'}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {new Date(trade.openedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
