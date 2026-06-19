import { GameBoard } from '@/components/GameBoard';
import { GameControls } from '@/components/GameControls';
import { GameStatus } from '@/components/GameStatus';
import { DifficultySelector } from '@/components/DifficultySelector';
import { StatsPanel } from '@/components/StatsPanel';
import { ModeSelector } from '@/components/ModeSelector';
import { RecentGamesList } from '@/components/RecentGamesList';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Grid3X3 } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export default function Home() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100'
    }`}>
      <div className="container mx-auto px-4 py-6 md:py-10">
        <header className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Grid3X3 className="text-blue-500" size={40} />
            <h1 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>
              井字棋对战
            </h1>
          </div>
          <p className={isDark ? 'text-slate-400' : 'text-slate-500'}>
            人机对战 · 双人对战 · 挑战自我
          </p>
          <div className="flex justify-center mt-4">
            <ThemeToggle />
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center">
          <aside className="w-full lg:w-72 order-2 lg:order-1 space-y-4">
            <StatsPanel />
            <RecentGamesList />
          </aside>

          <main className="w-full max-w-md mx-auto order-1 lg:order-2">
            <div className={`rounded-3xl shadow-xl p-6 md:p-8 animate-fade-in-up transition-colors duration-300 ${
              isDark ? 'bg-slate-800' : 'bg-white'
            }`}>
              <div className="mb-6">
                <ModeSelector />
              </div>

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

            <div className={`mt-6 text-center text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              <p>每局可悔棋一次 · 数据自动保存到本地</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
