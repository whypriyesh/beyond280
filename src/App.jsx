import React from 'react';
import Header from './components/Header';
import Workspace from './components/Workspace';
import ProductSections from './components/ProductSections';
import GrainNoise from './components/GrainNoise';

export default function App() {
  // Smooth scroll and focus helper to transition to studio mode directly
  const handleFocusWorkspace = () => {
    const element = document.getElementById('creator-studio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const textarea = element.querySelector('textarea');
      if (textarea) {
        setTimeout(() => textarea.focus(), 600);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-obsidian-bg w-full overflow-x-hidden">
      {/* Subtle, physical paper grain SVG overlay */}
      <GrainNoise />

      {/* Top navigation header */}
      <Header onFocusWorkspace={handleFocusWorkspace} />

      {/* Main Layout Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-14 flex flex-col justify-start relative z-10">
        
        {/* Cinematic Hero Content */}
        <div className="w-full flex flex-col items-center justify-center mb-14 md:mb-20 lg:mb-24">
          <div className="w-full flex flex-col gap-5 items-center text-center max-w-3xl mx-auto shrink-0">

            {/* Punchline tagline */}
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] text-obsidian-accent uppercase font-bold">
              Because some thoughts don't fit in a tweet
            </span>

            {/* Powerful Headline */}
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-white">
              You had something real to say.<br />
              <span className="bg-gradient-to-r from-[#E2C29B] to-[#C49B74] bg-clip-text text-transparent">X gave you 280 characters.</span>
            </h1>

            {/* Relatable supporting paragraph */}
            <p className="text-sm md:text-base text-obsidian-muted font-sans leading-relaxed max-w-xl">
              We've all been there — you write something honest, something that actually matters, and then you're staring at a character counter turning red. So you cut. And cut. Until the meaning is gone. Beyond280 turns your uncut thoughts into beautiful typographic cards that stop the scroll and say what you actually meant.
            </p>

            {/* Primary Let's Go Button */}
            <button
              onClick={handleFocusWorkspace}
              className="interactive-scale px-8 py-3.5 bg-gradient-to-r from-[#E2C29B] to-[#C49B74] hover:brightness-110 text-obsidian-bg font-sans font-extrabold text-sm rounded-full shadow-lg shadow-obsidian-accentMuted transition-all duration-300 active:scale-[0.97] flex items-center gap-2 group mt-2 relative z-10"
            >
              <span>Start writing freely</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

          </div>
        </div>

        {/* Centerpiece Creator Workspace */}
        <div
          id="creator-studio"
          className="w-full mb-12 border border-white/10 rounded-2xl bg-[#08080B]/90 backdrop-blur-xl shadow-2xl scroll-mt-20"
        >
          <Workspace />
        </div>

        {/* Story, Content Sections & Follow CTA */}
        <ProductSections onFocusWorkspace={handleFocusWorkspace} />

        {/* Personal, Understated Footer */}
        <footer className="border-t border-white/5 pt-8 mt-8 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 font-sans text-xs text-obsidian-muted">
          <div className="flex flex-col gap-1">
            <span className="text-white/60 font-semibold">Beyond280</span>
            <span className="text-[10px]">Made with late nights, too much coffee, and a genuine frustration with character limits.</span>
          </div>
          <div className="flex items-center gap-5 text-[10px]">
            <button onClick={handleFocusWorkspace} className="hover:text-white transition-colors duration-200">Open Studio</button>
            <span className="text-white/10">·</span>
            <a href="https://x.com/priyeshkumar04" target="_blank" rel="noopener noreferrer" className="hover:text-obsidian-accent transition-colors duration-200">@priyeshkumar04</a>
          </div>
        </footer>

      </main>
    </div>
  );
}
