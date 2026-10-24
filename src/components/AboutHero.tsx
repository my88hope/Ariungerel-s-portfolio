import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { FadeIn } from './FadeIn';
import { USER_PROFILE } from '../data/portfolioData';

interface CharSpanProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const CharSpan: React.FC<CharSpanProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none">
        {char === ' ' ? '\u00A0' : char}
      </span>
      <motion.span
        style={{ opacity }}
        className="absolute inset-0 select-none"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
};

export const AboutHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const textToReveal = USER_PROFILE.heroAnimatedText;
  const chars = textToReveal.split('');
  const totalChars = chars.length;

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden"
    >
      {/* 4 decorative floating images placed absolutely in the corners (z-0) */}
      
      {/* 1. Top-left -- Moon icon */}
      <FadeIn
        delay={0.1}
        duration={0.9}
        x={-80}
        y={0}
        className="absolute z-0 pointer-events-none top-[4%] left-[1%] sm:left-[2%] md:left-[4%]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt="Moon decorative 3D icon"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto drop-shadow-2xl select-none"
          loading="eager"
        />
      </FadeIn>

      {/* 2. Bottom-left -- 3D object */}
      <FadeIn
        delay={0.25}
        duration={0.9}
        x={-80}
        y={0}
        className="absolute z-0 pointer-events-none bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt="Abstract 3D decorative sphere object"
          className="w-[100px] sm:w-[140px] md:w-[180px] h-auto drop-shadow-2xl select-none"
          loading="eager"
        />
      </FadeIn>

      {/* 3. Top-right -- Lego icon */}
      <FadeIn
        delay={0.15}
        duration={0.9}
        x={80}
        y={0}
        className="absolute z-0 pointer-events-none top-[4%] right-[1%] sm:right-[2%] md:right-[4%]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt="Lego decorative 3D icon"
          className="w-[120px] sm:w-[160px] md:w-[210px] h-auto drop-shadow-2xl select-none"
          loading="eager"
        />
      </FadeIn>

      {/* 4. Bottom-right -- 3D group */}
      <FadeIn
        delay={0.3}
        duration={0.9}
        x={80}
        y={0}
        className="absolute z-0 pointer-events-none bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt="3D group decorative composition"
          className="w-[130px] sm:w-[170px] md:w-[220px] h-auto drop-shadow-2xl select-none"
          loading="eager"
        />
      </FadeIn>

      {/* Center content (relative z-10, max-w-4xl, centered) */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center justify-center gap-16 sm:gap-20 md:gap-24 text-center">
        
        {/* Group 1 -- Heading + Animated Text (gap 10 sm:14 md:16) */}
        <div className="flex flex-col items-center justify-center gap-10 sm:gap-14 md:gap-16 w-full">
          
          {/* Subtitle badge indicating age & profile */}
          <FadeIn delay={0.05} y={20}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-[#BBCCD7] uppercase tracking-wider backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Age {USER_PROFILE.age} • Aspiring Software Developer</span>
            </div>
          </FadeIn>

          {/* Heading "ABOUT ME" */}
          <FadeIn delay={0} y={40} className="w-full">
            <h1
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
            >
              ABOUT ME
            </h1>
          </FadeIn>

          {/* Animated paragraph with scroll-driven character-by-character reveal */}
          <div
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] px-4"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          >
            {chars.map((char, index) => {
              const charProgress = index / totalChars;
              const start = Math.max(0, charProgress - 0.1);
              const end = Math.min(1, charProgress + 0.05);
              const range: [number, number] = [start, Math.max(start + 0.01, end)];

              return (
                <CharSpan
                  key={index}
                  char={char}
                  progress={scrollYProgress}
                  range={range}
                />
              );
            })}
          </div>
        </div>

        {/* Group 2 -- Contact / Action Button */}
        <FadeIn delay={0.3} y={20}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="#creations"
              className="gradient-pill-btn rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-white font-medium uppercase tracking-widest text-xs sm:text-sm md:text-base inline-flex items-center justify-center gap-3 no-underline shadow-lg cursor-pointer"
            >
              <span>Explore My Creations</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </a>

            <a
              href="#contact"
              className="px-6 py-3 rounded-full text-xs sm:text-sm text-neutral-400 hover:text-white uppercase tracking-widest transition-colors duration-200 border border-white/10 hover:border-white/30"
            >
              Get In Touch
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
