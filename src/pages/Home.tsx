import { GameBoard } from '@/components/GameBoard';
import { GameControls } from '@/components/GameControls';
import { GameStatus } from '@/components/GameStatus';
import { DifficultySelector } from '@/components/DifficultySelector';
import { StatsPanel } from '@/components/StatsPanel';
import { Grid3X3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-6 md:py-10">
        <header className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Grid3X3 className="text-blue-500" size={40} />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              井字棋对战
            </h1>
          </div>
          <p className="text-slate-500">玩家先手 · 三档难度 · 挑战自我</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center">
          <aside className="w-full lg:w-72 order-2 lg:order-1">
            <StatsPanel />
          </aside>

          <main className="w-full max-w-md mx-auto order-1 lg:order-2">
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 animate-fade-in-up">
              <div className="mb-6">
                <DifficultySelector />
              </div>

              <div className="mb-6">
                <GameStatus />
              </div>

              <div className="flex justify-center mb-6">
                <GameBoard />
              </div>

              <GameControls />
            </div>

            <div className="mt-6 text-center text-sm text-slate-500">
              <p>每局可悔棋一次 · 数据自动保存到本地</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
