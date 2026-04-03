import React from 'react';
import { useStore } from '../store/useStore';

const EnergyBar: React.FC = () => {
  const { user } = useStore();
  const percentage = (user.energy / user.maxEnergy) * 100;
  
  const getEnergyColor = () => {
    if (percentage > 60) return 'bg-green-500';
    if (percentage > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center gap-2 bg-slate-700 px-3 py-1.5 rounded-lg">
      <span className="text-green-400">⚡</span>
      <div className="w-24 h-3 bg-slate-600 rounded-full overflow-hidden">
        <div
          className={`h-full ${getEnergyColor()} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium">
        {user.energy}/{user.maxEnergy}
      </span>
    </div>
  );
};

export default EnergyBar;
