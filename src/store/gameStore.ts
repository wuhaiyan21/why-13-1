import { create } from 'zustand';
import type { Board, Difficulty, GameState, GameStatus, Player } from '@/types/game';
import { createEmptyBoard, checkWinner, isBoardFull, makeMove, copyBoard } from '@/utils/gameLogic';
import { getAIMove } from '@/utils/ai';
import { loadStats, saveStats } from '@/utils/storage';

interface GameStore extends GameState {
  setDifficulty: (difficulty: Difficulty) => void;
  playerMove: (row: number, col: number) => boolean;
  computerMove: () => void;
  newGame: () => void;
  undo: () => void;
  updateStats: (status: GameStatus) => void;
}

const initialStats = loadStats();

export const useGameStore = create<GameStore>((set, get) => ({
  board: createEmptyBoard(),
  currentPlayer: 'X',
  status: 'playing',
  difficulty: 'medium',
  canUndo: false,
  history: [],
  stats: initialStats,
  winningLine: null,

  setDifficulty: (difficulty: Difficulty) => {
    set({ difficulty });
    get().newGame();
  },

  playerMove: (row: number, col: number): boolean => {
    const { board, status, history } = get();
    
    if (status !== 'playing') return false;
    if (board[row][col] !== null) return false;

    const newBoard = makeMove(board, row, col, 'X');
    const winner = checkWinner(newBoard);
    const isFull = isBoardFull(newBoard);
    
    let newStatus: GameStatus = 'playing';
    let winningLine: [number, number][] | null = null;
    
    if (winner) {
      newStatus = 'playerWin';
      winningLine = winner.line;
    } else if (isFull) {
      newStatus = 'draw';
    }

    const newHistory = [...history, copyBoard(board)];
    
    set({
      board: newBoard,
      currentPlayer: 'O',
      status: newStatus,
      winningLine,
      history: newHistory,
    });

    if (newStatus !== 'playing') {
      get().updateStats(newStatus);
    }

    return true;
  },

  computerMove: () => {
    const { board, status, difficulty, history } = get();
    
    if (status !== 'playing') return;

    const [row, col] = getAIMove(board, difficulty);
    const newBoard = makeMove(board, row, col, 'O');
    const winner = checkWinner(newBoard);
    const isFull = isBoardFull(newBoard);
    
    let newStatus: GameStatus = 'playing';
    let winningLine: [number, number][] | null = null;
    
    if (winner) {
      newStatus = 'computerWin';
      winningLine = winner.line;
    } else if (isFull) {
      newStatus = 'draw';
    }

    const newHistory = [...history, copyBoard(board)];
    
    set({
      board: newBoard,
      currentPlayer: 'X',
      status: newStatus,
      winningLine,
      history: newHistory,
      canUndo: true,
    });

    if (newStatus !== 'playing') {
      get().updateStats(newStatus);
    }
  },

  updateStats: (status: GameStatus) => {
    const { stats, difficulty } = get();
    const currentStats = stats[difficulty];
    const newStats = {
      ...stats,
      [difficulty]: {
        ...currentStats,
        total: currentStats.total + 1,
        wins: status === 'playerWin' ? currentStats.wins + 1 : currentStats.wins,
        draws: status === 'draw' ? currentStats.draws + 1 : currentStats.draws,
      },
    };
    
    set({ stats: newStats });
    saveStats(newStats);
  },

  newGame: () => {
    set({
      board: createEmptyBoard(),
      currentPlayer: 'X',
      status: 'playing',
      canUndo: false,
      history: [],
      winningLine: null,
    });
  },

  undo: () => {
    const { history, status, canUndo } = get();
    
    if (!canUndo || history.length < 2 || status !== 'playing') return;

    const previousBoard = history[history.length - 2];
    const newHistory = history.slice(0, -2);

    set({
      board: previousBoard,
      currentPlayer: 'X',
      history: newHistory,
      canUndo: false,
    });
  },
}));
