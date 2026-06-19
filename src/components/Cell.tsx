import React from 'react';
import type { CellValue } from '@/types/game';
import { X, Circle } from 'lucide-react';

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
        bg-white dark:bg-slate-700 rounded-xl
        shadow-md hover:shadow-lg
        transition-all duration-200
        hover:scale-105 active:scale-95
        border-2
        ${isWinning ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 shadow-yellow-200' : 'border-slate-200 dark:border-slate-600'}
        ${isHint ? 'border-green-400 dark:border-green-500 bg-green-50 dark:bg-green-900/30 animate-pulse' : ''}
        ${isShaking ? 'animate-shake' : ''}
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800
        cursor-pointer
        touch-manipulation
        select-none
      `}
      aria-label={value ? `格子: ${value}` : '空格子'}
    >
      {value === 'X' && (
        <X 
          className="w-14 h-14 md:w-16 md:h-16 text-blue-500 dark:text-blue-400 animate-pop-in" 
          strokeWidth={3}
        />
      )}
      {value === 'O' && (
        <Circle 
          className="w-14 h-14 md:w-16 md:h-16 text-red-500 dark:text-red-400 animate-pop-in" 
          strokeWidth={3}
        />
      )}
    </button>
  );
};
