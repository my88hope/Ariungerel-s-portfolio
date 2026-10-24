import { Project, SkillItem, RoadmapStep, FunFactItem, FavoriteItem } from '../types';

export const USER_PROFILE = {
  name: 'Ariungerel',
  nickname: 'Alyzha',
  age: 13,
  headline: '13-Year-Old Aspiring Software Developer & Web Creator',
  bioShort: 'Learning web development, building interactive experiences, and solving complex digital puzzles.',
  // The exact text for the scroll-driven character reveal in the hero section:
  heroAnimatedText: "I'm Ariungerel, a 13-year-old student and aspiring software developer. I love coding interactive websites, solving complex puzzles, and learning new technologies. My goal is to master modern web development and create software that makes a real impact. Let's build something incredible together!",
  dreamJob: 'Software Developer',
  location: 'Learning & Building from Ulaanbaatar',
  motto: 'I want to learn how to code and make my own stuff.',
  originalHomepageUrl: 'https://alyzhas-homepage.netlify.app',
};

// "Миний бүтээлүүд" - required array of projects with direct external links
export const PROJECTS_LIST: Project[] = [
  {
    id: 'dream-job',
    title: 'Dream Job: Software Developer',
    subtitle: 'Career Vision, Skills & Educational Plan',
    description:
      'A deep dive into my ambition to become a professional software developer: designing, testing, and maintaining systems that people rely on daily.',
    url: 'https://alyzhas-homepage.netlify.app/hw-dreamjob',
    category: 'Vision & Career',
    badge: 'Featured Goal',
    highlights: [
      'Breakdown of developer responsibilities and core engineering mindsets',
      'My 4-phase educational roadmap from HTML/CSS to Computer Science',
      'Why I love solving complex puzzles and flexible technical challenges',
    ],
    techStack: ['HTML5', 'CSS3', 'Responsive Design', 'Web Architecture'],
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'youtube-hub',
    title: 'My Custom YouTube Page',
    subtitle: 'Curated Media, Documentaries & Music',
    description:
      'A custom frontend gallery showcasing my favorite investigations, game trailers, donghua clips, and indie rock tracks in a responsive grid.',
    url: 'https://alyzhas-homepage.netlify.app/youtube',
    category: 'Interactive Media',
    badge: 'Curated Hub',
    highlights: [
      'LEMMiNO: Cicada 3301 Internet Mystery documentary',
      "Genshin Impact: A Winter Night's Lazzo lore teaser",
      'Radiohead - Jigsaw Falling Into Place & The Mongolz spotlight',
    ],
    techStack: ['CSS Grid', 'Video Embeds', 'Custom Player UI', 'Flexbox'],
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'introduction',
    title: 'Personal Introduction',
    subtitle: 'Story, Background & Passions',
    description:
      'My first personal introduction webpage sharing my journey, living in Sweden for 3 years, my 2 cats Cici & Emily, and why I started coding.',
    url: 'https://alyzhas-homepage.netlify.app/my-introduction',
    category: 'About & Journey',
    badge: 'My First Webpage',
    highlights: [
      'My background and living in Sweden for 3 years',
      'Beloved pets: Cici and Emily the cats',
      'Favorite story: Journey to the West & Link Click',
    ],
    techStack: ['Semantic HTML', 'Typography', 'Styling', 'Multimedia'],
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'original-homepage',
    title: 'Classic Alyzha Homepage',
    subtitle: 'The Original Digital Home',
    description:
      'The classic homepage where all my projects and thoughts originated, featuring custom wallpaper themes, pastel aesthetic styling, and navigation hubs.',
    url: 'https://alyzhas-homepage.netlify.app',
    category: 'Archive',
    badge: 'Original Hub',
    highlights: [
      'Custom wallpaper theme with aesthetic layout',
      'Navigation links to all early coding milestones',
      'Fun facts collection and music reflections',
    ],
    techStack: ['HTML', 'CSS', 'Netlify Edge', 'Modern Layouts'],
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    featured: false,
  },
];

