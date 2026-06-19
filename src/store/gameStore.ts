import { create } from 'zustand';
import type { Difficulty, GameState, GameStatus, Player, GameMode, MoveRecord, RecentGame } from '@/types/game';
import { createEmptyBoard, checkWinner, isBoardFull, makeMove, copyBoard } from '@/utils/gameLogic';
import { getAIMove } from '@/utils/ai';
import { loadStats, saveStats, loadRecentGames, addRecentGame, deleteRecentGame, clearRecentGames } from '@/utils/storage';

interface GameStore extends GameState {
  setDifficulty: (difficulty: Difficulty) => void;
  setMode: (mode: GameMode) => void;
  playerMove: (row: number, col: number) => boolean;
  pvpMove: (row: number, col: number) => boolean;
  computerMove: () => void;
  newGame: () => void;
  undo: () => void;
  updateStats: (status: GameStatus) => void;
  recordGame: (status: GameStatus, moves: MoveRecord[]) => void;
  useHint: () => void;
  clearHint: () => void;
  deleteGame: (id: string) => void;
  clearAllGames: () => void;
}

const initialStats = loadStats();
const initialRecentGames = loadRecentGames();

const generateGameId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

export const useGameStore = create<GameStore>((set, get) => ({
  board: createEmptyBoard(),
  currentPlayer: 'X',
  status: 'playing',
  difficulty: 'medium',
  mode: 'pve',
  canUndo: false,
  undoUsed: false,
  history: [],
  stats: initialStats,
  winningLine: null,
  hintCell: null,
  hintUsed: false,
  moves: [],
  recentGames: initialRecentGames,

  setDifficulty: (difficulty: Difficulty) => {
    set({ difficulty });
    get().newGame();
  },

  setMode: (mode: GameMode) => {
    set({ mode });
    get().newGame();
  },

  playerMove: (row: number, col: number): boolean => {
    const { board, status, history, moves, mode, undoUsed } = get();
    
    if (status !== 'playing') return false;
    if (board[row][col] !== null) return false;
    if (mode !== 'pve') return false;

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
    const newMoves: MoveRecord[] = [...moves, { row, col, player: 'X' }];
    
    set({
      board: newBoard,
      currentPlayer: 'O',
      status: newStatus,
      winningLine,
      history: newHistory,
      moves: newMoves,
      hintCell: null,
      canUndo: !undoUsed && newHistory.length >= 2,
    });

    if (newStatus !== 'playing') {
      get().updateStats(newStatus);
      get().recordGame(newStatus, newMoves);
    }

    return true;
  },

  pvpMove: (row: number, col: number): boolean => {
    const { board, status, history, currentPlayer, moves, mode, undoUsed } = get();
    
    if (status !== 'playing') return false;
    if (board[row][col] !== null) return false;
    if (mode !== 'pvp') return false;

    const newBoard = makeMove(board, row, col, currentPlayer);
    const winner = checkWinner(newBoard);
    const isFull = isBoardFull(newBoard);
    
    let newStatus: GameStatus = 'playing';
    let winningLine: [number, number][] | null = null;
    
    if (winner) {
      newStatus = currentPlayer === 'X' ? 'player1Win' : 'player2Win';
      winningLine = winner.line;
    } else if (isFull) {
      newStatus = 'draw';
    }

    const newHistory = [...history, copyBoard(board)];
    const newMoves: MoveRecord[] = [...moves, { row, col, player: currentPlayer }];
    const nextPlayer: Player = currentPlayer === 'X' ? 'O' : 'X';
    
    set({
      board: newBoard,
      currentPlayer: nextPlayer,
      status: newStatus,
      winningLine,
      history: newHistory,
      moves: newMoves,
      canUndo: !undoUsed && newHistory.length >= 2,
    });

    if (newStatus !== 'playing') {
      get().recordGame(newStatus, newMoves);
    }

    return true;
  },

  computerMove: () => {
    const { board, status, difficulty, history, moves, mode, undoUsed } = get();
    
    if (status !== 'playing') return;
    if (mode !== 'pve') return;

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
    const newMoves: MoveRecord[] = [...moves, { row, col, player: 'O' }];
    
    set({
      board: newBoard,
      currentPlayer: 'X',
      status: newStatus,
      winningLine,
      history: newHistory,
      moves: newMoves,
      canUndo: !undoUsed && newHistory.length >= 2,
      hintCell: null,
    });

    if (newStatus !== 'playing') {
      get().updateStats(newStatus);
      get().recordGame(newStatus, newMoves);
    }
  },

  updateStats: (status: GameStatus) => {
    const { stats, difficulty, mode } = get();
    
    if (mode !== 'pve') return;
    
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

  recordGame: (status: GameStatus, moves: MoveRecord[]) => {
    const { mode, difficulty } = get();
    
    const game: RecentGame = {
      id: generateGameId(),
      mode,
      difficulty,
      result: status,
      totalMoves: moves.length,
      endTime: Date.now(),
      moves,
    };
    
    const updated = addRecentGame(game);
    set({ recentGames: updated });
  },

  newGame: () => {
    set({
      board: createEmptyBoard(),
      currentPlayer: 'X',
      status: 'playing',
      canUndo: false,
      undoUsed: false,
      history: [],
      winningLine: null,
      hintCell: null,
      hintUsed: false,
      moves: [],
    });
  },

  undo: () => {
    const { history, status, canUndo, mode, moves, undoUsed } = get();
    
    if (!canUndo || undoUsed || history.length < 2 || status !== 'playing') return;

    const previousBoard = history[history.length - 2];
    const newHistory = history.slice(0, -2);
    const newMoves = moves.slice(0, -2);
    const nextPlayer: Player = newMoves.length % 2 === 0 ? 'X' : 'O';

    set({
      board: previousBoard,
      currentPlayer: mode === 'pve' ? 'X' : nextPlayer,
      history: newHistory,
      moves: newMoves,
      canUndo: false,
      undoUsed: true,
      hintCell: null,
    });
  },

  useHint: () => {
    const { board, status, difficulty, hintUsed, mode } = get();
    
    if (mode !== 'pve') return;
    if (status !== 'playing') return;
    if (hintUsed) return;
    if (difficulty === 'easy') return;

    const [row, col] = getAIMove(board, difficulty);
    
    set({
      hintCell: [row, col],
      hintUsed: true,
    });

    setTimeout(() => {
      set({ hintCell: null });
    }, 2000);
  },

  clearHint: () => {
    set({ hintCell: null });
  },

  deleteGame: (id: string) => {
    const updated = deleteRecentGame(id);
    set({ recentGames: updated });
  },

  clearAllGames: () => {
    const updated = clearRecentGames();
    set({ recentGames: updated });
  },
}));
