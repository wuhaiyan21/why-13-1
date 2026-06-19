import React from 'react';
import type { CellValue } from '@/types/game';
import { X, Circle } from 'lucide-react';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  isWinning: boolean;
  isShaking: boolean;
}

export const Cell: React.FC<CellProps> = ({ value, onClick, isWinning, isShaking }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-24 h-24 md:w-28 md:h-28
        flex items-center justify-center
        bg-white rounded-xl
        shadow-md hover:shadow-lg
        transition-all duration-200
        hover:scale-105 active:scale-95
        border-2
        ${isWinning ? 'border-yellow-400 bg-yellow-50 shadow-yellow-200' : 'border-slate-200'}
        ${isShaking ? 'animate-shake' : ''}
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        cursor-pointer
        touch-manipulation
        select-none
      `}
      aria-label={value ? `格子: ${value}` : '空格子'}
    >
      {value === 'X' && (
        <X 
          className="w-14 h-14 md:w-16 md:h-16 text-blue-500 animate-pop-in" 
          strokeWidth={3}
        />
      )}
      {value === 'O' && (
        <Circle 
          className="w-14 h-14 md:w-16 md:h-16 text-red-500 animate-pop-in" 
          strokeWidth={3}
        />
      )}
    </button>
  );
};
