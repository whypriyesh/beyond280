import React from 'react';
import { motion } from 'framer-motion';
import { Feather, Terminal, Shield, ArrowRight, Sparkles } from 'lucide-react';

export default function Sidebar({ onFocusWorkspace }) {
  return (
    <aside className="w-full lg:w-[40%] lg:h-screen lg:fixed lg:top-0 lg:left-0 bg-obsidian-bg border-b lg:border-b-0 lg:border-r border-obsidian-border flex flex-col justify-between p-8 lg:p-12 z-10 overflow-y-auto">
      {/* Top Header */}
      <div className="flex flex-col gap-10 lg:gap-16">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-obsidian-accent to-[#C49B74] flex items-center justify-center shadow-lg shadow-obsidian-accentMuted">
              <Feather className="w-4 h-4 text-obsidian-bg" />
            </div>
            <span className="font-heading font-extrabold text-xl tracking-tight bg-gradient-to-r from-white to-[#E2C29B] bg-clip-text text-transparent">
              Beyond280
            </span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-obsidian-card border border-obsidian-border">
            <span className="w-1.5 h-1.5 rounded-full bg-obsidian-accent animate-pulse-slow"></span>
            <span className="font-mono text-[10px] tracking-wider text-obsidian-muted uppercase">v1.0-beta</span>
          </div>
        </motion.div>

        {/* Hero Copy */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-2"
          >
            <span className="font-mono text-xs tracking-widest text-obsidian-accent uppercase font-semibold">
              The Creator Tool for X
            </span>
            <h1 className="font-heading font-extrabold text-4xl lg:text-5xl tracking-tight leading-[1.1] text-white">
              Write.<br />
              Refine.<br />
              Transcend.
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-base text-obsidian-muted font-sans leading-relaxed max-w-md"
          >
            Beyond280 is an AI-powered creator studio that transforms complex, long-form thoughts into beautiful, visually optimized image posts. Capture attention, maximize readability, and share without limits.
          </motion.p>
        </div>

        {/* Interactive CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row lg:flex-col gap-4"
        >
          <button
            onClick={onFocusWorkspace}
            className="interactive-scale flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#E2C29B] hover:bg-[#EAD3B8] text-obsidian-bg font-sans font-semibold rounded-lg shadow-lg shadow-obsidian-accentMuted transition-all text-sm group"
          >
            <span>Create Beyond 280</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onFocusWorkspace}
            className="interactive-scale flex items-center justify-center gap-2 px-6 py-3.5 bg-obsidian-card hover:bg-obsidian-cardHover border border-obsidian-border text-white font-sans font-medium rounded-lg transition-all text-sm"
          >
            <Sparkles className="w-4 h-4 text-obsidian-accent mr-1.5" />
            <span>Open Creator Studio</span>
          </button>
        </motion.div>
      </div>

      {/* Understated Operational Telemetry */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex items-center gap-6 mt-12 lg:mt-0 font-mono text-[10px] text-obsidian-muted"
      >
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5" />
          <span>SYS_ACTIVE</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          <span>SECURED</span>
        </div>
        <div>
          <span>PING: 14MS</span>
        </div>
      </motion.div>
    </aside>
  );
}
