import type { DifficultyStats, Stats, RecentGame } from '@/types/game';

const STATS_STORAGE_KEY = 'tic-tac-toe-stats';
const RECENT_GAMES_STORAGE_KEY = 'tic-tac-toe-recent-games';
const MAX_RECENT_GAMES = 10;

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
    const stored = localStorage.getItem(STATS_STORAGE_KEY);
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
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats to localStorage', e);
  }
};

export const loadRecentGames = (): RecentGame[] => {
  try {
    const stored = localStorage.getItem(RECENT_GAMES_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (e) {
    console.error('Failed to load recent games from localStorage', e);
  }
  return [];
};

export const saveRecentGames = (games: RecentGame[]): void => {
  try {
    const trimmed = games.slice(0, MAX_RECENT_GAMES);
    localStorage.setItem(RECENT_GAMES_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save recent games to localStorage', e);
  }
};

export const addRecentGame = (game: RecentGame): RecentGame[] => {
  const current = loadRecentGames();
  const updated = [game, ...current].slice(0, MAX_RECENT_GAMES);
  saveRecentGames(updated);
  return updated;
};

export const deleteRecentGame = (id: string): RecentGame[] => {
  const current = loadRecentGames();
  const updated = current.filter(g => g.id !== id);
  saveRecentGames(updated);
  return updated;
};

export const clearRecentGames = (): RecentGame[] => {
  saveRecentGames([]);
  return [];
};
