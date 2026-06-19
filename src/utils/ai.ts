import type { Board, Difficulty, Player } from '@/types/game';
import { checkWinner, getEmptyCells, isBoardFull, makeMove, findWinningMove } from './gameLogic';

const computerPlayer: Player = 'O';
const humanPlayer: Player = 'X';

const getRandomMove = (board: Board): [number, number] => {
  const emptyCells = getEmptyCells(board);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};

const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number
): number => {
  const winner = checkWinner(board);
  
  if (winner) {
    return winner.winner === computerPlayer ? 10 - depth : depth - 10;
  }
  
  if (isBoardFull(board)) {
    return 0;
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    const emptyCells = getEmptyCells(board);
    
    for (const [row, col] of emptyCells) {
      const newBoard = makeMove(board, row, col, computerPlayer);
      const evalScore = minimax(newBoard, depth + 1, false, alpha, beta);
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    
    return maxEval;
  } else {
    let minEval = Infinity;
    const emptyCells = getEmptyCells(board);
    
    for (const [row, col] of emptyCells) {
      const newBoard = makeMove(board, row, col, humanPlayer);
      const evalScore = minimax(newBoard, depth + 1, true, alpha, beta);
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    
    return minEval;
  }
};

const getBestMove = (board: Board): [number, number] => {
  let bestScore = -Infinity;
  let bestMove: [number, number] = [-1, -1];
  const emptyCells = getEmptyCells(board);
  
  for (const [row, col] of emptyCells) {
    const newBoard = makeMove(board, row, col, computerPlayer);
    const score = minimax(newBoard, 0, false, -Infinity, Infinity);
    if (score > bestScore) {
      bestScore = score;
      bestMove = [row, col];
    }
  }
  
  return bestMove;
};

const getMediumMove = (board: Board): [number, number] => {
  const winningMove = findWinningMove(board, computerPlayer);
  if (winningMove) {
    return winningMove;
  }
  
  const blockingMove = findWinningMove(board, humanPlayer);
  if (blockingMove) {
    return blockingMove;
  }
  
  return getRandomMove(board);
};

export const getAIMove = (board: Board, difficulty: Difficulty): [number, number] => {
  switch (difficulty) {
    case 'easy':
      return getRandomMove(board);
    case 'medium':
      return getMediumMove(board);
    case 'hard':
      return getBestMove(board);
    default:
      return getRandomMove(board);
  }
};
