import React, { useState, useEffect, useCallback } from 'react';
import { Gamepad2, Play, Trophy, Medal, Sparkles, Crown, Trash2 } from 'lucide-react';
import { GAMES_LIST, DEFAULT_LEADERBOARD, LEADERBOARD_STORAGE_KEY } from '../data/portfolioData';
import { GameMode, LeaderboardEntry } from '../types';
import { FadeIn } from './FadeIn';
import { AnimeGuessModal } from './AnimeGuessModal';

export const GamesSection: React.FC = () => {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [modeFilter, setModeFilter] = useState<'all' | GameMode>('all');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    try {
      const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback to default seed
    }
    return DEFAULT_LEADERBOARD;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(leaderboard));
    } catch {
      // Ignore storage quota errors
    }
  }, [leaderboard]);

  const handleSaveScore = useCallback((newEntry: Omit<LeaderboardEntry, 'id' | 'date'>) => {
    const entry: LeaderboardEntry = {
      ...newEntry,
      id: `score-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      date: new Date().toISOString().split('T')[0],
    };

    setLeaderboard((prev) =>
      [...prev, entry].sort((a, b) => b.score - a.score || b.correctCount - a.correctCount)
    );
  }, []);

  const handleResetLeaderboard = () => {
    setLeaderboard(DEFAULT_LEADERBOARD);
  };

  const filteredLeaderboard =
    modeFilter === 'all'
      ? leaderboard
      : leaderboard.filter((item) => item.mode === modeFilter);

  const modeBadgeLabel = (mode: GameMode) => {
    if (mode === 'emoji') return 'Emoji';
    if (mode === 'anime') return 'Anime';
    return 'Character';
  };

  return (
    <section
      id="games"
      className="py-28 px-5 sm:px-8 md:px-10 bg-[#0C0C0C] relative overflow-hidden border-t border-white/5"
    >
      {/* Subtle purple-pink glow */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[280px] bg-purple-900/15 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[260px] bg-pink-900/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeIn delay={0.1} y={20}>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
              <Gamepad2 className="w-3.5 h-3.5" />
              Mini Games
            </span>
          </FadeIn>

          <FadeIn delay={0.15} y={25}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Games
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={30}>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Play interactive mini-games I built! Pick a game, beat the clock, and climb the points leaderboard.
            </p>
          </FadeIn>
        </div>

        {/* Main 2-column Layout: Game Cards (left) + Leaderboard (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Games Array Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {GAMES_LIST.map((game, index) => (
              <FadeIn
                key={game.id}
                delay={0.15 + index * 0.1}
                y={30}
                className={GAMES_LIST.length === 1 ? 'sm:col-span-2' : ''}
              >
                <div className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border-white/10 flex flex-col justify-between h-full group">
                  {/* Game Cover Image */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/30 to-transparent" />

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-purple-300 border border-purple-400/30">
                        {game.badge}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-black/60 backdrop-blur-md text-neutral-300 border border-white/10">
                        {game.questionsCount} questions
                      </span>
                    </div>

                    {/* Title overlay at bottom of image */}
                    <div className="absolute bottom-4 left-5 right-5">
                      <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                        {game.title}
                      </h3>
                      <p className="text-xs text-purple-300 font-medium uppercase tracking-wider">
                        {game.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Card Body + Play Button */}
                  <div className="p-6 flex flex-col justify-between flex-1 gap-6">
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {game.description}
                    </p>

                    <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>Emoji • Anime • Character</span>
                      </div>

                      <button
                        onClick={() => setActiveGameId(game.id)}
                        className="gradient-pill-btn rounded-full px-7 py-2.5 text-white font-semibold uppercase tracking-widest text-xs sm:text-sm inline-flex items-center gap-2 cursor-pointer shrink-0"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Play</span>
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Points Leaderboard Panel */}
          <FadeIn delay={0.25} y={30} className="lg:col-span-5">
            <div className="glass-panel rounded-3xl p-6 sm:p-7 border-white/10">
              <div className="flex items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-wider text-white leading-none">
                      Leaderboard
                    </h3>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      Top Points
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleResetLeaderboard}
                  title="Reset leaderboard to defaults"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Mode Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {(['all', 'emoji', 'anime', 'character'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setModeFilter(tab)}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      modeFilter === tab
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab === 'all' ? 'All' : modeBadgeLabel(tab)}
                  </button>
                ))}
              </div>

              {/* Leaderboard Rows */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {filteredLeaderboard.length === 0 ? (
                  <div className="py-10 text-center text-xs text-neutral-400">
                    No scores recorded yet. Press <span className="text-purple-300 font-semibold">Play</span> to be the first on the leaderboard!
                  </div>
                ) : (
                  filteredLeaderboard.slice(0, 10).map((entry, idx) => {
                    const isTop1 = idx === 0;
                    const isTop2 = idx === 1;
                    const isTop3 = idx === 2;

                    return (
                      <div
                        key={entry.id}
                        className={`flex items-center justify-between gap-3 p-3.5 rounded-2xl border transition-colors ${
                          isTop1
                            ? 'bg-amber-500/10 border-amber-400/30'
                            : isTop2
                            ? 'bg-slate-300/5 border-slate-300/20'
                            : isTop3
                            ? 'bg-orange-500/5 border-orange-400/20'
                            : 'bg-white/[0.02] border-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                              isTop1
                                ? 'bg-amber-400 text-black'
                                : isTop2
                                ? 'bg-slate-300 text-black'
                                : isTop3
                                ? 'bg-orange-400 text-black'
                                : 'bg-white/5 text-neutral-400'
                            }`}
                          >
                            {isTop1 ? (
                              <Crown className="w-4 h-4" />
                            ) : isTop2 || isTop3 ? (
                              <Medal className="w-4 h-4" />
                            ) : (
                              `#${idx + 1}`
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="text-sm font-bold text-white truncate">
                              {entry.playerName}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                              <span className="px-1.5 py-0.5 rounded bg-white/5 text-purple-300">
                                {modeBadgeLabel(entry.mode)}
                              </span>
                              <span>
                                {entry.correctCount}/{entry.totalAttempted} correct
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-base font-black text-white font-mono">
                            {entry.score}
                          </div>
                          <div className="text-[10px] uppercase tracking-wider text-neutral-500">
                            pts
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Full-Screen Game Modal */}
      <AnimeGuessModal
        isOpen={activeGameId === 'anime-guess'}
        onClose={() => setActiveGameId(null)}
        leaderboard={leaderboard}
        onSaveScore={handleSaveScore}
      />
    </section>
  );
};
