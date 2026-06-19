import React from 'react';
import { useGameStore } from '@/store/gameStore';
import type { Difficulty, Stats } from '@/types/game';
import { BarChart3, Trophy, Minus, Gamepad2 } from 'lucide-react';

const difficultyLabels: Record<Difficulty, { name: string; color: string }> = {
  easy: { name: '简单', color: 'green' },
  medium: { name: '普通', color: 'yellow' },
  hard: { name: '困难', color: 'red' },
};

const StatCard: React.FC<{ difficulty: Difficulty; stats: Stats }> = ({ difficulty, stats }) => {
  const label = difficultyLabels[difficulty];
  const winRate = stats.total > 0 ? Math.round((stats.wins / stats.total) * 100) : 0;
  
  const colorClasses: Record<string, { bg: string; text: string; border: string; bar: string }> = {
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-700 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800',
      bar: 'bg-green-500 dark:bg-green-400',
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-700 dark:text-yellow-400',
      border: 'border-yellow-200 dark:border-yellow-800',
      bar: 'bg-yellow-500 dark:bg-yellow-400',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-700 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800',
      bar: 'bg-red-500 dark:bg-red-400',
    },
  };

  const colors = colorClasses[label.color];

  return (
    <div className={`p-4 rounded-xl border-2 ${colors.bg} ${colors.border}`}>
      <h4 className={`font-bold mb-3 ${colors.text}`}>{label.name}模式</h4>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="flex flex-col items-center">
          <Gamepad2 size={16} className="text-slate-500 dark:text-slate-400 mb-1" />
          <span className="text-lg font-bold text-slate-700 dark:text-slate-200">{stats.total}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">总局</span>
        </div>
        <div className="flex flex-col items-center">
          <Trophy size={16} className="text-green-500 mb-1" />
          <span className="text-lg font-bold text-green-600 dark:text-green-400">{stats.wins}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">胜局</span>
        </div>
        <div className="flex flex-col items-center">
          <Minus size={16} className="text-slate-400 dark:text-slate-500 mb-1" />
          <span className="text-lg font-bold text-slate-600 dark:text-slate-300">{stats.draws}</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">平局</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500 dark:text-slate-400">胜率</span>
          <span className={`text-sm font-bold ${colors.text}`}>{winRate}%</span>
        </div>
        <div className="mt-1 h-2 bg-white dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
            style={{ width: `${winRate}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export const StatsPanel: React.FC = () => {
  const { stats } = useGameStore();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="text-blue-500" size={24} />
        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">游戏统计</h3>
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">仅统计人机模式对局</p>
      <div className="flex flex-col gap-3">
        <StatCard difficulty="easy" stats={stats.easy} />
        <StatCard difficulty="medium" stats={stats.medium} />
        <StatCard difficulty="hard" stats={stats.hard} />
      </div>
    </div>
  );
};
