import React from 'react';
import { ExternalLink, Sparkles, FolderGit2, CheckCircle2 } from 'lucide-react';
import { PROJECTS_LIST } from '../data/portfolioData';
import { FadeIn } from './FadeIn';

export const CreationsSection: React.FC = () => {
  return (
    <section id="creations" className="relative py-28 px-5 sm:px-8 md:px-10 bg-[#0C0C0C]">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-900/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <FadeIn delay={0.1} y={20}>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/20 mb-4">
              <FolderGit2 className="w-3.5 h-3.5" />
              My Creations • Бүтээлүүд
            </span>
          </FadeIn>

          <FadeIn delay={0.15} y={25}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              Featured Web Projects
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={30}>
            <p className="text-neutral-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Every project here was crafted while learning HTML, CSS, layouts, and web development. Each card links directly to the live project hosted on Netlify.
            </p>
          </FadeIn>
        </div>

        {/* Projects Grid (Mapped from the PROJECTS_LIST array) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS_LIST.map((project, index) => (
            <FadeIn
              key={project.id}
              delay={0.15 + index * 0.1}
              y={35}
              className="h-full"
            >
              <div className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full relative overflow-hidden group">
                
                {/* Accent line on top of card */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Card Header badges */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono">
                      {project.category}
                    </span>
                    <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300">
                      {project.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-200 mb-2">
                    {project.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm font-medium text-neutral-400 uppercase tracking-wider mb-4">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    {project.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2.5 text-xs text-neutral-400">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom metadata and Action button */}
                <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Tech stack pill tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-neutral-400 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Open in new tab button */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-neutral-200 transition-all duration-200 shadow-md group-hover:shadow-purple-500/20 shrink-0"
                    title={`Open ${project.title} in new tab`}
                  >
                    <span>View Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Info callout for visitors */}
        <FadeIn delay={0.4} y={20} className="mt-14">
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-neutral-900/50 to-neutral-900/40 border border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Original Netlify Deployments
                </h4>
                <p className="text-xs text-neutral-400">
                  All pages are live and hosted directly under <span className="font-mono text-purple-300">alyzhas-homepage.netlify.app</span>.
                </p>
              </div>
            </div>

            <a
              href="https://alyzhas-homepage.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider font-semibold text-purple-300 hover:text-purple-200 inline-flex items-center gap-1.5 underline underline-offset-4"
            >
              <span>Explore Root Homepage</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
