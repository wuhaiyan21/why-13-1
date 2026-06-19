import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { RotateCcw, Undo2 } from 'lucide-react';

export const GameControls: React.FC = () => {
  const { newGame, undo, canUndo, status } = useGameStore();

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={newGame}
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <RotateCcw size={20} />
        新游戏
      </button>
      <button
        onClick={undo}
        disabled={!canUndo || status !== 'playing'}
        className={`
          flex items-center gap-2 px-6 py-3 font-medium rounded-xl shadow-lg transition-all duration-200
          ${canUndo && status === 'playing'
            ? 'bg-slate-500 hover:bg-slate-600 text-white hover:shadow-xl hover:scale-105 active:scale-95'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }
        `}
      >
        <Undo2 size={20} />
        悔棋
      </button>
    </div>
  );
};
