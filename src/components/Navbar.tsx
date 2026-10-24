import React, { useState, useEffect } from 'react';
import { ExternalLink, Menu, X, Code, Sparkles } from 'lucide-react';
import { USER_PROFILE } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Creations', href: '#creations' },
    { label: 'Dream Job', href: '#dream-job' },
    { label: 'Fun Facts', href: '#fun-facts' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0C0C0C]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#about"
          className="flex items-center gap-2.5 text-white font-bold tracking-wider group text-lg sm:text-xl no-underline"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-200">
            <Code className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold uppercase tracking-tight text-white flex items-center gap-1.5">
              {USER_PROFILE.name}
              <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-purple-300 font-mono font-normal">
                {USER_PROFILE.nickname}
              </span>
            </span>
            <span className="text-[10px] text-neutral-400 font-normal tracking-wider uppercase -mt-0.5">
              Portfolio
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-neutral-300 hover:text-white uppercase tracking-wider transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* External Netlify Homepage */}
          <a
            href={USER_PROFILE.originalHomepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/15 text-[#BBCCD7] hover:text-white transition-all duration-200"
            title="Open original Netlify homepage"
          >
            <span>Live Netlify</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121214] border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-neutral-200 hover:text-white py-2 uppercase tracking-wider border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <a
            href={USER_PROFILE.originalHomepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-200 font-semibold text-sm uppercase tracking-wider"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Netlify Homepage</span>
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      )}
    </header>
  );
};
