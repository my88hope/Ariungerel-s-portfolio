import React from 'react';
import { Target, Terminal, Check, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { ROADMAP_DATA, SKILLS_LIST } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

export const DreamJobSection: React.FC = () => {
  return (
    <section id="dream-job" className="py-28 px-5 sm:px-8 md:px-10 bg-[#0E0E10] relative overflow-hidden border-t border-b border-white/5">
      {/* Decorative background radial accent */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-fuchsia-900/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn delay={0.1} y={20}>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20 mb-4">
              <Target className="w-3.5 h-3.5" />
              Ambition & Future Path
            </span>
          </FadeIn>

          <FadeIn delay={0.15} y={25}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Dream Job: Software Developer
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={30}>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Designing, testing, building, and maintaining applications and systems that people use every day.
            </p>
          </FadeIn>
        </div>

        {/* 2-column showcase: Why I Chose It & Core Engineering Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Why I chose this job */}
          <FadeIn delay={0.2} y={30} className="lg:col-span-5 h-full">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-between border-fuchsia-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-600/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-300 mb-6">
                  <Terminal className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  Why I Chose Software Engineering
                </h3>

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                  I love solving complex puzzles, the limitless flexibility of writing code, and the power to turn any creative thought into working software.
                </p>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs sm:text-sm text-neutral-300 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-400" />
                    <span>Problem solving with clean algorithmic logic</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs sm:text-sm text-neutral-300 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span>Creating real tools that people can use worldwide</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs sm:text-sm text-neutral-300 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Continuous growth: every day there is something new to master</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-neutral-400 uppercase tracking-wider font-mono">
                  Origin: Netlify HW Dreamjob
                </span>
                <a
                  href="https://alyzhas-homepage.netlify.app/hw-dreamjob"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-wider font-semibold text-fuchsia-300 hover:text-fuchsia-200 inline-flex items-center gap-1"
                >
                  <span>Read Original Doc</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Required Skills Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SKILLS_LIST.map((skill, sIdx) => (
              <FadeIn key={skill.name} delay={0.2 + sIdx * 0.08} y={30}>
                <div className="glass-panel glass-panel-hover rounded-2xl p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-fuchsia-300 border border-white/10">
                        {skill.level}
                      </span>
                      <Layers className="w-4 h-4 text-neutral-500" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{skill.name}</h4>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* 4-Step Learning Roadmap */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              <span>My 4-Step Educational Roadmap</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ROADMAP_DATA.map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isCurrent = step.status === 'current';

              return (
                <FadeIn key={step.phase} delay={0.25 + idx * 0.1} y={25} className="h-full">
                  <div
                    className={`rounded-2xl p-5 sm:p-6 h-full flex flex-col justify-between border transition-all duration-200 ${
                      isCurrent
                        ? 'bg-purple-950/40 border-purple-500/50 shadow-lg shadow-purple-900/20'
                        : isCompleted
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : 'glass-panel border-white/10'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold uppercase text-neutral-400">
                          {step.phase}
                        </span>
                        {isCompleted && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            <Check className="w-3 h-3" /> Done
                          </span>
                        )}
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/40 animate-pulse">
                            Active
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                      <p className="text-xs text-neutral-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/5 text-[11px] font-mono text-neutral-500 uppercase">
                      {step.timing}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
