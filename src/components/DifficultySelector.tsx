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
  const { difficulty, setDifficulty, mode } = useGameStore();

  if (mode !== 'pve') {
    return null;
  }

  const getButtonClasses = (value: Difficulty, color: string) => {
    const isActive = difficulty === value;
    const baseClasses = 'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm md:text-base';
    
    const colorClasses: Record<string, { active: string; inactive: string }> = {
      green: {
        active: 'bg-green-500 text-white shadow-lg shadow-green-200 dark:shadow-green-900/30',
        inactive: 'bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-slate-600 border border-green-200 dark:border-green-800',
      },
      yellow: {
        active: 'bg-yellow-500 text-white shadow-lg shadow-yellow-200 dark:shadow-yellow-900/30',
        inactive: 'bg-white dark:bg-slate-700 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-slate-600 border border-yellow-200 dark:border-yellow-800',
      },
      red: {
        active: 'bg-red-500 text-white shadow-lg shadow-red-200 dark:shadow-red-900/30',
        inactive: 'bg-white dark:bg-slate-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-600 border border-red-200 dark:border-red-800',
      },
    };

    return `${baseClasses} ${isActive ? colorClasses[color].active : colorClasses[color].inactive}`;
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">难度选择</h3>
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
