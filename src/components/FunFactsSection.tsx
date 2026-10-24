import React, { useState } from 'react';
import {
  Sparkles,
  Cat,
  Compass,
  Gamepad2,
  Tv,
  Music,
  Utensils,
  BookOpen,
  Heart,
  Snowflake,
} from 'lucide-react';
import { FUN_FACTS, FAVORITES, USER_PROFILE } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

export const FunFactsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'personal' | 'hobby' | 'media'>('all');

  const filteredFacts =
    activeCategory === 'all'
      ? FUN_FACTS
      : FUN_FACTS.filter((fact) => fact.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cat':
        return <Cat className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-5 h-5" />;
      case 'Tv':
        return <Tv className="w-5 h-5" />;
      case 'Music':
        return <Music className="w-5 h-5" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'CloudSnow':
        return <Snowflake className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="fun-facts" className="py-28 px-5 sm:px-8 md:px-10 bg-[#0C0C0C] relative">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn delay={0.1} y={20}>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Personality & Background
            </span>
          </FadeIn>

          <FadeIn delay={0.15} y={25}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Fun Facts & Personal Favorites
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={30}>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Beyond lines of code—here is a glimpse into the things, pets, games, and stories that make up my world.
            </p>
          </FadeIn>

          {/* Filter Pills */}
          <FadeIn delay={0.25} y={20} className="mt-8 flex justify-center flex-wrap gap-2">
            {(['all', 'personal', 'hobby', 'media'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat === 'all' ? 'All Facts' : cat}
              </button>
            ))}
          </FadeIn>
        </div>

        {/* Fun Facts Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {filteredFacts.map((fact, index) => (
            <FadeIn key={fact.id} delay={0.1 + index * 0.05} y={25} className="h-full">
              <div className="glass-panel glass-panel-hover rounded-2xl p-6 h-full flex flex-col justify-between border-white/5 relative overflow-hidden group">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-200"
                  style={{
                    backgroundColor: `${fact.accentColor}20`,
                    color: fact.accentColor,
                    border: `1px solid ${fact.accentColor}40`,
                  }}
                >
                  {getIcon(fact.iconName)}
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {fact.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {fact.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500 uppercase">
                  <span>{fact.category}</span>
                  <span className="text-purple-400 opacity-60 group-hover:opacity-100 transition-opacity">✦</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Quick Favorites Bar */}
        <FadeIn delay={0.35} y={30}>
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border-purple-500/20">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="w-5 h-5 text-pink-500" />
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">
                Ariungerel's Quick Picks & Cultural Influences
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {FAVORITES.map((fav, fIdx) => (
                <div
                  key={fIdx}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-purple-500/30 transition-colors"
                >
                  <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                    {fav.label}
                  </span>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {fav.value}
                  </div>
                  {fav.note && (
                    <span className="text-[10px] text-purple-300/80 block mt-0.5">
                      {fav.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
