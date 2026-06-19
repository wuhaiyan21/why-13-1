import type { Board, Difficulty, Player } from '@/types/game';
import { checkWinner, getEmptyCells, isBoardFull, makeMove, findWinningMove } from './gameLogic';

const computerPlayer: Player = 'O';
const humanPlayer: Player = 'X';

const getRandomMove = (board: Board): [number, number] => {
  const emptyCells = getEmptyCells(board);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};

const minimaxForPlayer = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number,
  player: Player
): number => {
  const opponent: Player = player === 'X' ? 'O' : 'X';
  const winner = checkWinner(board);
  
  if (winner) {
    return winner.winner === player ? 10 - depth : depth - 10;
  }
  
  if (isBoardFull(board)) {
    return 0;
  }

  if (isMaximizing) {
    let maxEval = -Infinity;
    const emptyCells = getEmptyCells(board);
    
    for (const [row, col] of emptyCells) {
      const newBoard = makeMove(board, row, col, player);
      const evalScore = minimaxForPlayer(newBoard, depth + 1, false, alpha, beta, player);
      maxEval = Math.max(maxEval, evalScore);
      alpha = Math.max(alpha, evalScore);
      if (beta <= alpha) break;
    }
    
    return maxEval;
  } else {
    let minEval = Infinity;
    const emptyCells = getEmptyCells(board);
    
    for (const [row, col] of emptyCells) {
      const newBoard = makeMove(board, row, col, opponent);
      const evalScore = minimaxForPlayer(newBoard, depth + 1, true, alpha, beta, player);
      minEval = Math.min(minEval, evalScore);
      beta = Math.min(beta, evalScore);
      if (beta <= alpha) break;
    }
    
    return minEval;
  }
};

const getBestMoveForPlayer = (board: Board, player: Player): [number, number] => {
  let bestScore = -Infinity;
  let bestMove: [number, number] = [-1, -1];
  const emptyCells = getEmptyCells(board);
  
  for (const [row, col] of emptyCells) {
    const newBoard = makeMove(board, row, col, player);
    const score = minimaxForPlayer(newBoard, 0, false, -Infinity, Infinity, player);
    if (score > bestScore) {
      bestScore = score;
      bestMove = [row, col];
    }
  }
  
  return bestMove;
};

const getMediumMoveForPlayer = (board: Board, player: Player): [number, number] => {
  const opponent: Player = player === 'X' ? 'O' : 'X';
  
  const winningMove = findWinningMove(board, player);
  if (winningMove) {
    return winningMove;
  }
  
  const blockingMove = findWinningMove(board, opponent);
  if (blockingMove) {
    return blockingMove;
  }
  
  return getRandomMove(board);
};

const getBestMove = (board: Board): [number, number] => {
  return getBestMoveForPlayer(board, computerPlayer);
};

const getMediumMove = (board: Board): [number, number] => {
  return getMediumMoveForPlayer(board, computerPlayer);
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

export const getHintMove = (board: Board, difficulty: Difficulty): [number, number] => {
  switch (difficulty) {
    case 'easy':
      return getRandomMove(board);
    case 'medium':
      return getMediumMoveForPlayer(board, humanPlayer);
    case 'hard':
      return getBestMoveForPlayer(board, humanPlayer);
    default:
      return getRandomMove(board);
  }
};
