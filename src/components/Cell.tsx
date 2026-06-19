import React from 'react';
import type { CellValue } from '@/types/game';
import { X, Circle, Lightbulb } from 'lucide-react';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isWinning: boolean;
  isShaking: boolean;
  isHint: boolean;
}

export const Cell: React.FC<CellProps> = ({ value, onClick, isWinning, isShaking, isHint }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-24 h-24 md:w-28 md:h-28
        flex items-center justify-center
        relative
        bg-white dark:bg-slate-700 rounded-xl
        shadow-md hover:shadow-lg
        transition-all duration-200
        hover:scale-105 active:scale-95
        border-2
        ${isWinning 
          ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/40 shadow-yellow-200 ring-2 ring-yellow-300 dark:ring-yellow-600 ring-offset-2 dark:ring-offset-slate-800' 
          : 'border-slate-200 dark:border-slate-600'
        }
        ${isHint 
          ? '!border-emerald-500 dark:!border-emerald-400 !bg-emerald-50 dark:!bg-emerald-900/50 ring-4 ring-emerald-300 dark:ring-emerald-500/60 ring-offset-2 dark:ring-offset-slate-800 shadow-emerald-200 dark:shadow-emerald-900/50 shadow-lg' 
          : ''
        }
        ${isShaking ? 'animate-shake' : ''}
        ${isHint && !value ? 'animate-pulse' : ''}
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800
        cursor-pointer
        touch-manipulation
        select-none
      `}
      aria-label={value ? `格子: ${value}` : isHint ? '提示格子' : '空格子'}
    >
      {isHint && !value && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Lightbulb 
            className="w-8 h-8 md:w-10 md:h-10 text-emerald-500 dark:text-emerald-400 animate-bounce" 
            strokeWidth={2.5}
          />
        </div>
      )}
      {value === 'X' && (
        <X 
          className="w-14 h-14 md:w-16 md:h-16 text-blue-500 dark:text-blue-400 animate-pop-in relative z-10" 
          strokeWidth={3}
        />
      )}
      {value === 'O' && (
        <Circle 
          className="w-14 h-14 md:w-16 md:h-16 text-red-500 dark:text-red-400 animate-pop-in relative z-10" 
          strokeWidth={3}
        />
      )}
    </button>
  );
};
