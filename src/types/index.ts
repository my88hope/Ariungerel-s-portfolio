export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  url: string;
  category: string;
  badge: string;
  highlights: string[];
  techStack: string[];
  thumbnail: string;
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  description: string;
  iconName: string;
  level: string;
}

export interface RoadmapStep {
  phase: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'future';
  timing: string;
}

export interface FunFactItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'personal' | 'hobby' | 'media';
  accentColor: string;
}

export interface FavoriteItem {
  label: string;
  value: string;
  note?: string;
  category: string;
}

export type GameMode = 'emoji' | 'anime' | 'character';

export interface AnimeQuestion {
  emoji: string;
  image: string;
  answer: string;
  options: string[];
}

export interface CharacterQuestion {
  name: string;
  anime: string;
  image: string;
  options: string[];
}

export interface GameItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  modesCount: number;
  questionsCount: number;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  mode: GameMode;
  correctCount: number;
  totalAttempted: number;
  date: string;
}

