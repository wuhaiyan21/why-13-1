export type Player = 'X' | 'O';

export type CellValue = Player | null;

export type Board = CellValue[][];

export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameMode = 'pve' | 'pvp';

export type GameStatus = 'playing' | 'playerWin' | 'computerWin' | 'draw' | 'player1Win' | 'player2Win';

export interface MoveRecord {
  row: number;
  col: number;
  player: Player;
}

export interface RecentGame {
  id: string;
  mode: GameMode;
  difficulty: Difficulty;
  result: GameStatus;
  totalMoves: number;
  endTime: number;
  moves: MoveRecord[];
}

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
  mode: GameMode;
  canUndo: boolean;
  history: Board[];
  stats: DifficultyStats;
  winningLine: [number, number][] | null;
  hintCell: [number, number] | null;
  hintUsed: boolean;
  undoUsed: boolean;
  moves: MoveRecord[];
  recentGames: RecentGame[];
}
