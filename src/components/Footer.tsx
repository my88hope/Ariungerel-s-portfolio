import React from 'react';
import { ExternalLink, Heart, ArrowUp } from 'lucide-react';
import { USER_PROFILE, PROJECTS_LIST } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080A] border-t border-white/10 py-16 px-5 sm:px-8 md:px-10 text-neutral-400 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-black uppercase text-white tracking-wider">
                {USER_PROFILE.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                @{USER_PROFILE.nickname}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
              {USER_PROFILE.headline}. Mastering web technologies one project at a time.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-xs">
          <div>
            <h5 className="font-bold uppercase tracking-wider text-white mb-3 font-mono">
              Live Netlify Projects
            </h5>
            <ul className="space-y-2">
              {PROJECTS_LIST.map((proj) => (
                <li key={proj.id}>
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-purple-300 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{proj.title}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold uppercase tracking-wider text-white mb-3 font-mono">
              Navigation
            </h5>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#creations" className="hover:text-white transition-colors">
                  My Creations (Бүтээлүүд)
                </a>
              </li>
              <li>
                <a href="#dream-job" className="hover:text-white transition-colors">
                  Dream Job: Software Developer
                </a>
              </li>
              <li>
                <a href="#fun-facts" className="hover:text-white transition-colors">
                  Fun Facts & Pets
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Get In Touch
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold uppercase tracking-wider text-white mb-3 font-mono">
              Core Purpose
            </h5>
            <p className="text-neutral-400 leading-relaxed mb-3">
              "{USER_PROFILE.motto}"
            </p>
            <span className="text-[11px] text-neutral-500 font-mono">
              13 Years Old • Built with React & Tailwind CSS
            </span>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} {USER_PROFILE.name} ({USER_PROFILE.nickname}). All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-pink-500 fill-pink-500" />
            <span>and dedication to code</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
