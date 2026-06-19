import React, { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import type { RecentGame, Difficulty, GameStatus } from '@/types/game';
import { History, Trash2, ChevronDown, ChevronUp, X, Circle, Minus, Trophy, Trash } from 'lucide-react';

const difficultyLabels: Record<Difficulty, { name: string; color: string }> = {
  easy: { name: '简单', color: 'green' },
  medium: { name: '普通', color: 'yellow' },
  hard: { name: '困难', color: 'red' },
};

const getResultInfo = (result: GameStatus) => {
  switch (result) {
    case 'playerWin':
      return { text: '玩家胜利', color: 'text-green-600 dark:text-green-400', icon: <Trophy size={14} className="text-green-500" /> };
    case 'computerWin':
      return { text: '电脑胜利', color: 'text-red-600 dark:text-red-400', icon: <Circle size={14} className="text-red-500" /> };
    case 'player1Win':
      return { text: '玩家1胜', color: 'text-blue-600 dark:text-blue-400', icon: <X size={14} className="text-blue-500" /> };
    case 'player2Win':
      return { text: '玩家2胜', color: 'text-red-600 dark:text-red-400', icon: <Circle size={14} className="text-red-500" /> };
    case 'draw':
      return { text: '平局', color: 'text-slate-600 dark:text-slate-400', icon: <Minus size={14} className="text-slate-500" /> };
    default:
      return { text: '进行中', color: 'text-slate-600 dark:text-slate-400', icon: <Minus size={14} className="text-slate-500" /> };
  }
};

const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return '刚刚';
  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;
  
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

interface GameItemProps {
  game: RecentGame;
  onDelete: (id: string) => void;
}

const GameItem: React.FC<GameItemProps> = ({ game, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const diffLabel = difficultyLabels[game.difficulty];
  const resultInfo = getResultInfo(game.result);

  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      text: 'text-green-700 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800',
    },
    yellow: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      text: 'text-yellow-700 dark:text-yellow-400',
      border: 'border-yellow-200 dark:border-yellow-800',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      text: 'text-red-700 dark:text-red-400',
      border: 'border-red-200 dark:border-red-800',
    },
  };

  const colors = colorClasses[diffLabel.color];

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(game.id);
  };

  return (
    <div 
      className={`rounded-xl border-2 ${colors.border} ${colors.bg} overflow-hidden transition-all duration-200`}
    >
      <div 
        className="p-3 cursor-pointer hover:bg-white/50 dark:hover:bg-white/5 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
              {diffLabel.name}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {game.mode === 'pve' ? '人机' : '双人'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {resultInfo.icon}
            <span className={`text-sm font-medium ${resultInfo.color}`}>
              {resultInfo.text}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>{game.totalMoves} 步</span>
            <span>{formatTime(game.endTime)}</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleDelete}
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              title="删除记录"
            >
              <Trash2 size={14} />
            </button>
            {expanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="px-3 pb-3 border-t border-slate-200 dark:border-slate-700">
          <div className="pt-3">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">落子顺序</p>
            <div className="flex flex-wrap gap-1.5">
              {game.moves.map((move, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center gap-1 px-2 py-1 rounded-lg text-xs
                    ${move.player === 'X' 
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' 
                      : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                    }
                  `}
                >
                  <span className="font-medium">#{index + 1}</span>
                  <span>({move.row + 1}, {move.col + 1})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const RecentGamesList: React.FC = () => {
  const { recentGames, deleteGame, clearAllGames } = useGameStore();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="text-purple-500" size={24} />
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">最近对局</h3>
          <span className="text-xs text-slate-400 dark:text-slate-500">({recentGames.length}/10)</span>
        </div>
        {recentGames.length > 0 && (
          <button
            onClick={clearAllGames}
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title="清空所有记录"
          >
            <Trash size={14} />
            清空
          </button>
        )}
      </div>
      
      {recentGames.length === 0 ? (
        <div className="text-center py-8 text-slate-400 dark:text-slate-500">
          <History size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">暂无对局记录</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
          {recentGames.map(game => (
            <GameItem key={game.id} game={game} onDelete={deleteGame} />
          ))}
        </div>
      )}
    </div>
  );
};
