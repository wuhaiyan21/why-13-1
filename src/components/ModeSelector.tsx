import React from 'react';
import type { GameMode } from '@/types/game';
import { useGameStore } from '@/store/gameStore';
import { Monitor, Users } from 'lucide-react';

const modes: { value: GameMode; label: string; icon: React.ReactNode }[] = [
  { value: 'pve', label: '人机对战', icon: <Monitor size={20} /> },
  { value: 'pvp', label: '双人对战', icon: <Users size={20} /> },
];

export const ModeSelector: React.FC = () => {
  const { mode, setMode } = useGameStore();

  return (
    <div className="flex bg-slate-100 dark:bg-slate-700 rounded-xl p-1">
      {modes.map(({ value, label, icon }) => {
        const isActive = mode === value;
        return (
          <button
            key={value}
            onClick={() => setMode(value)}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200
              ${isActive
                ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
              }
            `}
            aria-pressed={isActive}
          >
            {icon}
            <span className="text-sm md:text-base">{label}</span>
          </button>
        );
      })}
    </div>
  );
};
