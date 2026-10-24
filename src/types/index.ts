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
