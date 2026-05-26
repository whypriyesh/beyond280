import React from 'react';
import { FeatherLogo } from './Icons';

export default function Header({ isExpanded, onFocusWorkspace, onExitStudio }) {
  return (
    <header className="w-full border-b border-white/5 bg-obsidian-bg/85 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 h-16 flex items-center justify-between">
        
        {/* Brand Identity (Clicking collapses studio when open) */}
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={isExpanded ? onExitStudio : onFocusWorkspace}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-obsidian-accent to-[#C49B74] flex items-center justify-center shadow-lg shadow-obsidian-accentMuted">
            <FeatherLogo className="w-4 h-4 text-obsidian-bg" />
          </div>
          <span className="font-heading font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-[#E2C29B] bg-clip-text text-transparent">
            Beyond280
          </span>
        </div>

        {/* Minimal Understated Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-sans text-xs text-obsidian-muted font-medium">
          <a href="#story" onClick={(e) => { if (isExpanded) { e.preventDefault(); onExitStudio(); setTimeout(() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' }), 300); } }} className="hover:text-white transition-colors duration-200">Story</a>
          <a href="#how-it-works" onClick={(e) => { if (isExpanded) { e.preventDefault(); onExitStudio(); setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 300); } }} className="hover:text-white transition-colors duration-200">How it Works</a>
          <a href="#themes" onClick={(e) => { if (isExpanded) { e.preventDefault(); onExitStudio(); setTimeout(() => document.getElementById('themes')?.scrollIntoView({ behavior: 'smooth' }), 300); } }} className="hover:text-white transition-colors duration-200">Themes</a>
        </nav>

        {/* Core Direct Dynamic CTA */}
        <button
          onClick={isExpanded ? onExitStudio : onFocusWorkspace}
          className={`interactive-scale px-4 py-2 border rounded-lg text-xs font-semibold transition-all duration-300 ${
            isExpanded 
              ? 'bg-obsidian-accentMuted border-[#E2C29B]/25 text-[#E2C29B] hover:bg-[#E2C29B]/10 hover:text-white' 
              : 'bg-obsidian-card hover:bg-obsidian-cardHover border-white/5 text-white'
          }`}
        >
          {isExpanded ? 'Exit Studio' : 'Launch Studio'}
        </button>

      </div>
    </header>
  );
}
