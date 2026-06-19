export type Player = 'X' | 'O';

export type CellValue = Player | null;

export type Board = CellValue[][];

export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameStatus = 'playing' | 'playerWin' | 'computerWin' | 'draw';

export interface Stats {
  total: number;
  wins: number;
  draws: number;
}

export interface DifficultyStats {
  easy: Stats;
  medium: Stats;
  hard: Stats;
}

export interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  difficulty: Difficulty;
  canUndo: boolean;
  history: Board[];
  stats: DifficultyStats;
  winningLine: [number, number][] | null;
}
