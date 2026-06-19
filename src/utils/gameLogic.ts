import type { Board, Player } from '@/types/game';

export const createEmptyBoard = (): Board => {
  return Array(3).fill(null).map(() => Array(3).fill(null));
};

export const copyBoard = (board: Board): Board => {
  return board.map(row => [...row]);
};

export const checkWinner = (board: Board): { winner: Player; line: [number, number][] } | null => {
  const lines: [number, number][][] = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    const value = board[a[0]][a[1]];
    if (value && value === board[b[0]][b[1]] && value === board[c[0]][c[1]]) {
      return { winner: value as Player, line };
    }
  }

  return null;
};

export const isBoardFull = (board: Board): boolean => {
  return board.every(row => row.every(cell => cell !== null));
};

export const getEmptyCells = (board: Board): [number, number][] => {
  const cells: [number, number][] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        cells.push([row, col]);
      }
    }
  }
  return cells;
};

export const makeMove = (board: Board, row: number, col: number, player: Player): Board => {
  const newBoard = copyBoard(board);
  newBoard[row][col] = player;
  return newBoard;
};

export const isValidMove = (board: Board, row: number, col: number): boolean => {
  return board[row][col] === null;
};

export const getMoveCount = (board: Board): number => {
  let count = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] !== null) {
        count++;
      }
    }
  }
  return count;
};

export const findWinningMove = (board: Board, player: Player): [number, number] | null => {
  const emptyCells = getEmptyCells(board);
  for (const [row, col] of emptyCells) {
    const newBoard = makeMove(board, row, col, player);
    if (checkWinner(newBoard)) {
      return [row, col];
    }
  }
  return null;
};
