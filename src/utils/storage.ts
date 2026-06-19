import type { DifficultyStats, Stats } from '@/types/game';

const STORAGE_KEY = 'tic-tac-toe-stats';

const defaultStats: Stats = {
  total: 0,
  wins: 0,
  draws: 0,
};

const defaultDifficultyStats: DifficultyStats = {
  easy: { ...defaultStats },
  medium: { ...defaultStats },
  hard: { ...defaultStats },
};

export const loadStats = (): DifficultyStats => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        easy: { ...defaultStats, ...parsed.easy },
        medium: { ...defaultStats, ...parsed.medium },
        hard: { ...defaultStats, ...parsed.hard },
      };
    }
  } catch (e) {
    console.error('Failed to load stats from localStorage', e);
  }
  return JSON.parse(JSON.stringify(defaultDifficultyStats));
};

export const saveStats = (stats: DifficultyStats): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats to localStorage', e);
  }
};
