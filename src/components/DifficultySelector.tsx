import React from 'react';
import type { Difficulty } from '@/types/game';
import { useGameStore } from '@/store/gameStore';
import { Zap, Target, Trophy } from 'lucide-react';

const difficulties: { value: Difficulty; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'easy', label: '简单', icon: <Zap size={18} />, color: 'green' },
  { value: 'medium', label: '普通', icon: <Target size={18} />, color: 'yellow' },
  { value: 'hard', label: '困难', icon: <Trophy size={18} />, color: 'red' },
];

export const DifficultySelector: React.FC = () => {
  const { difficulty, setDifficulty } = useGameStore();

  const getButtonClasses = (value: Difficulty, color: string) => {
    const isActive = difficulty === value;
    const baseClasses = 'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm md:text-base';
    
    const colorClasses: Record<string, { active: string; inactive: string }> = {
      green: {
        active: 'bg-green-500 text-white shadow-lg shadow-green-200',
        inactive: 'bg-white text-green-600 hover:bg-green-50 border border-green-200',
      },
      yellow: {
        active: 'bg-yellow-500 text-white shadow-lg shadow-yellow-200',
        inactive: 'bg-white text-yellow-600 hover:bg-yellow-50 border border-yellow-200',
      },
      red: {
        active: 'bg-red-500 text-white shadow-lg shadow-red-200',
        inactive: 'bg-white text-red-600 hover:bg-red-50 border border-red-200',
      },
    };

    return `${baseClasses} ${isActive ? colorClasses[color].active : colorClasses[color].inactive}`;
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-bold text-slate-700">难度选择</h3>
      <div className="flex flex-wrap gap-2">
        {difficulties.map(({ value, label, icon, color }) => (
          <button
            key={value}
            onClick={() => setDifficulty(value)}
            className={getButtonClasses(value, color)}
            aria-pressed={difficulty === value}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
