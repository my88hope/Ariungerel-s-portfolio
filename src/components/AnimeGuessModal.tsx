import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Heart,
  Clock,
  Trophy,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Smile,
  Image as ImageIcon,
  UserCheck,
  CheckCircle2,
  XCircle,
  User,
  ArrowRight,
  Check,
} from 'lucide-react';
import gameData from '../data/data.json';
import { GameMode, LeaderboardEntry } from '../types';

interface NormalizedQuestion {
  id: string;
  emoji?: string;
  image: string;
  answer: string;
  subtitle?: string;
  options: string[];
}

interface AnimeGuessModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaderboard: LeaderboardEntry[];
  onSaveScore: (entry: Omit<LeaderboardEntry, 'id' | 'date'>) => void;
}

const QUESTION_TIME = 15;
const INITIAL_LIVES = 3;
const POINTS_PER_CORRECT = 10;

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const AnimeGuessModal: React.FC<AnimeGuessModalProps> = ({
  isOpen,
  onClose,
  leaderboard,
  onSaveScore,
}) => {
  const [phase, setPhase] = useState<
    'enter-username' | 'select-mode' | 'playing' | 'reveal' | 'finished'
  >('enter-username');
  const [username, setUsername] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [mode, setMode] = useState<GameMode>('emoji');
  const [questions, setQuestions] = useState<NormalizedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptedCount, setAttemptedCount] = useState(0);
  const [imageErrorInReveal, setImageErrorInReveal] = useState(false);

  // Guard to automatically save score exactly once per completed run
  const hasRecordedRunRef = useRef(false);

  // Lock background scroll & handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Ask for username every time Play is clicked to open the modal
  useEffect(() => {
    if (isOpen) {
      setPhase('enter-username');
      setUsernameInput(username);
      hasRecordedRunRef.current = false;
    }
  }, [isOpen]);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = usernameInput.trim();
    if (!cleaned) return;
    setUsername(cleaned);
    setPhase('select-mode');
  };

  const startMode = useCallback((selectedMode: GameMode) => {
    let pool: NormalizedQuestion[] = [];

    if (selectedMode === 'emoji') {
      pool = gameData.questions.map((q, idx) => ({
        id: `emoji-${idx}-${q.answer}`,
        emoji: q.emoji,
        image: q.image,
        answer: q.answer,
        options: q.options,
      }));
    } else if (selectedMode === 'anime') {
      // Skip items with empty image in Anime mode
      pool = gameData.questions
        .filter((q) => typeof q.image === 'string' && q.image.trim().length > 0)
        .map((q, idx) => ({
          id: `anime-${idx}-${q.answer}`,
          emoji: q.emoji,
          image: q.image,
          answer: q.answer,
          options: q.options,
        }));
    } else {
      // Character mode
      pool = gameData.characters.map((c, idx) => ({
        id: `char-${idx}-${c.name}`,
        image: c.image,
        answer: c.name,
        subtitle: c.anime,
        options: c.options,
      }));
    }

    hasRecordedRunRef.current = false;
    setMode(selectedMode);
    setQuestions(shuffleArray(pool));
    setCurrentIndex(0);
    setScore(0);
    setLives(INITIAL_LIVES);
    setTimeLeft(QUESTION_TIME);
    setSelectedOption(null);
    setWasCorrect(null);
    setCorrectCount(0);
    setAttemptedCount(0);
    setImageErrorInReveal(false);
    setPhase('playing');
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = useCallback(
    (option: string | null) => {
      if (phase !== 'playing' || !currentQuestion) return;

      const isCorrect =
        option !== null &&
        option.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase();

      setSelectedOption(option);
      setWasCorrect(isCorrect);
      setAttemptedCount((prev) => prev + 1);
      setImageErrorInReveal(false);

      if (isCorrect) {
        setScore((prev) => prev + POINTS_PER_CORRECT);
        setCorrectCount((prev) => prev + 1);
      } else {
        setLives((prev) => Math.max(0, prev - 1));
      }

      setPhase('reveal');
    },
    [phase, currentQuestion]
  );

  // Skip question automatically in Anime mode if image fails to load
  const handleBrokenAnimeImage = useCallback(() => {
    if (phase !== 'playing') return;
    if (mode === 'anime') {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setTimeLeft(QUESTION_TIME);
        setSelectedOption(null);
        setWasCorrect(null);
      } else {
        setPhase('finished');
      }
    } else {
      setImageErrorInReveal(true);
    }
  }, [phase, mode, currentIndex, questions.length]);

  // 15-second question timer
  useEffect(() => {
    if (!isOpen || phase !== 'playing') return;

    if (timeLeft <= 0) {
      handleAnswer(null);
      return;
    }

    const timerId = window.setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [isOpen, phase, timeLeft, handleAnswer]);

  // 2-second reveal timer before moving to next question or ending game
  useEffect(() => {
    if (!isOpen || phase !== 'reveal') return;

    const revealTimerId = window.setTimeout(() => {
      if (lives <= 0 || currentIndex + 1 >= questions.length) {
        setPhase('finished');
      } else {
        setCurrentIndex((prev) => prev + 1);
        setTimeLeft(QUESTION_TIME);
        setSelectedOption(null);
        setWasCorrect(null);
        setImageErrorInReveal(false);
        setPhase('playing');
      }
    }, 2000);

    return () => window.clearTimeout(revealTimerId);
  }, [isOpen, phase, lives, currentIndex, questions.length]);

  // Automatically add player & earned points to the leaderboard when game finishes
  useEffect(() => {
    if (phase === 'finished' && !hasRecordedRunRef.current && username.trim()) {
      hasRecordedRunRef.current = true;
      onSaveScore({
        playerName: username.trim(),
        score,
        mode,
        correctCount,
        totalAttempted: attemptedCount,
      });
    }
  }, [phase, username, score, mode, correctCount, attemptedCount, onSaveScore]);

  if (!isOpen) return null;

  // Compute blur level in Anime mode (unblurs every 3 seconds over 15 seconds)
  const getBlurPx = (): number => {
    if (mode !== 'anime' || phase === 'reveal') return 0;
    const elapsed = QUESTION_TIME - timeLeft; // 0..15
    if (elapsed < 3) return 24;
    if (elapsed < 6) return 16;
    if (elapsed < 9) return 10;
    if (elapsed < 12) return 4;
    return 1.5;
  };

  const getBlurStage = (): number => {
    const elapsed = QUESTION_TIME - timeLeft;
    return Math.min(5, Math.floor(elapsed / 3) + 1);
  };

  const modeLabel = (m: GameMode) => {
    if (m === 'emoji') return 'Emoji';
    if (m === 'anime') return 'Anime';
    return 'Character';
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A0A0D]/95 backdrop-blur-xl flex flex-col overflow-y-auto animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Anime Guess Game"
    >
      {/* Top Modal Bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-8 py-4 bg-[#0C0C0C]/90 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#B600A8] to-[#BE4C00] flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white leading-none">
              Anime Guess
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              {username && phase !== 'enter-username' && (
                <span className="text-xs font-mono text-neutral-300">
                  Player: <span className="text-white font-semibold">{username}</span>
                </span>
              )}
              {(phase === 'playing' || phase === 'reveal' || phase === 'finished') && (
                <span className="text-xs font-mono text-purple-300 uppercase">
                  • Mode: {modeLabel(mode)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Top-right Close button */}
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-red-500/20 border border-white/15 hover:border-red-400/50 text-neutral-200 hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer"
        >
          <span>✕ Close</span>
        </button>
      </div>

      {/* Main Centered Stage */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-3xl">
          {/* SCREEN 0: USERNAME PROMPT WHEN PRESSING PLAY */}
          {phase === 'enter-username' && (
            <div className="glass-panel rounded-3xl p-6 sm:p-10 text-center border-white/10 shadow-2xl max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#B600A8] to-[#BE4C00] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-purple-500/25">
                <User className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mb-2">
                Enter Your Username
              </h3>
              <p className="text-neutral-400 text-sm mb-6">
                When your game finishes, your score will automatically be added to the leaderboard under this name.
              </p>

              <form onSubmit={handleUsernameSubmit} className="space-y-4">
                <input
                  type="text"
                  required
                  autoFocus
                  maxLength={24}
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter Here"
                  className="w-full px-5 py-3.5 rounded-2xl bg-black/40 border border-white/15 text-white placeholder-neutral-500 text-base text-center font-semibold focus:outline-none focus:border-purple-400 transition-colors"
                />

                <button
                  type="submit"
                  disabled={!usernameInput.trim()}
                  className="w-full gradient-pill-btn rounded-full py-3.5 text-white font-semibold uppercase tracking-widest text-xs sm:text-sm inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* SCREEN 1: MODE SELECTION */}
          {phase === 'select-mode' && (
            <div className="glass-panel rounded-3xl p-6 sm:p-10 text-center border-white/10 shadow-2xl">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  Player: {username}
                </span>
                <button
                  type="button"
                  onClick={() => setPhase('enter-username')}
                  className="text-xs text-neutral-400 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Change Name
                </button>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
                Which mode would you like to play?
              </h3>
              <p className="text-neutral-400 text-sm sm:text-base max-w-lg mx-auto mb-8">
                15 seconds per question with 3 lives. Every correct answer earns +10 points!
              </p>

              {/* 3 Mode Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {/* 1. Emoji Mode */}
                <button
                  onClick={() => startMode('emoji')}
                  className="group glass-panel glass-panel-hover rounded-2xl p-6 text-left flex flex-col justify-between border border-white/10 hover:border-purple-400/50 cursor-pointer"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                      <Smile className="w-6 h-6 text-purple-300" />
                    </div>
                    <div className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                      Emoji
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Look at the big emoji clues and guess the right anime from 4 options.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-purple-300">
                    <span>{gameData.questions.length} questions</span>
                    <span>Play →</span>
                  </div>
                </button>

                {/* 2. Anime (Blur) Mode */}
                <button
                  onClick={() => startMode('anime')}
                  className="group glass-panel glass-panel-hover rounded-2xl p-6 text-left flex flex-col justify-between border border-white/10 hover:border-pink-400/50 cursor-pointer"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-6 h-6 text-pink-300" />
                    </div>
                    <div className="text-xl font-bold text-white mb-1 group-hover:text-pink-300 transition-colors">
                      Anime
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      A blurred image unblurs every 3 seconds. Guess the anime before time runs out!
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-pink-300">
                    <span>Blur → Clear</span>
                    <span>Play →</span>
                  </div>
                </button>

                {/* 3. Character Mode */}
                <button
                  onClick={() => startMode('character')}
                  className="group glass-panel glass-panel-hover rounded-2xl p-6 text-left flex flex-col justify-between border border-white/10 hover:border-amber-400/50 cursor-pointer"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                      <UserCheck className="w-6 h-6 text-amber-300" />
                    </div>
                    <div className="text-xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                      Character
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Guess the anime character's name from 4 choices (Luffy, Naruto, Goku).
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-amber-300">
                    <span>{gameData.characters.length} characters</span>
                    <span>Play →</span>
                  </div>
                </button>
              </div>

              {/* Rules summary bar */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-400 pt-4 border-t border-white/5">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-400" /> 15 sec / question
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> 3 lives
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" /> +10 points per correct answer
                </span>
              </div>
            </div>
          )}

          {/* SCREEN 2: PLAYING & 2-SEC REVEAL */}
          {(phase === 'playing' || phase === 'reveal') && currentQuestion && (
            <div className="glass-panel rounded-3xl p-5 sm:p-8 border-white/10 shadow-2xl">
              {/* Persistent HUD: Score, Lives, Timer */}
              <div className="grid grid-cols-3 items-center gap-3 pb-5 mb-6 border-b border-white/10">
                {/* Score */}
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                      Score
                    </span>
                    <span className="text-lg sm:text-xl font-black text-white leading-none">
                      {score}
                    </span>
                  </div>
                </div>

                {/* Lives */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 mb-1">
                    Lives ({lives}/{INITIAL_LIVES})
                  </span>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: INITIAL_LIVES }).map((_, idx) => {
                      const alive = idx < lives;
                      return (
                        <Heart
                          key={idx}
                          className={`w-5 h-5 transition-all duration-300 ${
                            alive
                              ? 'text-pink-500 fill-pink-500 scale-100'
                              : 'text-neutral-700 scale-90'
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Timer */}
                <div className="flex items-center justify-end gap-2.5">
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-neutral-400 block">
                      Time
                    </span>
                    <span
                      className={`text-lg sm:text-xl font-black font-mono leading-none ${
                        timeLeft <= 3
                          ? 'text-red-400 animate-pulse'
                          : timeLeft <= 6
                          ? 'text-amber-400'
                          : 'text-white'
                      }`}
                    >
                      {timeLeft}s
                    </span>
                  </div>
                  <div
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                      timeLeft <= 3
                        ? 'bg-red-500/20 border-red-500/40 text-red-400'
                        : 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Timer Progress Bar */}
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-6">
                <div
                  className={`h-full transition-all duration-700 ease-linear rounded-full ${
                    timeLeft <= 3
                      ? 'bg-red-500'
                      : timeLeft <= 6
                      ? 'bg-amber-400'
                      : 'bg-gradient-to-r from-[#B600A8] to-[#BE4C00]'
                  }`}
                  style={{ width: `${(timeLeft / QUESTION_TIME) * 100}%` }}
                />
              </div>

              {/* Question Progress Counter */}
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
                <span>
                  Question {currentIndex + 1} / {questions.length}
                </span>
                {mode === 'anime' && phase === 'playing' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300">
                    Clarity Stage: {getBlurStage()}/5
                  </span>
                )}
                {phase === 'reveal' && (
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-semibold ${
                      wasCorrect
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-red-500/20 text-red-300 border border-red-500/40'
                    }`}
                  >
                    {wasCorrect
                      ? 'Correct! +10 pts'
                      : selectedOption === null
                      ? "Time's up!"
                      : 'Wrong! -1 life'}
                  </span>
                )}
              </div>

              {/* Visual Prompt Area */}
              <div className="rounded-2xl bg-black/40 border border-white/10 p-5 sm:p-6 mb-6 flex flex-col items-center justify-center min-h-[240px] sm:min-h-[280px] relative overflow-hidden">
                {/* EMOJI MODE DURING PLAYING */}
                {mode === 'emoji' && phase === 'playing' && (
                  <div className="text-center">
                    <div className="text-6xl sm:text-7xl md:text-8xl tracking-widest mb-4 select-none drop-shadow-xl">
                      {currentQuestion.emoji}
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-400 uppercase tracking-wider">
                      Which anime is this?
                    </p>
                  </div>
                )}

                {/* ANIME / CHARACTER / REVEAL IMAGE DISPLAY */}
                {(mode === 'anime' || mode === 'character' || phase === 'reveal') && (
                  <div className="flex flex-col items-center justify-center w-full">
                    {!imageErrorInReveal && currentQuestion.image ? (
                      <div className="relative w-full max-w-[260px] h-[220px] sm:h-[250px] rounded-xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl">
                        <img
                          src={currentQuestion.image}
                          alt={phase === 'reveal' ? currentQuestion.answer : 'Guess this anime'}
                          onError={handleBrokenAnimeImage}
                          className="w-full h-full object-cover object-top transition-[filter] duration-500 select-none"
                          style={{
                            filter: `blur(${getBlurPx()}px)`,
                            transform: getBlurPx() > 0 ? 'scale(1.08)' : 'scale(1)',
                          }}
                        />
                      </div>
                    ) : (
                      <div className="text-5xl sm:text-6xl mb-3">
                        {currentQuestion.emoji || '🎬'}
                      </div>
                    )}

                    {/* Reveal Caption for 2 seconds */}
                    {phase === 'reveal' && (
                      <div className="mt-4 text-center animate-in fade-in duration-200">
                        <span className="text-xs uppercase tracking-wider text-neutral-400 block">
                          Correct Answer
                        </span>
                        <h4 className="text-xl sm:text-2xl font-black text-white">
                          {currentQuestion.answer}
                          {currentQuestion.subtitle && (
                            <span className="text-sm font-normal text-purple-300 ml-2">
                              ({currentQuestion.subtitle})
                            </span>
                          )}
                        </h4>
                      </div>
                    )}

                    {phase === 'playing' && mode === 'character' && (
                      <p className="mt-3 text-xs sm:text-sm text-neutral-400 uppercase tracking-wider">
                        Guess this character's name
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* 4 Answer Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map((option) => {
                  const isCorrectOpt =
                    option.trim().toLowerCase() ===
                    currentQuestion.answer.trim().toLowerCase();
                  const isSelected = selectedOption === option;

                  let btnClass =
                    'bg-white/[0.04] hover:bg-white/[0.1] border-white/10 text-neutral-100 hover:border-purple-400/50 cursor-pointer';

                  if (phase === 'reveal') {
                    if (isCorrectOpt) {
                      btnClass =
                        'bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-500/20 cursor-default';
                    } else if (isSelected && !isCorrectOpt) {
                      btnClass =
                        'bg-red-500/25 border-red-400 text-red-200 shadow-lg shadow-red-500/20 cursor-default';
                    } else {
                      btnClass =
                        'bg-white/[0.02] border-white/5 text-neutral-500 opacity-60 cursor-default';
                    }
                  }

                  return (
                    <button
                      key={option}
                      disabled={phase !== 'playing'}
                      onClick={() => handleAnswer(option)}
                      className={`px-5 py-4 rounded-xl border text-left font-semibold text-sm sm:text-base transition-all duration-200 flex items-center justify-between gap-3 ${btnClass}`}
                    >
                      <span>{option}</span>
                      {phase === 'reveal' && isCorrectOpt && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {phase === 'reveal' && isSelected && !isCorrectOpt && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SCREEN 3: END SCREEN (AUTO-SAVED TO LEADERBOARD) */}
          {phase === 'finished' && (
            <div className="glass-panel rounded-3xl p-6 sm:p-10 text-center border-white/10 shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#B600A8] to-[#BE4C00] flex items-center justify-center mx-auto mb-5 shadow-xl shadow-purple-500/30">
                <Trophy className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
                {lives > 0 ? 'Congratulations! All Done!' : 'Game Over!'}
              </h3>
              <p className="text-sm text-neutral-400 mb-6">
                Player: <span className="text-white font-semibold">{username}</span> • Mode:{' '}
                <span className="text-purple-300 font-semibold">{modeLabel(mode)}</span> • Correct:{' '}
                <span className="text-white font-semibold">
                  {correctCount} / {attemptedCount}
                </span>
              </p>

              {/* Big Score Display */}
              <div className="inline-flex flex-col items-center px-8 py-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Your Total Score
                </span>
                <span className="text-4xl sm:text-5xl font-black hero-heading">
                  {score}
                </span>
              </div>

              {/* Automatic Leaderboard Confirmation + Live Standings */}
              <div className="max-w-md mx-auto mb-8 p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-300 font-medium mb-4 pb-3 border-b border-white/10">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>
                    <strong className="text-white">{username}</strong> has been added to the leaderboard with {score} points!
                  </span>
                </div>

                <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-2">
                  Top Players (Leaderboard)
                </span>
                <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                  {leaderboard.slice(0, 5).map((entry, idx) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-white/[0.03]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400">#{idx + 1}</span>
                        <span className="text-white font-medium">{entry.playerName}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-neutral-400">
                          {modeLabel(entry.mode)}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-purple-300">
                        {entry.score} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => startMode(mode)}
                  className="w-full sm:w-auto gradient-pill-btn rounded-full px-8 py-3.5 text-white font-medium uppercase tracking-widest text-xs sm:text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Play Again</span>
                </button>

                <button
                  onClick={() => setPhase('select-mode')}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-200 hover:text-white font-medium uppercase tracking-widest text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Switch Mode</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
