import React from 'react';
import { Navbar } from './components/Navbar';
import { AboutHero } from './components/AboutHero';
import { CreationsSection } from './components/CreationsSection';
import { DreamJobSection } from './components/DreamJobSection';
import { FunFactsSection } from './components/FunFactsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] text-[#F3F4F6] selection:bg-purple-600 selection:text-white flex flex-col font-['Kanit',sans-serif]">
      {/* Sticky navigation header */}
      <Navbar />

      <main className="flex-1">
        {/* About Me Hero Section - Exactly conforming to template design & motion */}
        <AboutHero />

        {/* My Creations Section - Array of projects linking to live Netlify pages */}
        <CreationsSection />

        {/* Dream Job & Engineering Roadmap */}
        <DreamJobSection />

        {/* Fun Facts & Personal Background (Cats, Sweden, Gaming, Link Click) */}
        <FunFactsSection />

        {/* Contact & Message Note */}
        <ContactSection />
      </main>

      {/* Footer with links to all projects */}
      <Footer />
    </div>
  );
}
