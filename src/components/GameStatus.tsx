import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { X, Circle, Trophy, Minus, Loader } from 'lucide-react';

export const GameStatus: React.FC = () => {
  const { status, currentPlayer, mode } = useGameStore();

  const getStatusContent = () => {
    switch (status) {
      case 'playerWin':
        return {
          icon: <Trophy className="text-yellow-500" size={28} />,
          text: '恭喜你获胜！',
          color: 'text-green-600 dark:text-green-400',
          bg: 'bg-green-50 dark:bg-green-900/30',
          border: 'border-green-200 dark:border-green-800',
        };
      case 'computerWin':
        return {
          icon: <Circle className="text-red-500" size={28} />,
          text: '电脑获胜，再接再厉！',
          color: 'text-red-600 dark:text-red-400',
          bg: 'bg-red-50 dark:bg-red-900/30',
          border: 'border-red-200 dark:border-red-800',
        };
      case 'player1Win':
        return {
          icon: <X className="text-blue-500" size={28} />,
          text: '玩家1（X）获胜！',
          color: 'text-blue-600 dark:text-blue-400',
          bg: 'bg-blue-50 dark:bg-blue-900/30',
          border: 'border-blue-200 dark:border-blue-800',
        };
      case 'player2Win':
        return {
          icon: <Circle className="text-red-500" size={28} />,
          text: '玩家2（O）获胜！',
          color: 'text-red-600 dark:text-red-400',
          bg: 'bg-red-50 dark:bg-red-900/30',
          border: 'border-red-200 dark:border-red-800',
        };
      case 'draw':
        return {
          icon: <Minus className="text-slate-500 dark:text-slate-400" size={28} />,
          text: '平局！',
          color: 'text-slate-600 dark:text-slate-300',
          bg: 'bg-slate-50 dark:bg-slate-700/50',
          border: 'border-slate-200 dark:border-slate-600',
        };
      case 'playing':
      default:
        if (mode === 'pve') {
          if (currentPlayer === 'X') {
            return {
              icon: <X className="text-blue-500" size={28} />,
              text: '你的回合',
              color: 'text-blue-600 dark:text-blue-400',
              bg: 'bg-blue-50 dark:bg-blue-900/30',
              border: 'border-blue-200 dark:border-blue-800',
            };
          } else {
            return {
              icon: <Loader className="text-red-500 animate-spin" size={28} />,
              text: '电脑思考中...',
              color: 'text-red-600 dark:text-red-400',
              bg: 'bg-red-50 dark:bg-red-900/30',
              border: 'border-red-200 dark:border-red-800',
            };
          }
        } else {
          if (currentPlayer === 'X') {
            return {
              icon: <X className="text-blue-500" size={28} />,
              text: '玩家1（X）的回合',
              color: 'text-blue-600 dark:text-blue-400',
              bg: 'bg-blue-50 dark:bg-blue-900/30',
              border: 'border-blue-200 dark:border-blue-800',
            };
          } else {
            return {
              icon: <Circle className="text-red-500" size={28} />,
              text: '玩家2（O）的回合',
              color: 'text-red-600 dark:text-red-400',
              bg: 'bg-red-50 dark:bg-red-900/30',
              border: 'border-red-200 dark:border-red-800',
            };
          }
        }
    }
  };

  const content = getStatusContent();

  return (
    <div className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 ${content.bg} ${content.border} transition-all duration-300`}>
      {content.icon}
      <span className={`text-xl font-bold ${content.color}`}>
        {content.text}
      </span>
    </div>
  );
};
