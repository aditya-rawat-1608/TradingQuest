import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useStore } from '../store/useStore';
import EnergyBar from '../components/EnergyBar';

const Layout: React.FC = () => {
  const location = useLocation();
  const { user, checkAndRegenerateEnergy } = useStore();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      checkAndRegenerateEnergy();
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [checkAndRegenerateEnergy]);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/learn', label: 'Learn', icon: '📚' },
    { path: '/trade', label: 'Trade', icon: '💹' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/ai-coach', label: 'AI Coach', icon: '🤖' },
  ];

  const getLevelTitle = (level: number) => {
    if (level >= 35) return 'The Whale';
    if (level >= 20) return 'The Speculator';
    if (level >= 10) return 'The Analyst';
    return 'The Novice';
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Top Status Bar */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              TradeQuest
            </h1>
            <span className="text-xs bg-slate-700 px-2 py-1 rounded-full">
              {getLevelTitle(user.level)} Lv.{user.level}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Energy Bar */}
            <EnergyBar />

            {/* E-Coins */}
            <div className="flex items-center gap-2 bg-slate-700 px-3 py-1.5 rounded-lg">
              <span className="text-yellow-400">🪙</span>
              <span className="font-bold text-yellow-400">{user.eCoins.toLocaleString()}</span>
            </div>

            {/* XP */}
            <div className="flex items-center gap-2 bg-slate-700 px-3 py-1.5 rounded-lg">
              <span className="text-blue-400">⭐</span>
              <span className="font-bold text-blue-400">{user.xp.toLocaleString()} XP</span>
            </div>

            {/* Daily Spin */}
            <Link
              to="/daily"
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1.5 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              🎰 Daily Spin
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-slate-800 border-b border-slate-700 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden mb-2 px-3 py-2 bg-slate-700 rounded-lg"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? '✕ Close' : '☰ Menu'}
          </button>

          {/* Nav Items */}
          <div className={`md:flex gap-1 ${showMobileMenu ? 'block' : 'hidden'}`}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
