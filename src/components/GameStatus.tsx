import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { X, Circle, Trophy, Minus, Loader } from 'lucide-react';

export const GameStatus: React.FC = () => {
  const { status, currentPlayer } = useGameStore();

  const getStatusContent = () => {
    switch (status) {
      case 'playerWin':
        return {
          icon: <Trophy className="text-yellow-500" size={28} />,
          text: '恭喜你获胜！',
          color: 'text-green-600',
          bg: 'bg-green-50',
          border: 'border-green-200',
        };
      case 'computerWin':
        return {
          icon: <Circle className="text-red-500" size={28} />,
          text: '电脑获胜，再接再厉！',
          color: 'text-red-600',
          bg: 'bg-red-50',
          border: 'border-red-200',
        };
      case 'draw':
        return {
          icon: <Minus className="text-slate-500" size={28} />,
          text: '平局！',
          color: 'text-slate-600',
          bg: 'bg-slate-50',
          border: 'border-slate-200',
        };
      case 'playing':
      default:
        if (currentPlayer === 'X') {
          return {
            icon: <X className="text-blue-500" size={28} />,
            text: '你的回合',
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            border: 'border-blue-200',
          };
        } else {
          return {
            icon: <Loader className="text-red-500 animate-spin" size={28} />,
            text: '电脑思考中...',
            color: 'text-red-600',
            bg: 'bg-red-50',
            border: 'border-red-200',
          };
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
