import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const TradePage: React.FC = () => {
  const { user, assets, trades, openTrade, closeTrade, useEnergy, addXP } = useStore();
  const [selectedAsset, setSelectedAsset] = useState<typeof assets[0] | null>(null);
  const [tradeType, setTradeType] = useState<'long' | 'short'>('long');
  const [quantity, setQuantity] = useState(1);
  const [leverage, setLeverage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [chartData, setChartData] = useState<{ time: string; value: number }[]>([]);

  // Filter assets based on user level
  assets.filter(a => user.level >= a.minLevel);

  // Get asset category for display
  const getAssetCategory = (asset: typeof assets[0]) => {
    if (asset.type === 'crypto') return { label: 'Crypto', color: 'bg-orange-900/50 text-orange-400' };
    if (asset.type === 'forex') return { label: 'Forex', color: 'bg-blue-900/50 text-blue-400' };
    if (asset.type === 'etf') return { label: 'ETF', color: 'bg-purple-900/50 text-purple-400' };
    return { label: 'Stock', color: 'bg-green-900/50 text-green-400' };
  };

  // Generate mock chart data for selected asset
  useEffect(() => {
    if (!selectedAsset) return;
    
    const generateData = () => {
      const data: { time: string; value: number }[] = [];
      let value = selectedAsset.currentPrice || 100;
      for (let i = 24; i >= 0; i--) {
        const date = new Date();
        date.setHours(date.getHours() - i);
        value = value * (1 + (Math.random() - 0.5) * 0.04);
        data.push({
          time: date.toLocaleTimeString('en-US', { hour: '2-digit' }),
          value: Math.round(value * 100) / 100,
        });
      }
      setChartData(data);
    };
    
    generateData();
    const interval = setInterval(generateData, 3000);
    return () => clearInterval(interval);
  }, [selectedAsset]);

  const handleOpenTrade = () => {
    if (!selectedAsset) return;
    const minEnergy = selectedAsset.minEnergy || 10;
    if (!useEnergy(minEnergy)) {
      alert(`Not enough energy! Need ${minEnergy} energy to trade ${selectedAsset.symbol}.`);
      return;
    }

    const entryPrice = selectedAsset.currentPrice || 0;
    openTrade({
      userId: user._id,
      asset: selectedAsset.symbol,
      assetType: selectedAsset.type,
      type: tradeType,
      status: 'open',
      entryPrice,
      quantity,
      leverage,
      openedAt: new Date(),
    });

    setShowConfirm(false);
    setQuantity(1);
    setLeverage(1);
  };

  const handleCloseTrade = (tradeId: string) => {
    const trade = trades.find(t => t._id === tradeId);
    if (!trade) return;
    
    // Simulate exit price (random within ±3%)
    const exitPrice = trade.entryPrice * (1 + (Math.random() - 0.5) * 0.06);
    closeTrade(tradeId, exitPrice);
    
    // Award XP for completing a trade
    addXP(25);
  };

  const getVolatilityLabel = (volatility: string) => {
    switch (volatility) {
      case 'low': return { label: 'Low Volatility', color: 'text-green-400' };
      case 'medium': return { label: 'Medium Volatility', color: 'text-yellow-400' };
      case 'high': return { label: 'High Volatility', color: 'text-red-400' };
      default: return { label: 'Unknown', color: 'text-gray-400' };
    }
  };

  const openTrades = trades.filter(t => t.status === 'open');
  const closedTrades = trades.filter(t => t.status === 'closed');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">💹 Trading Arena</h1>
        <p className="text-slate-400">Execute trades and build your portfolio</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Asset List */}
        <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h2 className="text-xl font-bold mb-4">Available Assets</h2>
          <p className="text-xs text-slate-400 mb-4">Assets unlock as you level up</p>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {assets.map(asset => {
              const isLocked = user.level < asset.minLevel;
              const category = getAssetCategory(asset);
              const volatility = getVolatilityLabel(asset.volatility);
              
              return (
                <button
                  key={asset.symbol}
                  onClick={() => !isLocked && setSelectedAsset(asset)}
                  disabled={isLocked}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedAsset?.symbol === asset.symbol 
                      ? 'bg-blue-600 border border-blue-400' 
                      : isLocked 
                        ? 'bg-slate-700/50 opacity-50 cursor-not-allowed'
                        : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold">{asset.symbol}</span>
                      <span className="text-xs text-slate-400 ml-2">{asset.name}</span>
                    </div>
                    {isLocked ? (
                      <span className="text-xs bg-slate-600 px-2 py-0.5 rounded">Lv.{asset.minLevel}</span>
                    ) : (
                      <span className={`text-xs ${asset.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h}%
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${category.color}`}>{category.label}</span>
                    <span className={`text-xs ${volatility.color}`}>{volatility.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chart & Trade Panel */}
        <div className="lg:col-span-2 space-y-6">
          {selectedAsset ? (
            <>
              {/* Asset Info & Chart */}
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedAsset.symbol}</h2>
                    <p className="text-slate-400">{selectedAsset.name} • {selectedAsset.sector}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${(selectedAsset.currentPrice || 0).toLocaleString()}</div>
                    <div className={`text-sm ${(selectedAsset.change24h || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {(selectedAsset.change24h || 0) >= 0 ? '+' : ''}{selectedAsset.change24h || 0}% (24h)
                    </div>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="h-32 flex items-end gap-0.5">
                  {chartData.map((point, idx) => {
                    const maxVal = Math.max(...chartData.map(d => d.value));
                    const minVal = Math.min(...chartData.map(d => d.value));
                    const height = ((point.value - minVal) / (maxVal - minVal)) * 100;
                    const isPositive = idx > 0 ? point.value >= chartData[idx - 1].value : true;
                    
                    return (
                      <div
                        key={idx}
                        className={`flex-1 rounded-t ${isPositive ? 'bg-green-500' : 'bg-red-500'}`}
                        style={{ height: `${Math.max(height, 10)}%` }}
                      />
                    );
                  })}
                </div>

                {/* Trade Form */}
                <div className="mt-4 p-4 bg-slate-700/50 rounded-lg">
                  <h3 className="font-bold mb-3">Open Position</h3>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="text-sm text-slate-400">Trade Type</label>
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => setTradeType('long')}
                          className={`flex-1 py-2 rounded-lg font-bold ${tradeType === 'long' ? 'bg-green-600' : 'bg-slate-600'}`}
                        >
                          Long 📈
                        </button>
                        <button
                          onClick={() => setTradeType('short')}
                          className={`flex-1 py-2 rounded-lg font-bold ${tradeType === 'short' ? 'bg-red-600' : 'bg-slate-600'}`}
                        >
                          Short 📉
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-slate-400">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="w-full mt-1 px-3 py-2 bg-slate-600 rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm text-slate-400">Leverage</label>
                      <select
                        value={leverage}
                        onChange={(e) => setLeverage(parseInt(e.target.value))}
                        className="w-full mt-1 px-3 py-2 bg-slate-600 rounded-lg"
                        disabled={user.level < 35}
                      >
                        <option value="1">1x</option>
                        <option value="2">2x</option>
                        <option value="5">5x</option>
                        {user.level >= 35 && <option value="10">10x</option>}
                        {user.level >= 35 && <option value="50">50x</option>}
                      </select>
                      {user.level < 35 && (
                        <p className="text-xs text-slate-500 mt-1">Unlocks at Level 35</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-800 rounded-lg mb-4">
                    <span>Total Value:</span>
                    <span className="font-bold text-xl">${((selectedAsset.currentPrice || 0) * quantity * leverage).toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => setShowConfirm(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold"
                  >
                    Open {tradeType.toUpperCase()} Position
                  </button>
                </div>
              </div>

              {/* Open Trades */}
              {openTrades.length > 0 && (
                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <h3 className="font-bold mb-3">Open Positions</h3>
                  <div className="space-y-2">
                    {openTrades.map(trade => (
                      <div key={trade._id} className="p-3 bg-slate-700/50 rounded-lg flex justify-between items-center">
                        <div>
                          <span className="font-bold">{trade.asset}</span>
                          <span className={`ml-2 text-xs px-2 py-0.5 rounded ${trade.type === 'long' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                            {trade.type.toUpperCase()} {trade.leverage}x
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm text-slate-400">Entry: ${trade.entryPrice.toFixed(2)}</div>
                            <div className="text-xs text-slate-500">Qty: {trade.quantity}</div>
                          </div>
                          <button
                            onClick={() => handleCloseTrade(trade._id)}
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-bold"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-xl font-bold mb-2">Select an Asset</h2>
              <p className="text-slate-400">Choose an asset from the list to start trading</p>
            </div>
          )}

          {/* Trade History */}
          {closedTrades.length > 0 && (
            <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <h3 className="font-bold mb-3">Trade History</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {closedTrades.map(trade => (
                  <div key={trade._id} className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold">{trade.asset}</span>
                        <span className={`ml-2 text-xs ${trade.type === 'long' ? 'text-green-400' : 'text-red-400'}`}>
                          {trade.type.toUpperCase()}
                        </span>
                      </div>
                      <div className={`font-bold ${(trade.pnl || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {trade.pnl ? `${trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)} (${trade.pnlPercent?.toFixed(2)}%)` : ''}
                      </div>
                    </div>
                    {trade.aiFeedback && (
                      <div className="mt-2 p-2 bg-slate-800/50 rounded text-sm text-slate-400 italic">
                        🤖 {trade.aiFeedback}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && selectedAsset && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-xl max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Confirm Trade</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Asset:</span>
                <span className="font-bold">{selectedAsset.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Type:</span>
                <span className={`font-bold ${tradeType === 'long' ? 'text-green-400' : 'text-red-400'}`}>
                  {tradeType.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Entry Price:</span>
                <span className="font-bold">${(selectedAsset.currentPrice || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Quantity:</span>
                <span className="font-bold">{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Leverage:</span>
                <span className="font-bold">{leverage}x</span>
              </div>
              <div className="flex justify-between border-t border-slate-700 pt-3">
                <span className="text-slate-400">Total Value:</span>
                <span className="font-bold text-xl">${((selectedAsset.currentPrice || 0) * quantity * leverage).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>Energy Cost:</span>
                <span>-{selectedAsset.minEnergy || 10} ⚡</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-slate-600 hover:bg-slate-500 py-3 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleOpenTrade}
                className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold"
              >
                Confirm Trade
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradePage;
