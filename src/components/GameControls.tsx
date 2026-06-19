import React from 'react';
import { useGameStore } from '@/store/gameStore';
import { RotateCcw, Undo2, Lightbulb } from 'lucide-react';

export const GameControls: React.FC = () => {
  const { newGame, undo, canUndo, status, mode, difficulty, hintUsed, useHint } = useGameStore();

  const canUseHint = mode === 'pve' && difficulty !== 'easy' && !hintUsed && status === 'playing';

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <button
        onClick={newGame}
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
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
            ? 'bg-slate-500 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-500 text-white hover:shadow-xl hover:scale-105 active:scale-95'
            : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
          }
        `}
      >
        <Undo2 size={20} />
        悔棋
      </button>
      {mode === 'pve' && (
        <button
          onClick={useHint}
          disabled={!canUseHint}
          className={`
            flex items-center gap-2 px-6 py-3 font-medium rounded-xl shadow-lg transition-all duration-200
            ${canUseHint
              ? 'bg-amber-500 hover:bg-amber-600 text-white hover:shadow-xl hover:scale-105 active:scale-95'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }
          `}
          title={difficulty === 'easy' ? '简单难度不支持提示' : hintUsed ? '本局提示已使用' : '获取一步提示'}
        >
          <Lightbulb size={20} />
          提示
        </button>
      )}
    </div>
  );
};