export const ROADMAP_DATA: RoadmapStep[] = [
  {
    phase: 'Phase 1 • Now',
    title: 'Web Fundamentals',
    description: 'Mastering HTML5, modern CSS layouts (Flexbox, Grid), JavaScript logic, and responsive UI components.',
    status: 'completed',
    timing: 'Current Stage',
  },
  {
    phase: 'Phase 2 • This Year',
    title: 'Personal Portfolio & React',
    description: 'Building modern animated web applications using React, Tailwind CSS, and component libraries.',
    status: 'current',
    timing: 'In Progress',
  },
  {
    phase: 'Phase 3 • At School',
    title: 'IT & Advanced Mathematics',
    description: 'Focusing on computer science fundamentals, logic, algorithmic thinking, and advanced mathematics.',
    status: 'future',
    timing: 'Next 2 Years',
  },
  {
    phase: 'Phase 4 • Future',
    title: 'Computer Science & Software Engineering',
    description: 'Studying CS at university, mastering full-stack software development, databases, and large-scale systems.',
    status: 'future',
    timing: 'Long-term Goal',
  },
];

export const SKILLS_LIST: SkillItem[] = [
  {
    name: 'Frontend Web Development',
    description: 'Crafting responsive layouts with clean semantic HTML, Tailwind CSS, and interactive JavaScript.',
    iconName: 'Code',
    level: 'Active Learning',
  },
  {
    name: 'Problem Solving & Logic',
    description: 'Tackling complex puzzles, code debugging, and algorithmic thinking with persistence.',
    iconName: 'Cpu',
    level: 'Core Strength',
  },
  {
    name: 'English & Global Communication',
    description: 'Studying in an advanced English class; lived in Sweden for 3 years communicating internationally.',
    iconName: 'Globe',
    level: 'Advanced',
  },
  {
    name: 'Data & Database Architecture',
    description: 'Learning how to query, organize, store, and retrieve data efficiently for web systems.',
    iconName: 'Database',
    level: 'Exploring',
  },
];

export const FUN_FACTS: FunFactItem[] = [
  {
    id: 'cats',
    title: 'Two Cats: Cici & Emily',
    description: 'Proud pet parent of two adorable cats who keep me company during long coding sessions.',
    iconName: 'Cat',
    category: 'personal',
    accentColor: '#B600A8',
  },
  {
    id: 'sweden',
    title: 'Lived in Sweden for 3 Years',
    description: 'Spent three memorable years in Sweden, broadening my cultural outlook and language skills.',
    iconName: 'Compass',
    category: 'personal',
    accentColor: '#7621B0',
  },
  {
    id: 'genshin',
    title: 'Genshin Impact Endgame Player',
    description: 'Passionate gamer who specifically enjoys conquering endgame challenges and deep battle mechanics.',
    iconName: 'Gamepad2',
    category: 'hobby',
    accentColor: '#BE4C00',
  },
  {
    id: 'donghua',
    title: 'Link Click & Chinese Media Fan',
    description: 'Big fan of Chinese donghua, especially "Link Click", and the legendary classic "Journey to the West".',
    iconName: 'Tv',
    category: 'media',
    accentColor: '#B600A8',
  },
  {
    id: 'music',
    title: 'Music Explorer & Guitarist',
    description: 'My music taste continually evolves—from Radiohead to dynamic OSTs. I also used to play the guitar.',
    iconName: 'Music',
    category: 'hobby',
    accentColor: '#7621B0',
  },
  {
    id: 'dumplings',
    title: 'Favorite Food: Dumplings',
    description: 'Nothing beats a warm plate of fresh dumplings after a productive day of coding and school.',
    iconName: 'Utensils',
    category: 'personal',
    accentColor: '#BE4C00',
  },
  {
    id: 'handed',
    title: 'Left-Handed Thinker',
    description: 'Part of the unique 10% left-handed club, bringing a creative angle to creative problem solving.',
    iconName: 'Sparkles',
    category: 'personal',
    accentColor: '#B600A8',
  },
  {
    id: 'weather',
    title: 'Cool Weather Enthusiast',
    description: 'Summer heat and bugs are not my thing—I love crisp, cool weather that is perfect for focus and creativity.',
    iconName: 'CloudSnow',
    category: 'personal',
    accentColor: '#7621B0',
  },
];

export const FAVORITES: FavoriteItem[] = [
  { label: 'Favorite Novel', value: 'Journey to the West', category: 'Literature' },
  { label: 'Favorite Donghua', value: 'Link Click (时光代理人)', note: 'Time travel thriller', category: 'Animation' },
  { label: 'Favorite Anime', value: "Takopi's Original Sin", category: 'Manga / Anime' },
  { label: 'Favorite Game', value: 'Genshin Impact', note: 'Endgame content focus', category: 'Gaming' },
  { label: 'Favorite Food', value: 'Dumplings', category: 'Culinary' },
  { label: 'Key Goal', value: 'Become a Professional Software Developer', category: 'Career' },
];
