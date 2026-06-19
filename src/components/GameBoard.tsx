import React, { useState, useEffect, useCallback } from 'react';
import { Cell } from './Cell';
import { useGameStore } from '@/store/gameStore';

export const GameBoard: React.FC = () => {
  const { board, winningLine, status, playerMove, computerMove, currentPlayer } = useGameStore();
  const [shakingCell, setShakingCell] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isWinningCell = useCallback((row: number, col: number): boolean => {
    if (!winningLine) return false;
    return winningLine.some(([r, c]) => r === row && c === col);
  }, [winningLine]);

  const showErrorMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1500);
  };

  const handleCellClick = useCallback((row: number, col: number) => {
    if (status !== 'playing' || currentPlayer !== 'X') return;

    if (board[row][col] !== null) {
      setShakingCell(`${row}-${col}`);
      showErrorMessage('这个位置已经有棋子了！');
      setTimeout(() => setShakingCell(null), 500);
      return;
    }

    const success = playerMove(row, col);
    if (!success) {
      showErrorMessage('无法在此处落子');
    }
  }, [board, status, currentPlayer, playerMove]);

  useEffect(() => {
    if (status === 'playing' && currentPlayer === 'O') {
      const timer = setTimeout(() => {
        computerMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [status, currentPlayer, computerMove]);

  return (
    <div className="relative">
      <div 
        className="grid grid-cols-3 gap-3 md:gap-4 p-4 bg-slate-100 rounded-2xl shadow-inner"
        role="grid"
        aria-label="井字棋棋盘"
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              isWinning={isWinningCell(rowIndex, colIndex)}
              isShaking={shakingCell === `${rowIndex}-${colIndex}`}
            />
          ))
        )}
      </div>
      
      {showToast && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in text-sm md:text-base">
            {toastMessage}
          </div>
        </div>
      )}
    </div>
  );
};
